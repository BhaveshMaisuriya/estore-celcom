import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DeviceDetailsService } from "./device-details.service";
import { BaseComponent } from '../../../base.component';
import { ContentNavigation } from '../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../Service/redirection.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from '../../../Service/home.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { UserService } from '../../../Service/user.service';
import { ProductService } from '../../../Service/product.service';
import { Meta } from '@angular/platform-browser';
import { PlansService } from '../../../Service/plans.service';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';

@Component({
  selector: 'app-devicedetails-component',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css'],
  providers: [RedirectionService, ProductService],
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
      transition('in => out', animate('100ms ease-in-out')),
      transition('out => in', animate('100ms ease-in-out'))
    ]),
    trigger('stockCheck', [
      state('2', style({
        color: '#4bae50',
        transform: 'scale(1)'
      })),
      state('3', style({
        color: '#f44236',
        transform: 'scale(1)'
      })),
      state('1', style({
        color: '#ccc',
        transform: 'scale(1.1)'
      })),
      state('0', style({
        color: '#FFF',
        transform: 'scale(1)'
      })),
      transition('* <=> *', animate('100ms ease-in-out'))
    ]),
  ]
})
export class DeviceDetailsComponent extends BaseComponent implements OnInit, AfterViewInit {
  // @Input() data: any;
  public DeviceDetailsResponse: any = null;
  public DeviceDetailsResponseImages: any = null;
  public DeviceDetailsFullResponse: any = null;
  public isInitializeTermsAndConditions: any = null;
  public isInitializeDetailBannerLeft = false;
  public dataForDetailBannerTextLeft: any;
  public IsInitializeMoreDetails = 'out';
  public selectedPlan: string = null;
  public selectedColor: string = null;
  public stock: any = null;
  public selectedImages: object = null;
  private subscriber: Subscription;
  public selecteImageList: Array<any> = [];
  IsDetailsAndTermsClosed = false;
  public IsInitializeSlider = false;
  public IsDisplayMvivaPopup = false;
  public EligibilityPopupType = "";
  public isMviva = false;
  public editProduct: any = null;
  public editDeviceObj: any = null;
  public isCSAgentDealer = ""; // ! Can't be reused for dealer
  public csAgent = "cs-agent";
  public isCustomer = false;
  public notCSAgent = "not-cs-agent";
  agentType: "dealer" | "csAgent";
  public FGS = "FGS";
  public FGP = "FGP";
  public FP = "FP";
  public FPP = "FPP";
  public breadcrumbResponse: any = null;
  public keepCelcomNumObj: any = null;
  public eligiblePlanArray: string[] = [];
  public eligiblePlanOwnArray = [];
  public eligiblePlanRentArray = [];
  public InitializePlanComponent = true;
  public loading: boolean;
  public is_icon_active = false;
  public SliderImageList: any;
  public colorSelected: any;
  public DealerPopupType = "";
  public IsDisplayDealerPopup = false;
  public storageSelected: any;
  public NewTag = false;
  public DeviceDetailsRelatedProducts: any;
  public preOrderData: any;
  public isEasyPhone = false;
  stockStatus: any;
  public stockStatusMsg: any;
  public cobpCheckBundle: any;
  public DeviceBundleResponse: any;
  public selectedColorView: any;
  public selectedStorageView: any;
  public plansku: any;
  public planDevicePric: string;
  public selectedsku: any;
  public selectedUpfrontAmt: any;
  public selectedDeviceAmt: any;
  public mnpCheckPlanPurchase: any;
  public isRentClicked = true;
  public isOwnClicked = false;
  public rentPrice = 0;
  public ownPrice = 0;
  public bundlePrice = 0;
  public bundleUpfrontPrice = 0;
  public buyNoPlan = false;
  public isBundleClicked = false;
  public confirmDeviceFlow = false;
  public supplimentaryData;
  public principleNumber: any;
  public suppCount = 0;
  // public preOrderMNP:boolean = true; // preOrder MNP variable for checking the pre order tag
  public deviceOnlyPriceForBundle: any;
  public deviceOnlyPrice: any;
  public cobpEligibility: any;
  public isInitializeChooseNumber = true;
  cookie_expire_in_days = this.appConstant.COOKIE_EXPIRE;
  public editEasyPhone = false;
  public typeOfPurchaseTabSelection = null;
  ada_cookie_expire_in_days = this.appConstant.ADA_COOKIE_EXPIRE;
  // Variable to track lifestyle param values.
  urlParamPromotiondetails: any = null;
  urlParamLifestyleValue: any = null;
  urlParamPlan: any = null;
  urlParamUtmSource: any = null;
  isLifestyleUrl = false;
  promotionUrl: any = "";
  urlParamPlanSku: any = "";
  isLifestyle = false;
  lifestyleAddOnData: any = {};
  isDisplayPromotionalLifeStyle = false;
  public saleablePlanArray: any;
  isProjectStar = false;
  isMvivaCampaign = false;
  isNoUpfrontPayment = false;
  popupData = {
    title: '',
    content: '',
    button: 'OK',
  };
  showPopup = false;

