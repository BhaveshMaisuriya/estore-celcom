import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppService, HOST } from "app/Service/app.service";
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface IOrderData {
  idType: string;
  nric: string;
  orderId: string;
}

@Injectable({
  providedIn: 'root'
})
export class MnpSimVerificationService {

  domain = HOST;

  constructor(
    private _service: AppService
  ) {  }


  verifySimDetail(simDetail: any) {
    const endpoint = "/rest/V1/mnpsimverification";    // /rest/V1/mnpsimverification

    return this._service
      .postEstoreUserData(endpoint, simDetail)
      .pipe(map((response: any) => {
        return response;
      }));
  }

}
