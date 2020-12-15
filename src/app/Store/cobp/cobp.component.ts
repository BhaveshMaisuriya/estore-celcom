import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { AppWidgetComponent } from "../../Model/app.widget.component";
import { BaseComponent } from "../../base.component";
import { ContentNavigation } from "../../Model/contentnavigation.model";
import { ActivatedRoute, Router } from "@angular/router";
import { RedirectionService } from "../../Service/redirection.service";
import { AppService } from "../../Service/app.service";
import { DeviceDataService, iBasePlan } from '../../Service/devicedata.service';
import { UpgradePlanRequestModel } from "../../../app/Model/upgradeplan.requestparameter.model";
import { UpgradePlanResponse } from "../../../app/Model/upgradeplan.response.model";
import { CobpService } from "../cobp/cobp.service";
import { Subscription, Observable } from "rxjs";
import { DeviceDetailsPlanComponent } from "../../Widget/StoreWidgets/device-details/device-details-plans-section/device-details-plans-section.component";
import { DeviceDetailsPlanService } from "../../Widget/StoreWidgets/device-details/device-details-plans-section/device-details-plans-section.service";
import { EStoreAnalysticsService } from '../../Service/store.analytic.service';
import { DomSanitizer } from "@angular/platform-browser";
import { PlanTableComparisionService } from '../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.service';

import { ProductService } from '../../Service/product.service';
import { TypeofPurchaseService } from '../../Service/type-of-purchase.service';
import { finalize } from 'rxjs/operators';
import { GlobalErrorHandler } from '../../interceptors/error.interceptor';
import { getCOBPErrorFromResponse, isNullOrUndefined } from '../../shared/utilities/helper.ultility';
import { environment } from 'environments/environment';
import { UserService } from 'app/Service/user.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { iPlan } from '../../shared/models/plan.model';
import { iPlanDevice } from '../../shared/models/device.model';

