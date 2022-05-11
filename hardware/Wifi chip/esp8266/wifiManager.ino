
void configureWifi() {
  notify();
  notify();

  if (!wm.startConfigPortal("KEY Managment System")) {
#if DEBUG
    Serial.println("failed to connect and hit timeout");
#endif
    delay(3000);
    ESP.restart(); //reset and try again, or maybe put it to deep sleep
    delay(5000);
  }
  sendLog("Wifi settings have been changed or viewed.", "MasterTag", "", "");
  //if you get here you have connected to the WiFi
  notifySuccess();
#if DEBUG
  Serial.println("connected...yeey :)");
  Serial.println(WiFi.localIP());
#endif

  //Serial.println(
  kms_user.getValue();
  //Serial.println(
  kms_pass.getValue();

  strcpy(userMail, kms_user.getValue());
  strcpy(userPass, kms_pass.getValue());

  nvm.put("userMail", userMail);
  nvm.put("userPass", userPass);
}
