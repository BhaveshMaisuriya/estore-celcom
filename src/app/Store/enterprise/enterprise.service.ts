import { Injectable } from "@angular/core";
import { AppService } from "../../Service/app.service";
import { of ,  Observable } from "rxjs";
import { tap, debounceTime, delay } from "rxjs/operators";
import { UserService } from "../../Service/user.service";
import { CommonUtilService } from "../../Service/commonUtil.service";
import { DeviceDataService } from "../../Service/devicedata.service";


@Injectable()
export class EnterpriseService {
  nric: string;

  constructor(
    private _service: AppService,
    private _userService: UserService,
    private _commonUtilService: CommonUtilService,
    private _deviceDataService: DeviceDataService,
  ) { }

  checkServerValidEmail(email: string) {
    return of(false).pipe(debounceTime(2000)).pipe(delay(2000));
    // return this._service.get('/rest/V1/emailValidation/' + email);
  }

  register(data: object) {
    return this._service.postROI('/rest/V1/enterprise-register', data);
  }

  resendEmail(data: object) {
    return this._service.postROI('/rest/V1/enterprise-resend-otp', data);
  }

  login(data: object) {
    if (data['loginData'] && data['loginData']['nric']) {
      this.nric = data['loginData']['nric'];
    }
    return this._service
      .postROI('/rest/V1/login', data)
      .pipe(
        tap((response) => {
          if (response[0].status === true) {
            this.loginUser(response[0]);

          }
        })
      );
  }

  loginUser(response) {
    let userInfo;
    userInfo = {
      outputCPResp: response['userinfo'] || {},
    }
    let name = 'Enterprise User';
    if (userInfo['outputCPResp']['nric']) {
      this.nric = userInfo['outputCPResp']['nric']; 
      userInfo['outputCPResp']['customerID'] = userInfo['outputCPResp']['nric']; 
    }
    if (userInfo['outputCPResp']['name']) {
      name = userInfo['outputCPResp']['name']; 
    }
    if (response['agent_token']) {
      userInfo = {
        ...userInfo,
        agent_token: response['agent_token']
      }
    }
    if (typeof window !== 'undefined' && localStorage) {
      sessionStorage.setItem("USER_TYPE", "ENTERPRISE");
      sessionStorage.setItem("UserInfo", JSON.stringify(userInfo));
      sessionStorage.setItem("personalForm", JSON.stringify(userInfo));
      sessionStorage.setItem("UserToken", response.token);
      sessionStorage.setItem("AltToken", response.token);
      sessionStorage.setItem("authtoken", response.authtoken);
      if (response['customer_data'] && response['customer_data'].services) {
        const element = response['customer_data'].services[0];
        const typeOfUser = element.pre_Pos_Indicator;
        sessionStorage.setItem("esim", JSON.stringify(this._commonUtilService.encrypter(typeOfUser)));
        sessionStorage.setItem("typeofuser", typeOfUser);
      } else {
        const guestBlkChkRequest = {
          // ValidatAnalyticsServiceing blacklist info.
          blacklistChkRequest: {
            customerIDType: "1",
            customerIDNo: this.nric,
            customerIDTypeValue: "New NRIC"
          },
          // Customer info for some data validations.
          outputCPResp: {
            ...userInfo['outputCPResp'],
            services: [{ "pre_Pos_Indicator": "Postpaid" }]
          }
        };
        if (typeof window !== "undefined" && localStorage && sessionStorage) {
          sessionStorage.setItem("UserToken", response.token);
          sessionStorage.setItem("authtoken", response.authtoken);
          sessionStorage.setItem("personalForm", JSON.stringify(guestBlkChkRequest));
          sessionStorage.setItem("USER_TYPE", "ENTERPRISE");
          sessionStorage.setItem("GuestInfo", JSON.stringify(guestBlkChkRequest));
          if (response.new_guest) {
            sessionStorage.setItem("OLD_GUEST_USER", "NO");
            localStorage.setItem("GUEST_USER_FIRST", "YES");
          } else {
            sessionStorage.setItem("OLD_GUEST_USER", "YES");
            localStorage.setItem("GUEST_USER_FIRST", "NO");
          }
          const suppDetailsOfUser = {
            "status": true,
            "maxPostpaidLinesRemaining": 14
          };
          localStorage.setItem("suppLinesDetailsOfUser", JSON.stringify(suppDetailsOfUser));
        }
        this._deviceDataService.publishLoggerInUserName(name);
      }
    }
  }

  isEnterpriseUser() {
    if (sessionStorage.getItem("GuestInfo") && sessionStorage.getItem("USER_TYPE") == 'ENTERPRISE'){
      return true;
    }

    return false;
  }

  isOtherUser() {
    return sessionStorage.getItem("AgentInfo")
      || sessionStorage.getItem("DealerInfo")
      || (sessionStorage.getItem("GuestInfo") && sessionStorage.getItem("USER_TYPE") != 'ENTERPRISE');
  }
}
