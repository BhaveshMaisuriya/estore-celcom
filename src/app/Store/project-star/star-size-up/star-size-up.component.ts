import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { ProjectStarQueryParams } from '../../../Model/projectStar.model';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductService } from '../../../Service/product.service';
import { STAR_SPEED_PASS_SKU, STAR_GB_PASS_SKU } from '../../../shared/models/plan.model';
import { PlansService } from '../../../Service/plans.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { iPlan, iPass } from 'app/shared/models/plan.model';

@Component({
  selector: 'app-star-size-up',
  templateUrl: './star-size-up.component.html',
  styleUrls: [
    './star-size-up.component.css',
    './star-size-up.component.scss',
  ]
})
export class StarSizeUpComponent implements OnInit {
  @Input() ProjectStarQueryParams: ProjectStarQueryParams;
  @Input() data: any;
  @Input() selectedProd: any;
  public ultraData: any;
  public passPlanStar: any = {
    passSku: null,
    associatedPassSku: null,
    associatedPassSpeedLimit: null,
  };
  public totalMonthlyPay = 0;
  public selectedPass: any;
  public selectedType: any;
  public typeAdded: string;
  public dataLimit = 0;
  public speedLimit = 0;
  public popupType: any = { type: "switchingpurchasetype" };
  public IsDispalySwitchingPurchaseTypeTabPopupStar = false;
  public selectedObj: any;
  public popupActionType: any;
  public catalogUrl = "/store/devices";
  private subscriber: Subscription;
  isNoUpfront = "false";
  componentInitialized = false;
  typeOfPurchase = '';
  agentType: "dealer" | "csAgent";

  pass_speed_sku = STAR_SPEED_PASS_SKU;
  pass_gb_sku = STAR_GB_PASS_SKU;

  plan$: Observable<iPlan>;
  pass$: Observable<iPass>;
  nowant = false;

  /**
   * Delete this after the campaign is over
   */
  start_date = new Date("2020-03-18 20:00:00");
  end_date = new Date("2020-04-15 00:00:00");
  is_campaign_active = this.start_date < new Date() && this.end_date > new Date();

  constructor(
    public _deviceDataService: DeviceDataService,
    private _router: Router,
    private _productService: ProductService,
    private _plansService: PlansService,
    private _plansQuery: PlansQuery,
    ) {
   }
  ngOnInit() {
    if(typeof window !== "undefined" && localStorage && localStorage.getItem("mvivaPlanUpfront") && localStorage.getItem("mvivaPlanUpfront") !== null) {
      this.isNoUpfront = localStorage.getItem("mvivaPlanUpfront");
    }
    this.plan$ = this._plansQuery.select(store => store.plan);
    this.pass$ = this._plansQuery.select(store => store.pass);
    this.ultraData = this.data.base_plan[0];
    this.ultraData.PlanOnlyComponentToShow = true;
    this.totalMonthlyPay = Number(this.ultraData.monthly_plan);
    this.dataLimit = Number(this.ultraData.data_limit);
    this.speedLimit = Number(this.ultraData.speed_limit);
    if (this.selectedProd) {
      this.ProjectStarQueryParams = {
        Pass: this.selectedProd.pass,
        Type: this.selectedProd.type
      };
    }
    if (this.ProjectStarQueryParams.Pass) {
      const PassSelected = this.FindPassFromResp(this.ProjectStarQueryParams.Pass);
      if (PassSelected) {
        this.OnPassSelection(PassSelected);
      } else {
        this.passTabSelection();
      }
    } else {// Default selection Pass as a speed change it if want to change to GB
      this.passTabSelection();
    }
    if (this.ProjectStarQueryParams.Type) {
      const TypeSelected = this.FindTypeFromSelectedPass();
      if (TypeSelected) {
        this.OnTypeSelection(TypeSelected);
      }
    }
    this.componentInitialized = true;

    // TODO Move this common method to some service or Akita
    // during refactoring
    if (typeof window !== "undefined" && sessionStorage) {
      this.agentType = sessionStorage.getItem("AgentInfo")
        ? "csAgent"
        : sessionStorage.getItem("DealerInfo")
          ? "dealer"
          : undefined;
    }
    this.subscriber = this._plansQuery.select(state => state.pass).subscribe(data => {
      if (data) {
        this.OnPassSelection(data, true);
      }
    });
    this.subscriber = this._plansQuery.select(state => state.plan).subscribe(data => {
      this.nowant = !data;
      if (data) {
        this.OnTypeSelection(data, true);
      }
    });
  }

