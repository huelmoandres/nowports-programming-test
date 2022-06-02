const response = require('./response');
const log = require('log4js').getLogger('{errors}');

function errors(err, req, res, next) {
    let message = "GENERIC_ERROR";
    if (err.exceptionCode) {
        message = err.message;
    } else {
        log.error(err);
    }
    const status = err.statusCode || 500;
    const exceptionCode = err.exceptionCode || 1;
    const resp = {
        'code': exceptionCode,
        'description': message
    };
    response.error(req, res, resp, status);
}

module.exports = errors;
