import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Main/NavBar';
import './index.css';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
