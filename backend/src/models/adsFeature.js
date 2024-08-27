const mongoose = require('mongoose');

const adsFeatureSchema = new mongoose.Schema({
    feature: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('AdsFeature', adsFeatureSchema);