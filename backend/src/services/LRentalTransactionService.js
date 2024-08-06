const LRentalTransactionModel = require('../models/LRentTransactionModel');

// Function to create a long rental transaction
const createLRentalTransaction = async (username , adCode , rentalStartDate , rentalEndDate , userMessage , phoneNumber) => {
    const newLRentalTransaction = new LRentalTransactionModel({
        username,
        adCode,
        rentalStartDate,
        rentalEndDate,
        userMessage,
        phoneNumber
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



module.exports = {
    createLRentalTransaction,
    getAllLRentalTransactions,
    getUserLRentalTransactions
}