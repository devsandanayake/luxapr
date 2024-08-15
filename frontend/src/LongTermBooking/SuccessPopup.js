import React from 'react';
import './SuccessPopup.css'; // Assuming you have some basic styles for the popup
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const SuccessPopup = ({ bookingDetails, onClose }) => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
    
        // Add a title
        doc.setFontSize(18);
        doc.text('Your Booking Details', 10, 10);
    
        // Add a line break
        doc.setFontSize(12);
        doc.text(' ', 10, 20);
    
        // Define the details
        const details = [
            { label: 'Booking ID:', value: bookingDetails.BookingID },
            { label: 'Username:', value: bookingDetails.username },
            { label: 'Ad Code:', value: bookingDetails.adCode },
            { label: 'Rental Start Date:', value: bookingDetails.rentalStartDate },
            { label: 'Rental End Date:', value: bookingDetails.rentalEndDate },
            { label: 'Phone Number:', value: bookingDetails.phoneNumber },
            { label: 'Message:', value: bookingDetails.userMessage }
        ];
    
        // Set initial positions
        let x = 10;
        let y = 30;
    
        // Loop through the details and add them to the PDF
        details.forEach((detail) => {
            doc.text(`${detail.label}`, x, y);
            doc.text(`${detail.value}`, x + 50, y);
    
            // Move to the next line
            y += 10;
        });
    
        // Save the PDF
        doc.save('booking-details.pdf');
    };

    return (
        <div className="popup-overlayy">
            <div className="popup-contentt">
                <div className='popup-iconn'>
                    <SiTicktick />
                </div>
                <p className='popup-textt'>Your inquiry has been successfully submitted.</p>
                {bookingDetails && (
                    <div className='popup-details'>
                        <div className="details-grid">
                            <p><strong>Booking ID:</strong></p>
                            <p>{bookingDetails.BookingID}</p>
                            <p><strong>Username:</strong></p>
                            <p>{bookingDetails.username}</p>
                            <p><strong>Ad Code:</strong></p>
                            <p>{bookingDetails.adCode}</p>
                            <p><strong>Rental Start Date:</strong></p>
                            <p>{bookingDetails.rentalStartDate}</p>
                            <p><strong>Rental End Date:</strong></p>
                            <p>{bookingDetails.rentalEndDate}</p>
                            <p><strong>Phone Number:</strong></p>
                            <p>{bookingDetails.phoneNumber}</p>
                            <p><strong>Message:</strong></p>
                            <p>{bookingDetails.userMessage}</p>
                        </div>
                    </div>
                )}
                <div className='popup-buttons'>
                    <button className='popup-buttonn' onClick={handleNavigateHome}>Home</button>
                    <button className='popup-buttonnn' onClick={handleDownloadPDF}>Print</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPopup;