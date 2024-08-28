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
import { suggestLocations } from 'srilanka-location'; 
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
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedRoomCount, setSelectedRoomCount] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [areas, setAreas] = useState([]);
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
          const updateLocationSuggestions = (district) => {
          const suggestions = suggestLocations(district);
          const districtSuggestion =  suggestions[0] ;
          setSuggestions(districtSuggestion ? [districtSuggestion] : []);
        };
    
      const handleDistrictChange = (e) => {
        const newDistrict = e.target.value;
        setSelectedDistrict(newDistrict);
        updateLocationSuggestions(newDistrict);
      };
    
      const handleSuggestionClick = (suggestion) => {
        setSelectedDistrict(suggestion.district);
        setAreas(suggestion.areas);
        setSuggestions([]);
      };
    
      const handleAreaChange = (e) => {
        setSelectedArea(e.target.value);
      };
    
      const handleCheckNow = () => {
        const queryParams = new URLSearchParams({
          district: selectedDistrict.toLowerCase(),
          area: selectedArea.toLowerCase(),
          startDate,
          endDate,
          roomCount: selectedRoomCount
        }).toString();
      
        navigate(`/allapartments?${queryParams}`);
      };

  return (
    <>
      <div className="slider-container">
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

        <div className="booking-form-container">
          <div className="booking-form">
            <div className="booking-field">
            
              <label className='districtField' htmlFor="district">District</label>
              <input 
                type="text" 
                id="district" 
                value={selectedDistrict} 
                onChange={handleDistrictChange} 
                placeholder="Enter District" 
              />
        
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-2 rounded-lg cursor-pointer disSuggestion"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.district}
                </div>
              ))}
              </div>
          
            <div className="booking-field">
              <label htmlFor="area">Area</label>
              {Array.isArray(areas) && areas.length > 0 ? (
                <select 
                  id="area" 
                  value={selectedArea} 
                  onChange={handleAreaChange}
                >
                  {areas.map((area, areaIndex) => (
                    <option key={areaIndex} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              ) : (
                <input 
                  type="text" 
                  id="area" 
                  value={selectedArea} 
                  onChange={handleAreaChange} 
                  placeholder="Enter Area" 
                />
              )}
            </div>
            <div className="booking-field">
              <label htmlFor="startDate">Check In</label>
              <input 
                type="date" 
                id="startDate" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
              />
            </div>
            <div className="booking-field">
              <label htmlFor="endDate">Check Out</label>
              <input 
                type="date" 
                id="endDate" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
              />
            </div>
            <div className="booking-field">
              <label htmlFor="roomCount">Room</label>
              <select 
                id="roomCount" 
                value={selectedRoomCount} 
                onChange={(e) => setSelectedRoomCount(e.target.value)}
              >
                <option value="">Select Room Count</option>
                <option value="1">1 Room</option>
                <option value="2">2 Rooms</option>
                <option value="3">3 Rooms</option>
                <option value="4">4 Rooms</option>
                <option value="5">5 Rooms</option>
              </select>
            </div>
            <div className="booking-button">
              <button type="button" onClick={handleCheckNow}>CHECK</button>
            </div>
          </div>
</div>
        </div>
        
        {/* Include the luxury living details here */}
        <div className='w-full flex items-center justify-center mt-10'>
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

      <div className="auction-description">
        <p className="auction-text">
          We also have an auction for the apartments where users can browse and place bids on their desired properties. Experience the excitement of finding your dream home at a great price!
        </p>
        <a href='/auctionapartments'>
        <button type="button" className="auction-button">Go to Auction <FaArrowRight /></button>
        </a>
      </div>

      <div className='OurLatest'>
        Our Latest Apartments
      </div>

      <div className="apartment-list-container">
        <div className="apartment-list flex flex-wrap gap-4">
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