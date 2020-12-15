const Redis = require('ioredis');
import * as environment from '../../environment.json';
const _ = require('lodash');
const logger = require('../utils/logger');
import * as constants from '../../constants.json';

const redisConfig = (<any>environment).isPortal ? (<any>environment).redisConfig : (<any>environment).redisConfigForEstoreDynamicData;
const isProd = (<any>environment).production;
//const isProd = false;
let isRedisConnectedForDynamicData = false;
// create a redis client
let redisClientForDynamicData: any;
if (redisConfig.length > 1) {
  redisClientForDynamicData = new Redis({
    sentinels: redisConfig,
    name: 'redis-cluster',
    sentinelRetryStrategy: 2000
  });
} else {
  redisClientForDynamicData = new Redis({
    host: redisConfig[0].host,
    port: redisConfig[0].port,
    db: redisConfig[0].db,
    retryStrategy: 2000,
  });
}

/**
 * Connect to redis db
 */
redisClientForDynamicData.on('connect', function () {
  isRedisConnectedForDynamicData = true;
  logger.info('connected to Redis DB For Dynamic Data.');
  getMagentoOauthKeysOnLoad();
});
/**
 * If connection failure
 */
redisClientForDynamicData.on('error', function (err) {
  isRedisConnectedForDynamicData = false;
  logger.error('Redis Connection Error in connecting Dynamic Data DB: ' + err);
});
/**
 * Get all the required oauth keys while inititalizing node server
 */
let getMagentoOauthKeysOnLoad=()=>{
  redisClientForDynamicData.select(1);
  redisClientForDynamicData.mget(["OAUTH_CONSUMER_KEY","OAUTH_TOKEN","CONSUMER_SECRET","TOKEN_SECRET"], function (err, data) {
    if (!err) {
      process.env.OAUTH_CONSUMER_KEY = data[0];
      process.env.OAUTH_TOKEN = data[1];
      process.env.CONSUMER_SECRET = data[2];
      process.env.TOKEN_SECRET = data[3];
      logger.info('Successfully Set OAUTH token');
    } else {
      logger.error('Error occured while getting OAUTH token');
    }
  });
  redisClientForDynamicData.mget(["OAUTH_CONSUMER_KEY_ORDER_LIST","OAUTH_TOKEN_ORDER_LIST","CONSUMER_SECRET_ORDER_LIST","TOKEN_SECRET_ORDER_LIST"], function (err, data) {
    if (!err) {
      process.env.OAUTH_CONSUMER_KEY_ORDER_LIST = data[0];
      process.env.OAUTH_TOKEN_ORDER_LIST = data[1];
      process.env.CONSUMER_SECRET_ORDER_LIST = data[2];
      process.env.TOKEN_SECRET_ORDER_LIST = data[3];
      logger.info('Successfully set OAUTH List token');
    } else {
      logger.error('Error occured while getting OAUTH List token');
    }
  });
}
/**
 * Read cache data from Redis
 * @param req
 * @param res
 * @param next
 */
export let getAdobeURL = (req, res) => {
  const prodAdobUrl = '<script src="https://assets.adobedtm.com/launch-EN0829d4a75d5c4a1397797f7f23708844.min.js"></script>';
  const stagingAdobURL = '<script src="https://assets.adobedtm.com/launch-ENe7577517d75c4a789c62a6cb4dc09681-staging.min.js"></script>';

  const actualAdobeURL = isProd ? prodAdobUrl : stagingAdobURL;
  const response = {
    GlobalSettings: []
  };
  if (isRedisConnectedForDynamicData) {
    redisClientForDynamicData.hgetall('adobeUrl', function (err, data) {
      if (!_.isNil(data) && !_.isEmpty(data)) {
        response.GlobalSettings.push(data);
        return res.status(200).send(response);
      }
      response.GlobalSettings.push({
        type: 'header_script',
        value: actualAdobeURL
      });
      if (err) {
        logger.error('Error occured while getting ADOBE Script From Redis DB.');
        return res.status(200).send(response);
      } else {
        logger.info('Getting Empty Data from Redis. So Sending Default Adobe Script.');
        return res.status(200).send(response);
      }
    });
  } else {
    response.GlobalSettings.push({
      type: 'header_script',
      value: actualAdobeURL
    });
    logger.info('Redis Not enabled. So Sending Default Adobe Script.');
    return res.status(200).send(response);
  }
};

