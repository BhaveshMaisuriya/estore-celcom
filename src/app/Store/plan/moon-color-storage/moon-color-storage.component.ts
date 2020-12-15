import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetailsStorageService } from '../../../Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { ProductService } from '../../../Service/product.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { MoonPlanWithDeviceDetailsComponent } from '../moon-plan-with-device-details/moon-plan-with-device-details.component';
import { PlanPurchaseService } from '../plan-purchase/plan-purchase.service';
import { PlansService } from '../../../Service/plans.service';
import { deviceBundleTypeEnum } from '../../../shared/models/device.model';
interface ColorStorageObjectStruct {
  color: string;
  colorHex: string;
  storage: string;
  sku: string;
}
interface DeviceInfoStruct {
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
  selector: 'app-moon-color-storage',
  templateUrl: './moon-color-storage.component.html',
  styleUrls: ['./moon-color-storage.component.css'],
  providers: [DeviceDetailsStorageService, ProductService],
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
    ])
  ]
})
export class MoonColorStorageComponent implements OnInit {
  @Input() data: any;
  @Input() editProduct: any;
  @Input() SelectionAferLogin: any;
  public deviceDetailsStockResponse = [];
  colorStorageObject: ColorStorageObjectStruct[] = [];
  public colorSelected: string;
  public memorySelected: string;
  public stock;
  public stockStatus;
  public memoryList = [];
  cobpLoading = false;
  public subscriber: Subscription;
  public stockInfoOfDevice = [];
  public stockInfo;
  public deviceInfo: DeviceInfoStruct = {
    price: "",
    name: "",
    sku: "",
    imagePath: "",
    upfrontPrice: "",
    devicePrice: "",
    totalPrice: "",
    contract: ""
  };
  public simpleSku;
  public IsDispalySwitchingPurchaseTypeTabPopup = false;
  public popuptype: any = { type: "switchingpurchasetype" };
  public actionType = '';
  public selectedColorEvent = '';
  public SelectedMemoryEvent = '';
  constructor(
    private _colorStorageService: DeviceDetailsStorageService,
    private _deviceDataService: DeviceDataService,
    private _moonDeviceDetailsComponent: MoonPlanWithDeviceDetailsComponent,
    private _productService: ProductService,
    private _planPurchaseService: PlanPurchaseService,
    private _plansService: PlansService,
  ) { }

