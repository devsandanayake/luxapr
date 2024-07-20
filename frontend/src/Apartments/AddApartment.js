import React, { useState } from 'react';
import axios from 'axios';

export default function AddApartment() {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    streetNumber: '',
    area: '',
    city: '',
    district: '',
    province: '',
    country: '',
    description: '',
    bedroomCount: '',
    bathroomCount: '',
    floor: '',
    areaSize: '',
    price: '',
    currency: '',
    typeOfPro: '',
    transactionType: '',
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    // Retrieve the token from local storage
    let token = localStorage.getItem('token');
    console.log('Retrieved token:', token);

    // Remove the "Bearer" prefix if present
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    if (!token) {
      console.error('No token found in local storage');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8005/api/ads/createAds', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Ad created successfully', response.data);
    } catch (error) {
      console.error('There was an error creating the ad!', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };

  return (
    <div>
      <h2>Add Apartment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="streetNumber" placeholder="Street Number" value={formData.streetNumber} onChange={handleChange} required />
        <input type="text" name="area" placeholder="Area" value={formData.area} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
        <input type="text" name="province" placeholder="Province" value={formData.province} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
        <input type="number" name="bedroomCount" placeholder="Number of Bedrooms" value={formData.bedroomCount} onChange={handleChange} required />
        <input type="number" name="bathroomCount" placeholder="Number of Bathrooms" value={formData.bathroomCount} onChange={handleChange} required />
        <input type="number" name="floor" placeholder="Floor" value={formData.floor} onChange={handleChange} required />
        <input type="number" name="areaSize" placeholder="Area Size" value={formData.areaSize} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="currency" placeholder="Currency" value={formData.currency} onChange={handleChange} required />
        <input type="text" name="typeOfPro" placeholder="Type of Property" value={formData.typeOfPro} onChange={handleChange} required />
        <input type="text" name="transactionType" placeholder="Transaction Type" value={formData.transactionType} onChange={handleChange} required />
        
        <input type="file" name="images" multiple onChange={handleImageChange} required />
        
        <button type="submit">Add Apartment</button>
      </form>
    </div>
  );
}
