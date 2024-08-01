const auctionInqueryService = require('../services/auctionInqueryService');


const addInquery = async (req, res, next) => {
    try {
        const { auctionID, Name, number, message } = req.body;
        const user = req.user;
        await auctionInqueryService.addInquery(auctionID, user, Name, number, message);
        res.json({ message: 'Inquery added successfully' });
    } catch (err) {
        next(err);
    }
}

const replyToInquery = async (req, res, next) => {
    try {
        const { inqueryID, reply } = req.body;
        await auctionInqueryService.replyToInquery(inqueryID, reply);
        res.json({ message: 'Inquery replied successfully' });
    } catch (err) {
        next(err);
    }
}


const viewAllInqueries = async (req, res, next) => {
    try {
        const inqueries = await auctionInqueryService.viewAllInqueries();
        res.json(inqueries);
    } catch (err) {
        next(err);
    }
};


const viewInqueries = async (req, res, next) => {
    try {
        const { auctionID } = req.params;
        const inqueries = await auctionInqueryService.viewInqueries(auctionID);
        res.json(inqueries);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    addInquery,
    replyToInquery,
    viewAllInqueries,
    viewInqueries
};