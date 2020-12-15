import { Injectable } from '@angular/core';
import { AppService, HOST } from 'app/Service/app.service';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { iGeneralServerResponse } from 'app/shared/models/general.model';
import { Observable } from 'rxjs';
import { StarEligibility } from 'app/shared/models/cobp.model';

@Injectable({
  providedIn: 'root'
})
export class CobpWrapperService {
  domain = HOST;

  constructor(
    private _service: AppService,
    private http: HttpClient,
  ) { }


  public ValidateUpgradePlan(
    data: any, 
    easyPhoneVal:number, 
    preorder: number, 
    device: number, 
    mviva: number, 
    promotion: string, 
    isEasyPhone?: any) {

    let apiUrl = "/rest/V1/upgradePlan/?easy_phone="+easyPhoneVal+"&pre_order=" + preorder + "&device=" + device + "&mviva=" + mviva + "&device_sku=" + (data.deviceSku || '');

    if (promotion) {
      apiUrl = "/rest/V1/upgradePlan/?easy_phone="+easyPhoneVal+"&pre_order=" + preorder + "&device=" + device + "&mviva=" + mviva + "&" + promotion + "&device_sku=" + (data.deviceSku || '');
    }

    return this._service
      .postEstoreUserData(apiUrl, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public upgradeDowngrade(
    data: any, 
    params: Params): Observable<COBPResponse.RootObject> {

    return this.http
      .post<COBPResponse.RootObject>(`${this.domain}/rest/V1/upgradePlan`, 
        {...data}, 
        {params})
      .pipe(
        map(response => response[0]),
      );
  }
}


export declare module COBPResponse {
  interface RootObject extends iGeneralServerResponse {
    penaltyCheck?: PenaltyCheck;
    openOrder?: OpenOrder;
    blackList?: BlackList;
    productEligibility?: ProductEligibility;
    customer_eligibility?: Customereligibility;
    golden_number_note?: Goldennumbernote;
    callBaring?: CallBaring;
    contract_check?: Contractcheck;
    account_details?: Accountdetails;
    moon_eligibility?: Mooneligibility;
    upfront_payment_check?: Upfrontpaymentcheck;
    lifestyle_eligibility?: LifeStyleElgibility;
    validated_id?: string;
    star_eligibility?: StarEligibility;
  }

  interface Upfrontpaymentcheck {
    status: boolean;
    message: string;
    plan: string;
    exception: boolean;
  }
  
  interface Mooneligibility {
    status: boolean;
    is_moon: number;
    exception: boolean;
    message: string;
  }
  
  interface Accountdetails {
    principal_number: string;
    plan_subscribed_to: string;
    supplementary_info: Supplementaryinfo;
  }
  
  interface Supplementaryinfo {
    supplementary_lines: any[];
  }
  
  interface Contractcheck {
    message: string;
    status: boolean;
    exception: boolean;
    autopayment: string;
  }
  
  interface CallBaring {
    queryFirstAppUsageResponse: QueryFirstAppUsageResponse;
    exception: boolean;
    status: boolean;
    response: string;
    message: string;
  }
  
  interface QueryFirstAppUsageResponse {
    callBarDetails: CallBarDetails;
    bADetailsRetrieve: BADetailsRetrieve;
    balanceSummaryDetails: BalanceSummaryDetails;
  }
  
  interface BalanceSummaryDetails {
    cmuBalanceSummaryVbc: CmuBalanceSummaryVbc[];
  }
  
  interface CmuBalanceSummaryVbc {
    TotalDue: string;
    latestAmountDue: string;
    dueNow: string;
  }
  
  interface BADetailsRetrieve {
    paymentMethod: string;
    creditCardVerificationNumber: string;
  }
  
  interface CallBarDetails {
    elementId: string;
    callbarReason: string;
  }
  
  interface Goldennumbernote {
    status: boolean;
    message: string;
  }
  
  interface Customereligibility {
    status: boolean;
    exception: boolean;
    message: string;
    subscribing_to: string;
    subscribing_for: string;
  }
  
  interface ProductEligibility {
    status: boolean;
    process_type: string;
    exception: boolean;
    message: string;
    plan: number;
  }
  
  interface BlackList {
    blacklistChkResponse: BlacklistChkResponse;
    blacklistIndicator: string;
    status: boolean;
    exception: boolean;
    response: string;
    message: string;
  }
  
  interface BlacklistChkResponse {
    blacklistIndicator: string;
  }
  
  interface OpenOrder {
    status: boolean;
    exception: boolean;
    outputOpenOrderValidationResp: OutputOpenOrderValidationResp;
    message?: any;
  }
  
  interface OutputOpenOrderValidationResp {
    Error_spcMessage: string;
    OrderStatus: string;
    orderNumber: string;
    serialNumber: string;
    openOrderFlag: string;
    outletId: string;
    OrderId: string;
    Error_spcCode: string;
  }
  
  interface PenaltyCheck {
    status: boolean;
    endDate?: any;
    productPromotionPartNumber: string;
    isActiveContract: boolean;
    productPromotionId: string;
    exception: boolean;
    current_plan: string;
    eligible_contract_extend: boolean;
    device_upfront_penalty: number;
  }

  interface LifeStyleElgibility {
    status: boolean;
    title: string;
    message: string;
    upfront: number;
    existing_lifestyle_contract: boolean;
  }

}