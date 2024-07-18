const mongoose = require("mongoose");

const adsSchema =  new mongoose.Schema({
    username:{
        type:String,
 
    },
    adCode:{
        type:String,
 
        unique:true
    },
    title:{
        type:String
 
    },
    address:{
        type:String,
 
    },
    streetNumber:{
        type:String,
 
    },
    area:{
        type:String,
 
    },
    city:{
        type:String,
 
    },
    district:{
        type:String,
 
    },
    province:{
        type:String,
 
    },
    country:{
        type:String,
 
    },
    description:{
        type:String
    },
    bedroomCount:{
        type:Number
    },
    bathroomCount:{
        type:Number
    },
    floor:{
        type:Number
    },
    areaSize:{
        type:Number
    },
    price:{
        type:Number
    },
    currency:{
        type:String,
 
    },
    typeOfPro:{
        type:String,
 
    },
    transactionType:{
        type:String,
 
    },
    images:{
        type:[String]
    },
    originImages:{
        type:[String]
    },
    status:{
        type:Number,
        default:0,
    }
});

module.exports = mongoose.model("advertisements",adsSchema);