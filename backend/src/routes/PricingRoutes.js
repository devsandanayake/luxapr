const PricingController = require('../controllers/PricingController');
const express = require('express');
const router = express.Router();

// Create a new pricing
router.post('/', PricingController.createPricing);
router.post('/calculate', PricingController.calculatePrice);

module.exports = router;