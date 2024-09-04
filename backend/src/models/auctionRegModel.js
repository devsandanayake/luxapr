const mongoose = require('mongoose');

const auctionRegSchema = new mongoose.Schema({
    auctionID: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    adCode:{
        type: String,
        required: true,
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    paymentStatus:{
        type: Boolean,
        default: false,
    },
    bidAmount:{
        type: [Number]
    },
    userOffer: [{
        rate: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        }
    }]

});

module.exports = mongoose.model('AuctionReg', auctionRegSchema);
