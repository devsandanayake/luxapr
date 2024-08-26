import React from 'react';
import { useLocation } from 'react-router-dom';
import CreatePricingForm from './CreatePricingForm'; // Adjust the path as necessary

export default function Charging() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const adCode = queryParams.get('adCode'); // Retrieve adCode from the URL

    return (
        <div>
            {/* Pass the adCode as a prop to CreatePricingForm */}
            <CreatePricingForm adCode={adCode} />
        </div>
    );
}
