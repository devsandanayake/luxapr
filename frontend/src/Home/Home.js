import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Apartment1 from '../Images/ap1.jpg';
import Apartment2 from '../Images/ap2.jpg';
import Apartment3 from '../Images/ap3.jpg';
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

  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollY >= windowHeight) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }

      section.style.opacity = Math.min(scrollY / windowHeight, 1);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

    <div ref={sectionRef} className="browse-apartments-section">
        <h1>Browse Apartments</h1>
      </div>

    </>
  );
}
