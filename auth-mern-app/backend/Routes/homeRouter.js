const router = require('express').Router();
// const User = require('../Models/user.js');
const {userVerification} = require('../Middleware/authMiddleware.js')

router.get('/', userVerification, async (req,res) => {
    const {username, email} = req.user;

    res.status(200).json({
        email : email,
        status : 'Student',
        description : '2nd year BCA student and a web developer.'
    })
})

module.exports = router;