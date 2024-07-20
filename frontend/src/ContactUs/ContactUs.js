import React from 'react'
import { useNavigate } from 'react-router-dom';
import background from '../Images/ap6.jpg';

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
         <div
                style={{ 
                    height: 'calc(100vh - 60px)', 
                    backgroundImage: `url(${background})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                }}
            >

                <button className="bg-blue-500 mt-10 ml-10 p-1 rounded "
                onClick={AddApartment}>Add Apartment</button>


            </div>
    </>
  )
}
