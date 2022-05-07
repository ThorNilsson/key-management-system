#include <FastLED.h>

#define NUM_LEDS 24
#define DATA_PIN 5

CRGB leds[NUM_LEDS];
#define BRIGHTNESS  100
#define UPDATES_PER_SECOND 100
#define PALETTE 0

CRGBPalette16 currentPalette;
TBlendType    currentBlending;
static int i = 6;
static int j = 0;

void setup() {
    FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
    FastLED.setBrightness(  BRIGHTNESS );
}


void loop()
{
    
    static uint8_t startIndex = 0;
    startIndex = startIndex + 1; /* motion speed */

    if(i== 14){
      i = 6;
      }
    
    if(PALETTE == 0) {Success(startIndex);}
    if(PALETTE == 1) {Loading();}
    if(PALETTE == 2) {Notify(startIndex);}
    if(PALETTE == 3) {Error(startIndex);}
    if(PALETTE == 4) {CloseBox(startIndex);}


   
    FastLED.show();
    FastLED.delay(1000 / UPDATES_PER_SECOND);
}



void Success(uint8_t colorIndex)
{
    j += 1;
    SetupGreenAndBlackPalette();
    uint8_t brightness = 255;

    if(j < 150){
      for( int i = 0; i < NUM_LEDS; i++) {
        
        leds[i] = ColorFromPalette( currentPalette, colorIndex, brightness, LINEARBLEND);
        colorIndex += 3;
      }
    }else{
      for( int i = 0; i < NUM_LEDS; i++) {
        leds[i] = CHSV( HUE_GREEN, 255, 255);
      }
    }

}

void Notify( uint8_t colorIndex)
{
    SetupWhiteAndBlackPalette();
    uint8_t brightness = 255;
    for( int i = 0; i < NUM_LEDS; i++) {
        leds[i] = ColorFromPalette( currentPalette, colorIndex, brightness, LINEARBLEND);
    }
}

void Error( uint8_t colorIndex)
{
    SetupRedAndBlackPalette();
    uint8_t brightness = 255;
    for( int i = 0; i < NUM_LEDS; i++) {
        leds[i] = ColorFromPalette( currentPalette, colorIndex, brightness, LINEARBLEND);
    }
}



void Loading()
{

    leds[i] = CRGB::Purple;
    i+=1;
    fadeToBlackBy( leds, NUM_LEDS, 50);
    delay(100);
}

void CloseBox( uint8_t colorIndex)
{
    uint8_t brightness = 255;
    leds[i] = CRGB::Purple;
    leds[24-i] = CRGB::Purple;
    leds[13-i] = CRGB::Purple;
    leds[13+i] = CRGB::Purple;
    i+=1;
    fadeToBlackBy( leds, NUM_LEDS, 130);
    delay(100);
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

    currentPalette = CRGBPalette16( white,white,black,black);
}
void SetupRedAndBlackPalette()
{
    CRGB red  = CHSV( HUE_RED, 255, 255);
    CRGB black  = CRGB::Black;

    currentPalette = CRGBPalette16(black,  black,  red,  red);
}
