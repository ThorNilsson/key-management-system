
void getKeyByAdmin() {
#if DEBUG
  Serial.println("OPEN ADMIN");
#endif
  String keyId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/keyId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
  String userId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/userId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
  String username = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/name")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
#if DEBUG
  Serial.println(username);
#endif
  //sendLog("Box opened to return key.", "", "", "");
}

void getKeyByNfc() {
#if DEBUG
  Serial.println("Access Granted!");
#endif
  sendLog("Box opened by nfc.", "", "", "");
  notify();
}
