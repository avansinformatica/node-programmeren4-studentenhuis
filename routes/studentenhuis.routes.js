//
// routes.js
//
let routes = require('express').Router()
const StudentenhuisController = require('../controllers/studentenhuis.controller')
const MaaltijdController = require('../controllers/maaltijd.controller')
const DeelnemerController = require('../controllers/deelnemer.controller')

/**
 * @typedef ApiError
 * @property {string} message - De tekst van de foutmelding.
 * @property {integer} code - HTTP error code
 * @property {string} datetime - De datum en tijd in ISO notatie.
 */

/**
 * @typedef Studentenhuis
 * @property {string} naam - De naam van het studentenhuis
 * @property {string} adres - Straatnaam en huisnummer van het studentenhuis
 */

/**
 * @typedef StudentenhuisResponse
 * @property {number} ID - De ID van het studentenhuis
 * @property {string} naam - De naam van het studentenhuis
 * @property {string} adres - Straatnaam en huisnummer van het studentenhuis
 * @property {string} admin - De voor en achternaam van de gebruiker die het studentenhuis heeft aangemaakt.
 * @property {string} email - Email van de gebruiker die het studentenhuis heeft aangemaakt.
 */

/**
 * @typedef Maaltijd
 * @property {string} naam - Naam van de maaltijd
 * @property {string} beschrijving - Korte beschrijving van de maaltijd.
 * @property {string} ingredienten - Ingredienten van de maaltijd, komma gescheiden.
 * @property {string} allergie - Allergie informatie van de maaltijd.
 * @property {number} prijs - Prijs van de maaltijd (alleen in hele getallen).
 */

/**
 * @typedef MaaltijdResponse
 * @property {string} naam - Naam van de maaltijd
 * @property {string} beschrijving - Korte beschrijving van de maaltijd.
 * @property {string} ingredienten - Ingredienten van de maaltijd, komma gescheiden.
 * @property {string} allergie - Allergie informatie van de maaltijd.
 * @property {number} prijs - Prijs van de maaltijd (alleen in hele getallen).
 */

/**
 * @typedef Deelnemer
 * @property {string} token - Een geldig gegenereerd JWT token.
 * @property {string} email - Het email adres dat de gebruiker heeft opgegeven.
 */

/**
 * @typedef DeelnemerResponse
 * @property {string} token - Een geldig gegenereerd JWT token.
 * @property {string} email - Het email adres dat de gebruiker heeft opgegeven.
 */

