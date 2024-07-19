import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Main/NavBar';
import './index.css';

import Home from './Home/Home';
import Login from './Login/Login';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
