import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { uploadVideo } from '../common/aws';
import defaultBanner from '../imgs/blog banner.png';
import thumbnail_example from '../imgs/thumbnail_example.png';
import video from '../../../backend/ai/output_video.mp4';
import transcript from '../../../backend/ai/output.json';
import { useState, useRef } from 'react';

const VideoEditor = () => {
  const [banner, setBanner] = useState(defaultBanner);
  let [transcript_note, setTranscriptNote] = useState(null);
  let [output_video, setOutputVideo] = useState(video);
  let videoRef = useRef(null);
  let [show_note_suggestion, setShowNoteSuggestion] = useState(null);
  let [isUserClickGenerate, setIsUserClickGenerate] = useState(false);
  const [titleIndex, setTitleIndex] = useState(-1);
  const [descriptionIndex, setDescriptionIndex] = useState(-1);
  const [file, setFile] = useState(null);
  let navigate = useNavigate();

  const handleSubmitVideo = (e) => {
    let video = e.target.files[0];

    if (video) {
      let loadingToast = toast.loading('Uploading...');

      setBanner(thumbnail_example);
      setFile(video);

      toast.dismiss(loadingToast);
      toast.success('Uploaded! :)');
    }
  };

  const handleCreateShorts = async (e) => {
    setIsUserClickGenerate(true);
    if (file != null) {
      let show_note_suggestion = await axios
        .get(import.meta.env.VITE_SERVER_DOMAIN + '/create-shorts')
        .then(({ data }) => {
          return data;
        });

      setShowNoteSuggestion(show_note_suggestion);

      let output_video =
        '/Users/taeyangkim/BYU/YHack/influence/backend/ai/output_video.mp4';

      setOutputVideo(output_video);

      let transcript_note = fetch(
        '/Users/taeyangkim/BYU/YHack/influence/backend/ai/output.json'
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        });

      setTranscriptNote(transcript_note);
      console.log(transcript_note);

      toast.dismiss(loadingToast);
      toast.success('Shorts Have Been Generated! :)');
    } else {
      toast.error('Please upload a video first!');
    }
  };

  const handleError = (e) => {
    let img = e.target;

    img.src = defaultBanner;
  };

  let sample_response = {
    title_suggestions: [
      'My Crazy College Trip to Tijuana Mexico',
      'Getting into Mexico is Easier Than Costco?!',
      'The Wild Adventures of Crossing the US-Mexico Border',
    ],
    description_suggestions: [
      'Join me as I share my wild college trip to Tijuana Mexico, where getting into Mexico was easier than a trip to Costco! But the real adventure began when trying to cross back into the US.',
      'Discover the craziness of entering Mexico from the US with no checks, and the unexpected challenges of returning to the US from Mexico on my college trip to Tijuana.',
      'Experience the excitement and challenges of crossing the US-Mexico border during my college trip to Tijuana, where the journey back was anything but easy.',
    ],
    hashtags: [
      '#CollegeTrip #TijuanaMexico #USMexicoBorder #TravelAdventures #CrossingBorders',
    ],
  };

  let text = '';

  const getCurrentTime = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      console.log('Current Time:', currentTime);
    }
  };

  const handleTitleSuggestion = () => {
    if (titleIndex < sample_response.title_suggestions.length - 1) {
      setTitleIndex(titleIndex + 1);
    } else {
      setTitleIndex(0);
    }
  }

  const handleDescriptionSuggestion = () => {
    if (descriptionIndex < sample_response.description_suggestions.length - 1) {
      setDescriptionIndex(descriptionIndex + 1);
    } else {
      setDescriptionIndex(0);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center mt-20'>
      <Toaster />
      {!isUserClickGenerate ? (
        <div className='flex mt-10 lg:mt-20 justify-center items-center lg:mx-32 md:mx-20'>
          <div className='w-[50%] aspect-video hover:opacity-80 bg-white border-4 border-grey'>
            <label htmlFor='uploadVideo'>
              <img src={banner} className='z-20 w-50%' onError={handleError} />
              <input
                id='uploadVideo'
                type='file'
                accept='.mp4'
                hidden
                onChange={handleSubmitVideo}
              ></input>
            </label>
          </div>
          <div className='flex-1 flex justify-center'>
            <button
              onClick={handleCreateShorts}
              className='my-20 lg-my-30 rounded-3xl bg-gradient-to-r from-indigo-500 hover:from-indigo-400 to-pink-500 hover:to-pink-400 px-6 py-4 font-bold text-white text-4xl'
            >
              Generate Shorts
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className='flex '>
            <div className='flex flex-1 items-center justify-center mx-10'>
              <video
                className='rounded-2xl'
                ref={videoRef}
                width={300}
                height={600}
                controls
              >
                <source src={output_video} type='video/mp4' />
              </video>

              <div className='flex flex-col justify-center items-center px-20 gap-5'>
                <h2 className='gradient-text'>AI Suggestions</h2>

                <p className='text-2xl font-bold'>Title</p>
                {sample_response.title_suggestions.map((title, index) => {
                  if (titleIndex == index) {
                    return (
                      <button key={index} onClick={handleTitleSuggestion} className='text-xl font-bold hover:text-blue-500'>
                        "{title}"
                      </button>
                    );
                  } else if (titleIndex == -1) {
                    return (
                      <button key={index} onClick={handleTitleSuggestion} className='text-xl hover:text-blue-500'>
                        "{title}"
                      </button>
                    );
                  } 
                })}
                <p className='text-2xl font-bold'>Description</p>
                {sample_response.description_suggestions.map(
                  (description, index) => {
                    if (descriptionIndex == index) {

                    return (
                      <button
                        key={index}
                        onClick={handleDescriptionSuggestion}
                        className='text-xl font-bold hover:text-blue-500'
                      >
                        "{description}"
                      </button>
                    );
                    } else if (descriptionIndex == -1) {
                      return (
                        <button
                          key={index}
                          onClick={handleDescriptionSuggestion}
                          className='text-xl hover:text-blue-500'
                        >
                          "{description}"
                        </button>
                      );
                    }
                  }
                )}
                <p className='text-2xl font-bold'>Tags</p>
                <button className='text-xl hover:text-blue-500'>
                  {sample_response.hashtags}
                </button>
              </div>
            </div>
            <div className='flex flex-1 flex-col'>
              <h2 className='text-center gradient-text'>Speech to Text Transcript</h2>
              {transcript.results.items.map((item, index) => {
                if (index % 10 == 0) {
                  let saved_text = text;
                  text = '';
                  return (
                    <div
                      key={index}
                      className='flex text-xl hover:text-blue-500'
                    >
                      <p className='font-bold mr-20 text-xl my-5'>
                        {item.start_time}
                      </p>
                      <p className='text-xl my-5'>{saved_text}</p>
                    </div>
                  );
                } else if (index == transcript.results.items.length - 2) {
                  text += item.alternatives[0].content + ' ';
                  return (
                    <div
                      key={index}
                      className='flex text-xl hover:text-blue-500'
                    >
                      <p className='font-bold mr-20 text-xl my-5'>
                        {item.end_time}
                      </p>
                      <p className='text-xl my-5'>{text}</p>
                    </div>
                  );
                } else {
                  text += item.alternatives[0].content + ' ';
                }
              })}
            </div>
          </div>
          <form
            method='get'
            className='my-10 pointer rounded-lg bg-gradient-to-r from-indigo-500 hover:from-indigo-400 to-pink-500 hover:to-pink-400 px-5 py-4 text-white font-bold'
            action={video}
          >
            <button type='submit'>Download Video!</button>
          </form>
        </>
      )}
    </div>
  );
};

export default VideoEditor;
