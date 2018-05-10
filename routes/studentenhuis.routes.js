//
// Person.routes.js
//
let routes = require('express').Router()
let StudentenhuisController = require('../controllers/studentenhuis.controller')

// hier schrijven we router endpoints
routes.get('/studentenhuis', StudentenhuisController.getAllForUser)
routes.post('/studentenhuis', StudentenhuisController.create)

routes.get('/studentenhuis/:id', StudentenhuisController.getById)
routes.put('/studentenhuis/:id', StudentenhuisController.update)
routes.delete('/studentenhuis/:id', StudentenhuisController.delete)

module.exports = routes