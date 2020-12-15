import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { TypeofPurchaseQuery } from 'app/Widget/side-summary/side-summary-container/type-of-purchase.store';
import { COBPResponse } from '../../../shared/models/cobp.model';
import { isNullOrUndefined } from 'app/shared/utilities/helper.ultility';

interface ISummaryInfo {
  basePlan: string;
  addOnpass: string;
  deviceImage: string;
  deviceName: string;
  deviceColor: string;
  deviceMemory: string;
  phoneNumber: string;
  devicePrice: string;
  basePlanPrice: string;
  addOnPassPrice: string;
  monthlyPrice: number;
  upfrontPrice: number;
  totalPrice: number;
  contract: number;
}
@Component({
  selector: 'app-moon-summary-section',
  templateUrl: './moon-summary-section.component.html',
  styleUrls: ['./moon-summary-section.component.css']
})
export class MoonSummarySectionComponent implements OnInit {
  @Input() moonPlanDeviceDetailsData;
  @Input() totalMonthlyCommitment;
  public summaryBasePlanMoon = null;
  public summaryAddOnPass = null;
  public summaryDeviceName = null;
  public summaryStorage: string;
  public summaryColor: string;
  public summaryDevicePrice: number;
  public summaryPlanName: string;
  public sharedContract: string;
  public monthlyPay: number;
  public bundleUpfrontPrice: number;
  public summaryTotalPay: number;
  public selectedImage;
  public summaryPhoneNo;
  public summarySelectedDeviceInfo: any = null;
  private subscriber: Subscription;
  public mvivaPlanUpfrontMoon = false;
  public isMviva = false;
  public mvivaSummaryMessageMoon = "";
  public upfrontInstallmentText = "Upfront Payment (To be rebated in first bill)";
  public summaryInfo: ISummaryInfo = {
    basePlan: null,
    addOnpass: null,
    deviceImage: null,
    deviceName: null,
    deviceColor: null,
    deviceMemory: null,
    phoneNumber: null,
    devicePrice: null,
    basePlanPrice: null,
    addOnPassPrice: null,
    monthlyPrice: null,
    upfrontPrice: null,
    totalPrice: null,
    contract: null
  };
  public deviceUpfrontPenalty = 0;
  isCobpElgible$: Observable<boolean>;
  isCobpElgiblityCheck = false;
  upfrontPayment$: Observable<number>;
  upfrontPrice: number;
  cobpResponse$: Observable<COBPResponse[]>;
  getCobpResponse:any;
  moonElgibilityObj:any;
  constructor(
    private _deviceDataService: DeviceDataService,
    private _topQuery: TypeofPurchaseQuery,
    private _planQuery: PlansQuery,
    
  ) { }

  ngOnInit() {
    this.subscriber = this._deviceDataService.sharedDeviceUpfrontPenalty$.subscribe(data => {
      if (data !== null && data !== undefined) {
      this.deviceUpfrontPenalty = Number(data);
      }
    });
    this.subscriber = this._deviceDataService.basePlanMoon$.subscribe(basePlan => {
      this.summaryBasePlanMoon = (basePlan === null) ? null : basePlan;
      this.prepareSummaryDetails();
    });
    this.subscriber = this._deviceDataService.selectedAddonPassDetails$.subscribe(addOn => {
      this.summaryAddOnPass = (addOn === null) ? null : addOn;
      this.prepareSummaryDetails();
    });
    this.subscriber = this._deviceDataService.sharedMoonSelectedProductDetails$.subscribe(data => {
      this.summarySelectedDeviceInfo = (data === null) ? null : data;
      this.prepareSummaryDetails();
    });
    this.subscriber = this._deviceDataService.sharedColor$.subscribe(data => {
      this.summaryColor = data;
      this.prepareSummaryDetails();
    });
    this.subscriber = this._deviceDataService.sharedStorage$.subscribe(data => {
      this.summaryStorage = data;
      this.prepareSummaryDetails();
    });
    this.subscriber = this._deviceDataService.sharedPhoneNo$.subscribe(data => {
      this.summaryPhoneNo = data;
      this.prepareSummaryDetails();
    });
    this.subscriber = this._deviceDataService.sharedBroadbandContract$.subscribe(data => this.sharedContract = data);
    this.subscriber = this._deviceDataService.isMviva$.subscribe( data => {
      this.isMviva = data;
      if (this.isMviva) {
       this.setMvivaParamsForMoon();
      } else {
        this.mvivaPlanUpfrontMoon = false;
        this.mvivaSummaryMessageMoon = "";
      }
    });
    this.subscriber = this._deviceDataService.bundleUpfrontInstallmentForMoon$.subscribe(data => this.upfrontInstallmentText = data);
    this.isCobpElgible$ = this._topQuery.isCOBPEligible$;
    this.isCobpElgible$.subscribe( data =>{
      if(data){
        this.isCobpElgiblityCheck = true;
      }
    });
    this.upfrontPayment$ = this._planQuery.select(store => store.upfront_payment);
    this.upfrontPayment$.subscribe( data =>{
      if(data){
        this.upfrontPrice = data;
      }
    })
    this.cobpResponse$ = this._topQuery.cobpResponse$;
    this.subscriber = this.cobpResponse$.subscribe((data => {
      this.getCobpResponse = data;
      this.prepareSummaryDetails(this.getCobpResponse);
      if(this.getCobpResponse && this.getCobpResponse[0]){
        if(!this.getCobpResponse[0].productEligibility.plan){
          this.summaryInfo.upfrontPrice = 0;
        }
      }
    }));
  }

