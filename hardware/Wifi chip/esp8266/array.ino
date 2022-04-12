/*
  unlock 2 - unlocks the specified key
  status 3 - gets the status of key in lock

  stat 4
  ledg 1
  ledr 3
*/

boolean unlockSlot(int slot) {
  String command = "unlock " + slot;
  //KeyArray.print(command);
  //String result = KeyArray.read();
  //return result.equls("ok");
}

boolean closeSlot(int slot) {

  String command = "lock " + slot;
  //KeyArray.print(command);

  return digitalRead(sensor_Pin);
}
boolean isKeyInSlot(int slot) {
  String command = "status " + slot;
  //KeyArray.print(command);
  //String readString;
  //while (Serial.available()) {
  //  delay(3);  //delay to allow buffer to fill
  //  if (Serial.available() > 0) {
  //   char c = Serial.read();  //gets one byte from serial buffer
  //  readString += c; //makes the string readString
  // }
  // }
  //String result = KeyArray.read();
  return true;
  //return result.equls("ok true");
}
