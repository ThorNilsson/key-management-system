/*
 * Makes short sound to notify to the user that something has happend.
 */
void notify() {
  //digitalWrite(greenLedPin, HIGH);
  tone(buzzer_Pin, 800);
  delay(200);
  noTone(buzzer_Pin);
  // digitalWrite(greenLedPin, LOW);
}

/*
 * Makes a success sound to notify to the user that the process succeded.
 */
void notifySuccess() {
  // digitalWrite(greenLedPin, HIGH);
  tone(buzzer_Pin, 800);
  delay(200);
  tone(buzzer_Pin, 1000);
  delay(200);
  tone(buzzer_Pin, 1300);
  delay(200);
  noTone(buzzer_Pin);
  //digitalWrite(greenLedPin, LOW);
}

/*
 * Makes a error sound to notify to the user that an error occured.
 */
void notifyError() {
  //digitalWrite(redLedPin, HIGH);
  tone(buzzer_Pin, 400);
  delay(200);
  tone(buzzer_Pin, 300);
  delay(1000);
  noTone(buzzer_Pin);
  //digitalWrite(redLedPin, LOW);
}
