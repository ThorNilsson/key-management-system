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

const char* kmsLoginText = "<div style='clear: both; display: table;'> <img src='http://cdn.discordapp.com/attachments/955491126272458772/974605285752717342/Logo-croped.png' alt='Key Managment System Logo' style='width:50%; float: left;'><h3 style='padding: 10px;'>Log in with your Key Management System account. </h3></div>";
const char* idText = "<hr><h4>Your keybox secret: </h4>";
const char* passText = "<h4>The wifi password to access this page without the wifi-tag:</h4>";
const char* printThisPageButton = "<div><button onClick='window.print()' style='width:50%;'>Print this page</button></div>";

WiFiManagerParameter kms_login_text(kmsLoginText);
WiFiManagerParameter kms_user("KMS_user", "Enter your email here", "", 50);
WiFiManagerParameter kms_pass("KMS_pass", "Enter your password here", "", 50);
WiFiManagerParameter kms_id_text(idText);
WiFiManagerParameter kms_id(keyboxId);
WiFiManagerParameter kms_wifi_pass_text(passText);
WiFiManagerParameter kms_wifi_pass(wifiPass);
WiFiManagerParameter kms_print_page(printThisPageButton);


#define API_KEY "AIzaSyAUsPBPy1B5cr_U0xeB1xPU8T_7S-x_dyg"
#define DATABASE_URL "key-management-system-40057-default-rtdb.europe-west1.firebasedatabase.app"

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
  wm.addParameter(&kms_login_text);
  wm.addParameter(&kms_user);
  wm.addParameter(&kms_pass);
  wm.addParameter(&kms_id_text);
  wm.addParameter(&kms_id);
  wm.addParameter(&kms_wifi_pass_text);
  wm.addParameter(&kms_wifi_pass);
  wm.addParameter(&kms_print_page);

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
    Actions defined by database that are triggerd by pressing the button on the front side of the key box.
    - getKeyByBooking   Used when a guest want to get a key by using the guest page
    - getKeyByAdmin     Used when admin user wants to get a key by the admin panel or guest page
    - getUid            Used to return a key by scanning the nfc tag
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
    Scan nfc tags and configure wifi or return a kee
    - configureWifi   Used to open the wifi configuration without wifi password.
    - returnKey       Used to return a key by scanning the nfc tag.
  */
  String newTag = checkRFID();
  
  if (!newTag.equals("NotAdded")) {
    if (strcmp(masterTag, newTag.c_str()) == 0) {
      configureWifi();
    }
    else if (Firebase.getString(fbdo, getKeySlotPath(newTag)) && fbdo.to<int>() == 0) {
      int keySlot = fbdo.to<int>();
      returnKey(keySlot, newTag);
    }
    else {
      sendLog("Someone tried to open the box by using an unregisterd nfc tag or a nfc tag that should be in the box, Access denied.", "", "", "");
      notifyError();
    }
  }

  /*
    Check if the state of the door changes and if so send a log to the database to update the value.
  */
  if (isDoorOpenVal != isDoorOpen()) {
    isDoorOpenVal = isDoorOpen();
    if (isDoorOpenVal) {
      sendLog("Someone tried to open the box by force and succeded, Door is now open", "", "", "");
    }
    else {
      sendLog("Someone closed the door", "", "", "");
    }
  }
  
  /*
    Check any incomming commands that might be late or if something happends with the array at a unknown point.
  */
  boolean catchLateResponses = getResponse();
} //Loop
