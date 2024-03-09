import AnimationWrapper from '../common/page-animation';

const PublishForm = () => {

  return (
    <AnimationWrapper>
      <section className='w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4'>
        
          <div className='w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4'>
            <img src={banner} />
          </div>

      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
