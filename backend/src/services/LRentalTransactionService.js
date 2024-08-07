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

const getadCodeLRentalTransactions = async (adCode) => {
    return await LRentalTransactionModel.find({adCode: adCode});
}

//update long rental transaction status
const updateLRentalTransactionStatus = async (adCode, adminKeyStatus) =>{
    return await LRentalTransactionModel.findOneAndUpdate({adCode: adCode}, {adminKeyStatus: adminKeyStatus},{new: true});
}




module.exports = {
    createLRentalTransaction,
    getAllLRentalTransactions,
    getUserLRentalTransactions,
    getadCodeLRentalTransactions,
    updateLRentalTransactionStatus
}