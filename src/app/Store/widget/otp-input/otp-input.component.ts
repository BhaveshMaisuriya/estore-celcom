import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription, Observable, timer} from 'rxjs';
import { LoginService } from '../../login/service/login.service';
import { AppService } from '../../../Service/app.service';
import { OrderInfoService } from '../../../Service/orderinfo.service';
import { HeaderService } from '../../../Header/header.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import * as ErrorConst from '../../../../constants/error.constants';
import * as FormConst from '../../../../constants/form.constants';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { SECURITY_CODE } from "../../../shared/constants/session-storage.constants";
import { STAR_PLAN_PREFIX } from '../../../shared/models/plan.model';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';
import { UserService } from 'app/Service/user.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { updateAnalytics } from '../../../shared/utilities/helper.ultility';
import { AnalyticsService } from 'app/Service/analytic.service';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.css'],
  providers: [LoginService, HeaderService, AppService, OrderInfoService]
})
export class OtpInputComponent implements OnInit, OnDestroy {
  @Output() loadingScreen = new EventEmitter();
  @Output() validateOtp = new EventEmitter();
  @Input() msisdn;
  @Input() pageBlock;
  @Input() nric;
  @Input() pageType;
  @Input() esim;
  @Input() TextFlag;
  @Input() forceGrayBG = false;
  public UserLoginName;
  public customerDetails: any;
  public userInfo: any;
  public userToken: any;
  private subscriber: Subscription;
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
  otp5: any;
  otp6: any;
  public keepCelcomNum: any = null;
  public isLimitReachedError = false;
  public isCSAgentDealer = false;
  public customerNRIC: any = null;
  public typeOfUser = "postpaid";
  public errorExits = false;
  public errorMessage: Object;
  public apiErrorMessage: any;
  public isApiError = false;
  public notValid = false;
  public limitReachedErrorMsg: any;
  public orderDetails: any;
  public selectedProductDetails: any;
  public showDisclaimer: any;
  public PlanOnlyObjectForCart: any;
  public requestBody: any;
  public userType: any;
  formErrors: Object;
  public errorAddToCart = false;
  public AddToCart = false;
  public cart: any;
  public chosenPlan: any;
  private PLAN_PURCHASE = "PLAN_PURCHASE";
  private PLAN_DEVICE = "PLAN_DEVICE";
  elligibleUser = false;
  public isPreOrder = false;
  public isEasyPhone = false;
  public easyPhoneType = "";
  public validated_id: any;
  public isItMnp = false;
  public state: any;
  public securityCode: string;
  validOtp = false;
  eligibilityInfo: any = {};
  public suppDetailsOfUser: any;
  public suppLinesDetails: any = [];
  public suppLineRequestBody: any = [];
  public randomPhoneNo: any = null;
  public timeoutId: any;
  public reservationId = "";
  addonCode = null;
  public isMviva = false;
  public resp;
  public IsDisplayAgeEligibilityPopup = false;
  public EligibilityPopupType = "";
  public isLimitExceededIncludingOpenOrders = false;
  public showValidationNotification = false;
  public validationNotification = null;
  public loading = false;
  /**
   * @deprecated - use resendLinkDisabled;
   */
  public disableResendLink;

  resendLinkDisabled = false;
  otpCounter: number = 0;
  otpCountDown: Subscription;
  second = 1000;

  public isPlanStar = false;
  public checkBlacklist = false;
  isMoon$: Observable<boolean>;
  isMoon: boolean = false;

