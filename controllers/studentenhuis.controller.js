//
// CRUD operations
//
const ApiError = require('../model/ApiError')
const assert = require('assert')
const db = require('../config/db')
const logger = require('../config/config').logger

module.exports = {

    create(req, res, next) {

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
            const error = new ApiError(ex, 412)
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
            const error = new ApiError(ex, 412)
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
        res.status(200).json({
            msg: 'Not implemented yet!'
        }).end()
    },

    delete(req, res, next) {
        res.status(200).json({
            msg: 'Not implemented yet!'
        }).end()
    }

}