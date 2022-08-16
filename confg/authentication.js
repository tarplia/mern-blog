const jwt = require('jsonwebtoken');

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.KEY, {expiresIn: '18000s'});
}

module.exports = generateAccessToken;