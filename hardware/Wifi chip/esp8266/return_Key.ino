void returnKey(int keySlot) {
  String keySlotPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/keys/" + tag + "/keySlot";
  Serial.println("Returning key: ");
  Serial.println(keySlot);
  String preferredKeySlotPath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/keys/" + tag + "/preferredKeySlot";
  int preferredKeySlot = Firebase.getString(fbdo, preferredKeySlotPath) ? fbdo.to<int>() : 0;
  Serial.println(preferredKeySlot);
  notifySuccess();
  Serial.println(Firebase.setInt(fbdo, keySlotPath, preferredKeySlot) ? "Key inserted at preferred Key Slot" : fbdo.errorReason().c_str());
  sendLog("Box opened to return key.", "", "", "");
}
