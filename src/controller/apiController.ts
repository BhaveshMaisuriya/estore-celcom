
import * as environment from '../../environment.json';
import * as oAuthController from './oAuthController';
import { proxiedRequest as request } from "./proxyRequest";
const _ = require('lodash');
const utils = require('./utils');
const randomKeyGenerator = require("random-key");
const oauthSignature = require('oauth-signature');

const logger = require('../utils/logger');
// const commonUtils = require('../utils/commonUtils');
const prodServer = (<any>environment).production;

const userName = "MagentoAPIAccess";
const pwd = prodServer ? "(8]N(qXcptZ" : "225rfjN}4Gy";
const apiGateWayUserName = prodServer ? "newestore_apigw" : "newCelcomApp";
const apiGateWayPassword = prodServer ? "newe$10re!@#" : "newce!c0m@99%";
const eStoreToken = "fxb2isdp8bnqs5cc3smgcq66q4c2yg7u";

const tokenStore = require('./tokenStore');

/**
 * External Drupal API calls with authentication
 * @param req
 * @param res
 * @param next
 */
export let getApi = (req, res) => {
  const options = generateOptions(req, res);
  req.start = Date.now();
  request(options, function (error, response, body) {
    if (error) {
      logger.error(JSON.stringify(error));
      return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
    }
    console.log("" + options.url + ":" + (Date.now() - req.start));
    // to write data into redis database
    // if ((<any>environment).isRedisCacheEnabled) {
    //   redisController.writeToCache(body, req, response);
    // }
    return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
  });
};

export let getAgentDealerToken = (req) => {
  let token = "";
  if (req.headers['agenttoken']) {
    token = req.headers['agenttoken'];
  } else if (req.headers['dealertoken']) {
    token = req.headers['dealertoken'];
  }
  return token;
};

/**
 * Method to generate options
 * @param req
 * @param res
 */
export let generateOptions = (req, res) => {
  const urlData = (<any>environment).apiUrl + req.url;
  // Logger is commented Bcoz we are calling Portal API's
  // logger.info(/* "Function Name: " + stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename + "URL: " + urlData);
  const auth = "Basic " + new Buffer(userName + ":" + pwd).toString("base64");
  const agentDealerToken = getAgentDealerToken(req);
  // console.log(urlData);
  let options;
  options = {
    url: urlData,
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/hal+json',
      'Authorization': auth,
      cookie: agentDealerToken,
      referer: req.headers.referer,
    }, withCredentials: true
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  return options;
};
export let reserveNumber = (req, res, type?) => {
  req.start = Date.now();
  console.log("URL : " + req.url);
  console.log("Start Time : " + Date.now());
  req.start = Date.now();
  // dynamicRedis.isWSO2ApiGateway().then((isWSO2) => {
  //   if (isWSO2 === 'true') {
  //     req.isNewApiGW = true;
  //     return getAccessTokenAndPostReserveNumber(req, res);
  //   } else {
  //     return postReserveNumber(req, res);
  //   }
  // }, (error) => {
  //   logger.error(JSON.stringify(error));
  //   return postReserveNumber(req, res);
  // });
};

export let getAccessTokenAndPostReserveNumber = (req, res) => {
  oAuthController.getAccessToken(req, res).then((access_token) => {
    req.oAuthToken = access_token;
    return postReserveNumber(req, res);
  }, (error) => {
    logger.error(JSON.stringify(error));
    return res.status(200).send({ "message": error.message });
  });
};

export let postReserveNumber = (req, res) => {
  const options = req.oAuthToken ? generateOptionsWithTokenForPostReserveNumber(req, res) : generateOptionsForPostReserveNumber(req, res);
  handleRequest(options, res);
};

export let retrieveNumber = (req, res, type?) => {
  req.start = Date.now();
  console.log("URL : " + req.url);
  console.log("Start Time : " + Date.now());
  req.start = Date.now();
  // dynamicRedis.isWSO2ApiGateway().then((isWSO2) => {
  //   if (isWSO2 === 'true') {
  //     req.isNewApiGW = true;
  //     return getAccessTokenAndPostRetrieveNumber(req, res, false);
  //   } else {
  //     return postRetrieveNumber(req, res);
  //   }
  // }, (error) => {
  //   logger.error(JSON.stringify(error));
  //   return postRetrieveNumber(req, res);
  // });
};

