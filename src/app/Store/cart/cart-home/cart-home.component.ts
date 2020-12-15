import { Component, OnInit, Compiler, AfterViewInit, Pipe} from "@angular/core";
import { CartService } from "../../../Service/cart.service";
import { BaseComponent } from "../../../base.component";
import { ActivatedRoute, Router } from "@angular/router";
import { RedirectionService } from "../../../Service/redirection.service";
import { AppService } from "../../../Service/app.service";
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { Subscription } from "rxjs";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { Cart } from '../../../Model/cart.model';
import { CartItem } from '../../../Model/cart-item.model';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from '../../../Service/home.service';
import { BroadbandService } from '../../../Service/broadband.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import {RemarketAnalyticsService} from "../../../Service/remarket-analytics.service";
import { UserService } from '../../../Service/user.service';
@Component({
  selector: "app-cart-home",
  templateUrl: "./cart-home.component.html",
  styleUrls: ["./cart-home.component.css"],
  providers: [RedirectionService, CartService, RemarketAnalyticsService, BroadbandService]
})
export class CartHomeComponent extends BaseComponent implements OnInit, AfterViewInit {
  USER_TYPE = "USER_TYPE";
  public cart: any = {};
  public mnpCheck = false;
  public notification: any = false;
  public isCSAgentDealer = false;
  public suppData: any = [];
  public taxs = [];
  public upfrontInstallment = null;
  public isUpfrontInstallment = false;
  private subscriber: Subscription;
  personalForm: any;
  userToken: any;
  mnpFlow = false;
  cobpFlow = false;
  showCartEmpty = false;
  cartID: any;
  cartResponse: any;
  preorderchk: any;
  freeGiftInfo: any;
  cartProducts: any;
  cartDeviceResponse: any;
  GSTInPercentage: any;
  values: any = [];
  isPreorder = false;
  isNewbie = false;
  newbieMessage = "";
  summaryAddress = "/store/checkout/summary";
  cartItemAddedTime: number;
  componentLoadedTime: any;
  reserveTimeOut = false;
  cartItemUnreservation: any;
  IsDisplayIdlePopup = false;
  isEasyPhone = false;
  easyPhoneLabel: any;
  deviceUpfront: any;
  planUpfront: any;
  orderOneTimePay: any;
  deviceMonthlyCharge: any;
  planMonthlyCharge: any;
  EasyPhoneMonthlyCharges: any;
  public sessionInvalid = false;
  cookie_expire_in_days = this.appConstant.COOKIE_EXPIRE;
  ada_cookie_expire_in_days = this.appConstant.ADA_COOKIE_EXPIRE;
  reservationId = "";
  public additionalInfo = null;
  showEditDelete = true;
  public deviceUpfrontPenalty = 0;
  public isGoldenNumberSelected: any;
  public isUserGuest = false;
  public isDeviceOnlyClicked = false;
  isEsim = false;
  simType = "";
  public hasAutoBilling = false;
  isEnterprise = false;

  constructor(
    private _service: AppService,
    private cartService: CartService,
    private _router: Router,
    private _bbService: BroadbandService,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _deviceDataService: DeviceDataService,
    private _commonUtilService: CommonUtilService,
    @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _homeService: HomeService,
    private _userService: UserService,
    private cookieService: CookieService,
    private _renderer: Renderer2, private _compiler: Compiler,
    private _remarketAnalyticsService: RemarketAnalyticsService
  ) {
    super();
    this.GSTInPercentage = this.appConstant.GST_IN_PERCENTAGE;
  }

