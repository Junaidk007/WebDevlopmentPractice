const express = require('express');
const { userVarification } = require('../middleware/userVarification');
const {taskValidation} = require('../middleware/taskValidation.js');
const { createTasks, getAllTasks, indivadualTask, deleteTask, updateTask } = require('../controllers/taskController');
const router = express.Router()

router.get('/tasks', userVarification, getAllTasks)

router.post('/tasks', userVarification, taskValidation, createTasks);

router.get('/tasks/:id', userVarification, indivadualTask);

router.delete('/tasks/:id', userVarification, deleteTask);

router.put('/tasks/:id', userVarification, updateTask);

module.exports = router;