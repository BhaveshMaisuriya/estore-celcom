const xss = require("xss");
const logger = require('../utils/logger');
const commonUtils = require('../utils/commonUtils');
import { proxiedRequest as request } from "./proxyRequest";
const errorConstants = require('../constants/error.constants');


export let sendResponseByEliminatingXSS = (req, res, error,  response, body) => {
  if (error) {
    logger.error(commonUtils.getObjectForLoggingForController(req, 'sendResponseByEliminatingXSS', __filename, error));
    const statusCode = error.statusCode || 500;
    if (statusCode === 500) {
      return res.status(statusCode).send({ message: errorConstants.SYS_DOWN_MSG });
    } else {
      return res.status(statusCode).send({ message: error.message });
    }
  } else {
    // logger.info(commonUtils.getObjectForLoggingForController(req, 'sendResponseByEliminatingXSS', __filename, null, response));
    return res.status(response.statusCode).send(body);
    /*
    sanitizeData(body, function(err, result) {
      if (err) {
        return  res.status(500).send({ success: false, reason: "Something wrong with PostData.", data: JSON.stringify(body) });
      } else {
        return res.status(response.statusCode).send(result);
      }
    });
    */
  }
};

export let sanitizeData = function (req, data, cb) {
  const bodyString = JSON.stringify(data);
  const bodyStringWithXss = xss(bodyString);
  try {
    const sanitizedData = JSON.parse(bodyStringWithXss);
    // console.log("sanitized data =============> ", sanitizedData);
    return cb(null, sanitizedData);
  } catch (e) {
    logger.error(commonUtils.getObjectForLoggingForController(req, 'sendResponseByEliminatingXSS', __filename, e));
    return cb({ success: false, reason: "Something wrong with Data.", data: data }, null);
  }
};

export let requestpromise = (options) => {
  return new Promise(function (reslove, reject) {
      request(options, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            return reslove({ response: response, body : body });
          } else {
            const errorToSent = JSON.parse(body) || error;
            return reject({ message : errorToSent.message, statusCode : response.statusCode});
          }
      });
  });
};

// module.exports = {
//   sendResponseByEliminatingXSS : sendResponseByEliminatingXSS,
//   sanitizeData : sanitizeData,
//   requestpromise : requestpromise
// };
