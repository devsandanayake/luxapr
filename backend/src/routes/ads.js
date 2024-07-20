const {createAd,upload , addWatermark,viewAllAds,approved,viewSpecificAd,viewAllAdsForAdmin} = require('../controllers/ads');
const express = require('express');
const router = express.Router();
const authMiddelware = require('../middlewares/authuser');


router.post('/createAds', authMiddelware.authUser, upload.array('images') ,addWatermark, createAd);
router.get('/viewAds', viewAllAds);
//approvel ads
router.patch('/approveAds', approved);

//view specific ad
router.get('/viewSpecificAd/:adCode', viewSpecificAd);



//admin Routes
router.get('/viewAllAdsForAdmin',authMiddelware.authAdmin, viewAllAdsForAdmin);

module.exports = router;