  public FindTypeFromSelectedPass() {
    const result = (this.selectedPass.associated_passes).find(item => (item.sku).toLowerCase() ===
     (this.ProjectStarQueryParams.Type).toLowerCase());
    return result;
  }
  public FindPassFromResp(PassName) {
    const result = (this.data.pass_plan).find(item => (item.sku).toLowerCase() === (this.ProjectStarQueryParams.Pass).toLowerCase());
    return result;
  }

  public OnPassSelection(pass, stopUpdateSM = false) {
    if(!stopUpdateSM)
      this._plansService.selectPass(pass);
    if ((localStorage.getItem("MNP-FLOW")) ||
     localStorage.getItem("PrincipleNumberSelected") ||
      (localStorage.getItem("COBP_FLOW") && !localStorage.getItem("COBP_login") && this.componentInitialized === true)) {
        localStorage.removeItem('ContractAgree');
        localStorage.removeItem('ContractAgreeValidation');
  this.popupActionType = 'pass';
  this.IsDispalySwitchingPurchaseTypeTabPopupStar = true;
  this.selectedObj = pass;
} else {
    this.IsDispalySwitchingPurchaseTypeTabPopupStar = false;
    this.selectedType = null;
    this.selectedPass = pass;
    this.typeAdded = "";
    this.dataLimit = Number(this.ultraData.data_limit);
    sessionStorage.setItem('dataLimit',`${this.dataLimit}`);
    this.totalMonthlyPay = Number(this.ultraData.monthly_plan);
    this.speedLimit = Number(this.ultraData.speed_limit);
    this.passPlanStar = {
      passSku: this.selectedPass.sku
    };
    this._deviceDataService.publishPassPlanStar(this.passPlanStar);
    this._deviceDataService.publishPlanName(null);
    this._deviceDataService.publishMonthlyPay(null);
    this._deviceDataService.publishTotalPay(this.totalMonthlyPay);
    // this._deviceDataService.publishTotalPay((this.isNoUpfront + '') === "true" ? 0.00 : this.totalMonthlyPay);
    if (this.selectedPass.sku === this.pass_gb_sku) {
      this._deviceDataService.publishGBPassSelection(true);
      const selectedPlan = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
      selectedPlan.TotalPay = this.totalMonthlyPay;
      delete selectedPlan.selectedPass;
      localStorage.setItem("SelectedPlanDetails", JSON.stringify(selectedPlan));
      sessionStorage.setItem("isGBPassSelected", "true");
    } else {
      this._deviceDataService.publishGBPassSelection(false);
      // const selectedPlan = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
      // selectedPlan.TotalPay = this.totalMonthlyPay;
      // delete selectedPlan.selectedPass;
      // localStorage.setItem("SelectedPlanDetails", JSON.stringify(selectedPlan));
      sessionStorage.setItem("isGBPassSelected", "false");
    }
    // for (let passes of this.selectedPass.associated_passes) {
    //   if (passes.is_default === "1") {
    //     this.OnTypeSelection(passes);
    //     break;
    //   }
    // }
  }
  }
  public OnTypeSelection(type, stopUpdateSM = false) {
    if ((localStorage.getItem("MNP-FLOW")) || (localStorage.getItem("COBP_FLOW") && !localStorage.getItem("COBP_login") && this.componentInitialized === true) ||
      localStorage.getItem("PrincipleNumberSelected")) {
      localStorage.removeItem('ContractAgree');
      localStorage.removeItem('ContractAgreeValidation');
      this.popupActionType = 'add';
      this.selectedObj = type;
      this.IsDispalySwitchingPurchaseTypeTabPopupStar = true;
    } else {
      if (!stopUpdateSM) {
        this._plansService.selectPlan(type);
      }
      this.IsDispalySwitchingPurchaseTypeTabPopupStar = false;
      this.selectedType = type;
      this.typeAdded = this.selectedType.sku;
      this.totalMonthlyPay = Number(this.ultraData.monthly_plan) + Number(this.selectedType.monthly_plan);
      this.passPlanStar = {
        passSku: this.selectedPass.sku,
        associatedPassSku: this.selectedType.sku,
        associatedPassSpeedLimit: this.selectedType.speed_limit,
      };
      if (this.selectedPass.sku === this.pass_speed_sku) {
        this.speedLimit = Number(this.selectedType.speed_limit);
      }
      if (this.selectedPass.sku === this.pass_gb_sku) {
        this.dataLimit = Number(this.ultraData.data_limit) + Number(this.selectedType.data_limit);
        sessionStorage.setItem('dataLimit', `${this.dataLimit}`);
      }
      this._deviceDataService.publishPlanName(type.name);
      this._deviceDataService.publishMonthlyPay(this.selectedType.monthly_plan);
      this._deviceDataService.publishTotalPay(this.totalMonthlyPay);
      // this._deviceDataService.publishTotalPay((this.isNoUpfront + '') === "true" ? 0.00 : this.totalMonthlyPay);
      this._deviceDataService.publishPassPlanStar(this.passPlanStar);
      const selectedPlan = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
      selectedPlan.TotalPay = this.totalMonthlyPay;
      selectedPlan.selectedPass = type;
      localStorage.setItem("SelectedPlanDetails", JSON.stringify(selectedPlan));
    }
  }

