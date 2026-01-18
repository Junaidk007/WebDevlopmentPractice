const express = require('express');
const { signupController, loginController } = require('../controllers/authController.js');  
const {signupValidation, loginValidation} = require('../middleware/authValidation.js');
const router = express.Router();

router.post('/signup', signupValidation, signupController);

router.post('/login', loginValidation, loginController);

module.exports = router;