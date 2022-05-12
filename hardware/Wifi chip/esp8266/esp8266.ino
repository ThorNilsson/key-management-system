#define ESP_DRD_USE_SPIFFS true

#if defined(ESP32)
#include <WiFi.h>
#include <FirebaseESP32.h>

#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#endif

#include <FastLED.h>
#include <time.h>
#include <SoftwareSerial.h>
#include <SPI.h>
#include <MFRC522.h> //https://www.youtube.com/watch?v=SQIGilMagm0&t=185s
#include <addons/TokenHelper.h> //Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>
#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
#include "Nvm.h"

#define DEBUG false

#define NUM_LEDS 24
CRGB leds[NUM_LEDS];
#define BRIGHTNESS  255
#define UPDATES_PER_SECOND 100
#define PALETTE 4

CRGBPalette16 currentPalette;
TBlendType    currentBlending;
static int i = 6;
static int j = 0;

int timeout = 120; // seconds to run for
WiFiManager wm;
char testString[50] = "Username";
char KMS_userrname[50] = "Username";
char KMS_password[50] = "Password";
int testNumber = 1234;

// The layout and constructor
static NvmField fields[] = {
  {"userMail"     , "Your Key Management System Email"    , 32, 0},
  {"userPass"     , "Your Key Management System Password" , 32, 0},
  {"keyboxId"     , "NotAdded"                            , 32, 0},
  {"masterTag"    , "NotAdded"                            , 32, 0},
  {"wifiPass"     , "NotAdded"                            , 32, 0},
  {0              , 0                                     ,  0, 0}, // Mandatory sentinel
};

Nvm nvm(fields);

char userMail  [NVM_MAX_LENZ];
char userPass  [NVM_MAX_LENZ];
char keyboxId  [NVM_MAX_LENZ];
char masterTag [NVM_MAX_LENZ];
char wifiPass [NVM_MAX_LENZ];

//mihmic49{1vqbhll58ue

WiFiManagerParameter kms_user("KMS_user", "Enter your email here", "", 50);
WiFiManagerParameter kms_pass("KMS_pass", "Enter your password here", "", 50);
const char* idText = "<H1>Your keybox secret: </H1>";
const char* passText = "<H1>The wifi password to change the settings:</H1>";
WiFiManagerParameter custom_text(idText);
//WiFiManagerParameter custom_text(keyboxId);
WiFiManagerParameter custom_text2(passText);
//WiFiManagerParameter custom_text(wifiPass);


#define API_KEY "AIzaSyAUsPBPy1B5cr_U0xeB1xPU8T_7S-x_dyg"
#define DATABASE_URL "key-management-system-40057-default-rtdb.europe-west1.firebasedatabase.app"
//#define KEYBOX_ID = "dkgC3kfhLpkKBysY_C-9";

//Define Pins
const int button_Pin = A0;//A0 BUTTON DATA PIN

const int lock_Pin = 16;   //D0 LEDS DATA 5V GND
const int led_Pin = 5;   //D1 LOCK DATA -> Transistor -> 12V GND
const int sensor_Pin = 4; //D2 DOOR DATA GND

const int RST_Pin = 0;    //D3  ORANGE
const int SDA_Pin = 2;    //D4  YELLOW
//                          3V  RED
//                          GND BLACK
const int SCK_Pin = 14;   //D5  PURPLE
const int MISO_Pin = 12;  //D6  GREEN
const int MOSI_Pin = 13;  //D7  BLUE

const int buzzer_Pin = 15;//D8 SOUND DATA GND

//Define Data objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
MFRC522 rfid(SDA_Pin, RST_Pin); // Instance of the class
MFRC522::MIFARE_Key key;

//Global Variables
unsigned long sendDataPrevMillis = 0;
unsigned long count = 0;

//Time data
const char* NTP_SERVER = "se.pool.ntp.org";
const char* TZ_INFO    = "CET-1CEST-2,M3.5.0/02:00:00,M10.5.0/03:00:00";  // enter your time zone (https://remotemonitoringsystems.ca/time-zone-abbreviations.php)
tm timeinfo;
time_t now;
long unsigned lastNTPtime;
unsigned long lastEntryTime;

//Length of generated ids
const int idLenght = 20;
String tag;

bool isDoorOpenVal = false;

