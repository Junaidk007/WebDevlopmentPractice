const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const { createSecretToken } = require('../utils/createToken.js');
const ApiError = require('../utils/apiError.js');

module.exports.signupController = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) throw new ApiError('User already exists', 409);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role
    });

    await newUser.save();

    res.status(201).json({
        message: "User created successfully",
        success: true
    })
}

module.exports.loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
        throw new ApiError('User not found, please signup', 404);
    }

    // password verification 
    const isVerified = await bcrypt.compare(password, user.password);

    if (!isVerified) throw new ApiError('Invalid credentials', 401);

    // create token
    const jwtToken = createSecretToken(user);

    res.status(200).json({
        message: 'Login successful',
        success: true,
        token: jwtToken
    })
}