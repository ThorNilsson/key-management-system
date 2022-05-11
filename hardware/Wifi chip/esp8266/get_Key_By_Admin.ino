
void getKeyByAdmin() {
  printDebug("Get key by admin", "");

  String keyId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/keyId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
  String userId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/userId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
  String username = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/name")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();

  //sendLog("Box opened to return key.", "", "", "");
}
