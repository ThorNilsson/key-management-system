void getUid() {

  printDebug("Server: ", Firebase.setString(fbdo, getStatusPath(), "wating for tag") ? "Wating for tag to be scanned" : fbdo.errorReason().c_str());
  unsigned long initialTime = millis();
  unsigned long interval = 100;

  while (!rfid.PICC_IsNewCardPresent()) {
    if (millis() - initialTime < interval) {
      LoadingLed();
      initialTime = millis();
    }
  }
  if (rfid.PICC_ReadCardSerial()) {
    for (byte i = 0; i < 4; i++) {
      tag += rfid.uid.uidByte[i];
    }
    notify();
    printDebug("Server: ", Firebase.setString(fbdo, getUidPath(), tag) ? "Tag sent to server" : fbdo.errorReason().c_str());
    printDebug("Server: ", Firebase.setString(fbdo, getStatusPath() /*F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/status")*/, "tag sent") ? "Status updated to 'sent'" : fbdo.errorReason().c_str());
    printDebug("Server: ", Firebase.setString(fbdo, getActionPath() /*F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/action")*/, "getKeyByBooking") ? "Action restored to 'openBooking'" : fbdo.errorReason().c_str());

    sendLog("Nfc id sent to database.", "", "", "");
    notifySuccess();
    clearLeds();
    tag = "";
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
}
