import React from 'react'
import axios from 'axios';

export default function UserProfile() {
  const token = localStorage.getItem('token');

 
  React.useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/users/viewUserProfile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  })

  return (
    <div>UserProfile</div>
  )
}
