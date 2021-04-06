const jwt = require('jsonwebtoken');
const SECRET_JWT = process.env.SECRET_JWT

function signJwt(payload) {
    return jwt.sign(payload, SECRET_JWT)
}

function verifyJwt(token) {
    return jwt.verify(token, SECRET_JWT)
}

module.exports = {
    signJwt,
    verifyJwt
}