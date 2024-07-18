const adsModel = require('../models/ads');


// Generate a unique AD code
async function generateUniqueADcode(prefix) {
    let isUnique = false;
    let adCode;
    while (!isUnique) {
       const randomNumber = Math.floor(1000 + Math.random() * 9000);
        adCode = `${prefix}${randomNumber}`;
        const existingAd = await adsModel.findOne({ adCode: adCode });
        if (!existingAd) {
            isUnique = true;
        }
    }
    return adCode;
}

const createAd = async (req, res, next) => {
    try{
        const user = req.user;

        const ADcode = await generateUniqueADcode(user);

        const adDetails = {
            username: user,
            adCode: ADcode,
            title: req.body.title,
            address: req.body.address,
            streetNumber: req.body.streetNumber,
            area: req.body.area,
            city: req.body.city,
            district: req.body.district,
            province: req.body.province,
            country: req.body.country,
            description: req.body.description,
            bedroomCount: req.body.bedroomCount,
            bathroomCount: req.body.bathroomCount,
            floor: req.body.floor,
            areaSize: req.body.areaSize,
            price: req.body.price,
            currency: req.body.currency,
            typeOfPro: req.body.typeOfPro,
            transactionType: req.body.transactionType,
            status: req.body.status
        };

        const newAd = new adsModel(adDetails);
        //save db
        await newAd.save();
         
         // Send a response back to the client
         res.status(201).json({
            message: "Ad created successfully",
            ad: newAd
        });


    } catch(err){
        next(err)
    }
};


module.exports = {
    createAd
};