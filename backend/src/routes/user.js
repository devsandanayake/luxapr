const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.post('/signup', userController.createUser);

module.exports = router;
