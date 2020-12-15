import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MoonPlanWithPassDetailsService } from './moon-plan-with-pass-details.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../base.component';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import { PlanPurchaseService } from '../plan-purchase/plan-purchase.service';
import { ProductService } from '../../../Service/product.service';
import { PlansService } from '../../../Service/plans.service';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';
import { removeHTMLTags, CLMOmniDataSanitizer } from "../../../shared/utilities/helper.ultility";
import { iOmniCampaign } from 'app/shared/models/plan.model';
interface SelectedPassPlanInfoStruct {
  name: string;
  sku: string;
  monthlyPay: string;
  dataLimit: string;
  deviceAllowed: string;
  key_figures_text: string;
  offer: string;
  key_text: string;
  totalPay: string;
}
@Component({
  selector: 'app-moon-plan-with-pass-details',
  templateUrl: './moon-plan-with-pass-details.component.html',
  styleUrls: ['./moon-plan-with-pass-details.component.css'],
  providers: [MoonPlanWithPassDetailsService]
})
export class MoonPlanWithPassDetailsComponent extends BaseComponent implements OnInit {
  @Input() editProduct: any;
  @Output() cobpEligibilityData = new EventEmitter();
  @Input() SelectionAferLogin: any;
  public PlanPurchaseDataToPass: any = {
    plan_title: "Moon",
    PlanOnlyComponentToShow: true,
    cobpEligible: false,
    notes: ''
  };
  public selectedPassOfferTitle = '';
  public isMoon = true;
  public mnpCheckPlanPurchase: any;
  public IsInitializedSummary = false;
  public loading = true;
  private _PlanPassDeviceDetailResponse: any = null;
  get PlanPassDeviceDetailResponse() {
    return this._PlanPassDeviceDetailResponse;
  }
  set PlanPassDeviceDetailResponse(value) {
    this._PlanPassDeviceDetailResponse = value;
    const campaign_node_parent = value?.['base_plan']?.[0];
    if (campaign_node_parent) {
      if (campaign_node_parent['is_campaign_omni'] && campaign_node_parent['campaign_omni']) {
        this.omniCampaign = CLMOmniDataSanitizer(campaign_node_parent['campaign_omni']);
        this._plansService.updateOmniCampaign(this.omniCampaign);
      }
    }
  }
  public isBanner = false;
  public dataForBanner: any;
  public deviceDataForAddonPass: any = null;
  public isPassSelected = false;
  public showDeviceSection = false;
  public basePlan: any;
  public upsellProceed = false;
  public totalDataLimit = 0;
  public totalPrice = 0;
  public selectedPassPlan;
  public selectedPlanInfo: SelectedPassPlanInfoStruct = {
    dataLimit: "",
    name: "",
    sku: "",
    monthlyPay: "",
    deviceAllowed: "",
    key_figures_text: "",
    offer: "",
    key_text: "",
    totalPay: ""
  };
  public mvivaCampaign = {
    mvivaBannerDesktop: null,
    mvivaBannerMobile: null
  };
  public mvivaPlanUpfrontMoon = false;
  public mvivaSummaryMessageMoon = "";
  public editedSelectedPassDetails: any;
  public editDeviceObjForMoon: any;
  public selectedDeviceInfoForMoon: any;
  public subscriber: Subscription;
  public IsDispalySwitchingPurchaseTypeTabPopup = false;
  public selectedPassObj: any;
  public popupType: any = { type: "switchingpurchasetype" };
  public isInitializeChooseNumber = false;
  public planSubPassUrlKey;
  public planDeviceUrlKey;
  public keepCelcomNumObj: any;
  public popupActionType: any;
  public selectedDevice;
  public checkDevice;
  public isPlusVisible = true;
  public displayMvivaPopup = true;
  public MvivaInvalidPopupType = "";
  public isMviva = false;
  public isLPass = true;
  public isMPass = true;
  public passSku = "";
  agentType: "dealer" | "csAgent";

  omniCampaign: iOmniCampaign;

  constructor(
    private _planWithPassDetailsService: MoonPlanWithPassDetailsService,
    private _activatedRoute: ActivatedRoute,
    private _deviceDataService: DeviceDataService,
    private _planPurchaseService: PlanPurchaseService,
    private _productService: ProductService,
    private _plansService: PlansService,
    private _globalErrorHandler: GlobalErrorHandler,
  ) {
    super();
  }

