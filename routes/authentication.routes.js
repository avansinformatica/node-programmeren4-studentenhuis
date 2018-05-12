//
// Authentication routes
//
const routes = require('express').Router();
const AuthController = require('../controllers/authentication.controller')

/**
 * @typedef ApiError
 * @property {string} message - De tekst van de foutmelding.
 * @property {integer} code - HTTP error code
 * @property {string} datetime - De datum en tijd in ISO notatie.
 */

/**
 * @typedef ValidToken
 * @property {string} token - Een geldig gegenereerd JWT token.
 * @property {string} email - Het email adres dat de gebruiker heeft opgegeven.
 */

/**
 * Login.Vereist een JSON object in de request body, met daarin de properties 
 * email en password.Deze zijn hieronder beschreven.
 * @route POST /api/login
 * @group Authentication - Endpoints voor login en registratie.
 * @param {string} email.body.required - emailadres
 * @param {string} password.body.required - password
 * @returns {ValidToken.model} 200 - Token informatie
 * @returns {ApiError.model}  401 - Not authenticated
 */
routes.post('/login', AuthController.login)

/**
 * Register. Vereist een JSON object in de request body, met daarin de properties 
 * firstname, lastname, email en password. Deze zijn hieronder beschreven.
 *  
 * @route POST /api/register
 * @group Authentication - Endpoints voor login en registratie.
 * @param {string} firstname.body.required - User's firstname.
 * @param {string} lastname.body.required - User's lastname.
 * @param {string} email.body.required - User's emailadres
 * @param {string} password.body.required - User's password.
 * @returns {ValidToken.model} 200 - Token informatie
 * @returns {ApiError.model} 401 - Not authenticated
 */
routes.post('/register', AuthController.register)

module.exports = routes