void setup()
{
  FastLED.addLeds<NEOPIXEL, led_Pin>(leds, NUM_LEDS);
  FastLED.setBrightness(  BRIGHTNESS );

  WiFi.mode(WIFI_STA); // explicitly set mode, esp defaults to STA+AP
  wm.setDebugOutput(DEBUG);
  wm.setConfigPortalTimeout(timeout);
  wm.addParameter(&kms_user);
  wm.addParameter(&kms_pass);

  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();

  //pinMode(button_Pin, INPUT);       //A0
  pinMode(lock_Pin, OUTPUT);         //D2
  pinMode(sensor_Pin, INPUT); //D6
  pinMode(buzzer_Pin, OUTPUT);       //D7

  // Dump the NVM
  //Serial.printf("Dump\n");
  //nvm.dump();
  nvm.get("masterTag", masterTag);
  nvm.get("userMail", userMail);
  nvm.get("userPass", userPass);
  nvm.get("keyboxId", keyboxId);
  nvm.get("wifiPass", wifiPass);

  printDebug("Mastertag: ", masterTag);
  printDebug("User mail: ", userMail);
  printDebug("User password: ", userPass);
  printDebug("Keybox Id: ", keyboxId);

  //if no master tag is added, add one, notifies 5 beeps
  checkMastertagTag();
  checkWifiPass();
  checkKeyboxId();
  //checkUser();


  //Scan nfc if mastertag is present to initiate wifi setup without password.
  if (strcmp(masterTag, checkRFID().c_str()) == 0) {
    printDebug("Master tag scanned on startup, configuring wifi: ", masterTag);
    configureWifi();
  }
  /*
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    for (byte i = 0; i < 4; i++) {
      tag += rfid.uid.uidByte[i];
    }
    notifySuccess(); //Give a short signal to indicate that the tag has been scanned.

    if (strcmp(masterTag, tag.c_str()) == 0) {
      printDebug("Master tag scanned on startup, configuring wifi: ", masterTag);
      configureWifi();
    }
    tag = "";
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
   */

  //wm.resetSettings();
  if (wm.autoConnect("KEY Managment System", wifiPass)) {
    printDebug("Failed to auto connect to wifi, starting wifi config", "");
  }

  //printDebug("Connected with IP: ", String(WiFi.localIP()));
  printDebug("Connected with IP: ", "");
  printDebug("Firebase Client v % s\n\n", FIREBASE_CLIENT_VERSION);

  config.api_key = API_KEY;
  auth.user.email = userMail;
  auth.user.password = userPass;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  Firebase.setDoubleDigits(5);

  configTime(0, 0, NTP_SERVER);  // See https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv for Timezone codes for your region
  setenv("TZ", TZ_INFO, 1);

  if (!getNTPtime(10)) {  // wait up to 10sec to sync
    printDebug("Time not set", "");
    ESP.restart();
  }

  showTime(timeinfo);
  lastNTPtime = time(&now);
  lastEntryTime = millis();

  isDoorOpenVal = isDoorOpen();

  notify();
  printDebug("Setup done.", "");
}

void loop()
{
  /*
    Actions defined by database that are triggerd by pressing the button on the fron side of the key box.
    - getKeyByBooking  //gäst öppnar via appen
    - getKeyByAdmin  //Admin öppnar via admin panel
    - getUid     //Läser uid och skickar till server
  */

  if ( isOpenButtonPressed() && Firebase.ready() && (millis() - sendDataPrevMillis > 1000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    notify();
    String action = Firebase.getString(fbdo, getActionPath() ) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
    printDebug("Open Button Pressed, action is: ", action);

    if (action.equals("getKeyByBooking")) {
      getKeyByBooking();
    } else if (action.equals("getKeyByAdmin")) {
      getKeyByAdmin();
    } else if (action.equals("getUid")) {
      getUid();
    } else {
      sendLog("Open button pressed, no valid action found on server.", "", "", "");
      notifyError();
    }
  }

  /*
    When key identified by nfc is found in database and it´s current key slot is 0 (not in box) the key can be inserted into the key box.
    If the nfc tag is found in the array of allowed nfc tags any avaliable key can be taken out of box.
    If the nfc tag is not found anywhere in the database no access is granted.

    setupWifi     //Läser UID och öppnar skåp om nyckel ska lämnas in.
    returnKey     //Läser UID och öppnar skåp om nyckel ska lämnas in.
    getKeyByNfc   //Läser UID och öppnar skåp om nyckel ska lämnas in.
  */
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    for (byte i = 0; i < 4; i++) {
      tag += rfid.uid.uidByte[i];
    }
    
    notify();
    printDebug("A tag has been scanned: ", tag);

    // If master tag is scanned -> configureWifi (and login)
    if (strcmp(masterTag, tag.c_str()) == 0) {
      configureWifi();
    }
    else if (Firebase.getString(fbdo, getKeySlotPath(tag)) && fbdo.to<int>() == 0) {
      int keySlot = fbdo.to<int>();
      returnKey(keySlot);
    }
    else {
      sendLog("Someone tried to open the box by using an unregisterd nfc tag or a nfc tag that should be in the box, Access denied.", "", "", "");
      notifyError();
    }
    tag = "";
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }



  if (isDoorOpenVal != isDoorOpen()) {
    isDoorOpenVal = isDoorOpen();
    if (isDoorOpenVal) {
      sendLog("Someone tried to open the box by force and succeded, Door is now open", "", "", "");
    }
    else {
      sendLog("Someone closed the door", "", "", "");
    }
  }

  boolean catchLateResponses = getResponse();
} //Loop
