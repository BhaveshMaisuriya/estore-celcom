import { Component, OnInit, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription, Observable } from 'rxjs';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { UserService } from '../../../Service/user.service';
import { ActivatedRoute } from '@angular/router';
import { AUTO_BILLING } from '../../../shared/constants/application.constants';
import { PlansService } from '../../../Service/plans.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';

@Component({
  selector: 'app-device-flow',
  templateUrl: './device-flow.component.html',
  styleUrls: ['./device-flow.component.css'],
  providers: [UserService]
})
export class DeviceFlowComponent implements OnInit {
  @Input() data: any;
  @Input() isPromotion: any;
  @Input() isEasyPhone: any;
  @Input() confirmDeviceFlow: any;
  @Input() SelectionAferLogin; any;
  @Output() cobpEligibilityData = new EventEmitter();
  preOrder = false;
  preOrderData: any;
  deviceFlow: string;
  isEnterprise;
  public easyPhoneRentData: any;
  public easyPhoneOwnData: any;
  public price;
  public bundlePrice;
  public bundleData;
  public bundleUpfrontPrice;
  public upfrontData;
  private subscriber: Subscription;
  public cobpLoading = false;
  public isDealer = false;
  public IsDispalySwitchingPurchaseTypeTabPopup = false;
  public isInitializeChooseNumber: boolean;
  public isMviva = false;
  public principalLine;
  public dataToDisplay: string;
  isEasyPhoneRent$: Observable<boolean>;
  isEasyPhoneOwn$: Observable<boolean>;

  isEnableEasyPhoneMviva = false;
  popupType: any = { type: "switchingpurchasetype" };
  public newDeviceFlow: string;
  disableNewLineCobpSTen = false;
  disableSuppLineForSamsungGN = false;
  is_campaign_mviva_Flag = false;
  is_deviceBundle_Enable_Flag = false;
  is_easyPhone_Enable_Flag = false;
  campaign_mviva:any;

  constructor(
    public _deviceDataService: DeviceDataService,
    public _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _plansService: PlansService,
    private _planQuery: PlansQuery

  ) { }

