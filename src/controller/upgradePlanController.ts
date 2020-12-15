import * as apiController from '../controller/apiController';
import * as environment from '../../environment.json';

var request = require('request');

export const penalityCheckUrl = "/api/userregistration/v1/";
export const penalityCheckText = "/penaltyCheck";

export const callBaringForMSISDNUrl = "/oneapi/queryprofile/v1/";
export const callBaringUrlForAddingAccNo = "/queryfirstappusage?billingAccountNumber=";

export const planCompactibilyUrl = "/store/v1/queryUpgradePromotion?spcId=";
export const planCompactibilyUrlForAddingPromoNo = "&currentPromoNo=";

export const orderValidationUrl = "/order/v1/openordervalidation";

export let getRequest = (req,res) => {
    let options = apiController.generateOptionsForGet(req,res);
    req.start = Date.now();
    return new Promise(function (success, failure) {
        request(options, function (error, response, body) {
            console.log("" + options.url + ":" + (Date.now() - req.start));
            if (!error && response.statusCode == 200) {
                success(body);
             
            } else {
                failure(error);
            }
        });
    });
};

export let displayRespone = (req,res) => {
    let output:any = {
        isAmountDue : req.isAmountDue,
        isAnyOrderOpen : req.isAnyOrderOpen,
        isMyPlanExistInUpgradePlanList : req.isMyPlanExistInUpgradePlanList,
        celProductClassName : req.celProductClassName,
        effectiveEndDate : req.effectiveEndDate,
        callBarDetails : req.callBarDetails,
        isCurrentPromoEqualsRequested : req.isCurrentPromoEqualsRequested,
        message : req.message,
        isNoSpcIdPromoNo : req.isNoSpcIdPromoNo
    };
    res.send(output);
};

export let getUpgradePlanDetails = (req,res) => {

    req.start = Date.now();
    if(req.body && req.body.MobileNumber){
        req.url = penalityCheckUrl + req.body.MobileNumber + penalityCheckText;

        getRequest(req,res).then(function (response:any) {
            console.log("Get upgrade Plan Details, Penality check: ");
            let parsedResponse = JSON.parse(response);
            console.log(parsedResponse);
            if(parsedResponse && parsedResponse.penaltyCheckResponse) {

                req.prodPromId = parsedResponse.penaltyCheckResponse.productPromotionId;
                req.prodPromPartNumber = parsedResponse.penaltyCheckResponse.productPromotionPartNumber;

                if(parsedResponse.penaltyCheckResponse.listOfCelAssetMgmtAssetEai 
                    && !!parsedResponse.penaltyCheckResponse.listOfCelAssetMgmtAssetEai.length) {
                    // listOfCelAssetMgmtAssetEai is an Array
                    req.celProductClassName = parsedResponse.penaltyCheckResponse.listOfCelAssetMgmtAssetEai[0].celProductClassName;
                    req.effectiveEndDate = parsedResponse.penaltyCheckResponse.listOfCelAssetMgmtAssetEai[0].effectiveEndDate;
                } else if (parsedResponse.penaltyCheckResponse.listOfCelAssetMgmtAssetEai 
                    && !parsedResponse.penaltyCheckResponse.listOfCelAssetMgmtAssetEai.length) {
                    // listOfCelAssetMgmtAssetEai is an Object
                    req.celProductClassName = parsedResponse.penaltyCheckResponse.listOfCelAssetMgmtAssetEai.celProductClassName;
                    req.effectiveEndDate = parsedResponse.penaltyCheckResponse.listOfCelAssetMgmtAssetEai.effectiveEndDate;
                }

                if(req.prodPromPartNumber == req.body.RequestedPromoNumber){
                    // Return to caller as can't continue with COBP flow
                    req.message = "Your existing plan and requested plan are same";
                    req.isCurrentPromoEqualsRequested = true;
                    displayRespone(req,res);
                } else {
                    req.isCurrentPromoEqualsRequested = false;
                    return getTotalAmountDue(req,res);
                }
            } else {
                // Have not got proper response from penaltyCheck API.
                res.status(400).send({message: "No proper response from penaltyCheck API"});
            }
        }, function (error:any) {
            res.status(400).send({message: "Error occurred during Penalty Check API: " + error.message});
        });
    }
    else{
        // Return to caller as can't continue with COBP flow
        res.status(400).send({message: "Please provide Mobile number"});
    }
};

