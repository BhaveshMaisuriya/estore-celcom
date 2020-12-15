import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BaseComponent } from "../../../base.component";
import { GuestLoginComponent } from "../../../../app/Store/guest-checkout/guest-login/guest-login.component";
import { GuestCheckoutService } from '../../guest-checkout/services/guest-checkout.service';
import { OrderInfoService } from "../../../Service/orderinfo.service";
import { BundleService } from "../../../Service/bundle.service";
import { CartService } from "../../../Service/cart.service";
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { HeaderService } from "../../../Header/header.service";
import { SupplimentaryLinesService } from "../../widget/supplementary-lines/supplementary-lines.service";
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { LoginService } from '../../../../app/Store/login/service/login.service';
import { UserService } from '../../../Service/user.service';
import { AppService } from '../../../Service/app.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { SwitchToCelcomComponent } from '../../mnp/switch-to-celcom/switch-to-celcom.component';
import { Subscription } from 'rxjs';
import { STAR_PLAN_PREFIX, MOON_PLAN_PREFIX } from '../../../shared/models/plan.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nric-input',
  templateUrl: './nric-input.component.html',
  styleUrls: ['./nric-input.component.css'],
  providers: [GuestLoginComponent, OrderInfoService, BundleService, UserService, LoginService,
    HeaderService, CartService, SupplimentaryLinesService, SwitchToCelcomComponent]
})
export class NricInputComponent  extends BaseComponent implements OnInit {
  @Output() onNricVerification = new EventEmitter();
  @Output() isMCUser = new EventEmitter();
  @Output() resetMsisdnOtp = new EventEmitter();
  @Input() msisdn;
  @Input() pageType;
  @Output() succesfulLogin = new EventEmitter();
  @Input() hwEligible;
  @Input() enableResetButton;
  @Input() AppleWatchGuestFlag;
  @Input() TextFlag;
  @Input() hwNricReset;

  userLoggedIn = false;
  showBtnSubmit = true;
  showBtnReset = false;
  showInline = false;
  isNricVerified = false;
  errorExits = false;
  public isMobileConnectUser = false;
  public enableOTP = false;
  remove = true;
  errorMessage: Object;
  sample;
  nric = "";
  public hideOTPSection = false;
  public loading = false;
  public apiError = false;
  public isNRICverified = false;
  public isPlanStar = false;
  public isPlanMoon = false;
  public subscriber: Subscription;
  constructor(
    public _guestLoginComp: GuestLoginComponent,
    private _loginService: LoginService,
    private _userService: UserService,
    private _service: AppService,
    private _headerService : HeaderService,
    private _commonUtilService: CommonUtilService,
    private _deviceDataService: DeviceDataService,
    public _switchToCelcom: SwitchToCelcomComponent,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    super();
    this.errorMessage = {
      message: this.errorConst.SYS_DOWN_MSG,
      invalidId: "Invalid ID"
    };
  }

