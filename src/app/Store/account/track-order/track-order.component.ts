import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CheckoutService } from '../../checkout/services/checkout.service';
import { BaseComponent } from '../../../base.component';
import { AppService } from '../../../Service/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { RouterService } from '../../../Service/router.service';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';
import { environment } from 'environments/environment';
import { finalize } from 'rxjs/operators';
import { iInternetShare, iOmniCampaign } from 'app/shared/models/plan.model';
import * as helper from '../../../shared/utilities/helper.ultility';
import { iLifeStyleVoucherDetails } from 'app/shared/models/plan.model';

@Component({
  selector: "app-track-order",
  templateUrl: "./track-order.component.html",
  styleUrls: [
    "./track-order.component.css",
    "./track-order.component.scss"
  ],
  providers: [CheckoutService, AppService]
})

export class TrackOrderComponent extends BaseComponent implements OnInit, AfterViewInit {
  // Changes for CEO-515. Need to know if the purchase is plan only or not.
  emailUrl;
  showPopup = false;
  popupEmail;
  disableButton = false;
  isBundle = false;
  bundlePrice: number;
  deviceName: string;
  devicePrice: number;
  isPlanOnly = false;
  checkoutService: CheckoutService;
  checkoutData: any;
  cart: any;
  userInfo: any;
  billingAddress: any;
  autobilling = false;
  shippingAddress: any;
  storeid: string;
  trasDate: any;
  totalAmount = 0.00;
  deviceitems: any;
  notifyRecipient: any;
  orderid: any;
  signature: any;
  orderinfo: any;
  UpDate: any;
  reconFilename: any;
  password: any;
  appservice: any;
  responseorderid: any;
  UserLoginName: any;
  sku: any;
  qty: any;
  price: any;
  rent = 'Rent';
  own = 'Own';
  currDate: any;
  orderData: any;
  tracknumb: any;
  orderId: any;
  seibleOrderId: any;
  magentoOrderid: any;
  isProjectMoon = false;
  errorBoolean = false;
  public sessionInvalid = false;
  errorMessage: any;
  errorData: any;
  grossTotal: any;
  tableInfo: any;
  orderPhoneNo: any;
  contractDuration: any;
  preorderchk: any;
  freeGiftInfo: any;
  isEasyPhone = false;
  isEsim = false;
  isMNPComplete = false;
  isCNGenerated = false;
  simType = "";
  easyPhoneLabel: any;
  deviceUpfront: any;
  planUpfront: any;
  orderOneTimePay: any;
  deviceMonthlyCharge: any;
  planMonthlyCharge: any;
  EasyPhoneMonthlyCharges: any;
  OrderDetailsPageDisplay = false;
  isGoldenNumberSelected: any;
  public taxs = [];
  public suppData: any = [];
  public isPreorder = false;
  public addOn = false;
  public addOnLabel = false;
  public isCSAgentDealer = false;
  public campaign100Days = false;
  public campaignMviva = false;
  public campaignMvivaMessage = "";
  public telcoDay = false;
  public telcoDayMessage = "";
  public upfrontInstallment = null;
  public isUpfrontInstallment = false;
  orderdetails: any;
  ShippingSameAsBilling: any;
  GSTInPercentage: any;
  deliveryType: any;
  public deviceUpfrontPenalty = 0;
  private subscriber: Subscription;
  eStoreUrl: string = environment.eStoreUrl;
  public isDeviceOnlyClicked = false;
  lifeStyleDetails: iLifeStyleVoucherDetails;
  states = [
    "Cyberjaya/Putrajaya",
    "Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "Pulau Pinang",
    "Sabah",
    "Sarawak",
    "Terengganu ",
    " Kuala Lumpur",
    "Labuan",
    "Selangor"
  ];
  residentTypes = ["Landed", "Highrise"];
  public isInitializeTermsAndConditions: any = null;
  terms: any = {
    terms: 'dummy'
  };
  ORDER_UNSUCCESSFUL_ERROR_MESSAGE = 'Uh Oh. Your order was unsuccessful. ' +
    'For payment reversal, please contact our Customer Service at 1111, citing your Payment Reference ID';
  campaignOmni: iOmniCampaign;
  internetShare: iInternetShare;

