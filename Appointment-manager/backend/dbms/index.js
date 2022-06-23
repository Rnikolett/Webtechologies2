const dbConfig = require("../config/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.appointment = require("../models/appointment")(mongoose);
db.user = require("../models/user")(mongoose);

module.exports = db;