from flask import Flask, request, jsonify
from dotenv import load_dotenv

import os
import openai
import json

load_dotenv()
import json

openai.api_key = os.getenv("OPENAI_KEY")
app = Flask(__name__)

def load_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data





@app.route("/talk", methods=["POST"])
def post_text():
    input_data = request.json
    response = get_chat_response(input_data["input"])
    return jsonify({"message": response})

def get_chat_response(user_message):
    messages = []
    messages = load_messages()
    messages.append({"role": "user", "content": user_message})
    gpt_response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    print(gpt_response.choices[0].message["content"])
    save_messages(user_message, gpt_response.choices[0].message["content"])
    return gpt_response.choices[0].message["content"]

def load_messages():
    messages = []
    file = 'twitch.json'
    empty = os.stat(file).st_size == 0
    if not empty:
        with open(file) as db_file:
            data = json.load(db_file)
            for item in data:
                messages.append(item)
    else:
        messages.append({"role": "system", "content": "Your initial system message goes here."})
    return messages

def save_messages(user_message, gpt_response):
    file = 'twitch.json'
    messages = load_messages()
    messages.append({"role": "user", "content": user_message})
    messages.append({"role": "Sandy", "content": gpt_response})
    with open(file, "w") as f:
        json.dump(messages, f)

if __name__ == "__main__":
    app.run(debug=True)
