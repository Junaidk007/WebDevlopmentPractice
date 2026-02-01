const Joi = require('joi');
const ApiError = require('../utils/apiError.js');

module.exports.taskValidation = (req,res,next) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(100).required().messages({
            'string.empty': 'Title cannot be empty',
            'string.min': 'Title should have a minimum length of 5'}),
        description: Joi.string().max(500).optional(),
        priority: Joi.string().valid('low', 'medium', 'high').optional(),
        dueDate: Joi.date().greater('now').required().messages({
            'date.greater': 'Due date must be in the future'}),
    });

    const {error} = schema.validate(req.body);
    if (error) {
        throw new ApiError(error.details[0].message, 400);
    }
    next();
}