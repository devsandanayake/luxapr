import React, { useEffect, useState } from 'react';
import './Login.css';
import Logo from '../Images/Logo.png';
import axiosInstance from '../axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({}); // To hold error messages
  const [message, setMessage] = useState('');
  const [errorType, setErrorType] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '' // Clear the error as the user types
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axiosInstance.post('/api/users/signin', formData);

      if (response.status === 200) {
        setMessage('Login successful!');
        setErrorType('success');
        localStorage.setItem('token', response.data.token);

        const adcode = location.state?.adcode;
        if (adcode) {
          navigate(`${from}?adcode=${adcode}`, { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setMessage(response.data.message || 'Something went wrong. Please try again.');
        setErrorType('error');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      setErrorType('error');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" /> 
              <input
                type="text"
                id="username"
                name="username"
                className="form-input with-icon"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-input with-icon"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </div>
            </div>
          </div>
          <button type="submit" className="login-button">Login</button>
          {message && <p className={`login-message ${errorType}`}>{message}</p>}

          <div className="signup flex items-center justify-center">
            <p>Don't have an account?</p>
            <a href="/registration">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
}