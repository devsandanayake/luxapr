const LRentInqueryModel = require('../models/LRentInqueryModel');
const userModel =  require('../models/user');
const adsModel = require('../models/ads');


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
            alternateTime: alternateTime
        });

        return await newLRentInquery.save();
    } catch (error) {
        console.error('Error creating long rental inquiry:', error);
        throw error;
    }
};

module.exports = { createLRentInquery };