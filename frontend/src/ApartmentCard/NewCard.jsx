import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NewCard.css'; // Import the CSS file for styling
import background from '../Images/bg2.jpg'; 
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";

const NewCard = ({ apartment }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();


    // Ensure apartment.title is defined before accessing its length
    const truncatedTitle = apartment.element.title && apartment.element.title.length > 80 
        ? apartment.element.title.substring(0, 80) + '...' 
        : apartment.element.title || 'No Title Available';

    const priceTag = (() => {
        if (apartment.element.transactionType === 1) {
            return "Per Day";
        } else if (apartment.element.transactionType === 2) {
            return "Per Month";
        } else if (apartment.element.transactionType === 3) {
            return "Per Day";
        } else {
            return "";
        }
    })();

    const TermTag = (() => {
        if (apartment.element.transactionType === 1) {
            return "Short-Term";
        } else if (apartment.element.transactionType === 2) {
            return "Long-Term";
        } else if (apartment.element.transactionType === 3) {
            return "Short / Long Term";
        } else if (apartment.element.transactionType === 4) {
            return "Auction";
        }
    })();

    return (
        <div
            className="newcard"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/viewapartment?adcode=${apartment.element.adCode}`)}
        >
            <div className="image-containerr">
                <img 
                    src={apartment.element.images && apartment.element.images.length > 0 
                        ? `http://124.43.179.118:8081/uploads/${apartment.element.images[0].split('\\').pop()}` 
                        : background}  
                    alt={apartment.element.name || "Room"} 
                    className="room-imagee" 
                />
                {apartment.element.transactionType !== 3 && (
                <div className="price-taggg">LKR. &nbsp;{apartment.element.price}/= {priceTag}</div>
                )}
                <div className="term-taggg">{TermTag}</div>
            </div>
            <div className={`detailsss ${isHovered ? 'expanded' : ''}`}>
                <h3>{truncatedTitle}</h3>
                <p>{apartment.element.areas}, &nbsp; {apartment.element.districts}</p>
                <div className="infooo">
                    <span><IoBedOutline />({apartment.element.bedroomCount}) Bed's</span>
                    <span><FaShower />({apartment.element.bathroomCount}) Baths</span>
                </div>
            </div>
        </div>
    );
};

export default NewCard;