import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../../../base.service';
import { AppService } from '../../../Service/app.service';

@Injectable()
export class CompareBannerService extends BaseService {

  constructor(private _service: AppService) {
    super();
  }

  public Find(apiURL: string): Observable<any[]> {
    const url = apiURL; // .replace(/[+_]/g,'%2B');
    return this._service
      .get(url)
      .pipe(map((response: any) => {
        return response;
      }));
  }

}
