import React, { useEffect, useState } from 'react';
import './Login.css';
import Logo from '../Images/Logo.png';
import axiosInstance from '../axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [errorType, setErrorType] = useState(''); // For setting error type (success or error)
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />
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
