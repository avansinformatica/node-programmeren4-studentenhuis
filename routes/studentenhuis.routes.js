//
// routes.js
//
let routes = require('express').Router()
const StudentenhuisController = require('../controllers/studentenhuis.controller')
const MaaltijdController = require('../controllers/maaltijd.controller')

/** 
 * studentenhuis routes 
 */
routes.get('/studentenhuis', StudentenhuisController.getAllForUser)
routes.post('/studentenhuis', StudentenhuisController.create)
routes.get('/studentenhuis/:huisId', StudentenhuisController.getById)
routes.put('/studentenhuis/:huisId', StudentenhuisController.update)
routes.delete('/studentenhuis/:huisId', StudentenhuisController.delete)

/** 
 * maaltijd routes 
 */
routes.get('/studentenhuis/:huisId/maaltijd', MaaltijdController.getAllForUser)
routes.post('/studentenhuis/:huisId/maaltijd', MaaltijdController.create)
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.getMaaltijdById)
routes.put('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.update)
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.delete)

module.exports = routes