@Component({
  selector: 'app-cobp',
  templateUrl: './cobp.component.html',
  styleUrls: ['./cobp.component.css'],
  providers: [RedirectionService, CobpService, DeviceDetailsPlanComponent, DeviceDetailsPlanService]
})
export class CobpComponent extends BaseComponent
  implements AppWidgetComponent, OnInit {
  @Input() data: any;
  @Input() noteDataCMS: any;
  @Output() cobpEligibilityCheckBundle = new EventEmitter();
  @Output() cobpEligibilityCheckPlanPurchase = new EventEmitter();
  public isCurrentPlanStar: any;
  public msisdn: any;
  public isEligible: any = null;
  public keepCelcomNumObj: any = null;
  public isPrincipleNumSelected = false;
  public typeOfNumHighlight: string = null;
  public userInfo: any;
  public requestPromoNo: any;
  public requestOldPromoNo: any;
  public keepExistingRequestParams: UpgradePlanRequestModel = new UpgradePlanRequestModel();
  public keepExistingRequestParamsEasyphone: UpgradePlanRequestModel = new UpgradePlanRequestModel();
  public customerType: any = 1;
  public blackListedSystem: string = environment.blackListedSystem;
  public loading: boolean;
  public apiFailure = false;
  public infoMNPflow: any = null;
  public easyphoneError = false;
  public easyphoneFlowMsg: any = null;
  public eligibilityResponse: any;
  public exceptionCheck: any;
  public eligibleCheck: any;
  public contractLengthYears: any;
  public contractLengthMonths: any;
  public endDate: any;
  public isEligibleMessages: any;
  public isChecked = false;
  public planInEligibleResponse: any;
  public cobpContract = false;
  public typeOfNumber: string = null;
  public isEasyPhone = false;
  public guestFlow = false;
  public orderOneTimePay: any;
  public orderDevicePrice: any;
  public postOrPreType: string;
  public purchaseTypeTab: any;
  public colorStorageChanged = false;
  starElgibilityError = false;
  moonElgibilityError = false;
  showNRICBlock = false;
  customerSubscribingTo:any;
  customerSubscribingFor:any;
  basePlan$: Observable<iBasePlan>;
  plan$: Observable<iPlan>;
  public pageType: any;
  pageBlock:string = "msisdnblock"

  public eligibilityObj = {
    isEligibleMessages: [],
    isEligible: false,
    isException: false,
    noOfYears: 0,
    noOfMonths: 0,
    enddate: ''
  };
  public userLessThanSixMonths = true;
  public goldenpenaltymessage = null;
  public selectedPassDetails: any;
  public selectedDeviceDetails: any;
  public selectedDeviceDetailsInfoObject: any = {};
  public selectedPassDetailsInfoObject: any = {};
  public selectedBasePlanInfoObject: any = {};
  public chooseNumPlanCommunication = new DeviceDetailsPlanComponent(
    this.devicedetailsplanService,
    this._router,
    this._activatedRoute,
    this._redirectionService,
    this._deviceDataService,
    this._estoreAnalyticsService,
    this._plantableComparisonservice,
    this._renderer,
    this.sanitizer,
    null,
    this._userService,
    null);
  private subscriber: Subscription;
  selectedProductSku: any;
  public isCurrentMoonPlan = false;
  public deviceUpfrontPenalty;
  public eligibleContractExtend = false;
  newExtensionDate: any = "";
  contractExtendedSelected = 'true';
  contractExtendedWithOrWithOutPenalty = false;
  public isMoon = false;
  device$: Observable<iPlanDevice>;
  showMsisdnBlock = false;
  enableNRICAuthentication =false;
  upfrontPayment$: Observable<number>;
  isDevicecheck:any;
  isInternallyBlacklisted: boolean;
  constructor(
    private _deviceDataService: DeviceDataService,
    private _globalErrorHandler: GlobalErrorHandler,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _service: AppService,
    private _cobpService: CobpService,
    private devicedetailsplanService: DeviceDetailsPlanService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _plantableComparisonservice: PlanTableComparisionService,
    private sanitizer: DomSanitizer,
    private _renderer: Renderer2,
    private _productService: ProductService,
    private topService: TypeofPurchaseService,
    private _userService: UserService,
    private _planQuery: PlansQuery

  ) {
    super();
  }

  ngOnInit() {
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.apiFailure = data)
    );
    this.subscriber = this._deviceDataService.sharedPurchaseTypeTab$.subscribe(
      data => this.purchaseTypeTab = data
    );
    this.subscriber = this._deviceDataService.colorStorageChange$.subscribe(
      data => this.colorStorageChanged = data
    );
    this._planQuery.isEasyPhone$.subscribe(data =>{
      this.isEasyPhone = data;
    });

    this.device$ = this._planQuery.select(store => store.device);
    this.device$.subscribe((data)=>{
    this.isDevicecheck = data}
    );

    this.basePlan$ = this._planQuery.select(store => store.base_plan);

    this.plan$ = this._planQuery.select(store => store.plan);

    this.upfrontPayment$ = this._planQuery.select(store => store.upfront_payment);

    this.pageType = 'cobpInLine';

    this.Init();


  }

  private Init() {
    this.typeOfNumber = 'EXISTING_NUMBER';
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem("Principal_Number");
    }
    if (localStorage && localStorage.getItem("Eligible")) {
      localStorage.removeItem("Eligible");
    }

    // Resetting the value to hide the section until the Eligibility check is done again.
    this.isEligible = null;
    if (typeof window !== 'undefined' && localStorage && sessionStorage) {
      if (
        localStorage.getItem("MyMsIsdn") &&
        sessionStorage.getItem("UserInfo") &&
        sessionStorage.getItem("UserToken")
      ) {
        this.msisdn = JSON.parse(localStorage.getItem("MyMsIsdn"));
        this.KeepNumber(this.msisdn);
      } else {
        if (
          localStorage.getItem("DeviceSku") &&
          localStorage.getItem("SelectedPlan") &&
          localStorage.getItem("SelectedPlanDetails")
        ) {
          const bundlePlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
          this.keepCelcomNumObj = {};
          this.keepCelcomNumObj.color = localStorage.getItem("selectedColor");
          this.keepCelcomNumObj.storage = localStorage.getItem("selectedStorage");
          this.keepCelcomNumObj.sku = localStorage.getItem("DeviceSku");
          this.keepCelcomNumObj.planSku = localStorage.getItem("SelectedPlan");
          this.keepCelcomNumObj.planDetails = bundlePlanDetails;
          this.keepCelcomNumObj.monthlyPay = bundlePlanDetails.PlanMonthlyPay; // localStorage.getItem("SelectedMonthlyPay");
          this.keepCelcomNumObj.planName = bundlePlanDetails.PlanName; // localStorage.getItem("SelectedPlanName");
          if (this.data && this.data.basic_details && this.data.basic_details.preorder) {
            this.keepCelcomNumObj.preOrder = this.data.basic_details.preorder;
          }
          if (sessionStorage.getItem("USER_TYPE") && ['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE"))) {
            // Handling it for Mobile Connect user
          } else {
            this.removeLocalStorage();
          }
          localStorage.setItem("keepCelcomNum", JSON.stringify(this.keepCelcomNumObj));
        } else {
          if (
            localStorage.getItem("SelectedPlan") &&
            localStorage.getItem("SelectedPlanDetails") &&
            localStorage.getItem("PSku")
          ) {
            const planOnlyPlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
            this.data.chosenPlan = {};
            this.data.chosenPlan.planSku = localStorage.getItem("SelectedPlan");
            this.data.chosenPlan.planDetails = planOnlyPlanDetails; // JSON.parse(localStorage.getItem("SelectedPlanDetails"));
            this.data.chosenPlan.monthlyPay = planOnlyPlanDetails.PlanMonthlyPay; // localStorage.getItem("SelectedMonthlyPay");
            this.data.chosenPlan.planName = planOnlyPlanDetails.PlanName; // localStorage.getItem("SelectedPlanName");
            if (sessionStorage && sessionStorage.getItem("USER_TYPE") && ['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE"))) {
              // Handling it for Mobile Connect user
            } else {
              this.removeLocalStorage();
            }
            localStorage.setItem("chosenPlan", JSON.stringify(this.data.chosenPlan));
          }
        }
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("COBP_login", "YES");
        }
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("COBP_login_Check", "YES");
        }
        if (sessionStorage && sessionStorage.getItem("USER_TYPE") && ['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE"))) {
          this.typeOfNumHighlight = "EXISTING_NUMBER";
          this._deviceDataService.publishPhoneNo(null);
          this.topService.selectMobileNumber(null);
          this.guestFlow = true;
          this.easyphoneError = true;
          this.easyphoneFlowMsg = "Sorry, the mobile number keyed in is not eligible for this subscription.";
          this._deviceDataService.publishNumberType("KeepNumber");
          if (localStorage && localStorage.getItem("keepCelcomNum")) {
            localStorage.removeItem("keepCelcomNum");
          }
          if (this.easyphoneError) {
            this._globalErrorHandler.errorObjectConvert(this.easyphoneFlowMsg);
          }
        } else {
          this._router.navigateByUrl("/store/login");
        }
      }
    }
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("COBP_FLOW", "YES");
    }
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("COBP_FLOW_CHECK", "YES");
    }
    this.isPrincipleNumSelected = false;
    this._deviceDataService.publishPrincipalLine(this.isPrincipleNumSelected);
    this._deviceDataService.publishAddToCartEnabling(true);

    this.subscriber = this._deviceDataService.sharedOneTimePay$.subscribe(data => {
      this.orderOneTimePay = data;
    });

    this.subscriber = this._deviceDataService.sharedDevicePrice$.subscribe(data => this.orderDevicePrice = data);
    this.subscriber = this._deviceDataService.productSkuToPublish$.subscribe(data => this.selectedProductSku = data);
    this.subscriber = this._deviceDataService.selectedAddonPassDetails$.subscribe(addOn => {
      this.selectedPassDetailsInfoObject = (addOn === null) ? null : addOn;
    });
    this.subscriber = this._deviceDataService.sharedMoonSelectedProductDetails$.subscribe(data => {
    this.selectedDeviceDetailsInfoObject = (data === null) ? null : data;
    });
    this.subscriber = this._deviceDataService.basePlanMoon$.subscribe(basePlan => {
    this.selectedBasePlanInfoObject = (basePlan === null) ? null : basePlan;
    });
    if (this.easyphoneFlowMsg) {
      this._globalErrorHandler.errorObjectConvert(this.easyphoneFlowMsg);
    }

    this.isInternallyBlacklisted = false;
  }

  public errorForCOBP(error) {
    this.loading = false;
    this._deviceDataService.publishCobpLoading(false);
    this.eligibleCheck = false;
    this.apiFailure = true;
    if (error.status === 401 && error.statusText === "Unauthorized") {
      this.infoMNPflow = {};
      this.infoMNPflow.content = 'Your session has expired. Please login to continue browsing.';
    } else if (error.message) {
      this.infoMNPflow = {
        ...this.infoMNPflow,
        content: error.message
      };
    } else {
      this.infoMNPflow = {};
      this.infoMNPflow.content = this.errorConst.SYS_DOWN_MSG;
    }
    if (this.data && this.data.plan_title) {
      this.data.cobpEligible = false;
      this.cobpEligibilityCheckPlanPurchase.emit(this.data);
    } else {
      this.data.eligibility = false;
      this.cobpEligibilityCheckBundle.emit(this.data);
    }
    if (this.infoMNPflow.content) {
      this._globalErrorHandler.errorObjectConvert(this.infoMNPflow.content);
    }
    localStorage.removeItem("COBP_login");
    localStorage.removeItem("COBP_login_Check");
  }

  public checkPenalty(response) {
    if (response[0].penaltyCheck.endDate !== '' && response[0].penaltyCheck.endDate !== null) {
      const yearMonthArray = this.getYearAndMonth(response[0].penaltyCheck.endDate.split("_")[0]);
      this.eligibilityObj.noOfYears = yearMonthArray[0];
      this.eligibilityObj.noOfMonths = yearMonthArray[1];
      this.deviceUpfrontPenalty = Number(response[0].penaltyCheck.device_upfront_penalty);
      this._deviceDataService.publishdeviceUpfrontPenalty(this.deviceUpfrontPenalty);
    }
    if (response[0] && response[0].golden_number_note && !response[0].golden_number_note.status) {
      this.goldenpenaltymessage = response[0].golden_number_note.message;
    }
    if (response[0]) {
      if (response[0].penaltyCheck && response[0].penaltyCheck.eligible_contract_extend !== undefined) {
        this.contractExtended(response[0].penaltyCheck.eligible_contract_extend, response[0]);
        if (localStorage && localStorage.getItem("cart")) {
          const cart: any = JSON.parse(localStorage.getItem("cart"));
          if (cart && cart.items && cart.items[0] && cart.items[0].cobpDeviceUpfrontPenalty) {
            this.contractExtendedSelected = cart.items[0].cobpDeviceUpfrontPenalty === "0.00" ? 'true' : 'false';
            this.contractExtended(this.contractExtendedSelected);
          }
        }
      }
      if (response[0].penaltyCheck.new_extension_date) {
        this.newExtensionDate = response[0].penaltyCheck.new_extension_date;
      }
    }
  }

  public checkContractParams(response) {
    this.loading = false;
    this.eligibilityResponse = response;
    this.exceptionCheck = this.eligibilityObj.isException;
    this.eligibleCheck = this.eligibilityObj.isEligible;
    this.contractLengthYears = this.eligibilityObj.noOfYears;
    this.contractLengthMonths = this.eligibilityObj.noOfMonths;
    this.endDate = this.eligibilityObj.enddate;
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('ContractEndDate', JSON.stringify(this.endDate));
    }
    this.isEligibleMessages = this.eligibilityObj.isEligibleMessages;

  }

  public setDisclaimer(res?) {
    if (typeof window !== 'undefined' && localStorage
      && (res && res.penaltyCheck && (res.penaltyCheck.eligible_contract_extend !== undefined
        || res.penaltyCheck.eligible_contract_extend === null))) {
      if (localStorage.getItem("ContractEndDate") !== 'null') {
        this._deviceDataService.publishDisclaimerAgree(true);
      }
    }
  }

  public checkEligibleMessage() {
    this._deviceDataService.publishNumberType("KeepNumber");
    this._deviceDataService.publishPhoneNo(null);
    this.topService.selectMobileNumber(null);
    this.planInEligibleResponse = this.isEligibleMessages;
    this._deviceDataService.publishDisclaimerAgree(false);
  }

  public setOpenOrderStatus(response) {
    this.easyphoneError = true;
    if (response[0].openOrder.message === null || !response[0].openOrder.message) {
      this.easyphoneFlowMsg = "Uh Oh There is an existing order under this mobile number." +
        " Please activate your line by contacting Celcom Careline before proceeding to place a new order.";
    } else {
      this.easyphoneFlowMsg = response[0].openOrder.message;
    }
    if (this.easyphoneFlowMsg) {
      this._globalErrorHandler.errorObjectConvert(this.easyphoneFlowMsg);
    }
  }

  public setPenaltyStatus(response) {
    this.eligibilityObj.isException = true;
    this.easyphoneError = true;
    if (response[0].penaltyCheck.exception) {
      this.easyphoneFlowMsg = response[0].penaltyCheck.message;
    }
  }

  public easyPhoneErrorMsg(planStatus) {
    this.easyphoneError = true;
    if(planStatus === 'samePlan') {
      this.easyphoneFlowMsg = "Uh Oh. Select a different plan than the one you're currently using.";
    } else if(planStatus === 'downgradePlan') {
      this.easyphoneFlowMsg = "Uh Oh. This plan is not available for a downgrade.";
    }
    if (this.easyphoneFlowMsg) {
      this._globalErrorHandler.errorObjectConvert(this.easyphoneFlowMsg);
    }
  }

  public KeepNumber(msisdnNumber: any) {
    let planDetails: any;
    let billingAccountNumber;
    let billingProfIdCOBP;
    let simTypeCOBP = "";
    let customerSinceCOBP;
    let planSku;
    let vipCode = "";
    let deviceSku = "";
    let basePlanSku = "";
    let passSku = "";
    let planTypeCOBP = "";
    this.typeOfNumHighlight = "EXISTING_NUMBER";
    this.isCurrentPlanStar = false;
    this._deviceDataService.publishPhoneNo(null);
    this.topService.selectMobileNumber(null);
    if (!this.data && !this.data.plan_title) {
      this.chooseNumPlanCommunication.getPriceUpdated(this.data);
    }
    if (typeof window !== "undefined" && localStorage) {
      localStorage.removeItem("MNPCustomerData");
      localStorage.removeItem("checkToShowEditEligibilityBox");
      localStorage.removeItem("MNP-CUSTOMER");
      localStorage.removeItem("MNP-PRE-SELECT");
      localStorage.removeItem("Eligible");
      localStorage.removeItem("MNP-FLOW");
    }
    this._deviceDataService.publishNumberType("KeepNumber");
    if (typeof window !== "undefined" && localStorage) {
      if (sessionStorage && sessionStorage.getItem("UserInfo")) {
        this.userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      }
      if (localStorage.getItem("SelectedPlanDetails") && !localStorage.getItem("SelectedPlanDetailsInDevice")) {
        planDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
      } else {
        if (localStorage.getItem("SelectedPlanDetailsInDevice")) {
          planDetails = JSON.parse(localStorage.getItem("SelectedPlanDetailsInDevice"));
        }
      }
      if (planDetails === "null" || !planDetails || planDetails == null) {
        planDetails = JSON.parse(localStorage.getItem("chosenPlan"));
      }
      if ((planDetails === "null" || !planDetails || planDetails == null) && this.data.chosenPlan) {
        planDetails = this.data.chosenPlan;
      }
      if ((planDetails === "null" || !planDetails || planDetails == null) && this.data.planData) {
        planDetails = this.data.planData;
      }
      if (planDetails && (localStorage.getItem("isProjectStar") || planDetails.url_key === "mega")) {
        if (planDetails.base_plan) {
          this.requestPromoNo = planDetails.base_plan[0].order_plan_bundle;
          this.requestOldPromoNo = planDetails.base_plan[0].ngn_part_number;
        }
        else if (planDetails.order_plan_bundle) {
          this.requestPromoNo = planDetails.order_plan_bundle;
          this.requestOldPromoNo = planDetails.ngn_part_number;
        }
        else {
          this.requestPromoNo = planDetails.orderPlanBundle;
          this.requestOldPromoNo = planDetails.ngn_part_number;
        }

      } else if (planDetails && planDetails.plan_part_number && planDetails.ngn_part_number) {
        this.requestPromoNo = planDetails.plan_part_number;
        this.requestOldPromoNo = planDetails.ngn_part_number;
      } else if (planDetails && planDetails.orderPlanBundle) {
        this.requestPromoNo = planDetails.orderPlanBundle;
        this.requestOldPromoNo = planDetails.ngn_part_number;
      } else if (planDetails.order_plan_bundle) {
        this.requestPromoNo = planDetails.order_plan_bundle;
        this.requestOldPromoNo = planDetails.ngn_part_number;
      }
      if (localStorage && localStorage.getItem("selectedColor") &&  localStorage.getItem("selectedStorage")) {
        const color = localStorage.getItem("selectedColor");
        const storage = localStorage.getItem("selectedStorage");
        if (!this.selectedProductSku && this.data && this.data.associated_product &&
          color && storage) {
          this.selectedProductSku = this._productService.getSkuOfDevice(this.data.associated_product,
            color, storage);
        }
       }

      if (planDetails && (localStorage.getItem("isProjectStar") || planDetails.url_key === "mega")) {
        if (planDetails.base_plan) {
          basePlanSku = planDetails.base_plan[0].sku ? planDetails.base_plan[0].sku : '';
          passSku = (planDetails.selectedPass && planDetails.selectedPass.sku) ? planDetails.selectedPass.sku : '';
          planTypeCOBP = (planDetails.selectedPass && planDetails.selectedPass.parent_pass) ? planDetails.selectedPass.parent_pass : "Ultra-GB";
        } else {
          basePlanSku = "Ultra-Base";
          passSku = planDetails.sku;
          planTypeCOBP = "Ultra-GB";
          deviceSku = this.selectedProductSku;
        }
      }
      if (planDetails && planDetails.isMoon) {
        this.isMoon = true;
        basePlanSku = planDetails.sku ? planDetails.sku : '';
        this.selectedBasePlanInfoObject = planDetails;
        if (planDetails.selectedPass) {
          basePlanSku = planDetails.sku ? planDetails.sku : '';
          passSku = planDetails.selectedPass.sku ? planDetails.selectedPass.sku : '';
          this.selectedPassDetailsInfoObject.name = planDetails.selectedPass.name;
          this.selectedPassDetailsInfoObject.sku = planDetails.selectedPass.sku;
          this.selectedPassDetailsInfoObject.dataLimit = planDetails.selectedPass.data_limit;
          this.selectedPassDetailsInfoObject.deviceAllowed = planDetails.selectedPass.device_allowed;
          this.selectedPassDetailsInfoObject.key_figures_text = planDetails.selectedPass.key_figures_text;
          this.selectedPassDetailsInfoObject.key_text = planDetails.selectedPass.key_text;
          this.selectedPassDetailsInfoObject.deviceAllowed = planDetails.selectedPass.device_allowed;

          if (planDetails.selectedDevice) {
            deviceSku = planDetails.selectedDevice.sku ? planDetails.selectedDevice.sku : '';
          }
        }
      if (planDetails.selectedDevice) {
        this.selectedDeviceDetails = planDetails.selectedDevice;
        this.selectedDeviceDetailsInfoObject.name = this.selectedDeviceDetails.name;
        this.selectedDeviceDetailsInfoObject.imagePath = this.selectedDeviceDetails.imagePath;
        this.selectedDeviceDetailsInfoObject.contract = this.selectedDeviceDetails.contract;
        deviceSku = this._productService.getSkuOfDevice(this.selectedDeviceDetails.associated_device_product,
          this.selectedDeviceDetails.SelectedDeviceColor, this.selectedDeviceDetails.selectedDeviceMemory);
        this.selectedDeviceDetailsInfoObject.sku = deviceSku;
      } else {
        this.selectedDeviceDetails = null;
      }
     }
    }
    customerSinceCOBP = this.userInfo.outputCPResp.customerSince;

    this.userInfo?.outputCPResp?.services?.forEach(element => {
      let mobileNumber;
      if (element.mobileNumber.charAt(0) !== "6") {
        mobileNumber = "6" + element.mobileNumber;
      } else {
        mobileNumber = element.mobileNumber;
      }

      mobileNumber = parseInt(mobileNumber, 10);
      if (mobileNumber === msisdnNumber && element.productType !== "Device") {
        billingAccountNumber = element.assetBillingAccountNo;
        billingProfIdCOBP = element.billingProfileId;
        simTypeCOBP = element.pre_Pos_Indicator;
        vipCode = element.vipCode;
        if (element.prodPromPartNum === "PB12828") {
          this.isCurrentMoonPlan = true;
        } else {
          this.isCurrentMoonPlan = false;
        }
      }
    });

    let isEasyPhone = 0;
    if (localStorage && localStorage.getItem("isEasyPhone")) {
      const easyPhone = JSON.parse(localStorage.getItem("isEasyPhone"));
      if (easyPhone) {
        isEasyPhone = 1;
      }
    }
    if (localStorage && localStorage.getItem("isBundleClicked")) {
      const isBundleClicked = JSON.parse(localStorage.getItem("isBundleClicked"));
      if (isBundleClicked) {
        isEasyPhone = 0;
      }
    }
     // Get the selected plan SKU.
     if (localStorage && localStorage.getItem("SelectedPlan")) {
      planSku = localStorage.getItem("SelectedPlan");
   }
    this.keepExistingRequestParams.mobileNumber = msisdnNumber;
    this.keepExistingRequestParams.billingAccountNumber = billingAccountNumber;
    this.keepExistingRequestParams.customerIDNo = this.userInfo.outputCPResp.customerID;
    this.keepExistingRequestParams.customerIDType = this.customerType;
    this.keepExistingRequestParams.system = this.blackListedSystem;
    this.keepExistingRequestParams.promonumb = this.requestPromoNo;
    this.keepExistingRequestParams.oldpromonumb = this.requestOldPromoNo;
    this.keepExistingRequestParams.deviceSku = this.selectedProductSku ? this.selectedProductSku : deviceSku;
    this.keepExistingRequestParams.data = {
      "customer_since": customerSinceCOBP,
      "billing_pro_id": billingProfIdCOBP,
      "sim_type": simTypeCOBP,
      "sku": planSku,
      "vipCode": vipCode,
      "plan_sku": basePlanSku,
      "plan_type": planTypeCOBP,
      "device_sku": deviceSku || '',
      "pass_sku": passSku,
    };
    // this.keepExistingRequestParamsEasyphone.easy_phone = 1;
    if (isEasyPhone === 1) {
      const data = this.keepExistingRequestParams;
      this._deviceDataService.publishCobpLoading(true);
      this.loading = true;
      this._cobpService.ValidateUpgradePlanEasyPhone(data, isEasyPhone).subscribe(
        response => {
          this.topService.updateCOBPResponse(response);
          this.topService.selectMobileNumber(this.msisdn);
          this._deviceDataService.publishRunAutoBillingCheck();
          if (response[0].hasOwnProperty("star_eligibility")) {
            if (localStorage.getItem("isProjectStar") && response[0].star_eligibility && response[0].star_eligibility.response && response[0].star_eligibility.response.is_same) {
              this.isCurrentPlanStar = true;
            }
          }
          if (response[0] && response[0].customer_eligibility) {
            this.customerSubscribingTo = response[0].customer_eligibility.subscribing_to;
            this.customerSubscribingFor = response[0].customer_eligibility.subscribing_for;
          }
          let planSelected;
          // Exception check.
          if (localStorage && sessionStorage.getItem("personalForm") && localStorage.getItem("SelectedPlan")) {
            planSelected = localStorage.getItem("SelectedPlan");
            this.getPlanType();
          }
          if (response[0].validated_id) {
            if (typeof window !== 'undefined' && localStorage) {
              localStorage.setItem("validated_id", response[0].validated_id);
            }
          }
          if (response[0] && response[0].status === false && typeof (response[0].status) !== 'undefined' && response[0].response) {
            this.easyphoneFlowMsg = response[0].response;
            this.easyphoneError = true;
          } else if (response[0].blackList.blacklistIndicator && response[0].blackList.blacklistIndicator === 'Yes') {
            this.easyphoneError = true;
            if (!response[0].blackList.message || response[0].blackList.message === null) {
              this.easyphoneFlowMsg = "Uh Oh. Your ID number is blacklisted.";
            } else {
              this.easyphoneFlowMsg = response[0].blackList.message;
            }
          } else if (response[0].penaltyCheck.exception) {
            this.setPenaltyStatus(response);
          } else if (!response[0].openOrder.status) {
            this.setOpenOrderStatus(response);
          } else if (planSelected === "FB" && this.postOrPreType === "Postpaid") {
            this.easyPhoneErrorMsg('downgradePlan');
          } else if (this.data && this.data.PlanOnlyComponentToShow &&
            (data.promonumb === response[0].penaltyCheck.productPromotionPartNumber ||
            data.oldpromonumb === response[0].penaltyCheck.productPromotionPartNumber) &&
            (response[0].moon_eligibility && response[0].moon_eligibility.is_moon === 0) &&
            !this.isEnterprise
          ) {
              this.isCurrentMoonPlan = false;
              this.easyPhoneErrorMsg('samePlan');
          } else if ((response[0].openOrder && response[0].openOrder.exception) ||
            (response[0].blackList && response[0].blackList.exception) ||
            (response[0].productEligibility && response[0].productEligibility.exception) ||
            !response[0].blackList.status || (response[0].account_validation && !response[0].account_validation.status) ||
            (response[0].contract_check && !response[0].contract_check.status) ||
            (response[0].duration_check && !response[0].duration_check.status) ||
            (response[0].plan_upgrade && !response[0].plan_upgrade.status) ||
            (response[0].customer_eligibility && !response[0].customer_eligibility.status) ||
             (response[0].customer_eligibility && response[0].customer_eligibility.exception) ||
             (response[0].upfront_payment_check && !response[0].upfront_payment_check.status)) {
            this.eligibilityObj.isException = true;
            this.easyphoneError = true;

            if (response[0].blackList.exception) {
              if (this.easyphoneFlowMsg === null) {
                this.easyphoneFlowMsg = response[0].blackList.message;
              }
            }
            if (response[0].openOrder.exception) {
              this.easyphoneFlowMsg = response[0].openOrder.message;
            }
            if (response[0].productEligibility && response[0].productEligibility.exception) {
              if (this.easyphoneFlowMsg === null) {
                this.easyphoneFlowMsg = response[0].productEligibility.message;
              }
            }
            if (!response[0].blackList.status) {
              if (this.easyphoneFlowMsg === null) {
                this.easyphoneFlowMsg = this.errorConst.SYS_DOWN_MSG;
              }
            }
            if (!isNullOrUndefined(response[0].account_validation) && !response[0].account_validation.status) {
              if (this.easyphoneFlowMsg === null) {
                this.easyphoneFlowMsg = response[0].account_validation.message;
              }
            }
            if (!response[0].contract_check.status) {
              if (this.easyphoneFlowMsg === null) {
                this.easyphoneFlowMsg = response[0].contract_check.message;
              }
            }
            if (!isNullOrUndefined(response[0].duration_check) && !response[0].duration_check.status) {
              if (this.easyphoneFlowMsg === null) {
                this.easyphoneFlowMsg = response[0].duration_check.message;
              }
            }
            if (!isNullOrUndefined(response[0].plan_upgrade) && !response[0].plan_upgrade.status) {
              if (this.easyphoneFlowMsg === null) {
                this.easyphoneFlowMsg = response[0].plan_upgrade.message;
              }
            }
            if (!isNullOrUndefined(response[0].upfront_payment_check) && !response[0].upfront_payment_check.status) {
              if (this.easyphoneFlowMsg === null) {
                this.easyphoneFlowMsg = response[0].upfront_payment_check.message;
              }
            }
            if (!response[0].customer_eligibility.status) {
              if (this.easyphoneFlowMsg === null) {
                this.easyphoneFlowMsg = response[0].customerF_eligibility.message;
              }
            }
            if(response[0].hasOwnProperty("star_eligibility")) {
            if (!response[0].star_eligibility.status) {
              this.starElgibilityError=true;
              if (this.easyphoneFlowMsg === null) {
                this.easyphoneFlowMsg = response[0].star_eligibility.message;
              }
            }
            }
          } else if (!response[0].productEligibility.status) {
            this.easyphoneError = true;
            this.easyphoneFlowMsg = response[0].productEligibility.message;
          } else {
            if (response[0].openOrder.status &&
              response[0].blackList.status && (data.promonumb !== response[0].penaltyCheck.productPromotionPartNumber ||
                data.oldpromonumb !== response[0].penaltyCheck.productPromotionPartNumber)) {
              this.eligibilityObj.isEligible = true;
              this.eligibilityObj.enddate = response[0].penaltyCheck.endDate;
              this.checkPenalty(response);
            }
          }
          if (this.typeOfNumHighlight === "EXISTING_NUMBER") {
            this.checkContractParams(response);
            if (this.eligibleCheck) {
              this.isChecked = false;
              this._deviceDataService.publishDisclaimerAgree(false);
              this._deviceDataService.publishPhoneNo(msisdnNumber);
              this.topService.selectMobileNumber(msisdnNumber);
              this._deviceDataService.publishNumberType("KeepNumber");
              if (typeof window !== 'undefined' && localStorage && response[0].duration_check && response[0].duration_check.device) {
                localStorage.setItem("DeviceUpfront", response[0].duration_check.device);
                if(localStorage && (localStorage.getItem("isProjectStar") === "true") && (localStorage.getItem("isEasyPhone") === "true")) {
                  this._deviceDataService.publishDeviceUpfront(response[0]);
                } else {
                  this._deviceDataService.publishDeviceUpfront(response[0].duration_check.device);
                }
              }
              if (typeof window !== 'undefined' && localStorage && response[0].upfront_payment_check &&
               response[0].upfront_payment_check.plan) {
                localStorage.setItem("PlanUpfront", response[0].upfront_payment_check.plan);
                this._deviceDataService.publishPlanUpfront(response[0].upfront_payment_check.plan);
              }
              this.setDisclaimer(response[0]);
            } else if (this.exceptionCheck) { // Exception check.
            } else {
              this.checkEligibleMessage();
              this.topService.selectMobileNumber(this.msisdn);
            }
            this._deviceDataService.publishEligibility(this.eligibleCheck);
            if (this.data && this.data.plan_title) {
              if (sessionStorage && sessionStorage.getItem("UserInfo")) {
                const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
                const customerSince = UserInfo.outputCPResp.customerSince;
                this.userSince(customerSince);
              }
            } else {
              this.data.eligibility = this.eligibleCheck;
              this.cobpEligibilityCheckBundle.emit(this.data);
            }
          }
          localStorage.removeItem("COBP_login");
          if (this.easyphoneError) {
            this._globalErrorHandler.errorObjectConvert(this.easyphoneFlowMsg);
          }
        },
        error => {
          this.errorForCOBP(error);
        }
      );
    } else {
      const data = {
        ...this.keepExistingRequestParams,
        is_campaign_omni: !!this.data?.['campaign_omni'],
      };
      this.loading = true;
      let preOrder = 0;
      this._deviceDataService.publishCobpLoading(true);
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('publishCobpLoading', 'TRUE');
      }
      if (localStorage && localStorage.getItem("isPreOrder") && (JSON.parse(localStorage.getItem("isPreOrder")) === true)) {
        preOrder = 1;
      }
      let device = 0;
      if (window.location.href.indexOf("/device-detail/") > -1 ||
       this.selectedDeviceDetails) {
        device = 1;
      }
      let mviva = 0;
      let promotion = "";
      if (localStorage && localStorage.getItem("isMviva")) {
        if (JSON.parse(localStorage.getItem("isMviva")) === true) {
          mviva = 1;
          if (window.location.href.indexOf("?promotiondetails=") > -1) {
            promotion = (window.location.search).slice(1);
          }
        }
      }
      this._cobpService.ValidateUpgradePlan(data, preOrder, device, mviva, promotion, this.isEasyPhone)
      .pipe(
        finalize(() => {
          // set cobp loading to false after getting api response.
          this.loading = false;
          this._deviceDataService.publishCobpLoading(false);
        })
      ).subscribe(
        response => {
          if(response[0] && response[0].customer_eligibility){

            this.customerSubscribingTo = response[0].customer_eligibility.subscribing_to;
            this.customerSubscribingFor = response[0].customer_eligibility.subscribing_for;
          }
          this.topService.updateCOBPResponse(response);

          if (response[0].blackList?.status && response[0].blackList.blacklistChkResponse?.system === "Internal") {
            this.moonElgibilityError = true;
            this.easyphoneError = true;
            this.isInternallyBlacklisted = true;
            this.msisdn = undefined;
            this.errorForCOBP({message: response[0].blackList?.message});
          }
          this.topService.selectMobileNumber(this.msisdn);
          this._deviceDataService.publishRunAutoBillingCheck();
          if (response[0].penaltyCheck !== undefined && response[0].penaltyCheck.endDate !== undefined) {
            this.endDate = response[0].penaltyCheck.endDate;
          }
          if(localStorage.getItem("isProjectStar") && response[0].star_eligibility && response[0].star_eligibility.response && response[0].star_eligibility.response.is_same) {
            this.isCurrentPlanStar = true;
            if (localStorage.getItem("isProjectStar") && response[0].star_eligibility && response[0].star_eligibility.response && response[0].star_eligibility.response.same_pass) {
              this.starElgibilityError = true;
            }
          }
          if (this.purchaseTypeTab !== "GetNewNumber" && this.purchaseTypeTab !== "ShowMNPBlock" && !this.colorStorageChanged) {
            this._deviceDataService.publishCobpLoading(false);
            if (typeof window !== 'undefined' && localStorage && localStorage.getItem('publishCobpLoading')) {
              localStorage.removeItem('publishCobpLoading');
            }
          let planSelected;
          if (localStorage && localStorage.getItem("SelectedPlan") && sessionStorage.getItem("personalForm")) {
            planSelected = localStorage.getItem("SelectedPlan");
            this.getPlanType();
          }
          // Exception check.
          if (response[0] && typeof (response[0].status) !== 'undefined' && response[0].status === false && response[0].response) {
            this.moonElgibilityError = true;
            this.easyphoneError = true;
            this.easyphoneFlowMsg = response[0].response;
          } else if (response[0].blackList.blacklistIndicator && response[0].blackList.blacklistIndicator === 'Yes') {
            this.moonElgibilityError = true;
            this.easyphoneError = true;
            if (response[0].blackList.message === null || !response[0].blackList.message) {
              this.easyphoneFlowMsg = "Uh Oh. Your ID number is blacklisted.";
            } else {
              this.easyphoneFlowMsg = response[0].blackList.message;
            }
          } else if (!response[0].callBaring.status) {
            this.moonElgibilityError = true;
            this.easyphoneError = true;
            if (response[0].callBaring.message === null || !response[0].callBaring.message) {
              this.easyphoneFlowMsg = "Uh Oh. Selected number is barred, please select a new number.";
            } else {
              this.easyphoneFlowMsg = response[0].callBaring.message;
            }
          } else if (!response[0].openOrder.status) {
            this.moonElgibilityError = true;
            this.setOpenOrderStatus(response);
          } else if (response[0].penaltyCheck.exception) {
            this.setPenaltyStatus(response);
          } else if (this.data && this.data.PlanOnlyComponentToShow &&
            ((data.promonumb === response[0].penaltyCheck.productPromotionPartNumber ||
            data.oldpromonumb === response[0].penaltyCheck.productPromotionPartNumber) &&
             (response[0].moon_eligibility && response[0].moon_eligibility.is_moon === 0)) &&
             !this.isEnterprise
            ) {
              this.easyPhoneErrorMsg('samePlan');
          } else if (planSelected === "FB" && this.postOrPreType === "Postpaid") {
            this.easyPhoneErrorMsg('downgradePlan');
          } else if ((response[0].callBaring && response[0].callBaring.exception) ||
           (response[0].openOrder && response[0].openOrder.exception) ||
            (response[0].blackList && response[0].blackList.exception) ||
            (response[0].whitelist && response[0].whitelist.exception) ||
             (response[0].productEligibility && response[0].productEligibility.exception) ||
             (response[0].contract_check && !response[0].contract_check.status) ||
              (response[0].blackList && !response[0].blackList.status) ||
              (response[0].whitelist && !response[0].whitelist.status) ||
               (response[0].customer_eligibility && !response[0].customer_eligibility.status) ||
             (response[0].customer_eligibility && response[0].customer_eligibility.exception) ||
             (response[0].moon_eligibility && !response[0].moon_eligibility.status) ||
             (response[0].star_eligibility && !response[0].star_eligibility.status)) {
              this.moonElgibilityError = true;
              if (response[0].moon_eligibility && response[0].moon_eligibility.response && response[0].moon_eligibility.response.same_pass){
                  this.moonElgibilityError = true;
                }
            this.eligibilityObj.isException = true;
            this.easyphoneError = true;
            // Specific error message from cms.
            this.easyphoneFlowMsg = getCOBPErrorFromResponse(response[0]);
          } else if (typeof (response[0].productEligibility.status) !== 'undefined' && response[0].productEligibility.status === false) {
            this.moonElgibilityError = true;
            this.easyphoneError = true;
            this.easyphoneFlowMsg = response[0].productEligibility.message;
          } else if (response[0].moon_eligibility && !response[0].moon_eligibility.status) {
            this.moonElgibilityError = true;
            this.easyphoneFlowMsg = response[0].moon_eligibility.message;
          } else {
            if (
              response[0].callBaring.status &&
              response[0].openOrder.status &&
              response[0].blackList.status &&
              response[0].penaltyCheck.status
              // ? the below old condition is now replaced with above line
              // (
              //   data.promonumb !== response[0].penaltyCheck.productPromotionPartNumber ||
              //   data.oldpromonumb !== response[0].penaltyCheck.productPromotionPartNumber ||
              //   response[0].star_eligibility
              // )
            ) {
              this.eligibilityObj.isEligible = true;
              this.eligibilityObj.enddate = response[0].penaltyCheck.endDate;
              if (response[0].validated_id) {
                if (typeof window !== 'undefined' && localStorage) {
                  localStorage.setItem("validated_id", response[0].validated_id);
                }
              }
              if (response[0].upfront_payment && response[0].upfront_payment.status && response[0].upfront_payment.title &&
               response[0].upfront_payment.subtitle) {
                // Upfront payment as null for 100 days 100,000 Free Phones
                this._deviceDataService.publishUpfrontWaived(true);
                this._deviceDataService.publishUpfrontWaivedSuccess(true);
                this._deviceDataService.publishUpfrontWaivedFailure(false);
              } else if (response[0].upfront_payment && !response[0].upfront_payment.status) {
                this._deviceDataService.publishUpfrontWaived(false);
                this._deviceDataService.publishUpfrontWaivedSuccess(false);
                this._deviceDataService.publishUpfrontWaivedFailure(true);
              } else {
                this._deviceDataService.publishUpfrontWaived(false);
                this._deviceDataService.publishUpfrontWaivedSuccess(false);
                this._deviceDataService.publishUpfrontWaivedFailure(false);
              }
              if (response[0].star_eligibility && response[0].star_eligibility.status &&
                response[0].star_eligibility.response) {
                 if (this.selectedDeviceDetailsInfoObject) {
                   this.selectedDeviceDetailsInfoObject.upfrontPrice = response[0].star_eligibility.response.upfront;
                   this.selectedDeviceDetailsInfoObject.devicePrice = response[0].star_eligibility.response.device;
                 }
                 if (this.selectedPassDetailsInfoObject) {
                   this.selectedPassDetailsInfoObject.monthlyPay = response[0].star_eligibility.response.pass;
                 }
                 if (this.selectedBasePlanInfoObject) {
                  this.selectedBasePlanInfoObject.monthly_plan = response[0].star_eligibility.response.plan;
                 }
                 const { response: { plan, pass, device, upfront }, status } = response[0].star_eligibility;
                 if(status === true) {
                  let totalPay = 0;
                  totalPay += +plan || 0;
                  totalPay += +pass || 0;
                  totalPay += +(response[0].penaltyCheck?.device_upfront_penalty) || 0;
                  this._deviceDataService.publishTotalPay(totalPay);
                  if (typeof window !== 'undefined' && localStorage && (localStorage.getItem('isBundleClicked') === "true")) {
                    totalPay = 0;
                    totalPay += +upfront || 0;
                    totalPay += +device || 0;
                    totalPay += +(response[0].penaltyCheck?.device_upfront_penalty) || 0;
                    this._deviceDataService.publishTotalPay(totalPay);
                  }
                 }
                 if (this.selectedPassDetailsInfoObject && this.selectedPassDetailsInfoObject.sku) {
                 this._deviceDataService.publishSelectedAddonPassDetails(this.selectedPassDetailsInfoObject);
                 }
              }
              if (response[0].moon_eligibility && response[0].moon_eligibility.status &&
                 response[0].moon_eligibility.response) {
                  if (this.selectedDeviceDetailsInfoObject) {
                    this.selectedDeviceDetailsInfoObject.upfrontPrice = response[0].moon_eligibility.response.upfront;
                    this.selectedDeviceDetailsInfoObject.devicePrice = response[0].moon_eligibility.response.device;
                  }
                  if (this.selectedPassDetailsInfoObject) {
                    this.selectedPassDetailsInfoObject.monthlyPay = response[0].moon_eligibility.response.pass;
                  }
                  if (this.selectedBasePlanInfoObject) {
                   this.selectedBasePlanInfoObject.monthly_plan = response[0].moon_eligibility.response.plan;
                  }
                  this._deviceDataService.publishBasePlanMoon(this.selectedBasePlanInfoObject);
                  if (this.selectedPassDetailsInfoObject && this.selectedPassDetailsInfoObject.sku) {
                  this._deviceDataService.publishSelectedAddonPassDetails(this.selectedPassDetailsInfoObject);
                  }
                  if (this.selectedDeviceDetails) {
                  this._deviceDataService.publishMoonSelectedProductDetails(this.selectedDeviceDetailsInfoObject);
                  }
              }
              this.checkPenalty(response);
              if (this.data && this.data.plan_title && response[0].productEligibility) {
                if (response[0].productEligibility.plan === "0" || response[0].productEligibility.plan === 0) {
                  this.userLessThanSixMonths = false;
                 } else {
                   this.userLessThanSixMonths = true;
                 }
              }
            }
          }
          if (this.typeOfNumHighlight === "EXISTING_NUMBER") {
            this.checkContractParams(response);
            this._deviceDataService.publishBasePlanMoon(this.selectedBasePlanInfoObject);
            if (this.eligibleCheck) { // Eligibility check.
              this.isChecked = false;
              this._deviceDataService.publishDisclaimerAgree(false);
              this._deviceDataService.publishPhoneNo(msisdnNumber);
              this.topService.selectMobileNumber(msisdnNumber);
              this._deviceDataService.publishNumberType("KeepNumber");
              this.setDisclaimer();
            } else if (this.exceptionCheck) { // Exception check.
            } else {
              this.checkEligibleMessage();
              this.topService.selectMobileNumber(this.msisdn);
            }
            if(this.data && response && response[0]['star_eligibility']){
              this.data = {
                ...this.data,
                ...response[0],
                star_eligibility: response[0]['star_eligibility'],
              }
            }
            this._deviceDataService.publishEligibility(this.eligibleCheck);
            if (this.data && this.data.plan_title) {
              this.data.userLessThanSixMonths = this.userLessThanSixMonths;
              this.data.cobpEligible = this.eligibleCheck;
              this.cobpEligibilityCheckPlanPurchase.emit(this.data);
            } else {
              this.data.eligibility = this.eligibleCheck;
              this.cobpEligibilityCheckBundle.emit(this.data);
            }
          }
         }
         localStorage.removeItem("COBP_login");
         if (this.easyphoneError) {
            this._globalErrorHandler.errorObjectConvert(this.easyphoneFlowMsg);
         }
        },
        error => {
          if (typeof window !== 'undefined' && localStorage && localStorage.getItem('publishCobpLoading')) {
            localStorage.removeItem('publishCobpLoading');
          }
          this.errorForCOBP(error);
        }
      );
    }
  }

  get isEnterprise(): boolean {
    return sessionStorage && sessionStorage.getItem("USER_TYPE") === 'ENTERPRISE';
  }

  public getPlanType() {
    if (sessionStorage && sessionStorage.getItem("personalForm")) {
      JSON.parse(sessionStorage.getItem("personalForm")).outputCPResp.services.forEach(element => {
        let mobileNumber;
        if (element.mobileNumber.charAt(0) !== "6") {
          mobileNumber = "6" + element.mobileNumber;
        } else {
          mobileNumber = element.mobileNumber;
        }

        mobileNumber = parseInt(mobileNumber, 10);

        if (mobileNumber === this.msisdn) {
          this.postOrPreType = element.pre_Pos_Indicator;
        }
      });
    }
    return this.postOrPreType;
  }

  public userSince(data) {
    const DOB = data.substring(0, data.indexOf('_'));
    const year = parseInt(DOB.slice(0, 4), 10);
    const month = parseInt(DOB.slice(4, 6), 10);

    const Dat = new Date();
    const currentYear = Dat.getFullYear();
    const currentMonth = Dat.getMonth() + 1;
    if ((currentYear - year) < 1 && (currentMonth - month) < 6) {
      this.data.userLessThanSixMonths = true;
    } else if ((currentYear - year) === 1 && (currentMonth - month) <= -6 && (currentMonth - month) >= -12 ) {
      this.data.userLessThanSixMonths = true;
    } else {
      this.data.userLessThanSixMonths = false;
    }
    this.data.cobpEligible = this.eligibleCheck;
    this.cobpEligibilityCheckPlanPurchase.emit(this.data);
  }

  public getYearAndMonth(strEffectiveEndDate: string) {
    const dtEffectiveEndDate = new Date(parseInt(strEffectiveEndDate.slice(0, 4), 10),
      parseInt(strEffectiveEndDate.slice(4, 6), 10) - 1, parseInt(strEffectiveEndDate.slice(6), 10));
    let months = this.monthDiff(new Date(), dtEffectiveEndDate);
    const noOfYears = parseInt('' + (months / 12), 10);
    months -= noOfYears * 12;
    return [noOfYears, months];
  }

  public monthDiff(d1, d2): number {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    months += (d2.getDate() < d1.getDate() ? 0 : 1);
    return months <= 0 ? 0 : months;
  }

  checkValue(event: any) {
    if(this.endDate !== null && this.endDate !== undefined ) {
      localStorage.setItem('ContractAgreeValidation', "true");
    } else {
      localStorage.setItem('ContractAgreeValidation', "false");
    }
    if (event === 'A') {
      this.cobpContract = true;
      this._deviceDataService.publishDisclaimerAgree(false);
      this.topService.updateDisclaimer(true);
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('ContractAgree', JSON.stringify(this.cobpContract));
      }
    } else {
      this.cobpContract = false;
      this._deviceDataService.publishDisclaimerAgree(true);
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('ContractAgree', JSON.stringify(this.cobpContract));
      }
    }
  }
  contractExtended(val, res?) {
    if (res !== undefined) {
      const contractExt = res.penaltyCheck.eligible_contract_extend;
      const processType = res.productEligibility.process_type;
      if (contractExt === true && processType === "upgrade") {
        val = 'true';
        this.contractExtendedWithOrWithOutPenalty = true;
      }
    }
    let contractPenatly = this.deviceUpfrontPenalty;
    if (val === "true" || val === true) {
      contractPenatly = 0;
    }
    this.contractExtendedSelected =  String(val);
    this._deviceDataService.publishContractExtended(String(val));
    this._deviceDataService.publishdeviceUpfrontPenalty(contractPenatly);
    this.checkValue("B");
  }
  public removeLocalStorage() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem("selectedColor");
      localStorage.removeItem("selectedStorage");
      localStorage.removeItem("DeviceSku");
      localStorage.removeItem("SelectedPlan");
      localStorage.removeItem("SelectedPlanDetails");
      localStorage.removeItem("SelectedMonthlyPay");
      localStorage.removeItem("SelectedPlanName");
      localStorage.removeItem("chosenPlan");
      localStorage.removeItem("PSku");
    }
  }

  showMsisdnInput(){
    this.showMsisdnBlock = true;
    this.moonElgibilityError = false;
    this.starElgibilityError = false;
  }

  onSuccessfulLogin(e) {

    if (e) {
      this.enableNRICAuthentication = false;
    this.Init();
    this.showMsisdnBlock = false;


    }else{
      this.enableNRICAuthentication = true;
    }
  }
}

