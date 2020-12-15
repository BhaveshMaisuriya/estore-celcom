import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bb-device-color',
  templateUrl: './bb-device-color.component.html',
  styleUrls: ['./bb-device-color.component.css']
})
export class BbDeviceColorComponent implements OnInit {
  @Input() data: any;
  @Input() selectedProd: any;
  bbDeviceDetails: any = null;
  selectedBbDevice;
  selectedBbDeviceBrand;
  selectedBbModel;
  selectedColor: any = null;
  selectedPlanSku: string;
  private subscriber: Subscription;
  colorList: Array<any> = [];
  homeWirelessData: any = null;
  @Output() selectedColorEE: EventEmitter<string> = new EventEmitter<any>();

  constructor(
    private _deviceDataService: DeviceDataService
  ) { }

  ngOnInit() {
    this.subscriber = this._deviceDataService.sharedBbPlanSku$.subscribe(data => this.selectedPlanSku = data);
    this.bindColorList();
    if (typeof window !== 'undefined' && localStorage && sessionStorage &&
      localStorage.getItem("MyMsIsdn") && sessionStorage.getItem("UserInfo") &&
      sessionStorage.getItem("UserToken")) {
      this.preSelection();
    }
  }

  bindColorList() {
    if (this.data) {
      this.bbDeviceDetails = this.data.device_product_details;
      this.selectedBbDevice = this.data.sku;
      this.selectedBbDeviceBrand = this.data.order_brand;
      this.selectedBbModel = this.data.order_model;
      this.bbDeviceDetails.forEach(element => {
        const deviceColor = {
          colorName: element.color,
          colorHex: element.color_hexa
        };
        // Do not push if already exists.
        const existingColor = this.colorList.find((colorInList) => colorInList.colorName === deviceColor.colorName);
        if (!existingColor) {
          this.colorList.push(deviceColor);
        }
      });
    }
    if (this.selectedProd) {
      setTimeout(() => {
        this.selectColor(this.selectedProd.color);
      }, 0);
    }
  }
  preSelection() {
    if (localStorage && localStorage.getItem("homeWirelessData")) {
      this.homeWirelessData = {};
      this.homeWirelessData = JSON.parse(localStorage.getItem("homeWirelessData"));
      if (this.homeWirelessData.color) {
        setTimeout(() => {
          this.selectColor(this.homeWirelessData.color);
        }, 0);
      }
    }
  }
  selectColor(deviceColor: any) {
    this.selectedColorEE.emit(deviceColor);
    this.selectedColor = deviceColor;
    this._deviceDataService.publishColor(deviceColor);
    // Update device image.
    this.updateImage();
    this.updatePrice(deviceColor);
  }
  updateImage() {
    const selectedImageList = [];
    let selectedImage = null;
    this.bbDeviceDetails.forEach(device => {
      if (device.color === this.selectedColor) {
        // Push image into image list
        selectedImageList.push(device.image);
      }
      if (device.color === this.selectedColor) {
        selectedImage = device.image;
      }
    });
    this._deviceDataService.publishImageList(selectedImageList);
    this._deviceDataService.publishImage(selectedImage);
  }

  public updatePrice(color) {
    this.bbDeviceDetails.forEach(eachproduct => {
      if (eachproduct.color === color) {
        if (this.selectedPlanSku && eachproduct.saleable_plans) {
          eachproduct.saleable_plans.forEach(eachElement => {
            if (eachElement.sku === this.selectedPlanSku) {
              const devicePriceForPlan = JSON.parse(eachElement.prices.device_price);
              const upfrontPlan = JSON.parse(eachElement.prices.upfront_price);
              const totalPrice = devicePriceForPlan + upfrontPlan;
              this._deviceDataService.publishDevicePrice(devicePriceForPlan);
              this._deviceDataService.publishTotalPay(totalPrice);
            }
          });
        }
      }
    });
  }

}
