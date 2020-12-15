import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription ,  Observable } from 'rxjs';
import { UserService } from '../../../Service/user.service';
import { AppService } from "../../../Service/app.service";
import { map } from "rxjs/operators";
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';

@Component({
  selector: 'app-esim-email-confirmation',
  templateUrl: './esim-email-confirmation.component.html',
  styleUrls: ['./esim-email-confirmation.component.css']
})
export class EsimEmailConfirmationComponent implements OnInit {
  userEmailId = null;
  subscriber: Subscription;
  eSimEligible = null;
  contactEmailId = null;
  loading = false;
  enableChangeEmailAddress = false;
  emailSent = null;
  enableVerifyEmailAddress = false;
  changeEmailResp = "";
  validityText = "";
  public apiErrorMessage: any;
  public isApiError = false;
  constructor(
    private _deviceDataService: DeviceDataService,
    private _globalErrorHandler: GlobalErrorHandler,
    private _service: AppService
  ) { }

  ngOnInit() {
    this.loadUserInfo();
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.isApiError = data));
  }
  loadUserInfo() {
    this.subscriber = this._deviceDataService.esimEligible$.subscribe(data => {
      this.eSimEligible = data;
      if (sessionStorage && sessionStorage.getItem("UserInfo")) {
        const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
        this.userEmailId = userInfo.outputCPResp.contactEmail;
        this._deviceDataService.publishEmailId(this.userEmailId);
      }
    });
  }
  changeEmailAddress() {
    this.enableChangeEmailAddress = true;
    this.contactEmailId = null;
    this.emailSent = null;
  }
  // Update Email address API call.
  updateEmailAddress(resend: boolean) {
    this.loading = true;
    const reqBody = {
      "data": {
        "emailId": this.contactEmailId,
        "resendEmail": resend
      }
    };
    this.postEmailAddress(reqBody, "/rest/V1/change-contact-email").subscribe(
      (res: any) => {
        this.responseUpdateEmailValidation(res[0]);
      },
      (err: any) => {
        this.loading = false;
        this.OnPostEmailAddressError(err.error);
      }
    );
  }
  OnPostEmailAddressError(error) {
    this.apiErrorMessage = {};
    this.apiErrorMessage.content = error.message;
    this.isApiError = true;
    if (this.apiErrorMessage.content) {
      this._globalErrorHandler.errorObjectConvert(this.apiErrorMessage.content);
    }
  }
  responseUpdateEmailValidation(resp) {
    this.loading = false;
    this.emailSent = true;
    this.enableVerifyEmailAddress = true;
    this.changeEmailResp = resp.message;
    this.validityText = resp.link_validity;
    if (!resp.status) {
      this.enableVerifyEmailAddress = false;
      this.OnPostEmailAddressError(resp);
    }
  }
  // Verify Email address API call.
  verifyEmailAddress() {
    this.loading = true;
    const reqBody = {
      "data": {
        "emailId": this.contactEmailId
      }
    };
    this.postEmailAddress(reqBody, "/rest/V1/email-verification").subscribe(
      (res: any) => {
        this.responseVerifyEmailValidation(res[0], this.contactEmailId);
      },
      (err: any) => {
        this.loading = false;
        this.OnVerifyEmailValidationApiError(err.error);
      }
    );
  }
  responseVerifyEmailValidation(resp, emailId) {
    if (resp.status === true) {
      this.loading = false;
      this.userEmailId = emailId;
      this.enableChangeEmailAddress = false;
      if (sessionStorage && sessionStorage.getItem('UserInfo')) {
        const userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
        userInfo.outputCPResp.contactEmail = this.userEmailId;
        sessionStorage.setItem('UserInfo', JSON.stringify(userInfo));
      }
      this._deviceDataService.publishEmailId(this.userEmailId);
    } else if (resp.status === false) {
      this.loading = false;
      this.OnVerifyEmailValidationApiError(resp);
    }
  }
  OnVerifyEmailValidationApiError(error) {
    this.apiErrorMessage = {};
    this.apiErrorMessage.content = error.message;
    this.isApiError = true;
    if (this.apiErrorMessage.content) {
      this._globalErrorHandler.errorObjectConvert(this.apiErrorMessage.content);
    }
  }
  clearEmailId() {
    this.contactEmailId = '';
    this.emailSent = null;
    this.enableVerifyEmailAddress = false;
  }
  public postEmailAddress(requestBody: any, apiUrl: any): Observable<any[]> {
    return this._service.
      postEstoreUserData(apiUrl, requestBody)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
