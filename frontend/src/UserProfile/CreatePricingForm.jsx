import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { Form, Input, Button, Alert, Row, Col } from 'antd';

const CreatePricingForm = ({ adCode: initialAdCode }) => {
    const [adCode, setAdCode] = useState(initialAdCode || '');
    const [transactionType, setTransactionType] = useState('');
    const [priceDetails, setPriceDetails] = useState([{ year: '', details: [{ startMonth: '', endMonth: '', price: '' }] }]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialAdCode) {
            setAdCode(initialAdCode);
            fetchOnePricing(initialAdCode);
        }
    }, [initialAdCode]);

    const handleAddYear = () => {
        setPriceDetails([...priceDetails, { year: '', details: [{ startMonth: '', endMonth: '', price: '' }] }]);
    };

    const handleYearChange = (index, value) => {
        const newDetails = [...priceDetails];
        newDetails[index].year = value;
        setPriceDetails(newDetails);
    };

    const handleAddPricingDetail = (yearIndex) => {
        const newDetails = [...priceDetails];
        newDetails[yearIndex].details.push({ startMonth: '', endMonth: '', price: '' });
        setPriceDetails(newDetails);
    };

    const handleDetailChange = (yearIndex, detailIndex, field, value) => {
        const newDetails = [...priceDetails];
        newDetails[yearIndex].details[detailIndex][field] = value;
        setPriceDetails(newDetails);
    };

    const fetchOnePricing = async (adCode) => {
        try {
            const response = await axiosInstance.get(`/api/pricing/one/${adCode}`);
            console.log('Fetched Data:', response.data); // Log the fetched data
            if (response.data) {
                setTransactionType(response.data.transactionType);
                setPriceDetails(response.data.price || [{ year: '', details: [{ startMonth: '', endMonth: '', price: '' }] }]);
                console.log('Transaction Type:', response.data.transactionType); // Log the transaction type
                console.log('Price Details:', response.data.priceDetails); // Log the price details
            }
        } catch (err) {
            setError(`Error fetching pricing: ${err.message}`); 
        }
    };

    const handleSubmit = async () => {
        try {
            const pricingData = {
                adCode,
                transactionType,
                priceDetails,
            };
            console.log('Pricing Data:', pricingData);

            await axiosInstance.patch('/api/pricing', pricingData);
            alert(`Pricing ${initialAdCode ? 'updated' : 'created'} successfully!`);
            setTransactionType('');
            setPriceDetails([{ year: '', details: [{ startMonth: '', endMonth: '', price: '' }] }]);
            setAdCode('');
        } catch (err) {
            setError(`Error ${initialAdCode ? 'updating' : 'creating'} pricing: ${err.message}`);
        }
    };

    return (
        <>
        <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item label="Ad Code" required>
                <Input
                    value={adCode}
                    onChange={(e) => setAdCode(e.target.value)}
                    readOnly={!!initialAdCode}
                />
            </Form.Item>
            <Form.Item   label="Transaction Type" required>
                <Input
                    type="text"
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    readOnly
                    
                />
            </Form.Item>
            {priceDetails && priceDetails.map((yearEntry, yearIndex) => (
                <div key={yearIndex}>
                    <Form.Item
                        label={`Year ${yearIndex + 1}`}
                        required
                    >
                        <Input
                            type="text"
                            value={yearEntry.year}
                            onChange={(e) => handleYearChange(yearIndex, e.target.value)}
                        />
                    </Form.Item>
                    {yearEntry.details && yearEntry.details.map((detail, detailIndex) => (
                        <Row key={detailIndex} gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label="Start Month"
                                    required
                                >
                                    <Input
                                        type="number"
                                        value={detail.startMonth}
                                        onChange={(e) => handleDetailChange(yearIndex, detailIndex, 'startMonth', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="End Month"
                                    required
                                >
                                    <Input
                                        type="number"
                                        value={detail.endMonth}
                                        onChange={(e) => handleDetailChange(yearIndex, detailIndex, 'endMonth', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Price"
                                    required
                                >
                                    <Input
                                        type="number"
                                        value={detail.price}
                                        onChange={(e) => handleDetailChange(yearIndex, detailIndex, 'price', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => handleAddPricingDetail(yearIndex)} block>
                            Add Pricing Detail for Year {yearIndex + 1}
                        </Button>
                    </Form.Item>
                </div>
            ))}
            <Form.Item>
                <Button type="dashed" onClick={handleAddYear} block>
                    Add Year
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    {initialAdCode ? 'Update Pricing' : 'Create Pricing'}
                </Button>
            </Form.Item>
            {error && <Alert message={error} type="error" showIcon />}
        </Form>
        </>
    );
};

export default CreatePricingForm;
