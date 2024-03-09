import cv2
import numpy as np
from moviepy.editor import VideoFileClip, AudioFileClip


def add_white_background(frame, target_width, target_height):
    """
    주어진 프레임에 흰색 배경을 추가하여 목표 크기에 맞춥니다.
    """
    h, w = frame.shape[:2]
    top_padding = (target_height - h) // 2
    bottom_padding = target_height - h - top_padding
    left_padding = (target_width - w) // 2
    right_padding = target_width - w - left_padding
    return cv2.copyMakeBorder(frame, top_padding, bottom_padding, left_padding, right_padding, cv2.BORDER_CONSTANT, value=[255, 255, 255])



def process_video(input_path, output_path, start_time, end_time, target_ratio=(9, 16)):
    """
    영상을 처리하여 특정 시간대를 추출하고, 비율을 조정한 뒤, 흰색 배경을 추가합니다.
    """
    cap = cv2.VideoCapture(input_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    start_frame = int(start_time * fps)
    end_frame = int(end_time * fps)

    # 출력 비디오 설정
    out_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    out_height = int(out_width * target_ratio[1] / target_ratio[0])
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (out_width, out_height))

    current_frame = 0
    while True:
        ret, frame = cap.read()
        if not ret or current_frame > end_frame:
            break
        if current_frame >= start_frame:
            # 비율 조정 없이 바로 배경 추가
            frame_with_background = add_white_background(frame, out_width, out_height)
            out.write(frame_with_background)
        current_frame += 1

    cap.release()
    out.release()

# 영상 파일 경로와 출력 경로 설정
input_video_path = '/Users/minjoong/Documents/yhack2024/jimmy.mp4'  # 입력 영상 경로
output_video_path = '/Users/minjoong/Documents/yhack2024/white_video.mp4'    # 출력 영상 경로

# 영상 처리 함수 호출
process_video(input_video_path, output_video_path, start_time=0, end_time=30)



# 비디오 파일 경로
video_path = '/Users/minjoong/Documents/yhack2024/jimmy.mp4'
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
video_path = '/Users/minjoong/Documents/yhack2024/white_video.mp4'
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
