import { Component, OnInit, OnDestroy, Renderer2, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BaseComponent } from '../../../base.component';
import { CartService } from '../../../Service/cart.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { CheckoutService } from '../../../Store/checkout/services/checkout.service';
import { AppService } from '../../../Service/app.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { DeviceDetailsStorageService } from "../../../Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.service";
import { Cart } from '../../../Model/cart.model';
import { CartItem } from '../../../Model/cart-item.model';
import { HeaderService } from '../../../Header/header.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { Subscription } from 'rxjs';
import { HomeService } from '../../../Service/home.service';
import { CookieService } from 'ngx-cookie-service';
import { RemarketAnalyticsService } from './../../../Service/remarket-analytics.service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';
import { updateAnalytics } from '../../../shared/utilities/helper.ultility';
import { environment } from 'environments/environment';
import { UserService } from 'app/Service/user.service';
import { finalize } from 'rxjs/operators';
import { AnalyticsService } from '../../../Service/analytic.service';
import { GameEligibilityCheckService, ICustData, IVoucherData } from 'app/Service/game-eligibility-check.service';
import { untilDestroyed } from 'app/shared/services/until-destroyed.service';
import { ModalService } from 'app/shared/components/modal/modal.service';
import { iOmniCampaign, iLifeStyleVoucherDetails } from 'app/shared/models/plan.model';
import * as helper from '../../../shared/utilities/helper.ultility';
import { TnpsPopupComponent, ITNPSSurveyItem } from 'app/shared/components/tnps-popup/tnps-popup.component';
import { IComboDeviceDetails } from '../order-summary/order-summary.model';

@Component({
  selector: 'app-view-order-payment',
  templateUrl: './view-order-payment.component.html',
  styleUrls: ['./view-order-payment.component.css'],
  providers: [CartService, CheckoutService, DeviceDetailsStorageService, HeaderService, RemarketAnalyticsService]
})

