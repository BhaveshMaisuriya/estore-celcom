const jwt = require("jwt-simple");
const _ = require('lodash');
const crypto = require('crypto');
const asymmetricCrypto = require('asymmetric-crypto');

const algorithm = 'aes-256-ctr';
const encodePwd = '[fZF3d{v';
const tokenSecret = "fvDQBmyt852yspuw";

export let generateUniqueJwtToken = (mobileNumOrNRIC) => {
  const tokData = {
    mobileNumOrNRIC: mobileNumOrNRIC,
    createdAt: new Date()
  };
  const token = jwt.encode(tokData, tokenSecret, 'HS512');

  const cipher = crypto.createCipher(algorithm, encodePwd);
  let crypted = cipher.update(token, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export let decrypter = (data, nonce) => {
  const decrypted = asymmetricCrypto.decrypt(data, nonce, "uhWYO05EjRPAqBWhIvW1x42S4p5GElwubbq1gTvE5zc=",
  "/2yLIDLlO1CuwZJZDqXrwVB/DQKKTb4yOvfEvYaKCSHNiMQ80P17GcnSzKXlxJ6EzVDHeN+DU2EZETxp1DVVmQ==");
  return decrypted;
};

export let decodeToken = (token) => {
  if (token && !_.isNil(token) && !_.isEmpty(token)) {
    const decipher = crypto.createDecipher(algorithm, encodePwd);
    let dec = decipher.update(token, 'hex', 'utf8');
    dec += decipher.final('utf8');
    const decoded = jwt.decode(dec, tokenSecret);
    return decoded;
  } else {
    return '';
  }
};

export let authenticateWithBearer = (req, res, next) => {
  const incomingToken = _.get(req, "headers.authtoken", undefined);
  if (_.isNil(incomingToken)) {
    return res.status(401).json({ success: false, error: "You don't have permissions to access." });
  }
  // If any unhandled errors go to catch block and give error.
  try {
    const decodedToken = decodeToken(incomingToken);
    const tokenKey = decodedToken.mobileNumOrNRIC;
    // tokenStorage.retriveJWTToken(tokenKey, function (err, tokenData) {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({ success: false, error: err });
    //   } else if (!tokenData) {
    //     return res.status(401).json({ success: false, message: 'Your session has expired. Please login to continue browsing.' });
    //   } else {
    //     _.assign(res.locals, { "decodeToken": decodedToken });
    //     tokenStorage.resetTokenExpireTime(tokenKey, (e, result) => {
    //       if (e) {
    //         console.log("Unable to Reset the Expire Time.");
    //       } else {
    //         // console.log("Successfully Reset the Expire Time.");
    //       }
    //     });
    //     return next(null, decodedToken);
    //   }
    // });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Sorry for the inconvenience, we\'re giving our system a little update. Please try again later.'
    });
  }
};
