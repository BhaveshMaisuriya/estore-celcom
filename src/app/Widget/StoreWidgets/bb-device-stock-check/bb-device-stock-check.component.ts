import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { environment } from 'environments/environment';
import { DeviceDetailsStorageService } from "../device-details/device-details-color-storage/device-details-color-storage.service";
import { BaseComponent } from '../../../base.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PlansService } from 'app/Service/plans.service';

@Component({
  selector: 'app-bb-device-stock-check',
  templateUrl: './bb-device-stock-check.component.html',
  styleUrls: ['./bb-device-stock-check.component.css'],
  providers: [DeviceDetailsStorageService],
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
export class BbDeviceStockCheckComponent extends BaseComponent implements OnInit {
  @Input() data: any;
  @Input() selectedColor: any;
  bbBundleBasicDetails: any = null;
  stock: any = null;
  stockStatus: any = 0;
  outletId: string = environment.outletId;
  selectedBbDevice;
  selectedBbDeviceBrand;
  selectedBbModel;
  public checkStock = "Checking stock...";
  sharedColor: any = null;
  private subscriber: Subscription;
  constructor(
    private devicedetailstorageservice: DeviceDetailsStorageService,
    private _deviceDataService: DeviceDataService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private plansService: PlansService,
  ) {
    super();
   }

  ngOnInit() {
    this.subscriber = this._deviceDataService.sharedColor$.subscribe(data => {
      this.sharedColor = data;
    });
    this._deviceDataService.outOfStock$.subscribe(data => {
      this.stock = data;
      if (this.stock && this.stock.status === this.checkStock) {
        this.stock.stockStatusMsg = this.checkStock;
        this.stockStatus = 1;
      } else if (this.stock && this.stock.status === 'Out of Stock') {
        this.stock.stockStatusMsg = 'Out of Stock.';
        this.stockStatus = 3;
      } else if (this.stock && this.stock.status === 'In Stock') {
        this.stock.stockStatusMsg = 'In Stock';
        this.stockStatus = 2;
      } else {
        this.stockStatus = 0;
      }
    });
    if (this.data) {
      this.bbBundleBasicDetails = this.data;
      this.selectedBbDevice = this.data.sku;
      this.selectedBbDeviceBrand = this.data.order_brand;
      this.selectedBbModel = this.data.order_model;
      this.data.device_product_details.forEach(device => {
        const deviceColor: string = device.color;
        if (deviceColor === this.selectedColor) {
          this.checkStockAvailability(device);
        }
      });
    }
  }

  // this will be moved to seperate services.
  checkStockAvailability(device: any) {
    const storeId = this.outletId;
    const partNumber = device.part_number;
    const requestBody = {
      "stockAvailabilityCheckRequest": {
        "header": {
          "businessEvent": "StockAvailabilityCheck"
        },
        "request": {
          "userId": "",
          "storeId": storeId,
          "listOfItemDetailsRequest": {
            "itemDetailsRequest": {
              "productType": (device.product_type ? device.product_type.toUpperCase() : ""),
              "partNumber": partNumber,
              "listOfAttributes": {
                "attributes": [{
                  "value": "DEVICE",
                  "name": "PRODUCT"
                },
                {
                  "name": "BRAND",
                  "value": (this.selectedBbDeviceBrand ? this.selectedBbDeviceBrand.toUpperCase() : "")
                },
                {
                  "name": "CATEGORY",
                  "value": (device.order_category ? device.order_category.toUpperCase() : "")
                },
                {
                  "name": "COLOR",
                  "value": (device.order_color ? device.order_color.toUpperCase() : "")
                },
                {
                  "name": "MODEL",
                  "value": (device.order_model ? device.order_model.toUpperCase() : "")
                }
                ]
              }
            }
          }
        }
      }
    };
    this.stock = this.formConst.PRODUCT_CHECKING_STOCK_MSG;
    this._deviceDataService.publishOutOfStock(this.stock);
    this.devicedetailstorageservice.checkStockGatewayHW(requestBody).subscribe(
      (response: any) => {
        let device_stock = {
          "status": true,
          "message": "Out of stock",
          "in_stock": false,
        }
        if (response.stockAvailabilityCheckResponse) {
          this.stock = this.formConst.PRODUCT_IN_STOCK_MSG;
          this._deviceDataService.publishOutOfStock(this.stock);
          device_stock = {
            "status": true,
            "message": "In stock",
            "in_stock": true,
          }
        } else {
          this.stock = this.formConst.PRODUCT_OUT_OF_STOCK_MSG;
          this._deviceDataService.publishOutOfStock(this.stock);
        }
        this.plansService.updateDeviceStock('bb', device_stock);
        this._estoreAnalyticsService.SetStockForSelectedDevice(this.stock, this._renderer);
      }, (error: any) => {
        this.stock = this.formConst.PRODUCT_OUT_OF_STOCK_MSG;
        this._deviceDataService.publishOutOfStock(this.stock);
        this._estoreAnalyticsService.SetStockForSelectedDevice(this.stock, this._renderer);
      });
  }
}
