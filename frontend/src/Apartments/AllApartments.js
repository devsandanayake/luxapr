import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import './AllApartments.css';
import NewCard from '../ApartmentCard/NewCard';
import SmallCard from '../ApartmentCard/ApartmentCard';

export default function AllApartments() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const initialDistrict = queryParams.get('district') || '';
    const initialArea = queryParams.get('area') || '';
    const initialRoomCount = queryParams.get('roomCount') || '';
    const initialStartDate = queryParams.get('startDate') || '';
    const initialEndDate = queryParams.get('endDate') || '';

    const [apartments, setApartments] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
    const [selectedArea, setSelectedArea] = useState(initialArea);
    const [selectedRoomCount, setSelectedRoomCount] = useState(initialRoomCount);
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);
    const [showFiltered, setShowFiltered] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchApartments = async () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            try {
                const response = await axiosInstance.get('/api/ads/viewAds');
                const apartmentsData = response.data
                    .filter(item => item.element.transactionType !== 4)
                    .map(item => ({
                        ...item,
                        publishedAt: new Date(item.element.publishedAt).toISOString().slice(0, 10)
                    }));
                setApartments(apartmentsData);
                setFilteredApartments(apartmentsData);
            } catch (error) {
                console.error(error);
            }
        };

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const hasQueryParams = initialDistrict || initialArea || initialRoomCount || initialStartDate || initialEndDate;

        if (hasQueryParams) {
            filterApartments();
        } else {
            const fetchApartments = async () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                try {
                    const response = await axiosInstance.get('/api/ads/viewAds');
                    const apartmentsData = response.data
                        .filter(item => item.element.transactionType !== 4)
                        .map(item => ({
                            ...item,
                            publishedAt: new Date(item.element.publishedAt).toISOString().slice(0, 10)
                        }));
                    setApartments(apartmentsData);
                    setFilteredApartments(apartmentsData);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchApartments();
        }
    }, [initialDistrict, initialArea, initialRoomCount, initialStartDate, initialEndDate]);

    const filterApartments = async () => {
        try {
            const response = await axiosInstance.post('/api/ads/searchAds', {
                startDate,
                endDate,
                areas: selectedArea.toLowerCase(),
                districts: selectedDistrict.toLowerCase(),
                bedroomCount: parseInt(selectedRoomCount),
            });

            let filtered = response.data;

            if (selectedRoomCount) {
                filtered = filtered.filter(apartment => 
                    apartment.element.bedroomCount === parseInt(selectedRoomCount)
                );
            }

            setFilteredApartments(filtered);
            setShowFiltered(true);
            setCurrentPage(1);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNextPage = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedApartments = showFiltered ? filteredApartments.slice(startIndex, endIndex) : apartments.slice(startIndex, endIndex);
    const totalPages = Math.ceil((showFiltered ? filteredApartments.length : apartments.length) / itemsPerPage);

    return (
        <>
            <div className='AllApartments-title'>All Apartments</div>

            <div className="containerr mx-auto">

                <div className='con-sidebar'>
                <div className="sidebar">
                <h2 className="sidebar-title mt-2">Check Now</h2>
                    <div className="booking-option">
                        <input
                            type="text"
                            id="district"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            placeholder="Enter district"
                            className='w-full h-full p-2'
                            style={{ backgroundColor: '#f9f9f9' }}
                        />
                    </div>
                    <div className="booking-option">
                        <input
                            type="text"
                            id="area"
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                            placeholder="Enter area"
                            className='w-full h-full p-2'
                            style={{ backgroundColor: '#f9f9f9' }}
                        />
                    </div>
                    <div className="booking-option">
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
                    <div className="booking-option">
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="Start Date"
                            className='w-full h-full p-2'
                            style={{ backgroundColor: '#f9f9f9' }}
                        />
                    </div>
                    <div className="booking-option">
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="End Date"
                            className='w-full h-full p-2'
                            style={{ backgroundColor: '#f9f9f9' }}
                        />
                    </div>
                    <button className="check-button" onClick={() => filterApartments()}>CHECK ➔</button>
                </div>

                <div className="sidebar3">
                    <div className='other-contents'>
                        <h2 className="sidebar-title mt-2">Other Contents</h2>
                        <div className='side-links'>
                            Auction
                        </div>

                        <a href='/' >
                        <div className='side-links'>
                            Home
                        </div>
                        </a>

                        <a href='/contactus'>
                        <div className='side-links'>
                            Contact Us
                        </div>
                        </a>
                    </div>
                </div>
                </div>
                
                <div className="main-content">
                    <div className="content">
                        <div className="content-body">
                            {Array.isArray(displayedApartments) && displayedApartments.map((apartment) => (
                                isSmallScreen ? (
                                    <SmallCard key={apartment.adCode} apartment={apartment} />
                                ) : (
                                    <NewCard key={apartment.adCode} apartment={apartment} />
                                )
                            ))}
                        </div>
                    </div>

                    <div className="pagination">
                    {currentPage > 1 && (
                            <button className="pagination-button" onClick={handlePrevPage}>
                                Previous
                            </button>
                        )}

                        <span className="page-info">Page {currentPage} of {totalPages}</span>
                       
                        {endIndex < (showFiltered ? filteredApartments.length : apartments.length) && (
                            <button className="pagination-button" onClick={handleNextPage}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}