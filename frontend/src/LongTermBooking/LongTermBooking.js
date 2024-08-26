import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaPhoneAlt, FaCommentAlt } from 'react-icons/fa'; // Importing suitable icons
import './LongTermBooking.css';
import PopupWindow from './SuccessPopup';

export default function LongTermBooking() {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const userName = decodedToken.username || '';

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urladcode = queryParams.get('adcode');

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const [formData, setFormData] = useState({
    BookingID: '',
    username: userName,
    adCode: urladcode,
    rentalStartDate: '',
    rentalEndDate: '',
    phoneNumber: '',
    userMessage: ''
  });

  const [apartmentDetails, setApartmentDetails] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    axiosInstance.get(`/api/ads/viewSpecificAd/${urladcode}`)
      .then((response) => {
        setApartmentDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [urladcode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/users/viewUserProfile', {
          headers: {
            'Authorization': `${token}`,
          },
        });
        const userProfile = response.data.user;
        setUserProfile(userProfile);
        setFormData((prevFormData) => ({
          ...prevFormData,
          phoneNumber: `+${userProfile.contactNumber}`,
        }));
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err);
      }
    };
    
    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Generate Booking ID
    const generateBookingID = () => {
      const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
      return `BID${randomNumbers}`;
    };

    const bookingID = generateBookingID();

    try {
      const response = await axiosInstance.post('/api/longrental/createLRentalTransaction', {
        ...formData,
        BookingID: bookingID
      }, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      setBookingDetails({ ...formData, BookingID: bookingID });
      setIsPopupVisible(true);
    } catch (error) {
      alert(error.response.data.message);
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
                    Book Your Apartment
                </h1>      
        </div>
      <div className="full-screen">

        <div className='w-4/12 text-2xl text-center font-semibold booking-details' style={{ borderRight: '2px solid gold', paddingRight: '40px' }}>
          {apartmentDetails.title}
          {apartmentDetails.images && apartmentDetails.images.length > 0 && (
            <>
            <img 
                src={`http://124.43.179.118:8081/uploads/${apartmentDetails.images[0].split('\\').pop()}`} 
                alt={apartmentDetails.title || "Room"} 
                className="booking-image left-aligned mb-5 mt-8" 
            />
            {apartmentDetails.images.length > 1 && (
                <img 
                    src={`http://124.43.179.118:8081/uploads/${apartmentDetails.images[1].split('\\').pop()}`} 
                    alt={apartmentDetails.title || "Room"} 
                    className="booking-image right-aligned mb-5 mt-5" 
                />
            )}
        </>
    )}
</div>



        <div className='w-6/12'>
          <form className='mt-10 ml-3 w-full mb-5' onSubmit={handleSubmit}>
            <div className='mt-2'>
              <label className='text-lg' htmlFor="rentalStartDate">Rental Start Date</label>
              <div className='relative'>
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                <input 
                  type="date" 
                  id="rentalStartDate" 
                  name="rentalStartDate" 
                  value={formData.rentalStartDate} 
                  onChange={handleChange} 
                  className="input pl-10"
                  required 
                />
              </div>
            </div>
            <div className='mt-2'>
              <label className='text-lg' htmlFor="rentalEndDate">Rental End Date</label>
              <div className='relative'>
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                <input 
                  type="date" 
                  id="rentalEndDate" 
                  name="rentalEndDate" 
                  value={formData.rentalEndDate} 
                  onChange={handleChange} 
                  className="input pl-10"
                  required 
                />
              </div>
            </div>
            <div className='mt-2'>
              <label className='text-lg' htmlFor="phoneNumber">Phone Number</label>
              <div className='relative'>
                <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                <input 
                  type="text" 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleChange} 
                  className="input pl-10"
                  disabled
                />
              </div>
            </div>
            <div className='mt-2'>
              <label className='text-lg' htmlFor="userMessage">Message</label>
              <div className='relative'>
                <FaCommentAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
                <textarea 
                  id="userMessage" 
                  name="userMessage" 
                  value={formData.userMessage} 
                  onChange={handleChange} 
                  className="input pl-10"
                />
              </div>
            </div>
            <button type="submit" className='submitt'>Submit</button>
          </form>
          {isPopupVisible && <PopupWindow bookingDetails={bookingDetails} />}
        </div>
      </div>
    </>
  );
}