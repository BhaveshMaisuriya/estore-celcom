import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../../Service/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { BaseComponent } from '../../../base.component';
import { AppService } from '../../../Service/app.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
// import * as shajs from 'sha.js';
import { Subscription, forkJoin, Observable } from "rxjs";
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Cart } from '../../../Model/cart.model';
import { CartItem } from '../../../Model/cart-item.model';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { DeviceDetailsStorageService } from '../../../Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.service';
import { VoucherComponent } from '../../widget/voucher/voucher.component';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { UserService } from '../../../Service/user.service';
import * as helper from '../../../shared/utilities/helper.ultility';
import * as errorFormConst from '../../../../constants/form.constants';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';
import { updateAnalytics, isNullOrUndefined, customValidatorAddress, customValidatorAddressLine } from '../../../shared/utilities/helper.ultility';
import { environment } from 'environments/environment';
import { finalize } from 'rxjs/operators';
import { IO2oDealerCustomerData, IPaymentOptions, IDeliveryMethod, IDeliveryAddress, IComboDeviceDetails } from './order-summary.model';
import { iPlanDevice } from '../../../shared/models/device.model';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import {
  FORM_REQUIRED_ERROR,
  FORM_VALIDATION_ERROR,
  FORM_VALIDATION_PATTERN
} from '../../../shared/constants/form.constants';
import { iOmniCampaign, iLifeStyleVoucherDetails, iInternetShare } from 'app/shared/models/plan.model';

import { ModalService } from 'app/shared/components/modal/modal.service';
import { CART_MINE_DEFAULT_EMAIL } from "../../../shared/constants/session-storage.constants";

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: [
    "./order-summary.component.css",
    "./order-summary.component.scss",
],
  providers: [CartService, CheckoutService, AppService, DeviceDetailsStorageService],
})

export class OrderSummaryComponent extends BaseComponent implements OnInit, AfterViewInit {
  errorCreateOrder = false;
  errorCreateOrderData;
  isPrepaid = false;
  isPrepaidPack = false;
  errForm = errorFormConst;
  showEditDelivery = false;
  isExpandedTop = false;
  isExpandedBottom = false;
  public addr: any = "";
  public postCode: any = "";
  public addrline1: any = "";
  public addrline2: any = "";
  public cities: any = "";
  public states: any = "";
  showEditBillingAddress = false;
  isSystemDown = false;
  editBillingAddressFinished : boolean = false;
  checkoutService: CheckoutService;
  checkoutData: any;
  cart: any;
  billingAddress: any;
  shippingAddress: any;
  storeid: string;
  trasDate: any;
  totalAmount: number;
  deviceitems: any;
  notifyRecipient: any;
  orderid: any;
  signature: any;
  orderinfo: any;
  UpDate: string;
  reconFilename: any;
  password: any;
  userInfo: any;
  preferredContactMethod = "";
  responseorderid: string;
  responseCreatedAt: string;
  orderResponse: any;
  countryDetails: any;
  paymentGatewayURL = "";
  redirectToPG = false;
  guestInformation: any;
  eStoreFrontUrl: string = environment.eStoreFrontEndUrl;
  prodServer: boolean = environment.production;
  outletId: string = environment.outletId;
  isProceed2PayDisable = true;
  disableProceedToPay = false;
  mnpFlow = false;
  submissionStatus = true;
  cobpFlowNoUpFront = false;
  isPlanOnly = false;
  isCobp = false;
  errorRedirect = false;
  ShippingSameAsBilling: any;
  deliveryType: any;
  public showGuestNoticification = false;
  public IsExistingGuest: any = null;
  public upfrontInstallment = null;
  public isUpfrontInstallment = false;
  public suppData: any = [];
  private subscriber: Subscription;
  mnpOrderReponseError: any;
  mnpOrderResponse: any;
  mnpCustomer: any;
  personalForm: any;
  residence: any;
  preorderchk: any;
  freeGiftInfo: any;
  isPreorder = false;
  isPreOrder = false;
  cartItemAddedTime: number;
  componentLoadedTime: any;
  reserveTimeOut = false;
  cartItemUnreservation: any;
  IsDisplayIdlePopup = false;
  isEasyPhone = false;
  isEsim = false;
  simType = "";
  easyPhoneLabel: any;
  deviceUpfront: any;
  failureurl = "/store/checkout/orderconfirmation?returnCode=1&orderstatus=false";
  editShippingUrl = "/store/checkout/shipping";
  thankyoupageUrl = "/store/checkout/orderconfirmation?returnCode=1&orderId=";
  cartUrl = "/store/cart";
  planUpfront: any;
  orderOneTimePay: any;
  deviceMonthlyCharge: any;
  planMonthlyCharge: any;
  isBroadband = false;
  cSAgentOrderId: any = "";
  easyPhoneMonthlyCharges: any;
  device$: Observable<iPlanDevice>;
  supplementaryDataLabel: string;

  editedShippingAddr = {
    address: "",
    residenceType: "",
    streetDetails: "",
    postalCode: "",
    city: "",
    state: ""
  };
  personalDetails = {
    displaySalutation: '',
    displayFirstname: '',
    displayLastname: '',
    displayFullname: '',
    displayContactNumber: '',
    displayEmail: '',
    displayUnitnum: '',
    displayAlternateContactNumber: ''
  };
  formPattern = {
    address: FORM_VALIDATION_PATTERN.address,
    addressLine: FORM_VALIDATION_PATTERN.addressLine
  };
  formHelperText = {
    addressLine: {
      invalid: FORM_VALIDATION_ERROR.addressLine,
      req: FORM_REQUIRED_ERROR.addressLine
    }
  };
  recoveryData = {
    userToken: '',
    userInfo: '',
    guestInfo: '',
    authToken: '',
    userType: '',
    oldGusetUser: '',
    RandomPhoneNo: '',
    transDate: '',
    transID: '',
    personalForm: ''
  };
  public stockCheckData = {
    part_number: '',
    product_type: '',
    store_id: '',
    order_brand: '',
    order_category: '',
    order_color: '',
    order_model: '',
    pre_order_data: ''
  };
  errorStockNotAvail = false;
  errorMessage: any;
  public loading: boolean;
  public OldGuestUser: any = "YES";
  GSTInPercentage: any;
  public taxs = [];
  public sessionInvalid = false;
  STORE_ID = "estore";
  prodPaymentGWLink = "https://onlinepayment.celcom.com.my/Payment/OrderPayment";
  testPaymentGWLink = "https://onlinepayment.celcom.com.my/Payment-Testing/OrderPayment";
  tokenizerPymentGWLink = "https://onlinepayment.celcom.com.my/Payment-Testing/register/card.jsp";
  prodTokenizerPaymentGWLink = "https://onlinepayment.celcom.com.my/Payment/register/card.jsp";
  PAYMENT_GW_LINK: string = this.prodServer ? this.prodPaymentGWLink : this.testPaymentGWLink;
  tokenizerLink: string = this.prodServer ? this.prodTokenizerPaymentGWLink : this.tokenizerPymentGWLink;
  REDIRECT_URL: string = environment.eStoreFrontEndUrl + "/store/checkout/orderconfirmation";
  tokeniserRedirectUrl: string = environment.eStoreFrontEndUrl + "/store/checkout/orderconfirmation";
  public isOutOfStock = false;
  public autoBillingFlag = "";
  public additionalInfo = null;
  isCSAgent = false; // ! Can't be reused for dealer
  agentType: "dealer" | "csAgent";
  public isBillTypeOptional = false;
  public userSelectionOfBillingType = 0;
  public isGoldenNumberSelected: any;
  public isAutoBillingMandatory = false;
  public isUserGuest = false;
  public isDeviceOnlyClicked = false;
  public isDeviceBundleFlow = false;
  public hasAutoBilling = false;
  infoSystemDown = {
    title: 'Uh Oh!',
    content: this.errorConst.SYS_DOWN_MSG,
    button: 'Ok!',
  };

  // * Dealer portal Customer Email
  o2oDealerCustomerData: IO2oDealerCustomerData = {
    value: '',
    editing: false,
    prePayment: false,
    error: undefined
  };
  announcementData;
  popUpAnnouncement = false;
  isVoucherApplied = false;
  updateEmailId:any;
  updateEmailData = {
    editing: false,
    emaildata: '',
    error: {
      title: '',
      content: '',
      button: ''
    }
  };
  showEmailLink = false;

  isFamilyLine = false;

  /**
   * For Users who brought from third party - Lazada and Shopee
   * this will be true, they do not have to pay, just enter transaction id
   * and proceed to order confirmation page
   * @usage Xpax Prepaid - Third Party
   */
  isThirdPartyOrder: {
    flag: boolean;
    btnDisabled: boolean;
    /**
     * [CEL-11553] getCheckOutDetails() is getting called
     * after voucherApplied function is called in first time load.
     * Weirdly, this doesn't happen, upon refresh - second time
     * checkout page load. So this boolean will be set to true
     * when cartmine API response is set, thus preventing it from
     * reverting the flags
     * @author Vijay Pushkin
     */
    checkoutDataSet: boolean;
  } = {
    flag: false,
    btnDisabled: false,
    checkoutDataSet: false,
  };
  campaignOmni: iOmniCampaign;
  lifeStyleVoucherDetails: iLifeStyleVoucherDetails;

  //* Standard & Premium Delivery starts

  selectedDeliveryMethod: IDeliveryMethod;
  selectedDeliverAddress: string = "";
  addressErrorMsg: string = "";
  differentAddressErrorMsg: string = "";
  premiumAddressErrorMsg: string = "";
  editStdAddress: boolean = false;
  defaultSelectedDifferentAddress = false;
  defaultSelectedDeliveryMethod: string = "";
  isDeliveryTypeSelected: boolean;
  editDeliveryMethod: boolean = false;
  selectedBillingAddress: boolean = false;

  availableRegions: any;

  deliveryMethods: IDeliveryMethod[] = [];

  deliverAddress: IDeliveryAddress[] = [
    {
      name: "Deliver to billing address",
      value: "billing"
    },
    {
      name: "Deliver to different address",
      value: "different"
    }
  ];

