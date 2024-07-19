import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import background from '../Images/ap5.jpg';
import axiosInstance from '../axiosConfig';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
            const response = await axiosInstance.post('/api/users/signin', formData);

            if (response.status === 200) {
                setMessage('Login successful!');
                // Optionally, you can save the token in localStorage or context
                localStorage.setItem('token', response.data.token);
            } else {
                setMessage(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div 
                className='flex items-center justify-center' 
                style={{ 
                    height: 'calc(100vh - 60px)', 
                    backgroundImage: `url(${background})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                }}
            >
                <div className="form-container border border-white">
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
                        <button className="sign mt-2">Sign in</button>
                    </form>
                    <p className="signup mt-2">Don't have an account? 
                        &nbsp;<a rel="noopener noreferrer" href="/signup" className="">Sign up</a>
                    </p>
                </div>
            </div>
        </>
    );
}
