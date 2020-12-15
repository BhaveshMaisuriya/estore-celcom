const _ = require('lodash');

let getObjectForLoggingForController = (req, functionName, fileName, error, res) => {
    const logObj = {
        fileName : fileName,
        functionName : functionName,
        route : _.get(req, "route.path"),
        method : req.method,
        referer : _.get(req, "headers.referer", ""),
        redirect_uri : _.get(req, "query.redirect_uri", ""),
        client_name : _.get(req, "query.client_name", ""),
        client_id : _.get(req, "query.client_id", ""),
        msisdn : _.get(req, "query.msisdn", undefined),
        response: res
      }
      if(_.isNil(error)){
        logObj.error = error;
      }

      return logObj;
}

let getObjectForLoggingForRoutes = (req, fileName, res) => {
    const logObj = {
        fileName : fileName,
        route : _.get(req, "route.path"),
        method : req.method,
        url : req.url,
        response: res
      }
      return logObj;
}

Object.defineProperty(global, '__stack', {
  get: function() {
          var orig = Error.prepareStackTrace;
          Error.prepareStackTrace = function(_, stack) {
              return stack;
          };
          var err = new Error;
          Error.captureStackTrace(err, arguments.callee);
          var stack = err.stack;
          Error.prepareStackTrace = orig;
          return stack;
      }
  });

  Object.defineProperty(global, '__line', {
  get: function() {
          return __stack[1].getLineNumber();
      }
  });

  Object.defineProperty(global, '__function', {
  get: function() {
          return __stack[1].getFunctionName();
      }
  });

module.exports = {
    getObjectForLoggingForController: getObjectForLoggingForController,
    getObjectForLoggingForRoutes : getObjectForLoggingForRoutes
}
