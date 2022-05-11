
void SuccessLed(uint8_t colorIndex)
{
  j += 1;
  SetupGreenAndBlackPalette();
  uint8_t brightness = 255;

  if (j < 150) {
    for ( int i = 0; i < NUM_LEDS; i++) {

      leds[i] = ColorFromPalette( currentPalette, colorIndex, brightness, LINEARBLEND);
      colorIndex += 3;
    }
  } else {
    for ( int i = 0; i < NUM_LEDS; i++) {
      leds[i] = CHSV( HUE_GREEN, 255, 255);
    }
  }
}

void NotifyLed( uint8_t colorIndex)
{
  SetupWhiteAndBlackPalette();
  uint8_t brightness = 255;
  for ( int i = 0; i < NUM_LEDS; i++) {
    leds[i] = ColorFromPalette( currentPalette, colorIndex, brightness, LINEARBLEND);
  }
}

void ErrorLed( uint8_t colorIndex)
{
  SetupRedAndBlackPalette();
  uint8_t brightness = 255;
  for ( int i = 0; i < NUM_LEDS; i++) {
    leds[i] = ColorFromPalette( currentPalette, colorIndex, brightness, LINEARBLEND);
  }
}



void LoadingLed()
{
  fadeToBlackBy( leds, NUM_LEDS, 50);
  leds[i] = CRGB::White;
  i = i >= NUM_LEDS ? 0 : i+1;
  FastLED.show();
}

void CloseBoxLed( uint8_t colorIndex)
{
  uint8_t brightness = 255;
  leds[i] = CRGB::Purple;
  leds[24 - i] = CRGB::Purple;
  leds[13 - i] = CRGB::Purple;
  leds[13 + i] = CRGB::Purple;
  i += 1;
  fadeToBlackBy( leds, NUM_LEDS, 130);
  delay(100);
}

void clearLeds(){
  FastLED.clear();
  FastLED.show();
}





void SetupGreenAndBlackPalette()
{
  CRGB green  = CHSV( HUE_GREEN, 255, 255);
  CRGB black  = CRGB::Black;

  currentPalette = CRGBPalette16(black,  black,  green,  green);
}

void SetupWhiteAndBlackPalette()
{
  CRGB white  = CRGB( 255, 255, 255);
  CRGB black  = CRGB::Black;

  currentPalette = CRGBPalette16( white, white, black, black);
}
void SetupRedAndBlackPalette()
{
  CRGB red  = CHSV( HUE_RED, 255, 255);
  CRGB black  = CRGB::Black;

  currentPalette = CRGBPalette16(black,  black,  red,  red);
}
