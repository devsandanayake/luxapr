 const mongoose = require('mongoose');
const auctionService = require('./auctionService');

 const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNumber: {
        type: Number,
    } ,
    role: {
        type: String,
        default: 'user',
    },  
    registerDate: {
        type: String,
        required: true,
    },
    auctionService: {
        type: [auctionService.schema],
        default: []
    }
});

module.exports =  mongoose.model('users', UserSchema);