import AnimationWrapper from '../common/page-animation';
import BoxWithText from '../components/box-with-text';
import axios from 'axios';
import { useState } from 'react';

const AnalyticsPage = () => {
  const [twitchSuggestions, setTwitchSuggestions] = useState([]);
  const [youtubeSuggestions, setYoutubeSuggestions] = useState([]);
  const handleGetInsights = async () => {
    console.log('Get Insights');
    let show_note_suggestion = await axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + '/analyze-trend', {
        word: 'minecraft',
      })
      .then(({ data }) => {
        return data;
      });
    setTwitchSuggestions(show_note_suggestion.recommendations['twitch']);
    setYoutubeSuggestions(show_note_suggestion.recommendations['youtube']);
  };
  return (
    <AnimationWrapper>
      <div class='bg-[#F4F5FA]  '>
        <div className='flex items-center justify-center h-screen'>
          <div className='flex-1 flex flex-col items-center justify-start space-y-4 mt-[300px]'>
            <div class='flex flex-col justify-center items-center text-center'>
              <div class='max-w-lg font-bold font-sans text-3xl'>
                Use Our AI Models to Experience Unveiling Platform Trends
                Through Trending Video Analysis
              </div>
              <div class='font-light max-w-lg my-5 text-2xl'>
                Discover the future of content strategy with our AI-powered
                insights, where we analyze trending videos across platforms to
                deliver precise content suggestions. Elevate your digital
                presence with data-driven recommendations tailored to captivate
                your audience.
              </div>
            </div>
            {/* Left rectangles */}
            <div className='flex justify-center items-center pb-5'>
              <BoxWithText
                title='Top Trend YouTube'
                text1='Guess the Minecraft block in 60 seconds 6'
                text2='Sonic vs SuperHeroes in Rage Control Run Funny Animation'
                text3='Hardcore is coming to Bedrock Edition!'
                text4='¡Minecraft PERO es 1 BLOQUE de LEGO! 😲🧱💛 SILVIOGAMER MINECRAFT PERO'
                text5='Minecraft, But Leaving This Color KILLS YOU…'
              />
            </div>
            <div className='flex justify-center items-center'>
              <BoxWithText
                title='Top Trend TikTok'
                text1='Twitch Rivals: SquidCraft Games ft. Komanche - Día Final'
                text2='QSMP - fundando a ORDO THEORITAS, quebrando regras e reddit depois'
                text3='⛏️ MINECRAFT QSMP #01 - O INÍCIO'
                text4='ENIGMA DO QSMP, cuidando do Richarlyson e jogo de terror depois'
                text5='Tournament Time!!! Announcement After'
              />
            </div>
          </div>

          <div className='mx-4 mr-6'>
            {/* Big button in the middle */}
            <button
              type='button'
              onClick={handleGetInsights}
              class='select-none rounded-lg px-6 py-3.5 text-base font-medium text-white text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80'
            >
              Get Insights
            </button>
          </div>

          <div className='flex-1 flex flex-col items-center justify-center space-y-4 mt-[1200px]'>
            {/* Right rectangles */}
            <div class='flex flex-col md:flex-col space-x-0 md:space-x-8  md:space-y-0 justify-between mt-10 sp'>
              <div class='bg-[#ECEEFF] rounded-xl pb-10'>
                <div class='flex flex-col p-8 rounded-xl bg-white shadow-xl space-y-100 w-96 md:w-auto'>
                  <div class='mt-3 font-semibold text-lg'>
                    {youtubeSuggestions.length > 0
                      ? youtubeSuggestions[0].title
                      : `Sonic vs SuperHeroes in Rage Control Run Funny Animation
                    #minecraft #sonic #minecraftanimation`}
                  </div>
                  <a
                    href='https://www.youtube.com/watch?v=kVOJFpfQPb4'
                    class='text-sm font-light w-60 md:w-auto'
                  >
                    <img
                      src='https://i.ytimg.com/vi/kVOJFpfQPb4/default.jpg'
                      alt='Description'
                    />
                  </a>
                  <div class='my-4'></div>

                  <button class='bg-[#F4F5FA] px-4 py-3 rounded-full space-y-100  border border-[#F0F0F6] shadow-xl mt-4'>
                    {youtubeSuggestions.length > 0
                      ? youtubeSuggestions[0].reason
                      : `Because it's trending in YouTube while it's not trending in Twitch`}
                  </button>
                </div>
              </div>

              <div class='bg-[#ECEEFF] rounded-xl pb-10'>
                <div class='flex flex-col p-8 rounded-xl bg-white shadow-xl space-y-100 w-96 md:w-auto'>
                  <div class='mt-3 font-semibold text-lg'>
                    {youtubeSuggestions.length > 0
                      ? youtubeSuggestions[0].title
                      : `ROBLOX OR MINECRAFT #roblox #minecraft #animation`}
                  </div>
                  <a
                    href='https://www.youtube.com/watch?v=UgRo_9LO2NA'
                    class='text-sm font-light w-30 md:w-auto'
                  >
                    <img
                      src='https://i.ytimg.com/vi/UgRo_9LO2NA/mqdefault.jpg'
                      alt='Description'
                    />
                  </a>
                  <div class='my-4'>
                    <span class='font-bold text-base'></span>
                    <span class='font-light text-sm'></span>
                  </div>

                  <button class='bg-[#F4F5FA] px-4 py-3 rounded-full space-y-100  border border-[#F0F0F6] shadow-xl mt-4'>
                    {youtubeSuggestions.length > 0
                      ? youtubeSuggestions[1].reason
                      : `This is trending in YouTube while it's not trending in Twitch that there is a high chance of success for you.`}
                  </button>
                </div>
              </div>

              <div class='bg-[#ECEEFF] rounded-xl pb-10'>
                <div class='flex flex-col p-8 rounded-xl bg-white shadow-xl space-y-100 w-96 md:w-auto'>
                  <div class='mt-3 font-semibold text-lg'>
                  {youtubeSuggestions.length > 0
                      ? youtubeSuggestions[2].title
                      : `Help Build a Queen Run Challenge With JJ - Minecraft
                    Animation #shorts #minecraft #maizen`}
                  </div>
                  <a
                    href='https://www.youtube.com/watch?v=mXo2xqlOF8U'
                    class='text-sm font-light w-30 md:w-auto'
                  >
                    <img
                      class='w-100'
                      src='https://i.ytimg.com/vi/mXo2xqlOF8U/mqdefault.jpg'
                      alt='Description'
                    />
                  </a>
                  <div class='my-4'>
                    <span class='font-bold text-base'></span>
                    <span class='font-light text-sm'></span>
                  </div>

                  <button class='bg-[#F4F5FA] px-4 py-3 rounded-full space-y-100  border border-[#F0F0F6] shadow-xl mt-4'>
                  {youtubeSuggestions.length > 0
                      ? youtubeSuggestions[2].reason
                      : `https://i.ytimg.com/vi/mXo2xqlOF8U/mqdefault.jpg`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default AnalyticsPage;
