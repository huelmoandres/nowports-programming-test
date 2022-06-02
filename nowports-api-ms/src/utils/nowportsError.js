const {ExceptionCode} = require('./httpMessages');

function nowportsError(message, code) {
    let e = new Error(message);
    e.exceptionCode = ExceptionCode.get(message).value;
    if (code) {
        e.statusCode = code;
    }
    return e;
};

module.exports = nowportsError;