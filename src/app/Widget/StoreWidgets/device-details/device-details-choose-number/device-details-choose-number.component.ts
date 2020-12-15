import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, Renderer2, Inject } from "@angular/core";
// import { Observable } from "rxjs/Rx";
import { Subscription, Observable } from "rxjs";
import { DeviceDetailsNumberService } from "./device-details-choose-number.service";
import { AppWidgetComponent } from "../../../../Model/app.widget.component";
import { BaseComponent } from "../../../../base.component";
import { ContentNavigation } from "../../../../Model/contentnavigation.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "../../../../Service/cart.service";
import { RedirectionService } from "../../../../Service/redirection.service";
import { DeviceDataService } from "../../../../Service/devicedata.service";
import { LoginService } from "../../../../Store/login/service/login.service";
import { environment } from 'environments/environment';
import { DeviceDetailsPlanComponent } from "../../device-details/device-details-plans-section/device-details-plans-section.component";
import { EStoreAnalysticsService } from '../../../../Service/store.analytic.service';
import { DeviceDetailsPlanService } from "../../device-details/device-details-plans-section/device-details-plans-section.service";
import { PlanTableComparisionService } from '../../plan-table-comparison/plan-table-comparison.service';
import { DomSanitizer } from "@angular/platform-browser";
import { DOCUMENT } from "@angular/common";
import { RendererService } from '../../../../Service/renderer.service';
import { type } from "os";
import { ProductService } from "../../../../Service/product.service";
import * as ApiConstant from '../../../../../constants/estoreEndPoint.constants';
import { TYPE_OF_PURCHASE, AUTO_BILLING, ACTION_TYPE } from '../../../../shared/constants/application.constants';
import { UserService } from '../../../../Service/user.service';
import { CommonUtilService } from "../../../../Service/commonUtil.service";
import { promise } from "selenium-webdriver";
import { flatMap } from "rxjs/operators";
import { msisdnHelper } from "../../../../shared/utilities/helper.ultility";
import { TypeofPurchaseService } from '../../../../Service/type-of-purchase.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { iPlan } from '../../../../shared/models/plan.model';
import { iMvivaCampaign } from 'app/shared/models/device.model';

@Component({
  selector: "app-device-details-choose-number",
  templateUrl: "./device-details-choose-number.component.html",
  styleUrls: ["./device-details-choose-number.component.css"],
  providers: [
    DeviceDetailsNumberService, RedirectionService, LoginService, CartService, UserService, CommonUtilService,
    DeviceDetailsPlanComponent, DeviceDetailsPlanService, PlanTableComparisionService
  ]
})
export class DeviceDetailsNumberComponent extends BaseComponent implements AppWidgetComponent, OnInit, AfterViewInit {
  @Input() isMoon: boolean;
  @Input() data: any;
  @Input() selectedProd: any;
  @Input() SelectionAferLogin: any;
  @Input() chosenPlan: any;
  @Input() isPromotion: any;
  @Input() addOnsSelected: any;
  @Input() supplimentaryData: any;
  @Input() isPrincipleClicked: any;
  @Output() mnpEligibilityCheckPlanPurchase = new EventEmitter();
  @Output() COBPEligibilityCheckPlanPurchase = new EventEmitter();
  @Output() resetPriceData = new EventEmitter();
  @Output() cOBPEligibilityCheckBundle = new EventEmitter();
  @Input() saleablePlanArray: any;
  @Input() typeOfPurchaseTabSelection: any;
  @Input() isProjectStar: boolean;
  public typeOfNumber: string = null; // Possible values: NULL, NEW_NUMBER, EXISTING_NUMBER, MNP_NUMBER
  public typeOfNumHighlight: string = null;
  public isUserLogggedIn = true;
  public msisdn: any = null;
  public DeviceDetailsNumberResponse = null;
  public selectedNumber: any = null;
  public loggedInNumber: any = null;
  public showContent: any;
  public isEligible: any = null;
  public Eligibility: any;
  public telcoDayRebate = null;
  public isPassSelected = false;
  public showEligibleRebate = false;
  public showNotEligibleRebate = false;
  public searchNumber: any;
  public itemCart: any;
  public getRefreshNumberdata: any;
  public selectedPlan: any = null;
  public planData: any = null;
  public retrievenumberURL = "/rest/V1/retrieve-number";
  public selectedPlanDetails: any = null;
  public deviceNumberToDisplay: any[];
  public isActive: boolean;
  private subscriber: Subscription;
  public selectedActivity: any = null;
  public numberMsisdn: any;
  public errorMessage: Object;
  public errorExits = false;
  public isCSAgent = false;
  public isDealer = false;
  public preventStyle: any;
  public reserveNumberResponse = false;
  public ShowMNPBlock = false;
  public SwitchToCelcom = false;
  public disableKeepNumber = false;
  public noNumbersToDisplay = false;
  public retrieveNumbersAPI = false;
  public showMNPFlowNotification = false;
  public maximumReservation = false;
  public isPostpaidFlow = false;
  public infoMaxLimit: any = null;
  public searchStatus = false;
  public isMnpFromEditCart = false;
  public loading: boolean;
  public infoMNPflow: any = null;
  public self: any;
  outletId: string = environment.outletId;
  isProd: string = environment.production;
  public isShowButton: boolean;
  public IsDisplayPlanEligibilityPopup = false;
  public COBPcontract = false;
  public selectedBlueXpax = false;
  public customerType: any = 1;
  blackListedSystem: string = environment.blackListedSystem;
  public editOrder: any;
  public mnpUserData: any;
  public apiFailure = false;
  public isChecked = false;
  public updatedMNPPrincipalNum: any = null;
  public updatedMNPUserData: any = null;
  // public objPlanUpgradeResponse: UpgradePlanResponse = new UpgradePlanResponse();
  public objPlanUpgradeResponse: any = "";
  public isPrincipleNumSelected = false;
  public isPlanURL = false;
  public MNPPreorderFlow = false;
  public oneTimePayOtherMNP: any;
  public totalPayOtherMNP: any;
  public isPreOrder: boolean;
  public isEasyPhone = false;
  public isBundleClicked = false;
  public isRentClicked = false;
  public isOwnClicked = false;
  public preorderEnded = false;
  public mnpPreSelected = false;
  public isMviva = false;
  public numberPreSelected = false;
  public cobpLoading = false;
  public lifestyleSelected = false;
  public cobpData;
  public typeOfPurchaseAnalyticFlag: boolean;
  public goldenPlanNote: string = null;
  public isInternallyBlacklisted = false;
  public isPopUpBlacklist = false;
  public isBlacklistedMessage = "";
  public infoBlacklisted:any;
  public chooseNumPlanCommunication = new DeviceDetailsPlanComponent(
    this.devicedetailsplanService,
    this._router,
    this._activatedRoute,
    this._redirectionService,
    this._deviceDataService,
    this._estoreAnalyticsService,
    this._service,
    this._renderer,
    this.sanitizer,
    null,
    this._userService,
    null);
  public noOfSuppLinesToDelete = 0;
  displayNumList = true;
  public IsDispalySwitchingPurchaseTypeTabPopup = false;
  public IsDisplayUpsellPopup = false;
  public cancelUpsell = false;
  public requestOldPromoNo: any;
  public buyOptionSelected = false;
  public numberCategory: any;
  // public objPlanUpgradeResponse: UpgradePlanResponse = new UpgradePlanResponse();
  public purchaseType: string;
  popupType: any = { type: "switchingpurchasetype" };
  passPopupType: any = {type: "upsellMoon"};
  reInitializeSupplines = false;
  tabSelected = false;
  DevicePagePurachaseTypeCLicked: string;
  easyphoneTabSelected = false;
  public isDeviceURL = false;
  public lineChosen = false;
  public isPlanPage = false;
  public noOfLinesToDelete = 0;
  public numberList = [];
  public adobePurchaseType = "";
  public disableNewLineCobpSTen = false;
  public isKardasianPlanSelected = false;
  public isEnableMnpTab = true;
  public isEnableCobpTab = true;
  public isEnableNewLineTab = true;
  selectedProductSku: any;
  enableNRICAuthentication = true;
  public pageType: any = 'dbInLine';
  private totalNumbers: any[];
  public pager: any = {};
  public totalPageItems: any[];
  public isUserLoggedIn = false;
  public isKardasianPlanSelectedTab = false;
  public isPremiumTabSelected = false;
  public isNormalTabSelected = false;
  public isGoldenNumberSelected = false;
  public displayMNPNote = false;
  public QueryParams: any;
  selectedDeviceInfoForMoon = null;
  public internetShareOption = false;
  public isProjectMoon = false;
  public typeOfPurchase;
  public isHomeWireless;
  public noteDataCMS = "";
  public isEnterprise = false;
  plan$: Observable<iPlan>;
  mvivaCampaign$: Observable<iMvivaCampaign>;
  isLegacyPlan$: Observable<boolean>;

