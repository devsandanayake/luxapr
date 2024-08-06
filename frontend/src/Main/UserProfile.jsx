import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const userName = decodedToken.firstName || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/users/viewUserProfile', {
          headers: {
            'Authorization': `${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err);
      }
    };
    
    fetchData();
  }, [token]);

  if (error) {
    return <div>Error loading profile: {error.message}</div>;
  }

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      UserProfile {userName}
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </div>
  );
}
