import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptions, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import { AppService } from "../../../Service/app.service";
import { BaseService } from '../../../base.service';

@Injectable()
export class MoonPlanWithPassDetailsService extends BaseService {
  PlanPassDeviceResponse = [];
 constructor(private _service: AppService) {
    super();
  }

    public getPlanPassDevice(url): Observable<any[]> {
        return this._service.getEstoreData(url).pipe(map((response: any) => {
            return response;
        }));
    }
}