  public onTogglePass(type) {
    this.nowant = !this.nowant;
    if (this.nowant) {
      this.OnRemoveTypeSelection(type);
      return;
    }
    let defaultPass = this.selectedPass.associated_passes.find(p => p.is_default == 1);
    if (!defaultPass)
      defaultPass = this.selectedPass.associated_passes[0];
    this._plansService.selectPlan(defaultPass);
  }

  public OnRemoveTypeSelection(type) {
    this._plansService.selectPlan(null);
    this.removeCurrentSubPass();
    if (localStorage && (localStorage.getItem("MNP-FLOW")) ||
      (localStorage.getItem("COBP_FLOW") && !localStorage.getItem("COBP_login")) ||
      localStorage.getItem("PrincipleNumberSelected")) {
      localStorage.removeItem('ContractAgree');
      localStorage.removeItem('ContractAgreeValidation');
      this.selectedObj = type;
      this.popupActionType = 'remove';
      this.IsDispalySwitchingPurchaseTypeTabPopupStar = true;
    } else {
      this.IsDispalySwitchingPurchaseTypeTabPopupStar = false;
      if (this.selectedPass.sku === this.pass_gb_sku) {
        this.selectedType = null;
        this.typeAdded = "";
        this.speedLimit = Number(this.ultraData.speed_limit);
        this.totalMonthlyPay = Number(this.ultraData.monthly_plan);
        this.dataLimit = Number(this.ultraData.data_limit);
        sessionStorage.setItem('dataLimit', `${this.dataLimit}`);
        this.passPlanStar = {
          passSku: this.selectedPass.sku,
          associatedPassSku: null,
          associatedPassSpeedLimit: null,
        };
        this._deviceDataService.publishPlanName(null);
        this._deviceDataService.publishPassPlanStar(this.passPlanStar);
        this._deviceDataService.publishMonthlyPay(null);
        this._deviceDataService.publishTotalPay(this.totalMonthlyPay);
        // this._deviceDataService.publishTotalPay((this.isNoUpfront + '') === "true" ? 0.00 : this.totalMonthlyPay);
      }
    }
  }

  public RedirectToCatalog() {
    window.location.href = this.catalogUrl;
  }

  public moveToCatalog() {
    sessionStorage.setItem('starPassSelected', this.selectedPass.sku);
    if (this.selectedType) {
    sessionStorage.setItem('starTypeSelected', this.selectedType.sku);
    }
    this.RedirectToCatalog();
  }

    public passTabSelection() {
        for (let i = 0; i < this.data.pass_plan.length; i++) {
          if (this.data.pass_plan[i].is_default === "1") {
           this.OnPassSelection(this.data.pass_plan[i]);
         }
        }
    }

    onContinueSwitchingStarPassTab() {
      this.IsDispalySwitchingPurchaseTypeTabPopupStar = false;
      this._productService.OnCOntinueSwitchingTab();
      if (this.selectedObj && this.popupActionType === 'pass') {
        this.OnPassSelection(this.selectedObj);
      } else if (this.selectedObj && this.popupActionType === 'add') {
        this.OnTypeSelection(this.selectedObj);
      } else if (this.selectedObj && this.popupActionType === 'remove') {
        this.OnRemoveTypeSelection(this.selectedObj);
      }
    }
    onCancellingStarSwitchingPassTab() {
      this.IsDispalySwitchingPurchaseTypeTabPopupStar = false;
    }

    removeCurrentSubPass() {
      this._plansService.selectPlan(null);
      const selectedPlan = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
      delete selectedPlan.selectedPass;
      localStorage.setItem("SelectedPlanDetails", JSON.stringify(selectedPlan));
    }

    // addAndRemove() {
    //   return (this.selectedPass.sku === this.pass_gb_sku || this.ProjectStarQueryParams.Pass === this.pass_speed_sku);
    // }

    // getTypeOfPurchase() {
    //   if(typeof window !== "undefined" && localStorage && localStorage.getItem("TypeOfPurchase") && localStorage.getItem("TypeOfPurchase") !== null) {
    //     this.typeOfPurchase = localStorage.getItem("TypeOfPurchase");
    //   }
    // }
}