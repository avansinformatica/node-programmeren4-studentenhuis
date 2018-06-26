//
// User routes
//
'use strict';

let routes = require('express').Router()
let UserController = require('../controllers/user.controller')

// hier schrijven we router endpoints
routes.get('/users', UserController.getAllUsers)
routes.post('/users', UserController.createUser)

routes.get('/users/:id', UserController.getUserById)
routes.put('/users/:id', UserController.updateUserById)
routes.delete('/users/:id', UserController.deleteUserById)

module.exports = routes