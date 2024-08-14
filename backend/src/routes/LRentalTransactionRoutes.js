const LRentalTransactionController = require('../controllers/LRentalTransactionService');
const authMiddleware = require('../middlewares/authuser');
const express = require('express');
const router = express.Router();


// User routes
router.post('/createLRentalTransaction', authMiddleware.authUser, LRentalTransactionController.createLRentalTransaction);
router.get('/getUserLRentalTransactions', authMiddleware.authUser, LRentalTransactionController.getUserLRentalTransactions);
router.get('/getAllLRentalTransactions', authMiddleware.authAdmin, LRentalTransactionController.getAllLRentalTransactions);
router.get('/rent', LRentalTransactionController.viewAllForFrontendUsers);


// Admin routes
router.get('/getadCodeLRentalTransactions', authMiddleware.authAdmin, LRentalTransactionController.getadCodeLRentalTransactions);
router.patch('/updateLRentalTransactionStatus', authMiddleware.authAdmin, LRentalTransactionController.updateLRentalTransactionStatus);







module.exports = router;