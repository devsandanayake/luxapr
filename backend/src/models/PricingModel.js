const mongoose = require('mongoose');

const pricingDetailSchema = new mongoose.Schema({
    startMonth: {
        type: String,
        required: true
    },
    endMonth: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

const pricingSchema = new mongoose.Schema({
    adCode: {
        type: String,
        required: true,
        
    },
    transactionType: {
        type: String,
        required: true
    },
    price: [{
        year: {
            type: String,
            required: true
        },
        details: [pricingDetailSchema]
    }]
});

const PricingModel = mongoose.model('Pricing', pricingSchema);

module.exports = PricingModel;