  addshippingurl = "/rest/V1/addshipping";
  eligibilityCheckUrl = "/rest/V1/premiumdeliveryEligibility";

  standardAddress: FormGroup = null;
  premiumAddress: FormGroup = null;

  checkPostCode: string = "";
  isPremiumDeliveryAvailable: boolean = false;
  showEligibleMessage: string = "";
  premiumDeliveryCharge: number;
  areaCoveredPDCharge: number = 0;
  standardDeliveryCharge: number;
  deviceComboType: string;

  internetShare: iInternetShare;

  @ViewChild('deliveryMethodAnchor') deliveryMethodAnchor: ElementRef;
  @ViewChild('deliveryAddressAnchor') deliveryAddressAnchor: ElementRef;
  
  comboDeviceDetails: IComboDeviceDetails;

  //* Standard & Premium Delivery end

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    checkoutService: CheckoutService,
    private _service: AppService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _commonUtilService: CommonUtilService,
    private _deviceDataService: DeviceDataService,
    private _globalErrorHandler: GlobalErrorHandler,
    @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private userService : UserService,
    private _planQuery: PlansQuery,
    private _modalService: ModalService,
    private cd: ChangeDetectorRef

  ) {
    super();
    this.checkoutService = checkoutService;
    this.GSTInPercentage = this.appConstant.GST_IN_PERCENTAGE;

    //* Standard & Premium Delivery starts
    this.standardAddress = new FormGroup({
      addressLine1: new FormControl("", [
        Validators.required,
        customValidatorAddress,
      ]),
      addressLine2: new FormControl("", [
        Validators.required,
        customValidatorAddressLine,
      ]),
      addressLine3: new FormControl("", [
        customValidatorAddressLine
      ]),
      city: new FormControl("", [
        Validators.required,
        Validators.pattern(/[a-zA-Z\s]+/),
      ]),
      postcode: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      state: new FormControl("", [
        Validators.required
      ])
    });

    this.premiumAddress = new FormGroup({
      addressLine1: new FormControl("", [
        Validators.required,
        customValidatorAddress
      ]),
      addressLine2: new FormControl("", [
        Validators.required,
        customValidatorAddressLine
      ]),
      addressLine3: new FormControl("", [
        customValidatorAddressLine
      ]),
      city: new FormControl("", [
        Validators.required,
        Validators.pattern(/[a-zA-Z\s]+/),
      ]),
      postcode: new FormControl("", []),
      state: new FormControl("", []),
      alternateContact: new FormControl("", [
        Validators.pattern(FORM_VALIDATION_PATTERN.phone)
      ])
    });

    //* Standard & Premium Delivery end
  }

  ngOnInit() {
    this.errorRedirect = false;
    this.componentLoadedTime = Date.now();
    this.subscriber = this._deviceDataService.voucherCode$.subscribe(
      data => {
        this.getCheckOutDetails();
      }

    );
    /* Added for enabling and disabling of the success errors and info popup's at the bottom */
    // this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
    //   data => (this.errorStockNotAvail = data)
    // );
    this.subscriber = this._deviceDataService.cancelEditForm$.subscribe(data => this.onCancelEditDeliveryAddress());
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => {
      this.errorStockNotAvail = data;
      this.sessionInvalid = data;
      if(!this.popUpAnnouncement) {
        this.errorCreateOrder = false;
      }
      if(data === false) {
        this.popUpAnnouncement = data;
      }
      this.isSystemDown = data;
      if(data === false && this.errorRedirect === true) this._router.navigate(["/store/devices"]);
    });
    this.device$ = this._planQuery.select(store => store.device);

    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("AgentInfo")) {
      this.isCSAgent = true;
    }
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("OLD_GUEST_USER")) {
      this.OldGuestUser = sessionStorage.getItem("OLD_GUEST_USER");
    }
    // TODO Move this common method to some service or Akita
    // during refactoring
    if (sessionStorage) {
      this.agentType = sessionStorage.getItem("AgentInfo")
        ? "csAgent"
        : sessionStorage.getItem("DealerInfo")
          ? "dealer"
          : undefined;
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("PLAN_TRANSACTION_ID")) {
      localStorage.removeItem("PLAN_TRANSACTION_ID");
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("SIEBEL_ORDER_ID")) {
      localStorage.removeItem("SIEBEL_ORDER_ID");
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("OrderFailure")) {
      localStorage.removeItem("OrderFailure");
    }
    if (typeof window !== 'undefined' && localStorage && sessionStorage ) {
      if (sessionStorage.getItem("UserToken")) {
        this.recoveryData.userToken = sessionStorage.getItem("UserToken");
      }
      if (sessionStorage.getItem("GuestInfo")) {
        this.recoveryData.guestInfo = sessionStorage.getItem("GuestInfo");
      }
      if (sessionStorage.getItem("UserInfo")) {
        this.recoveryData.userInfo = sessionStorage.getItem("UserInfo");
      }
      if (sessionStorage.getItem("authtoken")) {
        this.recoveryData.authToken = sessionStorage.getItem("authtoken");
      }
      if (sessionStorage.getItem("OLD_GUEST_USER")) {
        this.recoveryData.oldGusetUser = sessionStorage.getItem("OLD_GUEST_USER");
      }
      if (sessionStorage.getItem("RandomPhoneNo")) {
        this.recoveryData.RandomPhoneNo = sessionStorage.getItem("RandomPhoneNo");
      }
      if (sessionStorage.getItem("transDate")) {
        this.recoveryData.transDate = sessionStorage.getItem("transDate");
      }
      if (sessionStorage.getItem("transID")) {
        this.recoveryData.transID = sessionStorage.getItem("transID");
      }
      if (sessionStorage.getItem("USER_TYPE")) {
        this.recoveryData.userType = sessionStorage.getItem("USER_TYPE");
      }
      if (sessionStorage.getItem('personalForm')) {
        this.recoveryData.personalForm = sessionStorage.getItem("personalForm");
      }
      localStorage.setItem("sessionRecovery", JSON.stringify(this.recoveryData));
    }
    this.init();
  }
  ngAfterViewInit() {
    const currentUrl = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
    this._estoreAnalyticsService.SetCategoryTwoForAdobeDataLayer(this._renderer);
    this.announcementData = {
      title: 'Delay of Delivery',
      content: `In light with the recent announcement of the CMCO, we would like to inform you that your order may experience delay in delivery.`,
      deliverydetailcontent: "West Malaysia: 3 to 7 working days <br>East Malaysia: 5 to 14 working days.",
      refcontent: `Thank you for your understanding. #StayIn and stay safe.`,
      mco: true,
      button: 'Read More!',
    };
  }
  init() {
    let orderId = localStorage?.getItem("magentoID");
    if (orderId) {
      const url = "/rest/V1/cancelOrderRestoreCart/" + orderId;
      this._service.postRestoreData(url)
      .pipe(
        finalize(() => {
          this.getCountryDetails();
          localStorage.removeItem('magentoID');
        })
      )
      .subscribe();
    } else {
      this.getCountryDetails();
    }
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  //* Standard & Premium Delivery starts
  selectDeliveryMethod(selectedMethod) {
    this.selectedDeliveryMethod = this.deliveryMethods.find(method => method.value === selectedMethod.value);
    this.editDeliveryMethod = true; 
    this.selectedBillingAddress = false;
    if (this.selectedDeliveryMethod.code === 'standard') {
      this.selectDeliverAddress(this.selectedDeliverAddress);
    } else if (this.defaultSelectedDeliveryMethod === 'EXP' && this.selectedDeliveryMethod.code === 'EXP') {
      this.selectedDeliverAddress = '';
      this.checkPostCode = this.shippingAddress?.postcode;
      this.checkPremiumDeliveryAvailability();
    }

  }

  selectDeliverAddress(address) {
    this.addressErrorMsg = '';
    this.editStdAddress = false;
    this.selectedBillingAddress = false;
    this.selectedDeliverAddress = address;
    this.resetAddressForm(this.standardAddress);
    this.editBillingStdAddress();
  }

  checkPremiumDeliveryAvailability() {
    const request = {
      "data": {
        "postal_code": this.checkPostCode
      }
    };

    if (this.checkPostCode === "" || this.checkPostCode.length < 5) {
      this.showEligibleMessage = "Please enter valid postcode";
      this.isPremiumDeliveryAvailable = false;
    } else {
      this._service.postEstoreUserData(this.eligibilityCheckUrl, request).subscribe(
        (response: any) => {
          this.showEligibleMessage = response[0].message;

          if (response[0].status) {
            this.isPremiumDeliveryAvailable = true;
            this.areaCoveredPDCharge = response[0]?.charges ?? 0;

            this.premiumAddress.patchValue({
              postcode: this.checkPostCode,
              state: response[0]?.state.region_id
            });
            if(this.defaultSelectedDeliveryMethod === 'EXP'){
              this.premiumAddress.patchValue({
                addressLine1: this.shippingAddress?.shipping_unit_number,
                addressLine2: this.shippingAddress?.address_line_1,
                addressLine3: this.shippingAddress.address_line_2,
                city: this.shippingAddress?.city,
                postcode: this.shippingAddress?.postcode,
                state: this.shippingAddress?.region_id
              });
            }
          } else {
            this.isPremiumDeliveryAvailable = false;
            this.resetAddressForm(this.premiumAddress);
          }

        }, (err: any) => {
          this.setError(err);
        });
    }
  }

  editBillingStdAddress() {
    this.isExpandedBottom = false;
    this.editStdAddress = false;
    if (this.selectedDeliverAddress === 'billing') {
      this.resetAddressForm(this.standardAddress);
      this.selectedBillingAddress = true;
      if (!this.isSameAddress() && (this.defaultSelectedDifferentAddress || this.defaultSelectedDeliveryMethod !== 'standard')) {
        this.standardAddress.patchValue({
          addressLine1: this.billingAddress?.billing_unit_number,
          addressLine2: this.billingAddress?.address_line_1,
          addressLine3: this.billingAddress.address_line_2,
          city: this.billingAddress.city,
          postcode: this.billingAddress?.postcode,
          state: this.billingAddress?.region_id
        });
        this.updateAddress(this.standardAddress);
      }
    } else if (this.defaultSelectedDifferentAddress && this.selectedDeliverAddress === 'different') {
      this.standardAddress.patchValue({
        addressLine1: this.shippingAddress?.shipping_unit_number,
        addressLine2: this.shippingAddress?.address_line_1,
        addressLine3: this.shippingAddress.address_line_2,
        city: this.shippingAddress?.city,
        postcode: this.shippingAddress?.postcode,
        state: this.shippingAddress?.region_id
      });
    } else {
      this.isExpandedBottom = true;
      this.editStdAddress = true;
      this.resetAddressForm(this.standardAddress);
    }
  }

  updateAddress(form: FormGroup) {
    if(!form.valid) {
      form.markAllAsTouched();
      return;
    }
    let salutation = '';

    if (this.checkoutData && this.checkoutData.customerOtherInfo && this.checkoutData.customerOtherInfo.salutation) {
      salutation = this.checkoutData.customerOtherInfo.salutation;
    } else {
      if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.salutation) {
        salutation = this.userInfo.outputCPResp.salutation;
      } else {
        salutation = "";
      }
    }
    let userMsisdn = "";
    if (localStorage && localStorage.getItem("MyMsIsdn") && this.userService.isMCUser()) {
      userMsisdn = localStorage.getItem("MyMsIsdn");
    }
    let request={};

    request = {
      "data": {
        "cart_id": this.checkoutData.id ? this.checkoutData.id : "",
        "salutation": salutation,
        "fname": this.checkoutData.customer.firstname,
        "lname": this.checkoutData.customer.lastname,
        "id": "",
        "customerId": this.checkoutData.customer.id,
        "unit_no": form.value.addressLine1,
        "address_line_1": form.value.addressLine2,
        "address_line_2": form.value.addressLine3 || '' ,
        "city": form.value.city,
        "postCode": form.value.postcode,
        "stateId": form.value.state,
        "phone": this.checkoutData.customerOtherInfo.mobile_number,
        "delivery_type": this.selectedDeliveryMethod.value,
        "is_shipping": true,
        "msisdnNumber": userMsisdn,
        "alternate_contact_number": form.value.alternateContact || '',
      }
    };

    this._service.postEstoreUserData(this.addshippingurl, request).subscribe(
      (response: any) => {
        if(typeof window !== 'undefined') this.redirectTo('/store/checkout/summary');
      }, (err: any) => {
        this.setError(err);
      });
  }

  resetAddressForm(form: FormGroup) {
    form.reset();
    form.markAsPristine();
    form.markAsUntouched();
  }

  resetFlags() {
    this.addressErrorMsg = "";
    this.isPremiumDeliveryAvailable = false;
    this.showEligibleMessage = "";
    this.checkPostCode = "";
  }

  setError(err: any) {
    return this._modalService.showError(err);
  }

  ngOnDestroy() {

  }

  //* Standard & Premium Delivery end

  public getCountryDetails() {
    this.loading = true;
    const apiUrl = "/rest/V1/directory/countries/MY";
    this.checkoutService.Find(apiUrl.trim()).subscribe(
      (response: any) => {
        this.countryDetails = response;

        //* Standard & Premium Delivery start
        this.availableRegions = [
          { value: '', label: 'Select a State', isNone: true },
          ...response.available_regions?.map(state => ({
            value: state.id,
            label: state.name,
          }))
        ];
        //* Standard & Premium Delivery end

        this.getCheckOutDetails();
      },
      errorResponse => {
        this.loading = false;
        if (typeof window !== 'undefined') {
          if (!errorResponse.error.success) {
            this.errorRedirect = true;
            this.sessionInvalid = true;
          }
        }
      });
  }

  public getCheckOutDetails() {
    if (typeof window !== 'undefined') {
      if (sessionStorage && sessionStorage.getItem("UserInfo") != null) {
        this.userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      }
      if (sessionStorage && sessionStorage.getItem("GuestInfo") != null) {
        this.guestInformation = JSON.parse(sessionStorage.getItem("GuestInfo"));
      }
    }
    if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.preferredContactMethod) {
      this.preferredContactMethod = this.userInfo.outputCPResp.preferredContactMethod;
    } else if (this.guestInformation && this.guestInformation.outputCPResp && this.guestInformation.outputCPResp.preferredContactMethod) {
        this.preferredContactMethod = this.guestInformation.outputCPResp.preferredContactMethod;
    }
    let apiUrl = ApiConstant.CARTMINE_API;
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem('CAorderId') &&
    sessionStorage.getItem('CAorderId') !== null && sessionStorage.getItem('secretKey') &&
    sessionStorage.getItem('secretKey') !== null) {
      this.cSAgentOrderId = sessionStorage.getItem('CAorderId');
      const orderSecret = sessionStorage.getItem('secretKey');
       apiUrl = "/rest/V1/cartmine?order_id=" + this.cSAgentOrderId + "&order_secret=" + orderSecret;
    }
    this.checkoutService.Find(apiUrl.trim()).subscribe(
      (response: any) => {
        if (response[0].status === false && (response[0].message === "SESSION IN VALID" || response[0].message === "SESSION INVALID")) {
          this.errorRedirect = true;
          this.sessionInvalid = true;
          return false;     // session invalid error
        }
        this.checkoutData = response[0];
        this.comboDeviceDetails = this.checkoutData?.all_items?.[0]?.selectedProduct?.comboDeviceDetails;
        this.supplementaryDataLabel = response?.[0]?.supp_rebate_label;
        if (this.checkoutData?.all_items?.[0]?.campaign_omni) {
          this.campaignOmni = helper.CLMOmniDataSanitizer(this.checkoutData?.all_items?.[0]?.campaign_omni);
        }
        if (this.checkoutData?.all_items?.[0]?.lifestyle_voucher_details) {
          this.lifeStyleVoucherDetails = this.checkoutData.all_items[0].lifestyle_voucher_details;
        }
        if (this.checkoutData?.all_items?.[0]?.device_combo_type) {
          this.deviceComboType = this.checkoutData.all_items[0].device_combo_type;
        }

        //* Standard & Premium Delivery starts

        // get delivery type from cartmine api
        if(this.checkoutData.delivery_type?.length > 0) {
          this.deliveryMethods = [
            ...this.checkoutData.delivery_type?.map(type => ({
              name: type.name,
              code: type.code,
              value: type.value,
              label: (type.code === 'EXP') ? type.name + ' (Express Delivery)' : type.name,
            }))
          ];

          this.selectedDeliveryMethod = this.checkoutData.delivery_type.find(type => type.selected === 1);
          this.isDeliveryTypeSelected = !!this.selectedDeliveryMethod;
          
          // select default delivery method if not selected
          if(!this.selectedDeliveryMethod) {
            this.selectedDeliveryMethod = this.checkoutData.delivery_type.find(type => type.value === 0);
          }
          this.selectedDeliveryMethod.label = (this.selectedDeliveryMethod.code === 'EXP')
            ? this.selectedDeliveryMethod.name + ' (Express Delivery)'
            : this.selectedDeliveryMethod.name;
        } else {
          this.isDeliveryTypeSelected = true;
          this.deliveryMethods.push({
            name: this.checkoutData.delivery_type.name,
            value: this.checkoutData.delivery_type.value,
            code: this.checkoutData.delivery_type.code,
            label: (this.checkoutData.delivery_type.code === 'EXP')
              ? this.checkoutData.delivery_type.name + ' (Express Delivery)'
              : this.checkoutData.delivery_type.name,
          });
          this.selectedDeliveryMethod = this.deliveryMethods[0];
        }

        this.setDeliveryCharges();

        //* Standard & Premium Delivery ends

        this.internetShare = this.checkoutData?.internet_share;

        // Redirect to personal data for new users
        const billing = this.checkoutData?.billing_address;
        if (
            (/^\d+\@celcom.com$/.test(billing?.email)
              && billing?.telephone === "823")
              ||
            (
              billing?.address_line_1 === '82, Jalan Raja Muda Abdul Aziz'
              ||
              billing?.street === '82, Jalan Raja Muda Abdul Aziz'
            )) {
          sessionStorage.setItem(CART_MINE_DEFAULT_EMAIL, billing?.email);
          this._router.navigateByUrl('/store/checkout/personal-details');
        }

        try {
          updateAnalytics('product_id', this.checkoutData?.items[0]?.sku);
          updateAnalytics('product_name', this.checkoutData?.items[0]?.name);
          updateAnalytics('product_price', this.checkoutData?.grossTotal);
          updateAnalytics('customer_type', sessionStorage.getItem("OLD_GUEST_USER") === "YES" ? "existing" : "new");
          updateAnalytics('customer_category', sessionStorage.getItem('USER_TYPE')?.toLowerCase() == 'enterprise' ? 'enterprise' : 'mass');
          updateAnalytics('product_type', localStorage.getItem("analytics-product_type"));
          updateAnalytics('item_type', localStorage.getItem("analytics-item_type"));
        } catch (_error) {
        }
        this.setDefaultBilling();
        if (this.checkoutData && this.checkoutData.all_items && this.checkoutData.all_items.length > 0) {
          sessionStorage.setItem("didSummary","true");
          this.popUpAnnouncement = true;
          if (typeof window !== "undefined" && localStorage) {
            localStorage.setItem("cartDetailsUnservation",  JSON.stringify({all_items: this.checkoutData.all_items}));
          }
        if (this.checkoutData && this.checkoutData.all_items && this.checkoutData.all_items[0]) {
          this.preorderchk = this.checkoutData.all_items[0];
        }
        if (this.checkoutData && this.checkoutData.all_items && this.checkoutData.all_items.length>0) {
          this.upfrontInstallment = this.checkoutData.all_items[0].upfront_installment;
        }
        if(this.upfrontInstallment) {
          this.isUpfrontInstallment = true;
        }
        if (this.cSAgentOrderId && this.checkoutData.redirect_url) {
          this.redirectToPG = true;
          this.paymentGatewayURL = this.checkoutData.redirect_url;
        }
        if (this.preorderchk && this.preorderchk.selectedProduct && this.preorderchk.selectedProduct.free_gift_data) {
          this.freeGiftInfo = this.preorderchk.selectedProduct.free_gift_data;
        }
        if (this.preorderchk && this.preorderchk.selectedProduct && this.preorderchk.selectedProduct.selectedPlanDetails
          && this.preorderchk.selectedProduct.selectedPlanDetails.additional_information) {
          this.additionalInfo = this.preorderchk.selectedProduct.selectedPlanDetails.additional_information;
        } else {
          this.additionalInfo = null;
        }
        if (this.checkoutData && this.checkoutData.all_items[0] && this.checkoutData.all_items[0].is_broadband) {
          this.isBroadband = true;
        }

        // * is family line
          this.isFamilyLine = this.checkoutData?.all_items[0]?.sku === 'family-line';

          // * is third party order
          this.isThirdPartyOrder.flag = !!Number(this.checkoutData?.is_thirdparty_order ?? "0");
          if (this.isThirdPartyOrder.flag && !this.isThirdPartyOrder.checkoutDataSet) {
            this.isThirdPartyOrder.btnDisabled = true;
            this.isThirdPartyOrder.checkoutDataSet = true;
          }

        if (this.preorderchk !== undefined) {
          if (this.preorderchk) {
            this.isPrepaid = this.checkoutData.is_prepaid;
            this.isPrepaidPack = this.checkoutData.is_prepaid_pack;
          }
          if (this.preorderchk.is_easyphone) {
            this.isEasyPhone = this.preorderchk.is_easyphone; // this.preorderchk.is_easyphone;
            this.easyPhoneLabel = this.preorderchk.easyphone_label;
            let contractPeriod = this.easyPhoneLabel.substring(this.easyPhoneLabel.indexOf('('),this.easyPhoneLabel.indexOf(')')+1);
            if (this.easyPhoneLabel.indexOf('Rent') > -1) {
              this.easyPhoneLabel = "EasyPhone™ Rent "+contractPeriod;
            }
            if (this.easyPhoneLabel.indexOf('Own') > -1) {
              this.easyPhoneLabel = "EasyPhone™ Own "+contractPeriod;
            }
            if (this.isEasyPhone) {
              this.deviceUpfront = this.preorderchk.selectedProduct.order_device_subt;
              this.planUpfront = this.preorderchk.selectedProduct.order_plan_subt;
              this.orderOneTimePay = this.preorderchk.selectedProduct.orderOneTimePay;
              this.deviceMonthlyCharge = JSON.parse(this.preorderchk.selectedProduct.monthly_charges.device);
              this.planMonthlyCharge = JSON.parse(this.preorderchk.selectedProduct.monthly_charges.plan);
              this.easyPhoneMonthlyCharges = Number(this.deviceMonthlyCharge) + Number(this.planMonthlyCharge);
            }
          }
          this.isEsim = this.preorderchk.esim;
          this.simType = this.checkoutData.simType;
        }
        //to identify the journey either playonly or devicebundle journey

        if(this.checkoutData && this.checkoutData.all_items[0].selectedProduct && this.checkoutData.all_items[0].selectedProduct.orderDevice &&
          this.checkoutData.all_items[0].selectedProduct.orderDeviceName) {
            this.isDeviceBundleFlow = true;
            if (!this.isDeliveryTypeSelected) {
              this.editDeliveryMethod = !this.editDeliveryMethod;
            }
          }

        // Get added cart time only for preorder device for now.
        this.cartItemAddedTime = this.checkoutData.cart_session;
        if (this.checkoutData && this.checkoutData.delivery_type && typeof this.checkoutData.delivery_type.value !== 'undefined') {
          if (this.checkoutData.delivery_type.value === 1) {
            this.deliveryType = 'Midnight Delivery';
          } else if (this.checkoutData.delivery_type.value === 0) {
            this.deliveryType = 'Standard Delivery';
          }
        }
        this.suppData = response[0].supplementary_data;
        if (typeof window !== 'undefined' && localStorage && this.preorderchk && this.preorderchk.is_preorder === 1) {
          localStorage.setItem("cartPreOrder", "true");
        }
        // if (this.isPrepaid) {
        //   const userInfoSession = JSON.parse(sessionStorage.getItem('UserInfo'));
        //   sessionStorage.setItem("contactEmail",userInfoSession?.outputCPResp?.contactEmail);
        // }
        // const personalFormSession = JSON.parse(sessionStorage.getItem('personalForm'));
        // let personalContactEmail = personalFormSession?.contactEmail ? personalFormSession.contactEmail : personalFormSession?.outputCPResp?.contactEmail;
        // const contactEmailSession = sessionStorage.getItem('contactEmail');
        // Personal details.
        this.personalDetails = {
          displaySalutation: this.salutaion(),
          displayFirstname: this.checkoutData.customer.firstname,
          displayLastname: this.checkoutData.customer.lastname,
          displayFullname: this.checkoutData.customerOtherInfo.customer_full_name || this.userInfo?.outputCPResp?.name,
          displayUnitnum: this.checkoutData.customerOtherInfo.unit_number,
          displayContactNumber: this.PhoneNumber(),
          displayEmail: this.checkoutData.customer.email,
          displayAlternateContactNumber: this.checkoutData.customerOtherInfo.alternate_contact_number || 'None'
        };
        if (this.personalDetails.displayEmail) {
          let emailValue = this.personalDetails.displayEmail.split('@')[0];
          let checkouDataNRIC;
          this.checkoutData?.customer?.custom_attributes.forEach(element => {
            if (element.attribute_code === "id_number") {
              checkouDataNRIC = element.value;
            }
          });
          if (emailValue === checkouDataNRIC) {
            this.personalDetails.displayEmail = null;
          }
        }
        if(!this.personalDetails.displayEmail) {
          this.toggleEditEmail();
          this.showEmailLink = true;

          window.scrollTo(0,300);
        }
        this.deviceitems = response.items;
        this.checkoutData = response[0];
        // let cartTotal = 0;
        const cartItemArray = [];
        this.checkoutData.all_items.forEach(element => {
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
          cartItem.has_add_ons = element.has_add_ons;
          cartItem.add_on_label = element.add_on_label;
          cartItem.campaign100_days = element.campaign100_days;
          cartItem.is_campaign_mviva = element.is_campaign_mviva;
          cartItem.campaign_mviva_message = element.campaign_mviva_message;
          cartItem.campaign_mviva_url = element.campaign_mviva_url;
          cartItem.billType = element.bill_type;
          cartItem.deviceUpfrontPenalty = Number(element.device_upfront_penalty);
          cartItem.lifestylePenalty = element?.lifestyle_penalty;
          if (cartItem.billType === 1 || cartItem.billType === "1") {
           this.isBillTypeOptional = true;
           this.isAutoBillingMandatory = false;
           this.hasAutoBilling = false;
          } else if (cartItem.billType === 2 || cartItem.billType === "2") {
            this.isAutoBillingMandatory = true;
            this.hasAutoBilling = true;
          } else {
            this.isAutoBillingMandatory = false;
          }
          cartItem.is_telco_day = (element.selectedProduct && element.selectedProduct.selectedPlanDetails &&
            element.selectedProduct.selectedPlanDetails.telco_day &&
             element.selectedProduct.selectedPlanDetails.telco_day.status) ?
              element.selectedProduct.selectedPlanDetails.telco_day.status : false;
          cartItem.telco_day_message = (element.selectedProduct && element.selectedProduct.selectedPlanDetails &&
            element.selectedProduct.selectedPlanDetails.telco_day &&
              element.selectedProduct.selectedPlanDetails.telco_day.message) ?
              element.selectedProduct.selectedPlanDetails.telco_day.message : "";
          cartItemArray.push(cartItem);
        });
        this.cart = new Cart();
        this.cart.items = cartItemArray;
        if (this.cart.items[0] && this.cart.items[0].selectedProduct && this.cart.items[0].selectedProduct.selectedPlanDetails) {
          this.isGoldenNumberSelected = this.cart.items[0].selectedProduct.selectedPlanDetails.is_golden_number;
        }
        this.cart.familyLineNoUpfront = this.checkoutData?.family_line_no_upfront;
        this.cart.isMnp = this.checkoutData?.all_items?.[0]?.selectedProduct?.is_mnp;
        this.cart.grossTotal = this.checkoutData.grossTotal;
        this.cart.setTotalPrices(this.cart);
        this.deviceitems = response.items;
        this.cart.rebateAmount = response[0].all_items[0].rebate_amount;
        if (response[0].all_items[0].voucher_code &&
            response[0].all_items[0].voucher_code !== null &&
            response[0].all_items[0].voucher_code.length > 0) {
          const voucher = {
            voucherCode : response[0].all_items[0].voucher_code,
            voucherSuccessDesc : response[0].all_items[0].coupon_description,
            isVoucherCodeApplied : true
          };
          this.popUpAnnouncement = false;
          this.isVoucherApplied = true;
          this._deviceDataService.publishVoucherOldCode(voucher);
        }
      if(this.isVoucherApplied){
        this.popUpAnnouncement = false;
      }
        this.taxs = this.checkoutData.tax.items;
        if (this.cart.items[0] && this.cart.items[0].isPreorder && Number(this.cart.items[0].isPreorder) === 1) {
          this.isPreorder = true;
        }

        // using cart id for order id as order id is not yet created at magento.
        this.orderinfo = this.checkoutData.id;

        if ((typeof window !== 'undefined' && localStorage && localStorage.getItem('MNP-FLOW') === 'YES') ||
        (this.cart.items[0].selectedProduct.orderNumberType === 'SwitchToCelcom')) {
          localStorage.setItem('MNP-FLOW', 'YES');
          this.mnpFlow = true;
        }
        if ((typeof window !== 'undefined' && localStorage && localStorage.getItem('COBP_FLOW') === 'YES') ||
        (this.cart.items[0].selectedProduct.orderNumberType === 'KeepNumber')) {
          this.cobpFlowNoUpFront = true;
          this.isCobp = true;
        }
        if ((typeof window !== 'undefined' && localStorage &&
          localStorage.getItem('COBP_FLOW') === 'YES') || (this.cart.items[0].selectedProduct.orderNumberType &&
          this.cart.items[0].selectedProduct.orderNumberType === 'KeepNumber')) {
          localStorage.setItem('COBP_FLOW', 'YES');
          this.isCobp = true;
        }
        if (((typeof window !== 'undefined' && localStorage && localStorage.getItem('COBP_FLOW') === 'YES') ||
          (this.cart.items[0].selectedProduct.orderNumberType && this.cart.items[0].selectedProduct.orderNumberType === 'KeepNumber')) &&
          Number(this.cart.grossTotal) !== 0) {
          this.cobpFlowNoUpFront = false;
        }
        const isMNPFlow = localStorage.getItem('MNP-FLOW') === 'YES';
        if ((isMNPFlow || this.cart.items[0].selectedProduct.orderNumberType === 'SwitchToCelcom')
         && Number(this.cart.grossTotal) !== 0) {
          this.mnpFlow = false;
        }
        if (this.cart && this.cart.items && this.cart.items[0] && this.cart.items[0].selectedProduct
          && this.cart.items[0].selectedProduct.orderNumberType === 'NewNumber' && (Number(this.cart.grossTotal) !== 0)) {
          this.isPlanOnly = false;
        }

        if (this.checkoutData && this.checkoutData.billing_address) {
          this.billingAddress = this.checkoutData.billing_address;
        }

        if (this.checkoutData && this.checkoutData.shipping_address) {
          this.shippingAddress = this.checkoutData.shipping_address;
        }
        // get customer retrieval data from localstorage if no data came from magento.
        if (!this.billingAddress) {
          this.billingAddress = this.getCustomerRetrievalAddress();
        }
        if (!this.shippingAddress) {
          this.shippingAddress = this.getCustomerRetrievalAddress();
        }
        this.checkMissingInfo();
        this.isProceed2PayDisable = false;
        if (response[0].cs_agent_cart_exp === true) {
          this.errorStockNotAvail = true;
          this.errorMessage = {};
          this.errorMessage.content = "The item(s) in your cart has expired.";
          this.disableProceedToPay = true;
          if (typeof window !== 'undefined' && sessionStorage.getItem('CAorderId') || sessionStorage.getItem('secretKey')) {
            sessionStorage.removeItem('CAorderId');
            sessionStorage.removeItem('secretKey');
           }
        }
        this.loading = false;
        } else if (response[0].status === false && response[0].payment_status === true) {
          this.loading = false;
          this.cartItemUnreservation = {};
          this.cartItemUnreservation.content = true;
          this.cartItemUnreservation.paymentDone = true;
          this.IsDisplayIdlePopup = true;
          if (typeof window !== 'undefined' && sessionStorage.getItem('CAorderId') || sessionStorage.getItem('secretKey')) {
            sessionStorage.removeItem('CAorderId');
            sessionStorage.removeItem('secretKey');
           }
        } else {
          this.loading = false;
          this.errorRedirect = true;
          this.errorStockNotAvail = true;
          this.errorMessage = {};
          this.errorMessage.content = response[0].message ? response[0].message : "The item(s) in your cart has expired.";
          if (typeof window !== 'undefined' && sessionStorage.getItem('CAorderId') || sessionStorage.getItem('secretKey')) {
            sessionStorage.removeItem('CAorderId');
            sessionStorage.removeItem('secretKey');
           }
        }
        if (this.errorMessage?.content) {
          this._globalErrorHandler.errorObjectConvert(this.errorMessage.content);
        }
      },
      errorResponse => {
        if (typeof window !== "undefined") {
          this.loading = false;
          if (!errorResponse.error.success) {
            this.errorRedirect = true;
            this.sessionInvalid = true;
          }
        }
      });
  }

  setDeliveryCharges() {
    const isShippingMethodSelected = !!this.checkoutData.shipping_address.shipping_method;
    const deliveryType = this.checkoutData.delivery_type;

    if(!!deliveryType?.length) {
      const standard = deliveryType.find(type => type.code === 'standard');
      const premium = deliveryType.find(type => type.code === 'EXP');

      this.standardDeliveryCharge = isShippingMethodSelected ? standard?.charges : standard.default_charges;
      this.premiumDeliveryCharge = isShippingMethodSelected ? premium?.charges : premium.default_charges;
    } else {
      this.standardDeliveryCharge = this.premiumDeliveryCharge = isShippingMethodSelected ? deliveryType?.charges : deliveryType.default_charges;
    }
  }

  manageShippingDetails(ele: any) {
    if (ele.includes("billing", "email")) {
      this.editShippingAddress("top");
    }
    if (ele === "shipping") {
      this.editShippingAddress("bottom");
    }
  }
  checkMissingInfo() {
    let type = [];
    let message;
    let shipping = this.shippingAddress;
    let billing = this.billingAddress;
    let unavailableFields = ['firstname','lastname','telephone'];
    shipping = this.filterAddress(shipping);
    billing = this.filterAddress(billing);
    for(let field in shipping){
      if (unavailableFields.includes(field) && (!shipping[field] || !billing[field])) {
        sessionStorage.setItem(CART_MINE_DEFAULT_EMAIL, this.checkoutData.billing_address?.email);
        this._router.navigateByUrl('/store/checkout/personal-details')
      }
    }
    // shipping.firstname = null;
    // billing.firstname = '';
    if(Object.values(shipping).some(data => data == null || data == '')) {
      type.push("shipping");
      message = `Please update your shipping information`;
    }
    if(Object.values(billing).some(data => data == null || data == '')) {
      type.push("billing");
      message = `Please update your billing information`;
    }
    /*type.forEach(element => {
      if(element.includes("billing","email")) {
        this.editShippingAddress("top");
      }
      if(element === "shipping") {
        this.editShippingAddress("bottom");
      }
    });*/
    type.forEach(args => this.manageShippingDetails(args));
    if(message){
      this.errorCreateOrder = true;

    this.errorCreateOrderData = {
      title: "Uh Oh!",
      content: message ,
      button: 'Got it!',
    };
    document.documentElement.scrollTop = 0;

  }
  }

  filterAddress(address) {
    let params = [];
    if(address.address_type == "shipping"){
     params = ['firstname','lastname','address_line_1','city','region','region_id','country_id','telephone','postcode','shipping_unit_number'];
    }else if(address.address_type == "billing"){
     params = ['firstname','lastname','address_line_1','city','region','region_id','country_id','telephone','postcode'];
    }
    const filtered = Object.keys(address)
      .filter(key => params.includes(key))
      .reduce((obj, key) => {
        obj[key] = address[key];
        return obj;
      }, {});
      return filtered;
  }

  redirectShopDetails() {
    const self = this;
    setTimeout(function () {
      self.IsDisplayIdlePopup = false;
    }, 0);
  }

  getMobileNumber(){
    if (this.checkoutData && this.checkoutData.customerOtherInfo &&
      this.checkoutData.customerOtherInfo.mobile_number && this.checkoutData.customerOtherInfo.mobile_number !== null) {
      return this.checkoutData.customerOtherInfo.mobile_number;
    } else if (this.checkoutData && this.checkoutData.billing_address &&
      this.checkoutData.billing_address.telephone && this.checkoutData.billing_address.telephone !==null){
        return this.checkoutData.billing_address.telephone;
      }else if (this.checkoutData && this.checkoutData.shipping_address &&
        this.checkoutData.shipping_address.telephone && this.checkoutData.shipping_address.telephone !==null){
          return this.checkoutData.shipping_address.telephone;
        }

  }

  public PhoneNumber() {
    if (this.checkoutData && this.checkoutData.customerOtherInfo &&
      this.checkoutData.customerOtherInfo.mobile_number && this.checkoutData.customerOtherInfo.mobile_number !== null) {
      return this.personalDetails.displayContactNumber = this.checkoutData.customerOtherInfo.mobile_number;
    } else if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.newGuestPhNo &&
      this.userInfo.outputCPResp.newGuestPhNo != null) {
      return this.personalDetails.displayContactNumber = this.userInfo.outputCPResp.newGuestPhNo;
    } else if (this.userInfo && this.userInfo.outputCPResp &&
      this.userInfo.outputCPResp.contactMobileNum && this.userInfo.outputCPResp.contactMobileNum != null) {
      return this.personalDetails.displayContactNumber = this.userInfo.outputCPResp.contactMobileNum;
    } else if (localStorage && localStorage.getItem("MyMsIsdn")) {
      return this.personalDetails.displayContactNumber = localStorage.getItem("MyMsIsdn");
    } else {
      return this.personalDetails.displayContactNumber = "";
    }
  }

  public salutaion() {
    if (localStorage && localStorage.getItem("MyMsIsdn") && this.userInfo && this.userInfo.outputCPResp &&
      this.userInfo.outputCPResp.contactSalutation && this.userInfo.outputCPResp.contactSalutation !== '' &&
      this.userInfo.outputCPResp.contactSalutation !== null) {
      return this.personalDetails.displaySalutation = this.userInfo.outputCPResp.contactSalutation;
    } else if (sessionStorage && ['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE")) && this.checkoutData &&
      this.checkoutData.customerOtherInfo && this.checkoutData.customerOtherInfo.salutation) {
      return this.personalDetails.displaySalutation = this.checkoutData.customerOtherInfo.salutation;
    } else if (sessionStorage && sessionStorage.getItem('personalForm')) {
      const personalForm = JSON.parse(sessionStorage.getItem('personalForm'));
      return this.personalDetails.displaySalutation = personalForm.outputCPResp.salutation;
    }
  }

  private createMagentoOrderId() {
    if (this.cSAgentOrderId) {
      this.responseorderid = this.cSAgentOrderId;
      if (this.checkoutData && this.checkoutData.autopayment) {
        this.autoBillingFlag = this.checkoutData.autopayment;
       }
      this.proceedAfterStockCheck();
       // Add magento order id in localstorage for later use.
       if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem("magentoID", this.responseorderid);
        if (this.responseCreatedAt) {
          localStorage.setItem("transDate", this.responseCreatedAt);
        } else if (this.checkoutData && this.checkoutData.order_created_at) {
          localStorage.setItem("transDate", this.checkoutData.order_created_at);
        }
      }
      if (localStorage) {
        localStorage.setItem("TYCart", JSON.stringify(this.checkoutData));
      }
      // Remove if exists.
      if (localStorage && localStorage.getItem("SIEBEL_ORDER_ID")) {
        localStorage.removeItem("SIEBEL_ORDER_ID");
      }
    } else {
    let itemDetailRequest: any = [];
    let mobilenumber = "";
    /* const regionId = this.countryDetails.available_regions.find((item) => {
      if (item.code === this.shippingAddress.region.region) return item.id }); */
      if (typeof window !== 'undefined' && localStorage && localStorage.getItem('MyMsIsdn')) {
        mobilenumber = JSON.parse(localStorage.getItem("MyMsIsdn"));
      }
    if (this.cart.items.length) {
      this.cart.items.forEach(element => {
        if (element.selectedProduct.orderDevice) {

          const item = {
            "ProductType": "HP",
            "PartNum": element.selectedProduct.orderReqPartNumber,
            "Quantity": "1",
            "listOfAttributes": [{
              "attributes": [{
                "Name": "BRAND",
                "Value": ((element && element.selectedProduct &&
                  element.selectedProduct.orderReqBrand) ? element.selectedProduct.orderReqBrand.toUpperCase() : "")
              },
              {
                "Name": "CATEGORY",
                "Value": ((element && element.selectedProduct &&
                  element.selectedProduct.orderReqCategory) ? element.selectedProduct.orderReqCategory.toUpperCase() : "")
              },
              {
                "Name": "COLOR",
                "Value": ((element && element.selectedProduct &&
                  element.selectedProduct.orderReqColor) ? element.selectedProduct.orderReqColor.toUpperCase() : "")

              },
              {
                "Name": "MODEL",
                "Value": ((element && element.selectedProduct &&
                  element.selectedProduct.orderReqModel) ? element.selectedProduct.orderReqModel.toUpperCase() : "")
              },
              {
                "Name": "PRODUCT",
                "Value": "DEVICE"
              }
              ]
            }]
          };
          itemDetailRequest.push(item);
        }
      });
    }
    const deviceComboRequest = [];
      if (this.comboDeviceDetails) {
        const deviceComboItem = {
          "ProductType": "HP",
          "PartNum": this.comboDeviceDetails?.orderReqPartNumber || " ",
          "Quantity": "1",
          "listOfAttributes": [{
            "attributes": [{
              "Name": "BRAND",
              "Value": this.comboDeviceDetails?.orderReqBrand || " "
            },
            {
              "Name": "CATEGORY",
              "Value": this.comboDeviceDetails?.orderReqCategory || " "
            },
            {
              "Name": "COLOR",
              "Value": this.comboDeviceDetails?.orderReqColor || " "

            },
            {
              "Name": "MODEL",
              "Value": this.comboDeviceDetails?.orderReqModel || " "
            },
            {
              "Name": "PRODUCT",
              "Value": "DEVICE"
            }
            ]
          }]
        };
        deviceComboRequest.push(deviceComboItem);
        itemDetailRequest = [...itemDetailRequest, ...deviceComboRequest];
      }

    const details = {
      "orderData":
      {
        "currency_id": "MYR",
        "email": this.checkoutData.customer.email,
        "is_prepaid": this.mnpFlow ? undefined : this.isPrepaid, // ? No need to send this for Xpax MNP
        "pre_payment": this.o2oDealerCustomerData.prePayment, // ? Dealer's Portal Customer Prepayment
        "billing_address": {
          "firstname": this.checkoutData.customer.firstname,
          "lastname": this.checkoutData.customer.lastname,
          "address_line_1": this.billingAddress.address_line_1,
          "address_line_2": this.billingAddress.address_line_2,
          "city": this.billingAddress.city,
          "country_id": this.countryDetails.id,
          "region": this.billingAddress.region,
          "region_id": this.billingAddress.region_id,
          "postcode": this.billingAddress.postcode,
          "telephone": this.billingAddress.telephone ? this.billingAddress.telephone : "",
          "save_in_address_book": this.checkoutData.billing_address ? this.checkoutData.billing_address.save_in_address_book : ""
        },
        "shipping_address": {
          "firstname": this.checkoutData.customer.firstname,
          "lastname": this.checkoutData.customer.lastname,
          "address_line_1": this.shippingAddress.address_line_1,
          "address_line_2": this.shippingAddress.address_line_2,
          "city": this.shippingAddress.city,
          "country_id": this.countryDetails.id,
          "region": this.shippingAddress.region,
          "region_id": this.shippingAddress.region_id,
          "postcode": this.shippingAddress.postcode,
          "telephone": this.shippingAddress.telephone ? this.shippingAddress.telephone : "",
          "save_in_address_book": this.checkoutData.shipping_address ? this.checkoutData.shipping_address.save_in_address_book : ""
        },
        "request_data": {
          "preferred_contact_method": this.preferredContactMethod
        },
        "auto_billing" : this.hasAutoBilling ? 1 : 0,
        "quoteId": this.checkoutData.id,
        "itemId": this.cart.items[0].item_id,
         // For Autobilling check in magento
         "isEasyphone" : this.isEasyPhone,
         "mobilenumber" : mobilenumber,
      },
      "stockReserveQuantityInput": {
        "storeId": this.outletId,
        "reservationId": "IT000016",
        "listOfItemDetailRequest": {
          "itemDetailRequest": itemDetailRequest
        }
      }
    };
    const postUrl = "/rest/V1/create-order";
    this._service.postEstoreUserData(postUrl, details).subscribe((response: any) => {
      if (response[0] && response[0].order_id && response[0].created_at) {
        this.responseorderid = response[0].order_id;
        this.redirectToPG = response[0].redirect;

        // ? Setting payment gateway URL for all flows
        // ? Except CS Agent and O2O dealer's portal prepayment
        if (
          response[0].redirect_url &&
          !(this.isCSAgent || this.o2oDealerCustomerData.prePayment)
          ) {
            this.paymentGatewayURL = response[0].redirect_url;
          }

        this.submissionStatus = response[0].submission_status;
        this.responseCreatedAt = response[0].created_at;
        if (this.isEasyPhone) {
          if (response[0].autopayment) {
            this.autoBillingFlag = response[0].autopayment;
            localStorage.setItem("AutoBillingFlag", JSON.stringify(this.autoBillingFlag));
           }
        }
        // Add magento order id in localstorage for later use.
        if (typeof window !== "undefined" && localStorage) {
          localStorage.setItem("magentoID", this.responseorderid);
          localStorage.setItem("transDate", this.responseCreatedAt);
        }
        this.proceedAfterStockCheck();
        /*
        * Adding Cart to local storage with a different name so that it can be retrieved
        * in Thank You page post payment and actual cart variable can be removed from localStorage once order is placed
        */
        if (localStorage) {
          localStorage.setItem("TYCart", JSON.stringify(this.checkoutData));
        }

        // Remove if exists.
        if (localStorage && localStorage.getItem("SIEBEL_ORDER_ID")) {
          localStorage.removeItem("SIEBEL_ORDER_ID");
        }
      } else if (response[0].status === false && response[0].message !== null && response[0].type !== null) {
        const resp = response[0].type;
        resp.forEach(args => this.manageShippingDetails(args));
        /* response[0].type.forEach(element => {
          if(element.includes("billing","email")) {
            this.editShippingAddress("top");
          }
          if(element === "shipping") {
            this.editShippingAddress("bottom");
          }
        }); */
        if(!isNullOrUndefined(response[0]['message'])){
          this.errorCreateOrder = true;
        this.errorCreateOrderData = {
          title: "Uh Oh!",
          content: response[0]['message'] || this.errorConst.SYS_DOWN_MSG,
          button: 'Got it!',
        };
      }
        document.documentElement.scrollTop = 0;
        return ;
      } else {
        this.errorStockNotAvail = true;
        this.errorMessage = {};
        this.errorMessage.content = this.errorConst.SYS_DOWN_MSG;
      }
      if (this.errorMessage?.content) {
        this._globalErrorHandler.errorObjectConvert(this.errorMessage.content);
      }
    }, (errorResponse: any) => {
      // error
      if (typeof window !== 'undefined') {
        if (!errorResponse.error.success) {
          this.sessionInvalid = true;
        } else {
          this.errorStockNotAvail = true;
          this.errorMessage = {};
          this.errorMessage.content = "Uh Oh. Device is now out of stock. Please select another device.";
        }
        if (this.errorMessage?.content) {
          this._globalErrorHandler.errorObjectConvert(this.errorMessage.content);
        }
      }
    });
  }
  }

  getCustomerRetrievalAddress() {
    const CustomerRetrievalAddress = {
      street: [
        this.userInfo.outputCPResp.streetAddress
      ],
      city: this.userInfo.outputCPResp.city,
      postcode: this.userInfo.outputCPResp.postalCode,
      region: {
        region: this.userInfo.outputCPResp.state
      },
      country_id: this.userInfo.outputCPResp.country,
      telephone: this.userInfo.outputCPResp.services[0]["mobileNumber"],
      custom_attributes: [
        {
          value: "",
        }
      ],
      residence_type: this.userInfo.outputCPResp.addressYType
    };
    return CustomerRetrievalAddress;
  }

  scrollToAddressSection() {
    if (this.deliveryMethodAnchor) {
      this.deliveryMethodAnchor.nativeElement.scrollIntoView({
        behavior: "smooth"
      });
    }
  }

  scrollToDeliveryAddressSection() {
    if (this.deliveryAddressAnchor) {
      this.deliveryAddressAnchor.nativeElement.scrollIntoView({
        behavior: "smooth"
      });
    }
  }

  confirmBeforeProceed(cb) {
    this._modalService.showConfirm({
      title: 'Important Note',
      message: 'Please note that you are not allowed to cancel this order or request for change of plan, device, and delivery address after completing your order.',
      btnConfirm: 'Agree'
    })
    .subscribe(result => {
      if (result) cb();
    });
  }

  paymentGateway(paymentOptions: IPaymentOptions = {}) {
    //* Standard & Premium Delivery starts
    // validation for delivery address
    if (this.editDeliveryMethod || (!this.isDeliveryTypeSelected && !this.isCobp)) {
      if (this.selectedDeliverAddress === "") {
        this.addressErrorMsg = "Please select delivery to the billing address or to a different address";
        this.scrollToAddressSection();
        return false;
      }
      
      if (this.selectedDeliverAddress === "different" && this.editStdAddress) {
        if (!this.standardAddress.valid) {
          this.standardAddress.markAllAsTouched();
        } else {
          this.differentAddressErrorMsg = `Please click "Update" if you would like your order to be delivered to a different address`;
        }
        this.scrollToDeliveryAddressSection();
        return false;
      }

      if (this.selectedDeliveryMethod.code === 'EXP') {
        if (!this.premiumAddress.valid) {
          this.premiumAddress.markAllAsTouched();
        } else {
          this.premiumAddressErrorMsg = `Please click "Update" if you would like your order to be delivered to a different address`;
        }
        this.scrollToDeliveryAddressSection();
        return false;
      }
    }
    //* Standard & Premium Delivery end

    // ? Do not proceed if Empty email
    if (!this.personalDetails.displayEmail) {
      this.toggleEditEmail();
      window.scrollTo(0, 300);
      return null;
    }

    this.confirmBeforeProceed(() => {
      // ? For dealer portal prepayment
      if (paymentOptions.prePayment) {
        this.o2oDealerCustomerData.prePayment = true;
      }

      this.disableProceedToPay = true;
      this.reserveTimeOut = this.cartService.deviceReservervationTimeout(
        this.componentLoadedTime, this.cartItemAddedTime
      );
      // For preorder device & normal bundle and device reservation time out.
      if (
        this.reserveTimeOut &&
        sessionStorage &&
        !sessionStorage.getItem('CAorderId') &&
        !sessionStorage.getItem('secretKey')
      ) {
        this.cartItemUnreservation = {};
        this.cartItemUnreservation.content = true;
        this.cartItemUnreservation.itemdetails = this.checkoutData.all_items[0];
        this.cartItemUnreservation.cartItems = this.cart.items;
        this.IsDisplayIdlePopup = true;

      } else {
        // Normal bundle, plan only and device reservation not timed out.
        this.redirectPaymentGateway();
      }
    });
  }

  redirectPaymentGateway() {
    if (this.isProceed2PayDisable) {
      return false;
    }
     this.createMagentoOrderId();
  }

  callPaymentGateWayURL() {
    let getURL = this.paymentGatewayURL;
    getURL = getURL.replace(/[+_]/g, '%2B');
    this.RedirectToGateway(getURL);
  }

  RedirectToGateway(paymentURL) {
    if (this.redirectToPG && paymentURL && paymentURL !== "") {
      window.location.href = paymentURL;
    } else {
      this.redirectPlanOnly();
    }
  }

  RoundingOff(totalAmtToSend) {
    return this._commonUtilService.RoundingOff2String(totalAmtToSend);
  }

  RoundingOff2Number(value) {
    return this._commonUtilService.RoundingOff2Number(value);
  }


  proceedAfterStockCheck() {
    /*
      * Adding Cart to local storage with a different name so that it can be retrieved
      * in Thank You page post payment and actual cart variable can be removed from localStorage once order is placed
      */
     if (typeof window !== 'undefined' && sessionStorage.getItem('CAorderId') || sessionStorage.getItem('secretKey')) {
      sessionStorage.removeItem('CAorderId');
      sessionStorage.removeItem('secretKey');
     }
    if (localStorage) {
      localStorage.setItem("TYCart", JSON.stringify(this.checkoutData));
    }
    // Remove if exists.
    if (localStorage && localStorage.getItem("SIEBEL_ORDER_ID")) {
      localStorage.removeItem("SIEBEL_ORDER_ID");
    }
    localStorage.removeItem("MNP-FLOW");
    if (this.isBroadband && !this.mnpFlow && !this.cobpFlowNoUpFront && !this.redirectToPG) {
      this.hwOrderCreation();
    } else if (this.isCSAgent || this.o2oDealerCustomerData.prePayment) {
        // ? Resetting Dealer's Portal Customer Pre-payment
        if (this.o2oDealerCustomerData.prePayment) {
          this.o2oDealerCustomerData.prePayment = false;
        }

        if (typeof window !== 'undefined' && localStorage && this.responseorderid) {
          if (this.cobpFlowNoUpFront && !this.redirectToPG) {
            // if (this.redirectToPG) {
            //   this.agentThankyouPage();
            // } else {
              localStorage.setItem('COBP-ORDER-ID', this.responseorderid);
              this.createCobpOrder();
          //  }
          } else if (this.mnpFlow && !this.redirectToPG) {
            localStorage.setItem('MNP-ORDER-ID', this.responseorderid);
            this.createMnpOrder();
          } else {
            this.agentThankyouPage();
          }
        }
    } else {
      if (typeof window !== 'undefined' && localStorage && this.responseorderid) {
        if (this.cobpFlowNoUpFront && !this.redirectToPG) {
          // if (this.isEasyPhone && this.autoBillingFlag === 'N') {
          //   this.callNewTokeniserApi();
          // } else {
            localStorage.setItem('COBP-ORDER-ID', this.responseorderid);
            this.createCobpOrder();
         // }
        } else if (this.mnpFlow && !this.redirectToPG) {
          localStorage.setItem('MNP-ORDER-ID', this.responseorderid);
          this.createMnpOrder();
        } else if (this.isPlanOnly && !this.redirectToPG) {
          this.redirectPlanOnly();
        } else {
          this.callPaymentGateWayURL();
        }
      }
    }
  }

  backToCart() {
    this._router.navigateByUrl(this.cartUrl);
  }

  editShippingAddress(editPosition) {
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("EditAddress", "new");
    }
    if(editPosition === 'top' && !this.isPrepaid) this.showEditBillingAddress = !this.showEditBillingAddress;
    //if(editPosition === 'bottom') this.showEditDelivery = !this.showEditDelivery;

    //* Standard & Premium Delivery starts
    if(editPosition === 'bottom') {
      //this.editStdAddress = !this.editStdAddress;

      this.selectedDeliverAddress =  (this.selectedDeliveryMethod.code === 'standard' && !this.isSameAddress()) ? 'different' : 'billing';
      this.defaultSelectedDeliveryMethod = this.selectedDeliveryMethod.code;
      this.defaultSelectedDifferentAddress = this.selectedDeliverAddress === 'different';
      this.selectDeliveryMethod(this.selectedDeliveryMethod);
    }
    //* Standard & Premium Delivery end
  }

  setDefaultBilling() {
    if (this.checkoutData && this.checkoutData.billing_address && this.checkoutData.billing_address !== null) {
        this.addr = this.checkoutData.billing_address.billing_unit_number || '';
        this.addrline1 = this.checkoutData.billing_address.address_line_1 || '';
        this.addrline2 = this.checkoutData.billing_address.address_line_2 || '';
        this.postCode = this.checkoutData.billing_address.postcode || '';
        this.cities = this.checkoutData.billing_address.city || '';
        this.states = this.checkoutData.billing_address.region_id || '';
      }
  }

  addressUnitValidation = (event) => helper.addressValidationHelper(event);
  postalCodeValidation = (event) => helper.postalCodeValidationHelper(event);
  cityValidation = (event) => helper.cityValidationHelper(event);


  failurePageRedirection() {
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("OrderFailure", "true");
    }
    window.location.href = this.failureurl;
  }

  public autoPayURL() {
    let autoURL = this.paymentGatewayURL;
        autoURL = autoURL.replace(/[+_]/g, '%2B');
        this.RedirectToGateway(autoURL);
  }

  public hwOrderCreation() {
      if (this.redirectToPG) {
        this.autoPayURL();
      } else if (this.submissionStatus && !this.redirectToPG) {
          if (typeof window !== "undefined" && localStorage) {
            localStorage.setItem("PLAN_TRANSACTION_ID", this.responseorderid);
          }
          window.location.href = this.thankyoupageUrl +
          this.responseorderid + "&totalAmount=0&orderstatus=true";
        } else if (!this.submissionStatus) {
          this.failurePageRedirection();
        }
    }


  createMnpOrder() {
    if (window && localStorage) {
      // this.mnpCustomer = JSON.parse(localStorage.getItem("MNP-CUSTOMER"));
      if (localStorage.getItem("MNP-PRE-SELECT")) {
        localStorage.removeItem("MNP-PRE-SELECT");
      }
      if (localStorage.getItem("MNP-CUSTOMER")) {
        localStorage.removeItem("MNP-CUSTOMER");
      }
      if (localStorage.getItem("MNP-EDIT")) {
        localStorage.removeItem("MNP-EDIT");
      }
      if (localStorage.getItem("MNP-FLOW")) {
        localStorage.removeItem("MNP-FLOW");
      }
    }
    if (this.redirectToPG) {
      this.autoPayURL();
    } else if (!this.redirectToPG && this.submissionStatus) {
          if (typeof window !== "undefined" && localStorage) {
            localStorage.setItem("PLAN_TRANSACTION_ID", this.responseorderid);
          }
          if (typeof window !== "undefined" && localStorage && sessionStorage &&
            sessionStorage.getItem("OLD_GUEST_USER") && sessionStorage.getItem("OLD_GUEST_USER") === "NO") {
            localStorage.setItem("NEW_GUEST_USER" , "YES");
          }
          // redirect to success page
          window.location.href = this.thankyoupageUrl +
           this.responseorderid + "&totalAmount=0&orderstatus=true";
        } else if (!this.submissionStatus) {
          this.failurePageRedirection();
        }
    if (localStorage && localStorage.getItem("GUEST_CART_ID")) {
      localStorage.removeItem("GUEST_CART_ID");
    }
  }

  public createCobpOrder() {
    if (this.redirectToPG) {
      this.autoPayURL();
    } else if (!this.redirectToPG && this.submissionStatus) {
      if (localStorage && localStorage.getItem("COBP_FLOW")) {
        localStorage.removeItem("COBP_FLOW");
      }
      if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem("PLAN_TRANSACTION_ID", this.responseorderid);
      }
      window.location.href = this.thankyoupageUrl +
       this.responseorderid + "&totalAmount=0&orderstatus=true";
    } else if (!this.submissionStatus) {
      this.failurePageRedirection();
    }
  }

  public redirectPlanOnly() {
    if (this.redirectToPG) {
      this.autoPayURL();
    } else if (!this.redirectToPG && this.submissionStatus) {
      if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem("PLAN_TRANSACTION_ID", this.responseorderid);
      }
      window.location.href = `${this.thankyoupageUrl}${this.responseorderid}&totalAmount=0&orderstatus=true`;
    } else if (!this.submissionStatus) {
      this.failurePageRedirection();
    }
  }
  callNewTokeniserApi() {
    let getTokenizerURL = this.paymentGatewayURL;
    getTokenizerURL = getTokenizerURL.replace(/[+_]/g, '%2B');
    this.RedirectToGateway(getTokenizerURL);
  }
  agentThankyouPage() {
    window.location.href = this.thankyoupageUrl +
     this.responseorderid + "&totalAmount=" + this.cart.grossTotal + "&orderstatus=true";
  }
  isZeroPaymentFlow(): boolean {
    return (
      this.isBroadband ||
      this.mnpFlow ||
      this.cobpFlowNoUpFront ||
      this.isCSAgent ||
      this.isPlanOnly ||
      this.isThirdPartyOrder.flag
      // ||
      // Number(this.cart.grossTotal) === 0
    );
  }
  recordOptedBillingType(checked: any) {
   if (checked === 'checked') {
    if (this.userSelectionOfBillingType === 1) {
      this.userSelectionOfBillingType = 0;
      this.isAutoBillingMandatory = false;
      this.hasAutoBilling = false;
    } else {
      this.userSelectionOfBillingType = 1;
      this.isAutoBillingMandatory = true;
      this.hasAutoBilling = true;
    }
   }
  }

  onSubmitEditBilling() {
    let msisdn = '';
    if (localStorage && localStorage.getItem("MyMsIsdn") && this.userService.isMCUser()) {
      msisdn = localStorage.getItem("MyMsIsdn");
    }
      const body = {
        "data": {
          "cart_id": this.checkoutData.id || '',
          "fname": this.checkoutData.customer.firstname || '',
          "lname": this.checkoutData.customer.lastname|| '',
          "id": '',
          "customerId": this.checkoutData.customer.id || '',
          "stateId": this.states || '',
          "postCode": this.postCode || '',
          "city": this.cities || '',
          "address_line_1": this.addrline1 || '',
          "address_line_2": this.addrline2 || '',
          "phone": this.getMobileNumber() || '',
          "salutation": this.personalDetails.displaySalutation || '',
          "unit_no": this.addr || '',
          "is_shipping": false,
          "msisdnNumber": msisdn || '',
          "alternate_contact_number": this.checkoutData.customerOtherInfo.alternate_contact_number || ''
        }
      };
      const req = [];
      req.push(
        this._service.postEstoreUserData('/rest/V1/addshipping', body)
      );
      if ((this.isSameAddress())) {
        const shippingBody = {
          ...body,
          data: {
            ...body.data,
            is_shipping: true,
          }
        }
        req.push(
          this._service.postEstoreUserData('/rest/V1/addshipping', shippingBody)
        );
      }
      forkJoin(req).subscribe(
        (..._resp) => {
          if(typeof window !== "undefined")
            this.redirectTo('/store/checkout/summary');
        },
        (..._err) => {
          this.isSystemDown = true
        }
      );
  }

  onCancelEditBillingAddress() {
    this.showEditBillingAddress = false;
  }
  onCancelEditDeliveryAddress() {
    this.showEditDelivery = false;
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

  isSameAddress = () => {
    const {billing_unit_number = '', address_line_1:addr1Bill = '', address_line_2:addr2Bill = '', postcode:pcBill = '', city:cityBill = '', region:regionBill = ''} = this.billingAddress;
    const {shipping_unit_number = '', address_line_1:addr1Ship = '', address_line_2:addr2Ship = '', postcode:pcShip = '', city:cityShip = '', region:regionShip = ''} = this.shippingAddress;
    return (billing_unit_number === shipping_unit_number && addr1Bill === addr1Ship &&
      addr2Bill === addr2Ship && pcBill === pcShip && cityBill === cityShip && regionBill === regionShip);
  }

  goTo(place) {
    if(typeof window !== "undefined" && sessionStorage) {
      const url = sessionStorage.getItem("backUrl");
      this._router.navigateByUrl(url);
    } else if(place === 'plan') {
      this._router.navigate(["/plans/" + this.checkoutData?.all_items?.[0]?.sku_bundle]);
    } else {
      this._router.navigate(["/store/devices"]);
    }
  }
  redirectTo(uri:string){
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this._router.navigate([uri]));
 }

  // * O2O Dealer's portal methods # start
  toggleO2oEditEmail(value = null): void {
    this.o2oDealerCustomerData.editing = value ?? !this.o2oDealerCustomerData.editing;
  }

  onO2oUpdateEmailCancel(): void {
    this.o2oDealerCustomerData = {
      ...this.o2oDealerCustomerData,
      editing: false,
      value: ''
    };
  }

  updateO2oCustomerEmail(): void {
    const updateProfileUrl = "/rest/V1/update-profile";
    const requestbody = {
      cart_id: this.checkoutData.id.toString(),
      data: {
        email: this.o2oDealerCustomerData.value      },
      };
      this
        ._service
        .postEstoreUserData(updateProfileUrl, requestbody)
        .subscribe(
          (response: any) => {
            if (response[0].status === true) {            this.personalDetails = {
              ...this.personalDetails,
              displayEmail: this.o2oDealerCustomerData.value
            };

            this.o2oDealerCustomerData = {
              ...this.o2oDealerCustomerData,
              value: '',
              editing: false
            };
          } else {
            this.o2oDealerCustomerData.error = {
              title: 'Uh Oh!',
              content: response[0]?.message ?? "Cannot update your email address!",
              button: 'Got it!'
            };
            if (
              typeof window !== 'undefined' && sessionStorage.getItem('CAorderId') ||
              sessionStorage.getItem('secretKey')
            ) {
              sessionStorage.removeItem('CAorderId');
              sessionStorage.removeItem('secretKey');
             }
          }
          if (this.o2oDealerCustomerData.error?.content) {
            this._globalErrorHandler.errorObjectConvert(this.o2oDealerCustomerData.error.content);
          }
        },
        (errorResponse: any) => {
          if (typeof window !== 'undefined') {
            this.o2oDealerCustomerData.error = {
              title: 'Uh Oh!',
              content: "Sorry for the inconvenience, we're giving our system a little update. Please try again later.",
              button: 'Got it!'
            };
            if (this.o2oDealerCustomerData.error?.content) {
              this._globalErrorHandler.errorObjectConvert(this.o2oDealerCustomerData.error.content);
            }
          }
        }
    );
  }
  // * O2O Dealer's portal methods # end

  // * Update email methods # start
  toggleEditEmail(): void {
    this.updateEmailData.editing = !this.updateEmailData.editing;
    if(this.updateEmailData.editing) {
      window.scrollTo(0,300);
    } else {
      window.scrollTo(0,0);
    }
  }

  toggleExpandTop(): void {
    this.isExpandedTop = !this.isExpandedTop;
    this.editStdAddress = !this.editStdAddress;
  }

  toggleExpandBottom(): void {
    this.isExpandedBottom = !this.isExpandedBottom;
  }

  updateEmail(): void {
    const updateProfileUrl = "/rest/V1/update-profile";
    const requestbody = {
      cart_id: this.checkoutData.id.toString(),
      data: {
        email: this.updateEmailData.emaildata
      },
    };
    this
      ._service
      .postEstoreUserData(updateProfileUrl, requestbody)
      .subscribe(
        (response: any) => {
          if (response[0].status === true) {
            this.disableProceedToPay = false;
            this.personalDetails = {
              ...this.personalDetails,
              displayEmail: this.updateEmailData.emaildata
            };
            sessionStorage.setItem('contactEmail', this.updateEmailData.emaildata);
            this.updateEmailData = {
              ...this.updateEmailData,
              editing: false
            };
          } else {
            this.disableProceedToPay = true;
            this.updateEmailData.error = {
              title: 'Uh Oh!',
              content: response[0]?.message ?? "Cannot update your email address!",
              button: 'Got it!'
            };
            if (
              typeof window !== 'undefined' && sessionStorage.getItem('CAorderId') ||
              sessionStorage.getItem('secretKey')
            ) {
              sessionStorage.removeItem('CAorderId');
              sessionStorage.removeItem('secretKey');
             }
          }
          if (this.updateEmailData.error?.content) {
            this._globalErrorHandler.errorObjectConvert(this.updateEmailData.error.content);
          }
        },
        (errorResponse: any) => {
          if (typeof window !== 'undefined') {
            this.o2oDealerCustomerData.error = {
              title: 'Uh Oh!',
              content: "Sorry for the inconvenience, we're giving our system a little update. Please try again later.",
              button: 'Got it!'
            };
            if (this.updateEmailData.error?.content) {
              this._globalErrorHandler.errorObjectConvert(this.updateEmailData.error.content);
            }
          }
        }
      );
  }


  isLegacyPlan(item) {
    try {
      return item.selectedProduct.orderPlanName.toLowerCase().startsWith('sime')
    } catch (_error) {

    }
    return false;
  }
  // * Update email methods # end

  onVoucherApplied() {
    if (this.isThirdPartyOrder.flag) {
      this.isThirdPartyOrder.btnDisabled = false;
    }
  }

  onVoucherRemoved() {
    if (this.isThirdPartyOrder.flag) {
      this.isThirdPartyOrder.btnDisabled = true;
    }
  }
}
