const express = require('express');
const { userVarification } = require('../middleware/userVarification');
const router = express.Router()

router.get('/', userVarification, (req,res) => {
    res.send('hello');
})

module.exports = router;