  ngOnInit() {
    if (this.pageType === "hwInLine" || this.pageType === "dbInLine" || this.pageType === "cobpInLine" ||
     this.pageType === "newInLine" || this.pageType === "suppLines") {
      this.showInline = true;
    }
    if (this.pageType === "hwInLine") {
    this.prePopulateNricForLoggedInUser();
    }
    this.subscriber = this._deviceDataService.sharedIsenableReset$.subscribe(data => {
     this.enableResetButton = data;
    });
    const plan_sku = this._activatedRoute.snapshot.params?.planPurchaseId + '';
    if (plan_sku.startsWith(STAR_PLAN_PREFIX)) {
      this.isPlanStar = true;
    }
    if (plan_sku.startsWith(MOON_PLAN_PREFIX)) {
      this.isPlanMoon = true;
    }
  }
  onSubmit(form) {
    this.errorMessage = {};
    if (this.pageType === "hwInLine" || this.pageType === "newInLine" || this.pageType === "suppLines") {
      this.getUserTypeByNRIC(this.nric.toString());
      this.showBtnSubmit = false;
    } else {
      this.verifyNRIC(this.nric.toString());
    }
  }
  verifyNRIC(custNric) {
    this.enableResetButton = false;
    this.showBtnReset = false;
    this.loading = true;
    let planName = "";
    let isLoggedIn = false;
    let planPrice = "";
    if (typeof window !== 'undefined' && localStorage) {
      let planDetailsObj;
      let planDetailsDeviceObj;
      if (localStorage.getItem("SelectedPlanDetailsInDevice")) {
        planDetailsDeviceObj = JSON.parse(localStorage.getItem("SelectedPlanDetailsInDevice"));
        planName = planDetailsDeviceObj.name ? planDetailsDeviceObj.name : '';
        planPrice = planDetailsDeviceObj.keyText || planDetailsDeviceObj.key_text || planDetailsDeviceObj.KeyText || "";
      } else if (localStorage.getItem("chosenPlan")) {
        planDetailsObj = JSON.parse(localStorage.getItem("chosenPlan"));
        planName = planDetailsObj.planDetails.name ? planDetailsObj.planDetails.name : '';
        planPrice = planDetailsObj.planDetails.KeyText || planDetailsObj.planDetails.key_text || planDetailsObj.planDetails.keyText || "";
      } else if (localStorage.getItem("SelectedPlanDetails")) {
        planDetailsObj = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
        planName = planDetailsObj.name ? planDetailsObj.name : '';
        planPrice = planDetailsObj.KeyText || planDetailsObj.key_text || planDetailsObj.keyText || "";
      }
    }
    planName = planName + " " + "(" + planPrice + "/month" + ")";
    isLoggedIn = this._userService.isCustomer();
    const cobpMsisdn = (this.msisdn === null || this.msisdn === undefined) ? this._userService.getUserMsisdn() : this.msisdn;
    this.nric = custNric;
    const verifyNRICAPIUrl = ApiConstant.VERIFY_CUSTOMER;
    const verifyNRICAPIRequestBody = this._commonUtilService.encrypter(JSON.stringify({
      "data": { "mobile_number": cobpMsisdn, "nric": this.nric, "new_plan": planName, "is_login": isLoggedIn }
    }));
    this._loginService.MobileConnect(verifyNRICAPIUrl, verifyNRICAPIRequestBody).subscribe(
      (res: any) => {
        this.onRespSuccess(res);
      }, (err: any) => {
        this.onRespError(err);
      }
    );
  }
  onRespSuccess(res) {
    this.loading = false;
    if (res.is_nric_verified === true && res.status === true && res.exception === false) {
      this.setPreToPostVerification();
      this.isNRICverified = true;
      this.onNricVerification.emit(res.is_nric_verified);
    } else if (res.is_nric_verified === false && res.status === true && res.exception === false) {
      this.isNricVerified = false;
      this.onApiError(res);
    } else {
      this.onApiError(res);
    }
  }
  onRespError(err) {
    this.loading = false;
    this.showBtnReset = true;
    this.errorExits = true;
    this.apiError = false;
    this.enableResetButton = true;
    this.errorMessage = {
      message: err.message ? err.message  : this.errorConst.SYS_DOWN_MSG
    };
  }
  onApiError(res?) {
    this.loading = false;
    this.showBtnReset = true;
    this.errorExits = true;
    this.apiError = true;
    this.enableResetButton = true;
    if (res && res.message) {
      this.errorMessage = {
        message: res.message
      };
    } else {
      this.errorMessage = {
        message: this.errorConst.SYS_DOWN_MSG,
      };
    }
  }
  getUserTypeByNRIC(customerIDNo): any {
    this.loading = true;
    this.showBtnReset = false;
    this.enableResetButton = false;
    const request = {
      "login_data": {
        "user": "guest",
        "id_type": "1",
        "id_number": customerIDNo
      }
    };
    const url = "/rest/V1/login";
    const createActivityReq = JSON.stringify(request);
    this._service.postROI(url, createActivityReq).subscribe(
      (response: any) => {
        this.loading = false;
        this.enableResetButton = true;
        // Set show login attempts error false.
        if (response && response[0].status) {
          if (response[0].mobile_connect_user === false) {
            if(this.AppleWatchGuestFlag !== true) {
              this._userService.doGuestLogin(response, customerIDNo);
              this._deviceDataService.publishLoggerInUserName('GUEST');
              this.succesfulLogin.emit(true);
            }
          }
          this.isMobileConnectUser = response[0].mobile_connect_user;
          this.isMCUser.emit({mcUser: response[0].mobile_connect_user, nric: customerIDNo, response});
          this.showBtnReset = true;
        } else {
          this.isMCUser.emit("apiFailed");
          this.onRespError(response[0]);
          if(this.AppleWatchGuestFlag) {
          this.isMCUser.emit({mcUser: response[0].mobile_connect_user, nric: customerIDNo, response});
          }
          this.onApiError(response[0]);
        }
      },
      (error: any) => {
        this.loading = false;
        this.onApiError();
        this.isMCUser.emit("apiFailed");
      }
    );
  }

