const LRentalTransactionController = require('../controllers/LRentalTransactionService');
const authMiddleware = require('../middlewares/authuser');
const express = require('express');
const router = express.Router();


// User routes
router.post('/createLRentalTransaction', authMiddleware.authUser, LRentalTransactionController.createLRentalTransaction);
router.get('/getUserLRentalTransactions', authMiddleware.authUser, LRentalTransactionController.getUserLRentalTransactions);







module.exports = router;