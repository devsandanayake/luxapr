const mongoose = require('mongoose');

const SRentalTransactionSchema = new mongoose.Schema({
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
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
        required: true,
    },
    paymentDetails: {
        paymentID: {
            type: String,
            required: true,
        },
        paymentDate: {
            type: Date,
            required: true,
        },
        paymentAmount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        }
    }
});

module.exports = mongoose.model('shortrentalTransactions', SRentalTransactionSchema);
