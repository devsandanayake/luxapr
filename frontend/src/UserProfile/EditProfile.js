import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import './EditProfile.css';
import Popup from './EditSuccessPopup';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    contactNumber: ''
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/users/viewUserProfile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const { username, firstName, lastName, email, occupation, contactNumber, images } = response.data.user;

        setFormData({ username, firstName, lastName, email, occupation, contactNumber });
        setProfilePicturePreview(images ? `http://124.43.179.118:8081/${images}` : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png");
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (profilePicture) {
      data.append('images', profilePicture);
    }

    try {
      const response = await axiosInstance.patch('/api/users/editUserProfile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.data.error) {
        setError(response.data.message || 'Something went wrong. Please try again.');
      } else {
        setSuccess('Profile updated successfully!');
        setTimeout(() => {
          navigate('/user/profile');
        }, 3000); // Display the popup for 3 seconds
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="edit-profile-container">
      <h4 className="title">Edit Profile</h4>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="left-side">
          <div className="profile-picture-container">
            <label htmlFor="file-input" className="profile-picture-label">
              <img 
                className="profile-picture" 
                src={profilePicturePreview} 
                alt="Profile Preview" 
              />
            </label>
            <input 
              type="file" 
              name="images" 
              id="file-input" 
              onChange={handleFileChange} 
              className="file-input"
            />
          </div>
        </div>

        <div className="right-side">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              name="username" 
              id="username" 
              value={formData.username} 
              readOnly
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              name="firstName" 
              id="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              id="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={formData.email} 
              readOnly 
              className="form-input read-only"
            />
          </div>
          <div className="form-group">
            <label htmlFor="occupation">Occupation</label>
            <input 
              type="text" 
              name="occupation" 
              id="occupation" 
              value={formData.occupation} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input 
              type="text" 
              name="contactNumber" 
              id="contactNumber" 
              value={formData.contactNumber} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Save Changes</button>
          {success && <Popup message={success} />}
        </div>
      </form>
    </div>
  );
}