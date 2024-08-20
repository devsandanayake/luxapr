const express = require('express');
const router = express.Router();
const adsController = require('../controllers/adsController');
const { upload  } = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authuser');

// User routes
router.post('/createAds', authMiddleware.authUser, upload.fields([
    { name: 'images', maxCount: 12 },
    { name: 'images360', maxCount: 12 }
]),  adsController.createAd);
router.get('/viewAds', adsController.viewAllAds);
router.patch('/edit/:adCode', authMiddleware.editPostuserSideauth, adsController.editAds);
router.get('/viewSpecificAd/:adCode', adsController.viewSpecificAd);
router.post('/searchAds',adsController.searchAdsCompareWithDate);

// Admin routes
router.get('/viewAllAdsForAdmin', authMiddleware.authAdmin, adsController.viewAllAdsForAdmin);
router.patch('/approveAds', authMiddleware.authAdmin, adsController.approved);
router.patch('/openForBidding', authMiddleware.authAdmin, adsController.openORcloseForBidding);
router.patch('/updateBid', authMiddleware.authAdmin, adsController.updateAuctionDetails);
router.get('/viewSpecificAdForAdmin/:adCode', authMiddleware.authAdmin, adsController.viewSpecificAdForAdmin);

module.exports = router;
