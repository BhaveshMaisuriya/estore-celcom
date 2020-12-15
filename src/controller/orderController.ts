import * as apiController from "./apiController";
import { proxiedRequest as request } from "./proxyRequest";
import * as environment from "../../environment.json";
const paymentProdURLReferer = "https://onlinepayment.celcom.com.my/Payment/PreResponse";
const paymentTestingURLReferer = "https://test.onlinepayment.celcom.com.my/Payment-Testing/PreResponse";
const paymentProdURLRefererEasyPhone = "https://onlinepayment.celcom.com.my/Payment/";
const paymentTestingURLRefererEasyPhone = "https://test.onlinepayment.celcom.com.my/Payment-Testing/";
const paymentStagingHost = "https://test.onlinepayment.celcom.com.my/";

const isProd = (<any>environment).production;
const logger = require('../utils/logger');
const commonUtils = require('../utils/commonUtils');

export let PlaceOrder = (req, res) => {
    const RefererURL = isProd ? paymentProdURLReferer : paymentTestingURLReferer;
    const EasyPhoneRefererURL = isProd ? paymentProdURLRefererEasyPhone : paymentTestingURLRefererEasyPhone;
    const host =  req.headers.referrer || req.headers.referer || "";
    req.url = "/rest/V1/placeOrder";
    const body = req.body;
    let paymentType;
    let transactionType;
    const paymentTypetoSend = body['paymentMethod'] || '';
    const orderId = body['orderId'] || '';
    const totalAmount = body['totalAmount'] || '0.00';
    const cardType = body['cardtype'] || null;
    const cardPaddedNum = body['cardPaddedNum'] || null;
    let cardTypeConverted = "";
    if (paymentTypetoSend === "7") {
        paymentType = "Payment Via BCO (FPX)";
        transactionType = 1042;
    } else if (paymentTypetoSend === "1") {
        paymentType = "Credit Card";
        transactionType = 917;
    } else if (paymentTypetoSend === "6") {
        paymentType = "Boost";
        transactionType = 1229;
    }

    if (cardType !== null) {
        if (cardType === 'V') {
         cardTypeConverted = 'Visa';
        } else if (cardType === 'M') {
            cardTypeConverted = 'MasterCard';
        } else if (cardType === 'A') {
            cardTypeConverted = 'American Express';
        }
      } else {
          if (cardPaddedNum !== null) {
            if (cardPaddedNum.charAt(0) === '4') {
                cardTypeConverted = 'Visa';
             } else if (cardPaddedNum.charAt(0) === '5') {
                cardTypeConverted = 'MasterCard';
             } else if (cardPaddedNum.charAt(0) === '3') {
                cardTypeConverted = 'American Express';
             }
          }
      }
    const formPlaceOrderBody = {
        "payment_data": {
            "order_id": orderId,
            "refer_id": body['referId'] || orderId,
            "payment_method": paymentType,
            "transaction_type": transactionType,
            "credit_card_token": body['token'] || null,
            "cel_credit_card_type": cardTypeConverted
        }
    };
    const returnCode = body['returnCode'];

    if (!isProd) {
        logger.info(commonUtils.getObjectForLoggingForController(req, `PlaceOrder host for orderId ${req.body['orderId']} : ${host}`, __filename, host));
        logger.info(`Place order host check for orderId: ${orderId} result : ${(host.indexOf(RefererURL) > -1 || host.indexOf(EasyPhoneRefererURL) > -1 || (!isProd && host.includes(paymentStagingHost)))}`);
        logger.info(`Return code for PlaceOrder for orderId ${orderId}: ${returnCode}`);
    }

    req.body = formPlaceOrderBody;
    let returnUrl = "/store/checkout/orderconfirmation?returnCode=" + returnCode + "&orderId=" + orderId + "&totalAmount=" + totalAmount;
    
    if (host.indexOf(RefererURL) > -1 || host.indexOf(EasyPhoneRefererURL) > -1 || (!isProd && host.includes(paymentStagingHost))) {
        if (returnCode === 1 || returnCode === "1") {
            const options = apiController.generateEstoreOptionsForPostWithOauth(req, res);
            logger.info(`placeOrder Options for orderId ${orderId}:`, options);
            request(options, function (error, responseBody, resBody) {
                logger.error(commonUtils.getObjectForLoggingForController(responseBody, `PlaceOrder response for orderId ${orderId} : ${JSON.stringify(responseBody)}`, __filename, JSON.stringify(resBody)));
                let response = {status: false, message: ""};
                logger.info(`PlaceOrder response orderId ${orderId} :`, resBody);
                try {
                    if (responseBody.body) {
                        if (JSON.parse(responseBody.body)[0]) {
                            response = JSON.parse(responseBody.body)[0];
                        }
                    }
                } catch (e) {
                    logger.error(`PlaceOrder response error catch block for orderId ${orderId}: `, e);
                }
                if (error) {
                    logger.error(`PlaceOrder response error for orderId ${orderId}: `, error)
                    returnUrl += "&orderstatus=false&magfailure=true&magmessage=" + response.message;
                    res.redirect(returnUrl);
                }
                if (response.status === true) {
                    returnUrl += "&orderstatus=true";
                } else {
                    returnUrl += "&orderstatus=false&magfailure=true&magmessage=" + response.message;
                }
                res.redirect(returnUrl);
            });
        } else {
            returnUrl += "&orderstatus=false" + "&reasonCode=" + body['reasonCode'] + "&reasonDesc=" + body['reasonDesc'];
            res.redirect(returnUrl);
        }
    } else {
        returnUrl += "&orderstatus=false" + "&reasonCode=" + body['reasonCode'] + "&reasonDesc=" + body['reasonDesc'];
        res.redirect(returnUrl);
    }
};

