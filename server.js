const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const user_routes = require('./routes/user.routes')
const authenticationroutes = require('./routes/authentication.routes')
const studentenhuisroutes = require('./routes/studentenhuis.routes')
const AuthController = require('./controllers/authentication.controller')
const ApiError = require('./model/ApiError')
const settings = require('./config/config')
const db = require('./config/db.improved');

const port = process.env.PORT || settings.webPort
const httpSchemes = process.env.NODE_ENV === 'production' ? ['https'] : ['http']
const description =
	'<p>Deze server toont de API beschrijving van de Nodejs server uit de eindopdracht van Programmeren 4, periode 4, kans 1.' +
	'</br>Neem deze routes over in de uitwerking van je server. Neem ook de modellen van de parameters en responses over.</p>' +
	'<p>Voor de responses hoef je in je uitwerking geen JavaScript class te maken.</p>' +
	'<p><b>Let op</b>: wanneer een endpoint een lijst of array retourneert gaat het om een array van het model dat daar vermeld staat wordt.'

let app = express()

const expressSwagger = require('express-swagger-generator')(app);

let options = {
	swaggerDefinition: {
		info: {
			description: description,
			title: 'Avans Programmeren 4 - Studentenhuis casus'
		},
		host: process.env.ALLOW_ORIGIN || 'mee-eten.herokuapp.com',
		produces: [
			"application/json"
		],
		securityDefinitions: {
			JWT: {
				type: "apiKey",
				name: "x-access-token",
				in: "header",
				description: "Register a new user or login an existing user, and fill in the received token below."
			}
		},
		schemes: httpSchemes
	},
	security: {
		JWT: []
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

// Preprocessing catch-all endpoint
// The perfect place to check that the user performing the request 
// has authorisation to do things on our server
app.use('*', function (req, res, next) {
	next()
})

// Unprotected routes - no token required.
// Provides login and registration 
app.use('/api', authenticationroutes)

// On all other routes, check for API key
// app.all('*', (req, res, next) => { });
app.all('*', AuthController.validateToken);

// Regular endpoints
app.use('/api', user_routes)
app.use('/api', studentenhuisroutes)

// Postprocessing; catch all non-existing endpoint requests
app.use('*', function (req, res, next) {
	// console.log('Non-existing endpoint')
	const error = new ApiError("Deze endpoint bestaat niet", 404)
	next(error)
})

// Catch-all error handler according to Express documentation - err should always be an ApiError! 
// See also http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
	// console.dir(err)
	res.status((err.code || 404)).json(err).end()
})

// Start listening for incoming requests.
app.listen(port, () => {
	console.log('Server running on port ' + port)
})

// Testcases need our app - export it.
module.exports = app