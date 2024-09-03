import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import './AuctionDetails.css';
import { Pannellum } from 'pannellum-react';

export default function AuctionDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const adcode = searchParams.get('adcode');
  const token = localStorage.getItem('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const userName = decodedToken.firstName || '';
  const [apartmentDetails, setApartmentDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState('');
  const [isPannellumReady, setIsPannellumReady] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [auctionStatus, setAuctionStatus] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidFieldDisabled, setBidFieldDisabled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  
    const fetchApartmentDetails = () => {
      axiosInstance.get(`/api/ads/viewSpecificAd/${adcode}`)
        .then((response) => {
          setApartmentDetails(response.data);
          if (response.data.images && response.data.images.length > 0) {
            setSelectedImage(response.data.images[0]);
          }
          setIsPannellumReady(true);
          handleCountdown(response.data.auctionStatus);
          setBidAmount(response.data.auctionStatus.BidValue); // Set initial bid amount
        })
        .catch((error) => {
          console.error('Error fetching apartment details:', error);
        });
    };
  
    fetchApartmentDetails(); // Initial fetch
  
    const interval = setInterval(fetchApartmentDetails, 1000); // Fetch every 60 seconds
    setIntervalId(interval);
  
    return () => {
      // Clear the interval on component unmount
      clearInterval(interval);
    };
  }, [adcode]);

  const handleImageClick = (index) => {
    setSelectedImage(apartmentDetails.images[index]);
  };

  const isEquirectangular = (image) => {
    return image.includes('equirectangular'); // Example check for 360-degree images
  };

  const handleCountdown = (auction) => {
    const currentDate = new Date();
    const startDateTime = new Date(`${auction.startDate}T${auction.startTime}`);
    const endDateTime = new Date(`${auction.endDate}T${auction.endTime}`);

    const updateCountdown = () => {
      const now = new Date();
      let newCountdown = '';

      if (now < startDateTime) {
        // Auction has not started yet
        setAuctionStatus('start');
        newCountdown = calculateCountdown(startDateTime);
        setBidFieldDisabled(true);
      } else if (now >= startDateTime && now <= endDateTime) {
        // Auction is ongoing
        setAuctionStatus('ongoing');
        newCountdown = calculateCountdown(endDateTime);
        setBidFieldDisabled(false);
      } else {
        // Auction has ended
        setAuctionStatus('ended');
        newCountdown = 'Time is up';
        setBidFieldDisabled(true);
      }

      setCountdown(newCountdown);
    };

    updateCountdown();
    const id = setInterval(updateCountdown, 1000); // Update every second
    setIntervalId(id);
  };

  const calculateCountdown = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) return 'Time is up';

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
  };

  const handleBidSubmit = async () => {
    if (isBidButtonDisabled) {
      alert('Auction not available for bidding.');
      return;
    }

    try {
      const payload = {
        auctionID: apartmentDetails?.auctionStatus?.auctionID,
        adCode: adcode,
        bidAmount: parseFloat(bidAmount)
      };

      const headers = {
        'Authorization': `Bearer ${token}`, // Ensure the token is prefixed with 'Bearer ' if required by the API
      };

      console.log('Submitting bid with payload:', payload);
      console.log('Using headers:', headers);

      const response = await axiosInstance.post('/api/auction/bidAuction', payload, { headers });
      console.log('Bid response:', response);

      alert('Bid placed successfully');
      setBidFieldDisabled(true); // Disable bid field after successful submission
    } catch (error) {
      console.error('Error placing bid:', error.response || error.message);
      alert('Failed to place bid: ' + (error.response?.data?.message || error.message));
    }
  };

  const isBidButtonDisabled = auctionStatus !== 'ongoing' || bidFieldDisabled;

  return (
    <>
    <div className='title-time'>

    <div className='xapartment-title'>
      <h1>{apartmentDetails.title}</h1>
    </div>

    <div className='xtime-left'>
      
    </div>

    </div>

    <div className="xauction-details">

      
      <div className="xgallery-container">
        <div className="xmain-image">
          {selectedImage && isPannellumReady && (
            isEquirectangular(selectedImage) ? (
              <Pannellum
                width="100%"
                height="500px"
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
                className="xmain-image-display"
              />
            )
          )}
        </div>
        <div className="xthumbnail-container">
          {apartmentDetails.images && apartmentDetails.images.slice(0, 3).map((image, index) => (
            <img
              key={index}
              src={`http://124.43.179.118:8081/uploads/${image.split('\\').pop()}`}
              alt={`Thumbnail ${index}`}
              className={`xthumbnail ${selectedImage === image ? 'xactive-thumbnail' : ''}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Auction Details */}
      <div className='xauction-info-container'>
        <div className="xauction-info">
          <h2 className="xcurrent-bid">Current bid: <span>{apartmentDetails?.auctionStatus?.currentRate}</span></h2>

          {auctionStatus === 'start' && (
            <div className="xtime-left">
              <h3>Starts in:</h3>
              <div className="xtime-values">
                <span>{countdown}</span>
              </div>
            </div>
          )}

          {auctionStatus === 'ongoing' && (
            <div className="xtime-left">
              <h3>Time left:</h3>
              <div className="xtime-values">
                <span>{countdown}</span>
              </div>
            </div>
          )}

          {auctionStatus === 'ended' && (
            <div className="xauction-end">
              <p>Auction Not Available</p>
            </div>
          )}

          <div className="xauction-end">
            <p>Auction ends: {`${apartmentDetails?.auctionStatus?.endDate} ${apartmentDetails?.auctionStatus?.endTime}`}</p>
          </div>

          <div className="xbid-controls">
            <p>Bid Amount</p>
            <input 
              type="number" 
              min="1000" 
              step="0.01" 
              placeholder="1,000.00 £" 
              className="xbid-input" 
              value={bidAmount} 
              onChange={(e) => setBidAmount(e.target.value)} 
              disabled={bidFieldDisabled}
            />
            <button 
              className="xbid-button" 
              disabled={isBidButtonDisabled} 
              onClick={handleBidSubmit}
            >
              Bid
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
