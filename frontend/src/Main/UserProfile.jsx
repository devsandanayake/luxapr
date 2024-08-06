import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import './user.css';
import { FaUser, FaLock, FaBell, FaCreditCard, FaGavel, FaQuestionCircle } from 'react-icons/fa';
          

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

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
        setUserProfile(response.data.user);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err);
      }
    };
    
    fetchData();
  }, [token]);

  if (error) {
    return <div className="text-red-500">Error loading profile: {error.message}</div>;
  }

  if (!userProfile) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h4 className="text-2xl font-bold mb-4">Account Settings</h4>
      <div className="flex flex-col md:flex-row">
        <button 
          className="md:hidden bg-yellow-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          Menu
        </button>
        <div className={`w-full md:w-1/4 ${isNavOpen ? 'block' : 'hidden'} md:block`}>
        
          <div className="nav flex-column nav-pills">
            <a href="#account-general" data-toggle="tab" className="nav-link active">
              <FaUser className="mr-2" /> General
            </a>
            <a href="#account-security" data-toggle="tab" className="nav-link">
              <FaLock className="mr-2" /> Security
            </a>
            <a href="#account-notifications" data-toggle="tab" className="nav-link">
              <FaBell className="mr-2" /> Notifications
            </a>
            <a href="#account-billing" data-toggle="tab" className="nav-link">
              <FaCreditCard className="mr-2" /> Billing
            </a>
            <a href="#account-connections" data-toggle="tab" className="nav-link">
              <FaGavel className="mr-2" /> Auction Registration
            </a>
            <a href="#account-connections" data-toggle="tab" className="nav-link">
              <FaQuestionCircle className="mr-2" /> Inquiries
            </a>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="tab-content">
            <div id="account-general" className="tab-pane fade show active">
              <div className="flex items-center mb-4">
                <img className="h-20 w-20 rounded-full mr-4" src={userProfile.avatar || "https://via.placeholder.com/150"} alt="User Avatar" />
                <div>
                  <p className="btn btn-default">{userProfile.username}</p>
                  <p className="text-gray-600">Joined: {new Date(userProfile.registerDate).toDateString()}</p>
                </div>
              </div>
              <hr className="border-gray-300 mb-4" />
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700">Username</label>
                  <input type="text" className="form-input mt-1 block w-full" value={userProfile.username} readOnly />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input type="text" className="form-input mt-1 block w-full" value={userProfile.firstName} readOnly />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">E-mail</label>
                  <input type="text" className="form-input mt-1 block w-full" value={userProfile.email} readOnly />
                  <div className="bg-yellow-100 text-yellow-800 text-sm p-2 mt-2">
                    Your email is not confirmed. Please check your inbox.<br />
                    <a href="#" className="text-yellow-800 underline">Resend confirmation</a>
                  </div>
                </div>
              </div>
            </div>
            {/* Repeat similar structure for other tabs */}
          </div>
        </div>
      </div>
    </div>
  );
}