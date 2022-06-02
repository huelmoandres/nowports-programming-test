const jwt = require('jsonwebtoken');

const auth = require('../../../auth');
const errors = require("../../../network/errors");

const {name, cookieConfig} = require('../../../config/cookie');
const AUTH = "AUTH";

const check = action => {
    return async (req, res, next) => {
        try {
            switch (action) {
                case AUTH:
                    await auth.check.logged(req);
                    extendSession(req, res);
                    next();
                    break;
                default:
                    next();
            }
        } catch (err) {
            errors(err, req, res, next);
        }
    }
};

const extendSession = (req, res) => {
    res.cookie(name, req.signedCookies.SESSION_TOKEN, cookieConfig);
}

module.exports = {
    AUTH,
    check
};