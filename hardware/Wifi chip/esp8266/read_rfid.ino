

void checkMastertagTag() {
  char newTag[NVM_MAX_LENZ];

  // is master tag added??
  if (strcmp(masterTag, "NotAdded") == 0) {
    Serial.println("Adding master tag");
    notify();
    notify();
    notify();
    notify();
    notify();
    String newTagS = readRfidTag(100);

    newTagS.toCharArray(newTag, NVM_MAX_LENZ);
    nvm.put("masterTag", newTag);
    nvm.get("masterTag", masterTag);
    Serial.print("Master tag is added: ");
    Serial.println(masterTag);
  } else {
    Serial.print("Master tag is already added: ");
    Serial.println(masterTag);
  }
}



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
