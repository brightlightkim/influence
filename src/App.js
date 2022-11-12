import Navbar from './components/Navbar/Navbar';
import UrlList from './components/URL_List/UrlList';
import Views from './components/mainpage/Views'
import Likes from './components/mainpage/Likes'
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
          <UrlList/>
          <div className='graph_page_container'>
            <div className='graph_data_container'>
              <Views/>
              <Likes/>
              <Share/>
              <Comments/>
            </div>
            <Chart/>
          </div>
        </div>
      </UrlThemeProvider>
    </>
  );
}

export default App;
