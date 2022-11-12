# TO LAUNCH THE FLASK SERVER...
# ...execute the following on the command line:
# export FLASK_APP=tiktok
# flask run --host=0.0.0.0

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

import random
import json

from flask import Flask
from flask_cors import CORS
from flask import request

app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/index')
def response():
    PATH='./chromedriver.exe'
    
    url = request.args.get('url')
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(executable_path=PATH, chrome_options=chrome_options)
    
    driver.get(url)
    influencer_name = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div/div[2]/div/a[2]/span[1]')
    likes = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div/div[1]/div[3]/button[1]/strong')
    comments = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div/div[1]/div[3]/button[2]/strong')
    shares = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div/div[1]/div[3]/button[3]/strong')
    profile_picture_url = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div[1]/div[2]/div/a[1]/div/span/img').get_attribute("src")
    profile_url = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div[1]/div[2]/div/a[1]').get_attribute("href")
    date = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div[1]/div[2]/div/a[2]/span[2]/span[2]')
    
    views = 0
    
    for i in range(20):
        print('//*[@id="app"]/div[2]/div[2]/div/div[2]/div[2]/div/div[{i}]/div[2]/a')
        title_xpath = '//*[@id="app"]/div[2]/div[2]/div/div[2]/div[2]/div/div[' + i + ']/div[2]/a'
        element = driver.find_element(By.XPATH, title_xpath).get_attribute('title')
        if (element[:20]==driver.title):
            views_xpath = '//*[@id="app"]/div[2]/div[2]/div/div[2]/div[2]/div/div[' + i + ']/div[1]/div/div/a/div/div[2]/strong'
            views = driver.find_element(By.XPATH, views_xpath).text
            break
    
    # element = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div/div[2]/div[2]/div/')
    # print(element)
    # for element in driver.find_elements(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div/div[2]/div[2]/div/'):
    #     print(element)
    #     title = element.find_element(By.XPATH, '/div[2]/a').get_attribute('title')
    #     print(title)
    #     if title[:20] == driver.title[:20]:
    #         views = element.find_element(By.XPATH, '/div[1]/div/div/a/div/div[2]/strong').text
    #         print(views)
            
    # '//*[@id="app"]/div[2]/div[2]/div/div[2]/div[2]/div' # Parent
    # '//*[@id="app"]/div[2]/div[2]/div/div[2]/div[2]/div/div[1]' # Each Element of the children's id
    # '//*[@id="app"]/div[2]/div[2]/div/div[2]/div[2]/div/div[1]/div[2]/a' # Title is the get attribute of title
    # '//*[@id="app"]/div[2]/div[2]/div/div[2]/div[2]/div/div[1]/div[1]/div/div/a/div/div[2]/strong' # The path for the views (first 25 characters is the parent)
    data = {
        'title': driver.title,
        'video_url': url,
        'name': influencer_name.text,
        'date': date.text,
        'views': views,
        'likes': likes.text,
        'comments': comments.text,
        'shares': shares.text,
        'profile_picture_url': profile_picture_url,
        'profile_url': profile_url
    }
    
    driver.quit()
    return json.dumps(data)


