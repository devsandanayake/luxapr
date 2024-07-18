const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/signin',userController.loginUser);
 

module.exports = router;

