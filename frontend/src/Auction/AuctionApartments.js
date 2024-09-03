import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import './AuctionApartments.css';
import background from '../Images/ap1.jpg';
import AuctionCard from '../AuctionCard/AuctionCard';

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
        <div className="auction-image">
          <img src={background} alt="Auction House" className="auction-img" />
        </div>
      </div>

      {/* Auction Apartments Section */}
      <div className="auction-list">
        {apartments.map((apartment, index) => (
          <AuctionCard key={index} apartment={{ element: apartment }} />
        ))}
      </div>
    </>
  );
}