  ngOnInit() {
    let planPassUrlKey;
    this.publishPassSelected();
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['promotiondetails']) {
        this.passSku = params['pass'] ? params['pass'] : "";
        this.planSubPassUrlKey = params['pass'] !== undefined ? "?promotiondetails=" +
         params['promotiondetails'] + "&pass=" + params['pass'] : "?promotiondetails=" + params['promotiondetails'];
        this.planDeviceUrlKey = params['device'] !== undefined ? this.planSubPassUrlKey === "" ? "?promotiondetails=" +
         params['promotiondetails'] + "&device=" + params['device'] : "&device=" + params['device'] : "";
        this.checkDevice = params['device'];
        if (this.checkDevice !== null && this.checkDevice !== "") {
          this.selectedDevice = this.checkDevice;
        }
      } else if (params['promotionomnichannel']) {
        this.planSubPassUrlKey = location?.search;
        this.planDeviceUrlKey = '';
      } else {
        this.planSubPassUrlKey = params['type'] !== undefined ? "?pass=" + params['type'] : "";
        this.planDeviceUrlKey = params['type'] !== undefined && params['device'] !== undefined ? "&device=" + params['device'] : "";
        this.checkDevice = params['device'];
        if (this.checkDevice !== null && this.checkDevice !== "") {
          this.selectedDevice = this.checkDevice;
        }
      }
    });
    this._activatedRoute.params.subscribe(params => {
      const id = params['planPurchaseId'];
      planPassUrlKey = id;
    });
    if (this.editProduct) {
      this.editDeviceObjForMoon = this.editProduct;
      this.editDeviceObjForMoon.phoneNum = this.editProduct.selectedProduct.orderPhoneNo ?
        this.editProduct.selectedProduct.orderPhoneNo : '';
      this.editDeviceObjForMoon.orderNumberType = this.editProduct.selectedProduct.orderNumberType ?
        this.editProduct.selectedProduct.orderNumberType : '';
    }
    if (!this.SelectionAferLogin && !this.editProduct) {
      if (typeof window !== "undefined" && localStorage &&
        localStorage.getItem("COBP_FLOW")) {
        localStorage.removeItem("COBP_FLOW");
      }
      if (localStorage.getItem("COBP_login_Check")) {
        localStorage.removeItem("COBP_login_Check");
      }
      if (localStorage.getItem("COBP_FLOW_CHECK")) {
        localStorage.removeItem("COBP_FLOW_CHECK");
      }
    }
    try {
      if (location?.search?.includes('promotionomnichannel')) {
        this.planSubPassUrlKey = location?.search;
        this.planDeviceUrlKey = '';
      }
    } catch (_error) {

    }
    const planPassUrl = "/rest/V1/project-moon-details/" + planPassUrlKey + this.planSubPassUrlKey + this.planDeviceUrlKey;
    this._planWithPassDetailsService.getPlanPassDevice(planPassUrl).subscribe(
      (res: any) => {
        this.loading = false;
        if (res[0] && res[0].base_plan && res[0].base_plan[0] && !res[0].base_plan[0].is_campaign_mviva &&
           res[0].base_plan[0].campaign_mviva_invalid &&
           res[0].base_plan[0].campaign_mviva_invalid.length > 0) {
          const mvivaInvalid = {
            isEligibleByAge: false,
            displayType: 'INVALID_MVIVA_URL',
            type: 'xpax'
          };
          this._globalErrorHandler.errorObjectConvert(mvivaInvalid.displayType);
          this.MvivaInvalidPopupType = JSON.parse(JSON.stringify(mvivaInvalid));
          this.displayMvivaPopup = true;
          return;
        }
        const tempRes = res[0];
        if (res && res[0] && res[0].code && res[0].status === false && res[0].code === 404) {
          this.errorDisplay();
        } else if (res && res[0] && res[0].message && res[0].status === false) {
          this.errorDisplay();
        } else {
          tempRes.pass_plan = res[0].base_plan[0].is_campaign_mviva ?
           tempRes.pass_plan.filter(item => item.sku === this.passSku) : res[0].pass_plan;
          this.isPlusVisible = tempRes.pass_plan.length > 0;
          this.PlanPassDeviceDetailResponse = tempRes;
          if (res[0].base_plan[0].is_campaign_mviva) {
          this.isMviva = res[0].base_plan[0].is_campaign_mviva;
          }
          if (this.isMviva && res[0].base_plan[0].campaign_mviva) {
            const campaign = res[0].base_plan[0].campaign_mviva;
            const strippedString = removeHTMLTags(campaign?.desktop_content);
            if (strippedString?.length > 0) {
              this.mvivaCampaign = {
                mvivaBannerDesktop: campaign.desktop_content,
                mvivaBannerMobile: campaign.mobile_content
              };
            }
            this.mvivaPlanUpfrontMoon = campaign.no_upfront_payment;
            this.mvivaSummaryMessageMoon = campaign.summary_message;
          }
          localStorage.setItem("isMviva", JSON.stringify(this.isMviva));
          if (localStorage.getItem("mvivaBundleUpfront")) {
            localStorage.removeItem("mvivaBundleUpfront");
          }
          if (this.mvivaPlanUpfrontMoon) {
            localStorage.setItem("mvivaPlanUpfront", JSON.stringify(this.mvivaPlanUpfrontMoon));
          } else {
            localStorage.removeItem("mvivaPlanUpfront");
          }
          if (this.mvivaSummaryMessageMoon) {
            localStorage.setItem("mvivaSummaryMessage", this.mvivaSummaryMessageMoon);
          } else {
            localStorage.removeItem("mvivaSummaryMessage");
          }
          this._deviceDataService.publishMviva(this.isMviva);
          this.PlanPurchaseDataToPass = Object.assign(this.PlanPurchaseDataToPass, res[0]["base_plan"][0]);
          this.PlanPurchaseDataToPass.notes = res[0].notes;
          this.setPlanPassData();
          if (this.SelectionAferLogin) {
            this.keepCelcomNumObj = this.SelectionAferLogin;
            if (this.SelectionAferLogin.planDetails) {
              this.SelectionAferLogin.planDetails.url_key = this.PlanPassDeviceDetailResponse.url_key;
              this.SelectionAferLogin.planDetails.isMoon = true;
              this.SelectionAferLogin.url_key = this.PlanPassDeviceDetailResponse.url_key;
              if (typeof window !== 'undefined' && localStorage) {
                localStorage.setItem("SelectedPlanDetails", JSON.stringify(this.SelectionAferLogin.planDetails));
              }
              if (this.SelectionAferLogin.planDetails.selectedPass) {
              this.addPass(this.SelectionAferLogin.planDetails.selectedPass);
              }
            }
          } else if (!this.SelectionAferLogin && this.planSubPassUrlKey !== '') {
            this.PlanPassDeviceDetailResponse.pass_plan.forEach(item => {
            if (item.selected_pass === true) {
               this.addPass(item);
            }
            // if (this.selectedPassPlan && this.selectedPlanInfo && this.selectedPlanInfo.deviceAllowed === "1") {
            //   this.deviceDataForAddonPass = item.associated_bundle_product;
            // } else {
            //   this.deviceDataForAddonPass = null;
            // }
          });
        }
        }
        if (this.editProduct) {
          this.editDeviceObjForMoon = this.editProduct;
          this.editDeviceObjForMoon.phoneNum = this.editProduct.selectedProduct.orderPhoneNo;
          this.editDeviceObjForMoon.orderNumberType = this.editProduct.selectedProduct.orderNumberType;
          this.editFlowSelection(this.editProduct);
        }
      },
      err => {
        this.errorDisplay();
      });
    this.subscriber = this._deviceDataService.sharedMoonSelectedProductDetails$.subscribe(data => {
      this.selectedDeviceInfoForMoon = (data === null) ? null : data;
    });
      if (typeof window !== "undefined" && localStorage) {
        if (localStorage.getItem("COBP_login_Check")) {
          localStorage.removeItem("COBP_login_Check");
        }
        if (localStorage.getItem("COBP_FLOW_CHECK")) {
          localStorage.removeItem("COBP_FLOW_CHECK");
        }
      }
    this.subscriber = this._deviceDataService.upsellProceed$.subscribe(data => {
      this.upsellProceed = data;
      if (this.upsellProceed && this.PlanPassDeviceDetailResponse && this.PlanPassDeviceDetailResponse.pass_plan) {
        this.PlanPassDeviceDetailResponse.pass_plan.forEach(pass => {
          if (pass.device_allowed === "0") {
             this.addPass(pass);
          }
        });
      }
    });

    // TODO Move this common method to some service or Akita
    // during refactoring
    if (typeof window !== "undefined" && sessionStorage) {
      this.agentType = sessionStorage.getItem("AgentInfo")
        ? "csAgent"
        : sessionStorage.getItem("DealerInfo")
          ? "dealer"
          : undefined;
    }
  }

  public OnContinueMvivaCheck(data: any) {
    if (typeof window !== "undefined") {
      this.displayMvivaPopup = false;
      window.location.href = window.location.origin + window.location.pathname;
    }
  }

  public errorDisplay() {
    this.loading = false;
    this.isBanner = true;
    this.dataForBanner = { "Name": "Plan not found", "Api": this.API_URL_CONST.PAGE_NOT_FOUND_URL };
    this._deviceDataService.publishPageNotFound(true);
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
      this.PlanPurchaseDataToPass.OneTimePayment = this.PlanPurchaseDataToPass.PlanMonthlyPay;
      this.PlanPurchaseDataToPass.IsMnp = false;
      this.PlanPurchaseDataToPass.PrincipalLine = "";
      this.PlanPurchaseDataToPass.portNumber = "";
      this.InitializeDeviceDetailSummary(null);
    }
  }
  private InitializeDeviceDetailSummary(port) {
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
  public OnCOBPEligibilityPlanMoonPurchase() {

  }
  public setPlanPassData() {
    if (this.PlanPassDeviceDetailResponse) {
      if (this.PlanPassDeviceDetailResponse.base_plan && this.PlanPassDeviceDetailResponse.base_plan[0]) {
        this.basePlan = this.PlanPassDeviceDetailResponse.base_plan[0];
        this.basePlan.bundleSku = this.PlanPassDeviceDetailResponse.sku;
        this.basePlan.bundleName = this.PlanPassDeviceDetailResponse.name;
        this.basePlan.url_key = this.PlanPassDeviceDetailResponse.url_key;
        this.basePlan.isMoon = true;
        this._plansService.selectBasePlan(this.basePlan);
      }
      this.setBasePlanData();
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem("SelectedPlanName", this.basePlan.name);
        localStorage.setItem("PSku", this.basePlan.sku);
        localStorage.setItem("SelectedPlan", this.basePlan.sku);
        localStorage.setItem("SelectedMonthlyPay", this.basePlan.monthly_plan);
        if (!this.SelectionAferLogin) {
          localStorage.setItem("SelectedPlanDetails", JSON.stringify(this.basePlan));
        }
        this._deviceDataService.publishBasePlanMoon(this.basePlan);
      }
    }
  }

  public setBasePlanData() {
    if (this.basePlan && this.basePlan.data_limit) {
      this.totalDataLimit = Number(this.basePlan.data_limit);
    }
    if (this.basePlan && this.basePlan.monthly_plan) {
      this.totalPrice = Number(this.basePlan.monthly_plan);
    }
    

    if (this.omniCampaign) {
      const pass = this.PlanPassDeviceDetailResponse.pass_plan.find(p => p.sku == this.omniCampaign.pass_sku) || this.PlanPassDeviceDetailResponse.pass_plan[0];
      if (pass) {
        this.addPass(pass);
      }
    }
  }
  public addSelectedPlanInfo(item: any) {
    this.selectedPassPlan = item.sku;
    this.selectedPlanInfo.sku = this.selectedPassPlan;
    this.selectedPlanInfo.name = item.name;
    this.selectedPlanInfo.monthlyPay = item.monthly_plan;
    this.selectedPlanInfo.dataLimit = item.data_limit;
    this.selectedPlanInfo.deviceAllowed = `${item.device_allowed}`;
    this.selectedPlanInfo.key_figures_text = item.key_figures_text;
    this.selectedPlanInfo.offer = item.offer;
    this.selectedPlanInfo.key_text = item.key_text;
    this.selectedPassOfferTitle = item.selected_offer_title;
  }
  public addPass(item: any, isChangePassOnUserSelect?) {
    if (!this.editProduct &&
      (typeof window !== 'undefined' && localStorage && (localStorage.getItem("MNP-FLOW")) ||
        (localStorage.getItem("COBP_FLOW") && !localStorage.getItem("COBP_login")) ||
        localStorage.getItem("PrincipleNumberSelected"))) {
      this.selectedPassObj = item;
      this.popupActionType = 'add';
      this.IsDispalySwitchingPurchaseTypeTabPopup = true;
    } else {
      if (item) {
        this.IsDispalySwitchingPurchaseTypeTabPopup = false;
        this.addSelectedPlanInfo(item);
      }
      this._plansService.selectPlan(item);
      if (this.selectedPassPlan && this.selectedPlanInfo && this.basePlan &&
        this.selectedPlanInfo.dataLimit && this.selectedPlanInfo.monthlyPay) {
        this.totalDataLimit = Number(this.selectedPlanInfo.dataLimit) + Number(this.basePlan.data_limit);
        this.totalPrice = Number(this.selectedPlanInfo.monthlyPay) + Number(this.basePlan.monthly_plan);
        this.selectedPlanInfo.totalPay = String(this.totalPrice);
      }
      if (this.selectedPassPlan && this.selectedPlanInfo && this.selectedPlanInfo.deviceAllowed === "1") {
        if (item.associated_bundle_product && item.associated_bundle_product.length > 0) {
        this.deviceDataForAddonPass = item.associated_bundle_product;
        } else {
          this.deviceDataForAddonPass = null;
        }
       // this.isDeviceSelected = true;
      } else {
        this.deviceDataForAddonPass = null;
        // this.isDeviceSelected = false;
      }
        if (this.selectedPassPlan && this.selectedPlanInfo && this.basePlan &&
          this.selectedPlanInfo.dataLimit && this.selectedPlanInfo.monthlyPay) {
          this.totalDataLimit = Number(this.selectedPlanInfo.dataLimit) + Number(this.basePlan.data_limit);
          this.totalPrice = Number(this.selectedPlanInfo.monthlyPay) + Number(this.basePlan.monthly_plan);
          this.selectedPlanInfo.totalPay = String(this.totalPrice);
        }

        this._deviceDataService.publishSelectedAddonPassDetails(this.selectedPlanInfo);
        //  localStorage.setItem("PassPlan", JSON.stringify(this.selectedPlanInfo));
        if (!this.SelectionAferLogin && this.basePlan) {
          this.basePlan.selectedPass = item;
          localStorage.setItem("SelectedPlanDetails", JSON.stringify(this.basePlan));
        }
        if (isChangePassOnUserSelect && this.basePlan) {
          this.basePlan.selectedPass = item;
          localStorage.setItem("SelectedPlanDetails", JSON.stringify(this.basePlan));
        }
        this._deviceDataService.publishMoonSelectedProductDetails(null);
        this._deviceDataService.publishColor(null);
        this._deviceDataService.publishStorage(null);
        this.editProduct = null;
      }
      this.isPassSelected = true;
      this.publishPassSelected();
    }
  onContinueSwitchingPassTab() {
    this.selectedDeviceInfoForMoon = null;
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
    this._productService.OnCOntinueSwitchingTab();
    if (this.selectedPassObj && this.popupActionType === 'add') {
      this.addPass(this.selectedPassObj, true);
    } else if (this.popupActionType === 'remove') {
      this.removeAddonPass();
    }
  }
  onCancellingSwitchingPassTab() {
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
  }

  public removeAddonPass() {
    if (!this.editProduct &&
      (this.selectedDeviceInfoForMoon || (typeof window !== 'undefined' && localStorage && (localStorage.getItem("MNP-FLOW")) ||
        (localStorage.getItem("COBP_FLOW") && !localStorage.getItem("COBP_login")) ||
        localStorage.getItem("PrincipleNumberSelected")))) {
      this.popupActionType = 'remove';
      this.IsDispalySwitchingPurchaseTypeTabPopup = true;
    } else {
      this.selectedPassObj = null;
      this.IsDispalySwitchingPurchaseTypeTabPopup = false;
      this.selectedPassPlan = '';
      this._plansService.selectPlan(null);
      this._deviceDataService.publishSelectedAddonPassDetails(null);
      this._deviceDataService.publishColor(null);
      this._deviceDataService.publishMoonSelectedProductDetails(null);
      this._deviceDataService.publishStorage(null);
      localStorage.removeItem("PassPlan");
      if (this.SelectionAferLogin) {
        this.SelectionAferLogin = null;
      }
      if (this.basePlan.selectedPass) {
        this.basePlan.selectedPass = null;
       }
      this.setPlanPassData();
    }
    this.isPassSelected = false;
    this.publishPassSelected();
    this.selectedPassOfferTitle = '';
  }
  editFlowSelection(editObj: any) {
    if (editObj && editObj.selectedProduct &&
      editObj.selectedProduct.selected_pass_details) {
      this.PlanPassDeviceDetailResponse.pass_plan.forEach(element => {
        if (element.sku === editObj.selectedProduct.selected_pass_details.sku) {
          this.addPass(element);
        }
      });
    }
  }

  publishPassSelected() {
    localStorage.setItem("isPassSelected", JSON.stringify(this.isPassSelected));
    this._deviceDataService.publishPassSelected(this.isPassSelected);
  }
}
