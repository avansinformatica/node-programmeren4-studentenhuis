//
// CRUD operations
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
            // Hier moeten meer validaties komen.
        } catch (ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }

        try {
            const huisId = req.params.huisId
            const userId = req.user.id
            const query = 'INSERT INTO `maaltijd` (Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID) VALUES (?, ?, ?, ?, ?, ?, ?)'
            const values = [req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs, userId, huisId]
            db.query(query, values,
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
    getAll(req, res, next) {
        try {
            const huisId = req.params.huisId
            const query = 'SELECT ID, Naam, Beschrijving, Ingredienten, Allergie, Prijs FROM maaltijd WHERE StudentenhuisID = ?'
            const values = [huisId]
            db.query(query, values,
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412)
                        next(error);
                    } else {
                        res.status(200).json(rows).end()
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
    getMaaltijdById(req, res, next) {

        try {
            const huisId = req.params.huisId
            const maaltijdId = req.params.maaltijdId
            const query = 'SELECT ID, Naam, Beschrijving, Ingredienten, Allergie, Prijs FROM maaltijd WHERE StudentenhuisID = ? AND ID = ?'
            const values = [huisId, maaltijdId]
            db.query(query, values,
                (err, rows, fields) => {
                    if (err) {
                        const error = new ApiError(err, 412)
                        next(error);
                    }
                    if (rows.length === 0) {
                        const error = new ApiError('Non-exiting maaltijd or not allowed to access it.', 404)
                        next(error);
                    } else {
                        res.status(200).json(rows[0]).end()
                    }
                })
        } catch (ex) {
            console.log(ex)
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