const mongoose = require('mongoose');

 const UserSchema = new mongoose.Schema({
    images: {
        type: String,
     
    },
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
    occupation: {
        type: String,
    },
    auctionID:{
        type: [String],
    }
});

module.exports =  mongoose.model('users', UserSchema);