
String readRfidTag(int timeout) {
  Serial.println("Scan the tag you want to be the master RFID tag");
  String newTag = "NotAdded";
  bool notScanned = true;
  while (notScanned) {
    if (rfid.PICC_IsNewCardPresent()) {
      if (rfid.PICC_ReadCardSerial()) {
        for (byte i = 0; i < 4; i++) {
          tag += rfid.uid.uidByte[i];
        }
        notify();
        Serial.println(tag);
        newTag = tag;

        notScanned = false;
        tag = "";
        rfid.PICC_HaltA();
        rfid.PCD_StopCrypto1();
      }
    }
  }
  return newTag;
}
