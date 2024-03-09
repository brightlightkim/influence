import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { uploadVideo } from '../common/aws';
import defaultBanner from '../imgs/blog banner.png';
import { useState } from 'react';

const VideoEditor = () => {
  const [banner, setBanner] = useState(defaultBanner);
  let navigate = useNavigate();

  const handleSubmitVideo = (e) => {
    let video = e.target.files[0];

    if (video) {
      let loadingToast = toast.loading('Uploading...');

      uploadVideo(video)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success('Uploaded! :)');

            setBanner(url);
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error(err);
        });
    }
  };

  const handleCreateShorts = () => {};

  const handleError = (e) => {
    let img = e.target;

    img.src = defaultBanner;
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <Toaster />
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
    </div>
  );
};

export default VideoEditor;
