const dbConfig = require('../config/db.config.js');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.item = require("./item.model");
db.layout = require("./layout.model");

module.exports = db;