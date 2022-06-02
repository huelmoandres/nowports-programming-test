const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const {AUTH, check} = require('./secure');
const {name, cookieConfig} = require('../../../config/cookie');
const response = require('../../../network/response');
const Controller = require('./controller');
const UserController = require('../user/controller');

// Routes
router.post('/session/create', login);
router.delete('/session/destroy', check(AUTH), logout);
router.get('/session/check', check(AUTH), checkSession);
router.get('/session/me', check(AUTH), getInfoUserLogged);

// Internal functions
function login(req, res, next) {
    Controller().login(req.body.email, req.body.password)
        .then((token) => {
            let value = {token: token}
            res.cookie(name, value, cookieConfig);
            response.success(req, res, null, 204);
        })
        .catch(next);
}

function checkSession(req, res, next) {
    response.success(req, res, null, 204);
}

function getInfoUserLogged(req, res, next) {
    const authorization = req.signedCookies.SESSION_TOKEN || '';
    const {id} = jwt.decode(authorization.token);
    UserController().getUserById(id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function logout(req, res, next) {
    res.clearCookie(name);
    response.success(req, res, null, 204);
}

module.exports = router;