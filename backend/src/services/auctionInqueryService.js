const auctionInqueryModel = require('../models/auctionInqueryModel');
const AdsModel = require('../models/ads');
const UserModel = require('../models/user');
const emailService = require('./emailService');

const generateUniqueCode = async () => {
    let isUnique = false;
    let inqueryID;
    while (!isUnique) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        inqueryID = `INQ${randomNumber}`;
        const existingAd = await auctionInqueryModel.findOne({ inqueryID: inqueryID });
        if (!existingAd) {
            isUnique = true;
        }
    }
    return inqueryID;
};



const addInquery = async (auctionID, user, Name, number, message) => {
    
    const ad = await AdsModel.findOne({ 'auctionStatus.auctionID': auctionID });
    if (!ad) {
        throw new Error('Ad not found');
    }
    const userDetails = await UserModel.findOne({ username:user });
    if (!userDetails) {
        throw new Error('User not found');
    }

    const inqueryID = await generateUniqueCode();

    const inquery = new auctionInqueryModel({
        inqueryID: inqueryID,
        auctionID,
        username: user,
        Name,
        number,
        message
    });

    await inquery.save();

    return emailService.inquiryEmail(userDetails.email);

}


//view all inqueries
const viewAllInqueries = async () => {
    return await auctionInqueryModel.find();
};

//reply to users for their inquire msg
const replyToInquery = async (inqueryID, message) => {
    const inquery = await auctionInqueryModel.findOne({ inqueryID });
    if (!inquery) {
        throw new Error('Inquery not found');
    }

    const userDetails = await UserModel.findOne({ username: inquery.username });
    if (!userDetails) {
        throw new Error('User not found');
    }

    await emailService.replyEmail(userDetails.email, message);
    
    return await auctionInqueryModel.findOneAndUpdate({ inqueryID }, { reply: message , replyStatus:'Replied'}, { new: true });

}


module.exports = {
    addInquery,
    viewAllInqueries,
    replyToInquery
};
