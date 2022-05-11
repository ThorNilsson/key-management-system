/*
   Observe, The keyword slot is used in the program as a term describing whitch keyhole or "slot" the code is refering to. These are labled 1 to 8.
*/
#include <FastLED.h>

#define NUM_LEDS 16
#define LED_SPACEING 2
#define DATA_PIN 4
#define BRIGHTNESS  100

CRGB leds[NUM_LEDS];

int keys[]    = {0, 9, 10, 13, 12, 5, 6, 7, 8};       //Digital pins for the key lock solenoids
int sensors[] = {0, A0, A1, A2, A3, A4, A5, A6, A7};  //Analog pins for the tactile sensors
bool freeSlots[] = {0, 0, 0, 0, 0, 0, 0, 0, 0};       //State of the tactile sensors

void setup() {
  for (int i = 1; i <= 8; i++) {
    pinMode(keys[i], OUTPUT);
    digitalWrite(keys[i], LOW);
    pinMode(sensors[i], INPUT_PULLUP);
    freeSlots[i] = isSlotFree(i);
  }
  Serial.begin(9600);
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
  FastLED.setBrightness(  BRIGHTNESS ); FastLED.clear();
}

void loop() {
  /*
     Handle incomming comands.
  */
  if (Serial.available() > 0) {
    int incomingByte = Serial.read();
    int slot = Serial.parseInt();
    int incomingByte2 = Serial.read();

    switch (incomingByte) {
      case 'a': accessKey(slot);        break;  // a for access
      case 'r': returnKey(slot);        break;  // r for return
      case 'l': activateLed(slot);      break;  // l for led
      case 's': returnKeySlotStatus(slot);  break;  // s for sensor
      default:  break;
    }
  }

  /*
      Reject any keys enterd without beeing scanned first.
  */
  for (int i = 1; i <= 8; i++) {
    if (!isSlotFree(i) && freeSlots[i] == true) {
      wrongHole(i);
      Serial.print('w');
    }
  }
}


/*
    Lets user access specified key
*/
void accessKey(int slot) {
  FastLED.clear();
  FastLED.show();
  roulette(slot);
  blinkGreen(slot, 3, 300);

  int i = 0;
  while (!isSlotFree(slot) && i < 10) {
    bool isKeyTaken = isSlotFree(slot);

    unlock(slot);

    if (isKeyTaken  && isSlotFree(slot)) {
      freeSlots[slot] = true;
      Serial.print('k'); //k for ok
      setGreen(slot);
      delay(2000);
      setBlack(slot);
      return;
    }
    i++;
  }

  Serial.print('t');
  blinkRed(slot, 3, 300);
}


/*
    Lets user return specified key
*/
void returnKey(int slot) {
  FastLED.clear();
  FastLED.show();
  unsigned long initialTime = millis();
  setGreen(slot);

  while (initialTime + (60 * 1000) >  millis()) { // ca 41 sek
    for (int i = 1; i <= 8; i++) {
      bool isOpen = isSlotFree(i);

      if ( i == slot && !isOpen) {
        freeSlots[i] == false;
        Serial.print('k'); //k for ok
        blinkGreen(slot, 3, 500);
        return;
      }

      if (!isSlotFree(i) && freeSlots[i] == true) {
        wrongHole(i);
        Serial.print('w');  //k for wrong hole
      }
    }
  }
  Serial.print('t'); //t for timeout
}


/*
    Lets program activate specified key led light
*/
void activateLed(int slot) {
  FastLED.clear();
  setGreen(slot);
  Serial.print('k'); //k for ok
}


/*
    Lets program read specified key slot status, k == key present, f == keySlot free
*/
void returnKeySlotStatus(int slot) {
  if (!isSlotFree(slot)) {
    Serial.print('k'); //k for ok
  } else {
    Serial.print('f'); //k for ok
  }
}


/*
    Returns key slot status
*/
bool isSlotFree(int slot) {
  int val = slot >= 7 ? analogRead(sensors[slot]) : digitalRead(sensors[slot]);
  return val;
}

/*
    Unlocks a key
*/
void unlock(int slot) {
  setGreen(slot);
  digitalWrite(keys[slot], HIGH);
  delay(500);
  digitalWrite(keys[slot], LOW);
  setBlack(slot);
}

/*
    Rejects a key put into wrong hole
*/
void wrongHole(int slot) {
  int ledindex = NUM_LEDS - (slot * LED_SPACEING);
  setRed(slot);
  digitalWrite(keys[slot], HIGH);
  delay(500);
  digitalWrite(keys[slot], LOW);
  setBlack(slot);
}
