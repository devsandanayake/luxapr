import React, { useState } from 'react';
import './SignUp.css'; 
import Logo from '../Images/Logo.png'; 
import axiosInstance from '../axiosConfig';
import Popup from './Popup'; 

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    password: '',
    contactNumber: ''
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfilePictureClick = () => {
    document.getElementById('images').click();
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setProfilePicturePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData();
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }
    if (profilePicture) {
      formDataWithImage.append('images', profilePicture);
    }

    try {
      const response = await axiosInstance.post('/api/users/signup', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setMessage('Account created successfully!');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          window.location.href = '/login';  // Redirect to login page after 3 seconds
        }, 3000);
      } else {
        setMessage(response.data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group profile-picture-group">
  <div className="profile-picture-container" onClick={handleProfilePictureClick}>
    {profilePicturePreview ? (
      <img src={profilePicturePreview} alt="Profile Preview" className="profile-picture" />
    ) : (
      <div className="profile-picture-placeholder">
        <span className="placeholder-icon">👤</span>
      </div>
    )}
  </div>
  <input 
    type="file" 
    name="images" 
    id="images" 
    onChange={handleFileChange} 
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
              onChange={handleChange} 
              required 
              className="form-input"
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
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              name="username" 
              id="username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input 
              type="number" 
              name="contactNumber" 
              id="contactNumber" 
              value={formData.contactNumber} 
              onChange={handleChange} 
              className="form-input"
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
          {message && <p className="signup-message">{message}</p>}
        </form>
        <div className="signup-footer">
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </div>
      {showPopup && <Popup message={message} />}
    </div>
  );
}