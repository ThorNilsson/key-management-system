String checkRFID() {
  String newTag = "NotAdded";

  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    for (byte i = 0; i < 4; i++) {
      tag += rfid.uid.uidByte[i];
    }
    notify();
    printDebug("A tag has been scanned: ", tag);
    newTag = tag;
    tag = "";
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
  return newTag;
}

String waitForRFID(int timeout) {
  String newTag = "NotAdded";
  unsigned long initialTimeoutTime = millis();
  unsigned long initialTime = millis();
  unsigned long interval = 100;

  while (initialTimeoutTime + (timeout * 1000) >  millis())
  {
    newTag = checkRFID();
    if (!newTag.equals("NotAdded")) {
      return newTag;
    }

    if (millis() - initialTime < interval) {
      LoadingLed();
      initialTime = millis();
    }
  }
  return newTag;
}
  
