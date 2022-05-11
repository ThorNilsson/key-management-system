
String readRfidTag(int timeout) {
  String newTag = "NotAdded";
  bool notScanned = true;
  
  while (notScanned) {
    if (rfid.PICC_IsNewCardPresent()) {
      if (rfid.PICC_ReadCardSerial()) {
        for (byte i = 0; i < 4; i++) {
          tag += rfid.uid.uidByte[i];
        }
        notify();
        
#if DEBUG
        Serial.println(tag);
#endif
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
