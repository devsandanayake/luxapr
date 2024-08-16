import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ApartmentCard.css'; // Import the CSS file for styling
import background from '../Images/bg2.jpg'; 
import { IoBedOutline} from "react-icons/io5";
import { FaShower } from "react-icons/fa";


const ApartmentCard = ({ apartment }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const truncatedTitle = apartment.element.title.length > 80 ? apartment.element.title.substring(0, 80) + '...' : apartment.element.title;

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
            className="card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/viewapartment?adcode=${apartment.element.adCode}`)}
        >
            <div className="image-container">
                <img 
                    src={apartment.element.images && apartment.element.images.length > 0 
                        ? `http://124.43.179.118:8081/uploads/${apartment.element.images[0].split('\\').pop()}` 
                        : background}  
                    alt={apartment.element.name || "Room"} 
                    className="room-image" 
                />
                {apartment.element.transactionType !== 3 && (
                <div className="price-tag">LKR. &nbsp;{apartment.element.price}/= {priceTag}</div>
                )}
                <div className="term-tag">{TermTag}</div>
            </div>
            <div className={`details ${isHovered ? 'expanded' : ''}`}>
                <h3>{truncatedTitle}</h3>
                <p>{apartment.element.areas}, &nbsp; {apartment.element.districts}</p>
                <div className="info">
                    <span><IoBedOutline />({apartment.element.bedroomCount}) Bed's</span>
                    <span><FaShower />({apartment.element.bathroomCount}) Baths</span>
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;
