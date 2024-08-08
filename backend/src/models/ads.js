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
    districts:{
        type:String
    },
    areas:{
        type:String
    },
    address:{
         street:{
            type:String
         },
         postCode:{
            type:String
         }
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
    transactionType:{
        type:Number,
    },
    images:{
        type:[String]
    },
    status:{
        type:Number,
        default:0,
    },
    publishedAt:{
        type:String,
        required:true,
    },
    auctionStatus:{
         status:{
            type:Boolean,
            default:false,
         },
         auctionID:{
            type:String,
         },  
         startPrice:{
            type:Number,
         },
         startDate:{
            type:String,
         },
         endDate:{
            type:String,
         },
         maxRate:{
            type:Number,
         },
         currentRate:{
            type:Number,
         },
         BidValue:{
            type:Number,
         },

    }
});

module.exports = mongoose.model("advertisements",adsSchema);