const mongoose = require('mongoose');

const LRentalTransactionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    adCode: {
        type: String,
        required: true,
    },
    rentalStartDate: {
        type: Date,
        required: true,
    },
    rentalEndDate: {
        type: Date,
        required: true,
    },
    adminKeyStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
        required: true,
    },
    userMessage:{
        type: String
    },
    phoneNumber:{
        type: String
    },
    
});

module.exports = mongoose.model('longrentalTransactions', LRentalTransactionSchema);
