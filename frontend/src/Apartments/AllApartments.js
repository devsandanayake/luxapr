import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import './AllApartments.css';
import NewCard from '../ApartmentCard/NewCard';
import SmallCard from '../ApartmentCard/ApartmentCard';

export default function AllApartments() {
    const [apartments, setApartments] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedRoomCount, setSelectedRoomCount] = useState('');
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [showFiltered, setShowFiltered] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchApartments = async () => {
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

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const filterApartments = async () => {
        try {
            const response = await axiosInstance.post('/api/ads/searchAds', {
                startDate,
                endDate,
                areas: selectedArea,
                districts: selectedDistrict,
                bedroomCount: parseInt(selectedRoomCount),
            });

            console.log('adda',parseInt(selectedRoomCount));
            console.log('response',response.data);

            let filtered = response.data;

            if (selectedRoomCount) {
                filtered = filtered.filter(apartment => 
                    apartment.bedroomCount === parseInt(selectedRoomCount)
                );
            }

            if (sortCriteria) {
                filtered = filtered.sort((a, b) => {
                    if (sortCriteria === 'price') {
                        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
                    } else if (sortCriteria === 'date') {
                        return sortOrder === 'asc' ? new Date(a.publishedAt) - new Date(b.publishedAt) : new Date(b.publishedAt) - new Date(a.publishedAt);
                    } else if (sortCriteria === 'area') {
                        return sortOrder === 'asc' ? a.areaSize - b.areaSize : b.areaSize - a.areaSize;
                    }
                    return 0;
                });
            }

            setFilteredApartments(filtered);
            setShowFiltered(true);
            setCurrentPage(1);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedApartments = showFiltered ? filteredApartments.slice(startIndex, endIndex) : apartments.slice(startIndex, endIndex);

    return (
        <>
            <div className='AllApartments-title'>Apartment List</div>

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

                <div className="sidebar2">
                    <h2 className="sidebar-title mt-2">Filters</h2>
                    <div className="sort-options">
                        <select value={sortCriteria} onChange={(e) => { setSortCriteria(e.target.value); setSortOrder(''); }}>
                            <option value="">Select</option>
                            <option value="price">Price</option>
                            <option value="date">Date</option>
                            <option value="area">Area Size</option>
                        </select>

                        {sortCriteria && (
                            <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); filterApartments(); }}>
                                <option value="">Select Order</option>
                                <option value="asc">High - Low</option>
                                <option value="desc">Low - High</option>
                            </select>
                        )}
                    </div>
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
                                <>
                                     <button className="pagination-button" onClick={handlePrevPage}>
                                        Previous
                                    </button>
                                </>
                            )}
                            {endIndex < (showFiltered ? filteredApartments.length : apartments.length) && (
                                <>
                                     <button className="pagination-button" onClick={handleNextPage}>
                                        Next
                                    </button>
                                </>
                            )}
                        </div>
                </div>
            </div>
        </>
    );
}