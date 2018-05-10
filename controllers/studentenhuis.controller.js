//
// CRUD operations on person
//
const ApiError = require('../model/ApiError')
const assert = require('assert')
const db = require('../config/db.improved')

module.exports = {

    create(req, res, next) {

        try {
            assert(req.user && req.user.id, 'User ID is missing!')
            assert(typeof (req.body) === 'object', 'request body must have an object containing naam and adres.')
            assert(typeof (req.body.naam) === 'string', 'naam must be a string.')
            assert(typeof (req.body.adres) === 'string', 'adres must be a string.')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }

        try {
            db.query('INSERT INTO `studentenhuis` (Naam, Adres, UserID) VALUES (?,?,?)', [req.body.naam, req.body.adres, req.user.id],
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412)
                        next(error);
                    } else {
                        res.status(200).json({
                            status: rows
                        }).end()
                    }
                })
        } catch (ex) {
            console.log(ex)
            const error = new ApiError(ex, 412)
            next(error);
        }
    },

    /**
     * Haal alle items op voor de user met gegeven id. 
     * De user ID zit in het request na validatie! 
     */
    getAllForUser(req, res, next) {
        try {
            assert(req.user && req.user.id, 'User ID is missing!')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }

        db.query('SELECT * FROM studentenhuis WHERE UserID = ?', [req.user.id],
            (err, rows, fields) => {
                if (err) {
                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    res.status(200).json(rows).end()
                }
            })
    },

    /**
     * Haal alle items op voor de user met gegeven id. 
     * De user ID zit in het request na validatie! 
     */
    getById(req, res, next) {
        try {
            assert(req.params.id, 'ID is missing!')
            assert(req.user && req.user.id, 'User ID is missing!')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }

        db.query('SELECT * FROM studentenhuis WHERE ID = ? AND UserID = ?', [req.params.id, req.user.id],
            (err, rows, fields) => {
                if (err) {
                    const error = new ApiError(err, 412)
                    next(error);
                } else {
                    res.status(200).json(rows).end()
                }
            })
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