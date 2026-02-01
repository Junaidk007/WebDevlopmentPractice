const Joi = require('joi');
const ApiError = require('../utils/apiError.js');

const signupValidation = (req, res, next) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required().messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 3 characters',
            'string.max': 'Name must be less than 30 characters'
        }),
        email: Joi.string().email().lowercase().required().messages({
            'string.email': 'Enter a valid email',
            'string.empty': 'Email is required'
        }),
        password: Joi.string()
            .pattern(passwordRegex)
            .required()
            .messages({
                'string.pattern.base':
                    'Password must be 8-16 characters long and include uppercase, lowercase, number, and special character',
                'string.empty': 'Password is required'
            }),
        role: Joi.string().valid('user', 'admin').required().messages({
            'any.only': 'Role must be either user or admin',
            'string.empty': 'Role is required'
        })    
    })
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ApiError(error.details[0].message, 400);
    }
    next();
}

const loginValidation = (req, res, next) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    const schema = Joi.object({
        email: Joi.string().email().lowercase().required().messages({
            'string.email': 'Enter a valid email',
            'string.empty': 'Email is required'
        }),
        password: Joi.string()
            .pattern(passwordRegex)
            .required()
            .messages({
                'string.pattern.base':
                    'Password must be 8-16 characters long and include uppercase, lowercase, number, and special character',
                'string.empty': 'Password is required'
            })
    })
    const { error } = schema.validate(req.body);
    if (error) {
        throw new ApiError(error.details[0].message, 400);
    }
    next();
}

module.exports = { signupValidation, loginValidation };