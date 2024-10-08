import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Main/NavBar';
import './index.css';
import UserProfile from './UserProfile/UserProfile';
import Home from './Home/Home';
import ContactUs from './ContactUs/ContactUs';
import AddApartment from './Apartments/AddApartment';
import ViewApartment from './Apartments/ViewApartment';
import Footer from './Main/Footer';
import Login from './Login/Login';
import Registration from './UserRegistration/SignUp';
import LongTermBooking from './LongTermBooking/LongTermBooking';
import AllApartments from './Apartments/AllApartments';
import AuctionRegistration from './AuctionRegistration/AuctionRegistration';
import AuctionInquiry from './AuctionInquiry/AuctionInquiry';
import VisitInquiry from './VisitInquiry/VisitInquiry';
import EditProfile from './UserProfile/EditProfile';
import AuctionApartments from './Auction/AuctionApartments';
import Charging from './UserProfile/Charging';
import AuctionPartmentView from './Auction/AuctionPartmentView';
import AuctionDetails from './Auction/AuctionDetails';
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
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/longtermbooking" element={<LongTermBooking />} />
          <Route path="/allapartments" element={<AllApartments />} />
          <Route path="/auctionregistration" element={<AuctionRegistration />} />
          <Route path="/auctioninquiry" element={<AuctionInquiry />} />
          <Route path="/visitinquiry" element={<VisitInquiry />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/auctionapartments" element={<AuctionApartments />} />
          <Route path="/charging/planes" element={<Charging />} />
          <Route path="/auctionapartmentview" element={<AuctionPartmentView />} />
          <Route path="/auctiondetails" element={<AuctionDetails />} />


        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;