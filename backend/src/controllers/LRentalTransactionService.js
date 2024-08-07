const LRentalTransactionService = require('../services/LRentalTransactionService');

// Function to create a long rental transaction
const createLRentalTransaction = async (req, res) =>{
    const username = req.user;
    const adCode = req.body.adCode;
    const rentalStartDate = req.body.rentalStartDate;
    const rentalEndDate = req.body.rentalEndDate;
    const userMessage = req.body.userMessage;
    const phoneNumber = req.body.phoneNumber;
    try{
        const newLRentalTransaction = await LRentalTransactionService.createLRentalTransaction(username , adCode , rentalStartDate , rentalEndDate , userMessage, phoneNumber);
        res.status(201).json(newLRentalTransaction);

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

// Function to get all long rental transactions
const getAllLRentalTransactions = async (req, res) =>{
    try{
        const allLRentalTransactions = await LRentalTransactionService.getAllLRentalTransactions();
        res.status(200).json(allLRentalTransactions);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

//get user long rental transactions
const getUserLRentalTransactions = async (req, res) =>{
    const username = req.user;
    try{
        const userLRentalTransactions = await LRentalTransactionService.getUserLRentalTransactions(username);
        res.status(200).json(userLRentalTransactions);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const getadCodeLRentalTransactions = async (req, res) =>{
    const adCode = req.query.adCode;
    try{
        const adCodeLRentalTransactions = await LRentalTransactionService.getadCodeLRentalTransactions(adCode);
        res.status(200).json(adCodeLRentalTransactions);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}


module.exports = {
    createLRentalTransaction,
    getAllLRentalTransactions,
    getUserLRentalTransactions,
    getadCodeLRentalTransactions
}