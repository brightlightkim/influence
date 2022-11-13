import Navbar from './components/Navbar/Navbar';
import UrlList from './components/URL_List/UrlList';
import YoutubeList from './components/URL_List/YoutubeList';
import FacebookList from './components/URL_List/FacebookList';
import InstagramList from './components/URL_List/InstagramList';
import Likes from './components/mainpage/Likes'
import Views from './components/mainpage/Views'
import Comments from './components/mainpage/Comments'
import Share from './components/mainpage/Share'
import { UrlThemeProvider } from './context/Urls'
import './App.css';
import Chart from './components/graph/Chart';


function App() {
  
  // const YouTubeUrlList = UrlList('YOUTUBE')
  return (
    <>
      <Navbar/>
      <UrlThemeProvider>
        <div className='page_container'>
          <div className='url_container'>
          <UrlList/>
          <YoutubeList/>
          <InstagramList/>
          <FacebookList/>
          </div>
          
          <div className='graph_page_container'>
            <div className='graph_data_container'>
              <Views/>
              <Likes/>
              <Share/>
              <Comments/>
            </div>
            <div className='chart_container'>
              <Chart/>
            </div>
            
          </div>
        </div>
      </UrlThemeProvider>
    </>
  );
}

export default App;
