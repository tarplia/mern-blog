const jwt = require('jsonwebtoken');
const key = require('./keys').secretOrKey;

const generateAccessToken = (username) => {
    return jwt.sign(username, key, {expiresIn: '18000s'});
}

module.exports = generateAccessToken;