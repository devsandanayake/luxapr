import React, { useState } from 'react';
import './SignUp.css'; // Adjusted to match Login.css naming conventions
import Logo from '../Images/Logo.png'; // Assuming you have the logo image available
import axiosInstance from '../axiosConfig'; // Import the axios instance

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/users/signup', formData);

      if (response.status === 201) {
        setMessage('Account created successfully!');
        window.location.href = '/login';  // Redirect to login page
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
              type="text" 
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
    </div>
  );
}
