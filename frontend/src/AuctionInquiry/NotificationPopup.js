import React from 'react';
import './NotificationPopup.css'; // Assuming you have some basic styles for the popup
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const NotificationPopup = ({ onClose }) => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <div className="popup-overlayy">
            <div className="popup-contentt">
                <div className='popup-iconn'>
                    <SiTicktick />
                </div>
                <p className='popup-textt'>Your inquiry have been successfully submitted. </p>
                <button className='popup-buttonn' onClick={handleNavigateHome}>Home</button>
            </div>
        </div>
    );
};

export default NotificationPopup;