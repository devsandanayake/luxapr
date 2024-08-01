import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './ContactUs.css';

export default function ContactUs() {

    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };
    const navigate = useNavigate();

    const AddApartment = () => {
        if (isLoggedIn()) {
            navigate('/addapartment');
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <div className="backgroundd"></div>
           
                <div className="ContactUs-title">Contact Us</div>

                <div className='Apartment-add'>
                    <div className='desc'>
                Want to list your apartment for sale or rent?
                </div>

                <button className='add-apartment' onClick={AddApartment}>Add Apartment</button>
                </div>


                <div className="content">
                    <div className="ContactUs-details">
                        <div className='contenttitle'>
                        If you have any questions or need further information, please feel free to contact us. Our team is here to assist you!
                        </div>
                        <div className="contact-info">
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faPhone} className='fa-icon text-gold text-3xl' />
                                <div>
                                    
                                    <p className=' underline'>+94 123 456 789</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faEnvelope} className='fa-icon text-gold text-3xl' />
                                <div>
                                    <p>info@luxuryapartments.lk</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className='fa-icon text-gold text-3xl' />
                                <div>
                                    <p>123 Luxury St, Colombo, Sri Lanka</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* <div className="content">
                <div className="ContactUs-details">
                    <p>If you have any questions or need further information, please feel free to contact us. Our team is here to assist you!</p>
                    <div className="contact-info">
                        <div className="contact-item">
                            <FontAwesomeIcon icon={faPhone} className='fa-icon text-gold text-3xl' />
                            <div>
                                <h3>Emergency Help</h3>
                                <p>+94 123 456 789</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <FontAwesomeIcon icon={faEnvelope} className='fa-icon text-gold text-3xl' />
                            <div>
                                <h3>Quick Email</h3>
                                <p>info@luxuryapartments.lk</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className='fa-icon text-gold text-3xl' />
                            <div>
                                <h3>Office Address</h3>
                                <p>123 Luxury St, Colombo, Sri Lanka</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}