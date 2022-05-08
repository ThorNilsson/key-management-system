#include <FastLED.h>

#define NUM_LEDS 16
#define LED_SPACEING 2
#define DATA_PIN 4
#define BRIGHTNESS  100

CRGB leds[NUM_LEDS];

int keys[]    = {0, 9, 10, 13, 12, 5, 6, 7, 8};
int sensors[] = {0, A0, A1, A2, A3, A4, A5, A6, A7};

/*
   Observe, The keyword slot is used in the program as a term describing whitch keyhole or "slot" the code is refering to. These are labled 1 to 8.
*/

void setup() {
  for (int i = 1; i <= 8; i++) {
    pinMode(keys[i], OUTPUT);
    digitalWrite(keys[i], LOW);
    pinMode(sensors[i], INPUT_PULLUP);
  }
  Serial.begin(9600);
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
  FastLED.setBrightness(  BRIGHTNESS );FastLED.clear();
}

void loop() {
  if (Serial.available() > 0) {
    int incomingByte = Serial.read();
    int slot = Serial.parseInt();
    int incomingByte2 = Serial.read();

    switch (incomingByte) {
      case 'a': accessKey(slot); break;     // a for access
      case 'r': returnKey(slot);  break;    // r for return
      case 'l': activateLed(slot);  break;  // l for led
      default:  break;
    }
  }
}


/*
   Main functions, accessKey, returnKey, activateLed
*/
void accessKey(int slot) {
  roulette(slot);
  blinkGreen(slot, 5, 500);
  int i = 0;

  while (!isKeyInSlot(slot) && i < 10) {
    unlock(slot);
    i++;
  }

  if (isKeyInSlot(slot)) {
    Serial.print('k'); //k for ok
    setGreen(slot);
    delay(2000);
    setBlack(slot);
  }
  else {
    Serial.print('t');
    blinkRed(slot, 5, 500);
  }
  FastLED.clear();
}

void returnKey(int slot) {
  FastLED.clear();
  setGreen(slot);
  boolean isKeyReturned = false;
  int i = 0;

  while (!isKeyReturned && i < 31000) { // ca 41 sek
    for (int i = 1; i <= 8; i++) {
      bool isOpen = isKeyInSlot(i);

      if ( i == slot && !isOpen) {
        isKeyReturned = true;
        Serial.print('k'); //k for ok
        blinkGreen(slot, 3, 500);
      }
      else if (!isOpen) {
        wrongHole(i);
        Serial.print('w'); //w for wrong hole
      }
    }
    delay(1);
    i++;
  }

  if (!isKeyReturned) {
    Serial.print('t'); //t for timeout
  }
  FastLED.clear();
}

void activateLed(int slot) {
  FastLED.clear();
  setGreen(slot);
  Serial.print('k'); //k for ok
}


/*
   Other functions
*/
bool isKeyInSlot(int slot) {
  int val = slot >= 7 ? analogRead(sensors[slot]) : digitalRead(sensors[slot]);
  return val;
}

void printSensorVal(int slot, int val) {
  Serial.print("Sensor : ");
  Serial.print(slot);
  Serial.print(": ");
  Serial.println(val);
}

void unlock(int slot) {
  setGreen(slot);
  digitalWrite(keys[slot], HIGH);
  delay(500);
  digitalWrite(keys[slot], LOW);
  setBlack(slot);
}

void wrongHole(int slot) {
  int ledindex = NUM_LEDS - (slot * LED_SPACEING);
  setRed(slot);
  digitalWrite(keys[slot], HIGH);
  delay(500);
  digitalWrite(keys[slot], LOW);
  setBlack(slot);
}


/*
   Led animations
*/

void roulette(int slot) {
  FastLED.clear();
  int speedDelay = 5;

  boolean readyToRoll = false;
  int i = 1;
  while (speedDelay < 200 || i != slot) {
    leds[NUM_LEDS - (i * LED_SPACEING)] = CRGB( 0, 255, 0);
    FastLED.show();
    delay(speedDelay);
    leds[NUM_LEDS - (i * LED_SPACEING)] = CRGB( 0, 0, 0);
    FastLED.show();
    delay(speedDelay);
    i++;
    if (i == 9) {
      i = 1;
    }
    speedDelay = speedDelay + 8;
  }
}

void setGreen(int slot) {
  leds[NUM_LEDS - (slot * LED_SPACEING)] = CRGB( 0, 255, 0);
  FastLED.show();
}

void setRed(int slot) {
  leds[NUM_LEDS - (slot * LED_SPACEING)] = CRGB( 255, 0, 0);
  FastLED.show();
}

void setBlack(int slot) {
  leds[NUM_LEDS - (slot * LED_SPACEING)] = CRGB( 0, 0, 0);
  FastLED.show();
}

void blinkGreen(int slot, int blinks, int interval) {
  for (int i = 0; i <= blinks; i++) {
    setGreen(slot);
    delay(interval);
    setBlack(slot);
    delay(interval);
  }
}

void blinkRed(int slot, int blinks, int interval) {
  for (int i = 0; i <= blinks; i++) {
    setRed(slot);
    delay(interval);
    setBlack(slot);
    delay(interval);
  }
}
