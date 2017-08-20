var config = require("./config");
var winston = require("winston");
var server = require("./server");

// Log api operations to api.log
console.log("Starting logger...");
winston.add(winston.transports.File, {
  filename: config.logger.api
});

// Log uncaught exceptions to exceptions.log
winston.handleExceptions(
  new winston.transports.File({
    filename: config.logger.exception
  })
);
console.log("Logger started. Starting PalindromeDB API...");
server.start();
console.log(
  "Server started successfully. Waiting for incoming connections to PalindromeDB API..."
);
