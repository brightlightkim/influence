import { useContext, useState } from 'react';
import logo from '../imgs/logo.png';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import UserNavigationPanel from './user-navigation.component';

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  
  const {
    userAuth,
    userAuth: { access_token, profile_img },
  } = useContext(UserContext);

  const [userNavPanel, setUserNavPanel] = useState(false);

  let navigate = useNavigate();
  
  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };

  const handleSearch = (e) => {
    let query = e.target.value;

    if(e.keyCode == 13 && query.length) {
      navigate(`/search/${query}`);
    }
  }

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };


  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='flex-none w-20'>
          <img src={logo} className='w-full' />
        </Link>
        <h4 className='font-medium text-red text-2xl'>Swift Shorts</h4>
        

        <div className='flex items-center gap-3 md:gap-6 ml-auto'>

          {access_token ? (
            <>
              <div
                className='relative'
                onClick={handleUserNavPanel}
                onBlur={handleBlur}
              >
                <button className='w-12 h-12 mt-1'>
                  <img
                    src={profile_img}
                    className='w-12 h-full object-cover rounded-full'
                  />
                </button>
                {userNavPanel ? <UserNavigationPanel /> : ''}
              </div>
            </>
          ) : (
            <>
              <Link to='/signin' className='btn-dark py-2'>
                Sign In
              </Link>

              <Link to='/signup' className='btn-light py-2 hidden md:block'>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
