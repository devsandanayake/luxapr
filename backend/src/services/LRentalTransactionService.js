const LRentalTransactionModel = require('../models/LRentTransactionModel');

// Function to create a long rental transaction
const createLRentalTransaction = async (username , adCode , rentalStartDate , rentalEndDate , userMessage) => {
    const newLRentalTransaction = new LRentalTransactionModel({
        username,
        adCode,
        rentalStartDate,
        rentalEndDate,
        userMessage
    });
    return await newLRentalTransaction.save();
}

// Function to get all long rental transactions
const getAllLRentalTransactions = async () => {
    return await LRentalTransactionModel.find();
}



module.exports = {
    createLRentalTransaction,
    getAllLRentalTransactions
}