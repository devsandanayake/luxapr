const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
    }

});

module.exports = mongoose.model('adminAccount', adminSchema);