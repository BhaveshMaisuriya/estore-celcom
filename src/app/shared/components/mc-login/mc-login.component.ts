import {Component, OnInit, ViewChild, Output, EventEmitter, Input, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonUtilService } from 'app/Service/commonUtil.service';
import { NewOtpInputComponent } from '../new-otp-input/new-otp-input.component';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { LoginService } from 'app/Store/login/service/login.service';
import { finalize, filter } from 'rxjs/operators';
import { SYS_DOWN_MSG } from 'constants/error.constants';
import { ModalService } from '../modal/modal.service';
import { formatPhoneNumber } from 'app/shared/utilities/helper.ultility';
import {Subscription, timer} from "rxjs";
import { IVerifyCustomerResponse } from 'app/shared/models/user.model';

@Component({
  selector: 'app-mc-login',
  templateUrl: './mc-login.component.html',
  styleUrls: ['./mc-login.component.scss']
})
export class McLoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  step = 1;

  otpCounter: number = 0;
  otpCountDown: Subscription;
  second = 1000;
  _isLoading = false;
  get isLoading() {
    return this._isLoading;
  }

  set isLoading(value) {
    this.onLoading.emit(value);
    this._isLoading = value;
  }

  _generalError = '';
  state: string;
  securityCode: string;
  /**
   * Required to accept Mobile Connect
   * Terms & Conditions
   */
  isTnCRequired = false;

  @Input() minimalist = false;
  @Input() nric;
  @Input() interceptLogin = false;

  @Output() onError = new EventEmitter();
  @Output() onSuccess = new EventEmitter();
  @Output() onLoading = new EventEmitter();

  get generalError() {
    return this._generalError;
  }

  set generalError(value) {
    this._generalError = value;
    if (this.step == 1) {
      this.mobileNumberControl.setErrors(value ? {
        custom: value
      } : null);
    }
    this.onError.emit(value);
  }

  otpExpired = false;

  resendLinkDisabled = false;
  subscriber: unknown;

  @ViewChild('otpFormInput') otpForm: NewOtpInputComponent;

  constructor(
    private formBuilder: FormBuilder,
    private _commonUtilService: CommonUtilService,
    private loginService: LoginService,
    private _modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mobileNumber: [null, [
        Validators.required,
        Validators.pattern(/[0-9]{10,}/)
      ]],
    });
    this.subscriber = this._modalService.onClosedModal
      .pipe(
        filter(value => value == 'mc-login')
      )
      .subscribe(
        _data => {
          this.step = 1;
          this.loginForm.reset();
          this.generalError = '';
        }
      );
  }

  ngOnDestroy() {
    this.destroyCountDown();
  }

  destroyCountDown() {
    this.otpCounter = 0;
    if (this.otpCountDown) {
      this.otpCountDown.unsubscribe();
    }
  }

  get mobileNumberControl() {
    return this.loginForm.get('mobileNumber');
  }

  next() {
    if (this.step == 1)
      this.verifyCustomer();
    if (this.step == 2)
      this.onLogin();
  }

  verifyCustomer() {
    this.isLoading = true;
    const apiURL = ApiConstant.VERIFY_CUSTOMER;
    let mobile_number = formatPhoneNumber(this.mobileNumberControl.value.trim());

    let requestBody = this._commonUtilService.encrypter(
      JSON.stringify({
        data: { mobile_number: mobile_number }
      })
    );
  
    this.loginService
      .MobileConnect(apiURL, requestBody)
      .subscribe(
        (res: IVerifyCustomerResponse) => {
          if (res && res?.status) {
            this.onSendOTP();
          }
          else {
            this.isLoading = false;
            this.generalError = res[0].message;
          }
        } ,
        err => {
          this.generalError = SYS_DOWN_MSG;
        }
      );
  }

  onSendOTP(){
    let tnc = undefined;
    if (!this.loginForm.valid) return;
    if (this.isTnCRequired) {
      tnc = true;
      this.isTnCRequired = false;
    }
    this.isLoading = true;
    this.destroyCountDown();
    const apiUrl = ApiConstant.MC_SEND_OTP_API;
    let mobile_number = formatPhoneNumber(this.mobileNumberControl.value.trim());
    let requestBody;
    requestBody = {
      mobile_number,
      tnc,
    };
    if (this.nric) {
      requestBody = {
        ...requestBody,
        nric: this.nric,
      }
    }
    this.loginService.MobileConnect(apiUrl, requestBody)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        (response: any) => {
          this.generalError = '';
          this.otpExpired = false;

          if (response[0].status === true && response[0].exists === false) {
            this._modalService.open('tnc-login');
            this.isTnCRequired = true;
          } else if (response[0].status === true && response[0].exists === true) {
            this.loginService.disableResendOtpLink(response[0]);
            if (this.step === 1) {
              this.step++;
            }
            this.state = response[0].state;
            this.securityCode = response[0]?.securityCode;

            this.resendLinkDisabled = true;
            this.otpCounter = (response[0].disable_resend_link | 0);
            this.otpCountDown = timer(0, this.second)
              .subscribe(() => {
                if (this.otpCounter > 0) {
                  --this.otpCounter;
                } else if (this.otpCounter === 0) {
                  this.resendLinkDisabled = false;
                  this.otpExpired = true;
                }
              });

            try {
              setTimeout(() => {
                document.getElementById('input1').focus();
              }, 500);
            } catch (_error) {

            }
          } else {
            this.generalError = response[0].message;
          }
        }, (error: any) => {
          this.generalError = SYS_DOWN_MSG;
        }
      );
  }

  onLogin() {
    this.generalError = '';
    const requestBody = {
      "login_data": {
        "mobile_number": this.mobileNumberControl.value,
        "otp": this.otpForm.getValue(),
        "state": this.state,
        "securityCode": this.securityCode ?? null,
        "user": "user",
        // "order_id": orderId,
        // "order_secret" : orderSecret,
        // "check_blacklist" : checkBlacklist
      }
    };
    const apiUrl = "/rest/V1/login";
    this.isLoading = true;
    this.loginService.MobileConnect(apiUrl, requestBody)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        (response: any) => {
          if (response[0].status === true) {

            if (this.interceptLogin) {
              this.onSuccess.emit({ response, msdin: requestBody.login_data.mobile_number });
              return;
            }

            this.loginService.BindCustomerDetails(response[0], requestBody.login_data.mobile_number);
            this.onSuccess.emit({ response });
          } else {
            this.generalError = response[0].message;
          }
        }, (_error: any) => {
          this.generalError = SYS_DOWN_MSG;
        }
      );
  }

  onClickAgree(){
    this._modalService.close('tnc-login');
    this.onSendOTP();
  }

  onClickResendOTP() {
    if (this.resendLinkDisabled) return;
    this.otpForm.clearValue();
    this.onSendOTP();
  }

}
