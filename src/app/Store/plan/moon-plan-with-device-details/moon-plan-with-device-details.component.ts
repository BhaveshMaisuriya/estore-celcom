import { Component, OnInit, Input, EventEmitter, Output, setTestabilityGetter, HostListener } from "@angular/core";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from "rxjs";
import { element } from "protractor";
import { PlanPurchaseService } from "../plan-purchase/plan-purchase.service";
import { ProductService } from "../../../Service/product.service";
import {debounce} from 'lodash';
import { PlansService } from '../../../Service/plans.service';
import { deviceBundleTypeEnum } from '../../../shared//models/device.model';

interface SelectedDeviceInfoStruct {
  name: string;
  sku: string;
  price: string;
  imagePath: string;
  upfrontPrice: string;
  devicePrice: string;
  totalPrice: string;
  contract: string;
}
@Component({
  selector: 'app-moon-plan-with-device-details',
  templateUrl: './moon-plan-with-device-details.component.html',
  styleUrls: ['./moon-plan-with-device-details.component.css'],
  animations: [
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
export class MoonPlanWithDeviceDetailsComponent implements OnInit {
  @Input() deviceDataForAddonPass: any;
  @Input() editProduct: any;
  @Input() SelectionAferLogin: any;
  @Input() selectedDevice;
  public currentPage = 1;
  public totalPage = 0;
  private pages = [];
  private page_size = 0;
  private device_size = 0;
  public device_show_count = 0;
  public data: any;
  public devicesToDisplay = [];
  public stockStatus;
  public stock;
  public showRemoveButton = false;
  public hideDevices = false;
  public notMviva = true;
  public deviceAdded = false;
  public bundleSku = '';
  public subscriber: Subscription;
  public SelectedDeviceColor;
  public SelectedDeviceMemory;
  public colorMemoryInfo = [];
  public cobpLoading = false;
  public addOnPassInfo: any;
  public stockInfoOfDevice = [];
    public isOwnClicked = true;
  public isDeviceBunbleClicked = false;
  public selectedDeviceInfo: SelectedDeviceInfoStruct = {
    price: "",
    name: "",
    sku: "",
    imagePath: "",
    upfrontPrice: "",
    devicePrice: "",
    totalPrice: "",
    contract: ""
  };
  public inStockMessage = 'In Stock';
  public outOfStockMessage = 'Out of Stock. Try another colour or storage';
  public showOutOfStockErrorMsg = false;
  public selectedDeviceObj: any;
  public IsDispalySwitchingPurchaseTypeTabPopup = false;
  public popuptype: any = { type: "switchingpurchasetype" };
  public popupActionType = '';
  public selectedImagePath = '';
  public deviceSelected;
  public isScrolling = false;
  public isOddPage = false;
  public upfrontInstallment = null;
  public upfrontInstallmentText = "Upfront Payment (To be rebated in first bill)";

  constructor(
    private _deviceDataService: DeviceDataService,
    private _planPurchaseService: PlanPurchaseService,
    private _productService: ProductService,
    private _plansService: PlansService,
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setPageSize(event.target.innerWidth);
    this.setPages(this.devicesToDisplay);
  }
  setPages(devicesToDisplay) {
    if (devicesToDisplay.length % 2 !== 0) {
      this.isOddPage = true;
    }
    this.totalPage = Math.ceil(devicesToDisplay.length / this.page_size);
    this.LoadPageIndex();
  }
  setPageSize(innerWidth) {
    if (innerWidth <= 767) {
      this.device_show_count = 1;
      this.page_size = 1;
    } else {
      this.device_show_count = 2;
      this.page_size = 2;
    }

  }

  ngOnInit() {
    this.setPageSize(window.innerWidth);

    this.deviceSelected = this.selectedDevice;
    this.data = this.deviceDataForAddonPass;
    this.data.forEach((element, index) => {
      this.data[index].ProductType = "moon";
    });

    // ? Below code is refactored
    // for (let i = 0; i < this.deviceDataForAddonPass.length; i++) {
    //   this.deviceDataForAddonPass[i].deviceIndex = i;
    //   this.deviceDataForAddonPass[i].selectedMemoryIndex = 0;
    //   this.devicesToDisplay.push(this.deviceDataForAddonPass[i]);
    // }
    this.devicesToDisplay = this.deviceDataForAddonPass
      // * filtering device
      .filter(x => x.status !== false)
      // * adding indexes
      .map((x, i) => ({
        ...x,
        deviceIndex: i,
        selectedMemoryIndex: 0
      }));

    this.setPages(this.devicesToDisplay);
    this.pages[0].selected = true;
    this.data.ProductType = "moon";
    if (window.location.href.indexOf("?promotiondetails=") > -1 && window.location.href.indexOf("&device=") > -1) {
      this.notMviva = false;
    }
    this._deviceDataService.outOfStock$.subscribe(data => {
      if (data.data.bundleSku === '') {
        this.stock = data;
        if (this.stock && this.stock.status === 'Checking stock...') {
          this.stockStatus = 1;
          this.stock.stockStatusMsg = 'Checking stock...';
        } else if (this.stock && this.stock.status === 'In Stock') {
          this.stockStatus = 2;
          this.stock.stockStatusMsg = 'In Stock';
        } else if (this.stock && this.stock.status === 'Out of Stock') {
          this.stockStatus = 3;
          this.stock.stockStatusMsg = 'Out of Stock. Try another colour or storage';
        } else {
          this.stockStatus = 0;
        }
      } else {
        this.bundleSku = data.data.bundleSku;
      }
      if (data && data.data.simpleSku) {
        let stockData = {};
        let stockStatusMsg;
        let stockStatus;
        if (data.status === 'Checking stock...') {
          stockStatusMsg = 'Checking stock...';
          stockStatus = 1;
        } else if (data.status === 'In Stock') {
          stockStatusMsg = 'In Stock';
          stockStatus = 2;
        } else if (data.status === 'Out of Stock') {
          stockStatusMsg = 'Out of Stock. Try another colour or storage';
          stockStatus = 3;
          if (this.selectedDeviceInfo && !this.SelectionAferLogin && !this.editProduct && !this.deviceSelected) {
          this.removeSelectedDevice();
          }
        }
        if (this.stockInfoOfDevice.length < 1) {
          stockData = {
            sku: data.data.simpleSku,
            stock: data.status,
            bundlesku: data.data.sku,
            stockStatus: stockStatus,
            stockStatusMsg: stockStatusMsg
          };
          this.stockInfoOfDevice.push(stockData);
        } else {
          const update = this.stockInfoOfDevice.find(element => {
            if ((element.sku === data.data.simpleSku) || element.bundlesku === data.data.sku) {
              element.sku = data.data.simpleSku;
              element.stock = data.status;
              element.bundlesku = data.data.sku;
              element.stockStatus = stockStatus;
              element.stockStatusMsg = stockStatusMsg;
              return true;
            } else {
              return false;
            }
          });
          if (!update) {
            stockData = {
              sku: data.data.simpleSku,
              stock: data.status,
              bundlesku: data.data.sku,
              stockStatus: stockStatus,
              stockStatusMsg: stockStatusMsg
            };
            this.stockInfoOfDevice.push(stockData);
          }
        }
        if (this.deviceSelected !== null && this.deviceSelected !== undefined) {
          this.deviceDataForAddonPass.forEach((device, index1) => {
            if (device.sku === this.deviceSelected) {
                  this.selectDevice(device);
            }
          }
          );
        }
      }
    });
    this.subscriber = this._deviceDataService.cobpLoading$.subscribe(data => {
      this.cobpLoading = data;
    });
    this.subscriber = this._deviceDataService.sharedStorage$.subscribe(data => {
      if (data) {
        this.SelectedDeviceMemory = data;
      }
    });
    this.subscriber = this._deviceDataService.sharedColor$.subscribe(data => {
      if (data) {
        this.SelectedDeviceColor = data;
      }
    });
    this.subscriber = this._deviceDataService.sharedMoonColorMemoryInfo$.subscribe(data => {
      if (data) {
        if (this.colorMemoryInfo.length < 1) {
          this.colorMemoryInfo.push(data);
        } else {
          const find = this.colorMemoryInfo.find(element => {
            if (element.sku === data.sku) {
              element.color = data.color;
              element.memory = data.memory;
              element.stock = data.stock;
              return true;
            } else {
              return false;
            }
          });
          if (!find) {
            this.colorMemoryInfo.push(data);
          }
        }
        if (this.selectedDevice === data.sku) {
          this.SelectedDeviceColor = data.color;
          this.SelectedDeviceMemory = data.memory;
          if (typeof window !== 'undefined' && localStorage && localStorage.getItem("SelectedPlanDetails") &&
          !this.SelectionAferLogin && !this.editProduct) {
            const planDetailsObj = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
            if (planDetailsObj.selectedDevice) {
              planDetailsObj.selectedDevice.selectedDeviceMemory = this.SelectedDeviceMemory;
              planDetailsObj.selectedDevice.SelectedDeviceColor = this.SelectedDeviceColor;
              this._deviceDataService.publishColor(this.SelectedDeviceColor);
              this._deviceDataService.publishStorage(this.SelectedDeviceMemory);
            }
            localStorage.setItem("SelectedPlanDetails", JSON.stringify(planDetailsObj));
          }
          // this._deviceDataService.publishColor(this.SelectedDeviceColor);
          // this._deviceDataService.publishStorage(this.SelectedDeviceMemory);
        }
      }
    });
    if (this.editProduct) {
      this.preSelectDeviceOnEdit(this.editProduct);
    }
    if (this.SelectionAferLogin && this.SelectionAferLogin.planDetails &&
      this.SelectionAferLogin.planDetails.selectedPass && this.SelectionAferLogin.planDetails.selectedDevice) {
        const deviceDetails = this.SelectionAferLogin.planDetails.selectedDevice;
        this.SelectedDeviceMemory = deviceDetails.selectedDeviceMemory;
        this.SelectedDeviceColor = deviceDetails.SelectedDeviceColor;
        this.changeColorStorageOnEdit( deviceDetails.SelectedDeviceColor, deviceDetails.selectedDeviceMemory, deviceDetails.sku);
        this.selectDevice(this.SelectionAferLogin.planDetails.selectedDevice);
    }
    if (typeof window !== "undefined" && localStorage) {
      if (localStorage.getItem("COBP_login_Check")) {
        localStorage.removeItem("COBP_login_Check");
      }
      if (localStorage.getItem("COBP_FLOW_CHECK")) {
        localStorage.removeItem("COBP_FLOW_CHECK");
      }
    }
  }
  goToPrevPage() {

    if ( this.currentPage > 1 ) {
      this.LoadDevice(this.currentPage - 1);
    }

  }
  goToNextPage() {
    if ( this.currentPage < this.totalPage ) {
        this.LoadDevice(this.currentPage + 1);
      }

  }
  public LoadDevice(page) {
    if (this.isScrolling === false) {
      this.isScrolling = true;
      if(document.getElementsByClassName('device-box').length > 0){
        this.device_size = this.device_show_count * document.getElementsByClassName('device-box')[0].clientWidth;
      }
      const el = document.getElementsByClassName('devices-for-pass');
      if(el && el.length > 0){
      let scrollOffset = 0;
      let scrollObj = {};
      if (this.currentPage > page) {
        scrollOffset = -this.device_size * (this.currentPage - page);
        scrollObj = {
          left: el[0].scrollLeft + scrollOffset,
          behavior: 'smooth'
        };
      } else if (this.currentPage < page) {
        scrollOffset = this.device_size * (page - this.currentPage);
        scrollObj = {
          left: el[0].scrollLeft + scrollOffset,
          behavior: 'smooth'
        };
      }
      this.currentPage = page;
      this.LoadPageIndex();
      console.log(scrollObj);
      el[0].scrollTo(scrollObj);
      setTimeout(() => { this.isScrolling = false; }, 1000);
      }
    }
  }
  LoadPageIndex() {
    let viewAllPage = false;
    if (this.totalPage <= 3) {
      viewAllPage = true;
    }
    this.pages = Array(this.totalPage).fill(null).map(( x, i ) => {
      return {
        pageno : i + 1, selected: false, view: viewAllPage
      };
    });
    this.pages[this.currentPage - 1].selected = true;
    if (this.totalPage > 3) {
      if (this.currentPage === 1) {
        this.pages[this.currentPage - 1].view = true;
        this.pages[this.currentPage].view = true;
        this.pages[this.currentPage + 1].view = true;
      } else if (this.currentPage === (this.pages.length)) {
        this.pages[this.currentPage - 1].view = true;
        this.pages[this.currentPage - 3].view = true;
        this.pages[this.currentPage - 2].view = true;
      } else {
        this.pages[this.currentPage - 1].view = true;
        this.pages[this.currentPage].view = true;
        this.pages[this.currentPage - 2].view = true;
      }
    }
  }
  selectDevice(response: any, stockStatus?: any) {
    localStorage.setItem("xp-lite-device",JSON.stringify(response));
    if (stockStatus === 3) {
      this.showOutOfStockErrorMsg = true;
    } else {
      this.showOutOfStockErrorMsg = false;
      if (!this.editProduct &&
        (typeof window !== 'undefined' && localStorage && (localStorage.getItem("MNP-FLOW")) ||
          (localStorage.getItem("COBP_FLOW") && !localStorage.getItem("COBP_login")) ||
          localStorage.getItem("PrincipleNumberSelected"))) {
        this.selectedDeviceObj = response;
        this.popupActionType = 'add';
        this.IsDispalySwitchingPurchaseTypeTabPopup = true;
      } else {
        this.showRemoveButton = true;
        this.deviceAdded = true;
        this.selectedDevice = response.sku;
        this.colorMemoryInfo.forEach(colorelement => {
          if (colorelement.sku === response.sku) {
            this.SelectedDeviceColor = colorelement.color;
            this.SelectedDeviceMemory = colorelement.memory;
          }
        });
        this.getInfoOfSelectedDevice(this.SelectedDeviceColor, this.SelectedDeviceMemory, response);
        this.selectedDeviceInfo.name = response.name;
        const selectedProduct = response.associated_device_product.find(element => {
          return element.color == this.SelectedDeviceColor && element.memory == this.SelectedDeviceMemory;
        });
        this._plansService.selectDeviceBundle(response);
        this._plansService.selectDevice(selectedProduct);
        this._plansService.selectDeviceBundleType(deviceBundleTypeEnum.deviceBundle);
        this._deviceDataService.publishMoonSelectedProductDetails(this.selectedDeviceInfo);
        this._deviceDataService.publishColor(this.SelectedDeviceColor);
        this._deviceDataService.publishStorage(this.SelectedDeviceMemory);
        if (typeof window !== 'undefined' && localStorage && localStorage.getItem("SelectedPlanDetails") && !this.SelectionAferLogin) {
          const selectedPlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
          selectedPlanDetails.selectedDevice = response;
          selectedPlanDetails.selectedDevice.SelectedDeviceColor = this.SelectedDeviceColor;
          selectedPlanDetails.selectedDevice.selectedDeviceMemory = this.SelectedDeviceMemory;
          selectedPlanDetails.selectedDevice.imagePath = this.selectedDeviceInfo.imagePath;
          selectedPlanDetails.selectedDevice.contract = this.selectedDeviceInfo.contract;
          localStorage.setItem("SelectedPlanDetails", JSON.stringify(selectedPlanDetails));
        }
        if(response && response.associated_device_product && response.associated_device_product.length > 0) {
          this.upfrontInstallment = response.associated_device_product[0].upfront_installment;
        }
        if(this.upfrontInstallment) {
          this.upfrontInstallmentText = `Upfront Payment (To be rebated over ${this.upfrontInstallment} months)`;
        } else {
          this.upfrontInstallmentText = "Upfront Payment (To be rebated in first bill)";
        }
        this._deviceDataService.publishUpfrontInstallmentForMoon(this.upfrontInstallmentText);
      }
    }
  }
  onContinueSwitchingDeviceTab() {
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
    this._productService.OnCOntinueSwitchingTab();
    if (this.selectedDeviceObj && this.popupActionType === 'add') {
      this.selectDevice(this.selectedDeviceObj);
    } else if (this.popupActionType === 'remove') {
      this.removeSelectedDevice();
    }
    this.selectDevice(this.selectedDeviceObj);

  }
  onCancellingSwitchingDeviceTab() {
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
  }
  removeSelectedDevice() {
    localStorage.removeItem("xp-lite-device");
    this.upfrontInstallmentText = "Upfront Payment (To be rebated in first bill)";
    this._deviceDataService.publishUpfrontInstallmentForMoon(this.upfrontInstallmentText);
    if (!this.editProduct &&
      (typeof window !== 'undefined' && localStorage && (localStorage.getItem("MNP-FLOW")) ||
        (localStorage.getItem("COBP_FLOW") && !localStorage.getItem("COBP_login")) ||
        localStorage.getItem("PrincipleNumberSelected"))) {
      this.popupActionType = 'remove';
      this.IsDispalySwitchingPurchaseTypeTabPopup = true;
    } else {
      this._plansService.selectDevice(null);
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
    this.showRemoveButton = false;
    this.deviceAdded = false;
    this.selectedDevice = "";
    this.selectedDeviceInfo = {
      price: "",
      name: "",
      sku: "",
      imagePath: "",
      upfrontPrice: "",
      devicePrice: "",
      totalPrice: "",
      contract: ""
    };
    this._deviceDataService.publishMoonSelectedProductDetails(null);
    this._deviceDataService.publishColor(null);
    this._deviceDataService.publishStorage(null);
    this._deviceDataService.publishAddToCartDisabling(false);
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem("SelectedPlanDetails")) {
        const SelectedPlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
        if (SelectedPlanDetails.selectedPass && SelectedPlanDetails.selectedDevice) {
          SelectedPlanDetails.selectedDevice = null;
          localStorage.setItem("SelectedPlanDetails", JSON.stringify(SelectedPlanDetails));
        }
      }
    }
  }
}
  hideDeviceSection() {
    this.hideDevices = true;
    this.removeSelectedDevice();
  }
  showDevices() {
    this.hideDevices = false;
  }
  getInfoOfSelectedDevice(color: string, memory: string, response: any) {
    response.associated_device_product.forEach(element => {
      if (element.color === color && element.memory === memory) {
        this.selectedDeviceInfo.price = element.rrp ? element.rrp : '';
        this.selectedDeviceInfo.imagePath = element.image ? element.image : '';
        this.selectedDeviceInfo.sku = element.sku ? element.sku : '';
        this.selectedDeviceInfo.contract = element.desc ? element.desc : '';
        if (element.prices) {
          this.selectedDeviceInfo.upfrontPrice = element.prices.upfront_price;
          this.selectedDeviceInfo.devicePrice = element.prices.device_price;
          this.selectedDeviceInfo.totalPrice = (Number(element.prices.device_price) + Number(element.prices.upfront_price)).toString();
        }
        this.stockInfoOfDevice.forEach(ele => {
          if (ele.sku === element.sku) {
            let inStock = false;
            if (ele.stock === 'In Stock') {
              inStock = true;
            }
            this._deviceDataService.publishStockInfoToCart(inStock);
          }
        });
      }
    });
  }

  previousClicked() {
    this.goToPrevPage();

  }

nextClicked() {
  this.goToNextPage();

}
  preSelectDeviceOnEdit(editObj: any) {
    if (editObj && (editObj.selectedProduct && editObj.selectedProduct.orderDevice &&
      editObj.selectedProduct.selected_pass_details)) {
      if (this.deviceDataForAddonPass) {
        if (editObj.selectedProduct.orderSummaryColor && editObj.selectedProduct.orderSummaryStorage) {
          this.SelectedDeviceColor = editObj.selectedProduct.orderSummaryColor;
          this.SelectedDeviceMemory = editObj.selectedProduct.orderSummaryStorage;
        }
        this.deviceDataForAddonPass.forEach((element1, index1) => {
          element1.associated_device_product.forEach((element2, index2) => {
            if (element2.sku === editObj.selectedProduct.selectedProductSku) {
              this.editProduct.selectedBundleSku = element1.sku;
              this.changeColorStorageOnEdit(element2.color, element2.memory, element1.sku);
              this.selectDevice(element1);
              const shift = Math.ceil((index1 + 1) / this.device_show_count);
              if (shift > 1) {
                setTimeout(() => {
                  this.LoadDevice(shift);
                }, 2000);

              }
            }
          });
        });
      }
    }
  }
  changeColorStorageOnEdit(color: string, memory: string, sku: string) {
    if (this.colorMemoryInfo.length > 0) {
      this.colorMemoryInfo.forEach(device => {
         if (device.sku === sku) {
           device.color = color;
           device.memory = memory;
         }
      });
    }
  }

  deviceBundleClicked(deviceOptionType){
this.isDeviceBunbleClicked = true;
this.isOwnClicked = false;

this.devicesToDisplay = [];

for (let i = 0; i < this.deviceDataForAddonPass.length; i++) {
  this.deviceDataForAddonPass[i].deviceIndex = i;
  this.deviceDataForAddonPass[i].selectedMemoryIndex = 0;
  if(this.deviceDataForAddonPass[i].default_device_option == "deviceBundle"){
    this.devicesToDisplay.push(this.deviceDataForAddonPass[i]);
  }
}

  }

  easyPhoneClicked(deviceOptionType){
    this.isOwnClicked = true;
    this.isDeviceBunbleClicked = false;

    this.devicesToDisplay = [];
    for (let i = 0; i < this.deviceDataForAddonPass.length; i++) {
      this.deviceDataForAddonPass[i].deviceIndex = i;
      this.deviceDataForAddonPass[i].selectedMemoryIndex = 0;
      if(this.deviceDataForAddonPass[i].default_device_option == "easyPhone"){
        this.devicesToDisplay.push(this.deviceDataForAddonPass[i]);
      }
    }
  }
}
