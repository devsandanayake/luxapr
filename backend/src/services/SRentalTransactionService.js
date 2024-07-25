const SRentalTransactionModel = require('../models/SRentalTransactionModel');


// Function to register a short-term rental transaction
const registerSRentalTransaction = async (username, adCode, rentalStartDate, rentalEndDate, paymentID, paymentDate, paymentAmount, paymentMethod) => {
    // Create a new short-term rental transaction
    const newSRentalTransaction = new SRentalTransactionModel({
        username,
        adCode,
        rentalStartDate,
        rentalEndDate,
        paymentDetails: {
            paymentID,
            paymentDate,
            paymentAmount,
            paymentMethod,
        },
    });

    // Save the new short-term rental transaction and return the result
    return newSRentalTransaction.save();
}


module.exports = {
    registerSRentalTransaction,
};



