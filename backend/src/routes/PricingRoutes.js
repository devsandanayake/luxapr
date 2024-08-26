const PricingController = require('../controllers/PricingController');
const express = require('express');
const router = express.Router();

// Create a new pricing
router.post('/', PricingController.createPricing);
router.post('/calculate', PricingController.calculatePrice);

// get all pricings
router.get('/:adCode', PricingController.getPricing);
router.patch('/', PricingController.EditPricingDetails);
router.get('/one/:adCode', PricingController.getPricingOne);

module.exports = router;