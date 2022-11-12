import Navbar from './components/Navbar/Navbar';
import UrlList from './components/URL_List/UrlList';
// import MainPage from './components/mainpage/MainPage'
import { UrlThemeProvider } from './context/Urls'
import './App.css';
import Chart from './components/graph/Chart';


function App() {
  return (
    <>
      <Navbar/>
      <UrlThemeProvider>
        <div className='page_container'>
          <UrlList/>
          {/* <MainPage/> */}
          <Chart/>
        </div>
      </UrlThemeProvider>
    </>
  );
}

export default App;
