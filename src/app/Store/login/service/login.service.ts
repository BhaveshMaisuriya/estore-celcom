import { Injectable, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../../../base.service';
import { AppService } from '../../../Service/app.service';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { UpgradePlanRequestModel } from '../../../Model/upgradeplan.requestparameter.model';
import { UpgradePlanResponse } from '../../../Model/upgradeplan.response.model';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { HeaderService } from 'app/Header/header.service';
import { CommonUtilService } from 'app/Service/commonUtil.service';
import { formatPhoneNumber, updateAnalytics } from 'app/shared/utilities/helper.ultility';
import { AnalyticsService } from 'app/Service/analytic.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(
    private _service: AppService,
    @Inject(forwardRef(() => DeviceDataService)) private _deviceDataService: DeviceDataService,
    @Inject(forwardRef(() => HeaderService)) private _headerService: HeaderService,
    @Inject(forwardRef(() => CommonUtilService)) private _commonUtilService: CommonUtilService,
    private _analyticsService: AnalyticsService,
  ) {
    super();
  }

  public MobileConnect(apiUrl: string, data: any) {
    return this._service
      .postROI(apiUrl, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public validateMsisdnLength(msisdn): boolean {
    let invalidmsisdn;
    const patternMSISDN = /^[0-9]*$/;
    if (!patternMSISDN.test(msisdn)) {
      invalidmsisdn = true;
    } else {
      if (msisdn.length === 0 || msisdn.length === 11) {
        invalidmsisdn = false;
      }
    }
    return invalidmsisdn;
  }
  public isCobpLogin(): boolean {
    if (typeof window !== "undefined"
      && localStorage
      && localStorage.getItem('COBP_login')
      && localStorage.getItem('COBP_login') === "YES"
      && localStorage.getItem("COBP_FLOW") === "YES"
      && localStorage.getItem('COBP_login_Check') === "YES"
      && localStorage.getItem("COBP_FLOW_CHECK") === "YES") {
      return true;
    }
  }
  public ResetOTPTextBoxById(currentTextBoxId: string) {
    if (document !== undefined) {
      const id = "txtOtp_" + currentTextBoxId;
      const objTextBox: any = document.getElementById(id);
      this.SetOtpTextBoxFocus((Number(currentTextBoxId)-1).toString());
      if (objTextBox.value && objTextBox.value.length > 1) {
      objTextBox.value = "";
      }
      const preinputbox = (Number(currentTextBoxId)-1).toString();
      const preinputid = "txtOtp_"+preinputbox;
      const preobjTextBox: any = document.getElementById(preinputid);
      preobjTextBox.select();
    }
  }
  public ManageOTPMaxLength(currentTextBoxId: string) {
    if (document !== undefined) {
      const id = "txtOtp_" + currentTextBoxId;
      const objTextBox: any = document.getElementById(id);
      if (objTextBox.value.length > 1) {
        objTextBox.value = objTextBox.value.substring(0, 1);
      }
    }
  }
  public SetOtpTextBoxFocus(otpTextBoxId: string) {
    if (document !== undefined) {
      const id = "txtOtp_" + otpTextBoxId;
      document.getElementById(id).focus();
    }
  }
  disableResendOtpLink(resendValue) {
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.setItem("DisableResendLink", "0");
      if (resendValue.disable_resend_link !== undefined) {
        const disableResendLink = resendValue.disable_resend_link * 1000;
        sessionStorage.setItem("DisableResendLink", JSON.stringify(disableResendLink));
      }
    }
  }

  public BindCustomerDetails(response, msisdn) {
    let userInfo;
    if (response.customer_data.blacklist === true) {
      this._deviceDataService.publishIsBlacklist(true);
    }
    userInfo = JSON.parse(sessionStorage.getItem("UserInfo")) || null;
    userInfo = {
      ...userInfo,
      outputCPResp: response.customer_data
    };

    const mobile_number = formatPhoneNumber(msisdn);

    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("MyMsIsdn", mobile_number);
      sessionStorage.setItem("msisdn", mobile_number);
      sessionStorage.setItem("UserInfo", JSON.stringify(userInfo));
      sessionStorage.setItem("personalForm", JSON.stringify(userInfo));
    }
    this._headerService.publishUser(userInfo.outputCPResp.name);

    try {
      if (response?.nric && response?.msisdn) {
        updateAnalytics('nric', response?.nric);
        this._analyticsService.nricType = response?.nric;
        updateAnalytics('msisdn', response?.msisdn);
        this._analyticsService.msisdnValue = response?.msisdn;
      }
    } catch (_error) {

    }

    // check for postpaid and prepaid connections if this returns true then only call next function
    if (typeof window !== "undefined" && sessionStorage) {
      sessionStorage.setItem("UserToken", response.user_token);
      sessionStorage.setItem("authtoken", response.authtoken);
    }
    if (userInfo?.outputCPResp?.services) {
      const service = userInfo?.outputCPResp?.services.find(s => {
        let mobileNumber = s.mobileNumber + '';
        if (mobileNumber.substr(0, 1) != '6') {
          mobileNumber = '6' + mobileNumber
        }
        return mobileNumber == msisdn;
      });
      if (service) {
        const typeOfUser = service.pre_Pos_Indicator;
        sessionStorage.setItem("typeofuser", typeOfUser);
        sessionStorage.setItem("esim", JSON.stringify(this._commonUtilService.encrypter(typeOfUser)));
      }
    }
  }
}
