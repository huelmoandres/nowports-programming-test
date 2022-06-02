const jwt = require('jsonwebtoken');
const {jwt: jwtSecret} = require('../config/jwt');
const {secret} = jwtSecret;
const log = require('log4js').getLogger('{user/controller}');
const hrpError = require('../utils/nowportsError');
const { HTTPCodes, ExceptionCode } = require('../utils/httpMessages');

function sign(data) {
    return jwt.sign({
        email: data.email,
        id: data.id
    }, secret);
}

function verify(token) {
    return jwt.verify(token, secret);
}

const check = {
    logged: function(req) {
        const decoded = decodeCookie(req);
    },
}

function getToken(auth) {
    if (!auth) {
        log.warn(`Auth: token required.`);
        throw hrpError(
            ExceptionCode.SESSION_REQUIRED,
            HTTPCodes.UNAUTHORIZED
        );
    }
    if (!auth.token) {
        log.warn(`Cookie malformed: token expected`);
        throw hrpError(
            ExceptionCode.TOKEN_EXPECTED,
            HTTPCodes.BAD_REQUEST
        );
    }
    return auth.token;
}

function decodeCookie(req) {
    const authorization = req.signedCookies.SESSION_TOKEN || '';
    const token = getToken(authorization);
    return verify(token);
}

module.exports = {
    sign,
    check,
};