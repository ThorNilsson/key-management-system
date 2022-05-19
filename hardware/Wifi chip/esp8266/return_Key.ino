void returnKey(int keySlot, String keyId) {
  printDebug("Returning key: ", String(keySlot));
  
  int preferredKeySlot = Firebase.getString(fbdo, getPreferredKeySlotPath(keyId)) ? fbdo.to<int>() : 0;

  if (preferredKeySlot == 0) {
    sendLog("Returning key failed, perferd key slot is 0 ",  String(preferredKeySlot), keyId, "");
    notifyError();
    return;
  }

  unsigned long initialTime = millis();
  bool isKeyPresentInSlot = isKeyInSlot(preferredKeySlot);

  if (isKeyPresentInSlot) {
    sendLog("Returning key failed, perferd key slot is already occupied. ",  String(preferredKeySlot), keyId, "");
    notifyError();
    return;
  }

  if ( millis() - initialTime > 4000) {
    sendLog("Returning key failed, took to long time to see if key is in slot. ",  String(preferredKeySlot), keyId, "");
    notifyError();
    return;
  }

  notifySuccess();
  unlockDoor();

  //check if door is open

  if (!returnSlot(preferredKeySlot)) {
    sendLog("Returning key failed, the key was not inserted in a slot.",  String(preferredKeySlot), keyId, "");
    notifyError();
    return;
  }

  if (!Firebase.setInt(fbdo, getKeySlotPath(keyId), preferredKeySlot)) {
    sendLog("Returning key failed, the key was inserted but lost connection to database.", String(preferredKeySlot), tag, "");
    return;
  }

  notifySuccess();
  sendLog("Key was returned.", "", "", "");

  closeDoor();
}
