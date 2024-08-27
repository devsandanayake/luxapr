import React, { useState } from 'react';
import { Pannellum } from 'pannellum-react';
import { FaTimes } from 'react-icons/fa';
import './AllPhotosPopup.css'; // Create a CSS file for styling

const AllPhotosPopup = ({ images, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const isEquirectangular = (image) => image.includes('images360');

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="main-image-containerrr">
          {isEquirectangular(images[currentIndex]) ? (
            <Pannellum
              width="100%"
              height="100%"
              image={`http://124.43.179.118:8081/uploads/${images[currentIndex].split('\\').pop()}`}
              pitch={10}
              yaw={180}
              hfov={110}
              autoLoad
            />
          ) : (
            <img
              src={`http://124.43.179.118:8081/uploads/${images[currentIndex].split('\\').pop()}`}
              alt={`Slide ${currentIndex}`}
              className="main-image"
            />
          )}
        </div>


        <div className="thumbnaill-slider">
          {images.map((image, index) => (
            <img
              key={index}
              src={`http://124.43.179.118:8081/uploads/${image.split('\\').pop()}`}
              alt={`Thumbnail ${index}`}
              className={`thumbnaill ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default AllPhotosPopup;
