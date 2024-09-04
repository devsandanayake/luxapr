import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { MdLocationOn } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { BsTextarea, BsCurrencyDollar } from "react-icons/bs";
import AuctionCard from "../AuctionCard/AuctionCard";
import { FaArrowRight, FaCar } from "react-icons/fa";
import { Pannellum } from "pannellum-react";
import { useSwipeable } from 'react-swipeable';
import AllPhotosPopup from '../Apartments/AllPhotosPopup';
import { CiSearch } from "react-icons/ci";
import './AuctionPartmentView.css';
import Breadcrumb from '../BreadCrumb/Breadcrumb';

export default function AuctionPartmentView() {
    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };

    const token = localStorage.getItem('token');
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : {};
    const userName = decodedToken.firstName || '';

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const adcode = searchParams.get('adcode');

    const [apartmentDetails, setApartmentDetails] = useState({});
    const [OtherApartments, setOtherApartments] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [isPannellumReady, setIsPannellumReady] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
    const [registeredAuctions, setRegisteredAuctions] = useState([]);
    const [searchFields, setSearchFields] = useState({
        district: '',
        area: '',
        roomCount: '',
        startDate: '',
        endDate: ''
    });
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [countdownMessage, setCountdownMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        axiosInstance.get(`/api/ads/viewSpecificAd/${adcode}`)
            .then((response) => {
                setApartmentDetails(response.data);
                if (response.data.images && response.data.images.length > 0) {
                    setSelectedImage(response.data.images[0]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [adcode]);

    useEffect(() => {
        axiosInstance.get('/api/ads/viewAds')
            .then((response) => {
                setOtherApartments(response.data.filter((apartment) => apartment.adCode !== adcode));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [adcode]);

    useEffect(() => {
        setIsPannellumReady(true);
    }, []);

    useEffect(() => {
        if (apartmentDetails.auctionStatus && apartmentDetails.auctionStatus.startDate && apartmentDetails.auctionStatus.endDate) {
            const interval = setInterval(() => {
                const auctionStartDate = new Date(apartmentDetails.auctionStatus.startDate);
                const auctionEndDate = new Date(apartmentDetails.auctionStatus.endDate);
                const currentTime = new Date();

                if (currentTime < auctionStartDate) {
                    // Auction hasn't started yet, countdown to start
                    const timeDifference = auctionStartDate - currentTime;
                    updateCountdown(timeDifference, 'Bidding opens in');
                } else if (currentTime >= auctionStartDate && currentTime < auctionEndDate) {
                    // Auction is ongoing, countdown to end
                    const timeDifference = auctionEndDate - currentTime;
                    updateCountdown(timeDifference, 'Bidding ends in');
                } else {
                    // Auction has ended
                    setCountdownMessage('Not Available');
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [apartmentDetails.auctionStatus]);

    const updateCountdown = (timeDifference, message) => {
        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDifference / 1000) % 60);
            setCountdown({ days, hours, minutes, seconds });
            setCountdownMessage(message);
        } else {
            setCountdownMessage('Not Available');
        }
    };

    useEffect(() => {
        const fetchRegisteredAuctions = async () => {
            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await axiosInstance.get(`/api/auction/viewRegistredAuctions/${adcode}`, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                setRegisteredAuctions(response.data);
                console.log('Registered auctions:', response.data);
            } catch (error) {
                console.error('Error fetching registered auctions:', error);
            }
        };

        fetchRegisteredAuctions(); // Initial fetch
    }, [token]);

    const handleImageClick = (index) => {
        setSelectedImage(apartmentDetails.images[index]);
        setCurrentIndex(index);
    };

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === apartmentDetails.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? apartmentDetails.images.length - 1 : prevIndex - 1
        );
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => handleNextImage(),
        onSwipedRight: () => handlePrevImage(),
    });

    const isEquirectangular = (image) => {
        return image.includes('images360');
    };

    const displayedApartments = OtherApartments.slice(0, 4);

    const handleRegister = () => {
        const auctionID = apartmentDetails.auctionStatus?.auctionID;
        const adcode = apartmentDetails.adCode;

        if (isLoggedIn()) {
            const isAlreadyRegistered = registeredAuctions.some(auction => auction.adCode === adcode);

            if (isAlreadyRegistered) {
                navigate(`/auctiondetails?auctionID=${auctionID}&adcode=${adcode}`);
            } else {
                navigate(`/auctionregistration?auctionID=${auctionID}&adcode=${adcode}`);
            }
        } else {
            navigate('/login', { state: { from: location, auctionID, adcode } });
        }
    };

    const handlebookvisit = () => {
        const auctionID = apartmentDetails.auctionStatus?.auctionID;
        if (isLoggedIn()) {
            navigate(`/auctioninquiry?adcode=${apartmentDetails.adCode}&auctionID=${auctionID}`);
        } else {
            navigate('/login', { state: { from: location, adcode: apartmentDetails.adCode, auctionID } });
        }
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleSeeMore = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
            <div className='fullScreen'>
                <div className='countdown-breadcrumb'>
                    <div>
                        <Breadcrumb />
                    </div>

                    <div className='countdown-timer'>
                        <h2>
                            {countdownMessage}
                            {countdownMessage !== 'Not Available' && (
                                <span className='countdown-timer-span'>
                                    {' '}
                                    {`${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}
                                </span>
                     )}
                        </h2>
                    </div>

                </div>
                

                <div className='apartment-description'>
                        </div>

                <div className=' mt-3'>
                <div className="image-gallery">
    <div className="main-image-container">
        {selectedImage && isPannellumReady && (
            isEquirectangular(selectedImage) ? (
                <Pannellum
                    width="100%"
                    height="500px"  // Increased height
                    image={`http://124.43.179.118:8081/uploads/${selectedImage.split('\\').pop()}`}
                    pitch={10}
                    yaw={180}
                    hfov={110}
                    autoLoad
                />
            ) : (
                <img
                    src={`http://124.43.179.118:8081/uploads/${selectedImage.split('\\').pop()}`}
                    alt="Selected"
                    className="large-image"
                />
            )
        )}
    </div>
    <div className="thumbnail-images-container">
    {apartmentDetails.images && apartmentDetails.images.slice(0, 3).map((image, index) => (
        <img
            key={index}
            src={`http://124.43.179.118:8081/uploads/${image.split('\\').pop()}`}
            alt={`Thumbnail ${index}`}
            className={`thumbnail cursor-pointer ${currentIndex === index ? 'border-2 border-blue-500' : ''}`}
            onClick={() => handleImageClick(index)}
        />
    ))}
  {apartmentDetails.images && apartmentDetails.images.length > 0 && (
            <button
              className="see-more-button"
              onClick={handleSeeMore}
            >
              All Photos
              <div
                className="blurred-background"
                style={{ backgroundImage: `url(http://124.43.179.118:8081/uploads/${apartmentDetails.images[0].split('\\').pop()})` }}
              ></div>
            </button>
          )}
</div>

<AllPhotosPopup
          images={apartmentDetails.images || []}
          isOpen={isPopupOpen}
          onClose={closePopup}
        />

</div>



<div className='responsive-details'>
                    <div className="lg:ml-4 description-details">
                    <div className='apartment-description'>
                    Experience unparalleled luxury and comfort in our exclusive long-term rental apartments. Designed for those who appreciate the finer things in life, {apartmentDetails.title} offers a sophisticated living experience in {apartmentDetails.areas}.
                        </div>
                        {apartmentDetails.description && (
                            <>
                                <div className='responsive-description'>
                                    Description
                                </div>
                                <div className='text-2xl mt-2 text-justify'>
                                    {apartmentDetails.description}
                                </div>
                            </>
                        )}
                    
                        <div className="apartment-details-grid">
                            {apartmentDetails.areas && (
                                <div className='apartment-detail-tile'>
                                    <div className='flex items-center text-xl text-gold gap-4'>
                                        <MdLocationOn />
                                        <span className='text-black'>
                                            {capitalizeFirstLetter(apartmentDetails.areas)}, &nbsp; 
                                            {capitalizeFirstLetter(apartmentDetails.districts)}
                                        </span>
                                    </div>
                                </div>
                            )}
                    
                            {apartmentDetails.bedroomCount && (
                                <div className='apartment-detail-tile'>
                                    <div className='flex items-center text-xl text-gold gap-4'>
                                        <IoBedOutline />
                                        <span className='text-black'>{apartmentDetails.bedroomCount} Bedrooms</span>
                                    </div>
                                </div>
                            )}
                    
                            {apartmentDetails.bathroomCount && (
                                <div className='apartment-detail-tile'>
                                    <div className='flex items-center text-xl text-gold gap-4'>
                                        <FaShower />
                                        <span className='text-black'>{apartmentDetails.bathroomCount} Bathrooms</span>
                                    </div>
                                </div>
                            )}
                    
                            {apartmentDetails.areaSize && (
                                <div className='apartment-detail-tile'>
                                    <div className='flex items-center text-xl text-gold gap-4'>
                                        <BsTextarea />
                                        <span className='text-black'>{apartmentDetails.areaSize} sqft area</span>
                                    </div>
                                </div>
                            )}
                    
                            {apartmentDetails.parkSpace && (
                                <div className='apartment-detail-tile'>
                                    <div className='flex items-center text-xl text-gold gap-4'>
                                        <FaCar />
                                        <span className='text-black'>{apartmentDetails.parkSpace} Parking Spaces</span>
                                    </div>
                                </div>
                            )}
                    
                            {apartmentDetails.price && (
                                <div className='apartment-detail-tile'>
                                    <div className='flex items-center text-xl text-gold gap-4'>
                                        <BsCurrencyDollar />
                                        <span className='text-black'>{apartmentDetails.price} {apartmentDetails.currency}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {(apartmentDetails.keyFeatures?.length > 0 || apartmentDetails.ExclusiveAmenities?.length > 0 || apartmentDetails.CommunityPerks?.length > 0) && (
                    <div className=' additional-details'>
                        <h2 className='text-3xl mt-8 font-semibold'>Additional Information</h2>

                        <div className='additional'>
                            {apartmentDetails.keyFeatures?.length > 0 && (
                                <div className='mt-2'>
                                    <h3 className='text-2xl font-semibold'>Key Features:</h3>
                                    <ul className='list-disc list-inside text-xl'>
                                        {apartmentDetails.keyFeatures.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {apartmentDetails.ExclusiveAmenities?.length > 0 && (
                                <div className='mt-2'>
                                    <h3 className='text-2xl font-semibold'>Exclusive Amenities:</h3>
                                    <ul className='list-disc list-inside text-xl'>
                                        {apartmentDetails.ExclusiveAmenities.map((amenity, index) => (
                                            <li key={index}>{amenity}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {apartmentDetails.CommunityPerks?.length > 0 && (
                                <div className='mt-2'>
                                    <h3 className='text-xl font-semibold'>Community Perks:</h3>
                                    <ul className='list-disc list-inside text-lg'>
                                        {apartmentDetails.CommunityPerks.map((perk, index) => (
                                            <li key={index}>{perk}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                    </div>

                <div className='right-side-bar'>
                    <div className="auction-card">
                        <h2 className="auction-card-title">Timed Auction</h2>

                      

                        <div className="bidding-info">
                            <p><i className="info-icon"></i> Bidding Opens <strong>{apartmentDetails.auctionStatus?.startDate}</strong></p>
                            <p><i className="info-icon"></i> Bidding Closes <strong>{apartmentDetails.auctionStatus?.endDate}</strong></p>
                        </div>

                        <hr />

                        <div className="starting-bid">
                            <p>Starting Bid</p>
                            <h3>{apartmentDetails.currency} &nbsp;{apartmentDetails.auctionStatus?.startPrice}</h3>
                        </div>

                        {apartmentDetails.auctionStatus?.currentRate && (
                          <div className="starting-bid">
                            <p>Current Rate</p>
                            <h3>{apartmentDetails.currency} &nbsp;{apartmentDetails.auctionStatus.currentRate}</h3>
                          </div>
                        )}


                        <button className="bid-button" 
                        onClick={handleRegister}>Log In/Register to Bid</button>

                        </div>

                        <div className="visit-card">
                        <h2 className="visit-card-title">Inquiry</h2>

                        <div className="info-section">
                            <span className="badge visit-badge">View Property</span>
                        </div>

                        <div className="visit-info">
                            <p><i className="info-icon"></i> Location: <strong>{capitalizeFirstLetter(apartmentDetails.areas)}, {capitalizeFirstLetter(apartmentDetails.districts)}</strong></p>
                        </div>

                        <hr />

                        <div className="visit-details">
                            <p>Contact for more details</p>
                            <h3></h3>
                        </div>

                        <button className="visit-button"
                        onClick={handlebookvisit}>Send Inquiry</button>

                        </div>

                </div>

</div>


                   
                </div>

               
    

            </div>
        </>
    );
}