export let getAccessTokenAndPostRetrieveNumber = (req, res, isNewToken?) => {
  oAuthController.getAccessToken(req, res, isNewToken).then((access_token) => {
    req.oAuthToken = access_token;
    return postRetrieveNumber(req, res, isNewToken);
  }, (error) => {
    logger.error(JSON.stringify(error));
    return res.status(200).send({ "message": error.message });
  });
};

export let postRetrieveNumber = (req, res, isNewToken?) => {
  const options = req.oAuthToken ? generateOptionsWithTokenForPostRetrieveNumber(req, res) : generateOptionsForPostRetrieveNumber(req, res);
  handleRetrieveNumberRequest(options, req, res, isNewToken);
};
const handleRetrieveNumberRequest = function (options, req, res, isNewToken) {
  request(options, function (error, response, body) {
      if (error) {
          return res.status(200).send({ "message": error.message });
      }

      if (response.statusCode === 401 && isNewToken === false) {
          return exports.getAccessTokenAndPostRetrieveNumber(req, res, true);
      } else {
          return res.status(response.statusCode).send(body);
      }
  });
};
export let generateOptionsWithTokenForPostRetrieveNumber = (req, res) => {
  const urlData = (<any>environment).wso2Url + req.url;
  const bodyData = JSON.stringify(req.body);
  const requestBodyData = bodyData;
  // '{"NumberDetailsRetrieveRequest":{"numberService":"POSTPAID","numberCategory":"NORMAL",' +
  //  '"numRecords":"12","sourceSystem":"","planType":"VOICE"}}';
  let options;
  options = {
    url: urlData,
    auth: {
      'bearer': req.oAuthToken
    },
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      referer: req.headers.referer,
    },
    body: requestBodyData,
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  logger.info(/* "Function Name: " + stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename + "URL: " + urlData);
  logger.info(/* "Function Name: " + stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename + "options: " + options);
  return options;
};

export let generateOptionsForPostRetrieveNumber = (req, res) => {
  const auth = "Basic " + new Buffer(apiGateWayUserName + ":" +
    apiGateWayPassword).toString("base64");
  const urlData = (<any>environment).apiGateWayUrl + req.url;
  const bodyData = JSON.stringify(req.body);
  const requestBodyData = bodyData;
  // '{"NumberDetailsRetrieveRequest":{"numberService":"POSTPAID","numberCategory":"NORMAL",' +
  // '"numRecords":"12","sourceSystem":"","planType":"VOICE"}}';
  let options;
  options = {
    url: urlData,
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
      'Accept': 'application/json',
      referer: req.headers.referer,
    },
    body: requestBodyData,
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  logger.info(/* "Function Name: " + stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename + "URL: " + urlData);
  return options;
};

/**
 * Post Data into API Gateway
 * @param req
 * @param res
 */

export let postData = (req, res, type?) => {
  req.start = Date.now();
  console.log("URL : " + req.url);
  console.log("Start Time : " + Date.now());
  const options = generateOptionsForPost(req, res);
  req.start = Date.now();
  handleXSSRequest(options, req, res);
};

/**
 * Post Data into API Gateway
 * @param req
 * @param res
 */
export let postDataForblackListInfo = (req, res, type?) => {
  req.start = Date.now();
  console.log("URL : " + req.url);
  console.log("Start Time : " + Date.now());
  const options = generateOptionsForPost(req, res);
  req.start = Date.now();
  request(options, function (error, response, body) {
    if (error) {
      // return res.status(500).send({ message: error.message });
      return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
    }
    console.log("" + options.url + ":" + (Date.now() - req.start));
    // to write data into redis database
    // redisController.writeToCache(body,req,res,next);
    // res.status(response.statusCode).send(body);
    const responseBody = JSON.parse(body);
    const requestBody = req.body;
    const customerId = _.get(requestBody, "blacklistChkRequest.customerIDNo", undefined);
    if (_.isNil(customerId)) {
      return res.status(401).json({ success: false, error: "You don't have permissions to access." });
    }
    const token = tokenStore.generateUniqueJwtToken(customerId);
    // dynamicRedis.storeJWTToken(customerId, token, (tokenStorageErr, tokenStorageResult) => {
    //   if (tokenStorageErr) {
    //     responseBody.token = undefined;
    //     return utils.sendResponseByEliminatingXSS(req, res, error, response, responseBody);
    //   } else {
    //     responseBody.token = token;
    //     return utils.sendResponseByEliminatingXSS(req, res, error, response, responseBody);
    //   }
    // });
  });
};
/**
 * Generate options for API Gateway
 * @param reqForPost
 * @param res
 */
export let generateOptionsForPost = (reqForPost, res) => {
  const urlData = (<any>environment).apiGateWayUrl + reqForPost.url;
  const auth = "Basic " + new Buffer(apiGateWayUserName + ":" + apiGateWayPassword).toString("base64");
  logger.info(" File Name: " + __filename + "URL : " + urlData);
  const bodyData = JSON.stringify(reqForPost.body);
  let options;
  options = {
    url: urlData,
    requestCert: false,
    rejectUnauthorized: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': auth,
      'referer': reqForPost.headers.referer,
    },
    body: bodyData
  };
  if (reqForPost.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': reqForPost.headers['x-token'],
      }
    }
  }
  return options;
};

