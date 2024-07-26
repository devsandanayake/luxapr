import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig'; // Adjust the import path as needed
import './LoginPopup.css';

const LoginPopup = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
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
            const response = await axiosInstance.post('/api/users/signin', formData);

            if (response.status === 200) {
                setMessage('Login successful!');
                localStorage.setItem('token', response.data.token);
                navigate('/contactus');
            } else {
                setMessage(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                    <p className="title">Login</p>
                    {message && <p className="message">{message}</p>}
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <div className="forgot">
                                <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                            </div>
                        </div>
                        <button className="signn mt-2">Sign in</button>
                    </form>
                    <p className="signup mt-2">Don't have an account? &nbsp;
                        <a rel="noopener noreferrer" href="/signup" className="">Sign up</a>
                    </p>
                </div>
            </div>
        
    );
};

export default LoginPopup;
