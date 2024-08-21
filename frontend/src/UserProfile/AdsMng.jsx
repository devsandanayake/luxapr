import React from 'react';
import axiosInstance from '../axiosConfig'; // Ensure correct import path

export default function AdsMng({token}) {
  const [ads, setAds] = React.useState(null);
  const [error, setError] = React.useState(null);

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

  return (
    <div>
      <h1>Ads Management</h1>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id}>{ad.title}</li>
          
        ))}
      </ul>
    </div>
  );
}