import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptions, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import { BaseService } from '../../../base.service';
import { AppService } from '../../../Service/app.service';

@Injectable()
export class DeviceDetailsService extends BaseService {
    constructor(private _service: AppService) {
        super();
    }

    public Find(url): Observable<any> {
        return this._service
            .getEstoreData(url)
            .pipe(map((response: any) => {
                return response;
            }));
    }
}
