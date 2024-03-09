import cv2
import numpy as np
from moviepy.editor import VideoFileClip, AudioFileClip


def crop_video(input_path, output_path, start_time, end_time):
    # 영상 로드
    cap = cv2.VideoCapture(input_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / fps
    
    # 시작 및 종료 시간을 프레임 번호로 변환
    start_frame = int(start_time * fps)
    end_frame = int(end_time * fps)
    
    # 출력 비디오 설정
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    # 9:16 비율로 크롭하기 위한 새로운 높이와 너비 계산
    new_height = height
    new_width = int(height * 9 / 16)
    if new_width > width:  # 너비가 더 작은 경우 비율 조정
        new_width = width
        new_height = int(width * 16 / 9)
    out = cv2.VideoWriter(output_path, fourcc, fps, (new_width, new_height))
    
    # 비디오 프레임 추출 및 크롭
    current_frame = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret or current_frame > end_frame:
            break
        if current_frame >= start_frame:
            # 중앙에서 크롭
            start_x = int((width - new_width) / 2)
            start_y = int((height - new_height) / 2)
            cropped = frame[start_y:start_y+new_height, start_x:start_x+new_width]
            out.write(cropped)
        current_frame += 1
    
    # 자원 해제
    cap.release()
    out.release()

# 사용 예시
input_video_path = '/Users/minjoong/Documents/yhack2024/jimmy.mp4'
output_video_path = 'cropped_video.mp4'
start_time = 0  # 초 단위
end_time = 30  # 초 단위
crop_video(input_video_path, output_video_path, start_time, end_time)




# 비디오 파일 경로
video_path = '/Users/minjoong/Documents/yhack2024/ive.mp4'
# 오디오를 저장할 파일 이름
output_audio_path = 'extracted_audio.mp3'

# 비디오 파일 로드
video = VideoFileClip(video_path)

# 특정 시간대의 오디오 추출 (예: 10초부터 20초까지)
extracted_audio = video.subclip(0, 30).audio

# 추출한 오디오를 MP3 파일로 저장
extracted_audio.write_audiofile(output_audio_path)

print(f"Audio extracted and saved to {output_audio_path}")




# 비디오 파일과 오디오 파일 경로
video_path = '/Users/minjoong/Documents/yhack2024/cropped_video.mp4'
audio_path = '/Users/minjoong/Documents/yhack2024/extracted_audio.mp3'
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
