const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const {createSecretToken} = require('../utils/createToken.js');

module.exports.signupController = async (req,res) => {
    try {
        const {name, email, password, role} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(409).json({
            message: "User already exists",
            success: false
        })

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
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}        

module.exports.loginController = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        // Check if user exists
        if (!user) return res.status(404).json({
            message: 'User not found, please signup',
            success: false
        })

        // password verification 
        const isVerified = await bcrypt.compare(password, user.password);

        if (!isVerified) return res.status(401).json({
            message: 'Invalid credentials',
            success: false
        });

        // create token
        const jwtToken = createSecretToken(user);

        res.status(200).json({
            message: 'Login successful',
            success: true,
            token: jwtToken
        })
    } catch (e) {
        console.log(e); 
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}