export let SendPaymentData = (req, res) => {
    const body = req.body;
    let paymentType;
    let transactionType;
    const paymentTypetoSend = body['paymentMethod'];

    if (paymentTypetoSend === "7") {
        paymentType = "Payment Via BCO (FPX)";
        transactionType = 1042;
    } else if (paymentTypetoSend === "1") {
        paymentType = "Credit Card";
        transactionType = 917;
    } else if (paymentTypetoSend === "6") {
        paymentType = "Boost";
        transactionType = 1229;
    }

    const formPaymentDataBody = {
        orderId: body['orderId'],
        storeId: body['storeId'],
        transDate: body['transDate'] || null,
        returnCode: body['returnCode'],
        reasonCode: body['reasonCode'],
        reasonDesc: body['reasonDesc'],
        totalAmount: body['totalAmount'] || "0",
        signature: body['signature'],
        paymentMethod: body['paymentMethod'],
        referId: body['referId'] || null,
        authCode: body['authCode'] || null,
        cardPaddedNum: body['cardPaddedNum'] || null,
        token: body['token'] || null,
        expiry_date: body['expiry_date'] || null,
        transaction_id: body['transaction_id'] || null,
        paymentMethodForRequest: paymentType,
        TransactionTypeForRequest: transactionType,
        cardType: body['cardtype'] || null,
        cardMask: body['cardMask'] || null,
        cardName: body['cardName'] || null
    };
    const paymentRequest = req;
    paymentRequest.body = { "payment_data": formPaymentDataBody };
    paymentRequest.url = "/rest/V1/paymentData";
    const options = apiController.generateEstoreOptionsForPostWithOauth(paymentRequest, res);
    logger.info(`paymentData api is called ${body['orderId']}`, options);
    request(options, function (error, response, resbody) {
        if (error) {
            // return res.status(500).send({ message: error.message });
            logger.error(`error occured in paymentData for order ${body['orderId']}`, error);
          }else{
            logger.info(`PaymentData Response for ${body['orderId']}`, JSON.stringify(response), resbody);
          }
    });
};