export let generateOptionsForPostReserveNumber = (req, res) => {
  const auth = "Basic " + new Buffer(apiGateWayUserName + ":" +
    apiGateWayPassword).toString("base64");
  const urlData = (<any>environment).apiGateWayUrl + req.url;
  const bodyData = req.body;
  const requestBodyData = '{"reserveNumberRequest":{"remark":"Reserve this Number","outletId":"' + req.body.reserveNumberRequest.outletId +
   '","startDate":"' + bodyData.reserveNumberRequest.startDate + '","endDate":"' + bodyData.reserveNumberRequest.endDate +
    '","limit":10000,"staffId":"","msisdn":{"mobileNumber":" ' + bodyData.reserveNumberRequest.msisdn.mobileNumber +
  '","reservationStatus":"Success","reservationStatusReason":"Reserved successfully","region":"","numberCategory":"NORMAL","startDate":"' +
      bodyData.reserveNumberRequest.startDate + '","endDate":"' + bodyData.reserveNumberRequest.endDate +
       '","remark":"Reserve this Number"}}}';
  let options;
  options = {
    url: urlData,
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
      'Accept': 'application/json',
      'referer': req.headers.referer,
    },
    body: requestBodyData,
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  logger.info(/* "Function Name: " + stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename + "URL: " + urlData);
  return options;
};


export let generateOptionsWithTokenForPostReserveNumber = (req, res) => {
  const urlData = (<any>environment).wso2Url + req.url;
  const bodyData = req.body;
  const requestBodyData = '{"reserveNumberRequest":{"remark":"Reserve this Number","outletId":"' + req.body.reserveNumberRequest.outletId +
   '","startDate":"' + bodyData.reserveNumberRequest.startDate + '","endDate":"' + bodyData.reserveNumberRequest.endDate +
    '","limit":10000,"staffId":"","msisdn":{"mobileNumber":" ' + bodyData.reserveNumberRequest.msisdn.mobileNumber +
  '","reservationStatus":"Success","reservationStatusReason":"Reserved successfully","region":"","numberCategory":"NORMAL","startDate":"' +
      bodyData.reserveNumberRequest.startDate + '","endDate":"' + bodyData.reserveNumberRequest.endDate +
       '","remark":"Reserve this Number"}}}';
  let options;
  options = {
    url: urlData,
    auth: {
      'bearer': req.oAuthToken
    },
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'referer': req.headers.referer,
    },
    body: requestBodyData,
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  logger.info(/* "Function Name: " + stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename + "URL: " + urlData);
  return options;
};

/**
 * Get Data from API Gateway
 * @param req
 * @param res
 */
export let getMobileConnCustData = (req, res) => {
  const options = generateOptionsForGet(req, res);
  req.start = Date.now();
  request(options, function (error, response, body) {
    if (error) {
      return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
    }
    console.log("" + options.url + ":" + (Date.now() - req.start));
    // to write data into redis database
    // if ((<any>environment).isRedisCacheEnabled) {
    //   logger.info(/* "Function Name: " +  stack[0].method + " : " + stack[0].line +*/ " File Name: " + __filename + "URL : " + options.url);
    //   redisController.writeToCache(body, req, response);
    // }
    // return res.status(response.statusCode).send(body);
    return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
  });
};
/**
 * Generate options for API Gateway
 * @param req
 * @param res
 */
export let generateOptionsForGet = (req, res) => {
  const auth = "Basic " + new Buffer(apiGateWayUserName +
    ":" + apiGateWayPassword).toString("base64");
  const urlData = (<any>environment).apiGateWayUrl + req.url;
  logger.info(/* "Function Name: " +  stack[0].method + " : " + stack[0].line + */" File Name: " + __filename + "URL : " + urlData);
  let options;
  options = {
    url: urlData,
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Accept': 'application/json',
      'Authorization': auth,
      'referer': req.headers.referer,
    }
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  return options;

};
// Estore api.
/**
* External Drupal API calls with authentication
* @param req
* @param res
* @param next
*/
export let getEstoreApi = (req, res) => {
  const options = generateEstoreOptions(req, res);
  req.start = Date.now();
  request(options, function (error, response, body) {
    if (error) {
      // return res.status(500).send({ message: error.message });
      return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
    }
    console.log("" + options.url + ":" + (Date.now() - req.start));
    // to write data into redis database
    // if ((<any>environment).isRedisCacheEnabled) {
    //   console.log(`caching this url : ${req.url}`);
    //   redisController.writeToCache(body, req, response);
    // }
    return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
  });
};

/**
* External Drupal API calls with authentication
* @param req
* @param res
* @param next
*/
export let getEstoreApiForLogOut = (req, res) => {
  const options = generateEstoreOptionsForGetWithUserToken(req, res);
  req.start = Date.now();
  request(options, function (error, response, body) {
    if (error) {
      // return res.status(500).send({ message: error.message });
      return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
    }
    console.log("" + options.url + ":" + (Date.now() - req.start));
    // to write data into redis database
    // if ((<any>environment).isRedisCacheEnabled) {
    //   redisController.writeToCache(body, req, response);
    // }
    const incomingToken = _.get(req, "headers.authtoken", undefined);
    const decodedToken = tokenStore.decodeToken(incomingToken);
    // dynamicRedis.deleteTokenData(decodedToken.mobileNumOrNRIC, (errorFromDel, responseFromDel) => {
    //   if (errorFromDel) {
    //     console.log(errorFromDel);
    //   } else if (responseFromDel) {
    //     return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
    //   } else {
    //     return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
    //   }
    // });
    // return res.status(response.statusCode).send(body);
    // return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
  });
};

/**
 * Method to generate options
 * @param req
 * @param res
 */
export let generateEstoreUserOptions = (req, res) => {
  const urlData = (<any>environment).eStoreUrl + req.url;
  logger.info(/* "Function Name: " +  stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename + "URL : " + urlData);
  const token = req.headers['usertoken'];
  let authToken;
  if (token) {
    authToken = token;
  } else {
    authToken = (<any>environment).eStoreUserToken;
  }
  const auth = "Bearer " + authToken;

  let options;
  options = {
    url: urlData,
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/hal+json',
      'Authorization': auth,
      'referer': req.headers.referer,
    }
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  return options;
};

/**
 * Method to generate options
 * @param req
 * @param res
 */
export let generateEstoreOptions = (req, res) => {
  const token = (req.headers['usertoken']) ? req.headers['usertoken'] : "";
  const auth = "Bearer " + token;
  const agentDealerToken = getAgentDealerToken(req);
  const urlData = (<any>environment).eStoreUrl + req.url;
  logger.info( /* "Function Name: " +  stack[0].method + " : " + stack[0].line + */" File Name: " + __filename + "URL : " + urlData);
  let options;
  options = {
    url: urlData,
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/hal+json',
      'Authorization': auth,
      cookie: agentDealerToken,
      'referer': req.headers.referer,
    },
    withCredentials: true
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  return options;
};

/**
 * Post Data into POST Requests.
 * @param req
 * @param res
 */
export let postEstoreData = (req, res) => {
  // console.log(req);
  const options = generateEstoreOptionsForPost(req, res);
  req.start = Date.now();
  handleXSSRequest(options, req, res);

};
/**
 * Generate options for POST Requests.
 * @param req
 * @param res
 */
export let generateEstoreOptionsForPost = (req, res) => {
  const token = (req.headers['usertoken']) ? req.headers['usertoken'] : eStoreToken;
  const auth = "Bearer " + token;
  const agentDealerToken = getAgentDealerToken(req);
  const urlData = (<any>environment).eStoreUrl + req.url;
  logger.info(/* "Function Name: " +  stack[0].method + " : " + stack[0].line + */" File Name: " + __filename + "URL : " + urlData);
  const bodyData = JSON.stringify(req.body);
  let options;
  options = {
    url: urlData,
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
      cookie: agentDealerToken,
      'referer': req.headers.referer,
    },
    body: bodyData
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  return options;
};

/**
 * Post payment confirmation Data into POST Requests.
 * @param req
 * @param res
 */
export let postPaymentData = (req, res) => {
  const options = generatePaymentOptionsForPost(req, res);
  req.start = Date.now();
  handleXSSRequest(options, req, res);
};
/**
 * Generate options for POST Requests.
 * @param req
 * @param res
 */
export let generatePaymentOptionsForPost = (req, res) => {
  const urlData = (<any>environment).eStoreFrontEndUrl + req.url;
  logger.info(/*"Function Name: " +  stack[0].method + " : " + stack[0].line + */" File Name: " + __filename + "URL : " + urlData);
  // console.log(urlData);
  const options = {
    url: urlData,
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/hal+json',
    },
  };
  return options;
};


export let generateCustomHash = () => {
  return Math.floor(1000000000000000 + Math.random() * 9000000000000000);
};

export let getDrupalSession = (req, res) => {
  const options = generateOptionsForDrupalToken(req, res);
  req.start = Date.now();
  handleXSSRequest(options, req, res);
};

export let generateOptionsForDrupalToken = (req, res) => {
  logger.info(/* "Function Name: " +  stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename);
  const options = {
    url: (<any>environment).apiUrl + '/session/token',
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: false

  };
  return options;
};

export let postDataToDrupal = (req, res) => {
  const options = generateOptionsForDrupalPost(req, res);
  req.start = Date.now();
  handleXSSRequest(options, req, res);
};

export let generateOptionsForDrupalPost = (req, res) => {
  const data = req.body;
  const auth = "Basic " + new Buffer(userName + ":" + pwd).toString("base64");
  const urlData = (<any>environment).apiUrl + req.url;
  logger.info(/* "Function Name: " +  stack[0].method + " : " + stack[0].line + */" File Name: " + __filename + " URL :" + urlData);
  let options;
  options = {
    url: urlData,
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
      'X-CSRF': req.headers['x-csrf'],
      'referer': req.headers.referer,
    },
    body: JSON.stringify(data)
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  return options;
};
/**
 * Get Data into GET Requests.
 * @param req
 * @param res
 */
export let getEstoreDataWithUserToken = (req, res) => {
  const options = generateEstoreOptionsForGetWithUserToken(req, res);
  req.start = Date.now();
  handleXSSRequest(options, req, res);
};
/**
 * Get Data into GET Requests.
 * @param req
 * @param res
 */
export let getEstoreDataWithOauth = (req, res) => {
  const reqWithoutQueryString = removeQueryString(req);
  const options = generateEstoreOptionsForGetWithOauth(reqWithoutQueryString, res);
  reqWithoutQueryString.start = Date.now();
  handleXSSRequest(options, reqWithoutQueryString, res);
};

/**
 * Post Data into POST Requests with Oauth.
 * @param req
 * @param res
 */
export let postEstoreDataWithOauth = (req, res) => {
  const reqWithoutQueryString = removeQueryString(req);
  const options = generateEstoreOptionsForPostWithOauth(reqWithoutQueryString, res);
  reqWithoutQueryString.start = Date.now();
  request(options, function (error, response, body) {
    if (error) {
      // return res.status(500).send({ message: error.message });
      return utils.sendResponseByEliminatingXSS(reqWithoutQueryString, res, error, response, body);
    }
    console.log("" + options.url + ":" + (Date.now() - reqWithoutQueryString.start));
    // res.status(response.statusCode).send(body);
    return utils.sendResponseByEliminatingXSS(reqWithoutQueryString, res, error, response, body);
  });
};

/**
 * Post Data into POST Requests.
 * @param req
 * @param res
 */
export let postEstoreDataWithUserToken = (req, res) => {
  const options = generateEstoreOptionsForPostWithUserToken(req, res);
  req.start = Date.now();
  request(options, function (error, response, body) {
    if (error) {
      // return res.status(500).send({ message: error.message });
      logger.info('error occured in postEstoreData');
      return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
    }

    if (_.get(req, "body.data.is_preorder", false)) {
      const selectedSKU = _.get(req, "body.data.selected_device_product_sku", null);
      const deviceName = _.get(req, "body.data.bundle_product_sku", null);
      const responseBody = JSON.parse(body);
      if (_.get(responseBody[0], "clearRedis")) {
        const key = '/rest/V1/devicedetails/' + _.get(req, 'body.data.bundle_product_sku', '');
        // redisController.deleteKey(key, (err) => {
        //   if (err) {
        //     logger.info(err);
        //   } else {
        //     logger.info("Key Deleted From Redis. Key : " + key);
        //   }
        // });
      } else if ((!_.isNil(selectedSKU) && !_.isNil(deviceName))) {
      //  redisController.decrementDeviceCountForPreOrder(selectedSKU, deviceName);
      }
    }

    // console.log("" + options.url + ":" + (Date.now() - req.start));
    // res.status(response.statusCode).send(body);
    logger.info(options.url, JSON.stringify(response), JSON.stringify(body));
    return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
  });
};
/**
* Generate options for GET Requests.
* @param req
* @param res
*/
export let generateEstoreOptionsForGetWithUserToken = (req, res) => {
  const token = (req.headers['usertoken']) ? req.headers['usertoken'] : "";
  const auth = "Bearer " + token;
  const agentDealerToken = getAgentDealerToken(req);
  const urlData = (<any>environment).eStoreUrl + req.url;
  logger.info(/* "Function Name: " +  stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename + " URL :" + urlData);
  let options;
  options = {
    url: urlData,
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: false,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
      cookie: agentDealerToken,
      'referer': req.headers.referer,
    },
    requestIdentity : Date.now()
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  return options;
};

/**
* Generate options for GET Requests with Oauth.
* @param req
* @param res
*/
export let generateEstoreOptionsForGetWithOauth = (req, res) => {
  const nounce = randomKeyGenerator.generate(11);
  const OAUTH_TOKEN = process.env.OAUTH_TOKEN_ORDER_LIST;
  const OAUTH_CONSUMER_KEY = process.env.OAUTH_CONSUMER_KEY_ORDER_LIST;
  const TOKEN_SECRET = process.env.TOKEN_SECRET_ORDER_LIST;
  const CONSUMER_SECRET = process.env.CONSUMER_SECRET_ORDER_LIST;
  const oauth_timestamp = Math.floor(Date.now() / 1000).toString();

  const parameters = {
    oauth_consumer_key: OAUTH_CONSUMER_KEY,
    oauth_nonce: nounce,
    oauth_token: OAUTH_TOKEN,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: oauth_timestamp,
    oauth_version: '1.0',
  };
  // Define url data
  const urlData = (<any>environment).eStoreUrl + req.url;
  const encodedSignature = oauthSignature.generate('GET', urlData, parameters, CONSUMER_SECRET, TOKEN_SECRET);
  // set authorization
  let Authorization = 'OAuth oauth_consumer_key="' + OAUTH_CONSUMER_KEY + '",oauth_token="' + OAUTH_TOKEN;
  // update authorization
  Authorization += '",oauth_signature_method="HMAC-SHA1",oauth_timestamp="' + oauth_timestamp;
  // update authorization
  Authorization += '",oauth_nonce="' + nounce + '",oauth_version="1.0",oauth_signature="' + encodedSignature + '"';

  const token = (req.headers['usertoken']) ? req.headers['usertoken'] : "";
  // const auth = "Bearer " + token;
  const agentDealerToken = getAgentDealerToken(req);
  logger.info(/* "Function Name: " +  stack[0].method + " : " + stack[0].line + */ " File Name: " + __filename + " URL :" + urlData);
  let options;
  options = {
    url: urlData,
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: false,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Authorization,
      'Authorize': token,
      cookie: agentDealerToken,
      'referer': req.headers.referer,
    },
    requestIdentity : Date.now()
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  return options;
};

/**
* Generate options for POST Requests.
* @param req
* @param res
*/
export let generateEstoreOptionsForPostWithOauth = (req, res) => {
  const nounce = randomKeyGenerator.generate(11);
  const OAUTH_CONSUMER_KEY = process.env.OAUTH_CONSUMER_KEY_ORDER_LIST;
  const OAUTH_TOKEN = process.env.OAUTH_TOKEN_ORDER_LIST;
  const CONSUMER_SECRET = process.env.CONSUMER_SECRET_ORDER_LIST;
  const TOKEN_SECRET = process.env.TOKEN_SECRET_ORDER_LIST;
  const oauth_timestamp = Math.floor(Date.now() / 1000).toString();

  const parameters = {
    oauth_consumer_key: OAUTH_CONSUMER_KEY,
    oauth_token: OAUTH_TOKEN,
    oauth_nonce: nounce,
    oauth_timestamp: oauth_timestamp,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0',
  };
  const urlData = (<any>environment).eStoreUrl + req.url;


  const encodedSignature = oauthSignature.generate('POST', urlData, parameters, CONSUMER_SECRET, TOKEN_SECRET);
  let Authorization = 'OAuth oauth_consumer_key="' + OAUTH_CONSUMER_KEY + '",oauth_token="' + OAUTH_TOKEN;
  Authorization += '",oauth_signature_method="HMAC-SHA1",oauth_timestamp="' + oauth_timestamp;
  Authorization += '",oauth_nonce="' + nounce + '",oauth_version="1.0",oauth_signature="' + encodedSignature + '"';

  const token = (req.headers['usertoken']) ? req.headers['usertoken'] : eStoreToken;
  const agentDealerToken = getAgentDealerToken(req);
  logger.info(/* "Function Name: " +  stack[0].method + " : " + stack[0].line + */
  " File Name: " + __filename + " URL :" + urlData);
  const bodyData = JSON.stringify(req.body);
  console.log(req.body);
  let options;
  options = {
    url: urlData,
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Authorization,
      'Authorize': token,
      cookie: agentDealerToken,
      'referer': req.headers.referer,
    },
    body: bodyData
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  return options;
};

/**
* Generate options for POST Requests.
* @param req
* @param res
*/
export let generateEstoreOptionsForPostWithUserToken = (req, res) => {
  const token = (req.headers['usertoken']) ? req.headers['usertoken'] : eStoreToken;
  const auth = "Bearer " + token;
  const agentDealerToken = getAgentDealerToken(req);
  const urlData = (<any>environment).eStoreUrl + req.url;
  logger.info(/* "Function Name: " +  stack[0].method + " : " + stack[0].line + */
  " File Name: " + __filename + " URL :" + urlData);
  const bodyData = JSON.stringify(req.body);
  console.log(req.body);
  let options;
  options = {
    url: urlData,
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
      cookie: agentDealerToken,
      'referer': req.headers.referer,
    },
    body: bodyData
  };
  if (req.headers['x-token']) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'x-token': req.headers['x-token'],
      }
    }
  }
  return options;
};

export const removeQueryString = (req) => {
  req.originalUrl = req.originalUrl.split("?").shift();
  req.url = req.url.split("?").shift();
  req.headers.referer = req.headers.referer.split("?").shift();
  return req;
}

const handleRequest = (options, res) => {
  request(options, function (error, response, body) {
    if (error) {
      return res.status(200).send({ "message": error.message });
    }    
    return res.status(response.statusCode).send(body);
  });
};

const handleXSSRequest = (options, req, res) => {
  request(options, function (error, response, body) {
    if (error) {
      console.error({options, error});
      return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
    }    
    return utils.sendResponseByEliminatingXSS(req, res, error, response, body);
  });
};
