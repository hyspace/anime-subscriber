var winston = require('winston')

var logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './all.log' })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './error.log' })
  ]
});

module.exports = logger;