const {createAd,upload , addWatermark} = require('../controllers/ads');
const express = require('express');
const router = express.Router();
const authMiddelware = require('../middlewares/authuser');


router.post('/createAds', authMiddelware, upload.array('images') ,addWatermark, createAd);

module.exports = router;