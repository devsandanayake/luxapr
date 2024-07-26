import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Main/NavBar';
import './index.css';

import Home from './Home/Home';
import ContactUs from './ContactUs/ContactUs';
import AddApartment from './Apartments/AddApartment';
import ViewApartment from './Apartments/ViewApartment';
import Footer from './Main/Footer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="mt-16"> {/* Adjust the padding-top to match the navbar height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/addapartment" element={<AddApartment />} />
          <Route path="/viewapartment" element={<ViewApartment />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;