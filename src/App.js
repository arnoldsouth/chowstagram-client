import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './container/Home.jsx';
import Login from './components/Login.jsx';

import './App.css';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User =
      localStorage.getItem('user') !== 'undefined'
        ? JSON.parse(localStorage.getItem('user'))
        : localStorage.clear();

    if (!User) navigate('/login');
  }, []);

  return (
    <Routes>
      <Route
        path="login"
        element={<Login />}
      />
      <Route
        path="/*"
        element={<Home />}
      />
    </Routes>
  );
};

export default App;
