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
 * @property {number} code - HTTP error code
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
 * @property {string} contact - De voor en achternaam van de gebruiker die het studentenhuis heeft aangemaakt.
 * @property {string} email - Email van de gebruiker die het studentenhuis heeft aangemaakt.
 */

/**
 * @typedef Maaltijd
 * @property {string} naam - Naam van de maaltijd
 * @property {string} beschrijving - Korte beschrijving van de maaltijd.
 * @property {string} ingredienten - Ingredienten van de maaltijd, komma gescheiden.
 * @property {string} allergie - Allergie informatie van de maaltijd.
 * @property {number} prijs - Prijs van de maaltijd (alleen gehele getallen).
 */

/**
 * @typedef MaaltijdResponse
 * @property {string} naam - Naam van de maaltijd
 * @property {string} beschrijving - Korte beschrijving van de maaltijd.
 * @property {string} ingredienten - Ingredienten van de maaltijd, komma gescheiden.
 * @property {string} allergie - Allergie informatie van de maaltijd.
 * @property {number} prijs - Prijs van de maaltijd (alleen gehele getallen).
 */

/**
 * @typedef Deelnemer
 */

/**
 * @typedef DeelnemerResponse
 * @property {string} token - Een geldig gegenereerd JWT token.
 * @property {string} email - Het email adres dat de gebruiker heeft opgegeven.
 */

