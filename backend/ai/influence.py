# TO LAUNCH THE FLASK SERVER...
# ...execute the following on the command line:
# export FLASK_APP=influence
# flask run --port 5001

from flask_cors import CORS
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from youtubeDataAPI import YoutubeDataAPI
from youtubeAnalsisAPI import YoutubeAnalysisAPI
from create_shorts_timestamps import create_shorts_timestamps
from ContentIdeaGenerator import ContentIdeaGenerator
from cropvideo import crop_video, extract_audio, merge_video_audio
from moviepy.editor import VideoFileClip, AudioFileClip
from aws_speechtotext import transcribe_file

import os
from openai import OpenAI
import json

os.environ["IMAGEIO_FFMPEG_EXE"] = "/usr/bin/ffmpeg"

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

@app.route('/create-shorts', methods=['POST'])
def create_shorts():
    video_length = YoutubeDataAPI.main()
    timestamps = create_shorts_timestamps(video_length)


    # 사용 예시
    input_video_path = '/Users/minjoong/Documents/influence/backend/ai/jimmy.mp4'
    output_video_path = 'cropped_video.mp4'
    start_time = timestamps[0][0]  # 초 단위
    end_time = timestamps[0][1]  # 초 단위
    crop_video(input_video_path, output_video_path, start_time, end_time)




    # 비디오 파일 경로
    video_path = '/Users/minjoong/Documents/influence/backend/ai/jimmy.mp4'
    # 오디오를 저장할 파일 이름
    output_audio_path = 'extracted_audio.mp3'

    # 비디오 파일 로드
    video = VideoFileClip(video_path)

    # 특정 시간대의 오디오 추출 (예: 10초부터 20초까지)
    extracted_audio = video.subclip(start_time, end_time).audio

    # 추출한 오디오를 MP3 파일로 저장
    extracted_audio.write_audiofile(output_audio_path)

    print(f"Audio extracted and saved to {output_audio_path}")




    # 비디오 파일과 오디오 파일 경로
    video_path = '/Users/minjoong/Documents/influence/backend/ai/cropped_video.mp4'
    audio_path = '/Users/minjoong/Documents/influence/backend/ai/extracted_audio.mp3'
    # 합쳐진 파일을 저장할 이름
    output_video_path = 'output_video.mp4'

    # 비디오와 오디오 파일 로드
    video_clip = VideoFileClip(video_path)
    audio_clip = AudioFileClip(audio_path)

    # 비디오의 오디오를 새 오디오로 교체
    final_clip = video_clip.set_audio(audio_clip)

    # 결과 비디오 파일 저장
    final_clip.write_videofile(output_video_path, codec='libx264', audio_codec='aac')

    print(f"Video and audio merged and saved to {output_video_path}")
    
    # 사전 서명된 URL 생성 예시
    bucket_name = 'speechtotextkbsa2'  # 예: 'speechtotextkbsa2'
    # S3 버킷 내에서의 파일 이름 정의 (예: 'jimmy.mp4')
    s3_file_name = 'output_video.mp4'  # S3 버킷 내에서의 경로 및 파일 이름
    job_name = 'jimmy_text'
    # Transcribe 작업 시작
    transcribe_file(bucket_name, s3_file_name, job_name)
    file_name = 'output.json'
    json_file = ContentIdeaGenerator().run(file_name)
    
    return json_file
