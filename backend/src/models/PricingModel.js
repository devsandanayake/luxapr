const mongoose = require('mongoose');

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
    price: {
        Year: {
            type: Number,
            required: true
        },
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
    }
});

const PricingModel = mongoose.model('Pricing', pricingSchema);

module.exports = PricingModel;