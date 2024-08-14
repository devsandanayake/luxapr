const LRentInqueryModel = require('../models/LRentInqueryModel');
const userModel =  require('../models/user');
const adsModel = require('../models/ads');
const LRentalTransactionModel = require('../models/LRentTransactionModel');
const { longRentInqueryAssignAgentEmail, longRentInqueryEmailCompleted, longRentInqueryEmailRejected } = require('./emailService');


// const generateUniqueCode = async () => {
//     let isUnique = false;
//     let inqueryID;
//     while (!isUnique) {
//         const randomNumber = Math.floor(1000 + Math.random() * 9000);
//         inqueryID = `INQLR${randomNumber}`;
//         const existingAd = await LRentInqueryModel.findOne({ inqueryID: inqueryID });
//         if (!existingAd) {
//             isUnique = true;
//         }
//     }
//     return inqueryID;
// };

const createLRentInquery = async (Inquery ,username, adCode, message, preferredDate, preferredTime, alternateDate, alternateTime) => {
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

//update long rental inquery status
const updateLRentInqueryStatus = async (inqueryID, status, reply) => {
    try {
        const inqueryDetails = await LRentInqueryModel.findOne({ inqueryID });

        if (!inqueryDetails) {
            throw new Error('Inquery not found');
        }

        const user = await userModel.findOne({ username: inqueryDetails.username });
        if (!user) {
            throw new Error('User not found');
        }

        const email = user.email;

        switch (status) {
            case 'AssignAgent':
                await longRentInqueryAssignAgentEmail(email, inqueryID);
                break;
            case 'Completed':
                await longRentInqueryEmailCompleted(email, inqueryID);
                break;
            case 'Rejected':
                await longRentInqueryEmailRejected(email, inqueryID , reply);
                break;
            default:
                throw new Error('Invalid status');
        }

        return await LRentInqueryModel.findOneAndUpdate(
            { inqueryID: inqueryID },
            { replyStatus: status, reply: reply },
            { new: true }
        );
    } catch (error) {
        console.error('Error updating long rental inquiry status:', error);
        throw error;
    }
};


//get inqueries for login user
const getInqueriesForUser = async (username) => {
    return await LRentInqueryModel.find(
        { username: username },
        { alertMsg: 0 } 
    );
}

 
module.exports = {
      createLRentInquery,
      getAllLRentInqueries,
      updateLRentInqueryStatus,
      getInqueriesForUser
};