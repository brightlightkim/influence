# TO LAUNCH THE FLASK SERVER...
# ...execute the following on the command line:
# export FLASK_APP=tiktok
# flask run --host=0.0.0.0

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

def find_related_data(data):
    related_twitch_data = []
    for i in range(len(data['data'])):
        title = data['data'][i]['title']
        url = data['data'][i]['url']
        thumbnail_url = data['data'][i]['thumbnail_url']
        related_twitch_data.append({'title': title, 'url':url, 'thumbnail_url': thumbnail_url })
    return related_twitch_data

def create_analysis_prompt(related_twitch_data):
    # Convert your data into a text format that the AI can understand
    data_text = ''
    for i in range(len(related_twitch_data)):
        data_text += "\n - Title: " + related_twitch_data[i]['title'] + ", URL: " + related_twitch_data[i]['url'] + ", Thumbnail URL: " + related_twitch_data[i]['thumbnail_url'] 
    
    prompt = f"You are a data analysist. Identify key insights of youtube_data that are not in the twitch_data and vice versa. You would want to recommend a trend that is popular on each platform to the user based on their input. You should generate three suggesions follow the format. \n Format should be in the Json format with the suggestion, example, example_url, example_thumbnail_url, and reason. Example: Suggestion: Build a shorts with video, example_url: www.twitch.com/asdkfksf, example_thumbnail_url: 'www.image.com/sfasfs', reason: 'There is a high trend on building shorts with video on YouTube while it's not active on Twitch that you have a high chance of getting the higher views and subscriptions. Given Twitch data: \n {data_text}. "
    return prompt

def get_ai_analysis(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompt}
        ]
    )
    print(response) #response.choices[0].message.content
    return 'hi'

@app.route('/analyze-trend', methods=['POST'])
def analyze_trend():
    user_input = request.json.get('word')
    
    if not user_input:
        return jsonify({"error": "No word or phrase provided"}, 400)

    related_twitch_data = find_related_data(twitch_data)
    
    prompt = create_analysis_prompt(related_twitch_data)

    analysis = get_ai_analysis(prompt)
    
    print(analysis)

    # return jsonify({"message": "Success", "analysis": analysis})[plook]
    
    jsonData = json.dumps(data)
    return jsonData
