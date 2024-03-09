import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { uploadVideo } from '../common/aws';
import defaultBanner from '../imgs/blog banner.png';
import thumbnail_example from '../imgs/thumbnail_example.png';
import video from '../../../backend/ai/output_video.mp4';
import { useState, useRef } from 'react';

const VideoEditor = () => {
  const [banner, setBanner] = useState(defaultBanner);
  let [transcript_note, setTranscriptNote] = useState(null);
  let [output_video, setOutputVideo] = useState(video);
  let videoRef = useRef(null);
  let [show_note_suggestion, setShowNoteSuggestion] = useState(null);
  let [isUserClickGenerate, setIsUserClickGenerate] = useState(false);
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
      let loadingToast = toast.loading('Creating Shorts...');

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

  return (
    <div className='flex flex-col justify-center items-center'>
      <video className='rounded-2xl' ref={videoRef} width={300} height={600} controls>
        <source src={output_video} type='video/mp4' />
      </video>
      <Toaster />
      {/* {!isUserClickGenerate ? (
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
        <video ref={videoRef} width={200} height='auto' controls>
          <source src={output_video} type='video/mp4' />
        </video>
      )} */}
    </div>
  );
};

export default VideoEditor;