  ngOnInit() {
    
    if(this.data && this.data.campaign_mviva !== undefined){
      this.is_campaign_mviva_Flag=this.data.is_campaign_mviva;
      if(this.is_campaign_mviva_Flag){
        this.campaign_mviva = this.data.campaign_mviva;
        if(this.campaign_mviva.device_bundle=="1" && this.campaign_mviva.easyphone=="1"){
          this.is_deviceBundle_Enable_Flag = true;
          this.is_easyPhone_Enable_Flag = true;
        }
        else if(this.campaign_mviva.device_bundle=="1"){
          this.is_deviceBundle_Enable_Flag = true;
        }else if(this.campaign_mviva.easyphone=="1"){
          this.is_easyPhone_Enable_Flag = true;
        }
      }
    }
    this.isEasyPhoneOwn$ = this._planQuery.isEasyPhoneOwn$;
    this.isEasyPhoneRent$ = this._planQuery.isEasyPhoneRent$;
    this.isEnterprise = this._userService.isUserEnterprise();
    this.isDealer = this._userService.isDealer();
    this.subscriber = this._deviceDataService.sharedEditCartEasyPhone$.subscribe(
      data => {
        this.isEasyPhone = data;
        this.deviceFlowSelection('easyPhone');
      });
    this.subscriber = this._deviceDataService.easyPhoneRentData$.subscribe(data => {
      this.easyPhoneRentData = data;
      this.UpdatePriceData();
    });
    this.subscriber = this._deviceDataService.easyPhoneOwnData$.subscribe(data => {
      this.easyPhoneOwnData = data;
      this.UpdatePriceData();
    });
    this.subscriber = this._deviceDataService.easyPhoneBundleData$.subscribe(data => {
      this.bundleData = data;
      this.UpdateBundleData(this.bundleData);
    });
    this.subscriber = this._deviceDataService.easyPhoneUpfrontData$.subscribe(data => {
      const upfrontData = data;
      this.UpdateUpfrontPrice(upfrontData);
    });
    this.subscriber = this._deviceDataService.cobpLoading$.subscribe(data => {
      setTimeout(() => {
        this.cobpLoading = data;
      }, 0);
    });
    this.subscriber = this._deviceDataService.selectedPrincipalLine$.subscribe(data => this.principalLine = data);
    localStorage.removeItem('easyPhoneSelected');
    localStorage.removeItem('deviceBundleSelected');
    // this.subscriber = this._deviceDataService.isMviva$.subscribe(
    //   data => {
    //     this.isMviva = data;
    //     if (this.isMviva) {
    //       this.deviceFlow = 'deviceBundle';
    //     }
    //   });
    if (this.data && this.data.is_rent && this.data.is_own) {
      this.dataToDisplay = 'Own or Rent';
    } else if (this.data && this.data.is_rent && !this.data.is_own) {
      this.dataToDisplay = 'Rent';
    } else if (this.data && !this.data.is_rent && this.data.is_own) {
      this.dataToDisplay = 'Own';
    }
    this.preOrder = false;
    if (this.data && this.data.preorder && this.data.preorder !== null) {
      const preOrderFlag = this.data.preorder;
      if (preOrderFlag === 1) {
        this.preOrder = true;
      }
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("isMviva")) {
      this.isMviva = JSON.parse(localStorage.getItem("isMviva"));
      if (this.isMviva) {
        if (this.data !== undefined &&
          this.data.campaign_mviva &&
          this.data.campaign_mviva.purchase_type) {
          this.isEasyPhone = this.data.campaign_mviva.purchase_type.includes("easyphone");
        }
      }
    }
    // Set default to device bundle selection if user comes from promotional sites.
    // this.data.default_device_option = "easyPhone";
    // this.data.default_device_option = "deviceBundle";
    // this.data.default_device_option = "deviceOnly";
    if (this.isPromotion) {
      this.deviceFlow = 'deviceBundle';
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('deviceBundleSelected', 'TRUE');
      }
      this.deviceFlowSelection(this.deviceFlow);
    } else if (this.data && this.data.default_device_option !== undefined
      && this.data.default_device_option !== null
      && !this.data.editProduct && !this.SelectionAferLogin) {
      if (this.data.default_device_option === 'easyPhone' && this.data.is_easy_phone === 1) {
        this.deviceFlow = this.data.default_device_option;
      } else if (this.data.default_device_option === 'easyPhone' && this.data.is_easy_phone === 0) {
        this.deviceFlow = 'deviceBundle';
      } else {
        this.deviceFlow = this.data.default_device_option;
      }
      this._plansService.selectDeviceBundleType(this.deviceFlow);
      // campaign mviva
      if(this.data.is_campaign_mviva === true) {
        if(this.data.campaign_mviva.device_bundle === "1") {
          this.deviceFlow = 'deviceBundle';
        }
      }
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem(this.deviceFlow + 'Selected', 'TRUE');
      }
      this.deviceFlowSelection(this.deviceFlow);
      // @to do.. remove below if block once above code working fine.
    } else if (this.data && !this.data.editProduct && !this.SelectionAferLogin) {
      // when user comes to device bundle other than promotional site.
      if (this.isEasyPhone === true) {
        if (localStorage.getItem('supplementryFlow')) {
          this.deviceFlow = 'deviceBundle';
          this.deviceFlowSelection(this.deviceFlow);
          localStorage.setItem('deviceBundleSelected', 'TRUE');
        } else {
          this.deviceFlow = 'easyPhone';
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('easyPhoneSelected', 'TRUE');
          }
        }
      } else {
        if (localStorage.getItem('supplementryFlow')) {
          this.deviceFlow = 'deviceBundle';
          this.deviceFlowSelection(this.deviceFlow);
          localStorage.setItem('deviceBundleSelected', 'TRUE');
        }
        this.deviceFlow = 'deviceBundle';
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('deviceBundleSelected', 'TRUE');
        }
      }
    } else if (this.SelectionAferLogin) {
      if ((this.SelectionAferLogin.principalNum || this.SelectionAferLogin.suppLinesDetails) ||
        (localStorage.getItem('isBundleClicked') && localStorage.getItem('isBundleClicked') === 'true' &&
          localStorage.getItem('COBP_FLOW') === 'YES')) {
        this.deviceFlow = 'deviceBundle';
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('deviceBundleSelected', 'TRUE');
          localStorage.setItem('bundleEditCobp', 'TRUE');
        }
      } else if (((localStorage.getItem("isOwnClicked") && localStorage.getItem("isOwnClicked") === "true") ||
        (localStorage.getItem("isRentClicked") && localStorage.getItem("isRentClicked") === "true")) &&
        (localStorage.getItem('COBP_FLOW') && localStorage.getItem('COBP_FLOW') === 'YES')) {
        this.isEasyPhone = true;
        this.deviceFlow = 'easyPhone';
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('easyPhoneSelected', 'TRUE');
        }
      }
    } else {
      if (this.data && this.data.editProduct && this.data.editProduct.is_easyphone) {
        if (localStorage.getItem('supplementryFlow')) {
          this.deviceFlow = 'deviceBundle';
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('deviceBundleSelected', 'TRUE');
          }
        } else {
          this.isEasyPhone = true;
          this.deviceFlow = 'easyPhone';
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('easyPhoneSelected', 'TRUE');
          }
        }
      } else if (this.data && this.data.editProduct && this.data.editProduct.selectedProduct &&
        this.data.editProduct.selectedProduct.orderDeviceName) {
        if (this.data.editProduct.selectedProduct.orderPlanName &&
          (this.data.editProduct.selectedProduct.orderNumberType === "NewNumber" ||
            this.data.editProduct.selectedProduct.orderNumberType === "KeepNumber" ||
            this.data.editProduct.selectedProduct.orderNumberType === "SwitchToCelcom")) {
          this.deviceFlow = 'deviceBundle';
          if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('deviceBundleSelected', 'TRUE');
            localStorage.setItem('bundleEditCobp', 'TRUE');
          }
        } else if (this.data.editProduct.selectedProduct.orderPlanName === undefined) {
          this.deviceOnlyFlow();
        }
      }
    }
    this._activatedRoute.queryParams.subscribe(params => {
      if(params.deviceOption && params.deviceOption == 'easyPhone' && this.isEasyPhone){
        this.deviceFlow = params.deviceOption;
        localStorage.setItem('easyPhoneSelected',"TRUE");
        localStorage.removeItem('deviceBundleSelected');
      }else if(params.deviceOption && params.deviceOption == 'deviceBundle'){
        this.deviceFlow = params.deviceOption;
        localStorage.removeItem('easyPhoneSelected');
        localStorage.setItem('deviceBundleSelected', 'TRUE');
      }
      if (this.deviceFlow && !this.isPromotion) {
        this.deviceFlowSelection(this.deviceFlow);
      }
    });

  }

  public deviceFlowSelection(deviceFlow) {
    this._plansService.selectDeviceBundleType(deviceFlow);
    if (this.principalLine) {
      if (deviceFlow === 'easyPhone') {
        this.IsDispalySwitchingPurchaseTypeTabPopup = true;
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('popup', 'true');
        }
      } else {
        this.IsDispalySwitchingPurchaseTypeTabPopup = false;
        this.deviceFlow = deviceFlow;
        if (deviceFlow === 'deviceBundle') {
          this.deviceBundleFlow();
        } else if (deviceFlow === 'easyPhone') {
          this.easyPhoneFlow();
        } else {
          this.deviceOnlyFlow();
        }
      }
    } else {
      this.deviceFlow = deviceFlow;
      if (deviceFlow === 'deviceBundle') {
        this.deviceBundleFlow();
      } else if (deviceFlow === 'easyPhone') {
        this.easyPhoneFlow();
      } else {
        this.deviceOnlyFlow();
      }
    }
    // Function to set newline and mnp button to false from april 5 to 15 2019.
    this.disableNewLineCobpForSamsungSTen(deviceFlow);
    // this.disableSupplimentaryLineForSamsungGN(deviceFlow);
  }

  public deviceBundleFlow() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('isDeviceOnlyClicked');
      localStorage.setItem("isBundleClicked", JSON.stringify(true));
      localStorage.setItem("isEasyPhone", JSON.stringify(false));
      localStorage.setItem("isRentClicked", JSON.stringify(false));
      localStorage.setItem("isOwnClicked", JSON.stringify(false));
    }
    this._deviceDataService.publishDevicePagePurchaseTypeTab("Device Bundle");
    this._deviceDataService.publishTabSelected(true);
    this._deviceDataService.publishNumberType(null);
  }
  public easyPhoneFlow() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('isDeviceOnlyClicked');
      // For project star
      localStorage.setItem("isOwnClicked", JSON.stringify(true));

      localStorage.setItem("isEasyPhone", JSON.stringify(true));
      localStorage.setItem("isBundleClicked", JSON.stringify(false));
      if (localStorage.getItem("isOwnClicked") && JSON.parse(localStorage.getItem("isOwnClicked")) === true) {
        localStorage.setItem("isRentClicked", JSON.stringify(false));
      } else {
        if ((localStorage.getItem("isRentClicked") && JSON.parse(localStorage.getItem("isRentClicked")) === true) ||
          (this.data && this.data.is_rent)) {
          localStorage.setItem("isRentClicked", JSON.stringify(true));
          localStorage.setItem("isOwnClicked", JSON.stringify(false));
        } else {
          localStorage.setItem("isRentClicked", JSON.stringify(false));
          localStorage.setItem("isOwnClicked", JSON.stringify(true));
        }
      }
    }
    this._deviceDataService.publishDevicePagePurchaseTypeTab("Easyphone");
    this._deviceDataService.publishTabSelected(true);
  }
  public deviceOnlyFlow() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("isRentClicked", JSON.stringify(false));
      localStorage.setItem("isOwnClicked", JSON.stringify(false));
      localStorage.setItem("isEasyPhone", JSON.stringify(false));
      localStorage.removeItem('supplementryFlow');
      localStorage.setItem("isDeviceOnlyClicked", JSON.stringify(true));
      localStorage.setItem("isEasyPhone", JSON.stringify(false));
      localStorage.setItem("isBundleClicked", JSON.stringify(false));
      localStorage.removeItem("enableChoosewayLogin");
    }
    this._deviceDataService.publishDevicePagePurchaseTypeTab("Device Only");
    this._deviceDataService.publishSupplimentaryLines([]);
    this._deviceDataService.publishSupplinesLinesPrice(null);
    this._deviceDataService.publishTabSelected(true);
    this._deviceDataService.publishDisclaimerAgree(false);
    this._deviceDataService.publishBasePlanStar(null);
  }
  onSwitchingTab(purchaseType: string) {
    let autobilling;
    if(localStorage && localStorage.getItem("DeviceDetailResponse")) {
      const data = JSON.parse(localStorage.getItem("DeviceDetailResponse"));
      if(data && data.items && data.items.base_plan[0] && data.items.base_plan[0].bill_type) {
        autobilling = data.items.base_plan[0].bill_type;
      }
    }

    if(localStorage && localStorage.getItem("SelectedPlanDetailsInDevice")) {
      if(autobilling !== null && autobilling !== undefined) {
        autobilling = JSON.parse(localStorage.getItem("SelectedPlanDetailsInDevice")).sku;
      }
    }
    if(purchaseType === "deviceOnly") {
      autobilling = AUTO_BILLING.NO;
    }
    this._deviceDataService.publishMandatoryAutoBilling(autobilling ? autobilling : 0);
    if (localStorage && (localStorage.getItem("MNP-FLOW")) ||
      (localStorage.getItem("COBP_FLOW") && !localStorage.getItem("COBP_login")) ||
      localStorage.getItem("PrincipleNumberSelected")) {
      this.IsDispalySwitchingPurchaseTypeTabPopup = true;
      this.newDeviceFlow = purchaseType;
    } else {
      this.deviceFlow = purchaseType;
      this.deviceFlowSelection(purchaseType);
    }
    // (click)='deviceFlowSelection("easyPhone");'
  }

  onCancellingSwitchingPurchaseTypeTab() {
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
    localStorage.removeItem('popup');
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
    this._deviceDataService.publishPrincipalLine(false);
    this._deviceDataService.publishSupplinesLinesPrice(null);
    this.isInitializeChooseNumber = true;
    this.cobpEligibilityData.emit(this.isInitializeChooseNumber);
    // this.easyPhoneFlow();
    localStorage.removeItem("PrincipleNumberSelected");
    localStorage.removeItem("COBP_FLOW");
    localStorage.removeItem("MNP-FLOW");
    this.deviceFlow = this.newDeviceFlow;
    this.deviceFlowSelection(this.deviceFlow);
  }
  public UpdatePriceData() {
    let easyPhoneData;
    if (this.data && this.data.is_rent) {
      if (typeof window !== 'undefined' && localStorage && this.easyPhoneRentData === undefined &&
        localStorage.getItem("easyPhoneRentData")) {
        this.easyPhoneRentData = JSON.parse(localStorage.getItem("easyPhoneRentData"));
      }
      easyPhoneData = this.easyPhoneRentData;
    } else {
      if (typeof window !== 'undefined' && localStorage && this.easyPhoneOwnData === undefined &&
        localStorage.getItem("easyPhoneOwnData")) {
        this.easyPhoneOwnData = JSON.parse(localStorage.getItem("easyPhoneOwnData"));
      }
      easyPhoneData = this.easyPhoneOwnData;
    }
    if (easyPhoneData && easyPhoneData !== null) {
      let lowestPrice;
      easyPhoneData.forEach(planPrice => {
        const planPriceToCompare = JSON.stringify(Object.values(planPrice)[0]);
        const price = JSON.parse(planPriceToCompare);
        if (!lowestPrice || lowestPrice > JSON.parse(price)) {
          lowestPrice = JSON.parse(price);
          this.price = JSON.parse(price);
        }
      });
    }
  }
  public UpdateBundleData(bundleData: any) {
    if (bundleData === undefined) {
      if (typeof window !== 'undefined' && localStorage) {
        if (localStorage.getItem("easyPhoneUpfrontData")) {
          this.bundleData = JSON.parse(localStorage.getItem("easyPhoneUpfrontData"));
        }
      }
    }
    const planType = 'FPP';
    if(bundleData){
      bundleData.forEach(element => {
        if (element.key === planType) {
          this.bundlePrice = element.value;
        }
      });
    }
  }
  public UpdateUpfrontPrice(upfrontData: any) {
    if (upfrontData === undefined) {
      if (typeof window !== 'undefined' && localStorage) {
        if (localStorage.getItem("easyPhoneUpfrontData")) {
          this.upfrontData = JSON.parse(localStorage.getItem("easyPhoneUpfrontData"));
        }
      }
    }
    const planType = 'FPP';
    if(upfrontData){
      upfrontData.forEach(element => {
        if (element.key === planType) {
          this.bundlePrice = (Number(this.bundlePrice) + Number(element.value)).toString();
        }
      });
    }
  }
   /**
   * Function to set newline and mnp button to false from april 5 to 15 2019.
   */
  disableNewLineCobpForSamsungSTen(deviceFlow) {
    const deviceSku = this.data.sku;
    const currentDate = new Date();
    this.disableNewLineCobpSTen = false;
    const minDate = new Date('April 5 2019 00:00');
    const maxDate =  new Date('April 16 2019 00:00');
    // Uncomment and change below dates for testing
    // const minDate = new Date('April 1 2019 00:00');
    // const maxDate =  new Date('April 4 2019 00:00');
    if (currentDate >= minDate
      && currentDate < maxDate
      && deviceSku === "Samsung-Galaxy-S10"
      && deviceFlow !== 'easyPhone') {
      this.disableNewLineCobpSTen = true;
    }
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('DisableNewLineCobpSTen', String(this.disableNewLineCobpSTen));
    }
    this._deviceDataService.publishDisableNewLineCobpSTen(this.disableNewLineCobpSTen);
  }
  disableSupplimentaryLineForSamsungGN(deviceFlow) {
    const deviceSku = this.data.sku;
    this.disableSuppLineForSamsungGN = false;
    if ((
      deviceSku === "Samsung-Galaxy-Note-10"
      || deviceSku === "Samsung-Galaxy-Note-10-Plus"
      )
      && deviceFlow !== 'easyPhone') {
      this.disableSuppLineForSamsungGN = true;
    }
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('disableSuppLineForSamsungGN', String(this.disableSuppLineForSamsungGN));
    }
    this._deviceDataService.publishDisableSuppLineForSamsungGN(this.disableSuppLineForSamsungGN);
  }
}
