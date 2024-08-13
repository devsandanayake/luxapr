const LRentInqueryController = require('../controllers/LRentInqueryController');
const authMiddleware = require('../middlewares/authuser');

const express = require('express');
const router = express.Router();

router.post('/add', authMiddleware.authUser, LRentInqueryController.createLRentInquery);
router.get('/all', authMiddleware.authAdmin, LRentInqueryController.getAllLRentInqueries);

module.exports = router;