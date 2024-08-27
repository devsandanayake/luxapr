import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPopup.css';

export default function SearchPopup({ isOpen, onClose }) {
  const [searchParams, setSearchParams] = useState({
    district: '',
    area: '',
    roomCount: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

    const navigate = useNavigate();

  const handleSearch = () => {
    const { district, area, startDate, endDate, roomCount } = searchParams;
    const queryParams = new URLSearchParams({
      district: district.toLowerCase(),
      area: area.toLowerCase(),
      startDate,
      endDate,
      roomCount
    }).toString();

    navigate(`/allapartments?${queryParams}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className='text-3xl'>Search Apartments</h2>
        <div className="form-group">
          <label>District</label>
          <input
            type="text"
            name="district"
            value={searchParams.district}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Area</label>
          <input
            type="text"
            name="area"
            value={searchParams.area}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Room Count</label>
          <input
            type="number"
            name="roomCount"
            value={searchParams.roomCount}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={searchParams.startDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={searchParams.endDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="popup-buttons">
          <button onClick={handleSearch} className="search-btn">Search</button>
          <button onClick={onClose} className="close-btn">Close</button>
        </div>
      </div>
    </div>
  );
}