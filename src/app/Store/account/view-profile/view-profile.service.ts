import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../../Service/app.service';

@Injectable()
export class ViewProfileService {
    constructor(private _service: AppService) {
    }

    public postVoucherCode(url, requestBody): Observable<any> {
        return this._service
            .postEstoreUserData(url,requestBody)
            .pipe((response: any) => {
                return response;
            });
    }
}
