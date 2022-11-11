# TO LAUNCH THE FLASK SERVER...
# ...execute the following on the command line:
# export FLASK_APP=tiktok
# flask run --host=0.0.0.0

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

import sys
import json
import random

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
    
    data = {
        'title': driver.title,
        'name': influencer_name.text,
        'likes': likes.text,
        'comments': comments.text,
        'shares': shares.text,
        'profile_picture_url': profile_picture_url,
        'profile_url': profile_url
    }
    
    print(profile_url)
    
    return json.dumps(data)


