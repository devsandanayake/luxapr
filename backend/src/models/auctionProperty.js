const mongoose = require('mongoose');

// Define the User Auction Details Schema
const userAuctionDetailsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true
    },
    auctionID: {
        type: String,
        required: [true, 'Auction ID is required'],
        trim: true
    },
    bidPrice: {
        type: Number,
        required: [true, 'Bid price is required'],
        min: [0, 'Bid price must be a positive number']
    }
}, { _id: false }); // Disable _id for subdocument

// Define the Auction Property Schema
const auctionPropertySchema = new mongoose.Schema({
    adCode: {
        type: String,
        required: [true, 'Ad code is required'],
        trim: true,
        index: true // Add an index for faster searches
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    endTime: {
        type: String,
        required: [true, 'End time is required']
    },
    startPrice: {
        type: Number,
        required: [true, 'Start price is required'],
        min: [0, 'Start price must be a positive number']
    },
    bids: {
        type: [userAuctionDetailsSchema],
        default: []
    }
}, {
    timestamps: true // Add createdAt and updatedAt fields
});

// Create the Auction Property Model
const AuctionProperty = mongoose.model('AuctionProperty', auctionPropertySchema);

module.exports = AuctionProperty;
