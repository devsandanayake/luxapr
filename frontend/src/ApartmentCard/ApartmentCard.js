import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ApartmentCard.css'; // Import the CSS file for styling
import background from '../Images/bg2.jpg'; 
import { IoBedOutline} from "react-icons/io5";
import { FaShower } from "react-icons/fa";


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
                    <span><FaShower />({apartment.bathroomCount}) Baths</span>
                </div>
                <div className="read-more">
  <Link to={`/viewapartment?adcode=${apartment.adCode}`}>READ MORE</Link>
</div>
            </div>
        </div>
    );
};

export default ApartmentCard;
