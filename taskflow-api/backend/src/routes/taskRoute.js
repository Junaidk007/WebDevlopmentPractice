const express = require('express');
const { userVarification } = require('../middleware/userVarification');
const { taskValidation } = require('../middleware/taskValidation.js');
const { createTasks, getAllTasks, indivadualTask, deleteTask, updateTask } = require('../controllers/taskController');
const wrapAsync = require('../utils/wrapAsync.js');
const router = express.Router()


router.get('/tasks', userVarification, wrapAsync(getAllTasks))

router.post('/tasks', userVarification, taskValidation, wrapAsync(createTasks));

router.get('/tasks/:id', userVarification, wrapAsync(indivadualTask));

router.delete('/tasks/:id', userVarification, wrapAsync(deleteTask));

router.put('/tasks/:id', userVarification, wrapAsync(updateTask));

module.exports = router;




// router.get('/init/data', userVarification, async (req, res) => {
//     try {
//         const Task = require('../models/Task');
//         for (let i = 1; i <= 15; i++) {
//             await Task.create({
//                 title: `Sample Task ${i}`,
//                 description: `This is a description for Sample Task ${i}`,
//                 dueDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
//                 createdBy: req.user.userId
//             });
//         }

//         res.status(201).json({ message: 'Sample tasks created successfully', success: true });
//     } catch (error) {
//         res.status(500).json({ message: error.message, success: false });
//     }
// })