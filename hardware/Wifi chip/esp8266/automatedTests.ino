void testInit() {
  printDebug("Starting test percedure, make sure door is locked and all keys are in their slots: ", "");
  printDebug("Test, Unlock Door: ",     String(testUnlockDoor()));
  
  //Array
  printDebug("Test, Array Leds: ",      String(testArrayLeds()));
  printDebug("Test, Is Key In Slot: ",  String(testIsKeyInSlot()));
  printDebug("Test, Access Slots: ",    String(testAccessSlot()));
  printDebug("Test, Return Slots: ",    String(testReturnSlot()));

  //Door
  printDebug("Test, Unlock Door: ",     String(testUnlockDoor()));
  printDebug("Test, Button: ",    String(testButton())); 
}


bool testUnlockDoor() {
  unlockDoor();
  if (!isDoorOpen()) {
    notifyError();
    return false;
  }
  notifySuccess();
  return true;
}

bool testArrayLeds() {
  for (int slot = 1; slot <= 8; slot++) {
    if (!ledSlot(slot)) {
      notifyError();
      return 0;
    }
  }
  notifySuccess();
  return 1;
}

bool testIsKeyInSlot() {
  for (int slot = 1; slot <= 8; slot++) {
    if (!isKeyInSlot(slot)){
      notifyError();
      return 0;
    }
  }
  notifySuccess();
  return 1;
}

bool testAccessSlot() {
  for (int slot = 1; slot <= 8; slot++) {
    if (!accessSlot(slot)){
      notifyError();
      return 0;
    }
  }
  notifySuccess();
  return 1;
}

bool testReturnSlot() {
  for (int slot = 1; slot <= 8; slot++) {
    if (!returnSlot(slot)){
      notifyError();
      return 0;
    }
  }
  notifySuccess();
  return 1;
}

bool testButton() {
  if (!isOpenButtonPressed()) {
    notifyError();
    return false;
  }
  notifySuccess();
  return true;
}
