import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../../../base.service';
import { AppService } from '../../../Service/app.service';

const PRODUCT_COMPARE_KEY = "product_compare";

@Injectable()
export class CatalogueService extends BaseService {

constructor(private _service: AppService) {
super();
}

public Find(apiURL: string): Observable<any[]> {
// let url = apiURL; // .replace(/[+_]/g,'%2B');
const url = apiURL;
// let options = this.GenerateHeader();
return this._service
.getEstoreUserData(url)
.pipe(map((response: any) => {
return response;
}));
}

public PostFind(apiURL: string): Observable<any[]> {
        const url = apiURL; // .replace(/[+_]/,'%2B');
        // let options = this.GenerateHeader();
        return this._service
        .postEstoreData(url)
        .pipe(map((response: any) => {
            return response;
        }));
    }
}
