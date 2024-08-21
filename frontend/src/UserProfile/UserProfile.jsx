import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { FaUser, FaLock, FaBell, FaCreditCard, FaGavel, FaQuestionCircle } from 'react-icons/fa';
import VisitRequests from './VisitRequests/VisitRequests';
import YourAds from './YourAds/YourAds';
import BookingDetails from './BookingDetails/BookingDetails';
import AdsMng from './AdsMng';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const token = localStorage.getItem('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const userName = decodedToken.username || '';

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
            <button onClick={() => setActiveTab('general')} className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}>
              <p className="flex items-center"><FaUser className="mr-2" /> General</p>
            </button>
            <button onClick={() => setActiveTab('security')} className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}>
              <p className="flex items-center"><FaLock className="mr-2" /> Your Ads</p>
            </button>
            <button onClick={() => setActiveTab('notifications')} className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}>
              <p className="flex items-center"><FaBell className="mr-2" /> Bookings</p>
            </button>
            <button onClick={() => setActiveTab('billing')} className={`nav-link ${activeTab === 'billing' ? 'active' : ''}`}>
              <p className="flex items-center"><FaCreditCard className="mr-2" /> Visit Requests</p>
            </button>
            <button onClick={() => setActiveTab('auction')} className={`nav-link ${activeTab === 'auction' ? 'active' : ''}`}>
              <p className="flex items-center"><FaGavel className="mr-2" /> Auction Registration</p>
            </button>
            <button onClick={() => setActiveTab('inquiries')} className={`nav-link ${activeTab === 'inquiries' ? 'active' : ''}`}>
              <p className="flex items-center"><FaQuestionCircle className="mr-2" /> Inquiries</p>
            </button>
            <button onClick={() => setActiveTab('ADS')} className={`nav-link ${activeTab === 'ADS' ? 'active' : ''}`}>
              <p className="flex items-center"><FaQuestionCircle className="mr-2" />Your ADS</p>
            </button>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="tab-content">
            {activeTab === 'general' && (
              <div id="account-general" className="tab-pane fade show active">
                <div className="flex items-center mb-4">
                  <img 
                    className="h-20 w-20 rounded-full mr-4" 
                    src={userProfile.images ? `http://124.43.179.118:8081/${userProfile.images}` : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"} 
                    alt="User Avatar" 
                  />                  <div>
                    <p className="btn btn-default">{userProfile.username}</p>
                    <p className="text-gray-600">Joined: {new Date(userProfile.registerDate).toDateString()}</p>
                  </div>
                  <div className="ml-auto">
                    <a href='/editprofile'>
                    <button className=" p-2 border rounded-lg bg-blue-400">Edit Profile</button>
                    </a>
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
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <input type="text" className="form-input mt-1 block w-full" value={userProfile.contactNumber} readOnly />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">occupation</label>
                    <input type="text" className="form-input mt-1 block w-full" value={userProfile.occupation} readOnly />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'security' && (
              <div id="account-security" className="tab-pane fade show active">
                <YourAds/>
              </div>
            )}
            {activeTab === 'notifications' && (
              <div id="account-notifications" className="tab-pane fade show active">
                <BookingDetails/>
              </div>
            )}
            {activeTab === 'billing' && (
              <div id="account-billing" className="tab-pane fade show active">
                <VisitRequests/>
              </div>
            )}
            {activeTab === 'auction' && (
              <div id="account-auction" className="tab-pane fade show active">
                {/* Auction Registration tab content */}
              </div>
            )}
            {activeTab === 'inquiries' && (
              <div id="account-inquiries" className="tab-pane fade show active">
                {/* Inquiries tab content */}
              </div>
            )}
              {activeTab === 'ADS' && (
              <div id="account-inquiries" className="tab-pane fade show active">
                <AdsMng  Token={token}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}