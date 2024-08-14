const mongoose = require('mongoose');

const LRentInquerySchema = new mongoose.Schema({
    inqueryID:{
        type: String,
        required: true,
        unique : true
    },
    adCode: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    fullName:{
        type: String
    },
    number:{
        type: Number,
        required: true
    },
    message:{
        type: String
    },
    preferredDate:{
        type: String
    },
    preferredTime:{
        type: String
    },
    alternateDate:{
        type: String
    },
    alternateTime:{
        type: String
    },
    reply:{
        type: String
    },
    replyStatus:{
        type: String,
        default: 'Pending',
        required: true
    },
    alertMsg:{
        type: String
    }
    

});

module.exports = mongoose.model('LRentInquery', LRentInquerySchema);