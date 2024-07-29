import React, { useState } from 'react';
import './ApartmentCard.css'; // Import the CSS file for styling
import background from '../Images/bg2.jpg'; 
import { IoBedOutline, IoWaterOutline } from "react-icons/io5"; // Import bathroom icon

const ApartmentCard = ({ apartment }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="image-container">
                <img 
                    src={apartment.originImages && apartment.originImages.length > 0 
                        ? `http://124.43.179.118:8081/uploads/${apartment.originImages[0].split('\\').pop()}` 
                        : background}  
                    alt={apartment.name || "Room"} 
                    className="room-image" 
                />
                <div className="price-tag">LKR. &nbsp;{apartment.price}/=</div>
            </div>
            <div className={`details ${isHovered ? 'expanded' : ''}`}>
                <h3>{apartment.title}</h3>
                <p>{apartment.districts}, &nbsp; {apartment.areas}</p>
                <div className="info">
                    <span><IoBedOutline />({apartment.bedroomCount}) Bed's</span>
                    <span><IoWaterOutline />({apartment.bathroomCount}) Baths</span>
                </div>
                <div className="read-more">
                    <a href="#">READ MORE</a>
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;
