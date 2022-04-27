void getKeyByBooking() {
  
  if (isWithinTimePeriod()) {
    String keyId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/keyId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
    String bookingId = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/bookingId")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();
    String username = Firebase.getString(fbdo, F("/keyboxes/dkgC3kfhLpkKBysY_C-9/accessingBooking/name")) ? String(fbdo.to<String>()).c_str() : fbdo.errorReason().c_str();

    String keySlotPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/keys/" + keyId + "/keySlot";
    int keySlot = Firebase.getInt(fbdo, keySlotPath) ? fbdo.to<int>() : 0;

    String printMessage = username + " tries to access key " + keySlot + ", id: " + keyId + ", Booking: " + bookingId;
    Serial.println(printMessage);

    if (keySlot != 0) {
      if (isKeyInSlot(keySlot)) {
        notifySuccess();
        //unlockDoor();
        //unlockKey();

        Serial.println(Firebase.setInt(fbdo, keySlotPath, 0) ? "Key slot set to 0" : fbdo.errorReason().c_str());
        //closeDoor()

      } else {
        sendLog("Get key failed, Key is not found in key box", username, bookingId, "");
        notifyError();
      }
    } else {
      sendLog("Get key failed, Key is in use acording to database", username, bookingId, "");
      notifyError();
    }
  } else {
    sendLog("Someone tried to open the box without access", "", "", "");
    notifyError();
  }
}
