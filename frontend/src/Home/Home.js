import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Apartment1 from '../Images/ap1.jpg';
import Apartment2 from '../Images/ap2.jpg';
import Apartment3 from '../Images/ap3.jpg';
import axios from 'axios';
import axiosInstance from '../axiosConfig';
import './Home.css';
import background from '../Images/bg2.jpg';
import SriLanka from '../Images/SriLanka.jpg';

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

Discover luxury living with our exclusive high-end apartments for sale and rent across Sri Lanka. Whether you prefer beachfront serenity, city vibrancy, or hillside tranquility, we offer diverse apartments to meet your desires.              </p>
              <p className="luxury-living-description">
              Our meticulously designed apartments provide the highest standards of comfort, style, and sophistication. Enjoy state-of-the-art amenities, breathtaking views, exquisite interiors, and premium finishes—each apartment is a testament to modern elegance and quality.              </p>
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

      <div className='background'>
      </div>

      

      <div className='flex justify-center items-center'>
        <div className="ml-2 mr-2 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {apartments.map((apartment) => (
            <Link 
              key={apartment._id} 
              to={`/viewapartment?adCode=${apartment.adCode}`} 
              className="apartment-card p-2 shadow-2xl hover:transform hover:scale-102 transition-transform duration-300 ease-in-out"
            >
              {apartment.images && apartment.images.length > 0 ? (
                <img
                  src={`http://localhost:8005/uploads/${apartment.images[0].split('\\').pop()}`}
                  alt={apartment.name}
                  className="apartment-image object-cover"
                />
              ) : (
                <img src={Apartment1} alt="Default Apartment" className="apartment-image w-full object-cover" />
              )}
              <div className="flex-1 mt-2">
                <div className='text-xl text-center font-bold font-playfair'>{apartment.title}</div>
                <p className='text-md'>{apartment.address}</p>
                <p className='text-md'>{apartment.description}</p>
                <p className='text-md'>{apartment.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}