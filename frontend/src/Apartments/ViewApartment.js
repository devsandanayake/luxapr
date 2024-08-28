import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { MdLocationOn } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { BsTextarea, BsCurrencyDollar } from "react-icons/bs";
import ApartmentCard from '../ApartmentCard/ApartmentCard';
import { FaArrowRight, FaCar } from "react-icons/fa";
import { Pannellum } from "pannellum-react";
import { useSwipeable } from 'react-swipeable';
import Breadcrumb from '../BreadCrumb/Breadcrumb';
import AllPhotosPopup from './AllPhotosPopup';
import SearchPopup from './SearchPopup';
import { CiSearch } from "react-icons/ci";
import './ViewApartment.css';

export default function ViewApartment() {
    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const adcode = searchParams.get('adcode');

    const [apartmentDetails, setApartmentDetails] = useState({});
    const [OtherApartments, setOtherApartments] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [isPannellumReady, setIsPannellumReady] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
    const [searchFields, setSearchFields] = useState({
        district: '',
        area: '',
        roomCount: '',
        startDate: '',
        endDate: ''
    });

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

    const priceTag = (() => {
        if (apartmentDetails.transactionType === 1) {
            return "Per Day";
        } else if (apartmentDetails.transactionType === 2) {
            return "Per Month";
        } else if (apartmentDetails.transactionType === 3) {
            return "Per Day";
        } else {
            return "";
        }
    })();

    const handlebookNow = () => {
        if (isLoggedIn()) {
            if (apartmentDetails.transactionType === 2) {
                navigate(`/longtermbooking?adcode=${adcode}`);
            } else {
                navigate(`/short?adcode=${adcode}`);
            }
        } else {
            navigate('/login', { state: { from: location, adcode } });
        }
    };

    const handleRegister = () => {
        if (isLoggedIn()) {
            navigate(`/auctionregistration?auctionID=${apartmentDetails.auctionStatus.auctionID}`);
        } else {
            navigate('/login');
        }
    };

    const handleInquiry = () => {
        if (isLoggedIn()) {
            navigate(`/auctioninquiry?auctionID=${apartmentDetails.auctionStatus.auctionID}`);
        } else {
            navigate('/login');
        }
    };

    const bookVisit = () => {
        if (isLoggedIn()) {
            navigate(`/visitinquiry?adcode=${apartmentDetails.adCode}`);
        } else {
            navigate('/login', { state: { from: location, adcode } });
        }
    };

    const handleSearchChange = (e) => {
        const { id, value } = e.target;
        setSearchFields(prevState => ({
            ...prevState,
            [id]: (id === 'district' || id === 'area') ? value.toLowerCase() : value
        }));
    };

    const handleSearch = () => {
        const queryParams = new URLSearchParams(searchFields).toString();
        navigate(`/allapartments?${queryParams}`);
    };


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      const [isPopupOpen, setIsPopupOpen] = useState(false);

      const handleSeeMore = () => {
        setIsPopupOpen(true);
      };
    
      const closePopup = () => {
        setIsPopupOpen(false);
      };

      const responsiveSearch = () => {
        setIsSearchPopupOpen(true);
      };

      const closeSearchPopup = () => {    
        setIsSearchPopupOpen(false);
      }

    return (
        <>
            <div className='fullScreen'>

                <div className="search-barrr">
                    <div className="booking-optionnn">
                        <input
                            type="text"
                            id="district"
                            placeholder="Enter district"
                            className='w-full h-full p-2'
                            value={searchFields.district}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="booking-optionnn">
                        <input
                            type="text"
                            id="area"
                            placeholder="Enter area"
                            className='w-full h-full p-2'
                            value={searchFields.area}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="booking-optionnn">
                        <input
                            type="number"
                            id="roomCount"
                            placeholder="Enter room count"
                            className='w-full h-full p-2'
                            value={searchFields.roomCount}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="booking-optionnn">
                        <input
                            type="date"
                            id="startDate"
                            placeholder="Start Date"
                            className='w-full h-full p-2'
                            value={searchFields.startDate}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="booking-optionnn">
                        <input
                            type="date"
                            id="endDate"
                            placeholder="End Date"
                            className='w-full h-full p-2'
                            value={searchFields.endDate}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <button className="check-buttonn" onClick={handleSearch}>CHECK</button>
                </div>

                 <div className='responsive-searchbar'>
                    <button className="responsive-search-check" onClick={responsiveSearch}>
                    <CiSearch />Search
                    </button>
                </div>

                <SearchPopup
                    isOpen={isSearchPopupOpen}
                    onClose={closeSearchPopup}
                />

                <div>
                    <Breadcrumb />
                </div>

                <div className='apartment-description'>
                            Experience unparalleled luxury and comfort in our exclusive long-term rental apartments. Designed for those who appreciate the finer things in life, {apartmentDetails.title} offers a sophisticated living experience in {apartmentDetails.areas}.
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
                                        <span className='text-black'>{apartmentDetails.price} {apartmentDetails.currency} {priceTag}</span>
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

                    <div className='button-details'>

                    {(apartmentDetails.transactionType === 2 || apartmentDetails.transactionType === 3) && (
                        <>
                            <div className=''>

                            <div className='p-3' style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>                                  
                                <div className='text-xl'>
                                    Planning to see your future home in person? Schedule an exclusive tour of the apartment and experience the luxury firsthand. Once you've made a booking, our system will assign a dedicated agent to guide you through the property, ensuring that all your questions are answered.
                                  </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>                                    
                                    <button className='bg-gold text-white text-center text-lg font-bold py-2 px-4 rounded-md mt-5 w-40'
                                      onClick={bookVisit}
                                    >
                                      Book a Visit
                                    </button>
                                  </div>
                                </div>
                        
                                <div className='p-3 mt-8' style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>                                  
                                <div className='text-xl'>
                                Ready to secure your new luxury apartment? You can reserve the property immediately, taking the first step toward owning or renting a premium living space in one of the most sought-after locations. Enjoy a seamless process tailored to match the high standards of your next home.
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <button className='bg-gold text-white text-center text-lg font-bold py-2 px-4 rounded-md mt-5 w-40'
                                        onClick={handlebookNow}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        </>
                    )}
                        
                    </div>
</div>
                   
                </div>

               
    
                <div className='origin-buttons'>
                    {(apartmentDetails.transactionType === 1 ) && (
                        <div className='flex items-center justify-center'>
                            <button className='bg-gold text-white text-center text-lg font-bold py-2 px-4 rounded-md mt-5 w-40'
                                onClick={''}
                            >
                                Book Now
                            </button>
                        </div>
                    )}

                    {(apartmentDetails.transactionType === 2 || apartmentDetails.transactionType === 3) && (
                        <>
                            <div className='flex flex-row items-center justify-center gap-6'>
                                <div className='flex items-center justify-center'>
                                    <button className='bg-gold text-white text-center text-lg font-bold py-2 px-4 rounded-md mt-5 w-40'
                                        onClick={bookVisit}
                                    >
                                        Book a Visit
                                    </button>
                                </div>
                        
                                <div className='flex items-center justify-center'>
                                    <button className='bg-gold text-white text-center text-lg font-bold py-2 px-4 rounded-md mt-5 w-40'
                                        onClick={handlebookNow}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {apartmentDetails.transactionType === 4 && (
                        <>
                            <div className='flex flex-row items-center justify-center gap-6'>
                                <div className='flex items-center justify-center'>
                                    <button className='bg-gold text-white text-center text-lg font-bold py-2 px-4 rounded-md mt-5 w-40 '
                                        onClick={handleInquiry}
                                    >
                                        Send Inquiry
                                    </button>
                                </div>

                                <div className='flex items-center justify-center'>
                                    <button className='bg-gold text-white text-center text-lg font-bold py-2 px-4 rounded-md mt-5 w-40 '
                                        onClick={handleRegister}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className='text-3xl p-2 mt-14' style={{ fontFamily: 'Georgia, serif' }}>
                    Other Apartments
                </div>
                <div className="apartment-list-container">
                    <div className="apartment-list">
                        {displayedApartments.map(apartment => (
                            <ApartmentCard key={apartment.id} apartment={apartment} />
                        ))}
                    </div>
                </div>

                <div className='flex items-center justify-center mb-20'>
                    <a href='/allapartments'>
                        <button className='all-apartments-button'> All Apartments <FaArrowRight className="arrow" /></button>
                    </a>
                </div>
            </div>
        </>
    );
}