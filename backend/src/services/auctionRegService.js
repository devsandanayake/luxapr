const auctionRegModel = require('../models/auctionRegModel');
const AdsModel = require('../models/ads');


// Function to register an auction
const registerAuction = async (auctionID, username, adCode) => {
    // Find the advertisement by adCode
    const ad = await AdsModel.findOne({ adCode });

    // If the advertisement doesn't exist, throw an error
    if (!ad) {
        throw new Error('Ad not found');
    }
    // Find the auction registration by auctionID and username
    const auctionReg = await auctionRegModel.findOne({ auctionID, username });

    // If the auction registration already exists, throw an error
    if (auctionReg) {
        throw new Error('Auction registration already exists');
    }

    // Create a new auction registration
    const newAuctionReg = new auctionRegModel({
        auctionID,
        username,
        adCode,
        registrationDate: new Date(),
    });

    // Save the new auction registration and return the result
    return newAuctionReg.save();
};



//bid for an auction
const bidAuction = async (auctionID, username, adCode, bidAmountParam) => {
    // Find the advertisement by adCode
    const ad = await AdsModel.findOne({adCode});

    // If the advertisement doesn't exist, throw an error
    if (!ad) {
        throw new Error('Ad not found');
    }

    // Find the auction registration by auctionID and username
    const auctionReg = await auctionRegModel.findOne({ auctionID, username });

    // If the auction registration doesn't exist, throw an error
    if (!auctionReg) {
        throw new Error('Auction registration not found');
    }
    // Payment logic false can't bid
    if (!auctionReg.paymentStatus) {
        throw new Error('Payment not done');
    }

    // Initialize bidAmount array if it doesn't exist, then add the new bid amount
    auctionReg.bidAmount = auctionReg.bidAmount || [];
    auctionReg.bidAmount.push(bidAmountParam);

    // Initialize currentRate if necessary
    ad.auctionStatus.currentRate = Number(ad.auctionStatus.currentRate) || 0;

    // Calculate the new currentRate and save it in a constant
    const newCurrentRate = ad.auctionStatus.currentRate + bidAmountParam;

    // Update the ad's currentRate with the new value
    ad.auctionStatus.currentRate = newCurrentRate;

    auctionReg.userOffer = newCurrentRate;
    

    // Save the ad document
    await ad.save();

    // Save the updated auction registration and return the result
    return await auctionReg.save();
};



module.exports = {
    registerAuction,
    bidAuction
};




