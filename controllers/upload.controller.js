//
// Upload controller - handles file uploads
//
const assert = require('assert')
const ApiError = require('../model/ApiError')
const logger = require('../config/config').logger
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')

const uploaddir = path.join(__dirname, '/..', '/static/uploads')

// Make sure the required folders exist.
fs.mkdir('./static', () => {
    // logger.info('Created ./static folder')
    fs.mkdir(uploaddir, () => { 
        logger.info('Created ' + uploaddir + ' folder for file uploads')
    })
})

module.exports = {

    handleUploadForm(req, res, next) {
        logger.info('handleUploadForm')

        //
        // formidable handles incoming form data, which contains the uploaded file.
        // https://github.com/felixge/node-formidable
        //
        var form = new formidable.IncomingForm()
        form.maxFieldsSize = 1 * 1024 * 1024 // 1 Mb excl. uploaded file
        form.maxFileSize = 12 * 1024 * 1024 // 12 Mb
        form.uploadDir = uploaddir
        form.keepExtensions = true

        form.parse(req)
            .on('error', error => {
                logger.debug(error.toString())
                next(new ApiError(error.toString(), 500))
            })
            .on('field', (name, value) => {
                logger.debug('received ' + name + ' = ' + value)
                req.body[name] = value
            })
            .on('fileBegin', (name, file) => {
                file.path = path.join(uploaddir, file.name)
                // logger.debug('received ' + file.name)
            })
            .on('file', (name, file) => {
                logger.debug('on file: ' + file.path)
                try {
                    next()
                } catch (error) {
                    res.status(400).json(error)
                }
            })
    }

}