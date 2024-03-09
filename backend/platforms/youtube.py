
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

import random
import json

from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS
from supabase import create_client, Client

url: str = 'https://ltmzjnuoakodlfbqosey.supabase.co'
key: str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0bXpqbnVvYWtvZGxmYnFvc2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODk0MzEsImV4cCI6MTk4Mzg2NTQzMX0.GPqlNrOXXNp_ou3e_JqWxRqXRDUmPbrZ274gKpucGQE'


supabase: Client = create_client(url, key)

app = Flask(__name__)
CORS(app)

@app.route('/scrape', methods=['GET'])
def scrape_youtube():
    search_query = request.args.get('query', 'League of Legends')  # Default search query
    search_query = search_query.replace(' ', '+')
    url = f'https://www.youtube.com/watch?search_query={search_query}'
    
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Convert your videos list to a JSON string
    videos_json = json.dumps(videos, indent=4)
    
    # Define a file name with your search query to make it unique
    filename = f"videos_{search_query.replace('+', '_')}.json"
    
    # Save the JSON data to a file
    with open(filename, 'w') as file:
        file.write(videos_json)

    videos = []
    for video in soup.find_all('a', attrs={'class': 'yt-simple-endpoint style-scope ytd-video-renderer'}):
        title = video['title']
        video_url = 'https://www.youtube.com' + video['href']
        videos.append({'title': title, 'url': video_url})

    return jsonify(videos)

if __name__ == '__main__':
    app.run(debug=True)
    

scrape_youtube()