from youtubeDataAPI import YoutubeDataAPI
from youtubeAnalsisAPI import YoutubeAnalysisAPI
def analyze_data(video_length):
    second_per_percent = video_length/100
    max = second_per_percent
    percent = 0
    total = 0
    while total < 30:
        if max < second_per_percent:
            max = second_per_percent
        total += second_per_percent
        percent += 1
    youtube_analysis = YoutubeAnalysisAPI.run()
    percent_array = []
    window = 0
    for i in range(percent):
        percent_array.append(youtube_analysis[i])
    for i in percent_array:
        window += i
    start = 0
    end = percent*second_per_percent
    startAndEndPair = {}
    start=0
    end=start+percent
    for i in range(percent,len(youtube_analysis)):
        window += youtube_analysis[i] - youtube_analysis[i-percent]
        start = (i - percent + 1)*second_per_percent
        end = (i + 1)*second_per_percent
        pair = [start,end]
        startAndEndPair[window] = pair
    sorted_keys = sorted(startAndEndPair.keys(),reverse=True)
    results_arr = [startAndEndPair[key] for key in sorted_keys]
    return results_arr

def create_shorts(video_id,user_id):
    pass


print(analyze_data(95))