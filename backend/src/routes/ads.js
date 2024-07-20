const {createAd,upload , addWatermark,viewAllAds,approved,viewSpecificAd} = require('../controllers/ads');
const express = require('express');
const router = express.Router();
const authMiddelware = require('../middlewares/authuser');


router.post('/createAds', authMiddelware, upload.array('images') ,addWatermark, createAd);
router.get('/viewAds', viewAllAds);
//approvel ads
router.patch('/approveAds', approved);

//view specific ad
router.get('/viewSpecificAd/:adCode', viewSpecificAd);

module.exports = router;