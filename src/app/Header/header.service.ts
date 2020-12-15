import {Injectable} from '@angular/core';
import {Observable,  BehaviorSubject ,  Subject } from 'rxjs';
import { map } from "rxjs/operators";
import {BaseService} from '../base.service';
import {AppService} from '../Service/app.service';

@Injectable({
    providedIn: 'root'
})
export class HeaderService extends BaseService  {
    constructor(private _service: AppService) {
            super();
    }

    private updateUserName = new Subject<string>();
    public updateUserName$ = this.updateUserName.asObservable();

    publishUser(userToPublish: string) {
        this.updateUserName.next(userToPublish);
    }

    public FindGlobalNavigation(): Observable<any[]> {
        const url = this.API_URL_CONST.MENU_API_URL + this.API_URL_CONST.HEADER_API_ID;
        return this._service
        .get(url)
        .pipe(map((response: any) => {
            return response;
        }));
    }

    public ClearAllStorages() {
        if (typeof window !== 'undefined' && localStorage && sessionStorage) {
          localStorage.clear();
          sessionStorage.clear();
        }
    }
}
