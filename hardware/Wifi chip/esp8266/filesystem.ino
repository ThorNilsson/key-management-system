void checkMastertagTag() {
  char newTag[NVM_MAX_LENZ];

  // is master tag added??
  if (strcmp(masterTag, "NotAdded") == 0) {
#if DEBUG
    Serial.println("Adding master tag");
#endif
    notify();
    notify();
    notify();
    notify();
    notify();
    String newTagS = readRfidTag(100);

    newTagS.toCharArray(newTag, NVM_MAX_LENZ);
    nvm.put("masterTag", newTag);
    nvm.get("masterTag", masterTag);

#if DEBUG
    Serial.print("Master tag is added: ");
    Serial.println(masterTag);
#endif
  } else {
#if DEBUG
    Serial.print("Master tag is already added: ");
    Serial.println(masterTag);
#endif
  }
}

void checkWifiPass() {
  char newWifiPass[NVM_MAX_LENZ];

  if (strcmp(wifiPass, "NotAdded") == 0) {
#if DEBUG
    Serial.println("Generating wifi password");
#endif
    notifySuccess();

    String generatedId = generateId();
    generatedId.toCharArray(newWifiPass, NVM_MAX_LENZ);

    nvm.put("wifiPass", newWifiPass);
    nvm.get("wifiPass", wifiPass);
#if DEBUG
    Serial.print("Wifi pass has been added: ");
    Serial.println(wifiPass);
#endif
  } else {
#if DEBUG
    Serial.print("A password has already been generated: ");
    Serial.println(wifiPass);
#endif
  }
}

void checkKeyboxId() {
  char newKeyboxId[NVM_MAX_LENZ];

  if (strcmp(keyboxId, "NotAdded") == 0) {
#if DEBUG
    Serial.println("Generating keybox Id");
#endif
    notifySuccess();

    //String generatedId = generateId();
    generateId().toCharArray(newKeyboxId, NVM_MAX_LENZ);

    nvm.put("keyboxId", newKeyboxId);
    nvm.get("keyboxId", keyboxId);
#if DEBUG
    Serial.print("Keybox id has been added: ");
    Serial.println(keyboxId);
#endif
  } else {
#if DEBUG
    Serial.print("A keybox Id has already been generated: ");
    Serial.println(keyboxId);
#endif
  }
}
