import { Injectable } from '@angular/core';
import { AppService, HOST } from './app.service';
import { CommonUtilService } from "./commonUtil.service";
import { updateAnalytics } from '../shared/utilities/helper.ultility';
import { AnalyticsService } from './analytic.service';
import { TPersonalForm, IGuestUser } from "../shared/models/user.model";
import { HttpClient } from '@angular/common/http';

@Injectable({
  'providedIn': 'root'
})
export class UserService {
  public agentInfo = "AgentInfo";
  public dealerInfo = "DealerInfo";
  public userInfo = "UserInfo";
  public guestInfo = "GuestInfo";
  constructor(
    private _service: AppService,
    private _commonUtilService: CommonUtilService,
    private http: HttpClient
  ) { }

  clearLocalSessionStorage() {
    if (typeof window !== "undefined" && localStorage && sessionStorage) {
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  getUserTypeByUrl(): string {
    if (window.location.href.indexOf("agentlogin") > -1) {
      return "cs_agent";
    } else if (window.location.href.indexOf("dealerlogin") > -1) {
      return "dealer_agent";
    }
  }

  getUserType(): string {
    if (this.isCSAgent()) {
      if (this.isCSAgent() && this.isCustomer()) {
        return "cs_agent_w_customer";
      } else {
        return "cs_agent";
      }
    } else if (this.isDealer()) {
      if (this.isDealer() && this.isCustomer()) {
        return "dealer_agent_w_customer";
      } else {
        return "dealer_agent";
      }
    } else if (this.isMCUser()) {
      return "mc_user";
    } else if (this.isGuest()) {
      return "guest_user";
    } else {
      return "anonymous";
    }
  }

  isCSAgent(): boolean {
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem(this.agentInfo)) {
      return true;
    } else {
      return false;
    }
  }

  // To check if the user already been in summary or not,so if the user go back to another product,
  // user wont go to personal details page again
  didSummary(): boolean {
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("didSummary") && sessionStorage.getItem("didSummary") === "true") {
      return true;
    } else {
      return false;
    }
  }

