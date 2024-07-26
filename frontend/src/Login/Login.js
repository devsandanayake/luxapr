import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import background from '../Images/ap5.jpg';
import axiosInstance from '../axiosConfig';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate(); // Initialize useNavigate hook


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
                navigate('/contactus'); // Navigate to /contactus
            } else {
                setMessage(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <>
            
                <div className="form-containerr border border-white">
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
                    <p className="signup mt-2">Don't have an account? 
                        &nbsp;<a rel="noopener noreferrer" href="/signup" className="">Sign up</a>
                    </p>
                </div>
        
        </>
    );
}
