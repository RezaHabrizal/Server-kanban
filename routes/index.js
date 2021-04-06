const Router = require('express').Router();
const UserController = require('../controllers/userController');
const TaskController = require('../controllers/taskController');
const authenticate = require('../middlewares/authentication');
const authorize = require('../middlewares/authorization');

Router.post('/login', UserController.login)
Router.post('/register', UserController.register)
Router.post('/googlelogin', UserController.googleLogin)

Router.use(authenticate)

Router.get('/tasks', TaskController.showAll)
Router.post('/tasks', TaskController.create)

Router.use('/tasks/:id', authorize)
Router.delete('/tasks/:id', TaskController.delete)
Router.put('/tasks/:id', TaskController.update)

module.exports = Router