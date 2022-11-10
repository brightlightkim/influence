# TO LAUNCH THE FLASK SERVER...
# ...execute the following on the command line:
# export FLASK_APP=tiktok
# flask run --host=0.0.0.0

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
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

    driver = webdriver.Chrome(PATH)
    # driver.get('https://www.tiktok.com/@kaneratan/video/7153108111795162414?is_from_webapp=1&sender_device=pc')
    driver.get(url)
    # print(driver.title)
    influencer_name = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div/div[2]/div/a[2]/span[1]')
    likes = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div/div[1]/div[3]/button[1]/strong')
    comments = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div/div[1]/div[3]/button[2]/strong')
    shares = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div/div[1]/div[3]/button[3]/strong')

    print(influencer_name.text)
    print(likes.text)
    print(comments.text)
    print(shares.text)
    
    data = {
        'title': driver.title,
        'name': influencer_name.text,
        'likes': likes.text,
        'comments': comments.text,
        'shares': shares.text
    }
    
    return json(data)


