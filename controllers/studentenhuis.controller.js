//
// CRUD operations
//
'use strict';

const ApiError = require('../model/ApiError')
const assert = require('assert')
const db = require('../config/db')
const logger = require('../config/config').logger

module.exports = {

    create(req, res, next) {

        logger.debug('req.user = ', req.user)
        try {
            assert(req.user && req.user.id, 'User ID is missing!')
            assert(typeof (req.body) === 'object', 'request body must have an object containing naam and adres.')
            assert(typeof (req.body.naam) === 'string', 'naam must be a string.')
            assert(typeof (req.body.adres) === 'string', 'adres must be a string.')
            assert(typeof (req.body.lat) === 'string', 'lat must be a string.')
            assert(typeof (req.body.long) === 'string', 'long must be a string.')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }

        try {
            db.query('INSERT INTO `studentenhuis` (`Naam`, `Adres`, `UserID`, `Lat`, `Long`) VALUES (?,?,?,?,?)', 
                [req.body.naam, req.body.adres, req.user.id, req.body.lat, req.body.long],
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err.toString(), 412)
                        next(error);
                    } else {
                        res.status(200).json({
                            status: rows
                        }).end()
                    }
                })
        } catch (ex) {
            logger.error(ex)
            const error = new ApiError(ex, 500)
            next(error);
        }
    },

    /**
     * Haal alle items op voor de user met gegeven id. 
     * De user ID zit in het request na validatie! 
     */
    getAll(req, res, next) {

        try {
            db.query('SELECT * FROM view_studentenhuis',
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412)
                        next(error);
                    } else {
                        res.status(200).json({result: rows}).end()
                    }
                })
        } catch (ex) {
            logger.error(ex)
            const error = new ApiError(ex, 500)
            next(error);
        }
    },

    /**
     * Haal alle items op voor de user met gegeven id. 
     * De user ID zit in het request na validatie! 
     */
    getById(req, res, next) {
        try {
            assert(req.params.huisId, 'ID is missing!')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }

        try {
            db.query('SELECT * FROM view_studentenhuis WHERE ID = ?', [req.params.huisId],
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412)
                        next(error);
                    } else {
                        res.status(200).json({ result: rows[0] }).end()
                    }
                })
        } catch (ex) {
            logger.error(ex)
            const error = new ApiError(ex, 412)
            next(error);
        }
    },

    /**
     * Replace an existing object in the database.
     */
    update(req, res, next) {

        // req moet de juiste attributen hebben - het nieuwe studentenhuis
        try {
            assert(req.user && req.user.id, 'User ID is missing!')
            assert(typeof (req.body) === 'object', 'request body must have an object containing naam and adres.')
            assert(typeof (req.body.naam) === 'string', 'naam must be a string.')
            assert(typeof (req.body.adres) === 'string', 'adres must be a string.')
            assert(typeof (req.body.lat) === 'string', 'lat must be a string.')
            assert(typeof (req.body.long) === 'string', 'long must be a string.')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }
        // Hier hebben we de juiste body als input.

        const ID = req.params.huisId
        // 1. Zoek in db of studentenhuis met huisId bestaat
        try {
            db.query('SELECT * FROM view_studentenhuis WHERE ID = ?', [ ID ],
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412)
                        next(error);
                    } else {
                        // rows MOET hier 1 waarde bevatten - nl. het gevonden studentenhuis.
                        if(rows.length !== 1) {
                            // zo nee, dan error 
                            const error = new ApiError(err, 404)
                            next(error);
                        } else {
                            // zo ja, dan
                            // - check eerst of de huidige user de 'eigenaar' van het studentenhuis is
                            if(rows[0].UserID !== req.user.id) {
                                //  - zo nee, error
                                const error = new ApiError(err, 412)
                                next(error);
                            } else {
                                //  - zo ja, dan SQL query UPDATE
                                db.query(
                                    'UPDATE studentenhuis SET Naam = ? WHERE ID = ?', 
                                    [ req.body.naam, req.params.huisId], 
                                    (err, rows, fields) => {
                                        if(err) {
                                            // handle error
                                            const error = new ApiError(err, 412)
                                            next(error);
                                        } else {
                                            // handle success
                                            res.status(200).json({ result: rows }).end()
                                        }
                                })
                            }
                        }
                    }
                })
        } catch (ex) {
            logger.error(ex)
            const error = new ApiError(ex, 500)
            next(error);
        }
    },

    delete(req, res, next) {
        res.status(400).json({
            msg: 'Not implemented yet!'
        }).end()
    }

}