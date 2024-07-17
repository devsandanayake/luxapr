 const mongoose = require('mongoose');

 const UserSchema = new mongoose.Schema({
  userID:{
    type:String,
    required:true
     }  
  ,
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
    } 
});

module.exports =  mongoose.model('users', UserSchema);