  constructor(private devicedetailservice: DeviceDetailsService,
    private meta: Meta,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _deviceDataService: DeviceDataService,
    private getParamsService: GetParametersService,
    @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _homeService: HomeService,
    private cookieService: CookieService,
    private _userService: UserService,
    private _productService: ProductService,
    private _plansService: PlansService,
    private _globalErrorHandler: GlobalErrorHandler,
  ) {
    super();
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
    // TODO Move this common method to some service or Akita
    // during refactoring
    // ! Unwanted if block, should be merged with above legacy code
    if (sessionStorage) {
      this.agentType = sessionStorage.getItem("AgentInfo")
        ? "csAgent"
        : sessionStorage.getItem("DealerInfo")
          ? "dealer"
          : undefined;
    }
  }
  ngOnInit() {
    localStorage.removeItem("xp-lite-device");
    localStorage.removeItem("TypeOfPurchase");
    
    this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(status => {
      if (status === false) {
        this.showPopup = false;
      }
    });
    this.Init();
    this.setAgentLoggedIn();
    this.subscriber = this._deviceDataService.sharedLoggedInUserName$.subscribe(
      data => {
        if (data) {
          this.setAgentLoggedIn();
        }
      });
    this.subscriber = this._deviceDataService.sharedDevicePrice$.subscribe(
      data => {
        if (data) {
          this.deviceOnlyPriceForBundle = data;
        }
      });
    // this._deviceDataService.currentMessage.subscribe(message =>{
    //   this.IsDetailsAndTermsClosed = message
    // } );
    this.subscriber = this._deviceDataService.sharedTotalpay$.subscribe(data => {
      this.deviceOnlyPrice = data;
      if (this.deviceOnlyPrice && this.DeviceDetailsResponse) {
        this.DeviceDetailsResponse.price = this.deviceOnlyPrice;
      }
    });

    this.subscriber = this._deviceDataService.sharedRrpPrice$.subscribe(data => {
      if (data) {
        this.DeviceDetailsResponse.rrpPrice = data;
        this.meta.addTag({ name: 'offers:price', content: this.DeviceDetailsResponse.rrpPrice });
      }
    });
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {


      // let self= this;
      window.onscroll = () => {
        const eleId = document.getElementById('sticky-cart');
        const eleId1 = document.getElementById('section_1');
        const eleId2 = document.getElementById('step2');
        const eleId4 = document.getElementById('step4');
        const eleIdToaster = document.getElementById('b-notification');
        // alert(eleId1 +' '+eleId2);
        if (eleId != null && eleId1 != null && eleId2 != null && eleId4 != null) {
          const chooseDevice = eleId1.clientHeight;
          const choosePlan = eleId2.clientHeight;
          const stickyTop = eleId4.offsetTop;
          if (window.pageYOffset >= (stickyTop - 300)) {
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
            if (eleIdToaster != null) {
              eleIdToaster.classList.remove('has-margin');
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
            if (eleIdToaster != null) {
              eleIdToaster.classList.add('has-margin');
            }
          }
          if (window.pageYOffset < chooseDevice) {
            // console.log('This is Device section');
          }
          if (window.pageYOffset >= chooseDevice && window.pageYOffset < (chooseDevice + choosePlan)) {
            // console.log('This is Plan section');
          }
          if (window.pageYOffset >= (chooseDevice + choosePlan)) {
            // console.log('This is summary section');
          }
        }
      };
    }
    this.breadcrumbResponse = [
      { "Alias": "/store/devices", "isFirst": "Devices Catalogue" },
      { "Alias": "", "isContent": "" },
      { "Alias": "", "isLast": "Device Detail" }
    ];

    this._deviceDataService.sharedPlan$.subscribe(data => {
      // Commented setTimeout as part of angular 6 upgrade.
      setTimeout(() => {
       this.selectedPlan = data;
      }, 0);
    });
    this._deviceDataService.outOfStock$.subscribe(stockData => {
      this.stock = stockData;
      this.stockStatus = this._productService.getStockStatus(stockData);
      if (this.stockStatus.message !== "Checking stock...") {
        this.meta.addTag({ name: 'offers:availability', content: this.stockStatus.message });
      }
      if(this.stockStatus.message === "In Stock") {
        this.AddProductPriceOfferScript(this.DeviceDetailsResponse.name, this.DeviceDetailsResponse.rrpPrice,"InStock");
      } else if (this.stockStatus.message !== "Checking stock...") {
        this.AddProductPriceOfferScript(this.DeviceDetailsResponse.name, this.DeviceDetailsResponse.rrpPrice, "OutOfStock");
      }
    });
    this._deviceDataService.isEasyPhone$.subscribe(data => {
      // Commented setTimeout as part of angular 6 upgrade.
      setTimeout(() => {
        this.isEasyPhone = data;
      }, 0);
    });

    this._deviceDataService.eligiblePlanList$.subscribe(data => {
      this.eligiblePlanArray = data;
      if (!this.isEasyPhone) {
        this.InitializePlanComponent = false;
        setTimeout(() => {
          this.InitializePlanComponent = true;
        }, 0);
      }
    });

    this._deviceDataService.eligibleRentPlanArray$.subscribe(data => {
      this.eligiblePlanRentArray = data;
      if (!this.isEasyPhone) {
        this.InitializePlanComponent = false;
        setTimeout(() => {
          this.InitializePlanComponent = true;
        }, 0);
      }
    });

    this._deviceDataService.eligibleOwnPlanList$.subscribe(data => {
      this.eligiblePlanOwnArray = data;
      if (!this.isEasyPhone) {
        this.InitializePlanComponent = false;
        setTimeout(() => {
          this.InitializePlanComponent = true;
        }, 0);
      }
    });

    localStorage.removeItem('easyPhoneSelected');
    localStorage.removeItem('deviceBundleSelected');
    this.subscriber = this._deviceDataService.preOrderData$.subscribe(data => {
      this.preOrderData = data;
    });
    this.subscriber = this._deviceDataService.isRentClicked$.subscribe(data => {
      this.isRentClicked = data;
      if (this.isRentClicked) {
        this.isOwnClicked = false;
        this.isBundleClicked = false;
        this.buyNoPlan = false;
      }
    });
    this.subscriber = this._deviceDataService.isOwnClicked$.subscribe(data => {
      this.isOwnClicked = data;
      if (this.isOwnClicked) {
        this.isRentClicked = false;
        this.isBundleClicked = false;
        this.buyNoPlan = false;
      }
    });
    this.subscriber = this._deviceDataService.isBundleClicked$.subscribe(data => {
      this.isBundleClicked = data;
      if (this.isBundleClicked) {
        this.isRentClicked = false;
        this.isOwnClicked = false;
        this.buyNoPlan = false;
      }
    });
    this.subscriber = this._deviceDataService.rentPrice$.subscribe(data => {
      if (data) {
        this.rentPrice = data;
      }
    });
    this.subscriber = this._deviceDataService.ownPrice$.subscribe(data => {
      if (data) {
        this.ownPrice = data;
      }
    });
    this.subscriber = this._deviceDataService.bundlePrice$.subscribe(data => {
      if (data) {
        this.bundlePrice = data;
      }
    });
    this.subscriber = this._deviceDataService.bundleUpfrontPrice$.subscribe(data => {
      if (data) {
        this.bundleUpfrontPrice = data;
      }
    });
    this.subscriber = this._deviceDataService.buyNoPlan$.subscribe(data => {
      if (data) {
        this.buyNoPlan = data;
        if (this.buyNoPlan) {
          this.isRentClicked = false;
          this.isOwnClicked = false;
          this.isBundleClicked = false;
        }
      }
    });
    if (localStorage && !localStorage.getItem("supplementryFlow") && localStorage.getItem("suppLinesAddedByTheUser")) {
      localStorage.removeItem("suppLinesAddedByTheUser");
    }
    if (localStorage) {
      localStorage.removeItem("PrincipleNumberSelected");
      localStorage.setItem("ls_subnav", JSON.stringify({ "activeMenu": "Devices", "currentURL": "personal/devices" }));
      if (localStorage.getItem("COBP_login_Check")) {
        localStorage.removeItem("COBP_login_Check");
      }
      if (localStorage.getItem("COBP_FLOW_CHECK")) {
        localStorage.removeItem("COBP_FLOW_CHECK");
      }
    }
  }

  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
    if (window) {
      window.scrollTo(0, 0);
    }
  }

