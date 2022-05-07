/*
   Makes short sound to notify to the user that something has happend.
*/
void notify() {
  tone(buzzer_Pin, 800);

  for (float i = 0.001; sin(i) > 0; i = i + 0.03) {
    int brightness = sin(i) * 255;
    Serial.println(brightness);
    fill_solid(leds, 24, CRGB(brightness, brightness , brightness));
    FastLED.show();
  }

  noTone(buzzer_Pin);

  fill_solid(leds, 24, CRGB(0, 0 , 0));
  FastLED.show();

}

/*
   Makes a success sound to notify to the user that the process succeded.
*/
void notifySuccess() {
  tone(buzzer_Pin, 800);
  for (float i = -1.57; i < 1.57; i = i + 0.014) {
    Serial.print(sin(i));
    Serial.print(" ");
    int led = (sin(i) + 1) * 12;
    Serial.println(led);
    leds[led] = CRGB(0, 255 , 0);
    FastLED.show();

    if (led == 8) {
      tone(buzzer_Pin, 1000);
    }
    if (led == 16) {
      tone(buzzer_Pin, 1300);
    }
  }
  noTone(buzzer_Pin);

}

/*
   Makes a error sound to notify to the user that an error occured.
*/
void notifyError() {

  tone(buzzer_Pin, 400);
  for (float i = 0.001; sin(i) > 0; i = i + 0.03) {
    int brightness = sin(i) * 255;
    Serial.println(brightness);
    fill_solid(leds, 24, CRGB(brightness, 0 , 0));
    FastLED.show();
  }
  fill_solid(leds, 24, CRGB(0, 0 , 0));
  FastLED.show();
  tone(buzzer_Pin, 300);

  for (float i = 0.001; sin(i) > 0; i = i + 0.01) {
    int brightness = sin(i) * 255;
    Serial.println(brightness);
    fill_solid(leds, 24, CRGB(brightness, 0 , 0));
    FastLED.show();
  }
  
  noTone(buzzer_Pin);
}
