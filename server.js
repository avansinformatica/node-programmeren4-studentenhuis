const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const user_routes = require('./routes/user.routes')
const authenticationroutes = require('./routes/authentication.routes')
const studentenhuisroutes = require('./routes/studentenhuis.routes')
const studentenhuis_open_routes = require('./routes/studentenhuis.open.routes')
const AuthController = require('./controllers/authentication.controller')
const ApiError = require('./model/ApiError')
const settings = require('./config/config')
const logger = settings.logger
const db = require('./config/db');

const port = process.env.PORT || settings.webPort
const httpSchemes = process.env.NODE_ENV === 'production' ? ['https'] : ['http']
const description =
	'<p>Dit is de API beschrijving van de Nodejs server uit de eindopdracht van Programmeren 4, periode 4, kans 1.' +
	'</br>Neem deze routes over in de uitwerking van je server. Neem ook de modellen van de parameters en responses over.</p>' +
	'<p>Voor de responses hoef je in je uitwerking geen JavaScript class te maken.</p>' +
	'<p><b>Let op</b>: wanneer een endpoint een lijst of array retourneert gaat het om een array van het model dat daar vermeld staat.'

let app = express()

const expressSwagger = require('express-swagger-generator')(app);

let options = {
	swaggerDefinition: {
		info: {
			title: 'Avans Programmeren 4 - Studentenhuis casus',
			version: '1.0.0',
			description: description
		},
		host: process.env.ALLOW_ORIGIN || 'mee-eten.herokuapp.com',
		produces: [
			"application/json"
		],
		securityDefinitions: {
			JWT: {
				type: "apiKey",
				in: "header",
				name: "x-access-token",
				description: "Register a new user or login an existing user, and fill in the received token below."
			}
		},
		schemes: httpSchemes
	},
	basedir: __dirname,
	files: ['./routes/**/*.js']
}
expressSwagger(options)

// bodyParser parses the body from a request
app.use(bodyParser.json())

// Instal Morgan as logger
app.use(morgan('dev'))

// Add CORS headers
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// UNPROTECTED endpoints for authentication - no token required.
// Provide login and registration 
app.use('/api', authenticationroutes)

// GET routes are UNPROTECTED
app.use('/api', studentenhuis_open_routes)

// JWT TOKEN VALIDATION for authentication
app.all('*', AuthController.validateToken);

// PROTECTED endpoints
app.use('/api', user_routes)
app.use('/api', studentenhuisroutes)

// Postprocessing; catch all non-existing endpoint requests
app.use('*', function (req, res, next) {
	// logger.error('Non-existing endpoint')
	const error = new ApiError('Non-existing endpoint', 404)
	next(error)
})

// Catch-all error handler according to Express documentation - err should always be an ApiError! 
// See also http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
	logger.error(err)
	res.status((err.code || 404)).json(err).end()
})

// Start listening for incoming requests.
app.listen(port, () => {
	logger.info('Server running on port ' + port)
})

// Testcases need our app - export it.
module.exports = app