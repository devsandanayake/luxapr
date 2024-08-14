import React from 'react';
import './PopupWindow.css'; // Assuming you have some basic styles for the popup
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const PopupWindow = ({ onClose }) => {
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
                <p className='popup-textt'>Your apartment details have been successfully submitted. </p>
                <p className='popup-textt'>Please wait until you receive an email.</p>
                <button className='popup-buttonn' onClick={handleNavigateHome}>Home</button>
            </div>
        </div>
    );
};

export default PopupWindow;