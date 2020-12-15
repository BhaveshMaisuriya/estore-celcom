import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { iPrepaidPlan } from './prepaid.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HOST } from '../../../Service/app.service';
import {IMNPPrepaidData} from "../../eKyc/e-kyc.model";
import {TypeofPurchaseService} from "../../../Service/type-of-purchase.service";
import {LoginService} from "../../login/service/login.service";
import {UserService} from "../../../Service/user.service";
import {DeviceDataService} from "../../../Service/devicedata.service";
import { MnpService } from "../../mnp/services/mnp.service";

@Injectable({
    providedIn: 'root'
})
export class PrepaidService {
  nric: string;
  domain = HOST;

  mnpData: IMNPPrepaidData = {
    idNumber: "",
    idType: "",
    loginResponse: null
  }

  constructor(
    private http: HttpClient,
    private topService: TypeofPurchaseService,
    private loginService: LoginService,
    private userService: UserService,
    private deviceDataService: DeviceDataService,
    private mnpService: MnpService,
  ) { }

  loadPlan(sku: string, params): Observable<iPrepaidPlan>{
    return this.http
        .get<iPrepaidPlan>(`${this.domain}/rest/V1/prepaidproductview/${sku}`, {params})
        .pipe(
            map(response => response[0]),
        );
  }

  addToCart(data): Observable<any>{
    return this.http
        .post<any>(`${this.domain}/rest/V1/prepaidaddtocart`, {...data});
  }

  checkPrepaidNRIC(data): Observable<any> {
    return this.http
        .post<any>(`${this.domain}/rest/V1/prepaid-login`, {...data});
  }

  addToCartMNP(data) {
    return this.http.post(`${this.domain}/rest/V1/planaddtocart`, {...data})
  }

  retriveNumbers() {
    const dataForRetrieveNumberAPI = {
      NumberDetailsRetrieveRequest: {
        numberService: "POSTPAID",
        numberCategory: "NORMAL",
        numRecords: "20",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    return this.mnpService.GetNewNumbers(dataForRetrieveNumberAPI);
  }

  getRandomNumber(numbersList: any) {
    return this.mnpService.getRandomNumber(numbersList);
  }

  setMNPData(data: Partial<IMNPPrepaidData>) {
    this.mnpData = {
      ...this.mnpData,
      ...data
    }
  }

  handleEKycSuccess() {
    const { loginResponse, user, msdin } = this.mnpData;
    if (loginResponse.status) {
      this.topService.updateeKycStatus(true);
      if (user === "mc") {
        this.loginService.BindCustomerDetails(loginResponse, msdin);
      } else {
        this.userService.doGuestLogin([ loginResponse ], this.mnpData.idNumber);
        this.deviceDataService.publishLoggerInUserName('GUEST');
      }
    }
  }
}
