const {createAd,upload , addWatermark,viewAllAds} = require('../controllers/ads');
const express = require('express');
const router = express.Router();
const authMiddelware = require('../middlewares/authuser');


router.post('/createAds', authMiddelware, upload.array('images') ,addWatermark, createAd);
router.get('/viewAds', viewAllAds);

module.exports = router;