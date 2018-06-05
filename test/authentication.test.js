/**
 * Testcases aimed at testing the authentication process. 
 */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const db = require('../config/db')
const logger = require('../config/config').logger

chai.should()
chai.use(chaiHttp)

const endpoint = '/api/register'
const email = 'tst@test.com'

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken

describe('Registration', () => {

    before(function () {
        // delete any existing dummy user from the database.
        // Ideally we want a separate database for running tests.
        try {
            const query = 'DELETE FROM `user` WHERE `Email` = ?'
            const values = [email]
            db.query(query, values, (err, rows, fields) => {
                if (err) {
                    logger.error(err)
                }
            })
        } catch (ex) {
            logger.error(ex.toString())
        }
    })

    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post(endpoint)
            .send({
                'firstname': ' FirstName ',
                'lastname': ' LastName ',
                'email': email,
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('token').which.is.a('string')
                response.should.have.property('email').which.is.a('string')

                // Export the aquired token for other testcases.
                validToken = res.body.token
                module.exports = {
                    token: validToken
                }
                done()
            })
    })

    it('should return an error on GET request', (done) => {
        chai.request(server)
            .get(endpoint)
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when no firstname is provided', (done) => {
        chai.request(server)
            .post(endpoint)
            .send({
                'lastname': ' LastName ',
                'email': email,
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')

                done()
            })
    })

    it.skip('should throw an error when no valid firstname is provided', (done) => {
        // Write your test here
        done()
    })

    it.skip('should throw an error when no lastname is provided', (done) => {
        // Write your test here
        done()
    })

    it.skip('should throw an error when no valid lastname is provided', (done) => {
        // Write your test here
        done()
    })

})

describe('Login', () => {

    /**
     * This assumes that a user with given credentials exists. That is the case
     * when registration has been done before login.
     */
    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post('/api/login')
            .send({
                'email': email,
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                const response = res.body
                response.should.have.property('token').which.is.a('string')
                response.should.have.property('email').which.is.a('string').equals(email)
                done()
            })
    })

    it.skip('should throw an error when using invalid credentials', (done) => {
        // Write your test here
        done()
    })

})