import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { LoginService } from '../../../../app/Store/login/service/login.service';
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { PlansService } from '../../../Service/plans.service';

@Component({
  selector: 'app-esim-login',
  templateUrl: './esim-login.component.html',
  styleUrls: ['./esim-login.component.css'],
  providers: [LoginService]
})
export class EsimLoginComponent implements OnInit {
  preSelectNewReg = false;
  loading: boolean;
  enableNRICAuthentication = false;
  enableMCAuthentication = false;
  enableMCotp = false;
  msisdnOtp = null;
  nric = null;
  pageType = "hwInLine";
  verificationFor = "esim";
  simType = null;
  esimEligible = null;
  private subscriber: Subscription;
  constructor(
    public _deviceDataService: DeviceDataService,
    private _commonUtilService: CommonUtilService,
    private _loginService: LoginService,
    private _plansService: PlansService,
    ) {
   }
  ngOnInit() {
    this.onLoadEligibilityCheck();
  }
  onCallResetMsisdnOtp(e) {
    this.enableMCAuthentication = false;
    this.enableMCotp = false;
  }
  onCallResetOtp(e) {
    this.enableMCotp = false;
  }
  onCallIsMCUser(e) {
    // If existing user.
    if (e.mcUser) {
      this.enableMCAuthentication = true;
      this.nric = e.nric;
    } else { // if guest user,
      this.loading = true;
      // Call this for eSIM eligibility.
      this.onSuccessfulLogin();
    }
  }
  onSentOtp(e) {
    // If otp Sent.
    if (e) {
      this.enableMCotp = e.status;
      this.msisdnOtp = e.msisdn;
      this.simType = e.sim_type;
    }
  }
  onValidOtp(e) {
    // If otp verfied true.
    if (e) {
      // Call this for eSIM eligibility.
      this.enableMCotp = false;
      this.enableMCAuthentication = false;
      this.onSuccessfulLogin();
    }
  }
  onSuccessfulLogin() {
    const esimEligibilityCheck = JSON.parse(sessionStorage.getItem("esim"));
    this.decrypter(esimEligibilityCheck).then((successMessage) => {
      this.loading = false;
      if (successMessage === "Postpaid") {
        this.esimEligible = true;
        this._deviceDataService.publishPhoneNo(this.msisdnOtp);
        this._deviceDataService.publishEsimEligible(this.esimEligible);
        this._deviceDataService.publishAddToCartDisabling(false);
      } else {
        this.esimEligible = false;
        this._deviceDataService.publishEsimEligible(this.esimEligible);
        this._deviceDataService.publishAddToCartDisabling(true);
      }
      this._plansService.updateESIMEligibile(this.esimEligible);
    });
  }
  decrypter(valueToDecrypt) {
    return new Promise((resolve, reject) => {
      const decrypterUrl = "/rest/V1/decrypt-data";
      const decrypterCAPIRequestBody = valueToDecrypt;
      let outPut = "";
      this._loginService.MobileConnect(decrypterUrl, decrypterCAPIRequestBody).subscribe((res) => {
        outPut = res.status === true ? res.data : "apiError";
        resolve(outPut);
      }, (err) => {
        outPut = "apiFailed";
        resolve(outPut);
      });
    });
  }
  onLoadEligibilityCheck() {
    if (typeof window !== "undefined" && sessionStorage && localStorage
    && (sessionStorage.getItem("GuestInfo") || sessionStorage.getItem("UserInfo"))) {
      const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      this.msisdnOtp = localStorage.getItem("MyMsIsdn");
      this.onSuccessfulLogin();
    }
  }
}
