import React from 'react'
import axiosInstance from '../axiosConfig';
import { useState , useEffect } from 'react'
import './AllApartments.css';
import NewCard from '../ApartmentCard/NewCard';

export default function AllApartments() {
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await axiosInstance.get('/api/ads/viewAds');
                setApartments(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchApartments();
    }, []);

  return (

    <>
    
    <div className='AllApartments-title'>Apartment List</div>

    <div className="containerr mx-auto">
                <div className="sidebar">
                    <h2 className="sidebar-title">Booking Now</h2>
                    <div className="booking-option">Check In</div>
                    <div className="booking-option">Check Out</div>
                    <div className="booking-option">Room</div>
                    <button className="check-button">CHECK ➔</button>
                </div>
                <div className="main-content">
                    <div className="content">
                         <div className="content-body">
                            {apartments.map((apartment) => (
                                <NewCard key={apartment.adCode} apartment={apartment} />
                            ))}
                        </div>


                    </div>
                </div>
    </div>

    </>

  )
}
