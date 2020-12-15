import * as environment from '../../environment.json';
const prodServer = (<any>environment).production;
const logger = require('../utils/logger');
const utils = require('./utils');
const _ = require('lodash');
const tokenStore = require('./tokenStore');
const commonUtils = require('../utils/commonUtils');
import * as oAuthController from './oAuthController';
import { generateEstoreOptionsForPostWithUserToken } from './apiController.js';
const userName = "MagentoAPIAccess";
const pwd = prodServer ? "(8]N(qXcptZ" : "225rfjN}4Gy";
const apiGateWayUserName = prodServer ? "newestore_apigw" : "newCelcomApp";
const apiGateWayPassword = prodServer ? "newe$10re!@#" : "newce!c0m@99%";
const eStoreToken = "fxb2isdp8bnqs5cc3smgcq66q4c2yg7u";

/**
 * Generate options for API Gateway
 * @param req
 * @param res
 * This function is used By
 * stockAvailabilityCheck()
 */
export let generateOptionsForPost = (req, res) => {
  const auth = "Basic " + new Buffer(apiGateWayUserName + ":" +
    apiGateWayPassword).toString("base64");
  const urlData = (<any>environment).apiGateWayUrl + req.url;
  logger.info(/* "Function Name: " + stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename + "URL : " + urlData);
  const bodyData = JSON.stringify(req.body);
  const options = {
    url: urlData,
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
      'Accept': 'application/json'
    },
    body: bodyData
  };
  return options;
};

export let generateOptionsWithTokenForStockAvailable = (req, res) => {
  const urlData = (<any>environment).wso2Url + req.url;
  logger.info(/* "Function Name: " + stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename + "URL : " + urlData);
  const bodyData = JSON.stringify(req.body);
  const options = {
    url: urlData,
    auth: {
      'bearer': req.oAuthToken
    },
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: bodyData
  };
  return options;
};

/**
 * Generate options for POST Requests.
 * @param req
 * @param res
 */
export let generateEstoreOptionsForPost = (req, res) => {
  const auth = "Bearer " + eStoreToken;
  const urlData = (<any>environment).eStoreUrl + req.url;
  logger.info("URL : " + urlData);
  const bodyData = JSON.stringify(req.body);
  const options = {
    url: urlData,
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth
    },
    body: bodyData
  };
  return options;
};


/**
 * Post Data into POST Requests.
 * @param req
 * @param res
 * This method is Used By
 * eligibilitycheck()
 */
export let postEstoreData = (req, res) => {
  // console.log(req);
  const options = generateEstoreOptionsForPost(req, res);
  req.start = Date.now();
  utils.requestpromise(options)
  .then(function (result) {
    return utils.sendResponseByEliminatingXSS(req, res, null, result.response, result.body);
  })
  .catch((error) => {
    return utils.sendResponseByEliminatingXSS(req, res, error);
  });
};

export let stockAvailabilityCheck = (req, res) => {
  console.log("Stock Request: ", req);
  req.start = Date.now();
  console.log("URL : " + req.url);
  console.log("Start Time : " + Date.now());
  // dynamicRedis.isWSO2ApiGateway().then((isWSO2) => {
  //   if (isWSO2 == 'true') {
  //     req.isNewApiGW = true;
  //     return getAccessTokenAndPostForStockAvailablility(req, res, false);
  //   } else {
  //     return postForStockAvailable(req, res);
  //   }
  // }, (error) => {
  //   logger.error(JSON.stringify(error));
  //   return postForStockAvailable(req, res);
  // });
};

export let getAccessTokenAndPostForStockAvailablility = (req, res, isNewToken) => {
  oAuthController.getAccessToken(req, res, isNewToken).then((access_token) => {
    req.oAuthToken = access_token;
    return postForStockAvailable(req, res, isNewToken);
  }, (error) => {
    logger.error(JSON.stringify(error));
    return res.status(200).send({ "message": error.message });
  });
};


function postForStockAvailable(req, res, isNewToken?) {
  const options = req.oAuthToken ? generateOptionsWithTokenForStockAvailable(req, res) : generateOptionsForPost(req, res);
  // const options = generateOptionsForPost(req, res);
  utils.requestpromise(options)
    .then(function (result) {
      try {
        console.log("Stock Response: ", result);
        const body = JSON.parse(result.body);
        /** Conditions:
          *  NOTOK --> False
          *  TotalAvailableQty === 0 --> False
        */
        const status = _.get(body, "stockAvailabilityCheckResponse.header.status", "NOTOK");
        const totalAvailableQty = _.toNumber(
          _.get(body, "stockAvailabilityCheckResponse.response.listOfItemDetails.itemDetails[0].totalAvailableQty", 0));
        if (status === "OK" && totalAvailableQty > 0) {
          const incomingToken = _.get(req, "headers.authtoken", undefined);
          if (!_.isNil(incomingToken) && !_.isEmpty(incomingToken)) {
            const itemDetails = _.get(body, 'stockAvailabilityCheckResponse.response.listOfItemDetails.itemDetails', []);
            _.map(itemDetails, item => {
                item.sAPMaterialCode = undefined;
              });
            return utils.sendResponseByEliminatingXSS(req, res, null, result.response, JSON.stringify(body));
          } else {
            return utils.sendResponseByEliminatingXSS(req, res, null, result.response, { "stockAvailabilityCheckResponse": true });
          }
        } else {
          return utils.sendResponseByEliminatingXSS(req, res, null, result.response, { "stockAvailabilityCheckResponse": false });
        }
      } catch (e) {
        return utils.sendResponseByEliminatingXSS(req, res, e);
      }
    })
    .catch(function (error) {
      if (error.statusCode === 401 && isNewToken === false) {
        return getAccessTokenAndPostForStockAvailablility(req, res, true);
      } else {
        return utils.sendResponseByEliminatingXSS(req, res, error);
      }
    });
}

function tokenGeneration(result, req, res) {
  try {
    const body = JSON.parse(_.get(result, "body", []));
    const requestBody = _.get(req, "body", {});
      let mobileNumberOrMsisdn = _.get(requestBody, "login_data.mobile_number", "");
      if (_.isEmpty(mobileNumberOrMsisdn)) {
        mobileNumberOrMsisdn = _.get(requestBody, "login_data.id_number", "");
      }
      if (_.isEmpty(mobileNumberOrMsisdn)) {
        mobileNumberOrMsisdn = _.get(requestBody, 'track_order_data.id_number', '');
      }
      if (_.isEmpty(mobileNumberOrMsisdn)) {
        mobileNumberOrMsisdn = _.get(requestBody, "data.idNumber", "");
      }
      if (_.isEmpty(mobileNumberOrMsisdn)) {
        return res.status(400).send({status : false, message : "Mobile Number or NRIC is required."});
      }
    if (_.get(body[0], "status", false) || _.get(body, 'status', false)) {
      const token = tokenStore.generateUniqueJwtToken(mobileNumberOrMsisdn);
        // dynamicRedis.storeJWTToken(mobileNumberOrMsisdn, token, (tokenStorageErr, tokenStorageResult) => {
        //   if (tokenStorageErr) {
        //     body.token = undefined;
        //     return res.status(500).send({status : false, message : "Unable to generate the token. Please try again."});
        //   } else {
        //     _.isArray(body) ? _.set(body[0], "authtoken", token) : _.set(body, "authtoken", token);
        //     return res.status(200).send(body);
        //   }
        // });
    } else {
      return res.status(result.response.statusCode).send(body);
    }
  } catch (e) {
    logger.error(commonUtils.getObjectForLoggingForController(req, 'sendResponseByEliminatingXSS', __filename, e));
    return res.status(400).send({ success: false, reason: "Something wrong with Data." });
  }
}

export let userLoginAndTrackorder = (req, res) => {
  const options = generateEstoreOptionsForPostWithUserToken(req, res);
  req.start = Date.now();

  utils.requestpromise(options)
  .then((result) => {
    return tokenGeneration(result, req, res);
  })
  .catch((error) => {
    return utils.sendResponseByEliminatingXSS(req, res, error);
  });
};

