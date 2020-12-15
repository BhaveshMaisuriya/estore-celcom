import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {BaseService} from '../../base.service';
import {AppService} from '../../Service/app.service';

@Injectable()
export class HeroBannerImageClickableService extends BaseService  {
    constructor(private _service: AppService) {
        super();
    }

    public Find(endPointURL: string): Observable<any[]> {
        return this._service
        .get(endPointURL)
        .pipe(map((response: any) => {
            return response;
        }));
    }
}
 