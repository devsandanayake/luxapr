import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuctionCard.css'; // Import the CSS file for styling
import background from '../Images/bg2.jpg'; 
import { IoBedOutline} from "react-icons/io5";
import { FaShower } from "react-icons/fa";



const AuctionCard = ({ apartment }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const truncatedTitle = apartment.element.title.length > 80 ? apartment.element.title.substring(0, 80) + '...' : apartment.element.title;


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    return (
        <div
            className="AUcard"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/auctionapartmentview?adcode=${apartment.element.adCode}`)}
        >
            <div className="AUimage-container">
                <img 
                    src={apartment.element.images && apartment.element.images.length > 0 
                        ? `http://124.43.179.118:8081/uploads/${apartment.element.images[0].split('\\').pop()}` 
                        : background}  
                    alt={apartment.element.name || "Room"} 
                    className="AUroom-image" 
                />
            </div>
            <div className={`AUdetails ${isHovered ? 'expanded' : ''}`}>
                <h3>{truncatedTitle}</h3>
                <p>
            {capitalizeFirstLetter(apartment.element.areas)}, &nbsp; 
            {capitalizeFirstLetter(apartment.element.districts)}
                </p>                
            <div className="AUinfo">
                    <span><IoBedOutline />({apartment.element.bedroomCount}) Bed's</span>
                    <span><FaShower />({apartment.element.bathroomCount}) Baths</span>
                </div>
            </div>
        </div>
    );
};

export default AuctionCard;
