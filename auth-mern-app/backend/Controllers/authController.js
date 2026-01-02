const User = require('../Models/user');
const {createSecretToken} = require('../util/secretToken.js');
const bcrypt = require('bcrypt')


module.exports.signupControl = async (req,res) => {

    try {
        const {email, password, username} = req.body;
        const existingUser = await User.findOne({email});
        
        if (existingUser) {
            return res.status(409).json({message: 'User already exists', success: false});
        }

        const user = new User({email, password, username});
        await user.save();
        // const token = createSecretToken(user);

        res.status(201)
           .json({message: 'User signed up successfully', success:true});

    } catch (error) {
        res.status(500)
           .json({message: 'Internal server error', success: false});
    }
}
module.exports.loginControl = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(403)
            .json({message: 'Incorrect password or email', success: false});
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            return res.status(403)
            .json({message: 'Incorrect password or email', success: false});
        }

        const jwtToken = createSecretToken(user);

        res.status(200)
           .json({
                message:'User logged in successfully', 
                success: true,
                jwtToken,
                email,
                name: user.username
            })
    } catch (error) {
        res.status(500)
           .json({message: 'Internal server error', success: false});
    }
}