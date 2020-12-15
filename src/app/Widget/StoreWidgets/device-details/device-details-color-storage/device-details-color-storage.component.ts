import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
import { DeviceDetailsStorageService } from "./device-details-color-storage.service";
import { AppWidgetComponent } from '../../../../Model/app.widget.component';
import { BaseComponent } from '../../../../base.component';
import { ContentNavigation } from '../../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../../Service/redirection.service';
import { DeviceDataService } from '../../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment';
import { EStoreAnalysticsService } from '../../../../Service/store.analytic.service';
import { PlansService } from '../../../../Service/plans.service';

@Component({
  selector: 'app-devicedetails-color-storage-component',
  templateUrl: './device-details-color-storage.component.html',
  styleUrls: ['./device-details-color-storage.component.css'],
  providers: [DeviceDetailsStorageService, RedirectionService]
})
export class DeviceDetailsStorageComponent extends BaseComponent implements OnInit, AppWidgetComponent {
  @Input() data: any;
  @Input() selectedProd: any;
  @Input() SelectionAferLogin: any;
  // public editDeviceObj:any={};
  private subscriber: Subscription;
  public DeviceDetailsStorageResponse = null;
  public colorList: Array<any> = [];
  public storageList: Array<any> = [];
  public selectedDevice: any = null;
  public selectedDeviceBrand: any = null;
  public selectedColor: any = null;
  public selectedStorage: any = null;
  public selectedModel: any = null;
  public selectedPlan: any = null;
  public preOrderData: any = null;
  public isPreOrder = false;
  public isEasyPhone = false;
  public isMviva = false;
  public fgp = "FGP";
  public fgs = "FGS";
  public fp = "FP";
  public fpp = "FPP";
  public preOrderEnded = false;
  public selectedMonthlyPay: any = null;
  public selecteImageList: Array<any> = [];
  public selectedContract: any = null;
  public selectedImage: any;
  public cobpLoading = false;
  public suppPrice: number;
  public suppCount = 0;
  suppLinesDetails = [];
  outletId: string = environment.outletId;
  @Output() SelectedColor: EventEmitter<string> = new EventEmitter<any>();
  @Output() SelectedStorage: EventEmitter<string> = new EventEmitter<any>();
  @Output() saleablePlanArrayToTransfer: EventEmitter<any> = new EventEmitter<any>();
  deviceStock = "";
  pageLoad = false;
  supplimentaryCount = 0;
  constructor(private devicedetailstorageservice: DeviceDetailsStorageService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _deviceDataService: DeviceDataService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _plansService: PlansService,
    ) {
    super();
  }

  ngOnInit() {
    this.pageLoad = true;
    this.Init();
    this.subscriber = this._deviceDataService.sharedSuppLinesPrice$.subscribe(
      data => {
        this.suppLinesDetails = data;
      });
  }

