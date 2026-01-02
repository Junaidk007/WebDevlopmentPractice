const router = require('express').Router();
const authControler = require('../Controllers/authController.js')
const {userVerification} = require('../Middleware/authMiddleware.js')
const {signupValidation, loginValidation} = require('../Middleware/authValidation.js')

router.post('/signup', signupValidation, authControler.signupControl)
router.post('/login', loginValidation, authControler.loginControl)
router.post('/', userVerification)

module.exports = router;