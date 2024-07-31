import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ContactUs() {

    const isLoggedIn = () => {
        return localStorage.getItem('token') !== null;
    };
    const navigate = useNavigate();

    const AddApartment = () => {
        if (isLoggedIn()) {
            navigate('/addapartment');
        } else {
            navigate('/login');
        }
    }

  return (
    <>
         <div>

                
        </div>
    </>
  )
}
