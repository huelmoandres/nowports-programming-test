const express = require('express');
const router = express.Router();
const {AUTH, check} = require('../auth/secure');
const response = require('../../../network/response');
const Controller = require('./controller');

// Routes
router.post('/', create);

function create(req, res, next) {
    Controller().create(req.body)
        .then(() => {
            res.setHeader("Content-Type", "application/json");
            response.success(req, res, null, 202);
        })
        .catch(next);
}

module.exports = router;