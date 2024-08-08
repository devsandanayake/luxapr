import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import './AllApartments.css';
import NewCard from '../ApartmentCard/NewCard';
import SmallCard from '../ApartmentCard/ApartmentCard';

export default function AllApartments() {
    const [apartments, setApartments] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedRoomCount, setSelectedRoomCount] = useState(''); // New state for room count
    const [showFiltered, setShowFiltered] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768); // State for screen size

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await axiosInstance.get('/api/ads/viewAds');
                setApartments(response.data);
                setFilteredApartments(response.data); // Initialize filtered apartments
            } catch (error) {
                console.error(error);
            }
        };

        fetchApartments();

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const filterApartments = () => {
        let filtered = apartments;

        if (selectedLocation) {
            filtered = filtered.filter(apartment => 
                apartment.districts.toLowerCase().includes(selectedLocation.toLowerCase()) ||
                apartment.areas.toLowerCase().includes(selectedLocation.toLowerCase())
            );        
        }

        if (selectedType) {
            filtered = filtered.filter(apartment => {
                if (selectedType === 'short-term') {
                    return apartment.transactionType === 1 || apartment.transactionType === 3;
                } else if (selectedType === 'long-term') {
                    return apartment.transactionType === 2 || apartment.transactionType === 3;
                } else if (selectedType === 'auction') {
                    return apartment.transactionType === 4;
                } else {
                    return true;
                }
            });
        }

        if (selectedRoomCount) {
            filtered = filtered.filter(apartment => 
                apartment.bedroomCount === parseInt(selectedRoomCount)
            );
        }

        setFilteredApartments(filtered);
        setShowFiltered(true);
    };

    return (
        <>
            <div className='AllApartments-title'>Apartment List</div>

            <div className="containerr mx-auto">
                <div className="sidebar">
                    <h2 className="sidebar-title">Filter Now</h2>
                    <div className="booking-option">
                         <input
                            type="text"
                            id="location"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            placeholder="Enter location"
                            className='w-full h-full p-2'
                            style={{ backgroundColor: '#f9f9f9' }}
                        />
                    </div>
                    <div className="booking-option">
                        <select
                            id="type"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className='w-full h-full p-2'
                            style={{ backgroundColor: '#f9f9f9' }}
                        >
                            <option value="">Select Apartment Type</option>
                            <option value="short-term">Short-Term</option>
                            <option value="long-term">Long-Term</option>
                            <option value="auction">Auction</option>
                        </select>
                    </div>
                    <div className="booking-option"> {/* New input field for room count */}
                        <input
                            type="number"
                            id="roomCount"
                            value={selectedRoomCount}
                            onChange={(e) => setSelectedRoomCount(e.target.value)}
                            placeholder="Enter room count"
                            className='w-full h-full p-2'
                            style={{ backgroundColor: '#f9f9f9' }}
                        />
                    </div>
                    <button className="check-button" onClick={filterApartments}>CHECK ➔</button>
                </div>
                <div className="main-content">
                    <div className="content">
                        <div className="content-body">
                            {showFiltered ? (
                                filteredApartments.map((apartment) => (
                                    isSmallScreen ? (
                                        <SmallCard key={apartment.adCode} apartment={apartment} />
                                    ) : (
                                        <NewCard key={apartment.adCode} apartment={apartment} />
                                    )
                                ))
                            ) : (
                                apartments.map((apartment) => (
                                    isSmallScreen ? (
                                        <SmallCard key={apartment.adCode} apartment={apartment} />
                                    ) : (
                                        <NewCard key={apartment.adCode} apartment={apartment} />
                                    )
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}