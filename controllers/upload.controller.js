//
// Upload controller - handles file uploads
//
const assert = require('assert')
const ApiError = require('../model/ApiError')
const logger = require('../config/config').logger
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')

const staticfolder = './static'
const imagefolder = '/images'
const uploaddir = path.join(__dirname, staticfolder, imagefolder)

// Make sure the required folders exist.
fs.mkdir(staticfolder, (err) => {
    if(err) {
        logger.error('Error creating folder ' + staticfolder)
    } else {
        fs.mkdir(uploaddir, (err) => {
            if(err) {
                logger.error('Error creating folder ' + uploaddir)
            } else {
                logger.info('Created ' + uploaddir + ' folder for file image uploads')
            }
        })
    }
})

module.exports = {

    /**
     * Handle form information. Form information can be 'multi-part', so can contain fields and files.
     * This enables us to upload a file in combination with other information in the fields. A field is a
     * name/value pair.
     * 
     * @param {*} req Contains the form to be handled. 
     * @param {*} res Not used here.
     * @param {*} next Next express endpoint handler.
     */
    handleUploadForm(req, res, next) {
        logger.info('handleUploadForm')

        //
        // formidable handles incoming form data, which contains the uploaded file.
        // https://github.com/felixge/node-formidable
        //
        var form = new formidable.IncomingForm()
        // Configure formidable.
        form.maxFieldsSize = 1 * 1024 * 1024 // 1 Mb excl. uploaded file
        form.maxFileSize = 12 * 1024 * 1024 // 12 Mb
        form.uploadDir = uploaddir
        form.keepExtensions = true

        // Parse the form.
        form.parse(req)
            .on('error', error => {
                logger.debug(error.toString())
                next(new ApiError(error.toString(), 500))
            })
            .on('field', (name, value) => {
                // logger.debug('received ' + name + ' = ' + value)
                // 
                // We copy the fields to the request body, because the next 
                // endpoint handler expects them in the body.
                // See the corresponding router file.
                //
                req.body[name] = value
            })
            .on('fileBegin', (name, file) => {
                // Formidable uses a temp filename by default.
                // Here we set the correct file path. 
                file.path = path.join(uploaddir, file.name)
            })
            .on('file', (name, file) => {
                //
                // At this point the file has been fully received and saved to disk.
                // We add the file path to the request, so that the next handler
                // can save it in the database for later lookup.
                //
                logger.debug('Saved file ' + file.path)
                req.body.filepath = file.path
                req.body.imageUrl = path.join(imagefolder, '/', file.name)
                next()
            })
    }

}