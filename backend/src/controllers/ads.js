const adsModel = require('../models/ads');
const UserModel = require('../models/user');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const moment = require('moment-timezone');
const {sendEmail} = require('../Email/email');


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


//multer storage configure
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//filter only image files
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

//set up multer upload 
const upload = multer({ storage: storage, fileFilter: fileFilter });
const addWatermark = async (req, res, next) => {
    if (req.files && req.files.length > 0) {
        try {
            //eslint-disable-next-line
            const uploadDir = path.resolve(__dirname, '../../../uploads');
            //eslint-disable-next-line
            const watermarkPath = path.resolve(__dirname, '../../../watermark.png');
            //eslint-disable-next-line
            const watermarkedDir = path.resolve(__dirname, '../../../uploads/watermarked');

            for (const file of req.files) {
                const imagePath = path.join(uploadDir, file.filename);

                if (!fs.existsSync(imagePath)) {
                    console.error(`File not found: ${imagePath}`);
                    continue;
                }

                const outputPath = path.join(watermarkedDir, file.filename);

                // Read the dimensions of the original image
                const metadata = await sharp(imagePath).metadata();
                const width = Math.floor(metadata.width / 4);
                const height = Math.floor(metadata.height / 4);

                // Resize the watermark image to fit within the original image's dimensions
                const watermarkBuffer = await sharp(watermarkPath)
                    .resize(width, height, {
                        fit: 'inside',
                        withoutEnlargement: true,
                    })
                    .toBuffer();

                await sharp(imagePath)
                    .composite([{ input: watermarkBuffer, gravity: 'center' }])
                    .toFile(outputPath);
                //eslint-disable-next-line
                const relativeOriginalPath = path.relative(__dirname, imagePath);
                //eslint-disable-next-line
                const relativeWatermarkedPath = path.relative(__dirname, outputPath);

                file.originalPath = relativeOriginalPath; // Store relative path
                file.watermarkedPath = relativeWatermarkedPath; // Store relative path
                file.originalFilename = file.filename; // Keep the original filename
                file.filename = 'watermarked_' + file.filename;
            }
        } catch (error) {
            return next(error);
        }
    }
    next();
};

//user create ads
const createAd = async (req, res, next) => {
    try{
        const user = req.user;

        const ADcode = await generateUniqueADcode(user);
        const imagePaths = req.files.map(file => file.watermarkedPath); // Path to watermarked images
        const originImagePaths = req.files.map(file => file.originalPath); // Original image paths

        const now = moment.tz('Asia/Colombo');
        const formattedDate = now.format('YYYY-MM-DD HH:mm:ss');

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
            images: imagePaths,
            originImages: originImagePaths,
            status: req.body.status,
            publishedAt: formattedDate
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

//view all approvel  ads
const viewAllAds = async (req, res, next) => {
    try {
        // Filter ads with status 1 and sort them by 'publishedAt' in descending order
        const ads = await adsModel.find({ status: 1 }).sort('-publishedAt');
        res.json(ads);
    } catch (err) {
        next(err);
    }
};


//ads approve or reject by admin
const approved = async (req,res,next) => {
     try{
        const adCode = req.body.adCode;
        const status = req.body.status;

        const ad = await adsModel.findOneAndUpdate({ adCode: adCode }, { status: status });
        if (!ad) {
            return next({ status: 404, message: 'Ad not found' });
        }

        // Send a response back to the client
        const username = ad.username;

        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return next({ status: 404, message: 'User not found' });
        }

        const email = user.email;

        sendEmail(email,adCode);




        res.json({
            message: "Ad status updated successfully",
            username: username,
            email: email,
        });

     }catch(err){
         next(err)
     }

}


//view sepciific ads
const viewSpecificAd = async (req, res, next) => {
    try {
        const adCode = req.params.adCode;
        const ad = await adsModel.findOne({ adCode: adCode, status: 1 });
        if (!ad) {
            return next({ status: 404, message: 'Ad not found or not available' });
        }
        res.json(ad);
    } catch (err) {
        next(err);
    }
};


//viwe all ads for admin
const viewAllAdsForAdmin = async (req, res, next) => {
    try {
        const ads = await adsModel.find().sort('-publishedAt');
        res.json(ads);
    } catch (err) {
        next(err);
    }
};

//edit ads
const editAds = async (req, res, next) => {
    try {
        const adCode = req.params.adCode;
        const ad = await adsModel.findOne({ adCode: adCode });
        if (!ad) {
            return next({ status: 404, message: 'Ad not found' });
        }

        const updatedAd = {
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
        };

        const updated = await adsModel.findOneAndUpdate({ adCode: adCode }, updatedAd,{new:true});
        res.json({
            message: "Ad updated successfully",
            ad: updated
        });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    createAd,
    addWatermark,
    viewAllAds,
    approved,
    viewSpecificAd,
    viewAllAdsForAdmin,
    editAds,
    upload
};