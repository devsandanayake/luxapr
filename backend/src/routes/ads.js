const adsController = require('../controllers/ads');
const express = require('express');
const router = express.Router();
const authMiddelware = require('../middlewares/authuser');


router.post('/createAds', authMiddelware, adsController.createAd);

module.exports = router;