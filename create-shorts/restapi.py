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
    total_percent = 0
    # for (i,j) in zip(range(percent),youtube_analysis):
    #     percent_map[i] = j
    window = 0
    for i in range(percent):
        percent_array.append(youtube_analysis[i])
    for i in percent_array:
        window += i
    maxsum = window
    start = 0
    end = percent*second_per_percent
    for i in range(percent,100):
        window += youtube_analysis[i] - youtube_analysis[i-percent]
        if window > maxsum:
            maxsum = window
            start = i*second_per_percent
            end = (i-percent+1)*second_per_percent
    return start, end

def create_shorts(video_id,user_id):
    pass


print(analyze_data())