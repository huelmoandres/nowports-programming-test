const express = require('express');
const router = express.Router();
const {AUTH, check} = require('../auth/secure');
const response = require('../../../network/response');
const Controller = require('./controller');

// Verifica que el usuario tenga sesión en el sistema
router.use(check(AUTH));

// Routes
router.get('/', getContacts);
router.post('/', create);
router.delete('/:id', check(AUTH), deleteContact);

function getContacts(req, res, next) {
    Controller().getContacts()
        .then((contacts) => {
            response.success(req, res, contacts, 200);
        })
        .catch(next);
}

function create(req, res, next) {
    Controller().create(req.body)
        .then(() => {
            res.setHeader("Content-Type", "application/json");
            response.success(req, res, null, 202);
        })
        .catch(next);
}

function deleteContact(req, res, next) {
    Controller().deleteContact(req.params.id, req.body)
        .then((algo) => {
            response.success(req, res, algo, 204);
        })
        .catch(next);
}

module.exports = router;