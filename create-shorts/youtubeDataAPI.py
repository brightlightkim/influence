# -*- coding: utf-8 -*-

# Sample Python code for youtube.videos.getRating
# See instructions for running these code samples locally:
# https://developers.google.com/explorer-help/code-samples#python

import os

import googleapiclient.discovery
class YoutubeDataAPI:

    def main():
        # Disable OAuthlib's HTTPS verification when running locally.
        # *DO NOT* leave this option enabled in production.
        os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

        api_service_name = "youtube"
        api_version = "v3"
        DEVELOPER_KEY = "AIzaSyCcpjmOekPY9Ly4B6fne8e5LWh3tYxttx8"

        youtube = googleapiclient.discovery.build(
            api_service_name, api_version, developerKey = DEVELOPER_KEY)
        video_id = "GpZ7nY45Xmo"
        request = youtube.videos().list(
            part="contentDetails",
            id = video_id
        )
        response = request.execute()
        duration_iso = response['items'][0]['contentDetails']['duration']
        minutes_iso = duration_iso.split("PT")[1].split("M")[0]
        seconds_iso = duration_iso.split("M")[1].split("S")[0]
        total_seconds = int(minutes_iso)*60+int(seconds_iso)
        print(total_seconds)
        return total_seconds

        # print("Duration of the video (ISO 8601 format):", duration_iso)

        # print(response)

    if __name__ == "__main__":
        main()