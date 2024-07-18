const adsModel = require('../models/ads');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

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
                const imagePath = path.join(__dirname, '../../../uploads', file.filename);
                if (!fs.existsSync(imagePath)) {
                    console.error(`File not found: ${imagePath}`);
                    continue;
                }
                const watermarkPath = path.join(__dirname, '../../../watermark.png');
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


const createAd = async (req, res, next) => {
    try{
        const user = req.user;

        const ADcode = await generateUniqueADcode(user);
        const imagePaths = req.files.map(file => file.watermarkedPath); // Path to watermarked images
        const originImagePaths = req.files.map(file => file.originalPath); // Original image paths

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
    createAd,
    addWatermark,
    upload
};