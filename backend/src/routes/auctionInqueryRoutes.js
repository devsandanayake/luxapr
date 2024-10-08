const auctionInqueryController = require('../controllers/auctionInqueryController');

const router = require('express').Router();
const auth = require('../middlewares/authuser');

router.post('/addInquery', auth.authUser, auctionInqueryController.addInquery);
router.post('/replyToInquery', auth.authAdmin, auctionInqueryController.replyToInquery);
router.get('/viewAllInqueries', auth.authAdmin, auctionInqueryController.viewAllInqueries);
router.get('/viewInqueries/:auctionID', auth.authAdmin, auctionInqueryController.viewInqueries);



module.exports = router;