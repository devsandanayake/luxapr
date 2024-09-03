import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useLocation } from 'react-router-dom';
import './AuctionRegistraton.css';

export default function AuctionRegistration() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const auctionID = searchParams.get('auctionID');
  const adcode = searchParams.get('adcode');

  const token = localStorage.getItem('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const userName = decodedToken.firstName || '';

  const [formData, setFormData] = useState({
    auctionID: auctionID || '',
    adCode: adcode || '',
    userName: userName || '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosInstance.post('/api/auction/registerAuction',
        formData,
        {
          headers: {
            'Authorization': `${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.error || 'An error occurred during registration.');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.error || 'An error occurred during registration.'
      );
    }
  };

  return (
    <>
    <div className='w-full h-screen flex items-center justify-center'>
    <div className="ARregistration-container">
      <h1 className="ARregistration-title">Auction Registration</h1>
      <form className="ARregistration-form" onSubmit={handleSubmit}>
        <div className="ARform-group">
          <label htmlFor="auctionID">Auction ID</label>
          <input
            type="text"
            id="auctionID"
            name="auctionID"
            value={formData.auctionID}
            onChange={handleChange}
            required
          />
        </div>

        <div className="ARform-group">
          <label htmlFor="adCode">Ad Code</label>
          <input
            type="text"
            id="adCode"
            name="adCode"
            value={formData.adCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="ARform-group">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            readOnly
          />
        </div>

        <button type="submit" className="ARsubmit-button">
          Register
        </button>
      </form>
      {message && <p className="ARmessage">{message}</p>}
    </div>
    </div>
    </>
  );
}
