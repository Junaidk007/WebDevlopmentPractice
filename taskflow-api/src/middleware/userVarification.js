const jwt = require('jsonwebtoken');

module.exports.userVarification = (req,res,next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({message: 'Unauthorized', success: false});

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        next(); 
    } catch (e) {
        return res.status(401).json({message: 'Invalid token', success: false});
    }
}