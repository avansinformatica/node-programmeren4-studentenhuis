//
// Application configuration
//
'use strict';

// Set the logging level.
const loglevel = process.env.LOGLEVEL || 'debug'
const secretkey = process.env.SECRETKEY

module.exports = {
    secretkey: secretkey,

    dbHost: 'localhost',
    dbUser: 'studentenhuis_user',
    dbDatabase: 'studentenhuis',
    webPort: 3000,

    logger: require('tracer')
        .console({
            format: [
                "{{timestamp}} <{{title}}> {{file}}:{{line}} : {{message}}"
            ],
            preprocess: function (data) {
                data.title = data.title.toUpperCase();
            },
            dateformat: "isoUtcDateTime",
            level: loglevel
        })
}