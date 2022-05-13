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

  printDebug("The KeyId: ", keyId);
  printDebug("The Booking ID: ", bookingId);
  printDebug("The Username: ", username);
  printDebug("The Key slot: ", String(keySlot));

  String printMessage = username + " tries to access key " + keySlot + ", id: " + keyId + ", Booking: " + bookingId;
  printDebug(printMessage, "");

  accessKey(keySlot, "Accessing key by booking failed", username, bookingId, getKeySlotPath(keyId));
}
