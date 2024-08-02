import React, { useState } from 'react';
import axios from 'axios';
import './AddApartment.css';

export default function AddApartment() {
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
    transactionType: '',
  });
  const [images, setImages] = useState([]);


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


  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
    console.log('Selected images:', e.target.files);
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
      <div className='w-9/12'>
        <h2 className='text-3xl mt-4 text-center' style={{ fontFamily: 'Georgia, serif' }}>Add Apartment</h2>
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

          <div className='mt-2'>
              <label className='text-lg' htmlFor="transactionType">Select Type</label>
              <div>
                  <select
                      name="transactionType"
                      onChange={handleChange}
                      className="input"
                      required
                  >
                      <option value="">Select Type</option>
                      <option value="short-term">Short term</option>
                      <option value="long-term">Long term</option>
                      <option value="auction">Auction</option>
                  </select>
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
            <label className='text-lg' htmlFor="price">Price</label>
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
            <label className='text-lg' htmlFor="currency">Currency</label>
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

          <button type="submit" className='submitt'>Add Apartment</button>
        </form>
      </div>
    </div>
  );
}
