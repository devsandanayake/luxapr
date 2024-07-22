const auctionPropertyModel = require('../models/auctionProperty');
const adsModel = require('../models/ads');

//admin approve auction property
const approveAuctionProperty = async (req, res) => {
    try{
    const adCode = req.body.adCode;
    const startDate = req.body.startDate;
    const startTime = req.body.startTime;
    const endDate = req.body.endDate;
    const endTime = req.body.endTime;
    const startPrice = req.body.startPrice;

    const ad = await adsModel.findOneAndUpdate({adCode:adCode} , {auctionStatus:true});
    if(!ad){
        return res.status(404).json({message:"Ad not found"});

    }
    const auctionProperty = new auctionPropertyModel({
        adCode:adCode,
        startDate:startDate,
        startTime:startTime,
        endDate:endDate,
        endTime:endTime,
        startPrice:startPrice
    });
    await auctionProperty.save();
    res.status(201).json({message:"Auction property approved"});
    }
    catch(err){
        console.log(err);
    }    
}


module.exports = {
    approveAuctionProperty
}
