const express = require('express');
const { userVarification } = require('../middleware/userVarification');
const { createTasks, getAllTasks } = require('../controllers/taskController');
const router = express.Router()

router.get('/tasks', userVarification, getAllTasks)

router.post('/tasks', userVarification, createTasks);

router.get('/tasks/:id', userVarification, (req,res) => {
    res.send('hello');
})
router.delete('/tasks/:id', userVarification, (req,res) => {
    res.send('hello');
})
router.put('/tasks/:id', userVarification, (req,res) => {
    res.send('hello');
})

module.exports = router;