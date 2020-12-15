import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgModel } from '@angular/forms/src/directives/ng_model';
import { Subscription } from 'rxjs';
import { LoginService } from '../service/login.service';
import { RedirectionService } from '../../../Service/redirection.service';
import { AppService } from '../../../Service/app.service';
import { OrderInfoService } from '../../../Service/orderinfo.service';
import { BundleService } from '../../../Service/bundle.service';
import { BaseService } from '../../../base.service';
import { HeaderService } from '../../../Header/header.service';
import { CartService } from '../../../Service/cart.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { environment } from 'environments/environment';
// import { loadavg } from 'os';
import * as ErrorConst from '../../../../constants/error.constants';
import * as FormConst from '../../../../constants/form.constants';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { SECURITY_CODE } from "../../../shared/constants/session-storage.constants";
import { Cart } from '../../../Model/cart.model';
import { CartItem } from '../../../Model/cart-item.model';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from '../../../Service/product.service';

import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { SupplimentaryLinesService } from '../../widget/supplementary-lines/supplementary-lines.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { GlobalErrorHandler } from 'app/interceptors/error.interceptor';
import { updateAnalytics } from 'app/shared/utilities/helper.ultility';
import { AnalyticsService } from 'app/Service/analytic.service';
@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.css'],
  providers: [LoginService, RedirectionService, HeaderService, AppService, OrderInfoService, BundleService,
    CartService, SupplimentaryLinesService]
})
export class LoginOtpComponent extends BaseService implements OnInit, AfterViewInit, OnDestroy {
  public UserLoginName;
  public customerDetails: any;
  public userInfo: any;
  public userToken: any;
  private subscriber: Subscription;
  msisdn: any;
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
  public loading = false;
  public errorMessage: Object;
  public apiErrorMessage: any;
  public isApiError = false;
  public notValid = false;
  // manage age eiligibility
  public IsDisplayAgeEligibilityPopup = false;
  public EligibilityPopupType = "";
  // private NOT_ELIGIBLE_BY_AGE = "NotEligible";
  // private ELIGIBLE_BY_AGE = "Eligible";
  public isLimitExceededIncludingOpenOrders = false;
  public limitReachedErrorMsg: any;
  public orderDetails: any;
  public selectedProductDetails: any;
  public showDisclaimer: any;
  public PlanOnlyObjectForCart: any;
  public requestBody: any;
  public userType: any;
  public showValidationNotification = false;
  public validationNotification: any = null;
  formErrors: Object;
  eStoreFrontEndUrl: string = environment.eStoreFrontEndUrl;
  public errorAddToCart = false;
  public AddToCart = false;
  public cart: any;
  public chosenPlan: any;
  private msIsdn = "";
  PLAN_PURCHASE = "PLAN_PURCHASE";
  PLAN_DEVICE = "PLAN_DEVICE";
  elligibleUser = false;
  public isPreOrder = false;
  public isEasyPhone = false;
  public easyPhoneType = "";
  public validated_id: any;
  public isItMnp = false;
  public state: any;
  public securityCode: string;
  outletId: string = environment.outletId;
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
  public IsGoldenNumberSelected = false;
  public StoreCartUrl = '/store/cart';
  public disableResendLink;
  contract_period;

  constructor(private _service: AppService,
    private orderInfoService: OrderInfoService,
    private bundleService: BundleService,
    private loginService: LoginService,
    private _router: Router,
    private _headerService: HeaderService,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _deviceDataService: DeviceDataService,
    private cartService: CartService,
    private _commonUtilService: CommonUtilService,
    // @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _supplimentaryLinesService: SupplimentaryLinesService,
    private cookieService: CookieService,
    private _productService: ProductService,
    private _planQuery: PlansQuery,
    private _globalErrorHandler: GlobalErrorHandler,
    private _analyticsService: AnalyticsService,
  ) {
    super();
    this.errorMessage = {
      message: ErrorConst.OTP_EXPIRED_MSG
    };
    this.formErrors = FormConst;
    this._planQuery.select(state => state.easyphone_selected_contract_period).subscribe(data => {
      this.contract_period = data;
    });
  }

