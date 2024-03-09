import os
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow

class YoutubeAnalysisAPI:
    def __init__(self) -> None:
        self.SCOPES = ['https://www.googleapis.com/auth/yt-analytics.readonly']
        self.API_SERVICE_NAME = 'youtubeAnalytics'
        self.API_VERSION = 'v2'
        self.CLIENT_SECRETS_FILE = 'client_secret_taeyang.json'
  
    def get_service(self):
        flow = InstalledAppFlow.from_client_secrets_file(self.CLIENT_SECRETS_FILE, self.SCOPES)
        credentials = flow.run_local_server()
        return build(self.API_SERVICE_NAME, self.API_VERSION, credentials=credentials)

    def execute_api_request(self, client_library_function, **kwargs):
        response = client_library_function(
            **kwargs
        ).execute()
        arr = []
        for row in response["rows"]:
            arr.append(row[2])
        return arr

# if __name__ == '__main__':
    def run():
    # Disable OAuthlib's HTTPs verification when running locally.
    # *DO NOT* leave this option enabled when running in production.
      os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

      youtube_analysis = YoutubeAnalysisAPI()
      youtube_analytics = youtube_analysis.get_service()
      result = youtube_analysis.execute_api_request(
          youtube_analytics.reports().query,
          ids='channel==MINE',
          startDate='2017-11-01',
          endDate='2024-03-07',
          metrics='audienceWatchRatio',
          dimensions='video,elapsedVideoTimeRatio',
          filters='video==GpZ7nY45Xmo',
      )
      return result
