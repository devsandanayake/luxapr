const express = require('express');
const router = express.Router();
const adsController = require('../controllers/adsController');
const { upload } = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authuser');

// User routes
router.post('/createAds', authMiddleware.authUser, upload.array('images'), adsController.createAd);
router.get('/viewAds', adsController.viewAllAds);
router.patch('/edit/:adCode', authMiddleware.editPostuserSideauth, adsController.editAds);
router.get('/viewSpecificAd/:adCode', adsController.viewSpecificAd);

// Admin routes
router.get('/viewAllAdsForAdmin', authMiddleware.authAdmin, adsController.viewAllAdsForAdmin);
router.patch('/approveAds', authMiddleware.authAdmin, adsController.approved);
router.patch('/openForBidding', authMiddleware.authAdmin, adsController.openForBidding);
router.patch('/updateBid', authMiddleware.authAdmin, adsController.updateAuctionDetails);

module.exports = router;
