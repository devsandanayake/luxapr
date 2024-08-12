const LRentInqueryController = require('../controllers/LRentInqueryController');
const authMiddleware = require('../middlewares/authuser');

const express = require('express');
const router = express.Router();

router.post('/add', authMiddleware.authUser, LRentInqueryController.createLRentInquery);

module.exports = router;