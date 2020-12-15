import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HOST} from "../../../../Service/app.service";
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {LoginService} from "../../../../Store/login/service/login.service";
import {UserService} from "../../../../Service/user.service";
import {DeviceDataService} from "../../../../Service/devicedata.service";
import {IGuestUser, IMobileConnectUser, TPersonalForm} from "../../../models/user.model";

interface ILoginResponse {
  "status": boolean;
  "mobile_connect_user": boolean;
  "token": string;
  "blacklisted": boolean;
  "message": string;
  "authtoken": string;
}

export interface IOrderData {
  order_count: string;
  asset_count: string;
  total_lines: string;
  max_post_count: string;
  max_pre_count?: any;
}

export interface INricOrderInfo {
  exception: boolean;
  message: string;
  order_data: IOrderData;
}

@Injectable({
  providedIn: 'root'
})
export class NewLineWrapperService {
  domain = HOST;

  constructor(
    private http: HttpClient,
    private _loginService: LoginService,
    private _userService: UserService,
    private _deviceDataService: DeviceDataService,
  ) {  }

  loginUser(nric: string): Observable<ILoginResponse> {
    const endpoint = "rest/V1/login";

    const login_data = {
      "user": "guest",
      "id_type": "1",
      "id_number": nric
    };

    return this.http.post<ILoginResponse[]>(
      `${this.domain}/${endpoint}`, {login_data}
    )
      .pipe(
        map(response => response[0])
      );
  }

  doGuestLogin(response: ILoginResponse, nric: string) {
    this._userService.doGuestLogin([response], nric);
    this._deviceDataService.publishLoggerInUserName('GUEST');
  }

  getUserDetails(): TPersonalForm  {
    return this._userService.getPersonalForm();
  }

  checkNricOrderInfo(nric: string): Observable<INricOrderInfo> {
    const endpoint = `rest/V1/orders-info/${nric}/Postpaid`;
    return this.http.get<INricOrderInfo>(`${this.domain}/${endpoint}`);
  }
}
