import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../base.service';
import { AppService } from '../Service/app.service';

@Injectable()
export class OrderInfoService extends BaseService {

constructor(private _service: AppService) {
  super();
}

public ViewOrderInfo(customerNRIC: any, planType: string) {
    const url = "/rest/V1/orders-info/"  + customerNRIC + "/" + planType;
      return this._service.getEstoreUserData(url).pipe(map((response: any) => {
        return response;
      }));
    }
}

