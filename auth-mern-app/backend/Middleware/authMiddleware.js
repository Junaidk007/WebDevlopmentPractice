const jwt = require('jsonwebtoken');

module.exports.userVerification = (req, res, next) => {
    const auth = req.headers['authorization'];

    if (!auth) {
        return res.status(403).json({message: 'Unauthorized, JWT token is required'});
    }

    try {
        const decoded = jwt.verify(auth, process.env.TOKEN_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({message: 'Unauthorized, JWT token is wrong or expired'});
    }
}