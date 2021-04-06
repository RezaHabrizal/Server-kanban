module.exports = ((err, req, res, next) => {
    switch (err.name) {
        case "user not found in login":
            res.status(404).json({message: "invalid username/password"})
            break
        case "bad request login": 
            res.status(400).json({message: "invalid username/password"})
            break
        case "SequelizeUniqueConstraintError":
            res.status(409).json({message: err.message})
            break
        case "SequelizeValidationError":
            res.status(409).json({messages: err.message})
            break
        case "Invalid Access Token": 
            res.status(403).json({message: err.name})
            break
        case "JsonWebTokenError":
            res.status(401).json({message: (err.message) ? `${err.message} login first` : "login first"})
            break
        case "unauthorized": 
            res.status(`${err.status}`).json({message: err.name})
            break
        case "not found":
            res.status(404).json({message: "not found"})
            break
        default:
            res.status(500).json({message: err || "Internal Server Error"})
    }
})