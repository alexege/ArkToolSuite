const dbConfig = require('../config/db.config.js');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.item = require("./item.model");
db.layout = require("./layout.model");
db.user = require("./user.model");
db.role = require("./role.model");
db.timer = require("./timer.model");
db.refreshToken = require("./refreshToken.model");
db.todo = require("./todo.model");
db.map = require("./map.model");
db.point = require("./point.model");
db.comment = require("./comment.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;