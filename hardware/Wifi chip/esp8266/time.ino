/*
   Checks if current time is in the time period provided by the accessing booking object on database.
*/
bool isWithinTimePeriod() {
  int requestedTime = Firebase.getInt(fbdo, getAccessRequestedPath()) ? fbdo.to<int>() : 0;
  int expiredTime   = Firebase.getInt(fbdo, getAccessExpiredPath()) ? fbdo.to<int>() : 0;
  getNTPtime(10);
  return now > requestedTime && now < expiredTime;
}

int getTimestamp(){
  return lastNTPtime +( millis()/1000);
}

/*
   Gets the current time from time server and updates now- variable to correct time.
*/
bool getNTPtime(int sec) {
  {
    uint32_t start = millis();
    do {
      time(&now);
      localtime_r(&now, &timeinfo);
#if DEBUG
      Serial.print(".");
#endif
      delay(10);
    } while (((millis() - start) <= (1000 * sec)) && (timeinfo.tm_year < (2016 - 1900)));
    if (timeinfo.tm_year <= (2016 - 1900)) return false;  // the NTP call was not successful
#if DEBUG
    Serial.print("now ");  Serial.println(now);
#endif
    char time_output[30];
    strftime(time_output, 30, "%a  %d-%m-%y %T", localtime(&now));
#if DEBUG
    Serial.println(time_output);
    Serial.println();
#endif
  }
  return true;
}

/*
   Shows the current time.
*/
void showTime(tm localTime) {
#if DEBUG
  Serial.print(localTime.tm_mday);
  Serial.print('/');
  Serial.print(localTime.tm_mon + 1);
  Serial.print('/');
  Serial.print(localTime.tm_year - 100);
  Serial.print('-');
  Serial.print(localTime.tm_hour);
  Serial.print(':');
  Serial.print(localTime.tm_min);
  Serial.print(':');
  Serial.print(localTime.tm_sec);
  Serial.println();
#endif
  //Serial.print(" Day of Week ");
  //if (localTime.tm_wday == 0)   Serial.println(7);
  //else Serial.println(localTime.tm_wday);
}
