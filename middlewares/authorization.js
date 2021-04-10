const {Task} = require('../models');

function authorize(req, res, next) {

    Task.findByPk(+req.params.id)
    .then((foundTask) => {
        console.log(req.loggedUser.id, "<<<<<<<<<<<<<<<<<")
        if (foundTask) {
            if (foundTask.userId === req.loggedUser.id) {
                next()
            } else {
                throw {name: "unauthorized", status: 401}
            }
        } else {
            throw {name: "not found"}
        }
    })
    .catch((err) => {
        const name = err.name
        const status = err.status
        next({name, status})
    })
}

module.exports = authorize