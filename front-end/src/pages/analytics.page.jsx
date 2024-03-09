import AnimationWrapper from '../common/page-animation';
import shorts from '../imgs/shorts.png';
import { Link } from 'react-router-dom';

const AnalyticsPage = () => {
  return (
    <AnimationWrapper>
      <section className='h-cover flex flex-col items-center justify-center gap-10'>
        <div className='flex mt-10 lg:mt-20'>
          <p className='lg:text-5xl font-bold text-4xl'>Record →</p>
          <h5 className='line-through'>
            <p className='gradient-text mx-4 md:mx-5 lg:text-5xl font-bold text-4xl'>Edit Videos</p>
          </h5>
          <p className='lg:text-5xl font-bold text-4xl'>→ Publish</p>
        </div>
        <p className='text-center px-20 lg:px-60 text-xl md:text-2xl lg:text-2xl mb-8'>
          Swift Shorts uses AI to turn a long video recordings into 3 shorts in 1 click and gives you insights on what to create by predicting and analyzing trending videos from multiple platforms.
        </p>
        <Link to='/editor' className='mb-20 lg-mb-30 rounded-xl bg-gradient-to-r from-indigo-500 hover:from-indigo-400 via-pink-500 hover:via-pink-400 to-red-500 hover:to-red-400 px-6 py-4 font-bold text-white text-2xl'>Try Swift Shorts →</Link>
        <img src={shorts} width={1000} height={500} className='rounded-xl' alt='banner' />
      </section>
    </AnimationWrapper>
  );
};

export default AnalyticsPage;