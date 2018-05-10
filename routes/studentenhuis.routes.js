//
// routes.js
//
let routes = require('express').Router()
const StudentenhuisController = require('../controllers/studentenhuis.controller')
const MaaltijdController = require('../controllers/maaltijd.controller')
const DeelnemerController = require('../controllers/deelnemer.controller')

/** 
 * studentenhuis routes 
 */
routes.post('/studentenhuis', StudentenhuisController.create)
routes.get('/studentenhuis', StudentenhuisController.getAll)
routes.get('/studentenhuis/:huisId', StudentenhuisController.getById)
routes.put('/studentenhuis/:huisId', StudentenhuisController.update)
routes.delete('/studentenhuis/:huisId', StudentenhuisController.delete)

/** 
 * maaltijd routes 
 */
routes.post('/studentenhuis/:huisId/maaltijd', MaaltijdController.create)
routes.get('/studentenhuis/:huisId/maaltijd', MaaltijdController.getAll)
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.getMaaltijdById)
routes.put('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.update)
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.delete)

/** 
 * deelnemers routes. 
 * Een deelnemer is een user die mee-eet bij een maaltijd in een studentenhuis. 
 */
routes.post('/studentenhuis/:huisId/maaltijd/:maaltijdId', DeelnemerController.create)
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', DeelnemerController.getAll)
// routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId', DeelnemerController.getById)
// routes.put('/studentenhuis/:huisId/maaltijd/:maaltijdId', DeelnemerController.update)
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId', DeelnemerController.delete)

module.exports = routes