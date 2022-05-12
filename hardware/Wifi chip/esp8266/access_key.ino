
void accessKey(int keySlot, String errorMessage, String username, String bookingId, String keySlotPath) {
  
   if (keySlot == 0) {
    sendLog("Accessing key by booking failed, Key is in use acording to database.", username, bookingId, "");
    notifyError();
    return;
  }

  if (!isKeyInSlot(keySlot)) {
    sendLog("Accessing key by booking failed, Key is not found in the keybox", username, bookingId, "");
    notifyError();
    return;
  }

  notifySuccess();

  unlockDoor();

  //check if door is open

  if (!accessSlot(keySlot)) {
    sendLog("Accessing key by booking failed, Lock is jammed or the custummer is stupid", username, bookingId, "");
    notifyError();
    return;
  }

  if (!Firebase.setInt(fbdo, keySlotPath, 0)) {
    sendLog("Accessing key by booking failed, Failed to update database", username, bookingId, "");
    notifyError();
    return;
  }

  notifySuccess();
  sendLog("Key accessed.", username, bookingId, "");

  //Close door


}
