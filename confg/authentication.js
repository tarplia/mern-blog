const jwt = require('jsonwebtoken');
const key = require('./keys').secretOrKey;

const generateAccessToken = (username) => {
    return jwt.sign(username, key, {expiresIn: '1800s'});
}

module.exports = generateAccessToken;