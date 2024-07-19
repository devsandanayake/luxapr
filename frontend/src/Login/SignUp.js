import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import background from '../Images/ap5.jpg';
import axiosInstance from '../axiosConfig';

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
                navigator.push('/login');
             
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
                    <p className="title">Create Account</p>
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
                            <label htmlFor="firstName">First Name</label>
                            <input 
                                type="text" 
                                name="firstName" 
                                id="firstName" 
                                value={formData.firstName} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                type="text" 
                                name="lastName" 
                                id="lastName" 
                                value={formData.lastName} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={formData.email} 
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
                        </div>
                        <div className="input-group">
                            <label htmlFor="contactNumber">Contact Number</label>
                            <input 
                                type="text" 
                                name="contactNumber" 
                                id="contactNumber" 
                                value={formData.contactNumber} 
                                onChange={handleChange} 
                            
                            />
                        </div>
                        <button className="sign mt-2">Sign up</button>
                    </form>
                    <p className="signup mt-2">Already have an account? 
                        &nbsp;<a rel="noopener noreferrer" href="/login" className="">Sign in</a>
                    </p>
                </div>
            </div>
        </>
    );
}
