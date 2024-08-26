import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NewCard.css'; // Import the CSS file for styling
import background from '../../Images/bg2.jpg'; 
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";

const NewCard = ({ apartment }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();


    // Ensure apartment.title is defined before accessing its length
    const truncatedTitle = apartment.title && apartment.title.length > 80 
        ? apartment.title.substring(0, 80) + '...' 
        : apartment.title || 'No Title Available';

    const priceTag = (() => {
        if (apartment.transactionType === 1) {
            return "Per Day";
        } else if (apartment.transactionType === 2) {
            return "Per Month";
        } else if (apartment.transactionType === 3) {
            return "Per Day";
        } else {
            return "";
        }
    })();

    const TermTag = (() => {
        if (apartment.transactionType === 1) {
            return "Short-Term";
        } else if (apartment.transactionType === 2) {
            return "Long-Term";
        } else if (apartment.transactionType === 3) {
            return "Short / Long Term";
        } else if (apartment.transactionType === 4) {
            return "Auction";
        }
    })();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div
            className="newcard"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/viewapartment?adcode=${apartment.adCode}`)}
        >
            <div className="image-containerr">
                <img 
                    src={apartment.images && apartment.images.length > 0 
                        ? `http://124.43.179.118:8081/uploads/${apartment.images[0].split('\\').pop()}` 
                        : background}  
                    alt={apartment.name || "Room"} 
                    className="room-imagee" 
                />
                {apartment.transactionType !== 3 && (
                <div className="price-taggg">LKR. &nbsp;{apartment.price}/= {priceTag}</div>
                )}
                <div className="term-taggg">{TermTag}</div>
            </div>
            <div className={`detailsss ${isHovered ? 'expanded' : ''}`}>
                <h3>{truncatedTitle}</h3>
                <p>
            {capitalizeFirstLetter(apartment.areas)}, &nbsp; 
            {capitalizeFirstLetter(apartment.districts)}
        </p>                <div className="infooo">
                    <span><IoBedOutline />({apartment.bedroomCount}) Bed's</span>
                    <span><FaShower />({apartment.bathroomCount}) Baths</span>
                </div>
            </div>
        </div>
    );
};

export default NewCard;