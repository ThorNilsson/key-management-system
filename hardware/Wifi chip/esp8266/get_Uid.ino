void getUid() {
  printDebug("Server: ", Firebase.setString(fbdo, getStatusPath(), "wating for tag") ? "Wating for tag to be scanned" : fbdo.errorReason().c_str());
  unsigned long initialTime = millis();
  unsigned long interval = 100;

  String scannedTag = waitForRFID(60);

  if(scannedTag.equals("NotAdded")){
    printDebug("Server: ", Firebase.setString(fbdo, getStatusPath(), "error") ? "Error sending tag not scanned error" : fbdo.errorReason().c_str());
    sendLog("Nfc id not sent to database. Timed out.", "", "", "");
  }

  printDebug("Server: ", Firebase.setString(fbdo, getUidPath(), scannedTag) ? "Tag sent to server" : fbdo.errorReason().c_str());
  printDebug("Server: ", Firebase.setString(fbdo, getStatusPath(), "tag sent") ? "Status updated to 'sent'" : fbdo.errorReason().c_str());
  printDebug("Server: ", Firebase.setString(fbdo, getActionPath(), "getKeyByBooking") ? "Action restored to 'openBooking'" : fbdo.errorReason().c_str());

  sendLog("Nfc id sent to database.", "", "", "");
  notifySuccess();
  clearLeds();
}
