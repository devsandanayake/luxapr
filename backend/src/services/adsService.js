const AdsModel = require('../models/ads');
const UserModel = require('../models/user');
const moment = require('moment-timezone');
const { sendEmail } = require('./emailService');

const generateUniqueADcode = async (prefix) => {
    let isUnique = false;
    let adCode;
    while (!isUnique) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        adCode = `${prefix}${randomNumber}`;
        const existingAd = await AdsModel.findOne({ adCode: adCode });
        if (!existingAd) {
            isUnique = true;
        }
    }
    return adCode;
};

const createAd = async (user, adData, files) => {
    const adCode = await generateUniqueADcode(user);
    const imagePaths = files.map(file => file.watermarkedPath);
    const originImagePaths = files.map(file => file.originalPath);
    const now = moment.tz('Asia/Colombo');
    const formattedDate = now.format('YYYY-MM-DD HH:mm:ss');

    const adDetails = {
        ...adData,
        username: user,
        adCode,
        images: imagePaths,
        originImages: originImagePaths,
        publishedAt: formattedDate
    };

    const newAd = new AdsModel(adDetails);
    return await newAd.save();
};

const viewAllAds = async () => {
    return await AdsModel.find({ status: 1 }).sort('-publishedAt');
};

const approved = async (adCode, status) => {
    const ad = await AdsModel.findOneAndUpdate({ adCode }, { status }, { new: true });
    if (!ad) {
        throw new Error('Ad not found');
    }

    const user = await UserModel.findOne({ username: ad.username });
    if (!user) {
        throw new Error('User not found');
    }

    await sendEmail(user.email, adCode);
    return ad;
};

const viewSpecificAd = async (adCode) => {
    return await AdsModel.findOne({ adCode, status: 1 });
};

const viewAllAdsForAdmin = async () => {
    return await AdsModel.find().sort('-publishedAt');
};

const editAds = async (adCode, adData) => {
    return await AdsModel.findOneAndUpdate({ adCode }, adData, { new: true });
};

module.exports = {
    createAd,
    viewAllAds,
    approved,
    viewSpecificAd,
    viewAllAdsForAdmin,
    editAds
};
