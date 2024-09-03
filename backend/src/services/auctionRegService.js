const auctionRegModel = require('../models/auctionRegModel');
const AdsModel = require('../models/ads');
const emailService = require('./emailService');
const UserModel = require('../models/user');

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
    // Find the advertisement by adCode and ensure the auction is not closed
    const ad = await AdsModel.findOneAndUpdate(
        { adCode, 'auctionStatus.maxRate': { $gte: 'auctionStatus.currentRate' } },
        { $inc: { 'auctionStatus.currentRate': bidAmountParam } },
        { new: true }
    );

    // If the advertisement doesn't exist or the auction is closed, throw an error
    if (!ad) {
        throw new Error('Ad not found or auction is closed');
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

    // Update the user's offer with the new currentRate
    auctionReg.userOffer = ad.auctionStatus.currentRate;

    // Save the updated auction registration
    await auctionReg.save();

    // Notify the bidder
    return alertBidder(username, auctionID);
};

const viewRegistredAuction = async (username,adCode) => {
    return await auctionRegModel.find({ username, adCode });
};





module.exports = {
    registerAuction,
    bidAuction,
    viewRegistredAuction
};