/**
 * Maak een nieuw studentenhuis. De ID van de gebruiker die het studentenhuis aanmaakt wordt bij het 
 * studentenhuis opgeslagen. Deze ID haal je uit het JWT token.
 * De correctheid van de informatie die wordt gegeven moet door de server gevalideerd worden. 
 * Bij ontbrekende of foutieve invoer wordt een juiste foutmelding geretourneerd.
 * Authenticatie door middel van JWT is vereist.
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
 * Retourneer een lijst met alle studentenhuizen. Iedere gebruiker kan alle studentenhuizen opvragen.
 * Authenticatie door middel van JWT is vereist.
 * 
 * @route GET /api/studentenhuis
 * @group Studentenhuis - Endpoints voor CRUD functionaliteit op een studentenhuis.
 * @returns {StudentenhuisResponse.model} 200 - Een array met studentenhuizen.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.get('/studentenhuis', StudentenhuisController.getAll)

/**
 * Retourneer het studentenhuis met de gegeven huisId. Iedere gebruiker kan alle studentenhuizen opvragen.
 * Authenticatie door middel van JWT is vereist.
 * 
 * @route GET /api/studentenhuis
 * @group Studentenhuis - Endpoints voor CRUD functionaliteit op een studentenhuis.
 * @returns {StudentenhuisResponse.model} 200 - Het studentenhuis met de gegeven huisId.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.get('/studentenhuis/:huisId', StudentenhuisController.getById)

/**
 * Vervang het studentenhuis met de gegeven huisId door de informatie van het studentenhuis 
 * dat in de body is meegestuurd. Alleen de gebruiker die het studentenhuis heeft aangemaakt
 * mag de informatie van dat studenenhuis wijzigen.
 * Deze ID haal je uit het JWT token.
 * De correctheid van de informatie die wordt gegeven moet door de server gevalideerd worden. 
 * Bij ontbrekende of foutieve invoer wordt een juiste foutmelding geretourneerd.
 * Authenticatie door middel van JWT is vereist.
 * 
 * @route PUT /api/studentenhuis/{huisId}
 * @group Studentenhuis - Endpoints voor CRUD functionaliteit op een studentenhuis.
 * @param {Studentenhuis.model} studentenhuis.body.required - De nieuwe informatie over het studentenhuis
 * @returns {StudentenhuisResponse.model} 200 - Het gewijzigde (nieuwe) studentenhuis
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.put('/studentenhuis/:huisId', StudentenhuisController.update)

/**
 * Verwijder het studentenhuis met de gegeven huisId.
 * Een gebruiker kan alleen een studentenhuis verwijderen als hij dat zelf heeft aangemaakt.
 * Deze ID haal je uit het JWT token.
 * Authenticatie door middel van JWT is vereist.
 * 
 * @route DELETE /api/studentenhuis/{huisId}
 * @group Studentenhuis - Endpoints voor CRUD functionaliteit op een studentenhuis.
 * @returns {object} 200 - Info dat de verwijdering is gelukt.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  409 - Conflict (Gebruiker mag deze data niet verwijderen)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.delete('/studentenhuis/:huisId', StudentenhuisController.delete)

/**
 * Maak een nieuwe maaltijd voor een studentenhuis. De ID van de gebruiker die de maaltijd
 * aanmaakt wordt opgeslagen bij de maaltijd. 
 * Deze ID haal je uit het JWT token.
 * De correctheid van de informatie die wordt gegeven moet door de server gevalideerd worden. 
 * Bij ontbrekende of foutieve invoer wordt een juiste foutmelding geretourneerd.
 * Authenticatie door middel van JWT is vereist.
 * 
 * @route POST /api/studentenhuis/{huisId}/maaltijd
 * @group Maaltijd - Endpoints voor CRUD functionaliteit op een maaltijd.
 * @param {Maaltijd.model} maaltijd.body.required - Een object in de request body met de gegevens van de maaltijd
 * @returns {MaaltijdResponse.model} 200 - De maaltijd die toegevoegd is
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.post('/studentenhuis/:huisId/maaltijd', MaaltijdController.create)

/**
 * Retourneer alle maaltijden voor het studentenhuis met de gegeven huisId. 
 * Iedere gebruiker kan alle maaltijden van alle studentenhuizen opvragen. 
 * Authenticatie door middel van JWT is vereist.
 * 
 * @route GET /api/studentenhuis/{huisId}/maaltijd
 * @group Maaltijd - Endpoints voor CRUD functionaliteit op een maaltijd.
 * @returns {MaaltijdResponse.model} 200 - Een array met alle maaltijden van het gegeven studentenhuis
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.get('/studentenhuis/:huisId/maaltijd', MaaltijdController.getAll)

/**
 * Retourneer de maaltijd met het gegeven maaltijdId.
 * Iedere gebruiker kan alle maaltijden van alle studentenhuizen opvragen.
 * Authenticatie door middel van JWT is vereist.
 * 
 * @route GET /api/studentenhuis/{huisId}/maaltijd/{maaltijdId}
 * @group Maaltijd - Endpoints voor CRUD functionaliteit op een maaltijd.
 * @returns {MaaltijdResponse.model} 200 - De gevraagde maaltijdinformatie
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.getMaaltijdById)

/**
 * Vervang de maaltijd met het gegeven maaltijdId door de nieuwe maaltijd in de request body.
 * Alleen de gebruiker die de maaltijd heeft aangemaakt kan deze wijzigen.
 * De ID van de gebruiker haal je uit het JWT token.
 * De correctheid van de informatie die wordt gegeven moet door de server gevalideerd worden.
 * Bij ontbrekende of foutieve invoer wordt een juiste foutmelding geretourneerd.
 * Authenticatie door middel van JWT is vereist. 
 * 
 * @route PUT /api/studentenhuis/{huisId}/maaltijd/{maaltijdId}
 * @group Maaltijd - Endpoints voor CRUD functionaliteit op een maaltijd.
 * @param {Maaltijd.model} maaltijd.body.required - De nieuwe maaltijd
 * @returns {MaaltijdResponse.model} 200 - De bijgewerkte maaltijd
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.put('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.update)

/**
 * Verwijder de maaltijd met het gegeven maaltijdId.
 * Alleen de gebruiker die de maaltijd heeft aangemaakt kan deze wijzigen.
 * De ID van de gebruiker haal je uit het JWT token.
 * Authenticatie door middel van JWT is vereist. 
 * 
 * @route DELETE /api/studentenhuis/{huisId}/maaltijd/{maaltijdId}
 * @group Maaltijd - Endpoints voor CRUD functionaliteit op een maaltijd.
 * @returns {object} 200 - Info over de status van de verwijderactie
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId', MaaltijdController.delete)

/**
 * Meld je aan voor een maaltijd in een studentenhuis. 
 * De user ID uit het token is dat van de gebruiker die zich aanmeldt. 
 * Die gebruiker wordt dus aan de lijst met aanmelders toegevoegd. 
 * Een gebruiker kan zich alleen aanmelden als hij niet al aan de maaltijd deelneemt; 
 * anders volgt een foutmelding.
 * Authenticatie door middel van JWT is vereist. 
 * 
 * @route POST /api/studentenhuis/{huisId}/maaltijd/{maaltijdId}
 * @group Deelnemers - Endpoints voor CRUD functionaliteit op een deelnemer aan een maaltijd.
 * @returns {DeelnemerResponse.model} 200 - Informatie over de toegevoegde deelnemer
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.post('/studentenhuis/:huisId/maaltijd/:maaltijdId', DeelnemerController.create)

/**
 * Geef de lijst met deelnemers voor de maaltijd met gegeven maaltijdID in het studentenhuis met huisId. 
 * Deelnemers zijn geregistreerde gebruikers die zich hebben aangemeld voor deze maaltijd.
 * Iedere gebruiker kan alle deelnemers van alle maaltijden in alle studentenhuizen opvragen.
 * Authenticatie door middel van JWT is vereist.
 * 
 * @route GET /api/studentenhuis/{huisId}/maaltijd/{maaltijdId}/deelnemers
 * @group Deelnemers - Endpoints voor CRUD functionaliteit op een deelnemer aan een maaltijd.
 * @returns {Deelnemer.model} 200 - Een array met deelnemers aan de gegeven maaltijd in het gegeven studentenhuis.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', DeelnemerController.getAll)

/**
 * Verwijder een deelnemer.
 * De deelnemer die wordt verwijderd is de gebruiker met het ID uit het token.
 * Een gebruiker kan alleen zijn eigen aanmelding verwijderen. 
 * Authenticatie door middel van JWT is vereist. 
 * 
 * @route DELETE /api/studentenhuis/{huisId}/maaltijd/{maaltijdId}/deelnemers
 * @group Deelnemers - Endpoints voor CRUD functionaliteit op een deelnemer aan een maaltijd.
 * @returns {object} 200 - Informatie over de verwijderactie
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId', DeelnemerController.delete)

module.exports = routes