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

from supabase import create_client, Client

url: str = 'https://ltmzjnuoakodlfbqosey.supabase.co'
key: str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0bXpqbnVvYWtvZGxmYnFvc2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODk0MzEsImV4cCI6MTk4Mzg2NTQzMX0.GPqlNrOXXNp_ou3e_JqWxRqXRDUmPbrZ274gKpucGQE'


supabase: Client = create_client(url, key)

app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/index')
def response():
    PATH='./chromedriver.exe'
    
    user_id = request.args.get('user_id')
    url = request.args.get('url')
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(executable_path=PATH, chrome_options=chrome_options)
    
    driver.get(url)
    likes = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div/div[1]/div[3]/button[1]/strong').text
    comments = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div/div[1]/div[3]/button[2]/strong').text
    shares = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div/div[1]/div[3]/button[3]/strong').text
    profile_picture_url = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div[1]/div[2]/div/a[1]/div/span/img').get_attribute("src")
    profile_url = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div[1]/div[2]/div/a[1]').get_attribute("href")
    date = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div[1]/div[3]/div[1]/div[2]/div/a[2]/span[2]/span[2]').text
    title = driver.title
    
    views = None
    driver.get(profile_url)
    
    influencer_name = driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div[2]/div/div[1]/div[1]/div[2]/h2').text
    
    for i in range(1,20):
        title_xpath = '//*[@id="app"]/div[2]/div[2]/div/div[2]/div[2]/div/div[' + str(i) + ']/div[2]/a'
        element = driver.find_element(By.XPATH, title_xpath).get_attribute("title")
        if element[:20]==title[:20]:
            views_xpath = '/html/body/div[2]/div[2]/div[2]/div/div[2]/div[2]/div/div[' + str(i) + ']/div[1]/div/div/a/div/div[2]/strong'
            views = driver.find_element(By.XPATH, views_xpath).text
            break
        
    data = {
        'title': title,
        'video_url': url,
        'name': influencer_name,
        'date': date,
        'views': views,
        'likes': likes,
        'comments': comments,
        'shares': shares,
        'profile_picture_url': profile_picture_url,
        'profile_url': profile_url
    }
    
    jsonData = json.dumps(data)
    driver.quit()
    
    valueToAdd = {
        "user_id": user_id,
        "video_json": jsonData
    }
    
    addDataToSupabase = supabase.table('tiktok_url_list').insert(valueToAdd).execute()
    print(addDataToSupabase)
    
    getDataFromSupabse = supabase.table("tiktok_url_list").select("*").execute()
    
    print(getDataFromSupabse)
    return jsonData

