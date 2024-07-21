import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import './ViewApartment.css';
import Apartment1 from '../Images/ap1.jpg'; // Assuming a default image

export default function ViewApartment() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('adCode');

    const [addDetails, setAddDetails] = useState({});
    const [selectedImage, setSelectedImage] = useState('');
    const [otherApartments, setOtherApartments] = useState([]);

    useEffect(() => {
        const fetchAddDetails = async () => {
            try {
                const response = await axiosInstance.get(`/api/ads/viewSpecificAd/${id}`);
                setAddDetails(response.data);
                if (response.data.originImages && response.data.originImages.length > 0) {
                    setSelectedImage(response.data.originImages[0]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchOtherApartments = async () => {
            try {
                const response = await axiosInstance.get('/api/ads/viewAds');
                setOtherApartments(response.data.filter(apartment => apartment.adCode !== id));
            } catch (error) {
                console.error(error);
            }
        };

        fetchAddDetails();
        fetchOtherApartments();
    }, [id]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <>
            <div className='fullScreen'>
                <div>
                    <h1 className='title text-2xl text-white text-center'>{addDetails.title}</h1>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8'>
                    <div className="image-gallery w-full lg:w-full border border-gold p-3 ml-2">
                        <div className="main-image">
                            {selectedImage && (
                                <img 
                                    src={`http://localhost:8005/uploads/${selectedImage.split('\\').pop()}`} 
                                    alt="Selected" 
                                    className="large-image"
                                />
                            )}
                        </div>
                        <div className="thumbnail-images h-24">
                            {addDetails.originImages && addDetails.originImages.map((image, index) => (
                                <img 
                                    key={index}
                                    src={`http://localhost:8005/uploads/${image.split('\\').pop()}`}
                                    alt={`Thumbnail ${index}`}
                                    className="thumbnail"
                                    onClick={() => handleImageClick(image)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="lg:ml-4">
                        <div className='text-xl text-white ml-3'>
                            Description
                        </div>
                        <div className='text-lg text-white ml-10 mt-3'>
                            {addDetails.description}
                        </div>

                        <div className='text-xl text-white ml-3 mt-3'>
                            Address
                        </div>
                        <div className='text-lg text-white ml-10 mt-3'>
                            {addDetails.address}
                        </div>

                        <div className='text-xl text-white ml-3 mt-3'>
                            Price
                        </div>
                        <div className='text-lg text-white ml-10 mt-3'>
                            {addDetails.price}
                        </div>
                    </div>
                </div>

                <div className='text-2xl text-white ml-3 mt-3'>
                    Other Details
                </div>

                <div className='flex flex-wrap ml-3 mt-3 text-white'>
                    <div className='w-full sm:w-1/2 p-2'>
                        <span className=''>Bedrooms:</span> {addDetails.bedroomCount}
                    </div>
                    <div className='w-full sm:w-1/2 p-2'>
                        <span className=''>Bathrooms:</span> {addDetails.bathroomCount}
                    </div>
                    <div className='w-full sm:w-1/2 p-2'>
                        <span className=''>Floor:</span> {addDetails.floor}
                    </div>
                    <div className='w-full sm:w-1/2 p-2'>
                        <span className=''>Area Size:</span> {addDetails.areaSize} sq ft
                    </div>
                    <div className='w-full sm:w-1/2 p-2'>
                        <span className=''>Price:</span> {addDetails.price} {addDetails.currency}
                    </div>
                    <div className='w-full sm:w-1/2 p-2'>
                        <span className=''>Type of Property:</span> {addDetails.typeOfPro}
                    </div>
                </div>

                <hr className='w-full bg-gold h-1 mt-3'></hr>

                <div className='text-2xl text-white ml-3 mt-3'>
                    Other Apartments
                </div>

                <div className='w-full flex justify-center items-center mt-3'>
                    <div className="w-full ml-2 mr-2 p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {otherApartments.map((apartment) => (
                            <Link 
                                key={apartment._id} 
                                to={`/viewapartment?adCode=${apartment.adCode}`} 
                                className="apartment-card flex flex-col sm:flex-row border-2 border-gold p-2 hover:transform hover:scale-102 transition-transform duration-300 ease-in-out"
                            >
                                {apartment.originImages && apartment.originImages.length > 0 ? (
                                    <img
                                        src={`http://localhost:8005/uploads/${apartment.originImages[0].split('\\').pop()}`}
                                        alt={apartment.name}
                                        className="apartment-image w-full sm:w-1/2 lg:w-6/12 object-cover"
                                    />
                                ) : (
                                    <img src={Apartment1} alt="Default Apartment" className="apartment-image w-full sm:w-1/2 lg:w-5/12 object-cover" />
                                )}
                                <div className="flex-1 ml-0 sm:ml-4 mt-2 sm:mt-0">
                                    <h3 className='text-xl font-bold text-white'>{apartment.title}</h3>
                                    <p className='text-md text-white'>{apartment.address}</p>
                                    <p className='text-md text-white'>{apartment.description}</p>
                                    <p className='text-md text-white'>{apartment.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
