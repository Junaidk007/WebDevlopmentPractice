const jwt = require('jsonwebtoken');

module.exports.createSecretToken = (user) => {
    return jwt.sign({
        username: user.username,
        email: user.email
    }, process.env.TOKEN_KEY, {
        expiresIn: "3d"
    })
}