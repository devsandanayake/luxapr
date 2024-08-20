const LRentalTransactionModel = require('../models/LRentTransactionModel');
const UserModel = require('../models/user')
const {longTermRentEmail} = require('./emailService')
 

// Function to create a long rental transaction
const createLRentalTransaction = async (username , adCode ,BookingID, rentalStartDate , rentalEndDate , userMessage , phoneNumber) => {
    const newLRentalTransaction = new LRentalTransactionModel({
        username,
        adCode,
        BookingID,
        rentalStartDate,
        rentalEndDate,
        userMessage,
        phoneNumber,
        
    });
    return await newLRentalTransaction.save();
}


//get user long rental transactions
const getUserLRentalTransactions = async (username) => {
    return await LRentalTransactionModel.find({username: username});
}

// Function to get all long rental transactions
const getAllLRentalTransactions = async () => {
    return await LRentalTransactionModel.find();
}

const getadCodeLRentalTransactions = async (adCode) => {
    return await LRentalTransactionModel.find({adCode: adCode});
}
const updateLRentalTransactionStatus = async (adCode, adminKeyStatus, monthlyRate, advancePayment, username , id) => {
    // Find the user by username
    const user = await UserModel.findOne({ username: username });

    // Check if user exists
    if (!user) {
        throw new Error('User not found');
    }

    // Get the user's email
    const email = user.email;

    // Update the rental transaction
    const updatedTransaction = await LRentalTransactionModel.findOneAndUpdate(
        { _id: id },
        { adminKeyStatus: adminKeyStatus, monthlyRate: monthlyRate, advancePayment: advancePayment },
        { new: true }
    );

    // Check if the transaction was updated successfully
    if (!updatedTransaction) {
        throw new Error('Rental transaction not found or update failed');
    }

    const StartDate = updatedTransaction.rentalStartDate;
    const EndDate = updatedTransaction.rentalEndDate;



    // Send the long term rent email
    if(adminKeyStatus == "Approved"){
        await longTermRentEmail(email, adCode , monthlyRate , advancePayment ,StartDate , EndDate);
    }
   
    return updatedTransaction;
};


const viewAllForFrontendUsers = async (rentalStartDate, rentalEndDate) => {
    return await LRentalTransactionModel.find(
        {
            adminKeyStatus: 'Approved',
            rentalStartDate: { $gte: rentalStartDate },
            rentalEndDate: { $lte: rentalEndDate }
        },
        { adCode: 1, rentalStartDate: 1, rentalEndDate: 1, _id: 0 }
    );
}

 

 
module.exports = {
    createLRentalTransaction,
    getAllLRentalTransactions,
    getUserLRentalTransactions,
    getadCodeLRentalTransactions,
    updateLRentalTransactionStatus,
    viewAllForFrontendUsers
}