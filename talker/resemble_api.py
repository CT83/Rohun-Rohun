import os
import time

from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait


class Resemble():

    def __init__(self, username, password, proj_url):
        self.proj_url = proj_url
        self.password = password
        self.username = username
        options = webdriver.ChromeOptions()
        options.add_argument("window-size=1200,2000")
        self.driver = webdriver.Chrome('./chromedriver', options=options)
        self._login()
        self._setup()

    def _setup(self):
        self.driver.get(self.proj_url)
        txt_box = '/html/body/div[2]/div/div/div/div[2]/div/div[1]/div[1]/div[2]/div[3]/div/div/div[2]/div[2]/div[2]/span'

        element_present = EC.presence_of_element_located((By.XPATH, txt_box))
        WebDriverWait(self.driver, 15).until(element_present)

    def _login(self):
        self.driver.get("https://app.resemble.ai/")
        path_login = "/html/body/div/div/div/div/div[2]/div/div/div/div/form/div/div/div[1]/input"
        path_pass = "/html/body/div/div/div/div/div[2]/div/div/div/div/form/div/div/div[2]/input"
        path_btn = "/html/body/div/div/div/div/div[2]/div/div/div/div/form/div/div/div[3]/input"
        self.driver.find_element(By.XPATH, path_login).send_keys(self.username)
        self.driver.find_element(By.XPATH, path_pass).send_keys(self.password)
        self.driver.find_element(By.XPATH, path_btn).click()

    def speak(self, text):
        txt_box = '/html/body/div[2]/div/div/div/div[2]/div/div[1]/div[1]/div[2]/div[3]/div/div/div[2]/div[2]/div[2]'
        play_btn = '/html/body/div[2]/div/div/div/div[2]/div/div[1]/div[1]/div[2]/div[3]/div/div/div[2]/div[3]/button'

        self.driver.find_element(By.XPATH, txt_box).click()
        self.driver.find_element(By.XPATH, txt_box).click()

        self.driver.find_element(By.XPATH, txt_box).send_keys(Keys.CONTROL + Keys.END)
        self.driver.find_element(By.XPATH, txt_box).send_keys(Keys.CONTROL + Keys.SHIFT + Keys.HOME)
        time.sleep(0.3)
        actions = ActionChains(self.driver)
        actions.send_keys(Keys.DELETE)
        actions.perform()

        clrd_txt_box = '/html/body/div[2]/div/div/div/div[2]/div/div[1]/div[1]/div[2]/div[3]/div/div'
        self.driver.find_element(By.XPATH, clrd_txt_box).send_keys(text)
        self.driver.find_element(By.XPATH, play_btn).click()  # click play


if __name__ == "__main__":
    url = "https://app.resemble.ai/projects/b861ed59-default/clips/bee57cd3-/edit"
    res = Resemble(os.environ['RES_AI_EMAIL'], os.environ['RES_AI_PASS'], proj_url=url)
    res.speak("Yes, we can hear you")
    time.sleep(10)
    res.speak("Yeah, we can hear you")
