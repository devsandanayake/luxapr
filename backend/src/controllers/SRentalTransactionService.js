const SRentalTransactionService = require('../services/SRentalTransactionService');


const registerSRentalTransaction = async (req, res, next) => {
    try {
        const { adCode, rentalStartDate, rentalEndDate, paymentID, paymentDate, paymentAmount, paymentMethod } = req.body;
        const user = req.user;
        await SRentalTransactionService.registerSRentalTransaction(user, adCode, rentalStartDate, rentalEndDate, paymentID, paymentDate, paymentAmount, paymentMethod);
        res.json({ message: 'Short-term rental transaction registered successfully' });
    } catch (err) {
        next(err);
    }
}




module.exports = {
    registerSRentalTransaction,
};