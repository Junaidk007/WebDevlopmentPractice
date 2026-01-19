const Task = require('../models/Task');
const User = require('../models/User');

// Get all tasks
module.exports.getAllTasks = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role == 'user') {
            const tasks = await Task.find({ createdBy: userId }).populate('createdBy');
            return res.status(200).json({ tasks, success: true });
        } else {
            const tasks = await Task.find().populate('createdBy');
            return res.status(200).json({ tasks, success: true });
        }

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

// Create a task
module.exports.createTasks = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        const newTask = new Task({
            title,
            description,
            priority,
            dueDate,
            createdBy: req.user.userId
        })
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}