  constructor(private devicedetailNumberservice: DeviceDetailsNumberService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private _redirectionService: RedirectionService,
    private _deviceDataService: DeviceDataService,
    private _loginService: LoginService,
    // private _mnpService: MnpService,
    private devicedetailsplanService: DeviceDetailsPlanService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _service: PlanTableComparisionService,
    public _renderer: Renderer2,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) public document,
    private _rendererService: RendererService,
    private _productService: ProductService,
    private _userService: UserService,
    private _commonUtilService: CommonUtilService,
    private topService: TypeofPurchaseService,
    private _planQuery: PlansQuery,
  ) {
    super();
    this.errorMessage = {
      message: "Uh Oh. Please enter [2-4] digits to search for your favourite number.",
      noNumbersDisplay: "Uh Oh. No numbers available for this pattern. Please try a different pattern.",
      apiError: "Uh Oh. Numbers are unavailable now. Please try again later."
    };
  }

  isDevicePage(): boolean {
    if (this.data && this.data.basic_details) {
      return true;
    }
    return false;
  }

  setDefaultSelectedValues() {
    // if(this.QueryParams){
    const planOnly = (window.location.href.indexOf("/plans/") > -1);
    const deviceBundle = (window.location.href.indexOf("/device-detail/") > -1);
    let step = 3;
    if (deviceBundle) {
      step = 4;
    }
    if ((this.QueryParams.mnp === "yes" || this.QueryParams.top === "mnp") && (planOnly || deviceBundle)) {
      this.mnpPreSelected = true;
      this.showmnpblock();
      this.ShowMNPBlock = true;
    } else if ((this.QueryParams.newNum === 'yes' || this.QueryParams.top === "nl")
    && (planOnly || (deviceBundle && this.DevicePagePurachaseTypeCLicked === 'Device Bundle'))) {
      this.numberPreSelected = true;
      this.onSwitchingPurchaseTypeTab('GetNewNumber');
    } else if (this.QueryParams.top === "cobp" && (planOnly || (deviceBundle
    && (this.DevicePagePurachaseTypeCLicked === 'Device Bundle' || this.isEasyPhone)))) {
      this.sameNumber();
    }
    this._deviceDataService.publishUpdateStickyStep(step);
  }

  get userType(){
    return sessionStorage ? sessionStorage.getItem("USER_TYPE") : null;
  }

  ngOnInit() {
    this.plan$ = this._planQuery.select(store => store.plan);
    this.mvivaCampaign$ = this._planQuery.select(store => store.mviva_campaign);
    this.isLegacyPlan$ = this._planQuery.isLegacyPlan$;

    this.isEnterprise = (this.userType == 'ENTERPRISE');
    this.isUserLoggedIn = this._userService.isCustomer();
    this.noteDataCMS = this.getNoteDataCMS();
    this._activatedRoute.queryParams.subscribe(params => {
      this.QueryParams = params;
      this.typeOfPurchaseAnalyticFlag = true;
      // this.setDefaultSelectedValues();
      // if ((params.mnp === "yes" && window.location.href.indexOf("/plans/") > -1) ||
      //   (params.top === "mnp")) {// && window.location.href.indexOf("/plans/") > -1)
      //   this.mnpPreSelected = true;
      //   this.showmnpblock();
      //   this.ShowMNPBlock = true;
      // } else if (params.newNum === 'yes' ) {//&& window.location.href.indexOf("/plans/") > -1
      //   this.numberPreSelected = true;
      // } else if (params.top === "new") {// && window.location.href.indexOf("/plans/") > -1
      //   this.numberPreSelected = true;
      // } else if (params.top === "cobp") {// && window.location.href.indexOf("/plans/") > -1
      //   this.sameNumber();
      // }
    });
    if (typeof window !== 'undefined' && window.location.href.indexOf("/plans/") > -1) {
      this.isPlanPage = true;
    }
    if (sessionStorage && sessionStorage.getItem("AgentInfo")) {
      this.isCSAgent = true;
    }
    this._deviceDataService.publishPhoneNo(null);
    this._deviceDataService.publishNumberType(null);
    if (this.data && this.data.plan_title) {
      if (localStorage && localStorage.getItem("SelectedPlanDetailsInDevice")) {
        localStorage.removeItem("SelectedPlanDetailsInDevice");
      }
    }
    if (sessionStorage && sessionStorage.getItem("DealerInfo")) {
      this.isDealer = true;
      if (this.typeOfPurchaseTabSelection !== undefined) {
        this.isEnableMnpTab = this.isDealer && this.typeOfPurchaseTabSelection.dealer.mnp;
        this.isEnableCobpTab =  this.isDealer && this.typeOfPurchaseTabSelection.dealer.cobp;
        this.isEnableNewLineTab =  this.isDealer && this.typeOfPurchaseTabSelection.dealer.newline;
      }
    }
    if (this._userService.isUserEnterprise() && this.typeOfPurchaseTabSelection && this.typeOfPurchaseTabSelection['enterprise']) {
      this.isEnableMnpTab = this.typeOfPurchaseTabSelection.enterprise.mnp;
      this.isEnableCobpTab =  this.typeOfPurchaseTabSelection.enterprise.cobp;
      this.isEnableNewLineTab =  this.typeOfPurchaseTabSelection.enterprise.newline;
    }
    if (localStorage && localStorage.getItem("preOrderEnded")) {
      this.preorderEnded = JSON.parse(localStorage.getItem("preOrderEnded"));
      localStorage.removeItem("preOrderEnded");
    }
    if (localStorage && localStorage.getItem("telcoDayRebate")) {
      this.telcoDayRebate = JSON.parse(localStorage.getItem("telcoDayRebate"));
      this.telcoDayRebateEligibility();
    }
    if (localStorage && localStorage.getItem("promotionallifestylePlans")) {
      if (JSON.parse(localStorage.getItem("promotionallifestylePlans")) === true) {
        this.lifestyleSelected = true;
      }
    }
    this.ShowMNPBlock = this.ShowMNPBlock ? this.ShowMNPBlock : false;
    if (window.location.href.indexOf("xpax") > -1 ||
     window.location.href.indexOf("blue") > -1) {
      this.selectedBlueXpax = true;
      if (localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
        localStorage.removeItem("suppLinesAddedByTheUser");
      }
      this._deviceDataService.publishAddToCartEnabling(true);
    } else {
      this.selectedBlueXpax = false;
      if (typeof window !== 'undefined' && localStorage && window.location.href.indexOf("/plans/") > -1) {
        const planName = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
        this.selectedPlanDetails = planName;
        if (planName) {
        if (planName && (planName.url_key.indexOf("xpax") > -1 || planName.url_key.indexOf("blue") > -1)) {
          this._deviceDataService.publishAddToCartEnabling(true);
          if (localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
            localStorage.removeItem("suppLinesAddedByTheUser");
          }
        }
       } else {
          this._deviceDataService.publishAddToCartEnabling(false);
        }
      }
    }
    if (localStorage && localStorage.getItem("isRentClicked")) {
      this.isRentClicked = JSON.parse(localStorage.getItem("isRentClicked"));
    }
    if (localStorage && localStorage.getItem("isEasyPhone")) {
      this.isEasyPhone = JSON.parse(localStorage.getItem("isEasyPhone"));
    }
    if (localStorage && localStorage.getItem("isBundleClicked")) {
      this.isBundleClicked = JSON.parse(localStorage.getItem("isBundleClicked"));
    }
    if (localStorage && localStorage.getItem("isOwnClicked")) {
      this.isOwnClicked = JSON.parse(localStorage.getItem("isOwnClicked"));
    }
    if (localStorage && localStorage.getItem("isMviva")) {
      this.isMviva = JSON.parse(localStorage.getItem("isMviva"));
      if (this.data.basic_details !== undefined &&
        this.data.basic_details.campaign_mviva &&
        this.data.basic_details.campaign_mviva.purchase_type) {
        this.isEnableMnpTab = this.data.basic_details.campaign_mviva.purchase_type.includes("mnp");
        this.isEnableCobpTab =   this.data.basic_details.campaign_mviva.purchase_type.includes("cobp");
        this.isEnableNewLineTab =   this.data.basic_details.campaign_mviva.purchase_type.includes("newline");
      }
      if (this.data.campaign_mviva &&
        this.data.campaign_mviva.purchase_type) {
        this.isEnableMnpTab = this.data.campaign_mviva.purchase_type.includes("mnp");
        this.isEnableCobpTab =   this.data.campaign_mviva.purchase_type.includes("cobp");
        this.isEnableNewLineTab =   this.data.campaign_mviva.purchase_type.includes("newline");
      }
      if (!!this.data.campaign_omni) {
        this.isEnableMnpTab = false;
        this.isEnableCobpTab =  true;
        this.isEnableNewLineTab =  false;
      }
    }
    if (this.selectedPlanDetails || (this.selectedProd && this.selectedProd.selectedPlanDetails)) {
      if ((this.selectedPlanDetails && this.selectedPlanDetails.is_premium_plan) ||
       (this.selectedProd && this.selectedProd.selectedPlanDetails && this.selectedProd.selectedPlanDetails.is_premium_plan)) {
        this.isKardasianPlanSelected = true;
        this.isKardasianPlanSelectedTab = true;
      } else {
        this.isKardasianPlanSelected = false;
        this.isKardasianPlanSelectedTab = false;
      }
    }
    if (localStorage.getItem("COBP_login_Check")) {
      localStorage.removeItem("COBP_login_Check");
    }
    if (localStorage.getItem("COBP_FLOW_CHECK")) {
      localStorage.removeItem("COBP_FLOW_CHECK");
    }
    this.subscriber = this._deviceDataService.sharedPlan$.subscribe(data => this.selectedPlan = data);
    this.subscriber = this._deviceDataService.sharedPlanDetails$.subscribe(data => this.planData = data);
    this.subscriber = this._deviceDataService.sharedPlan$.subscribe(data => this.selectedPlanDetails = data);
    this.subscriber = this._deviceDataService.runAutoBillingCheck$.subscribe(data => {
      this.callAutoBillingCheck();
    });
    this.subscriber = this._deviceDataService.isPreOrder$.subscribe(data => {
      this.isPreOrder = data;
    });
    this.subscriber = this._deviceDataService.cobpLoading$.subscribe(data => {
      setTimeout(() => {
        this.cobpLoading = data;
      }, 0);
    });
    this.subscriber = this._deviceDataService.isMviva$.subscribe(data => {
      this.isMviva = data;
    });
    this.subscriber = this._deviceDataService.isEasyPhone$.subscribe(data => {
      this.isEasyPhone = data;
    });
    this.subscriber = this._deviceDataService.isBundleClicked$.subscribe(data => {
      this.isBundleClicked = data;
    });
    this.subscriber = this._deviceDataService.isRentClicked$.subscribe(data => {
      this.isRentClicked = data;
    });
    this.subscriber = this._deviceDataService.isOwnClicked$.subscribe(data => {
      this.isOwnClicked = data;
    });
    this.subscriber = this._deviceDataService.lifestylePlans$.subscribe(data => {
      this.lifestyleSelected = data;
    });
    this.subscriber = this._deviceDataService.passSelected$.subscribe(data => {
      this.isPassSelected = data;
    });
    this.subscriber = this._deviceDataService.telcoDayRebate$.subscribe(data => {
      if (data) {
        this.telcoDayRebate = data;
        this.telcoDayRebateEligibility();
      }
    });
    this.subscriber = this._deviceDataService.sharedDevicePagePurachaseTypeTab$.subscribe(data => {
      this.DevicePagePurachaseTypeCLicked = data;
      if (this.DevicePagePurachaseTypeCLicked === 'Easyphone') {
        this.easyphoneTabSelected = true;
      } else {
        this.easyphoneTabSelected = false;
      }
      if (this.DevicePagePurachaseTypeCLicked === 'Device Bundle') {
        if (typeof window !== 'undefined' && localStorage && localStorage.getItem('bundleEditCobp')) {
          localStorage.removeItem('bundleEditCobp');
        } else if (this.isPromotion === false && this.QueryParams.top === 'mnp') {
          this.typeOfNumHighlight = null;
          this.typeOfNumber = null;
        }
      }
      this.buyOptionSelected = false;
      if (this.DevicePagePurachaseTypeCLicked === 'Device Bundle' || this.DevicePagePurachaseTypeCLicked === 'Device Only' ||
        this.DevicePagePurachaseTypeCLicked === 'Easyphone') {
        this.buyOptionSelected = true;
      }
      this.tabSelected = true;
        // this.setDefaultSelectedValues();
    });
    // this.subscriber = this._deviceDataService.sharedTabSelected$.subscribe(data =>
    //    this.tabselected = data);

    // this.subscriber = this._deviceDataService.selectedPrincipalLine$.subscribe(data => this.isPrincipleNumSelected = data);

    this.subscriber = this._deviceDataService.sharedPlanDetails$.subscribe(data => {
      if (data) {
        if (this.data && this.data.plan_title) {
          this.isPrincipleNumSelected = false;
          this._deviceDataService.publishPrincipalLine(this.isPrincipleNumSelected);
          this._deviceDataService.publishSupplimentaryLines([]);
          const planSelected: any = data;
          localStorage.setItem("suppPlanType", JSON.stringify(data));
          this.selectedNumber = null;
          this.displayNumList = true;
          if (planSelected.name.indexOf("Blue") > -1 || planSelected.name.indexOf("Xpax") > -1) {
            this.selectedBlueXpax = true;
            if (localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
              localStorage.removeItem("suppLinesAddedByTheUser");
            }
          } else {
            this.selectedBlueXpax = false;
          }
        }
        if (!this.selectedBlueXpax) {
          if (((this.typeOfNumHighlight === "EXISTING_NUMBER") || (this.typeOfNumHighlight === "MnpNum"))) {
            this._deviceDataService.publishAddToCartEnabling(true);
          } else {
            this._deviceDataService.publishAddToCartEnabling(false);
          }
        } else {
          this._deviceDataService.publishAddToCartEnabling(true);
        }
        // if(this.QueryParams){
        //   this.setDefaultSelectedValues();
        //   // this.QueryParams = {};
        // }
      }


    });
    this.subscriber = this._deviceDataService.sharedSelection$.subscribe(
      data => {
        this.isActive = data;
        this.showContent = this.isActive;
      });
    /* Added for enabling and disabling of the success errors and info popup's at the bottom */
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => this.showMNPFlowNotification = data
    );
    this.subscriber = this._deviceDataService.sharedextraSuppLinesAddedByUser$.subscribe(data => {
      this.noOfSuppLinesToDelete = data;
      this.noOfLinesToDelete = data;
    });
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.maximumReservation = data)
    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.apiFailure = data)
    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.isPopUpBlacklist = data));
    this.subscriber = this._deviceDataService.sharedOneTimePay$.subscribe(
      data => this.oneTimePayOtherMNP = data
    );
    this.subscriber = this._deviceDataService.sharedTotalpay$.subscribe(
      data => this.totalPayOtherMNP = data
    );
    this.subscriber = this._deviceDataService.sharedDisableNewLineCobpSTen$.subscribe(
      data => {
        this.disableNewLineCobpSTen = data;
      }
    );
    if (localStorage && localStorage.getItem("DisableNewLineCobpSTen")) {
      this.disableNewLineCobpSTen = JSON.parse(localStorage.getItem('DisableNewLineCobpSTen'));
    }
    this.subscriber = this._deviceDataService.sharedLineChosen$.subscribe(
      data => {
        this.lineChosen = data;
        if (this.lineChosen) {
          this.typeOfNumber = null;
        }
      }
    );
    this.subscriber = this._deviceDataService.sharedIsKardashianPlan$.subscribe(data => {
      if (this.isKardasianPlanSelected !== data) {
        this.isKardasianPlanSelected = data;
        if (this.isKardasianPlanSelected) {
          this.isKardasianPlanSelectedTab = true;
          this.numberCategory = "GOLDEN";
          this.isPremiumTabSelected = true;
          this.isNormalTabSelected = false;
          this.goldenPlanNote = this.selectedPlanDetails.is_premium_plan_message;
        } else {
          this.isKardasianPlanSelectedTab = false;
          this.numberCategory = "NORMAL";
          this.goldenPlanNote = null;
        }
        if (this.typeOfNumHighlight === "NEW_NUMBER" && this.isActive) {
          this.getRefreshNumbers();
        }
      } else {
        this.isKardasianPlanSelected = data;
      }
    });

    this.subscriber = this._deviceDataService.sharedGoldenNumber$.subscribe(data => {
      if (this.isGoldenNumberSelected !== data) {
        this.isGoldenNumberSelected = data;
        if (this.typeOfNumHighlight === "NEW_NUMBER" && this.isActive) {
          this.getRefreshNumbers();
        }
      } else {
        this.isGoldenNumberSelected = data;
      }
    });

    this.subscriber = this._deviceDataService.sharedNumberType$.subscribe(data => {
      if (!data) {
        this.selectedNumber = '';
      }
    });
    this.subscriber = this._deviceDataService.sharedMoonSelectedProductDetails$.subscribe(data => {
      this.selectedDeviceInfoForMoon = null;
      if (data !== null) {
        this.selectedDeviceInfoForMoon = data;
        this.displayMNPNote = true;
        this.typeOfNumHighlight = null;
      }
    });
    if (localStorage && localStorage.getItem("cart") && localStorage.getItem("MyMsIsdn")) {
      this.itemCart = JSON.parse(localStorage.getItem("cart"));
      this.numberMsisdn = localStorage.getItem("MyMsIsdn");
      if (this.itemCart && this.itemCart.all_items && this.itemCart.all_items.length > 0) {
        this.itemCart.all_items.forEach(element => {
          if (this.numberMsisdn === element.selectedProduct.orderPhoneNo) {
            this.disableKeepNumber = true;
            return;
          }
        });
      }
    }
    /*  Switch to celcom tab to be visible only in plan purchase history page    */
    if (typeof window !== 'undefined') {
      const isPostaidURL = window.location.href.match("/plans/");
      if (localStorage && localStorage.getItem("ls_subnav") != null) {
        const isSubnav = localStorage.getItem("ls_subnav");
        const validateSubnav = isSubnav.match("Postpaid");
        if (validateSubnav != null) {
          this.isPostpaidFlow = true;
        }
      } else if (isPostaidURL != null) {
        this.isPostpaidFlow = true;
      }
    }
    if (this.data.PlanOnlyComponentToShow) {
      this.showContent = true;
      this.isActive = this.data;
    }
    if (this.selectedProd) {
      setTimeout(() => {
        if (this.selectedProd.orderNumberType === "NewNumber" && this.selectedProd.phoneNum != null) {
          this.typeOfNumHighlight = "NEW_NUMBER";
          this.telcoDayRebateEligibility();
          this._deviceDataService.publishNumberType("NewNumber");
          if (typeof window !== 'undefined' && window.location.href.indexOf("/device-detail/") > -1) {
            this.decidePublishStep(3);
          }
          this.deviceNumberToDisplay = this.DeviceDetailsNumberResponse = [{
            "number": this.selectedProd.phoneNum
          }];
          this.SelectNumber(this.selectedProd.phoneNum);
          this.msisdn = null;
        } else {
          this.DeviceDetailsNumberResponse = null;
        }
        if (this.selectedProd.phoneNum && this.selectedProd.orderNumberType === "NewNumber") {
          this._deviceDataService.publishPhoneNo(this.selectedProd.phoneNum);
          this.editOrder = true;
          this.getRefreshNumbers();
          this.isPrincipleNumSelected = true;
          if (typeof window !== 'undefined') {
            if (window.location.href.indexOf("/plans/") > -1) {
              this.isPlanURL = true;
              this.isDeviceURL = false;
            } else if (window.location.href.indexOf("/device-detail/") > -1) {
              this.isDeviceURL = true;
              this.isPlanURL = false;
            }
            if ((window.location.href.indexOf("xpax") > -1) ||
             window.location.href.indexOf("blue") > -1) {
              this.selectedBlueXpax = true;
            } else if (window.location.href.indexOf("device") > -1) {
              this.displayNumList = true;
            } else {
              this.selectedBlueXpax = false;
              this.displayNumList = false;
            }
          }
        }
         if (localStorage && localStorage.getItem("SupplementaryLinesEditingFromCart")) {
          this.typeOfNumHighlight = "NEW_NUMBER";
          this.telcoDayRebateEligibility();
          this.deviceNumberToDisplay = this.DeviceDetailsNumberResponse = [{
            "number": this.selectedProd.phoneNum
          }];
          this.SelectNumber(this.selectedProd.phoneNum);
          this.msisdn = null;
          localStorage.setItem("supplementryFlow", "YES");
          this.displayNumList = false;
          this.decidePublishStep(3);
          this.lineChosen = true;
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem("suppLinesAddedByTheUser", localStorage.getItem("SupplementaryLinesEditingFromCart"));
          }
        } else {
          if (localStorage && (localStorage.getItem("suppLinesAddedByTheUser") ||
            localStorage.getItem("SupplementaryLinesEditingFromCart"))) {
            localStorage.removeItem("SupplementaryLinesEditingFromCart");
            localStorage.removeItem("suppLinesAddedByTheUser");
          }
          this.lineChosen = false;
        }
      }, 0);
      if (localStorage && localStorage.getItem("COBP_FLOW") === "YES" && (localStorage.getItem("COBP_EDIT") === "YES")) {
        this.sameNumber();
        if (typeof window !== 'undefined' && window.location.href.indexOf("/device-detail/") > -1) {
          this.decidePublishStep(3);
        }
        this._deviceDataService.publishAddToCartEnabling(true);
        localStorage.setItem("cobp-edit-flow", "true");
      }
    }
    // product available in cart that is added in previous session ,
    // thus the following is used to redirect from login page to plan or device page.
    if (this.SelectionAferLogin) {
      this.DeviceDetailsNumberResponse = null;
      this.isEligible = true;
      this._deviceDataService.publishEligibility(this.isEligible);
      this.msisdn = null;
      this._deviceDataService.publishPhoneNo(this.msisdn);
      if (localStorage && sessionStorage && localStorage.getItem("COBP_FLOW") === "YES" &&
        (localStorage.getItem("COBP_EDIT") === "YES" || localStorage.getItem("COBP_login") === "YES") &&
        localStorage.getItem("MyMsIsdn") && sessionStorage.getItem("UserInfo") && sessionStorage.getItem("UserToken")) {
        localStorage.removeItem("COBP_login");
        localStorage.removeItem("COBP_login_Check");
        this._deviceDataService.publishAddToCartEnabling(true);
        this.sameNumber();
        setTimeout(() => {
          this.decidePublishStep(3);
        }, 1500);
        localStorage.setItem("cobp-edit-flow", "true");
      }
      if (this.SelectionAferLogin.suppLinesDetails && !this.data.plan_title) {
        this.isPrincipleNumSelected = true;
        this.selectedNumber = this.SelectionAferLogin.principalNum;
        this.SelectNumber(this.selectedNumber);
        this.supplimentaryData = this.data;
        this.typeOfNumHighlight = "NEW_NUMBER";
        this.telcoDayRebateEligibility();
        this._deviceDataService.publishNumberType("NewNumber");
        this.deviceNumberToDisplay = this.DeviceDetailsNumberResponse = [{
          "number": this.selectedNumber
        }];
        this._deviceDataService.publishPrincipalLine(this.isPrincipleNumSelected);
        if (typeof window !== 'undefined' && localStorage && this.SelectionAferLogin.suppLinesDetails) {
          localStorage.setItem('suppLinesAddedByTheUser', JSON.stringify(this.SelectionAferLogin.suppLinesDetails));
          localStorage.setItem("supplementryFlow", "YES");
        }
        this.decidePublishStep(3);
      }
      if (typeof window !== 'undefined' && localStorage && this.selectedProd && (this.selectedProd.orderNumberType === "KeepNumber") &&
        (localStorage.getItem("MyMsIsdn")) && (localStorage.getItem("MyMsIsdn") &&
          localStorage.getItem("selectedColor") && localStorage.getItem("selectedStorage") &&
          localStorage.getItem("DeviceSku") && localStorage.getItem("SelectedPlanName") &&
          localStorage.getItem("SelectedPlan") && localStorage.getItem("SelectedMonthlyPay") &&
          localStorage.getItem("SelectedPlanDetails"))) {
        this.typeOfNumHighlight = "EXISTING_NUMBER";
        this.telcoDayRebateEligibility();
        this.msisdn = this.SelectionAferLogin.phoneNum;
        this._deviceDataService.publishPhoneNo(this.msisdn);
        this.sameNumber();
      }
      if (typeof window !== 'undefined' && localStorage && localStorage.getItem("Principal_Number") &&
        localStorage.getItem("Principal_Number") !== "null" && this.SelectionAferLogin != null && this.data.plan_title) {
        this.typeOfNumHighlight = "NEW_NUMBER";
        this.telcoDayRebateEligibility();
        this.decidePublishStep(3);
        this.deviceNumberToDisplay = this.DeviceDetailsNumberResponse = [{
          "number": this.SelectionAferLogin.principalNum
        }];
        this.selectedProd = {};
        if (this.SelectionAferLogin.principalNum && this.data.plan_title) {
          this.SelectNumber(this.SelectionAferLogin.principalNum);
          this.selectedProd.phoneNum = this.SelectionAferLogin.principalNum;
          this.selectedProd.orderNumberType = "NewNumber";
          this.selectedNumber = this.SelectionAferLogin.principalNum;
          this.isPrincipleNumSelected = true;
        }
        this.msisdn = null;
        this.editOrder = true;
        this.getRefreshNumbers();
        this.isPlanURL = true;
        this.deviceNumberToDisplay = null;
        localStorage.removeItem("Principal_Number");
      }
      if (typeof window !== 'undefined' && localStorage && localStorage.getItem("MNP-FLOW") &&
        localStorage.getItem("MNP-CUSTOMER") && localStorage.getItem("MNP-PRE-SELECT") && localStorage.getItem("MNP-EDIT") !== 'YES') {
        const MNPCustomerInfo = JSON.parse(localStorage.getItem("MNP-CUSTOMER"));
        this.ShowMNPBlock = true;
        this.showmnpblock();
        this.mnpUserData = {};
        this.mnpUserData.isEligible = true;
        this.mnpUserData.principleMobileNumber = MNPCustomerInfo.msisdn;
        this.mnpUserData.portNumber = MNPCustomerInfo.portNumber;
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("MNP-EDIT", 'YES');
        }
        // this.OnMnpEligibile(this.mnpUserData);
      }
      if (this.SelectionAferLogin && this.SelectionAferLogin.lineChosen && localStorage.getItem("enableChoosewayLogin")) {
        this.SelectNumber(this.SelectionAferLogin.principalNum);
        localStorage.removeItem("enableChoosewayLogin");
      }
    }
    if (typeof window !== 'undefined' && localStorage && this.selectedProd && (this.selectedProd.orderNumberType === "KeepNumber") &&
      (localStorage.getItem("MyMsIsdn")) && (localStorage.getItem("MyMsIsdn") &&
        localStorage.getItem("selectedColor") && localStorage.getItem("selectedStorage") &&
        localStorage.getItem("DeviceSku") && localStorage.getItem("SelectedPlanName") &&
        localStorage.getItem("SelectedPlan") && localStorage.getItem("SelectedMonthlyPay") &&
        localStorage.getItem("SelectedPlanDetails"))) {
        this.sameNumber();
    }
    if (typeof window !== 'undefined' && localStorage && this.selectedProd && (this.selectedProd.orderNumberType === "KeepNumber") &&
      localStorage.getItem("PSku") && localStorage.getItem("chosenPlan")) {
      this.typeOfNumHighlight = "EXISTING_NUMBER";
      this.telcoDayRebateEligibility();
      this.msisdn = this.selectedProd.phoneNum;
      this._deviceDataService.publishPhoneNo(this.msisdn);
      this.sameNumber();
    }

    // pre-select switch to celcom
    if (localStorage) {
      // Disable Switch to Celcom if cart item presents
      // const cart = this.cartService.retrieveCart();
      if (localStorage && localStorage.getItem("MNP-FLOW") === 'YES' && localStorage.getItem("MNP-EDIT") === 'YES') {
        this.showmnpblock();
        this.isMnpFromEditCart = true;
        this.showMNPFlowNotification = false;
      } else if (localStorage && localStorage.getItem("MNP-PRE-SELECT") === 'YES' &&
        localStorage.getItem("checkToShowEditEligibilityBox") && localStorage.getItem("MNPCustomerData") &&
        this.SelectionAferLogin == null && this.selectedProd == null && localStorage.getItem("MNPRedirectionToLoginPage") === "YES") {
        this.showmnpblock();
      } else if (localStorage.getItem("MNP-FLOW") === 'YES' && this.SelectionAferLogin == null &&
        this.selectedProd == null && !localStorage.getItem("checkToShowEditEligibilityBox") &&
        !localStorage.getItem("MNPCustomerData") && localStorage.getItem("MNP-CUSTOMER")) {
        this.updatedMNPPrincipalNum = {};
        this.updatedMNPPrincipalNum = JSON.parse(localStorage.getItem("MNP-CUSTOMER"));
        this.updatedMNPPrincipalNum.portNumber = "";
        localStorage.setItem("MNP-CUSTOMER", JSON.stringify(this.updatedMNPPrincipalNum));
      } else if (!localStorage.getItem("MNPRedirectionToLoginPage") && localStorage.getItem("MNP-PRE-SELECT") === 'YES' &&
        this.SelectionAferLogin == null && this.selectedProd == null) {
        this.updatedMNPUserData = {};
        this.updatedMNPUserData = JSON.parse(localStorage.getItem("MNP-CUSTOMER"));
        this.updatedMNPUserData.customerID = "";
        this.updatedMNPUserData.portNumber = "";
        this.updatedMNPUserData.msisdn = "";
        localStorage.setItem("MNP-CUSTOMER", JSON.stringify(this.updatedMNPUserData));
      }
    }

    if (typeof window !== 'undefined') {
      if (window.location.href.indexOf("/plans/") > -1) {
        this.isPlanURL = true;
        this.isDeviceURL = false;
      } else if (window.location.href.indexOf("/device-detail/") > -1) {
        this.isDeviceURL = true;
        this.isPlanURL = false;
      }
    }
    /*  MNP Preorder Checking the preorder tag */
    if (typeof window !== 'undefined') {
      if (localStorage && localStorage.getItem("isPreOrder") === 'true') {
        this.MNPPreorderFlow = true;
      }
    }

    this.subscriber = this._deviceDataService.onEasyTabsClicked$.subscribe(data => {
      if (!this.SelectionAferLogin && (!localStorage.getItem("cobp-edit-flow"))) {
        this.typeOfNumHighlight = data;
        this.telcoDayRebateEligibility();
        this.selectedNumber = data;
        this.typeOfNumber = data;
        this.displayNumList = false;
        this.ShowMNPBlock = false;
        this.SwitchToCelcom = false;
      }
    });

    this.subscriber = this._deviceDataService.planChanged$.subscribe(data => {
      this.typeOfNumber = null;
      this.ShowMNPBlock = false;
      if (this.typeOfNumHighlight === 'NEW_NUMBER') {
        this._deviceDataService.publishNumberType("NewNumber");
      } else {
        this.typeOfNumHighlight = null;
      }
      this.isPrincipleNumSelected = false;
      this.SwitchToCelcom = false;
    });
    this.subscriber = this._deviceDataService.productSkuToPublish$.subscribe(data => this.selectedProductSku = data);
    this.subscriber = this._deviceDataService.sharedIsGBPassSelected$.subscribe(data => {
      this.internetShareOption = data;
    });
    if (typeof window !== 'undefined' && window.location.href.indexOf("/plans/xp-lite") > -1) {
      this.isProjectMoon = true;
    } else {
      this.isProjectMoon = false;
    }
    // if (this.isEnterprise) {
    //   this.isEnableCobpTab = false;
    // }
  }
  ngAfterViewInit() {
    if (this.mnpPreSelected || this.numberPreSelected) {
      if (this.numberPreSelected) {
        this.onSwitchingPurchaseTypeTab('GetNewNumber');
      }
      if (typeof navigator !== 'undefined') {
        setTimeout(() => {
         // const step1 = document.getElementById("step1");
          //const step2 = document.getElementById("step2");
          //const topPos = step1.offsetHeight + step2.offsetHeight;
          // For chrome, IE and Firefox use scrollTo().
          if (typeof window !== 'undefined' && localStorage.getItem("cobp-edit-flow") !== "true") {
            this.scrollToSection(2);
            //window.scrollTo(0, topPos);
          }
        }, 500);
      }
    }
    setTimeout(() => {
      if (localStorage && (localStorage.getItem("COBP_EDIT") === "YES" || localStorage.getItem("bundleEditCobp") === "TRUE" ||
     localStorage.getItem("cobp-edit-flow") === "true") && window.location.href.indexOf("device-detail") > -1) {
        localStorage.removeItem("COBP_EDIT");
        //const step1 = document.getElementById("step1");
        //const step2 = document.getElementById("step2");
        //const topPos = step1.offsetHeight + step2.offsetHeight + 210;
        // For chrome, IE and Firefox use scrollTo().
        if (typeof window !== 'undefined') {
          this.scrollToSection(3);
        }
      }
         if (window.location.href.indexOf('plans/') > -1 && localStorage && !(localStorage.getItem("COBP_FLOW")) &&
         localStorage.getItem("Edit-flow") && JSON.parse(localStorage.getItem("Edit-flow")) === true) {
          //const step1 = document.getElementById("step1");
       //   const step2 = document.getElementById("step2");
          //const topPos = step1.offsetHeight + 32;
          // For chrome, IE and Firefox use scrollTo().
          if (typeof window !== 'undefined') {
            if(this.isProjectStar)
              this.scrollToSection(3);
            else
              this.scrollToSection(2);
            //window.scrollTo(0, topPos);
          }
        }
    }, 600);
    setTimeout(() => {
      this.setDefaultSelectedValues();
    }, 1000);
  }

  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(
      obj,
      this._router,
      this._activatedRoute
    );
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
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  public getRefreshNumbers() {
    this.displayNumList = true;
    this.errorExits = false;
    if (this.isKardasianPlanSelected === true && (this.isPremiumTabSelected || (this.selectedProd && this.selectedProd.is_golden_number))) {
      this.numberCategory = "GOLDEN";
      this.goldenPlanNote = null;
      this.isKardasianPlanSelectedTab = true;
      this.isPremiumTabSelected = true;
      this.isNormalTabSelected = false;
    } else {
      this.numberCategory = "NORMAL";
    }
    if (!this.editOrder) {
      this.selectedNumber = null;
    }
    this.editOrder = false;
    this._deviceDataService.publishPhoneNo(null);
    this.getRefreshNumberdata = {
      data: {
        numberService: "POSTPAID",
        numberCategory: this.numberCategory,
        numRecords: "30",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    this.callRetrieveNumbersAPI(this.getRefreshNumberdata);
    this.searchNumber = "";
  }

  public searchNumbersForPattern() {
    if (this.isKardasianPlanSelected === true && this.isPremiumTabSelected) {
      this.numberCategory = "GOLDEN";
      this.isKardasianPlanSelectedTab = true;
    } else {
      this.numberCategory = "NORMAL";
      // this.isKardasianPlanSelectedTab = false;
    }
    const searchStringLength = this.searchNumber ? this.searchNumber.toString().length : 0;
    // request for retrieve numbers
    const dataForRetrieveNumberAPI = {
      data: {
        numberService: "POSTPAID",
        sourceSystem: "",
        numRecords: "30",
        planType: "VOICE",
        numberCategory: this.numberCategory
      }
    };
    // If user has cleared the Search string completely, call for all list
    if ( searchStringLength === 0 && this.deviceNumberToDisplay && this.deviceNumberToDisplay.length <= 8 ) {
      this.errorForNumbers();
      this.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
      this.errorExits = false;
    }     else if ( this.searchNumber && ((searchStringLength < 2 || searchStringLength > 4) ||
      !/^\d+$/.test(this.searchNumber))) {
        this.errorForNumbers();
        return;
    } else if (this.searchNumber && (searchStringLength >= 2 && searchStringLength <= 4)) {
      dataForRetrieveNumberAPI.data["criteria"] = "CONTAINS";
      this.errorExits = false;
      this.searchStatus = true;
      dataForRetrieveNumberAPI.data["numberPattern"] = this.searchNumber;
      this.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
    }
  }

  public errorForNumbers() {
    this.errorExits = true;

  }
  public getNewNumbers() {
     this.numberCategory = "NORMAL";
    if (this.supplimentaryData && this.supplimentaryData.lineChosen > 0) {
      this.lineChosen = true;
    }
    if (this.typeOfPurchaseAnalyticFlag) {
      this.adobePurchaseType = "traceAnalyticsInGetNumber";
      this._rendererService.
        createAnalyticForSelectedPurchaseType(this.document, this._renderer, this.document.body, this.adobePurchaseType);
      this.typeOfPurchaseAnalyticFlag = false;
    }
    if (this.data && this.data.cobpEligible) {
      this.data.cobpEligible = false;
    }
    if (localStorage && localStorage.getItem("lifestyleCOBP")) {
      localStorage.removeItem("lifestyleCOBP");
    }
    // this.displayNumList = true;
    this._deviceDataService.publishAddToCartEnabling(false);
    this._deviceDataService.publishDisclaimerAgree(false);  // Added for enabling of Add to cart button when switched from MNP
    if (localStorage && localStorage.getItem("suppPlanType")) {
      const planSupp: any = JSON.parse(localStorage.getItem("suppPlanType"));
      if (planSupp.name.indexOf("Blue") > -1 || planSupp.name.indexOf("Xpax") > -1) {
        this.selectedBlueXpax = true;
        if (localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
          localStorage.removeItem("suppLinesAddedByTheUser");
        }
        this._deviceDataService.publishAddToCartEnabling(true);
      } else {
        this.selectedBlueXpax = false;
        this._deviceDataService.publishAddToCartEnabling(false);
      }
      localStorage.removeItem("suppPlanType");
    } else if (this.selectedBlueXpax === true) {
      this._deviceDataService.publishAddToCartEnabling(true);
    }
    this._deviceDataService.publishDisclaimerAgree(false);
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem("Eligible")) {
        localStorage.removeItem("Eligible");
      }
      if (localStorage.getItem("COBP_FLOW")) {
        localStorage.removeItem("COBP_FLOW");
        localStorage.removeItem("ContractEndDate");
      }
      if (localStorage.getItem("COBP_login_Check")) {
        localStorage.removeItem("COBP_login_Check");
      }
      if (localStorage.getItem("COBP_FLOW_CHECK")) {
        localStorage.removeItem("COBP_FLOW_CHECK");
      }
    }
    if (!this.isPlanURL) {
      this.chooseNumPlanCommunication.getPriceUpdated(this.data);
    }
    this.typeOfNumHighlight = "NEW_NUMBER";
    this.telcoDayRebateEligibility();
    this.SwitchToCelcom = false;
    this.ShowMNPBlock = false;
    this.errorExits = false;
    this.removeCOBPContract();
    if (this.typeOfNumber === "NEW_NUMBER") {
      return;
    } else {
      this.typeOfNumber = "NEW_NUMBER";
    }
    this.preventStyle = {
      "pointer-events": "none"
    };
    this._deviceDataService.publishNumberType("NewNumber");
    this._deviceDataService.publishPhoneNo(null);
    if (this.isKardasianPlanSelected === true && this.isPremiumTabSelected) {
      this.numberCategory = "GOLDEN";
    }
    const dataForRetrieveNumberAPI = {
      data: {
        numberService: "POSTPAID",
        numberCategory: this.numberCategory,
        numRecords: "30",
        sourceSystem: "",
        planType: "VOICE",
        outletId: (this.isProd) ? "" : this.outletId
      }
    };
    this.removeMNPFlow(); // removing the MNP flow from local storage.
    this.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
    this._deviceDataService.publishAddToCartDisabling(false);

    this.topService.selectTypeofPurchase("newline");
  }

  // Added for Removing the MNP details from local storage.
   public removeMNPFlow() {
      localStorage.removeItem("MNPCustomerData");
      localStorage.removeItem("checkToShowEditEligibilityBox");
      localStorage.removeItem("MNP-CUSTOMER");
      localStorage.removeItem("MNP-PRE-SELECT");
      localStorage.removeItem("Eligible");
      localStorage.removeItem("MNP-FLOW");
      localStorage.removeItem("MNP-EDIT");
  }

  public callRetrieveNumbersAPI(dataForRetrieveNumberAPI: any) {
    this.noNumbersToDisplay = false;
    this.retrieveNumbersAPI = false;
    this.loading = true;
    if (this.isPrincipleNumSelected) {
      this.loading = false;
    }
    this.resetPriceData.emit(this.data);
    this._productService
      .GetNewNumbers(this.retrievenumberURL, dataForRetrieveNumberAPI)
      .subscribe(
      response => {
        if (this.typeOfNumHighlight === "NEW_NUMBER") {
          this.loading = false;
          this.displayNumList = true;
          if (response[0].status === false) {
            this.loading = false;
            this.deviceNumberToDisplay = [];
            this.totalNumbers = [];
            this.totalPageItems = [];
            this.DeviceDetailsNumberResponse = null;
            if (this.searchStatus) {
              this.noNumbersToDisplay = false;
              this.searchStatus = false;
              this.errorForNumbers();
              this.errorMessage = { message: response[0].message };
            }
          } else {
            if (response && response[0].is_premium_plan_message) {
              this.goldenPlanNote = response[0].is_premium_plan_message;
            }
            this.totalNumbers = response[0].mobile_numbers;
            this.setPage(1);
            response[0].mobile_numbers.forEach(element => {
              if (element !== 0 && element.number.length === 9) {
                element.number = 0 + element.number;
              }
            });

          if (this.selectedProd && this.selectedNumber && this.selectedNumber.indexOf(this.searchNumber) !== -1) {
            this.selectedProd.phoneNum = this.selectedNumber;
            this.selectedProd.orderNumberType = "NewNumber";
          }

          if (this.selectedProd && this.selectedProd.phoneNum && this.selectedProd.orderNumberType === "NewNumber") {
            this.deviceNumberToDisplay = this.DeviceDetailsNumberResponse = response[0].mobile_numbers;
            for (let i = 0; i < this.deviceNumberToDisplay.length; i++) {
              if (this.deviceNumberToDisplay[i].number === this.selectedProd.phoneNum) {
                this.deviceNumberToDisplay.splice(i, 1);
                break;
              }
            }
            if (this.deviceNumberToDisplay.length > 11) {
              this.deviceNumberToDisplay = this.deviceNumberToDisplay.slice(0, 11);
            }
            this.deviceNumberToDisplay.unshift({ number: this.selectedProd.phoneNum });
            this._deviceDataService.publishPhoneNo(this.selectedProd.phoneNum);
            this.selectedProd.phoneNum = null;
          } else {
            this.deviceNumberToDisplay = this.DeviceDetailsNumberResponse = response[0].mobile_numbers;
            // if selected number
            if (this.selectedNumber) {
              // check selected number in numbers list
              for (let k = 0; k < this.deviceNumberToDisplay.length; k++) {
                if (this.selectedNumber === this.deviceNumberToDisplay[k].number) {
                  this.deviceNumberToDisplay.splice(k, 1);
                  break;
                }
              }
              if (this.selectedNumber.indexOf(this.searchNumber) !== -1) {
                if (this.deviceNumberToDisplay.length > 11) {
                  this.deviceNumberToDisplay = this.deviceNumberToDisplay.slice(0, 11);
                  // keeping numbers till 11 to display in list
                }
                this.deviceNumberToDisplay.unshift({ number: this.selectedNumber });
                // add selected number first in list
              }
            }
          }
        }
          this.msisdn = null;
        }
      },
      err => {
        this.msisdn = null;
        this.loading = false;
        this.deviceNumberToDisplay = [];
        if (this.searchStatus) {
          this.noNumbersToDisplay = true;
          this.searchStatus = false;
        } else {
          this.retrieveNumbersAPI = true;
        }
      }
      );
  }
  public showPremiumTab(numberType: any) {
    this.deviceNumberToDisplay = null;
    if (numberType === "GOLDEN") {
      this.numberCategory = "GOLDEN";
      this.isKardasianPlanSelectedTab = true;
      this.isPremiumTabSelected = true;
      this.isNormalTabSelected = false;
      if (this.isPrincipleNumSelected) {
        this.removePrincipleLine();
      }
      this.getRefreshNumbers();
    } else {
      this.numberCategory = "NORMAL";
      this.isKardasianPlanSelectedTab = true;
      this.isPremiumTabSelected = false;
      this.isNormalTabSelected = true;
      if (this.isPrincipleNumSelected) {
        this.removePrincipleLine();
      }
      this.getRefreshNumbers();
    }
  }

  public SelectNumber(planNumber: any) {
    if (planNumber && planNumber !== "null") {
    this.selectedNumber = planNumber;
    if (this.numberCategory === "GOLDEN") {
      this.isGoldenNumberSelected = true;
      localStorage.setItem("GoldenNumberSelected", JSON.stringify(true));
    } else {
      this.isGoldenNumberSelected = false;
    }
    localStorage.setItem("Principal_Number", this.selectedNumber);
    this._deviceDataService.publishPhoneNo(planNumber);
    this._deviceDataService.publishIsGoldenNo(this.isGoldenNumberSelected);
    this._deviceDataService.publishNumberType("NewNumber");
    this.typeOfNumHighlight = 'NEW_NUMBER';
    this.telcoDayRebateEligibility();
    this.pageType = 'newInLine';
      localStorage.setItem("PrincipleNumberSelected", JSON.stringify(true));
      this.isActive = true;
      this.isPrincipleNumSelected = true;
      this._deviceDataService.publishPrincipalLine(this.isPrincipleNumSelected);
      if (this.isEnterprise) {
        this._deviceDataService.publishAddToCartEnabling(true);
      } else {
        this._deviceDataService.publishAddToCartEnabling(false);
      }
    }
    this.topService.updateNewLineCompleted(planNumber);
  }
  public removeCOBPContract() {
      localStorage.removeItem("ContractEndDate");
      localStorage.removeItem("ContractAgree");
  }
  public hideRebateMessages() {
    this.showEligibleRebate = false;
    this.showNotEligibleRebate = false;
  }
  public telcoDayRebateEligibility() {
    if (this.telcoDayRebate && this.telcoDayRebate.status) {
      if (this.telcoDayRebate.allowed_types && this.telcoDayRebate.allowed_types.length > 0) {
        for (let i = 0; i < this.telcoDayRebate.allowed_types.length; i++) {
          if (this.typeOfNumHighlight) {
            if (this.typeOfNumHighlight === this.telcoDayRebate.allowed_types[i]) {
              this.showEligibleRebate = true;
              this.showNotEligibleRebate = false;
              this._deviceDataService.publishEligibleRebate(this.showEligibleRebate);
              return;
            } else if (this.typeOfNumHighlight !== this.telcoDayRebate.allowed_types[i]) {
              this.showEligibleRebate = false;
              this.showNotEligibleRebate = true;
            }
          } else {
            this.hideRebateMessages();
          }
        }
      } else {
        this.showNotEligibleRebate = true;
        this.showEligibleRebate = false;
      }
    } else {
      this.hideRebateMessages();
    }
    this._deviceDataService.publishEligibleRebate(this.showEligibleRebate);
  }

  public sameNumber() {
    this.pageType = 'cobpInLine';
    // User loggin case perform verification else not.
    if (this._userService.isCustomer() === true && this.isPre2PostVerified() === false && !this._userService.isUserEnterprise()) {
      this.loading = true;
      this.cobpSelectionPreAuthentication();
      this.getMsisdnType();
    } else {
      this.afterNricAuthentication();
    }
    this.topService.selectTypeofPurchase("cobp");
  }
  cobpSelectionPreAuthentication() {
    this._deviceDataService.publishPurchaseTypeTab(this.purchaseType);
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem('suppNumber')) {
      localStorage.removeItem('suppNumber');
    }
    this.loading = false;
    this.searchNumber = "";
    this.selectedNumber = null;
    if (this.data && this.data.plan_title) {
      this._deviceDataService.publishSupplimentaryLines([]);
    }
    this.typeOfNumHighlight = null;
    this.deviceNumberToDisplay = null;
    this.SwitchToCelcom = false;
    this.ShowMNPBlock = false;
    this.resetPriceData.emit(this.data);
    if (this.typeOfNumber === "EXISTING_NUMBER") {
      this.typeOfNumHighlight = "EXISTING_NUMBER";
      return;
    } else {
      this.typeOfNumber = "EXISTING_NUMBER";
      this.typeOfNumHighlight = "EXISTING_NUMBER";
    }
    this.isPrincipleNumSelected = false;
    this.enableNRICAuthentication = false;
    this.cobpData = this.data;
    this._deviceDataService.publishAddToCartDisabling(false);
  }
  afterNricAuthentication() {
    this.enableNRICAuthentication = false;
    this._deviceDataService.publishPurchaseTypeTab(this.purchaseType);
    if (this.typeOfPurchaseAnalyticFlag) {
      this.adobePurchaseType = "traceAnalyticsInChangePlan";
      this._rendererService.
        createAnalyticForSelectedPurchaseType(this.document, this._renderer, this.document.body, this.adobePurchaseType);
      this.typeOfPurchaseAnalyticFlag = false;
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem('suppNumber')) {
      localStorage.removeItem('suppNumber');
    }
    this.loading = false;
    this.searchNumber = "";
    this.selectedNumber = null;
    this.cobpData = this.data;
    this.cobpData.selectedProductSku = this.selectedProductSku;
    if (this.chosenPlan) {
      this.cobpData.chosenPlan = this.chosenPlan;
    }
    if (this.planData) {
      this.cobpData.planData = this.planData;
    }
    if (this.data && this.data.plan_title) {
      this._deviceDataService.publishSupplimentaryLines([]);
    }
    this.typeOfNumHighlight = null;
    this.deviceNumberToDisplay = null;
    this.SwitchToCelcom = false;
    this.ShowMNPBlock = false;
    this.resetPriceData.emit(this.data);
    if (this.typeOfNumber === "EXISTING_NUMBER") {
      this.typeOfNumHighlight = "EXISTING_NUMBER";
      return;
    } else {
      this.typeOfNumber = "EXISTING_NUMBER";
      this.typeOfNumHighlight = "EXISTING_NUMBER";
    }
    this.telcoDayRebateEligibility();
    this.isPrincipleNumSelected = false;
    this._deviceDataService.publishAddToCartDisabling(false);
  }
  public cobpEligibilityCheckData(data) {
    if (typeof window !== 'undefined' && localStorage) {
      this.msisdn = JSON.parse(localStorage.getItem("MyMsIsdn"));
    }
    this.cOBPEligibilityCheckBundle.emit(data);
  }

  public cobPlanEligibility(data) {
    if (typeof window !== 'undefined' && localStorage) {
      this.msisdn = JSON.parse(localStorage.getItem("MyMsIsdn"));
    }
    this.COBPEligibilityCheckPlanPurchase.emit(data);
  }
  public numberKeyHandler(ev) {
    this.errorExits = false;
    this.noNumbersToDisplay = false;
    const code = ev.keyCode || ev.which;
    if ( code === 13) {
      this.searchNumbersForPattern();
    }
  }
  public numberValidation(ev) {
    // Added keyCodes for backspace, enter. FF doesn't support ev.keyCode, so using ev.which
    const numberValues = [48, 49, 50, 51, 52, 53, 54, 55, 13, 56, 57, 8, 16, 17];
    const code = ev.keyCode || ev.which;
    const result = numberValues.indexOf(code);

    if (result < 0) {
      ev.preventDefault();
    }

  }

  public showmnpblock() {
    if (this.isBundleClicked) {
      this.displayMNPNote = true;
    }
    if (this.typeOfPurchaseAnalyticFlag) {
      this.adobePurchaseType = "traceAnalyticsInSwitchToCelcom";
      this._rendererService.
        createAnalyticForSelectedPurchaseType(this.document, this._renderer, this.document.body, this.adobePurchaseType);
      this.typeOfPurchaseAnalyticFlag = false;
    }
    if (this.data && this.data.cobpEligible) {
      this.data.cobpEligible = false;
    }
    if (localStorage && localStorage.getItem("lifestyleCOBP")) {
      localStorage.removeItem("lifestyleCOBP");
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem('suppNumber')) {
      localStorage.removeItem('suppNumber');
    }
    this.loading = false;
    this.searchNumber = "";
    if (this.data && this.data.plan_title) {
      this._deviceDataService.publishSupplimentaryLines([]);
    }
    this.selectedNumber = null;
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem("COBP_FLOW")) {
        localStorage.removeItem("COBP_FLOW");
      }
    }
    this._deviceDataService.publishDisclaimerAgree(false);
    if (localStorage && localStorage.getItem("COBP_FLOW")) {
      localStorage.removeItem("COBP_FLOW");
    }
    this._deviceDataService.publishNumberType("SwitchToCelcom");
    this._deviceDataService.publishDeactivateLifestyleAddons(false);
    this._deviceDataService.publishPhoneNo(null);
    this.ShowMNPBlock = true;
    this.SwitchToCelcom = true;
    this.removeCOBPContract();
    this.typeOfNumber = null;
    this.typeOfNumHighlight = "MnpNum";
    this.telcoDayRebateEligibility();
    this.deviceNumberToDisplay = null;
    this.isPrincipleNumSelected = false;
    this._deviceDataService.publishPrincipalLine(this.isPrincipleNumSelected);
    this._deviceDataService.publishAddToCartEnabling(true);
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem("Principal_Number");
    }
    this._deviceDataService.publishAddToCartDisabling(false);
    this.topService.selectTypeofPurchase("mnp");
  }

  public OnMnpEligibile(data: any) {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("Eligible", "true");
    }
    this.mnpEligibilityCheckPlanPurchase.emit(data);
  }

  public HideButtons(): boolean {
    if (this.data && this.data.plan_title || this.MNPPreorderFlow) {
      return true;
    } else {
      return false;
    }
  }

  public hideTypeOfPurchaseCobp(): boolean {
    if (this.data && !this.data.plan_title) {
      if (!this.isPrincipleClicked && !this.isRentClicked && !this.isOwnClicked) {
        if (this.purchaseType && this.purchaseType !== 'GetNewNumber' && this.purchaseType !== "removePrincipleLine") {
          this._deviceDataService.publishNumberType(null);
          this.typeOfNumHighlight = null;
        }
        return true;
      } else {
        return false;
      }
    }
  }

  public hideTypeOfPurchaseMNP(): boolean {
    if (this.data && !this.data.plan_title) {
      if (!this.isPrincipleClicked) {
        this.ShowMNPBlock = false;
        if (this.purchaseType && this.purchaseType !== 'GetNewNumber' && this.purchaseType !== "removePrincipleLine") {
          this._deviceDataService.publishNumberType(null);
          this.typeOfNumHighlight = null;
        }
        return true;
      } else {
        return false;
      }
    }
  }

  public removePrincipleLine() {
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
    this.selectedNumber = null;
    this.isPrincipleNumSelected = false;
    this.displayNumList = false;
    this.deviceNumberToDisplay = null;
    this.typeOfNumHighlight = "NEW_NUMBER";
    this.telcoDayRebateEligibility();
    this.getRefreshNumbers();
    localStorage.removeItem("PrincipleNumberSelected");
    this._deviceDataService.publishPrincipalLine(this.isPrincipleNumSelected);
    this._deviceDataService.publishPhoneNo(null);
    this._deviceDataService.publishSupplimentaryLines([]);
    this._deviceDataService.publishAddToCartEnabling(false);
    this._deviceDataService.publishSupplinesLinesPrice([]);
    this._deviceDataService.publishInternetSharingOption(false);
  }

  removePrincipleLineAndReset() {
    this.removePrincipleLine();
    this.onSwitchingPurchaseTypeTab('null');
    this.typeOfNumHighlight = null;
    this.deviceNumberToDisplay = null;
    this.loading = false;
  }

  onSwitchingPurchaseTypeTab(purchaseType: string) {
    const userInfo = this._userService.getPersonalForm();

    // ? User that are not logged in at this point can't be checked
    // ? follow-up check for those will be in their respective type of purchase wrapper
    const blacklistDatum = userInfo?.type === 'user'
      ? userInfo.data.outputCPResp.blacklist
      : null;

    switch (purchaseType) {
      case "GetNewNumber":
        this.typeOfPurchase = TYPE_OF_PURCHASE.NEW_LINE;
        break;
      case "SameNumber":
        this.typeOfPurchase = TYPE_OF_PURCHASE.CHANGE_OF_BUSSINESS_PLAN;
        break;
      case "ShowMNPBlock":
        this.typeOfPurchase = TYPE_OF_PURCHASE.MOBILE_NUMBER_PORTABILITY;
        break;
      default:
        this.typeOfPurchase = "null";
        break;
    }
    this.isInternallyBlacklisted = false;
    this.isBlacklistedMessage = "";
    if (blacklistDatum) {
        // const { status = false, message = '' } = blacklistDatum;
        this.isInternallyBlacklisted = blacklistDatum.status && blacklistDatum.system === "Internal";
        this.isBlacklistedMessage = blacklistDatum.message;
        // const XPLiteDevice = JSON.parse(localStorage.getItem("xp-lite-device"));
        // if (this.isInternallyBlacklisted) {
        //   if (window.location.href.indexOf('/device-detail') > -1) {
        //     blacklistFlag = true;
        //   }
        //   if ((window.location.href.indexOf('/plans') > -1) && purchaseType !== "SameNumber") {
        //     blacklistFlag = true;
        //   }
        //   if ((window.location.href.indexOf('/plans/xp-lite') > -1) && XPLiteDevice !== null) {
        //     blacklistFlag = true;
        //   }
        // }
        if (this.isInternallyBlacklisted) {
          this.callError(this.isBlacklistedMessage);
          return;
        }
    }
    if(localStorage && localStorage.getItem("AutoBillingTypeOfPurchase") && localStorage.getItem("AutoBillingTypeOfPurchase") !== "undefined" ) {
      const { NL = 0, COBP = 0, MNP = 0 } = JSON.parse(localStorage.getItem("AutoBillingTypeOfPurchase"));
      let autobilling;
      switch (purchaseType) {
        case "GetNewNumber":
          autobilling = NL;
        break;
        case "SameNumber":
          autobilling = COBP;
        break;
        case "ShowMNPBlock":
          autobilling = MNP;
        break;
        default:
          autobilling = AUTO_BILLING.NO;
        break;
      }
      localStorage.setItem("TypeOfPurchase", this.typeOfPurchase);
      this._deviceDataService.publishMandatoryAutoBilling(autobilling);
    }
    if (sessionStorage && sessionStorage.getItem("UserInfo")) {
      if (this.typeOfPurchase !== TYPE_OF_PURCHASE.MOBILE_NUMBER_PORTABILITY) {
        this.callAutoBillingCheck();
      }
    }
    this.displayMNPNote = false;
    this.isUserLoggedIn = this._userService.isCustomer() && !this._userService.isUserEnterprise();
    this._deviceDataService.publishPurchaseTypeTab(purchaseType);
    this.purchaseType = purchaseType;
    if (purchaseType === 'GetNewNumber' || purchaseType === 'removePrincipleLine' && this.isKardasianPlanSelected) {
      this.isKardasianPlanSelectedTab = true;
      this.isPremiumTabSelected = true;
      this.isNormalTabSelected = false;
    }
    if (localStorage.getItem("isPassSelected")) {
      this.isPassSelected = JSON.parse(localStorage.getItem("isPassSelected"));
    }
    if (localStorage.getItem("cancelUpsell")) {
      this.cancelUpsell = JSON.parse(localStorage.getItem("cancelUpsell"));
    }
    if (window.location.href.indexOf("/plans/xp-lite") > -1 && !this.isPassSelected && !this.cancelUpsell && !this.isMviva) {
      this.IsDisplayUpsellPopup = true;
      this.passPopupType.type = "upsellMoon";
      return;
    }
    // Store mviva url for any type of purchase.
    if (this.isMviva && window.location.href.indexOf("?promotiondetails=") > -1 && !sessionStorage.getItem("UserInfo")) {
      localStorage.setItem("mvivaCampaignUrl", window.location.href);
    }
    this.mnpPreSelected = false;
    this._deviceDataService.publishUpfrontWaived(false);
    this._deviceDataService.publishUpfrontWaivedSuccess(false);
    this._deviceDataService.publishUpfrontWaivedFailure(false);
    if (typeof window !== "undefined" && localStorage) {
      localStorage.removeItem("MNP-FLOW");
    }
    if ((this.typeOfNumHighlight !== null && this.selectedNumber !== null) ||
      (this.data.IsMnp && localStorage && localStorage.getItem("Eligible") === 'true') ||
      (this.data.cobpEligible && this.typeOfNumHighlight === "EXISTING_NUMBER")) {
      if (sessionStorage.getItem('USER_TYPE') && ["GUEST", "ENTERPRISE"].includes(sessionStorage.getItem("USER_TYPE"))) {
        if (purchaseType === 'SameNumber') {
          this.sameNumber();
          this._deviceDataService.publishMnpEdited(false);
        } else {
          this.popupType.type = "switchingpurchasetype";
          this.IsDispalySwitchingPurchaseTypeTabPopup = true;
          this.purchaseType = purchaseType;
        }
      } else {
        this.popupType.type = "switchingpurchasetype";
        this.IsDispalySwitchingPurchaseTypeTabPopup = true;
        this.purchaseType = purchaseType;
      }
    } else {
      if (purchaseType === 'GetNewNumber') {
        this.getNewNumbers();
        this._deviceDataService.publishMnpEdited(false);
      } else if (purchaseType === 'SameNumber') {
        this.sameNumber();
        if (localStorage && localStorage.getItem("lifestylePlans")) {
          localStorage.setItem("lifestyleCOBP", localStorage.getItem("lifestylePlans"));
        }
        this._deviceDataService.publishMnpEdited(false);
      } else if (purchaseType === 'ShowMNPBlock') {
        this.showmnpblock();
      }
    }
    // Activate addons, on removal of principal line.
    this._deviceDataService.publishDeactivateLifestyleAddons(false);
  }
  onContinueSwitchingPurchaseTypeTab() {
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
    if (localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
      localStorage.removeItem("suppLinesAddedByTheUser");
    }
    if (this.purchaseType === 'GetNewNumber') {
      if (localStorage && localStorage.getItem("COBP_FLOW")) {
        localStorage.removeItem("COBP_FLOW");
      }
      if (localStorage.getItem("COBP_login_Check")) {
        localStorage.removeItem("COBP_login_Check");
      }
      if (localStorage.getItem("COBP_FLOW_CHECK")) {
        localStorage.removeItem("COBP_FLOW_CHECK");
      }
      this.getNewNumbers();
    } else if (this.purchaseType === 'SameNumber') {
      this.sameNumber();
      if (localStorage && localStorage.getItem("lifestylePlans")) {
        localStorage.setItem("lifestyleCOBP", localStorage.getItem("lifestylePlans"));
      }
    } else if (this.purchaseType === 'ShowMNPBlock') {
      this.showmnpblock();
    } else if (this.purchaseType === 'removePrincipleLine') {
      this.removePrincipleLine();
    }
    this._deviceDataService.publishSupplimentaryLines([]);
  }
  onCancellingSwitchingPurchaseTypeTab() {
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
  }
  onContinueUpsellPopup() {
    this.IsDisplayUpsellPopup = false;
    localStorage.setItem("cancelUpsell", JSON.stringify(true));
    this._deviceDataService.publishUpsellProceed(true);
    this._deviceDataService.publishUpdateStickyStep(1);
    this._deviceDataService.publishUpdateStep(1);
  }
  onCancelUpsellPopup() {
    this.IsDisplayUpsellPopup = false;
    this.cancelUpsell = true;
    localStorage.setItem("cancelUpsell", JSON.stringify(this.cancelUpsell));
    this.onSwitchingPurchaseTypeTab(this.purchaseType);
  }
  decidePublishStep(step) {
    if (this.isMoon) {
      this._deviceDataService.publishUpdateStickyStep(step);
    } else {
      this._deviceDataService.publishUpdateStep(step);
    }
  }
  callOnNricVerification() {
    this.afterNricAuthentication();
  }
