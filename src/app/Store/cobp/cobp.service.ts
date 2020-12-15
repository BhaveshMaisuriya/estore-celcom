import { Injectable } from '@angular/core';
import { AppService } from '../../Service/app.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';

const mockUpfrontDevice = [{"penaltyCheck":{"status":true,"endDate":"20210608_080000","productPromotionPartNumber":"PB19090","productPromotionId":"1-15XX9XVC","exception":false,"current_plan":"PB19090","eligible_contract_extend":false,"device_upfront_penalty":"200"},"openOrder":{"status":true,"exception":false,"outputOpenOrderValidationResp":{"Error_spcMessage":"","OrderStatus":"","orderNumber":"","serialNumber":"0133974234","openOrderFlag":"N","outletId":"","OrderId":"","Error_spcCode":""},"message":null},"blackList":{"blacklistChkResponse":{"blacklistIndicator":"No"},"status":true,"exception":false,"blacklistIndicator":"No","message":null},"productEligibility":{"status":true,"message":"Plan is eligible for this user","exception":false,"plan":1,"process_type":""},"customer_eligibility":{"status":true,"exception":false,"message":""},"golden_number_note":{"status":true,"message":""},"callBaring":{"queryFirstAppUsageResponse":{"callBarDetails":{"elementId":"0","callbarReason":""},"bADetailsRetrieve":{"paymentMethod":"","creditCardVerificationNumber":""},"balanceSummaryDetails":{"cmuBalanceSummaryVbc":[{"TotalDue":"0","latestAmountDue":"-500","dueNow":"500","unbilledUsage":"606.39"}]}},"exception":false,"status":true,"response":"","message":null},"contract_check":{"message":"","status":true,"exception":true,"autopayment":"N"},"star_eligibility":{"status":true,"message":"Plan is eligible","response":{"notAllowed":0,"plan":0,"pass":0,"penalty":1,"upfront":0,"device":0,"is_same":1,"same_pass":0,"same_plan_type":1,"plan_los":7.1666666666667,"device_contract":1,"pass_contract":1,"pass_exist":true,"device_exist":false},"change_itemtype":0,"is_ultra":1},"validated_id":"46485"}];
@Injectable()
export class CobpService {


  constructor(
    private _service: AppService

  ) { }

  public ValidateUpgradePlan(data: any, preorder: number, device: number, mviva: number, promotion: string, isEasyPhone?: any) {

    let easyPhoneVal = 0;
    let apiUrl = "/rest/V1/upgradePlan/?easy_phone="+easyPhoneVal+"&pre_order=" + preorder + "&device=" + device + "&mviva=" + mviva + "&device_sku=" + data.deviceSku;

    if(isEasyPhone){
      easyPhoneVal = 1;
    }
    
    if (promotion) {
      apiUrl = "/rest/V1/upgradePlan/?easy_phone="+easyPhoneVal+"&pre_order=" + preorder + "&device=" + device + "&mviva=" + mviva + "&" + promotion + "&device_sku=" + data.deviceSku;
    }

    return this._service
      .postEstoreUserData(apiUrl, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }
  public ValidateUpgradePlanEasyPhone(data: any, isEasyPhone: number) {
    // hotfix test star deployment
    // const val = [{"penaltyCheck":{"status":true,"endDate":null,"productPromotionPartNumber":"PB12828","productPromotionId":"1-8XZQW9E","exception":false,"current_plan":"PB12828","eligible_contract_extend":false,"device_upfront_penalty":0},"openOrder":{"status":true,"exception":false,"outputOpenOrderValidationResp":{"Error_spcMessage":"","OrderStatus":"","orderNumber":"","serialNumber":"0196797865","openOrderFlag":"N","outletId":"","OrderId":"","Error_spcCode":""},"message":null},"blackList":{"blacklistChkResponse":{"blacklistIndicator":"No"},"status":true,"exception":false,"blacklistIndicator":"No","message":null},"productEligibility":{"status":true,"process_type":"","exception":false,"message":"Plan is eligible for this user","plan":0},"customer_eligibility":{"status":true,"exception":false,"message":""},"golden_number_note":{"status":true,"message":""},"callBaring":{"status":true,"exception":false,"response":"","message":""},"account_validation":{"status":true,"message":"","exception":false},"contract_check":{"status":true,"message":"","exception":false,"autopayment":"N","customer_since":"20191206_092110"},"upfront_payment_check":{"status":true,"message":"You will be charged with 1 month upfront payment for plan type.","plan":"1","exception":false},"duration_check":{"status":false,"message":"You have been with Celcom for less than 6 months. You are not eligible for EasyPhone","exception":false},"plan_upgrade":{"status":true,"message":"Eligible plan","exception":false,"is_same":false},"moon_eligibility":{"status":true,"is_moon":0,"exception":false,"message":"Not a Moon Plan"},"validated_id":"724065"}];    
    // return Observable.of(val);
    const apiUrl = "/rest/V1/upgradePlan/?easy_phone=" + isEasyPhone + "&device_sku=" + data.deviceSku;
    return this._service
      .postEstoreUserData(apiUrl, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

}
