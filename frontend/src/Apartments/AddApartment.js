import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import './AddApartment.css';
import { useParams, useLocation } from 'react-router-dom';

export default function AddApartment() {
  const { id } = useParams();
  const location = useLocation();

  // Extract the query parameter value
  const queryParams = new URLSearchParams(location.search);
  const value = queryParams.get('value');

  const [formData, setFormData] = useState({
    title: '',
    districts: '',
    areas: '',
    address: {
      street: '',
      postCode: '',
    },
    description: '',
    bedroomCount: '',
    bathroomCount: '',
    floor: '',
    areaSize: '',
    price: '',
    currency: '',
    transactionType: value,
  });
  const [images, setImages] = useState([]);
  const [images360, setImages360] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setFormData({
        ...formData,
        [parentKey]: {
          ...formData[parentKey],
          [childKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const titlebyvalue = () => {
    if (value === '1') {
      return 'Short-Term Rent';
    } else if (value === '2') {
      return 'Long-Term Rent';
    } else if (value === '3') {
      return 'Short Term & Long-Term Rent';
    } else if (value === '4') {
      return 'Auction';
    }
  };

  const Currencylabel = () => {
    if (value === '1') {
      return ' per day';
    } else if (value === '2') {
      return ' per month';
    } else if (value === '3') {
      return ' per day or per month';
    } else if (value === '4') {
      return '';
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
    console.log('Selected images:', e.target.files);
  };

  const handleImage360Change = (e) => {
    setImages360(Array.from(e.target.files));
    console.log('Selected 360 images:', e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (typeof formData[key] === 'object') {
        for (let subKey in formData[key]) {
          data.append(`${key}.${subKey}`, formData[key][subKey]);
        }
      } else {
        data.append(key, formData[key]);
      }
    }
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }
    for (let i = 0; i < images360.length; i++) {
      data.append('images360', images360[i]);
    }

    let token = localStorage.getItem('token');
    console.log('Retrieved token:', token);

    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    if (!token) {
      console.error('No token found in local storage');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/ads/createAds', data, {
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
      <div className='w-9/12'>
        <h2 className='text-3xl mt-4 text-center' style={{ fontFamily: 'Georgia, serif' }}>Add Your Apartment For {titlebyvalue()}</h2>
        <form className='mt-3 ml-3 w-full mb-5' onSubmit={handleSubmit}>

          <div className='mt-2'>
            <label className='text-lg' htmlFor="title">Title</label>
            <div>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='mt-2'>
              <label className='text-lg' htmlFor="address.postCode">Address Line 1</label>
              <div>
                <input
                  type="text"
                  name="address.postCode"
                  onChange={handleChange}
                  className="addressinput"
                  required
                />
              </div>
            </div>

            <div className='mt-2'>
              <label className='text-lg' htmlFor="address.street">Address Line 2</label>
              <div>
                <input
                  type="text"
                  name="address.street"
                  onChange={handleChange}
                  className="addressinput"
                  required
                />
              </div>
            </div>

            <div className='mt-2'>
              <label className='text-lg' htmlFor="areas">City</label>
              <div>
                <input
                  type="text"
                  name="areas"
                  onChange={handleChange}
                  className="addressinput"
                  required
                />
              </div>
            </div>

            <div className='mt-2'>
              <label className='text-lg' htmlFor="districts">District</label>
              <div>
                <input
                  type="text"
                  name="districts"
                  onChange={handleChange}
                  className="addressinput"
                  required
                />
              </div>
            </div>
          </div>

          <div className='mt-2'>
            <label className='text-lg' htmlFor="description">Description</label>
            <div>
              <textarea
                name="description"
                onChange={handleChange}
                className="input"
                required
              ></textarea>
            </div>
          </div>

          <div className='mt-2'>
            <label className='text-lg' htmlFor="bedroomCount">Bedroom Count</label>
            <div>
              <input
                type="number"
                name="bedroomCount"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className='mt-2'>
            <label className='text-lg' htmlFor="bathroomCount">Bathroom Count</label>
            <div>
              <input
                type="number"
                name="bathroomCount"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className='mt-2'>
            <label className='text-lg' htmlFor="floor">Floor</label>
            <div>
              <input
                type="number"
                name="floor"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className='mt-2'>
            <label className='text-lg' htmlFor="areaSize">Area Size</label>
            <div>
              <input
                type="number"
                name="areaSize"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className='mt-2'>
            <label className='text-lg' htmlFor="price">Price ({Currencylabel()})</label>
            <div>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className='mt-2'>
            <label className='text-lg' htmlFor="currency">Currency </label>
            <div>
              <input
                type="text"
                name="currency"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div className='mt-2'>
            <div>
              <label className='text-lg' htmlFor="images">Images</label>
            </div>
            <div className="relative border-2 border-dashed p-4 rounded-md mt-1 flex flex-col items-center cursor-pointer hover:bg-gold hover:text-white">
              <input
                type="file"
                name="images"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              <p>Drag & Drop files here or click to upload</p>
              {images.length > 0 && (
                <div className="mt-2">
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

          <div className='mt-2'>
            <div>
              <label className='text-lg' htmlFor="images360">360° Images</label>
            </div>
            <div className="relative border-2 border-dashed p-4 rounded-md mt-1 flex flex-col items-center cursor-pointer hover:bg-gold hover:text-white">
              <input
                type="file"
                name="images360"
                multiple
                onChange={handleImage360Change}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              <p>Drag & Drop files here or click to upload</p>
              {images360.length > 0 && (
                <div className="mt-2">
                  {images360.length} file(s) selected
                  <ul>
                    {images360.map((file, index) => (
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
