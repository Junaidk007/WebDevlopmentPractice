const router = require('express').Router();
// const User = require('../Models/user.js');
const {userVerification} = require('../Middleware/authMiddleware.js')

router.get('/', userVerification, async (req,res) => {
    const {username, email} = req.user;

    res.status(200).json({
        name : username,
        email : email
    })
})

module.exports = router;