const path = require('path');
const appRootPath = require('../../rootPath');
const logFileName = path.join(appRootPath, '', 'error.log');
// const config = require('../config/config');
let debugLevel = 'info'; //config.debugLevel;
var winston = require('winston');
//let winstonLogRotate = require('winston-logrotate');

const consoleOptions = {
  level: debugLevel, // Logger Levels { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
  colorize: true,
  timestamp: true,
  prettyPrint : true
};

const logger = winston.createLogger({
  level: debugLevel,
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs error to `error.log`.
    //
    // new winston.transports.File({ filename: logFileName, level: 'error' }),
    new winston.transports.Console(consoleOptions)
  ]
});

module.exports = logger;
