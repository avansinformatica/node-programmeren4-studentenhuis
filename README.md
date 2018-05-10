# Nodejs uitwerking van tentamen Programmeren 4 
Nodejs server die een api biedt voor functionaliteit rond users, studentenhuizen, maaltijden en deelnemers aan een maaltijd. Users kunnen zich registreren en een studentenhuis maken. Binnen een studentenhuis kan een maaltijd gemaakt worden. Andere users kunnen deelnemen aan een maaltijd.

This basic server contains:
1. Express routing and error handling via next()
2. JavaScript classes for OO-like programming
3. Many async functions illustrating async behavior of Nodejs
4. JWT authentication
5. Extensive validation of properties through asserts
6. Hashed passwords using bcrypt
7. Examples of BDD testcases using [Mocha](https://mochajs.org/), [Chai](http://www.chaijs.com/) and [Should](http://www.chaijs.com/api/bdd/)
8. Tests are run online on [Travis CI](https://travis-ci.org/avansinformatica/node-basic-server)

## Requirements
- nodejs 
- MySql 

## Usage
- Fork this repo and clone your copy onto your local machine.
- Import the studentenhuis.sql script into your MySQL database.

Then run

```
npm install
npm start
```

For testing:
```
npm test
```
