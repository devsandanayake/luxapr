const adsService = require('../services/adsService');
// const { addWatermark } = require('../util/watermark');

const createAd = async (req, res, next) => {
    try {
        const user = req.user;
        const images = req.files['images'] || [];
        const images360 = req.files['images360'] || [];

        // Combine all files into a single array if needed
        const allFiles = [...images, ...images360];

        // Create the ad with the user, request body, and files
        const newAd = await adsService.createAd(user, req.body, allFiles);
        res.status(201).json({ message: 'Ad created successfully', ad: newAd });
    } catch (error) {
        next(error);
    }
};

const viewAllAds = async (req, res, next) => {
    try {
        const ads = await adsService.viewAllAds();
        res.json(ads);
    } catch (err) {
        next(err);
    }
};

const approved = async (req, res, next) => {
    try {
        const { adCode, status } = req.body;
        const ad = await adsService.approved(adCode, status);
        res.json({ message: "Ad status updated successfully", ad });
    } catch (err) {
        next(err);
    }
};

const viewSpecificAd = async (req, res, next) => {
    try {
        const adCode = req.params.adCode;
        const ad = await adsService.viewSpecificAd(adCode);
        if (!ad) {
            return next({ status: 404, message: 'Ad not found or not available' });
        }
        res.json(ad);
    } catch (err) {
        next(err);
    }
};

const viewAllAdsForAdmin = async (req, res, next) => {
    try {
        const ads = await adsService.viewAllAdsForAdmin();
        res.json(ads);
    } catch (err) {
        next(err);
    }
};

const editAds = async (req, res, next) => {
    try {
        const adCode = req.params.adCode;
        const updatedAd = await adsService.editAds(adCode, req.body);
        res.json({ message: "Ad updated successfully", ad: updatedAd });
    } catch (err) {
        next(err);
    }
};

const openORcloseForBidding = async (req, res, next) => {
    try {
        const adCode = req.body.adCode;
        const value = req.body.value;
        const ads = await adsService.openORcloseForBidding(adCode , value);
        res.json({ message: "Ad status updated successfully", ad:ads.auctionStatus.status });
    } catch (err) {
        next(err);
    }
}


const updateAuctionDetails = async (req, res, next) => {
    try {
        const adCode = req.body.adCode;
        const { startDate, endDate, startPrice, maxRate } = req.body;
        const ad = await adsService.updateAuctionDetails(adCode, startDate, endDate, startPrice, maxRate);
        res.json({ message: "Auction details updated successfully", ad });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createAd,
    viewAllAds,
    approved,
    viewSpecificAd,
    viewAllAdsForAdmin,
    editAds,
    openORcloseForBidding,
    updateAuctionDetails
};
