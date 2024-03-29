module.exports.customerModels = require("./customer.model");
module.exports.adminModels = require('./admin.model');
module.exports.userModels = require('./user.model');

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require('../Config/config');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = dbConfig[env];