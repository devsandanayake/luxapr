const adsFeatureService = require('../services/adsFeature');


const createAdsFeature = async (req, res) => {
    try {
        const feature = req.body.feature;
        const newFeature = await adsFeatureService.createAdsFeature(feature);
        res.status(201).send(newFeature);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const viewAllAdsFeature = async (req, res) => {
    try {
        const allFeature = await adsFeatureService.viewAllAdsFeature();
        res.status(200).send(allFeature);
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
    createAdsFeature,
    viewAllAdsFeature
}
