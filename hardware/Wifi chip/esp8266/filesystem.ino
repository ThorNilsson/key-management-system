// Adds the master key to access the wifi settings without password if not already added.
void checkMastertagTag() {
  if (!strcmp(masterTag, "NotAdded") == 0) {
    printDebug("A masterTag has already been generated: ", masterTag);
    return;
  }

  printDebug("Adding master tag", "");

  char newTag[NVM_MAX_LENZ];

  notify();
  notify();
  notify();
  notify();
  notify();

  String newTagS = waitForRFID(100);
  if (newTagS.equals("NotAdded")) {
    printDebug("Failed o add master tag ", wifiPass);
    return;
  }
  newTagS.toCharArray(newTag, NVM_MAX_LENZ);
  nvm.put("masterTag", newTag);
  nvm.get("masterTag", masterTag);

  notifySuccess();
}


void checkWifiPass() {
  char newWifiPass[NVM_MAX_LENZ];

  if (!strcmp(wifiPass, "NotAdded") == 0) {
    printDebug("A password has already been generated: ", wifiPass);
    return;
  }

  printDebug("Generating wifi password. ", "");
  generateId().toCharArray(newWifiPass, NVM_MAX_LENZ);

  nvm.put("wifiPass", newWifiPass);
  nvm.get("wifiPass", wifiPass);

  notifySuccess();
  printDebug("Wifi pass has been added: ", wifiPass);
}


void checkKeyboxId() {
  char newKeyboxId[NVM_MAX_LENZ];

  String id = "dkgC3kfhLpkKBysY_C-9";
  id.toCharArray(newKeyboxId, NVM_MAX_LENZ);

  nvm.put("keyboxId", newKeyboxId);
  nvm.get("keyboxId", keyboxId);

  if (!strcmp(keyboxId, "NotAdded") == 0) {
    printDebug("A keybox Id has already been generated: ", keyboxId);
    return;
  }

  printDebug("Generating keybox Id.", "");
  generateId().toCharArray(newKeyboxId, NVM_MAX_LENZ);

  nvm.put("keyboxId", newKeyboxId);
  nvm.get("keyboxId", keyboxId);

  printDebug("Keybox id has been added. ", keyboxId);
  notifySuccess();
}
