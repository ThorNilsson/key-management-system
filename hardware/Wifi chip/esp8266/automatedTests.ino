boolean testInit() {
  printDebug("Test Array Leds: ", testArrayLeds());

}

bool testArrayLeds() {
  for (int i = 1; i <= 8; i++) {
    if (!ledSlot(int slot))
      return 0;
  }
  return 1;
}

bool testIsKeyInSlot() {
  for (int i = 1; i <= 8; i++) {
    if (!isKeyInSlot(int slot))
      return 0;
  }
  return 1;
}
