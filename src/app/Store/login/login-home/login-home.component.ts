import { Component, OnInit, ViewContainerRef, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { BaseComponent } from '../../../base.component';
import { AppService } from '../../../Service/app.service';
import { LoginService } from '../service/login.service';
import { Renderer2, Inject } from '@angular/core';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { UserService } from '../../../Service/user.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { SECURITY_CODE } from 'app/shared/constants/session-storage.constants';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css'],
  providers: [LoginService, AppService, CommonUtilService]
})
export class LoginHomeComponent extends BaseComponent implements OnInit, AfterViewInit {
  msisdn: any = "";
  message: any;
  invalidmsisdn = false;
  state: any;
  errorMessage: Object;
  errorExits = false;
  public disableAfterClick = false;
  public isCSAgentDealer = false;
  public popupStyle: any;
  public keepCelcomNum: any = null;
  public loading = false;
  public isMnp = false ;
  public remove = false;
  enableNRICAuthentication = false;
  loginButtonTxt = "Submit";
  formErrors: object;

  constructor(
    private _service: AppService,
    private loginService: LoginService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _userService: UserService,
    private _commonUtilService: CommonUtilService
  ) {
    super();
    this.popupStyle = {
      'visibility': 'hidden'
    };
    this.errorMessage = {
      message: this.errorConst.SYS_DOWN_MSG
    };
    this.formErrors = this.formConst;
  }
  clearMsisdn() {
    this.msisdn = '';
    this.remove = false;
    this.enableNRICAuthentication = false;
    this.errorExits = false;
  }

  loginThroughEnterButton(event, form) {
    const resultData = this.msisdn.toString().charAt(0);
    if (this.msisdn !== "") {
      this.msisdn = (resultData !== '6') ? ("60" + this.msisdn).substring(0,3) === "600" ? "6" + this.msisdn : "60" + this.msisdn : this.msisdn;
    }
    if (this.errorExits) {
      this.errorExits = false;
    }

    if (event.keyCode === 13) {
      if (this.invalidmsisdn === false) {
        this.onLoginClick(form);
      }
    }
  }

   validMsisdn(ev) {
    return this._commonUtilService.restrictOnlyNum(ev, "contactMobileNum", this.msisdn ? this.msisdn.toString() : "");
  }

  onLoginClick(form) {
    this.disableAfterClick = true;
    this.loading = true;
    const msisdnFirstChar = this.msisdn.toString().charAt(0);
    this.msisdn = (msisdnFirstChar !== '6') ? "6" + this.msisdn :  this.msisdn;
    if (form.invalid) {
      return;
    }
    this._activatedRoute.queryParams.subscribe(params => {
      if (params.order_id && params.order_id !== null && params.order_secret &&
        params.order_secret !== null && typeof window !== "undefined" && sessionStorage) {
        const orderId = params.order_id;
        const secretKey = params.order_secret;
        sessionStorage.setItem('CAorderId', orderId);
        sessionStorage.setItem('secretKey', secretKey);
      }
    });
    this.routeToNext();
  }
  routeToNext() {
    if (this.isCobpLogin()) {
      this.getMsisdnType();
    } else {
      this.sendOtp();
    }
  }
  getMsisdnType() {
      const getMsisdnTypeAPIUrl = ApiConstant.VERIFY_CUSTOMER;
      const getMsisdnTypeAPIRequestBody = this._commonUtilService.encrypter(
        JSON.stringify({ "data": { "mobile_number": this.msisdn}})
    );
    this.loginService.MobileConnect(getMsisdnTypeAPIUrl, getMsisdnTypeAPIRequestBody).subscribe(
      (res: any) => {
        this.onRespSuccess(res);
      }, (err: any) => {
        this.onRespError(err);
      }
    );
  }
  onRespSuccess(res) {
    this.loading = false;
    if (res.sim_type === "Prepaid" && res.status === true && res.exception === false) {
      this.enableNRICAuthentication = true;
    } else if (res.sim_type === "Postpaid" && res.status === true && res.exception === false) {
      this.sendOtp();
    } else {
      this.onApiError(res);
    }
  }
  onRespError(err) {
    this.loading = false;
    this.errorExits = true;
  }
  onApiError(res?) {
    this.errorExits = true;
    this.errorMessage = {
      message: res.message
    };
  }
  // Send otp function call to other then COBP flows.
  sendOtp() {
    const apiUrl = ApiConstant.MC_SEND_OTP_API;
    const requestBody = {"mobile_number": this.msisdn};
    this.loginService.MobileConnect(apiUrl, requestBody).subscribe(
      (response: any) => {
        this.loading = false;
        if (typeof window !== 'undefined' && localStorage && sessionStorage && response[0].state) {
          localStorage.setItem("MyMsIsdn", this.msisdn);
          localStorage.setItem("RecoveryMyMsIsdn", this.msisdn);
          localStorage.setItem("State", response[0].state);
          sessionStorage.setItem(SECURITY_CODE, response[0]?.securityCode);
        }
        if (response[0].status === true && response[0].exists === false) {
          this.popupStyle = {
            'visibility': 'visible'
          };
        } else if (response[0].status === true && response[0].exists === true) {
          this.loginService.disableResendOtpLink(response[0]);
          this._router.navigateByUrl('/store/login/otp');
        } else {
          this.errorMessage = {
            message: response[0].message
          };
          this.errorExits = true;
        }
      }, (error: any) => {
        this.loading = false;
        this.errorExits = true;
      }
    );
  }
  close__terms__login() {
    this.popupStyle = {
      'visibility': 'hidden'
    };
  }
  callOnNricVerification() {
    setTimeout(() => {
      this.sendOtp();
    }, 3000);
  }
  TermsFunction() {
    const requestBody = {
      "mobile_number": this.msisdn,
      "tnc": true
    };
    const apiUrl = ApiConstant.MC_SEND_OTP_API;
    this.loginService.MobileConnect(apiUrl, requestBody).subscribe(
      (response: any) => {
        if (typeof window !== 'undefined' && localStorage && sessionStorage && response[0].state) {
          localStorage.setItem("State", response[0].state);
          sessionStorage.setItem(SECURITY_CODE, response[0]?.securityCode);
        }
        if (response[0].status === true && response[0].exists === true) {
          this.loginService.disableResendOtpLink(response[0]);
          this._router.navigateByUrl('/store/login/otp');
        } else {
          this.errorExits = true;
          this.errorMessage = {
            message: response[0].message
          };
          this.popupStyle = {
            'visibility': 'hidden'
          };
        }

      }, (error: any) => {
        // todo
        this.popupStyle = {
          'visibility': 'hidden'
        };
        this.errorMessage = {
          message: this.errorConst.ERR_IN_SENDING_OTP_MSG
        };
        this.errorExits = true;
      });
  }

  ngOnInit() {
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }
    if (typeof window !== "undefined" && localStorage && localStorage.getItem('MNP-FLOW')) {
      this.isMnp = true;
    }
    if (this.isCobpLogin()) {
      this.loginButtonTxt = "Submit";
    }
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
    this.RedirectToCataloguePage();
  }
  isCobpLogin(): boolean {
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
  RedirectToCataloguePage() {
    if (this._userService.isCustomer() || this._userService.isGuest() || this._userService.isMCUser()) {
      window.location.href = "/store/devices";
    }
  }
}
