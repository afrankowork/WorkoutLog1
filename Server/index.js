require('dotenv').config();
let express = require('express');
const sequelize = require('sequelize');
let server = express();
let user = require('./Controllers/UserController');
let log = require('./Controllers/LogController')
let database = require('./database');

database.sync();
server.use(express.json());
server.use(require('./Middleware/headers'))

server.use('/User', user);

server.use(require('./MiddleWare/validate-session'));
server.use('/Log', log);



server.listen(4500, function() {
    console.log('He gon eat');
})