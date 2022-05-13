
void accessKey(int keySlot, String errorMessage, String username, String userId, String bookingId, String keySlotPath) {
  printDebug("The Key slot: ", String(keySlot));
  printDebug("The Error message: ", errorMessage);
  printDebug("The Username: ", username);
  printDebug("The User ID: ", userId);
  printDebug("The Booking ID: ", bookingId);
  printDebug("The Key Slot path ", keySlotPath);

  if (keySlot == 0) {
    sendLog(errorMessage + "Key is in use acording to database.", username, bookingId, userId);
    notifyError();
    return;
  }

  if (!isKeyInSlot(keySlot)) {
    sendLog(errorMessage + "Key is not found in the keybox", username, bookingId, userId);
    notifyError();
    return;
  }

  notifySuccess();

  unlockDoor();

  //check if door is open

  if (!accessSlot(keySlot)) {
    sendLog(errorMessage + "Lock is jammed or the custummer is stupid", username, bookingId, userId);
    notifyError();
    return;
  }

  if (!Firebase.setInt(fbdo, keySlotPath, 0)) {
    sendLog( errorMessage + "Failed to update database", username, bookingId, userId);
    notifyError();
    return;
  }

  notifySuccess();
  sendLog("Key accessed.", username, bookingId, userId);

  //Close door


}
