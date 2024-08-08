import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useLocation } from 'react-router-dom';
import { FaUserAlt, FaPhoneAlt, FaCommentAlt } from 'react-icons/fa'; // Importing suitable icons
import './AuctionInquiry.css';
import PopupWindow from './NotificationPopup';

export default function AuctionInquiry() {
  const token = localStorage.getItem('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : {};

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const auctionID = queryParams.get('auctionID');

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    auctionID: auctionID,
    Name: '',
    number: '',
    message: '',
  });

  const [apartmentDetails, setApartmentDetails] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/auction-inquery/addInquery', formData, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      setIsPopupVisible(true);
    } catch (error) {
      console.error('There was an error creating the rental transaction!', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      )}
      <div>
        <h1 className='title text-3xl mt-20 ml-3 text-gold' style={{ fontFamily: 'Georgia, serif' }}>Send Your Message</h1>
      </div>
      <div className="full-screen">
        <div className='w-8/12'>
          <form className='mt-10 ml-3 w-full mb-5' onSubmit={handleSubmit}>
                        <div className='mt-2'>
              <label className='text-lg' htmlFor="Name">Name</label>
              <div className='relative'>
                <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                <input 
                  type="text" 
                  id="Name" 
                  name="Name" 
                  value={formData.Name} 
                  onChange={handleChange} 
                  className="input pl-10"
                  required 
                />
              </div>
            </div>
            <div className='mt-2'>
              <label className='text-lg' htmlFor="number">Phone Number</label>
              <div className='relative'>
                <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                <input 
                  type="text" 
                  id="number" 
                  name="number" 
                  value={formData.number} 
                  onChange={handleChange} 
                  className="input pl-10"
                  required 
                />
              </div>
            </div>
            <div className='mt-2'>
              <label className='text-lg' htmlFor="message">Message</label>
              <div className='relative'>
                <FaCommentAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  className="input pl-10"
                />
              </div>
            </div>
            <button type="submit" className='submitt'>Submit</button>
          </form>
          {isPopupVisible && <PopupWindow />}
        </div>
      </div>
    </>
  );
}