isPre2PostVerified(): boolean {
  if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("pre2post")) {
    const pre2postVal = JSON.parse(sessionStorage.getItem("pre2post"));
    this.decrypter(pre2postVal).then((successMessage) => {
     if (successMessage === "verifiedTrue") {
       return true;
    } else {
      return false;
    }
    });
  } else {
    return false;
  }
}
  decrypter(valueToDecrypt) {
    return new Promise((resolve, reject) => {
      const decrypterUrl = "/rest/V1/decrypt-data";
      const decrypterCAPIRequestBody = valueToDecrypt;
      let outPut = "";
      this._loginService.MobileConnect(decrypterUrl, decrypterCAPIRequestBody).subscribe((res) => {
        outPut = res.status === true ? res.data : "apiError";
        resolve(outPut);
      }, (err) => {
        outPut = "apiFailed";
        resolve(outPut);
      });
    });
  }
  getMsisdnType() {
    const mock = false;
    const getMsisdnTypeAPIUrl = ApiConstant.VERIFY_CUSTOMER;
    const getMsisdnTypeAPIRequestBody = this._commonUtilService.encrypter(JSON.stringify({
      "data": { "mobile_number": this._userService.getUserMsisdn() }
    }));
    this._loginService.MobileConnect(getMsisdnTypeAPIUrl, getMsisdnTypeAPIRequestBody).subscribe(
      (res: any) => {
        this.onRespSuccess(res);
      }, (err: any) => {
        this.onRespError(err);
      }
    );
  }
  onRespSuccess(res) {
    this.loading = false;
    if (res.sim_type === "Prepaid" && res.status === true && res.exception === false) {
      this.enableNRICAuthentication = true;
    } else if (res.sim_type === "Postpaid" && res.status === true && res.exception === false) {
      this.afterNricAuthentication();
    } else {
      this.onApiError(res);
    }
  }
  onRespError(err) {
    this.loading = false;
    this.errorExits = true;
  }
  onApiError(res?) {
    this.errorExits = true;
    this.errorMessage = {
      message: res.message
    };
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.devicedetailNumberservice.getPager(this.totalNumbers.length, page);
    // get current page of items
    this.totalPageItems = this.totalNumbers.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  onSuccessfulLogin(e) {
    if (e) {
      this.enableNRICAuthentication = false;
      this.isUserLoggedIn = true;
      if (this.pageType === 'cobpInLine') {
        this.afterNricAuthentication();
      } else if (this.pageType === 'newInLine') {
        this._deviceDataService.publishAddToCartEnabling(false);
      }
    }
  }
  getNoteDataCMS(): string {
    if (this.data.notes !== undefined) {
      return this.data.notes;
    }
  }
  callAutoBillingCheck() {
    let sku: string = "";
    let actionType: number;
    let msisdn: string = "";

    if (this.typeOfPurchase === "NL") {
      actionType = ACTION_TYPE.POSTPAID_NEW_REG;
      if (localStorage && localStorage.getItem("suppLinesAddedByTheUser") && JSON.parse(localStorage.getItem("suppLinesAddedByTheUser")).length !== 0) {
        actionType = ACTION_TYPE.POSTPAID_NEW_REG_SUPP;
      }
      if (localStorage && localStorage.getItem("isBundleClicked") && localStorage.getItem("isBundleClicked") === "true") {
        actionType = ACTION_TYPE.BUNDLE_NEW_REG;
        if (localStorage && localStorage.getItem("suppLinesAddedByTheUser") && JSON.parse(localStorage.getItem("suppLinesAddedByTheUser")).length !== 0) {
          actionType = ACTION_TYPE.BUNDLE_NEW_REG_SUPP;
        }
      }
    }
    if (this.typeOfPurchase === "COBP") {
      actionType = ACTION_TYPE.POSTPAID_COBP;
      if (localStorage && localStorage.getItem("isEasyPhone") && localStorage.getItem("isEasyPhone") === "true") {
        actionType = ACTION_TYPE.COBP_EASY_PHONE_RENT_OWN;
      }
      if (localStorage && localStorage.getItem("isBundleClicked") && localStorage.getItem("isBundleClicked") === "true") {
        actionType = ACTION_TYPE.BUNDLE_COBP;
      }
    }
    if (this.typeOfPurchase === "MNP") {
      actionType = ACTION_TYPE.POSTPAID_MNP;
    }
    if (localStorage && localStorage.getItem("isDeviceOnlyClicked") && localStorage.getItem("isDeviceOnlyClicked") === "true") {
      actionType = ACTION_TYPE.DEVICE_ONLY;
    }

    if (localStorage && localStorage.getItem("PSku") && localStorage.getItem("PSku") !== null) {
      sku = localStorage.getItem("PSku");
    }
    if (localStorage && localStorage.getItem("DeviceSku")) {
      sku = localStorage.getItem("DeviceSku");
    }
    if (sessionStorage && sessionStorage.getItem("hw_validated_id")) {
      this.isHomeWireless = true;
    }
    if (localStorage && localStorage.getItem("MyMsIsdn")) {
      msisdn = localStorage.getItem("MyMsIsdn");
    }
    msisdn = msisdnHelper(msisdn);
    this.devicedetailNumberservice.AutoBillingCheck({
      sku,
      typeOfPurchase: this.typeOfPurchase,
      actionType,
      msisdn
    }).subscribe((response: any) => {
      if (response[0].status === true) {
        this._deviceDataService.publishMandatoryAutoBilling(response[0].bill_type);
      } else {
        this.callError();
      }
    },
    (error:any) => {
      this.callError();
    });
  }

  callError(message:string = this.errorConst.SYS_DOWN_MSG) {
    if(this.isInternallyBlacklisted) {
      this.isPopUpBlacklist = true;
      this.infoBlacklisted = {
        title: 'Uh Oh!',
        content: message ? message : this.errorConst.SYS_DOWN_MSG,
        button: 'Got it!',
      };
    } else {
      this.maximumReservation = true;
      this.infoMaxLimit = {
        content: message ? message : this.errorConst.SYS_DOWN_MSG
      };
      this._deviceDataService.publishAddToCartDisabling(true);
    }
  }

  CloseBlacklistPopUp = () => this.isPopUpBlacklist = false;
}
