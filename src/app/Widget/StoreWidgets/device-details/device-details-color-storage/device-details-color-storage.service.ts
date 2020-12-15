import { Injectable, Renderer2, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { BaseService } from '../../../../base.service';
import { AppService } from '../../../../Service/app.service';
import { DeviceDataService } from '../../../../Service/devicedata.service';
import { EStoreAnalysticsService } from '../../../../Service/store.analytic.service';
import * as FormConst from '../../../../../constants/form.constants';
import { PlansService } from '../../../../Service/plans.service';

@Injectable()
export class DeviceDetailsStorageService extends BaseService {
    public deviceStock;
    public formConst: any;
    constructor(private _service: AppService,
        private _deviceDataService: DeviceDataService,
        private _estoreAnalyticsService: EStoreAnalysticsService,
        private _renderer: Renderer2,
        @Inject(forwardRef(() => PlansService)) private plansService: PlansService,
    ) {
        super();
        this.formConst = FormConst;
    }

    public Find(apiURL: string): Observable<any[]> {
        return this._service
            .get(apiURL)
            .pipe(map((response: any) => {
                return response;
            }));
    }
    public checkStockGatewayHW(body) {
      const url = "/store/v1/stockAvailabilityCheck";
      const createActivityReq = JSON.stringify(body);
      return this._service.postEstoreUserData(url, createActivityReq);
    }
    public checkStockGateway(sku): Observable<any> {
        if (!sku) {
            return;
        }
        const url = "/rest/V1/stock-check/" + sku;
        return this._service
            .getEstoreData(url)
            .pipe(map((response: any) => {
                return response;
            }));
 }
 public getStockOfTheDevice(simpleSku: string, bundleSku: string, sku = '') {
  this.deviceStock = this.formConst.PRODUCT_CHECKING_STOCK_MSG;
  const skus = {
      bundleSku: bundleSku,
      simpleSku: simpleSku,
      sku: sku
  };
  this._deviceDataService.publishOutOfStock(this.deviceStock, skus);
  this.checkStockGateway(simpleSku).subscribe(
     (res: any) => {
        this.plansService.updateDeviceStock(simpleSku, res);
      if (res && res.in_stock) {
        this.deviceStock = this.formConst.PRODUCT_IN_STOCK_MSG;
      } else {
         this.deviceStock = this.formConst.PRODUCT_OUT_OF_STOCK_MSG;
      }
      this._deviceDataService.publishOutOfStock(this.deviceStock, skus);
      this._estoreAnalyticsService.SetStockForSelectedDevice(this.deviceStock, this._renderer);
      return this.deviceStock;
    }, (error: any) => {
        this.plansService.updateDeviceStock(simpleSku, {
            status: false,
            message: error,
            in_stock: false,
        });
      this.deviceStock = this.formConst.PRODUCT_OUT_OF_STOCK_MSG;
      this._estoreAnalyticsService.SetStockForSelectedDevice(this.deviceStock, this._renderer);
      this._deviceDataService.publishOutOfStock(this.deviceStock, skus);
      return this.deviceStock;
    });
 }
}