export let getTotalAmountDue = (req,res) => {

    req.url = callBaringForMSISDNUrl + req.body.MobileNumber + callBaringUrlForAddingAccNo + req.body.BillingAccountNumber;
    getRequest(req,res).then(function (response:any) {
        console.log("Get Amount Due, call barring: ");
        let parsedResponse = JSON.parse(response);

        let totalAmountDue = 0;
        if(parsedResponse && parsedResponse.queryFirstAppUsageResponse) {
            if(parsedResponse.queryFirstAppUsageResponse.balanceSummaryDetails 
                && parsedResponse.queryFirstAppUsageResponse.balanceSummaryDetails.cmuBalanceSummaryVbc) {
                let balanceSummary = parsedResponse.queryFirstAppUsageResponse.balanceSummaryDetails.cmuBalanceSummaryVbc;
                totalAmountDue = balanceSummary[0].totalAmountDue;
            }
            req.callBarDetails = parsedResponse.queryFirstAppUsageResponse.callBarDetails;
        }
        if(totalAmountDue != 0){
            // Return to caller as can't continue with COBP flow
            req.isAmountDue = true;
            req.message = "Total Amount Due is not Zero.";
            return displayRespone(req,res);
        } else {
            req.isAmountDue = false;
            return getPlanDetails(req,res);
        }
    }, function (error: any) {
        res.status(400).send({message: "Error occurred in Call Barring API: " + error.message});
    }); 
};

export let getPlanDetails = (req,res) => {
    //req.prodPromId = req.body.SpcId;
    //req.prodPromPartNumber = req.body.RequestedPromoNumber;
    if(req.prodPromId && req.prodPromPartNumber){
        console.log("Get Plan compatibility Details: ");
      
        req.isNoSpcIdPromoNo = false;
        let isFound = false;
        req.url = planCompactibilyUrl + req.prodPromId + planCompactibilyUrlForAddingPromoNo + req.prodPromPartNumber;
        //req.url = planCompactibilyUrl+ req.body.SpcId + planCompactibilyUrlForAddingPromoNo + req.body.CurrentPromoNumber;
        getRequest(req,res).then(function (response:any) {
            let parsedResponse = JSON.parse(response);
            req.queryUpgradePromotionResponse = parsedResponse.queryUpgradePromotionResponse;
            
            let data:any = [];
            if(parsedResponse && parsedResponse.queryUpgradePromotionResponse && parsedResponse.queryUpgradePromotionResponse.listOfCelupgradepromotion 
                && parsedResponse.queryUpgradePromotionResponse.listOfCelupgradepromotion.issPromotion[0] 
                && parsedResponse.queryUpgradePromotionResponse.listOfCelupgradepromotion.issPromotion[0].listOfIssPromotionUpgradeTo) {
                    data = parsedResponse.queryUpgradePromotionResponse.listOfCelupgradepromotion.issPromotion[0].listOfIssPromotionUpgradeTo.issPromotionUpgradeTo;
            }
 
            req.isMyPlanExistInUpgradePlanList = isPromoAvailable(req,data);

            if(req.isMyPlanExistInUpgradePlanList) {
                // Check for Open Order when selected plan is available in the upgrade list
                isOrderExist(req,res);
            } else {
                // Return to caller as can't continue with COBP flow
                req.message = "Selected plan is not in upgrade plan list";
                return displayRespone(req,res);
            }

        }, function(error:any) {
            res.status(400).send({message: "Error occurred in Plan compatible API: " + error.message});
        });  
   } else{
       // Return to caller as can't continue with COBP flow
       req.message = "No SPCID and Promo Number available";
       req.isNoSpcIdPromoNo = true;
       displayRespone(req,res);
    }
};

export let isPromoAvailable = (req,data) => {
    
    let isFound = false;
    for (var i=0; i < data.length; i++){
        if (req.body.RequestedPromoNumber == data[i].TargetPromotionPartNum){
            isFound = true;
            break;
        }
    }
    return isFound;
};

export let isOrderExist = (req,res) => {
    req.url = orderValidationUrl;
    let requestData = {
        "inputOpenOrderValidationReq": {
            "serialNumber": req.body.MobileNumber
        }
    };
    req.body = requestData;
    console.log("request body before open order call: " + req.body);
    callForOpenOrderCheck(req,res);
};

export let callForOpenOrderCheck = (req,res) => {
    let options = apiController.generateOptionsForPost(req,res);
    console.log("request body in open order check: " + req.body);
    req.start = Date.now();
    request(options, function (error, response, body) {
        console.log("" + options.url + ":" + (Date.now() - req.start));
        if (error) return res.status(500).send({ message: error.message });
        let parsedResponse = JSON.parse(body);

        if(parsedResponse && parsedResponse.outputOpenOrderValidationResp && parsedResponse.outputOpenOrderValidationResp.openOrderFlag == 'N'){
            req.isAnyOrderOpen = false;
        } else {
            req.isAnyOrderOpen = true;
        }
        displayRespone(req,res);
    });
};
