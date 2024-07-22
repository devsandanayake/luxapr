const mongoose = require('mongoose');

const auctionServiceSchema = new mongoose.Schema({
    auctionID:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    adCode:{
        type:String,
        required:true,
    }


});

module.exports = mongoose.model('AuctionService',auctionServiceSchema);