  prepareSummaryDetails(cobpresp?) {
    this.summaryInfo.basePlan = (this.summaryBasePlanMoon === null) ? null : this.summaryBasePlanMoon.name;
    this.summaryInfo.addOnpass = (this.summaryAddOnPass === null) ? null : this.summaryAddOnPass.name;
    this.summaryInfo.deviceImage = this.getImage();
    this.summaryInfo.deviceName = (this.summarySelectedDeviceInfo === null) ? null : this.summarySelectedDeviceInfo.name;
    this.summaryInfo.deviceColor = this.summaryColor;
    this.summaryInfo.deviceMemory = this.summaryStorage;
    this.summaryInfo.phoneNumber = this.summaryPhoneNo;
    this.summaryInfo.contract = (this.summarySelectedDeviceInfo === null) ? null : this.summarySelectedDeviceInfo.contract;
    this.summaryInfo.devicePrice = (this.summarySelectedDeviceInfo === null) ? null : this.summarySelectedDeviceInfo.devicePrice;
    this.summaryInfo.basePlanPrice = (this.summaryBasePlanMoon === null) ? null : this.summaryBasePlanMoon.monthly_plan;
    this.summaryInfo.addOnPassPrice = (this.summaryAddOnPass === null) ? null : this.summaryAddOnPass.monthlyPay;
    this.summaryInfo.monthlyPrice = this.getPrice('monthly');
    this.summaryInfo.upfrontPrice = this.getItemUpfrontPrice();
    this.summaryInfo.totalPrice = this.getItemTotalPrice();
    this._deviceDataService.publishTotalPay(this.summaryInfo.totalPrice);
    if(this.deviceUpfrontPenalty){
      this._deviceDataService.publishTotalPay(this.summaryInfo.totalPrice + this.deviceUpfrontPenalty);
    }
    }
  

  getImage(): string {
    if (this.getItemType() === "plan") {
      return (this.summaryBasePlanMoon === null) ? "" : this.summaryBasePlanMoon.image_url;
    } else {
      return (this.summarySelectedDeviceInfo === null) ? "" : this.summarySelectedDeviceInfo.imagePath;
    }
  }

  getItemUpfrontPrice(): number {
    if (this.getItemType() === "plan") {
      return this.getPrice('upfront');
    } else {
      if (this.isMviva && this.mvivaPlanUpfrontMoon) {
        this.summarySelectedDeviceInfo.upfrontPrice = 0;
      }
      return (this.summarySelectedDeviceInfo.upfrontPrice === undefined) ? 0 : this.summarySelectedDeviceInfo.upfrontPrice;
    }
  }

  setMvivaParamsForMoon() {
    if (localStorage && localStorage.getItem("mvivaPlanUpfront")) {
      this.mvivaPlanUpfrontMoon = JSON.parse(localStorage.getItem("mvivaPlanUpfront"));
      if (this.mvivaPlanUpfrontMoon) {
        this._deviceDataService.publishOneTimePay(0);
      }
    }
    if (localStorage && localStorage.getItem("mvivaSummaryMessage")) {
      this.mvivaSummaryMessageMoon = localStorage.getItem("mvivaSummaryMessage");
    }
  }

  getItemTotalPrice(): number {
    const omni = this._planQuery.getValue()?.omni_campaign;
    let zero_upfront = false;
    if (omni && !isNullOrUndefined(omni.upfront_payment) && !omni.upfront_payment) {
      zero_upfront = true;
    }
    if (this.getItemType() === "plan") {
      if (zero_upfront) {
        return 0;
      }
      return this.getPrice('total');
    } else {
      if (this.mvivaPlanUpfrontMoon && this.isMviva) {
        this.summarySelectedDeviceInfo.upfrontPrice = 0;
      }
      if (zero_upfront) {
        this.summarySelectedDeviceInfo.upfrontPrice = 0;
        return 0;
      }
      return (
        Number((this.summarySelectedDeviceInfo.upfrontPrice === undefined) ? 0 : this.summarySelectedDeviceInfo.upfrontPrice) +
        Number((this.summarySelectedDeviceInfo === null) ? 0 : this.summarySelectedDeviceInfo.devicePrice)
      );
    }
  }

  getItemType(): string {
    return (this.summarySelectedDeviceInfo !== null) ? "bundle" : "plan";
  }

  getPrice(type): number {
    let isMnp = false;
    if (typeof window !== "undefined" && localStorage && localStorage.getItem("MNP-FLOW")) {
      isMnp = true;
    }
    if (isMnp === true && type !== 'monthly') {
      return 0;
    } else if (this.isMviva && this.mvivaPlanUpfrontMoon) {
      return 0;
    } else {
      return (
        Number((this.summaryBasePlanMoon !== null && this.summaryBasePlanMoon.monthly_plan !== null)
          ? this.summaryBasePlanMoon.monthly_plan : 0) +
        Number((this.summaryAddOnPass !== null && this.summaryAddOnPass.monthlyPay !== null)
          ? this.summaryAddOnPass.monthlyPay : 0)
      );
    }
  }
}