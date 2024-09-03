const auctionRegModel = require('../models/auctionRegModel');
const AdsModel = require('../models/ads');
const emailService = require('./emailService');
const UserModel = require('../models/user');
const mongoose = require('mongoose');

//alert the bidder if the bid is lower than the current rate

const alertBidder = async (username, auctionID) => {
    // Find the auction registration for the current user
    const auctionReg = await auctionRegModel.findOne({ auctionID, username });

    // If the auction registration doesn't exist, throw an error
    if (!auctionReg) {
        throw new Error('Auction registration not found');
    }

    // Find all other users in the auction excluding the current user
    const otherUsers = await auctionRegModel.find({ auctionID, username: { $ne: username } });

    // Get the current user's offer
    const userOffer = auctionReg.userOffer;

    // Filter the other users to find those who were outbid
    const otherUsersOffer = otherUsers.filter(user => userOffer > user.userOffer);

    // If no users were outbid, return
    if (otherUsersOffer.length === 0) {
        return;
    }

    // find the most hight bit
 
    let highestUser = null;
     
    for(let i = 0 ; otherUsersOffer.length > i ; i++){
        const user = otherUsersOffer[i];
        if(!highestUser || user.userOffer > highestUser.userOffer){
            highestUser = user;
        }
    }

    // Send an email to the current user
    const userDetails = await UserModel.findOne({username:highestUser.username});
     
    const email = userDetails.email;

    return emailService.auctionAlert(email,auctionID,userOffer);
        
    
};

 



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
    
    //update user model add AutionID
    const user = await UserModel.findOne({username : username});

    user.auctionID = auctionID;
    await user.save();
    
    // Save the new auction registration and return the result
    return newAuctionReg.save();


};
 

const bidAuction = async (auctionID, username, adCode, bidAmountParam) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the advertisement by adCode within the transaction session
        const ad = await AdsModel.findOne({ adCode }).session(session);

        // If the advertisement doesn't exist, throw an error
        if (!ad) {
            throw new Error('Ad not found');
        }

        const maxRate = Number(ad.auctionStatus.maxRate);
        const currentRate = Number(ad.auctionStatus.currentRate);

        // If the auction is closed, throw an error
        if (maxRate < currentRate) {
            throw new Error('Auction is closed');
        }

        // Increment the currentRate atomically within the transaction
        const updatedAd = await AdsModel.findOneAndUpdate(
            { adCode, 'auctionStatus.maxRate': { $gte: currentRate } },
            { $inc: { 'auctionStatus.currentRate': bidAmountParam } },
            { new: true, session }
        );

        // If the advertisement doesn't exist or the auction is closed, throw an error
        if (!updatedAd) {
            throw new Error('Ad not found or auction is closed');
        }

        // Find the auction registration by auctionID and username within the transaction session
        const auctionReg = await auctionRegModel.findOne({ auctionID, username }).session(session);

        // If the auction registration doesn't exist, throw an error
        if (!auctionReg) {
            throw new Error('Auction registration not found');
        }

        // Check if the user has completed the payment, if not, throw an error
        if (!auctionReg.paymentStatus) {
            throw new Error('Payment not done');
        }

        // Update the bidAmount array and userOffer fields
        auctionReg.bidAmount = auctionReg.bidAmount || [];
        auctionReg.bidAmount.push(bidAmountParam);
        auctionReg.userOffer = updatedAd.auctionStatus.currentRate;

        // Save the updated auction registration within the transaction
        await auctionReg.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Notify the bidder
        return alertBidder(username, auctionID);
    } catch (error) {
        // If any error occurs, abort the transaction
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


const viewRegistredAuction = async (username,adCode) => {
    return await auctionRegModel.find({ username, adCode });
};





module.exports = {
    registerAuction,
    bidAuction,
    viewRegistredAuction
};




