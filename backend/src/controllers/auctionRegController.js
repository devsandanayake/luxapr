const auctionRegService = require('../services/auctionRegService');


const registerAuction = async (req, res, next) => {
    try {
        const { auctionID, adCode } = req.body;
        const user = req.user;
        await auctionRegService.registerAuction(auctionID, user, adCode);
        res.json({ message: 'Auction registered successfully' });
    } catch (err) {
        next(err);
    }
}


const bidAuction = async (req, res, next) => {
    try {
        const { auctionID, adCode, bidAmount } = req.body;
        const user = req.user;
        await auctionRegService.bidAuction(auctionID, user, adCode, bidAmount);
        res.json({ message: 'Bid placed successfully' });
    } catch (err) {
        next(err);
    }
}


const viewRegistredAuctions = async (req, res, next) => {
    try {
        const user = req.user;
        const auctions = await auctionRegService.viewRegistredAuctions(user);
        res.json(auctions);
    } catch (err) {
        next(err);
    }
}






module.exports = {
    registerAuction,
    bidAuction,
    viewRegistredAuctions
};