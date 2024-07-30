const auctionInqueryController = require('../controllers/auctionInqueryController');

const router = require('express').Router();
const auth = require('../middlewares/authuser');

router.post('/addInquery', auth.authUser, auctionInqueryController.addInquery);
router.post('/replyToInquery', auth.authAdmin, auctionInqueryController.replyToInquery);



module.exports = router;