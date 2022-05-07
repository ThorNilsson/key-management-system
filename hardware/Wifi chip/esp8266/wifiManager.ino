
void configureWifi() {
  notify();
  notify();

  if (!wm.startConfigPortal("KEY Managment System")) {
    Serial.println("failed to connect and hit timeout");
    delay(3000);
    ESP.restart(); //reset and try again, or maybe put it to deep sleep
    delay(5000);
  }
  sendLog("Wifi settings have been changed or viewed.", "MasterTag", "", "");
  //if you get here you have connected to the WiFi
  notifySuccess();
  Serial.println("connected...yeey :)");
  Serial.println(WiFi.localIP());

  Serial.println(kms_user.getValue());
  Serial.println(kms_pass.getValue());

  strcpy(userMail, kms_user.getValue());
  strcpy(userPass, kms_pass.getValue());

  nvm.put("userMail", userMail);
  nvm.put("userPass", userPass);
}
