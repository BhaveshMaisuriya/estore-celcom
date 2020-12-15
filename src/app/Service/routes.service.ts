import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../base.service';
import { AppService } from './app.service';

@Injectable()
export class RoutesService extends BaseService {
    constructor(private _service: AppService) {
        super();
    }

    public Find(): Observable<any[]> {
        const endPointURL = this.API_URL_CONST.ALIAS_API_URL;
        return this._service
            .get(endPointURL)
            .pipe(map((response: any) => {
                return response;
            }));
    }

    public FindAdobeFromDB(): Observable<any[]> {
        const endPointURL = '/getAdobeUrl';
        return this._service
            .get(endPointURL)
            .pipe(map((response: any) => {
                return response;
            }));
    }
}
