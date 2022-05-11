void getKeyByBooking() {
  printDebug("Get key by booking", "");

  if (!isWithinTimePeriod()) {
    sendLog("The time has run out.", "", "", "");
    notifyError();
    return;
  }

  

  String keyId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/keyId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
  String bookingId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/bookingId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
  String username = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/name")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
  
  String keySlotPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/keys/" + keyId + "/keySlot";
  
  int keySlot = Firebase.getInt(fbdo, keySlotPath) ? fbdo.to<int>() : 0;

  String printMessage = username + " tries to access key " + keySlot + ", id: " + keyId + ", Booking: " + bookingId;
  printDebug(printMessage, "");

  accessKey(keySlot, "Accessing key by booking failed", username, bookingId);
}