  ngOnInit() {
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.showValidationNotification = data)
    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.isApiError = data));
    this.subscriber = this._deviceDataService.sharedNumberReservationId$.subscribe(
      data => (this.reservationId = data)
    );
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }
    if (this.reservationId === "") {
      if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
        this.reservationId = JSON.parse(localStorage.getItem("numberReservationId"));
        // localStorage.removeItem("numberReservationId");
      }
    }
    if (typeof window !== 'undefined' && sessionStorage.getItem("DisableResendLink")) {
      this.disableResendLink = sessionStorage.getItem("DisableResendLink");
      this.enableDisableLinkAfterSpecifiedTime();
    }
    if (localStorage && localStorage.getItem("isMviva")) {
      this.isMviva = JSON.parse(localStorage.getItem("isMviva"));
    }

    if (typeof window !== "undefined" && localStorage && sessionStorage) {
      this.msIsdn = localStorage.getItem("MyMsIsdn");
      this.state = localStorage.getItem("State");
      this.securityCode = sessionStorage.getItem(SECURITY_CODE);
      // Getting addon code from localstorage.
      if (localStorage && localStorage.getItem("addonCode")) {
        this.addonCode = localStorage.getItem("addonCode");
      }
    }
    this.setOtpTimeout();
    if (localStorage && localStorage.getItem("AddToCartNotification")) {
      localStorage.removeItem("AddToCartNotification");
    }
    this.subscriber = this._deviceDataService.sharedSupplimentaryLines$.subscribe(

      data => {
        this.suppLinesDetails = data;
      });
    this.subscriber = this._deviceDataService.sharedNumberReservationId$.subscribe(
      data => (this.reservationId = data)
    );
    this.subscriber = this._deviceDataService.sharedGoldenNumber$.subscribe(data => {
      this.IsGoldenNumberSelected = data;
    });

    this.SetOtpTextBoxFocus('1');

  }
  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }
  loginThroughEnterButton(event: any,otpNextTextBoxId?: string, currentTextBoxId?) {

    const enteredValue = event.target.value;
    const keyCode = enteredValue.charCodeAt(0);

    if (keyCode !== undefined) {
      if (keyCode >= 48 && keyCode <= 57) {
        if (otpNextTextBoxId !== '') {
          this.SetOtpTextBoxFocus(otpNextTextBoxId);
        }
      } else {
        // non-numeric should be restricted..
        this.ResetOTPTextBoxById(currentTextBoxId);
      }
      if (event.keyCode === 13) {
        if (this.validOtp === true) {
          this.loginAfterOtp();
        }
    }
    this.ManageOTPMaxLength(currentTextBoxId);
  }
}
  loginAfterOtp() {
    this.ValidateOTP();
  }

  ValidateOTP() {
    this.errorExits = false;
    this.loading = true;
    let orderSecret = null;
    let orderId = null;
    let checkBlacklist = false;
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem('CAorderId') &&
        sessionStorage.getItem('CAorderId') !== null && sessionStorage.getItem('secretKey') &&
        sessionStorage.getItem('secretKey') !== null) {
          orderId = sessionStorage.getItem('CAorderId');
          orderSecret = sessionStorage.getItem('secretKey');
    }
    if (localStorage && localStorage.getItem("isDeviceOnlyClicked") && localStorage.getItem("isDeviceOnlyClicked") === "true") {
      checkBlacklist = true;
    }
    const requestBody = {
      "login_data": {
        "mobile_number": this.msIsdn,
        "otp": this.otp1 + "" + this.otp2 + "" + this.otp3 + "" + this.otp4 + "" + this.otp5 + "" + this.otp6,
        "state": this.state,
        "securityCode": this.securityCode ?? null,
        "user": "user",
        "order_id": orderId,
        "order_secret" : orderSecret,
        // "check_blacklist" : checkBlacklist // ? Removed in CEL-10816
      }
    };
    const apiUrl = "/rest/V1/login";
    this.loginService.MobileConnect(apiUrl, requestBody).subscribe(
      (response: any) => {
        this.loading = false;
        if (response[0].status === true) {
          this.BindCustomerDetails(response[0]);
        } else {
          if (typeof (response[0].valid) !== 'undefined' && response[0].valid === false) {
            this.notValid = true;
          }
          this.errorMessage = {
            message: response[0].message
          };
          this.errorExits = true;
          if (typeof window !== 'undefined' && sessionStorage.getItem('CAorderId') || sessionStorage.getItem('secretKey')) {
            sessionStorage.removeItem('CAorderId');
            sessionStorage.removeItem('secretKey');
           }
        }
      }, (error: any) => {
        this.loading = false;
        this.callErrorMessage('SYS_DOWN');
      }
    );
  }

  public BindCustomerDetails(response) {
    const self = this;
    this.userInfo = {};
    // response.customer_data.blacklist = {
    //   status: true,
    //   message: "You are blacklisted. For more info, please call Celcom Customer Service at 1111 from your Celcom number."
    // };
    if(response.customer_data.blacklist === true) {
      this._deviceDataService.publishIsBlacklist(true);
    }
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
      sessionStorage.setItem("UserInfo", JSON.stringify(this.userInfo));
      sessionStorage.setItem("personalForm", JSON.stringify(this.userInfo));
    }
    setTimeout(() => {
      self._headerService.publishUser(self.userInfo.outputCPResp.name);
    }, 0);
    // check for postpaid and prepaid connections if this returns true then only call next function
    this.userToken = response.user_token;
    if (typeof window !== "undefined" && sessionStorage) {
      sessionStorage.setItem("UserToken", this.userToken);
      sessionStorage.setItem("authtoken", response.authtoken);
    }
    if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.customerID) {
      this.customerNRIC = this.userInfo.outputCPResp.customerID;
    }
    if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.customerID) {
      this.customerNRIC = this.userInfo.outputCPResp.customerID;
    }
    if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.services) {
      const msisdnNumber = this.msIsdn;
      this.userInfo.outputCPResp.services.forEach(element => {
        let mobileNumber;
        if (element.mobileNumber.charAt(0) !== "6") {
          mobileNumber = "6" + element.mobileNumber;
        } else {
          mobileNumber = element.mobileNumber;
        }
        if (mobileNumber === msisdnNumber) {
          this.typeOfUser = element.pre_Pos_Indicator;
          if (typeof window !== "undefined" && sessionStorage) {
            sessionStorage.setItem("typeofuser", this.typeOfUser);
            sessionStorage.setItem("esim", JSON.stringify(this._commonUtilService.encrypter(this.typeOfUser)));
          }
        }
      });
    }
    this.checkNumberOfLinesUserHas();
  }

  checkForLimitExceeded() {
    if (this.isLimitReachedError) {
      if (this.orderDetails.sku !== undefined && this.orderDetails.sku.bundleSku !== undefined) {
        this.Redirect('/plans/' + this.orderDetails.sku.bundleSku);
      } else {
      this.Redirect('/device-detail/' + this.orderDetails.sku);
      }
    } else if (this.isLimitExceededIncludingOpenOrders) {
      if (this.orderDetails.sku !== undefined && this.orderDetails.sku.bundleSku !== undefined && this.orderDetails.sku.bundleSku) {
        this.Redirect('/plans/' + this.orderDetails.sku.bundleSku);
      } else {
      this.Redirect('/device-detail/' + this.orderDetails.sku);
      }
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
    } else {
      this.callAddToCartService();
    }
  }

  ShowingLimitReachedError(error) {
    this.isLimitExceededIncludingOpenOrders = false;
    this.isLimitReachedError = true;
    this.limitReachedErrorMsg = {};
    this.limitReachedErrorMsg.content = error.message;
    localStorage.setItem('limitReachedErrorMsg', JSON.stringify(this.limitReachedErrorMsg));
    localStorage.setItem('isLimitReachedError', JSON.stringify(this.isLimitReachedError));
    if (this.orderDetails.sku && this.orderDetails.sku !== undefined && this.orderDetails.sku.bundleSku !== undefined) {
      this.Redirect('/plans/' + this.orderDetails.sku.bundleSku);
    } else {
    this.Redirect('/device-detail/' + this.orderDetails.sku);
    }
  }

  disclaimerShow() {
    this.showDisclaimer = (this.selectedProductDetails.orderNumberType != null &&
      this.selectedProductDetails.orderNumberType !== "NewNumber" && this.selectedProductDetails.orderNumberType !== "SwitchToCelcom");
    if (!this.showDisclaimer) {
      let noOfLines: number;
      this.typeOfUser = 'Postpaid';
      if (this.typeOfUser === 'Prepaid') {
        noOfLines = 5;
      } else if (this.typeOfUser === 'Postpaid') {
        noOfLines = 15;
      }
      if (this.customerNRIC) {
        let noOfSuppLinesAdded = 0;
        if (typeof window !== 'undefined' && localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
          if (this.suppLinesDetails !== undefined) {
            noOfSuppLinesAdded = this.suppLinesDetails.length;
          }
        }
        this.orderInfoService.ViewOrderInfo(this.customerNRIC, this.typeOfUser).subscribe(
          (response: any) => {
            if (response && response.exception === false) {
              if (response.order_data && response.order_data.total_lines) {
                const count = response.order_data.total_lines;
                if ((Number(count) + noOfSuppLinesAdded) >= noOfLines) {
                  this.isLimitExceededIncludingOpenOrders = true;
                } else {
                  this.isLimitExceededIncludingOpenOrders = false;
                }
                this.checkForLimitExceeded();
              }
            } else if (response && response.exception === true) {
              this.isLimitExceededIncludingOpenOrders = false;
              this.isLimitReachedError = true;
              this.limitReachedErrorMsg = {};
              this.limitReachedErrorMsg.content = response.message;
              localStorage.setItem('limitReachedErrorMsg', JSON.stringify(this.limitReachedErrorMsg));
              localStorage.setItem('isLimitReachedError', JSON.stringify(this.isLimitReachedError));
              if (this.orderDetails.sku !== undefined && this.orderDetails.sku && this.orderDetails.sku.bundleSku !== undefined) {
                this.Redirect('/plans/' + this.orderDetails.sku.bundleSku);
              } else {
              this.Redirect('/device-detail/' + this.orderDetails.sku);
              }
            }
          }, (error: any) => {
            this.ShowingLimitReachedError(error);
          });
      } else {
        this.checkForLimitExceeded();
      }
    }
  }

  callAddToCartService() {
    // let userToken = '';
    this.requestBody = {};
    this.createRequestBodyForSupp();
    const totalToSend = this.RoundingOff(this.selectedProductDetails.total);
    const orderDevicePriceSendTo = this.RoundingOff(this.selectedProductDetails.orderDevicePrice);
    if (sessionStorage && sessionStorage.getItem("USER_TYPE") && !sessionStorage.getItem("UserToken")) {
      this.userType = "guest";
    } else {
      this.userType = "user";
    }
    if (localStorage && localStorage.getItem("MNP-FLOW") === 'YES') {
      this.isItMnp = true;
    }
    if (localStorage && localStorage.getItem("isPreOrder")) {
      this.isPreOrder = JSON.parse(localStorage.getItem("isPreOrder"));
    }
    if (localStorage && localStorage.getItem('validated_id')) {
      this.validated_id = JSON.parse(localStorage.getItem('validated_id'));
    }
    if (localStorage && localStorage.getItem("isEasyPhone")) {
      this.isEasyPhone = JSON.parse(localStorage.getItem("isEasyPhone"));
    }
    if (localStorage && localStorage.getItem("isOwnClicked")) {
      const isOwnClicked = JSON.parse(localStorage.getItem("isOwnClicked"));
      if (isOwnClicked) {
        this.easyPhoneType = "Own";
      }
    }
    if (localStorage && localStorage.getItem("isRentClicked")) {
      const isRentClicked = JSON.parse(localStorage.getItem("isRentClicked"));
      if (isRentClicked) {
        this.easyPhoneType = "Rent";
      }
    }
    if (localStorage && localStorage.getItem("isBundleClicked")) {
      const isBundleClicked = JSON.parse(localStorage.getItem("isBundleClicked"));
      if (isBundleClicked) {
        this.easyPhoneType = "";
        this.isEasyPhone = false;
      }
    }
    let deviceReservationId = "IT000016";
    let campaign_url = "";
    if (sessionStorage && sessionStorage.getItem("RandomPhoneNo")) {
      this.randomPhoneNo = sessionStorage.getItem("RandomPhoneNo");
    }
    if (this.reservationId !== "") {
      deviceReservationId = this.reservationId;
    }
    if (this.isMviva) {
      if (localStorage && localStorage.getItem("mvivaCampaignUrl")) {
        campaign_url = localStorage.getItem("mvivaCampaignUrl");
        localStorage.removeItem("mvivaCampaignUrl");
      }
    }
    if (this.selectedProductDetails && this.selectedProductDetails.orderDevice &&
       this.selectedProductDetails.orderPlanName) {
      this.requestBody = {
        "data": {
          "bundle_product_sku": this.selectedProductDetails.orderDevice,
          "selected_device_product_sku": this.selectedProductDetails.selectedProductSku,
          "selected_plan_product_sku": this.selectedProductDetails.orderPlan,
          "selected_pass_product_sku": this.selectedProductDetails.orderAddOnpass,
          "sub_pass_sku": this.selectedProductDetails.orderSubpass,
          "selected_device_product_up_fornt_price": this.selectedProductDetails.orderOneTimePay,
          "selected_device_product_device_price": orderDevicePriceSendTo,
          "bundle_product_qty": "1",
          "bundle_product_price": totalToSend,
          "selected_number": this.selectedProductDetails.orderPhoneNo,
          "selected_number_type": this.selectedProductDetails.orderNumberType,
          "temporary_number": this.randomPhoneNo,
          "is_cobp": false,
          "is_mnp": this.isItMnp,
          "user": this.userType,
          "is_preorder": this.isPreOrder,
          "is_easyphone": this.isEasyPhone,
          "easyphone_type": this.easyPhoneType,
          "validated_id": this.validated_id,
          "is_affiliate_ia": false,
          "is_affiliate_ada": false,
          "add_on_ids": this.addonCode, // lifestyle addon Id.
          "reservationId": this.reservationId,
          "is_campaign_mviva": this.isMviva,
          "campaign_mviva_url": campaign_url,
          "is_golden_number": this.IsGoldenNumberSelected,
          "contract_period": this.isEasyPhone ? this.contract_period : undefined,
        },
        // Added for the Resevation of SKU device + plan
        "stockReserveQuantityInput": this._productService.getStockAvailabilityRequest(
          this.selectedProductDetails,
          this.outletId,
          deviceReservationId
        ),
        "supp_data": this.suppLineRequestBody
      };
    } else if (this.selectedProductDetails && this.selectedProductDetails.orderDevice && !this.selectedProductDetails.orderPlanName) {
      this.requestBody = {
        "data": {
          "bundle_product_sku": this.selectedProductDetails.orderDevice,
          "selected_device_product_sku": this.selectedProductDetails.selectedProductSku,
          "selected_plan_product_sku": "null",
          "selected_device_product_device_price": totalToSend,
          "selected_device_product_up_fornt_price": "0",
          "device_product_price": totalToSend,
          "is_cobp": false,
          "device_product_qty": "1",
          "is_preorder": this.isPreOrder,
          "is_affiliate_ia": false,
          "is_mnp": this.isItMnp,
          "user": this.userType,
          "is_affiliate_ada": false
        },
        // Added for the Resevation of SKU device + plan
        "stockReserveQuantityInput": this._productService.getStockAvailabilityRequest(
          this.selectedProductDetails,
          this.outletId,
          deviceReservationId
        ),
      };
    }
    if (this.cookieService.check('adaRemainingDays')) {
      if (this.requestBody && this.requestBody.data) {
        const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
        this.requestBody.data.is_affiliate_ia = false; // If ADA exists doing IA as false
        this.requestBody.data.is_affiliate_ada = adaRemainingDays.name;
      }
    }
    if (this.cookieService.check('orderItem')) {
      if (this.requestBody && this.requestBody.data) {
        this.requestBody.data.is_affiliate_ia = true;
      }
    }

    this.bundleService.BundleOrder(this.requestBody).subscribe(
      (response: any) => {
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.removeItem('orderDetails');
          localStorage.removeItem('selectedProductDetails');
        }
        if (response && response.length !== 0 && response[0].status === true) {
          this.cartService.addProductToCart(this.orderDetails, 1, this.selectedProductDetails);
          // this._router.navigateByUrl('/store/cart');
          this.Redirect(this.StoreCartUrl);
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem("AddToCartNotification", "true");
          }
          this._estoreAnalyticsService.onClickAddToCart(this._renderer);  // Analytics to track add to cart
        } else if (response && response.length !== 0 && response[0].status === false &&
          response[0].message === 'No Qty available for selected pre order product!') {
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem("OutOfStockPreOrder", "true");
          }
          this._router.navigateByUrl('/device-detail/' + this.orderDetails.sku);
        } else {
          this.AddToCartNotificationError();
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem("errorAddToCart", "true");
            localStorage.setItem("errorAddToCartMessage", response[0].message);
          }
          if (this.orderDetails.sku !== undefined && this.orderDetails.sku.bundleSku !== undefined) {
            this.Redirect('/plans/' + this.orderDetails.sku.bundleSku);
          } else {
            this.Redirect('/device-detail/' + this.orderDetails.sku);
          }
        }

        if (localStorage && localStorage.getItem("isPreOrder")) {
          localStorage.removeItem("isPreOrder");
        }
        if (localStorage && localStorage.getItem("isEasyPhone")) {
          localStorage.removeItem("isEasyPhone");
        }
        if (localStorage && localStorage.getItem("validated_id")) {
          localStorage.removeItem("validated_id");
        }
      }, (error: any) => {
        this.isApiError = true;
        this.apiErrorMessage = {};
        this.apiErrorMessage.content = "Sorry for the inconvenience, we're giving our system a little update. Please try again later.";
      });
  }

  CallAddTOCartForPlanOnly() {
    this.createRequestBodyForPlanOnlySupp();
    let mnpCustomerId = null;
    let isMnp = false;

    if (sessionStorage && sessionStorage.getItem("USER_TYPE") && !sessionStorage.getItem("UserToken")) {
      this.userType = "guest";
    } else {
      this.userType = "user";
    }
    if (localStorage && localStorage.getItem("MNP-FLOW") && localStorage.getItem("MNP-CUSTOMER")) {
      const mnpCustomer = JSON.parse(localStorage.getItem("MNP-CUSTOMER"));
      mnpCustomerId = mnpCustomer.customerID;
      isMnp = true;
    }
    if (this.PlanOnlyObjectForCart && (typeof (this.PlanOnlyObjectForCart.orderPhoneNo) === "string") &&
     this.PlanOnlyObjectForCart.orderPhoneNo.charAt(0) === ' ') {
      this.PlanOnlyObjectForCart.orderPhoneNo = this.PlanOnlyObjectForCart.orderPhoneNo.slice(1);
    }
    let campaign_url = "";
    if (this.isMviva) {
      if (localStorage && localStorage.getItem("mvivaCampaignUrl")) {
        campaign_url = localStorage.getItem("mvivaCampaignUrl");
        localStorage.removeItem("mvivaCampaignUrl");
      }
    }
    this.requestBody = {
      "data": {
        "Sku": this.PlanOnlyObjectForCart.orderPlan,
        "TotalPay": this.PlanOnlyObjectForCart.orderTotalPay,
        "selected_number": this.PlanOnlyObjectForCart.orderPhoneNo,
        "PlanName": this.PlanOnlyObjectForCart.orderPlanName,
        "selected_number_type": this.PlanOnlyObjectForCart.orderNumberType,
        "user": this.userType,
        "is_mnp": isMnp,
        "is_cobp": false,
        "mnp_id": mnpCustomerId,
        "is_affiliate_ia": false,
        "is_affiliate_ada": false,
        "add_on_ids": this.addonCode, // lifestyle addon Id.
        "is_campaign_mviva": this.isMviva,
        "campaign_mviva_url": campaign_url,
        "reservationId": this.reservationId,
        "is_golden_number": this.IsGoldenNumberSelected
      },
      "supp_data": this.suppLineRequestBody

    };

    if (this.cookieService.check('adaRemainingDays')) {
      if (this.requestBody && this.requestBody.data) {
        const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
        this.requestBody.data.is_affiliate_ada = adaRemainingDays.name;
        this.requestBody.data.is_affiliate_ia = false; // If ADA exists doing IA as false
      }
    }
    if (this.cookieService.check('orderItem')) {
      if (this.requestBody && this.requestBody.data) {
        this.requestBody.data.is_affiliate_ia = true;
      }
    }

    const url = "/rest/V1/planaddtocart";
    this._service.postEstoreUserData(url, this.requestBody).subscribe(
      (response: any) => {
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.removeItem('orderDetails');
          localStorage.removeItem('PlanOnlyObjectForCart');
        }
        if (response[0].status === true) {
          this.cartService.addProductToCart(this.orderDetails, 1, this.PlanOnlyObjectForCart);
          this.Redirect(this.StoreCartUrl);
          this._estoreAnalyticsService.onClickAddToCart(this._renderer); // Analytics to track add to cart
          localStorage.setItem("AddToCartNotification", "true");
        } else if ((response[0].status === false && response[0].message === "There is already one item in cart.") ||
          (response[0].status === false && response[0].message)) {
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem("errorAddToCartMessage", response[0].message);
            localStorage.setItem("errorAddToCart", "true");
            if (localStorage.getItem("SelectedPlan") && localStorage.getItem("SelectedPlanDetails") &&
              localStorage.getItem("SelectedMonthlyPay") && localStorage.getItem("SelectedPlanName")) {
              this.chosenPlan = {};
              this.chosenPlan.planDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
              this.chosenPlan.monthlyPay = localStorage.getItem("SelectedMonthlyPay");
              this.chosenPlan.planSku = localStorage.getItem("SelectedPlan");
              this.chosenPlan.planName = localStorage.getItem("SelectedPlanName");
              localStorage.setItem("chosenPlan", JSON.stringify(this.chosenPlan));
            }
          }
          this.Redirect(this.chosenPlan.planDetails.BuynowLink);
        } else {
          this.AddToCartNotificationError();
          this.Redirect(this.PlanOnlyObjectForCart.selectedPlanDetails.BuynowLink);
        }
      }, (error: any) => {
        this.apiErrorMessage = {};
        this.apiErrorMessage.content = "Sorry for the inconvenience, we're giving our system a little update. Please try again later.";
        this.isApiError = true;
      });
  }
  public ResendOtp() {
    this.errorExits = false;
    this.notValid = false;
    this.ResetOtpDetails();

    const requestBody = {
      "mobile_number": this.msIsdn,
      "tnc": true
    };
    const apiUrl = ApiConstant.MC_SEND_OTP_API;
    this.loginService.MobileConnect(apiUrl, requestBody).subscribe(
      (response: any) => {
        clearTimeout(this.timeoutId);
        if (typeof window !== 'undefined' && localStorage && sessionStorage && response[0].state) {
          localStorage.setItem("State", response[0].state);
          this.state = response[0].state;

          sessionStorage.setItem(SECURITY_CODE, response[0]?.securityCode);
          this.securityCode = response[0]?.securityCode;
        }
        if (response[0].status === true && response[0].exists === true) {
          this.disableResendOtpLink(response[0]);
          this.setOtpTimeout();
        } else {
          this.errorMessage = {
            message: response[0].message
          };
          this.errorExits = true;
        }
      }, (error: any) => {
        this.callErrorMessage('SYS_DOWN');
      });
  }

  public ResetOtpDetails() {
    this.otp1 = "";
    this.otp2 = "";
    this.otp3 = "";
    this.otp4 = "";
    this.otp5 = "";
    this.otp6 = "";
  }

  // Manage OTP tab..
  public ManageOTP(otpNextTextBoxId: string, event: any, currentTextBoxId) {
    const enteredValue = event.target.value;
    const keyCode = enteredValue.charCodeAt(0);
    if (keyCode !== undefined) {
      if (keyCode >= 48 && keyCode <= 57) {
        if (otpNextTextBoxId !== '') {
          this.SetOtpTextBoxFocus(otpNextTextBoxId);
        }
      } else {
        // non-numeric should be restricted..
        this.ResetOTPTextBoxById(currentTextBoxId);
      }
    }
    this.ManageOTPMaxLength(currentTextBoxId);
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
  private ManageOTPMaxLength(currentTextBoxId: string) {
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

  private CreateUserMagento(userInfo: any, userToken: any, authToken: any) {
    // success
    this.userToken = userToken;
    if (typeof window !== "undefined" && localStorage && sessionStorage) {
      localStorage.removeItem("State");
      localStorage.removeItem("checkToShowEditEligibilityBox");
      localStorage.removeItem("MNPCustomerData");
      localStorage.removeItem("MNPRedirectionToLoginPage");
      if (localStorage && localStorage.getItem("homeWirelessData")) {
        let HWRetentionData: any = {};
        HWRetentionData = JSON.parse(localStorage.getItem("homeWirelessData"));
        this.Redirect('/broadband/' + HWRetentionData.deviceSku);
      } else if (localStorage && localStorage.getItem("keepCelcomNum")) {
        this.keepCelcomNum = {};
        this.keepCelcomNum = JSON.parse(localStorage.getItem("keepCelcomNum"));
        if (localStorage && localStorage.getItem("mvivaCampaignUrl")) {
          this.Redirect(localStorage.getItem("mvivaCampaignUrl"));
          // this.Redirect('/device-detail/' + this.keepCelcomNum.sku + localStorage.getItem("mvivaCampaignUrl"));
          localStorage.removeItem("mvivaCampaignUrl");
        } else {
          this.Redirect('/device-detail/' + this.keepCelcomNum.sku);
        }
      } else if (localStorage && localStorage.getItem("chosenPlan")) {
        this.keepCelcomNum = {};
        this.keepCelcomNum = JSON.parse(localStorage.getItem("chosenPlan"));
        if (localStorage && localStorage.getItem("mvivaCampaignUrl")) {
          this.Redirect(localStorage.getItem("mvivaCampaignUrl"));
          // this.Redirect(this.keepCelcomNum.planDetails.BuynowLink + localStorage.getItem("mvivaCampaignUrl"));
          localStorage.removeItem("mvivaCampaignUrl");
        } else {
          if (this.keepCelcomNum.planDetails.BuynowLink && this.keepCelcomNum.planDetails.BuynowLink !== '') {
            this.Redirect(this.keepCelcomNum.planDetails.BuynowLink);
          } else if (this.keepCelcomNum.planDetails.url_key && this.keepCelcomNum.planDetails.url_key !== '') {
            this.Redirect('/plans/' + this.keepCelcomNum.planDetails.url_key);
          }
        }
      } else if (localStorage && localStorage.getItem("trackOrderRedirect") &&
        localStorage.getItem("trackOrderRedirect") === "exists") {
        localStorage.removeItem("trackOrderRedirect");
        this.Redirect('/store/account/order-history');
      } else if (localStorage && localStorage.getItem("selectionAfterLogin") &&
        localStorage.getItem("enableChoosewayLogin") && localStorage.getItem("DeviceSku")) {
        if (this.elligibleUser) {
          localStorage.removeItem("selectionAfterLogin");
          localStorage.removeItem("suppLinesAddedByTheUser");
          localStorage.removeItem("PrincipleNumberSelected");
          localStorage.removeItem("supplementryFlow");
          localStorage.setItem("EligibilityIndicator", JSON.stringify(this.eligibilityInfo));
        }
        const sku = localStorage.getItem("DeviceSku");
        this.Redirect('/device-detail/' + sku);
      } else if (this.isLimitExceededIncludingOpenOrders && !this.elligibleUser) {
        this.cartService.ManageEligibilityRedirection();
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
      } else {
        this.AddProductsToCart();
      }
    }
  }

  public AddProductsToCart() {
    // redirect to device detail or plan purchase if user exceed no of connections.
    if (this.elligibleUser && localStorage.getItem('orderDetails')) {
      if (typeof window !== 'undefined') {
        localStorage.setItem("EligibilityIndicator", JSON.stringify(this.eligibilityInfo));
        localStorage.removeItem("suppLinesAddedByTheUser");
        localStorage.removeItem("selectionAfterLogin");
        localStorage.removeItem("PrincipleNumberSelected");
        localStorage.removeItem("supplementryFlow");
        this.cartService.ManageEligibilityRedirection();
      }
    } else {
      if (localStorage && localStorage.getItem('orderDetails') && localStorage.getItem('selectedProductDetails')) {
        this.orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
        this.selectedProductDetails = JSON.parse(localStorage.getItem('selectedProductDetails'));
        this.persistingCartDetails();
      } else if (localStorage && localStorage.getItem('orderDetails') && localStorage.getItem('PlanOnlyObjectForCart')) {
        this.orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
        this.PlanOnlyObjectForCart = JSON.parse(localStorage.getItem('PlanOnlyObjectForCart'));
        if (this.PlanOnlyObjectForCart.selectedPlanDetails.is_xpax !== undefined) {
          this.ManageAgeEligibilityWorkFlow(this.PLAN_PURCHASE, this.PlanOnlyObjectForCart);
        } else {
          this.CallAddTOCartForPlanOnly();
        }
      } else {
        let pageBeforeLogin = "";
        if (localStorage && localStorage.getItem("pageBeforeLogin")) {
          pageBeforeLogin = localStorage.getItem("pageBeforeLogin");
        }
        const pageBeforeURL = new URL(pageBeforeLogin);
        if (pageBeforeURL.pathname === "/store/login/otp") {
          this.Redirect(pageBeforeURL.origin + "/store/devices");
        } else {
          this.Redirect(pageBeforeLogin);
        }
      }
    }
  }

  persistingCartDetails() {
    if (localStorage && sessionStorage && localStorage.getItem("MyMsIsdn") && sessionStorage.getItem("UserInfo")) {
      let apiUrl = ApiConstant.CARTMINE_API;
      if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem('CAorderId') && sessionStorage.getItem('secretKey') &&
       sessionStorage.getItem('CAorderId') !== null && sessionStorage.getItem('secretKey') !== null) {
          const orderSecret = sessionStorage.getItem('secretKey');
          const orderId = sessionStorage.getItem('CAorderId');
         apiUrl = "/rest/V1/cartmine?order_id=" + orderId + "&order_secret=" + orderSecret;
      }
      this.cartService.Find(apiUrl.trim()).subscribe(
        (response: any) => {
          if (response && response[0] && response[0].all_items && response[0].all_items.length > 0) {
            // let cartTotal = 0;
            const cartItemArray = [];
            response[0].all_items.forEach(element => {
              const cartItem = new CartItem();
              cartItem.item_id = element.item_id;
              cartItem.itemTotal = element.itemTotal;
              cartItem.price = element.price;
              cartItem.quantity = element.quantity;
              cartItem.selectedProduct = element.selectedProduct;
              cartItem.sku = element.sku;
              cartItem.skuBundle = element.sku_bundle;
              cartItem.isPreorder = element.is_preorder;
              cartItem.availabilityFlag = element.preorder_availability_flag;
              cartItem.cobpDeviceUpfrontPenalty = element.device_upfront_penalty;
              cartItemArray.push(cartItem);
            });
            this.cart = new Cart();
            this.cart.items = cartItemArray;
            this.cart.setTotalPrices(this.cart);
            if (localStorage) {
              localStorage.setItem("cart", JSON.stringify(this.cart));
              localStorage.setItem("DeviceCount", "one");
              localStorage.setItem("errorAddToCart", "true");
              localStorage.setItem("errorAddToCartMessage",
                "Note: You can only add another item after you have checked out with your existing items in the cart.");
              if (this.orderDetails.sku !== undefined && this.orderDetails.sku.bundleSku !== undefined) {
                this.Redirect('/plans/' + this.orderDetails.sku.bundleSku);
              } else {
                this.Redirect('/device-detail/' + this.orderDetails.sku);
              }
            }
          } else {
            this.cart = null;
            this.disclaimerShow();
          }
        });
    }
  }


  RoundingOff(value) {
    return this._commonUtilService.RoundingOff2String(value);
  }

  public AddToCartNotificationError() {
    this.errorAddToCart = true;
    setTimeout(() => {
      this._deviceDataService.publishNotificationError(this.errorAddToCart);
    }, 0);
  }

  public AddToCartNotification() {
    const addedToCart = true;
    // setTimeout(()=>{
    //     this._deviceDataService.publishNotification(addedToCart);
    // },0);
    this._deviceDataService.publishNotification(addedToCart);
  }

  public checkValidation() {
    if (this.errorExits || this.otp1 == null || this.otp1 === "" ||
      this.otp2 == null || this.otp2 === "" || this.otp3 == null || this.otp3 === "" || this.otp4 == null || this.otp4 === "" ||
      this.otp5 == null || this.otp5 === "" || this.otp6 == null || this.otp6 === "") {
      this.validOtp = false;
      return true;
    } else {
      this.validOtp = true;
      return false;
    }
  }

  public Redirect(url: string) {
      window.location.href = url;
    if (localStorage && localStorage.getItem("pageBeforeLogin")) {
      localStorage.removeItem("pageBeforeLogin");
    }
  }

  ManageAgeEligibilityWorkFlow(type, data: any) {
    switch (type) {
      case this.PLAN_DEVICE:
        this.AgeEligibilityWorkFlow(data);
        break;
      case this.PLAN_PURCHASE:
        this.AgeEligibilityWorkFlow(data);
        break;
    }

  }
  AgeEligibilityWorkFlow(data: any) {
    const eligibilityInfo = this.FindEligibilityForPostpaidPlans(data);
    if (typeof window !== 'undefined' && localStorage &&
      eligibilityInfo.isEligibleByAge === false && eligibilityInfo.displayType === "LOWER_AGE") {
      localStorage.setItem("EligibilityIndicator", JSON.stringify(eligibilityInfo));
      const sku = data.selectedPlanDetails.url_key;
      this.RedirectToPlanPurchase(sku);
      return false;
    }
    if (typeof window !== 'undefined' && localStorage &&
      eligibilityInfo.isEligibleByAge === false && eligibilityInfo.displayType === "LOWER_AGE_LOGIN") {
      localStorage.setItem("EligibilityIndicator", JSON.stringify(eligibilityInfo));
      const sku = data.selectedPlanDetails.url_key;
      this.RedirectToPlanPurchase(sku);
      return false;

    }
    if (eligibilityInfo.isEligibleByAge === false && eligibilityInfo.displayType === "UPPER_AGE") {
      localStorage.setItem("EligibilityIndicator", JSON.stringify(eligibilityInfo));
      const sku = data.selectedPlanDetails.url_key;
      this.RedirectToPlanPurchase(sku);
      return false;
    } else {
      this.CallAddTOCartForPlanOnly();
    }

  }

  private FindEligibilityForPostpaidPlans(data: any): any {
    // service call
    let result = null;
    const upperAgeLimit = data.selectedPlanDetails.upper_age_limit != null ? parseInt(data.selectedPlanDetails.upper_age_limit, 10) : 0;
    const lowerAgeLimit = data.selectedPlanDetails.lower_age_limit != null ? parseInt(data.selectedPlanDetails.lower_age_limit, 10) : 0;
    if (data && data.selectedPlanDetails && data.selectedPlanDetails.is_xpax === true) {
      result = this.cartService.checkEligibilityForPostpaidXpax(lowerAgeLimit, upperAgeLimit);
    } else {
      result = this.cartService.checkEligibilityForFirstPlans(lowerAgeLimit);
    }
    return result;
  }

  private RedirectToPlanPurchase(sku: string) {
    if (typeof window !== "undefined") {
      const url = "/plans/" + sku;
      window.location.href = url;
    }
  }
  public checkSuppLinesCountValidation(suppDetails: any) {
    this.suppDetailsOfUser = suppDetails;
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("suppLinesDetailsOfUser", JSON.stringify(this.suppDetailsOfUser));
      if (localStorage.getItem("suppLinesAddedByTheUser")) {
        this.suppLinesDetails = JSON.parse(localStorage.getItem("suppLinesAddedByTheUser"));
        if (this.suppLinesDetails.length <= this.suppDetailsOfUser.maxPostpaidLinesRemaining) {
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
  public createRequestBodyForPlanOnlySupp() {
    this.suppLineRequestBody = [];
    if (this.suppLinesDetails && this.suppLinesDetails.length > 0) {
      for (let i = 0; i < this.suppLinesDetails.length; i++) {
        this.suppLineRequestBody.push({
          "number": this.suppLinesDetails[i].planPhoneNumber,
          "plan": this.suppLinesDetails[i].partNumber
        });
      }
    }
  }
  public createRequestBodyForSupp() {
    this.suppLineRequestBody = [];
    if (this.suppLinesDetails && this.suppLinesDetails.length > 0) {
      for (let i = 0; i < this.suppLinesDetails.length; i++) {
        this.suppLineRequestBody.push({
          "number": this.suppLinesDetails[i].planPhoneNumber,
          "plan": this.suppLinesDetails[i].partNumber,
          "subsidy": this.suppLinesDetails[i].subsidyAmount ? this.suppLinesDetails[i].subsidyAmount : ""
        });
      }
    }
  }
  public checkNumberOfLinesUserHas() {
    this.typeOfUser = 'Postpaid';
    let noOfLines: number;
    if (this.typeOfUser === 'Postpaid') {
      noOfLines = 15;
    } else if (this.typeOfUser === 'Prepaid') {
      noOfLines = 5;
    }
    if (this.customerNRIC) {
      let count;
      let noOfSuppLinesAdded = 0;
      if (localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
        this.suppLinesDetails = JSON.parse(localStorage.getItem("suppLinesAddedByTheUser"));
        // Suplementary lines calculation
        noOfSuppLinesAdded = this.suppLinesDetails.length;
      }
      this.orderInfoService.ViewOrderInfo(this.customerNRIC, this.typeOfUser).subscribe(
        (response: any) => {
          // Check for response exception
          if (response && response.exception === false) {
            // Check for total lines for user
            if (response.order_data && response.order_data.total_lines) {
              count = response.order_data.total_lines;
              if ((Number(count) + noOfSuppLinesAdded) >= noOfLines) {
                if (Number(count) >= noOfLines) {
                  this.elligibleUser = true;
                } else {
                  this.elligibleUser = false;
                }
                this.isLimitExceededIncludingOpenOrders = true;
                this.suppDetailsOfUser = {
                  "status": false,
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
              if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem('CAorderId') &&
                sessionStorage.getItem('CAorderId') !== null && sessionStorage.getItem('secretKey') &&
                sessionStorage.getItem('secretKey') !== null) {
                this.checkSuppLinesCountValidation(this.suppDetailsOfUser);
                this.Redirect('/store/checkout/summary');
              } else {
                  if (typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('BuyNoPlan'))) {
                  this.elligibleUser = false;
                  this.isLimitExceededIncludingOpenOrders = false;
                  this.checkSuppLinesCountValidation(this.suppDetailsOfUser);
                  this.CreateUserMagento(this.userInfo, response.user_token, response.authtoken);
                } else if (!this.checkSuppLinesCountValidation(this.suppDetailsOfUser) && !this.elligibleUser) {
                  this.CreateUserMagento(this.userInfo, response.user_token, response.authtoken);
                } else if (this.elligibleUser === false && this.checkSuppLinesCountValidation(this.suppDetailsOfUser)) {
                  // if (localStorage && localStorage.getItem("SelectedPlanName") &&
                  //   localStorage.getItem("SelectedPlan") && localStorage.getItem("SelectedMonthlyPay") &&
                  //   localStorage.getItem("SelectedPlanDetails") && (localStorage.getItem("PSku"))) {
                  //   this.chosenPlan = {};
                  //   this.chosenPlan.planSku = localStorage.getItem("SelectedPlan");
                  //   this.chosenPlan.planDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
                  //   this.chosenPlan.monthlyPay = localStorage.getItem("SelectedMonthlyPay");
                  //   this.chosenPlan.planName = localStorage.getItem("SelectedPlanName");
                  //   this.chosenPlan.principalNum = localStorage.getItem("Principal_Number");
                  //   localStorage.setItem("chosenPlan", JSON.stringify(this.chosenPlan));
                  //   this.CreateUserMagento(this.userInfo, response.user_token, response.user_token);
                  // } else {
                  this.CreateUserMagento(this.userInfo, response.user_token, response.user_token);
                  //  }
                } else if (this.elligibleUser) {
                  this.eligibilityInfo = {
                    isEligibleByAge: false,
                    displayType: 'LIMIT_EXCEEDED',
                    type: 'xpax'
                  };
                  this._globalErrorHandler.errorObjectConvert(this.eligibilityInfo.displayType);
                  // localStorage.setItem("EligibilityIndicator", JSON.stringify(eligibilityInfo));
                  this.CreateUserMagento(this.userInfo, response.user_token, response.authtoken);
                }
              }
              // this.checkForLimitExceededOnOnlyLogin();
            } else if (response.exception === true) {
              this.isLimitExceededIncludingOpenOrders = false;
              this.isLimitReachedError = true;
              this.limitReachedErrorMsg = {};
              this.limitReachedErrorMsg.content = response.message;
              localStorage.setItem('limitReachedErrorMsg', JSON.stringify(this.limitReachedErrorMsg));
              localStorage.setItem('isLimitReachedError', JSON.stringify(this.isLimitReachedError));
              if (this.orderDetails && this.orderDetails.sku !== undefined && this.orderDetails.sku.bundleSku
                 && this.orderDetails.sku.bundleSku !== undefined) {
                this.Redirect('/plans/' + this.orderDetails.sku.bundleSku);
              } else {
              this.Redirect('/device-detail/' + this.orderDetails.sku);
              }
            }
          } else if (response.exception === true) {
            this.errorMessage = {
              message: response.message
            };
            this.errorExits = true;
          }
        }, (error: any) => {
          this.ShowingLimitReachedError(error);
        });
    }
  }
  disableResendOtpLink(resendValue) {
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.setItem("DisableResendLink", "0");
      if (resendValue.disable_resend_link !== undefined) {
        this.disableResendLink = resendValue.disable_resend_link * 1000;
        sessionStorage.setItem("DisableResendLink",  this.disableResendLink);
      }
    }
    this.SetOtpTextBoxFocus('1');
    this.enableDisableLinkAfterSpecifiedTime();
  }
  enableDisableLinkAfterSpecifiedTime() {
    setTimeout(() => {
      this.disableResendLink = 0;
      if (typeof window !== 'undefined' && sessionStorage) {
        sessionStorage.setItem("DisableResendLink", "0");
      }
    }, this.disableResendLink);
  }
  // Fucntion ot show error message after 2 mins of idle time.
  setOtpTimeout() {
    this.timeoutId = setTimeout(() => {
      this.callErrorMessage('OTP_EXPIRED');
    }, 120000);
  }
  // error messaged function.
  callErrorMessage(errType: string) {
    switch (errType) {
      case 'OTP_EXPIRED':
        this.errorMessage = {
          message: ErrorConst.OTP_EXPIRED_MSG,
        };
        this.errorExits = true;
        this.notValid = false;
        break;

      case 'SYS_DOWN':
        this.errorMessage = {
          message: ErrorConst.SYS_DOWN_MSG
        };
        this.errorExits = true;
        this.notValid = false;
        break;

    }
  }
  ngOnDestroy() {
    this.showValidationNotification = false;
    this.validationNotification = null;
  }

  otpInputBoxClicked(event,textBoxId){
    const enteredValue = event.target.value;
    if(enteredValue.length==1){
      this.SetOtpTextBoxFocus(textBoxId);
    }
  }

}