  Init() {
    // Function call to reach the url paramaters of affiliate promotions.
    this.captureQueryParams();
    if (localStorage && (localStorage.getItem('BuyNoPlan') || localStorage.getItem("SelectedPlanDetails") &&
      localStorage.getItem("SelectedMonthlyPay") && localStorage.getItem("SelectedPlan") && localStorage.getItem("SelectedPlanName"))) {
      if (localStorage.getItem('BuyNoPlan')) {
        this.buyNoPlan = JSON.parse(localStorage.getItem('BuyNoPlan'));
        if (this.buyNoPlan) {
          this.isRentClicked = false;
          this.isOwnClicked = false;
          this.isBundleClicked = false;
        }
      }
      localStorage.removeItem('BuyNoPlan');
      localStorage.removeItem("SelectedPlan");
      localStorage.removeItem("SelectedPlanDetails");
      localStorage.removeItem("SelectedMonthlyPay");
      localStorage.removeItem("SelectedPlanName");
    }
    if (typeof window !== "undefined" && localStorage && localStorage.getItem("telcoDayRebate")) {
      localStorage.removeItem("telcoDayRebate");
    }
    this.loading = true;
    if (localStorage && localStorage.getItem("CartEditProduct")) {
      this.editProduct = JSON.parse(localStorage.getItem("CartEditProduct"));
      localStorage.removeItem("CartEditProduct");
    }
    if (localStorage && this.editProduct === null) {
      localStorage.removeItem("MNP-PRE-SELECT");
      localStorage.removeItem("MNP-CUSTOMER");
      localStorage.removeItem("MNP-EDIT");
      localStorage.removeItem("MNP-FLOW");
    }
    const url = '';
    let deviceId;
    this._activatedRoute.params.subscribe(params => deviceId = params["deviceId"]);
    // promotionUrl will append promotion query params if existing.
    let apiUrl = "/rest/V1/devicedetails/" + deviceId + this.promotionUrl;
    if (window.location.href.indexOf("?promotiondetails=") > -1) {
      apiUrl = "/rest/V1/devicedetails/" + deviceId + window.location.search;
    }
    apiUrl = this._userService.updateApiUrl(apiUrl);
    this.devicedetailservice.Find(apiUrl).subscribe(
      (response) => {
        this.checkMvivaUpfront(response);
        const billType = response[0]?.items?.base_plan?.length !== 0 ? response[0]?.items?.base_plan[0]?.bill_type : 0;
        this._deviceDataService.publishMandatoryAutoBilling(billType ? billType : 0);
        localStorage.setItem("DeviceDetailResponse", JSON.stringify(response[0]));
        localStorage.setItem("AutoBillingTypeOfPurchase", JSON.stringify(response[0].auto_bill_type_of_purchase));
        if(!response[0]?.status && response[0]?.message) {
          this.popupData.content = response[0]?.message;
          this.showPopup = true;
          this.errorPage();
          return;
        }
        if (response && response[0] && response[0].status === false && sessionStorage
          && (!response[0].code || response[0].code !== "404")
          && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
          const eligibilityInfo = {
            displayType: 'INVALID_DEALER_URL',
            isEligibleByAge: false,
            type: 'xpax'
          };
          this._globalErrorHandler.errorObjectConvert(eligibilityInfo.displayType);
          this.DealerPopupType = JSON.parse(JSON.stringify(eligibilityInfo));
          this.IsDisplayDealerPopup = true;
        } else if (response && response[0] && response[0].status === false
          && response[0].code && response[0].code === 404) {
          this.errorPage();
        } else {
          this.loading = false;
          if (window) {
            window.scrollTo(0, 0);
          }
          this.DeviceDetailsFullResponse = response[0]["items"];
          this.typeOfPurchaseTabSelection = response[0]["type_purchse"];
          this.DeviceDetailsResponse = this.DeviceDetailsFullResponse["basic_details"];
          if (this.DeviceDetailsFullResponse.base_plan && this.DeviceDetailsFullResponse.base_plan.length > 0) {
            this.isProjectStar = true;
          }
          if (this.DeviceDetailsResponse && !this.DeviceDetailsResponse.is_campaign_mviva &&
            this.DeviceDetailsResponse.campaign_mviva_invalid) {
            const eligibilityInfo = {
              isEligibleByAge: false,
              displayType: 'INVALID_MVIVA_URL',
              type: 'xpax'
            };
            this._globalErrorHandler.errorObjectConvert(eligibilityInfo.displayType);
            this.EligibilityPopupType = JSON.parse(JSON.stringify(eligibilityInfo));
            this.IsDisplayMvivaPopup = true;

          } else {
            if (this.DeviceDetailsResponse.is_campaign_mviva && this.DeviceDetailsResponse.campaign_mviva) {
              this._plansService.updateMVIVA(this.DeviceDetailsResponse.campaign_mviva);
            }
            this.lifestyleEligibilityCheckBundle(this.DeviceDetailsResponse); // Function to check lifestyle eligibility.
            if (this.DeviceDetailsResponse && this.DeviceDetailsResponse.is_easy_phone && this.DeviceDetailsResponse.is_easy_phone === 1) {
              this.DeviceDetailsResponse.isEasyPhoneDevice = true;
            }
            if (this.DeviceDetailsResponse) {
              this.DeviceDetailsResponse.editProduct = this.editProduct;
            }
            if (this.DeviceDetailsFullResponse && this.DeviceDetailsFullResponse["related_products"] &&
              (this.DeviceDetailsFullResponse["related_products"].length > 0)) {
              this.DeviceDetailsRelatedProducts = this.DeviceDetailsFullResponse["related_products"];
            }
            this._estoreAnalyticsService.SetProductDetails(this.DeviceDetailsResponse, this._renderer);
            if (typeof window !== 'undefined') {
              if (localStorage) {
                localStorage.setItem("DeviceSku", this.DeviceDetailsResponse.sku);
              }
            }
            this.DeviceDetailsResponse.rm = parseFloat(this.DeviceDetailsResponse.rm);
            // this.DeviceDetailsResponse.price = parseFloat(this.DeviceDetailsResponse.rrp_rm_strick_price);
            this.SliderImageList = this.DeviceDetailsResponse;
            this.DisplayImageSlider();
            if (this.editProduct !== null) {
              this.editDeviceObj = {};
              this.editDeviceObj.quantity = this.editProduct.quantity;
              this.editDeviceObj.ispreorder = this.editProduct.isPreorder;
              this.editDeviceObj.availabilityflag = this.editProduct.availabilityFlag;
              this.editDeviceObj.sku = this.editProduct.selectedProduct.selectedProductSku;
              this.editDeviceObj.color = this.editProduct.selectedProduct.orderSummaryColor;
              this.editDeviceObj.storage = this.editProduct.selectedProduct.orderSummaryStorage;
              this.editDeviceObj.planName = this.editProduct.selectedProduct.orderPlanName;
              this.editDeviceObj.planSku = this.editProduct.selectedProduct.orderPlan;
              this.editDeviceObj.planMothlyPay = this.editProduct.selectedProduct.orderMonthlyPay;
              this.editDeviceObj.selectedPlanDetails = this.editProduct.selectedProduct.selectedPlanDetails;
              if (this.editProduct.selectedProduct['is_star']) {
                try {
                  this.editDeviceObj.planSku = this.editProduct.selectedProduct['selected_pass_details']['selected_associated_pass_details']['sku'];
                  this.editDeviceObj.planName = this.editProduct.selectedProduct['selected_pass_details']['selected_associated_pass_details']['name'];
                  this.editDeviceObj.planMothlyPay = this.editProduct.selectedProduct['selected_pass_details']['selected_associated_pass_details']['monthly_plan'];
                  this.editDeviceObj.selectedPlanDetails = this.editProduct.selectedProduct['selected_pass_details']['selected_associated_pass_details'];
                } catch (error) {
                }
              }
              this.editDeviceObj.phoneNum = this.editProduct.selectedProduct.orderPhoneNo;
              this.editDeviceObj.ismviva = this.DeviceDetailsResponse.is_campaign_mviva ? this.DeviceDetailsResponse.is_campaign_mviva : false;
              this.isMviva = this.editDeviceObj.ismviva;
              if (this.isMviva && this.DeviceDetailsResponse.campaign_mviva) {
                this.editDeviceObj.mvivaSummaryMessage = this.DeviceDetailsResponse.campaign_mviva.summary_message;
                this.editDeviceObj.mvivaBannerDesktop = this.DeviceDetailsResponse.campaign_mviva.desktop_content;
                this.editDeviceObj.mvivaBannerMobile = this.DeviceDetailsResponse.campaign_mviva.mobile_content;
                // this.editDeviceObj.mvivaHat = this.DeviceDetailsResponse.campaign_mviva.hat;
                // this.editDeviceObj.mvivaTitle = this.DeviceDetailsResponse.campaign_mviva.title;
                // this.editDeviceObj.mvivaDescription = this.DeviceDetailsResponse.campaign_mviva.description;
                this.editDeviceObj.mvivaBundleUpfront = this.DeviceDetailsResponse.campaign_mviva.no_upfront_payment;
              }
              this.editDeviceObj.iseasyphone = this.DeviceDetailsResponse.is_easy_phone;
              if (this.editDeviceObj.iseasyphone && this.editDeviceObj.iseasyphone === 1 && this.editProduct.is_easyphone) {
                this.EditCartEasyPhone();
              } else if (this.editDeviceObj.iseasyphone && this.editDeviceObj.iseasyphone === 1) {
                this.isEasyPhone = false;
                this.UpdatingPlanDetails();
              }
              this._deviceDataService.publishEasyPhone(this.isEasyPhone);
              localStorage.setItem("isEasyPhone", JSON.stringify(this.isEasyPhone));
              this.editDeviceObj.orderNumberType = this.editProduct.selectedProduct.orderNumberType;
              this.DeviceDetailsFullResponse.associated_product.forEach(eachElement => {
                if (eachElement.color === this.editDeviceObj.color && eachElement.memory === this.editDeviceObj.storage) {
                  this.DeviceDetailsResponse.price = eachElement.rrp;
                }
              });
            } else if (typeof window !== 'undefined' && localStorage &&
              localStorage.getItem('keepCelcomNum') && localStorage.getItem("MyMsIsdn")) {
              this.keepCelcomNumObj = JSON.parse(localStorage.getItem('keepCelcomNum'));
              this.keepCelcomNumObj.phoneNum = localStorage.getItem("MyMsIsdn");
              if (localStorage && localStorage.getItem("isEasyPhone")) {
                this.isEasyPhone = JSON.parse(localStorage.getItem("isEasyPhone"));
                this._deviceDataService.publishEasyPhone(this.isEasyPhone);
                localStorage.removeItem('keepCelcomNum');
                if (this.isEasyPhone) {
                  localStorage.setItem("keepCelcomNumEasyPhone", "true");
                  localStorage.setItem('EasyPhoneCOBP', 'true');
                }
              }
              if (localStorage && localStorage.getItem("isRentClicked")) {
                this.isRentClicked = JSON.parse(localStorage.getItem("isRentClicked"));
              }
              if (localStorage && localStorage.getItem("isOwnClicked")) {
                this.isOwnClicked = JSON.parse(localStorage.getItem("isOwnClicked"));
              }
              if (localStorage && localStorage.getItem("isBundleClicked")) {
                this.isBundleClicked = JSON.parse(localStorage.getItem("isBundleClicked"));
              }
              if (localStorage && localStorage.getItem("isMviva")) {
                this.editDeviceObj = {};
                this.editDeviceObj.ismviva = JSON.parse(localStorage.getItem("isMviva"));
                this.isMviva = this.editDeviceObj.ismviva;
                this.editDeviceObj.ispreorder = this.DeviceDetailsResponse.preorder;
                this.editDeviceObj.availabilityflag = this.DeviceDetailsResponse.preorder_availability_flag;
                this.editDeviceObj.iseasyphone = this.DeviceDetailsResponse.is_easy_phone;
                if (this.isMviva && this.DeviceDetailsResponse.campaign_mviva) {
                  this.editDeviceObj.mvivaSummaryMessage = this.DeviceDetailsResponse.campaign_mviva.summary_message;
                  this.editDeviceObj.mvivaBannerDesktop = this.DeviceDetailsResponse.campaign_mviva.desktop_content;
                  this.editDeviceObj.mvivaBannerMobile = this.DeviceDetailsResponse.campaign_mviva.mobile_content;
                  // this.editDeviceObj.mvivaHat = this.DeviceDetailsResponse.campaign_mviva.hat;
                  // this.editDeviceObj.mvivaTitle = this.DeviceDetailsResponse.campaign_mviva.title;
                  // this.editDeviceObj.mvivaDescription = this.DeviceDetailsResponse.campaign_mviva.description;
                  this.editDeviceObj.mvivaBundleUpfront = this.DeviceDetailsResponse.campaign_mviva.no_upfront_payment;
                }
              }
            } else if (typeof window !== 'undefined' && localStorage.getItem("selectionAfterLogin")) {
              this.keepCelcomNumObj = JSON.parse(localStorage.getItem('selectionAfterLogin'));
              localStorage.removeItem('selectionAfterLogin');
            } else {
              this.editDeviceObj = {};
              this.editDeviceObj.color = this.DeviceDetailsResponse.default_selected_color;
              this.editDeviceObj.storage = this.DeviceDetailsResponse.default_selected_memory;
              this.editDeviceObj.planName = this.DeviceDetailsResponse.default_plan;
              this.editDeviceObj.planSku = (this.isLifestyle === true) ? this.urlParamPlanSku : this.DeviceDetailsResponse.default_plan_sku;
              this.editDeviceObj.planMothlyPay = this.DeviceDetailsResponse.order_monthly_pay;
              this.editDeviceObj.ispreorder = this.DeviceDetailsResponse.preorder;
              this.editDeviceObj.iseasyphone = this.DeviceDetailsResponse.is_easy_phone;
              this.editDeviceObj.ismviva = this.DeviceDetailsResponse.is_campaign_mviva ? this.DeviceDetailsResponse.is_campaign_mviva : false;
              this.isMviva = this.editDeviceObj.ismviva;
              if (this.isMviva && this.DeviceDetailsResponse.campaign_mviva) {
                this.editDeviceObj.mvivaSummaryMessage = this.DeviceDetailsResponse.campaign_mviva.summary_message;
                this.editDeviceObj.mvivaBannerDesktop = this.DeviceDetailsResponse.campaign_mviva.desktop_content;
                this.editDeviceObj.mvivaBannerMobile = this.DeviceDetailsResponse.campaign_mviva.mobile_content;
                // this.editDeviceObj.mvivaHat = this.DeviceDetailsResponse.campaign_mviva.hat;
                // this.editDeviceObj.mvivaTitle = this.DeviceDetailsResponse.campaign_mviva.title;
                // this.editDeviceObj.mvivaDescription = this.DeviceDetailsResponse.campaign_mviva.description;
                this.editDeviceObj.mvivaBundleUpfront = this.DeviceDetailsResponse.campaign_mviva.no_upfront_payment;
              }
              this.editDeviceObj.availabilityflag = this.DeviceDetailsResponse.preorder_availability_flag;
              if (this.DeviceDetailsFullResponse && this.DeviceDetailsFullResponse.choose_plan &&
                this.DeviceDetailsFullResponse.choose_plan != null) {
                this.DeviceDetailsFullResponse.choose_plan.forEach(item => {
                  if (item.tabData && item.tabData != null) {
                    item.tabData.forEach(innerItem => {
                      if (innerItem.sku === this.editDeviceObj.planSku) {
                        this.editDeviceObj.selectedPlanDetails = innerItem;
                        this.editDeviceObj.planName = innerItem.name;
                      }
                    });
                  }
                });
              }
              this.DeviceDetailsFullResponse.associated_product.forEach(elements => {
                if (elements.color === this.editDeviceObj.color && elements.memory === this.editDeviceObj.storage) {
                  this.DeviceDetailsResponse.price = elements.rrp;
                }
              });
            }
            if (this.editDeviceObj && this.editDeviceObj.iseasyphone === 1) {
              this._deviceDataService.publishDeviceEasyPhoneEligible(true);
            }

            this._plansService.selectDeviceBundle(response[0].items.basic_details);
            this.reSelectDevice();
            let utm_source = this.getParamsService.getParameterByName('utm_source');
            if (utm_source === null && this.cookieService.check('adaRemainingDays')) {
              const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
              utm_source = adaRemainingDays.name;
            }
            if (utm_source === 'InvolveAsia') {
              this.createCookieForAffiliateMarketing(utm_source);
            }
            if (utm_source !== null && utm_source.indexOf('ADA') > -1 && sessionStorage && this.isLifestyle === true) {
              this.createCookieForAffiliateMarketing(utm_source);
              sessionStorage.setItem('is_affiliate_ada', 'Yes');
            }
          }
        }
      },
      err => {
        this.errorPage();
      });
  }

