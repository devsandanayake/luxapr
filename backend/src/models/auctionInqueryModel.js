const mongoose = require('mongoose');

const auctionInquerySchema = new mongoose.Schema({
    inqueryID:{
        type: String,
        required: true
    },
    auctionID: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    Name:{
        type: String
    },
    number:{
        type: Number,
        required: true
    },
    message:{
        type: String
    },
    reply:{
        type: String
    },
    replyStatus:{
        type: String,
        enum: ['Pending', 'Replied'],
        default: 'Pending',
        required: true
    }
    

});

module.exports = mongoose.model('auctionInquery', auctionInquerySchema);