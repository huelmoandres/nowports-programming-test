require('dotenv').config();

const {connections} = require("../config/database");

module.exports = connections.mysql;