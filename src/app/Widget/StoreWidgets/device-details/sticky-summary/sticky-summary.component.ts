import { Component, OnInit, Input, OnDestroy, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
// import { Observable } from 'rxjs/Rx';
import { AppWidgetComponent } from '../../../../Model/app.widget.component';
import { BaseComponent } from '../../../../base.component';
import { ContentNavigation } from '../../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../../Service/redirection.service';
import { DeviceDataService, iBasePlan } from '../../../../Service/devicedata.service';
import { CommonUtilService } from '../../../../Service/commonUtil.service';
import { DeviceDetailsNumberService } from "./../device-details-choose-number/device-details-choose-number.service";
import { Subscription } from 'rxjs';
import { CartService } from '../../../../Service/cart.service';
import { AppService } from '../../../../Service/app.service';
import { UserService } from '../../../../Service/user.service';
import { OrderInfoService } from '../../../../Service/orderinfo.service';
import { BundleService } from '../../../../Service/bundle.service';
import { DeviceSummaryService } from '../services/device-summary-service.service';
import { Cart } from '../../../../Model/cart.model';
import { CartItem } from '../../../../Model/cart-item.model';
import { EStoreAnalysticsService } from '../../../../Service/store.analytic.service';
import * as ApiConstant from '../../../../../constants/estoreEndPoint.constants';
import { CookieService } from 'ngx-cookie-service';
// import { debuglog } from 'util';
import { environment } from 'environments/environment';
import { SupplimentaryLinesService } from '../../../../Store/widget/supplementary-lines/supplementary-lines.service';
// import { truncateSync } from 'fs';
import { RemarketAnalyticsService } from '../../../../Service/remarket-analytics.service';
import { ProductService } from '../../../../Service/product.service';
import { GetParametersService } from '../../../../Service/getParamaters.service';
import { SYS_DOWN_MSG } from '../../../../../constants/error.constants';
import { PlansService } from '../../../../Service/plans.service';
import { CartHomeComponent } from '../../../../Store/cart/cart-home/cart-home.component';
import { catchError } from 'rxjs/operators';
import { STAR_PLAN_PREFIX, iOmniCampaign } from '../../../../shared/models/plan.model';

import { GlobalErrorHandler } from '../../../../interceptors/error.interceptor';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';

declare var _: any;
@Component({
  selector: 'app-sticky-summary',
  templateUrl: './sticky-summary.component.html',
  styleUrls: ['./sticky-summary.component.css'],
  providers: [DeviceDetailsNumberService, RedirectionService, CartService, AppService, UserService, OrderInfoService, BundleService,
    DeviceSummaryService, SupplimentaryLinesService, RemarketAnalyticsService],
  animations: [
    trigger('heroState', [
      state('is-selected', style({
        background: '#fff',
        color: '#000',
        borderTop: '8px solid #009ade',
        borderRight: 'none',
        height: '70px'
      })),
      transition('* => is-selected', animate('1ms ease-in')),
      transition('is-selected => *', animate('1ms ease-out'))
    ])
  ]
})
export class StickySummaryComponent extends BaseComponent implements AppWidgetComponent, OnInit, OnDestroy {
  @Input() data: any;
  @Input() mnpData: any;
  @Input() selectedProd: any;
  @Input() SelectionAferLogin: any;
  @Input() productToRemoveFromCart: any;
  @Input() mnpCheckPlanPurchase: any;
  @Input() cobp: any;
  @Input() isProjectStar: any;
  public DeviceDetailsSummaryResponse = null;
  public orderDevice: any = null;
  public orderSummaryColor: any = null;
  public orderReqPartNumber: any = null;
  public orderReqColor: any = null;
  public orderReqModel: any = null;
  public orderSummaryStorage: any = null;
  public orderPlan: any = null;
  public orderPlanName: any = null;
  public orderPhoneNo: any = null;
  public eligibilty: any = null;
  public orderDevicePrice: any = null;
  public orderOneTimePay: any = null;
  public orderMonthlyPay: number = null;
  public orderTotalPay = 0;
  public orderNumberType: string = null;
  public isNumberReserved: any = true;
  public orderReqPlanBundle: string = null;
  public orderReqServiceBundle: string = null;
  public orderReqPlanComponent: string = null;
  public showDisclaimer: boolean;
  public desclaimerUrl = "/rest/V1/declaimer/1";
  public orderDetails: any;
  public selectedProductSku: string;
  public selectedPlanDetails: any;
  public isLimitExceededBundle = false;
  public isLimitExceededIncludingOpenOrders = false;
  public selectedProductDetails: any;
  public selectedImageList: any;
  itemSubmitted = false;
  public OrderDeviceExist = false;
  public selectedPlanSku: any = null;
  public PlanOnlyObjectForCart: any;
  public orderDeviceName: any;
  public param1: any;
  public param2: any;
  public param3: any;
  stockDetials: any;
  outOfStock: any = false;
  classActive = false;
  chooseYourWay = false;
  public errorMessage = false;
  public mnplines = false;
  public errorAddToCart = false;
  public MNPAddToCartResponse: any = null;
  public IsMnpFlowFromDevice = false;
  public principalLine = false;
  public infoMNPflow: any = null;
  public SharedContract: any = null;
  public maxLimitReached: boolean;
  public cart: any;
  public mnpEdited = false;
  public isPreOrder = false;
  public preorderEnded = false;
  public userType: any;
  public requestBody: any = null;
  public disableAddToCart = false;
  public numberOfSupplines = 0;
  public MNPUserData;
  animateState = 'is-selected';
  step = 1;
  private subscriber: Subscription;
  // Age Eligibility popup
  IsDisplayAgeEligibilityPopup = false;
  public EligibilityPopupType = "";
  private NOT_ELIGIBLE_BY_AGE = "NotEligible";
  private ELIGIBLE_BY_AGE = "Eligible";
  public isaCtive = false;
  public isStep1Active = false;
  public isStep2Active = false;
  public isStep3Active = false;
  public isStep4Active = false;
  public errorStockNotAvail = false;
  public isLimitReachedError = false;
  public upfrontWaivedSuccess = false;
  public upfrontWaivedFailure = false;
  public limitReachedErrorMsg: any;
  public stockErrorMessage: any;
  public numberExistsMessage: any;
  public outletId: string = environment.outletId;
  public sessionInvalid = false;
  public reserveNumberNotification = false;
  public planTypeToPass = "";
  public disableAddToCartButton = false;
  public isBtnDisabled = false;
  public suppLinesDetails: any = [];
  public previousPlanSelected = "";
  public suppLinesInfoOfUser: any = {};
  public suppLineRequestBody: any = [];
  public enableAddToCart = true;
  public ToasterDisabled = false;
  public MNPEdit = "NO";
  public isMnp = false;
  public mobileNumbers: any = [];
  public infoMaxLimit: any = null;
  public maximumReservation = false;
  public reserveNumberResponse = false;
  public tempNumber: any = null;
  public reserveNumberData: any;
  // public hasPreorderTag: boolean = false;
  public isPlanURL = false;
  public randomPhoneNo: any = null;
  public numList: any = [];
  public reservationId = "";
  public customerNRIC = null;
  public isIA = true;
  public isNotIA = false;
  public planType = "postpaid";
  public disableCartButton = false;
  public suppObj: any = null;
  public suppDetailsOfUser = {};
  addonCode = null;
  public analyticsData: any;
  public moonMnpCheckPlanPurchase: any = null;
  public isMoon = false;
  isCSAgentDealer = false;
  isCustomer = false;
  suppReservationDetails: any = {};
  public isMviva = false;
  public deviceUpfrontPenalty = 0;
  public isGoldenNumberSelected = false;
  basePlanStar: any = null;
  orderPlanPass: any = null;
  public devicePurchaseType = '';
  public isDeviceOnly = false;
  public isInternetShareChecked = false;
  public upfrontWaived = false;
  public devicePenaltyValidation;
  public checkBoxPenalty;
  public checkEligibleUpfront;
  public isPopUpBlacklist = false;
  public infoBlacklisted;
  public disableAddToCartButtonBlacklisted = false;
  isInsideContainer = false;
  
  // Temporary variable before moving out to revamped page
  __basePlan__: iBasePlan;

  campaignOmni: iOmniCampaign;

   constructor(
    private devicedetailNumberservice: DeviceDetailsNumberService,
    private _router: Router,
    private cartService: CartService,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _deviceDataService: DeviceDataService,
    private _commonUtilService: CommonUtilService,
    private appService: AppService,
    private userService: UserService,
    private orderInfoService: OrderInfoService,
    private bundleService: BundleService,
    private deviceSummaryMnpService: DeviceSummaryService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _supplimentaryLinesService: SupplimentaryLinesService,
    private cookieService: CookieService,
    private _remarketAnalyticsService: RemarketAnalyticsService,
    private _productService: ProductService,
    private _getParamsService: GetParametersService,
    private _plansService: PlansService,
    private _globalErrorHandler: GlobalErrorHandler,
    private _plansQuery: PlansQuery,
  ) {
    super();
  }

  ngOnInit() {
    // Added this for checking the plan flow or devic flow as this is used in MNP edit flow of device details page
    if (typeof window !== 'undefined') {
      if (window.location.href.indexOf("/plans/") > -1) {
        this.isPlanURL = true;
      } else {
        this.isPlanURL = false;
      }
    }
    this.isCSAgentDealer = this.userService.isCSAgent() || this.userService.isDealer();
    this.isCustomer = this.userService.isCustomer();
    this.subscriber = this._deviceDataService.sharedInternetSharingOption$.subscribe( data => {
     if (data !== undefined && data !== null) {
       this.isInternetShareChecked = data;
     }
    });
    this.subscriber = this._deviceDataService.basePlanStar$.subscribe( data => {
      if (data !== undefined) {
        this.basePlanStar = data;
      }
    });
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.IsMnpFlowFromDevice = data)
    );
    this.subscriber = this._deviceDataService.sharedDeviceUpfrontPenalty$.subscribe(data => {
      this.deviceUpfrontPenalty = Number(data);
    });
    if (this.selectedProd) {
      this.isGoldenNumberSelected = this.selectedProd.is_golden_number;
    } else {
      this.subscriber = this._deviceDataService.sharedGoldenNumber$.subscribe(data => {
        this.isGoldenNumberSelected = data;
      });
    }

    if (localStorage && localStorage.getItem("eligiblePopupType")) {
      this.EligibilityPopupType = JSON.parse(localStorage.getItem("eligiblePopupType"));
      localStorage.removeItem("eligiblePopupType");
    }

    if (localStorage && localStorage.getItem("displayEligiblePopup")) {
      this.IsDisplayAgeEligibilityPopup = JSON.parse(localStorage.getItem("displayEligiblePopup"));
      localStorage.removeItem("displayEligiblePopup");
    }

    if (localStorage && localStorage.getItem("limitReachedErrorMsg")) {
      this.limitReachedErrorMsg = JSON.parse(localStorage.getItem("limitReachedErrorMsg"));
      localStorage.removeItem("limitReachedErrorMsg");
    }

    if (localStorage && localStorage.getItem("isMviva")) {
      this.isMviva = JSON.parse(localStorage.getItem("isMviva"));
    }

    this.initializeStickySummary();

    if (localStorage && localStorage.getItem("isLimitReachedError")) {
      this.isLimitReachedError = JSON.parse(localStorage.getItem("isLimitReachedError"));
      localStorage.removeItem("isLimitReachedError");
    }
    if (localStorage && localStorage.getItem("errorAddToCart")) {
      if (localStorage.getItem("errorAddToCart") === "true") {
        const errorAddToCartMessage = localStorage.getItem("errorAddToCartMessage");
        this.IsMnpFlowFromDevice = true;
        this.infoMNPflow = {};
        this.infoMNPflow.content = errorAddToCartMessage;
        localStorage.removeItem("errorAddToCart");
        localStorage.removeItem("errorAddToCartMessage");
        this.ToasterDisabled = true;
      }
    }

    if (localStorage && localStorage.getItem("OutOfStockPreOrder")) {
      if (localStorage.getItem("OutOfStockPreOrder") === "true") {
        this.IsMnpFlowFromDevice = true;
        this.infoMNPflow = {};
        this.infoMNPflow.content = "Uh Oh. Device is now out of stock. Please select another device.";
        localStorage.removeItem("OutOfStockPreOrder");
        this.ToasterDisabled = true;
      }
    }

    if (typeof window !== 'undefined' && localStorage) {
      const isPostaidURL = window.location.href.match("/plans/");
      if (localStorage && localStorage.getItem("ls_subnav") != null) {
        const isSubnav = localStorage.getItem("ls_subnav");
        const validateSubnav = isSubnav.match("Postpaid");
        if (validateSubnav != null && isPostaidURL != null && this.isProjectStar !== true) {
          this.isStep2Active = true;
        } else {
          this.isStep1Active = true;
        }
      }
      // Getting addon code from localstorage.
      if (localStorage && localStorage.getItem("addonCode")) {
        this.addonCode = localStorage.getItem("addonCode");
      }
    }
    if (this.orderPlanName != null) {
      const planSelected: any = this.orderPlanName;
      if (planSelected.indexOf("Blue") > -1 || planSelected.indexOf("Xpax") > -1) {
        this.enableAddToCart = true;
      } else {
        this.enableAddToCart = false;
      }
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("MNP-EDIT")) {
      this.MNPEdit = localStorage.getItem("MNP-EDIT");
      this.orderNumberType = 'SwitchToCelcom';
      this._deviceDataService.publishNumberType("SwitchToCelcom");
      this.enableAddToCart = true;
      localStorage.setItem("mnp-edit-flow", "true");
    }

    if (typeof window !== 'undefined' && localStorage && ((localStorage.getItem("COBP_FLOW") === "YES") &&
      (localStorage.getItem("cobp-edit-flow") === "true"))) {
      this.enableAddToCart = true;
      this.setStep(3);
      this.orderNumberType = 'KeepNumber';
      if (localStorage.getItem("cobp-edit-flow")) {
        localStorage.removeItem("cobp-edit-flow");
      }
      if (window.location.href.indexOf("/plans/") > -1) {
        this.isPlanURL = true;
        const element = document.getElementById("section_3");
        setTimeout(() => {
          element.scrollIntoView();
          setTimeout(() => {
            window.scrollBy(0, -100);
          }, 700);
        }, 800);
      }
    }

    // Recover msisdn.
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("RecoveryMyMsIsdn")) {
      const recoveryMsisdn = localStorage.getItem("RecoveryMyMsIsdn");
      localStorage.setItem("MyMsIsdn", recoveryMsisdn);
    }
    this._activatedRoute.parent.data.subscribe(data => {
      if (data['parent']) {
        this.isInsideContainer = true;
      }
    });
    this.subscriber = this._deviceDataService.addtoCartTriggered$.subscribe(() => {
      this.onAddtocartClicked();
    });

  }

  public initializeStickySummary() {
    this.subscriber = this._deviceDataService.sharedDevice$.subscribe(data => this.orderDevice = data);
    this.subscriber = this._deviceDataService.sharedStorage$.subscribe(data => {
      this.orderSummaryStorage = data;
      this.getDevice();
    });
    this.subscriber = this._deviceDataService.sharedColor$.subscribe(data => {
      this.orderSummaryColor = data;
      this.getDevice();
    });
    this.subscriber = this._deviceDataService.sharedPhoneNo$.subscribe(data => {
      this.orderPhoneNo = data;
    });
    this.subscriber = this._deviceDataService.sharedEligibility$.subscribe(data => this.eligibilty = data);
    this.subscriber = this._deviceDataService.sharedPlan$.subscribe(data => {
      this.orderPlan = data;
      if (this.isProjectStar) {
        this.orderPlanPass = data;
      }
    });
    this.subscriber = this._deviceDataService.mnpEdited$.subscribe(data => {
      this.mnpEdited = data;
    });
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.maximumReservation = data)
    );
    this.subscriber = this._deviceDataService.sharedDevicePrice$.subscribe(data => this.orderDevicePrice = data);
    this.subscriber = this._deviceDataService.sharedMonthlyPay$.subscribe(data => this.orderMonthlyPay = data);
    this.subscriber = this._deviceDataService.sharedOneTimePay$.subscribe(data => this.orderOneTimePay = data);
    this.subscriber = this._deviceDataService.sharedTotalpay$.subscribe(data => {
      this.orderTotalPay = data ? Number(data) : data;
    });
    this.subscriber = this._deviceDataService.sharedNumberType$.subscribe(data => {
      this.orderNumberType = data;
      if (this.orderPlanName && (this.orderNumberType === 'SwitchToCelcom' || this.orderNumberType === 'KeepNumber')) {
        this.setStep(3);
        this.enableAddToCart = true;
      }
    });
    this.subscriber = this._deviceDataService.productSkuToPublish$.subscribe(data => {
      this.selectedProductSku = data;
    });
    this.subscriber = this._deviceDataService.sharedPlanDetails$.subscribe(data => {
      this.selectedPlanDetails = data;
      if (this.selectedPlanDetails && this.selectedPlanDetails.PlanSku) {
        this.selectedPlanSku = this.selectedPlanDetails.PlanSku;
      }
    });
    this.subscriber = this._deviceDataService.sharedSupplimentaryLines$.subscribe(data => {
      if (data) {
        if (data.length > 0) {
          this.numberOfSupplines = data.length;
          this.orderNumberType = 'NewNumber';
        }
        if (data.length === 0) {
          this.numberOfSupplines = data.length;
        }
      }
    });
    this.subscriber = this._deviceDataService.selectedPrincipalLine$.subscribe(data => this.principalLine = data);
    this.subscriber = this._deviceDataService.sharedPlanName$.subscribe(data => {
      this.orderPlanName = data;
    });
    this.subscriber = this._deviceDataService.sharedPassPlanStar$.subscribe(data => {
      if (data !== undefined) {
        this.orderPlanPass = data;
      }
    });
    this.subscriber = this._deviceDataService.enableAddToCart$.subscribe(data => {
      this.enableAddToCart = data;
    });
    this.subscriber = this._deviceDataService.isPreOrder$.subscribe(data => {
      this.isPreOrder = data;
    });
    this.subscriber = this._deviceDataService.preOrderEnded$.subscribe(data => {
      this.preorderEnded = data;
    });
    this.subscriber = this._deviceDataService.disableAddToCart$.subscribe(data => {
      this.disableCartButton = data;
    });
    this.subscriber = this._deviceDataService.sharedImageList$.subscribe(data => this.selectedImageList = data);
    this.subscriber = this._deviceDataService.outOfStock$.subscribe((data) => { this.outOfStock = data.status; this.stockDetials = data; });
    this.subscriber = this._deviceDataService.sharedContract$.subscribe(data => this.SharedContract = data);
    this.subscriber = this._deviceDataService.maxLimitReached$.subscribe(data => this.maxLimitReached = data);
    this.subscriber = this._deviceDataService.sharedNotificationError$.subscribe(data => this.errorMessage = data);
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.IsMnpFlowFromDevice = data));
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.errorMessage = data));
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.errorAddToCart = data));
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.errorStockNotAvail = data));
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => {
      this.isLimitReachedError = data;
    });
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.sessionInvalid = data));
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.reserveNumberNotification = data));
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.isPopUpBlacklist = data));
    this.subscriber = this._deviceDataService.updateStep$.subscribe(data => this.setStep(data));
    this.subscriber = this._plansQuery.select(state => state.base_plan).subscribe(data => this.__basePlan__ = data);
    this.subscriber = this._plansQuery.select(state => state.omni_campaign).subscribe(data => this.campaignOmni = data);
    if (this.SelectionAferLogin != null) {
      if (this.orderSummaryColor == null && this.orderSummaryStorage == null) {
        this.orderSummaryColor = this.SelectionAferLogin.color;
        this.orderSummaryStorage = this.SelectionAferLogin.storage;
        if (this.data != null && this.data.associated_product && this.data.associated_product != null) {
          this.data.associated_product.forEach(item => {
            if ((item.memory === this.orderSummaryStorage) && (item.color === this.orderSummaryColor)) {
              this.SharedContract = item.contract;
            }
          });
        }
      }
    }
    this.subscriber = this._deviceDataService.sharedDisclaimerAgree$.subscribe(data => {
      this.isBtnDisabled = data;
    });
    this.subscriber = this._deviceDataService.sharedSupplimentaryLines$.subscribe(
      data => {
        this.suppLinesDetails = data;
      });

    this.subscriber = this._deviceDataService.upfrontWaivedSuccess$.subscribe(
      data => {
        this.upfrontWaivedSuccess = data;
        if (this.upfrontWaivedSuccess) {
          this.infoMNPflow = {};
          this.infoMNPflow.content = "You are eligible for upfront payment waiver (Guna Celcom)";
          this.infoMNPflow.color = "229B9C";
        }
      });

    this.subscriber = this._deviceDataService.upfrontWaived$.subscribe(
      data => {
        if (data) {
          this.upfrontWaived = true;
        } else {
          this.upfrontWaived = false;
        }
      }
    );
    this.subscriber = this._deviceDataService.upfrontWaivedFailure$.subscribe(
      data => {
        this.upfrontWaivedFailure = data;
        if (this.upfrontWaivedFailure) {
          this.infoMNPflow = {};
          this.infoMNPflow.content = "Sorry the number keyed in is not eligible for upfront waiver (Guna Celcom) promotion." +
            " For more info, please call 1111 from your Celcom mobile";
          this.infoMNPflow.color = "7D7D7D";
        }
      });
      this._deviceDataService.isRentClicked$.subscribe(data => this.setDevicePurchaseType(data, 'EasyPhone™ Rent'));
      this._deviceDataService.isOwnClicked$.subscribe(data => this.setDevicePurchaseType(data, 'EasyPhone™ Own'));
      this._deviceDataService.isBundleClicked$.subscribe(data => this.setDevicePurchaseType(data, 'Device Bundle'));
    this._deviceDataService.sharedDevicePagePurachaseTypeTab$.subscribe(data => {
      if (data === 'Device Only') {
        this.devicePurchaseType = '';
        this.isDeviceOnly = true;
      } else {
        this.isDeviceOnly = false;
      }
    });
    if (!this.isPlanURL && (!this.orderPlanName || !this.basePlanStar)) {
      this.isDeviceOnly = true;
    }
    this.initializePage();
  }

  get isEnterprise() {
    return this.userService.isUserEnterprise();
  }

  get EntUserHasSuccessfulTrans() {
    const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    if (userInfo && userInfo['outputCPResp'] && userInfo['outputCPResp']['enterpriseOrderPlaced']) {
      const orderPlaced = userInfo['outputCPResp']['enterpriseOrderPlaced'];
      return this.isEnterprise && orderPlaced;
    }
    return false;
  }

  getDevice() {
    if (this.isProjectStar) {
      if (this.data['associated_product']) {
        const currentDevice = this.data['associated_product'].find(d => d.memory == this.orderSummaryStorage && d.color == this.orderSummaryColor)
        if (currentDevice) {
          this.orderDevice = currentDevice.sku;
          this.OrderDeviceExist = true;
          this.orderDeviceName = this.data['basic_details']['name'];
        }
      }
    }
  }

  setDevicePurchaseType(data, type = null) {
    if (data) {
      this.devicePurchaseType = type;
    }
  }

  public initializePage() {
    if (this.isProjectStar !== true && !this.orderDevice && this.data !== undefined && !this.data.TableInfo ) {
      this.orderDevice = this.data.basic_details.sku;
      this.orderDeviceName = this.data.basic_details.name;
      this.OrderDeviceExist = true;
      this.step = 1;
    } else if (this.isProjectStar !== true && this.data !== undefined && this.data.TableInfo && !this.orderDevice) {
      this.OrderDeviceExist = false;
      if (this.mnpData && this.mnpData.portNumber !== undefined) {
        this.step = 3;
      } else {
        this.step = 2;
      }
    } else if (this.isProjectStar === true && this.orderDevice === null) { // project start plan only.
      this.OrderDeviceExist = false;
      this.step = 1;
    } else {
      this.OrderDeviceExist = true;
      this.step = 1;
    }

    if (this.data !== undefined && this.data.TableInfo && this.isProjectStar !== true) {
      this.orderOneTimePay = this.data.OneTimePayment;
      this.selectedPlanDetails = this.data.PlanDetails;
      this.orderMonthlyPay = this.data.PlanMonthlyPay;
      this.orderPlanName = this.data.PlanName;
      this.orderPlan = this.data.PlanSku;
      this.orderTotalPay = this.data.TotalPay;
      this.orderDevice = null;
      this.selectedPlanSku = this.data.PlanSku;
      this.createPlanOnlyCartWithoutSetting();
    }
    this.persistingCartDetails();
    if (typeof window !== "undefined" && localStorage && localStorage.getItem("EligibilityIndicator")) {
      this.DisplayAgeEligibilityPopup(JSON.parse(localStorage.getItem("EligibilityIndicator")));
      localStorage.removeItem("EligibilityIndicator");
    }
  }

  public CallCartMineApi(url: string) {
    this.cartService.Find(url.trim()).subscribe(
      (response: any) => {
        if (response && response[0] && response[0].all_items && response[0].all_items.length > 0) {
          const cartTotal = 0;
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
            cartItem.cobpDeviceUpfrontPenalty = element.device_upfront_penalty;
            cartItemArray.push(cartItem);
          });
          this.cart = new Cart();
          this.cart.items = cartItemArray;
          this.cart.setTotalPrices(this.cart);
          if (localStorage) {
            localStorage.setItem("cart", JSON.stringify(this.cart));
          }
        } else {
          this.cart = null;
        }
      }, (error) => {
        console.log("error");
      }
    );
  }

  public createPlanOnlyCart() {
    this.orderDetails = {
      sku: this.orderPlan,
      price: this.orderTotalPay,
    };
    this.PlanOnlyObjectForCart = {
      selectedProductSku: this.selectedPlanSku,
      orderPhoneNo: this.orderPhoneNo,
      orderPlan: this.orderPlan,
      selectedPlanDetails: this.data,
      orderPlanName: this.orderPlanName,
      orderMonthlyPay: this.orderMonthlyPay,
      orderOneTimePay: this.orderOneTimePay,
      orderTotalPay: this.orderTotalPay,
      orderNumberType: this.orderNumberType,
      total: this.orderTotalPay
    };
    this.itemSubmitted = true;
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails));
      localStorage.setItem('PlanOnlyObjectForCart', this.cartService.customStringify(this.PlanOnlyObjectForCart));
    }
  }

  public createPlanOnlyCartWithoutSetting() {
    this.orderDetails = {
      sku: this.orderPlan,
      price: this.orderTotalPay,
    };
    this.PlanOnlyObjectForCart = {
      selectedProductSku: this.selectedPlanSku,
      orderPhoneNo: this.orderPhoneNo,
      orderPlan: this.orderPlan,
      selectedPlanDetails: this.data,
      orderPlanName: this.orderPlanName,
      orderMonthlyPay: this.orderMonthlyPay,
      orderOneTimePay: this.orderOneTimePay,
      orderTotalPay: this.orderTotalPay,
      orderNumberType: this.orderNumberType,
      total: this.orderTotalPay
    };
    this.itemSubmitted = true;
  }

  public FindEligibilityForPostpaidPlans(data: any) {
    let result = null;
    // call service
    const upperAgeLimit = (data !== undefined && data.upper_age_limit !== undefined && data.upper_age_limit !== null)
    ? Number(data.upper_age_limit) : 0;
    const lowerAgeLimit = (data !== undefined && data.lower_age_limit !== undefined && data.lower_age_limit !== null)
    ? Number(data.lower_age_limit) : 0;
    if ((data && data.selectedPlanDetails && data.selectedPlanDetails.is_xpax === true) || (data && data.is_xpax === true)) {
      result = this.cartService.checkEligibilityForPostpaidXpax(lowerAgeLimit, upperAgeLimit);
    } else {
      result = this.cartService.checkEligibilityForFirstPlans(lowerAgeLimit);
    }
    return result;
  }

  public DisplayAgeEligibilityPopup(eligibilityInfo: any) {
    this.EligibilityPopupType = eligibilityInfo;
    this.IsDisplayAgeEligibilityPopup = true;
  }

  // ------------------- Public methods ----------------- //

  persistingCartDetails() {
    if (typeof window !== 'undefined') {
      if (sessionStorage && localStorage && (['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE")) || localStorage.getItem("MyMsIsdn")) &&
        sessionStorage.getItem("UserToken")) {
        let apiUrl = ApiConstant.CARTMINE_API;
        if (sessionStorage && sessionStorage.getItem('CAorderId') && sessionStorage.getItem('CAorderId') !== null &&
        sessionStorage.getItem('secretKey') && sessionStorage.getItem('secretKey') !== null) {
        const orderId = sessionStorage.getItem('CAorderId');
        const orderSecret = sessionStorage.getItem('secretKey');
         apiUrl = "/rest/V1/cartmine?order_id=" + orderId + "&order_secret=" + orderSecret;
      }
        this.CallCartMineApi(apiUrl);
      }
    }
  }

  ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  defaultOnClick() {
    return false;
  }

  runDisclaimer(oDevice, oPlan, total) {
    if (!oDevice ||
      typeof (total) === 'undefined' ||
      (!(this.orderSummaryColor && this.orderDevicePrice && this.orderSummaryStorage) && oDevice.bundleSku === undefined)
    ) {
      return;
    }
    this.orderDetails = {
      sku: oDevice,
      price: total,
    };
    // if ordered plan is undefined set it to null.
    if (!this.orderPlan) {
      this.orderPlan = null;
    }
    // get order req color.
    if (oDevice && this.data !== undefined && this.data.associated_product !== undefined) {
      this.data.associated_product.forEach(item => {
        if (item.color === this.orderSummaryColor && item.memory === this.orderSummaryStorage) {
          this.orderReqColor = item.order_color;
          this.orderReqPartNumber = item.part_number;
          this.orderReqModel = item.order_model;
        }
      });
    }

    // Get order plan req details.
    if (this.orderPlan && this.data !== undefined && this.data.choose_plan !== undefined) {
      this.data.choose_plan.forEach(planItem => {
        planItem.tabData.forEach(item => {
          if (item.sku === this.orderPlan) {
            this.orderReqPlanBundle = item.orderPlanBundle;
            this.orderReqServiceBundle = item.orderServiceBundle;
            this.orderReqPlanComponent = item.orderPlanComponent;
            this.selectedPlanDetails = item;
          }
        });
      });
    }
    // orderPlan name for moon and device only.
    if (!this.orderPlanName && oPlan !== null && oPlan.basePlan !== null) {
      this.orderPlanName = oPlan.basePlan;
    }
    // orderPlan name for Star plan and device only.
    if (this.isProjectStar === true && oPlan !== null && oPlan.basePlan !== null) {
      this.orderPlan = oPlan.basePlan;
    }
    this.selectedProductDetails = {
      orderDevice: (oDevice.bundleSku === undefined ) ? oDevice : oDevice.bundleSku,
      selectedProductSku: (oDevice.deviceSku === undefined ) ? this.selectedProductSku : oDevice.deviceSku,
      orderDeviceName: this.orderDeviceName,
      selectedImageList: this.selectedImageList,
      orderSummaryStorage: this.orderSummaryStorage,
      orderSummaryColor: this.orderSummaryColor,
      orderPhoneNo: this.orderPhoneNo,
      eligibilty: this.eligibilty,
      orderPlan: this.orderPlan,
      selectedPlanDetails: this.selectedPlanDetails,
      orderPlanName: this.orderPlanName,
      orderAddOnpass: (oPlan !== null && oPlan.addOnPass !== null) ? oPlan.addOnPass : null,
      orderSubpass: (oPlan !== null && oPlan.subPass !== null) ? oPlan.subPass : null,
      orderDevicePrice: this.orderDevicePrice,
      orderMonthlyPay: this.orderMonthlyPay,
      orderOneTimePay: this.orderOneTimePay,
      orderTotalPay: this.orderTotalPay,
      orderNumberType: this.orderNumberType,
      total: total,
      stockDetails: this.stockDetials,
      orderReqCategory: (this.data !== undefined && this.data.basic_details !== undefined) ? this.data.basic_details.order_category : null ,
      orderReqModel: this.orderReqModel,
      orderReqBrand: (this.data !== undefined  && this.data.basic_details !== undefined) ?  this.data.basic_details.order_brand : null,
      orderReqColor: this.orderReqColor,
      orderReqPartNumber: this.orderReqPartNumber,
      orderReqPlanBundle: this.orderReqPlanBundle,
      orderReqServiceBundle: this.orderReqServiceBundle,
      orderMoon: this.isMoon,
      orderStar: this.isProjectStar,
    };
    this.itemSubmitted = true;
    if (localStorage && localStorage.getItem("ContractEndDate")) {
      const contractLengthAvailable = localStorage.getItem("ContractAgree");
      const contractEndDate = JSON.parse(localStorage.getItem("ContractEndDate"));
      if (localStorage.getItem("ContractEndDate") !== "null" && contractEndDate !== "") {
        if (contractLengthAvailable !== 'true') {
          return false;
        }
      }
    }

    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('selectedProductDetails', JSON.stringify(this.selectedProductDetails));
    }

    if (this.selectedProd && this.selectedProd.sku) {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem("EDIT_PRODUCT", JSON.stringify(this.selectedProd));
      }
    }
    if (localStorage && sessionStorage && (localStorage.getItem("MyMsIsdn") || sessionStorage.getItem("USER_TYPE")) &&
      (sessionStorage.getItem("UserInfo") || sessionStorage.getItem("GuestInfo"))
      && sessionStorage.getItem("UserToken")) {
      if (this.productToRemoveFromCart !== null && this.productToRemoveFromCart !== undefined) {
        this.EditProduct();
        if (localStorage) {
          localStorage.setItem('selectedProductDetails', JSON.stringify(this.selectedProductDetails));
        }
      } else {

        if (this.selectedProductDetails.orderPlan !== null && this.selectedProductDetails.orderPlan !== undefined) {
          this.planTypeToPass = this.selectedProductDetails.orderPlan.toLowerCase().slice(0, 1);
          if (this.planTypeToPass === "x") {
            const eligibilityInfo: any = this.FindEligibilityForPostpaidPlans(this.selectedProductDetails.selectedPlanDetails);
            // Check eligibilty if age is less 18 and user selected plan.
            if (eligibilityInfo.isEligibleByAge === false && oPlan !== null) {
              this.DisplayAgeEligibilityPopup(eligibilityInfo);
            } else {
              this.disclaimerShow();
            }

          } else {
            this.disclaimerShow();
          }
        } else {
          this.disclaimerShow();
        }
      }
    } else {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails));
        localStorage.setItem('selectedProductDetails', JSON.stringify(this.selectedProductDetails));
      }
      this.enableChooseWay();
    }
  }

  runPlanOnlyDisclaimer(oPlan, total) {
    if (!oPlan && !total) {
      return;
    }

    // if ordered plan is undefined set it to null.
    if (!this.orderPlan) {
      this.orderPlan = null;
    }
    // Get order plan req details.
    if (this.orderPlan) {
      this.orderReqPlanBundle = this.data.order_plan_bundle;
      this.orderReqServiceBundle = this.data.order_service_bundle;
      this.orderReqPlanComponent = this.data.order_plan_component;
      this.selectedProductSku = this.data.PlanSku;
    }

    this.orderDetails = {
      sku: this.selectedProductSku,
      price: total,
    };
    this.selectedProductDetails = {
      selectedProductSku: this.selectedProductSku,
      orderPhoneNo: this.orderPhoneNo,
      eligibilty: this.eligibilty,
      orderPlan: this.orderPlan,
      orderPlanName: this.orderPlanName,
      orderAddOnpass: (oPlan.addOnPass !== null) ? oPlan.addOnPass : null,
      orderSubpass: (oPlan.subPass !== null) ? oPlan.subPass : null,
      orderMonthlyPay: this.orderMonthlyPay,
      orderOneTimePay: this.orderOneTimePay,
      orderTotalPay: this.orderTotalPay,
      orderNumberType: this.orderNumberType,
      selectedPlanDetails: this.PlanOnlyObjectForCart.selectedPlanDetails,
      total: total,
      orderReqPlanBundle: this.orderReqPlanBundle,
      orderReqServiceBundle: this.orderReqServiceBundle,
      orderReqPlanComponent: this.orderReqPlanComponent,
    };

    this.itemSubmitted = true;
    if (localStorage && localStorage.getItem("ContractEndDate")) {
      const contractLengthAvailable = localStorage.getItem("ContractAgree");
      if (localStorage.getItem("ContractEndDate") !== "null") {
        if (contractLengthAvailable !== 'true') {
          return false;
        }
      }
    }

    if (this.selectedProd && this.selectedProd.sku) {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem("EDIT_PRODUCT", JSON.stringify(this.selectedProd));
      }
    }
    if (localStorage && sessionStorage && (localStorage.getItem("MyMsIsdn") || sessionStorage.getItem("USER_TYPE")) &&
      (sessionStorage.getItem("UserInfo") || sessionStorage.getItem("GuestInfo")) && sessionStorage.getItem("UserToken")) {
      if (this.productToRemoveFromCart !== null && this.productToRemoveFromCart !== undefined) {
        this.EditProduct();
      } else {
        this.disclaimerShow();
      }
    } else {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails));
        localStorage.setItem('PlanOnlyObjectForCart', JSON.stringify(this.selectedProductDetails));
      }
      this.enableChooseWay();
    }
  }

  EditProduct() {
    if (this.productToRemoveFromCart.selectedProduct) {
      // Update localstorage cart
      const cart = this.cartService.retrieveCart();
      const item =
        cart.items.find((p) => p.selectedProduct.selectedProductSku === this.productToRemoveFromCart.selectedProduct.selectedProductSku);
      if (item !== undefined) {
        item.quantity = 0;
        cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
      }
      cart.setTotalPrices(cart);
      this.cartService.save(cart);
    }
    let is_pre_order = false;
    if (this.productToRemoveFromCart.isPreorder) {
      is_pre_order = true;
    }
    const url = "/rest/V1/deletecart/";
    const requestBody = {
      "data": {
        "user": "user",
        "item_id": this.productToRemoveFromCart.item_id,
        "cart_item_sku": this.productToRemoveFromCart.skuBundle,
        "is_preorder": is_pre_order
      }
    };
    this.appService.postEstoreUserData(url, requestBody).subscribe(
      (response: any) => {
        // Remove local storage data once item deleted from cart.
        if (localStorage && localStorage.getItem("selectedProductDetails")) {
          localStorage.removeItem("selectedProductDetails");
        }
        if (typeof window !== 'undefined' && localStorage && sessionStorage &&
          localStorage.getItem("MyMsIsdn") && sessionStorage.getItem("UserInfo")) {
          if (localStorage && this.MNPEdit === "YES" && this.isPlanURL && !localStorage.getItem("COBP_FLOW")) {
           this.addTocartForBundle();     // to check the postpaid lines and then calling add to cart.
          } else {
            if (this.productToRemoveFromCart.selectedProduct.orderPlanName &&
              this.productToRemoveFromCart.selectedProduct.orderPlan && !this.productToRemoveFromCart.selectedProduct.orderDeviceName) {
              this.disclaimerShow();
            } else {
              if (localStorage && this.MNPEdit === "YES" && localStorage.getItem("MNP-FLOW") &&
                localStorage.getItem("MNP-FLOW") === 'YES' && this.productToRemoveFromCart.selectedProduct.orderPlan &&
                this.productToRemoveFromCart.selectedProduct.orderDeviceName) {
                this.addTocartForBundle();
              } else {
                if (localStorage && this.MNPEdit === "NO" && localStorage.getItem("MNP-FLOW") &&
                  localStorage.getItem("MNP-FLOW") === 'YES' && this.productToRemoveFromCart.selectedProduct.orderPlan &&
                  this.productToRemoveFromCart.selectedProduct.orderDeviceName) {
                  this.addTocartForBundle();
                } else {
                  this.disclaimerShow();
                }

              }
            }
          }
        } else {
          if (localStorage && this.MNPEdit === "YES" && !localStorage.getItem("COBP_FLOW") &&
            !this.productToRemoveFromCart.selectedProduct.orderDeviceName) {
            this.CallAddTOCartForPlanOnly();
          } else if (localStorage && this.MNPEdit === "YES" && !localStorage.getItem("COBP_FLOW") &&
            this.productToRemoveFromCart.selectedProduct.orderDeviceName && this.productToRemoveFromCart.selectedProduct.orderPlanName) {
            this.addTocartForBundle();
          } else {
              this.disclaimerShow();
          }
        }
      });
  }

  addEditProductMNP() {
    this.orderDetails = {
      sku: this.param1,
      price: this.param3,
    };

    if (this.param1 && this.data !== undefined && this.data.associated_product !== undefined) {
      this.data.associated_product.forEach(eachItem => {
        if (eachItem.color === this.orderSummaryColor && eachItem.memory === this.orderSummaryStorage) {
          this.orderReqColor = eachItem.order_color;
          this.orderReqPartNumber = eachItem.part_number;
          this.orderReqModel = eachItem.order_model;
        }
      });
    }

    // Get order plan req details.
    if (this.orderPlan && this.data !== undefined && this.data.choose_plan !== undefined ) {
      this.data.choose_plan.forEach(eachPlanType => {
        eachPlanType.tabData.forEach(eachPlan => {
          if (eachPlan.sku === this.orderPlan) {
            this.orderReqPlanBundle = eachPlan.orderPlanBundle;
            this.orderReqServiceBundle = eachPlan.orderServiceBundle;
            this.orderReqPlanComponent = eachPlan.orderPlanComponent;
            this.selectedPlanDetails = eachPlan;
          }
        });
      });
    }
    this.selectedProductDetails = {
      orderDevice: (!this.param1.bundleSku ) ? this.param1 : this.param1.bundleSku,
      selectedProductSku:  (!this.param1.deviceSku ) ? this.selectedProductSku : this.param1.deviceSku,
      orderDeviceName: this.orderDeviceName,
      selectedImageList: this.selectedImageList,
      orderSummaryStorage: this.orderSummaryStorage,
      orderSummaryColor: this.orderSummaryColor,
      orderPhoneNo: this.orderPhoneNo,
      eligibilty: this.eligibilty,
      orderPlan: (!this.orderPlan) ? this.param2.basePlan : this.orderPlan,
      selectedPlanDetails: this.selectedPlanDetails,
      orderPlanName: (!this.orderPlanName) ? this.param2.basePlan : this.orderPlanName,
      orderAddOnpass: (this.param2.addOnPass) ? this.param2.addOnPass : null,
      orderSubpass: (this.param2.addOnPass) ? this.param2.subPass : null,
      orderDevicePrice: this.orderDevicePrice,
      orderMonthlyPay: this.orderMonthlyPay,
      orderOneTimePay: this.orderOneTimePay,
      orderTotalPay: this.orderTotalPay,
      orderNumberType: this.orderNumberType,
      total: this.param3,
      stockDetails: this.stockDetials,
      orderReqCategory: (this.data !== undefined && this.data.basic_details !== undefined) ? this.data.basic_details.order_category : null ,
      orderReqModel: this.orderReqModel,
      orderReqBrand: (this.data !== undefined  && this.data.basic_details !== undefined) ?  this.data.basic_details.order_brand : null,
      orderReqColor: this.orderReqColor,
      orderReqPartNumber: this.orderReqPartNumber,
      orderReqPlanBundle: this.orderReqPlanBundle,
      orderReqServiceBundle: this.orderReqServiceBundle,
      orderReqPlanComponent: this.orderReqPlanComponent,
      orderMoon: this.isMoon,
      orderStar: this.isProjectStar,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails));
      localStorage.setItem('selectedProductDetails', JSON.stringify(this.selectedProductDetails));
    }
  }

  disclaimerShow() {
    this.showDisclaimer = (this.orderNumberType != null && this.orderNumberType !== "NewNumber" &&
      this.orderNumberType !== "SwitchToCelcom");
    if (!this.showDisclaimer) {
      // this.callAddToCartService();
      this.addTocartForBundle();
    } else {
      if (this.orderNumberType === 'KeepNumber') {
        this.orderDetails.isMoon = this.isMoon;
        this.selectedProductDetails.isMoon = this.isMoon;
        // setTimeout(() => {
        //   this.showDisclaimer = false;
        // }, 0);
        // setTimeout(() => {
        //   this.showDisclaimer = true;
        // }, 0);
        this.showDisclaimer = true;
      }
    }
  }

  checkForLimitExceeded() {
    if (this.isLimitExceededBundle) {
      // display popup for exceeding connection limit
      this.UserConnectionLimitExceeded();
    } else if (this.isLimitExceededIncludingOpenOrders) {
      const eligibilityInfo = {
        isEligibleByAge: false,
        displayType: 'LIMIT_EXCEEDED_WITH_OPEN_COUNT',
        type: 'xpax'
      };
      this._globalErrorHandler.errorObjectConvert(eligibilityInfo.displayType);
      this.EligibilityPopupType = JSON.parse(JSON.stringify(eligibilityInfo));
      this.IsDisplayAgeEligibilityPopup = true;
    } else {
      if (this.planTypeToPass === "x") {
        const eligibilityInfo: any = this.FindEligibilityForPostpaidPlans(this.selectedProductDetails.selectedPlanDetails);
        if (eligibilityInfo.isEligibleByAge === false) {
          this.DisplayAgeEligibilityPopup(eligibilityInfo);
        } else {
          if (this.reserveNumberData.type === "device_plan" &&
          (this.isPlanURL === false || this.isMoon === true || this.isProjectStar === true)) {
            this.callAddToCartService();
          } else if (this.reserveNumberData.type === "planonly" && this.isPlanURL === true) {
            this.addTocartPlanOnly();
          }
        }
      } else {
        if (this.reserveNumberData.type === "device_plan" &&
        (this.isPlanURL === false || this.isMoon === true || this.isProjectStar === true)) {
          this.callAddToCartService();
        } else if ((((this.reserveNumberData.type === "planonly") || (this.reserveNumberData.type === "mnp")) && this.isPlanURL === true)) {
          this.addTocartPlanOnly();
        }
      }
    }
  }

  addTocartForBundle() {
    if (typeof window !== 'undefined' && localStorage && !localStorage.getItem("BuyNoPlan")) {
      if (localStorage && sessionStorage && (localStorage.getItem("MyMsIsdn") || sessionStorage.getItem("USER_TYPE")) &&
        (sessionStorage.getItem("UserInfo") || sessionStorage.getItem("GuestInfo"))
        && sessionStorage.getItem("UserToken")) {
        // let customerNRIC: any = null;
        // let planType = "postpaid";
        if (localStorage && sessionStorage && localStorage.getItem("MyMsIsdn") && sessionStorage.getItem("UserInfo")) {
          this.isLimitExceededBundle = this.cartService.checkNumberOfLinesUserHas(
            JSON.parse(sessionStorage.getItem("UserInfo")).outputCPResp);
          this.customerNRIC = JSON.parse(sessionStorage.getItem("UserInfo")).outputCPResp.customerID;
          const msisdnNumber = localStorage.getItem("MyMsIsdn");
          const services = JSON.parse(sessionStorage.getItem("UserInfo")).outputCPResp.services || [];
          services.forEach(element => {
            let mobileNumber;
            if (element.mobileNumber.charAt(0) !== "6") {
              mobileNumber = "6" + element.mobileNumber;
            } else {
              mobileNumber = element.mobileNumber;
            }
            if (mobileNumber === msisdnNumber) {
              this.planType = element.pre_Pos_Indicator;
            }
          });
        }
        if (sessionStorage && sessionStorage.getItem("USER_TYPE") && localStorage &&
          ["GUEST", "ENTERPRISE"].includes(sessionStorage.getItem("USER_TYPE")) && sessionStorage.getItem("GuestInfo")) {
          const GuestInfo = JSON.parse(sessionStorage.getItem("GuestInfo")).outputCPResp
          if (GuestInfo) {
            this.isLimitExceededBundle = this.cartService.checkNumberOfLinesUserHasGuest(GuestInfo);
            this.customerNRIC = GuestInfo.customerID;

            if (GuestInfo.services && GuestInfo.services[0] && GuestInfo.services[0].pre_Pos_Indicator) {
              this.planType = GuestInfo.services[0].pre_Pos_Indicator;
            }
          }
        }

        let noOfLines: number;
        this.planType = 'Postpaid';
        if (this.planType === 'Prepaid') {
          noOfLines = 5;
        } else if (this.planType === 'Postpaid') {
          noOfLines = 15;
        }

        if (this.customerNRIC) {
          let noOfSuppLinesAdded = 0;
          if (typeof window !== 'undefined' && localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
            if (this.suppLinesDetails !== undefined) {
              noOfSuppLinesAdded = this.suppLinesDetails.length;
            }
          }
          this.orderInfoService.ViewOrderInfo(this.customerNRIC, this.planType).subscribe(
            (response: any) => {
              if (response && response.exception === false) {
                if (response.order_data && response.order_data.total_lines) {
                  const count = response.order_data.total_lines;
                  if (Number(count) + noOfSuppLinesAdded >= noOfLines) {
                    this.isLimitExceededIncludingOpenOrders = true;
                    this.suppDetailsOfUser = {
                      "status": false,
                      "maxPostpaidLinesRemaining": (noOfLines - Number(count)) - 1,
                      "message": "Maximum limit reached"
                    };
                  } else {
                    this.isLimitExceededIncludingOpenOrders = false;
                    this.suppDetailsOfUser = {
                      "status": true,
                      "maxPostpaidLinesRemaining": (noOfLines - Number(count)) - 1
                    };
                  }
                  if (typeof window !== 'undefined' && localStorage) {
                    localStorage.setItem("suppLinesDetailsOfUser", JSON.stringify(this.suppDetailsOfUser));
                  }
                  this.checkForLimitExceeded();
                }
              } else if (response && response.exception === true) {
                this.IsMnpFlowFromDevice = true;
                this.infoMNPflow = {};
                this.infoMNPflow.content = response.message;
                this.infoMNPflow.color = "";
                this.ToasterDisabled = true;
                this._plansService.updateAddtocartError(true);
              }
            }, (error: any) => {
              this.isLimitExceededIncludingOpenOrders = false;
              this.isLimitReachedError = true;
              this.disableAddToCart = true;
              this.previousPlanSelected = this.orderPlan;
              this.limitReachedErrorMsg = {};
              this.limitReachedErrorMsg.content = error.error.message || error.message || error || error.error;
              this._plansService.updateAddtocartError(true);
            });
        } else {
          this.checkForLimitExceeded();
        }

      } else {
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails));
          localStorage.setItem('PlanOnlyObjectForCart', this.cartService.customStringify(this.PlanOnlyObjectForCart));
        }
        this.enableChooseWay();
      }
    } else {
      this.callAddToCartService();
    }
  }

  callAddToCartService() {
    // let userToken = "";
    this.requestBody = {};
    this.createRequestBodyForSupp();
    const orderDevicePriceSendTo = this.RoundingOff(this.selectedProductDetails.orderDevicePrice);
    const totalToSend = this.RoundingOff(this.selectedProductDetails.total);
    if (sessionStorage && sessionStorage.getItem("USER_TYPE") && !sessionStorage.getItem("UserToken")) {
      this.userType = "guest";
    } else {
      this.userType = "user";
    }
    if (localStorage && localStorage.getItem("isPreOrder")) {
      this.isPreOrder = JSON.parse(localStorage.getItem("isPreOrder"));
    }
    // Added this for the MNP checking for order request body
    if (localStorage && localStorage.getItem("MNP-FLOW") === 'YES') {
      this.isMnp = true;
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
      this.reservationId = JSON.parse(localStorage.getItem("numberReservationId"));
    }

    let deviceReservationId = "IT000016";
    if (this.reservationId !== "") {
      deviceReservationId = this.reservationId;
    }
    if (this.selectedProductDetails.orderDevice && this.selectedProductDetails.orderPlanName) {
      let campaign_url = "";
      let promotionurlId = "";
      let passId = "";
      let deviceId = "";
      if (this.reservationId !== "") {
        deviceReservationId = this.reservationId;
      }
      if (localStorage.getItem("isMviva")) {
        this.isMviva = JSON.parse(localStorage.getItem("isMviva"));
      }
      if (this.isMviva) {
        if (window.location.href.indexOf("?promotiondetails=") > -1) {
         promotionurlId = this._getParamsService.getParameterByName('promotiondetails');
         passId = this._getParamsService.getParameterByName('pass');
         deviceId = this._getParamsService.getParameterByName('device');
         campaign_url = window.location.href.split('?')[0] + "?promotiondetails=" + promotionurlId;
         if (passId) {
          campaign_url = window.location.href.split('?')[0] + "?promotiondetails=" + promotionurlId + "&pass=" + passId;
          }
        if (passId && deviceId) {
         campaign_url = window.location.href.split('?')[0] + "?promotiondetails=" + promotionurlId +
          "&pass=" + passId + "&device=" + deviceId;
          }
        }
      }
      this.requestBody = {
        "data": {
          "bundle_product_sku": this.selectedProductDetails.orderDevice,
          "selected_device_product_sku": this.selectedProductDetails.selectedProductSku,
          "selected_plan_product_sku": (this.selectedProductDetails.orderPlan !== undefined) ? this.selectedProductDetails.orderPlan : this.selectedProductDetails.selectedPlanDetails.sku,
          "selected_pass_product_sku": this.selectedProductDetails.orderAddOnpass,
          "sub_pass_sku": this.selectedProductDetails.orderSubpass,
          "selected_device_product_up_fornt_price": this.selectedProductDetails.orderOneTimePay,
          "selected_device_product_device_price": orderDevicePriceSendTo,
          "bundle_product_qty": "1",
          "bundle_product_price": totalToSend,
          "selected_number": this.selectedProductDetails.orderPhoneNo,
          "selected_number_type": this.selectedProductDetails.orderNumberType,
          "temporary_number": this.randomPhoneNo,
          "is_mnp": this.isMnp,
          "is_cobp": false,
          "user": this.userType,
          "is_preorder": this.isPreOrder,
          "is_affiliate_ia": false,
          "is_affiliate_ada": false,
          "add_on_ids": this.addonCode, // lifestyle addon Id.
          "reservationId": this.reservationId,
          "is_campaign_mviva": this.isMviva,
          "campaign_mviva_url": campaign_url,
          "is_golden_number": this.isGoldenNumberSelected,
          "is_star_internet_share": this.suppLineRequestBody.length > 0 ? this.isInternetShareChecked : false
        },
        "supp_data": this.suppLineRequestBody,
        // Added for the Resevation of SKU device + plan
        "stockReserveQuantityInput": this._productService.getStockAvailabilityRequest(
          this.selectedProductDetails,
          this.outletId,
          deviceReservationId
        ),
      };
    } else if (this.selectedProductDetails.orderDevice && !this.selectedProductDetails.orderPlanName) {
      this.requestBody = {
        "data": {
          "bundle_product_sku": this.selectedProductDetails.orderDevice,
          "selected_device_product_sku": this.selectedProductDetails.selectedProductSku,
          "selected_plan_product_sku": "null",
          "selected_device_product_up_fornt_price": "0",
          "selected_device_product_device_price": totalToSend,
          "device_product_qty": "1",
          "device_product_price": totalToSend,
          "is_mnp": this.isMnp,
          "is_cobp": false,
          "user": this.userType,
          "is_preorder": this.isPreOrder,
          "is_affiliate_ia": false,
          "is_affiliate_ada": false,
          "is_golden_number": this.isGoldenNumberSelected,
          "is_star_internet_share": this.isInternetShareChecked,
        },
        // Added for the Resevation of SKU device only
        "stockReserveQuantityInput": this._productService.getStockAvailabilityRequest(
          this.selectedProductDetails,
          this.outletId,
          deviceReservationId
        ),
      };
    }
    this.requestBody = {
      ...this.requestBody,
      data: {
        ...this.requestBody?.data,
        is_campaign_omni: !!this.campaignOmni,
      }
    };
    if (typeof window !== 'undefined' && sessionStorage && localStorage) {
      // userToken = sessionStorage.getItem('UserToken');
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    if (!this.isInsideContainer && this.cart && this.cart.items && this.cart.items.length > 0) {
      this.IsMnpFlowFromDevice = true;
      this.infoMNPflow = {};
      this.infoMNPflow.content = "Note: You can only add another item after you have checked out with your existing items in the cart.";
      this.infoMNPflow.color = "7D7D7D";
      this.ToasterDisabled = true;
    } else {
      if (typeof window !== "undefined" && this.cookieService.check('orderItem')) {
        if (this.requestBody && this.requestBody.data) {
          this.requestBody.data.is_affiliate_ia = this.isIA; // set IA = true
        }
      }
      if (typeof window !== "undefined" && this.cookieService.check('adaRemainingDays')) {
        if (this.requestBody && this.requestBody.data) {
          const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
          this.requestBody.data.is_affiliate_ia = this.isNotIA; // set IA = false
          this.requestBody.data.is_affiliate_ada = adaRemainingDays.name;
        }
      }
      this.bundleService.BundleOrder(this.requestBody).subscribe(
        (response: any) => {
          if(response[0].blacklist === true) {
            this.isPopUpBlacklist = true;
            this.infoBlacklisted = {
              title: 'Uh Oh!',
              content: response[0].message ? response[0].message : SYS_DOWN_MSG,
              button: 'Got it!',
            };
            this.disableAddToCartButtonBlacklisted = true;
            return;
          }
          if (response && response[0] && response[0].status === false) {
            this._plansService.updateAddtocartError(true);
          }
          if (response && response[0] && response[0].status === true) {
            if (localStorage && sessionStorage && sessionStorage.getItem("USER_TYPE") && !sessionStorage.getItem("UserToken")) {
              localStorage.setItem('GUEST_CART_ID', response[0].cart_id);
            }
            this.AddToCartNotification();
            this.cartService.addProductToCart(this.orderDetails, 1, this.selectedProductDetails);
            this._estoreAnalyticsService.onClickAddToCart(this._renderer);  // Analytics to track add to cart
            this.redirectToNextPage();
          } else if (response && response[0] && response[0].status === false &&
            (response[0].message === "SESSION IN VALID" || response[0].message === "SESSION INVALID")) {
            this._router.navigateByUrl('/device-detail/' + this.selectedProductDetails.orderDevice);
            // this.errorAddToCart = true;
            this.sessionInvalid = true;
            // this.errorStockNotAvail = true;
            // this.stockErrorMessage = {};
            // this.stockErrorMessage.content = response[0].message;
          } else if (response && response[0] && response[0].status === false &&
            response[0].message === 'No Qty available for selected pre order product!') {
            this.IsMnpFlowFromDevice = true;
            this.infoMNPflow = {};
            this.infoMNPflow.content = "Uh Oh. Device is now out of stock. Please select another device.";
            this.ToasterDisabled = true;
          } else if (response && response[0] && response[0].status === false && response[0].message) {
            this.IsMnpFlowFromDevice = true;
            this.infoMNPflow = {};
            this.infoMNPflow.content = response[0].message;
            this.ToasterDisabled = true;
          } else if (localStorage) {
            localStorage.removeItem("EDIT_PRODUCT");
          }

          if (localStorage && localStorage.getItem("isPreOrder")) {
            localStorage.removeItem("isPreOrder");
          }
        }, (errorMessage: any) => {
          if (!errorMessage.error.success) {
            this.sessionInvalid = true;
          } else {
            this.errorStockNotAvail = true;
            this.stockErrorMessage = {};
            this.stockErrorMessage.content = errorMessage.message;
          }
        });
    }
  }

  public itemExistsInCart(data) {
    this.IsMnpFlowFromDevice = data.IsMnpFlowFromDevice;
    this.infoMNPflow = data.infoMNPflow;
    this.infoMNPflow.content = data.infoMNPflow.content;
    this.infoMNPflow.color = data.infoMNPflow.color;
    this.disableAddToCartButton = data.disableButton;
  }

  checkValidItem() {
    if (this.outOfStock === null || this.outOfStock === this.formConst.PRODUCT_CHECKING_STOCK_MSG ||
      this.outOfStock === this.formConst.PRODUCT_OUT_OF_STOCK_MSG) {
      return true;
    }
    if (this.orderPlan == null || this.orderPlan === '') {
      if (!this.itemSubmitted && this.orderSummaryColor && this.orderDevicePrice && this.orderSummaryStorage && this.orderDevice) {
        return false;
      } else {
        return true;
      }
    } else if (this.orderPlan != null && this.orderPhoneNo != null) {
      if (!this.itemSubmitted && this.orderSummaryColor && this.orderDevicePrice && this.orderSummaryStorage && this.orderDevice) {
        return false;
      } else {
        if (this.orderPlan != null && this.orderPhoneNo != null && this.itemSubmitted &&
          this.orderDevice && this.previousPlanSelected !== this.orderPlan && this.previousPlanSelected !== null) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  }

  checkMaxLimit() {
    if (this.maxLimitReached) {
      return true;
    } else {
      return false;
    }
  }

  CheckValidityForPlan() {
    if (this.data.TableInfo && this.orderPhoneNo != null && this.disableAddToCart === false) {
      return false;
    } else if (this.disableAddToCart === true) {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.removeItem("EligibilityIndicator");
      }
      return true;
    } else {
      return true;
    }
  }

  CheckValidityForMNP() {
    const isLoggedIn = this.userService.isCustomer();
    if ((localStorage && localStorage.getItem("Eligible") === "false") || this.IsMnpFlowFromDevice) {
      return true;
    } else if (isLoggedIn) {
      return false;
    }
    return true;
  }

  addTocartPlanOnly() {
    this.createPlanOnlyCart();
    if (localStorage && sessionStorage && (localStorage.getItem("MyMsIsdn") || sessionStorage.getItem("USER_TYPE")) &&
      (sessionStorage.getItem("UserInfo") || sessionStorage.getItem("GuestInfo")) && sessionStorage.getItem("UserToken")) {
      // let isConnectionLimitExceeded: any;
      // let isSuppLinesCountValid = false;
      // if (localStorage && localStorage.getItem("MyMsIsdn") && sessionStorage &&
      //   sessionStorage.getItem("UserInfo") && sessionStorage.getItem("UserToken")) {
      //   isSuppLinesCountValid = this.checkSuppLinesCountValidation(JSON.parse(sessionStorage.getItem("UserInfo")).outputCPResp);
      // }
      // if (localStorage && sessionStorage && sessionStorage.getItem("USER_TYPE") && localStorage &&
      //   ['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE")) && sessionStorage.getItem("UserToken")) {
      //   isConnectionLimitExceeded =
      //     this.cartService.checkNumberOfLinesUserHasGuest(JSON.parse(sessionStorage.getItem("GuestInfo")).outputCPResp);
      //   isSuppLinesCountValid = this.checkSuppLinesCountValidation(JSON.parse(sessionStorage.getItem("GuestInfo")).outputCPResp);
      // }
      // if (isConnectionLimitExceeded) {
      //   // display popup for exceeding connection limit
      //   this.UserConnectionLimitExceeded();
      // } else if (!isSuppLinesCountValid && !isConnectionLimitExceeded) {
      //   this.userSelectedMaxLines();
      // } else {
        if (this.data.is_xpax !== undefined) {
          const eligibilityInfo: any = this.FindEligibilityForPostpaidPlans(this.data);
          if (eligibilityInfo.isEligibleByAge === false) {
            this.DisplayAgeEligibilityPopup(eligibilityInfo);
          } else {
            this.CallAddTOCartForPlanOnly();
          }
        }
     // }
    } else {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('orderDetails', JSON.stringify(this.orderDetails));
        localStorage.setItem('PlanOnlyObjectForCart', this.cartService.customStringify(this.PlanOnlyObjectForCart));
      }
      this.enableChooseWay();

    }
  }

  CallAddTOCartForPlanOnly() {
    this.selectedProductDetails = {
      selectedProductSku: this.selectedProductSku,
      orderPhoneNo: this.orderPhoneNo,
      eligibilty: this.eligibilty,
      orderPlan: this.orderPlan,
      orderPlanName: this.orderPlanName,
      orderMonthlyPay: this.orderMonthlyPay,
      orderOneTimePay: this.orderOneTimePay,
      orderTotalPay: this.orderTotalPay,
      orderNumberType: this.orderNumberType,
      selectedPlanDetails: this.PlanOnlyObjectForCart.selectedPlanDetails,
      orderReqPlanBundle: this.orderReqPlanBundle,
      orderReqServiceBundle: this.orderReqServiceBundle,
      orderReqPlanComponent: this.orderReqPlanComponent,
    };
    let mnpCustomerId = null;
    let isMnp = false;
    this.createRequestBodyForPlanOnlySupp();
    if (localStorage && sessionStorage && sessionStorage.getItem("USER_TYPE") && !sessionStorage.getItem("UserToken")) {
      this.userType = "guest";
    } else {
      this.userType = "user";
    }
    if (localStorage && localStorage.getItem("MNP-FLOW") && localStorage.getItem("MNP-CUSTOMER")) {
      const mnpCustomer = JSON.parse(localStorage.getItem("MNP-CUSTOMER"));
      mnpCustomerId = mnpCustomer.customerID;
      isMnp = true;
    }
    if (typeof (this.selectedProductDetails.orderPhoneNo) === "string") {
      const phoneNo = this.selectedProductDetails.orderPhoneNo.charAt(0);
      if (phoneNo === '6') {
        this.selectedProductDetails.orderPhoneNo = this.selectedProductDetails.orderPhoneNo.substr(1);
      }
    } else {
      this.selectedProductDetails.orderPhoneNo = this.selectedProductDetails.orderPhoneNo.toString();
      const phoneNo = this.selectedProductDetails.orderPhoneNo.charAt(0);
      if (phoneNo === '6') {
        this.selectedProductDetails.orderPhoneNo = this.selectedProductDetails.orderPhoneNo.substr(1);
      }
    }
    if ((typeof (this.selectedProductDetails.orderPhoneNo) === "string") && this.selectedProductDetails.orderPhoneNo.charAt(0) === ' ') {
      this.selectedProductDetails.orderPhoneNo = this.selectedProductDetails.orderPhoneNo.slice(1);
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
      this.reservationId = JSON.parse(localStorage.getItem("numberReservationId"));
    }
    let campaign_url = "";
    let promoId = "";
    if (this.isMviva) {
      if (window.location.href.indexOf("?promotiondetails=") > -1) {
        promoId = this._getParamsService.getParameterByName('promotiondetails');
        campaign_url = window.location.href.split('?')[0] + "?promotiondetails=" + promoId;
       // campaign_url = window.location.href;
      }
    }
    this.requestBody = {
      "data": {
        "Sku": this.PlanOnlyObjectForCart.selectedProductSku,
        "PlanName": this.selectedProductDetails.orderPlanName,
        "TotalPay": this.selectedProductDetails.orderTotalPay,
        "selected_number": this.selectedProductDetails.orderPhoneNo,
        "user": this.userType,
        "is_cobp": false,
        "mnp_id": mnpCustomerId,
        "is_mnp": isMnp,
        "is_affiliate_ada": false,
        "is_affiliate_ia": false,
        "reservationId": this.reservationId,
        "selected_number_type": this.selectedProductDetails.orderNumberType,
        "add_on_ids": this.addonCode, // lifestyle addon Id.
        "is_campaign_mviva": this.isMviva,
        "campaign_mviva_url": campaign_url,
        "is_golden_number": this.isGoldenNumberSelected,
        "is_star_internet_share": this.isInternetShareChecked,
        "is_campaign_omni": !!this.__basePlan__?.campaign_omni,

      },
      // supplementary data for request
      "supp_data": this.suppLineRequestBody
    };

    if (this.cookieService.check('orderItem')) {
      // check order item from cookie
      if (this.requestBody && this.requestBody.data) {
        // set affiliate IA
        this.requestBody.data.is_affiliate_ia = true;
        // set affiliate IA
      }
    }
    if (this.cookieService.check('adaRemainingDays')) {
      // check request
      if (this.requestBody && this.requestBody.data) {
        this.requestBody.data.is_affiliate_ia = false; // If ADA exists, set IA as false
        // set affiliate ADA
        const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
        this.requestBody.data.is_affiliate_ada = adaRemainingDays.name;
        // set affiliate ADA
      }
    }
    if (typeof window !== 'undefined' && localStorage) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    if (!this.isInsideContainer && this.cart && this.cart.items && this.cart.items.length > 0) {
      this.IsMnpFlowFromDevice = true;
      this.infoMNPflow = {};
      this.infoMNPflow.content = "Note: You can only add another item after you have checked out with your existing items in the cart.";
      this.infoMNPflow.color = "7D7D7D";
      this.ToasterDisabled = true;
    } else {
      const options: any = null;
      const url = "/rest/V1/planaddtocart";
      this.appService.postEstoreUserData(url, this.requestBody).subscribe(
        (response: any) => {
          if (response[0].status === false) {
            this._plansService.updateAddtocartError(true);
          }
          if (response[0].status === true) {
            if (localStorage && sessionStorage && sessionStorage.getItem("USER_TYPE") && !sessionStorage.getItem("UserToken")) {
              localStorage.setItem('GUEST_CART_ID', response[0].cart_id);
            }
            this.redirectToNextPage();
            this.AddToCartNotification();
            this.cartService.addProductToCart(this.orderDetails, 1, this.PlanOnlyObjectForCart);
            this._estoreAnalyticsService.onClickAddToCart(this._renderer);  // Analytics to track add to cart
            if (typeof window !== 'undefined' && localStorage) {
              localStorage.removeItem("MNP-EDIT");
            }
          } else if (response[0].status === false &&
            (response[0].message === "SESSION IN VALID" || response[0].message === "SESSION INVALID")) {
            this.sessionInvalid = true;
          } else if (!this.isInsideContainer && response[0].status === false && response[0].message === "There is already one item in cart.") {
            this.IsMnpFlowFromDevice = true;
            this.infoMNPflow = {};
            this.infoMNPflow.content =
              "Note: You can only add another item after you have checked out with your existing items in the cart.";
            this.infoMNPflow.color = "7D7D7D";
            this.ToasterDisabled = true;
          } else if (response[0].status === false && response[0].message) {
            this.IsMnpFlowFromDevice = true;
            this.infoMNPflow = {};
            this.infoMNPflow.content = response[0].message;
            this.ToasterDisabled = true;
          } else {
            this.errorAddToCart = true;
          }
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.removeItem("checkToShowEditEligibilityBox");
            localStorage.removeItem("MNPCustomerData");
          }
        }, (errorResponse: any) => {
          if (typeof window !== 'undefined') {
            if (!errorResponse.error.success) {
              this.sessionInvalid = true;
            }
          }
          this._plansService.updateAddtocartError(true);
        });
    }
  }

  enableChooseWay() {
    let loginType = "customer";
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo") )) {
      loginType = "agentdealer";
    }
    switch (loginType) {
      case "agentdealer" :
      this.agentLoginChooseWay();
      break;
      case "customer" :
      this.customerLoginChooseWay();
      break;
    }
  }
  agentLoginChooseWay() {
    this._router.navigateByUrl('/store/login');
  }
  customerLoginChooseWay() {
    const that = this;
    setTimeout(function () {
      that.chooseYourWay = false;
    }, 0);
    setTimeout(function () {
      that.chooseYourWay = true;
    }, 0);

    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem('isBundleClicked') && localStorage.getItem('isBundleClicked') === 'true') {
        this.suppObj = {};
        if (localStorage.getItem("selectedColor")) {
          this.suppObj.color = localStorage.getItem("selectedColor");
        }
        if (localStorage.getItem("selectedStorage")) {
          this.suppObj.storage = localStorage.getItem("selectedStorage");
        }
        if (localStorage.getItem("DeviceSku")) {
          this.suppObj.sku = localStorage.getItem("DeviceSku");
        }
        if (localStorage.getItem("SelectedPlan")) {
          this.suppObj.planSku = localStorage.getItem("SelectedPlan");
        }
        if (localStorage.getItem("SelectedPlanDetails")) {
          this.suppObj.planDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
        }
        if (localStorage.getItem("SelectedMonthlyPay")) {
          this.suppObj.monthlyPay = localStorage.getItem("SelectedMonthlyPay");
        }
        if (localStorage.getItem("SelectedPlanName")) {
          this.suppObj.planName = localStorage.getItem("SelectedPlanName");
        }
        if (localStorage.getItem("suppLinesAddedByTheUser")) {
          this.suppObj.suppLinesDetails = JSON.parse(localStorage.getItem("suppLinesAddedByTheUser"));
        }
        if (localStorage.getItem("Principal_Number")) {
          this.suppObj.principalNum = localStorage.getItem("Principal_Number");
        } else if (localStorage.getItem('suppNumber')) {
          this.suppObj.principalNum = localStorage.getItem("suppNumber");
        }
        localStorage.setItem("selectionAfterLogin", JSON.stringify(this.suppObj));
      }
    }
  }
  disableChooseWay() {
    this.chooseYourWay = this.itemSubmitted = false;
    this._plansService.updateAddtocartError(true);
  }

  RoundingOff(value) {
    return this._commonUtilService.RoundingOff2String(value);
  }

  AddToCartNotification() {
    const addedToCart = true;
    // setTimeout(() => { // Commented as part of angular 6 upgradv
      this._deviceDataService.publishNotification(addedToCart);
    // }, 0);
  }

  private checkMobileConnectUser(services: any) {
    // check principle mobile number is exists are not
    // if exists return true
    // else return false
    if (services && services.length) {
      const accounts = _.filter(services, function (o) {
        return o.mobileNumber !== "" || o.principleMobileNumber !== "";
      });
      if (accounts.length) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  addToCartMNP(type, param1, param2, param3) {
    this.param1 = param1;
    this.param2 = param2;
    this.param3 = param3;
    if (window && localStorage) {
      localStorage.setItem('MNP-FLOW', 'YES');
      if (type === 'mnp') {
        this.createPlanOnlyCart();
      }
      if ((localStorage && sessionStorage && localStorage.getItem("MyMsIsdn") && sessionStorage.getItem("UserInfo")) ||
        sessionStorage.getItem("USER_TYPE")) {
        if (this.productToRemoveFromCart !== null && this.productToRemoveFromCart !== undefined) {
          // this.cartService.removeProductFromCart(this.productToRemoveFromCart);
          if (type === 'device_plan') {
            this.addEditProductMNP();
          }
          this.EditProduct();
        } else {
          if (type === 'mnp') {
            this.addTocartForBundle();
          } else if (type === 'device_plan') {
            this.runDisclaimer(param1, param2, param3);
          }
        }
      } else {
        if (type === 'device_plan') {
          this.addEditProductMNP();
        }
        if (this.isMoon && !this.mnpCheckPlanPurchase) {
          this.mnpCheckPlanPurchase = this.moonMnpCheckPlanPurchase;
        }
        if (this.mnpCheckPlanPurchase && this.mnpCheckPlanPurchase.customerData) {
          this._router.navigateByUrl('/store/login');
        } else {
          this._router.navigateByUrl('/store/guest/login');
        }
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("MNPRedirectionToLoginPage", "YES");
        }
      }
    }
  }

  OnContinueEligibilityCheck(data: any) {
    this.IsDisplayAgeEligibilityPopup = false;
    this.disableAddToCart = true;
    this.previousPlanSelected = this.orderPlan;
  }

  ManageAgeEligibilityTestForXpax() {
    const eligibilityInfo: any = this.FindEligibilityForPostpaidPlans(this.data);
    if (eligibilityInfo.isEligibleByAge === false) {
      this.DisplayAgeEligibilityPopup(eligibilityInfo);
    }
  }

  UserConnectionLimitExceeded() {
    const eligibilityInfo = {
      isEligibleByAge: false,
      displayType: 'LIMIT_EXCEEDED',
      type: 'xpax'
    };
    this._globalErrorHandler.errorObjectConvert(eligibilityInfo.displayType);
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("EligibilityIndicator", JSON.stringify(eligibilityInfo));
      if (typeof window !== 'undefined') {
        this.cartService.ManageEligibilityRedirection();
      }
    }
  }

  setStep(step: any) {
    if (step === 0) {
      this.step = this.step + 1;
    } else {
      this.step = step;
    }
    if (this.isProjectStar !== true && !this.orderPlanName && this.step === 3) {
      this.step = this.step + 1;
    }
    this.onAnchorClick(this.step);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onAnchorClick(val: any) {
    if (val === 1) {
      this.isStep1Active = true;
      this.isStep2Active = false;
      this.isStep3Active = false;
      this.isStep4Active = false;
    } else if (val === 2) {
      this.isStep1Active = false;
      this.isStep2Active = true;
      this.isStep3Active = false;
      this.isStep4Active = false;
    } else if (val === 3) {
      this.isStep1Active = false;
      this.isStep2Active = false;
      this.isStep3Active = true;
      this.isStep4Active = false;
    } else if (val === 4) {
      this.isStep1Active = false;
      this.isStep2Active = false;
      this.isStep3Active = false;
      this.isStep4Active = true;

    }

    if (typeof document !== 'undefined' && typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const aLink = document.querySelector("#section_" + val);
      if (val === 1 && aLink) {
        this.scrollToTop();
      } else if (!this.OrderDeviceExist && val === 2) {
        if (this.isProjectStar) {
          this.scrollToSection(val);
        } else {
          val = 1;
          this.scrollToSection(val);
        }
      } else if (aLink) {
        // For chrome, IE and Firefox use scrollTo().
        if (typeof window !== 'undefined') {
          this.scrollToSection(val);
        }
      }
    }
  }

  accordianOpen(ev) {
    ev.preventDefault();
    this.classActive = !this.classActive;
  }

  /**
   * To get the top position of element.
   * @param ele
   * Id of the element.
   */
  getPos(ele) {
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");
    const step4 = document.getElementById("step4");
    if (step1 != null && step2 != null && typeof window !== 'undefined') {
      if (ele === 2 && screen.width > 767) {
        let step2ExtraOffset = window.location.href.indexOf('device') !== -1 ? 20 : 0;
        if (sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
          step2ExtraOffset = step2ExtraOffset + 20;
        }
        return step1.offsetHeight + step2ExtraOffset;
      } else if (ele === 2 && screen.width <= 767) {
        const step2ExtraOffset = 0;
        return step1.offsetHeight + step2ExtraOffset;
      } else if (ele === 3 && screen.width > 767) {
        let dealerScrollPadding = 0;
        if (sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
          dealerScrollPadding = 480;
        } else {
          dealerScrollPadding = 310;
        }
        let step3ExtraOffset = window.location.href.indexOf('device') !== -1 ?
          step2.offsetHeight + dealerScrollPadding : (localStorage && localStorage.getItem("isMviva") &&
            JSON.parse(localStorage.getItem("isMviva")) === true) ?
            step2.offsetHeight + 30 : step2.offsetHeight + 0;
        if (localStorage && localStorage.getItem("isMviva") && JSON.parse(localStorage.getItem("isMviva")) === true &&
          localStorage.getItem("cobp-edit-flow") && JSON.parse(localStorage.getItem("cobp-edit-flow")) === true &&
          window.location.href.indexOf('plans/') > -1) {
          step3ExtraOffset = step3ExtraOffset + 300;
        } else if (localStorage && localStorage.getItem("cobp-edit-flow") &&
          JSON.parse(localStorage.getItem("cobp-edit-flow")) === true &&
          window.location.href.indexOf('plans/') > -1) {
            step3ExtraOffset = step3ExtraOffset + 110 + 200;
            if (sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
              step3ExtraOffset = 87;
            }
        }
        return step1.offsetHeight + step3ExtraOffset;
      } else if (ele === 3 && screen.width <= 767) {
        const step3ExtraOffset = window.location.href.indexOf('device') !== -1 ?
          step2.offsetHeight : (localStorage && localStorage.getItem("isMviva") &&
            JSON.parse(localStorage.getItem("isMviva")) === true) ?
            step2.offsetHeight - 10 : step2.offsetHeight + 130;
        return step1.offsetHeight + step3ExtraOffset;
      } else if (ele === 4 && step3 != null && screen.width > 767) {
          return step4.offsetTop - 180;
      } else if (ele === 4 && step3 != null && screen.width <= 767) {
        return step4.offsetTop - 120;
      } else if (ele === 4 && step3 == null) {
        if (localStorage.getItem("isDeviceOnlyClicked") === 'true') {
          return step4.offsetTop - 180;
        } else {
          return step1.offsetHeight + step2.offsetHeight;
        }
      }
    } else if (step1 == null && step2 != null) {
      if (ele === 3) {
        return step2.offsetHeight;
      } else if (ele === 4 && step3 != null) {
          return step2.offsetHeight + step3.offsetHeight;
      }
    }
  }
  // Add to cart for Star Plan and device bundle.
  isStarNumberReservedMagento() {
    const basePlan = (this.basePlanStar !== null && this.basePlanStar.sku !== null) ? this.basePlanStar.sku : null;
    let addOnPass = (this.orderPlanPass !== null && this.orderPlanPass.passSku !== null) ? this.orderPlanPass.passSku : null;
    let subPass = (this.orderPlanPass !== null && this.orderPlanPass.associatedPassSku !== null) ? this.orderPlanPass.associatedPassSku : null;
    let bundleSku = (this.basePlanStar !== null && this.basePlanStar.bundle_sku !== null) ? this.basePlanStar.bundle_sku : null;
    if (addOnPass == null && this.data.basic_details) {
      addOnPass = (!this.orderPlanPass || this.orderPlanPass.includes('GB')) ? 'Ultra-GB' : 'Ultra-Speed';
      bundleSku = this.data.basic_details.sku;
      subPass = this.orderPlanPass;
    }
    if (this.isDeviceOnly) {
      this.isNumberReservedMagento(
        "device_plan",
        bundleSku,
        null,
        this.orderTotalPay
      );
    } else {
      // Age eligibility check before adding item to cart.
      // Using first plans function FindEligibilityForPostpaidPlans.
      const eligibilityInfo: any = this.FindEligibilityForPostpaidPlans(this.isPlanURL ? this.data : this.selectedPlanDetails);
      if (eligibilityInfo.isEligibleByAge === false) {
        this.DisplayAgeEligibilityPopup(eligibilityInfo);
      } else {
        this.isNumberReservedMagento(
          "device_plan",
          { bundleSku, deviceSku: this.orderDevice },
          { basePlan, addOnPass, subPass},
          this.orderTotalPay
        );
      }
    }
  }
  // Add to cart for Star Plan and device bundle.
  isNumberReservedMagento(type: any, param1: any, param2: any, param3: any, param4: any = null) {
    this.reserveNumberData = {
      type: type,
      param1: param1,
      param2: param2,
      param3: param3,
      param4: param4
    };
    if (param4) {
     this.productToRemoveFromCart = param4;
    }
    // Device only no Phone number reservation.
    if (type === "mnp" || (localStorage && localStorage.getItem("MNP-FLOW") && localStorage.getItem("MNP-FLOW") === 'YES' &&
      type !== "device_plan" && !this.isPreOrder)) {
      this.addToCartMNP(type, param1, param2, param3);
    } else if (type === "device_plan" && !param2) {
      this.runDisclaimer(param1, param2, param3);
    } else {
      if (localStorage && localStorage.getItem("COBP_FLOW") === "YES") {
        if (type === "device_plan") {
          this.runDisclaimer(param1, param2, param3);
        } else if (type === "planonly") {
          this.runPlanOnlyDisclaimer(param1, param2);
        } else if (type === "mnp" || (localStorage && localStorage.getItem("MNP-FLOW") && localStorage.getItem("MNP-FLOW") === 'YES' &&
          type === "device_plan")) {
          this.addToCartMNP(type, param1, param2, param3);
        }
      } else {
        const mobileNumber = this.orderPhoneNo;
        // Added this for the MNP checking for order request body
        if (localStorage && localStorage.getItem("MNP-FLOW") === 'YES') {
          this.isMnp = true;
        } else {
          this.isMnp = false;
        }
        // mnp and preorder
        if (this.isMnp) {
          // Mnp randomizer called.
          this.getRandomPhoneNo();
        } else {
          this.callReserveNumber(mobileNumber);
        }
      }
    }
  }

  public callReserveNumber(mobileNumber) {
        if (typeof window !== 'undefined' && localStorage) {
          this.cart = JSON.parse(localStorage.getItem('cart'));
        }
        if (!this.isInsideContainer && this.cart && this.cart.items && this.cart.items.length > 0 && !localStorage.getItem("Edit-flow")) {
          this.IsMnpFlowFromDevice = true;
          this.infoMNPflow = {};
          this.infoMNPflow.content = "Note: You can only add another item after you have checked out with your existing items in the cart.";
          this.infoMNPflow.color = "7D7D7D";
          this.ToasterDisabled = true;
        } else {
          this.requestBodyForReserveNumber(mobileNumber);
          let numberReservationId = "";
          if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
            numberReservationId = JSON.parse(localStorage.getItem("numberReservationId"));
          }
          const numReservRequestBody = {
            "mobile_number": this.numList,
            "reservationId": numberReservationId,
            "data": this.suppReservationDetails
          };
          if (this.numList.length > 0) {
            const url = "/rest/V1/reserveNumber";
            this.appService.postEstoreUserData(url, numReservRequestBody)
              .subscribe(
              (response: any) => {
                const ReserveNumResponse = response[0];
                this.reservationId = response[0].reservationId;
                if (typeof window !== 'undefined' && localStorage) {
                  localStorage.setItem("numberReservationId", JSON.stringify(this.reservationId));
                }
                this._deviceDataService.publishNumberReservationId(this.reservationId);
                if (ReserveNumResponse.status) {
                  this.reserveNumberNotification = false;
                  if (this.reserveNumberData.type === "mnp" || localStorage &&
                    (localStorage.getItem("MNP-FLOW") &&
                     localStorage.getItem("MNP-FLOW") === 'YES' &&
                      this.reserveNumberData.type === "device_plan")) {
                      // add mnp to cart
                      this.addToCartMNP(this.reserveNumberData.type,
                      this.reserveNumberData.param1, this.reserveNumberData.param2, this.reserveNumberData.param3);
                  } else if (this.reserveNumberData.type === "planonly") {
                    // for plan journey
                    this.runPlanOnlyDisclaimer(this.reserveNumberData.param1, this.reserveNumberData.param2);
                  } else if (this.reserveNumberData.type === "device_plan") {
                    // for device bundle
                    this.runDisclaimer(this.reserveNumberData.param1, this.reserveNumberData.param2, this.reserveNumberData.param3);
                  }
                } else {
                  this.reserveNumberNotification = true;
                  this.ToasterDisabled = true;
                  this.numberExistsMessage = [{}];
                  this.numberExistsMessage.content = ReserveNumResponse.message;
                  this._plansService.updateAddtocartError(true);
                }
              }, (error: any) => {
                this.maximumReservation = true;
                this.ToasterDisabled = true;
                this.infoMaxLimit = {};
                this.infoMaxLimit.content = "Sorry for the inconvenience, we're giving our system a little update. Please try again later.";
                this._plansService.updateAddtocartError(true);
              });
          } else {
            if (this.reserveNumberData.type === "mnp" || localStorage &&
              (localStorage.getItem("MNP-FLOW") && localStorage.getItem("MNP-FLOW") === 'YES' &&
                this.reserveNumberData.type === "device_plan")) {
              this.addToCartMNP(this.reserveNumberData.type,
                this.reserveNumberData.param1, this.reserveNumberData.param2, this.reserveNumberData.param3);
            } else if (this.reserveNumberData.type === "device_plan") {
              this.runDisclaimer(this.reserveNumberData.param1, this.reserveNumberData.param2, this.reserveNumberData.param3);
            } else if (this.reserveNumberData.type === "planonly") {
              this.runPlanOnlyDisclaimer(this.reserveNumberData.param1, this.reserveNumberData.param2);
            }
          }
        }
      }
  public checkSuppLinesCountValidation(UserInfo: any) {
    if (typeof window !== 'undefined' && sessionStorage && localStorage) {
      if (sessionStorage.getItem("OLD_GUEST_USER") === "NO") {
        this.suppLinesInfoOfUser.status = true;
        this.suppLinesInfoOfUser.maxPostpaidLinesRemaining = 5;
      } else {
        this.suppLinesInfoOfUser = this._supplimentaryLinesService.checkNumberOfLinesUserHasForSuppLines(UserInfo);
      }
      localStorage.setItem("suppLinesDetailsOfUser", JSON.stringify(this.suppLinesInfoOfUser));
      if (localStorage.getItem("suppLinesAddedByTheUser")) {
        this.suppLinesDetails = JSON.parse(localStorage.getItem("suppLinesAddedByTheUser"));
        if (this.suppLinesDetails.length <= this.suppLinesInfoOfUser.maxPostpaidLinesRemaining) {
          // check max lines allowed
          return true;
        } else {
          // if user exceeds max lines
          return false;
        }
      } else {
        // if no supplementary lines added by user
        return true;
      }
    }
  }
  public createRequestBodyForSupp() {
    this.suppLineRequestBody = [];
    if (this.suppLinesDetails && this.suppLinesDetails.length > 0) {
      // check supplementary lines
      for (let k = 0; k < this.suppLinesDetails.length; k++) {
        this.suppLineRequestBody.push({
          // set number
          "number": this.suppLinesDetails[k].planPhoneNumber,
          // set plan
          "plan": this.suppLinesDetails[k].partNumber,
          // set subsidy
          "subsidy": this.suppLinesDetails[k].subsidyAmount ? this.suppLinesDetails[k].subsidyAmount : ""
        });
      }
    }
  }
  // set request for plan supplementary
  public createRequestBodyForPlanOnlySupp() {
    // initialize plan supplementary
    this.suppLineRequestBody = [];
    // check supplementary lines
    if (this.suppLinesDetails && this.suppLinesDetails.length > 0) {
      for (let j = 0; j < this.suppLinesDetails.length; j++) {
        this.suppLineRequestBody.push({
          // set plan
          "plan": this.suppLinesDetails[j].partNumber,
          // set number
          "number": this.suppLinesDetails[j].planPhoneNumber
        });
      }
    }
  }
  getRandomPhoneNo() {
    const dataForRetrieveNumberAPI = {
      NumberDetailsRetrieveRequest: {
        numberService: "POSTPAID",
        numberCategory: "NORMAL",
        numRecords: "20",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    this.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
  }

  public callRetrieveNumbersAPI(dataForRetrieveNumberAPI: any) {
    const apiUrl = "/store/v1/retrievenumbers?_format=hal_json";
    this._productService
      .GetNewNumbers(apiUrl, dataForRetrieveNumberAPI)
      .subscribe(
        response => {
          let numbersList;
          this.mobileNumbers = [];
          response.forEach(element => {
            this.mobileNumbers.push({ "number": element.servicenum });
          });
          numbersList = { "mobile_numbers": this.mobileNumbers };
          this.getRandomNumberAPI(numbersList);
        }
      );
  }

  private getRandomNumberAPI(numbersList: any) {
    const apiUrl = "/rest/V1/random-number";
    this._productService
      .getRandomNumber(apiUrl, numbersList)
      .subscribe(
        response => {
          if (response.status) {
            this.reserveNumberNotification = false;
            this.randomPhoneNo = response.number;
            if (typeof window !== 'undefined' && sessionStorage) {
              sessionStorage.setItem("RandomPhoneNo", this.randomPhoneNo);
            }
            this.reserverNumberAPI(this.randomPhoneNo);
            if (response.reservation_id) {
              this.reservationId = response.reservation_id;
              if (typeof window !== 'undefined' && localStorage) {
                localStorage.setItem("numberReservationId", JSON.stringify(this.reservationId));
              }
              this._deviceDataService.publishNumberReservationId(this.reservationId);
            }
          } else {
            this.reserveNumberNotification = true;
            this.numberExistsMessage = {};
            this.numberExistsMessage.content = response.message;
          }
        }
      );
  }

  public reserverNumberAPI(planNumber) {
    if (this.isMnp) {
      if (this.reserveNumberData.type === "mnp" || localStorage &&
        (localStorage.getItem("MNP-FLOW") && localStorage.getItem("MNP-FLOW") === 'YES' &&
          this.reserveNumberData.type === "device_plan")) {
        this.addToCartMNP(this.reserveNumberData.type,
          this.reserveNumberData.param1, this.reserveNumberData.param2, this.reserveNumberData.param3);
      }
    } else {
      this.callReserveNumber(this.randomPhoneNo);
    }
  }
  userSelectedMaxLines() {

  }
  requestBodyForReserveNumber(principleNum) {
    this.numList = [];
    // let storedNumber = [];
    this.numList.push((principleNum).trim());
    if (this.suppLinesDetails && this.suppLinesDetails !== null && this.suppLinesDetails !== []) {
      for (let i = 0; i < this.suppLinesDetails.length; i++) {
        this.numList.push((this.suppLinesDetails[i].planPhoneNumber).trim());
      }
      if (this.suppLinesDetails.length > 0) {
        if (this.isProjectStar) {
          this.suppReservationDetails = {
            "sku": this.basePlanStar ? this.basePlanStar.sku : "",
            "partNumber": this.suppLinesDetails[0].partNumber
          };
        } else {
        this.suppReservationDetails = {
          "sku": this.selectedPlanSku ? this.selectedPlanSku : this.selectedPlanDetails.sku,
          "partNumber": this.suppLinesDetails[0].partNumber
        };
      }
      } else {
        this.suppReservationDetails = {};
      }
    }
    localStorage.removeItem("Edit-flow");
  }

  ngOnDestroy() {
    this.IsMnpFlowFromDevice = false;
    this.infoMNPflow = null;
  }
  scrollToSection(id) {
    const element = document.getElementById("section_" + id);
    let offset = 105;
    if (id === 4) {
      offset = 185;
    }
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element ? element.getBoundingClientRect().top : 0;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    let starCobpEdit;
    if(typeof window !== undefined && localStorage && localStorage.getItem("Edit-flow") && localStorage.getItem("COBP_EDIT") === "YES" && this.checkUrlIfUltraPlan()) {
      starCobpEdit = true;
    }
    window.scrollTo({
      top: starCobpEdit ? 925 : offsetPosition,
      behavior: 'smooth'
    });
  }
  loadAnalyticsAddCartScript() {
    if (this.data && this.data.analytics_key_addtocart) {
      const analyticsKey = {
        FB_ID: this.data.analytics_key_addtocart.fb_add_cart_id,
        GOOGLE_GTAG_ID: this.data.analytics_key_addtocart.google_add_cart_id,
        TWITTER_PID: this.data.analytics_key_addtocart.twitter_add_cart_id
      };
      this._remarketAnalyticsService.LoadOnClickScripts(analyticsKey);
    }
  }
  /* project start Add to cart for Plan and bundle*/
  public starAddToCartButtonDisable(): boolean {
    if ((this.starConfirmPlanSelection()
    || this.starConfirmPlanWithDeviceSelection()
    || this.starConfirmDeviceSelection())) {
      this.checkEligibleUpfront = true;
      this.disableAddToCartButton = false;
    } else {
      this.disableAddToCartButton = true;
    }
    // Check for outOfStock
    if (this.outOfStock === null || this.outOfStock === this.formConst.PRODUCT_CHECKING_STOCK_MSG ||
      this.outOfStock === this.formConst.PRODUCT_OUT_OF_STOCK_MSG) {
      this.disableAddToCartButton = true;
    }

    if(this.checkEligibleUpfront === true) {
      if((this.starConfirmPlanCOBPDevicePenalty() && this.checkUrlIfUltraPlan() === true)) {
        if (typeof window !== 'undefined' && localStorage && localStorage.getItem('ContractAgree') !== null) {
          this.checkBoxPenalty = JSON.parse(localStorage.getItem('ContractAgree'));
          if(this.checkBoxPenalty === true) {
            this.disableAddToCartButton = false;
          } else {
            this.disableAddToCartButton = true;
          }
        }
      } else {
        this.disableAddToCartButton = false;
      }
    }

    if(this.disableAddToCartButtonBlacklisted) {
      this.disableAddToCartButton = true;
    }

    return this.disableAddToCartButton;
  }
  starConfirmDeviceSelection(): boolean {
    let returnDevice = false;
    if (this.isDeviceOnly) {
      returnDevice = true;
    }
    return returnDevice;
  }
  starConfirmPlanSelection(): boolean {
    let returnPlan = false;
    if (
      this.basePlanStar &&
      this.orderPlanPass &&
      !this.disableCartButton &&
      this.orderNumberType &&
      this.orderPhoneNo &&
      (
        // ? Check if the it's existing Celcom Customer
        // ? Or MNP Customer
        // ? - If MNP Customer, Check wether MNP is valid
        this.userService.isCustomer() ||
        (
          this.mnpData &&
          this.mnpData.IsMnp &&
          !(this.CheckValidityForMNP() || this.mnpEdited)
        )
      )
    ) {
      returnPlan = true;
    }
    return returnPlan;
  }

  starConfirmPlanCOBPDevicePenalty() {
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem('ContractAgreeValidation') !== null) {
      this.devicePenaltyValidation = JSON.parse(localStorage.getItem('ContractAgreeValidation'));
    }
    return this.devicePenaltyValidation;
  }

  checkUrlIfUltraPlan(){
    const plan_sku = this._activatedRoute.snapshot.params?.planPurchaseId + '';
    return plan_sku.startsWith(STAR_PLAN_PREFIX)
  };

  starConfirmPlanWithDeviceSelection(): boolean {
    let returnPlanWDevice = false;
    if (this.orderPlanPass && this.orderSummaryColor &&
       this.orderNumberType && this.orderPhoneNo &&
      !this.disableCartButton && this.outOfStock !== false &&
      (this.userService.isCustomer() || (this.mnpData && this.mnpData.IsMnp && !(this.CheckValidityForMNP() || this.mnpEdited)))) {
      returnPlanWDevice = true;
    }
    return returnPlanWDevice;
  }

  CloseBlacklistPopUp = () => this.isPopUpBlacklist = false;

  isAddtocartDisabled() {
    let disabled = true;
    if (this.OrderDeviceExist && this.isProjectStar !== true && !this.data.IsMnp) {
      disabled = this.checkValidItem() || this.IsMnpFlowFromDevice || this.checkMaxLimit() || this.mnpEdited || this.disableCartButton;
    } else if (this.isProjectStar) {
      disabled = this.starAddToCartButtonDisable();
    } else if (!this.OrderDeviceExist && this.isProjectStar !== true && !this.data.IsMnp && this.enableAddToCart) {
      disabled = this.CheckValidityForPlan() || this.checkMaxLimit() || this.disableAddToCartButton;
    } else if (this.data?.IsMnp && this.isProjectStar !== true) {
      disabled = this.CheckValidityForMNP();
    }
    // this._plansService.updateAddtocartButton(!disabled);
    return disabled;
  }

  onAddtocartClicked() {
    if (this.isAddtocartDisabled()) return false;
    this.loadAnalyticsAddCartScript();
    if (this.OrderDeviceExist && this.isProjectStar !== true && !this.data.IsMnp) {
      this.isNumberReservedMagento('device_plan',this.orderDevice,this.orderPlan,this.orderTotalPay);
    } else if (this.isProjectStar) {
      this.isStarNumberReservedMagento();
    } else if (!this.OrderDeviceExist && this.isProjectStar !== true && !this.data.IsMnp && this.enableAddToCart) {
      this.isNumberReservedMagento('planonly', this.orderPlan, this.orderTotalPay, null)
    } else if (this.data.IsMnp && this.isProjectStar !== true) {
      this.isNumberReservedMagento('mnp', undefined, undefined, undefined);
    }
  }

  redirectToNextPage() {
    if (!this.isInsideContainer) {
      this._router.navigateByUrl('/store/cart');
    } else {
      const cartHome = new CartHomeComponent(
        this.appService,
        this.cartService,
        this._router,
        null,
        this._activatedRoute,
        null,
        this._deviceDataService,
        this._commonUtilService,
        null,
        this._estoreAnalyticsService,
        null,
        this.userService,
        null,
        this._renderer,
        null,
        this._remarketAnalyticsService,
      );
      cartHome.redirectCheckout();
    }
  }
}
