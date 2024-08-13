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

const updateLRentInqueryStatus = async (req, res) => {
    const inqueryID = req.query.inqueryID;
    const status = req.body.status;
    const reply = req.body.reply;
    try {
        await LRentInqueryService.updateLRentInqueryStatus(inqueryID, status, reply);
        res.status(200).json({ message: 'Inquery status updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getLRentInqueriesByUser = async (req, res) => {
    const username = req.user;
    try {
        const inqueries = await LRentInqueryService.getInqueriesForUser(username);
        res.status(200).json(inqueries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = { createLRentInquery , getAllLRentInqueries , updateLRentInqueryStatus , getLRentInqueriesByUser };
