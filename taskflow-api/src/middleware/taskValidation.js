const Joi = require('joi');

module.exports.taskValidation = (req,res,next) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(100).required(),
        description: Joi.string().max(500).optional(),
        dueDate: Joi.date().greater('now').required()
    })

    next();
}