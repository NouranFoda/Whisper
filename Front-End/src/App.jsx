import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import Foundation from './Foundation/Foundation';
import Notifications from './Notifications/Notifications';
import ViewTweet from './Notifications/ViewTweet';
import Bookmarks from './Bookmarks/Bookmarks';
import Settings from './Settings/Settings';
import Home from './Home/Home';
import Start from './Start/Start';
import AdminFoundation from './Admin/AdminFoundation';
import AdminUsers from './Admin/AdminUsers';
import Dashboard from './Admin/Dashboard';
import Search from './Search/Search';
import Tweet from './Home/Components/Tweet';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem('logged');
    const admin = localStorage.getItem('admin');
    setIsLoggedIn(JSON.parse(logged));
    setisAdmin(JSON.parse(admin));
    document.getElementsByTagName('body')[0].style.setProperty('overflow-y', 'scroll');
  }, [localStorage.getItem('logged'), localStorage.getItem('admin')]);
  const mainPage = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return <AdminFoundation setIsLoggedIn={setIsLoggedIn} setisAdmin={setisAdmin} />;
      }
      return <Foundation setIsLoggedIn={setIsLoggedIn} setisAdmin={setisAdmin} />;
    }
    return <Start setIsLoggedIn={setIsLoggedIn} setisAdmin={setisAdmin} />;
  };

  const mainPath = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return 'users';
      }
      return 'Home';
    }
    return '';
  };
  const adminRoutes = () => (
    <>
      <Route path="users" element={<AdminUsers state="unblocked" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="blocked-users" element={<AdminUsers state="blocked" />} />
    </>
  );
  const startRoutes = () => (
    null
  );
  const userRoutes = () => (
    <>
      <Route path="Home" element={<Home />} />
      <Route path="Notifications" element={<Notifications />} />
      <Route path="ViewTweet" element={<ViewTweet />} />
      <Route path="Bookmarks" element={<Bookmarks />} />
      <Route path="tweet/:id" element={<Tweet />} />
      <Route path="Search" element={<Search />} />
      <Route path="Settings" element={<Settings />} />
      {/* <Route path="TweetBox" element={<Settings />} /> */}
    </>
  );
  const selectingRoute = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return adminRoutes();
      }
      return userRoutes();
    }
    return startRoutes();
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={mainPage()}>
          {selectingRoute()}
          <Route path="" element={<Navigate to={mainPath()} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