  ngOnInit() {
    this.deviceDetailsStockResponse.push(this.data);
    this.dataforStockCheck(this.deviceDetailsStockResponse);
    this._deviceDataService.outOfStock$.subscribe(stockData => {
      if (stockData.data.bundleSku !== '') {
        this.stock = stockData;
      this.stockStatus = this._productService.getStockStatus(stockData);
      if (this._moonDeviceDetailsComponent && this._moonDeviceDetailsComponent.selectedDeviceInfo
        && (this._moonDeviceDetailsComponent.selectedDeviceInfo.sku === this.simpleSku &&
          this._moonDeviceDetailsComponent.selectedDeviceInfo.sku === this.stock.data.simpleSku)) {
        let stockInfo = true;
        if (this.stockStatus === 2) {
          stockInfo = false;
        }
        this._deviceDataService.publishAddToCartDisabling(stockInfo);
      }
    }
    });
    this.subscriber = this._deviceDataService.cobpLoading$.subscribe(data => {
      this.cobpLoading = data;
    });
    this.colorSelected = this.deviceDetailsStockResponse[0].default_selected_color;
    this.memorySelected = this.deviceDetailsStockResponse[0].default_selected_memory;
    if (this.editProduct && this.editProduct.selectedProduct && this.editProduct.selectedProduct.orderSummaryColor &&
      this.editProduct.selectedProduct.orderSummaryStorage &&
      this.editProduct.selectedBundleSku === this.deviceDetailsStockResponse[0].sku) {
      this.colorSelected = this.editProduct.selectedProduct.orderSummaryColor;
      this.memorySelected = this.editProduct.selectedProduct.orderSummaryStorage;
    }
    this.subscriber = this._deviceDataService.sharedMoonSelectedProductDetails$.subscribe(data => {
      this.deviceInfo = (data === null) ? null : data;
    });
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("SelectedPlanDetails") &&
      this.SelectionAferLogin) {
      const deviceDetailsObj = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
      if (deviceDetailsObj.selectedDevice && deviceDetailsObj.selectedDevice.sku === this.deviceDetailsStockResponse[0].sku) {
        this.colorSelected = deviceDetailsObj.selectedDevice.SelectedDeviceColor ?
          deviceDetailsObj.selectedDevice.SelectedDeviceColor : this.deviceDetailsStockResponse[0].default_selected_color;
        this.memorySelected = deviceDetailsObj.selectedDevice.selectedDeviceMemory ?
          deviceDetailsObj.selectedDevice.selectedDeviceMemory : this.deviceDetailsStockResponse[0].default_selected_memory;
          this.publishColorOrMemoryChange();
      }
    } else {
      this.publishColorOrMemoryChange();
    }
    this.getStockOfTheSelectedDevice('', this.deviceDetailsStockResponse[0].sku);
  }
  dataforStockCheck(response: any) {
    response[0].associated_device_product.forEach(element1 => {
      if (this.colorStorageObject.length < 1) {
        this.colorStorageObject.push({
          color: element1.color,
          colorHex: element1.color_hexa,
          storage: element1.memory,
          sku: element1.sku
        });
      } else {
        const find = this.colorStorageObject.find(element2 => {
          if (element1.color === element2.color) {
            return true;
          } else {
            return false;
          }
        });
        if (!find) {
          this.colorStorageObject.push({
            color: element1.color,
            colorHex: element1.color_hexa,
            storage: element1.memory,
            sku: element1.sku
          });
        }
      }
      if (this.memoryList.indexOf(element1.memory) === -1) {
        this.memoryList.push(element1.memory);
      }
    });
  }

  stockCheckOnColorChange(color: string) {
    if (!this.editProduct && this._moonDeviceDetailsComponent.selectedDeviceInfo
      && (this._moonDeviceDetailsComponent.selectedDeviceInfo.name === this.deviceDetailsStockResponse[0].name) &&
      (typeof window !== 'undefined' && localStorage && (localStorage.getItem("MNP-FLOW")) ||
        (localStorage.getItem("COBP_FLOW") && !localStorage.getItem("COBP_login")) ||
        localStorage.getItem("PrincipleNumberSelected"))) {
          this.actionType = "colorChange";
          this.selectedColorEvent = color;
      this.IsDispalySwitchingPurchaseTypeTabPopup = true;
    } else {
    this.colorSelected = color;
    this.setDeviceMemoryIndex();
    this.getStockOfTheSelectedDevice(this.deviceDetailsStockResponse[0].sku, this.deviceDetailsStockResponse[0].sku);
    this.publishColorMemoryInfo();
  }
}
setDeviceMemoryIndex() {
    const selectedMemoryIndex = this.deviceDetailsStockResponse[0].associated_device_product
    .findIndex(x =>  x.color === this.colorSelected && x.memory === this.memorySelected );
    this._moonDeviceDetailsComponent.devicesToDisplay.
    find(x => x.deviceIndex === this.deviceDetailsStockResponse[0].deviceIndex).selectedMemoryIndex = selectedMemoryIndex;
}
  stockCheckOnMemoryChange(memory: string) {
    if (!this.editProduct && this._moonDeviceDetailsComponent.selectedDeviceInfo
      && (this._moonDeviceDetailsComponent.selectedDeviceInfo.name === this.deviceDetailsStockResponse[0].name) &&
      (typeof window !== 'undefined' && localStorage && (localStorage.getItem("MNP-FLOW")) ||
        (localStorage.getItem("COBP_FLOW") && !localStorage.getItem("COBP_login")) ||
        localStorage.getItem("PrincipleNumberSelected"))) {
          this.actionType = "memoryChange";
          this.SelectedMemoryEvent = memory;
      this.IsDispalySwitchingPurchaseTypeTabPopup = true;
    } else {
    this.memorySelected = memory;
    this.setDeviceMemoryIndex();
    this.getStockOfTheSelectedDevice(this.deviceDetailsStockResponse[0].sku, this.deviceDetailsStockResponse[0].sku);
    this.publishColorMemoryInfo();
  }
}
  getStockOfTheSelectedDevice(sku: string, bundlesku: string = '') {
    let selectedDevice = this.deviceDetailsStockResponse[0].associated_device_product.find(element => element.color === this.colorSelected && element.memory === this.memorySelected);
    if (!selectedDevice) {
      selectedDevice = this.deviceDetailsStockResponse[0].associated_device_product[0];
    }
    if (selectedDevice && this.colorSelected && this.memorySelected) {
      this.simpleSku = selectedDevice.sku;
      if (this._moonDeviceDetailsComponent && this._moonDeviceDetailsComponent.selectedDeviceInfo
        && (this._moonDeviceDetailsComponent.selectedDeviceInfo.name === this.deviceDetailsStockResponse[0].name)) {
        this.deviceInfo.price = selectedDevice.rrp ? selectedDevice.rrp : '';
        this.deviceInfo.imagePath = selectedDevice.image ? selectedDevice.image : '';
        this.deviceInfo.sku = selectedDevice.sku ? selectedDevice.sku : '';
        this.deviceInfo.name = this.deviceDetailsStockResponse[0].name;
        this.deviceInfo.contract = selectedDevice.desc ? selectedDevice.desc : '';
        if (selectedDevice.prices) {
          this.deviceInfo.upfrontPrice = selectedDevice.prices.upfront_price;
          this.deviceInfo.devicePrice = selectedDevice.prices.device_price;
          this.deviceInfo.totalPrice = (Number(selectedDevice.prices.device_price) + Number(selectedDevice.prices.upfront_price)).toString();
        }
        this._plansService.selectDevice(selectedDevice);
        this._plansService.selectDeviceBundleType(deviceBundleTypeEnum.deviceBundle);
        this._deviceDataService.publishMoonSelectedProductDetails(this.deviceInfo);
      }
    }
    this._colorStorageService.getStockOfTheDevice(this.simpleSku, sku, bundlesku);
    this.publishColorMemoryInfo();
  }
  publishColorOrMemoryChange() {
    this._deviceDataService.publishColor(this.colorSelected);
    this._deviceDataService.publishStorage(this.memorySelected);
  }
  publishColorMemoryInfo() {
    let colorMemoryInfo: any;
    colorMemoryInfo = {
      color: this.colorSelected,
      memory: this.memorySelected,
      sku: this.deviceDetailsStockResponse[0].sku,
      stock: this.stockInfo ? this.stockInfo : ''
    };
    this._deviceDataService.publishMoonColorMemoryInfo(colorMemoryInfo);
  }
  onContinueSwitchingColorOrMemoryTab() {
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
    this._productService.OnCOntinueSwitchingTab();
    if (this.actionType === 'colorChange') {
      this.stockCheckOnColorChange(this.selectedColorEvent);
    } else if (this.actionType === 'memoryChange') {
      this.stockCheckOnMemoryChange(this.SelectedMemoryEvent);
    }
  }
  onCancellingonContinueSwitchingColorOrMemoryTab() {
    this.IsDispalySwitchingPurchaseTypeTabPopup = false;
  }
}
