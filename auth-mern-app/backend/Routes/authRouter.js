const router = require('express').Router();
const authControler = require('../Controllers/authController.js')

router.post('/signup', authControler.signupControl)
router.post('/login', authControler.loginControl)

module.exports = router;