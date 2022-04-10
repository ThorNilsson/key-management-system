#if defined(ESP32)
#include <WiFi.h>
#include <FirebaseESP32.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#endif
#include <time.h>
#include <SoftwareSerial.h>

#include "DHT.h" //Provide the token generation process info.
#include <addons/TokenHelper.h> //Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>
#define DHTTYPE DHT11   // DHT 11

#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define API_KEY ""
#define DATABASE_URL ""
#define USER_EMAIL ""
#define USER_PASSWORD ""
#define KEYBOX_ID = ""

//RFID: https://www.youtube.com/watch?v=SQIGilMagm0&t=185s
//Define Pins
/*
const int button_Pin = A0; //D5

const int redLedPin = 16;  //D0
const int greenLedPin = 5; //D1
const int lock_Pin = 4;     //D2
const int rxPin = 0;       //D3
const int txPin = 2;       //D4
//const int button_Pin = 14; //D5
const int sensor_Pin = 12; //D6
const int buzzer_Pin = 13;     //D7
const int DHTPin = 15;        //D8
 */

const int button_Pin = A0;//A0

const int led_Pin = 16;   //D0
const int lock_Pin = 5;   //D1
const int sensor_Pin = 4; //D2

const int RST_Pin = 0;    //D3  
const int SDA_Pin = 2;    //D4  YELLOW
                          //3V  RED
                          //GND BLACK
const int SCK_Pin = 14;   //D5  PURPLE
const int MISO_Pin = 12;  //D6  GREEN
const int MOSI_Pin = 13;  //D7  BLUE

const int buzzer_Pin = 15;//D8

//const int rx_Pin = 2;       //RX
//const int tx_Pin = 2;       //TX



//Define Data objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
//DHT dht(DHTPin, DHTTYPE);
//SoftwareSerial KeyArray(rxPin, txPin, false, 128);

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


void setup()
{

  Serial.begin(115200);
  //KeyArray.begin(115200);
  //dht.begin();
  
  pinMode(button_Pin, OUTPUT);      //D0
  
  //pinMode(redLedPin, OUTPUT);      //D0
  //pinMode(greenLedPin, OUTPUT);    //D1
  pinMode(lock_Pin, OUTPUT);       //D2
  //pinMode(button_Pin, INPUT_PULLUP);  //D5
  pinMode(sensor_Pin, INPUT_PULLUP);  //D6
  pinMode(buzzer_Pin, OUTPUT);      //D7



  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
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

  configTime(0, 0, NTP_SERVER);
  // See https://github.com/nayarsystems/posix_tz_db/blob/master/zones.csv for Timezone codes for your region
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
}

