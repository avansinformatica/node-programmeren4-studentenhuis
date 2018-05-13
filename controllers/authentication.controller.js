//
// Authentication controller
//
const assert = require('assert')
const ApiError = require('../model/ApiError')
const User = require('../model/User')
const auth = require('../util/auth/authentication')
const bcrypt = require('bcryptjs')
const db = require('../config/db.improved')

module.exports = {

    /**
     * Authenticate the incoming request by validating the JWT token. 
     * On success, we pass further processing to the next express handler.
     * 
     * https://www.sitepoint.com/using-json-web-tokens-node-js/
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res None. The request is passed to next for further processing.
     * @param {*} next ApiError when token is invalid, or req containing logged-in user.
     */
    validateToken(req, res, next) {
        // console.log('validateToken called')

        /**
         * A token can be sent in the body of a request, via a query parameter (in the URL),
         * or as an HTTP header. We choose the header variant.
         */
        const token = req.header('x-access-token') || ''

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                // Invalid token
                const error = new ApiError(err.message || err, 401)
                next(error)
            } else {
                console.log('Authenticated! Payload = ')
                console.dir(payload)

                /**
                 * The payload contains the values that were put in it via the sub-field.
                 * We could use those in our application to trace actions that a user performs, 
                 * such as monitor CRUD operations, by storing the user ID in a logging database.
                 * Example: User 12345 performed an update operation on item xyz on date dd-mm-yyyy.
                 * To do so, we attach the payload.sub (or only a part of that) to the request object.
                 * In this way, every next express handler has access to it - and could do 
                 * something smart with it.  
                 */
                req.user = {
                    id: payload.sub.id
                }
                next()
            }
        })
    },

    /**
     * Log a user in by validating the email and password in the request.
     * Email is supposed to be more unique than a username, so we use that for identification.
     * When the email/password combination is valid a token is returned to the client. 
     * The token provides access to the protected endpoints in subsequent requests, as long 
     * as it is valid and not expired.
     * 
     * Security issue: the password is probably typed-in by the client and sent as 
     * plain text. Anyone listening on the network could read the password. The 
     * connection should therefore be secured and encrypted.
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res The token, additional user information, and status 200 when valid.
     * @param {*} next ApiError when token is invalid.
     */
    login(req, res, next) {

        // Verify that we receive the expected input
        try {
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 422)
            next(error)
            return
        }

        db.query('SELECT `ID`, `Email`, `Password` FROM user WHERE Email = ?', [req.body.email], (err, rows, fields) => {
            if (err) {
                const error = new ApiError(err, 500)
                next(error);
            } else {
                // Login kan alleen als het emailadres bestaat
                // Was er een resultaat? Zo ja, check het password.
                // console.log('Result from database: ')
                // console.dir(rows)
                // console.log('password = ' + rows[0].Password)
                if (rows && rows.length === 1 && rows[0].Email !== undefined) {
                    bcrypt.compare(req.body.password, rows[0].Password, (err, success) => {
                        if (success) {
                            console.log('passwords DID match, sending valid token')
                            // Create an object containing the data we want in the payload.
                            const payload = {
                                user: rows[0].Email,
                                id: rows[0].ID
                            }
                            // Userinfo returned to the caller.
                            const userinfo = {
                                token: auth.encodeToken(payload),
                                email: rows[0].Email
                            }
                            res.status(200).json(userinfo).end()
                        } else {
                            next(new ApiError('Password did not match.', 401))
                        }
                    })
                } else {
                    next(new ApiError('Email does not exist.', 401))
                }

            }
        })
    },

    /**
     * Register a new user. The user should provide a firstname, lastname, emailaddress and 
     * password. The emailaddress should be unique when it exists, an error must be thrown.
     * The password will be encrypted by the User class and must never be stored as plain text! 
     * 
     * @param {*} req The incoming request, containing valid properties.
     * @param {*} res The created user on success, or error on invalid properties.
     * @param {*} next ApiError when supplied properties are invalid.
     */
    register(req, res, next) {
        // console.log('register')
        // console.log(req.body)
        try {
            assert(typeof (req.body.firstname) === 'string', 'firstname must be a string.')
            assert(typeof (req.body.lastname) === 'string', 'lastname must be a string.')
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 412)
            next(error)
            return
        }

        db.query('SELECT `Email` FROM user WHERE Email = ?', [req.body.email], (err, rows, fields) => {
            if (err) {
                const error = new ApiError(err, 412)
                next(error);
            } else {
                // console.log('found results')
                // console.dir(rows)

                if (rows.length > 0) {
                    const error = new ApiError('Email already exists', 412)
                    next(error);
                } else {
                    /**
                     * User constructor could throw an exception
                     */
                    try {
                        const user = new User(
                            req.body.firstname,
                            req.body.lastname,
                            req.body.email,
                            req.body.password
                        )
                        console.dir(user)

                        db.query('INSERT INTO `user` (Voornaam, Achternaam, Email, Password) VALUES (?, ?, ?, ?)', [user.name.firstname, user.name.lastname, user.email, user.password],
                            (err, rows, fields) => {
                                if (err) {
                                    const error = new ApiError(err, 412)
                                    next(error);
                                } else {
                                    // Create an object containing the data we want in the payload.
                                    const payload = {
                                        user: user.email,
                                        id: rows.insertId
                                    }
                                    // Userinfo returned to the caller.
                                    const userinfo = {
                                        token: auth.encodeToken(payload),
                                        email: user.email
                                    }
                                    res.status(200).json(userinfo).end()
                                }
                            })
                    } catch (ex) {
                        next(ex)
                    }
                }
            }
        })
    }

}