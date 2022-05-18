
void getKeyByAdmin() {
  printDebug("Get key by admin", "");

  if (!isWithinTimePeriod()) {
    sendLog("The time has run out.", "", "", "");
    notifyError();
    return;
  }

  String keyId =  Firebase.getString(fbdo, getKeyIdPath()) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
  String userId = Firebase.getString(fbdo, getUserIdPath()) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
 
  if (!Firebase.getString(fbdo, getUserNamePath(userId))) {
    String errorMessage =  "The user do not have a admin account." + String(fbdo.errorReason().c_str());
    sendLog(errorMessage, "", "", userId);
    notifyError();
    return;
  }
  
  String username = String(fbdo.to<String>()).c_str();
  int keySlot = Firebase.getInt(fbdo, getKeySlotPath(keyId)) ? fbdo.to<int>() : 0;
  
  accessKey(keySlot, "Accessing key by admin failed, ", username, userId, "" , getKeySlotPath(keyId));
}
