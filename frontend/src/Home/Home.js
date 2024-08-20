import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import Apartment1 from '../Images/ap1.jpg';
import Apartment2 from '../Images/ap2.jpg';
import Apartment3 from '../Images/ap3.jpg';
import axios from 'axios';
import axiosInstance from '../axiosConfig';
import './Home.css';
import background from '../Images/bg2.jpg';
import SriLanka from '../Images/SriLanka.png';
import { FaArrowRight } from "react-icons/fa";
import ApartmentCard from '../ApartmentCard/ApartmentCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [apartments, setApartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axiosInstance.get('/api/ads/viewAds');
        setApartments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApartments();
  }, []);

  const displayedApartments = apartments
      .filter(apartment => apartment.transactionType !== 4)
      .slice(0, 4);

  const handleCheckNow = () => {
    const district = document.getElementById('district').value.toLowerCase();
    const area = document.getElementById('area').value.toLowerCase();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const roomCount = document.getElementById('roomCount').value;
  
    const queryParams = new URLSearchParams({
      district,
      area,
      startDate,
      endDate,
      roomCount
    }).toString();
  
    navigate(`/allapartments?${queryParams}`);
  };

  return (
    <>
      <div className="slider-container" style={{ height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
        <div className="slider-title">
          Discover and Own Your Dream Luxury Apartment
        </div>
        <Slider {...settings}>
          <div>
            <img src={Apartment1} alt="Apartment 1" style={{ width: '100vw', height: '100vh', objectFit: 'cover', filter: 'brightness(0.4)' }} />
          </div>
          <div>
            <img src={Apartment2} alt="Apartment 2" style={{ width: '100vw', height: '100vh', objectFit: 'cover', filter: 'brightness(0.4)' }} />
          </div>
          <div>
            <img src={Apartment3} alt="Apartment 3" style={{ width: '100vw', height: '100vh', objectFit: 'cover', filter: 'brightness(0.4)' }} />
          </div>
        </Slider>
        
        {/* Include the luxury living details here */}
        <div className="luxury-living-container">
          <div className="luxury-living-title">Welcome to Your Luxury Living Experience in Sri Lanka</div>
          <div className="luxury-living-content flex">
            <div className="luxury-living-text">
              <p className="luxury-living-description">
                Welcome to Your Luxury Living Experience in Sri Lanka
                Discover luxury living with our exclusive high-end apartments for sale and rent across Sri Lanka. Whether you prefer beachfront serenity, city vibrancy, or hillside tranquility, we offer diverse apartments to meet your desires.
              </p>
              <p className="luxury-living-description">
                Our meticulously designed apartments provide the highest standards of comfort, style, and sophistication. Enjoy state-of-the-art amenities, breathtaking views, exquisite interiors, and premium finishes—each apartment is a testament to modern elegance and quality.
              </p>
              <p className="luxury-living-description">
                Explore our collection and find your dream home in Sri Lanka's most coveted locations. Whether you're looking to invest, relocate, or simply indulge in a lavish lifestyle, we are here to make your real estate journey seamless and exceptional.
              </p>
              <p className="luxury-living-description font-bold">
                Experience luxury like never before. Welcome home.
              </p>
            </div>
            <div className="luxury-living-image">
              <img src={SriLanka} alt="Sri Lanka" />
            </div>
          </div>
        </div>
      </div>

      <div className='background'></div>

      <div className='text-3xl p-2' style={{ fontFamily: 'Georgia, serif' }}>
        Find Your Luxury Apartments
      </div>

      <div className="booking-form-container">
        <div className="booking-form">
          <div className="booking-field">
            <label htmlFor="location">District</label>
            <input type="text" id="district" name="districtt" placeholder="Enter District" />
          </div>
          <div className="booking-field">
            <label htmlFor="Period">Area</label>
            <input type="text" id="area" name="area" placeholder="Enter Area" />
          </div>
          <div className="booking-field">
            <label htmlFor="checkin">Check In</label>
            <input type="date" id="startDate" name="startDate" placeholder="dd-----yyyy" />
          </div>
          <div className="booking-field">
            <label htmlFor="checkout">Check Out</label>
            <input type="date" id="endDate" name="endDate" placeholder="dd-----yyyy" />
          </div>
          <div className="booking-field">
            <label htmlFor="room">Room</label>
            <select id="roomCount" name="roomCount">
              <option value="">Select Room Count</option>
              <option value="1">1 Room</option>
              <option value="2">2 Rooms</option>
              <option value="3">3 Rooms</option>
              <option value="4">4 Rooms</option>
              <option value="5">5 Rooms</option>
            </select>
          </div>
          <div className="booking-button">
            <button type="button" onClick={handleCheckNow}>CHECK NOW</button>
          </div>
        </div>
      </div>

      <div className="auction-description">
        <p className="auction-text">
          We also have an auction for the apartments where users can browse and place bids on their desired properties. Experience the excitement of finding your dream home at a great price!
        </p>
        <button type="button" className="auction-button">Go to Auction <FaArrowRight /></button>
      </div>

      <div className='text-3xl p-2 mt-10' style={{ fontFamily: 'Georgia, serif' }}>
        Our Apartments
      </div>

      <div className="apartment-list-container">
        <div className="apartment-list flex flex-wrap gap-4 p-2">
          {displayedApartments.map(apartment => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      </div>

      <div className='flex items-center justify-center mb-20'>
        <a href='/allapartments'>
          <button className='all-apartments-button'> All Apartments <FaArrowRight className="arrow" /></button>
        </a>
      </div>
    </>
  );
}