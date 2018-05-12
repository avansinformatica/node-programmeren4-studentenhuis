//
// Authentication routes
//
const routes = require('express').Router();
const AuthController = require('../controllers/authentication.controller')

/**
 * @typedef UserLoginJSON
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef UserRegisterJSON
 * @property {string} firstname.required
 * @property {string} lastname.required
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef ApiError
 * @property {string} message.required
 * @property {integer} code.required
 * @property {string} datetime
 */

/**
 * @typedef ValidToken
 * @property {string} token.required
 * @property {string} email.required
 */

/**
 * Login.Vereist een JSON object in de request body, met daarin de properties 
 * email en password.Deze zijn hieronder beschreven.
 * 
 * @route POST /api/login
 * @group Authentication - Endpoints voor login en registratie.
 * @param {UserLoginJSON.model} user.body.required - De userinformatie waarmee je inlogt
 * @returns {ValidToken.model} 200 - Token informatie
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.post('/login', AuthController.login)

/**
 * Register. Vereist een JSON object in de request body, met daarin de properties 
 * firstname, lastname, email en password. Deze zijn hieronder beschreven.
 *  
 * @route POST /api/register
 * @group Authentication - Endpoints voor login en registratie.
 * @param {UserRegisterJSON.model} user.body.required - De userinformatie waarmee je registreert
 * @returns {ValidToken.model} 200.OK - Token informatie
 * @returns {ApiError.model} 401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model} 412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.post('/register', AuthController.register)

module.exports = routes