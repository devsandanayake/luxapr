import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

export default function BookingDetails() {
  const token = localStorage.getItem('token');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [adDetails, setAdDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/longrental/getUserLRentalTransactions', {
          headers: {
            'Authorization': ` ${token}`,  
          },
        });
        console.log('Full response:', response);  
        setBookingDetails(response.data);  
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (bookingDetails) {
      bookingDetails.forEach((detail) => {
        axiosInstance.get(`/api/ads/viewSpecificAd/${detail.adCode}`)
          .then((response) => {
            setAdDetails(prevState => ({
              ...prevState,
              [detail.adCode]: response.data
            }));
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [bookingDetails]);

  return (
    <div className='w-10/12'>
      <h1 className='text-center text-2xl mb-2'>Booking Details</h1>
      {error && <div className="text-red-500">Error: {error.message}</div>}
          <div className="">
      {bookingDetails && bookingDetails.map((detail) => (
        <div key={detail._id} className="p-4 border rounded shadow flex">
          <div className="w-2/5">
            <img 
              src={adDetails[detail.adCode]?.images && adDetails[detail.adCode].images.length > 0 
                ? `http://124.43.179.118:8081/uploads/${adDetails[detail.adCode].images[0].split('\\').pop()}` 
                : 'defaultImagePath'}  
              alt={adDetails[detail.adCode]?.title || "Room"} 
              className="room-image max-h-48" 
            />
          </div>
          <div className="w-2/3 pl-4">
            <p className='text-gold text-xl mb-2'>{adDetails[detail.adCode]?.title || 'Loading...'}</p>
            <p><strong>Rental Start Date:</strong> {new Date(detail.rentalStartDate).toLocaleDateString()}</p>
            <p><strong>Rental End Date:</strong> {new Date(detail.rentalEndDate).toLocaleDateString()}</p>
            <p><strong>Admin Key Status:</strong> {detail.adminKeyStatus}</p>
            <p><strong>Phone Number:</strong> {detail.phoneNumber}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}