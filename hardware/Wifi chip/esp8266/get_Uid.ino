void getUid() {
  Serial.println(Firebase.setString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/status"), "wating for tag") ? "Wating for tag to be scanned" : fbdo.errorReason().c_str());
  bool notScanned = true;
  while (notScanned) {
    if (rfid.PICC_IsNewCardPresent()) {
      if (rfid.PICC_ReadCardSerial()) {
        for (byte i = 0; i < 4; i++) {
          tag += rfid.uid.uidByte[i];
        }
        notify();
        Serial.println(tag);
        Serial.println(Firebase.setString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/uid"), tag) ? "Tag sent to server" : fbdo.errorReason().c_str());
        Serial.println(Firebase.setString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/status"), "tag sent") ? "Status updated to sent" : fbdo.errorReason().c_str());
        Serial.println(Firebase.setString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/action"), "getKeyByBooking") ? "Action restored to openBooking" : fbdo.errorReason().c_str());
        sendLog("Nfc id sent to database.", "", "", "");
        notifySuccess();
        notScanned = false;
        tag = "";
        rfid.PICC_HaltA();
        rfid.PCD_StopCrypto1();
      }
    }
  }
}
