
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { ContentNavigation } from '../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../Service/redirection.service';
import { PlanPurchaseService } from './plan-purchase.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription, Observable } from 'rxjs';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PlanTableComparisionService } from '../../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from '../../../Service/home.service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { UserService } from '../../../Service/user.service';
import { ProjectStarQueryParams } from '../../../Model/projectStar.model';
import { PlansService } from '../../../Service/plans.service';
import { STAR_PLAN_PREFIX, MOON_PLAN_PREFIX, STAR_SPEED_PASS_SKU, STAR_GB_PASS_SKU, iPlan } from '../../../shared/models/plan.model';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { startWith, delay } from 'rxjs/operators';
import { iPass } from 'app/shared/models/plan.model';

@Component({
  selector: 'app-plan-purchase',
  templateUrl: './plan-purchase.component.html',
  styleUrls: [
    './plan-purchase.component.css',
    './plan-purchase.component.scss',
  ],
  providers: [PlanPurchaseService, RedirectionService, PlanTableComparisionService],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        display: 'block',
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        display: 'none',
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})

export class PlanPurchaseComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  // public totalPay: number;
  public PlanPurchaseResponse: any;
  public PlanPurchaseTableData: any;
  public PlanDetails: any = "";
  public PlanPurchaseTable: any;
  public innerPlanPurchaseTable: any;
  public PlanPurchaseTableHidden: any;
  public PlanTableHidden = false;
  public PlanPurchaseDataToPass: any = null;
  public IsInitializedSummary = false;
  public isCSAgentDealer = "";
  public csAgent = "cs-agent";
  public notCSAgent = "not-cs-agent";
  public editProduct: any = null;
  public editDeviceObj: any = null;
  public keepCelcomNumObj: any = null;
  public chosenPlan: any = null;
  public errorAddToCart = false;
  public errorMessage = false;
  public ultraPassUrl = "/rest/V1/ultraplanproductview/mega";
  public loading = true;
  public IsDisplayMvivaPopup = false;
  public IsDisplayDealerPopup = false;
  public MvivaPopupType = "";
  public DealerPopupType = "";
  public isMviva = false;
  public isEasyPhone = "isEasyPhone";
  public isPreOrder = "isPreOrder";
  public isRentClicked = "isRentClicked";
  public isOwnClicked = "isOwnClicked";
  public isBundleClicked = "isBundleClicked";
  public deviceSku = "DeviceSku";
  public mvivaSummaryMessage = "";
  public mvivaPlanUpfront = false;
  public mvivaCampaign = {
    mvivaBannerDesktop: null,
    mvivaBannerMobile: null
  };
  errorDealer = false;
  dealerMessage;
  public mvivaTitle = "";
  public mvivaDescription = "";
  public isProjectMoon = false;
  public isProjectStar = false;
  public DeviceDetailsPlanResponse: any;
  public errorMessageData = false;
  public IsMnpFlowFromDevice = false;
  public infoMNPflow: any = null;
  public cobpCheckPlanPurchase: any;
  public isInitializeDetailBannerLeft = false;
  public dataForDetailBannerTextLeft: any;
  // age eligibility
  public IsDisplayAgeEligibilityPopup = false;
  public EligibilityPopupType = "";
  // lifestyle popup
  public IsDisplayPromotionalLifeStyle = false;
  public DisplayPromotionalLifeStyle: any;
  public promotionalPlan: any;
  public TableComparisonResponse: any;
  public showMoreDetails = 'out';
  // public is_icon_active = false;

  public isXpax: any;
  public is_icon_active = true;
  public PlanPurchaseDataForTableComparision: any;
  public PlanData: any;
  public SelectedTab = "";
  public activeStateList = {}; // eg.  {planName1: {planName:'planName1', isActive:true/false} }
  public isActive: boolean;
  public selectedPlanName: any = null;
  public selectedMonthlyPay: any = null;
  public selectedPlan: any = null;
  public mnpCheckPlanPurchase: any;
  public isInitializeChooseNumber = true;
  public IsDisplaySwitchingPlansTabPopup = false;
  public selectedPrincipleNum: any = null;
  public isNumberSelected: any = null;
  public ispromotiondetails: any = null;
  public isLifestyleValue: any = null;
  public isLifestyle: any = false;
  public utmSource: any = null;
  public urlKey: any = null;
  public popupType: any = { type: "switchingplantab" };
  public ultraData;
  errorRedirect = false;
  SwitchedTabPlanName: any;
  SwitchedTabPlanSku: any;
  SwitchedTabPlanMonthlyPay: any;
  SwitchedTabPlanDetails: any;
  cookie_expire_in_days = this.appConstant.COOKIE_EXPIRE;
  ada_cookie_expire_in_days = this.appConstant.ADA_COOKIE_EXPIRE;
  addOnTermsAccepted = false;
  addonCode: any;
  isInitializeAddons = true;
  urlParamPromotiondetails: any = null;
  urlParamLifestyleValue: any = null;
  urlParamUtmSource: any = null;
  isLifestyleUrl = false;
  promotionUrl: any = "";
  public isKardasianPlanSelected = true;
  public hideDeviceSection = true;
  private subscriber: Subscription;
  public termsAndConditionsLinks: any = {
    FG: "/legal/terms-and-conditions/personal#personal-postpaid-plans-first-gold",
    FGP: "/legal/terms-and-conditions/personal#personal-postpaid-plans-first-gold-plus",
    FP: "/legal/terms-and-conditions/personal#personal-postpaid-plans-first-platinum",
    FPP: "/legal/terms-and-conditions/personal#personal-postpaid-plans-first-platinum-plus",
    FGS: "/legal/terms-and-conditions/personal#personal-postpaid-plans-first-gold-supreme",
  };
  public termsAndConditionsURL = "";
  public billTypeForPlan = 0;
  isCustomer = false;
  public ProjectStarQueryParams: ProjectStarQueryParams = new ProjectStarQueryParams();
  ultraPlanPassDetailResponse = null;
  public suppLinesObj: any;
  originalOfferText = '';
  plan$: Observable<iPlan>;
  selectedMonthlyPlan:any;

  pass$: Observable<iPass>;

  constructor(private planpurchaseservice: PlanPurchaseService,
    private _deviceDataService: DeviceDataService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _service: PlanTableComparisionService,
    private _homeService: HomeService,
    private getParamsService: GetParametersService,
    private cookieService: CookieService,
    private _userService: UserService,
    private _plansService: PlansService,
    private _globalErrorHandler: GlobalErrorHandler,
    private _planQuery: PlansQuery
  ) {
    super();
    this.PlanPurchaseTable = [];
    this.innerPlanPurchaseTable = [];
  }
  setAgentLoggedIn() {
    if (sessionStorage && (sessionStorage.getItem("UserToken"))) {
      this.isCustomer = true;
    }
    if (sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = this.csAgent;
    } else {
      this.isCSAgentDealer = this.notCSAgent;
    }
  }

  selectPass(pass) {
    this._plansService.selectPass(pass)
  }

  ngOnInit() {
    this.errorRedirect = false;
    this.pass$ = this._planQuery.select(store => store.pass).pipe(
      startWith(null),
      delay(0)
    );
    localStorage.removeItem("xp-lite-device");
    localStorage.removeItem("TypeOfPurchase");
    const plan_sku = this._activatedRoute.snapshot.params?.planPurchaseId + '';
    if (plan_sku.startsWith(STAR_PLAN_PREFIX)) {
      this.isProjectStar = true;
      this._plansService.updateIsStar(true);
      this.ultraPassUrl = `/rest/V1/ultraplanproductview/${plan_sku}`;
    } else {
      this.isProjectStar = false;
      this._plansService.updateIsStar(false);
    }

    if (plan_sku.startsWith(MOON_PLAN_PREFIX)) {
      this._plansService.updateIsMoon(true);
    } else {
      this._plansService.updateIsMoon(false);
      localStorage.removeItem('isProjectStar');
    }
    this.setAgentLoggedIn();
    this.subscriber = this._deviceDataService.sharedLoggedInUserName$.subscribe(
      data => {
        if (data) {
          this.setAgentLoggedIn();
        }
      });
    // if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("DealerInfo")) {
    //   const eligibilityInfo = {
    //     isEligibleByAge: false,
    //     displayType: 'INVALID_DEALER_URL',
    //     type: 'xpax'
    //   };
    //   this._globalErrorHandler.errorObjectConvert(eligibilityInfo.displayType);
    //   this.DealerPopupType = JSON.parse(JSON.stringify(eligibilityInfo));
    //   this.IsDisplayDealerPopup = true;
    // } else {
    // Function call to reach the url paramaters of affiliate promotions.

    this.captureQueryParams();
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = this.csAgent;
    } else {
      this.isCSAgentDealer = this.notCSAgent;
    }
    if (localStorage && localStorage.getItem(this.isEasyPhone)) {
      localStorage.removeItem(this.isEasyPhone);
    }
    if (localStorage && localStorage.getItem(this.isPreOrder)) {
      localStorage.removeItem(this.isPreOrder);
    }
    if (localStorage && localStorage.getItem(this.isRentClicked)) {
      localStorage.removeItem(this.isRentClicked);
    }
    if (localStorage && localStorage.getItem(this.isOwnClicked)) {
      localStorage.removeItem(this.isOwnClicked);
    }
    if (localStorage && localStorage.getItem(this.isBundleClicked)) {
      localStorage.removeItem(this.isBundleClicked);
    }
    if (localStorage && localStorage.getItem(this.deviceSku)) {
      localStorage.removeItem(this.deviceSku);
    }
    if (localStorage && localStorage.getItem("lifestylePlans")) {
      localStorage.removeItem("lifestylePlans");
    }
    if (localStorage.getItem("COBP_login_Check")) {
      localStorage.removeItem("COBP_login_Check");
    }
    if (localStorage.getItem("COBP_FLOW_CHECK")) {
      localStorage.removeItem("COBP_FLOW_CHECK");
    }
    if (localStorage && localStorage.getItem("BuyNoPlan")) {
      localStorage.removeItem("BuyNoPlan");
    }
    localStorage.removeItem('easyPhoneSelected');
    localStorage.removeItem('deviceBundleSelected');
    localStorage.removeItem("SuppLinesAdded");
    localStorage.removeItem('suppNumber');
    localStorage.removeItem("PrincipleNumberSelected");
    /* Added for enabling and disabling of the success errors and info popup's at the bottom */
    this.plan$ = this._planQuery.select(store => store.plan);

    this.plan$.subscribe(data =>{
      if(data){
        this.selectedMonthlyPlan = data?.monthlyPlan;
      }
    })
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => {
        this.errorDealer = data;
        if(data === false && this.errorRedirect === true) this._router.navigate(["/store/devices"]);
      }
    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.errorAddToCart = data)
    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.IsMnpFlowFromDevice = data)
    );
    this.subscriber = this._deviceDataService.sharedPhoneNo$.subscribe(data => this.selectedPrincipleNum = data);
    this.subscriber = this._deviceDataService.sharedPassPlanStar$.subscribe(data => {
      const sku = data ? data['passSku'] : '';
      if (sku == STAR_SPEED_PASS_SKU) {
        // Speed
        if (this.ultraPlanPassDetailResponse && this.ultraPlanPassDetailResponse.base_plan[0]) {
          setTimeout(() => {
            const newOffer = this.originalOfferText.replace(/\d+?GB/gi, `Unlimited`);
            this.ultraPlanPassDetailResponse.base_plan[0].offer = newOffer;
          }, 0);
        }
      } else if (sku == STAR_GB_PASS_SKU) {
        // GB
        this.ultraPlanPassDetailResponse.base_plan[0].offer = this.originalOfferText;
      }
    });
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("SelectedPlanDetailsInDevice")) {
      localStorage.removeItem("SelectedPlanDetailsInDevice");
    }
    if (typeof window !== "undefined" && localStorage) {
      if (localStorage.getItem("CartEditProduct")) {
        this.editProduct = JSON.parse(localStorage.getItem("CartEditProduct"));
        localStorage.removeItem("CartEditProduct");
      }
      if (this.editProduct !== null) {
        this.editDeviceObj = {};
        this.editDeviceObj.phoneNum = this.editProduct.selectedProduct.orderPhoneNo;
        this.editDeviceObj.orderNumberType = this.editProduct.selectedProduct.orderNumberType;
        this.editDeviceObj.is_golden_number = this.editProduct.selectedProduct.selectedPlanDetails.is_golden_number === 1;
        if (this.isProjectStar) {
          this.editDeviceObj.pass = this.editProduct.selectedProduct.selected_pass_details.sku;
          if(this.editProduct.selectedProduct.selected_pass_details.selected_associated_pass_details)
            this.editDeviceObj.type = this.editProduct.selectedProduct.selected_pass_details.selected_associated_pass_details.sku;
        }
        if (this.editProduct.has_add_ons) {
          localStorage.setItem("lifestyleEDIT", this.editProduct.has_add_ons);
        }
      } else if (typeof window !== 'undefined' && localStorage && localStorage.getItem("MyMsIsdn") && localStorage.getItem("chosenPlan")) {
        this.keepCelcomNumObj = {};
        this.keepCelcomNumObj = JSON.parse(localStorage.getItem('chosenPlan'));
        this.keepCelcomNumObj.phoneNum = localStorage.getItem("MyMsIsdn");
        localStorage.removeItem("chosenPlan");
      } else if (typeof window !== 'undefined' && localStorage && sessionStorage && sessionStorage.getItem("OLD_GUEST_USER") &&
        localStorage.getItem("GUEST_USER_FIRST")) {
        this.keepCelcomNumObj = {};
        this.keepCelcomNumObj = JSON.parse(localStorage.getItem('chosenPlan'));
      }
    }
    if (plan_sku.startsWith(MOON_PLAN_PREFIX)) {
      this.isProjectMoon = true;
      this.loading = false;
    } else {
      this.isProjectMoon = false;
      this.Init();
    }
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // let self= this;
      window.onscroll = () => {
        const eleId = document.getElementById('sticky-cart');
        const eleId4 = document.getElementById('step4');
        const eleIdToaster = document.getElementsByClassName('b-notification');
        // alert(eleId1 +' '+eleId2);
        if (eleId4 != null) {
          const stickyTop = eleId4.offsetTop;
          if (window.pageYOffset >= stickyTop - 400) {
            // self.step=4;
            if (this.isCSAgentDealer === this.csAgent && this.isCustomer) {
              eleId.classList.add('sticky', 'csagent', 'customer');
            } else if (this.isCSAgentDealer === this.csAgent) {
              eleId.classList.add('sticky', 'csagent');
            } else {
              eleId.classList.add('sticky');
            }
            const headerHeight = +(<any>document.getElementsByClassName('c-global-navigation')[0]).offsetHeight;
            eleId.style.cssText = `top: ${headerHeight}px`;
            if (eleIdToaster.length >= 0) {
              for (let i = 0; i < eleIdToaster.length; i++) {
                eleIdToaster[i].classList.remove('has-margin');
                eleIdToaster[i].classList.remove('has-more-margin');
                if (i === 1) {
                  eleIdToaster[i].classList.add('has-less-margin');
                  eleIdToaster[i].classList.remove('has-more-margin');
                }
              }
            }
          } else {
            // self.step=4;
            if (this.isCSAgentDealer === this.csAgent && this.isCustomer) {
              eleId.classList.remove('sticky', 'csagent', 'customer');
            } else if (this.isCSAgentDealer === this.csAgent) {
              eleId.classList.remove('sticky', 'csagent');
            } else {
              eleId.classList.remove('sticky');
            }
            eleId.style.cssText = ``;
            if (eleIdToaster.length > 0) {
              for (let i = 0; i < eleIdToaster.length; i++) {
                eleIdToaster[i].classList.add('has-margin');
                eleIdToaster[i].classList.remove('has-more-margin');
                if (i === 1) {
                  eleIdToaster[i].classList.add('has-more-margin');
                  eleIdToaster[i].classList.remove('has-less-margin');
                }
              }
            }
          }
        }
      };
    }
    this.ManageAgeEligibilityPopupOnPageLoad();
    if (this.DeviceDetailsPlanResponse) {
      this.DeviceDetailsPlanResponse.forEach((itemParent: any, index) => {
        itemParent.atrHref = "#rm-" + index;
        itemParent.TableInfo.forEach((item: any, index) => {
          item.Id = index;
          item.HrefId = "rm-" + index;
        });
      });
    }
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("ls_subnav", JSON.stringify({ "activeMenu": "Postpaid", "currentURL": "personal/postpaid" }));
    }
  // }
  }

  // manage eligibility check
  public ManageAgeEligibilityPopupOnPageLoad() {
    if (typeof window !== "undefined" && localStorage) {
      const result: any = JSON.parse(localStorage.getItem('EligibilityIndicator'));
      if (result != null) {
        if (!result.isEligibleByAge && result.type === 'xpax') {
          this.EligibilityPopupType = result.displayType;
          this._globalErrorHandler.errorObjectConvert(this.EligibilityPopupType);
          this.IsDisplayAgeEligibilityPopup = true;
        }
      }
    }
  }
  public OnContinueEligibilityCheck(data: any) {
    this.IsDisplayAgeEligibilityPopup = false;
  }

  public MoreDetails() {
    if (typeof navigator !== 'undefined' && this.showMoreDetails === 'out') {
      const moreDetailsAnchor = document.getElementById("moreDetailsD");
      const is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
      if (moreDetailsAnchor != null) {
        const topPosition = moreDetailsAnchor.offsetTop + moreDetailsAnchor.offsetHeight;
        if (typeof window !== 'undefined') {
          if (is_chrome) {
            window.scroll({ top: topPosition, left: 0, behavior: 'smooth' });
          } else {
            // IE,FireFox scrolling
            window.scrollTo(0, topPosition);
          }
        }
      }
    }
    this.activePlan();
    this.is_icon_active = !this.is_icon_active;
    this.showMoreDetails = this.showMoreDetails === 'out' ? 'in' : 'out';
  }

  public activePlan() {
    if (this.DeviceDetailsPlanResponse && this.PlanPurchaseResponse) {
      for (let index = 0; index < this.DeviceDetailsPlanResponse.length; index++) {
        if (this.DeviceDetailsPlanResponse[index].name === this.PlanPurchaseResponse.PlanName) {
          // alert(index);
          this.accordianOpen(index);
        }
      }
    }
  }

  accordianOpen(i) {
    // ev.preventDefault();

    if (typeof document !== 'undefined') {
      const listLnth = document.getElementsByClassName('plan-comparison__list__item__header');
      for (let index = 0; index < listLnth.length; index++) {
        if (index === i) {
          listLnth[index].classList.toggle('is-active');
        } else if (listLnth[index].classList.contains('is-active')) { // remaining items header to be deselected
          listLnth[index].classList.toggle('is-active');
        }
      }
      for (let index = 0; index < this.DeviceDetailsPlanResponse.length; index++) {
        const el = document.getElementById("rm-" + index);
        if (i === index && el) {
          el.classList.toggle('is-active');
        } else if (el && el.classList.contains('is-active')) { // remaining item list to be deslected
          el.classList.toggle('is-active');
        }
      }
    }
  }

  public OnContinueMvivaCheck(data: any) {
    if (typeof window !== "undefined") {
      this.IsDisplayMvivaPopup = false;
      window.location.href = window.location.origin + window.location.pathname;
    }
  }

  public OnContinueDealerCheck(data: any) {
    if (typeof window !== "undefined") {
      this.IsDisplayDealerPopup = false;
      window.location.href = "/store/devices";
    }
  }

  public appendLifeStyleFlag(items) {
    const lifeStyleArray = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].url_key === this.urlKey) {
        const item = items[i];
        lifeStyleArray.push(item);
      }
    }
    return lifeStyleArray;
  }

  public DisplayPlanList() {
    let url = "/rest/V1/planproductlist/4/0";
    if (this.isMviva) {
      url = "/rest/V1/planproductlist/4/1";
    }
    url = this._userService.updateApiUrl(url);
    this._service.Find(url).subscribe(
      (response: any) => {
        this.TableComparisonResponse = response;
        this.TableComparisonResponse.forEach(element => {
          if (this.isXpax === "false" || this.isXpax === false) {
            if (!element.is_xpax) {
              this.SelectedTab = this.TableComparisonResponse[0].tabname;
              this.FindPlanDataByIndex(0);
              this.DeviceDetailsPlanResponse = element.tabdata.Items;
              this.DeviceDetailsPlanResponse = [
                ...this.DeviceDetailsPlanResponse.sort((a, b) => {
                  return +a['TotalPay'] > +b['TotalPay'] ? 1 : -1;
                })
              ];
              let items = element.tabdata.Items;
              if (this.isLifestyleValue && this.ispromotiondetails === "ADA" && this.utmSource.indexOf("ADA") > -1) {
                items = this.appendLifeStyleFlag(items);
              }
              this.DeviceDetailsPlanResponse = items; // element.tabdata.Items;
              this.isXpax = false;
            } else {
              return;
            }
          } else {
            if (element.is_xpax) {
              this.SelectedTab = this.TableComparisonResponse[1].tabname;
              this.FindPlanDataByIndex(1);
              this.DeviceDetailsPlanResponse = element.tabdata.Items;
              let items = element.tabdata.Items;
              if (this.isLifestyleValue && this.ispromotiondetails === "ADA" && this.utmSource.indexOf("ADA") > -1) {
                items = this.appendLifeStyleFlag(items);
              }
              this.DeviceDetailsPlanResponse = items; // element.tabdata.Items;
              this.isXpax = true;
            } else {
              return;
            }
          }
        });
      });
  }

  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }

  get userType(){
    return sessionStorage ? sessionStorage.getItem("USER_TYPE") : null;
  }

  Init() {
    let apiUrlId;
    if (this._activatedRoute.params) {
      this._activatedRoute.params.subscribe(params => {
        const id = params['planPurchaseId'];
        if (id) {
          apiUrlId = id;
          this.urlKey = id;
        } else if (this.userType == 'ENTERPRISE') {
          const plan = sessionStorage.getItem('enterprise_plan');
          apiUrlId = plan;
          this.urlKey = plan;
        }
      });
    }
    this.ispromotiondetails = this.getParamsService.getParameterByName('promotiondetails');
    this.isLifestyleValue = this.getParamsService.getParameterByName('LS');
    this.utmSource = this.getParamsService.getParameterByName('utm_source');
    this.promotionalPlan = this.urlKey;
      if (this.editProduct) {
        this.isLifestyleValue = this.editProduct.add_on_code;
        if (this.cookieService.check('adaRemainingDays')) {
          const affiliateData = JSON.parse(this.cookieService.get('adaRemainingDays'));
          this.editProduct.is_affiliate_ada = affiliateData.name;
        }
        this.ispromotiondetails = this.editProduct.is_affiliate_ada ? "ADA" : "";
        this.utmSource = this.editProduct.is_affiliate_ada;
      } else {
        if (localStorage && localStorage.getItem("addonCode")) {
          localStorage.removeItem("addonCode");
        }
      }
      if (localStorage.getItem("Eligible")) {
        localStorage.removeItem("Eligible");
      }
    if (window.location.href.indexOf("?promotiondetails=") > -1) {
      apiUrlId = apiUrlId + window.location.search;
      this.ultraPassUrl += window.location.search;
    }
    // Append the lifestyle type to api call.
    if (this.isLifestyleValue !== null && this.ispromotiondetails === "ADA" && this.utmSource.indexOf("ADA") > -1) {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem("promotionallifestylePlans", "true");
      }
    } else {
      if (localStorage && localStorage.getItem("promotionallifestylePlans")) {
        localStorage.removeItem("promotionallifestylePlans");
      }
    }
    if (this.isProjectStar === true) {
      localStorage.setItem('isProjectStar', 'true');
      this.parseUltraPlans();
    } else {
      localStorage.removeItem('isProjectStar');
      this.planpurchaseservice
        .Find(apiUrlId)
        .subscribe((data: any) => {
          this.parseFirstPlans(data);
        },
          err => {
            this.loading = false;
            this.isInitializeDetailBannerLeft = true;
            this.dataForDetailBannerTextLeft = { "Name": "Plan not found", "Api": this.API_URL_CONST.PAGE_NOT_FOUND_URL };
            this._deviceDataService.publishPageNotFound(true);
          }
        );
    }
  }
  parseUltraPlans() {
    this.planpurchaseservice
      .FindUltraPlan(this.ultraPassUrl)
      .subscribe((ultradata: any) => {
        if(ultradata[0].status === false) {
          this._deviceDataService.publishPageNotFound(true);
          this.errorDealer = true;
          this.errorRedirect = true;
          this.dealerMessage = {
            title: 'Uh Oh!',
            content: ultradata[0].message ? ultradata[0].message : this.errorConst.SYS_DOWN_MSG,
            button: 'Got it!',
          };
          return;
        }
        this._deviceDataService.publishMandatoryAutoBilling(ultradata[0].tabData.bill_type);
        localStorage.setItem("AutoBillingTypeOfPurchase",JSON.stringify(ultradata[0].auto_bill_type_of_purchase));
        this.ultraData = ultradata;
        this.loading = false;
        this.parseFirstPlans(ultradata);
        this._plansService.selectBasePlan(ultradata[0].tabData.base_plan[0]);
        this._deviceDataService.publishBasePlanStar({
          PlanName: ultradata[0].tabData.base_plan[0].name,
          PlanMonthlyPay: ultradata[0].tabData.base_plan[0].monthly_plan,
          data_limit: ultradata[0].tabData.base_plan[0].data_limit,
          speed_limit: ultradata[0].tabData.base_plan[0].speed_limit,
          sku: ultradata[0].tabData.base_plan[0].sku,
          bundle_sku: ultradata[0].tabData.sku,
        });
        this.IsInitializedSummary = true;
        this.ultraPlanPassDetailResponse = ultradata[0].tabData;
        if (this.ultraPlanPassDetailResponse && this.ultraPlanPassDetailResponse.base_plan && this.ultraPlanPassDetailResponse.base_plan[0]) {
          const offer = this.ultraPlanPassDetailResponse.base_plan[0]['offer'];
          this.originalOfferText = offer;
        }
        this.PlanPurchaseResponse = this.ultraPlanPassDetailResponse;
        this.PlanPurchaseDataToPass = this.PlanPurchaseResponse;
        this.PlanPurchaseDataToPass.PlanOnlyComponentToShow = true;
        this.PlanPurchaseDataToPass.is_ultra = true;
        this.chosenPlan = this.PlanPurchaseDataToPass;
        this.suppLinesObj = ultradata[0].tabData.base_plan[0].supplementary_data ?
        ultradata[0].tabData.base_plan[0].supplementary_data : [];
        this.PlanPurchaseResponse.base_plan[0].product_type =
        this.PlanPurchaseResponse.base_plan[0].product_type ? this.PlanPurchaseResponse.base_plan[0].product_type : "Service";
        this._estoreAnalyticsService.SetProductDetails(this.PlanPurchaseResponse.base_plan[0], this._renderer);
        localStorage.setItem("SelectedPlanDetails", JSON.stringify(this.PlanPurchaseDataToPass));
      },
      err => {
        this.loading = false;
        this.dataForDetailBannerTextLeft = { "Name": "Plan not found", "Api": this.API_URL_CONST.PAGE_NOT_FOUND_URL };
        this.isInitializeDetailBannerLeft = true;
        this._deviceDataService.publishPageNotFound(true);
      });
  }
  parseFirstPlans(data) {
    this.loading = false;
    if (data[0] && data[0].tabData) {
      this.PlanPurchaseResponse = data[0].tabData;
      if (this.PlanPurchaseResponse && !this.PlanPurchaseResponse.is_campaign_mviva &&
        this.PlanPurchaseResponse.campaign_mviva_invalid) {
        const eligibilityInfo = {
          isEligibleByAge: false,
          displayType: 'INVALID_MVIVA_URL',
          type: 'xpax'
        };
        this._globalErrorHandler.errorObjectConvert(eligibilityInfo.displayType);
        this.MvivaPopupType = JSON.parse(JSON.stringify(eligibilityInfo));
        this.IsDisplayMvivaPopup = true;
      } else {
        // Get lifestyle promotion eligibility status.
        if (data[0].tabData && data[0].tabData.addons && data[0].tabData.addons.status !== undefined) {
          this.isLifestyle = data[0].tabData.addons.status; // If "true" enable,"false" disable.
        }
        this.IsDisplayPromotionalLifeStyle = !this.isLifestyle && this.isLifestyleUrl;
        this._estoreAnalyticsService.SetProductDetails(this.PlanPurchaseResponse, this._renderer);
        this.isXpax = this.PlanPurchaseResponse.is_xpax;
        this.isMviva = this.PlanPurchaseResponse.is_campaign_mviva ? this.PlanPurchaseResponse.is_campaign_mviva : false;
        if (this.isMviva && this.PlanPurchaseResponse.campaign_mviva) {
          this.mvivaSummaryMessage = this.PlanPurchaseResponse.campaign_mviva.summary_message;
          this.mvivaPlanUpfront = this.PlanPurchaseResponse.campaign_mviva.no_upfront_payment;
          this.mvivaCampaign = {
            mvivaBannerDesktop: this.PlanPurchaseResponse.campaign_mviva.desktop_content,
            mvivaBannerMobile: this.PlanPurchaseResponse.campaign_mviva.mobile_content,
          };
        }
        this._deviceDataService.publishMviva(this.isMviva);
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("isMviva", JSON.stringify(this.isMviva));
          if (this.mvivaSummaryMessage) {
            localStorage.setItem("mvivaSummaryMessage", this.mvivaSummaryMessage);
          } else {
            localStorage.removeItem("mvivaSummaryMessage");
          }
          if (localStorage.getItem("mvivaBundleUpfront")) {
            localStorage.removeItem("mvivaBundleUpfront");
          }
          if (this.mvivaPlanUpfront) {
            localStorage.setItem("mvivaPlanUpfront", JSON.stringify(this.mvivaPlanUpfront));
          } else {
            localStorage.removeItem("mvivaPlanUpfront");
          }
        }
        this.DisplayPlanList();
        if (this.PlanPurchaseResponse != null) {
          this.PlanPurchaseDataToPass = this.PlanPurchaseResponse;
          this.PlanPurchaseDataToPass.PlanName = this.PlanPurchaseResponse.PlanName;
          this.PlanPurchaseDataToPass.PlanSku = this.PlanPurchaseResponse.sku;
          this.PlanPurchaseDataToPass.telco_day = this.PlanPurchaseResponse.telco_day;
          if (this.PlanPurchaseDataToPass.is_xpax === false) {
            this.termsAndConditionsURL = this.termsAndConditionsLinks[this.PlanPurchaseResponse.sku];
          }
          if (this.PlanPurchaseDataToPass.is_xpax === true) {
            this.termsAndConditionsURL = "/legal/terms-and-conditions/personal#personal-postpaid-plans";
          }
          this.chosenPlan = this.PlanPurchaseDataToPass;
          if (typeof window !== 'undefined') {
            if (localStorage) {
              localStorage.setItem("PSku", this.PlanPurchaseDataToPass.PlanSku);
            }
          }
          if (this.PlanPurchaseResponse.PlanMonthlyPay != null) {
            this.PlanPurchaseDataToPass.PlanMonthlyPay = this.PlanPurchaseResponse.PlanMonthlyPay;
            this.PlanPurchaseDataToPass.OneTimePayment = this.PlanPurchaseResponse.PlanMonthlyPay;
          } else {
            this.PlanPurchaseDataToPass.PlanMonthlyPay = "0";
            this.PlanPurchaseDataToPass.OneTimePayment = "0";
          }
          this.PlanPurchaseDataToPass.TotalPay = parseFloat(this.PlanPurchaseDataToPass.OneTimePayment);
          this.PlanPurchaseDataToPass.PlanOnlyComponentToShow = true;
          this.IsInitializedSummary = true;
          this.PlanPurchaseDataToPass.IsMnp = false;
          this.SelectPlan(this.PlanPurchaseDataToPass.PlanName, this.PlanPurchaseDataToPass.PlanSku,
            this.PlanPurchaseDataToPass.PlanMonthlyPay, this.PlanPurchaseDataToPass);
          let utm_source = this.getParamsService.getParameterByName('utm_source');

          this.MoreDetails();


          if (utm_source === null && this.cookieService.check('adaRemainingDays')) {
            const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
            utm_source = adaRemainingDays.name;
          }
          if (utm_source !== null && utm_source.indexOf('ADA') > -1 && sessionStorage && this.isLifestyle === true) {
            sessionStorage.setItem('is_affiliate_ada', 'Yes');
            this.createCookieForAffiliateMarketing(utm_source);
          }
          if (utm_source === 'InvolveAsia') {
            this.createCookieForAffiliateMarketing(utm_source);
          }
        }
      }
    } else {
      if (!data[0].status) {
        this.isInitializeDetailBannerLeft = true;
        this.dataForDetailBannerTextLeft = { "Name": "Plan not found", "Api": this.API_URL_CONST.PAGE_NOT_FOUND_URL };
        this._deviceDataService.publishPageNotFound(true);
      }
    }
  }
  public createCookieForAffiliateMarketing(source) {
    if (source === 'InvolveAsia') {
      const orderItem = {
        quantity: '1',
        categoryName: 'Postpaid Plan',
        isSubmitted: false
      };
      this.cookieService.delete('adaRemainingDays', '/');
      this.cookieService.delete('adaStartDate', '/');
      // Add IA Pixel cookie.
      this.cookieService.set('orderItem', JSON.stringify(orderItem), this.cookie_expire_in_days, '/');
      this.cookieService.set('iaStartDate', new Date() + '', this.cookie_expire_in_days, '/');
    }
    if (source.indexOf('ADA') > -1) {
      const adaType = {
        name: source,
        isSubmitted: false
      };
      if (this.getParamsService.getParameterByName('utm_source') !== null) {
        // Delete IA Pixel cookie.
        this.cookieService.delete('iaStartDate', '/');
        this.cookieService.delete('orderItem', '/');
        // Add ADA Pixel cookie.
        this.cookieService.set('adaStartDate', new Date() + '', this.ada_cookie_expire_in_days, '/');
        this.cookieService.set('adaRemainingDays', JSON.stringify(adaType), this.ada_cookie_expire_in_days, '/');
      }
      this.addAffiliateScriptToHead();
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
         fbq('track', 'ViewContent');`
      });
      adaObj.push({
        type: 'header_noscript_block',
        value: `<img height="1" width="1" src="https://www.facebook.com/tr?id=222287968473810&ev=PageView&noscript=1"/>`
      });
      this._homeService.ManageConfigurableScripts(adaObj);
    }
  }
  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  public OnMnpEligibilityPlanPurchase(data) {
    this.mnpCheckPlanPurchase = data;
    if (data.isEligible) {
      this.PlanPurchaseDataToPass.TotalPay = "0.00";
      this.PlanPurchaseDataToPass.OneTimePayment = "0";
      this.PlanPurchaseDataToPass.IsMnp = true;
      this.PlanPurchaseDataToPass.PrincipalLine = data.principleMobileNumber;
      this.PlanPurchaseDataToPass.portNumber = data.portNumber;
      this.InitializeDeviceDetailSummary(this.PlanPurchaseDataToPass.portNumber);
    } else {
      this.PlanPurchaseDataToPass.TotalPay = parseFloat(this.PlanPurchaseDataToPass.OneTimePayment);
      this.PlanPurchaseDataToPass.OneTimePayment = this.PlanPurchaseResponse.PlanMonthlyPay;
      this.PlanPurchaseDataToPass.IsMnp = false;
      this.PlanPurchaseDataToPass.PrincipalLine = "";
      this.PlanPurchaseDataToPass.portNumber = "";
      this.InitializeDeviceDetailSummary(null);
    }
  }

  public OnCOBPEligibilityPlanPurchase(data) {
    data.IsMnp = false;
    this.cobpCheckPlanPurchase = data;
    let selectedPlanDetails;
    if (localStorage && localStorage.getItem("SelectedPlanDetails")) {
      selectedPlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
    }

    if (data.cobpEligible && !data.userLessThanSixMonths) {
      if (!this.isProjectStar) {
        this.PlanPurchaseDataToPass.TotalPay = 0;
        this.PlanPurchaseDataToPass.OneTimePayment = 0;
        if (this.isMviva && localStorage.getItem("mvivaPlanUpfront") &&
          JSON.parse(localStorage.getItem("mvivaPlanUpfront")) === true) {
          this._deviceDataService.publishTotalPay(0);
        } else {
          this._deviceDataService.publishTotalPay(this.PlanPurchaseDataToPass.TotalPay);
        }
        this._deviceDataService.publishOneTimePay(this.PlanPurchaseDataToPass.OneTimePayment);
      }
    } else {
      this.PlanPurchaseDataToPass.TotalPay = parseFloat(selectedPlanDetails.OneTimePayment);
      this.PlanPurchaseDataToPass.OneTimePayment = selectedPlanDetails.PlanMonthlyPay;
      if (this.isMviva && localStorage.getItem("mvivaPlanUpfront") &&
        JSON.parse(localStorage.getItem("mvivaPlanUpfront")) === true) {
        this._deviceDataService.publishTotalPay(0);
      } else {
        if(data['star_eligibility']){
          const { response: {plan, pass} } = data['star_eligibility'];
          let totalPay = 0;
          totalPay += +plan || 0;
          totalPay += +pass || 0;
          totalPay += +(data.penaltyCheck?.device_upfront_penalty) || 0;
          this._deviceDataService.publishTotalPay(totalPay);
        }else{
          this._deviceDataService.publishTotalPay(this.PlanPurchaseDataToPass.TotalPay);
        }
        if(this.isProjectStar && data.cobpEligible !== true) {
          const { TotalPay } = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
          this._deviceDataService.publishTotalPay(TotalPay);
        }
      }
      this._deviceDataService.publishOneTimePay(this.PlanPurchaseDataToPass.OneTimePayment);
    }
  }
  public onResetPriceData(data) {
    let selectedPlanDetails;
    data.IsMnp = false;
    if (localStorage && localStorage.getItem("SelectedPlanDetails")) {
      selectedPlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
    }
    selectedPlanDetails.TotalPay = selectedPlanDetails.TotalPay.toString();
    if (this.isMviva && localStorage.getItem("mvivaPlanUpfront") &&
       JSON.parse(localStorage.getItem("mvivaPlanUpfront")) === true) {
        this._deviceDataService.publishTotalPay(0);
      } else {
        if(this.isProjectStar) {
          // const { base_plan: [{ monthly_plan }], selectedPass: { monthly_plan: monthlyPass = this.ultraData[0].tabData.base_plan[0].monthly_plan } } = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
          const plan = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
          const monthly_plan = plan['base_plan'][0]['monthly_plan'];
          let monthlyPass;
          if(plan['selectedPass'] && plan['selectedPass']['monthly_plan'])
            monthlyPass = plan['selectedPass']['monthly_plan'];
          else
            monthlyPass = this.ultraData[0].tabData.base_plan[0].monthly_plan;
          this._deviceDataService.publishBasePlanStar({
            PlanName: this.ultraData[0].tabData.base_plan[0].name,
            PlanMonthlyPay: monthly_plan,
            data_limit: this.ultraData[0].tabData.base_plan[0].data_limit,
            speed_limit: this.ultraData[0].tabData.base_plan[0].speed_limit,
            sku: this.ultraData[0].tabData.base_plan[0].sku,
            bundle_sku: this.ultraData[0].tabData.sku,
          });
          this._deviceDataService.publishMonthlyPay(monthlyPass);
        }
        this._deviceDataService.publishTotalPay(selectedPlanDetails.TotalPay);
      }
    this._deviceDataService.publishOneTimePay(selectedPlanDetails.OneTimePayment);
  }

  InitializeDeviceDetailSummary(port) {
    const self = this;
    self.IsInitializedSummary = false;
    setTimeout(() => {
      self.IsInitializedSummary = true;
    }, 0);
    setTimeout(() => {
      this._deviceDataService.publishNumberType("SwitchToCelcom");
      this._deviceDataService.publishPhoneNo(port);
    }, 10);
  }


  FindPlanDataByIndex(index: number) {
    // let result: any = null;
    this.PlanData = this.TableComparisonResponse[index];
    // to check if it is XPAX template.
    // this.PlanData.tabdata.forEach((itemParent:any,index) => {
    this.PlanData.tabdata.Items.forEach((itemParent: any, index) => {
      itemParent.AtrHref = "#rm-" + index;
      itemParent.TableInfo.forEach((item: any, index) => {
        item.Id = index;
        item.HrefId = "rm-" + index;
      });
    });
  }
  public OnTabSelect(item, index) {
    this.SelectedTab = item.tabname;
    this.FindPlanDataByIndex(index);
  }

  SelectPlan(planName: any, planSku: any, planMothlyPay: any, selectedPlanDetails: any) {
    const plan = (this.DeviceDetailsPlanResponse || []).find(p => p.sku == planSku);
    if (plan || this.PlanPurchaseResponse) {
      this._plansService.selectPlan(plan || this.PlanPurchaseResponse);
    }
    if (typeof window !== 'undefined') {
      if (localStorage) {
        localStorage.setItem("PSku", planSku);
      }
    }
    this.IsDisplaySwitchingPlansTabPopup = false;
    this._deviceDataService.publishPhoneNo(null);
    this._deviceDataService.publishPlanChanged(true);
    // if (typeof window !== 'undefined') {
    //   if (
    //     localStorage.getItem("MNP-PRE-SELECT") &&
    //     localStorage.getItem("Eligible") &&
    //     localStorage.getItem("MNP-CUSTOMER")) {
    //     this.removeMNPStorage();
    //     this.ReInitializeChooseNumberComponent();
    //     this._deviceDataService.publishPhoneNo(null);
    //     this._deviceDataService.publishNumberType(null);
    //   }
    // }


    if ((this.mnpCheckPlanPurchase && this.mnpCheckPlanPurchase != null &&
      localStorage.getItem("Eligible")) || (this.cobpCheckPlanPurchase && this.cobpCheckPlanPurchase != null)) {
      this.removeMNPStorage();
      this.planpurchaseservice.ReInitializeChooseNumberComponent();
      this._deviceDataService.publishPhoneNo(null);
      this._deviceDataService.publishNumberType(null);
    }

    this._deviceDataService.publishErrorNotificationBoolean(false);
    this._deviceDataService.publishBarNotificationBoolean(false);
    this.PlanPurchaseDataToPass.PlanName = planName;
    this.PlanPurchaseDataToPass.PlanSku = planSku;
    this.PlanPurchaseDataToPass.telco_day = selectedPlanDetails.telco_day;
    this._deviceDataService.publishTelcoDayRebate(selectedPlanDetails.telco_day);
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("telcoDayRebate", JSON.stringify(selectedPlanDetails.telco_day));
    }
    if (!planName) {
      return;
    }
    this.DeselectAllOtherPlan(planName);
    const foundCurrentPlanActiveItem = this.activeStateList[planName];
    if (foundCurrentPlanActiveItem && foundCurrentPlanActiveItem.isActive === false) {
      // found , reverse state
      this.activeStateList[planName].isActive = !this.activeStateList[planName].isActive;
    } else {
      // first time
      this.activeStateList[planName] = ({ planName: planName, isActive: true });
    }
    // only proceed if intention to activate
    if (this.activeStateList[planName].isActive) {
      this.isActive = true;
      this.selectedPlanName = planName;
      this.selectedPlan = planSku;
      this.selectedMonthlyPay = planMothlyPay;
      this.chosenPlan = selectedPlanDetails;
      // Set the choosen plan then reinitialize addons component.
      this.reInitializeAddonsComponent();
      this._deviceDataService.publishSelectedPlanDetails(selectedPlanDetails);
      this._deviceDataService.publishPlan(planSku);
      this._deviceDataService.publishPlanName(planName);
      this._deviceDataService.publishMonthlyPay(planMothlyPay);
      this._deviceDataService.publishTotalPay(planMothlyPay);
      if (typeof window !== 'undefined') {
        if (localStorage && this.selectedPlanName !== undefined &&
          this.selectedPlan !== undefined && this.selectedMonthlyPay !== undefined && selectedPlanDetails !== undefined) {
          localStorage.setItem("SelectedPlanName", this.selectedPlanName);
          localStorage.setItem("SelectedPlan", this.selectedPlan);
          localStorage.setItem("SelectedMonthlyPay", this.selectedMonthlyPay);
          localStorage.setItem("SelectedPlanDetails", JSON.stringify(selectedPlanDetails));
        }
      }
      this._estoreAnalyticsService.SetProductId(planSku, this._renderer);
      this._estoreAnalyticsService.SetProductType("Bundle Device");
      // Need to trigger this post nginit on the plan & Number
      setTimeout(() => {
        this._deviceDataService.publishSelected(this.isActive);
      }, 0);

    }
    if (selectedPlanDetails && selectedPlanDetails.is_premium_plan && selectedPlanDetails.is_premium_plan) {
      this._deviceDataService.publishIsKardashianPlan(true);
     } else {
       this._deviceDataService.publishIsKardashianPlan(false);
     }
      if (selectedPlanDetails) {
        this.billTypeForPlan = selectedPlanDetails.bill_type ? selectedPlanDetails.bill_type : 0;
        this.billTypeForPlan = selectedPlanDetails.bill_type;
        this._deviceDataService.publishBillingType(this.billTypeForPlan);
     }
  }

  onSwitchTabs() {
    this._deviceDataService.publishDeactivateLifestyleAddons(false);
    this._deviceDataService.publishLifestylePlans(false);
    localStorage.setItem("lifestylePlans", JSON.stringify(false));
    if (localStorage && localStorage.getItem("addonCode")) {
      localStorage.removeItem("addonCode");
    }
  }

  onSwitchingPlanTabs(planName: any, planSku: any, planMothlyPay: any, selectedPlanDetails: any) {
    this.SwitchedTabPlanName = planName;
    this.SwitchedTabPlanSku = planSku;
    this.SwitchedTabPlanMonthlyPay = planMothlyPay;
    this.SwitchedTabPlanDetails = selectedPlanDetails;
    if (this.selectedPrincipleNum !== null || ((this.mnpCheckPlanPurchase && this.mnpCheckPlanPurchase != null &&
      localStorage.getItem("Eligible") === "true") || (this.cobpCheckPlanPurchase && this.cobpCheckPlanPurchase != null))) {
      this.popupType.type = "switchingplantype";
      this.IsDisplaySwitchingPlansTabPopup = true;
    } else {
      this.SelectPlan(planName, planSku, planMothlyPay, selectedPlanDetails);
      this.onSwitchTabs();
    }
  }
  onContinueSwitchingPlanTabs() {
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
      localStorage.removeItem("suppLinesAddedByTheUser");
    }
    this.SelectPlan(this.SwitchedTabPlanName, this.SwitchedTabPlanSku, this.SwitchedTabPlanMonthlyPay, this.SwitchedTabPlanDetails);
    this.onSwitchTabs();
  }
  onCancellingSwitchingTab() {
    this.IsDisplaySwitchingPlansTabPopup = false;
  }


  DeselectAllOtherPlan(planName: any) {
    const items = this.activeStateList;
    for (const key in items) { // Don't Use Let or Const here
      if (items.hasOwnProperty(key) && key !== planName) {
        this.activeStateList[key].isActive = false;
      }
    }
  }

  reInitializeAddonsComponent() {
    // Commented  Set timeout as part of angular 6 upgrade.
    // setTimeout(() => {
    //   this.isInitializeAddons = false;
    // }, 0);
    // setTimeout(() => {
      this.isInitializeAddons = true;
    // }, 1);
  }

  setAddOnTermsAccepted(addonSelection) {
    // this.addOnTermsAccepted = addonSelection.isSelected;
    this.addonCode = addonSelection.code;
    setTimeout(() => {
      this.isInitializeChooseNumber = true;
    }, 0);
  }

  removeMNPStorage() {
    localStorage.removeItem("checkToShowEditEligibilityBox");
    localStorage.setItem("Eligible", "false");
  }
  captureQueryParams() {
    this.urlParamPromotiondetails = this.getParamsService.getParameterByName('promotiondetails');
    this.urlParamLifestyleValue = this.getParamsService.getParameterByName('LS');
    this.urlParamUtmSource = this.getParamsService.getParameterByName('utm_source');

    this.ProjectStarQueryParams.Pass = this.getParamsService.getParameterByName('pass');
    this.ProjectStarQueryParams.Type = this.getParamsService.getParameterByName('type');
    this.ProjectStarQueryParams.TOP = this.getParamsService.getParameterByName('top');
    // Check if all lifestyle params set.
    if (this.urlParamPromotiondetails !== null &&
      this.urlParamLifestyleValue !== null &&
      this.urlParamUtmSource !== null
    ) {
      this.isLifestyleUrl = true;
    }
  }
  noDeviceButtonCLicked() {
    this.hideDeviceSection = true;
  }
  showAllDevices() {
    this.hideDeviceSection = false;
  }
}
