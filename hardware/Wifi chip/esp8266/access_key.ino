
void accessKey(int keySlot, String errorMessage, String username, String bookingId) {
  
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

/*
 * 
  
#if DEBUG
  Serial.println("Get key by nfc access.");
#endif
  String username = "thor nilsson";
  String bookingId = "ushd8d";

  sendLog("Box opened by nfc.", "", "", "");
  notify();

  unsigned long initialTime = millis();
  unsigned long timeoutSeconds = 10;

  int keySlot = 1;
  boolean selectingSlot = true;

  while (selectingSlot) {
    if (isOpenButtonPressed()) {
      notify();
      if (isOpenButtonPressed()) {
        selectingSlot = false;
      }
      keySlot = getNextSlotWithKey(keySlot);
      ledSlot(keySlot);
      notify();
    }
  }
   while ( millis() - initialTime < timeoutSeconds * 1000) {
    isKeyInSlot();
  }
   



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
 */
