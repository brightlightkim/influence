# TO LAUNCH THE FLASK SERVER...
# ...execute the following on the command line:
# export FLASK_APP=tiktok
# flask run --port 5001

from flask_cors import CORS
from flask import Flask, request, jsonify
from dotenv import load_dotenv

import os
from openai import OpenAI
import json

load_dotenv()
import json

client = OpenAI(api_key=os.getenv("OPENAI_KEY"))
print(client)
app = Flask(__name__)
CORS(app)

def load_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

twitch_data = load_json_file(os.path.join(app.root_path, '..', 'twitch.json'))
youtube_data = load_json_file(os.path.join(app.root_path, '..', 'youtube.json'))

def find_related_twitch_data(twitch_data):
    related_twitch_data = []
    for i in range(len(twitch_data['data'])):
        title = twitch_data['data'][i]['title']
        url = twitch_data['data'][i]['url']
        thumbnail_url = twitch_data['data'][i]['thumbnail_url']
        print(title + " " +  url + " " + thumbnail_url )
        related_twitch_data.append({'title': title, 'url':url, 'thumbnail_url': thumbnail_url })
    return related_twitch_data

def find_related_youtube_data(youtube_data):
    related_youtube_data = []
    for i in range(len(youtube_data['items'])):
        title = youtube_data['items'][i]['snippet']['title']
        url = 'https://www.youtube.com/watch?v=' + youtube_data['items'][i]['id']['videoId']
        thumbnail_url = youtube_data['items'][i]['snippet']['thumbnails']['default']['url']
        print(title + " " +  url + " " + thumbnail_url )
        related_youtube_data.append({'title': title, 'url':url, 'thumbnail_url': thumbnail_url })
    return related_youtube_data

def create_analysis_prompt(related_twitch_data, related_youtube_data):
    twitch_data_text = ''
    for i in range(len(related_twitch_data)):
        twitch_data_text += "\n - Title: " + related_twitch_data[i]['title'] + ", URL: " + related_twitch_data[i]['url'] + ", Thumbnail URL: " + related_twitch_data[i]['thumbnail_url'] 
    
    youtube_data_text = ''
    for i in range(len(related_youtube_data)):
        youtube_data_text += "\n - Title: " + related_youtube_data[i]['title'] + ", URL: " + related_youtube_data[i]['url'] + ", Thumbnail URL: " + related_youtube_data[i]['thumbnail_url']
    
    prompt = f'''You are a data analyst. Given the summarized data from both YouTube and Twitch about minecraft videos, identify key insights unique to youtube_data that are not present in twitch_data and vice versa. Based on this analysis, recommend a trend that is popular on each platform. Generate three suggestions for each platform. For each suggestion, include an example video with a title, url, thumbnail_url, which are all in an actual data set and a reason. Do not use fake title, url, or thumbnail_url that is not in the dataset, such as "https://example.com/thumbnail.jpg. For instance, a suggestion might be to build short videos on a platform where this format is trending but underutilized on the other.
    Ensure your recommendations are insightful, drawing on the unique aspects and viewer preferences of each platform. write the response in a json format.
    Given Twitch data:{{twitch_data_text}}, Youtube data: {{youtube_data_text}}'''

    return prompt


def get_ai_analysis(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompt}
        ]
    )
    return response.choices[0].message.content

@app.route('/analyze-trend', methods=['POST'])
def analyze_trend():
    user_input = request.json.get('word')
    
    if not user_input:
        return jsonify({"error": "No word or phrase provided"}, 400)

    related_youtube_data = find_related_youtube_data(youtube_data)
    related_twitch_data = find_related_twitch_data(twitch_data)
    
    prompt = create_analysis_prompt(related_twitch_data, related_youtube_data)

    analysis = get_ai_analysis(prompt)
    print(analysis)

    return jsonify(analysis)
