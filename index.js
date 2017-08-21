var config = require('./config');
var winston = require('winston');
var server = require('./server');
var log = require('./utils').log;

if (process.env.NODE_ENV === 'test') {
  winston.remove(winston.transports.Console);
}

// Log api operations to api.log
log('Starting logger...');
winston.add(winston.transports.File, {
  filename: config.logger.api
});

// Log uncaught exceptions to exceptions.log
winston.handleExceptions(
  new winston.transports.File({
    filename: config.logger.exception
  })
);
log('Logger started. Starting PalindromeDB API...');
server.start();
log(
  'Server started successfully. Waiting for incoming connections to PalindromeDB API...'
);