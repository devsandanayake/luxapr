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
            for (const file of req.files) {
                // eslint-disable-next-line no-undef
                const imagePath = path.join(__dirname, '../../../uploads', file.filename);
                if (!fs.existsSync(imagePath)) {
                    console.error(`File not found: ${imagePath}`);
                    continue;
                }
                // eslint-disable-next-line no-undef
                const watermarkPath = path.join(__dirname, '../../../watermark.png');
                // eslint-disable-next-line no-undef
                const outputPath = path.join(__dirname, '../../../uploads/watermarked', file.filename);

                // Read the dimensions of the original image
                const metadata = await sharp(imagePath).metadata();
                const width = Math.floor(metadata.width / 4); // Use Math.floor to round down
                const height = Math.floor(metadata.height / 4); 
                
                // Resize the watermark image to fit within the original image's dimensions
                const watermarkBuffer = await sharp(watermarkPath)
                    .resize(width, height, {
                        fit: 'inside', // This ensures the watermark fits within the original image dimensions
                        withoutEnlargement: true // This ensures the watermark is not enlarged
                    })
                    .toBuffer();

                await sharp(imagePath)
                    .composite([{ input: watermarkBuffer, gravity: 'center' }]) // Use the resized watermark
                    .toFile(outputPath);

                    file.originalPath = imagePath; // Add originalPath property
                    file.watermarkedPath = outputPath; // Update path property to watermarkedPath
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


module.exports = {
    createAd,
    addWatermark,
    viewAllAds,
    approved,
    viewSpecificAd,
    upload
};