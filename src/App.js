import Navbar from './components/Navbar/Navbar';
import UrlList from './components/URL_List/UrlList';
import MainPage from './components/mainpage/MainPage'
import './App.css';

function App() {
  
  return (
    <>
      <Navbar/>
      <div className='container'>
        <UrlList/>
        <MainPage/>
      </div>
    </>
  );
}

export default App;
