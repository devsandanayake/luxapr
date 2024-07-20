import React, { useState } from 'react';
import axios from 'axios';
import './AddApartment.css';


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
    setImages(Array.from(e.target.files));
    console.log('Selected images:', e.target.files);
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
    <div className="full-screen">
      <div className=' w-9/12'>
        <h2 className='text-2xl mt-4 text-center text-white' style={{ fontFamily: 'Georgia, serif' }}>Add Apartment</h2>
        <form className='mt-3 ml-3 w-full mb-5' onSubmit={handleSubmit}>
          <div>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="title">Title</label>
            </div>
            <div>
              <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="address">Address</label>
            </div>
            <div>
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="streetNumber">Street Number</label>
            </div>
            <div>
              <input type="text" name="streetNumber" placeholder="Street Number" value={formData.streetNumber} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="area">Area</label>
            </div>
            <div>
              <input type="text" name="area" placeholder="Area" value={formData.area} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="city">City</label>
            </div>
            <div>
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="district">District</label>
            </div>
            <div>
              <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="province">Province</label>
            </div>
            <div>
              <input type="text" name="province" placeholder="Province" value={formData.province} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="country">Country</label>
            </div>
            <div>
              <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="description">Description</label>
            </div>
            <div>
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required></textarea>
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="bedroomCount">Number of Bedrooms</label>
            </div>
            <div>
              <input type="number" name="bedroomCount" placeholder="Number of Bedrooms" value={formData.bedroomCount} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="bathroomCount">Number of Bathrooms</label>
            </div>
            <div>
              <input type="number" name="bathroomCount" placeholder="Number of Bathrooms" value={formData.bathroomCount} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="floor">Floor</label>
            </div>
            <div>
              <input type="number" name="floor" placeholder="Floor" value={formData.floor} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="areaSize">Area Size</label>
            </div>
            <div>
              <input type="number" name="areaSize" placeholder="Area Size" value={formData.areaSize} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="price">Price</label>
            </div>
            <div>
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="currency">Currency</label>
            </div>
            <div>
              <input type="text" name="currency" placeholder="Currency" value={formData.currency} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="typeOfPro">Type of Property</label>
            </div>
            <div>
              <input type="text" name="typeOfPro" placeholder="Type of Property" value={formData.typeOfPro} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className = 'mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="transactionType">Transaction Type</label>
            </div>
            <div>
              <input type="text" name="transactionType" placeholder="Transaction Type" value={formData.transactionType} onChange={handleChange} className='w-full p-2 rounded-md mt-1' required />
            </div>
          </div>
        
          <div className='mt-2'>
            <div>
              <label className='text-lg text-white font-bold' htmlFor="images">Images</label>
            </div>
            <div className="relative border-2 border-dashed border-white p-4 rounded-md mt-1 flex flex-col items-center cursor-pointer hover:bg-gray-800">
              <input
                type="file"
                name="images"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              <p className="text-white">Drag & Drop files here or click to upload</p>
              {images.length > 0 && (
                <div className="text-white mt-2">
                  {images.length} file(s) selected
                  <ul>
                    {images.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        
          <button type="submit" className='submitt'>Add Apartment</button>
        </form>
      </div>
    </div>
  );
}