/**
 * Maak een nieuw studentenhuis. De gebruiker die het studentenhuis aanmaakt wordt bij het studentenhuis opgeslagen.
 * De correctheid van de informatie die wordt gegeven moet door de server gevalideerd worden. 
 * Bij ontbrekende of foutieve invoer wordt een juiste foutmelding geretourneerd.
 * Authenticatie door middel van JWT vereist.
 * 
 * @route POST /api/studentenhuis
 * @group Studentenhuis - Endpoints voor CRUD functionaliteit op een studentenhuis.
 * @param {Studentenhuis.model} studentenhuis.body.required - Een object in de request body met de gegevens van het studentenhuis.
 * @returns {StudentenhuisResponse.model} 200 - Het toegevoegde studentenhuis met ID en gebruikersinfo
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.post('/studentenhuis', StudentenhuisController.create)

/**
 * Retourneer een lijst met alle studentenhuizen.
 * Authenticatie door middel van JWT vereist.
 * 
 * @route GET /api/studentenhuis
 * @group Studentenhuis - Endpoints voor CRUD functionaliteit op een studentenhuis.
 * @returns {Studentenhuis.model} 200 - Een array met studentenhuizen.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.get('/studentenhuis', StudentenhuisController.getAll)

/**
 * Retourneer het studentenhuis met de gegeven huisId.
 * Authenticatie door middel van JWT vereist.
 * 
 * @route GET /api/studentenhuis
 * @group Studentenhuis - Endpoints voor CRUD functionaliteit op een studentenhuis.
 * @returns {Studentenhuis.model} 200 - Het studentenhuis met de gegeven huisId.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.get('/studentenhuis/:huisId', StudentenhuisController.getById)

/**
 * Vervang het studentenhuis met de gegeven huisId.
 * De correctheid van de informatie die wordt gegeven moet door de server gevalideerd worden. 
 * Bij ontbrekende of foutieve invoer wordt een juiste foutmelding geretourneerd.
 * Authenticatie door middel van JWT vereist.
 * 
 * @route PUT /api/studentenhuis/{huisId}
 * @group Studentenhuis - Endpoints voor CRUD functionaliteit op een studentenhuis.
 * @param {Studentenhuis.model} studentenhuis.body.required - Het gewijzigde studentenhuis.
 * @returns {StudentenhuisResponse.model} 200 - Het gewijzigde studentenhuis.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.put('/studentenhuis/:huisId', StudentenhuisController.update)

/**
 * Verwijder het studentenhuis met de gegeven huisId.
 * Let op: Een gebruiker kan alleen zijn eigen studentenhuis verwijderen!
 * Authenticatie door middel van JWT vereist.
 * 
 * @route DELETE /api/studentenhuis/{huisId}
 * @group Studentenhuis - Endpoints voor CRUD functionaliteit op een studentenhuis.
 * @returns {object} 200 - Info dat de verwijderis is gelukt.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  409 - Conflict (Gebruiker mag deze data niet verwijderen)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.delete('/studentenhuis/:huisId', StudentenhuisController.delete)

/**
 * Maak een nieuwe maaltijd voor een studentenhuis.
 * De correctheid van de informatie die wordt gegeven moet door de server gevalideerd worden. 
 * Bij ontbrekende of foutieve invoer wordt een juiste foutmelding geretourneerd.
 * Authenticatie door middel van JWT vereist.
 * 
 * @route POST /api/studentenhuis/{huisId}/maaltijd
 * @group Maaltijd - Endpoints voor CRUD functionaliteit op een maaltijd.
 * @param {Maaltijd.model} maaltijd.body.required - Een object in de request body met de gegevens van de maaltijd
 * @returns {Maaltijd.model} 200 - De maaltijd die toegevoegd is
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.post('/studentenhuis/:huisId/maaltijd', MaaltijdController.create)

/**
 * Retourneer alle maaltijden voor een studentenhuis. 
 * Authenticatie door middel van JWT vereist.
 * 
 * @route GET /api/studentenhuis/{huisId}/maaltijd
 * @group Maaltijd - Endpoints voor CRUD functionaliteit op een maaltijd.
 * @param {string} email.body.required - emailadres
 * @param {string} password.body.required - password
 * @returns {ValidToken.model} 200 - Token informatie
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.get('/studentenhuis/:huisId/maaltijd', MaaltijdController.getAll)

/**
 * Retourneer de maaltijd met het gegeven maaltijdId.
 * Authenticatie door middel van JWT vereist.
 * 
 * @route GET /api/studentenhuis/{huisId}/maaltijd
 * @group Maaltijd - Endpoints voor CRUD functionaliteit op een maaltijd.
 * @param {string} email.body.required - emailadres
 * @param {string} password.body.required - password
 * @returns {ValidToken.model} 200 - Token informatie
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.getMaaltijdById)

/**
 * Vervang de maaltijd met het gegeven maaltijdId door de nieuwe maaltijd in de request body.
 * De correctheid van de informatie die wordt gegeven moet door de server gevalideerd worden.
 * Bij ontbrekende of foutieve invoer wordt een juiste foutmelding geretourneerd.
 * Let op: een gebruiker kan alleen zijn eigen maaltijden vervangen! 
 * Authenticatie door middel van JWT vereist. 
 * 
 * @route PUT /api/studentenhuis/{huisId}/maaltijd/{maaltijdId}
 * @group Maaltijd - Endpoints voor CRUD functionaliteit op een maaltijd.
 * @param {Maaltijd.model} maaltijd.body.required - De nieuwe maaltijd
 * @returns {ValidToken.model} 200 - Token informatie
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.put('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.update)

/**
 * Verwijder de maaltijd met het gegeven maaltijdId.
 * Authenticatie door middel van JWT vereist. 
 * Let op: een gebruiker kan alleen zijn eigen maaltijden vervangen! 
 * 
 * @route DELETE /api/studentenhuis/{huisId}/maaltijd/{maaltijdId}
 * @group Maaltijd - Endpoints voor CRUD functionaliteit op een maaltijd.
 * @returns {ValidToken.model} 200 - Token informatie
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.delete)

/**
 * Meld je aan voor een maaltijd in een studentenhuis. 
 * De user ID uit het token is dat van de gebruiker die zich aanmeldt. 
 * Die gebruiker wordt dus aan de lijst met aanmelders toegevoegd. 
 * Een gebruiker kan zich alleen aanmelden als hij niet al aan de maaltijd deelneemt; anders volgt een foutmelding.
 * Authenticatie door middel van JWT vereist. 
 * 
 * @route POST /api/studentenhuis/{huisId}/maaltijd/{maaltijdId}
 * @group Deelnemers - Endpoints voor CRUD functionaliteit op een deelnemers aan een maaltijd.
 * @returns {ValidToken.model} 200 - Token informatie
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.post('/studentenhuis/:huisId/maaltijd/:maaltijdId', DeelnemerController.create)

/**
 * Geef de lijst met deelnemers voor de maaltijd met gegeven maaltijdID in het studentenhuis met huisId. 
 * Deelnemers zijn geregistreerde gebruikers die zich hebben aangemeld voor deze maaltijd.
 * Authenticatie door middel van JWT vereist.
 * 
 * @route GET /api/studentenhuis/{huisId}/maaltijd/{maaltijdId}/deelnemers
 * @group Deelnemers - Endpoints voor CRUD functionaliteit op een deelnemers aan een maaltijd.
 * @returns {Deelnemer.model} 200 - Een array met deelnemers aan de gegeven maaltijd in het gegeven studentenhuis.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', DeelnemerController.getAll)

/**
 * Verwijder een deelnemer.
 * De deelnemer die wordt verwijderd is de gebruiker met het ID uit het token.
 * De payload in het token moet daarom de gebruikers ID bevatten.
 * Een gebruiker kan alleen zijn eigen aanmelding verwijderen. 
 *  
 * Authenticatie door middel van JWT vereist. 
 * 
 * @route DELETE /api/studentenhuis/{huisId}/maaltijd/{maaltijdId}/deelnemers
 * @group Deelnemers - Endpoints voor CRUD functionaliteit op een deelnemers aan een maaltijd.
 * @returns {ValidToken.model} 200 - Token informatie
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId', DeelnemerController.delete)

module.exports = routes