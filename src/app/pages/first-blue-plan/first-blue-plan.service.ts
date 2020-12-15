import { Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HOST } from "../../Service/app.service";
import { Observable, of } from "rxjs";
import {
  IFirstBluePlanResponse,
  IFBEligiblityCheckResponse,
  IFBPData,
} from "./first-blue-plan.model";
import { map, catchError } from "rxjs/operators";
import { LoginService } from "../../Store/login/service/login.service";
import { MC_SEND_OTP_API } from 'app/shared/constants/estoreEndPoint.constants';
import {
  addTocartBundle,
  iNumberReservationRequest,
  iNumberReservationRequestData,
  iNumberReservationResponse,
  NewLineAddtocartData
} from "../../models/general.model";
import { TPersonalForm } from "../../shared/models/user.model";
import { UserService } from "../../Service/user.service";
import { formatPhoneNumber } from 'app/shared/utilities/helper.ultility';
import { iGeneralServerResponse } from 'app/shared/models/general.model';
import { SYS_DOWN_MSG } from 'constants/error.constants';
import { PlansService } from 'app/Service/plans.service';

@Injectable({
  providedIn: 'root'
})
export class FirstBluePlanService {
  domain = HOST;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private userService: UserService,


  ) {
  }

  getPlanData(queryParams): Observable<IFirstBluePlanResponse> {
    let endpoint = `rest/V1/planproductview/first-blue-internet`;
    if (queryParams) {
      endpoint += '?' + queryParams;
    }
    return this.http
      .get<IFirstBluePlanResponse[]>(`${ this.domain }/${ endpoint }`)
      .pipe(
        map(response => response[0])
      );
  }

  loadPlan(sku: string, promotions): Observable<IFirstBluePlanResponse>{
    const endpoint = `planproductview`;
    return this.http
        .get<IFirstBluePlanResponse>(`${this.domain}/rest/V1/${endpoint}/${sku}`,
        {params: promotions})
        .pipe(
            map(response => response[0]),
            catchError(_err => {
              const error: iGeneralServerResponse = {
                message: SYS_DOWN_MSG,
                status: false,
              };
              return of(error);
            })
        );
  }


  getUserDetails(): TPersonalForm  {
    return this.userService.getPersonalForm();
  }

  checkEligibilty(number: string, nric: string): Observable<IFBEligiblityCheckResponse> {
    const endpoint = `rest/V1/familylineligibilitycheck/${ number }/${ nric }`;
    return this.http
      .get<IFBEligiblityCheckResponse[]>(`${ this.domain }/${ endpoint }`)
      .pipe(
        map(response => response[0])
      );
  }

  sendOtp(phone: number): Observable<any> {
    const apiUrl = MC_SEND_OTP_API;
    const formatedPhone = formatPhoneNumber(phone);

    const requestBody = {
      mobile_number: formatedPhone,
      tnc: true
    };

    return this.loginService.MobileConnect(apiUrl, requestBody);
  }

  reserveNumber(data: IFBPData): Observable<iNumberReservationResponse> {
    const suppReqData: iNumberReservationRequestData = {
      partNumber: data.basePlan.order_plan_bundle,
      sku: data.basePlan.sku,
    };

    const param: iNumberReservationRequest = {
      data: suppReqData,
      mobile_number: data.supplementaryLines
        .map(x => x.number)
        .filter(x => x),
      reservationId: "" // ? This will be always empty
    };

    return this.http
      .post<any>(`${this.domain}/rest/V1/reserveNumber`, {...param})
      .pipe(
        map(response => response[0]),
      );
  }

  addToCart(data): Observable<any>{
    return this.http
        .post<any>(`${this.domain}/rest/V1/planaddtocart`, {...data});
  }
}
