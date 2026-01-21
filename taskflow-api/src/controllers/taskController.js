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
            const tasks = await Task.find({ createdBy: userId }).populate('createdBy', 'name email role');
            return res.status(200).json({ tasks, success: true });
        } else {
            const tasks = await Task.find().populate('createdBy', 'name email role');
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
        const newTask = {
            title,
            description,
            dueDate,
            createdBy: req.user.userId
        }

        if (priority) {
            newTask.priority = priority;
        }
        const task = await Task.create(newTask);
        res.status(201).json({ message: 'Task created successfully', task, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

// see individual task
module.exports.indivadualTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        
        if (!task) {
            res.status(404).json({ message: 'Task not found', success: false });
        }
        
        if (task.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to view this task', success: false });
        }

        res.status(200).json({ task, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

// delete task
module.exports.deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const tasks = await Task.findById(id);
        
        if (!tasks) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }
        
        if (tasks.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to delete this task', success: false });
        }

        await Task.findByIdAndDelete(id);

        res.status(200).json({ message: 'Task deleted successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

// update task
module.exports.updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, priority, status, dueDate} = req.body;
        const task = await Task.findById(id);
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        if (task.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to update this task', success: false });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, {
            title,
            description,
            priority,
            status,
            dueDate
        }, { new: true });


        res.status(200).json({ message: 'Task updated successfully', updatedTask, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}