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
    BookingID: {
        type: String,
        required: true,
    },
    rentalStartDate: {
        type: String,
        required: true,
    },
    rentalEndDate: {
        type: String,
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
    monthlyRate:{
        type: Number
    },
    advancePayment:{
        type: Number
    },
    alertMsg:{
        type: String
    }
    
});

module.exports = mongoose.model('longrentalTransactions', LRentalTransactionSchema);
