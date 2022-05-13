
void getKeyByBooking() {
  printDebug("Get key by booking", "");

  if (!isWithinTimePeriod()) {
    sendLog("The time has run out.", "", "", "");
    notifyError();
    return;
  }

  String keyId =      Firebase.getString(fbdo, getKeyIdPath())  ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
  String bookingId =  Firebase.getString(fbdo, getBookingId())  ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
  String username =   Firebase.getString(fbdo, getNamePath())   ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
  int keySlot = Firebase.getInt(fbdo, getKeySlotPath(keyId)) ? fbdo.to<int>() : 0;

  accessKey(keySlot, "Accessing key by booking failed, ", username, "", bookingId,  getKeySlotPath(keyId));
}
