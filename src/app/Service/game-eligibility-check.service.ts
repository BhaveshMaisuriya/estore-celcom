import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HOST } from "./app.service";
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface IEligibilityResponse {
  status: boolean;
  message: string;
  customer_name?: string;
  nric?: string;
  customer_email?: string;
  voucher_data?: IVoucherData[];
}

export interface IVoucherData {
  voucher_code: string;
  voucher_name: string;
  voucher_details: string;
  voucher_logo: string;
  voucher_value: string;
  selected: string;
}

export interface ICustData {
  msisdn: string;
  nric: string;
  orderId: string;
  magentoOrderId: string;
  promoType: string;
  played: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GameEligibilityCheckService {

  domain = HOST;

  constructor(
    private http: HttpClient
  ) {  }

  checkEligibility(cust_data: ICustData): Observable<IEligibilityResponse> {
    const endpoint = "rest/V1/gamificationEligibility";

    return this.http.post<IEligibilityResponse[]>(
      `${this.domain}/${endpoint}`, 
      { ...cust_data }
    )
    .pipe(
      map(response => response[0]),
      catchError(_err => {
        const error = {
          message: "",
          status: false,
        };
        return of(error);
      })
    );
  }

}
