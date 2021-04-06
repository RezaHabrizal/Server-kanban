const {verifyJwt} = require('../helpers/jwt');
const {User} = require('../models');

function authenticate(req, res, next) {
    const token = req.headers.access_token

    if (token) {
        const decoded = verifyJwt(token)

        User.findOne({
            where: {
                id: decoded.id
            }
        })
        .then((currentUser) => {
            if (currentUser) {
                req.loggedUser = {
                    id: currentUser.id,
                    email: currentUser.email
                }
                next()
            } else {
                next({ name: "Invalid Access Token" })
            }
        })
        .catch((err) => {
            next({ name: "500" , message: err.message || "Internal Server Error"})
        })
    } else {
        next({ name: "JsonWebTokenError"})
    }
}

module.exports = authenticate