# import all required frameworks
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
# inherit TestCase Class and create a new test class
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
        self.overview_test()
        

    def login_test(self):
        # get driver
        driver = self.driver
        # get python.org using selenium
        driver.get("http://localhost:3000/")
        time.sleep(2)
        # locate element using name
        go_to_case = driver.find_element_by_xpath("//*[@id='root']/main/div/form/div[4]/button").click()
        time.sleep(2)
        fill_in_email = driver.find_element_by_xpath("//*[@id='email']").send_keys("mi.cho123@hotmail.com")
        fill_in_pass = driver.find_element_by_xpath("//*[@id='password']").send_keys("abc123")

        press_login = driver.find_element_by_xpath("//*[@id='root']/main/div/form/button").click()

        assert "SIGN UP" not in driver.page_source
        return


    def overview_test(self):
        # get driver
        driver = self.driver
        # get python.org using selenium
        #driver.get("http://localhost:3000/overview")

        # wait = WebDriverWait(driver, 10)
        # wait.until(EC.visibility_of_element_located((By.XPATH,"//*[@id='root']/div/div[2]/div/div[3]/div/div/div[6]/button" )))


        time.sleep(2)
        # press_visit //*[@id="root"]/div/div[2]/div/div/div/div/div/div/button
        press_visit = driver.find_element_by_xpath("//*[@id='root']/div/div[2]/div/div/div/div/div/div/button").click()
        time.sleep(2)
        # press //*[@id="root"]/div/div[2]/div/div[3]/div/div/div[6]/button
        press_add_case_2 = driver.find_element_by_xpath("//*[@id='root']/div/div[2]/div/div[3]/div/div/div[6]/button").click()
        time.sleep(2)

        # change text in //*[@id=":r6f:"] to "Worst view ever"
        change_text = driver.find_element_by_xpath("//*[@id=':r6f:']").send_keys("Worst view ever")

        # change check in time to 13:37 in //*[@id=":r6l:"]
        change_time = driver.find_element_by_xpath("//*[@id=':r6l:']").send_keys("11:00")

        #change check out time to 14:00 in //*[@id=":r6l:"]
        change_time_out = driver.find_element_by_xpath("//*[@id=':r6m:']").send_keys("14:00")
        time.sleep(2)
        assert "Overview" in driver.page_source



    # cleanup method called after every test performed
    def tearDown(self):
        self.driver.close()

# execute the script
if __name__ == "__main__":
    unittest.main()