import { Component, OnInit, ViewContainerRef, Input, Output, Renderer2, EventEmitter, AfterViewInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Observable ,  Subscription ,  combineLatest } from 'rxjs';
import { map } from "rxjs/operators";
import { DeviceDetailsPlanService } from "./device-details-plans-section.service";
import { AppWidgetComponent } from '../../../../Model/app.widget.component';
import { BaseComponent } from '../../../../base.component';
import { ContentNavigation } from '../../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../../Service/redirection.service';
import { DeviceDataService, iBasePlan } from '../../../../Service/devicedata.service';
import { element } from 'protractor';
import { EStoreAnalysticsService } from '../../../../Service/store.analytic.service';
import { DecimalPipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PlanTableComparisionService } from '../../plan-table-comparison/plan-table-comparison.service';
import { DomSanitizer } from "@angular/platform-browser";
import { ProjectStarQueryParams } from '../../../../Model/projectStar.model';
import { PlansService } from '../../../../Service/plans.service';
import { UserService } from '../../../../Service/user.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { isNullOrUndefined } from '../../../../shared/utilities/helper.ultility';
import { STAR_SPEED_PASS_SKU, STAR_GB_PASS_SKU } from '../../../../shared/models/plan.model';

@Component({
  selector: 'app-devicedetails-plans-section-component',
  templateUrl: './device-details-plans-section.component.html',
  styleUrls: ['./device-details-plans-section.component.css'],
  providers: [DeviceDetailsPlanService, RedirectionService, PlanTableComparisionService],
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
  ]
})
export class DeviceDetailsPlanComponent extends BaseComponent implements AppWidgetComponent, OnInit,AfterViewInit, AfterContentInit {
  @Input() data: any;
  @Input() isPromotion: any;
  @Input() addOnData: any;
  @Input() promotionPlan: any;
  @Input() selectedProd: any;
  @Input() SelectionAferLogin: any;
  @Input() eligiblePlanArray: string[];
  @Input() eligiblePlanRentArray: string[];
  @Input() eligiblePlanOwnArray: string[];
  @Input() cobpEligibility: any;
  @Output() cobpEligibilityData = new EventEmitter();
  @Output() ReInitializeChooseNumberComponent = new EventEmitter();
  @Output() DeviceOnlyFlow = new EventEmitter();
  @Output() supplimentaryDataToTransfer = new EventEmitter();
  @Output() publishPrincipleLineClicked = new EventEmitter();
  @Output() saleablePlanArrayToTransfer = new EventEmitter();
  private subscriber: Subscription;
  public isDealer = false;
  public DeviceDetailsPlanResponse = [];
  public DeviceDetailsXpaxPlanResponse = [];
  public DeviceDetailsSimplePlanResponse = [];
  public DeviceDetailsBundleResponse = [];
  public DeviceDetailsRentResponse = [];
  public DeviceDetailsOwnResponse = [];
  public isInitializeTermsAndConditions: any = null;
  public selectedPlan: any = null;
  public selectedPlanName: any = null;
  public selectedColor: any = null;
  public selectedStorage: any = null;
  public selectedDevice: any = null;
  public selectedMonthlyPay: any = null;
  public classActive = false;
  public activeStateList = {}; // eg.  {planName1: {planName:'planName1', isActive:true/false} }
  public isActive: boolean;
  public buyNoPlan = false;
  public showMoreDetails = 'out';
  public is_icon_active = false;
  public SelectedPlanDetails: any;
  public index: any;
  public SelectedTab = "";
  public PlanData: any;
  public TableComparisonResponse = null;
  public DataForPlans: any;
  public updatedGivenPrice: any;
  public isInitializeChooseNumber: boolean;
  public infoPreorderMNPflow: any;
  public isEasyPhone = false;
  public isRentClicked = false;
  public isOwnClicked = false;
  public isBundleClicked = false;
  public isNeptune = true;
  public DevicePagePurachaseTypeCLicked: string;
  public tabSelected = false;
  public confirmDeviceOnlyFlow = false;
  public principleLineOnly = false;
  public orderNumberType;
  supplimentarylines = [];
  public activeSuppLines = {};
  public activePlanLines = {};
  public disablePlan = false;
  public hideXpax = false;
  public supplimentaryData;
  public chosenSuplimentaryLines;
  public suppCount = 0;
  public noOfLinesAllowed;
  public noOflinesAdded = null;
  public IsDispalySwitchingPurchaseTypeTabPopup = false;
  public suppLinesDetails;
  public principalLine: any;
  public linesAdded: any;
  public isLogin = false;
  public cobpLoading = false;
  public isMviva = false;
  public planSku;
  public selectLineAfterLogin = false;
  public rentLowestPricePlan;
  public ownLowestPricePlan;
  disableNewLineCobpSTen;
  popupType: any = { type: "switchingpurchasetype" };
  public isKardashianPlanSelected = false;
  public IsGoldenNumberSelected = false;
  public isXpaxSelected = false;
  public totalSubsidyAmount: any;
  public devicePrice;
  public devicePriceWithSubsidy;
  public subsidyAmount = "0.00";
  public saleablePlanArray;
  public billTypeForDevice = 0;
  public isProjectStar = false;
  public basePlans: Array<iBasePlan>;
  public selectedBasePlan: iBasePlan;
  public dataAnalyticsRegion;
  public totalDataLimit;
  public selectedPassOfferTitle;
  public TypeQueryParams: ProjectStarQueryParams = new ProjectStarQueryParams();
  public totalPlanMonthly;
  public IsOnloadCall = true;
  public maxLineArray = [];
  public UpFrontPriceStar: number;
  isEasyPhone$: Observable<boolean>;
  isEasyPhoneRent$: Observable<boolean>;
  isEasyPhoneOwn$: Observable<boolean>;
  easyphoneContractPeriods$: Observable<string[]>;
  easyphoneSelectedContractPeriods$: Observable<string>;
  easyphoneAvailableContractPeriods$: Observable<object>;
  basePlan$: Observable<iBasePlan>;
  devicePrices$: Observable<object>;
  easyPhoneDevicePrice = 0;
  devicePrice$: Observable<number>;
  selectedPlanIdentifier = STAR_GB_PASS_SKU;
  plansInfo = {
    speed_pass_sku: STAR_SPEED_PASS_SKU,
    gb_pass_sku: STAR_GB_PASS_SKU
  }

  constructor(private devicedetailsplanService: DeviceDetailsPlanService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    public _deviceDataService: DeviceDataService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _service: PlanTableComparisionService,
    private _renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private _plansService: PlansService,
    private _userService: UserService,
    private _planQuery: PlansQuery
  ) {
    super();
  }

  isEnterprise = () => this._userService.isUserEnterprise();

  accordianOpen(i) {
    if (typeof document !== 'undefined') {
      const listLength = document.getElementsByClassName('plan-comparison__list__item__header');
      for (let index = 0; index < listLength.length; index++) {
        if (index === i) {
          listLength[index].classList.toggle('is-active');
        } else if (listLength[index].classList.contains('is-active')) {
          listLength[index].classList.toggle('is-active');
        }
      }
      for (let index = 0; index < this.DeviceDetailsPlanResponse.length; index++) {
        if (i === index) {
          document.getElementById("rm-" + i).classList.toggle('is-active');
        } else if (document.getElementById("rm-" + index).classList.contains('is-active')) {
          document.getElementById("rm-" + index).classList.toggle('is-active');
        }
        if (i === -1) {
          for (let j = 0; j < listLength.length; j++) {
            if (listLength[j].classList.contains('is-active')) {
              listLength[j].classList.toggle('is-active');
            }
          }
          for (let j = 0; j < this.DeviceDetailsPlanResponse.length; j++) {

            if (document.getElementById("rm-" + j).classList.contains('is-active')) {
              document.getElementById("rm-" + j).classList.toggle('is-active');
            }
          }
        }
      }
    }

    // this.classActive = !this.classActive;
  }

  ngAfterContentInit(): void {
    this.isEasyPhone$ = this._planQuery.isEasyPhone$;
    this.isEasyPhoneOwn$ = this._planQuery.isEasyPhoneOwn$;
    this.isEasyPhoneRent$ = this._planQuery.isEasyPhoneRent$;
    this.easyphoneContractPeriods$ = this._planQuery.select(state => state.easyphone_contract_periods);
    this.easyphoneSelectedContractPeriods$ = this._planQuery.select(state => state.easyphone_selected_contract_period);
    this.easyphoneAvailableContractPeriods$ = this._planQuery.select(state => state.easyphone_available_contract_periods);
    this.basePlan$ = this._planQuery.select(state => state.base_plan);
    this.devicePrices$ = this._planQuery.getDevicePrices$;
    this.devicePrice$ = this._planQuery.select(store => store.device_price);
    
    combineLatest(
      this.isEasyPhone$,
      this.devicePrice$,
      (isEasyPhone, price) => {
        return isEasyPhone ? price : 0;
      }
    ).subscribe(price => {
        this.easyPhoneDevicePrice = price;
        this.calculateMonthlyPrice();
    });
  }