export class ViewOrderPaymentComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
  checkoutService: CheckoutService;
  isDealer = false;
  // Changes for CEO-515. Need to know if the purchase is plan only or not.
  isPlanOnly = false;
  cancelPayment = false;
  cancelPaymentData;
  checkoutData: any;
  cart: any;
  TYcart: any;
  userInfo: any;
  GuestInfo: any;
  userPhoneNo: any;
  customerPhoneNo: any;
  billingAddress: any;
  shippingAddress: any;
  deviceitems: any;
  orderinfo: any;
  isNewbie = false;
  newbieMessage = "";
  public preOrderData: any = null;
  appservice: any;
  responseorderid: any;
  currDate: any;
  paymentData: any;
  errorMessage: any;
  isProjectMoon = false;
  itemDetailRequest: any = [];
  parentItemDetailRequest: any = [];
  submitOrderResponse: any;
  globalPartNumber: any;
  prepaidName = "";
  createOrderResponse: any = null;
  outletId: string = environment.outletId;
  serviceNumber = "";
  loginNumber = "";
  oderType: any;
  orderReqPlanBundle: string = null;
  orderReqServiceBundle: string = null;
  public mnpCheck = false;
  public isPreorder = false;
  public addOn = false;
  public addOnLabel = false;
  public campaign100Days = false;
  public campaignMviva = false;
  public campaignMvivaMessage = "";
  public telcoDay = false;
  public telcoDayMessage = "";
  public preorderEnded = false;
  public suppData: any = [];
  mnpFlow = false;
  isMnp = false;
  isCobp = false;
  UserLoginName: any;
  STORE_ID = "estore";
  siebel_OrderNum: any;
  isMnpPlanOnly = false;
  public EligibilityPopupType = { displayType: '', type: '' };
  mnpOrder = false;
  mnpOrderDetails: any;
  cartDetailsSave: any = null;
  redirectToCart = false;
  GuestUserType: any;
  delivery_type_selected:any;
  orderCreateFailure = false;
  orderId = null;
  planImage: any;
  public loading: boolean;
  orderDetails: any;
  MagentoOrderDetailsError = false;
  preorderchk: any;
  freeGiftInfo: any;
  // Analytics
  paymentTypetoSend: any;
  transactionType: any;
  paymentType: any;
  // Analytics
  transactionDetails = {
    transactProductId: "",
    transactProductPrice: "",
    transactProductQty: "",
    transactMethod: "",
    transactResult: "",
    transactOrderId: "",
    transactPrice: "",
    transactVoucher: ""
  };
  personalDetails = {
    displaySalutation: '',
    displayFirstname: '',
    displayLastname: '',
    displayFullname: '',
    displayContactNumber: '',
    displayEmail: '',
    displayUnitnum: ''
  };
  stockCheckData = {
    part_number: '',
    product_type: '',
    store_id: '',
    order_brand: '',
    order_color: '',
    order_model: '',
    pre_order_data: ''
  };
  deliveryType: any;
  GSTInPercentage: any;
  currentUrl: string;
  analyticsItem: any;
  isPreOrder = false;
  isEasyPhone = false;
  isEsim = false;
  simType = "";
  easyPhoneLabel: any;
  deviceUpfront: any;
  planData: any;
  passDetails: any;
  planUpfront: any;
  orderOneTimePay: any;
  deviceMonthlyCharge: any;
  planMonthlyCharge: any;
  EasyPhoneMonthlyCharges: any;
  public sessionInvalid: any;
  cookie_expire_in_days = this.appConstant.COOKIE_EXPIRE;
  ada_cookie_expire_in_days = this.appConstant.ADA_COOKIE_EXPIRE;
  public paymentMethodForAI: any;
  public taxs = [];
  private subscriber: Subscription;
  public npsScriptUrl: string;
  public production: string = environment.production;
  public autobillingFlag = "";
  public hasAutobilling = false;
  public additionalInfo = null;
  isCSAgent = false;
  public isGoldenNumberSelected: any;
  public voucherCode = "";
  public isUserGuest = false;
  public isDeviceOnlyClicked = false;
  public upfrontInstallment = null;
  public isUpfrontInstallment = false;
  youtube_video = "https://www.youtube.com/embed/D72yZghyQvY"; // Celcom life app video ID in youtube.
  isPrepaid = false;
  isPrepaidPack = false;
  isFamilyLine = false;
  errorRedirect = false;
  redirectBackToCart = false;
  familyLineNoUpfront = false;

  showGamification: boolean = false;
  voucherData: IVoucherData[];
  magentoOrderDetailsResp = null;

  gamificationPayload: ICustData;
  gamificationEligible = false;
  campaignOmni: iOmniCampaign;

  supplementaryDataLabel: string;
  lifeStyleVoucherDetails: iLifeStyleVoucherDetails;
  comboDeviceDetails: IComboDeviceDetails;
  deviceComboType: string;

  useEStoreTNPS = true;
  tnpsData;
  @ViewChild('tnpsPopup') tnpsPopup: TnpsPopupComponent;

  constructor(
    private cartService: CartService,
    checkoutService: CheckoutService,
    private _deviceDataService: DeviceDataService,
    private _globalErrorHandler: GlobalErrorHandler,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _service: AppService,
    private _commonUtilService: CommonUtilService,
    private getParamsService: GetParametersService,
    private devicedetailstorageservice: DeviceDetailsStorageService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _homeService: HomeService,
    private _headerService: HeaderService,
    private cookieService: CookieService,
    private _remarketAnalyticsService: RemarketAnalyticsService,
    private _userService: UserService,
    private _analyticsService: AnalyticsService,
    private _gameEligibilityCheckService: GameEligibilityCheckService,
    private _modalService: ModalService
  ) {
    super();
    this.checkoutService = checkoutService;
    this.GSTInPercentage = this.appConstant.GST_IN_PERCENTAGE;
  }

  ngOnInit() {
    this.isDealer = this._userService.isDealer();
    this.orderId = this.getParamsService.getParameterByName('orderId');
    this.errorRedirect = false;
    if (this.production) {
      this.npsScriptUrl = '"https://celcom.satmetrix.com/satmetrix/enterprise/celcom/app/cx/resources/datacollection/celcom_853/popup/celcom_853_30/popupsurvey_celcom_853_30.js?a="';
    } else {
      this.npsScriptUrl = '"https://CELCOM.staging.satmetrix.com/satmetrix/enterprise/celcom/app/cx/resources/datacollection/celcom_853/popup/celcom_853_6931/popupsurvey_celcom_853_6931.js?a="';
    }
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => {
      this.sessionInvalid = data;
      this.cancelPayment = data;
      if(data === false && this.errorRedirect === true) this._router.navigate(["/store/devices"]);
    });
    let itemTotal;
    if (sessionStorage && sessionStorage.getItem("USER_TYPE")) {
      this.UserLoginName = sessionStorage.getItem("USER_TYPE");
    }
    if(!this._userService.isCustomer()) {
      this.sessionInvalid = true;
      this.errorRedirect = true;
    }
    if (sessionStorage && sessionStorage.getItem("OLD_GUEST_USER")) {
      this.GuestUserType = sessionStorage.getItem("OLD_GUEST_USER");
    }
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("AgentInfo")) {
      this.isCSAgent = true;
    }
    if (localStorage && localStorage.getItem("cartPreOrder") === "true") {
      this.isPreOrder = true;
      localStorage.removeItem("cartPreOrder");
    }
    if (localStorage && localStorage.getItem("cancelUpsell")) {
      localStorage.removeItem("cancelUpsell");
    }
    if (localStorage && localStorage.getItem('TYCart')) {
      this.TYcart = JSON.parse(localStorage.getItem('TYCart'));
      if (this.TYcart) {
      this.TYcart.all_items.forEach(element => {
        itemTotal = JSON.parse(element.itemTotal);
      });
    }
    if (this.TYcart) {
        this.campaignOmni = helper.CLMOmniDataSanitizer(this.TYcart?.all_items?.[0]?.campaign_omni);
        this.comboDeviceDetails = this.TYcart?.all_items?.[0]?.selectedProduct?.comboDeviceDetails;
        if (this.TYcart?.all_items?.[0]?.lifestyle_voucher_details) {
          this.lifeStyleVoucherDetails = this.TYcart.all_items[0].lifestyle_voucher_details;
        }
        if (this.TYcart?.all_items?.[0]?.device_combo_type) {
          this.deviceComboType = this.TYcart.all_items[0].device_combo_type;
        }
        if (this.TYcart.autopayment) {
          this.autobillingFlag = this.TYcart.autopayment;
        }
        if (this.TYcart.all_items && this.TYcart.all_items[0]) {
          this.isFamilyLine = this.TYcart.all_items[0].sku === 'family-line';
          this.isPrepaid = this.TYcart.is_prepaid;

          if (
            this.TYcart.is_prepaid &&
            this.TYcart?.all_items?.[0]?.selectedProduct?.orderNumberType === 'SwitchToCelcom'
          ) {
            this.mnpFlow = true;
          }

          this.isPrepaidPack = !!this.TYcart.is_prepaid_pack;
          this.prepaidName = `${this.TYcart.customerOtherInfo.salutation} ${this.TYcart.customerOtherInfo.customer_full_name}`;
          this.isEasyPhone = this.TYcart.all_items[0].is_easyphone;
          this.isEsim = this.TYcart.all_items[0].esim;
          this.simType = this.TYcart.simType;
          this.transactionDetails.transactVoucher = this.TYcart.all_items[0].voucher_code ? this.TYcart.all_items[0].voucher_code : "";
        }
      }
      if (typeof window !== 'undefined' && localStorage && sessionStorage) {
        if (localStorage.getItem('sessionRecovery')) {
          const sessionRecovery = JSON.parse(localStorage.getItem('sessionRecovery'));
          if (sessionRecovery.userToken && !sessionStorage.getItem("UserToken")) {
            sessionStorage.setItem("UserToken", sessionRecovery.userToken);
          }
          if (sessionRecovery.guestInfo && !sessionStorage.getItem("GuestInfo")) {
            sessionStorage.setItem("GuestInfo", sessionRecovery.guestInfo);
          }
          if (sessionRecovery.userType && !sessionStorage.getItem("USER_TYPE")) {
            sessionStorage.setItem("USER_TYPE", sessionRecovery.userType);
            this._deviceDataService.publishGuestName("GUEST");
          }
          if (sessionRecovery.userInfo && !sessionStorage.getItem("UserInfo")) {
            sessionStorage.setItem("UserInfo", sessionRecovery.userInfo);
          }
          if (sessionRecovery.authToken && !sessionStorage.getItem('authtoken')) {
            sessionStorage.setItem("authtoken", sessionRecovery.authToken);
          }
          if (sessionRecovery.oldGusetUser && !sessionStorage.getItem("OLD_GUEST_USER")) {
            sessionStorage.setItem("OLD_GUEST_USER", sessionRecovery.oldGusetUser);
          }
          if (sessionRecovery.RandomPhoneNo && !sessionStorage.getItem("RandomPhoneNo")) {
            sessionStorage.setItem("RandomPhoneNo", sessionRecovery.RandomPhoneNo);
          }
          if (sessionRecovery.transDate && !sessionStorage.getItem("transDate")) {
            sessionStorage.setItem("transDate", sessionRecovery.transDate);
          }
          if (sessionRecovery.transID && !sessionStorage.getItem("transID")) {
            sessionStorage.setItem("transID", sessionRecovery.transID);
          }
          if (sessionRecovery.personalForm && !sessionStorage.getItem('personalForm')) {
            sessionStorage.setItem("personalForm", sessionRecovery.personalForm);
          }
          localStorage.removeItem('sessionRecovery');
        }
      }
    }
    if (localStorage.getItem("AutoBillingFlag")) {
      this.autobillingFlag = JSON.parse(localStorage.getItem("AutoBillingFlag"));
    }
    if (this.getParamsService.getParameterByName('magfailure') || this.getParamsService.getParameterByName('magfailure') === 'true') {
      this.orderCreateFailure = true;
    } else {
      this.orderCreateFailure = false;
    }
    if (itemTotal === 0) {
      let transDate;
      if (localStorage && localStorage.getItem('MNP-FLOW') === 'YES' && localStorage.getItem('MNP-ORDER-ID')) {
        this.mnpFlow = true;
      }
      if (localStorage && localStorage.getItem("transDate")) {
        transDate = localStorage.getItem("transDate");
      }
      this.paymentData = {
        orderId: this.getParamsService.getParameterByName('orderId'),
        transDate: transDate,
        returnCode: this.getParamsService.getParameterByName('returnCode'),
        reasonCode: this.getParamsService.getParameterByName('reasonCode') || "1000",
        reasonDesc: this.getParamsService.getParameterByName('reasonDesc') || '',
        totalAmount: 0,
        referId: null,
        orderStatus: this.getParamsService.getParameterByName('orderstatus') || false
      };
    } else {
      let dateTrans;
      if (localStorage && localStorage.getItem("transDate")) {
        dateTrans = localStorage.getItem("transDate");
      }
      this.paymentData = {
        orderId: this.getParamsService.getParameterByName('orderId'),
        transDate: dateTrans,
        returnCode: this.getParamsService.getParameterByName('returnCode'),
        reasonCode: this.getParamsService.getParameterByName('reasonCode'),
        reasonDesc: this.getParamsService.getParameterByName('reasonDesc'),
        totalAmount: this.getParamsService.getParameterByName('totalAmount') || "0",
        referId: this.getParamsService.getParameterByName('referId') || null,
        orderStatus: this.getParamsService.getParameterByName('orderstatus') || false
      };
    }
    if (this.paymentData.transDate) {
      this.takeDateFromNow();
    }
    if (this.isEasyPhone && this.autobillingFlag === 'N') {
      this.paymentType = 'Credit Card';
    }
    this.init();
    localStorage.removeItem("suppLinesAddedByTheUser");
    localStorage.removeItem('selectionAfterLogin');
  }
  ngAfterViewInit() {
    this.currentUrl = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, this.currentUrl, item);
      this.analyticsItem = item;
    });
    this._estoreAnalyticsService.SetCategoryTwoForAdobeDataLayer(this._renderer);
    try {
      this._analyticsService.productId = this.TYcart?.items[0]?.sku;
      this._analyticsService.productName = this.TYcart?.items[0]?.name;
      this._analyticsService.productPrice = this.TYcart?.grossTotal;
      this._analyticsService.customerType = sessionStorage.getItem("OLD_GUEST_USER") === "YES" ? "existing" : "new";
      this._analyticsService.customerCategory = sessionStorage.getItem('USER_TYPE')?.toLowerCase() == 'enterprise' ? 'enterprise' : 'mass';
      this._analyticsService.productType = localStorage.getItem("analytics-product_type");
      this._analyticsService.itemType = localStorage.getItem("analytics-item_type");
    } catch (_error) {

    }

    // check if the customer is eligible for gamification
    this.gamificationEligibilityCheck();

    this._modalService.onClosedModal.subscribe(popup => {
      if(popup === "gamification-popup") {
        this.showGamification = false;
        // Set delay to allow voucher page get loaded, on closing gamification popup from Thank You page
        setTimeout(() => {
          if (!this.useEStoreTNPS) {
            this.createtnpsSurveyInfo(this.userInfo, this.magentoOrderDetailsResp);
          }
          this.loadOrderSuccessData();
        }, 1500);
      }
    });
  }

  gamificationEligibilityCheck() {
    let contactNumber = this.personalDetails?.displayContactNumber,
        nric = null;
    
    if (sessionStorage.getItem('UserInfo')) {
      let userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
          nric = userInfo.outputCPResp?.customerID;
    }

    this.gamificationPayload = {
      "msisdn": contactNumber ?? '',
      "nric": nric ?? '',
      "orderId": '',                    // siebel order id
      "magentoOrderId": this.orderId ?? '',   // order id
      "promoType": "internal",
      "played": false
    };

    this._gameEligibilityCheckService.checkEligibility(this.gamificationPayload)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(response => {
        if (response.status === true) {
          // this.showGamification = true;
          this.gamificationEligible = true;
          this.voucherData = response.voucher_data;
        } else {
          this.resetGamification();
        }
      }, err => {
        this.resetGamification();
      });
  }

  resetGamification() {
    this.showGamification = false;
    this.voucherData = [];
  }

  init() {
    if (typeof window !== 'undefined' && localStorage) {
      // if ((!this.isCSAgent) || (this.isCSAgent && this.paymentData.totalAmount === 0 && !this.isEasyPhone)) {
      //   this.captureFinanceInfo();
      // }
      this.TYcart = JSON.parse(localStorage.getItem('TYCart'));
      // let cartTotal = 0;
      const cartItemArray = [];
      if (this.TYcart) {
      this.TYcart.all_items.forEach(element => {
        const cartItem = new CartItem();
        cartItem.item_id = element.item_id;
        cartItem.itemTotal = element.itemTotal;
        cartItem.price = element.price;
        cartItem.quantity = element.quantity;
        cartItem.selectedProduct = element.selectedProduct;
        cartItem.sku = element.sku;
        cartItem.skuBundle = element.sku_bundle;
        cartItem.billType = element.bill_type;
        cartItem.deviceUpfrontPenalty = Number(element.device_upfront_penalty);
        if (element.is_easyphone) {
        cartItem.is_easyphone = element.is_easyphone;
        }
        cartItemArray.push(cartItem);
      });
    }
      this.cart = new Cart();
      this.cart.items = cartItemArray;
      if (this.cart.items[0] && this.cart.items[0].selectedProduct && this.cart.items[0].selectedProduct.selectedPlanDetails) {
        this.isGoldenNumberSelected = this.cart.items[0].selectedProduct.selectedPlanDetails.is_golden_number;
      }
      if (this.TYcart) {
      this.cart.grossTotal = this.TYcart.grossTotal;
      this.cart.rebateAmount = this.TYcart.all_items[0].rebate_amount;
      }
      this.cart.setTotalPrices(this.cart);
      if (cartItemArray[0]?.selectedProduct && cartItemArray[0]?.selectedProduct.selectedPlanDetails
          && cartItemArray[0]?.selectedProduct.selectedPlanDetails.additional_information) {
        this.additionalInfo = cartItemArray[0]?.selectedProduct.selectedPlanDetails.additional_information;
      } else {
        this.additionalInfo = null;
      }
      if (cartItemArray && cartItemArray[0] && cartItemArray[0].is_easyphone && cartItemArray[0].is_easyphone === true) {
        this.isEasyPhone = true;
      }
      if (sessionStorage.getItem('UserInfo')) {
        this.userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
        const contactNumber = localStorage.getItem("MyMsIsdn") ||
          (this.userInfo && this.userInfo.outputCPResp.contactMobileNum) || (this.userInfo && this.userInfo.outputCPResp.newGuestPhNo);
        this.personalDetails = {
          displaySalutation: this.salutaion(),
          displayFirstname: this.userInfo.outputCPResp.contactFirstName,
          displayLastname: this.userInfo.outputCPResp.contactLastName,
          displayFullname: this.userInfo.outputCPResp.name,
          displayUnitnum: this.userInfo.outputCPResp.unit,
          displayContactNumber: contactNumber,
          displayEmail: this.userInfo.outputCPResp.contactEmail
        };
      }
      if (localStorage && localStorage.getItem('MyMsIsdn')) {
        this.userPhoneNo = JSON.parse(localStorage.getItem('MyMsIsdn'));
      }
      if (sessionStorage && sessionStorage.getItem('GuestInfo')) {
        this.GuestInfo = JSON.parse(sessionStorage.getItem('GuestInfo'));
        this.userInfo = JSON.parse(sessionStorage.getItem('GuestInfo'));
      }
    }
    this.DisplayShippingAndBillingAddress();
  }

  showEStoreTNPS(tnpsuserInfo, magorderdetailResponse) {
    const modal_id = this.tnpsPopup?.modal_id;
    this._modalService.open(modal_id)?.subscribe((result) => {
      if (!result) {
        this.useEStoreTNPS = false;
        this.createtnpsSurveyInfo(tnpsuserInfo, magorderdetailResponse);
      }
      if (this.gamificationEligible) {
        this.showGamification = true;
      }
    });
  }

  /**
   * @param magorderdetailResponse For access order related infors
   */
  createtnpsSurveyInfo(tnpsuserInfo, magorderdetailResponse) {
    if (this.useEStoreTNPS) {
      // Prevent showing tnps if cs agent or dealer with payment more than 0
      if (this.isCSAgent || this.isDealer) {
        if (+this.cart.grossTotal > 0 && magorderdetailResponse.order_data.payment_status === 'PENDING') {
          return false;
        }
      }
      this.showEStoreTNPS(tnpsuserInfo, magorderdetailResponse);
      const salutation = this.TYcart?.customerOtherInfo?.salutation || 'MR';
      const first_name = this.TYcart?.customerOtherInfo?.firstname;
      const last_name = this.TYcart?.customerOtherInfo?.lastname;
      let customer_name = `${salutation} ${first_name || ''} ${last_name || ''}`.trim();
      if (!first_name && !last_name) {
        customer_name = `${salutation} ${magorderdetailResponse?.order_data?.customer_info?.full_name || ''}`;
      }
      this.tnpsData = {
        order_id: `${magorderdetailResponse?.order_data?.order_number}`,
        customer_name,
        customer_email: this.TYcart?.customer?.email,
      };
      return;
    }
    (<any>window).surveyID = 'CELCOM_853';
    const userInfo = tnpsuserInfo;
    if (this.UserLoginName === 'GUEST') {
      userInfo.outputCPResp.contactSalutation = this.TYcart.customerOtherInfo.salutation;
      userInfo.outputCPResp.contactFirstName = this.TYcart.customer.firstname;
      userInfo.outputCPResp.contactLastName = this.TYcart.customer.lastname;
      userInfo.outputCPResp.contactEmail = this.TYcart.customer.email;
      userInfo.outputCPResp.gender = this.TYcart.customerOtherInfo.gender;
      userInfo.outputCPResp.state = this.TYcart.billing_address.region;
      userInfo.outputCPResp.contactMobileNum = this.TYcart.customerOtherInfo.mobile_number;
    }
    const exctractedDOB = userInfo.outputCPResp.dateOfBirth.split('_')[0];
    (<any>window).salutation = userInfo.outputCPResp.contactSalutation;
    (<any>window).firstName = userInfo.outputCPResp.contactFirstName;
    (<any>window).lastName = userInfo.outputCPResp.contactLastName;
    (<any>window).customerEmailAddress = userInfo.outputCPResp.contactEmail;
    (<any>window).contactID = userInfo.outputCPResp.customerID;
    if(userInfo.outputCPResp?.gender===false && (userInfo.outputCPResp?.contactSalutation==="Mr"||userInfo.outputCPResp?.contactSalutation==="Dr")) {
      (<any>window).gender = "Male";
    } else if(userInfo.outputCPResp?.gender===false && (userInfo.outputCPResp?.contactSalutation==="Ms"||userInfo.outputCPResp?.contactSalutation==="Mrs")) {
      (<any>window).gender = "Female";
    } else {
      (<any>window).gender = userInfo.outputCPResp.gender;
    }
    (<any>window).state = userInfo.outputCPResp.state;
    if (exctractedDOB) {
    (<any>window).dateOfBirth = exctractedDOB.slice(6, 8) + '-' + exctractedDOB.slice(4, 6) + '-' + exctractedDOB.slice(0, 4);
    }
    if (magorderdetailResponse && magorderdetailResponse.order_data) {
    (<any>window).transactionDate = new Date(magorderdetailResponse.order_data.purchase_date).toLocaleString('es').split('/').map((a, idx) => idx <= 1 ? (a + '').padStart(2, '0') : a).join('-');
    (<any>window).transactionID = magorderdetailResponse.order_data.transaction_id;
    (<any>window).orderType = magorderdetailResponse.order_data.order_type;
    }
    (<any>window).paymentMethod = this.paymentType;
    if (magorderdetailResponse && magorderdetailResponse.order_data) {
    (<any>window).deviceType = magorderdetailResponse.order_data.items[0].name;
    (<any>window).productType = magorderdetailResponse.order_data.items[0].product_type;
    }
    this.addTNPSSurveyScriptToHead();
    (<any>window).onbeforeunload = function() {
      const widgetShownCookie = (<any>window).widgetShownCookie;
      if (typeof widgetShownCookie !== 'undefined' && widgetShownCookie !== null) {
        document.cookie = widgetShownCookie + '=N;path=/';
      }
    };

  }
  OnContinueEligibilityCheck(data: any) {
    this.isMnpPlanOnly = false;
  }

  public salutaion() {
    if (localStorage && localStorage.getItem("MyMsIsdn") && this.userInfo && this.userInfo.outputCPResp
      && this.userInfo.outputCPResp.contactSalutation && this.userInfo.outputCPResp.contactSalutation !== ''
      && this.userInfo.outputCPResp.contactSalutation !== null) {
      return this.personalDetails.displaySalutation = this.userInfo.outputCPResp.contactSalutation;
    } else if (sessionStorage && ['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE")) && this.checkoutData
      && this.checkoutData.customerOtherInfo && this.checkoutData.customerOtherInfo.salutation) {
      return this.personalDetails.displaySalutation = this.checkoutData.customerOtherInfo.salutation;
    } else if (sessionStorage && sessionStorage.getItem('personalForm')) {
      const personalForm = JSON.parse(sessionStorage.getItem('personalForm'));
      return this.personalDetails.displaySalutation = personalForm.salutation;
    }
  }

  private DisplayShippingAndBillingAddress() {
    this.loading = true;
    let apiUrl = ApiConstant.CARTMINE_API;
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem('CAorderId') &&
        sessionStorage.getItem('CAorderId') !== null && sessionStorage.getItem('secretKey') &&
        sessionStorage.getItem('secretKey') !== null) {
        const orderId = sessionStorage.getItem('CAorderId');
        const orderSecret = sessionStorage.getItem('secretKey');
         apiUrl = "/rest/V1/cartmine?order_id=" + orderId + "&order_secret=" + orderSecret;
      }
    this.checkoutService.Find(apiUrl.trim()).subscribe(
      (response: any) => {
        this.loading = false;
        this.checkoutData = response[0];
        this.deviceitems = response.items;
        this.doLogicCheck();
      }, (error: any) => {
        this.redirectToCart = true;
        this.loading = false;
        this.orderCreateFailure = true;
        this.transactionDetails.transactResult = "failed";
        this._estoreAnalyticsService.SetTransactionDetailsOfUser(this.currentUrl, this.analyticsItem,
          this.transactionDetails, this._renderer);
      });
  }

  doLogicCheck() {
    if (this.paymentData.returnCode === '1') {
      this.clearPrevOrderInfo(false);
        if (localStorage.getItem("PLAN_TRANSACTION_ID")) {
          const transaction_id = localStorage.getItem("PLAN_TRANSACTION_ID");
          this.oderType = 'plan';
          this.getTimeTransaction(transaction_id);
        } else if (this.isCSAgent) {
          this.oderType = 'cs_agent';
          this.orderId = this.getParamsService.getParameterByName('orderId');
          this.getTimeTransaction(this.orderId);
        } else if (localStorage.getItem("OrderFailure")) {
          localStorage.removeItem("numberReservationId");
          this.transactionDetails.transactResult = "failed";
          this._estoreAnalyticsService.SetTransactionDetailsOfUser(this.currentUrl, this.analyticsItem,
            this.transactionDetails, this._renderer);
          this.orderCreateFailure = true;
        } else {
          this.createOrder();
        }
        if (localStorage && localStorage.getItem("magentoID")) {
          this.orderId = localStorage.getItem("magentoID");
          localStorage.removeItem("magentoID");
          sessionStorage.removeItem('refid');
        }
        // Prevent enterprise user for ordering other plans or devices
        const newGuest = (sessionStorage.getItem("OLD_GUEST_USER") || false) == "NO";
        const isEnterprise = sessionStorage.getItem("USER_TYPE") == 'ENTERPRISE';
        const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
        if (newGuest) {
          sessionStorage.setItem("OLD_GUEST_USER", "YES");
        }
        if (isEnterprise) {
          if (userInfo && userInfo['outputCPResp']) {
            userInfo['outputCPResp'] = {
              ...userInfo['outputCPResp'],
              enterpriseOrderPlaced: true,
            }
            sessionStorage.setItem("UserInfo", JSON.stringify(userInfo));
          }
        }
    } else if (this.paymentData.returnCode === '4' &&
      this.paymentData.reasonCode === '50006' &&
      this.paymentData.reasonDesc === "Payment cancelled by buyer") {
        this.redirectBackToCart = true;
      // this.backToCart();
      this.clearPrevOrderInfo(false);
      this.redirectToCart = false;
    } else if ((this.paymentData.returnCode === '4' &&
      this.paymentData.reasonCode === '57057' &&
      this.paymentData.reasonDesc === "Buyer choose cancel at Login Page")) {
      // this.backToCart();
      this.clearPrevOrderInfo(false);
      this.redirectToCart = true;
    } else if (this.paymentData.returnCode === '4' &&
      this.paymentData.reasonCode === '47015' &&
      this.paymentData.reasonDesc === "Insufficient Funds") {
      // this.backToCart();
      this.clearPrevOrderInfo(true);
      this.redirectToCart = true;
    } else if (this.paymentData.returnCode === '5') {
      this.backToCart();
      this.clearPrevOrderInfo(false);
      this.redirectToCart = true;
    } else {
      this.errorMessage = 'Payment not successful';
    }
    if (this.errorMessage) {
      this._globalErrorHandler.errorObjectConvert(this.errorMessage);
    }
  }
  /* Remove local storage data.
  * @param removeMagId = true, remove magento order id.
  */
  clearPrevOrderInfo(removeMagId) {
    // Bundle - Remove local storage data if no item in the cart.
    if (this.checkoutData && this.checkoutData.message === "No items in cart" && this.checkoutData.status === false
      && localStorage && localStorage.getItem("selectedProductDetails") && localStorage.getItem("magentoID")) {
      localStorage.removeItem("selectedProductDetails");
      if (removeMagId === true) {
        localStorage.removeItem("magentoID");
      }
    }
    // Plan only - Remove local storage data if no item in the cart.
    if (this.checkoutData && this.checkoutData.message === "No items in cart" && this.checkoutData.status === false
      && localStorage && localStorage.getItem("SelectedPlanDetails") && localStorage.getItem("magentoID")) {
      localStorage.removeItem("SelectedPlanDetails");
      if (removeMagId === true) {
        localStorage.removeItem("magentoID");
      }
    }
    localStorage.removeItem("numberReservationId");
  }
  public backToCart() {
    localStorage.removeItem("numberReservationId");
    if (localStorage && localStorage.getItem("magentoID")) {
      this.orderId = localStorage.getItem("magentoID");
      localStorage.removeItem("magentoID");
    }
    const url = "/rest/V1/cancelOrderRestoreCart/" + this.orderId;
    this._service.postRestoreData(url).subscribe(
      (response: any) => {
        if (response[0].status === true) {
          if (this.paymentData.returnCode === '4') {
            this.Redirect("/store/cart");
          }
        }
      },
      (error: any) => {
        this.loading = false;
      });
  }

  takeDateFromNow() {
    if (typeof window !== 'undefined' && sessionStorage) {
      if (sessionStorage.getItem("transDate") && sessionStorage.getItem("transID")
        && sessionStorage.getItem("transID") === this.paymentData.orderId) {
        this.currDate = sessionStorage.getItem("transDate");
      } else {
        this.currDate = Date.now();
        sessionStorage.setItem("transDate", this.currDate);
        sessionStorage.setItem("transID", this.paymentData.orderId);
      }
    }
  }

  // Create order...
  createOrder() {
    this.loading = true;
    if (this.TYcart && this.TYcart.all_items && this.TYcart.all_items.length) {
      this.TYcart.all_items.forEach(element => {
        // Number has not chosen in that case use MSISDN Number...
        if (typeof window !== 'undefined' && localStorage) {
          if (this.serviceNumber === "") {
            this.serviceNumber = localStorage.getItem("MyMsIsdn");
            this.loginNumber = localStorage.getItem("MyMsIsdn");
          }
          if (this.loginNumber === "") {
            this.loginNumber = this.serviceNumber;
          }
        }
        // Device only.
        if (element && element.selectedProduct && element.selectedProduct.orderDevice && !element.selectedProduct.orderPlan) {
          this.oderType = "device";
          this.globalPartNumber = element.selectedProduct.orderReqPartNumber;
          this.createPlanOrDevicePlusPlanOrder();
        }

        // Device + Plan.
        if (element.selectedProduct.orderDevice && element.selectedProduct.orderPlan) {
          this.oderType = "device_plan";
          this.globalPartNumber = element.selectedProduct.orderReqPartNumber;
          if (element.selectedProduct.orderPhoneNo !== undefined) {
            this.serviceNumber = element.selectedProduct.orderPhoneNo;
          }
          if (element.is_broadband) {
            this.hwOrderCreation();
          } else if (localStorage && localStorage.getItem("COBP_FLOW") || this.serviceNumber === localStorage.getItem("MyMsIsdn")) {
            this.createCobpBundleOrder();
          } else {
            this.createPlanOrDevicePlusPlanOrder();
          }
        }

        // Only Plan.
        if (!element.selectedProduct.orderDevice && element.selectedProduct.orderPlan) {
          this.oderType = "plan";
          if (element.selectedProduct.orderPhoneNo !== undefined) {
            this.serviceNumber = element.selectedProduct.orderPhoneNo;
          }
          this.serviceNumber = this.serviceNumber ? this.serviceNumber : localStorage.getItem("MyMsIsdn");
          if (localStorage && localStorage.getItem("COBP_FLOW") || this.serviceNumber === localStorage.getItem("MyMsIsdn")) {
            this.createCobpPlanOrder();
          } else {
            this.createPlanOrDevicePlusPlanOrder();
          }
        }
      });
    }
  }

  createCobpPlanOrder() {
    if (localStorage && localStorage.getItem("COBP_FLOW")) {
      localStorage.removeItem("COBP_FLOW");
    }
    if (this.paymentData && this.paymentData.orderId && this.paymentData.orderStatus) {
      localStorage.setItem("PLAN_TRANSACTION_ID", this.paymentData.orderId);
      this.getTimeTransaction(this.paymentData.orderId);
    } else {
      this.errorFunction();
    }
  }

  createCobpBundleOrder() {
    if (localStorage && localStorage.getItem("COBP_FLOW")) {
      localStorage.removeItem("COBP_FLOW");
    }
    if (this.paymentData && this.paymentData.orderStatus && this.paymentData.orderId) {
      const transID = this.paymentData.orderId;
      localStorage.setItem("PLAN_TRANSACTION_ID", transID);
      this.getTimeTransaction(this.paymentData.orderId);
    } else {
      this.errorFunction();
    }
  }

  public postUserData() {
    this.loading = false;
    if (this.paymentData && this.paymentData.orderId && this.paymentData.orderStatus) {
      this._deviceDataService.publishOrderNO(this.paymentData.orderId);
      if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem("PLAN_TRANSACTION_ID", this.paymentData.orderId);
      }
      this.getTimeTransaction(this.paymentData.orderId);
      if (typeof window !== "undefined" && localStorage && sessionStorage &&
        sessionStorage.getItem("OLD_GUEST_USER") && sessionStorage.getItem("OLD_GUEST_USER") === "NO") {
        localStorage.setItem("NEW_GUEST_USER", "YES");
      }
      if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
        localStorage.removeItem("numberReservationId");
      }
      localStorage.removeItem("suppLinesAddedByTheUser");
    } else {
      this.errorFunction();
    }
  }
  public hwOrderCreation() {
    this.postUserData();
  }
  public errorFunction() {
    localStorage.removeItem("numberReservationId");
    localStorage.removeItem("AutoBillingFlag");
    localStorage.removeItem("suppLinesAddedByTheUser");
    this.loading = false;
    this.orderCreateFailure = true;
    this.transactionDetails.transactResult = "failed";
    this._estoreAnalyticsService.SetTransactionDetailsOfUser(this.currentUrl, this.analyticsItem,
      this.transactionDetails, this._renderer);
  }

  public createPlanOrDevicePlusPlanOrder() {
    // Plan only magento request.
    if (this.oderType === "plan" || this.oderType === "device_plan" || this.oderType === "device") {
      this.postUserData();

      if (localStorage && localStorage.getItem("GUEST_CART_ID")) {
        localStorage.removeItem("GUEST_CART_ID");
      }
      if (localStorage && localStorage.getItem("MNP-PRE-SELECT")) {
        localStorage.removeItem("MNP-PRE-SELECT");
      }
      if (localStorage && localStorage.getItem("MNP-CUSTOMER")) {
        localStorage.removeItem("MNP-CUSTOMER");
      }
      if (localStorage && localStorage.getItem("MNP-EDIT")) {
        localStorage.removeItem("MNP-EDIT");
      }
      if (localStorage && localStorage.getItem("MNP-FLOW")) {
        localStorage.removeItem("MNP-FLOW");
      }
    }
  }

  // Clearing cart details.
  removeCartDetails() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('TYCart');
      localStorage.removeItem('MegentoOrderId');
      localStorage.removeItem('chosenPlan');
      localStorage.removeItem('SelectedPlanName');
      localStorage.removeItem('SelectedPlanDetails');
      localStorage.removeItem('SelectedPlan');
      localStorage.removeItem('PlanOnlyObjectForCart');
      localStorage.removeItem('PSku');
      localStorage.removeItem('SelectedMonthlyPay');
      localStorage.removeItem('orderDetails');
      localStorage.removeItem('selectedColor');
      localStorage.removeItem('selectedStorage');
      localStorage.removeItem('DeviceSku');
      localStorage.removeItem('MNP-FLOW');
      localStorage.removeItem('MNP-ORDER-ID');
      localStorage.removeItem('SIEBEL_ORDER_ID');
      localStorage.removeItem('MNP-CUSTOMER');
      localStorage.removeItem('MNP-EDIT');
      localStorage.removeItem("PLAN_TRANSACTION_ID");
      localStorage.removeItem("OrderFailure");
      localStorage.removeItem("suppLinesAddedByTheUser");
      localStorage.removeItem("MNP-PRE-SELECT");
      localStorage.removeItem("transDate");
      localStorage.removeItem("ReservedNumberList");
      localStorage.removeItem("redirection-flow");
      localStorage.removeItem("Edit-flow");
      localStorage.removeItem("AutoBillingFlag");
      localStorage.removeItem('selectionAfterLogin');
    }
  }
  RoundingOff(value: number): string {
    return this._commonUtilService.RoundingOff2String(value);
  }
  RoundingOff2Number(value: number): number {
    return this._commonUtilService.RoundingOff2Number(value);
  }
  private Redirect(url: string) {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }
  // Remove cart details when navigate ro different page.
  ngOnDestroy() {
    // this.removeCartDetails();
    // this.UnregisterTnpsReference();
  }

