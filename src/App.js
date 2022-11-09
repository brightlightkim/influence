import Navbar from './components/Navbar/Navbar';
import UrlList from './components/URL_List/UrlList';
import './App.css';

function App() {
  
  return (
    <>
      <Navbar/>
      <div className='container'>
        <UrlList/>
      </div>
    </>
  );
}

export default App;
