'use strict'

const { Sequelize } = require('sequelize');
const config = require('../database/config');
let sequelize = null;

module.exports = function setupDatabase() {
    if (!sequelize) {
        sequelize = new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: config.dialect
        });
    }
    return sequelize;
}