/*
   Sends a new log to the database.
*/
void sendLog(String message, String userName, String bookingId, String userId) {
  String id = generateId();
  String logStr = "LOG: " + message + ", By " + userName + ", At: " + now + ", Door: " + isDoorOpen() + ", Booking: " + bookingId  + ", User:  " + userId;
  printDebug(logStr, "");

  String logMessagePath = "/keyboxes/dkgC3kfhLpkKBysY_C-9/log/" + id;

  FirebaseJson json;
  json.set("isOpen", isDoorOpen());
  json.set("message", message);
  json.set("name", userName);
  json.set("time", now);
  json.set("bookingId", bookingId);
  json.set("userId", userId);

  printDebug("Server: ", Firebase.set(fbdo, logMessagePath, json) ? "Log deliverd." : fbdo.errorReason().c_str());
}

void printDebug(String message, String variable) {
#if DEBUG
  Serial.print(message);
  Serial.println(variable);
#endif
}

/*
   Generates a random id that can be used when inserting new data in the database
*/
String generateId() {
  byte randomValue;
  char temp[5];
  char letter;
  char msg[50];     // Keep in mind SRAM limits
  int numBytes = 20;
  int i;
  int charsRead;
  memset(msg, 0, sizeof(msg));
  for (i = 0; i < numBytes; i++) {
    randomValue = random(0, 37);
    msg[i] = randomValue + 'a';
    if (randomValue > 26) {
      msg[i] = (randomValue - 26) + '0';
    }
  }
  return msg;
}
