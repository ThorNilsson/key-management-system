//Unlocks the door that secures all the keys.
void unlockDoor2() {
  printDebug("Opening door. ", "");
  /*
     Implement check if door magnet is opened.
  */
  tone(buzzer_Pin, 1000);
  digitalWrite(lock_Pin, HIGH);
  delay(1000);
  noTone(buzzer_Pin);
  digitalWrite(lock_Pin, LOW);
  sendLog("Box door was unlocked.", "", "", "");
}

void unlockDoor() {
  printDebug("Opening door. ", "");
  unsigned long initialTime = millis();
  unsigned long timeoutSeconds = 10;

  while ( millis() - initialTime < timeoutSeconds * 1000) {
    greenLed();
    tone(buzzer_Pin, 1000);
    digitalWrite(lock_Pin, HIGH);
    delay(500);

    clearLeds();
    noTone(buzzer_Pin);
    digitalWrite(lock_Pin, LOW);
    delay(500);

    if (isDoorOpen()) {
      sendLog("Box door was unlocked.", "", "", "");
      return;
    }
  }
  sendLog("Box door was not opend.", "", "", "");
}

void closeDoor() {
  shouldCloseDoor = true;
  printDebug("Close door now", "");
  sendLog("Waiting for box to be closed", "", "", "");
}


//Checks if the door is open.
boolean isDoorOpen() {
  return digitalRead(sensor_Pin);
}

//Checks if front button in the ksy box is pressed.
boolean isOpenButtonPressed() {
  return analogRead(button_Pin) > 300;
}
