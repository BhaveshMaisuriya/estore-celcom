const Redis = require('ioredis');
import * as environment from '../../environment.json';
import * as constants from '../../constants.json';
import * as apiController from '../controller/apiController';
const _ = require('lodash');
const logger = require('../utils/logger');

const redisConfig = (<any>environment).isPortal ? (<any>environment).redisConfig : (<any>environment).redisConfigForEstore;
let isRedisConnected = false;
// create a redis client
let redisClient: any;
if (redisConfig.length > 1) {
  redisClient = new Redis({
    sentinels: redisConfig,
    name: 'redis-cluster',
    sentinelRetryStrategy: 2000
  });
} else {
  redisClient = new Redis({
    host: redisConfig[0].host,
    port: redisConfig[0].port,
    retryStrategy: 2000
  });
}

/**
 * Connect to redis db
 */
// redisClient.on('connect', function () {
//   isRedisConnected = true;
//   console.log('connected to Redis DB');
// });
/**
 * If connection failure
 */
// redisClient.on('error', function (err) {
//   isRedisConnected = false;
//   console.log('Redis Connection Error: ' + err);
// });

export let isRequiredToCache = (url) => {
  const cachedUrls = (<any>constants).cacheUrls;
  let returnVal = false;
  for (let i = 0; i < cachedUrls.length; i++) {
    if (!returnVal) {
      if (/\?agenttype\=/i.test(url)) {
        returnVal = false;
        break;
      }
      returnVal = _.includes(url, cachedUrls[i]);
    }
    if (returnVal) {
      break;
    }
  }

  return returnVal;
};
/**
 * Read cache data from Redis
 * @param req
 * @param res
 * @param next
 */
export let readFromCache = (req, res) => {
  const isRequiredToCacheDetails = isRequiredToCache(req.url);
  if (isRedisConnected && isRequiredToCacheDetails) {
    redisClient.get(req.url, function (err, data) {
      if (err) {
        console.log(`error fetching cache response : ${req.url}`);
        apiController.getEstoreApi(req, res);
      }
      if (data != null) {
        console.log(`sending cache response : ${req.url}`);
        res.setHeader('X-Cached-Req', '1');
        return res.status(200).send(data);
      } else {
        console.log(`cache data for ${req.url} is : ${data}`);
        apiController.getEstoreApi(req, res);
      }
    });
  }
  // else {
  //     apiController.getApi(req, res);
  // }
};

/**
 * write data into redis
 * @param data
 * @param req
 * @param res
 * @param next
 */
export let writeToCache = (data, req, res) => {
  const isRequiredToCacheDetails = isRequiredToCache(req.url);
  if (isRedisConnected && isRequiredToCacheDetails) {
    if (_.isEmpty(data) || _.isNil(data)) {
      console.log("data is empty not storing into Redis.");
      return;
    }
    let isPreOrder = 0;
        try {
          isPreOrder = _.get(JSON.parse(data)[0], 'items.basic_details.preorder', 0);
        } catch (e) {
          console.log(e);
        }
        const statusCodes = (<any>constants).statusCodes;
        const redisKeyTTL = _.toNumber(isPreOrder) ? (<any>constants).redisPreOrderKeyTTL : (<any>constants).redisKeyTTL;
        console.log(`cache statusCode for ${req.url}: ${_.includes(statusCodes, res.statusCode)}`);
    if (_.includes(statusCodes, res.statusCode)) {
      redisClient
        .multi()
        .set(req.url, data)
        .expire(req.url, redisKeyTTL)
        .exec(function (error, result) {
          logOnRedisError(error);
          console.log(`redis write result for ${req.url}, ${result}`);
        });
    } else {
      console.log("Response code not matching with allowable state codes. Obtained Status Code : " + res.statusCode);
    }
  }
};


export let decrementDeviceCountForPreOrder = (selectedSKU, deviceName) => {
  const redisKey = '/rest/V1/devicedetails/' + deviceName;
  if (isRedisConnected) {
    redisClient.get(redisKey, function (err, data) {
      if (err) {
        console.log("Error while getting data from Redis " + err);
      } else if (!_.isNil(data)) {
        let jsonData = JSON.parse(data);
        const associated_products = _.get(jsonData[0], "items.associated_product", {});
        const associated_product = _.find(associated_products, { sku: selectedSKU });
        const preorder_availble_stock_in_hand = _.get(associated_product, "pre_order_data.preorder_availble_stock_in_hand", 0);
        if (preorder_availble_stock_in_hand > 0) {
          console.log("preorder_availble_stock_in_hand :" + preorder_availble_stock_in_hand);
          let redisPreOrderKeyTTL = (<any>constants).redisPreOrderKeyTTL;
          associated_product.pre_order_data.preorder_availble_stock_in_hand = preorder_availble_stock_in_hand - 1;
          jsonData = JSON.stringify(jsonData);
          redisClient.ttl(redisKey, (ttlErr, ttl) => {
            if (ttlErr) {
              console.log("Error while getting TTL of key : " + redisKey);
            }
            redisPreOrderKeyTTL = ttl > 0 && ttl < redisPreOrderKeyTTL ? ttl : redisPreOrderKeyTTL;
            redisClient
              .multi()
              .set(redisKey, jsonData)
              .expire(redisKey, redisPreOrderKeyTTL)
              .exec(function (error, result) {
                logOnRedisError(error);
              });
          });
        } else {
          console.log("pre order quantity is Zero.");
        }
      }
    });
  }
};

export let flushRedisCache = (req, res) => {
  if (isRedisConnected) {
    redisClient.flushdb((err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).send({ result: result });
      }
    });
  } else {
    return res.status(200).send({ result: "Redis not connected." });
  }
};

export let deleteKey = (key, cb) => {
  if (isRedisConnected) {
    redisClient.del(key, (err, result) => {
      if (err) {
        return cb(err);
      } else {
        return cb(null, result);
      }
    });
  } else {
    return cb(null, {"message" : "Redis not connected. This Operation for Deleting the Key : " + key});
  }
};

export const readKeyValuePair = (key) => {
  console.log("[Redis] read", key);
  return redisClient.get(key);
};

export const writeKeyValuePair = (key, value) => {
  redisClient.set(key, JSON.stringify(value));
  console.log("[Redis] write " + key, value);
  return redisClient.get(key);
};

export const readAllKeys = () => {
  return redisClient.keys('*');
};


const logOnRedisError = (error) => {
  if (error) {
    console.log("Redis Error while writing data " + error);
  }
};

export const reconnect = (req, res) => {
  if (isRedisConnected) {
    res.status(200).send({
      result: "Redis already connected so reconnecting not required"
    });
  } else {
    redisClient.connect((err, result) => {
      if (err) {
        console.log(err);
        logger.error("Redis reconnecting Error to Redis DB: " + err);
        res.status(200).send({
          status: "Redis reconnecting to DB is unsuccessful",
          error: err
        });
      } else {
        console.log("reconnection to Redis DB Successful");
        logger.info("Redis reconnecting to DB is successful ");
        res.status(200).send({
          status: "Redis reconnecting to DB is successful",
          result
        });
      }
    });
  }
}