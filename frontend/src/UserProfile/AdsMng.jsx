import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig'; // Ensure correct import path
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd'; // Import Tabs from Ant Design
import SmallCard from './ApartmentCard/NewCard';

const { TabPane } = Tabs;

export default function AdsMng({ token }) {
  const [ads, setAds] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/users/viewAllAds/user', {
          headers: {
            'Authorization': `${token}`,
          },
        });
        setAds(response.data.ads);
      } catch (err) {
        console.error('Error fetching ads:', err);
        setError(err);
      }
    };

    fetchData();
  }, [token]);

  if (error) {
    return <div>Error fetching ads: {error.message}</div>;
  }

  if (!ads) {
    return <div>Loading...</div>;
  }

  const handleViewClick = (adCode) => {
    const query = new URLSearchParams({ adCode });
    navigate(`/charging/planes?${query.toString()}`);
  };

  const renderAds = (transactionType) => {
    return ads
      .filter((apartment) => apartment.transactionType === transactionType)
      .map((apartment) => (
        <li key={apartment.id}>
          <SmallCard key={apartment.adCode} apartment={apartment} />
          <button onClick={() => handleViewClick(apartment.adCode)}>View</button>
        </li>
      ));
  };

  return (
    <div>
      <h1>Ads Management</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Short Term Rent" key="2">
          <ul>{renderAds(1)}</ul>
        </TabPane>
        <TabPane tab="Long Term Rent" key="1">
          <ul>{renderAds(2)}</ul>
        </TabPane>
        <TabPane tab="Auction" key="3">
          <ul>{renderAds(3)}</ul>
        </TabPane>
      </Tabs>
    </div>
  );
}