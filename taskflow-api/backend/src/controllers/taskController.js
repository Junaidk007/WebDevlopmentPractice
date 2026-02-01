const Task = require('../models/Task');
const User = require('../models/User');
const ApiError = require('../utils/apiError.js');

// Get all tasks
module.exports.getAllTasks = async (req, res) => {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    if (user.role == 'user') {
        const totalTasks = await Task.countDocuments({ createdBy: userId });
        const tasks = await Task.find({ createdBy: userId }).populate('createdBy', 'name email role').skip(skip).limit(limit);
        return res.status(200).json({
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit), data: tasks, success: true
        });
    } else {
        const totalTasks = await Task.countDocuments();
        const tasks = await Task.find().populate('createdBy', 'name email role').skip(skip).limit(limit);
        return res.status(200).json({
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit), data: tasks, success: true
        });
    }
}

// Create a task
module.exports.createTasks = async (req, res) => {
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
    res.status(201).json({ message: 'Task created successfully', data: task, success: true });
}

// see individual task
module.exports.indivadualTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError('Task not found', 404);
    }

    if (task.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
        throw new ApiError('You are not authorized to view this task', 403);
    }

    res.status(200).json({ task, success: true });
}

// delete task
module.exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const tasks = await Task.findById(id);

    if (!tasks) {
        throw new ApiError('Task not found', 404);
    }

    if (tasks.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
        throw new ApiError('You are not authorized to delete this task', 403);
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: 'Task deleted successfully', success: true });
}

// update task
module.exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status, dueDate } = req.body;
    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError('Task not found', 404);
    }

    if (task.createdBy.toString() !== req.user.userId && req.user.role !== 'admin') {
        throw new ApiError('You are not authorized to update this task', 403);
    }

    const updatedTask = await Task.findByIdAndUpdate(id, {
        title,
        description,
        priority,
        status,
        dueDate
    }, { new: true });


    res.status(200).json({ message: 'Task updated successfully', updatedTask, success: true });
}