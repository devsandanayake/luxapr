const LRentInqueryModel = require('../models/LRentInqueryModel');
const userModel =  require('../models/user');
const adsModel = require('../models/ads');
const LRentalTransactionModel = require('../models/LRentTransactionModel');


const generateUniqueCode = async () => {
    let isUnique = false;
    let inqueryID;
    while (!isUnique) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        inqueryID = `INQLR${randomNumber}`;
        const existingAd = await LRentInqueryModel.findOne({ inqueryID: inqueryID });
        if (!existingAd) {
            isUnique = true;
        }
    }
    return inqueryID;
};

const createLRentInquery = async (username, adCode, message, preferredDate, preferredTime, alternateDate, alternateTime) => {
    try {
        const User = await userModel.findOne({ username: username });

        // Check if user exists
        if (!User) {
            throw new Error('User not found');
        }

        const ad = await adsModel.findOne({ adCode: adCode });
        // Check if Ad exists
        if (!ad) {
            throw new Error('Ad not found');
        }

        const LRentTrans = await LRentalTransactionModel.findOne({ adCode: adCode });
       
        let alertMsg = null;

        if (LRentTrans && LRentTrans.adminKeyStatus === 'Approved') {
            alertMsg = `You have already rented this property. ${LRentTrans.rentalStartDate} to ${LRentTrans.rentalEndDate}`;
        }



        const Inquery = await generateUniqueCode();

        const newLRentInquery = new LRentInqueryModel({
            inqueryID: Inquery,
            username: username,
            fullName: `${User.firstName} ${User.lastName}`,
            number: User.contactNumber,
            adCode: adCode,
            message: message,
            preferredDate: preferredDate,
            preferredTime: preferredTime,
            alternateDate: alternateDate,
            alternateTime: alternateTime,
            alertMsg: alertMsg
        });

        return await newLRentInquery.save();
    } catch (error) {
        console.error('Error creating long rental inquiry:', error);
        throw error;
    }
};


//view all long rental inqueries
const getAllLRentInqueries = async () => {
    return await LRentInqueryModel.find();
}

module.exports = {
      createLRentInquery,
      getAllLRentInqueries
};