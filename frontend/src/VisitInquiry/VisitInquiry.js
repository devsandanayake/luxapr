import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useLocation } from 'react-router-dom';
import './VisitInquiry.css';
import PopupWindow from '../AuctionInquiry/NotificationPopup';
import { FaUser, FaEnvelope, FaCalendarAlt, FaClock, FaCommentDots } from 'react-icons/fa';

export default function VisitInquiry() {
    const [userProfile, setUserProfile] = useState(null);
    const token = localStorage.getItem('token');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const adCode = queryParams.get('adcode');
    const [error, setError] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        adCode: adCode,
        preferredDate: '',
        preferredTime: '',
        alternateDate: '',
        alternateTime: '',
        message: '',
    });

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/api/users/viewUserProfile', {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                setUserProfile(response.data.user);
                setFormData((prevData) => ({
                    ...prevData,
                    adCode: adCode,
                }));
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError(err);
            }
        };

        fetchData();
    }, [token, adCode]);

    if (error) {
        return <div className="text-red-500">Error loading profile: {error.message}</div>;
    }

    if (!userProfile) {
        return <div className="text-gray-500">Loading...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to convert 12-hour format to 24-hour format
    const convertTo24HourFormat = (time) => {
        const [timePart, modifier] = time.split(' ');
        let [hours, minutes] = timePart.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Convert to 24-hour format if needed
        const preferredTime24 = convertTo24HourFormat(formData.preferredTime);
        const alternateTime24 = convertTo24HourFormat(formData.alternateTime);

        const formDataWith24HourFormat = {
            ...formData,
            preferredTime: preferredTime24,
            alternateTime: alternateTime24,
        };

        // Logging the converted times
        console.log('Preferred Time (24-hour):', formDataWith24HourFormat.preferredTime); 
        console.log('Alternate Time (24-hour):', formDataWith24HourFormat.alternateTime); 

        try {
            const response = await axiosInstance.post('/api/longrental-inquery/add', formDataWith24HourFormat, {
                headers: {
                    'Authorization': `${token}`,
                },
            });
            setIsPopupVisible(true);
        } catch (error) {
            console.error('There was an error creating the rental transaction!', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && (
                <div className="loader-overlay">
                    <div className="loader">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            )}
            <div>
                <h1 className="title text-3xl mt-20 ml-3 text-gold text-center" style={{ fontFamily: 'Georgia, serif' }}>
                    Book Your Visit
                </h1>
            </div>
            <div className="full-screen">
                <div className="w-8/12">
                    <form className="mt-10 ml-3 w-full mb-5" onSubmit={handleSubmit}>
                        <div className="visit-inquiry-input mt-2">
                            <label className="text-lg" htmlFor="fullName">Full Name</label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={`${userProfile.firstName} ${userProfile.lastName}`}
                                    className="input pl-10"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="visit-inquiry-input mt-2">
                            <label className="text-lg" htmlFor="email">Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userProfile.email}
                                    className="input pl-10"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="date-time-row">
                            <div className="visit-inquiry-input mt-2">
                                <label className="text-lg" htmlFor="preferredDate">Preferred Date</label>
                                <div className="relative">
                                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                                    <input
                                        type="date"
                                        id="preferredDate"
                                        name="preferredDate"
                                        value={formData.preferredDate}
                                        onChange={handleChange}
                                        className="DTinput pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="visit-inquiry-input mt-2">
                                <label className="text-lg" htmlFor="preferredTime">Preferred Time</label>
                                <div className="relative">
                                    <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                                    <input
                                        type="time"
                                        id="preferredTime"
                                        name="preferredTime"
                                        value={formData.preferredTime}
                                        onChange={handleChange}
                                        className="DTinput pl-10"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="date-time-row">
                            <div className="visit-inquiry-input mt-2">
                                <label className="text-lg" htmlFor="alternateDate">Alternate Date</label>
                                <div className="relative">
                                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                                    <input
                                        type="date"
                                        id="alternateDate"
                                        name="alternateDate"
                                        value={formData.alternateDate}
                                        onChange={handleChange}
                                        className="DTinput pl-10"
                                    />
                                </div>
                            </div>
                            <div className="visit-inquiry-input mt-2">
                                <label className="text-lg" htmlFor="alternateTime">Alternate Time</label>
                                <div className="relative">
                                    <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                                    <input
                                        type="time"
                                        id="alternateTime"
                                        name="alternateTime"
                                        value={formData.alternateTime}
                                        onChange={handleChange}
                                        className="DTinput pl-10"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="visit-inquiry-input mt-2">
                            <label className="text-lg" htmlFor="message">Special Requirements</label>
                            <div className="relative">
                                <FaCommentDots className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="input pl-10"
                                />
                            </div>
                        </div>
                        <button type="submit" className="submitt">Submit</button>
                    </form>
                    {isPopupVisible && <PopupWindow setIsPopupVisible={setIsPopupVisible} message="Inquiry added successfully" />}
                </div>
            </div>
        </>
    );
}
