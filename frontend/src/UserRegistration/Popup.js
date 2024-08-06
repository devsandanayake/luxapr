import React from 'react';
import './Popup.css'; // Assuming you have some basic styles for the popup
import { SiTicktick } from "react-icons/si";

const Popup = () => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className='popup-iconn'>
                    <SiTicktick />
                </div>
                <p className='popup-text'>User Account Created Successfully!! </p>
                <div className="popup-border-animation"></div>
            </div>
        </div>
    );
};

export default Popup;