  prePopulateNricForLoggedInUser() {
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("GuestInfo")) {
      this.nric = JSON.parse(sessionStorage.getItem("GuestInfo")).outputCPResp.customerID;
    }
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("UserInfo")) {
      this.nric = JSON.parse(sessionStorage.getItem("UserInfo")).outputCPResp.customerID;
    }
    if (this.nric === undefined || this.nric === null || this.nric === '') {
      this.remove = false;
    } else {
      this.userLoggedIn = true;
      this.showBtnSubmit = false;
    }
  }
  setPreToPostVerification() {
    if (typeof window !== "undefined" && sessionStorage) {
      sessionStorage.setItem("pre2post", JSON.stringify(this._commonUtilService.encrypter("verifiedTrue")));
    }
  }
  enableReset(inputNnric) {
    this.remove = true;
    this.errorExits = false;
    this.errorMessage = null;
    if (inputNnric === null) {
      this.remove = false;
    }
  }
  restrictOnlyNum = (ev) => {
    return this._commonUtilService.restrictOnlyNum(ev, "nric", this.nric ? this.nric.toString() : "");
  }
  clearNric() {
    this.loading = false;
    this.nric = '';
    this.isMobileConnectUser = false;
    this.showBtnSubmit = true;
    this.remove = false;
    this.enableOTP = false;
    this.errorMessage = null;
    this.errorExits = false;
    this.isNRICverified = false;
    this.resetMsisdnOtp.emit();
  }

  public LogoutResetUser() {
    let agent = false;
    let guest = false;
    if (sessionStorage && sessionStorage.getItem("AgentInfo")) {
      agent = true;
    } else if (sessionStorage && sessionStorage.getItem("GuestInfo")) {
      guest = true;
    }
    if(guest && !agent) {
      let headerUrl = window.location.href;
      if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("UserToken") !== undefined) {
        let apiUrl = "/rest/V1/customerLogout";
        if (localStorage && localStorage.getItem('sessionHash')) {
          apiUrl = apiUrl + '?sessionHash=' + localStorage.getItem('sessionHash');
        }
        this._service.getEstoreUserData(apiUrl).subscribe(
          (response: any) => {
            this._headerService.ClearAllStorages();
            if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
              localStorage.removeItem("numberReservationId");
            }
            // this.UserLoginName = null;
            window.location.href = headerUrl;
            // this.ReloadHomePage();
          }, (error: any) => {
            if (typeof window !== 'undefined') {
              this._headerService.ClearAllStorages();
              // this.UserLoginName = null;
              // this.ReloadHomePage();
              window.location.href = headerUrl;
          }
        });
      } else {
        this._headerService.ClearAllStorages();
        // this.UserLoginName = null;
        // this.ReloadHomePage();
        window.location.href = headerUrl;
      }
    } else if(agent) {
      let apiUrl = "/rest/V1/customerLogout";
      const currentUrl: string = this._router.routerState.snapshot.url;
      if (localStorage && localStorage.getItem('sessionHash')) {
        apiUrl = apiUrl + '?sessionHash=' + localStorage.getItem('sessionHash');
      }
      this._service.getEstoreUserData(apiUrl).subscribe(
        (response: any) => {
          this._userService.clearStorageForUser();
          if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
            localStorage.removeItem("numberReservationId");
          }
          // this.userName = null;
          this.RedirectHeader(currentUrl);
        }, (error: any) => {
          if (typeof window !== 'undefined') {
            this._userService.clearStorageForUser();
            // this.userName = null;
            this.RedirectHeader(currentUrl);
          }
      });
    }
  }
  RedirectHeader(headerUrl) {
    window.location.href = headerUrl;
  }
  onSuccessFulSentOtp(e) {
   if (e.status) {
    this.enableOTP = true;
    this.msisdn = e.msisdn;
   }
  }
  onSuccessFulValidOtp(e) {
   if (e) {
     this.succesfulLogin.emit(true);
   }
  }
  onMsisdnReset(e) {
     this.enableOTP = false;
  }
  isProjectStar() {
    return (((typeof window !== 'undefined' && localStorage && localStorage.getItem("isProjectStar")) === 'true') && this.isPlanStar === true);
  }
  isProjectMoon() {
    return ((typeof window !== 'undefined') && this.isPlanMoon === true);
  }
 }
