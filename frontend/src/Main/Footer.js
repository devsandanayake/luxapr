import React from 'react';
import './footer.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h2 className='text-gold'>ABOUT US</h2>
                    <p>
                        Our luxury apartments offer exceptional comfort, style, and sophistication with state-of-the-art amenities, stunning views, and premium finishes.
                    </p>
                </div>

                <div className="footer-section links">
                    <h2 className='text-gold'>CONTACT US</h2>
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} className='text-gold' /> &emsp;
                            <a href="mailto:info@luxuryapartments.com">info@luxuryapartments.com</a>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPhone} className='text-gold' /> &emsp;
                            <a href="tel:+1234567890">+1 234 567 890</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-section subscribe">
                    <h2 className='text-gold'>SERVICES</h2>
                    <div>
                    <a href="#">Luxury Apartments</a>
                    </div>
                    <div>
                    <a href="#">Auction</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 ThemeOri Website by Hostily</p>
                <div className="footer-links">
                    <a href="#">FAQ</a>
                    <a href="#">Terms of Use</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
