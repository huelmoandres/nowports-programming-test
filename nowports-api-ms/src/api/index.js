const express = require('express');
const fs = require('fs');
const http = require('http');
const cookieParser = require('cookie-parser');
const log4js = require('log4js');

const {api} = require('../config/app.js');
const {secret} = require('../config/cookie.js');
const errors = require('../network/errors');
const auth = require('./components/auth/network');
const networkUser = require('./components/user/network');
const networkContact = require('./components/contacts/network');
const cors = require("cors");
const {corsOrigin} = require("../config/app");

/**
 * make a log directory, just in case it isn't there.
 * https://github.com/log4js-node/log4js-example
 */
try {
    fs.mkdirSync('../../log');
} catch (e) {
    if (e.code !== 'EEXIST') {
        console.log('No se pudo configurar el directorio para el log, [ERROR]: ', e);
        process.exit(1);
    }
}

/**
 * Initialise log4js first, so we don't miss any log messages
 */

log4js.configure('./src/config/log4js.json'); //ruta relativa a la raíz de la aplicación
const log = log4js.getLogger('index startup');

const app = express();

const corsOptions = {
    origin: corsOrigin,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Authorization', 'X-API-KEY', 'Origin', 'X-Requested-With', 'Content-Type', 'Access-Control-Allow-Request-Method', 'Accept']
};
app.use(cors(corsOptions));

app.use(cookieParser(secret));
app.use(express.json());

app.use(api.basePath + '/auth', auth);
app.use(api.basePath + '/user', networkUser);
app.use(api.basePath + '/contact', networkContact);

app.use(errors);

const server = http.createServer(app);

server.listen(api.port, function() {
    console.log('Api escuchando en el puerto ', api.port);
    log.info('Express server listening on port ',  api.port);
});