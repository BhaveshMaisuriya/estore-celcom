const oauthSignature = require('oauth-signature');
const randomKeyGenerator = require("random-key");
import { proxiedRequest as request } from "./proxyRequest";

import * as environment from '../../environment.json';
/**
 * Method to get the token
 * @param {*} token
 */
export let getOptionsForClientIdOrRefreshToken = (req, res, isNewToken) => {

  const nounce = randomKeyGenerator.generate(11);
  const OAUTH_CONSUMER_KEY = process.env.OAUTH_CONSUMER_KEY;
  const OAUTH_TOKEN = process.env.OAUTH_TOKEN;
  const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
  const TOKEN_SECRET = process.env.TOKEN_SECRET;
  const oauth_timestamp = Math.floor(Date.now() / 1000).toString();
  const url = (<any>environment).eStoreUrl + '/rest/V1/accesstoken';

  const parameters = {
    oauth_consumer_key: OAUTH_CONSUMER_KEY,
    oauth_token: OAUTH_TOKEN,
    oauth_nonce: nounce,
    oauth_timestamp: oauth_timestamp,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0',
  };

  // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
  const encodedSignature = oauthSignature.generate('POST', url, parameters, CONSUMER_SECRET, TOKEN_SECRET);
  let Authorization = 'OAuth oauth_consumer_key="' + OAUTH_CONSUMER_KEY + '",oauth_token="' + OAUTH_TOKEN;
  Authorization += '",oauth_signature_method="HMAC-SHA1",oauth_timestamp="' + oauth_timestamp;
  Authorization += '",oauth_nonce="' + nounce + '",oauth_version="1.0",oauth_signature="' + encodedSignature + '"';
  let retryForToken = false;
  if (isNewToken) {
    retryForToken = true;
  }
  const options = {
    method: 'POST',
    url: url,
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'cache-control': 'no-cache',
      'Authorization': Authorization,
      'Content-Type': 'application/json'
    },
    body: {
      apiType: 'wso2',
      retry: retryForToken
    },
    json: true
  };
  console.log(options);
  return options;
};
/**
 * Method to get access token
 * @param req
 * @param res
 */
export let getAccessToken = (req, res, isNewToken?) => {
  const options = getOptionsForClientIdOrRefreshToken(req, res, isNewToken);
  return new Promise(function (success, failure) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        success(body.access_token);
      } else if (response.statusCode === 401) {
        const optionsForNewToken = getOptionsForClientIdOrRefreshToken(req, res, true);
        request(optionsForNewToken, function (errorNew, responseNew, bodyNew) {
          if (!errorNew && responseNew.statusCode === 200) {
            success(bodyNew.access_token);
          } else {
            failure(errorNew);
          }
        });
      } else {
        failure(error);
      }
    });
  });
};
