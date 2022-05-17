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
    def setUp(self):
        #self.driver = webdriver.Chrome()
        self.driver = webdriver.Chrome(ChromeDriverManager().install())


    # Test case method. It should always start with test_
    def tests(self):

        # call login function
        self.login_test()
        # call overview function
        #self.overview_test()

        # call new booking test function
        # self.new_booking_test()
        self.editbox_test()
        

    def login_test(self):
        # get driver
        driver = self.driver
        # get python.org using selenium
        driver.get("http://localhost:3000/")
        time.sleep(2)
        # locate element using name
        go_to_case = driver.find_element(by=By.XPATH, value="//*[@id='root']/main/div/form/div[4]/button").click()
        time.sleep(2)
        fill_in_email = driver.find_element(by=By.XPATH, value="//*[@id='email']").send_keys("mi.cho123@hotmail.com")
        fill_in_pass = driver.find_element(by=By.XPATH, value="//*[@id='password']").send_keys("abc123")

        press_login = driver.find_element(by=By.XPATH, value="//*[@id='root']/main/div/form/button").click()

        assert "SIGN UP" not in driver.page_source
        return

    def editbox_test(self):
        # get driver
        driver = self.driver
        time.sleep(2)
        driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[2]/div/div/div/div/div/div/button/span[1]/svg").click()
        time.sleep(2)
        driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/button[2]").click()
        time.sleep(2)
        driver.find_element(by=By.XPATH, value="/html/body/div[5]/div[3]/div/div[1]/div[1]/div/input").send_keys(Keys.CONTROL + 'a' + Keys.BACK_SPACE)
        driver.find_element(by=By.XPATH, value="/html/body/div[5]/div[3]/div/div[1]/div[1]/div/input").send_keys("Lodg")
        time.sleep(2)
        driver.find_element(by=By.XPATH, value="/html/body/div[1]/div/div[2]/div/div[1]/div[2]/div/button[2]").click()
        # get python.org using selenium
        #driver.get("http://localhost:3000/overview")


    def overview_test(self):
        # get driver
        driver = self.driver
        # get python.org using selenium
        #driver.get("http://localhost:3000/overview")

        time.sleep(2)
        # press_visit //*[@id="root"]/div/div[2]/div/div/div/div/div/div/button
        press_visit = driver.find_element(by=By.XPATH, value="//*[@id='root']/div/div[2]/div/div/div/div/div/div/button").click()
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
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[4]/div/input").send_keys(Keys.CONTROL + 'a' + Keys.BACK_SPACE)
        time.sleep(2)

        change_checkin_time = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[4]/div/input").send_keys("10:00")
        time.sleep(2)

        #change check out time to 14:00 in //*[@id=":r6l:"]
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[5]/div/input").send_keys(Keys.CONTROL + 'a' + Keys.BACK_SPACE)
        time.sleep(2)

        change_time_out = driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[5]/div/input").send_keys("14:00")
        time.sleep(2)

        #click on /html/body/div[3]/div[3]/div/div/div/div[6] 
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[6]").click()
        time.sleep(2)

        #click /html/body/div[3]/div[3]/div/div/div/div[7]/button
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[2]/button").click()
        time.sleep(2)

        assert "Overview" in driver.page_source
        return

    def new_booking_test(self):
        #get driver
        driver = self.driver

        time.sleep(2)
        # Enter Keybox
        press_visit = driver.find_element(by=By.XPATH, value="//*[@id='root']/div/div[2]/div/div/div/div/div/div/button").click()
        time.sleep(2)

        # Press new_booking //*[@id="root"]/div/div[2]/div/div[1]/div[2]/div/button[1]
        press_new_booking = driver.find_element(by=By.XPATH, value="//*[@id='root']/div/div[2]/div/div[1]/div[2]/div/button[1]").click()
        time.sleep(2)

        # enter "MichellTest" in /html/body/div[3]/div[3]/div/div[1]/div[1]/div[1]/div/input
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[1]/div[1]/div/input").send_keys("Michell Test")
        time.sleep(2)


        # enter_email in /html/body/div[3]/div[3]/div/div[1]/div[1]/div[2]/div/input to "mi.cho123@hotmail.com"
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[1]/div[2]/div/input").send_keys('mi.cho123@hotmail.com')
        time.sleep(1)

        # enter_guest_message /html/body/div[3]/div[3]/div/div[1]/div[1]/div[3]/div "Welcome to KMS"
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[1]/div[3]/div/textarea[1]").send_keys("Welcome to KMS")
        time.sleep(1)

        # press /html/body/div[3]/div[3]/div/div[1]/div[1]/div[4]/div/div
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[1]/div[4]/div/div").click()
        time.sleep(1)

        #press /html/body/div[4]/div[3]/ul/li[2]
        driver.find_element(by=By.XPATH, value="/html/body/div[4]/div[3]/ul/li[2]").click()
        time.sleep(1)
        
        # Clear chekin-time space
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[1]/div[5]/div[1]/div/input").send_keys(Keys.CONTROL + 'a' + Keys.BACK_SPACE)
        time.sleep(2)
        
        #enter checkin time in /html/body/div[3]/div[3]/div/div[1]/div[1]/div[5]/div[1]/div/input to 1100
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[1]/div[5]/div[1]/div/input").send_keys("1100")
        time.sleep(2)

        #Clear checkout time in /html/body/div[3]/div[3]/div/div[1]/div[1]/div[5]/div[2]/div/input
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[1]/div[5]/div[2]/div/input").send_keys(Keys.CONTROL + 'a' + Keys.BACK_SPACE)
        time.sleep(2)

        #enter checkout time in /html/body/div[3]/div[3]/div/div[1]/div[1]/div[5]/div[2]/div/input to 1400
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[1]/div[5]/div[2]/div/input").send_keys("1400")
        time.sleep(2)


        #press checking-in-date /html/body/div[3]/div[3]/div/div[1]/div[2]/div/div[2]/div[2]/div[2]/span/span[1]/select, select 18th of june
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[1]/div[2]/div/div[2]/div[2]/div[2]/span/span[1]/select/option[18]").click()

        # press confirm_booking /html/body/div[3]/div[3]/div/div[2]/button
        driver.find_element(by=By.XPATH, value="/html/body/div[3]/div[3]/div/div[2]/button").click()
        time.sleep(2)

        #Assert NEW BOOKING
        assert "NEW BOOKING" in driver.page_source

    # cleanup method called after every test performed
    def tearDown(self):
        self.driver.close()

# execute the script
if __name__ == "__main__":
    unittest.main()