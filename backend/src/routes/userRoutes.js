const userController = require('../controllers/userContoller');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authuser')

router.post('/signup', userController.createUser);
router.post('/signin',userController.loginUser);
router.get('/viewAllUsers',auth.authAdmin,userController.viewAllUsers);
router.get('/viewAllAds/:username',auth.authUser,userController.viewAdsUser);
 

module.exports = router;

