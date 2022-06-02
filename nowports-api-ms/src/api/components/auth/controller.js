const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const UserController = require('../user/controller');
const log = require('log4js').getLogger('{auth/controller}');
const nowportsError = require('../../../utils/nowportsError');
const {HTTPCodes, ExceptionCode} = require('../../../utils/httpMessages');

module.exports = function () {
    async function login(email, password) {
        if (!(email && password)) {
            log.error('Bad Request: email or password not provided');
            throw nowportsError(ExceptionCode.BAD_LOGIN_REQUEST, HTTPCodes.BAD_REQUEST);
        }
        const user = await UserController().getUserByEmail(email);
        if (user) {
            return bcrypt.compare(password, user.password)
                .then((equals) => {
                    if (equals) {
                        return auth.sign(JSON.parse(JSON.stringify(user)));
                    } else {
                        log.error('Password not match');
                        throw nowportsError(ExceptionCode.INVALID_LOGIN, HTTPCodes.UNAUTHORIZED);
                    }
                });
        } else {
            log.error('User not exist');
            console.log("entra", HTTPCodes.UNAUTHORIZED);
            throw nowportsError(ExceptionCode.INVALID_LOGIN, HTTPCodes.UNAUTHORIZED);
        }
    }

    return {
        login,
    };
}