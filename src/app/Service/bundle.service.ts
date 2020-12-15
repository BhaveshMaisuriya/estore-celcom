import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../base.service';
import { AppService } from '../Service/app.service';

@Injectable()
export class BundleService extends BaseService {

constructor(private _service: AppService) {
  super();
}

public BundleOrder(requestBody: any) {
    const url = "/rest/V1/bundle" ;
      return this._service.postEstoreUserData(url, requestBody).pipe(map((response: any) => {
        return response;
      }));
    }
}

