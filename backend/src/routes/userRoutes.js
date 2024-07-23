const userController = require('../controllers/userContoller');
const express = require('express');
const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/signin',userController.loginUser);
 

module.exports = router;