  constructor(private _service: AppService,
    private orderInfoService: OrderInfoService,
    private _loginService: LoginService,
    private _headerService: HeaderService,
    private _deviceDataService: DeviceDataService,
    private _commonUtilService: CommonUtilService,
    private _activatedRoute: ActivatedRoute,
    private _globalErrorHandler: GlobalErrorHandler,
    private _userService: UserService,
    private _plansQuery: PlansQuery,
    private _analyticsService: AnalyticsService,
  ) {
    this.errorMessage = {
      message: ErrorConst.OTP_EXPIRED_MSG
    };
    this.formErrors = FormConst;
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && sessionStorage.getItem("DisableResendLink")) {
      const disableResendLinkInMS = sessionStorage.getItem("DisableResendLink");
      this.disableResendOtpLink({
        disable_resend_link: Number(disableResendLinkInMS ?? 0) / 1000
      });
      // this.enableLinkAfterSpecifiedTime();
    }
    const plan_sku = this._activatedRoute.snapshot.params?.planPurchaseId + '';
    if (plan_sku.startsWith(STAR_PLAN_PREFIX)) {
      this.isPlanStar = true;
    }

    this.isMoon$ = this._plansQuery.select(s => s.isMoon);
    this.isMoon$.subscribe((data) => this.isMoon = data);
  }

  destroyCountDown() {
    this.otpCounter = 0;
    this.resendLinkDisabled = true;
    if (this.otpCountDown) {
      this.otpCountDown.unsubscribe();
    }
  }


  onLogin(event: any,otpNextTextBoxId?: string, currentTextBoxId?) {
    const enteredValue = event.target.value;
    const keyCode = enteredValue.charCodeAt(0);
    if (keyCode !== undefined) {
      if (keyCode >= 48 && keyCode <= 57) {
        if (otpNextTextBoxId !== '') {
          this._loginService.SetOtpTextBoxFocus(otpNextTextBoxId);
        }
      } else {
        // non-numeric should be restricted..
        this._loginService.ResetOTPTextBoxById(currentTextBoxId);
      }
    }
    this._loginService.ManageOTPMaxLength(currentTextBoxId);
    if (event.keyCode === 13 && this.validOtp === true) {
      this.validateOTPByMC();
    }
  }

  validateOTPByMC() {
    this.loadingScreen.emit(true);
    this.errorExits = false;
    this.loading = true;
    if (typeof window !== 'undefined' && localStorage && sessionStorage && localStorage.getItem("State")) {
      this.state = localStorage.getItem("State");
      this.securityCode = sessionStorage.getItem(SECURITY_CODE);
    }
    if (window.location.href.indexOf('/plans') == -1
        && localStorage
        && (
          (localStorage.getItem("isEasyPhone") && localStorage.getItem("isEasyPhone") === "true") ||
          (localStorage.getItem("isBundleClicked") && localStorage.getItem("isBundleClicked") === "true") ||
          (localStorage.getItem("xp-lite-device") && localStorage.getItem("xp-lite-device") !== undefined)) )
          {
      this.checkBlacklist = true;
    }
    if (this.isMoon) {
      this.checkBlacklist = true;
    }
    const requestBody = {
      "login_data": {
        "mobile_number": this.msisdn,
        "otp": this.otp1 + "" + this.otp2 + "" + this.otp3 + "" + this.otp4 + "" + this.otp5 + "" + this.otp6,
        "state": this.state,
        "securityCode": this.securityCode ?? null,
        "user": "user",
        "order_id": null,
        "order_secret": null,
        "esim": this.esim,
        // "check_blacklist" : this.checkBlacklist // ? Removed in CEL-10816
      }
    };
    const apiUrl = "/rest/V1/login";
    this._loginService.MobileConnect(apiUrl, requestBody).subscribe(
      (response: any) => {
        this.loading = false;
        if (response[0].status === true) {
          this.loginUser(response[0]);
        } else {
          if (typeof (response[0].valid) !== 'undefined' && response[0].valid === false) {
            this.notValid = true;
          }
          this.isApiError = true;
          this.errorMessage = {
            message: response[0].message
          };
          this.errorExits = true;
          this.loadingScreen.emit(false);
        }
      }, (error: any) => {
        this.loading = false;
        this.callErrorMessageWithType('SYS_DOWN');
        this.loadingScreen.emit(false);
      }
    );
  }

  public loginUser(response) {
    const self = this;
    this.userInfo = {};
    try {
      if (response?.nric && response?.msisdn) {
        updateAnalytics('nric', response.nric);
        updateAnalytics('msisdn', response.msisdn);
        this._analyticsService.msisdnValue = response?.msisdn;
        this._analyticsService.nricType = response?.nric;
      }
    } catch (_error) {

    }
    this.userInfo.outputCPResp = response.customer_data;
    if (typeof window !== 'undefined' && localStorage) {
      if (this._userService.isUserEnterprise()) {
        const enterpriseUserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
        this.userInfo = {
          ...enterpriseUserInfo,
          ...this.userInfo,
        }
      }
      sessionStorage.setItem("UserInfo", JSON.stringify(this.userInfo));
      sessionStorage.setItem("personalForm", JSON.stringify(this.userInfo));
      sessionStorage.setItem("UserToken", response.user_token);
      sessionStorage.setItem("authtoken", response.authtoken);
    }
    setTimeout(() => {
      self._headerService.publishUser(self.userInfo.outputCPResp.name);
    }, 0);
    this._deviceDataService.publishLoggerInUserName(this.userInfo.outputCPResp.name);
    if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.services) {
      const msisdnNumber = this.msisdn;
      this.userInfo.outputCPResp.services.forEach(element => {
        let mobileNumber;
        if (element.mobileNumber.charAt(0) === "6") {
          mobileNumber = element.mobileNumber;
        } else {
          mobileNumber = "6" + element.mobileNumber;
        }
        if (mobileNumber === msisdnNumber) {
          this.typeOfUser = element.pre_Pos_Indicator;
            sessionStorage.setItem("esim", JSON.stringify(this._commonUtilService.encrypter(this.typeOfUser)));
            sessionStorage.setItem("typeofuser", this.typeOfUser);
        }
      });
    }
    if (this.pageType === 'cobpInLine') {
      this.validateOtp.emit(true);
    } else {
    this.checkNumberOfLinesUserHas();
    }
    if(localStorage && localStorage.getItem("TypeOfPurchase") !== "COBP") {
      this._deviceDataService.publishRunAutoBillingCheck();
    }
    sessionStorage.removeItem('prepaiduser');
  }
  public ResendOtp() {
    this.errorExits = false;
    this.notValid = false;
    this.otp1 = "";
    this.otp2 = "";
    this.otp3 = "";
    this.otp4 = "";
    this.otp5 = "";
    this.otp6 = "";

    const requestBody = {
      "mobile_number": this.msisdn,
      "tnc": true,
      "nric": this.nric
    };
    const apiUrl = ApiConstant.MC_SEND_OTP_API;
    this._loginService.MobileConnect(apiUrl, requestBody).subscribe(
      (response: any) => {
        clearTimeout(this.timeoutId);
        if (response[0].status === true && response[0].exists === true) {
          if (typeof window !== 'undefined' && localStorage && sessionStorage && response[0].state) {
          this.state =  response[0].state;
          localStorage.setItem("State", this.state);

          this.securityCode = response[0]?.securityCode;
          sessionStorage.setItem(SECURITY_CODE, this.securityCode);
          }
          this.disableResendOtpLink(response[0]);
          this.callOtpTimeout();
        } else {
          this.errorMessage = {
            message: response[0].message
          };
          this.isApiError = true;
          this.errorExits = true;
        }
      }, (error: any) => {
        this.callErrorMessageWithType('SYS_DOWN');
      });
  }
  disableResendOtpLink(resendValue) {
    this.destroyCountDown();
    this.resendLinkDisabled = true;
    this.otpCounter = (resendValue.disable_resend_link | 0);
    this.otpCountDown = timer(0, this.second)
      .subscribe(() => {
        if (this.otpCounter > 0) {
          --this.otpCounter;
        } else if (this.otpCounter === 0) {
          this.resendLinkDisabled = false;
        }
      });

    this._loginService.SetOtpTextBoxFocus('1');

    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.setItem("DisableResendLink", "0");
      if (resendValue.disable_resend_link !== undefined) {
        const disableResendLinkInMS = resendValue.disable_resend_link * 1000;
        sessionStorage.setItem("DisableResendLink", `${disableResendLinkInMS}`);
      }
    }
    // this.enableLinkAfterSpecifiedTime();
  }
  enableLinkAfterSpecifiedTime() {
    setTimeout(() => {
      this.disableResendLink = 0;
      if (typeof window !== 'undefined' && sessionStorage) {
        sessionStorage.setItem("DisableResendLink", "0");
      }
    }, this.disableResendLink);
  }
  // Fucntion ot show error message after 2 mins of idle time.
  callOtpTimeout() {
    this.timeoutId = setTimeout(() => {
      this.callErrorMessageWithType('OTP_EXPIRED');
    }, 120000);
  }
  // error messaged function.
  callErrorMessageWithType(errType: string) {
    this.errorExits = true;
    this.notValid = false;
    this.isApiError = true;
    if (errType === 'OTP_EXPIRED') {
      this.errorMessage = {
        message: ErrorConst.OTP_EXPIRED_MSG,
      };
    }
    if (errType === 'SYS_DOWN') {
      this.errorMessage = {
        message: ErrorConst.SYS_DOWN_MSG,
      };
    }
  }
  // Manage OTP tab..
  public ManageOTP(otpNextTextBoxId: string, event: any, currentTextBoxId) {
    const enteredValue = event.target.value;
    const keyCode = enteredValue.charCodeAt(0);
    if (keyCode !== undefined) {
      if (keyCode >= 48 && keyCode <= 57) {
        if (otpNextTextBoxId !== '') {
          this._loginService.SetOtpTextBoxFocus(otpNextTextBoxId);
        }
      } else {
        // non-numeric should be restricted..
        this._loginService.ResetOTPTextBoxById(currentTextBoxId);
      }
    }
    this._loginService.ManageOTPMaxLength(currentTextBoxId);
  }
  public isDisableLogin() {
    if (
      this.errorExits ||
      this.otp1 == null || this.otp1 === "" ||
      this.otp2 == null || this.otp2 === "" ||
      this.otp3 == null || this.otp3 === "" ||
      this.otp4 == null || this.otp4 === "" ||
      this.otp5 == null || this.otp5 === "" ||
      this.otp6 == null || this.otp6 === "" ||
      !this.resendLinkDisabled 
    ) {
      this.validOtp = false;
      return true;
    } else {
      this.validOtp = true;
      return false;
    }
  }

  public checkNumberOfLinesUserHas() {
    this.typeOfUser = 'Postpaid';
    let noOfLines: number;
      noOfLines = 15;
    if (this.nric) {
      let count;
      let noOfSuppLinesAdded = 0;
      if (localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
        this.suppLinesDetails = JSON.parse(localStorage.getItem("suppLinesAddedByTheUser"));
        // Suplementary lines calculation
        noOfSuppLinesAdded = this.suppLinesDetails.length;
      }
      this.orderInfoService.ViewOrderInfo(this.nric, this.typeOfUser).subscribe(
        (response: any) => {
          // Check for response exception
          if (response && response.exception === false) {
            // Check for total lines for user
            if (response.order_data && response.order_data.total_lines) {
              count = response.order_data.total_lines;
              if ((Number(count) + noOfSuppLinesAdded) >= noOfLines) {
                let limitExceedWithSuppLines = false;
                if (Number(count) >= noOfLines) {
                  this.elligibleUser = true;
                  limitExceedWithSuppLines = false;
                } else {
                  this.elligibleUser = false;
                  limitExceedWithSuppLines = true;
                }
                this.isLimitExceededIncludingOpenOrders = true;
                this.suppDetailsOfUser = {
                  "status": limitExceedWithSuppLines,
                  "maxPostpaidLinesRemaining": (noOfLines - Number(count)) - 1,
                  "message": "Maximum limit reached"
                };

              } else {
                this.isLimitExceededIncludingOpenOrders = false;
                this.elligibleUser = false;
                this.suppDetailsOfUser = {
                  "status": true,
                  "maxPostpaidLinesRemaining": (noOfLines - Number(count)) - 1
                };
              }
              if (typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('BuyNoPlan'))) {
                this.elligibleUser = false;
                this.isLimitExceededIncludingOpenOrders = false;
                this.validateSuppLinesCount(this.suppDetailsOfUser);
               // this.checkEligibilbleUser();
              } else if (!this.validateSuppLinesCount(this.suppDetailsOfUser) && !this.elligibleUser) {
               // this.checkEligibilbleUser();
              } else if (this.elligibleUser === false && this.validateSuppLinesCount(this.suppDetailsOfUser)) {
               // this.checkEligibilbleUser();
              } else if (this.elligibleUser) {
                this.eligibilityInfo = {
                  isEligibleByAge: false,
                  displayType: 'LIMIT_EXCEEDED',
                  type: 'xpax'
                };
                this._globalErrorHandler.errorObjectConvert(this.eligibilityInfo.displayType);
                this.checkEligibilbleUser();
              }
            } else {
              this.isLimitExceededIncludingOpenOrders = false;
              this.isLimitReachedError = true;
              this.limitReachedErrorMsg = {};
              this.limitReachedErrorMsg.content = response.message;
              localStorage.setItem('limitReachedErrorMsg', JSON.stringify(this.limitReachedErrorMsg));
              localStorage.setItem('isLimitReachedError', JSON.stringify(this.isLimitReachedError));
            }
            this.validateOtp.emit(true);
          } else if (response.exception === true) {
            this.errorMessage = {
              message: response.message
            };
            this.errorExits = true;
            this.isApiError = true;
            this.validateOtp.emit(false);
          }
        }, (error: any) => {
          this.isApiError = true;
          this.errorMessage = {
            message: ErrorConst.SYS_DOWN_MSG
          };
          this.validateOtp.emit(false);
          this.ShowingLimitError(error);
        });
    }
  }
  public validateSuppLinesCount(suppDetails: any) {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("suppLinesDetailsOfUser", JSON.stringify(suppDetails));
      if (localStorage.getItem("suppLinesAddedByTheUser")) {
        this.suppLinesDetails = JSON.parse(localStorage.getItem("suppLinesAddedByTheUser"));
        if (this.suppLinesDetails.length <= suppDetails.maxPostpaidLinesRemaining) {
          return true;
        } else {
          localStorage.setItem("supplementryFlow", "YES");
          return false;
        }
      } else {
        return true;
      }
    }
  }
  checkEligibilbleUser() {
    if (this.isLimitExceededIncludingOpenOrders && !this.elligibleUser) {
      const eligibilityInfo = {
        isEligibleByAge: false,
        displayType: 'LIMIT_EXCEEDED_WITH_OPEN_COUNT',
        type: 'xpax'
      };
      this._globalErrorHandler.errorObjectConvert(eligibilityInfo.displayType);
      this.EligibilityPopupType = JSON.parse(JSON.stringify(eligibilityInfo));
      localStorage.setItem('eligiblePopupType', JSON.stringify(this.EligibilityPopupType));
      this.IsDisplayAgeEligibilityPopup = true;
      localStorage.setItem('displayEligiblePopup', JSON.stringify(this.IsDisplayAgeEligibilityPopup));
    }
  }
  ShowingLimitError(error) {
    this.limitReachedErrorMsg = {};
    this.limitReachedErrorMsg.content = error.message;
    this.isLimitExceededIncludingOpenOrders = false;
    this.isLimitReachedError = true;
    localStorage.setItem('limitReachedErrorMsg', JSON.stringify(this.limitReachedErrorMsg));
    localStorage.setItem('isLimitReachedError', JSON.stringify(this.isLimitReachedError));
  }

  isProjectStar() {
    return (((typeof window !== 'undefined' && localStorage && localStorage.getItem("isProjectStar")) === 'true') && this.isPlanStar === true);
  }
  ngOnDestroy() {
    this.showValidationNotification = false;
    this.validationNotification = null;
    this.destroyCountDown();
  }

  otpInputBoxClicked(event,textBoxId){
    const enteredValue = event.target.value;
    if(enteredValue.length==1){
      this._loginService.SetOtpTextBoxFocus(textBoxId);
    }
  }

}
