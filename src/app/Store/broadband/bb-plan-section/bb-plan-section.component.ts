import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { BbDeviceDetailsService } from '../../../Store/broadband/bb-device-details/bb-device-details.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { BroadbandService } from '../../../Service/broadband.service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { Subscription } from 'rxjs';
import { PlansService } from '../../../Service/plans.service';

@Component({
  selector: 'app-bb-plan-section',
  templateUrl: './bb-plan-section.component.html',
  styleUrls: ['./bb-plan-section.component.css'],
  providers: [BbDeviceDetailsService, BroadbandService]
})
export class BbPlanSectionComponent implements OnInit {
  @Input() deviceDetailsData: any;
  @Input() selectedColor: string;
  public dataToDisplay;
  public simpleProductData;
  public planProductData;
  public planData = [];
  public activeStateList = {};
  public isActive: boolean;
  public selectedPlanSku: any = null;
  public selectedPlanName: any = null;
  public selectedMonthlyPay: any = null;
  homeWirelessData: any = null;
  public orderSummaryColor: string;
  public eligiblePlan = [];
  public subscriber: Subscription;
  public upfrontInstallment = null;
  public upfrontInstallmentText = null;

  constructor(
    private bbDeviceDetailsService: BbDeviceDetailsService,
    private _deviceDataService: DeviceDataService,
    private getParamsService: GetParametersService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _broadbandService: BroadbandService,
    private _plansService: PlansService,
  ) { }

  ngOnInit() {
    this.dataToDisplay = this.deviceDetailsData;
    this.simpleProductData = this.deviceDetailsData.device_product_details;
    this.planProductData = this.deviceDetailsData.plan_product_details;

    this.subscriber = this._deviceDataService.sharedColor$.subscribe(data => {
      this.orderSummaryColor = data;
      this.displayPlans();
    });

    if (this.selectedColor) {
      this.displayPlans();
    }

    this.init();
    if (typeof window !== 'undefined' && localStorage && sessionStorage &&
      localStorage.getItem("MyMsIsdn") && sessionStorage.getItem("UserInfo") &&
      sessionStorage.getItem("UserToken")) {
      this.preSelection();
    }
  }

  public init() {
    if (this.deviceDetailsData && this.deviceDetailsData.default_plan_sku) {
      let defaultPlanSku = (this.getDefaultPlanFromURL()) ? this.getDefaultPlanFromURL() : this.deviceDetailsData.default_plan_sku;
      if (localStorage && localStorage.getItem("homeWirelessEditData")) {
        const homeWirelessEditData = JSON.parse(localStorage.getItem("homeWirelessEditData"));
        defaultPlanSku = homeWirelessEditData.plan.sku;
        localStorage.removeItem('homeWirelessEditData');
      } else if (localStorage && localStorage.getItem("homeWirelessData")) {
        const homeWirelessData = JSON.parse(localStorage.getItem("homeWirelessData"));
        defaultPlanSku = homeWirelessData.plan.sku;
        this._deviceDataService.publishUpdateStep(3);
        localStorage.removeItem('homeWirelessData');
      }
      let selectedPlanDetails;
      this.planData.forEach(eachPlan => {
        if (eachPlan.sku === defaultPlanSku) {
          selectedPlanDetails = eachPlan;
          this.SelectPlan(selectedPlanDetails);
        }
      });
    }
  }
  getDefaultPlanFromURL(): string {
    return this.getParamsService.getParameterByName('type');
  }

  displayPlans() {
    if (this.orderSummaryColor) {
      this.eligiblePlan = [];
      this.planData = [];
      this.simpleProductData.forEach(eachProduct => {
        if (eachProduct.color === this.orderSummaryColor) {
          eachProduct.saleable_plans.forEach(eachPlan => {
            this.eligiblePlan.push(eachPlan.sku);
          });
        }
      });
      if (this.eligiblePlan) {
        this.eligiblePlan.forEach(eachSku => {
          this.planProductData.forEach(elementPlan => {
            elementPlan.tab_data.forEach(eachPlan => {
              if (eachPlan.sku === eachSku) {
                this.planData.push(eachPlan);
              }
            });
          });
        });
      }
    }
  }

