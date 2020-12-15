import { Component, OnInit, Input, OnDestroy, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "../../../base.component";
import { AppService } from "../../../Service/app.service";
import { OrderInfoService } from "../../../Service/orderinfo.service";
import { BundleService } from "../../../Service/bundle.service";
import { GuestCheckoutService } from "../services/guest-checkout.service";
import { CartService } from "../../../Service/cart.service";
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { HeaderService } from "../../../Header/header.service";
// import filter from 'lodash/filter';
import { Subscription } from 'rxjs';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { environment } from 'environments/environment';
import { SupplimentaryLinesService } from "../../widget/supplementary-lines/supplementary-lines.service";
import { CookieService } from 'ngx-cookie-service';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';
import { UserService } from '../../../Service/user.service';
import { updateAnalytics } from 'app/shared/utilities/helper.ultility';
import { AnalyticsService } from 'app/Service/analytic.service';
declare var _: any;

@Component({
  selector: "app-guest-login",
  templateUrl: "./guest-login.component.html",
  styleUrls: ["./guest-login.component.css"],
  providers: [HeaderService, CartService, SupplimentaryLinesService, AppService, OrderInfoService, BundleService]
})
export class GuestLoginComponent extends BaseComponent
  implements OnInit, OnDestroy, AfterViewInit {
  blackListedSystem: string = environment.blackListedSystem;
  USER_TYPE = "USER_TYPE";
  // subscription;
  loginAttempt = 0;
  showLoginAttemptError = false;
  totalAttempt = 5;
  errorMessage: Object;
  errorExits = false;
  errorAgeRange = false;
  errorAge = false;
  invalidError = false;
  showItemAdded = false;
  customMsg: string;
  keepCelcomNum: any;
  selectValue = 1;
  valuedata: string;
  maxlength: any;
  minlength: any;
  customMessage = false;
  customerIDTypes = [];
  serviceError: any;
  mnpCustomer: any;
  mnpFlow = false;
  preLoadCustomerIDType = "";
  requestBody: any;
  userType: any;
  chosenPlan: any;
  IsCelcomUser = false;
  celcomUserDisableProceed = false;
  disableNewNRIC = false;
  public isMviva = false;
  public errorAddToCart = false;
  public isApiError = false;
  public apiErrorMessage: any;
  public showGuestNoticification = false;
  public isExistingGuest: any = null;
  public IsDisplayAgeEligibilityPopup = false;
  public EligibilityPopupType = { displayType: 'LOWER_AGE_LOGIN', type: '' };
  private NOT_ELIGIBLE_BY_AGE = "NotEligible";
  private ELIGIBLE_BY_AGE = "Eligible";
  private subscriber: Subscription;
  public customerNRIC: any = null;
  public isLimitReachedError = false;
  public limitReachedErrorMsg: any;
  public typeOfUser = "Postpaid";
  outletId: string = environment.outletId;
  public selectedProductDetails: any;
  public suppLinesDetails: any = [];
  public suppLineRequestBody: any = [];
  public isPreOrder = false;
  public isLimitExceededIncludingOpenOrders = false;
  public suppDetailsOfUser: any = {};
  public isMnp = false;
  public randomPhoneNo: any = null;
  public authToken: any;
  public reservationId = "";
  public elligibleUser = false;
  addonCode = null;
  public isGoldenNumberSelected = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _service: AppService,
    private orderInfoService: OrderInfoService,
    private bundleService: BundleService,
    private _guestService: GuestCheckoutService,
    private cartService: CartService,
    private _commonUtilService: CommonUtilService,
    private _router: Router,
    private _deviceDataService: DeviceDataService,
    @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _supplimentaryLinesService: SupplimentaryLinesService,
    private cookieService: CookieService,
    private _globalErrorHandler: GlobalErrorHandler,
    private _userService: UserService,
    private _analyticsService: AnalyticsService,
  ) {
    super();
    this.onComponentLoad();
  }

  ngOnInit() {
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.showGuestNoticification = data)
    );
    this.subscriber = this._guestService.loginAttemptChanged.subscribe(() => {
      this.loginAttempt = this._guestService.getLoginAttempt();
    });
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.isApiError = data));
    this.subscriber = this._deviceDataService.sharedNumberReservationId$.subscribe(
      data => (this.reservationId = data)
    );
    if (this.reservationId === "") {
      if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
        this.reservationId = JSON.parse(localStorage.getItem("numberReservationId"));
        // localStorage.removeItem("numberReservationId");
      }
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("AddToCartNotification")) {
      localStorage.removeItem("AddToCartNotification");
    }
    // Getting addon code from localstorage.
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage && localStorage.getItem("addonCode")) {
        this.addonCode = localStorage.getItem("addonCode");
      }
    }
    if (localStorage && localStorage.getItem("isMviva")) {
      this.isMviva = JSON.parse(localStorage.getItem("isMviva"));
    }
    this.subscriber = this._deviceDataService.sharedGoldenNumber$.subscribe(data => {
      this.isGoldenNumberSelected = data;
    });
  }

  ngAfterViewInit() {
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this._router.navigateByUrl("/store/login");
    }
    const currentUrl: string = this._router.routerState.snapshot.url;
    if(this._activatedRoute.data){
      this._activatedRoute.data.subscribe((item: any) => {
        this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
      });
    }

  }

  onSubmit(form) {
    const fullNricNum = form.value.customerIDNo.toString().substr(0, 6);
    const year = fullNricNum.slice(0, 2);
    const month = fullNricNum.slice(2, 4);
    const day = fullNricNum.slice(4);
    let y: any, m: any, d: any;
    const today = new Date();
    const fullDOB = new Date(year, month, day);
    const yearToday = today.getFullYear();
    let yearDoB = fullDOB.getFullYear();
    const yearTodayString = yearToday.toString().slice(2);
    this.errorExits = false;
    this.invalidError = false;
    let orderId;
    let secretKey;
    if(this._activatedRoute.queryParams){
      this._activatedRoute.queryParams.subscribe(params => {
        if (params.order_id && params.order_id !== null && params.order_secret &&
          params.order_secret !== null && typeof window !== "undefined" && sessionStorage) {
           orderId = params.order_id;
           secretKey = params.order_secret;
          sessionStorage.setItem('CAorderId', orderId);
          sessionStorage.setItem('secretKey', secretKey);
        }
      });
    }

    const guestBlkChkRequest = {
      // Validating blacklist info.
      blacklistChkRequest: {
        customerIDType: this.preLoadCustomerIDType,
        customerIDNo: form.value.customerIDNo.toString(),
        system: this.blackListedSystem
      },
      // Customer info for some data validations.
      outputCPResp: {
        customerID: form.value.customerIDNo.toString(),
        dateOfBirth: this._commonUtilService.capturingDOBFromNRIC(form.value.customerIDNo.toString()) + "_000000",
        preferredContactMethod: "",
        contactPreferredTime: "",
        contactEmail: "",
        contactSalutation: "",
        services: [{ "pre_Pos_Indicator": "Postpaid" }]
      }
    };

    if (form.invalid || this.loginAttempt >= this.totalAttempt) {
      return;
    }

    if (year <= yearTodayString) {
      const yearDoBToAssign = "20" + year;
      yearDoB = parseInt(yearDoBToAssign, 10);
    }

    y = yearDoB;
    m = parseInt(month, 10);
    d = parseInt(day, 10);
    if (this.isDate(y, m, d)) {
      const age = this.calculateAge(year, month, day);
      if (age < 18) {
        this.checkSubNav();
        this.IsDisplayAgeEligibilityPopup = true;
        return false;
      } else {
        this.IsDisplayAgeEligibilityPopup = false;
      }
      const request = {
        "login_data": {
          "user": "guest",
          "id_type": this.preLoadCustomerIDType,
          "id_number": form.value.customerIDNo.toString(),
          "order_id": orderId,
          "order_secret" : secretKey,
        }
      };
      const url = "/rest/V1/login";
      const createActivityReq = JSON.stringify(request);
      this._service.postROI(url, createActivityReq).subscribe(
        (response: any) => {
          // Set show login attempts error false.
          this.showLoginAttemptError = false;
          if (response && response[0]?.status) {
            guestBlkChkRequest.outputCPResp.preferredContactMethod = response[0].preferred_contact_method;
            guestBlkChkRequest.outputCPResp.contactPreferredTime = response[0].preferred_contact_time;
            guestBlkChkRequest.outputCPResp.contactEmail = response[0].email;
            guestBlkChkRequest.outputCPResp.contactSalutation = response[0].contact_salutation;
            try {
              if (response[0]?.nric) {
                updateAnalytics('nric', response[0].nric);
                this._analyticsService.nricType = response[0]?.nric;
              }
            } catch (_error) {
        
            }
            this.customerLoginValidation(response[0], guestBlkChkRequest);
          } else if (!response[0].status && typeof (response[0].blacklisted) === 'undefined') {
            this.errorMessage = {
              message: response[0].message
            };
            this.errorExits = true;
            this.removeStorage();
          } else if (typeof (response[0].blacklisted) !== 'undefined' && response[0].blacklisted === true) {
            this.errorMessage = {
              message: response[0].message
            };
            this.errorExits = true;
            // Set show login attempts error true if it is blacklisted.
            this.showLoginAttemptError = true;
            this._guestService.increaseLoginAttempt();
            this.removeStorage();
          } else {
            this.errorExits = true;
            this.errorMessage = {
              message: response[0].message
            };
            this.removeStorage();
          }
        },
        (error: any) => {
          this.serviceError = error;
          this.errorExits = true;
          this.removeStorage();
        }
      );
    }
  }

  public DisplayAgeEligibilityPopup(eligibilityInfo: any) {
    this.EligibilityPopupType = eligibilityInfo;
    this.IsDisplayAgeEligibilityPopup = true;
  }

  public OnContinueEligibilityCheck(dataPassed: any) {
    this.IsDisplayAgeEligibilityPopup = false;
    if (typeof window !== 'undefined') {
      if (localStorage && localStorage.getItem("ls_subnav") != null) {
        const subnavData = JSON.parse(localStorage.getItem("ls_subnav"));
        if (subnavData.activeMenu === "Postpaid") {
          const data = JSON.parse(localStorage.getItem("PlanOnlyObjectForCart"));
          const sku = data.selectedPlanDetails.url_key;
          const url = "/plans/" + sku;
          window.location.href = url;
        } else if (subnavData.activeMenu === "Devices") {
          const sku = localStorage.getItem("DeviceSku");
          const url = "/device-detail/" + sku;
          window.location.href = url;
        }
      }
    }
  }


  public isDate(y, m, d) {
    const date = new Date(y, m - 1, d);
    const convertedDate =
      "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
    const givenDate = "" + y + m + d;
    if (givenDate !== convertedDate) {
      this.errorAgeRange = true;
      return false;
    } else {
      this.errorAgeRange = false;
      return true;
    }
  }

  public calculateAge(year, month, day) {
    const today = new Date();
    const DoB = new Date(year, month, day);
    const yearToday = today.getFullYear();
    let yearDoB = DoB.getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const yearTodayString = yearToday.toString().slice(2);
    const currentDate = new Date().getDate();
    month = Number(month);
    day = Number(day);

    if (year <= yearTodayString) {
      const yearDoBToAssign = "20" + year;
      yearDoB = parseInt(yearDoBToAssign, 10);
    }
    let age = yearToday - yearDoB;
    if (yearToday - yearDoB === 18) {
      if (currentMonth - month === 0) {
        if (currentDate - day < 0) {
          age = age - 1;
        }
      }
    }
    return age;
  }

  customerLoginValidation(response, guestBlkChkRequest) {
    this.customerNRIC = guestBlkChkRequest.outputCPResp.customerID;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("UserToken", response.token);
      sessionStorage.setItem("authtoken", response.authtoken);
    }
    if (!response.new_guest) {
      if (response && !response.mobile_connect_user) {
        if (response.token !== "") {
          if (typeof window !== "undefined" && localStorage && sessionStorage) {
            localStorage.setItem("GUEST_USER_FIRST", "NO");
            sessionStorage.setItem("OLD_GUEST_USER", "YES");
            sessionStorage.setItem("personalForm", JSON.stringify(guestBlkChkRequest));
            this._deviceDataService.publishGuestName("GUEST");
            this.redirectToSummaryPage(guestBlkChkRequest);
          }
        } else {
          this.stopUser(response.message);
        }
      } else if (response.token === "" && !response.mobile_connect_user) {
        this.stopUser(response.message);
      } else {
        this.redirectLogin(); // stop user with mobile connect message.
      }
    } else {
      if (response.new_guest) {
        if (typeof window !== "undefined") {
          localStorage.setItem("GUEST_USER_FIRST", "YES");
          sessionStorage.setItem("OLD_GUEST_USER", "NO");
        }
        const isSuppLinesCountValid = this.checkSuppLinesCountValidation(response);
        if (isSuppLinesCountValid) {
          this._deviceDataService.publishGuestName("GUEST");
          this.redirectToSummaryPage(guestBlkChkRequest);
        }
      }
    }
  }

  setAffiliateParams() {
    // set affiliate IA
    if (this.cookieService.check('orderItem')) {
      // set affiliate IA
      if (this.requestBody && this.requestBody.data) {
        // set affiliate IA
        this.requestBody.data.is_affiliate_ia = true;
        // set affiliate IA
      }
    }
    // set affiliate ADA
    if (this.cookieService.check('adaRemainingDays')) {
      // set affiliate ADA
      if (this.requestBody && this.requestBody.data) {
        // set affiliate ADA
        const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
        // set affiliate ADA
        this.requestBody.data.is_affiliate_ada = adaRemainingDays.name;
        // set affiliate ADA
        this.requestBody.data.is_affiliate_ia = false;
        // If ADA exists doing IA as false
      }
    }
  }

  checkForLimitExceeded() {
    if (typeof window !== 'undefined' && localStorage && this.isLimitReachedError) {
      const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
      if (orderDetails && orderDetails.sku !== undefined && orderDetails.sku.bundleSku !== undefined) {
        this.Redirect('/plans/' + orderDetails.sku.bundleSku);
      } else {
      this.Redirect('/device-detail/' + orderDetails.sku);
      }
    } else if (typeof window !== 'undefined' && localStorage && this.isLimitExceededIncludingOpenOrders) {
      const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
      if (orderDetails && orderDetails.sku && orderDetails.sku !== undefined && orderDetails.sku.bundleSku !== undefined) {
        this.Redirect('/plans/' + orderDetails.sku.bundleSku);
      } else {
      this.Redirect('/device-detail/' + orderDetails.sku);
      }
      const eligibilityInfo = {
        isEligibleByAge: false,
        displayType: 'LIMIT_EXCEEDED_WITH_OPEN_COUNT',
        type: 'xpax'
      };
      this._globalErrorHandler.errorObjectConvert(eligibilityInfo.displayType);
      this.EligibilityPopupType = JSON.parse(JSON.stringify(eligibilityInfo));
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('eligiblePopupType', JSON.stringify(this.EligibilityPopupType));
      }
      this.IsDisplayAgeEligibilityPopup = true;
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('displayEligiblePopup', JSON.stringify(this.IsDisplayAgeEligibilityPopup));
      }
    } else if (localStorage && localStorage.getItem("orderDetails") && localStorage.getItem("selectedProductDetails")) {
      this.callAddToCartService();
    }
  }

  proceedAddToCart(guestInfo) {
    if (typeof window !== "undefined" && sessionStorage && localStorage) {
      localStorage.removeItem("checkToShowEditEligibilityBox");
      localStorage.removeItem("MNPCustomerData");
      localStorage.removeItem("MNPRedirectionToLoginPage");
      // if (localStorage && localStorage.getItem("orderDetails") && localStorage.getItem("selectedProductDetails")) {
      let noOfLines: number;
      this.typeOfUser = 'Postpaid';
      if (this.typeOfUser === 'Prepaid') {
        noOfLines = 5;
      } else if (this.typeOfUser === 'Postpaid') {
        noOfLines = 15;
      }
      if (this.customerNRIC) {
        let noOfSuppLinesAdded = 0;
        let count;
        if (typeof window !== 'undefined' && localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
          this.suppLinesDetails = JSON.parse(localStorage.getItem("suppLinesAddedByTheUser"));
          noOfSuppLinesAdded = this.suppLinesDetails.length;
        }
        this.orderInfoService.ViewOrderInfo(this.customerNRIC, this.typeOfUser).subscribe( // what is this ashwini?
          (response: any) => {
            if (response && response.exception === false) {
              if (response.order_data && response.order_data.total_lines) {
                count = response.order_data.total_lines;
                if ((Number(count) + noOfSuppLinesAdded) >= noOfLines) {
                  this.isLimitExceededIncludingOpenOrders = true;
                  this.elligibleUser = true;
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
                if (!this.elligibleUser && this.checkSuppLinesCountValidationForOldGuest(this.suppDetailsOfUser)) {
                  this._deviceDataService.publishGuestName("GUEST");
                  this.checkForLimitExceeded();
                } else if (!this.checkSuppLinesCountValidationForOldGuest(this.suppDetailsOfUser) && this.elligibleUser === false) {
                  if (typeof window !== 'undefined' && localStorage && localStorage.getItem("SelectedPlanName") &&
                    localStorage.getItem("SelectedPlan") && localStorage.getItem("SelectedMonthlyPay") &&
                    localStorage.getItem("SelectedPlanDetails") && localStorage.getItem("PSku")) {
                    this.chosenPlan = {};
                    this.chosenPlan.planSku = localStorage.getItem("SelectedPlan");
                    this.chosenPlan.planDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
                    this.chosenPlan.monthlyPay = localStorage.getItem("SelectedMonthlyPay");
                    this.chosenPlan.planName = localStorage.getItem("SelectedPlanName");
                    this.chosenPlan.principalNum = localStorage.getItem("Principal_Number");
                    localStorage.setItem("chosenPlan", JSON.stringify(this.chosenPlan));
                    this.supplementaryErrorRedirection();
                  }
                  // this.checkForLimitExceeded();
                } else {
                  const eligibilityInfo = {
                    isEligibleByAge: false,
                    displayType: 'LIMIT_EXCEEDED',
                    type: 'xpax'
                  };
                  this._globalErrorHandler.errorObjectConvert(eligibilityInfo.displayType);
                  localStorage.setItem("EligibilityIndicator", JSON.stringify(eligibilityInfo));
                  if (typeof window !== 'undefined' && sessionStorage) {
                    sessionStorage.removeItem('GuestInfo');
                    sessionStorage.removeItem('USER_TYPE');
                    sessionStorage.removeItem('OLD_GUEST_USER');
                    sessionStorage.removeItem('UserToken');
                    sessionStorage.removeItem('authtoken');
                    sessionStorage.removeItem('personalForm');
                    localStorage.removeItem("suppLinesDetailsOfUser");
                    this.cartService.ManageEligibilityRedirection();
                  }
                  // this.checkForLimitExceeded();
                }
                // this.checkForLimitExceeded();
              }
            } else if (response && response.exception === true) {
              this.isLimitExceededIncludingOpenOrders = false;
              this.isLimitReachedError = true;
              this.limitReachedErrorMsg = {};
              this.limitReachedErrorMsg.content = response.message;
              if (typeof window !== 'undefined' && localStorage) {
                localStorage.setItem('limitReachedErrorMsg', JSON.stringify(this.limitReachedErrorMsg));
                localStorage.setItem('isLimitReachedError', JSON.stringify(this.isLimitReachedError));
                const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
                if (orderDetails.sku && orderDetails.sku !== undefined && orderDetails.sku.bundleSku &&
                   orderDetails.sku.bundleSku !== undefined) {
                  this.Redirect('/plans/' + orderDetails.sku.bundleSku);
                } else {
                this.Redirect('/device-detail/' + orderDetails.sku);
                }
              }
            }
          }, (error: any) => {
            this.isLimitExceededIncludingOpenOrders = false;
            this.isLimitReachedError = true;
            this.limitReachedErrorMsg = {};
            this.limitReachedErrorMsg.content = error.message;
            if (typeof window !== 'undefined' && localStorage) {
              localStorage.setItem('limitReachedErrorMsg', JSON.stringify(this.limitReachedErrorMsg));
              localStorage.setItem('isLimitReachedError', JSON.stringify(this.isLimitReachedError));
              const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
              if (orderDetails && orderDetails.sku && orderDetails.sku.bundleSku && orderDetails.sku.bundleSku !== undefined) {
                this.Redirect('/plans/' + orderDetails.sku.bundleSku);
              } else {
              this.Redirect('/device-detail/' + orderDetails.sku);
              }
            }
          });
      } else {
        this.checkForLimitExceeded();
      }
      // }
      if (localStorage && localStorage.getItem("orderDetails") && localStorage.getItem("PlanOnlyObjectForCart")) {
        const data = JSON.parse(localStorage.getItem("PlanOnlyObjectForCart"));
        if (data.selectedPlanDetails.is_xpax !== undefined) {
          this.AgeEligibilityWorkFlow(data);
        } else {
          this.CallAddTOCartForPlanOnly();
        }
      }else if (localStorage && !localStorage.getItem("orderDetails") && !localStorage.getItem("selectedProductDetails")) {
        this._router.navigateByUrl("/");
      
      }
    }
  }

  supplementaryErrorRedirection() {
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("chosenPlan")) {
      this.keepCelcomNum = {};
      this.keepCelcomNum = JSON.parse(localStorage.getItem("chosenPlan"));
      this.Redirect(this.keepCelcomNum.planDetails.BuynowLink);
    }
  }
  callAddToCartService() {
    this.createRequestBodyForSupp();
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    const selectedProductDetails = JSON.parse(localStorage.getItem("selectedProductDetails"));
    this.requestBody = {};
    const orderDevicePriceSendTo = this.RoundingOff(selectedProductDetails.orderDevicePrice);
    const totalToSend = this.RoundingOff(selectedProductDetails.total);
    if (sessionStorage && sessionStorage.getItem("USER_TYPE") && !sessionStorage.getItem("UserToken")) {
      this.userType = "guest";
    } else {
      this.userType = "user";
    }
    if (localStorage && localStorage.getItem("isPreOrder")) {
      this.isPreOrder = JSON.parse(localStorage.getItem("isPreOrder"));
    }
    if (localStorage && localStorage.getItem("MNP-FLOW") === 'YES') {
      this.isMnp = true;
    }
    if (selectedProductDetails.orderDevice && selectedProductDetails.orderPlanName) {
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
      this.requestBody = {
        "data": {
          "bundle_product_sku": selectedProductDetails.orderDevice,
          "selected_device_product_sku": selectedProductDetails.selectedProductSku,
          "selected_plan_product_sku": selectedProductDetails.orderPlan,
          "selected_pass_product_sku": selectedProductDetails.orderAddOnpass,
          "selected_device_product_up_fornt_price": selectedProductDetails.orderOneTimePay,
          "selected_device_product_device_price": orderDevicePriceSendTo,
          "bundle_product_qty": "1",
          "bundle_product_price": totalToSend,
          "selected_number": selectedProductDetails.orderPhoneNo,
          "selected_number_type": selectedProductDetails.orderNumberType,
          "temporary_number": this.randomPhoneNo,
          "is_cobp": false,
          "is_mnp": this.isMnp,
          "user": this.userType,
          "is_preorder": this.isPreOrder,
          "is_affiliate_ia": false,
          "is_affiliate_ada": false,
          "add_on_ids": this.addonCode, // lifestyle addon Id.
          "reservationId": this.reservationId,
          "is_campaign_mviva": this.isMviva,
          "campaign_mviva_url": campaign_url,
          "is_golden_number": this.isGoldenNumberSelected
        },
        "supp_data": this.suppLineRequestBody,
        // Added for the Resevation of SKU device + plan
        "stockReserveQuantityInput": {
          "stockReserveQuantityInput": {
            "storeId": this.outletId,
            "reservationId": deviceReservationId,
            "listOfItemDetailRequest": {
              "itemDetailRequest": [{
                // set product type
                "ProductType": "HP",
                // set part number
                "PartNum":  (selectedProductDetails.orderReqPartNumber !== null) ? selectedProductDetails.orderReqPartNumber : 0,
                // reserve quantity
                "Quantity": "1",
                "listOfAttributes": [{
                  "attributes": [
                    {
                      "Name": "COLOR",
                      // set color
                      "Value": (selectedProductDetails.orderReqColor != null) ?
                        selectedProductDetails.orderReqColor.toUpperCase() : selectedProductDetails.orderReqColor,
                    },
                    {
                      "Name": "BRAND",
                      // set brand
                      "Value": (selectedProductDetails.orderReqBrand != null) ?
                        selectedProductDetails.orderReqBrand.toUpperCase() : selectedProductDetails.orderReqBrand,
                    },
                    {
                      "Name": "CATEGORY",
                      // set category
                      "Value": (selectedProductDetails.orderReqCategory != null) ?
                        selectedProductDetails.orderReqCategory.toUpperCase() : selectedProductDetails.orderReqCategory,
                    },
                    {
                      "Name": "PRODUCT",
                      // set product
                      "Value": "DEVICE"
                    },
                    {
                      "Name": "MODEL",
                      // set model
                      "Value": (selectedProductDetails.orderReqModel != null) ?
                        selectedProductDetails.orderReqModel.toUpperCase() : selectedProductDetails.orderReqModel,
                    }
                  ]
                }]
              }
              ]
            }
          }
        }
      };
      if(selectedProductDetails.orderSubpass){
        this.requestBody.data = {
          ...this.requestBody.data,
          sub_pass_sku: selectedProductDetails.orderSubpass,
        }
      }
    } else if (selectedProductDetails.orderDevice && !selectedProductDetails.orderPlanName) {
      this.requestBody = {
        "data": {
          "bundle_product_sku": selectedProductDetails.orderDevice,
          "selected_device_product_sku": selectedProductDetails.selectedProductSku,
          "selected_plan_product_sku": "null",
          "selected_device_product_up_fornt_price": "0",
          "selected_device_product_device_price": totalToSend,
          "device_product_qty": "1",
          "device_product_price": totalToSend,
          "is_cobp": false,
          "is_mnp": this.isMnp,
          "user": this.userType,
          "is_preorder": this.isPreOrder,
          "is_affiliate_ia": false,
          "is_affiliate_ada": false,
        },
        // Added for the Resevation of SKU device + plan
        "stockReserveQuantityInput": {
          "stockReserveQuantityInput": {
            "storeId": this.outletId,
            "reservationId": "IT000016",
            "listOfItemDetailRequest": {
              "itemDetailRequest": [{
                "ProductType": "HP",
                "PartNum":  (selectedProductDetails.orderReqPartNumber !== null) ? selectedProductDetails.orderReqPartNumber : 0,
                "Quantity": "1",
                "listOfAttributes": [{
                  "attributes": [
                    {
                      "Name": "BRAND",
                      "Value": (selectedProductDetails.orderReqBrand != null) ?
                        selectedProductDetails.orderReqBrand.toUpperCase() : selectedProductDetails.orderReqBrand,
                    },
                    {
                      "Name": "CATEGORY",
                      "Value": (selectedProductDetails.orderReqCategory != null) ?
                        selectedProductDetails.orderReqCategory.toUpperCase() : selectedProductDetails.orderReqCategory,
                    },
                    {
                      "Name": "COLOR",
                      "Value": (selectedProductDetails.orderReqColor != null) ?
                        selectedProductDetails.orderReqColor.toUpperCase() : selectedProductDetails.orderReqColor,
                    },
                    {
                      "Name": "MODEL",
                      "Value": (selectedProductDetails.orderReqModel != null) ?
                        selectedProductDetails.orderReqModel.toUpperCase() : selectedProductDetails.orderReqModel,
                    },
                    {
                      "Name": "PRODUCT",
                      "Value": "DEVICE"
                    }
                  ]
                }]
              }
              ]
            }
          }
        }

      };
    }
    this.setAffiliateParams();
    this.bundleService.BundleOrder(this.requestBody).subscribe(
      (response: any) => {
        if (response[0].status === true) {
          // this.cartService.addProductToCart(
          //   orderDetails,
          //   1,
          //   selectedProductDetails
          // );
          // // this._guestService.setItemAddedStatus(true);
          // if (typeof window !== "undefined" && localStorage) {
          //   localStorage.setItem("AddToCartNotification", "true");
          // }
          // this.Redirect("/store/cart");
          // this._guestService.setGuestUserName("GUEST!");
          // if (typeof window !== "undefined" && localStorage) {
          //   // localStorage.setItem("GUEST_CART_ID", response[0].cart_id);
          //   localStorage.removeItem("orderDetails");
          //   localStorage.removeItem("selectedProductDetails");
          // }
          // this._estoreAnalyticsService.onClickAddToCart(this._renderer);  // Analytics to track add to cart
          this.OnSucessFullBundleAddToCart(response, orderDetails, selectedProductDetails);
          this._estoreAnalyticsService.onClickAddToCart(this._renderer);  // Analytics to track add to cart
        } else if (typeof window !== "undefined" && localStorage && response && response.length !== 0 && response[0].status === false &&
          response[0].message === 'No Qty available for selected pre order product!') {
          localStorage.setItem("OutOfStockPreOrder", "true");
          this._router.navigateByUrl('/device-detail/' + orderDetails.sku);
        } else {
          // this.AddToCartNotificationError();
          // if (typeof window !== 'undefined' && localStorage) {
          //   localStorage.setItem("errorAddToCart", "true");
          //   localStorage.setItem("errorAddToCartMessage", response[0].message);
          // }
          // if (orderDetails && orderDetails.sku && orderDetails.sku.bundleSku !== undefined) {
          //   this.Redirect('/plans/' + orderDetails.sku.bundleSku);
          // } else {
          // this._router.navigateByUrl('/device-detail/' + orderDetails.sku);
          // }
          this.OnUnsuccessFullBundleAddToCart(response, orderDetails, selectedProductDetails);
        }
        if (localStorage && localStorage.getItem("isPreOrder")) {
          localStorage.removeItem("isPreOrder");
        }
      },
      (error: any) => {
        this.onBundleApiError(error);
        // this.serviceError = error;
        // this.isApiError = true;
        // this.apiErrorMessage = {};
        // this.apiErrorMessage.content = "Sorry for the inconvenience, we're giving our system a little update. Please try again later.";
        // this.errorExits = true;
      }
    );
  }
  OnSucessFullBundleAddToCart(response: any, orderDetails: any, selectedProductDetails: any) {
    this.cartService.addProductToCart(
      orderDetails,
      1,
      selectedProductDetails
    );
    // this._guestService.setItemAddedStatus(true);
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("AddToCartNotification", "true");
    }
    if (typeof window !== "undefined") {
      if (sessionStorage && ["GUEST", "ENTERPRISE"].includes(sessionStorage.getItem(this.USER_TYPE)) && !this._userService.didSummary()) {
          // Href redirection for ADA event capture.
          window.location.href = "/store/checkout/personal-details";
      } else {
        // this._router.navigateByUrl("/store/checkout");
        this.Redirect("/store/checkout/summary");
      }

    }
    this._guestService.setGuestUserName("GUEST!");
    if (typeof window !== "undefined" && localStorage) {
      // localStorage.setItem("GUEST_CART_ID", response[0].cart_id);
      localStorage.removeItem("orderDetails");
      localStorage.removeItem("selectedProductDetails");
    }
  }
  OnUnsuccessFullBundleAddToCart(response: any, orderDetails: any, selectedProductDetails: any) {
    this.AddToCartNotificationError();
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("errorAddToCart", "true");
      localStorage.setItem("errorAddToCartMessage", response[0].message);
    }
    if (orderDetails && orderDetails.sku && orderDetails.sku.bundleSku !== undefined) {
      this.Redirect('/plans/' + orderDetails.sku.bundleSku);
    } else {
    this._router.navigateByUrl('/device-detail/' + orderDetails.sku);
    }
  }
  onBundleApiError(error: any) {
    this.serviceError = error;
    this.isApiError = true;
    this.apiErrorMessage = {};
    this.apiErrorMessage.content = "Sorry for the inconvenience, we're giving our system a little update. Please try again later.";
    this.errorExits = true;
  }

  CallAddTOCartForPlanOnly() {
    this.createRequestBodyForPlanOnlySupp();
    let mnpCustomerId = null;
    let isMnp = false;
    if (typeof window !== 'undefined' && localStorage) {
      const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
      const PlanOnlyObjectForCart = JSON.parse(
        localStorage.getItem("PlanOnlyObjectForCart")
      );
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
      if ((typeof (PlanOnlyObjectForCart.orderPhoneNo) === "string") && PlanOnlyObjectForCart.orderPhoneNo.charAt(0) === ' ') {
        PlanOnlyObjectForCart.orderPhoneNo = PlanOnlyObjectForCart.orderPhoneNo.slice(1);
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
          "Sku": PlanOnlyObjectForCart.orderPlan,
          "PlanName": PlanOnlyObjectForCart.orderPlanName,
          "TotalPay": PlanOnlyObjectForCart.orderTotalPay,
          "selected_number": PlanOnlyObjectForCart.orderPhoneNo,
          "selected_number_type": PlanOnlyObjectForCart.orderNumberType,
          "is_cobp": false,
          "user": this.userType,
          "is_mnp": isMnp,
          "mnp_id": mnpCustomerId,
          "add_on_ids": this.addonCode, // lifestyle addon Id.
          "is_campaign_mviva": this.isMviva,
          "campaign_mviva_url": campaign_url,
          "is_affiliate_ia": false,
          "is_affiliate_ada": false,
          "reservationId": this.reservationId,
          "is_golden_number": this.isGoldenNumberSelected
        },
        "supp_data": this.suppLineRequestBody
      };
      this.setAffiliateParams();
      const url = "/rest/V1/planaddtocart";
      this._service.postEstoreUserData(url, this.requestBody).subscribe(
        (response: any) => {
          if (response[0].status === true) {
            // this._guestService.setItemAddedStatus(true);
            // this.cartService.addProductToCart(
            //   orderDetails,
            //   1,
            //   PlanOnlyObjectForCart
            // );
            // // this._guestService.setItemAddedStatus(true);
            // if (typeof window !== "undefined" && localStorage) {
            //   localStorage.setItem("AddToCartNotification", "true");
            // }
            // this.Redirect("/store/cart");
            // this._estoreAnalyticsService.onClickAddToCart(this._renderer);  // Analytics to track add to cart
            this.OnsucessFullPlanForPlanAddToCart(response, orderDetails, PlanOnlyObjectForCart);
            this._estoreAnalyticsService.onClickAddToCart(this._renderer);  // Analytics to track add to cart
          } else if ((response[0].status === false && response[0].message === "There is already one item in cart.") ||
            (response[0].status === false && response[0].message)) {
            // if (typeof window !== 'undefined' && localStorage) {
            //   localStorage.setItem("errorAddToCart", "true");
            //   localStorage.setItem("errorAddToCartMessage", response[0].message);
            //   if (localStorage.getItem("SelectedPlan") && localStorage.getItem("SelectedPlanDetails") &&
            //     localStorage.getItem("SelectedMonthlyPay") && localStorage.getItem("SelectedPlanName")) {
            //     this.chosenPlan = {};
            //     this.chosenPlan.planSku = localStorage.getItem("SelectedPlan");
            //     this.chosenPlan.planDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
            //     this.chosenPlan.monthlyPay = localStorage.getItem("SelectedMonthlyPay");
            //     this.chosenPlan.planName = localStorage.getItem("SelectedPlanName");
            //     localStorage.setItem("chosenPlan", JSON.stringify(this.chosenPlan));
            //   }
            // }
            // this.Redirect(this.chosenPlan.planDetails.BuynowLink);
            this.OnUnsuccessfullPlanAddToCart(response);
          } else {
            this.AddToCartNotificationError();
            this.Redirect(PlanOnlyObjectForCart.selectedPlanDetails.BuynowLink);
          }
          if (typeof window !== "undefined" && localStorage) {
            // localStorage.setItem("GUEST_CART_ID", response[0].cart_id);
            localStorage.removeItem("orderDetails");
            localStorage.removeItem("PlanOnlyObjectForCart");
          }
        },
        (error: any) => {
          this.OnPlanAddtoCartAPiError(error);
          // this.apiErrorMessage = {};
          // this.serviceError = error;
          // this.errorExits = true;
          // this.apiErrorMessage.content = "Sorry for the inconvenience, we're giving our system a little update. Please try again later.";
          // this.isApiError = true;
        }
      );
    }
  }

  OnsucessFullPlanForPlanAddToCart(res, orderDetails, PlanOnlyObjectForCart) {
    this._guestService.setItemAddedStatus(true);
    this.cartService.addProductToCart(
      orderDetails,
      1,
      PlanOnlyObjectForCart
    );
    // this._guestService.setItemAddedStatus(true);
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("AddToCartNotification", "true");
    }
    this.Redirect("/store/cart");
  }
  OnUnsuccessfullPlanAddToCart(response) {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("errorAddToCart", "true");
      localStorage.setItem("errorAddToCartMessage", response[0].message);
      if (localStorage.getItem("SelectedPlan") && localStorage.getItem("SelectedPlanDetails") &&
        localStorage.getItem("SelectedMonthlyPay") && localStorage.getItem("SelectedPlanName")) {
        this.chosenPlan = {};
        this.chosenPlan.planSku = localStorage.getItem("SelectedPlan");
        this.chosenPlan.planDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
        this.chosenPlan.monthlyPay = localStorage.getItem("SelectedMonthlyPay");
        this.chosenPlan.planName = localStorage.getItem("SelectedPlanName");
        localStorage.setItem("chosenPlan", JSON.stringify(this.chosenPlan));
      }
    }
    this.Redirect(this.chosenPlan.planDetails.BuynowLink);
  }
  OnPlanAddtoCartAPiError(error) {
    this.apiErrorMessage = {};
          this.serviceError = error;
          this.errorExits = true;
          this.apiErrorMessage.content = "Sorry for the inconvenience, we're giving our system a little update. Please try again later.";
          this.isApiError = true;
  }

  getCustomerIdTypeValue(id) {
    return _.find(this.customerIDTypes, function (o) {
      return parseInt(o.id, 10) === parseInt(id, 10);
    });
  }

  RoundingOff(value) {
    return this._commonUtilService.RoundingOff2String(value);
  }
  redirectLogin() {
    this.IsCelcomUser = true;
    this.celcomUserDisableProceed = true;
  }

  stopUser(emptyValuesMessage) {
    this.showGuestNoticification = true;
    this.isExistingGuest = {};
    this.isExistingGuest.content = emptyValuesMessage;
    this.isExistingGuest.color = "7D7D7D";
  }

  changetextbox(newValue) {
    this.selectValue = 1;
    this.customMsg = "";
    this.valuedata = newValue;
  }
  restrictOnlyNum = (ev) => {
    return this._commonUtilService.restrictOnlyNum(ev, "nric", this.valuedata ? this.valuedata.toString() : "");
  }

  validationForIdType(identity_type, identity_value) {
    this.customMessage = false;
    this.errorAgeRange = false;
    this.IsCelcomUser = false;
    this.celcomUserDisableProceed = false;
    const type = identity_type;
    let idValue = identity_value;
    // const setAttribute = false;

    if (identity_value.toString().length > 12) {
      this.valuedata = this.valuedata.toString().slice(0,12);
      idValue = this.valuedata;
    }

    // If the error exist set error false after changes in textbox.
    if (this.errorExits) {
      this.errorExits = false;
    }

    switch (type) {
      case "1":
        if (idValue === "" || idValue === undefined) {
          this.customMessage = true;
          this.customMsg = "Please enter a value";
          return this.customMsg;
        }
        const pattern1 = /^\d+$/;
        if (!pattern1.test(idValue)) {
          this.customMsg = "Please enter digits only";
          this.customMessage = true;
          return this.customMsg;
        }

        const pattern2 = /^[0-9]{12}$/;
        if (!pattern2.test(idValue)) {
          this.maxlength = 12;
          this.customMessage = true;
          this.customMsg = "Please enter a valid New NRIC ID of 12 digit";
          return this.customMsg;
        }

        break;

      case "2":
        if (idValue === "") {
          this.customMessage = true;
          this.customMsg = "Please enter a value";
          return this.customMsg;
        }
        const pattern3 = /^[a-zA-Z0-9]{8}$/;
        if (!pattern3.test(idValue)) {
          this.maxlength = 8;
          this.customMessage = true;
          this.customMsg =
            "Please enter 7 digits and an alphabet only";
          return this.customMsg;
        }

        break;
      case "3":
        if (idValue === "") {
          this.customMessage = true;
          this.customMsg = "Please enter a value";
          return this.customMsg;
        }
        const pattern4 = /[a-zA-Z]{1}[0-9]{11}/;
        if (!pattern4.test(idValue)) {
          this.maxlength = 12;
          this.customMessage = true;
          this.customMsg =
            "Please enter 11 digits and an alphabet only";
          return this.customMsg;
        }

        break;
      case "4":
        if (idValue === "") {
          this.customMessage = true;
          this.customMsg = "Please enter a value";
          return this.customMsg;
        }

        const pattern5 = /[a-zA-Z]{1}[0-9]{11}/;
        if (!pattern5.test(idValue)) {
          this.maxlength = 12;
          this.customMessage = true;
          this.customMsg =
            "Please enter 11 digits and an alphabet only";
          return this.customMsg;
        }

        return 0;
    }
  }

  private ParamsForRedirectionToPlanPurchase(data, eligibilityInfo) {
    localStorage.setItem("EligibilityIndicator", JSON.stringify(eligibilityInfo));
    const sku = data.selectedProductSku;
    this.RedirectToPlanPurchase(sku, eligibilityInfo.displayType);
  }

  private AgeEligibilityWorkFlow(data: any) {
    const eligibilityInfo = this.FindEligibilityForPostpaidPlans(data);
    if (eligibilityInfo.isEligibleByAge === false && eligibilityInfo.displayType === "LOWER_AGE") {
      localStorage.setItem("EligibilityIndicator", JSON.stringify(eligibilityInfo));
      const sku = data.selectedPlanDetails.url_key;
      this.RedirectToPlanPurchase(sku, eligibilityInfo.displayType);
    } else if (eligibilityInfo.isEligibleByAge === false && eligibilityInfo.displayType === "LOWER_AGE_LOGIN") {
      this.ParamsForRedirectionToPlanPurchase(data, eligibilityInfo);
    } else if (eligibilityInfo.isEligibleByAge === false && eligibilityInfo.displayType === "UPPER_AGE") {
      this.ParamsForRedirectionToPlanPurchase(data, eligibilityInfo);
    } else {
      this.CallAddTOCartForPlanOnly();
    }
  }

  private FindEligibilityForPostpaidPlans(data: any): any {
    // service call
    let result = null;
    const upperAgeLimit = data.selectedPlanDetails.upper_age_limit != null ? Number(data.selectedPlanDetails.upper_age_limit) : 0;
    const lowerAgeLimit = data.selectedPlanDetails.lower_age_limit != null ? Number(data.selectedPlanDetails.lower_age_limit) : 0;
    if (data && data.selectedPlanDetails && data.selectedPlanDetails.is_xpax === true) {
      result = this.cartService.checkEligibilityForPostpaidXpax(lowerAgeLimit, upperAgeLimit);
    } else {
      result = this.cartService.checkEligibilityForFirstPlans(lowerAgeLimit);
    }
    return result;
  }

  private RedirectToPlanPurchase(sku: string, displayType: string) {
    if (displayType === "LOWER_AGE") {
      if (typeof window !== 'undefined' && localStorage) {
        const data = JSON.parse(localStorage.getItem("PlanOnlyObjectForCart"));
        sku = data.selectedPlanDetails.url_key;
        if (typeof window !== 'undefined' && sessionStorage) {
          // sessionStorage.removeItem('GuestInfo');
          // sessionStorage.removeItem('USER_TYPE');
          const url = "/plans/" + sku;
          window.location.href = url;
        }
      }
    }
    if (displayType === "LOWER_AGE_LOGIN") {
      if (typeof window !== 'undefined' && localStorage) {
        const data = JSON.parse(localStorage.getItem("PlanOnlyObjectForCart"));
        sku = data.selectedPlanDetails.url_key;
        if (typeof window !== 'undefined' && sessionStorage) {
          // sessionStorage.removeItem('GuestInfo');
          // sessionStorage.removeItem('USER_TYPE');
          const url = "/plans/" + sku;
          window.location.href = url;
        }
      }
    } else {
      if (typeof window !== "undefined") {
        const url = "/plans/" + sku;
        window.location.href = url;
      }
    }
  }

  public checkSubNav() {
    if (typeof window !== 'undefined') {
      if (localStorage && localStorage.getItem("ls_subnav") != null) {
        const subnavData = JSON.parse(localStorage.getItem("ls_subnav"));
        if (subnavData.activeMenu === "Postpaid") {
          const plan = JSON.parse(localStorage.getItem("PlanOnlyObjectForCart"));
          if (plan && plan.selectedPlanDetails.is_xpax === true) {
            this.EligibilityPopupType.type = "xpax";
          } else {
            this.EligibilityPopupType.type = "first";
          }
        } else if (subnavData.activeMenu === "Devices") {
          this.EligibilityPopupType.type = "device";
        }
      }
    }
  }

  public Redirect(url: string) {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }

  public existingUserRedirection() {
    this._router.navigateByUrl('/store/login');
  }

  public checkSuppLinesCountValidation(UserInfo: any) {
   // const prodServer = environment.production;
    let noOfLinesOfUser = 0;
    this.typeOfUser = 'Postpaid';
    // if (prodServer) {
    //   if (this.typeOfUser === 'Prepaid') {
    //     noOfLinesOfUser = 5;
    //   } else if (this.typeOfUser === 'Postpaid') {
    //     noOfLinesOfUser = 15;
    //   }
    // } else {
      if (this.typeOfUser === 'Prepaid') {
        noOfLinesOfUser = 5;
      } else if (this.typeOfUser === 'Postpaid') {
        noOfLinesOfUser = 15;
     // }
    }
    if (typeof window !== 'undefined' && localStorage && sessionStorage) {
      if (sessionStorage.getItem("OLD_GUEST_USER") === "NO") {
        this.suppDetailsOfUser.status = true;
        this.suppDetailsOfUser.maxPostpaidLinesRemaining = noOfLinesOfUser - 1;
      }
      // } else {
      // this.suppDetailsOfUser = this._supplimentaryLinesService.checkNumberOfLinesUserHasForSuppLinesGuest(UserInfo);
      // }
      localStorage.setItem("suppLinesDetailsOfUser", JSON.stringify(this.suppDetailsOfUser));
      if (localStorage.getItem("suppLinesAddedByTheUser")) {
        this.suppLinesDetails = JSON.parse(localStorage.getItem("suppLinesAddedByTheUser"));
        if (this.suppLinesDetails.length <= this.suppDetailsOfUser.maxPostpaidLinesRemaining) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }

  public createRequestBodyForSupp() {
    this.suppLineRequestBody = [];
    if (this.suppLinesDetails && this.suppLinesDetails.length > 0) {
      for (let i = 0; i < this.suppLinesDetails.length; i++) {
        this.suppLineRequestBody.push({
          "plan": this.suppLinesDetails[i].partNumber,
          "number": this.suppLinesDetails[i].planPhoneNumber,
          "subsidy": this.suppLinesDetails[i].subsidyAmount ? this.suppLinesDetails[i].subsidyAmount : ""
        });
      }
    }
  }
  public createRequestBodyForPlanOnlySupp() {
    this.suppLineRequestBody = [];
    if (this.suppLinesDetails && this.suppLinesDetails.length > 0) {
      for (let i = 0; i < this.suppLinesDetails.length; i++) {
        this.suppLineRequestBody.push({
          "plan": this.suppLinesDetails[i].partNumber,
          "number": this.suppLinesDetails[i].planPhoneNumber
        });
      }
    }
  }

  public AddToCartNotificationError() {
    this.errorAddToCart = true;
    setTimeout(() => {
      this._deviceDataService.publishNotificationError(this.errorAddToCart);
    }, 0);
  }

  public checkSuppLinesCountValidationForOldGuest(suppDetails: any) {
    this.suppDetailsOfUser = suppDetails;
    if (typeof window !== 'undefined') {
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

  onComponentLoad() {
    this.customerIDTypes = this._guestService.getCustomerIDTypes();
    this.preLoadCustomerIDType = (this.customerIDTypes[0].id).toString();
    this.errorMessage = {
      message: this.errorConst.SYS_DOWN_MSG,
      invalidId: "Invalid ID"
    };
    if (localStorage && localStorage.getItem("MNP-PRE-SELECT") === "YES") {
      this.mnpFlow = true;
      this.mnpCustomer = JSON.parse(localStorage.getItem("MNP-CUSTOMER"));
      this.valuedata = this.mnpCustomer.customerID;
      this.preLoadCustomerIDType = this.mnpCustomer.customerIDType;
      this.disableNewNRIC = true;
    }
  }
  redirectToSummaryPage(guestBlkChkRequest: any) {
    if (typeof window !== "undefined" && sessionStorage) {
     sessionStorage.setItem(this.USER_TYPE, "GUEST");
     guestBlkChkRequest.customerIDTypes = this.customerIDTypes;
     if (this.preLoadCustomerIDType) {
     guestBlkChkRequest.blacklistChkRequest.customerIDTypeValue = this.getCustomerIdTypeValue(this.preLoadCustomerIDType).value;
     }
     guestBlkChkRequest = JSON.stringify(guestBlkChkRequest);
      sessionStorage.setItem("GuestInfo", guestBlkChkRequest);
     if (sessionStorage.getItem('CAorderId') &&
        sessionStorage.getItem('CAorderId') !== null && sessionStorage.getItem('secretKey') &&
        sessionStorage.getItem('secretKey') !== null) {
        this.checkSuppLinesCountValidation(this.suppDetailsOfUser);
        this.Redirect('/store/checkout/summary');
    } else {
      this.proceedAddToCart(guestBlkChkRequest);
    }
  }
  }
  removeStorage() {
    if (typeof window !== 'undefined' && sessionStorage.getItem('CAorderId') || sessionStorage.getItem('secretKey')) {
      sessionStorage.removeItem('CAorderId');
      sessionStorage.removeItem('secretKey');
     }
  }

  ngOnDestroy() {
    this.showGuestNoticification = false;
    this.isExistingGuest = null;
  }
}
