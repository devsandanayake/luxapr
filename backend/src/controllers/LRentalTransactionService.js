const LRentalTransactionService = require('../services/LRentalTransactionService');

// Function to create a long rental transaction
const createLRentalTransaction = async (req, res) =>{
    const username = req.user;
    const adCode = req.body.adCode;
    const rentalStartDate = req.body.rentalStartDate;
    const rentalEndDate = req.body.rentalEndDate;
    const userMessage = req.body.userMessage;
    try{
        const newLRentalTransaction = await LRentalTransactionService.createLRentalTransaction(username , adCode , rentalStartDate , rentalEndDate , userMessage);
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


module.exports = {
    createLRentalTransaction,
    getAllLRentalTransactions
}