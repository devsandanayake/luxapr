const adsFeatureModel = require('../models/adsFeature');

const createAdsFeature = async (feature) => {
    const newFeature = new adsFeatureModel({
        feature
    });
    return newFeature.save();
}

const viewAllAdsFeature = async () => {
    return adsFeatureModel.find();
}


module.exports = {
    createAdsFeature,
    viewAllAdsFeature
}

