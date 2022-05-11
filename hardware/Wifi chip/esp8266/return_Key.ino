void returnKey(int keySlot) {
#if DEBUG
  Serial.println("Returning key: ");
  Serial.println(keySlot);
#endif

  String keySlotPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/keys/" + tag + "/keySlot";
  String preferredKeySlotPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/keys/" + tag + "/preferredKeySlot";
  int preferredKeySlot = Firebase.getString(fbdo, preferredKeySlotPath) ? fbdo.to<int>() : 0;

  if (isKeyInSlot(preferredKeySlot)) {
    sendLog("Returning key failed, perferd key slot is already occupied. ",  String(preferredKeySlot), tag, "");
    notifyError();
    return;
  }

  notifySuccess();
  unlockDoor();

  //Serial.println(
  if (!returnSlot(preferredKeySlot)) {
    sendLog("Returning key failed, the key was not inserted in a slot.",  String(preferredKeySlot), tag, "");
    notifyError();
    return;
  }

  if (!Firebase.setInt(fbdo, keySlotPath, preferredKeySlot)) {
    //; // ? "Key inserted at preferred Key Slot" : fbdo.errorReason().c_str());
    sendLog("Returning key failed, the key was inserted but lost connection to database.", String(preferredKeySlot), tag, "");
    //returnSlot(preferredKeySlot);
    return;
  }
  notifySuccess();
  sendLog("Key was returned.", "", "", "");
}
