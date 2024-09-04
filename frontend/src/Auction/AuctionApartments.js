import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import './AuctionApartments.css';
import background from '../Images/ap1.jpg';
import background1 from '../Images/ap2.jpg';
import background2 from '../Images/ap3.jpg';
import AuctionCard from '../AuctionCard/AuctionCard';
import { FaArrowRight } from 'react-icons/fa';

export default function AuctionApartments() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    axiosInstance.get('/api/ads/viewAds')
      .then(res => {
        const apartmentData = res.data
          .map(item => item.element)
          .filter(apartment => apartment.transactionType === 4 && apartment.auctionStatus.status === true);
        setApartments(apartmentData);
        console.log(apartmentData);
      });
  }, []);

  return (
    <>
      <div className="auction-container">
        {/* Background and Text Section */}
        <div className="auction-content">
          <h1 className="auction-title">
            Find Your Next <span className="highlight">Auction</span> Apartment
          </h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search properties by location or postcode"
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>
        </div>
        
        {/* Image Section */}
        <div className="auction-images">
          <img src={background} alt="Auction House 1" className="auction-img" />
          <img src={background1} alt="Auction House 2" className="small-img" />
        </div>
      </div>

      {/* Auction Apartments Section */}
      <div className='zauction-apartments'>
        <h1 className='auction-apartments-title'>Our Latest Auction Apartments</h1>
      </div>


      <div className="auction-list">
        {apartments.map((apartment, index) => (
          <AuctionCard key={index} apartment={{ element: apartment }} />
        ))}
      </div>

        <div className='w-full flex items-center justify-center mb-10'>
        <button className='all-apartments-button'> All Apartments <FaArrowRight className="arrow" /></button>
      </div>
    </>
  );
}