  SelectPlan(selectedPlanDetails: any, clk?) {
    this._plansService.selectPlan(selectedPlanDetails);
    this.selectedPlanName = selectedPlanDetails.plan_name;
    this.selectedPlanSku = selectedPlanDetails.sku;
    this.selectedMonthlyPay = selectedPlanDetails.plan_monthly_pay;
    if (clk === true) { // If plan clicked, other than page load.
      this._deviceDataService.publishUpdateStep(3);
    }
    this.DeselectAllOtherPlan(this.selectedPlanName);
    const foundCurrentPlanActiveItem = this.activeStateList[this.selectedPlanName];
    if (foundCurrentPlanActiveItem && foundCurrentPlanActiveItem.isActive === false) {
      // found , reverse state
      this.activeStateList[this.selectedPlanName].isActive = !this.activeStateList[this.selectedPlanName].isActive;
    } else {
      // first time
      this.activeStateList[this.selectedPlanName] = ({ planName: this.selectedPlanName, isActive: true });
    }
    if (this.activeStateList[this.selectedPlanName].isActive) {
      this.isActive = true;
      this._broadbandService.publicDataforPlan(selectedPlanDetails, this.selectedPlanSku, this.selectedPlanName, this.selectedMonthlyPay);

      this._estoreAnalyticsService.SetProductIdForBundleProduct(this.selectedPlanSku, this._renderer);
      this._estoreAnalyticsService.SetProductType("Bundle Device");

      setTimeout(() => {
        this._deviceDataService.publishSelected(this.isActive);
      }, 0);

      if (this.orderSummaryColor) {
        this.updatePrice(this.orderSummaryColor);
      }

    } else {
      this.ResetPlan();
      this._estoreAnalyticsService.SetProductIdForBundleProduct(this.selectedPlanSku, this._renderer);
      this._estoreAnalyticsService.SetProductType("Device");
    }
  }
  preSelection() {
    let preSelectedPlanSku;
    let selectedPlanDetails;
    if (localStorage && localStorage.getItem("homeWirelessData")) {
      this.homeWirelessData = JSON.parse(localStorage.getItem("homeWirelessData"));
      preSelectedPlanSku = this.homeWirelessData.plan.sku;
      this.planData.forEach(eachPlan => {
        if (eachPlan.sku === preSelectedPlanSku) {
          selectedPlanDetails = eachPlan;
          setTimeout(() => {
            this.SelectPlan(selectedPlanDetails);
          }, 0);
        }
      });
    }
  }
  public updatePrice(color) {
    this.simpleProductData.forEach(eachproduct => {
      if (eachproduct.color === color) {
        if (this.selectedPlanSku && eachproduct.saleable_plans) {
          eachproduct.saleable_plans.forEach(eachElement => {
            if (eachElement.sku === this.selectedPlanSku) {
              const devicePriceForPlan = JSON.parse(eachElement.prices.device_price);
              const upfrontPlan = JSON.parse(eachElement.prices.upfront_price);
              const totalPrice = devicePriceForPlan + upfrontPlan;
              this._deviceDataService.publishDevicePrice(devicePriceForPlan);
              this._deviceDataService.publishBundleUpfrontPrice(upfrontPlan);
              this._deviceDataService.publishTotalPay(totalPrice);
            }
          });
        }
      }
      this.upfrontInstallment = eachproduct.upfront_installment;
      if(this.upfrontInstallment) {
        this.upfrontInstallmentText = `Upfront Payment (To be rebated over ${this.upfrontInstallment} months)`;
      } else {
        this.upfrontInstallmentText = "Upfront Payment (To be rebated in first bill)";
      }
      this._deviceDataService.publishUpfrontInstallment(this.upfrontInstallmentText);
    });
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
    this.selectedPlanSku = '';
    this.selectedMonthlyPay = {};

    this._broadbandService.publicDataforPlan(null, null, null, null);
    this._deviceDataService.publishMonthlyPay(<any>{});
  }

}
