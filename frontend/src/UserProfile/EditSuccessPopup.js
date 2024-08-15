import React from 'react';
import './EditSuccessPopup.css'; // Assuming you have some basic styles for the popup
import { SiTicktick } from "react-icons/si";

const EditSuccessPopup = () => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className='popup-iconn'>
                    <SiTicktick />
                </div>
                <p className='popup-text'>Profile Data Updated Successfully </p>
                <div className="popup-border-animation"></div>
            </div>
        </div>
    );
};

export default EditSuccessPopup;