export let storeJWTToken = (mobileNumOrNRIC, token, cb) => {
  if (isRedisConnectedForDynamicData) {
    const tokenKeyExpireTime = (<any>constants).tokenKeyExpireTime;
    const tokenKey = 'userToken:' + mobileNumOrNRIC;
    redisClientForDynamicData
      .multi()
      .set(tokenKey, token)
      .expire(tokenKey, tokenKeyExpireTime)
      .exec(function (err, result) {
        return handleErrorFirstCallback(err,result,cb);
      });
  } else {
    return cb({ "message": "Redis not connected." });
  }
};

export let retriveJWTToken = (tokenKey, cb) => {
  if (isRedisConnectedForDynamicData) {
    redisClientForDynamicData.get('userToken:' + tokenKey, (err, result) => {
      return handleErrorFirstCallback(err,result,cb);
    });
  } else {
    return cb({ "message": "Authorization Failed." });
  }
};

export let getQueuitURLs = (cb) => {
  if (isRedisConnectedForDynamicData) {
    redisClientForDynamicData.smembers('quiet:urls', (err, result) => {
      if (err) {
        return cb(null, []);
      } else {
        return cb(null, result);
      }
    });
  } else {
    return cb(null, []);
  }
};


export let deleteTokenData = (mobileNumOrNRIC, cb) => {
  if (isRedisConnectedForDynamicData) {
    const tokenKey = 'userToken:' + mobileNumOrNRIC;
    redisClientForDynamicData.del(tokenKey, (err, result) => {
      return handleErrorFirstCallback(err,result,cb);
    });
  } else {
    return cb(null, { "message": "Redis Cache Disabled Bypassing this request.", bypass: true });
  }
};

export let resetTokenExpireTime = (mobileNumOrNRIC, cb) => {
  if (isRedisConnectedForDynamicData) {
    const tokenKeyExpireTime = (<any>constants).tokenKeyExpireTime;
    const tokenKey = 'userToken:' + mobileNumOrNRIC;
    redisClientForDynamicData
      .multi()
      .expire(tokenKey, tokenKeyExpireTime)
      .exec(function (err, result) {
        return handleErrorFirstCallback(err,result,cb);
      });
  } else {
    return cb({ "message": "Redis not connected." });
  }
};
/**
 * Method to check if WSO2 url to be used for accessing APIGateway
 */
export let isWSO2ApiGateway = () => {
  return new Promise(function (success, failure) {
    if (isRedisConnectedForDynamicData) {
      redisClientForDynamicData.select(1);
      redisClientForDynamicData.get("isWSO2", function (err, data) {
        if (!err) {
          success(data);
        } else {
          failure(err);
        }
      });
    } else {
      failure(null);
    }
  });
};

let handleErrorFirstCallback=function(error,result,callback){
  if (error) {
    return callback(error);
  } else {
    return callback(null, result);
  }
}

export const readAllKeys = () => {
  return redisClientForDynamicData.keys('*');
};

export const readKeyValuePair = (key) => {
  console.log("[Redis] dynamic data read", key);
  return redisClientForDynamicData.get(key);
};

export const writeKeyValuePair = (key, value) => {
  redisClientForDynamicData.set(key, JSON.stringify(value));
  console.log("[Redis] dynamic data write " + key, value);
  return redisClientForDynamicData.get(key);
};

export const reconnect = (req, res) => {
  if (isRedisConnectedForDynamicData) {
    res.status(200).send({
      result: "Redis Dynamic DB already connected so reconnecting not required"
    });
  } else {
    redisClientForDynamicData.connect((err, result) => {
      if (err) {
        console.log(err);
        logger.error("Redis reconnecting to Dynamic Data DB Error: " + err);
        res.status(200).send({
          status: "Redis reconnecting to Dynamic DB is unsuccessful",
          error: err
        });
      } else {
        console.log("reconnection to Redis Dynamic DB Successful");
        logger.info("Redis disconnect to Dynamic Data DB is successful ");
        res.status(200).send({
          status: "Redis reconnecting to Dynamic data DB is successful",
          result
        });
      }
    });
  }
};
