import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { MdLocationOn } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { FaShower } from "react-icons/fa";
import { BsTextarea, BsCurrencyDollar } from "react-icons/bs";
import ApartmentCard from '../ApartmentCard/ApartmentCard';
import { FaArrowRight } from "react-icons/fa";
import './ViewApartment.css';

export default function ViewApartment() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const adcode = searchParams.get('adcode');

    const [apartmentDetails, setApartmentDetails] = useState({});
    const [OtherApartments, setOtherApartments] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        axiosInstance.get(`/api/ads/viewSpecificAd/${adcode}`)
            .then((response) => {
                setApartmentDetails(response.data);
                if (response.data.originImages && response.data.originImages.length > 0) {
                    setSelectedImage(response.data.originImages[0]);
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

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <>
            <div className='fullScreen'>
                <div>
                    <h1 className='title text-3xl text-gold' style={{ fontFamily: 'Georgia, serif' }}>{apartmentDetails.title}</h1>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8'>
                    <div className="image-gallery w-full lg:w-full border border-gold p-3 ml-2 rounded-xl">
                        <div className="main-image-container">
                            {selectedImage && (
                                <img
                                    src={`http://124.43.179.118:8081/uploads/${selectedImage.split('\\').pop()}`}
                                    alt="Selected"
                                    className="large-image"
                                />
                            )}
                        </div>
                        <div className="thumbnail-images-container">
                            {apartmentDetails.originImages && apartmentDetails.originImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://124.43.179.118:8081/uploads/${image.split('\\').pop()}`}
                                    alt={`Thumbnail ${index}`}
                                    className={`thumbnail cursor-pointer ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => handleImageClick(image)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="lg:ml-4">
                        {apartmentDetails.description && (
                            <>
                                <div className='text-2xl font-bold ml-3'>
                                    Description
                                </div>
                                <div className='text-lg ml-10 mt-3 h-44'>
                                    {apartmentDetails.description}
                                </div>
                            </>
                        )}

                            
                        <div className='text-2xl font-bold ml-3'>
                            Overview
                        </div>
                            
                            
                        {apartmentDetails.address && (
                            <>
                                <div className='flex items-center text-xl text-gold ml-20 mt-3 gap-4'>
                                    <MdLocationOn />
                                    <span className='text-black'>{apartmentDetails.address.street}, {apartmentDetails.address.postCode}</span>
                                </div>
                            </>
                        )}

                        {apartmentDetails.bedroomCount && (
                            <>
                                <div className='flex items-center text-xl text-gold ml-20 mt-3 gap-4'>
                                    <IoBedOutline />
                                    <span className='text-black'>{apartmentDetails.bedroomCount} Bedrooms</span>
                                </div>
                            </>
                        )}

                        {apartmentDetails.bathroomCount && (
                            <>
                                <div className='flex items-center text-xl text-gold ml-20 mt-3 gap-4'>
                                    <FaShower />
                                    <span className='text-black'>{apartmentDetails.bathroomCount} Bathrooms</span>
                                </div>
                            </>
                        )}

                        {apartmentDetails.areaSize && (
                            <>
                                <div className='flex items-center text-xl text-gold ml-20 mt-3 gap-4'>
                                    <BsTextarea />
                                    <span className='text-black'>{apartmentDetails.areaSize} sq ft</span>
                                </div>
                            </>
                        )}

                        {apartmentDetails.price && (
                            <>
                                <div className='flex items-center text-xl text-gold ml-20 mt-3 gap-4'>
                                    <BsCurrencyDollar />
                                    <span className='text-black'>{apartmentDetails.price} {apartmentDetails.currency}</span>
                                </div>
                            </>
                        )}

                        <div className='flex items-center justify-center'>
                            <button className='bg-gold text-white text-center text-lg font-bold py-2 px-4 rounded-md mt-5 w-2/5'>
                                Book Now
                            </button>
                        </div>

                    </div>
                </div>

                <div className='text-3xl p-2 mt-14' style={{ fontFamily: 'Georgia, serif' }}>
                    Other Apartments
                    </div>
                <div className="apartment-list-container">
    <div className="apartment-list flex flex-wrap gap-4 p-2">
      {OtherApartments.map(apartment => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  </div>

  <div className='flex items-center justify-center mb-20'>
    <button className='all-apartments-button'> All Apartments <FaArrowRight className="arrow" /></button>
  </div>

            </div>
        </>
    );
}
