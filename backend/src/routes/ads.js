const {createAd,upload , addWatermark,viewAllAds,approved,viewSpecificAd,viewAllAdsForAdmin,editAds} = require('../controllers/ads');
const express = require('express');
const router = express.Router();
const authMiddelware = require('../middlewares/authuser');


router.post('/createAds', authMiddelware.authUser, upload.array('images') ,addWatermark, createAd);
router.get('/viewAds', viewAllAds);
router.patch('/edit/:adCode',authMiddelware.editPostuserSideauth , editAds);


//view specific ad
router.get('/viewSpecificAd/:adCode', viewSpecificAd);



//admin Routes
router.get('/viewAllAdsForAdmin',authMiddelware.authAdmin, viewAllAdsForAdmin);
//approvel ads
router.patch('/approveAds',authMiddelware.authAdmin, approved);

module.exports = router;
