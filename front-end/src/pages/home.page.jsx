import AnimationWrapper from '../common/page-animation';
import shorts from '../imgs/shorts.png';

const HomePage = () => {
  return (
    <AnimationWrapper>
      <section className='h-cover flex flex-col items-center justify-center gap-10'>
        <div className='flex mt-10 lg:mt-20'>
          <p className='lg:text-5xl font-bold text-4xl'>Record →</p>
          <p className='line-through'>
            <p className='gradient-text mx-4 md:mx-5 lg:text-5xl font-bold text-4xl'>Edit Videos</p>
          </p>
          <p className='lg:text-5xl font-bold text-4xl'>→ Publish</p>
        </div>
        <p className='text-center px-20 lg:px-60 text-xl md:text-2xl lg:text-2xl mb-8'>
          Swift Shorts uses AI to turn a long video recordings into 3 shorts in 1 click and gives you insights on what to create by predicting and analyzing trending videos from multiple platforms.
        </p>
        <button className='mb-20 lg-mb-30 rounded-xl bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500 px-6 py-4 font-bold text-white text-2xl'>Try Swift Shorts →</button>
        <img src={shorts} width={1000} height={500} className='rounded-xl' alt='banner' />
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
