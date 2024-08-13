const LRentInqueryService = require('../services/LRentInqueryService');

// Function to create a long rental inquery
const createLRentInquery = async (req, res) => {
    const username = req.user;
    const adCode = req.body.adCode;
    const message = req.body.message;
    const preferredDate = req.body.preferredDate;
    const preferredTime = req.body.preferredTime;
    const alternateDate = req.body.alternateDate;
    const alternateTime = req.body.alternateTime;
    try {
        await LRentInqueryService.createLRentInquery(username, adCode, message, preferredDate, preferredTime, alternateDate, alternateTime);
        res.status(201).json({ message: 'Inquery added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAllLRentInqueries = async (req, res) => {
    try {
        const inqueries = await LRentInqueryService.getAllLRentInqueries();
        res.status(200).json(inqueries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { createLRentInquery , getAllLRentInqueries };
