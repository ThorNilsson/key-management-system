/*
 * Unlocks the door that secures all the keys.
 */
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
 * Checks if the door is open.
 */
boolean isDoorOpen() {
  return digitalRead(sensor_Pin);
}

/*
 * Checks if front button in the ksy box is pressed.
 */
boolean isOpenButtonPressed() {
  return analogRead(button_Pin) > 300;
}
