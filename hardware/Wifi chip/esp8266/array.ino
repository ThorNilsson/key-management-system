/*
  accessSlot a - unlocks the specified key
  returnSlot r - returns the specified key
  ledSlot    l - light the led of specified key
  stat 4
  ledg 1
  ledr 3
*/
boolean accessSlot(int slot) {
  Serial.print("a");
  Serial.print(slot);
  return getWaitForResponse(slot, 60);
}

boolean returnSlot(int slot) {
  Serial.print("r");
  Serial.print(slot);
  return getWaitForResponse(slot, 60);
}


boolean ledSlot(int slot) {
  Serial.print("l");
  Serial.print(slot);
  return getWaitForResponse(slot, 5);
}

boolean isKeyInSlot(int slot) {
  Serial.print("s");
  Serial.print(slot);
  return getWaitForResponse(slot, 5);
}

bool getWaitForResponse(int slot, int seconds) {
  unsigned long initialTime = millis();

  unsigned long initialLedTime = millis();
  unsigned long interval = 40;

  unsigned long initialErrorTime = millis();
  boolean doNotifyError = false;

  while (initialTime + (seconds * 1000) >  millis())
  {
    if (millis() - initialLedTime > interval) {
      if (doNotifyError)
        doNotifyError = notifyErrorNoDelay(millis() - initialErrorTime);
      else
        LoadingLed();
      initialLedTime = millis();
    }

    if (Serial.available() > 0) {
      int incomingByte = Serial.read();
      clearLeds();

      switch (incomingByte) {
        case 'k': return true;    break;    // k for ok
        case 'w': doNotifyError = true; initialErrorTime = millis();  break;    // w for wrong hole
        case 't': return false;  break;     // t for true
        case 'f': return false;  break;     // f for false
        default:  break;
      }
    }
  }
  clearLeds();
  //sendLog("Timed out", "", "", "");

  return false;
}

bool getResponse() {
  if (Serial.available() > 0) {
    int incomingByte = Serial.read();

    switch (incomingByte) {
      case 'k': return true;    break;    // k for ok
      case 'w': notifyError();  break;    // w for wrong hole
      case 't': return false;  break;     // t for true
      case 'f': return false;  break;     // f for false
      default: return false; break;
    }
  }
}
