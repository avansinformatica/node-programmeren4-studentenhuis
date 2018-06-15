//
// Application configuration
//

// Set the logging level.
const loglevel = process.env.LOGLEVEL || 'debug'

module.exports = {
    "secretkey": "MySuperDuperSecretKey-123454321AbCd",

    "dbHost": "localhost",
    "dbUser": "studentenhuis_user",
    "dbDatabase": "studentenhuis",
    "dbPassword": "secret",
    "webPort": "3000",

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