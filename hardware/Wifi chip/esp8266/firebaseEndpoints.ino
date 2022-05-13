/*
   Get paths for values in the accessingBooking object.
*/
String getActionPath() {
  String path = "/keyboxes/" + String(keyboxId) + "/accessingBooking/action";
  return path;
}

String getBookingId() {
  String path = "/keyboxes/" + String(keyboxId) + "/accessingBooking/bookingId";
  return path;
}

String getUserIdPath() {
  String path = "/keyboxes/" + String(keyboxId) + "/accessingBooking/userId";
  return path;
}

String getAccessRequestedPath() {
  String path = "/keyboxes/" + String(keyboxId) + "/accessingBooking/accessRequested";
  return path;
}

String getAccessExpiredPath() {
  String path = "/keyboxes/" + String(keyboxId) + "/accessingBooking/accessExpired";
  return path;
}

String getNamePath() {
  String path = "/keyboxes/" + String(keyboxId) + "/accessingBooking/name";
  return path;
}

String getKeyIdPath() {
  String path = "/keyboxes/" + String(keyboxId) + "/accessingBooking/keyId";
  return path;
}

String getUidPath() {
  String path = "/keyboxes/" + String(keyboxId) + "/accessingBooking/uid";
  return path;
}

String getStatusPath() {
  String path = "/keyboxes/" + String(keyboxId) + "/accessingBooking/status";
  return path;
}



/*
   Get other paths
*/
String getKeySlotPath(String keyId) {
  String path = "/keyboxes/" + String(keyboxId) + "/keys/" + keyId + "/keySlot";
  return path;
}

String getPreferredKeySlotPath(String keyId) {
  String path = "/keyboxes/" + String(keyboxId) + "/keys/" + keyId + "/preferredKeySlot";
  return path;
}

String getUserNamePath(String userId) {
  String path = "/users/" + userId + "/username";
  return path;
}

String getLogPath(String id) {
  String path = "/keyboxes/" + String(keyboxId) + "/log/" + id;
  return path;
}
