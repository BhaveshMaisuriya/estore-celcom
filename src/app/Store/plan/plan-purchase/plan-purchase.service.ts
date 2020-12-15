import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../../../base.service';
import { AppService } from '../../../Service/app.service';
import { UserService } from '../../../Service/user.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import * as ultraPlanData from './ultra-plan.json';

@Injectable()
export class PlanPurchaseService extends BaseService {

public isInitializeChooseNumber: boolean;
constructor(private _service: AppService,
  private _userService: UserService,
  private _deviceDataService: DeviceDataService
  ) {
  super();
}

public Find(apiURL: string): Observable<any[]> {
  let url = "/rest/V1/planproductview/" + apiURL; // .replace(/[+_]/g, '%2B');
  url = this._userService.updateApiUrl(url);
  return this._service.getEstoreData(url).pipe(map((response: any[]) => {
    return response;
  }));
}
public FindUltraPlan(ultraPassUrl: string): Observable<any[]> {
  const url = this._userService.updateApiUrl(ultraPassUrl);
  return this._service.getEstoreData(url).pipe(map((response: any[]) => {
    return response;
  }));
  // const ultradata = (<any>ultraPlanData);
  // return Observable.of(ultradata);
 }

public FindTableWithoutHeadingInfo(apiURL: string) {
  return this._service.getEstoreData(apiURL).pipe(map((response: any) => {
    return response;
  }));
}
public ReInitializeChooseNumberComponent() {
  setTimeout(() => {
    this.isInitializeChooseNumber = false;
  }, 0);
  setTimeout(() => {
    this.isInitializeChooseNumber = true;
    this._deviceDataService.publishPhoneNo(null);
    this._deviceDataService.publishNumberType(null);
    this._deviceDataService.publishPlanChanged(true);
    this._deviceDataService.publishSupplimentaryLines([]);
    this._deviceDataService.publishPrincipalLine(false);
    this._deviceDataService.publishSupplinesLinesPrice(null);
    this._deviceDataService.publishdeviceUpfrontPenalty(0);
    this._deviceDataService.publishInternetSharingOption(false);
  }, 0);
  if (typeof window !== 'undefined' && localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
    localStorage.removeItem("suppLinesAddedByTheUser");
  }
}
}
