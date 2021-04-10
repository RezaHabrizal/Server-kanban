const {Task, User} = require('../models');
const util = require('util');

class TaskController {
    static showAll(req, res, next) {
        Task.findAll({include: User})
        .then((tasks) => {
            res.status(200).json({tasks})
        })
        .catch((err) => {
            next({name: "500"})
        })
    }

    static create(req, res, next) {
        
        const {title, description, category, dueDate} = req.body
        
        Task.create({
            title,
            description,
            category,
            dueDate,
            userId: req.loggedUser.id
        })
        .then((newCreatedTask) => {
            res.status(201).json({newCreatedTask})
        })
        .catch((err) => {
            console.log(err)
            if (err.name === "SequelizeValidationError") {
                let errors = err.errors.map(e => {
                    return e.message
                })
                next({name: err.name, message: errors})
            } else {
                next({neme: err.name, message: err.message})
            }

        })
    }

    static delete(req, res, next) {
        Task.destroy({
            where: {
                id: +req.params.id
            }
        })
        .then((deletedTask) => {
            res.status(200).json({message: "succes deleted task"})
        })
        .catch((err) => {
            next({name: "500", message: err.message})
        })
    }

    static update(req, res, next) {
        const {title, description, category, dueDate} = req.body
        Task.findByPk(+req.params.id)
        .then((foundTask) => {

            return Task.update({title, description, category, dueDate}, {
                where: {
                    id: +req.params.id
                },
                returning: true
            })
        })
        .then((updatedTask) => {
            console.log(util.inspect(updatedTask[1][0], false, null, true))
            res.status(200).json({task: updatedTask[1][0]})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    static getEditPage(req, res, next) {
    
        Task.findByPk(+req.params.id, {include: User})
        .then((foundTask) => {
            if (foundTask) {
                res.status(200).json(foundTask)
            } else {
                next({name: "task not found"})
            }
        })
        .catch((err) => {
            next({message: err.message})
        })
    }
}

module.exports = TaskController