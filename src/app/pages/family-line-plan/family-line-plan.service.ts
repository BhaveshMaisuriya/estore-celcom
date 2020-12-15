import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HOST } from "../../Service/app.service";
import { Observable } from "rxjs";
import {
  IFamilyLinePlanResponse,
  IFLEligiblityCheckResponse,
  IFLPData,
} from "./family-line-plan.model";
import { map } from "rxjs/operators";
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

@Injectable({
  providedIn: 'root'
})
export class FamilyLinePlanService {
  domain = HOST;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private userService: UserService,
  ) {
  }

  getPlanData(sku, params): Observable<IFamilyLinePlanResponse> {
    const endpoint = `rest/V1/prepaidproductview/${sku}`;
    return this.http
      .get<IFamilyLinePlanResponse[]>(`${ this.domain }/${ endpoint }`,
      {
        params
      })
      .pipe(
        map(response => response[0])
      );
  }

  getUserDetails(): TPersonalForm  {
    return this.userService.getPersonalForm();
  }

  checkEligibilty(number: string, nric: string): Observable<IFLEligiblityCheckResponse> {
    const endpoint = `rest/V1/familylineligibilitycheck/${ number }/${ nric }`;
    return this.http
      .get<IFLEligiblityCheckResponse[]>(`${ this.domain }/${ endpoint }`)
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

  reserveNumber(data: IFLPData): Observable<iNumberReservationResponse> {
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

  addToCart(
    componentData: IFLPData,
    customerId: string,
    principleNumberRaw: string,
    internet_share: boolean,
    reservationId: string,
    is_campaign_omni,
  ) {
    const { basePlan, supplementaryLines, totalPayment, validation_id: validated_id } = componentData;

    const principleNumber = principleNumberRaw.replace(/^6/, '');

    const basicData: addTocartBundle.IFamilyLineAddtoCartData = {
      ...new NewLineAddtocartData(
        principleNumber, reservationId
      ),
      validated_id,
      bundle_product_sku: "family-line", // ? Will not change
      selected_plan_product_sku: "Ultra-Base", // ? Will not change
      selected_device_product_sku: null,
      selected_pass_product_sku: "",
      sub_pass_sku: "",
      is_campaign_mviva: basePlan.is_campaign_mviva,
      bundle_product_price: `${ totalPayment }`,
      is_star_internet_share: internet_share,
      is_campaign_omni,
    };

    const data: addTocartBundle.IFamilyLineAddToCart = {
      data: basicData,
      customerId,
      supp_data: supplementaryLines
        .filter(line => line.number)
        .map(line => ({
          number: line.number,
          plan: basePlan.order_plan_bundle,

          // Not sure where to get
          subsidy: "",
        })),
    };

    return this.http
      .post<any>(`${this.domain}/rest/V1/bundle`, {...data})
      .pipe(
        map(response => response[0])
      );
  }
}
