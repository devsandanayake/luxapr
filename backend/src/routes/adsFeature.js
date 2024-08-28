const adsFeatureController = require('../controllers/adsFeature');
const express = require('express');
const router = express.Router();


router.post('/createAdsFeature', adsFeatureController.createAdsFeature);
router.get('/viewAllAdsFeature', adsFeatureController.viewAllAdsFeature);
router.patch('/editFeature/:id', adsFeatureController.editFeature);


module.exports = router;