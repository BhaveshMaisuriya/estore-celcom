import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'app/Service/app.service';
import { map, catchError, tap } from 'rxjs/operators';
import { IDeviceDetailResponse, iStockResponse } from 'app/shared/models/device.model';
import { Observable, of } from "rxjs";
import { UserService } from 'app/Service/user.service';
import { iGeneralServerResponse } from 'app/shared/models/general.model';
import { SYS_DOWN_MSG } from 'app/shared/constants/error.constants';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetailPageService {
  domain = HOST;

  constructor(
    private http: HttpClient,
    private _userService: UserService
  ) { }

  loadDevice(deviceSku, params) {
    const endpoint = `rest/V1/devicedetails`;
    return this.http
      .get<IDeviceDetailResponse[]>(
        `${this.domain}/${endpoint}/${deviceSku}`,
        {
          params
        }
      )
      .pipe(
        map(response => response[0]),
        catchError(this.onResponseError)
      );
  }

  loadDeviceCombo(deviceSku, params): Observable<IDeviceDetailResponse> {
    const endpoint = `rest/V1/devicedetails-combo`;
    return this.http
      .get<IDeviceDetailResponse>(
        `${this.domain}/${endpoint}/${deviceSku}`,
        {
          params
        }
      )
      .pipe(
        /**
         * Use this one if response already transformed
         */
        // map(response => response[0]),

        /**
         * Use this one to transform response
         */
        map(response => {
          let resp;
          try {
            resp = this.transformDeviceComboPricing(response);
          } catch (_error) {
            resp = response[0];
          }
          return resp;
        }),
        catchError(this.onResponseError)
      );
  }

  transformDeviceComboPricing(response): IDeviceDetailResponse {
    const newData = response[0].items.associated_product
      .map((device) => {
        let easyPhoneData: any[] = !device?.easy_phone?.own
          ? []
          : Object.keys(device.easy_phone.own)
            .filter((ep) => Array.isArray(device.easy_phone.own[ep])) 
            .map((ep) => {
              return [
                {
                  sku: ep,
                  easy_phone: {
                    ...device.easy_phone,
                    own: device.easy_phone.own[ep].map((own) => {
                      return {
                        ...own,
                        parent_product_sku: device.sku
                      };
                    })
                  }
                }
              ];
            })
            .reduce((acc, val) => acc.concat(val), []);

        const saleablePlansData = !device.saleable_plans
          ? []
          : Object.keys(device.saleable_plans)
            .map((ep) => {
              return [
                {
                  sku: ep,
                  saleable_plans: device.saleable_plans[ep].map((data) => {
                    return {
                      ...data,
                      parent_product_sku: device.sku
                    };
                  })
                }
              ];
            })
            .reduce((acc, val) => acc.concat(val), []);

        if (saleablePlansData) {
          saleablePlansData.forEach((val) => {
            const dt = easyPhoneData?.findIndex((e) => e.sku === val.sku);
            if (dt >= 0) {
              easyPhoneData[dt] = {
                ...easyPhoneData[dt],
                ...val
              };
            } else {
              easyPhoneData = [...easyPhoneData, val];
            }
          });
        }
        return easyPhoneData;
      })
      .reduce((acc, val) => acc.concat(val), []);

    const groupedData = [];
    for (const data of newData) {
      const dataIndex = groupedData.findIndex((d) => d.sku === data.sku);
      if (dataIndex >= 0) {
        if (groupedData[dataIndex].easy_phone?.own) {
          groupedData[dataIndex].easy_phone.own = [
            ...groupedData[dataIndex].easy_phone.own,
            ...data.easy_phone.own
          ];
        }
        if (groupedData[dataIndex].saleable_plans) {
          groupedData[dataIndex].saleable_plans = [
            ...groupedData[dataIndex].saleable_plans,
            ...data.saleable_plans
          ];
        }
      } else {
        groupedData.push(data);
      }
    }

    const result = {
      items: {
        associated_product: groupedData
      }
    };
    return result;
  }

  getDeviceStock(sku): Observable<iStockResponse> {
    const endpoint = `rest/V1/stock-check`;
    return this.http
      .get<iStockResponse>(
        `${this.domain}/${endpoint}/${sku}`
      )
      .pipe(
        map(response => response),
        catchError(_err => {
          const error = {
            in_stock: false,
            message: '',
            status: false,
            _err,
          };
          return of(error);
        })
      );
  }

  isUserDealer(): boolean {
    return this._userService.isDealer();
  }

  isUserEnterprise(): boolean {
    return this._userService.isUserEnterprise();
  }

  public AutoBillingCheck(params): Observable<any> {
    const uri = `rest/V1/autobillcheck`
    return this.http.get<any>(
      `${this.domain}/${uri}`,
      { params }
    );
  }

  onResponseError(_err) {
    const error: iGeneralServerResponse = {
      message: SYS_DOWN_MSG,
      status: false,
    };
    return of(error);
  }
}
