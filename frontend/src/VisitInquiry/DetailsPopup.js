import React from 'react';
import './DetailsPopup.css'; // Assuming you have some basic styles for the popup
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const NotificationPopup = ({ onClose, formData, inquiryID }) => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
    
        // Add a title
        doc.setFontSize(18);
        doc.text('Your Inquiry Details', 10, 10);
    
        // Add a line break
        doc.setFontSize(12);
        doc.text(' ', 10, 20);
    
        // Define the details
        const details = [
            { label: 'Inquiry ID:', value: inquiryID },
            { label: 'Full Name:', value: formData.fullName },
            { label: 'Email:', value: formData.email },
            { label: 'Preferred Date:', value: formData.preferredDate },
            { label: 'Preferred Time:', value: formData.preferredTime },
            { label: 'Alternate Date:', value: formData.alternateDate },
            { label: 'Alternate Time:', value: formData.alternateTime },
            { label: 'Message:', value: formData.message }
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
        doc.save('inquiry-details.pdf');
    };

    return (
        <div className="popup-overlayy">
            <div className="popup-contentt">
                <div className='popup-iconn'>
                    <SiTicktick />
                </div>
                <p className='popup-textt'>Your inquiry has been successfully submitted.</p>
                <div className='popup-details'>
                    <div className="details-grid">
                        <p><strong>Inquiry ID:</strong></p>
                        <p>{inquiryID}</p>
                        <p><strong>Full Name:</strong></p>
                        <p>{formData.fullName}</p>
                        <p><strong>Email:</strong></p>
                        <p>{formData.email}</p>
                        <p><strong>Preferred Date:</strong></p>
                        <p>{formData.preferredDate}</p>
                        <p><strong>Preferred Time:</strong></p>
                        <p>{formData.preferredTime}</p>
                        <p><strong>Alternate Date:</strong></p>
                        <p>{formData.alternateDate}</p>
                        <p><strong>Alternate Time:</strong></p>
                        <p>{formData.alternateTime}</p>
                        <p><strong>Message:</strong></p>
                        <p>{formData.message}</p>
                    </div>
                </div>
                <div className='popup-buttons'>
        <button className='popup-buttonn' onClick={handleNavigateHome}>Home</button>
        <button className='popup-buttonnn' onClick={handleDownloadPDF}>Print</button>
    </div>
            </div>
        </div>
    );
};

export default NotificationPopup;