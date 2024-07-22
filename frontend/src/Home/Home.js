import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Apartment1 from '../Images/ap1.jpg';
import Apartment2 from '../Images/ap2.jpg';
import Apartment3 from '../Images/ap3.jpg';
import axios from 'axios';
import axiosInstance from '../axiosConfig';
import './Home.css';

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

  // const sectionRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const section = sectionRef.current;
  //     const scrollY = window.scrollY;
  //     const windowHeight = window.innerHeight;
      
  //     if (scrollY >= windowHeight) {
  //       section.classList.add('visible');
  //     } else {
  //       section.classList.remove('visible');
  //     }

  //     section.style.opacity = Math.min(scrollY / windowHeight, 1);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

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
          <img src={Apartment1} alt="Apartment 1" style={{ width: '100vw', height: '100vh', objectFit: 'cover',filter: 'brightness(0.4)'  }} />
        </div>
        <div>
          <img src={Apartment2} alt="Apartment 2" style={{ width: '100vw', height: '100vh', objectFit: 'cover',filter: 'brightness(0.4)' }} />
        </div>
        <div>
          <img src={Apartment3} alt="Apartment 3" style={{ width: '100vw', height: '100vh', objectFit: 'cover',filter: 'brightness(0.4)' }} />
        </div>
      </Slider>
    </div>

    {/* <div ref={sectionRef} className="browse-apartments-section">
        <h1>Browse Apartments</h1>
      </div> */}

      <div className='flex justify-center items-center mt-3'>
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