  /**
 * This Function creates Cookies for "Affiliate Marketing Program".
 * Cookie Expire days is 30 Days.
 */
  public createCookieForAffiliateMarketing(source) {
    if (source === 'InvolveAsia') {
      const orderItem = {
        categoryName: 'Device',
        quantity: '1',
        isSubmitted: false
      };
      // Delete ADA Pixel cookie.
      this.cookieService.delete('adaStartDate', '/');
      this.cookieService.delete('adaRemainingDays', '/');
      // Add IA Pixel cookie.
      this.cookieService.set('iaStartDate', new Date() + '', this.cookie_expire_in_days, '/');
      this.cookieService.set('orderItem', JSON.stringify(orderItem), this.cookie_expire_in_days, '/');
    }
    if (source.indexOf('ADA') > -1) {
      const adatype = {
        name: source
      };
      if (this.getParamsService.getParameterByName('utm_source') !== null) {
        // Delete IA Pixel cookie.
        this.cookieService.delete('iaStartDate', '/');
        this.cookieService.delete('orderItem', '/');
        // Add ADA Pixel cookie.
        this.cookieService.set('adaStartDate', new Date() + '', this.ada_cookie_expire_in_days, '/');
        this.cookieService.set('adaRemainingDays', JSON.stringify(adatype), this.ada_cookie_expire_in_days, '/');
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
  public AddProductPriceOfferScript(productName: string,priceVal: string,stockStat: string) {
    const productHeadFunctionScript = `
    {
      "@context": "http://schema.org",
      "@type": "Product",
      "name": "` + productName + `",
      "offers": {
        "@type": "Offer",
        "availability": "http://schema.org/` + stockStat + `",
        "price": "` + priceVal + `",
        "priceCurrency": "MYR"
      }
     }`;
    const productScriptObj = [];
    productScriptObj.push({
      type: 'header_script_product_offer_block',
      value: productHeadFunctionScript
    });
    this._homeService.ManageConfigurableScripts(productScriptObj);
  }
  public MoreDetailsClick() {
    const that = this;
    if (typeof navigator !== 'undefined' && that.IsInitializeMoreDetails === 'out') {
      const anchorMoreDetails = document.getElementById("moreDetailsD");
      if (anchorMoreDetails != null) {
        const topPosition = anchorMoreDetails.offsetTop + anchorMoreDetails.offsetHeight;
        // For chrome, IE and Firefox use scrollTo().
        window.scrollTo(0, topPosition);
      }
    }
    this.is_icon_active = !this.is_icon_active;
    setTimeout(function () {
      that.IsInitializeMoreDetails = that.IsInitializeMoreDetails === 'out' ? 'in' : 'out';
    }, 0);
  }

  public OnContinueEligibilityCheck(data: any) {
    this.IsDisplayMvivaPopup = false;
    window.location.href = window.location.origin + window.location.pathname;
  }

  public OnContinueDealerCheck(data: any) {
    this.IsDisplayDealerPopup = false;
    if (sessionStorage && sessionStorage.getItem("DealerInfo")) {
      window.location.href = "/store/devices";
    } else if (sessionStorage && sessionStorage.getItem("AgentInfo")) {
      window.location.href = "/store/agentlandingpage";
    }
  }

  public supplimentaryDataToTransfer(data) {
    this.supplimentaryData = data;
  }
  public saleablePlanArrayToTransfer(data) {
    this.saleablePlanArray = data;
  }

  public TermsAndConditionClick(data: any) {
    const that = this;
    setTimeout(function () {
      that.isInitializeTermsAndConditions = false;
    }, 0);
    setTimeout(function () {
      that.isInitializeTermsAndConditions = true;
    }, 0);
  }

  public DisplayImageSlider() {
    const that = this;
    // // Commented setTimeout as part of angular 6 upgrade.
    setTimeout(function () {
      that.IsInitializeSlider = false;
    }, 0);
    setTimeout(function () {
      that.IsInitializeSlider = true;
    }, 0);
  }

  public OnCloseTermsAndConditionsPopup() {
    this.isInitializeTermsAndConditions = false;
  }

  public onCOBPEligibilityCheckBundle(data) {
    this.cobpEligibility = data;
  }

  public DeviceOnlyFlow(data) {
    this.confirmDeviceFlow = data;
  }

  public onCobpEligibilityData(data) {
    if (!this.isEasyPhone) {
      setTimeout(() => {
        this.isInitializeChooseNumber = false;
      }, 0);
      setTimeout(() => {
        this.isInitializeChooseNumber = true;
        this.keepCelcomNumObj = null;
      }, 0);
    } else {
      this._deviceDataService.publishPhoneNo(null);
      this._deviceDataService.publishNumberType(null);
      this._deviceDataService.publishEasyPhoneTabsClicked(null);
      this._deviceDataService.publishDeviceUpfront(null);
      this._deviceDataService.publishPlanUpfront(null);
    }
  }

  // public OnCloseMoreDetails() {
  //   this.IsInitializeMoreDetails = false;
  // }

  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  public OnSelectedColor(selectedColor: string) {
    this.SliderImageList.length = 0;
    this.colorSelected = selectedColor;
    this.SliderImageList = this.BindImageSlider(selectedColor);
    this.DisplayImageSlider();
    this.NewTagDisplay();
    this.reSelectDevice();
  }

  reSelectDevice() {
    let selectedDevice = null;
    try {
      selectedDevice = this.DeviceDetailsFullResponse.associated_product.find(d => d.color == this.colorSelected && d.memory == this.storageSelected);
    } catch (_error) {

    }
    this._plansService.selectDevice(selectedDevice);
  }

  public OnSelectedStorage(selectedStorage: string) {
    this.storageSelected = selectedStorage;
    this.NewTagDisplay();
    this.reSelectDevice();
  }

  public NewTagDisplay() {
    const color = this.colorSelected;
    const storage = this.storageSelected;
    if (color !== undefined && storage !== undefined) {
      this.DeviceDetailsFullResponse.associated_product.forEach(element => {
        if (element.color === color && element.memory === storage) {
          if (element.is_new === true) {
            this.NewTag = true;
          } else {
            this.NewTag = false;
          }
        }
      });
    }
  }

  public BindImageSlider(selectedColor) {
    return this.DeviceDetailsFullResponse.associated_product.filter((item: any) => {
      return (item.color === selectedColor);
    });
  }

  public defaultOnClick() {
    return false;
  }
  public OnMnpEligibilityPlanPurchase(data) {
    // let selectedPlanDetails;
    // if (localStorage && localStorage.getItem("SelectedPlanDetails")) {
    //   selectedPlanDetails = localStorage.getItem("SelectedPlanDetails");
    // }
    if (data.isEligible) {
      // this.DeviceDetailsResponse.OneTimePayment = '0.10';
      this.DeviceDetailsResponse.IsMnp = true;
      this.DeviceDetailsResponse.PrincipalLine = data.principleMobileNumber;
      this.DeviceDetailsResponse.portNumber = data.portNumber;
      this._deviceDataService.publishNumberType("SwitchToCelcom");
      this._deviceDataService.publishPhoneNo(this.DeviceDetailsResponse.portNumber);
      // this._deviceDataService.publishTotalPay(this.deviceOnlyPriceForMNP);
      // this._deviceDataService.publishOneTimePay( this.DeviceDetailsResponse.OneTimePayment);
    } else {
      this.DeviceDetailsResponse.IsMnp = false;
      this.DeviceDetailsResponse.PrincipalLine = "";
      this.DeviceDetailsResponse.portNumber = "";
      this._deviceDataService.publishNumberType("SwitchToCelcom");
      this._deviceDataService.publishPhoneNo(this.DeviceDetailsResponse.portNumber);
    }
    this.mnpCheckPlanPurchase = data;
  }
  public onReInitializeChooseNumberComponent() {
    if (!this.isEasyPhone) {
      setTimeout(() => {
        this.isInitializeChooseNumber = false;
      }, 0);
      setTimeout(() => {
        this.isInitializeChooseNumber = true;
      }, 0);
    } else {
      this._deviceDataService.publishPhoneNo(null);
      this._deviceDataService.publishNumberType(null);
      this._deviceDataService.publishEasyPhoneTabsClicked(null);
      this._deviceDataService.publishDeviceUpfront(null);
      this._deviceDataService.publishPlanUpfront(null);
      this._deviceDataService.publishdeviceUpfrontPenalty(0);
    }
  }

  public publishPrincipleLineClicked(data) {
    this.principleNumber = data;
  }

  EditCartEasyPhone() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("EditEasyPhone", "true");
      localStorage.setItem("EasyPhoneEditCart", "true");
    }
    this.isEasyPhone = true;
    this.editDeviceObj.easyPhoneLabel = this.editProduct.easyPhoneLabel;
    if (this.editDeviceObj.easyPhoneLabel.indexOf('Rent') > -1) {
      this.isRentClicked = true;
      this.isOwnClicked = false;
      this.isBundleClicked = false;
    } else if (this.editDeviceObj.easyPhoneLabel.indexOf('Own') > -1) {
      this.isRentClicked = false;
      this.isOwnClicked = true;
      this.isBundleClicked = false;
    } else {
      this.isRentClicked = false;
      this.isBundleClicked = true;
      this.isOwnClicked = false;
    }
    this._deviceDataService.publishRentClicked(this.isRentClicked);
    this._deviceDataService.publishOwnClicked(this.isOwnClicked);
    this._deviceDataService.publishBundleClicked(this.isBundleClicked);
    localStorage.setItem("isRentClicked", JSON.stringify(this.isRentClicked));
    localStorage.setItem("isBundleClicked", JSON.stringify(this.isBundleClicked));
    localStorage.setItem("isOwnClicked", JSON.stringify(this.isOwnClicked));
    this.UpdatingPlanDetails();
  }
  UpdatingPlanDetails() {
    this.editDeviceObj.easyPhoneLabel = this.editProduct.easyPhoneLabel;
    if (this.editDeviceObj.easyPhoneLabel.indexOf('Rent') > -1) {
      this.isEasyPhone = true;
      this.isRentClicked = true;
      this.isOwnClicked = false;
      this.isBundleClicked = false;
    } else if (this.editDeviceObj.easyPhoneLabel.indexOf('Own') > -1) {
      this.isEasyPhone = true;
      this.isRentClicked = false;
      this.isOwnClicked = true;
      this.isBundleClicked = false;
    } else {
      this.isEasyPhone = false;
      this.isRentClicked = false;
      this.isOwnClicked = false;
      this.isBundleClicked = true;
    }
    this._deviceDataService.publishRentClicked(this.isRentClicked);
    localStorage.setItem("isRentClicked", JSON.stringify(this.isRentClicked));
    this._deviceDataService.publishOwnClicked(this.isOwnClicked);
    localStorage.setItem("isOwnClicked", JSON.stringify(this.isOwnClicked));
    this._deviceDataService.publishBundleClicked(this.isBundleClicked);
    localStorage.setItem("isBundleClicked", JSON.stringify(this.isBundleClicked));
    if (this.DeviceDetailsFullResponse && this.DeviceDetailsFullResponse.associated_product) {
      for (let i = 0; i < this.DeviceDetailsFullResponse.associated_product.length; i++) {
        if (this.DeviceDetailsFullResponse.associated_product[i].color === this.editDeviceObj.color &&
          this.DeviceDetailsFullResponse.associated_product[i].memory === this.editDeviceObj.storage) {
          if (this.DeviceDetailsFullResponse.associated_product[i].easy_phone &&
            this.DeviceDetailsFullResponse.associated_product[i].easy_phone.rent) {
            this._deviceDataService.publishEasyPhoneRentData(this.DeviceDetailsFullResponse.associated_product[i].easy_phone.rent);
            localStorage.setItem("easyPhoneRentData",
              JSON.stringify(this.DeviceDetailsFullResponse.associated_product[i].easy_phone.rent));
          }
          if (this.DeviceDetailsFullResponse.associated_product[i].easy_phone &&
            this.DeviceDetailsFullResponse.associated_product[i].easy_phone.own) {
            this._deviceDataService.publishEasyPhoneOwnData(this.DeviceDetailsFullResponse.associated_product[i].easy_phone.own);
            localStorage.setItem("easyPhoneOwnData",
              JSON.stringify(this.DeviceDetailsFullResponse.associated_product[i].easy_phone.own));
          }

          const bundlePrices = [];
          const bundleUpfront = [];
          if (this.DeviceDetailsFullResponse.associated_product[i].saleable_plans &&
            this.DeviceDetailsFullResponse.associated_product[i].saleable_plans.length > 0) {
            for (let j = 0; j < this.DeviceDetailsFullResponse.associated_product[i].saleable_plans.length; j++) {
              if (this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].sku === this.FGP &&
                this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].device_price) {
                bundlePrices.push({
                  key: this.FGP,
                  value: this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].device_price
                });
              }
              if (this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].sku === this.FGS &&
                this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].device_price) {
                bundlePrices.push({
                  key: this.FGS,
                  value: this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].device_price
                });
              }
              if (this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].sku === this.FP &&
                this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].device_price) {
                bundlePrices.push({
                  key: this.FP,
                  value: this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].device_price
                });
              }
              if (this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].sku === this.FPP &&
                this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].device_price) {
                bundlePrices.push({
                  key: this.FPP,
                  value: this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].device_price
                });
              }
              if (this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].sku === this.FPP &&
                this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].upfront_price) {
                bundleUpfront.push({
                  key: this.FPP,
                  value: this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].upfront_price
                });
              }
              if (this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].sku === this.FP &&
                this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].upfront_price) {
                bundleUpfront.push({
                  key: this.FP,
                  value: this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].upfront_price
                });
              }
              if (this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].sku === this.FGP &&
                this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].upfront_price) {
                bundleUpfront.push({
                  key: this.FGP,
                  value: this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].upfront_price
                });
              }
              if (this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].sku === this.FGS &&
                this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].upfront_price) {
                bundleUpfront.push({
                  key: this.FGS,
                  value: this.DeviceDetailsFullResponse.associated_product[i].saleable_plans[j].prices[this.suppCount].upfront_price
                });
              }
            }
          }
          this._deviceDataService.publishEasyPhoneBundleData(bundlePrices);
          localStorage.setItem("easyPhoneBundleData", JSON.stringify(bundlePrices));

          this._deviceDataService.publishEasyPhoneUpfrontData(bundleUpfront);
          localStorage.setItem("easyPhoneUpfrontData", JSON.stringify(bundleUpfront));
        }
      }
    }
  }
  onContinueDisplay(event) {
    this.isDisplayPromotionalLifeStyle = false;
    this._router.navigateByUrl('/store/devices');
  }
  lifestyleEligibilityCheckBundle(deviceBasicDetails) {
    // to do get lifestyle eligible details.
    this.lifestyleAddOnData = deviceBasicDetails;
    if (this.lifestyleAddOnData && this.lifestyleAddOnData.addons && this.lifestyleAddOnData.addons.status !== undefined) {
      this.isLifestyle = this.lifestyleAddOnData.addons.status;
    }
    // Show popup when no lifestyle device and user comes with promotion details.
    this.isDisplayPromotionalLifeStyle = !this.isLifestyle && this.isLifestyleUrl;
  }
  captureQueryParams() {
    this.urlParamPromotiondetails = this.getParamsService.getParameterByName('promotiondetails');
    this.urlParamLifestyleValue = this.getParamsService.getParameterByName('LS');
    this.urlParamPlan = this.getParamsService.getParameterByName('plan');
    this.urlParamUtmSource = this.getParamsService.getParameterByName('utm_source');
    // for edit cart flow.
    if (typeof window !== "undefined" && localStorage && localStorage.getItem("CartEditProduct")) {
      this.editProduct = JSON.parse(localStorage.getItem("CartEditProduct"));
      if (this.cookieService.check('adaRemainingDays') && this.editProduct.utm_source === undefined) {
        const affiliateData = JSON.parse(this.cookieService.get('adaRemainingDays'));
        this.editProduct.utm_source = affiliateData.name;
      }
      if (this.editProduct && this.editProduct.utm_source) {
        this.urlParamPromotiondetails = (this.editProduct.utm_source.indexOf('ADA') > -1) ? "ADA" : "";
      }
      this.urlParamLifestyleValue = this.editProduct.add_on_code;
      this.urlParamPlan = this.getPlanUrlBySku(this.editProduct.selectedProduct.orderPlan);
      this.urlParamUtmSource = this.editProduct.utm_source;
      localStorage.removeItem("CartEditProduct");
    }
    // End of edit cart variables setting.
    // Check if all lifestyle params set.
    if (this.urlParamPromotiondetails !== null &&
      this.urlParamLifestyleValue !== null &&
      this.urlParamPlan !== null &&
      this.urlParamUtmSource !== null
    ) {
      this.isLifestyleUrl = true;
      this.promotionUrl = "?promotiondetails=" + this.urlParamPromotiondetails + "&LS=" + this.urlParamLifestyleValue;
      this.promotionUrl += "&plan=" + this.urlParamPlan + "&utm_source=" + this.urlParamUtmSource;
    }
    switch (this.urlParamPlan) {
      case "first-gold":
        this.urlParamPlanSku = "FG";
        break;
      case "first-gold-plus":
        this.urlParamPlanSku = "FGP";
        break;
      case "first-gold-supreme":
        this.urlParamPlanSku = "FGS";
        break;
      case "first-platinum":
        this.urlParamPlanSku = "FP";
        break;
      case "first-platinum-plus":
        this.urlParamPlanSku = "FPP";
        break;
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
  errorPage() {
    this.loading = false;
    this.isInitializeDetailBannerLeft = true;
    this.dataForDetailBannerTextLeft = { "Name": "Device not found", "Api": this.API_URL_CONST.PAGE_NOT_FOUND_URL };
    this._deviceDataService.publishPageNotFound(true);
  }

  checkMvivaUpfront(response) {
    const basic_details = response[0]?.items?.basic_details;
    if (basic_details?.is_campaign_mviva === true) {
        this.isMvivaCampaign = true;
    }
    if (basic_details?.campaign_mviva?.no_upfront_payment === true) {
          this.isNoUpfrontPayment = true;
      }
    if (this.isMvivaCampaign && this.isNoUpfrontPayment) {
      if(typeof window !== "undefined" && localStorage) {
        localStorage.setItem("isNoUpfrontPayment",'true');
      }
      response[0].items.associated_product.forEach(product => {
        product.saleable_plans.forEach(plan => {
          plan.prices.forEach(supplementaryPrice => {
            supplementaryPrice['upfront_price'] = '0';
          });
        });
      });
    }
  }
}

