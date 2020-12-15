import { Component, OnInit, ViewContainerRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { SECURITY_CODE } from "../../../shared/constants/session-storage.constants";
import { BaseComponent } from '../../../base.component';
import { AppService } from '../../../Service/app.service';
import { LoginService } from '../../login/service/login.service';
import { Renderer2, Inject } from '@angular/core';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { UserService } from '../../../Service/user.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from "rxjs";
import { STAR_PLAN_PREFIX } from '../../../shared/models/plan.model';

@Component({
  selector: 'app-msisdn-input',
  templateUrl: './msisdn-input.component.html',
  styleUrls: ['./msisdn-input.component.css']
})
export class MsisdnInputComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Output() sentOtp = new EventEmitter();
  @Output() successfulLogin = new EventEmitter();
  @Input() pageType;
  @Input() pageBlock;
  @Input() verificationFor;
  @Output() resetOtp = new EventEmitter();
  @Input() nric;
  @Output() resetMsisdn = new EventEmitter();
  msisdn: any="";
  @Input() TextFlag;
  @Input() forceWhiteBG = false;
  @Input() forceGrayBG = false;
  message: any;
  invalidmsisdn = false;
  state: any;
  errorMessage: Object;
  errorExits = false;
  subscriber: Subscription;
  public enableResetButton = false;

  public disableAfterClick = false;
  public isCSAgentDealer = false;
  public popupStyle: any;
  public keepCelcomNum: any = null;
  public loading = false;
  public isMnp = false;
  enableNRICAuthentication = false;
  loginButtonTxt = "Submit";
  formErrors: object;
  public enableMCotpBox = false;
  public msisdnOtpBox = false;
  public showSendOtp = true;
  public apiError = false;
  public isPlanStar = false;
  constructor(
    private _service: AppService,
    private _loginService: LoginService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _userService: UserService,
    private _commonUtilService: CommonUtilService,
    private _deviceDataService: DeviceDataService,
  ) {
    super();
    this.setPopupHidden();
    this.formErrors = this.formConst;
    this.errorMessage = {
      message: this.errorConst.SYS_DOWN_MSG
    };
  }

  ngOnInit() {
    this.subscriber = this._deviceDataService.sharedMCTnCPopUpStyle$.subscribe(data => {
      if (data === "callOnTCAgree") {
        this.onTCAgree();
      }
    });
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }
    if (typeof window !== "undefined" && localStorage && localStorage.getItem('MNP-FLOW')) {
      this.isMnp = true;
    }
    if (this._loginService.isCobpLogin()) {
      this.loginButtonTxt = "Submit";
    }
    const plan_sku = this._activatedRoute.snapshot.params?.planPurchaseId + '';
    if (plan_sku.startsWith(STAR_PLAN_PREFIX)) {
      this.isPlanStar = true;
    }
  }
  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }
  clearMsisdn() {
    this.msisdn = '';
    this.enableNRICAuthentication = false;
    this.showSendOtp = true;
    this.enableMCotpBox = false;
    this.resetOtp.emit();
  }
  onLogin(event, form) {
    const resultData = this.msisdn.toString().charAt(0);
    if (this.msisdn !== "") {
      this.msisdn = (resultData !== '6') ? ("60" + this.msisdn).substring(0,3) === "600" ? "6" + this.msisdn : "60" + this.msisdn : this.msisdn;
    }
    if (this.errorExits) {
      this.errorExits = false;
    }
    if (event.keyCode === 13) {
      if (this.invalidmsisdn === false) {
        this.onMsisdnEnter(form);
      }
    }
  }
  restrictOnlyNum = (ev) => {
    return this._commonUtilService.restrictOnlyNum(ev, "contactMobileNum", this.msisdn ? this.msisdn.toString() : "");
  }

  validateMsisdn() {
    if (this.msisdn.toString().length === 0) {
      this.invalidmsisdn = false;
    } else {
      this.invalidmsisdn = this._loginService.validateMsisdnLength(this.msisdn.toString());
    }
  }
  onMsisdnEnter(form) {
    this.disableAfterClick = true;
    this.loading = true;
    const msisdnFirstChar = this.msisdn.toString().charAt(0);
    this.msisdn = (msisdnFirstChar !== '6') ? "6" + this.msisdn : this.msisdn;
    if (form.invalid) {
      return;
    }
    this.routeToNext();
  }
  routeToNext() {
    if (this.pageType === 'cobpInLine' || this.verificationFor === "esim") {
      this.getMsisdnType();
    } else {
      this.callSendOtp();
    }
  }
  getMsisdnType() {
      this.loading = true;
      const getMsisdnTypeAPIUrl = ApiConstant.VERIFY_CUSTOMER;
      const getMsisdnTypeAPIRequestBody = this._commonUtilService.encrypter(
        JSON.stringify({ "data": { "mobile_number": this.msisdn.toString()}})
    );
    this._loginService.MobileConnect(getMsisdnTypeAPIUrl, getMsisdnTypeAPIRequestBody).subscribe(
      (res: any) => {
        this.onSuccess(res);
      }, (err: any) => {
        this.onErr(err);
      }
    );
    this._deviceDataService.publishUpdateStep(3);
  }
  onSuccess(res) {
    this.loading = false;
    if (res.sim_type === "Prepaid" && res.status === true && res.exception === false && this.verificationFor !== "esim") {
      this.enableNRICAuthentication = true;
    } else if (res.sim_type === "Prepaid" && res.status === true && res.exception === false && this.verificationFor === "esim") {
      this.callSendOtp(res.sim_type);
    } else if (res.sim_type === "Postpaid" && res.status === true && res.exception === false) {
      this.callSendOtp(res.sim_type);
    } else {
      this.onApiErr(res);
    }
  }
  onErr(err) {
    this.loading = false;
    this.errorExits = true;
    this.apiError = true;
      this.errorMessage = {
        message: this.errorConst.SYS_DOWN_MSG,
      };
  }
  onApiErr(res?) {
    this.errorExits = true;
    this.apiError = true;
    if (res.message) {
      this.errorMessage = {
        message: res.message
      };
    } else {
      this.errorMessage = {
        message: this.errorConst.SYS_DOWN_MSG,
      };
    }
  }
  // Send otp function call to other then COBP flows.
  callSendOtp(simType?) {
    this.loading = true;
    const apiUrl = ApiConstant.MC_SEND_OTP_API;
    const requestBody = {
      "mobile_number": this.msisdn.toString(),
      "tnc": null,
      "nric": this.nric
    };
    this._loginService.MobileConnect(apiUrl, requestBody).subscribe(
      (response: any) => {
        this.loading = false;
        this._deviceDataService.publishEnableReset(true);
        if (typeof window !== 'undefined' && localStorage && sessionStorage && response[0].state) {
          localStorage.setItem("MyMsIsdn", this.msisdn.toString());
          localStorage.setItem("State", response[0].state);
          sessionStorage.setItem(SECURITY_CODE, response[0]?.securityCode);
        }
        if (response[0].status === true && response[0].exists === false) {
          this._deviceDataService.publishMCTnCPopUpStyle('visible');
        } else if (response[0].status === true && response[0].exists === true) {
          this.enableMCotpBox = true;
          this.sentOtp.emit({status: true, msisdn: this.msisdn.toString(), sim_type: simType});
          this.showSendOtp = false;
          this._loginService.disableResendOtpLink(response[0]);
        } else {
          this.errorMessage = {
            message: response[0].message
          };
          this.errorExits = true;
          this.apiError = true;
        }
      }, (error: any) => {
        this.onErr(error);
      }
    );
  }
  callOnNricVerification() {
    this.loading = true;
    setTimeout(() => {
      this.callSendOtp();
    }, 3000);
  }
  onTCAgree() {
    const requestBody = {
      "mobile_number": this.msisdn.toString(),
      "tnc": true,
      "nric": this.nric
    };
    const apiUrl = ApiConstant.MC_SEND_OTP_API;
    this._loginService.MobileConnect(apiUrl, requestBody).subscribe(
      (response: any) => {
        if (typeof window !== 'undefined' && localStorage && response[0].state) {
          localStorage.setItem("State", response[0].state);
        }
        if (response[0].status === true && response[0].exists === true) {
          this.enableMCotpBox = true;
          this.sentOtp.emit({ status: true, msisdn: this.msisdn.toString() });
          this.showSendOtp = false;
          this._deviceDataService.publishMCTnCPopUpStyle('hidden');
        } else {
          this.errorExits = true;
          this.apiError = true;
          this.errorMessage = {
            message: response[0].message
          };
          this._deviceDataService.publishMCTnCPopUpStyle('hidden');
        }

      }, (error: any) => {
        // todo
        this._deviceDataService.publishMCTnCPopUpStyle('hidden');
        this.apiError = true;
        this.errorMessage = {
          message: this.errorConst.ERR_IN_SENDING_OTP_MSG
        };
        this.errorExits = true;
      });
  }

  // isCobpLogin(): boolean {
  //   if (typeof window !== "undefined"
  //     && localStorage
  //     && localStorage.getItem('COBP_login')
  //     && localStorage.getItem('COBP_login') === "YES"
  //     && localStorage.getItem("COBP_FLOW") === "YES"
  //     && localStorage.getItem('COBP_login_Check') === "YES"
  //     && localStorage.getItem("COBP_FLOW_CHECK") === "YES") {
  //     return true;
  //   }
  // }
  // RedirectToCataloguePage() {
  //   if (this._userService.isCustomer() || this._userService.isGuest() || this._userService.isMCUser()) {
  //     window.location.href = "/store/devices";
  //   }
  // }
  ResetMsisdnOtp() {
  this.enableMCotpBox = false;
  }
  onValidOtp(e) {
    if (e) {
    this.successfulLogin.emit(true);
    }
  }
  setPopupHidden() {
    this.popupStyle = {
      'visibility': 'hidden'
    };
  }
  isProjectStar() {
    return (((typeof window !== 'undefined' && localStorage && localStorage.getItem("isProjectStar")) === 'true') && this.isPlanStar === true);
  }
 }
