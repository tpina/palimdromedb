// server.js
var express = require("express");
var app = express();
var PalindromeHandler = require("./handlers/PalindromeHandler");
var routes = require("./routes");
var fs = require("fs");
var logger = require("morgan");
var methodOverride = require("method-override");
var errorHandler = require("errorhandler");
var bodyParser = require("body-parser");

var router = express.Router();

var expressLogFile = fs.createWriteStream("./logs/express.log", { flags: "a" });

// Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(router);
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

var handlers = {
  api: function(req, res, next) {
    res.json({ message: "PalindromeDB API is up and running" });
  },
  palindrome: new PalindromeHandler()
};

function start() {
  routes.setup(app, handlers);
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log(
    "Express server listening on port %d in %s mode",
    port,
    app.settings.env
  );
}

exports.start = start;
exports.app = app;
