const auctionRegController = require('../controllers/auctionRegController');
const router = require('express').Router();
const  authenticateUser  = require('../middlewares/authuser');


router.post('/registerAuction', authenticateUser.authUser, auctionRegController.registerAuction);
router.post('/bidAuction', authenticateUser.authUser, auctionRegController.bidAuction);

router.get('/viewOtherUserOffers/:auctionID', authenticateUser.authUser, auctionRegController.viewOtherUserOffers);
router.get('/viewRegistredAuctions/:adCode', authenticateUser.authUser, auctionRegController.viewRegistredAuctions);
router.get('/viewAllRegUsers/:auctionID', authenticateUser.authAdmin, auctionRegController.viewAllRegUsers); 


module.exports = router;
