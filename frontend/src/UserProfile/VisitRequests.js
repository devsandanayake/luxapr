import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import './VisitRequests.css';

export default function VisitRequests() {
    const token = localStorage.getItem('token');
    const [visitRequests, setVisitRequests] = useState(null);
    const [error, setError] = useState(null);
    const [adDetails, setAdDetails] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/api/longrental-inquery/user', {
                    headers: {
                        'Authorization': ` ${token}`,  
                    },
                });
                console.log('Full response:', response);  
                setVisitRequests(response.data);  
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError(err);
            }
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        if (visitRequests) {
            visitRequests.forEach((request) => {
                axiosInstance.get(`/api/ads/viewSpecificAd/${request.adCode}`)
                    .then((response) => {
                        setAdDetails(prevState => ({
                            ...prevState,
                            [request.adCode]: response.data
                        }));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        }
    }, [visitRequests]);

    // Function to convert 24-hour format to 12-hour format
    const convertTo12HourFormat = (time) => {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10);

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;  // Convert 0 to 12 for 12 AM
        return `${hours}:${minutes} ${ampm}`;
    };

    const statusconverter = (replyStatus) => {
        if (replyStatus === 'Pending') {
            return "Pending";
        } else if (replyStatus === 'AssignAgent') {
            return "Agent Assigned";
        } else if (replyStatus === 'Completed') {
            return "Completed";
        } else if (replyStatus === 'Rejected') {
            return "Rejected";
        } else {
            return "";
        }
    }

    return (
        <div className='w-10/12 mx-auto'>
            <h1 className='text-center text-2xl mb-2'>Visit Requests</h1>
            {error && <div className="text-red-500">Error: {error.message}</div>}
            {visitRequests && visitRequests.map((request) => (
                <div key={request._id} className="visit-request p-4 border rounded shadow flex flex-col md:flex-row mb-4">
                    <div className="w-full md:w-2/5 relative">
                        <img 
                            src={adDetails[request.adCode]?.images && adDetails[request.adCode].images.length > 0 
                                ? `http://124.43.179.118:8081/uploads/${adDetails[request.adCode].images[0].split('\\').pop()}` 
                                : 'defaultImagePath'}  
                            alt={adDetails[request.adCode]?.title || "Room"} 
                            className="room-image mx-auto" 
                        />
                    </div>
                    <div className="visit-request__details w-full md:w-2/3 pl-0 md:pl-4 mt-4 md:mt-0 text-center md:text-left">
                        <h3 className="text-xl font-bold text-gold mb-3">{adDetails[request.adCode]?.title}</h3>
                        <p className='mb-1'><strong>Status:</strong> {statusconverter(request.replyStatus)}</p>
                        <p>
                            <strong>Preferred Date and Time:</strong> {request.preferredDate} || {convertTo12HourFormat(request.preferredTime)}
                        </p>
                        <p>
                            <strong>Alternate Date and Time:</strong> {request.alternateDate} || {convertTo12HourFormat(request.alternateTime)}
                        </p>
                        <p><strong>Location :</strong> {adDetails[request.adCode]?.areas}</p>

                        
                    </div>
                </div>
            ))}
        </div>
    );
}