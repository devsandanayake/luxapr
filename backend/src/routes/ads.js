const {createAd,upload , addWatermark,viewAllAds,approved} = require('../controllers/ads');
const express = require('express');
const router = express.Router();
const authMiddelware = require('../middlewares/authuser');


router.post('/createAds', authMiddelware, upload.array('images') ,addWatermark, createAd);
router.get('/viewAds', viewAllAds);
//approvel ads
router.patch('/approveAds', approved);

module.exports = router;