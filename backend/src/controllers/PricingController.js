const PricingService = require('../services/PricingService');


// Create a new pricing
const createPricing = async (req, res) => {
    const { adCode, transactionType, priceDetails } = req.body;
    try {
        const newPricing = await PricingService.createPricing(adCode, transactionType, priceDetails);
        res.status(201).json(newPricing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const calculatePrice = async (req, res) => {
    const { adCode, startDate, endDate } = req.body;
    try {
        const price = await PricingService.calculatePrice(adCode, startDate, endDate);
        res.status(200).json(price);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//get 
const getPricing = async (req, res) => {
    const adCode = req.params.adCode;
    try {
        const pricings = await PricingService.getPricing(adCode);
        res.status(200).json(pricings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const EditPricingDetails = async (req, res) => {
    const { adCode, transactionType, priceDetails } = req.body;
    try {
        const newPricing = await PricingService.editPricing(adCode, transactionType, priceDetails);
        res.status(201).json(newPricing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//get specific pricing
const getPricingOne = async (req, res) => {
    const adCode = req.params.adCode;
    try {
        const pricings = await PricingService.getPricingOne(adCode);
        res.status(200).json(pricings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = {
    createPricing,
    calculatePrice,
    getPricing,
    EditPricingDetails,
    getPricingOne
};