  ngOnInit() {

    this.supplimentarylines = [
      { "id": 1, "name": "+ 1 Supplementary", "label": "Supplementary" },
      { "id": 2, "name": "+ 2 Supplementary", "label": "Supplementary" },
      { "id": 3, "name": "+ 3 Supplementary", "label": "Supplementary" },
      { "id": 4, "name": "+ 4 Supplementary", "label": "Supplementary" },
      { "id": 5, "name": "+ 5 Supplementary", "label": "Supplementary" }
    ];
    if (typeof window !== 'undefined' && localStorage && sessionStorage) {
      // Number of lines allowed for particular plan for user coming from promotional sites.
      if (this.isPromotion) {
        let itemFoundCount = 0;
        this.data.supplementary_details.celcom_family_plan.forEach(item => {
          itemFoundCount += item.enable_plan_skus.includes(this.promotionPlan);
        });
        this.noOfLinesAllowed = itemFoundCount;
      }
      this.validateAllowedLines();
      // if ((localStorage.getItem("MyMsIsdn") || sessionStorage.getItem("USER_TYPE")) &&
      //   (sessionStorage.getItem("UserInfo") || sessionStorage.getItem("GuestInfo"))
      //   && sessionStorage.getItem("UserToken")) {
      //   if (localStorage.getItem("suppLinesDetailsOfUser")) {
      //     const suppLinesDetailsOfUser = JSON.parse(localStorage.getItem("suppLinesDetailsOfUser"));
      //     this.noOfLinesAllowed = suppLinesDetailsOfUser.maxPostpaidLinesRemaining;
      //     this.isLogin = true;
      //     if (localStorage.getItem("supplementryFlow") && !localStorage.getItem("SupplementaryLinesEditingFromCart") &&
      //       suppLinesDetailsOfUser.message === "Maximum limit reached") {
      //       this.noOflinesAdded = this.noOfLinesAllowed;
      //     }
      //   }
      // }
      if (localStorage.getItem("SupplementaryLinesEditingFromCart")) {
        this.noOflinesAdded = JSON.parse(localStorage.getItem("SupplementaryLinesEditingFromCart")).length;
      }
      if (localStorage.getItem("isMviva")) {
        let isEasyPhoneMviva = false;
        this.isMviva = JSON.parse(localStorage.getItem("isMviva"));
        if (this.isMviva && this.data?.basic_details?.campaign_mviva?.purchase_type) {
            isEasyPhoneMviva = this.data?.basic_details?.campaign_mviva?.easyphone == '1' ;
        }
        if (this.isMviva && !isEasyPhoneMviva) {
          this.DevicePagePurachaseTypeCLicked = 'Device Bundle';
          this.isRentClicked = false;
          this.isOwnClicked = false;
          this.isBundleClicked = true;
          this.UpdatingTabs();
        }
      }
      if (localStorage.getItem("SuppLinesAdded")) {
        this.linesAdded = JSON.parse(localStorage.getItem("SuppLinesAdded"));
      }
      if (!localStorage.getItem("supplementryFlow") && localStorage.getItem("suppLinesAddedByTheUser")) {
        localStorage.removeItem("suppLinesAddedByTheUser");
      }
      if (localStorage.getItem("publishCobpLoading")) {
        this.cobpLoading = true;
        localStorage.removeItem("publishCobpLoading");
      }
    }
    this.Init();
    this.subscriber = this._deviceDataService.sharedIsExcessLinesAdded$.subscribe(data => {
      if (data) {
        this.activeSuppLines[this.suppLinesDetails.length] = ({ noOfSupLines: this.suppLinesDetails.length, isActive: false });
        this.validateAllowedLines();
        this.activeSuppLines[this.noOflinesAdded] = ({ noOfSupLines: this.noOflinesAdded, isActive: true });
        this.UpdatePriceWithSubsidy(this.noOflinesAdded);
      }
    });
    this.subscriber = this._deviceDataService.sharedColor$.subscribe(data => {
      if (data) {
        this.selectedColor = data;
        if (localStorage && localStorage.getItem('isDeviceOnlyClicked') &&
          JSON.parse(localStorage.getItem("isDeviceOnlyClicked")) === true) {
          this.confirmDeviceFlow("Device Only");
        } else {
          this.confirmEligiblePlan('changeColourStorage');
        }
      }
    });
    this.subscriber = this._deviceDataService.sharedStorage$.subscribe(data => {
      if (data) {
        this.selectedStorage = data;
        if (localStorage && localStorage.getItem('isDeviceOnlyClicked') &&
          JSON.parse(localStorage.getItem("isDeviceOnlyClicked")) === true) {
          this.confirmDeviceFlow("Device Only");
        } else {
          this.confirmEligiblePlan('changeColourStorage');
        }
      }


    });
    this.subscriber = this._deviceDataService.sharedPlan$.subscribe(data => {
      if (!data) {
        this.isActive = false;
        this.buyNoPlan = true;
      }
    });
    this.subscriber = this._deviceDataService.isMviva$.subscribe(data => {
      let isEasyPhoneMviva = false;
      this.isMviva = data;
      if (this.data !== undefined &&
        this.data.basic_details.campaign_mviva &&
        this.data.basic_details.campaign_mviva.purchase_type) {
        isEasyPhoneMviva = this.data.basic_details.campaign_mviva.purchase_type.includes("easyphone");
      }
      if (this.isMviva && !isEasyPhoneMviva) {
        this.DevicePagePurachaseTypeCLicked = 'Device Bundle';
        this.isRentClicked = false;
        this.isOwnClicked = false;
        this.isBundleClicked = true;
        this.UpdatingTabs();
      }
    });
    this.subscriber = this._deviceDataService.selectedPrincipalLine$.subscribe(data => {
      this.principalLine = data;
      if (this.principalLine === null && this.chosenSuplimentaryLines === 'PrincipleLineOnly') {
        this.linesAdded = null;
        this.SuppLinesSelection(null, "PrincipleLineOnly");
      }
    });
    this.subscriber = this._deviceDataService.sharedGoldenNumber$.subscribe(data => {
      this.IsGoldenNumberSelected = data;
      if (this.IsGoldenNumberSelected === null && this.IsGoldenNumberSelected !== true) {
        this.IsGoldenNumberSelected = false;
      }
    });
    this.subscriber = this._deviceDataService.sharedSupplimentaryLines$.subscribe(
      data => {
        this.suppLinesDetails = data;
        this.suppCount = data.length;
      });
    this.subscriber = this._deviceDataService.sharedNumberType$.subscribe(data => this.orderNumberType = data);
    this.subscriber = this._deviceDataService.sharedDevicePagePurachaseTypeTab$.subscribe(data => {
      this.DevicePagePurachaseTypeCLicked = data;
      if (localStorage && localStorage.getItem('isDeviceOnlyClicked') &&
        JSON.parse(localStorage.getItem("isDeviceOnlyClicked")) === true) {
        this.DevicePagePurachaseTypeCLicked = 'Device Only';
      }
      this.confirmDeviceFlow(this.DevicePagePurachaseTypeCLicked);
    });
    this.subscriber = this._deviceDataService.isEasyPhone$.subscribe(data => {
      this.isEasyPhone = data;
    });

    this.subscriber = this._deviceDataService.easyPhoneRentData$.subscribe(data => {
      if (data) {
        this.UpdateRentData(data);
        this.UpdateRentPrice();
      }
    });
    this.subscriber = this._deviceDataService.easyPhoneOwnData$.subscribe(data => {
      const ownData = data;
      this.UpdateOwnData(ownData);
      this.UpdateOwnPrice();
    });
    this.subscriber = this._deviceDataService.easyPhoneBundleData$.subscribe(data => {
      const bundleData = data;
      this.UpdateBundleData(bundleData);
      this.UpdateBundlePrice();
    });
    this.subscriber = this._deviceDataService.easyPhoneUpfrontData$.subscribe(data => {
      const upfrontData = data;
      this.UpdateUpfrontData(upfrontData);
      this.UpdateUpfrontPrice();
    });
    this.subscriber = this._deviceDataService.cobpLoading$.subscribe(data => {
      setTimeout(() => {
        this.cobpLoading = data;
      }, 0);
    });
    this.confirmDeviceFlow(this.DevicePagePurachaseTypeCLicked);
    this.subscriber = this._deviceDataService.sharedTabSelected$.subscribe(data => this.tabSelected = data);
    this.subscriber = this._deviceDataService.colorStorageChange$.subscribe(
      data => {
        if (data) {
          this._deviceDataService.publishPlan(this.selectedPlan);
          this.CheckNeptune();
        }
      }
    );
    this.subscriber = this._deviceDataService.sharedDisableNewLineCobpSTen$.subscribe(
      data => {
        if (data === true) {
          this.noOfLinesAllowed = 0;
        }
      }
    );
    this.subscriber = this._deviceDataService.sharedSaleablePlanArray$.subscribe(data => {
      if (data) {
        this.saleablePlanArray = data;
        if (this.saleablePlanArray && this.chosenSuplimentaryLines) {
          this.UpdatePriceWithSubsidy(this.chosenSuplimentaryLines);
        }
      }
    });
    if (localStorage && localStorage.getItem("DisableNewLineCobpSTen")) {
      this.disableNewLineCobpSTen = JSON.parse(localStorage.getItem('DisableNewLineCobpSTen'));
      if (this.disableNewLineCobpSTen === true) {
        this.noOfLinesAllowed = 0;
      }
    }
    this.publishPrincipleLineClicked.emit(this.principleLineOnly);
    if (localStorage && localStorage.getItem("isEasyPhone")) {
      this.isEasyPhone = JSON.parse(localStorage.getItem("isEasyPhone"));
    }

    if ((typeof window !== 'undefined' && localStorage &&
      localStorage.getItem('keepCelcomNumEasyPhone') && localStorage.getItem("MyMsIsdn")) ||
      (typeof window !== 'undefined' && localStorage && localStorage.getItem('EditEasyPhone'))) {
      if (localStorage && localStorage.getItem("isRentClicked")) {
        this.isRentClicked = JSON.parse(localStorage.getItem("isRentClicked"));
        this.isEasyPhone = true;
        this.tabSelected = true;
        if (this.isRentClicked) {
          if (localStorage && localStorage.getItem("easyPhoneRentData")) {
            const rentData = JSON.parse(localStorage.getItem("easyPhoneRentData"));
            this.UpdateRentData(rentData);
            this.UpdateRentPrice();
          }
          this.DevicePagePurachaseTypeCLicked = 'Easyphone';
          this._deviceDataService.publishEditCartEasyPhone(true);
        }
      }
      if (localStorage && localStorage.getItem("isOwnClicked")) {
        this.isOwnClicked = JSON.parse(localStorage.getItem("isOwnClicked"));
        if (this.isOwnClicked) {
          if (localStorage && localStorage.getItem("easyPhoneOwnData")) {
            const ownData = JSON.parse(localStorage.getItem("easyPhoneOwnData"));
            this.UpdateOwnData(ownData);
            this.UpdateOwnPrice();
          }
          this.DevicePagePurachaseTypeCLicked = 'Easyphone';
          this._deviceDataService.publishEditCartEasyPhone(true);
        }
      }
      if (localStorage && localStorage.getItem("isBundleClicked")) {
        this.isBundleClicked = JSON.parse(localStorage.getItem("isBundleClicked"));
        if (this.isBundleClicked) {
          if (localStorage && localStorage.getItem("easyPhoneBundleData")) {
            const bundleData = JSON.parse(localStorage.getItem("easyPhoneBundleData"));
            this.UpdateBundleData(bundleData);
            this.UpdateBundlePrice();
          }
          if (localStorage && localStorage.getItem("easyPhoneUpfrontData")) {
            const upfrontData = JSON.parse(localStorage.getItem("easyPhoneUpfrontData"));
            this.UpdateUpfrontData(upfrontData);
            this.UpdateUpfrontPrice();
          }
        }
      }

      // if (!this.isRentClicked && !this.isOwnClicked && !this.isBundleClicked) {
      //   this.confirmDeviceOnlyFlow = true;
      // }

      if (localStorage && localStorage.getItem('keepCelcomNumEasyPhone')) {
        localStorage.removeItem('keepCelcomNumEasyPhone');
      }
      localStorage.setItem('afterLoginEasyPhone', JSON.stringify(true));
    }
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("DealerInfo")) {
      this.isDealer = true;
    }

