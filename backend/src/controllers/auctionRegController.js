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
        const adCode = req.params.adCode;
        const auctions = await auctionRegService.viewRegistredAuction(user, adCode);
        res.json(auctions);
    } catch (err) {
        next(err);
    }
}


const viewAllRegUsers = async (req, res, next) => {
    try {
        const auctionID = req.params.auctionID;
        const users = await auctionRegService.viewAllRegUsers(auctionID);
        res.json(users);
    } catch (err) {
        next(err);
    }
}

const viewOtherUserOffers = async (req, res, next) => {
    try {
        const auctionID = req.params.auctionID;
        const offers = await auctionRegService.viewOtherUserOffers(auctionID);
        res.json(offers);
    } catch (err) {
        next(err);
    }
}





module.exports = {
    registerAuction,
    bidAuction,
    viewRegistredAuctions,
    viewAllRegUsers,
    viewOtherUserOffers
};