/**
 * Adding TNPS Survey Script to html head
 */
public addTNPSSurveyScriptToHead() {
  const adaObj = [];
  adaObj.push({
    type: 'header_script',
    value: '<script type="text/javascript"> var npxUrl = ' + this.npsScriptUrl + ' + new Date().getTime();var script = document.createElement("script");script.id="tnps-script"; script.src = npxUrl;document.getElementsByTagName("head")[0].appendChild(script); </script>'
  });
  this._homeService.ManageConfigurableScripts(adaObj);
}

  /**
  * Formation of affiliate script and attaching to body.
  */
  public addAffiliateScriptToHead(magorderdetailResponse) {
    // Ada pixel.
    const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
    if (!adaRemainingDays['isSubmitted']) {
      // ADA facebook pixel.
      if (adaRemainingDays.name === "ADAFB") {
        const adaObj = [];
        adaObj.push({
          type: 'header_script_block',
          value: `!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
           fbq('init', '222287968473810');
           fbq('track', 'Purchase', {value: '` + magorderdetailResponse.order_data.grand_total + `', currency: 'MYR'});`
        });
        adaObj.push({
          type: 'header_noscript_block',
          value: `<img height="1" width="1" src="https://www.facebook.com/tr?id=222287968473810&ev=PageView&noscript=1"/>`
        });
        this._homeService.ManageConfigurableScripts(adaObj);
      }
      // ADA google pixel.
      if (adaRemainingDays.name === "ADAGG") {
        const adaObj = [];
        adaObj.push({
          type: 'header_script_block',
          value: `gtag('event', 'conversion', {'send_to': 'AW-779416403/GQdwCInm_o0BENPm0_MC'});`
        });
        this._homeService.ManageConfigurableScripts(adaObj);
      }
      // Delete ADA Pixel cookie on successfull order.
      this.cookieService.delete('adaStartDate', '/');
      this.cookieService.delete('adaRemainingDays', '/');
    }
  }
  /**
   * Formation of affiliate script and attaching to body.
   * @param magorderdetailResponse
   * @param paymentMethod
   */
  public addAffiliateScriptToBody(magorderdetailResponse, paymentMethod) {
    const affiliateObj = {
      customerType: magorderdetailResponse.order_data.order_type, // MNP, COBP, New Reg.
    };
    const orderItem = JSON.parse(this.cookieService.get('orderItem'));
    if (!orderItem['isSubmitted']) {
      const iaObj = [];
      iaObj.push({
        type: 'affiliate_script',
        // value: "<script> iaq && iaq('OrderDetail', { currencyCode: 'MYR', orderNumber: '" + this.transactionDetails.transactOrderId + "', " +
        //   " paymentMethod: '" + paymentMethod + "', customerType: '" + affiliateObj.customerType + "'})</script>"
        value: `
        <script> 
          try {
            iaq('OrderDetail', {
              currencyCode: 'MYR',
              orderNumber: '${this.transactionDetails.transactOrderId}',
              paymentMethod: '${paymentMethod}',
              customerType: '${affiliateObj.customerType}'
            });
          } catch (_err) {
            
          }
        </script>`,
      });
      // If Order Type Bundle --> Amount is Zero.
      // If Order Type Plan --> Amount is Plan Amount.
      // If Order Type Device --> Amount is Device Amount.

      // Need to do Amount, Plan Name, Device Name.

      if (orderItem.planName) {
        const planAmount = magorderdetailResponse.order_data.items[0].is_bundle ? 0 : magorderdetailResponse.order_data.grand_total;
        iaObj.push({
          type: 'affiliate_script',
          // value: "<script> iaq && iaq('OrderItem', { quantity : '1', amount: '" + planAmount + "', " +
          //   " categoryName: 'Postpaid Plan', productName: '" + orderItem['planName'] + "'})</script>"
          value: `
          <script> 
            try {
              iaq('OrderItem', {
                quantity : '1',
                amount: '${planAmount}',
                categoryName: 'Postpaid Plan',
                productName: '${orderItem['planName']}'
              });
            } catch (_err) {
              
            }
          </script>`,
        });
      }
      if (orderItem.deviceName) {
        const deviceAmount = magorderdetailResponse.order_data.grand_total;
        iaObj.push({
          type: 'affiliate_script',
          // value: "<script> iaq && iaq('OrderItem', { quantity : '1', amount: '" + deviceAmount + "', " +
          //   " categoryName: 'Device', productName: '" + orderItem['deviceName'] + "'})</script>"
          value: `
          <script> 
            try {
              iaq('OrderItem', {
                quantity : '1',
                amount: '${deviceAmount}',
                categoryName: 'Device',
                productName: '${orderItem['deviceName']}'
              });
            } catch (_err) {
              
            }
          </script>`,
        });
      }

      this._homeService.ManageConfigurableScripts(iaObj);
      orderItem['isSubmitted'] = true;
      let iaExpireDays = this.cookie_expire_in_days;
      const iaStartDateString = this.cookieService.get('iaStartDate');
      const iaStratDate = new Date(iaStartDateString);
      const completedDays = iaStratDate.getDate() - new Date().getDate();
      iaExpireDays = iaExpireDays + completedDays;
      this.cookieService.set('orderItem', JSON.stringify(orderItem), iaExpireDays, '/');
    }
  }

  public getTimeTransaction(transactionID: string) {
    const apiUrl: string = "/rest/V1/magorderdetail/" + transactionID;
    this._service.getEstoreUserData(apiUrl).subscribe(
      (response: any) => {
        this.loading = false;
        if (response[0].status) {
          // Assuming Plan only as true if Virtual product. Changes for CEO-515.
          this.isPlanOnly = (response[0].order_data.is_virtual === "1");
          if (response[0].order_data.purchase_date) {
          this.currDate = response[0].order_data.purchase_date;
          }
          if (response[0] && response[0].order_data && response[0].order_data.upfront_installment) {
            this.upfrontInstallment = response[0].order_data.upfront_installment;
          }
          if(this.upfrontInstallment) {
            this.isUpfrontInstallment = true;
          }
          this.billingAddress = response[0].order_data.address.billing_address;
          this.shippingAddress = response[0].order_data.address.shipping_address;
          this.orderDetails = response[0].order_data.items[0];
          this.taxs = response[0].order_data.tax.items;
          this.isPreOrder = response[0].order_data.pre_order;
          if (response[0].order_data.is_mnp !== undefined) {
            this.isMnp = response[0].order_data.is_mnp;
          }
          if (response[0].order_data.is_cobp !== undefined) {
            this.isCobp = response[0].order_data.is_cobp;
          }
          this.familyLineNoUpfront = response?.[0]?.order_data?.family_line_no_upfront;
          this.addOn = response[0].order_data.has_add_ons;
          this.addOnLabel = response[0].order_data.add_on_label;
          const delivery_type = response[0].order_data.delivery_type;
          this.delivery_type_selected = response[0].order_data.delivery_type;
          if (delivery_type && typeof delivery_type.value !== 'undefined') {
            if (delivery_type.value === 1) {
              this.deliveryType = 'Midnight Delivery';
            } else if (delivery_type.value === 0) {
              this.deliveryType = 'Standard Delivery';
            }
          }
          if (response[0].order_data.pre_order) {
            this.isPreorder = response[0].order_data.pre_order;
          }
          if (response[0].order_data.has_auto_billing === "1" || response[0].order_data.has_auto_billing === 1) {
            this.hasAutobilling = true;
          }
          if (response[0].order_data.free_gift_data) {
            this.freeGiftInfo = response[0].order_data.free_gift_data;
          }
          if (response[0].order_data.items[0].is_easyphone) {
            this.isEasyPhone = response[0].order_data.items[0].is_easyphone;
            this.easyPhoneLabel = response[0].order_data.items[0].easyphone_label;
            let contractPeriod = this.easyPhoneLabel.substring(this.easyPhoneLabel.indexOf('('),this.easyPhoneLabel.indexOf(')')+1);

            if (this.easyPhoneLabel.indexOf('Rent') > -1) {
              // this.easyPhoneLabel = "EasyPhone™ Rent (24 months contract)";
              this.easyPhoneLabel = "EasyPhone™ Rent "+contractPeriod;

            }
            if (this.easyPhoneLabel.indexOf('Own') > -1) {
              // this.easyPhoneLabel = "EasyPhone™ Own (24 months contract)";
              this.easyPhoneLabel = "EasyPhone™ Own "+contractPeriod;

            }
          }
          this.isEsim = response[0].order_data.items[0].esim;
          this.simType = response[0].order_data.simType;
          if (response[0].order_data.campaign100_days) {
            this.campaign100Days = response[0].order_data.campaign100_days;
          }
          if (response[0].order_data.is_newbie) {
            this.isNewbie = response[0].order_data.is_newbie;
            if (response[0].order_data.newbie_message) {
              this.newbieMessage = response[0].order_data.newbie_message;
            }
          }
          if (response[0].order_data.is_campaign_mviva) {
            this.campaignMviva = response[0].order_data.is_campaign_mviva;
            if (response[0].order_data.campaign_mviva_message) {
              this.campaignMvivaMessage = response[0].order_data.campaign_mviva_message;
            }
          }
          if (response[0].order_data.items[0].plan_data && response[0].order_data.items[0].plan_data.pass_details
             && response[0].order_data.items[0].plan_data.pass_details.name) {
              this.isProjectMoon = true;
          }
          if (response[0].order_data.items[0].plan_data.telco_day && response[0].order_data.items[0].plan_data.telco_day.status) {
            this.telcoDay = response[0].order_data.items[0].plan_data.telco_day.status;
            if (response[0].order_data.items[0].plan_data.telco_day.message) {
              this.telcoDayMessage = response[0].order_data.items[0].plan_data.telco_day.message;
            }
          }
          if (this.isEasyPhone) {
            this.deviceUpfront = response[0].order_data.items[0].device_data.order_device_subt;
            this.planUpfront = response[0].order_data.items[0].plan_data.order_plan_subt;
            this.orderOneTimePay = response[0].order_data.items[0].plan_data.orderOneTimePay;
            this.deviceMonthlyCharge = JSON.parse(response[0].order_data.items[0].monthly_charges.device);
            this.planMonthlyCharge = JSON.parse(response[0].order_data.items[0].monthly_charges.plan);
            this.EasyPhoneMonthlyCharges = Number(this.deviceMonthlyCharge) + Number(this.planMonthlyCharge);
          }
          if (this.orderDetails.is_star) {
            this.planData = response[0].order_data.items[0].plan_data;
            this.passDetails = response[0].order_data.items[0].plan_data.pass_details;
          }
          if (response[0].order_data && response[0].order_data.supplementary_data.length > 0) {
            
            this.suppData = response[0].order_data.supplementary_data;
            // this.supplementaryDataLabel = response[0]?.supp_rebate_label;  commented bcz No node found 
            this.supplementaryDataLabel = this.TYcart?.supp_rebate_label;
          }
          const paymentMethodForAnalytics = response[0].order_data.payment_method;
          this.transactionDetails.transactMethod = response[0].order_data.payment_method;
            if (paymentMethodForAnalytics) {
            if (paymentMethodForAnalytics === "1") {
              this.transactionDetails.transactMethod = "credit Card";
              this.paymentMethodForAI = "credit Card";
              this.paymentType = "Credit Card";
              this.transactionType = 917;
            } else if (paymentMethodForAnalytics === "7") {
              this.transactionDetails.transactMethod = "fpx";
              this.paymentMethodForAI = "Online Banking";
              this.paymentType = "Payment Via BCO (FPX)";
              this.transactionType = 1042;
            } else if (paymentMethodForAnalytics === "6") {
              this.transactionDetails.transactMethod = "Boost";
              this.paymentType = "Boost";
              this.paymentMethodForAI = "Boost";
              this.transactionType = 1229;
            }
          }
          if (response[0] && response[0].order_data && response[0].order_data.items) {

            this.magentoOrderDetailsResp = response[0];
            if (!this.showGamification) {
              this.createtnpsSurveyInfo(this.userInfo, response[0]);
              this.loadOrderSuccessData();
            }
          }
        } else {
          this.loading = false;
          this.orderCreateFailure = true;
          this.MagentoOrderDetailsError = true;
        }
        this._estoreAnalyticsService.SetTransactionDetailsOfUser(this.currentUrl, this.analyticsItem,
          this.transactionDetails, this._renderer);
          this.timerForOrderCompletion();
      }, (error: any) => {
        this.loading = false;
        this.orderCreateFailure = true;
        this.MagentoOrderDetailsError = true;
        this.transactionDetails.transactResult = "failed";
        this._estoreAnalyticsService.SetTransactionDetailsOfUser(this.currentUrl, this.analyticsItem,
          this.transactionDetails, this._renderer);
          this.timerForOrderCompletion();
      });
  }

   UnregisterTnpsReference(): void {
    try {
      // Use this to remove feedback button on location change.
      const smxFeedbackBtn = document.getElementById('smxFeedbackBtn');
      if (typeof smxFeedbackBtn !== 'undefined' && smxFeedbackBtn !== null) {
        smxFeedbackBtn.remove();
      }
      // Good practice to remove script tag on location change.
      const script: any = (<any>window).script;
      if (typeof script !== 'undefined' && script !== null) {
        script.remove();
      }
      // Use this to show the popup for more than one trascation.
      const widgetShownCookie: any = (<any>window).widgetShownCookie;
      document.cookie = widgetShownCookie + '=N;path=/';
      /*** Use this to hide the iframe on location change **/
      const iframeEl: any = (<any>window).iframeEl;
      const backdropEl: any = (<any>window).backdropEl;
      const divEl: any = (<any>window).divEl;
      divEl.removeChild(iframeEl);
      divEl.remove();
      backdropEl.remove();
    } catch (error) {
    }
  }
   timerForOrderCompletion() {
    const orderTime = Date.now();
   localStorage.setItem("orderTime", JSON.stringify(orderTime));
  }

  CheckIsUserGuest() {
    if (sessionStorage && sessionStorage.getItem("GuestInfo")) {
      this.isUserGuest = true;
    }
    return this.isUserGuest;
  }
  IsDeviceOnly() {
    if (localStorage && localStorage.getItem("isDeviceOnlyClicked")) {
      this.isDeviceOnlyClicked = true;
    }
    return this.isDeviceOnlyClicked;
  }

  isDeviceBundle = () => (typeof window != "undefined" && (localStorage && localStorage.getItem("isBundleClicked") === "true"));

  isLegacyPlan(item) {
    try {
      return item.selectedProduct.orderPlanName.toLowerCase().startsWith('sime')
    } catch (_error) {

    }
    return false;
  }

  loadOrderSuccessData() {
    let response = this.magentoOrderDetailsResp;
    this._remarketAnalyticsService.LoadPurchasePageScripts();
    response?.order_data.items.forEach(item => {
      this.planImage = item.image;
      // Analytics
      this.transactionDetails.transactProductId = item.sku;
      this.transactionDetails.transactProductPrice = item.price;
      this.transactionDetails.transactProductQty = item.qty;
      if (item.plan_data && (item.plan_data.orderMontlyPay || item.plan_data.orderMonthlyPay)) {
        if (item.plan_data.orderMonthlyPay) {
          this.transactionDetails.transactPrice = item.plan_data.orderMonthlyPay;
        } else if (item.plan_data.orderMontlyPay) {
          this.transactionDetails.transactPrice = item.plan_data.orderMontlyPay;
        }
      }
    });
    if (response.status === true) {
      this.transactionDetails.transactResult = "success";
    }
    this.transactionDetails.transactOrderId = response.order_data.order_number;
    if (this.cookieService.check('orderItem')) {
      if (this.paymentMethodForAI === undefined && response.order_data.order_type) {
        this.paymentMethodForAI = 'No Payment';
      }
      this.addAffiliateScriptToBody(response, this.paymentMethodForAI);
    }
    if (this.cookieService.check('adaRemainingDays')) {
      this.addAffiliateScriptToHead(response);
      sessionStorage.removeItem('is_affiliate_ada');
    }
  }
}
