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
