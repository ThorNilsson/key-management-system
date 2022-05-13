//Unlocks the door that secures all the keys.
void unlockDoor() {
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

void closeDoor() {
  /*
     Implement check if door magnet is opened.
  */
  printDebug("Close door now", "");

  sendLog("Box door closed", "", "", "");
}


//Checks if the door is open.
boolean isDoorOpen() {
  return digitalRead(sensor_Pin);
}

//Checks if front button in the ksy box is pressed.
boolean isOpenButtonPressed() {
  return analogRead(button_Pin) > 300;
}
