const mongoose = require('mongoose');

const pricingDetailSchema = new mongoose.Schema({
    startmonth: {
        type: Number,
        required: true
    },
    endmonth: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const pricingSchema = new mongoose.Schema({
    adCode: {
        type: String,
        required: true,
        unique: true
    },
    transactionType: {
        type: Number,
        required: true
    },
    price: [{
        year: {
            type: Number,
            required: true
        },
        details: [pricingDetailSchema]
    }]
});

const PricingModel = mongoose.model('Pricing', pricingSchema);

module.exports = PricingModel;
