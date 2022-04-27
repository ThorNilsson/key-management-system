#if defined(ESP32)
#include <WiFi.h>
#include <FirebaseESP32.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#endif
#include <time.h>
#include <SoftwareSerial.h>
#include <SPI.h>
#include <MFRC522.h> //https://www.youtube.com/watch?v=SQIGilMagm0&t=185s
#include <addons/TokenHelper.h> //Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>
#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
int timeout = 120; // seconds to run for
WiFiManager wm;

#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define API_KEY ""
#define DATABASE_URL ""
#define USER_EMAIL ""
#define USER_PASSWORD ""
#define KEYBOX_ID = ""

//Define Pins
const int button_Pin = A0;//A0 DATA PIN
const int led_Pin = 16;   //D0 DATA 5V GND
const int lock_Pin = 5;   //D1 DATA -> Transistor -> 12V GND
const int sensor_Pin = 4; //D2 DATA GND

const int RST_Pin = 0;    //D3  ORANGE
const int SDA_Pin = 2;    //D4  YELLOW
//                          3V  RED
//                          GND BLACK
const int SCK_Pin = 14;   //D5  PURPLE
const int MISO_Pin = 12;  //D6  GREEN
const int MOSI_Pin = 13;  //D7  BLUE

const int buzzer_Pin = 15;//D8

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

void setup()
{
  WiFi.mode(WIFI_STA); // explicitly set mode, esp defaults to STA+AP

  Serial.begin(115200);
  SPI.begin();
  rfid.PCD_Init();

  pinMode(button_Pin, OUTPUT);       //D0
  pinMode(lock_Pin, OUTPUT);         //D2
  pinMode(sensor_Pin, INPUT_PULLUP); //D6
  pinMode(buzzer_Pin, OUTPUT);       //D7

  //WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  //wm.resetSettings();

  if (wm.autoConnect("KEY Managment System")) {
    Serial.println("failed to auto connect to wifi");
  }

  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  Firebase.setDoubleDigits(5);

  configTime(0, 0, NTP_SERVER);  // See https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv for Timezone codes for your region
  setenv("TZ", TZ_INFO, 1);

  if (getNTPtime(10)) {  // wait up to 10sec to sync
  } else {
    Serial.println("Time not set");
    ESP.restart();
  }
  showTime(timeinfo);
  lastNTPtime = time(&now);
  lastEntryTime = millis();
  Serial.println();

  /*

    if ( ! rfid.PICC_IsNewCardPresent())
    return;
    if (rfid.PICC_ReadCardSerial()) {
    for (byte i = 0; i < 4; i++) {
      tag += rfid.uid.uidByte[i];
    }
    if (
      notify(); //Give a short signal to indicate that the tag has been scanned.
      Serial.println("A master tag has been scanned: " + tag);




      tag = "";
      rfid.PICC_HaltA();
      rfid.PCD_StopCrypto1();
    }
  */
}

void loop()
{
  /*
    Actions defined by database that are triggerd by pressing the button on the fron side of the key box.
     - getKeyByBooking  //gäst öppnar via appen
     - getKeyByAdmin  //Admin öppnar via admin panel
     - getUid     //Läser uid och skickar till server
     - addKey     //Läser UID uppdaterar server och lägger till nyckel i låda
  */

  if ( isOpenButtonPressed() && Firebase.ready() && (millis() - sendDataPrevMillis > 1000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    notify();
    String action = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/action")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
    Serial.println("Open Button Pressed, action is: " + action);

    if (action.equals("getKeyByBooking")) {
      getKeyByBooking();
    } else if (action.equals("getKeyByAdmin")) {
      getKeyByAdmin();
    } else if (action.equals("getUid")) {
      getUid();
    } else if (action.equals("addKey")) {
      Serial.println("ADD KEY");
      //returnKey(keySlot);
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
  if ( ! rfid.PICC_IsNewCardPresent())
    return;
  if (rfid.PICC_ReadCardSerial()) {
    for (byte i = 0; i < 4; i++) {
      tag += rfid.uid.uidByte[i];
    }
    notify(); //Give a short signal to indicate that the tag has been scanned.
    Serial.println("A tag has been scanned: " + tag);

    String accessTagPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/accessTags/" + tag + "/name";
    String keySlotPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/keys/" + tag + "/keySlot";
    String masterTagPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/info/masterTag";


    if (Firebase.getString(fbdo, masterTagPath) && String(fbdo.to<String>()) == tag) {
      notify();
      notify();
      wm.setConfigPortalTimeout(timeout);
      WiFiManagerParameter kms_user("KMS_user", "Enter your username here", "", 50);
      WiFiManagerParameter kms_pass("KMS_pass", "Enter your username here", "", 50);
      wm.addParameter(&kms_user);
      wm.addParameter(&kms_pass);
      
      if (!wm.startConfigPortal("KEY Managment System")) {
        Serial.println("failed to connect and hit timeout");
        delay(3000);
        ESP.restart(); //reset and try again, or maybe put it to deep sleep
        delay(5000);
      }
      sendLog("Wifi settings have been changed or viewed.", "MasterTag", "", "");
      //if you get here you have connected to the WiFi
      Serial.println("connected...yeey :)");
      Serial.println(WiFi.localIP());

      Serial.println(kms_user.getValue());
      Serial.println(kms_pass.getValue());
    }
    else if (Firebase.getString(fbdo, keySlotPath) && fbdo.to<int>() == 0) {
      int keySlot = fbdo.to<int>();
      returnKey(keySlot);
    }
    else if (Firebase.getString(fbdo, accessTagPath)) {
      getKeyByNfc();
    }
    else {
      sendLog("Someone tried to open the box by using an unregisterd nfc tag or a nfc tag that should be in the box, Access denied.", "", "", "");
      notifyError();
    }
    tag = "";
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
} //Loop
