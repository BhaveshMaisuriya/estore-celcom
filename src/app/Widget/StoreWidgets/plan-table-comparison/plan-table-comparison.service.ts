import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../../../base.service';
import {AppService} from '../../../Service/app.service';

@Injectable()
export class PlanTableComparisionService extends BaseService {
  constructor(private _service: AppService) {
    super();
  }

  public Find(apiURL: string): Observable<any[]> {
    const url = apiURL;
    return this._service
    .getEstoreUserData(url)
    .pipe(map((response: any) => {
        return response;
    }));
  }
}