  Init() {
    this.subscriber = this._deviceDataService.cobpLoading$.subscribe(data => {
      setTimeout(() => {
        this.cobpLoading = data;
      }, 0);
    });
    if (this.data) {
      this.DeviceDetailsStorageResponse = this.data.associated_product;
      this.selectedDevice = this.data.basic_details.sku;
      this.selectedDeviceBrand = this.data.basic_details.order_brand;
      this.selectedModel = this.data.basic_details.order_model;
      this.DeviceDetailsStorageResponse.forEach(element => {
        const deviceColor = {
          colorName: element.color,
          colorHex: element.color_hexa
        };
        const deviceMemory = element.memory;

        // Do not push if already exists.
        const existingColor = this.colorList.find((colorInList) => colorInList.colorName === deviceColor.colorName);
        if (!existingColor) {
          this.colorList.push(deviceColor);
        }
        // Do not push if already exists.
        if (this.storageList.indexOf(deviceMemory) === -1) {
          this.storageList.push(deviceMemory);
        }
      });
      this._deviceDataService.publishDevice(this.data.basic_details.sku);
      this._deviceDataService.publishDevicePrice(this.data.basic_details.device_price);
      this._deviceDataService.publishOneTimePay(this.data.basic_details.upfront_price);
      // commented since it is not required if you select only devices
  }
    if (this.selectedProd) {
      if (this.selectedProd.ispreorder && this.selectedProd.ispreorder === 1) {
        this.isPreOrder = true;
      } else {
        this.isPreOrder = false;
      }
      this._deviceDataService.publishPreOrder(this.isPreOrder);
      localStorage.setItem("isPreOrder", JSON.stringify(this.isPreOrder));

      if (this.isPreOrder) {
        if (this.selectedProd.availabilityflag && this.selectedProd.availabilityflag === 1) {
          this.preOrderEnded = false;
        } else {
          this.preOrderEnded = true;
        }
      }
      this._deviceDataService.publishPreOrderEnded(this.preOrderEnded);
      localStorage.setItem("preOrderEnded", JSON.stringify(this.preOrderEnded));

        if (this.selectedProd.ismviva) {
          this.isMviva = true;
          if (this.selectedProd.mvivaSummaryMessage) {
            localStorage.setItem("mvivaSummaryMessage", this.selectedProd.mvivaSummaryMessage);
          } else {
            localStorage.removeItem("mvivaSummaryMessage");
          }

          if (localStorage.getItem("mvivaPlanUpfront")) {
            localStorage.removeItem("mvivaPlanUpfront");
            }

          if (this.selectedProd.mvivaBundleUpfront) {
            localStorage.setItem("mvivaBundleUpfront", JSON.stringify(this.selectedProd.mvivaBundleUpfront));
          } else {
            localStorage.removeItem("mvivaBundleUpfront");
          }
        }
        this._deviceDataService.publishMviva(this.isMviva);
        localStorage.setItem("isMviva", JSON.stringify(this.isMviva));

      // this.editDeviceObj=this.selectedProd.associated_product;
      setTimeout(() => {
        if (this.selectedProd.iseasyphone && this.selectedProd.iseasyphone === 1 &&
           (localStorage.getItem("isEasyPhone") && JSON.parse(localStorage.getItem("isEasyPhone")) === true &&
           localStorage.getItem("isBundleClicked") && JSON.parse(localStorage.getItem("isBundleClicked")) === false)) {
          this.isEasyPhone = true;
        } else {
          this.isEasyPhone = false;
          if (localStorage && localStorage.getItem("isRentClicked")) {
            localStorage.removeItem("isRentClicked");
          }
          if (localStorage && localStorage.getItem("isOwnClicked")) {
            localStorage.removeItem("isOwnClicked");
          }
          if (localStorage && localStorage.getItem("isBundleClicked")) {
            localStorage.removeItem("isBundleClicked");
          }

        }
        this._deviceDataService.publishEasyPhone(this.isEasyPhone);
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("isEasyPhone", JSON.stringify(this.isEasyPhone));
        }

        this.SelectColor(this.selectedProd.color);
        this.SelectStorage(this.selectedProd.storage);
        this.subscriber = this._deviceDataService.sharedPlan$.subscribe(data => {
          this.selectedPlan = data;
        });
        this.subscriber = this._deviceDataService.sharedMonthlyPay$.subscribe(data => this.selectedMonthlyPay = data);
      }, 0);

      // To accommodate the contract changes
      this.DeviceDetailsStorageResponse.forEach(element => {
        if (element.color === this.selectedProd.color && element.memory === this.selectedProd.storage) {
          this._deviceDataService.publishSharedContract(element.contract);
        }
      });
    }
    if (this.SelectionAferLogin != null) {
      setTimeout(() => {
        this.SelectColor(this.SelectionAferLogin.color);
        this.SelectStorage(this.SelectionAferLogin.storage);
      }, 0);
      if (this.SelectionAferLogin && this.SelectionAferLogin.preOrder) {
        if (this.SelectionAferLogin.preOrder === 1) {
          this.isPreOrder = true;
        } else {
          this.isPreOrder = false;
        }
      }
    }
  }


  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  SelectColor(deviceColor: any) {
    this.storageList = [];
    this.SelectedColor.emit(deviceColor);
    this.selectedColor = deviceColor;
    this._deviceDataService.publishUpfrontWaived(false);
    this._deviceDataService.publishUpfrontWaivedSuccess(false);
    this._deviceDataService.publishUpfrontWaivedFailure(false);
   // this._deviceDataService.publishSupplimentaryLines([]);
    if (typeof window !== "undefined") {
      if (localStorage) {
        localStorage.setItem("selectedColor", this.selectedColor);
      }
      this._deviceDataService.publishColor(deviceColor);
      this._deviceDataService.publishColorStorageChange(true);

      // Update device image.
      this.updateImage();
      // Update Prices on color selection.
      this.updatePrice();
    }
    // To accommodate the contract changes
    this.DeviceDetailsStorageResponse.forEach(element => {
      if (this.selectedColor === element.color) {
        const deviceMemory = element.memory;
        // Do not push if already exists.
        if (this.storageList.indexOf(deviceMemory) === -1) {
          this.storageList.push(deviceMemory);
        }
      }

      if (element.color === deviceColor && this.selectedProd && element.memory === this.selectedProd.storage) {
        this._deviceDataService.publishSharedContract(element.contract);
      }
      // For Abobe Analytics
      if (element.color === deviceColor && element.memory === this.selectedStorage) {
        this._estoreAnalyticsService.SetProductId(element.sku, this._renderer);
        this._estoreAnalyticsService.SetProductTotalForDevice(element.rrp, this._renderer);
      }
    });
  }

  SelectStorage(deviceStorage: any) {
    this.colorList = [];
    this.selectedStorage = deviceStorage;
    this.SelectedStorage.emit(deviceStorage);
    this._deviceDataService.publishUpfrontWaived(false);
    this._deviceDataService.publishUpfrontWaivedSuccess(false);
    this._deviceDataService.publishUpfrontWaivedFailure(false);
   // this._deviceDataService.publishSupplimentaryLines([]);
    if (typeof window !== "undefined") {
      if (localStorage) {
        localStorage.setItem("selectedStorage", this.selectedStorage);
      }
      this._deviceDataService.publishStorage(deviceStorage);
      this._deviceDataService.publishColorStorageChange(true);
      this.updatePrice();
     // this._deviceDataService.publishSupplimentaryLines(this.suppLinesDetails);
    }
    // Update device image.
    this.updateImage();
    // To accommodate the contract changes
    this.DeviceDetailsStorageResponse.forEach(element => {
      if (deviceStorage === element.memory) {
        const deviceColor = {
          colorName: element.color,
          colorHex: element.color_hexa
        };
        // Do not push if already exists.
        const existingColor = this.colorList.find((colorInList) => colorInList.colorName === deviceColor.colorName);
        if (!existingColor) {
          this.colorList.push(deviceColor);
        }
      }
      if (this.selectedProd && element.color === this.selectedProd.color && element.memory === deviceStorage) {
        this._deviceDataService.publishSharedContract(element.contract);
      }
      // For Adobe Analytics
      if (element.color === this.selectedColor && element.memory === deviceStorage) {
        this._estoreAnalyticsService.SetProductId(element.sku, this._renderer);
        this._estoreAnalyticsService.SetProductTotalForDevice(element.rrp, this._renderer);
      }
    });
  }
  // need to refactor this, function repeasted in plan component.
  public updatePrice() {
    this.subscriber = this._deviceDataService.sharedPlan$.subscribe(data => {
      this.selectedPlan = data;
    });
    const selectedColor = this.selectedColor;
    const selectedMemory = this.selectedStorage;
    if (localStorage.getItem("SelectedPlan") && !localStorage.getItem("BuyNoPlan")) {
       this.selectedPlan = localStorage.getItem("SelectedPlan");
    }
    // Do not calculate the price if one of the attribute is missing.
    if (!(selectedColor && selectedMemory)) {
      return;
    }
    this.DeviceDetailsStorageResponse.forEach(element => {
      const elementColor: string = element.color;
      const elementMemory: string = element.memory;
      if (elementColor === selectedColor && elementMemory === selectedMemory) {
        let totalPay = 0;
        this._deviceDataService.publishRrPPrice(element.rrp);
        if (this.selectedPlan) { // If plan is selected
          let upfrontPrice;
          let devicePrice;
          if (element.saleable_plans && element.saleable_plans.length > 0) {
            for (let i = 0; i < element.saleable_plans.length; i++) {
              if ((this.selectedPlan === element.saleable_plans[i].sku) && element.saleable_plans[i].prices[this.suppCount].device_price) {
                devicePrice = element.saleable_plans[i].prices[this.suppCount].device_price;
                this._deviceDataService.publishDevicePrice(devicePrice);
                this._deviceDataService.publishBundlePrice(devicePrice);
                this.saleablePlanArrayToTransfer.emit(element.saleable_plans[i]);
                this._deviceDataService.publishSaleablePlanArray(element.saleable_plans[i]);
              }
              if ((this.selectedPlan === element.saleable_plans[i].sku) && element.saleable_plans[i].prices[this.suppCount].upfront_price) {
                upfrontPrice = element.saleable_plans[i].prices[this.suppCount].upfront_price;
                this._deviceDataService.publishOneTimePay(upfrontPrice);
                this.saleablePlanArrayToTransfer.emit(element.saleable_plans[i]);
                this._deviceDataService.publishSaleablePlanArray(element.saleable_plans[i]);
              }
            }
          }
          totalPay = parseFloat(upfrontPrice) + parseFloat(devicePrice);
          if (this.isMviva && localStorage.getItem("mvivaBundleUpfront") &&
           JSON.parse(localStorage.getItem("mvivaBundleUpfront")) === true) {
            this._deviceDataService.publishTotalPay(parseFloat(devicePrice));
          } else {
          this._deviceDataService.publishTotalPay(totalPay);
          }
          this._deviceDataService.publishSelectProductSku(element.sku);
        } else { // Plan not selected
          // this._deviceDataService.publishOneTimePay(element.upfront_for_fg);
          totalPay = parseFloat(element.rrp);
          // Add discounted price if exists.
          if (element.discounted_device_rrp) {
            totalPay = parseFloat(element.discounted_device_rrp);
          }
          this._deviceDataService.publishDevicePrice(element.rrp);
          this._deviceDataService.publishTotalPay(totalPay);
          this._deviceDataService.publishSelectProductSku(element.sku);
        }
        // check stock availability for the selected color and storage
        if (this.selectedColor && this.selectedStorage) {
          this.checkStockAvailability(element);
          if (typeof window !== 'undefined' && localStorage && localStorage.getItem('isEasyPhone') &&
           !localStorage.getItem('EasyPhoneEditCart') && !localStorage.getItem('EasyPhoneCOBP')) {
            const isEasyPhone = JSON.parse(localStorage.getItem('isEasyPhone'));
            if (isEasyPhone) {
              this._deviceDataService.publishPhoneNo(null);
              this._deviceDataService.publishNumberType(null);
              this._deviceDataService.publishEasyPhoneTabsClicked(null);
              this._deviceDataService.publishDeviceUpfront(null);
              this._deviceDataService.publishPlanUpfront(null);
            }
          }
          if (localStorage && localStorage.getItem('EasyPhoneEditCart')) {
            localStorage.removeItem('EasyPhoneEditCart');
          }
          if (localStorage && localStorage.getItem('EasyPhoneCOBP')) {
            localStorage.removeItem('EasyPhoneCOBP');
          }
          const eligiblePlanArray = [];
          if (element.saleable_plans) {
          for (let i = 0; i < element.saleable_plans.length; i++) {
            if (element.saleable_plans[i].sku) {
              eligiblePlanArray.push(element.saleable_plans[i].sku);
            }
          }
        }
          let isEasyphoneSelected = false;
          if (localStorage && localStorage.getItem("isEasyPhone") &&
            JSON.parse(localStorage.getItem("isEasyPhone")) === true) {
              isEasyphoneSelected = true;
          }
          if (eligiblePlanArray && eligiblePlanArray.length > 0) {
            const planSelectedPlan = this.selectedPlan;
            const isPlanAvailable = eligiblePlanArray.find(function(element) {
              if (element.indexOf(planSelectedPlan) > -1) {
                return true;
              }
            });
            if ((!isPlanAvailable && !isEasyphoneSelected) || this.pageLoad) {
            this.pageLoad = false;
            this._deviceDataService.publishSupplimentaryLines([]);
            this._deviceDataService.publishEligiblePlanArray(eligiblePlanArray);
            }
          }
          if (this.data && this.data.basic_details && this.data.basic_details.is_rent && element.easy_phone &&
            element.easy_phone.rent_selected_plan && isEasyphoneSelected) {
            const eligiblePlanRentArray = element.easy_phone.rent_selected_plan;
            this._deviceDataService.publishSupplimentaryLines([]);
            if (eligiblePlanRentArray && eligiblePlanRentArray.length > 0) {
              this._deviceDataService.publishEligibleRentPlanArray(eligiblePlanRentArray);
            }
          }

          if (this.data && this.data.basic_details && this.data.basic_details.is_own && element.easy_phone &&
            element.easy_phone.own_selected_plan && isEasyphoneSelected) {
            const eligiblePlanOwnArray = element.easy_phone.own_selected_plan;
            this._deviceDataService.publishSupplimentaryLines([]);
            if (eligiblePlanOwnArray && eligiblePlanOwnArray.length > 0) {
              this._deviceDataService.publishEligibleOwnPlanArray(eligiblePlanOwnArray);
            }
          }
        }
        // Analytics
        if (totalPay && totalPay !== null && totalPay !== undefined) {
          this._estoreAnalyticsService.SetProductTotalForDevice(totalPay.toString(), this._renderer);
        }
      }
    });
    if (this.suppLinesDetails && this.suppLinesDetails.length > 0) {
        this._deviceDataService.publishSupplimentaryLines(this.suppLinesDetails);
      }
  }

  public updateImage() {
    this.selecteImageList = [];
    this._deviceDataService.publishImageList(this.selecteImageList);

    this.DeviceDetailsStorageResponse.forEach(element => {
      if (element.color === this.selectedColor) {
        // Push image into image list
        this.selecteImageList.push(element.image);
      }
      if (element.color === this.selectedColor && element.memory === this.selectedStorage) {
        this.selectedImage = element.image;
      }
    });
    this._deviceDataService.publishImageList(this.selecteImageList);
    this._deviceDataService.publishImage(this.selectedImage);
  }
  public defaultOnClick() {
    return false;
  }

  checkStockAvailability(device: any) {
   // const partNumber = device.part_number;
    if (device.pre_order_data) {
      this.preOrderData = device.pre_order_data;
    }
    // Published preorder data to access preorder accros all components.
    this._deviceDataService.publishPreOrderData(device);
    if (device.easy_phone && device.easy_phone.rent) {
      this._deviceDataService.publishEasyPhoneRentData(device.easy_phone.rent);
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem("easyPhoneRentData", JSON.stringify(device.easy_phone.rent));
      }
    }
    if (device.easy_phone && device.easy_phone.own) {
      this._deviceDataService.publishEasyPhoneOwnData(device.easy_phone.own);
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem("easyPhoneOwnData", JSON.stringify(device.easy_phone.own));
      }
    }
    const bundlePrices = [];
    const bundleUpfront = [];
    if (device.saleable_plans && device.saleable_plans.length > 0) {
      for (let i = 0; i < device.saleable_plans.length; i++) {
        if ((device.saleable_plans[i].sku === this.fgp) && device.saleable_plans[i].prices[this.suppCount].device_price) {
          bundlePrices.push({ key: this.fgp, value: device.saleable_plans[i].prices[this.suppCount].device_price });
        }
        if ((device.saleable_plans[i].sku === this.fgs) && device.saleable_plans[i].prices[this.suppCount].device_price) {
          bundlePrices.push({ key: this.fgs, value: device.saleable_plans[i].prices[this.suppCount].device_price });
        }
        if ((device.saleable_plans[i].sku === this.fp) && device.saleable_plans[i].prices[this.suppCount].device_price) {
          bundlePrices.push({ key: this.fp, value: device.saleable_plans[i].prices[this.suppCount].device_price });
        }
        if ((device.saleable_plans[i].sku === this.fpp) && device.saleable_plans[i].prices[this.suppCount].device_price) {
          bundlePrices.push({ key: this.fpp, value: device.saleable_plans[i].prices[this.suppCount].device_price });
        }
        if ((device.saleable_plans[i].sku === this.fpp) && device.saleable_plans[i].prices[this.suppCount].upfront_price) {
          bundleUpfront.push({ key: this.fpp, value: device.saleable_plans[i].prices[this.suppCount].upfront_price });
        }
        if ((device.saleable_plans[i].sku === this.fp) && device.saleable_plans[i].prices[this.suppCount].upfront_price) {
          bundleUpfront.push({ key: this.fp, value: device.saleable_plans[i].prices[this.suppCount].upfront_price });
        }
        if ((device.saleable_plans[i].sku === this.fgp) && device.saleable_plans[i].prices[this.suppCount].upfront_price) {
          bundleUpfront.push({ key: this.fgp, value: device.saleable_plans[i].prices[this.suppCount].upfront_price });
        }
        if ((device.saleable_plans[i].sku === this.fgs) && device.saleable_plans[i].prices[this.suppCount].upfront_price) {
          bundleUpfront.push({ key: this.fgs, value: device.saleable_plans[i].prices[this.suppCount].upfront_price });
        }
      }
    }
    this._deviceDataService.publishEasyPhoneBundleData(bundlePrices);
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("easyPhoneBundleData", JSON.stringify(bundlePrices));
    }

    this._deviceDataService.publishEasyPhoneUpfrontData(bundleUpfront);
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("easyPhoneUpfrontData", JSON.stringify(bundleUpfront));
    }
    if (this.isPreOrder && this.preOrderData) {
        if (this.preOrderData.preorder_stock_status_flag === 1 &&
          this.preOrderData.preorder_stock_available_quantity > 0 && this.preOrderData.preorder_availble_stock_in_hand > 0 &&
           !this.preOrderEnded) {
          this.deviceStock = this.formConst.PRODUCT_IN_STOCK_MSG;
        } else {
          this.deviceStock = this.formConst.PRODUCT_OUT_OF_STOCK_MSG;
        }
      this._deviceDataService.publishOutOfStock(this.deviceStock);
      this._estoreAnalyticsService.SetStockForSelectedDevice(this.deviceStock, this._renderer);
    } else {
    this.devicedetailstorageservice.getStockOfTheDevice(device.sku, "");
    }
  }
}
