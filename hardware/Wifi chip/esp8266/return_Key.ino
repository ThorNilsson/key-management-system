void returnKey(int keySlot) {
  printDebug("Returning key: ", String(keySlot));

  String keySlotPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/keys/" + tag + "/keySlot";
  String preferredKeySlotPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/keys/" + tag + "/preferredKeySlot";
  int preferredKeySlot = Firebase.getString(fbdo, preferredKeySlotPath) ? fbdo.to<int>() : 0;

  unsigned long initialTime = millis();
  bool isKeyPresentInSlot = isKeyInSlot(preferredKeySlot);

  if (isKeyPresentInSlot) {
    sendLog("Returning key failed, perferd key slot is already occupied. ",  String(preferredKeySlot), tag, "");
    notifyError();
    return;
  }

  if ( millis() - initialTime > 4000) {
    sendLog("Returning key failed, took to long time to see if key is in slot. ",  String(preferredKeySlot), tag, "");
    notifyError();
    return;
  }

  notifySuccess();
  unlockDoor();

  //check if door is open

  if (!returnSlot(preferredKeySlot)) {
    sendLog("Returning key failed, the key was not inserted in a slot.",  String(preferredKeySlot), tag, "");
    notifyError();
    return;
  }

  if (!Firebase.setInt(fbdo, keySlotPath, preferredKeySlot)) {
    sendLog("Returning key failed, the key was inserted but lost connection to database.", String(preferredKeySlot), tag, "");
    return;
  }

  notifySuccess();
  sendLog("Key was returned.", "", "", "");

  //Close door
}
