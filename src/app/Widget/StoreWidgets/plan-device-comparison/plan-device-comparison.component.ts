import { Component, OnInit, ViewContainerRef, Input, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanDeviceComparisonService} from "./plan-device-comparison.service";
import { BaseComponent } from '../../../base.component';
import { ContentNavigation } from '../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../Service/redirection.service';
import { CompareProductService } from '../../../Service/compareproduct.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { CartService } from '../../../Service/cart.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';

@Component({
  selector: 'app-plan-device-comparison',
  templateUrl: './plan-device-comparison.component.html',
  styleUrls: ['./plan-device-comparison.component.css'],
  providers: [PlanDeviceComparisonService, RedirectionService, CompareProductService, CartService]
})
export class PlanDeviceComparisonComponent extends BaseComponent implements OnInit {
data: any;
public productList: any;
public productListDetails = [];
public colorList: Array<any> = [];
public storageList: Array<any> = [];
public selectedColor: any = null;
public selectedDevice: any = null;
public DeviceDetailsStorageResponse = null;
public maxDeviceNumber = -1;
constructor(private _service: PlanDeviceComparisonService,
private cartService: CartService,
private compProductService: CompareProductService,
private _deviceDataService: DeviceDataService,
private _router: Router,
private _activatedRoute: ActivatedRoute,
private _redirectionService: RedirectionService,
private _estoreAnalyticsService: EStoreAnalysticsService,
private _renderer: Renderer2
) {
super();
}

ngOnInit() {
this.Init();
}

Init() {
this.productList = this.compProductService.retrieveProduct();
const self = this;
let arrColor: Array<any> = [];
let arrStorage: Array<any> = [];
if (this.productList) {
this.productList.noOfProds.forEach((item: any, index) => {
const url = '/rest/V1/devicedetails/' + item.sku;
this._service.Find(url).subscribe(
(response: any[]) => {
const tempProductItem = response[0];
tempProductItem.devicePrice = item.price;

// Handling the NFC condition
if (tempProductItem.items.basic_details.nfc === 1) {
tempProductItem.items.basic_details.nfcToShow = "Yes";
} else {
tempProductItem.items.basic_details.nfcToShow = "No";
}
arrColor = [];
arrStorage = [];
self.DeviceDetailsStorageResponse = tempProductItem.items.associated_product;
self.DeviceDetailsStorageResponse.forEach(element => {
const deviceColor = element.color_hexa;
const deviceMemory = element.memory;
if (arrColor.indexOf(deviceColor) === -1) {
arrColor.push(deviceColor);
}
if (arrStorage.indexOf(deviceMemory) === -1) {
arrStorage.push(deviceMemory);
}
});
tempProductItem.colorList = arrColor;
tempProductItem.storageList = arrStorage;

self.productListDetails.push(tempProductItem);
});
});
}
this.maxDeviceNumber = (this.isMobile()) ? this.appConstant.MAX_PRODUCT_TO_COMPARE_MOBILE :
this.appConstant.MAX_PRODUCT_TO_COMPARE_DESKTOP;
}

addDeviceToCart(product: any) {
this.cartService.addProductToCart(product, 1);
}

removeCompareProduct(product: any) {
this.compProductService.removeProductFromCompare(product);
this.productList = this.compProductService.retrieveProduct();
let removedIndex = -1;
this.productListDetails.forEach( (item: any, index) => {
if (item.items.basic_details.sku === product.sku) {
removedIndex = index;
}
});
this.productListDetails.splice(removedIndex, 1);
// analytics
this._estoreAnalyticsService.SetCompareProductArray(this.productList, this._renderer);
}

public ManageContentNavigation(data: any) {
const obj = new ContentNavigation().ManagePageRedirection(data);
this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
}

}
