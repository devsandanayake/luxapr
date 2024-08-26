import React, { useState } from 'react';
import './SignUp.css'; 
import axiosInstance from '../axiosConfig';
import Popup from './Popup'; 
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdWorkOutline, MdEmail } from 'react-icons/md';
import { FaUser, FaUserCircle } from 'react-icons/fa';

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
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({ ...errors, [name]: '' }); // Clear errors on change
  };

  const handleProfilePictureClick = () => {
    document.getElementById('images').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
      setErrors({ ...errors, images: '' }); // Clear file error
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      contactNumber: value
    });
    setErrors({ ...errors, contactNumber: '' }); // Clear phone error
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else {
      const phoneNumber = parsePhoneNumberFromString(formData.contactNumber, 'LK');
      if (!phoneNumber || !phoneNumber.isValid()) {
        newErrors.contactNumber = 'Invalid contact number';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const formDataWithImage = new FormData();
    for (const key in formData) {
      formDataWithImage.append(key, formData[key]);
    }
    formDataWithImage.append('images', profilePicture);

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
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      )}
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
              style={{ display: 'none' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
            <input 
              type="text" 
              name="firstName" 
              id="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
              className="form-input with-icon"
            />
            </div>
            
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
            <input 
              type="text" 
              name="lastName" 
              id="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
              className="form-input with-icon"
            />
            </div>
            
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="form-input with-icon"
            />
            </div>
            
          </div>

          <div className="form-group">
            <label htmlFor="occupation">Occupation</label>
            <div className="relative">
              <MdWorkOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
            <input
              type="text"
              name="occupation"
              id="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
              className="form-input with-icon"
            />
            </div>
            
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="relative">
              <FaUserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
            <input 
              type="text" 
              name="username" 
              id="username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
              className="form-input with-icon"
            />
            </div>
            
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              id="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="form-input with-icon"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash className="text-gold" /> : <FaEye className="text-gold" />}
            </div>
            </div>
            
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <PhoneInput
              country={'lk'} // Set default country to Sri Lanka
              value={formData.contactNumber}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'contactNumber',
                required: true,
                className: 'form-inputt',
              }}
            />
          </div>


          <button type="submit" className="signup-button">Sign Up</button>
          {message && <p className="signup-message">{message}</p>}
          {errors.images && <span className="error-text">{errors.images}</span>}
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          {errors.email && <span className="error-text">{errors.email}</span>}
          {errors.occupation && <span className="error-text">{errors.occupation}</span>}
          {errors.username && <span className="error-text">{errors.username}</span>}
          {errors.password && <span className="error-text">{errors.password}</span>}
          {errors.contactNumber && <span className="error-text">{errors.contactNumber}</span>}

        </form>
        <div className="signup-footer">
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </div>
      {showPopup && <Popup message={message} />}
    </div>
  );
}