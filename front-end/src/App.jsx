import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.component';
import UserAuthForm from './pages/userAuthForm.page';
import { createContext, useEffect, useState } from 'react';
import { lookInSession } from './common/session';
import Editor from './pages/editor.pages';
import HomePage from './pages/home.page';
import PageNotFound from './pages/404.page';
import AnalyticsPage from './pages/analytics.page';

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState(() => {
    const userInSession = lookInSession('user');
    return userInSession ? JSON.parse(userInSession) : { access_token: null };
  });

  useEffect(() => {
    let userInSession = lookInSession('user');

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path='/editor' element={<Editor />} />
          <Route path='/editor/:blog_id' element={<Editor />} />
          <Route path='/signin' element={<UserAuthForm type='sign-in' />} />
          <Route path='/signup' element={<UserAuthForm type='sign-up' />} />
          <Route path='/analytics' element={<AnalyticsPage />} />
          {/* <Route path='search/:query' element={<SearchPage />} /> */}
          {/* <Route path='user/:id' element={<ProfilePage />} />
          <Route path='blog/:blog_id' element={<BlogPage />} /> */}
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
