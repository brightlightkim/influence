import boto3
from botocore.exceptions import NoCredentialsError
from datetime import datetime
import uuid
import requests
import os

# AWS 자격증명과 S3, Transcribe 클라이언트 설정
aws_access_key_id = 'AKIAZQTAKCRMRCMIPJEY'
aws_secret_access_key = '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'
region_name = 'us-east-2'  # 예: 'us-west-1'

s3 = boto3.client('s3', region_name=region_name,
                  aws_access_key_id=aws_access_key_id,
                  aws_secret_access_key=aws_secret_access_key)


transcribe = boto3.client('transcribe', region_name=region_name,
                          aws_access_key_id=aws_access_key_id,
                          aws_secret_access_key=aws_secret_access_key)

# 사전 서명된 URL 생성 예시
bucket_name = 'speechtotextkbsa2'  # 예: 'speechtotextkbsa2'
# S3 버킷 내에서의 파일 이름 정의 (예: 'jimmy.mp4')
s3_file_name = 'jimmy.mp4'  # S3 버킷 내에서의 경로 및 파일 이름

object_name = None
if object_name is None:
    object_name = os.path.basename(s3_file_name)

# 로컬 파일 시스템의 전체 경로
local_file_path = '/Users/minjoong/Documents/yhack2024/jimmy.mp4'

s3.upload_file(s3_file_name, bucket_name, object_name)

# Amazon Transcribe를 사용하여 오디오 파일을 텍스트로 변환하는 함수
def transcribe_file(bucket_name, file_name, job_name):

    # Generate a timestamp
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')

    # Generate a random UUIDspe
    random_uuid = uuid.uuid4().hex
    job_name += timestamp+random_uuid
    try:
        transcribe.start_transcription_job(
            TranscriptionJobName=job_name,
            Media={'MediaFileUri': f's3://{bucket_name}/{file_name}'},
            MediaFormat='mp4',  # 필요에 따라 수정
            LanguageCode='en-US'  # 필요에 따라 수정
        )
        
        # 작업 완료 대기
        while True:
            status = transcribe.get_transcription_job(TranscriptionJobName=job_name)
            if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
                break
        transcript_file_uri = status['TranscriptionJob']['Transcript']['TranscriptFileUri']
            
        # URL에서 변환된 텍스트 다운로드
        transcript_result = requests.get(transcript_file_uri)
        
        with open("output.json", 'w') as f:
                f.write(transcript_result.text) 
        
        print(f"Transcription completed: {status['TranscriptionJob']['Transcript']['TranscriptFileUri']}")
    except NoCredentialsError:
        print("Credentials not available")
    except:
        print("Error has occured")

job_name = 'jimmy'

# Transcribe 작업 시작
transcribe_file(bucket_name, s3_file_name, job_name)
