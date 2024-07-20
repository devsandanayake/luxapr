import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Main/NavBar';
import './index.css';

import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import ContactUs from './ContactUs/ContactUs';
import AddApartment from './Apartments/AddApartment';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/addapartment" element={<AddApartment />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
