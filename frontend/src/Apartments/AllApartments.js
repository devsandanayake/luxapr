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
    const [sortCriteria, setSortCriteria] = useState(''); // State for sorting criteria
    const [sortOrder, setSortOrder] = useState(''); // State for sorting order
    const [showFiltered, setShowFiltered] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768); // State for screen size
    const [activeTab, setActiveTab] = useState('all'); // State for active tab
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const itemsPerPage = 5; // Number of items per page

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await axiosInstance.get('/api/ads/viewAds');
                const apartmentsData = response.data
                    .filter(apartment => apartment.transactionType !== 4) // Exclude apartments with transactionType 4
                    .map(apartment => ({
                        ...apartment,
                        publishedAt: new Date(apartment.publishedAt) // Ensure publishedAt is a Date object
                    }));
                setApartments(apartmentsData);
                setFilteredApartments(apartmentsData); // Initialize filtered apartments
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

    const filterByTab = (apartments, tab) => {
        if (tab === 'all') {
            return apartments.filter(apartment => 
                apartment.transactionType === 1 || apartment.transactionType === 2 || apartment.transactionType === 3
            );
        }
        return apartments.filter(apartment => {
            if (tab === 'short-term') {
                return apartment.transactionType === 1;
            } else if (tab === 'long-term') {
                return apartment.transactionType === 2;
            }  
        });
    };

    const filterApartments = (tab = activeTab) => {
        let filtered = apartments;

        if (selectedLocation) {
            filtered = filtered.filter(apartment => 
                apartment.districts.toLowerCase().includes(selectedLocation.toLowerCase()) ||
                apartment.areas.toLowerCase().includes(selectedLocation.toLowerCase())
            );        
        }

        if (selectedRoomCount) {
            filtered = filtered.filter(apartment => 
                apartment.bedroomCount === parseInt(selectedRoomCount)
            );
        }

        filtered = filterByTab(filtered, tab);

        // Sorting logic
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
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setSelectedLocation('');
        setSelectedRoomCount('');
        setSortCriteria('');
        setSortOrder('');
        filterApartments(tab);
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

    console.log('Current Page:', currentPage);
    console.log('Displayed Apartments:', displayedApartments);

    return (
        <>
            <div className='AllApartments-title'>Apartment List</div>

            <div className="tabs">
                <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => handleTabClick('all')}>All</button>
                <button className={`tab ${activeTab === 'short-term' ? 'active' : ''}`} onClick={() => handleTabClick('short-term')}>Short-Term</button>
                <button className={`tab ${activeTab === 'long-term' ? 'active' : ''}`} onClick={() => handleTabClick('long-term')}>Long-Term</button>
            </div>

            <div className="containerr mx-auto">

                <div className='con-sidebar'>
                <div className="sidebar">
                <h2 className="sidebar-title mt-2">Check Now</h2>

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

                        <a href='/'>
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
                            {displayedApartments.map((apartment) => (
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