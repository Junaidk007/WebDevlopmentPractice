const express = require('express');
const { signupController, loginController } = require('../controllers/authController.js');  
const {signupValidation, loginValidation} = require('../middleware/authValidation.js');
const wrapAsync = require('../utils/wrapAsync.js');
const router = express.Router();

router.post('/register', signupValidation, wrapAsync(signupController));

router.post('/login', loginValidation, wrapAsync(loginController));

module.exports = router;