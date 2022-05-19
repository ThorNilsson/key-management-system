# import all required frameworks
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import Select
# inherit TestCase Class and create a new test class


#  ! ! ! HOW TO TEST! ! !
# Vid testning, installera Google Chrome driver
# https://chromedriver.chromium.org/downloads
# Checka om ni har python genom att skriva py i CMD, 
# installera om needed.
# pip install selenium (i terminalen)
# pip install webdriver-manager 
# Skapa tester som egna funktioner i denna tests.py fil.
# Vid testning behövs att npm start är running i en annan
# terminal. När det är gjort så kan ni köra testen. 
# (I.E. PATH/admin-panel/tests py tests.py)


class KMS_test_class(unittest.TestCase):

    # initialization of webdriver
    # logs into the admin panel as a setup before each admin-panel test start
    def setUp(self):
        #self.driver = webdriver.Chrome()
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
        # get driver
        driver = self.driver
        # get python.org using selenium
        driver.get("https://admirable-zuccutto-d23c1b.netlify.app/")
        time.sleep(2)
        # locate element using name
        go_to_case = driver.find_element(by=By.XPATH, value="//*[@id='root']/main/div/form/div[4]/button").click()
        time.sleep(1)
        fill_in_email = driver.find_element(by=By.XPATH, value="//*[@id='email']").send_keys("mi.cho123@hotmail.com")
        fill_in_pass = driver.find_element(by=By.XPATH, value="//*[@id='password']").send_keys("abc123")
        press_login = driver.find_element(by=By.XPATH, value="//*[@id='root']/main/div/form/button").click()
        time.sleep(2)
        # press_visit //*[@id="root"]/div/div[2]/div/div/div/div/div/div/button
        press_visit = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[2]/div/div[1]/div/div/button/div[2]/a").click()

    def test_editbox(self):
        # get driver
        driver = self.driver
        time.sleep(2)
        edit_box = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/button[2]").click()
        time.sleep(2)
        name_field = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[1]/div/input")
        time.sleep(2)
        name_field.send_keys(Keys.CONTROL + 'a' + Keys.BACK_SPACE)
        time.sleep(2)
        name_field.send_keys("Apartment Uno")
        time.sleep(5)
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[2]/button").click()
        time.sleep(2)
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[2]/button[2]").click()
        time.sleep(2)
        assert "Apartment Uno" in driver.page_source

    def test_overview(self):
        # get driver
        driver = self.driver
        # get python.org using selenium
        #driver.get("http://localhost:3000/overview")
        time.sleep(2)
        # press //*[@id="root"]/div/div[2]/div/div[3]/div/div/div[6]/button
        press_add_case_2 = driver.find_element(by=By.XPATH, value="//*[@id='root']/div/div[2]/div/div[3]/div/div/div[6]/button").click()
        time.sleep(2)

        # press /html/body/div[3]/div[3]/div/div[2]/button[2]
        press_add_case_3 = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[2]/button[2]").click()
        time.sleep(2)

        #Clears text in element
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[2]/div/textarea[1]").send_keys(Keys.CONTROL + 'a' + Keys.BACK_SPACE)
        time.sleep(2)

        # change text in  /html/body/div[3]/div[3]/div/div/div/div[2]/div/input to "Worst view ever"
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[2]/div/textarea[1]").send_keys("Worst view in town")
        time.sleep(2)

        #change_checkin_time in /html/body/div[3]/div[3]/div/div/div/div[4]/div/input to 10:00
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[4]/div[1]/div/input").send_keys(Keys.CONTROL + 'a' + Keys.BACK_SPACE)
        time.sleep(2)

        change_checkin_time = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[4]/div[1]/div/input").send_keys("10:00")
        time.sleep(2)

        #change check out time to 14:00 in //*[@id=":r6l:"]
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[4]/div[2]/div/input").send_keys(Keys.CONTROL + 'a' + Keys.BACK_SPACE)
        time.sleep(2)

        change_time_out = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[4]/div[2]/div/input").send_keys("14:00")
        time.sleep(2)

        #click on /html/body/div[3]/div[3]/div/div/div/div[6]
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[5]/div[2]/canvas").click()
        time.sleep(2)

        #click /html/body/div[3]/div[3]/div/div/div/div[7]/button
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[2]/button").click()
        time.sleep(2)

        assert "Overview" in driver.page_source


    def test_new_booking_blocking_form_1(self):
        #get driver
        driver = self.driver

        # Press new_booking_button
        press_new_booking = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/button[1]").click()
        time.sleep(3)
        #press confirm_booking-button
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[2]/button").click()
        actualTitle = driver.title
        print("Current title of page " + actualTitle)
        #expectedTitle = "View bookings"
        expectedTitle = "New booking"
        print("Expected title " + expectedTitle)
        assert(expectedTitle == actualTitle)

    def test_new_booking_blocking_form_2(self):
        #get driver
        driver = self.driver

        # Press new_booking_button
        press_new_booking = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/button[1]").click()
        time.sleep(3)
        # enter test data into username form
        username_form = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[1]/div/input").send_keys("Testgrabben Testare")
        time.sleep(1)
        #press confirm_booking-button
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[2]/button").click()
        actualTitle = driver.title
        print("Current title of page " + actualTitle)
        #expectedTitle = "View bookings"
        expectedTitle = "New booking"
        print("Expected title " + expectedTitle)

        assert(expectedTitle == actualTitle)

    def test_new_booking_blocking_form_3(self):
        #get driver
        driver = self.driver

        # Press new_booking_button
        press_new_booking = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/button[1]").click()
        time.sleep(3)
        # enter test data into username form
        username_form = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[1]/div/input").send_keys("Testgrabben Testare")
        time.sleep(1)
        # enter_email in email form
        email_form = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[2]/div/input").send_keys("testmail@test123.com")
        time.sleep(1)
        #press confirm_booking-button
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[2]/button").click()
        actualTitle = driver.title
        print("Current title of page " + actualTitle)
        #expectedTitle = "View bookings"
        expectedTitle = "New booking"
        print("Expected title " + expectedTitle)

        assert(expectedTitle == actualTitle)

    def test_new_booking_blocking_form_4(self):
        #get driver
        driver = self.driver

        # Press new_booking_button
        press_new_booking = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/button[1]").click()
        time.sleep(3)
        # enter test data into username form
        username_form = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[1]/div/input").send_keys("Testgrabben Testare")
        time.sleep(1)
        # enter_email in email form
        email_form = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[2]/div/input").send_keys("testmail@test123.com")
        time.sleep(1)

        # enter_guest_message in form
        guest_message_form = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[3]/div/textarea[1]").send_keys("Yes this is the best room")
        time.sleep(1)
        #press confirm_booking-button
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[2]/button").click()
        actualTitle = driver.title
        print("Current title of page " + actualTitle)
        #expectedTitle = "View bookings"
        expectedTitle = "New booking"
        print("Expected title " + expectedTitle)

        assert(expectedTitle == actualTitle)

    def test_new_booking_blocking_form_final(self):
        #get driver
        driver = self.driver

        # Press new_booking_button
        press_new_booking = driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/button[1]").click()
        time.sleep(1)
        # enter test data into username form
        username_form = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[1]/div/input").send_keys("Testgrabben Testare")
        time.sleep(1)
        # enter_email in email form
        email_form = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[2]/div/input").send_keys("testmail@test123.com")
        time.sleep(1)

        # enter_guest_message in form
        guest_message_form = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[3]/div/textarea[1]").send_keys("Yes this is the best room")
        time.sleep(1)

        # press
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[4]/div/div").click()
        time.sleep(1)

        #press
        driver.find_element(by=By.XPATH, value="/html/body/div[4]/div[3]/ul/li[2]").click()
        time.sleep(1)

        # Clear checkin-timebox
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[5]/div[1]/div/input").send_keys(Keys.COMMAND + 'a' + Keys.BACK_SPACE)
        time.sleep(1)

        #enter checkin time
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[5]/div[1]/div/input").send_keys("1100")
        time.sleep(1)

        #Clear checkout timebox
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[5]/div[2]/div/input").send_keys(Keys.COMMAND + 'a' + Keys.BACK_SPACE)
        time.sleep(1)

        #enter checkout time
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[5]/div[2]/div/input").send_keys("1400")
        time.sleep(1)

        select = Select(driver.find_element_by_xpath("/html/body/div[3]/div[3]/div/div[1]/form/div[6]/div[2]/div[2]/div[2]/span/span[1]/select"))

        driver.find_element_by_xpath("/html/body/div[3]/div[3]/div/div[1]/form/div[6]/div[2]/div[2]/div[2]/span/span[1]/select").click()
        time.sleep(1)

        #Select by text "june"
        select.select_by_visible_text("June")
        time.sleep(1)

        #press day /html/body/div[3]/div[3]/div/div[1]/div[2]/div/div[2]/div[2]/div[3]/div[1]/div[3]/button[18]/span[2]
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/form/div[6]/div[2]/div[2]/div[3]/div[1]/div[3]/button[20]").click()
        time.sleep(1)

        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[2]/button").click()
        time.sleep(2)
        actualTitle = driver.title
        print("Current title of page " + actualTitle)
        expectedTitle = "View bookings"
        print("Expected title " + expectedTitle)

        assert(expectedTitle == actualTitle)


    # cleanup method called after every test performed
    def tearDown(self):
        self.driver.close()

# execute the script
if __name__ == "__main__":
    unittest.main()