import * as redisController from "./redisController";
import * as express from "express";
import * as uniqid from "uniqid";
import * as logger from "../utils/logger";
import * as apiController from "./apiController";
import { proxiedRequest as request } from "./proxyRequest";
import * as utils from "./utils";

const router = express.Router();

const SESSION_DELETION_TIME = 15; // in mins

function deleteSession(key) {
  redisController.deleteKey(key, err => {
    if (err) {
      logger.info(err);
    } else {
      logger.info("Key Deleted From Redis. Key : " + key);
    }
  });
}

function getToken(headers): string {
  return headers["ekyc-token"];
}

router.post("/qr-code", (req, res) => {
  const key = uniqid("session-");
  // console.log(req.headers);
  const value = {
    createdAt: new Date(),
    verified: false,
    data: {
      usertoken: req.headers.usertoken,
      ...req.body
    },
    session: key
  };
  redisController.writeKeyValuePair(key, value);
  setTimeout(() => {
    deleteSession(key);
  }, 60000 * SESSION_DELETION_TIME);
  return res.status(200).send({ key });
});

router.post("/id", (req, res) => {
  req.url = "/rest/V1/okayid";
  const session = getToken(req.headers);
  logger.info(`id Scan called for session ${session}`);
  if (session) {
    redisController.readKeyValuePair(session).then(val => {
      if (val) {
        apiController.postEstoreDataWithUserToken(req, res);
      } else {
        return res.status(401).send("Session Expired or not found");
      }
    });
  } else {
    return res.status(422).send("Session Id is required");
  }
});

router.post("/selfie", (req: any, res) => {
  req.url = "/rest/V1/okayface";
  const options = apiController.generateEstoreOptionsForPostWithUserToken(
    req,
    res
  );
  req.start = Date.now();
  const session = getToken(req.headers);
  if (session) {
    redisController.readKeyValuePair(session).then(val => {
      if (val) {
        const userData = JSON.parse(val);
        request(options, function(error, response, body) {
          if (error) {
            // return res.status(500).send({ message: error.message });
            logger.info("error occured in postEstoreData");
            return utils.sendResponseByEliminatingXSS(
              req,
              res,
              error,
              response,
              body
            );
          }
          const selfieResponse = JSON.parse(body);
          const data = {
            ...userData,
            verified: selfieResponse[0].status,
          };
          redisController.writeKeyValuePair(session, data);

          return utils.sendResponseByEliminatingXSS(
            req,
            res,
            error,
            response,
            body
          );
        });
      }
    });
  } else {
    return res.status(422).send("Session Id is required");
  }
});

router.get("/getSessionDetails", (req, res) => {
  const session = getToken(req.headers);

  if (session) {
    redisController.readKeyValuePair(session).then(val => {
      if (val) {
        const data = JSON.parse(val);
        return res.status(200).send(data);
      }

      return res.status(401).send("Session Expired or not found");
    });
  } else {
    return res.status(422).send("Session Id is required");
  }
});


module.exports = router;
