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


const editFeature = async (id, feature) => {
    try {
        const featureName = await adsFeatureModel.findById(id);
        if (!featureName) {
            return 'Feature does not exist';
        }
        const updatedFeature = await adsFeatureModel.findByIdAndUpdate(
            id,
            { feature },
            { new: true }
        );
        return updatedFeature;
    } catch (err) {
        console.error('Error editing feature:', err);
        throw err; // Re-throw the error after logging it
    }
};
    


module.exports = {
    createAdsFeature,
    viewAllAdsFeature,
    editFeature
}