  ngOnInit() {
    this.subscriber = this._deviceDataService.voucherCode$.subscribe(
      data => {
        this.getCartDetails();
      }
    );
    this.componentLoadedTime = Date.now();
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }
    this.subscriber = this._deviceDataService.sharedNotification$.subscribe(
      data => (this.notification = data)
    );
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("AddToCartNotification")) {
      this.notification = localStorage.getItem("AddToCartNotification");
    }

    /* Added for enabling and disabling of the success errors and info popup's at the bottom */
    this.subscriber = this._deviceDataService.sharedBarNotificationBoolean$.subscribe(
      data => (this.notification = data)

    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.sessionInvalid = data));
    // cartmine
    this.getCartDetails();

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    // this.showCartEmpty = true;

    if (localStorage && localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
    }

    if (localStorage && localStorage.getItem("Eligible")) {
      localStorage.removeItem("Eligible");
    }
    if (localStorage.getItem("SelectedPlanDetailsInDevice")) {
      localStorage.removeItem("SelectedPlanDetailsInDevice");
    }
       if (localStorage) {
      localStorage.removeItem("checkToShowEditEligibilityBox");
      localStorage.removeItem("MNPCustomerData");
      localStorage.removeItem("MNPRedirectionToLoginPage");
      if (localStorage.getItem("addonCode")) {
        localStorage.removeItem("addonCode");
      }
      localStorage.removeItem('easyPhoneSelected');
      localStorage.removeItem('deviceBundleSelected');
      localStorage.removeItem("SuppLinesAdded");
      localStorage.removeItem("SupplementaryLinesEditingFromCart");
      localStorage.removeItem('suppNumber');
      localStorage.removeItem("PrincipleNumberSelected");
    }
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem('CAorderId') &&
    sessionStorage.getItem('CAorderId') !== null) {
      this.showEditDelete = false;
    }
  }
  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
    this._estoreAnalyticsService.SetCategoryTwoForAdobeDataLayer(this._renderer);
  }
  setVoucher() {
    this.cart.rebateAmount = this.cartResponse[0].all_items[0].rebate_amount;
    if (this.cartResponse[0] && this.cartResponse[0].all_items[0] && this.cartResponse[0].all_items[0].voucher_code &&
      this.cartResponse[0].all_items[0].voucher_code !== null &&
      this.cartResponse[0].all_items[0].voucher_code.length > 0) {
      const voucher = {
        voucherCode : this.cartResponse[0].all_items[0].voucher_code,
        voucherSuccessDesc : this.cartResponse[0].all_items[0].coupon_description,
        isVoucherCodeApplied : true
      };
      this._deviceDataService.publishVoucherOldCode(voucher);
    }
  }
  getCartDetails() {
    if (typeof window !== 'undefined') {
      if (sessionStorage && ['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE")) && sessionStorage.getItem("UserToken")) {
        const apiUrl = ApiConstant.CARTMINE_API;
        this.cartService.Find(apiUrl.trim()).subscribe(
          (response: any) => {
            if (response[0].status === false &&
               (response[0].message === "SESSION IN VALID" ||
              response[0].message === "SESSION INVALID")) {
              // invalidate the session
              this.sessionInvalid = true;
              // return the error message
              return false;
            }
            if (response !== undefined && response !== null) {
              this.cartResponse = response;
              // check cart items.
              if (this.cartResponse[0].all_items !== undefined) {
                this.cart.items = this.cartResponse[0].all_items[0];
                this.preorderchk = this.cartResponse[0].all_items[0];
                if (typeof window !== "undefined" && localStorage) {
                  // set cart details for unreservation
                  localStorage.setItem("cartDetailsUnservation",  JSON.stringify({all_items: this.cartResponse[0].all_items}));
                }
                // check cart length
                if (this.cartResponse[0].all_items.length === 0) {
                  this.notification = false;
                  this.showCartEmpty = true;
                } else {
                  // if no cart item
                  this.showCartEmpty = false;
                }
              }
              if (this.preorderchk !== undefined) {
                this.freeGiftInfo = this.preorderchk.selectedProduct.free_gift_data;
                this.isNewbie = this.preorderchk.is_newbie;
                this.newbieMessage = this.preorderchk.newbie_message;
              }
              if (this.cookieService.check('adaRemainingDays')) {
                this.addAffiliateScriptToHead();
              }
            }
            // Get added cart time only for preorder device for now.
            this.cartItemAddedTime = this.cartResponse[0].cart_session;
            this.persistingCartDetails();
            let deviceName = null;
            let planName = null;
            if (response[0].all_items.length > 0) {
              if(this.cart.items[0].billType === "2" || this.cart.items[0].billType === 2) {
                this.hasAutoBilling = true;
              }
              const selectedProduct = response[0].all_items[0].selectedProduct;
              deviceName = selectedProduct.orderDeviceName ? selectedProduct.orderDeviceName : null;
              planName = selectedProduct.selectedPlanDetails ? selectedProduct.selectedPlanDetails.name : null;
              this.additionalInfo = selectedProduct.selectedPlanDetails ? selectedProduct.selectedPlanDetails.additional_information : null;
              if(this.cart.items.bill_type === "2" || this.cart.items.bill_type === 2) {
                this.hasAutoBilling = true;
              }
            }
            const aiObject = {
              amount : this.RoundingOff(this.cartResponse[0].grossTotal),
              planName : undefined,
              deviceName : undefined
            };
            if ( deviceName !== null) {
              aiObject.deviceName = deviceName;
            }
            if ( planName !== null ) {
              aiObject.planName = planName;
            }
            this.cartService.updateCookieForAffiliateMarketing(aiObject, this.cookie_expire_in_days);
          },  (errorResponse: any) => {
            this.callErrorMessage(errorResponse);
          });
      } else if ( typeof window !== 'undefined' && localStorage && sessionStorage && localStorage.getItem("MyMsIsdn") &&
        sessionStorage.getItem("UserInfo")) {
        let apiUrl = ApiConstant.CARTMINE_API;
        if (sessionStorage && sessionStorage.getItem('CAorderId') &&
        sessionStorage.getItem('CAorderId') !== null && sessionStorage.getItem('secretKey') &&
        sessionStorage.getItem('secretKey') !== null) {
        const orderId = sessionStorage.getItem('CAorderId');
        const orderSecret = sessionStorage.getItem('secretKey');
         apiUrl = "/rest/V1/cartmine?order_id=" + orderId + "&order_secret=" + orderSecret;
      }
        this.cartService.Find(apiUrl.trim()).subscribe(
          (response: any) => {
            if (response[0].status === false &&
              (response[0].message === "SESSION IN VALID" || response[0].message === "SESSION INVALID")) {
              this.sessionInvalid = true;
              return false;
            }
            if (response !== null && response !== undefined) {
              this.cartResponse = response;
              if (this.cartResponse[0].all_items !== undefined) {
                this.preorderchk = this.cartResponse[0].all_items[0];
                this.cart.items = this.cartResponse[0].all_items[0];
                if (typeof window !== "undefined" && localStorage) {
                  localStorage.setItem("cartDetailsUnservation",  JSON.stringify({all_items: this.cartResponse[0].all_items}));
                }
                if (this.cartResponse[0].all_items.length === 0) {
                  this.showCartEmpty = true;
                  this.notification = false;
                } else {
                  if(this.cart.items.bill_type === "2" || this.cart.items.bill_type === 2) {
                    this.hasAutoBilling = true;
                  }
                  this.additionalInfo = this.cartResponse[0].all_items[0].selectedProduct.selectedPlanDetails ?
                     this.cartResponse[0].all_items[0].selectedProduct.selectedPlanDetails.additional_information : null;
                  this.showCartEmpty = false;
                  this.deviceUpfrontPenalty = this.cartResponse[0].all_items[0].device_upfront_penalty;
                }
              }
              if (this.preorderchk !== undefined) {
                this.freeGiftInfo = this.preorderchk.selectedProduct.free_gift_data;
                this.newbieMessage = this.preorderchk.newbie_message;
                this.isNewbie = this.preorderchk.is_newbie;
                this.isEasyPhone = this.preorderchk.is_easyphone;
                this.easyPhoneLabel = this.preorderchk.easyphone_label;
                this.isEsim = this.preorderchk.esim;
                this.simType = this.cartResponse[0].simType;
                if (this.easyPhoneLabel !== undefined && this.easyPhoneLabel.indexOf('Rent') > -1) {
                  this.easyPhoneLabel = "EasyPhone™ Rent (24 months contract)";
                }
                if (this.easyPhoneLabel !== undefined && this.easyPhoneLabel.indexOf('Own') > -1) {
                  this.easyPhoneLabel = "EasyPhone™ Own (24 months contract)";
                }
                if (this.isEasyPhone) {
                  this.deviceUpfront = this.preorderchk.selectedProduct.order_device_subt;
                  this.planUpfront = this.preorderchk.selectedProduct.order_plan_subt;
                  this.orderOneTimePay = this.preorderchk.selectedProduct.orderOneTimePay;
                  this.deviceMonthlyCharge = JSON.parse(this.preorderchk.selectedProduct.monthly_charges.device);
                  this.planMonthlyCharge = JSON.parse(this.preorderchk.selectedProduct.orderMonthlyPay);
                  this.EasyPhoneMonthlyCharges = Number(this.deviceMonthlyCharge) + Number(this.planMonthlyCharge);
                }
              }
              if (this.cookieService.check('adaRemainingDays')) {
                this.addAffiliateScriptToHead();
              }
            }
            // Get time since item in the cart.
            this.cartItemAddedTime = this.cartResponse[0].cart_session;
            this.persistingCartDetails();
          }, (errorResponse: any) => {
            this.callErrorMessage(errorResponse);
          });
      } else {
        this.showCartEmpty = true;
        this.notification = false;
      }

    }
  }
/**
* Formation of affiliate script and attaching to body.
*/
public addAffiliateScriptToHead() {
  // Ada pixel.
  const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
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
       fbq('track', 'AddToCart');`
    });
    adaObj.push({
      type: 'header_noscript_block',
      value: `<img height="1" width="1" src="https://www.facebook.com/tr?id=222287968473810&ev=PageView&noscript=1"/>`
    });
    this._homeService.ManageConfigurableScripts(adaObj);
  }
}
  persistingCartDetails() {
    if (this.cartResponse && this.cartResponse[0] && this.cartResponse[0].all_items && this.cartResponse[0].all_items.length > 0) {
      const cartTotal = 0;
      const cartItemArray = [];
      this.cartResponse[0].all_items.forEach(element => {
        const cartItem = new CartItem();
        cartItem.item_id = element.item_id;
        cartItem.itemTotal = element.itemTotal;
        cartItem.price = element.price;
        cartItem.quantity = element.quantity;
        cartItem.selectedProduct = element.selectedProduct;
        cartItem.sku = element.sku;
        cartItem.skuBundle = element.sku_bundle;
        cartItem.isPreorder = element.is_preorder;
        cartItem.easyPhoneLabel = element.easyphone_label;
        cartItem.availabilityFlag = element.preorder_availability_flag;
        cartItem.has_add_ons = element.has_add_ons;
        cartItem.add_on_label = element.add_on_label;
        cartItem.add_on_code = element.add_on_code;
        cartItem.promotion_details = element.promotion_details;
        cartItem.utm_source = element.utm_source;
        cartItem.is_campaign_mviva = element.is_campaign_mviva;
        cartItem.campaign100_days = element.campaign100_days;
        cartItem.campaign_mviva_url = element.campaign_mviva_url;
        cartItem.campaign_mviva_message = element.campaign_mviva_message;
        cartItem.billType = element.bill_type;
        cartItem.deviceUpfrontPenalty = Number(element.device_upfront_penalty);
       // this.deviceUpfrontPenalty = element.device_upfront_penalty
        cartItem.is_telco_day = (element.selectedProduct &&
           element.selectedProduct.selectedPlanDetails &&
           element.selectedProduct.selectedPlanDetails.telco_day && element.selectedProduct.selectedPlanDetails.telco_day.status) ?
             element.selectedProduct.selectedPlanDetails.telco_day.status : false;
          // set telco day data
        cartItem.telco_day_message = (element.selectedProduct && element.selectedProduct.selectedPlanDetails &&
          element.selectedProduct.selectedPlanDetails.telco_day && element.selectedProduct.selectedPlanDetails.telco_day.message) ?
            element.selectedProduct.selectedPlanDetails.telco_day.message : "";
        // add data to cart
        cartItemArray.push(cartItem);
        // set reservation id
        this.reservationId = element.reservation_id;
      });
      this.cart = new Cart();
      this.cart.items = cartItemArray;
      if (this.cart.items[0] && this.cart.items[0].selectedProduct && this.cart.items[0].selectedProduct.selectedPlanDetails) {
        this.isGoldenNumberSelected = this.cart.items[0].selectedProduct.selectedPlanDetails.is_golden_number;
      }
      this.taxs = this.cartResponse[0].tax.items;
      this.cart.grossTotal = this.cartResponse[0].grossTotal;
      this.cart.setTotalPrices(this.cart);
      this.suppData = this.cartResponse[0].supplementary_data;
      this.setVoucher();
      if (this.cartResponse[0] && this.cartResponse[0].all_items && this.cartResponse[0].all_items.length>0) {
        this.upfrontInstallment = this.cartResponse[0].all_items[0].upfront_installment;
      }
      if(this.upfrontInstallment) {
        this.isUpfrontInstallment = true;
      }
      if (this.cart.items[0] && this.cart.items[0].isPreorder && this.cart.items[0].isPreorder === 1) {
        this.isPreorder = true;
      }

      this.setFlowBasedOnCart();

      if (localStorage && localStorage.getItem("COBP_login") === "YES") {
        localStorage.removeItem("COBP_login");
      }

      if (localStorage && localStorage.getItem("COBP_login") === "YES") {
        localStorage.removeItem("COBP_login");
      }

      // For Adobe ANalytics
      this._estoreAnalyticsService.SetCartDetails(this.cart, this._renderer);
    } else {
      this.cart = null;
    }
  }

  // Flow
  public setFlowBasedOnCart() {
    if (this.cart.items[0].selectedProduct.orderNumberType && this.cart.items[0].selectedProduct.orderNumberType === 'KeepNumber') {
      if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem("COBP_FLOW", "YES");
      }
      this.cobpFlow = true;
      this.mnpFlow = false;
      this.confirmFlow();
    } else if (this.cart.items[0].selectedProduct.orderNumberType &&
      this.cart.items[0].selectedProduct.orderNumberType === 'SwitchToCelcom') {
      if (localStorage && localStorage.getItem("COBP_FLOW")) {
        localStorage.removeItem("COBP_FLOW");
      }
      if (typeof window !== "undefined" && localStorage) {
        localStorage.setItem("MNP-FLOW", "YES");
        localStorage.setItem("MNP-PRE-SELECT", "YES");
        const mnpCustomer = {
          customerID: '',
          customerIDType: '1',
          msisdn: '',
          portNumber: ''
        };
        if (this.cart.items[0].selectedProduct && this.cart.items[0].selectedProduct.orderPhoneNo) {
          mnpCustomer.portNumber = this.cart.items[0].selectedProduct.orderPhoneNo;
        }
        if (this.cart.items[0].selectedProduct && this.cart.items[0].selectedProduct.mnp_id) {
          mnpCustomer.customerID = this.cart.items[0].selectedProduct.mnp_id;
        }
        if (!localStorage.getItem('MNP-CUSTOMER')) {
          localStorage.setItem('MNP-CUSTOMER', JSON.stringify(mnpCustomer));
        }
      }
      this.mnpFlow = true;
      this.cobpFlow = false;
    } else if (this.cart.items[0].selectedProduct.orderNumberType && this.cart.items[0].selectedProduct.orderNumberType === 'NewNumber') {
      if (localStorage && localStorage.getItem("COBP_FLOW")) {
        localStorage.removeItem("COBP_FLOW");
      }
      this.mnpFlow = false;
      this.cobpFlow = false;
      this.confirmFlow();
    }
  }

  // Confirm MNP flow
  public confirmFlow() {
    if (localStorage.getItem('MNP-FLOW') === 'YES') {
      localStorage.removeItem('MNP-FLOW');
    }
    if (localStorage.getItem('MNP-PRE-SELECT') === 'YES') {
      localStorage.removeItem('MNP-PRE-SELECT');
    }
    if (localStorage.getItem('MNP-EDIT') === 'YES') {
      localStorage.removeItem('MNP-EDIT');
    }
    if (localStorage.getItem('MNP-CUSTOMER')) {
      localStorage.removeItem('MNP-CUSTOMER');
    }
    if (localStorage.getItem('MNPCustomerData')) {
      localStorage.removeItem("MNPCustomerData");
    }
  }

  removeCartItem(product: any) {
    this.cartService.removeProductFromCart(product);
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
      localStorage.removeItem("numberReservationId");
    }
    this.cart = this.cartService.retrieveCart();
    this._estoreAnalyticsService.SetCartDetails(this.cart, this._renderer);
    let removedIndex = -1;
    this.cart.items.forEach((item: any, index) => {
      if (item.sku === product.sku) {
        removedIndex = index;
      }
    });
    this.cart.items.splice(removedIndex, 1);
    this.confirmFlow();
    if (localStorage && localStorage.getItem('COBP_FLOW') === 'YES') {
      localStorage.removeItem("COBP_FLOW");
    }
    if (localStorage && localStorage.getItem("AddToCartNotification")) {
      localStorage.removeItem("AddToCartNotification");
    }
    localStorage.removeItem("suppLinesAddedByTheUser");
    localStorage.removeItem("supplementryFlow");
    localStorage.removeItem("SupplementaryLinesEditingFromCart");
    localStorage.removeItem('selectionAfterLogin');
    this._compiler.clearCache();
  }

  calculateTotalAmount(x, y) {
    const value = parseFloat(x);
    const monthly = parseFloat(y);
    return value + monthly;
  }

  RoundingOff(value: number): number {
    return this._commonUtilService.RoundingOff2Number(value);
  }

  editableProduct(i) {
    const productData = this.cartResponse[0].all_items[0].is_easyphone;
    const isHWitem = this.cartResponse[0].all_items[0].is_broadband;
    const isESIM = this.cartResponse[0].all_items[0].esim;
    if (isESIM === true) {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('eSIM-EDIT', JSON.stringify(this.cartResponse[0].all_items[0]));
      }
      this.Redirect("/esim");
    } else if (isHWitem === true) {
      this._bbService.preserveHomeWirelessEditData(this.cartResponse[0].all_items[0]);
    } else {
    if (typeof window !== 'undefined' && localStorage && this.reservationId !== "") {
      localStorage.setItem("numberReservationId", JSON.stringify(this.reservationId));
    }
    if (localStorage && localStorage.getItem("MNP-FLOW") === "YES") {
      localStorage.setItem('MNP-EDIT', 'YES');
    }
    if (localStorage && localStorage.getItem("COBP_FLOW") === "YES") {
      localStorage.setItem('COBP_EDIT', 'YES');
    }
    const cartProducts = this.cart.items;
    cartProducts.forEach(item => {
      if (cartProducts.indexOf(item) === i) {
        if (typeof window !== "undefined") {
          item.is_easyphone = productData;
          localStorage.setItem("CartEditProduct", JSON.stringify(item));
          localStorage.setItem("Edit-flow", "true");
          if (this.suppData != null && this.suppData.length > 0) {
            localStorage.setItem("SupplementaryLinesEditingFromCart", JSON.stringify(this.suppData));
            localStorage.setItem('SuppLinesAdded', JSON.parse(localStorage.getItem("SupplementaryLinesEditingFromCart")).length);
          }
          if (localStorage && localStorage.getItem("MNP-FLOW") === "YES" && localStorage.getItem("MNP-CUSTOMER")) {
            const MNPdata = JSON.parse(localStorage.getItem("MNP-CUSTOMER"));
            MNPdata.portNumber = item.selectedProduct.orderPhoneNo;
            localStorage.setItem("MNP-CUSTOMER", JSON.stringify(MNPdata));
          }
          if ((item.skuBundle && !item.selectedProduct.is_moon) || (item.skuBundle === "Star-Plan-Bundle")) {
            // check for bundle
            if (item.selectedProduct.orderPlan && !item.selectedProduct.orderDevice) {
              if (item.campaign_mviva_url && item.is_campaign_mviva) {
                // redirect to mviva url
                this.Redirect(item.campaign_mviva_url);
                // check if lifestyle
              } else if (item.has_add_ons) {
                let promoUrl;
                // set promotion url for lifestyle
                promoUrl = "?promotiondetails=" + item.promotion_details + "&LS=" + item.add_on_code;
                promoUrl += "&plan=" + this.getPlanUrlBySku(item.selectedProduct.orderPlan) + "&utm_source=" + item.utm_source;
                this.Redirect(item.selectedProduct.selectedPlanDetails.BuynowLink + promoUrl);
              } else {
                // redirect to buy link
                this.Redirect(item.selectedProduct.selectedPlanDetails.BuynowLink);
              }
            } else {
              // check mviva
              if (item.is_campaign_mviva && item.campaign_mviva_url) {
                // redirect back to mviva
                this.Redirect(item.campaign_mviva_url);
              } else if (item.has_add_ons) {
                // set promotion url
                let promUrl;
                promUrl = "?promotiondetails=" + item.promotion_details + "&LS=" + item.add_on_code;
                promUrl += "&plan=" + this.getPlanUrlBySku(item.selectedProduct.orderPlan) + "&utm_source=" + item.utm_source;
                this.Redirect("/device-detail/" + item.skuBundle + promUrl);
              } else {
                // redirect back to device detail
                this.Redirect("/device-detail/" + item.skuBundle);
              }
            }
          } else if ((!item.skuBundle && !item.selectedProduct.is_moon) || (item.skuBundle === "Star-Plan-Bundle")) {
            if ((item.selectedProduct.orderPlan && !item.selectedProduct.orderDevice) || (item.skuBundle === "Star-Plan-Bundle")) {
              if (item.is_campaign_mviva && item.campaign_mviva_url) {
                this.Redirect(item.campaign_mviva_url);
              } else if (item.has_add_ons) {
                let promotionUrl;
                promotionUrl = "?promotiondetails=" + item.promotion_details + "&LS=" + item.add_on_code;
                promotionUrl += "&plan=" + this.getPlanUrlBySku(item.selectedProduct.orderPlan) + "&utm_source=" + item.utm_source;
                this.Redirect(item.selectedProduct.selectedPlanDetails.BuynowLink + promotionUrl);
              } else {
                this.Redirect(item.selectedProduct.selectedPlanDetails.BuynowLink);
              }
            } else {
              if (item.is_campaign_mviva && item.campaign_mviva_url) {
                this.Redirect(item.campaign_mviva_url);
              } else if (item.has_add_ons) {
                let promotionUrl;
                promotionUrl = "?promotiondetails=" + item.promotion_details + "&LS=" + item.add_on_code;
                promotionUrl += "&plan=" + this.getPlanUrlBySku(item.selectedProduct.orderPlan) + "&utm_source=" + item.utm_source;
                this.Redirect("/device-detail/" + item.skuBundle + promotionUrl);
              } else {
                this.Redirect("/device-detail/" + item.sku);
              }
            }
          } else if (item.skuBundle && item.selectedProduct.is_moon) {
            if (item.selectedProduct.is_moon && item.is_campaign_mviva && item.campaign_mviva_url) {
              this.Redirect(item.campaign_mviva_url);
            } else {
            this.Redirect("/plans/xp-lite");
            }
          }
        }
      }
    });
  }
}

  // Empty cart page redirections
  redirectShop(shopType) {
    if(typeof window !== "undefined" && sessionStorage && sessionStorage.getItem('enterprise_plan') && sessionStorage.getItem('enterprise_plan') !== null) {
      this.isEnterprise = true;
    }
    switch (shopType) {
      // Redirect to plan list page.
      case "plans":
        this.isEnterprise ? this._router.navigate(["/store/enterprise/landing"]) : this._router.navigate(["/plans/mega"]);
        // this._router.navigate(["/personal/postpaid"]);
        // this._router.navigateByUrl("/plans/ultra");
        break;
      // Redirect to device catalogue page.
      case "devices":
        this._router.navigate(["/store/devices"]);
        break;
    }
  }

  redirectCheckout() {
    this.reserveTimeOut = this.cartService.deviceReservervationTimeout(this.componentLoadedTime, this.cartItemAddedTime);
    // For preorder device & normal bundle and device reservation time out.
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem('CAorderId') &&
    sessionStorage.getItem('CAorderId') !== null && sessionStorage.getItem('secretKey') &&
    sessionStorage.getItem('secretKey') !== null) {
    this._router.navigateByUrl('/store/checkout/summary');
    } else if (this.reserveTimeOut) {
      this.cartItemUnreservation = {};
      this.cartItemUnreservation.content = true;
      this.cartItemUnreservation.itemdetails = this.cartResponse[0].all_items[0];
      this.cartItemUnreservation.cartItems = this.cart.items;
      this.IsDisplayIdlePopup = true;
    } else {
      // Normal bundle, plan only and device reservation not timed out.
      this.redirectCheckoutNext();
    }
    localStorage.removeItem("suppLinesAddedByTheUser");
    localStorage.removeItem("suppLinesAddedByTheUser");
    localStorage.removeItem("supplementryFlow");
    localStorage.removeItem("SupplementaryLinesEditingFromCart");
  }

  redirectCheckoutNext() {
    if (typeof window !== "undefined") {
      if (sessionStorage && ["GUEST", "ENTERPRISE"].includes(sessionStorage.getItem(this.USER_TYPE))) {
        const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
        if (sessionStorage && sessionStorage.getItem("OLD_GUEST_USER") === "YES" || (userInfo && userInfo['outputCPResp'] && userInfo['outputCPResp']['contactEmail'])) {
          this.skipPersonalInfoForm();
        } else {
          // Href redirection for ADA event capture.
          window.location.href = "/store/checkout/personal-details";
        }
      } else {
        // this._router.navigateByUrl("/store/checkout");
        this.Redirect("/store/checkout/summary");
      }
      if (localStorage && localStorage.getItem("AddToCartNotification")) {
        localStorage.removeItem("AddToCartNotification");
      }
    }
  }

  redirectShopDetails() {
    const self = this;
    setTimeout(function () {
      self.IsDisplayIdlePopup = false;
    }, 0);
  }

  skipPersonalInfoForm() {
    if (typeof window !== "undefined") {
      if (sessionStorage && sessionStorage.getItem("GuestInfo") && (["GUEST", "ENTERPRISE"].includes(sessionStorage.getItem("USER_TYPE"))) &&
        sessionStorage.getItem("UserToken")) {
        this.setGuestInfo();
      } else {
        const details = JSON.parse(sessionStorage.getItem("GuestInfo"));
        this.personalForm = details;
        this.guestCheckoutCreateAccount();
      }
    }
  }

  guestCheckoutCreateAccount() {
    // const fullname = this.cartService.splitName(this.personalForm.outputCPResp.contactFirstName + " " +
    // this.personalForm.outputCPResp.contactLastName);
    const request = {
      data: {
        firstname: this.personalForm.outputCPResp.contactFirstName,
        lastname: this.personalForm.outputCPResp.contactLastName,
        customer_full_name: this.personalForm.outputCPResp.name,
        email: this.personalForm.outputCPResp.contactEmail,
        salutation: this.personalForm.outputCPResp.salutation,
        gender: this.personalForm.outputCPResp.gender,
        mobilenumber: this.personalForm.outputCPResp.contactMobileNum,
        customerIDNo: this.personalForm.outputCPResp.customerID,
        customerIDType: this.personalForm.outputCPResp.customerIDType,
        billing_city: this.personalForm.outputCPResp.city,
        billing_telephone: this.personalForm.outputCPResp.contactMobileNum,
        billing_fax: "",
        billing_state: this.personalForm.outputCPResp.state,
        billing_postcode: this.personalForm.outputCPResp.postalCode,
        billing_address_line_1: this.cartResponse[0].billing_address.address_line_1,
        billing_address_line_2: this.cartResponse[0].billing_address.address_line_2,
        billing_country_id: 'MY',
        billing_unit_no: this.personalForm.outputCPResp.unitNo,
        shipping_city: this.personalForm.outputCPResp.city,
        shipping_telephone: this.personalForm.outputCPResp.contactMobileNum,
        shipping_fax: "",
        shipping_state: this.personalForm.outputCPResp.state,
        shipping_postcode: this.personalForm.outputCPResp.postalCode,
        shipping_country_id: 'MY',
        shipping_address_line_1: this.cartResponse[0].shipping_address.address_line_1,
        shipping_address_line_2: this.cartResponse[0].shipping_address.address_line_2,
        date_Of_birth: this.personalForm.outputCPResp.dateOfBirth,
        preferable_contact_method: this.personalForm.outputCPResp.preferredContactMethod,
        state_code: this.personalForm.outputCPResp.state,
        created: this.cartService.createNow(),
        shipping_unit_no: this.personalForm.outputCPResp.unitNo,
      }
    };
    this.cartService.guestCheckoutApi(request).subscribe(
      (response: any) => {
        if (typeof window !== 'undefined' && sessionStorage) {
          this.userToken = response[0]["guestToken"];
          if (this.userToken) {
          sessionStorage.setItem("UserToken", this.userToken);
          }
          this.customerInfoUpdateInCart();
        }
      }, (error: any) => {
        if (typeof window !== 'undefined' && sessionStorage) {
          sessionStorage.setItem("UserToken", "uvuxp43ei6l92pj5ynjujefiixyvfwg8");
          this.customerInfoUpdateInCart();
        }
      });
  }

  customerInfoUpdateInCart() {
    let cartID: any;
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem('GUEST_CART_ID')) {
      cartID = localStorage.getItem('GUEST_CART_ID');
    }
    const url = '/rest/V1/customer-info-update-in-cart/' + cartID + '/user/'; // {cart_id}/user/{customer_token}
    this._service.postEstoreData(url).subscribe(
      (response: any) => {
        if (response[0].status) {
          if (typeof window !== 'undefined') {
            // localStorage.removeItem('GUEST_CART_ID');
            this.setGuestInfo();
          }
        }
      }, (error: any) => {
        if (typeof window !== 'undefined') {
          // localStorage.removeItem('GUEST_CART_ID');
          this.setGuestInfo();
        }
      });
  }
  RedirectToShipping() {
    window.location.href = this.summaryAddress;
  }
  setGuestInfo() {
    if (sessionStorage) {
      const details = JSON.parse(sessionStorage.getItem("GuestInfo"));
      const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      if (!UserInfo) {
        sessionStorage.setItem("UserInfo", JSON.stringify({ outputCPResp: details.outputCPResp }));
      }
      // this._router.navigateByUrl('/store/checkout/summary');
      this.RedirectToShipping();
    }
  }

  splitName(name: string) {
    const splitname = name.split(" ");
    const fullname = {
      ContactFirstName: splitname[0],
      ContactLastName: splitname[1]
    };
    if (splitname.length < 3) {
      return fullname;
    } else {
      let lastname = "";
      for (let i = 1; i < splitname.length; i++) {
        lastname = splitname[i] + ' ';
      }
      fullname.ContactLastName = lastname;
      return fullname;
    }
  }
  getPlanUrlBySku(planSku) {
    switch (planSku) {
      case "FG":
       return "first-gold";
      case "FGP":
        return "first-gold-plus";
      case "FGS":
        return "first-gold-supreme";
      case "FP":
        return "first-platinum";
      case "FPP":
        return "first-platinum-plus";
    }
  }

  Redirect(url: string) {
      window.location.href = url;
  }
  callErrorMessage(errorResponse: any) {
      if (!errorResponse.error.success) {
        this.sessionInvalid = true;
        this.notification = false;
      }
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


  public callCheckoutRemarketScript(): void {
    this._remarketAnalyticsService.LoadCheckoutPageScripts();
  }

  public passPricing = (price: number): number => this.RoundingOff(price ? price : 0.00);
}
