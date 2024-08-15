const userController = require('../controllers/userContoller');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authuser')
const {uploadP} = require('../middlewares/uploadMiddleware');

router.post('/signup', uploadP.single('images'), userController.createUser);
router.post('/signin',userController.loginUser);
router.get('/viewAllUsers',auth.authAdmin,userController.viewAllUsers);
router.get('/viewAllAds/:username',auth.authUser,userController.viewAdsUser);
router.get('/viewUserProfile',auth.authUser,userController.viewUserProfile);
router.patch('/editUserProfile',auth.authUser,userController.editUserProfile);

//verify user
router.post('/verify',auth.authUser,userController.verifyUser);

module.exports = router;

