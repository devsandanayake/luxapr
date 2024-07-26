import React, { useState } from 'react';
import './ApartmentCard.css'; // Import the CSS file for styling
import background from '../Images/bg2.jpg'; 

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
                <div className="price-tag">$219/Night</div>
            </div>
            <div className={`details ${isHovered ? 'expanded' : ''}`}>
                <h3>{apartment.title || "Double Room"}</h3>
                <p>{apartment.description || "facilisis tempor erat facilisis."}</p>
                <p>{apartment.additionalInfo || "Proin imperdiet rutrum cursus"}</p>
                <div className="info">
                    <span>{apartment.beds ? `(${apartment.beds}) bed's` : "(3) bed's"}</span>
                    <span>{apartment.guests ? `(${apartment.guests}) Guest's` : "(4) Guest's"}</span>
                </div>
                <div className="read-more">
                    <a href="#">READ MORE</a>
                    <span className="rating">★ {apartment.rating || "4.9 2k"}</span>
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;