void loop()
{
  /*
    actions
     - openGuest  //gäst öppnar via appen
     - openAdmin  //Admin öppnar via admin panel
     - getUid     //Läser uid och skickar till server
     - addKey     //Läser UID uppdaterar server och lägger till nyckel i låda


    returnKey   //Läser UID och öppnar skåp om nyckel ska lämnas in.
    pushLog     //Puchar en logg till databasen.
  */
  //float h = dht.readHumidity();
  //float t = dht.readTemperature();
  
  //Serial.println(analogRead(button_Pin));
  
  if ( isOpenButtonPressed() && Firebase.ready() && (millis() - sendDataPrevMillis > 1000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    notify();
    Serial.println("Open Button Pressed, checking action");
    String action = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/action")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
    Serial.println(action);

    if (action.equals("openBooking")) {
      Serial.println("Get key by Booking");

      if (isWithinTimePeriod()) {
        String keyId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/keyId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
        String bookingId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/bookingId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
        String username = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/name")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();

        String keySlotPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/keys/" + keyId + "/keySlot";
        int keySlot = Firebase.getInt(fbdo, keySlotPath) ? fbdo.to<int>() : 0;

        String printMessage = username + " tries to access key " + keySlot + ", id: " + keyId + ", Booking: " + bookingId;
        Serial.println(printMessage);


        if (keySlot != 0) {
          if (isKeyInSlot(keySlot)) {
            notifySuccess();
            //unlockDoor();
            //unlockKey();
            
            Serial.println(Firebase.setInt(fbdo, keySlotPath, 0) ? "Key slot set to 0" : fbdo.errorReason().c_str());
            //closeDoor()
            
          } else {
            sendLog("Get key failed, Key is not found in key box", username, bookingId, "");
            notifyError();
          }
        } else {
          sendLog("Get key failed, Key is in use acording to database", username, bookingId, "");
          notifyError();
        }
      } else {
        sendLog("Someone tried to open the box without access", "", "", "");
        notifyError();
      }
    } 
    
    
    else if (action.equals("openAdmin")) {
      String keyId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/keyId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
      String userId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/userId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
      String username = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/name")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
      Serial.println(username);
      Serial.println("OPEN ADMIN");
    } else if (action.equals("getUid")) {
      Serial.println("GET UID");
    } else if (action.equals("addKey")) {
      Serial.println("ADD KEY");
    }
    //String requestedTime = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/accessRequested")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
    //String expiredTime = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/accessExpired")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
    //Serial.println(expiredTime);
    //getNTPtime(10);
    //showTime(timeinfo);
  }
} //Loop
/*
  unlock 2 - unlocks the specified key
  status 3 - gets the status of key in lock

  stat 4
  ledg 1
  ledr 3


*/
boolean unlockSlot(int slot) {
  String command = "unlock " + slot;
  //KeyArray.print(command);
  //String result = KeyArray.read();
  //return result.equls("ok");
}

boolean closeSlot(int slot) {

  String command = "lock " + slot;
  //KeyArray.print(command);

  return digitalRead(sensor_Pin);
}
boolean isKeyInSlot(int slot) {
  String command = "status " + slot;
  //KeyArray.print(command);
  //String readString;
  //while (Serial.available()) {
  //  delay(3);  //delay to allow buffer to fill
  //  if (Serial.available() > 0) {
   //   char c = Serial.read();  //gets one byte from serial buffer
    //  readString += c; //makes the string readString
   // }
 // }
  //String result = KeyArray.read();
  return true;
  //return result.equls("ok true");
}

void unlockDoor() {
  /*
     Implement check if door magnet is opened.
  */
  tone(buzzer_Pin, 1000);
  //digitalWrite(greenLedPin, HIGH);
  digitalWrite(lock_Pin, HIGH);
  delay(2000);
  noTone(buzzer_Pin);
  digitalWrite(lock_Pin, LOW);
  //digitalWrite(greenLedPin, LOW);
}




/*
 * The wfollowing code is for now considered done ****************************************************************
 */
void notifyError() {
  //digitalWrite(redLedPin, HIGH);
  tone(buzzer_Pin, 400);
  delay(200);
  tone(buzzer_Pin, 300);
  delay(1000);
  noTone(buzzer_Pin);
  //digitalWrite(redLedPin, LOW);
}

void notifySuccess() {
 // digitalWrite(greenLedPin, HIGH);
  tone(buzzer_Pin, 800);
  delay(200);
  tone(buzzer_Pin, 1000);
  delay(200);
  tone(buzzer_Pin, 1300);
  delay(200);
  noTone(buzzer_Pin);
  //digitalWrite(greenLedPin, LOW);
}

void notify() {
  //digitalWrite(greenLedPin, HIGH);
  tone(buzzer_Pin, 800);
  delay(200);
   noTone(buzzer_Pin);
 // digitalWrite(greenLedPin, LOW);
}

void sendLog(String message, String userName, String bookingId, String userId) {
  String id = generateId();
  String logStr = "LOG: " + message + ", By " + userName + ", At: " + now + ", Door: " + isDoorOpen() + ", Booking: " + bookingId  + ", User:  " + userId;
  Serial.println(logStr);
  String logMessagePath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/log/" + id;

  FirebaseJson json;
  json.set("isOpen", isDoorOpen());
  json.set("message", message);
  json.set("name", userName);
  json.set("time", now);
  json.set("bookingId", bookingId);
  json.set("userId", userId);
  Serial.println(Firebase.set(fbdo, logMessagePath, json) ? "Log deliverd." : fbdo.errorReason().c_str());
}

String generateId() {
  byte randomValue;
  char temp[5];
  char letter;
  char msg[50];     // Keep in mind SRAM limits
  int numBytes = 20;
  int i;
  int charsRead;
  memset(msg, 0, sizeof(msg));
  for (i = 0; i < numBytes; i++) {
    randomValue = random(0, 37);
    msg[i] = randomValue + 'a';
    if (randomValue > 26) {
      msg[i] = (randomValue - 26) + '0';
    }
  }
  return msg;
}

boolean isDoorOpen() {
  return digitalRead(sensor_Pin);
}
boolean isOpenButtonPressed() {
  return analogRead(button_Pin) > 300;
}
bool isWithinTimePeriod() {
  int requestedTime = Firebase.getInt(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/accessRequested")) ? fbdo.to<int>() : 0;
  int expiredTime = Firebase.getInt(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/accessExpired")) ? fbdo.to<int>() : 0;
  getNTPtime(10);
  return now > requestedTime && now < expiredTime;
}

bool getNTPtime(int sec) {
  {
    uint32_t start = millis();
    do {
      time(&now);
      localtime_r(&now, &timeinfo);
      Serial.print(".");
      delay(10);
    } while (((millis() - start) <= (1000 * sec)) && (timeinfo.tm_year < (2016 - 1900)));
    if (timeinfo.tm_year <= (2016 - 1900)) return false;  // the NTP call was not successful
    Serial.print("now ");  Serial.println(now);
    char time_output[30];
    strftime(time_output, 30, "%a  %d-%m-%y %T", localtime(&now));
    Serial.println(time_output);
    Serial.println();
  }
  return true;
}

void showTime(tm localTime) {
  Serial.print(localTime.tm_mday);
  Serial.print('/');
  Serial.print(localTime.tm_mon + 1);
  Serial.print('/');
  Serial.print(localTime.tm_year - 100);
  Serial.print('-');
  Serial.print(localTime.tm_hour);
  Serial.print(':');
  Serial.print(localTime.tm_min);
  Serial.print(':');
  Serial.print(localTime.tm_sec);
  //Serial.print(" Day of Week ");
  //if (localTime.tm_wday == 0)   Serial.println(7);
  //else Serial.println(localTime.tm_wday);
}
