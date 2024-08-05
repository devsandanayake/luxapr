import React from 'react';
import './Popupbox.css'; // Assuming you have some basic styles for the popup

const Popupbox = ({ onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="popup-content">
                <div className="popup-title">Add your apartment for...</div>

                <div>
                    <a href='/addapartment?value=1'>
                        <button className="popup-button">Short-Term Rent Only</button>
                    </a>
                </div>

                <div>
                    <a href='/addapartment?value=2'>
                    <button className="popup-button">Long-Term Rent Only</button>
                    </a>
                </div>

                <div>
                    <a href='/addapartment?value=3'>
                    <button className="popup-button">Short Term & Long-Term Rent </button>
                    </a>
                </div>

                <div>
                    <a href='/addapartment?value=4'>
                    <button className="popup-button">Auction</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Popupbox;
