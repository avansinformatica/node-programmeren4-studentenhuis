//
// Authentication routes
//
const routes = require('express').Router();
const AuthController = require('../controllers/authentication.controller')

/**
 * @typedef ApiError
 * @property {string} message - the message
 * @property {integer} code - HTTP error code
 * @property {string} color
 */

/**
 * This function comment is parsed by doctrine
 * @route POST /api/login
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {object}  401 - Not authenticated
 */
routes.post('/login', AuthController.login)

/**
 * This function comment is parsed by doctrine
 * @route POST /api/register
 * @group foo - Operations about user
 * @param {string} email.query.required - username or email
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - An array of user info
 * @returns {ApiError.model} 401 - Not authenticated
 */
routes.post('/register', AuthController.register)

module.exports = routes