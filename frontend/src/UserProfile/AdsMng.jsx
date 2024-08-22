import React from 'react';
import axiosInstance from '../axiosConfig'; // Ensure correct import path
import { useNavigate } from 'react-router-dom';

export default function AdsMng({token}) {
  const [ads, setAds] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/users/viewAllAds/user', {
          headers: {
            'Authorization': `${token}`,
          },
        });
        setAds(response.data.ads);
      } catch (err) {
        console.error('Error fetching ads:', err);
        setError(err);
      }
    };
    
    fetchData();
  }, [token]);

  if (error) {
    return <div>Error fetching ads: {error.message}</div>;
  }

  if (!ads) {
    return <div>Loading...</div>;
  }

  const handleViewClick = (adCode) => {
    const query = new URLSearchParams({ adCode });
    navigate(`/charging/planes?${query.toString()}`);
  };
  

  return (
    <div>
      <h1>Ads Management</h1>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id}>{ad.title}
          
          <button onClick={()=>handleViewClick(ad.adCode)}>
              View
            </button>
          </li>

        ))}
      </ul>
    </div>
  );
}