    this.subscriber = this._deviceDataService.basePlanStar$.subscribe(data => {
      if (!data) {
        this.SelectPlan(null, null, null, null, null, null);
      }
    });

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this._activatedRoute.queryParams.subscribe(data => {
        if (data.type && this.IsOnloadCall) {
          this.TypeQueryParams.Type = data.type;
          this.TypeQueryParams.Pass = data.pass;
          this.GetPlanFromQueryParaams();
          this.IsOnloadCall = false;
        }
      });
    }, 1000);

  }
  GetPlanFromQueryParaams() {
    let plans: any;
    if (this.isOwnClicked) {
      plans = this.DeviceDetailsOwnResponse;
    } else if (this.isRentClicked) {
      plans = this.DeviceDetailsRentResponse;
    } else {
      plans = this.DeviceDetailsBundleResponse;
    }
    let plan = plans.find(item => item.sku == this.TypeQueryParams.Type);
    if (plan) {
      this.SelectPlan(plan.name, plan.sku, plan.PlanMonthlyPay, plan, null, null);
    }
  }
  public confirmEligiblePlan(flow) {
    let selectedColor;
    let selectedMemory;
    this.DeviceDetailsXpaxPlanResponse = [];
    if (this.selectedColor) {
      selectedColor = this.selectedColor;
    } else if (this.selectedProd && this.selectedProd.color) {
      selectedColor = this.selectedProd.color;
    } else if (this.SelectionAferLogin && this.SelectionAferLogin.color) {
      selectedColor = this.SelectionAferLogin.color;
    } else if (localStorage && localStorage.getItem("selectedColor")) {
      selectedColor = this.selectedColor || localStorage.getItem("selectedColor");
    }
    if (this.selectedStorage) {
      selectedMemory = this.selectedStorage;
    } else if (this.selectedProd && this.selectedProd.storage) {
      selectedMemory = this.selectedProd.storage;
    } else if (this.SelectionAferLogin && this.SelectionAferLogin.storage) {
      selectedMemory = this.SelectionAferLogin.storage;
    } else if (localStorage && localStorage.getItem("selectedStorage")) {
      selectedMemory = this.selectedStorage || localStorage.getItem("selectedStorage");
    }
    this.data.associated_product.forEach(eachElement => {
      const elementColor: string = eachElement.color;
      const elementMemory: string = eachElement.memory;
      if (elementColor === selectedColor && elementMemory === selectedMemory) {
        if (this.data.basic_details.is_easy_phone === 1) {
          if (eachElement.easy_phone && eachElement.easy_phone.rent_selected_plan && this.data && this.data.basic_details.is_rent) {
            this.eligiblePlanRentArray = eachElement.easy_phone.rent_selected_plan;
            if (this.eligiblePlanRentArray && this.eligiblePlanRentArray.length > 0) {
              this.DeviceDetailsRentResponse = [];
              this.eligiblePlansToDisplay(this.eligiblePlanRentArray, eachElement.easy_phone.rent, 'rent');
            }
          }
          if (eachElement.easy_phone && eachElement.easy_phone.own_selected_plan && this.data && this.data.basic_details.is_own) {
            this.eligiblePlanOwnArray = eachElement.easy_phone.own_selected_plan;
            if (this.eligiblePlanOwnArray && this.eligiblePlanOwnArray.length > 0) {
              this.DeviceDetailsOwnResponse = [];
              this.eligiblePlansToDisplay(this.eligiblePlanOwnArray, eachElement.easy_phone.own, 'own');
            }
          }
        }
        if (eachElement.saleable_plans && eachElement.saleable_plans.length > 0) {
          const planArray = [];
          for (let i = 0; i < eachElement.saleable_plans.length; i++) {
            if (eachElement.saleable_plans[i].sku) {
              planArray.push(eachElement.saleable_plans[i].sku);
            }
          }
          // const eligiblePlanArray = eachElement.saleable_plan.split(",");
          this.eligiblePlanArray = planArray;
          if (this.eligiblePlanArray && this.eligiblePlanArray.length > 0) {
            this.DeviceDetailsBundleResponse = [];
            this.eligiblePlansToDisplay(this.eligiblePlanArray, null, 'bundle');
          }
        }
      }
    });
    if (typeof window !== 'undefined' && localStorage && flow === 'changeColourStorage') {
      if (localStorage && localStorage.getItem("isEasyPhone") === "true") {
        if (localStorage.getItem("isOwnClicked") === "true" && this.DeviceDetailsOwnResponse) {
          this.OwnClicked();
        } else if (localStorage.getItem("isRentClicked") === "true" && this.DeviceDetailsRentResponse) {
          this.RentClicked();
        }
      } else if (this.data && this.data.basic_details && this.data.basic_details.is_easy_phone === 1 &&
        localStorage.getItem("isBundleClicked") && !JSON.parse(localStorage.getItem("isBundleClicked"))) {
        if (this.data && this.data.basic_details && this.data.basic_details.is_rent) {
          this.RentClicked();
        } else {
          this.OwnClicked();
        }
      }
    }
  }

  public confirmDeviceFlow(DevicePagePurachaseTypeCLicked) {
    this.isKardashianPlanSelected = false;
    this.DevicePagePurachaseTypeCLicked = DevicePagePurachaseTypeCLicked;
    if (this.DevicePagePurachaseTypeCLicked) {
      this.flowSelected();
    } else {
      if (localStorage && (localStorage.getItem('easyPhoneSelected') &&
        localStorage.getItem('easyPhoneSelected') === 'TRUE')) {
        this.DevicePagePurachaseTypeCLicked = 'Easyphone';
      } else if (localStorage && localStorage.getItem('deviceBundleSelected') &&
        localStorage.getItem('deviceBundleSelected') === 'TRUE') {
        this.DevicePagePurachaseTypeCLicked = 'Device Bundle';
      } else if ((localStorage && localStorage.getItem('isDeviceOnlyClicked') &&
        JSON.parse(localStorage.getItem("isDeviceOnlyClicked")) === true)) {
        this.DevicePagePurachaseTypeCLicked = 'Device Only';
      }
      if (this.DevicePagePurachaseTypeCLicked) {
        this._deviceDataService.publishDevicePagePurchaseTypeTab(this.DevicePagePurachaseTypeCLicked);
      }
      this.flowSelected();
    }
  }

  public flowSelected() {
    this.principleLineOnly = false;
    this.confirmDeviceOnlyFlow = false;
    if (this.DevicePagePurachaseTypeCLicked === 'Easyphone') {
      this.isEasyPhone = true;
      this.buyNoPlan = false;
      this.disablePlan = false;
      this.hideXpax = false;
      if (localStorage && this.SelectionAferLogin) {
        if (localStorage.getItem('COBP_FLOW') && localStorage.getItem('COBP_FLOW') === 'YES' &&
          (localStorage.getItem("isOwnClicked") && localStorage.getItem("isOwnClicked") === "true") ||
          (localStorage.getItem("isRentClicked") && localStorage.getItem("isRentClicked") === "true")) {
          this._deviceDataService.publishPurchaseTypeTab('SameNumber');
        }
      } else {
        this.linesAdded = null;
      }
      if (localStorage && localStorage.getItem('suppNumber')) {
        localStorage.removeItem('suppNumber');
      }
      if (localStorage && localStorage.getItem("isEasyPhone") === "true") {
        this.confirmEligiblePlan('changeColourStorage');
      }
      if (localStorage && localStorage.getItem("BuyNoPlan")) {
        localStorage.removeItem("BuyNoPlan");
      }
    } else if (this.DevicePagePurachaseTypeCLicked === 'Device Bundle') {
      this.isEasyPhone = false;
      this.buyNoPlan = false;
      this.principleLineOnly = true;
      this.isBundleClicked = true;
      if (localStorage && localStorage.getItem("BuyNoPlan")) {
        localStorage.removeItem("BuyNoPlan");
      }
      this.BundleClicked();
      if (typeof window !== 'undefined' && localStorage && this.SelectionAferLogin) {
        if (localStorage.getItem('COBP_FLOW') &&
          localStorage.getItem('COBP_FLOW') === 'YES' && localStorage.getItem('isBundleClicked') &&
          localStorage.getItem('isBundleClicked') === 'true') {
          this._deviceDataService.publishPurchaseTypeTab('SameNumber');
        } else if (localStorage.getItem("MNP-FLOW") && localStorage.getItem("MNP-CUSTOMER") && localStorage.getItem("MNP-PRE-SELECT")) {
          this._deviceDataService.publishPurchaseTypeTab('ShowMNPBlock');
        }
      }
      if (this.noOflinesAdded && this.noOflinesAdded !== null) {
        this.SuppLinesSelection(null, this.noOflinesAdded);
      } else if (this.linesAdded) {
        this.SuppLinesSelection(null, this.linesAdded);
      } else {
        if (!this.SelectionAferLogin) {
          this.SuppLinesSelection(null, "PrincipleLineOnly");
        }
      }
    } else {
      if (this.DevicePagePurachaseTypeCLicked === 'Device Only') {
        this.confirmDeviceOnlyFlow = true;
        this.linesAdded = null;
        this.BuyWithOutPlan();
      }
    }
    this.publishPrincipleLineClicked.emit(this.principleLineOnly);
  }

  public Init() {
    this.updatedGivenPrice = this.data;
    this.populatePlans(this.data.choose_plan);
    if (this.data) {
      if (typeof window !== 'undefined' && localStorage) {
        this.confirmEligiblePlan('ngInitFlow');
        if (localStorage.getItem('isEasyPhone')) {
          this.isEasyPhone = JSON.parse(localStorage.getItem("isEasyPhone"));
        }
        if (localStorage.getItem("isBundleClicked")) {
          this.isBundleClicked = JSON.parse(localStorage.getItem("isBundleClicked"));
        }
        if (this.isEasyPhone) {
          if (this.data.basic_details.is_easy_phone === 1) {
            this.isEasyPhone = true;
            if (typeof window !== 'undefined' && localStorage && !localStorage.getItem('keepCelcomNumEasyPhone') &&
              !localStorage.getItem('EditEasyPhone')) {
              if (this.isProjectStar) {
                if (this.data && this.data.basic_details && this.data.basic_details.is_own) {
                  this.isOwnClicked = true;
                } else {
                  this.isRentClicked = true;
                }
              } else {
                if (this.data && this.data.basic_details && this.data.basic_details.is_rent) {
                  this.isRentClicked = true;
                } else {
                  this.isOwnClicked = true;
                }
              }
              this.UpdatingTabs();
            }
          }
        } else if (this.isBundleClicked) {
          if (localStorage && localStorage.getItem('isDeviceOnlyClicked') &&
            JSON.parse(localStorage.getItem("isDeviceOnlyClicked")) === true) {
            this.confirmDeviceFlow("Device Only");
          } else {
            this.confirmDeviceFlow("Device Bundle");
          }
        }
        if (this.selectedProd) {
          setTimeout(() => {
            if (this.selectedProd.orderNumberType === "NewNumber" && this.selectedProd.phoneNum != null) {
              this._deviceDataService.publishUpdateStep(3);
            }
            if (this.selectedProd.planName &&
              this.selectedProd.planSku &&
              this.selectedProd.planMothlyPay &&
              this.selectedProd.selectedPlanDetails
            ) {
              if (localStorage && ((!localStorage.getItem("BuyNoPlan") && this.isBundleClicked) ||
                (this.isEasyPhone && this.data.basic_details.editProduct && this.data.basic_details.editProduct !== null) ||
                !localStorage.getItem("BuyNoPlan") && !this.isEasyPhone)) {
                this.SelectPlan(this.selectedProd.planName,
                  this.selectedProd.planSku,
                  this.selectedProd.planMothlyPay,
                  this.selectedProd.selectedPlanDetails,
                  this.index, null);
                if (this.data.basic_details.is_easy_phone === 1) {
                  this.UpdateRentPrice();
                  this.UpdateOwnPrice();
                  this.UpdateBundlePrice();
                  this.UpdateUpfrontPrice();
                }
                this.GetPlanFromQueryParaams();
              } else if (this.isEasyPhone && !localStorage.getItem('EditEasyPhone')) {
                let SelectedPlanDetails;
                if (this.DeviceDetailsRentResponse && this.DeviceDetailsRentResponse.length > 0) {
                  if (this.rentLowestPricePlan) {
                    SelectedPlanDetails = this.rentLowestPricePlan;
                  } else {
                    SelectedPlanDetails = (this.DeviceDetailsRentResponse.slice(-1))[0];
                  }
                } else if (this.DeviceDetailsOwnResponse && this.DeviceDetailsOwnResponse.length > 0) {
                  if (this.ownLowestPricePlan) {
                    SelectedPlanDetails = this.ownLowestPricePlan;
                  } else {
                    SelectedPlanDetails = (this.DeviceDetailsOwnResponse.slice(-1))[0];
                  }
                }
                if (this.isProjectStar) {
                  let data = [];
                  if (this.DeviceDetailsRentResponse && this.DeviceDetailsRentResponse.length > 0) {
                    data = this.DeviceDetailsRentResponse
                  } else if (this.DeviceDetailsOwnResponse && this.DeviceDetailsOwnResponse.length > 0) {
                    data = this.DeviceDetailsOwnResponse
                  }
                  let default_plan :any;
                  if (this.isEasyPhone) {
                    default_plan = data.find(p => {
                      return this.data.basic_details.default_easyphone_plan_sku === p.sku;
                    });
                  } else {
                    default_plan = data.find(p => {
                    return this.data.basic_details.default_plan_sku == p.sku;
                  });
                }
                  if (!default_plan) {
                    default_plan = this.DeviceDetailsOwnResponse[0];
                  }
                  SelectedPlanDetails = default_plan;
                }
                if (SelectedPlanDetails) {
                  this.SelectPlan(SelectedPlanDetails.name,
                    SelectedPlanDetails.sku,
                    SelectedPlanDetails.monthlyPlan,
                    SelectedPlanDetails, this.index, null);
                  this.GetPlanFromQueryParaams();
                  if (this.data.basic_details.is_easy_phone === 1) {
                    this.UpdateRentPrice();
                    this.UpdateOwnPrice();
                    this.UpdateBundlePrice();
                    this.UpdateUpfrontPrice();
                  }
                }
              } else {
                this.fuctionsToBeCalled();
              }
            } else {
              if (!this.selectedProd.planName &&
                !this.selectedProd.planSku &&
                !this.selectedProd.planMothlyPay &&
                !this.selectedProd.selectedPlanDetails &&
                this.selectedProd.color && this.selectedProd.storage
              ) {
                this.confirmDeviceOnlyFlow = true;
                this.DeviceOnlyFlow.emit(this.confirmDeviceOnlyFlow);
                this.BuyWithOutPlan();
              } else if (localStorage && localStorage.getItem("SelectedPlan") && localStorage.getItem("SelectedPlanDetails")) {
                this.SelectedPlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
                this.SelectPlan(
                  this.SelectedPlanDetails.name,
                  this.SelectedPlanDetails.sku,
                  this.SelectedPlanDetails.monthly_plan,
                  this.SelectedPlanDetails, this.index, null);
                if (this.data.basic_details.is_easy_phone === 1) {
                  this.UpdateRentPrice();
                  this.UpdateOwnPrice();
                  this.UpdateBundlePrice();
                  this.UpdateUpfrontPrice();
                }
              } else {
                this.fuctionsToBeCalled();
              }
            }
          }, 0);
        }
        if (this.SelectionAferLogin) {
          setTimeout(() => {
            this.SelectPlan(
              this.SelectionAferLogin.planName,
              this.SelectionAferLogin.planSku,
              this.SelectionAferLogin.monthlyPay,
              this.SelectionAferLogin.planDetails, this.index, null);
          }, 0);
          if (this.data.basic_details.is_easy_phone === 1) {
            this.UpdateRentPrice();
            this.UpdateOwnPrice();
            this.UpdateBundlePrice();
            this.UpdateUpfrontPrice();
          }
          if (this.SelectionAferLogin.suppLinesDetails && this.SelectionAferLogin.suppLinesDetails.length) {
            if (typeof window !== 'undefined' && localStorage && localStorage.getItem("suppLinesDetailsOfUser")) {
              const suppLinesDetailsOfUser = JSON.parse(localStorage.getItem("suppLinesDetailsOfUser"));
              this.noOfLinesAllowed = suppLinesDetailsOfUser.maxPostpaidLinesRemaining;
              if (suppLinesDetailsOfUser.message === "Maximum limit reached") {
                this.noOflinesAdded = this.SelectionAferLogin.suppLinesDetails.length;
                if (this.SelectionAferLogin.suppLinesDetails.length > this.noOfLinesAllowed) {
                  this.noOflinesAdded = this.noOfLinesAllowed;
                  this.SuppLinesSelection(null, this.noOfLinesAllowed);
                } else {
                  this.noOflinesAdded = this.SelectionAferLogin.suppLinesDetails.length;
                  this.SuppLinesSelection(null, this.linesAdded);
                }
              } else {
                this.noOflinesAdded = this.SelectionAferLogin.suppLinesDetails.length;
                this.SuppLinesSelection(null, this.linesAdded);
              }
            } else {
              this.noOflinesAdded = this.SelectionAferLogin.suppLinesDetails.length;
              if (this.linesAdded) {
                this.SuppLinesSelection(null, this.linesAdded);
              } else if (this.noOflinesAdded) {
                this.SuppLinesSelection(null, this.noOflinesAdded);
              }
            }
          } else if (this.SelectionAferLogin && this.SelectionAferLogin.lineChosen) {
            this.principleLineOnly = false;
            if (this.noOfLinesAllowed < this.SelectionAferLogin.lineChosen) {
              this.linesAdded = this.noOfLinesAllowed;
              this.SuppLinesSelection(null, this.noOfLinesAllowed);
            } else {
              this.linesAdded = this.SelectionAferLogin.lineChosen;
              this.SuppLinesSelection(null, this.SelectionAferLogin.lineChosen);
            }
          }
        }
      }
    }
    this.CheckNeptune();
  }

  public fuctionsToBeCalled() {
    this.confirmDeviceOnlyFlow = true;
    this.DeviceOnlyFlow.emit(this.confirmDeviceOnlyFlow);
    this.BuyWithOutPlan();
  }

  public eligiblePlansToDisplay(eligiblePlans, planPrices, type) {
    let lowestPricePlan;
    if (planPrices && planPrices !== null) {
      let lowestPrice;
      planPrices.forEach(planPrice => {
        const planPriceToCompare = JSON.stringify(Object.values(planPrice)[0]);
        const price = JSON.parse(planPriceToCompare);
        if (!lowestPrice || lowestPrice > JSON.parse(price)) {
          lowestPrice = JSON.parse(price);
          lowestPricePlan = Object.keys(planPrice)[0];
        }
      });
    }

    eligiblePlans.forEach(item => {
      this.data.choose_plan.forEach(plans => {
        let planItem = plans.tabData.find((individualPlan) => individualPlan.sku === item.trim());
        planItem = this.sanitizer.bypassSecurityTrustHtml(planItem);
        planItem = planItem.changingThisBreaksApplicationSecurity;
        if (type === 'rent') {
          this.rentLowestPricePlan = plans.tabData.find((individualPlan) => individualPlan.sku === lowestPricePlan);
        } else if (type === 'own') {
          this.ownLowestPricePlan = plans.tabData.find((individualPlan) => individualPlan.sku === lowestPricePlan);
        }
        if (planItem) {
          planItem.basePlanIdentifier = plans.sku || this.plansInfo.gb_pass_sku;
          this.DeviceDetailsPlanResponse.push(planItem);
          if (planItem.is_xpax === true || planItem.is_xpax === "true") {
            this.DeviceDetailsXpaxPlanResponse.push(planItem);
          }
          if (planItem.is_xpax === false || planItem.is_xpax === "false") {
            this.DeviceDetailsSimplePlanResponse.push(planItem);
            if (type === 'bundle') {
              this.DeviceDetailsBundleResponse.push(planItem);
            } else if (this.data.basic_details.is_easy_phone === 1) {
              if (type === 'rent') {
                this.DeviceDetailsRentResponse.push(planItem);
              } else if (type === 'own') {
                this.DeviceDetailsOwnResponse.push(planItem);
              }
            }
          }
        }
      });
    });
    this.sortPlans();
    this.index = this.DeviceDetailsPlanResponse.length - 1;
    this.selectedDevice = this.data.basic_details.sku;
    this.selectedDevice = this.sanitizer.bypassSecurityTrustHtml(this.selectedDevice);
    this.DeviceDetailsPlanResponse.forEach((itemParent: any, index) => {
      itemParent.atrHref = "#rm-" + index;
      itemParent.tableInfo.forEach((item: any, index) => {
        item.Id = index;
        item.HrefId = "rm-" + index;
      });
    });
  }

  onCancellingSwitchingPurchaseTypeTab() {
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
  }

  onContinueSwitchingPurchaseTypeTab() {
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
      localStorage.removeItem("suppLinesAddedByTheUser");
    }
    this._deviceDataService.publishNumberType(null);
    this._deviceDataService.publishPhoneNo(null);
    this._deviceDataService.publishPlanChanged(true);
    this._deviceDataService.publishSupplimentaryLines([]);
    this._deviceDataService.publishSupplinesLinesPrice([]);
    this._deviceDataService.publishPrincipalLine(false);
    this._deviceDataService.publishInternetSharingOption(false);
    localStorage.removeItem("PrincipleNumberSelected");
    this.isInitializeChooseNumber = true;
    this.cobpEligibilityData.emit(this.isInitializeChooseNumber);
    this.confirmLineSelection(null, this.chosenSuplimentaryLines);
  }

  SuppLinesSelection(event, data) {
    this.chosenSuplimentaryLines = data;
    if (data) {
      if (data === "PrincipleLineOnly") {
        this.suppCount = 0;
      } else {
        this.suppCount = data;
      }
    }
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
    if (event !== null) {
      if (
        (
          (this.cobpEligibility && this.cobpEligibility != null && localStorage && localStorage.getItem("COBP_FLOW") === 'YES')
          ||
          (this.orderNumberType && (this.orderNumberType === 'SwitchToCelcom'))
          ||
          (this.principalLine && this.principalLine !== null)
          ||
          localStorage.getItem("suppLinesAddedByTheUser")
          ||
          localStorage.getItem("PrincipleNumberSelected")
        )
        &&
        !localStorage.getItem('popup')
      ) {
        this.IsDispalySwitchingPurchaseTypeTabPopup = true;
        localStorage.removeItem('popup');
      }
    }

    // For project star, default selected plan is the highest monthly pay
    // In Magento, it is not possible to select Pass as default plan sku
    // if(!this.isProjectStar){
    this.data.choose_plan.forEach(elementPlan => {
      if (!elementPlan.isXpax) {
        elementPlan.tabData.forEach(plansku => {
          if (plansku.sku === this.data.basic_details.default_plan_sku) {
            this.SelectPlan(
              plansku.PlanName,
              plansku.sku,
              plansku.PlanMonthlyPay,
              plansku, this.index, event);
          }
        });
      }
    });
    // }else{
    //   let defaultPlan = this.DeviceDetailsBundleResponse[0];
    //   this.SelectPlan(
    //     defaultPlan.PlanName,
    //     defaultPlan.sku,
    //     defaultPlan.PlanMonthlyPay,
    //     defaultPlan, this.index, event);
    // }
    this.GetPlanFromQueryParaams();

    if (!this.IsDispalySwitchingPurchaseTypeTabPopup) {
      this.confirmLineSelection(event, data);
    } else {
      return;
    }
  }

  public confirmLineSelection(event, data) {
    if (data === "PrincipleLineOnly") {
      this.principleLineOnly = true;
      this.disablePlan = false;
      this.hideXpax = false;
      this.linesAdded = null;
      this._deviceDataService.publishLineChosen(false);
      this._deviceDataService.publishDevicePrice(this.devicePrice);
    } else {
      this._deviceDataService.publishLineChosen(true);
      this.principleLineOnly = false;
      this.hideXpax = true;
      this.deselectAllOtherLines(data);
      if (data && data > 2) {
        this.disablePlan = true;
      } else {
        this.disablePlan = false;
      }
      const foundCurrentSupLineItem = this.activeSuppLines[data];
      if (foundCurrentSupLineItem && foundCurrentSupLineItem.isActive === false) {
        this.activeSuppLines[data].isActive = !this.activeSuppLines[data].isActive;
      } else {
        this.activeSuppLines[data] = ({ noOfSupLines: data, isActive: true });
      }
    }
    this.publishPrincipleLineClicked.emit(this.principleLineOnly);
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem('suppLinesAddedByTheUser')) {
      const supplimentaryData = JSON.parse(localStorage.getItem('suppLinesAddedByTheUser'));
      this._deviceDataService.publishSupplimentaryLines(supplimentaryData);
    }
    if (this.data && this.data.supplementary_details) {
      this.supplimentaryData =  this.data.supplementary_details.celcom_ultra_plan ?
      this.data.supplementary_details.celcom_ultra_plan : this.data.supplementary_details.celcom_family_plan;
      this.getNoOfLinesLimit(this.supplimentaryData);
      this.data.lineChosen = this.chosenSuplimentaryLines;
      this.supplimentaryDataToTransfer.emit(this.data);
    }
    if (this.planSku) {
      if (!this.principleLineOnly) {
        this.data.choose_plan.forEach(element => {
          if (!element.isXpax) {
            element.tabData.forEach(plandetails => {
              if (!plandetails.is_premium_plan && !plandetails.is_xpax) {
                this.planSku = plandetails.sku;
              }
            });
          }
        });
      }
      this.data.choose_plan.forEach(elementPlan => {
        if (!elementPlan.isXpax) {
          elementPlan.tabData.forEach(plansku => {
            if (plansku.sku === this.planSku) {
              this.SelectPlan(
                plansku.PlanName,
                plansku.sku,
                plansku.PlanMonthlyPay,
                plansku, this.index, event);
            }
          });
        }
      });
    }
    this.getSubsidyAmountofSelectedPlan(this.supplimentaryData);
    this.UpdatePriceWithSubsidy(data);
  }

  deselectAllOtherLines(noOfSuppLines: any) {
    const items = this.activeSuppLines;
    for (const key in items) {
      if (items.hasOwnProperty(key) && key !== noOfSuppLines) {
        this.activeSuppLines[key].isActive = false;
      }
    }
  }

  public PlanEligibility(planSku): boolean {
    if (!this.principleLineOnly && this.chosenSuplimentaryLines && this.chosenSuplimentaryLines !== 'PrincipleLineOnly' &&
      this.supplimentaryData && this.DevicePagePurachaseTypeCLicked && this.DevicePagePurachaseTypeCLicked === 'Device Bundle') {
      this.supplimentaryData.forEach(eachProduct => {
        if (parseInt(eachProduct.max_line, 10) === this.chosenSuplimentaryLines) {
          if (eachProduct.enable_plan_skus.includes(planSku)) {
            this.disablePlan = false;
          } else {
            this.disablePlan = true;
          }
          return this.disablePlan;
        }
      });
    } else {
      return false;
    }
  }

  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  public populatePlans(data: any) {
    if (this.isPromotion) {
      data.forEach((eachPlan: any, planIndex) => {
        if (eachPlan.is_xpax === false) {
          this.TableComparisonResponse = [];
          this.TableComparisonResponse.push(data[planIndex]);
        }
      });
    } else if (!this.isPromotion) {
      this.TableComparisonResponse = data;
    }
    this.SetPlanType();
    this.SelectedTab = this.TableComparisonResponse[0].tabName;
    this.FindPlanDataByIndex(0);
    if (typeof this.data['base_plan'] !== 'undefined') {
      this.basePlans = [].concat(this.data.base_plan);
      if (this.basePlans[0]) {
        this.isProjectStar = true;
        localStorage.setItem('isProjectStar', 'true');
        this.selectBasePlan(this.basePlans[0]);
      }
    }
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

  public OnCloseTermsAndConditionsPopup() {
    this.isInitializeTermsAndConditions = false;
  }
  DeselectAllOtherPlan(planName: any) {
    const items = this.activeStateList;
    for (const key in items) {
      if (items.hasOwnProperty(key) && key !== planName) {
        this.activeStateList[key].isActive = false;
      }
    }
  }

  ResetPlan() {
    this.selectedPlanName = '';
    this.selectedPlan = '';
    this.selectedMonthlyPay = {};
    this._deviceDataService.publishSelectedPlanDetails(null);
    this._deviceDataService.publishPlan(null);
    this._deviceDataService.publishPlanName(null);
    this._deviceDataService.publishIsGoldenNo(false);
    this._deviceDataService.publishPhoneNo(null);
    this._deviceDataService.publishMonthlyPay(<any>{});
    this._deviceDataService.publishBasePlanStar(null);
    this._deviceDataService.publishInternetSharingOption(false);
  }

  planByIndex() {
    this.SelectedTab = this.data.choose_plan[0].tabName;
    this.FindPlanDataByIndex(0);
  }

  validatePlanSelection(planSku): object{
    let plan = null;
    if (this.isBundleClicked) {
      plan = this.DeviceDetailsBundleResponse.find(resp => resp.sku == planSku);
      if(!plan && this.DeviceDetailsBundleResponse.length > 0){
        plan = this.DeviceDetailsBundleResponse[0];
      }
    } else if (this.isRentClicked){
      plan = this.DeviceDetailsRentResponse.find(resp => resp.sku == planSku);
      if(!plan && this.DeviceDetailsRentResponse.length > 0){
        plan = this.DeviceDetailsRentResponse[0];
      }
    } else if (this.isOwnClicked){
      plan = this.DeviceDetailsOwnResponse.find(resp => resp.sku == planSku);
      if(!plan && this.DeviceDetailsOwnResponse.length > 0){
        plan = this.DeviceDetailsOwnResponse[0];
      }
    }
    return plan;
  }

  // @todo - remove this ... testsite: http://10.1.58.64/store/devicedetail/Iphone7/
  SelectPlan(_planName: any, _planSku: any, _planMothlyPay: any, _selectedPlanDetails: any, index: any, event: any) {
    let data;
    let planSkuAutoBilling, planName, planSku, planMothlyPay, selectedPlanDetails;
    let validatedPlan = this.validatePlanSelection(_planSku);
    if(validatedPlan){
      planName = validatedPlan['name'];
      planSku = validatedPlan['sku'];
      planMothlyPay = validatedPlan['monthlyPlan'];
      selectedPlanDetails = validatedPlan;
      this.SelectPlan2(validatedPlan);
    } else {
      planName = null;
      planSku = null;
      planMothlyPay = null;
      selectedPlanDetails = null;
    }
    
    if(localStorage && localStorage.getItem("DeviceDetailResponse")) {
      data = JSON.parse(localStorage.getItem("DeviceDetailResponse"));
    }

    if(data && data.items && data.items.base_plan[0] && data.items.base_plan[0].sku) {
      planSkuAutoBilling = data.items.base_plan[0].sku;
    } else {
      planSkuAutoBilling = planSku;
    }
    localStorage.setItem("PSku", planSkuAutoBilling);
    const billType = selectedPlanDetails && selectedPlanDetails.bill_type ? selectedPlanDetails.bill_type : 0;
    this._deviceDataService.publishMandatoryAutoBilling(billType ? billType : 0);


    this.planSku = planSku;
    if (event !== null) {
      this.IsDispalySwitchingPurchaseTypeTabPopup = false;
      if (((this.principalLine && this.principalLine !== null) || localStorage.getItem('PrincipleNumberSelected'))
        && !localStorage.getItem('popup')) {
        this.IsDispalySwitchingPurchaseTypeTabPopup = true;
        localStorage.removeItem('popup');
      }
    }
    this._deviceDataService.publishUpfrontWaived(false);
    this._deviceDataService.publishUpfrontWaivedSuccess(false);
    this._deviceDataService.publishUpfrontWaivedFailure(false);
    if (!this.IsDispalySwitchingPurchaseTypeTabPopup) {
      if (typeof window !== "undefined" && localStorage) {
        if (selectedPlanDetails) {
          localStorage.setItem("SelectedPlanDetailsInDevice", JSON.stringify(selectedPlanDetails));
          localStorage.setItem("SelectedPlanDetails", JSON.stringify(selectedPlanDetails));
        } else {
          localStorage.removeItem("SelectedPlanDetailsInDevice");
          localStorage.removeItem("SelectedPlanDetails");
        }
      }
      if (planSku !== undefined && planSku !== null) {
        if (this.cobpEligibility && this.cobpEligibility != null && localStorage && localStorage.getItem("COBP_FLOW") === 'YES') {
          this.isInitializeChooseNumber = true;
          this.cobpEligibilityData.emit(this.isInitializeChooseNumber);
          this._deviceDataService.publishPhoneNo(null);
          this._deviceDataService.publishPlanChanged(true);
          this._deviceDataService.publishSupplimentaryLines([]);
          this._deviceDataService.publishSupplinesLinesPrice([]);
          this._deviceDataService.publishPrincipalLine(false);
        }
        const PlanForTab = planSku.toLowerCase().slice(0, 1);
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('PlanSkuSelected', planSku);
          localStorage.setItem('SelectedPlan', planSku);
        }
        if (PlanForTab === "x" && this.data.choose_plan[1] !== undefined) {
          this.SelectedTab = this.data.choose_plan[1].tabName;
          this.FindPlanDataByIndex(1);
        } else if (PlanForTab === "x" && this.data.choose_plan[0] !== undefined) {
          this.planByIndex();
        } else {
          this.planByIndex();
        }
        if (this.data.basic_details.is_easy_phone === 1) {
          this.UpdateRentPrice();
          this.UpdateOwnPrice();
          this.UpdateBundlePrice();
          this.UpdateUpfrontPrice();
        }
        // Added for re-initializing switch to celcom if it is already selected
        if ((localStorage && localStorage.getItem("Eligible") && localStorage.getItem("MNP-CUSTOMER") !== null)) {
          this.removeMNPStorage();
          this.ReInitializeChooseNumberComponent.emit();
          this._deviceDataService.publishPhoneNo(null);
          this._deviceDataService.publishNumberType(null);
        }
        // this._deviceDataService.publishPhoneNo(null);
        // this.accordianOpen(index);
        this.buyNoPlan = false;
        this._deviceDataService.publishBuyNoPlan(false);
        if (!planName) {
          return;
        }
        if (localStorage) {
          localStorage.removeItem('BuyNoPlan');
        }
        this.DeselectAllOtherPlan(planName);
        const foundCurrentPlanActiveItem = this.activeStateList[planName];
        if (foundCurrentPlanActiveItem && foundCurrentPlanActiveItem.isActive === false) {
          this.activeStateList[planName].isActive = !this.activeStateList[planName].isActive;
        } else {
          this.activeStateList[planName] = ({ planName: planName, isActive: true });
        }
        // only proceed if intention to activate
        if (this.activeStateList[planName].isActive) {
          this.isActive = true;
          this.selectedPlan = planSku;
          this.selectedMonthlyPay = planMothlyPay;
          this.selectedPlanName = planName;
          this._deviceDataService.publishPlan(planSku);
          this._deviceDataService.publishSelectedPlanDetails(selectedPlanDetails);
          this._deviceDataService.publishPlanName(planName);
          this._deviceDataService.publishMonthlyPay((this.isProjectStar) ? (Number(this.selectedBasePlan ? this.selectedBasePlan.PlanMonthlyPay : 0) + Number(planMothlyPay)) : planMothlyPay);
          if (typeof window !== "undefined") {
            if (localStorage &&
              this.selectedPlanName !== undefined &&
              this.selectedPlan !== undefined &&
              this.selectedMonthlyPay !== undefined &&
              selectedPlanDetails !== undefined &&
              !localStorage.getItem("MyMsIsdn")) {
              localStorage.setItem("SelectedPlanName", this.selectedPlanName);
              localStorage.setItem("SelectedMonthlyPay", this.selectedMonthlyPay);
              if (selectedPlanDetails) {
                localStorage.setItem("SelectedPlanDetails", JSON.stringify(selectedPlanDetails));
              } else {
                localStorage.removeItem("SelectedPlanDetails");
              }
            }
          }
          this._estoreAnalyticsService.SetProductIdForBundleProduct(planSku, this._renderer);
          this._estoreAnalyticsService.SetProductType("Bundle Device");
          // Need to trigger this post nginit on the plan & Number
          setTimeout(() => {
            this._deviceDataService.publishSelected(this.isActive);
          }, 0);

        } else {
          // reset
          this.ResetPlan();
          if (localStorage &&
            localStorage.getItem("SelectedPlanName") &&
            localStorage.getItem("SelectedPlan") &&
            localStorage.getItem("SelectedMonthlyPay") &&
            localStorage.getItem("SelectedPlanDetails")) {
            localStorage.removeItem("SelectedPlan");
            localStorage.removeItem("SelectedPlanDetails");
            localStorage.removeItem("SelectedMonthlyPay");
            localStorage.removeItem("SelectedPlanName");
          }
          this._estoreAnalyticsService.SetProductIdForBundleProduct(planSku, this._renderer);
          this._estoreAnalyticsService.SetProductType("Device");
        }
        if (selectedPlanDetails && selectedPlanDetails.bill_type) {
          this.billTypeForDevice = selectedPlanDetails.bill_type;
          this._deviceDataService.publishBillingType(this.billTypeForDevice);
        }
        if (selectedPlanDetails && (selectedPlanDetails.is_xpax === true || selectedPlanDetails.sku.indexOf("xpax") > -1)) {
          this.isXpaxSelected = true;
        } else {
          this.isXpaxSelected = false;
        }
        if (selectedPlanDetails && selectedPlanDetails.is_premium_plan !== this.isKardashianPlanSelected) {
          if (selectedPlanDetails.is_premium_plan === true) {
            this.isKardashianPlanSelected = true;
            this._deviceDataService.publishIsKardashianPlan(true);
          } else {
            this.isKardashianPlanSelected = false;
            this._deviceDataService.publishIsKardashianPlan(false);
          }
        }
        // update Prices on storage selection.
        this.updatePrice();
      }
    }
    if (this.suppLinesDetails && this.suppLinesDetails.length > 0) {
      this._deviceDataService.publishSupplimentaryLines(this.suppLinesDetails);
    }
    this.UpdatePriceWithSubsidy(this.chosenSuplimentaryLines);
    this.calculateMonthlyPrice();
  }

  public selectBasePlan(plan: iBasePlan) {
    this._deviceDataService.publishBasePlanStar(plan);
    this.selectedBasePlan = plan;
    this.calculateMonthlyPrice();
    this._plansService.selectBasePlan(plan);
  }
  public getPriceUpdated(data) {
    if (data !== null && data !== undefined) {
      this.data = data;
      if (localStorage && localStorage.getItem("PlanSkuSelected")) {
        this.selectedPlan = localStorage.getItem("PlanSkuSelected");
      }
      this.updatePrice();
    }
  }
  public CheckNeptune() {
    this.getColorStorage();
    const selectedNeptuneColor = this.selectedColor;
    const selectedNeptuneMemory = this.selectedStorage;
    this.data.associated_product.forEach(item => {
      const elementNeptuneColor: string = item.color;
      const elementNeptuneMemory: string = item.memory;
      if (elementNeptuneColor === selectedNeptuneColor && elementNeptuneMemory === selectedNeptuneMemory) {
        const isOldNeptune = this.isNeptune;
        this.isNeptune = item.is_neptune_subsidy;
        if (!this.isNeptune) {
          this.suppCount = 0;
          this.SuppLinesSelection(null, "PrincipleLineOnly");
        }
        if (isOldNeptune !== item.is_neptune_subsidy) {
          if (!this.SelectionAferLogin && (typeof window !== 'undefined' && localStorage && (localStorage.getItem("MNP-FLOW")) ||
            (localStorage.getItem("COBP_FLOW") && !localStorage.getItem("COBP_login")) ||
            localStorage.getItem("PrincipleNumberSelected"))) {
            this.IsDispalySwitchingPurchaseTypeTabPopup = true;
            localStorage.removeItem('popup');
          }
        }
      }
    });
  }
  public getColorStorage() {
    if (localStorage && localStorage.getItem("selectedColor")) {
      this.selectedColor = this.selectedColor || localStorage.getItem("selectedColor");
    }
    if (localStorage && localStorage.getItem("selectedStorage")) {
      this.selectedStorage = this.selectedStorage || localStorage.getItem("selectedStorage");
    }
  }
  // need to refactor this, function repeasted in color-storage component.
  public updatePrice() {
    this.getColorStorage();
    const selectedColor = this.selectedColor;
    const selectedMemory = this.selectedStorage;

    this.data.associated_product.forEach(element => {
      const elementColor: string = element.color;
      const elementMemory: string = element.memory;
      if (elementColor === selectedColor && elementMemory === selectedMemory) {
        let totalPay = 0;

        if (this.selectedPlan) {
          let upfrontPrice;
          //  let devicePrice;
          if (element.saleable_plans && element.saleable_plans.length > 0) {
            for (let i = 0; i < element.saleable_plans.length; i++) {
              if ((this.selectedPlan === element.saleable_plans[i].sku) && element.saleable_plans[i].prices[this.suppCount].device_price) {
                this.saleablePlanArray = element.saleable_plans[i];
                this.devicePrice = element.saleable_plans[i].prices[this.suppCount].device_price;
                this._deviceDataService.publishDevicePrice(this.devicePrice);
                this._deviceDataService.publishSaleablePlanArray(element.saleable_plans[i]);
                this.UpdatePriceWithSubsidy(this.chosenSuplimentaryLines);
              }
              if ((this.selectedPlan === element.saleable_plans[i].sku) && element.saleable_plans[i].prices[this.suppCount].upfront_price) {
                this.saleablePlanArray = element.saleable_plans[i];
                upfrontPrice = element.saleable_plans[i].prices[this.suppCount].upfront_price;
                this._deviceDataService.publishOneTimePay(upfrontPrice);
                this._deviceDataService.publishSaleablePlanArray(element.saleable_plans[i]);
                this.UpdatePriceWithSubsidy(this.chosenSuplimentaryLines);
              }
            }
          }
          if (upfrontPrice !== undefined && upfrontPrice !== null && this.devicePrice !== undefined && this.devicePrice !== null) {
            this.UpFrontPriceStar = upfrontPrice;
            totalPay = parseFloat(upfrontPrice) + parseFloat(this.devicePrice);
          }
          if (!this.isEasyPhone && !isNullOrUndefined(totalPay)) {
            if (localStorage && localStorage.getItem("isMviva") && JSON.parse(localStorage.getItem("isMviva")) === true
              && localStorage.getItem("mvivaBundleUpfront") && JSON.parse(localStorage.getItem("mvivaBundleUpfront")) === true) {
              this._deviceDataService.publishTotalPay(this.devicePrice);
            } else {
              this._deviceDataService.publishTotalPay(totalPay);
            }
          }
          if (totalPay && totalPay !== null && totalPay !== undefined) {
            this._estoreAnalyticsService.SetProductTotalForDevice(totalPay.toString(), this._renderer);
          }
        } else {
          totalPay = parseFloat(element.rrp); // + parseFloat(element.device_price_for_fg);
          if (this.isProjectStar) {
            totalPay += +this.selectedBasePlan.monthlyPlan;
          }
          let fgUpfront = 0;
          if (element.saleable_plans && element.saleable_plans.length > 0) {
            for (let i = 0; i < element.saleable_plans.length; i++) {
              if ((element.saleable_plans[i].sku === "FG") && element.saleable_plans[i].prices[this.suppCount].upfront_price) {
                fgUpfront = element.saleable_plans[i].prices[this.suppCount].upfront_price;
              }
            }
          }
          this._deviceDataService.publishOneTimePay(fgUpfront);
          this._deviceDataService.publishDevicePrice(element.rrp);
          this._deviceDataService.publishTotalPay(totalPay);
          if (totalPay && totalPay !== null && totalPay !== undefined) {
            this._estoreAnalyticsService.SetProductTotalForDevice(totalPay.toString(), this._renderer);
          }
        }
      }
    });
  }

  public BuyWithOutPlan() {
    this.isRentClicked = false;
    this.isOwnClicked = false;
    this.isBundleClicked = false;
    this.UpdatingTabs();
    this.index = -1;
    if (typeof window !== 'undefined' && localStorage) {
      // this.accordianOpen(this.index);
      localStorage.setItem('BuyNoPlan', 'true');
      this._deviceDataService.publishBuyNoPlan(true);
      this._deviceDataService.publishPlan(null);
    }
    this.isActive = false;
    setTimeout(() => {
      this._deviceDataService.publishSelected(this.isActive);
    }, 0);
    this.buyNoPlan = true;
    this.ResetPlan();
    if (window && localStorage) {
      localStorage.removeItem("SelectedPlan");
      localStorage.removeItem("SelectedPlanDetails");
      localStorage.removeItem("SelectedMonthlyPay");
      localStorage.removeItem("SelectedPlanName");
      localStorage.removeItem("PlanSkuSelected");
      localStorage.removeItem("bundlePrice");
      localStorage.removeItem("bundleUpfrontPrice");
      localStorage.removeItem('suppNumber');
    }
    this._deviceDataService.publishNumberType(null);
    this._estoreAnalyticsService.SetProductType("Device");
    if (this.data) {
      this.data.associated_product.forEach(eachElement => {
        const elementColor: string = eachElement.color;
        const elementMemory: string = eachElement.memory;
        if (elementColor === this.selectedColor && elementMemory === this.selectedStorage) {
          let price = eachElement.rrp;
          // Add discounted price if exists.
          if (eachElement.discounted_device_rrp) {
            price = eachElement.discounted_device_rrp;
          }
          this._deviceDataService.publishTotalPay(price);
          // Adobe Analytics
          if (price !== null || price !== undefined) {
            this._estoreAnalyticsService.SetProductTotalForDevice(price.toString(), this._renderer);
          }
          this._estoreAnalyticsService.SetProductId(eachElement.sku, this._renderer);
        }
      });
    }
    this._deviceDataService.publishAddToCartDisabling(false);
  }

  public MoreDetails() {
    if (this.showMoreDetails === 'out') {
      if (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined') {
        const anchorPlanDetails = document.getElementById("plan-details");
        const anchorMoreDetailsP = document.getElementById("moreDetailsP");
        if (anchorPlanDetails != null && anchorMoreDetailsP != null) {
          const topPosition = anchorPlanDetails.offsetTop - 170;
          // For chrome, IE and Firefox use scrollTo().
          if (typeof window !== 'undefined') {
            window.scrollTo(0, topPosition);
          }
        }
      }
    }
    this.is_icon_active = !this.is_icon_active;
    this.showMoreDetails = this.showMoreDetails === 'out' ? 'in' : 'out';
  }

  public OnTabSelect(item, index) {
    this.SelectedTab = item.tabName;
    this.FindPlanDataByIndex(index);
  }

  private SetPlanType() {
    this.TableComparisonResponse.forEach((item, index) => {
      if (index === 0) {
        item['planType'] = "POSTPAID";
        item['isXpax'] = false;
      }
      if (index === 1) {
        item['planType'] = "XPAX";
        item['isXpax'] = true;
      }
    });
  }

  private FindPlanDataByIndex(index: number) {
    const result: any = null;
    this.PlanData = this.TableComparisonResponse[index];
    // to check if it is XPAX template.
    this.PlanData.tabData.forEach((itemParent: any, index) => {
      itemParent.AtrHref = "#rm-" + index;
      itemParent.tableInfo.forEach((item: any, index) => {
        item.Id = index;
        item.HrefId = "rm-" + index;
      });
    });
  }

  removeMNPStorage() {
    if (localStorage) {
      localStorage.removeItem("checkToShowEditEligibilityBox");
      localStorage.setItem("Eligible", "false");
    }
  }
  public defaultOnClick() {
    return false;
  }

  RentClicked() {
    this.isRentClicked = true;
    this.isOwnClicked = false;
    this.isBundleClicked = false;
    this.UpdatingTabs();
    this.UpdateRentPrice();
    this._deviceDataService.publishPhoneNo(null);
    this._deviceDataService.publishNumberType(null);
    this._deviceDataService.publishEasyPhoneTabsClicked(null);
    this._deviceDataService.publishDeviceUpfront(null);
    this._deviceDataService.publishPlanUpfront(null);
    if (localStorage && localStorage.getItem("SelectedPlanDetailsInDevice") &&
      localStorage.getItem("SelectedPlanDetailsInDevice") !== 'undefined') {
      this.SelectedPlanDetails = undefined;
      this.data.choose_plan.forEach(elementPlan => {
        elementPlan.tabData.forEach(plan => {
          if (plan.sku === this.data.basic_details.default_easyphone_plan_sku) {
            this.SelectedPlanDetails = plan;
          }
        });
      });
      if (!this.SelectedPlanDetails) {
        this.SelectedPlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetailsInDevice"));
      }
      let planExists;
      let lastPlan;
      if (this.DeviceDetailsRentResponse && this.DeviceDetailsRentResponse.length > 0) {
        if (this.rentLowestPricePlan) {
          lastPlan = this.rentLowestPricePlan;
        } else {
          lastPlan = (this.DeviceDetailsRentResponse.slice(-1))[0];
        }
        this.DeviceDetailsRentResponse.forEach(eachPlan => {
          if (eachPlan.sku === this.SelectedPlanDetails.sku) {
            planExists = eachPlan;
          }
        });
      }
      if (planExists) {
        this.SelectPlan(
          this.SelectedPlanDetails.name,
          this.SelectedPlanDetails.sku,
          this.SelectedPlanDetails.monthlyPlan,
          this.SelectedPlanDetails, this.index, null);
      } else if (lastPlan) {
        this.SelectPlan(
          lastPlan.name,
          lastPlan.sku,
          lastPlan.monthlyPlan,
          lastPlan, this.index, null);
      }
    } else {
      let plan;
      if (this.DeviceDetailsRentResponse && this.DeviceDetailsRentResponse.length > 0) {
        if (this.rentLowestPricePlan) {
          plan = this.rentLowestPricePlan;
        } else {
          plan = (this.DeviceDetailsRentResponse.slice(-1))[0];
        }
        if (this.isProjectStar) {
          const default_plan = this.DeviceDetailsRentResponse.find(p => {
            return this.data.basic_details.default_plan_sku == p.sku;
          });
          if (default_plan) {
            plan = default_plan;
          } else {
            plan = this.DeviceDetailsRentResponse[0];
          }
        }
      }
      if (plan && !plan.isXpax) {
        this.SelectPlan(
          plan.PlanName,
          plan.sku,
          plan.PlanMonthlyPay,
          plan, this.index, null);
      }
    }
    this.GetPlanFromQueryParaams();
  }

  OwnClicked() {
    this.isRentClicked = false;
    this.isOwnClicked = true;
    this.isBundleClicked = false;
    this.UpdatingTabs();
    this.UpdateOwnPrice();
    this._deviceDataService.publishPhoneNo(null);
    this._deviceDataService.publishNumberType(null);
    this._deviceDataService.publishEasyPhoneTabsClicked(null);
    this._deviceDataService.publishDeviceUpfront(null);
    this._deviceDataService.publishPlanUpfront(null);
    if (localStorage && localStorage.getItem("SelectedPlanDetailsInDevice") &&
      localStorage.getItem("SelectedPlanDetailsInDevice") !== 'undefined') {
      this.SelectedPlanDetails = undefined;
      this.data.choose_plan.forEach(elementPlanInfo => {
        elementPlanInfo.tabData.forEach(planInfo => {
          if (planInfo.sku === this.data.basic_details.default_easyphone_plan_sku) {
            this.SelectedPlanDetails = planInfo;
          }
        });
      });
      if (!this.SelectedPlanDetails) {
        this.SelectedPlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetailsInDevice"));
      }
      let planExists;
      let lastPlan;
      if (this.DeviceDetailsOwnResponse && this.DeviceDetailsOwnResponse.length > 0) {
        if (this.ownLowestPricePlan) {
          lastPlan = this.ownLowestPricePlan;
        } else {
          lastPlan = (this.DeviceDetailsOwnResponse.slice(-1))[0];
        }
        this.DeviceDetailsOwnResponse.forEach(plan => {
          if (plan.sku === this.SelectedPlanDetails.sku) {
            planExists = plan;
          }
        });
      }
      if (planExists) {
        this.SelectPlan(
          this.SelectedPlanDetails.name,
          this.SelectedPlanDetails.sku,
          this.SelectedPlanDetails.monthlyPlan,
          this.SelectedPlanDetails, this.index, null);
      } else if (lastPlan) {
        this.SelectPlan(
          lastPlan.name,
          lastPlan.sku,
          lastPlan.monthlyPlan,
          lastPlan, this.index, null);
      }
    } else {
      let plan;
      if (this.DeviceDetailsOwnResponse && this.DeviceDetailsOwnResponse.length > 0) {
        if (this.ownLowestPricePlan) {
          plan = this.ownLowestPricePlan;
        } else {
          plan = (this.DeviceDetailsOwnResponse.slice(-1))[0];
        }
        if (this.isProjectStar) {
          const default_plan = this.DeviceDetailsOwnResponse.find(p => {
            return this.data.basic_details.default_plan_sku == p.sku;
          });
          if (default_plan) {
            plan = default_plan;
          } else {
            plan = this.DeviceDetailsOwnResponse[0];
          }
        }
      }
      if (plan && !plan.isXpax) {
        this.SelectPlan(
          plan.PlanName,
          plan.sku,
          plan.PlanMonthlyPay,
          plan, this.index, null);
      }
    }
    this.GetPlanFromQueryParaams();
  }

  BundleClicked() {
    this.isRentClicked = false;
    this.isOwnClicked = false;
    this.isBundleClicked = true;
    this.UpdatingTabs();
    this.UpdateBundlePrice();
    this.UpdateUpfrontPrice();
    if (this.data && this.data.basic_details && (!this.data.basic_details.editProduct || this.data.basic_details.editProduct === null)) {
      if (typeof window !== 'undefined' && localStorage && localStorage.getItem("SelectedPlanDetailsInDevice") &&
        localStorage.getItem("SelectedPlanDetailsInDevice") !== 'undefined') {
        this.SelectedPlanDetails = undefined;
        this.data.choose_plan.forEach(elementPlan => {
          elementPlan.tabData.forEach(plan => {
            if (plan.sku === this.data.basic_details.default_plan_sku) {
              this.SelectedPlanDetails = plan;
            }
          });
        });
        if (!this.SelectedPlanDetails) {
          this.SelectedPlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetailsInDevice"));
        }
        if (this.SelectedPlanDetails) {
          this.SelectPlan(
            this.SelectedPlanDetails.name,
            this.SelectedPlanDetails.sku,
            this.SelectedPlanDetails.monthlyPlan,
            this.SelectedPlanDetails, this.index, null);
        }
      }
    }
    this.GetPlanFromQueryParaams();
  }

  UpdateOwnData(ownData: any) {
    for (let i = 0; i < ownData.length; i++) {
      const planType = Object.keys(ownData[i]);
      const planValue = Object.keys(ownData[i]).map(function (e) {
        return ownData[i][e];
      });
      const currentplanType = planType[0];
      const currentPlanValue = planValue[0];
      for (let j = 0; j < this.DeviceDetailsOwnResponse.length; j++) {
        if (currentplanType === this.DeviceDetailsOwnResponse[j].sku) {
          this.DeviceDetailsOwnResponse[j].ownData = currentPlanValue;
          this.DeviceDetailsOwnResponse[j].totalAmountWithOwn =
            Number(currentPlanValue) + Number(this.DeviceDetailsOwnResponse[j].PlanMonthlyPay);
        }
      }
    }
  }

  UpdateRentData(rentData: any) {
    for (let i = 0; i < rentData.length; i++) {
      const planType = Object.keys(rentData[i]);
      const planValue = Object.keys(rentData[i]).map(function (e) {
        return rentData[i][e];
      });
      const currentplanType = planType[0];
      const currentPlanValue = planValue[0];
      for (let j = 0; j < this.DeviceDetailsRentResponse.length; j++) {
        if (currentplanType === this.DeviceDetailsRentResponse[j].sku) {
          this.DeviceDetailsRentResponse[j].rentData = currentPlanValue;
          this.DeviceDetailsRentResponse[j].totalAmountWithRent =
            Number(currentPlanValue) + Number(this.DeviceDetailsRentResponse[j].PlanMonthlyPay);
        }
      }
    }
  }

  UpdateBundleData(bundleData: any) {
    for (let i = 0; i < bundleData.length; i++) {
      const currentplanType = bundleData[i].key;
      const currentPlanValue = bundleData[i].value;
      for (let j = 0; j < this.DeviceDetailsBundleResponse.length; j++) {
        if (currentplanType === this.DeviceDetailsBundleResponse[j].sku) {
          this.DeviceDetailsBundleResponse[j].bundleData = currentPlanValue;
        }
      }
    }
  }
  UpdateUpfrontData(upfrontData: any) {
    for (let i = 0; i < upfrontData.length; i++) {
      const currentplanType = upfrontData[i].key;
      const currentPlanValue = upfrontData[i].value;
      for (let j = 0; j < this.DeviceDetailsBundleResponse.length; j++) {
        if (currentplanType === this.DeviceDetailsBundleResponse[j].sku) {
          this.DeviceDetailsBundleResponse[j].bundleUpfrontData = currentPlanValue;
        }
      }
    }
  }

  UpdateRentPrice() {
    if (localStorage && localStorage.getItem("PlanSkuSelected")) {
      const selectedPlan = localStorage.getItem("PlanSkuSelected");
      for (let i = 0; i < this.DeviceDetailsRentResponse.length; i++) {
        if (selectedPlan === this.DeviceDetailsRentResponse[i].sku) {
          let monthlyPay = this.DeviceDetailsRentResponse[i].PlanMonthlyPay;
          if(this.isProjectStar){
            monthlyPay = +monthlyPay + (+this.selectedBasePlan.monthlyPlan);
          }
          localStorage.setItem("rentPrice", JSON.stringify(this.easyPhoneDevicePrice));
          localStorage.setItem("rentMonthlyPay", JSON.stringify(monthlyPay));
          this._deviceDataService.publishRentPrice(this.easyPhoneDevicePrice);
          this._deviceDataService.publishRentMonthlyPay(monthlyPay);
        }
      }
    }
  }

  UpdateOwnPrice() {
    if (localStorage && localStorage.getItem("PlanSkuSelected")) {
      const selectedPlan = localStorage.getItem("PlanSkuSelected");
      for (let i = 0; i < this.DeviceDetailsOwnResponse.length; i++) {
        if (selectedPlan === this.DeviceDetailsOwnResponse[i].sku) {
          let monthlyPay = this.DeviceDetailsOwnResponse[i].PlanMonthlyPay;
          if (this.isProjectStar) {
            monthlyPay = +monthlyPay + (+this.selectedBasePlan.monthlyPlan);
          }
          localStorage.setItem("ownPrice", JSON.stringify(this.easyPhoneDevicePrice));
          localStorage.setItem("ownMonthlyPay", JSON.stringify(monthlyPay));
          this._deviceDataService.publishOwnPrice(this.easyPhoneDevicePrice);
          this._deviceDataService.publishOwnMonthlyPay(monthlyPay);
        }
      }
    }
  }

  UpdateBundlePrice() {
    if (localStorage && localStorage.getItem("PlanSkuSelected")) {
      const selectedPlan = localStorage.getItem("PlanSkuSelected");
      for (let i = 0; i < this.DeviceDetailsBundleResponse.length; i++) {
        if (selectedPlan === this.DeviceDetailsBundleResponse[i].sku) {
          let monthlyPay = this.DeviceDetailsBundleResponse[i].bundleData;
          if(this.isProjectStar){
            try {
              monthlyPay = +monthlyPay + (+this.selectedBasePlan.monthlyPlan);
            } catch (_error) {
              
            }
          }
          localStorage.setItem("bundlePrice", JSON.stringify(monthlyPay));
          this._deviceDataService.publishBundlePrice(monthlyPay);
        }
      }
    }
  }

  UpdateUpfrontPrice() {
    if (localStorage && localStorage.getItem("PlanSkuSelected")) {
      const selectedPlan = localStorage.getItem("PlanSkuSelected");
      for (let i = 0; i < this.DeviceDetailsBundleResponse.length; i++) {
        if (selectedPlan === this.DeviceDetailsBundleResponse[i].sku) {
          this._deviceDataService.publishBundleUpfrontPrice(this.DeviceDetailsBundleResponse[i].bundleUpfrontData);
          localStorage.setItem("bundleUpfrontPrice", JSON.stringify(this.DeviceDetailsBundleResponse[i].bundleUpfrontData));
          if (this.suppLinesDetails && this.suppLinesDetails.length > 0) {
            this._deviceDataService.publishSupplimentaryLines(this.suppLinesDetails);
          }
        }
      }
    }
  }

  UpdatingTabs() {
    if (typeof window !== 'undefined' && localStorage) {
      if (this.isProjectStar &&
        (this.isRentClicked || this.isOwnClicked || this.isBundleClicked)) {
        this.selectBasePlan(this.basePlans[0]);
      }else{
        this.selectBasePlan(null);
      }
      this._deviceDataService.publishRentClicked(this.isRentClicked);
      localStorage.setItem("isRentClicked", JSON.stringify(this.isRentClicked));
      this._deviceDataService.publishOwnClicked(this.isOwnClicked);
      localStorage.setItem("isOwnClicked", JSON.stringify(this.isOwnClicked));
      this._deviceDataService.publishEasyPhone(this.isEasyPhone);
      localStorage.setItem("isEasyPhone", JSON.stringify(this.isEasyPhone));
      this._deviceDataService.publishBundleClicked(this.isBundleClicked);
      localStorage.setItem("isBundleClicked", JSON.stringify(this.isBundleClicked));
    }
  }
  public UpdatePriceWithSubsidy(data) {
    if (data && data !== "PrincipleLineOnly") {
      if (this.saleablePlanArray) {
        this.totalSubsidyAmount = 0;
        for (let i = 1; i <= data; i++) {
          this.totalSubsidyAmount += Number(this.saleablePlanArray.prices[i].subsidy);
        }
        this.devicePriceWithSubsidy = (Number(this.saleablePlanArray.prices[data].device_price));
      }
    }
  }
  public getSubsidyAmountofSelectedPlan(supplementaryData: any) {
    if (supplementaryData) {
      if ((this.selectedProd && this.selectedProd.selectedPlanDetails && this.selectedProd.selectedPlanDetails.PlanName)
        || this.selectedPlanName) {
        supplementaryData.forEach(element => {
          if ((this.selectedProd && this.selectedProd.selectedPlanDetails &&
            element.name === this.selectedProd.selectedPlanDetails.PlanName)
            || element.name === this.selectedPlanName) {
            this.subsidyAmount = element.subsidy;
          }
        });
      }
    }
  }
  public validateAllowedLines() {
    if ((localStorage.getItem("MyMsIsdn") || sessionStorage.getItem("USER_TYPE")) &&
      (sessionStorage.getItem("UserInfo") || sessionStorage.getItem("GuestInfo"))
      && sessionStorage.getItem("UserToken")) {
      if (localStorage.getItem("suppLinesDetailsOfUser")) {
        const suppLinesDetailsOfUser = JSON.parse(localStorage.getItem("suppLinesDetailsOfUser"));
        this.noOfLinesAllowed = suppLinesDetailsOfUser.maxPostpaidLinesRemaining;
        this.isLogin = true;
        if (localStorage.getItem("supplementryFlow") && !localStorage.getItem("SupplementaryLinesEditingFromCart") &&
          suppLinesDetailsOfUser.message === "Maximum limit reached") {
          this.noOflinesAdded = this.noOfLinesAllowed;
        }
      }
    }
  }

  public getDataToShow(rent: boolean): Array<any> {
    if (this.DevicePagePurachaseTypeCLicked === 'Easyphone') {
      if (rent) {
        return this.DeviceDetailsRentResponse;
      } else {
        return this.DeviceDetailsOwnResponse;
      }
    } else {
      return this.DeviceDetailsBundleResponse;
    }
  }

  getCurrentProductData() {
    if (this.data && this.data.associated_product) {
      this.getColorStorage();
      const selectedColor = this.selectedColor;
      const selectedMemory = this.selectedStorage;
      const currentProduct = this.data.associated_product.find(product => {
        return product.color == selectedColor && product.memory == selectedMemory;
      });
      return currentProduct;
    }
    return null;
  }

  public getDevicePrice(plan_sku: string): number {
    const currentProduct = this.getCurrentProductData();
    if (currentProduct) {
      const saleable_plan = currentProduct.saleable_plans.find(plan => {
        return plan.sku == plan_sku;
      });
      return +saleable_plan.prices[0].device_price;
    }
    return 0;
  }

  getSelectedPlanObj(): any{
    let plan = null;
    if (this.isBundleClicked) {
      plan = this.DeviceDetailsBundleResponse.find(resp => resp.sku == this.selectedPlan);
    } else if (this.isRentClicked){
      plan = this.DeviceDetailsRentResponse.find(resp => resp.sku == this.selectedPlan);
    } else if (this.isOwnClicked){
      plan = this.DeviceDetailsOwnResponse.find(resp => resp.sku == this.selectedPlan);
    }
    return plan;
  }

  calculateMonthlyPrice() {
    const isEasyPhone = this.isRentClicked || this.isOwnClicked;
    const basePlan = this.selectedBasePlan;
    let totalGB = 0;
    let totalPrice = 0;
    if (basePlan) {
      if (basePlan.data_limit) {
        totalGB += +basePlan.data_limit;
      }
      if (basePlan.monthlyPlan) {
        totalPrice += +basePlan.monthlyPlan;
      }
    }
    if (this.selectedPlan) {
      const plan = this.getSelectedPlanObj();
      if (plan) {
        if (plan['data_limit']) {
          totalGB += +plan.data_limit;
        }
        if (plan['offer']) {
          this.selectedPassOfferTitle = plan['selected_offer_title'];
        }
        if (plan['monthlyPlan']) {
          totalPrice += +plan['monthlyPlan'];
          if (isEasyPhone) {
            totalPrice += +this.easyPhoneDevicePrice;
          }
        }
      }
    }
    this.totalDataLimit = totalGB;
    sessionStorage.setItem("dataLimit",`${this.totalDataLimit}`);
    this.totalPlanMonthly = totalPrice;
  }

  sortPlans() {
    if (this.isProjectStar) {
      this.DeviceDetailsBundleResponse.sort((a, b) => {
        return +a['monthlyPlan'] < +b['monthlyPlan'] ? 1 : -1;
      });
      this.DeviceDetailsRentResponse.sort((a, b) => {
        return +a['monthlyPlan'] < +b['monthlyPlan'] ? 1 : -1;
      });
      this.DeviceDetailsOwnResponse.sort((a, b) => {
        return +a['monthlyPlan'] < +b['monthlyPlan'] ? 1 : -1;
      });
    }
  }
  getNoOfLinesLimit(suppObj: any) {
    this.maxLineArray = [];
    suppObj.forEach(plan => {
      this.maxLineArray.push({sku: plan.sku, maxLines: plan.max_line});
    });
  }
  SelectPlan2(plan) {
    this._plansService.selectPlan(plan);
  }
  
  OnContractTabSelected(item) {
    this._plansService.selectContract(item);
    this._deviceDataService.publishRentPrice(this.easyPhoneDevicePrice);
    this._deviceDataService.publishOwnPrice(this.easyPhoneDevicePrice);
  }

  isContractAvailable(period, available_contracts){
    let available = false;
    if (available_contracts) {
      available = Object.keys(available_contracts).includes(period);
    }
    if (period == '24') {
      available = true;
    }
    return available;
  }

  getDevicePriceFromContract(period, sku, device_prices){
    if (device_prices) {
      return device_prices[sku]?.[period];
    }
    return false;
  }

  calculateTotalPay(...args){
    return args.reduce((a, b) => a + (Number(b) || 0), 0);
  }

  planIdentifierSelection(planIdentifier: string) {
    let plan = this.getPlan(planIdentifier);
    if (plan) {
      this.SelectPlan(plan.PlanName, plan.sku, plan.PlanMonthlyPay, plan, this.index, null);
    } else {
      return;
    }
    this.selectedPlanIdentifier = planIdentifier;
  }

  getPlan(planIdentifier) {
    let plan;
    if (this.DevicePagePurachaseTypeCLicked === 'Easyphone') {
      if (this.isRentClicked) {
        plan = this.DeviceDetailsRentResponse.find(item => item.basePlanIdentifier === planIdentifier);
      } else {
        plan = this.DeviceDetailsOwnResponse.find(item => item.basePlanIdentifier === planIdentifier);
      }
    } else {
      plan = this.DeviceDetailsBundleResponse.find(item => item.basePlanIdentifier === planIdentifier);
    }
    return plan;
  }

}