  isDealer(): boolean {
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem(this.dealerInfo)) {
      return true;
    } else {
      return false;
    }
  }

  isMCUser(): boolean {
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem(this.userInfo)
      && !['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE"))) {
      return true;
    } else {
      return false;
    }
  }

  getMsisdn() {
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem(this.userInfo)) {
      return sessionStorage.getItem('msisdn');
    }
    return '';
  }

  isGuest(): boolean {
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem(this.guestInfo)
      && ['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE"))) {
      return true;
    } else {
      return false;
    }
  }

  isCustomer(): boolean {
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("UserInfo") || sessionStorage.getItem("GuestInfo"))) {
      return true;
    } else {
      return false;
    }
  }

  getUserMsisdn(): string {
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("MyMsIsdn")) {
      return localStorage.getItem("MyMsIsdn");
    } else {
      return null;
    }
  }

  isMnp(): boolean {
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("MNP-FLOW")
      && sessionStorage.getItem("GuestInfo") === 'YES')) {
      return true;
    } else {
      return false;
    }
  }

  isUserEnterprise(): boolean {
    if (sessionStorage.getItem("USER_TYPE") == 'ENTERPRISE' && sessionStorage.getItem("GuestInfo")) {
      return true;
    }
    return false;
  }

  updateApiUrl(url: string) {
    if (this.isCSAgent() && !this.isDealer()) {
      if (url.indexOf("?") > -1) {
        url = url + "&agenttype=agent";
      } else {
        url = url + "?agenttype=agent";
      }
    } else if (this.isDealer() && !this.isCSAgent()) {
      if (url.indexOf("?") > -1) {
        url = url + "&agenttype=dealer";
      } else {
        url = url + "?agenttype=dealer";
      }
    } else if (this.isUserEnterprise()) {
      if (url.indexOf("?") > -1) {
        url = url + "&agenttype=enterprise";
      } else {
        url = url + "?agenttype=enterprise";
      }
    }
    return url;
  }

  clearStorageForUser() {
    let agentInfo = null;
    let dealerInfo = null;
    if (sessionStorage && sessionStorage.getItem("AgentInfo")) {
      agentInfo = JSON.parse(sessionStorage.getItem("AgentInfo"));
    }
    if (sessionStorage && sessionStorage.getItem("DealerInfo")) {
      dealerInfo = JSON.parse(sessionStorage.getItem("DealerInfo"));
    }
    this.clearLocalSessionStorage();
    if (agentInfo) {
      sessionStorage.setItem("AgentInfo", JSON.stringify(agentInfo));
    }
    if (dealerInfo) {
      sessionStorage.setItem("DealerInfo", JSON.stringify(dealerInfo));
    }
  }

  public UserLogout() {
    let url = "/rest/V1/customerLogout";
    if (localStorage && localStorage.getItem('sessionHash')) {
      url = url + '?sessionHash=' + localStorage.getItem('sessionHash');
    }
    this._service.getEstoreUserData(url).subscribe(
      (response: any) => {
        this.clearStorageForUser();
        this.Redirect("/store/devices");
      }, (error: any) => {
        this.clearStorageForUser();
        this.Redirect("/store/devices");
      });
  }

  Redirect(url: string) {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }

  doGuestLogin(response, customerIDNo, customerIDType = "New NRIC") {
    const guestBlkChkRequest = {
      // ValidatAnalyticsServiceing blacklist info.
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: customerIDNo,
        customerIDTypeValue: customerIDType
      },
      // Customer info for some data validations.
      outputCPResp: {
        customerID: customerIDNo,
        dateOfBirth: this._commonUtilService.capturingDOBFromNRIC(customerIDNo) + "_000000",
        preferredContactMethod: response[0].preferred_contact_method,
        contactPreferredTime: response[0].preferred_contact_time,
        contactEmail: response[0].email,
        contactSalutation: response[0].contact_salutation,
        services: [{ "pre_Pos_Indicator": "Postpaid" }]
      }
    };
    updateAnalytics('nric', response?.[0]?.nric);

    if (typeof window !== "undefined" && localStorage && sessionStorage) {
      sessionStorage.setItem("UserToken", response[0].token);
      sessionStorage.setItem("authtoken", response[0].authtoken);
      sessionStorage.setItem("personalForm", JSON.stringify(guestBlkChkRequest));
      sessionStorage.setItem("USER_TYPE", "GUEST");
      sessionStorage.setItem("GuestInfo", JSON.stringify(guestBlkChkRequest));
      if (response[0].new_guest) {
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
    sessionStorage.removeItem('prepaiduser');
  }

  guestLogin(customerIDNo, idType = '1') {
    const request = {
      "login_data": {
        "user": "guest",
        "id_type": idType,
        "id_number": customerIDNo
      }
    };
    const url = "/rest/V1/login";
    const createActivityReq = JSON.stringify(request);
    return this._service.postROI(url, createActivityReq);
  }

  getPersonalForm(): TPersonalForm {
    if (this.isCustomer()) {
      const str = sessionStorage.getItem('personalForm');
      const personalForm = str !== null ? JSON.parse(str) : null;

      if (personalForm === null) {
        return null;
      }

      if (personalForm?.outputCPResp?.contactFirstName) {
        return {
          type: 'user',
          data: personalForm
        };
      } else {
        return {
          type: 'guest',
          data: personalForm
        };
      }
    }

    return null;
  }

  getUserInfo(): IGuestUser {
    if (window && sessionStorage) {
      const userInfo = JSON.parse(sessionStorage.getItem('UserInfo')) || null;
      return userInfo;
    }

    return null;
  }

  isUserPreToPost(): boolean {
    const data = sessionStorage.getItem('typeofuser');
    return data === 'Prepaid';
  }

  postDealerAgentDetails(data) {
    console.error('dealer',data);
    const url = HOST + '/userDealerMap'
    this.http.post(url, data).subscribe(res => {
      // logging is successful;
    })
  }
}
