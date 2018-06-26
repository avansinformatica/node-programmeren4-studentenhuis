//
// ./config/connection.js
//
// Configuratiebestand voor MySql database.
//
'use strict';

const mysql = require('mysql')
const config = require('../config/config')
const logger = config.logger
const reconnectTimeout = 2000 // ms.

const connectionSettings = {
    host: process.env.DB_HOST || config.dbHost,
    user: process.env.DB_USER || config.dbUser,
    password: process.env.DB_PASSWORD || config.dbPassword,
    database: process.env.DB_DATABASE || config.dbDatabase,
    port: 3306,
    debug: false
}

var connection

// http://sudoall.com/node-js-handling-mysql-disconnects/
function handleDisconnect() {
    connection = mysql.createConnection(connectionSettings)

    connection.connect((error) => {
        if (error) {
            logger.warn('Error connecting to database \'' + connectionSettings.database + '\' on \'' + connectionSettings.host + '\': ' + error.message)
            connection.end()
            setTimeout(handleDisconnect, reconnectTimeout)
        } else {
            logger.info('Connected to database \'' + connectionSettings.database + '\' on \'' + connectionSettings.host + '\', state = ' + connection.state)
        }
    })
    connection.on('error', (error) => {
        if (error.code === 'ECONNRESET') {
            logger.warn('Connection state = ' + connection.state + ' - reconnecting')
            connection.end()
            handleDisconnect()
        } else {
            logger.error('Connection ERROR - database \'' + connectionSettings.database + '\' on \'' + connectionSettings.host + '\': ' + error.message)
            connection.end()
            handleDisconnect()
        }
    })
}

handleDisconnect()

module.exports = connection