  mnpSimVerifyEnabled: boolean = false;
  lifeStylePenalty: boolean = false;

  constructor(
    private routerService: RouterService,
    checkoutService: CheckoutService,
    private _service: AppService,
    private _commonUtilService: CommonUtilService,
    private _deviceDataService: DeviceDataService,
    private _globalErrorHandler: GlobalErrorHandler,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2

  ) {
    super();
    this.checkoutService = checkoutService;
    this.GSTInPercentage = this.appConstant.GST_IN_PERCENTAGE;
  }

  ngOnInit() {
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.sessionInvalid = data));
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.errorBoolean = data)
    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.showPopup = data));

    if (sessionStorage && sessionStorage.getItem("UserInfo")) {
      this.UserLoginName = "MobileConnect";
    } else if (sessionStorage && sessionStorage.getItem("USER_TYPE")) {
      this.UserLoginName = sessionStorage.getItem("USER_TYPE");
    }
    this._activatedRoute.params.subscribe(params => this.orderId = params["orderId"]);
    const apiUrl: string = "/rest/V1/magorderdetail/" + this.orderId;

    this._service.getEstoreUserData(apiUrl).subscribe(
      (response: any) => {
        // Assuming Plan only as true if Virtual product. Changes for CEO-515
        this.isPlanOnly = (response[0].order_data.is_virtual === "1");
        this.orderData = response[0];
        this.emailUrl = this.orderData.order_data.resend_email;
        this.orderdetails = this.orderData.order_data.items[0];
        this.mnpSimVerifyEnabled = !!this.orderData?.order_data?.is_mnp;
        this.isMNPComplete = !!this.orderData?.order_data?.sim_verified;
        this.isCNGenerated = !!this.orderData?.order_data?.cngenerated;
        this.lifeStyleDetails = this.orderdetails?.lifestyle_voucher_details;
        this.campaignOmni = helper.CLMOmniDataSanitizer(this.orderdetails?.campaign_omni);
        if (!!this.orderdetails?.device_data && this.orderdetails.is_star) {
          this.isBundle = true;
          this.bundlePrice = Number(this.orderdetails.plan_data.pass_details.monthly_plan) + Number(this.orderdetails.plan_data.sub_pass_details.monthly_plan);
          this.deviceName = `${this.orderdetails.device_data.name} (${this.orderdetails.device_data.contract})`;
          this.devicePrice = this.orderdetails.device_data.orderDevicePrice;
        }
        this.internetShare = this.orderData?.order_data?.internet_share;
        this.preorderchk = response[0].order_data.pre_order;
        if (this.orderData && this.orderData.order_data) {
          if (this.orderData.order_data.has_auto_billing === "1" || this.orderData.order_data.has_auto_billing === 1) {
            this.autobilling = true;
          }
        }
        this.addOn = response[0].order_data.has_add_ons;
        this.addOnLabel = response[0].order_data.add_on_label;
        this.isProjectMoon = this.orderdetails.is_moon;
        if (this.orderdetails.plan_data && this.orderdetails.plan_data.length !== 0) {
          // this.tableInfo = this.orderData.order_data.items[0].plan_data.TableInfo;
          this.orderPhoneNo = this.orderData.order_data.items[0].plan_data.orderPhoneNo;
          // this.contractDuration = this.orderData.order_data.items[0].plan_data.contract_terms.desc;
        }
        const delivery_type = response[0].order_data.delivery_type;
          if (delivery_type && typeof delivery_type.value !== 'undefined') {
            if (delivery_type.value === 1) {
              this.deliveryType = 'Midnight Delivery';
            } else if (delivery_type.value === 0) {
              this.deliveryType = 'Standard Delivery';
            }
          }
        this.seibleOrderId = this.orderData.order_data.cel_siebel_order_id;
        this.cart = response[0].order_data;
        if (this.cart.pre_order) {
        this.isPreorder = this.cart.pre_order;
        }
        if (this.cart.free_gift_data) {
          this.freeGiftInfo = this.cart.free_gift_data;
        }
        if (response[0].order_data.items[0].is_easyphone) {
            this.easyPhoneLabel = response[0].order_data.items[0].easyphone_label;
            this.isEasyPhone = response[0].order_data.items[0].is_easyphone;
            let contractPeriod = this.easyPhoneLabel.substring(this.easyPhoneLabel.indexOf('('),this.easyPhoneLabel.indexOf(')')+1);

            if (this.easyPhoneLabel.indexOf(this.own) > -1) {
              // this.easyPhoneLabel = "EasyPhone™ Own (24 months contract)";
              this.easyPhoneLabel = "EasyPhone™ Own "+contractPeriod;

            }
            if (this.easyPhoneLabel.indexOf(this.rent) > -1) {
              // this.easyPhoneLabel = "EasyPhone™ Rent (24 months contract)";
              this.easyPhoneLabel = "EasyPhone™ Rent "+contractPeriod;

            }
          }
          this.isEsim = response[0].order_data.items[0].esim;
          this.simType = response[0].order_data.simType;
          if (response[0].order_data.items[0].plan_data.telco_day && response[0].order_data.items[0].plan_data.telco_day.status) {
            if (response[0].order_data.items[0].plan_data.telco_day.message) {
            this.telcoDayMessage = response[0].order_data.items[0].plan_data.telco_day.message;
            }
            this.telcoDay = response[0].order_data.items[0].plan_data.telco_day.status;
          }
          if (response[0].order_data.campaign100_days) {
            this.campaign100Days = response[0].order_data.campaign100_days;
          }
          if (response[0] && response[0].order_data.upfront_installment) {
            this.upfrontInstallment = response[0].order_data.upfront_installment;
          }
          if(this.upfrontInstallment) {
            this.isUpfrontInstallment = true;
          }
          if (this.isEasyPhone) {
            this.planUpfront = response[0].order_data.items[0].plan_data.order_plan_subt;
            this.deviceUpfront = response[0].order_data.items[0].device_data.order_device_subt;
            this.deviceMonthlyCharge = JSON.parse(response[0].order_data.items[0].monthly_charges.device);
            this.planMonthlyCharge = JSON.parse(response[0].order_data.items[0].plan_data.orderMontlyPay);
            this.orderOneTimePay = response[0].order_data.items[0].plan_data.orderOneTimePay;
            this.EasyPhoneMonthlyCharges = Number(this.deviceMonthlyCharge) + Number(this.planMonthlyCharge);
          }
          if (response[0].order_data.is_campaign_mviva) {
             if (response[0].order_data.campaign_mviva_message) {
             this.campaignMvivaMessage = response[0].order_data.campaign_mviva_message;
             }
             this.campaignMviva = response[0].order_data.is_campaign_mviva;
           }
        this.cart.items.forEach(item => {
          if (item.price !== 0) {
            this.totalAmount = parseFloat(item.price) + this.totalAmount;
          }
        });
        if (this.cart.items[0].plan_data && this.cart.items[0].plan_data.orderMonthlyPay) {
          this.cart.items[0].plan_data.orderMonthlyPay = Number(this.cart.items[0].plan_data.orderMonthlyPay);
        }
        if (this.cart.items[0].plan_data && this.cart.items[0].plan_data.orderOneTimePay) {
          this.cart.items[0].plan_data.orderOneTimePay = Number(this.cart.items[0].plan_data.orderOneTimePay);
        }
        if (this.orderData && this.orderData.order_data && this.orderData.order_data.is_golden_number) {
          this.isGoldenNumberSelected = this.orderData.order_data.is_golden_number;
        }
        if (this.cart.items[0].device_upfront_penalty) {
          this.deviceUpfrontPenalty = Number(this.cart.items[0].device_upfront_penalty);
          if (this.cart.items[0].lifestyle_penalty) {
            this.lifeStylePenalty = true;
          }
        }
        this.billingAddress = this.orderData.order_data.address.billing_address;
        this.shippingAddress = this.orderData.order_data.address.shipping_address;
        if (this.orderData.order_data && this.orderData.order_data.supplementary_data.length > 0) {
          this.suppData = this.orderData.order_data.supplementary_data;
        }
        if (this.orderData.order_data.tax.items) {
          this.taxs = this.orderData.order_data.tax.items;
        }
        this.cart.grand_total = parseFloat(this.cart.grand_total);
        // this.cart.GST = this.cart.grand_total - this.totalAmount;
        // this.cart.GST = this.totalAmount * this.GSTInPercentage;
        const grossTotalBeforeRounding = this.cart.grand_total; //  + this.cart.GST;
        this.grossTotal = this.roundOffNumber(grossTotalBeforeRounding);
        this.cart.roundOffDifference = this.grossTotal - grossTotalBeforeRounding;
        this.cart.roundOffDifference = this.roundToTwoDecimal(this.cart.roundOffDifference);
        const roundOffDiff = this.cart.roundOffDifference < 0.01 && this.cart.roundOffDifference > -0.01;
        this.cart.roundOffDifference = roundOffDiff ? 0.00 : this.cart.roundOffDifference;
        if (this.orderData.order_data.status === "Unsuccessful" || this.orderData.order_data.status === "Failed") {
          this.errorBoolean = true;
          this.errorMessage = {};
          this.errorMessage.content = this.ORDER_UNSUCCESSFUL_ERROR_MESSAGE;
          if (this.errorMessage?.content) {
            this._globalErrorHandler.errorObjectConvert(this.errorMessage.content);
          }
        }
      }, error => {
        this.errorBoolean = true;
        this.errorMessage = {};
        const errorUrl: string = "/rest/V1/messageDetails/" + error.status + "/Magento";
        this._service.getEstoreUserData(errorUrl).subscribe(
          (response: any) => {
            this.errorData = response[0];
            this.errorMessage.content = this.errorData.message;
          });
          if (this.errorMessage?.content) {
            this._globalErrorHandler.errorObjectConvert(this.errorMessage.content);
          }
      });
      if (typeof window !== 'undefined' && sessionStorage) {
         this.userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
      }
    this.init();
  }
  public goToPreviousPage(): void {
    const previous = this.routerService.getPreviousUrl();
    if ( previous ) {
      this.routerService.router.navigateByUrl(previous);
    }
  }
  ngAfterViewInit() {
    const currentUrl = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }

  init() {
    this.OrderDetailsPageDisplay = true;
    if (typeof window !== 'undefined' && localStorage) {
    this.tracknumb = localStorage.getItem("trackOrdernumber");
    }
  }

  public roundToTwoDecimal(value: number) {
    const factor = Math.pow(10, 2);
    return (Math.round(value * factor) / factor);
  }

  private roundOffNumber(value: number) {
    return (new CommonUtilService()).RoundingOff2Number(value);
  }

  RoundingOff(totalAmtToSend) {
    return this._commonUtilService.RoundingOff2String(totalAmtToSend);
  }

  RoundingOff2Number(value) {
    return this._commonUtilService.RoundingOff2Number(value);
  }
  IsDeviceOnly() {
    if (localStorage && localStorage.getItem("isDeviceOnlyClicked")) {
      this.isDeviceOnlyClicked = true;
    }
    return this.isDeviceOnlyClicked;
  }

  sendEmail() {
    this.disableButton = true;
    this._service.getEstoreUserData(this.emailUrl)
    .pipe(finalize(() => {
      this.disableButton = false;
      this.showPopup = true;
    }))
    .subscribe(
      (response) => {
        this.popupEmail = {
          title: 'Email successfully sent!',
          content: response['message'] || "Please check your mailbox.",
          button: 'OK',
        };
    },
      (err) => {
        this.popupEmail = {
          title: 'Uh Oh!',
          content: `Sorry for the inconvenience, we're giving our system a little update. Please try again later.`,
          button: 'OK',
        };
      });
  }

  getOrderMonthlyPayTotal = () => (this.cart.items[0].plan_data?.orderMontlyPayTotal ?? 0.00); 

  redirectToMnpSimVerify() {
    this._router.navigate(['/store/mnp-sim-verification', this.orderId]);
  }
}
