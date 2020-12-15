import { Component, OnInit } from '@angular/core';
import { AppService } from '../../Service/app.service';
import { LoginService } from '../login/service/login.service';
import { SYS_DOWN_MSG, AppleWatchError } from '../../../constants/error.constants';

@Component({
  selector: 'app-apple-watch',
  templateUrl: './apple-watch.component.html',
  styleUrls: ['./apple-watch.component.css'],
  providers: [LoginService]
})

export class AppleWatchComponent implements OnInit {
  loadingscreen:boolean = false;
  isReturning: boolean = true;
  isExisting: boolean = true;
  isNotBlackListed: boolean = true;
  isEligible: boolean;
  isLogin: boolean = false;
  isNotRedirection: boolean = true;
  flagCheck: boolean = false;
  message: string = '';
  AppleWatchGuestFlag: boolean = true;
  TextFlag: boolean = true;
  enableNRICAuthentication = false;
  enableMCAuthentication = false;
  enableMCotp = false;
  msisdnOtp: string = null;
  nric = null;
  pageType = "hwInLine";
  simType = null;
  loading: boolean = false;
  systemDown: boolean = false;
  CustomerName: string = null;
  CustomerNumber: string = null;
  messageCategory: string;
  data:any;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    this.systemDown = false;
    this.onLoadEligibilityCheck();
  }
  onReset(e) {
    this.enableMCAuthentication = false;
    this.enableMCotp = false;
  }
  onCallResetOtp(e) {
    this.enableMCotp = false;
  }
  formatNumber(value): string {
    if (value.charAt(0) === '6') {
      value = value.substr(1);
    }
    return value;
  }
  onSentOtp(e) {
    if (e) {
      this.enableMCotp = e.status;
      this.msisdnOtp = this.formatNumber(e.msisdn);
      this.simType = e.sim_type;
    }
  }
  async OnMobileConnectUser(e) {
    this.nric = e.nric;
    if (e.mcUser) {
      this.enableMCAuthentication = true;
    } else {
      if (e.response[0].blacklisted) {
        this.loading = true;
        this.isLogin = true;
        this.isNotBlackListed = false;
        this.messageCategory = AppleWatchError.BLACKLIST;
        this.data = await this.AppleWatchGetMessage();
        this.data[0].status === true ? this.message = this.data[0].message :this.message = AppleWatchError.GENERAL;
        this.loading = false;
      }
      if (e.response[0].new_guest) {
        this.loading = true;
        this.isLogin = true;
        this.isExisting = false;
        this.messageCategory = AppleWatchError.GUEST;
        this.data = await this.AppleWatchGetMessage();
        this.data[0].status === true ? this.message = this.data[0].message :this.message = AppleWatchError.GENERAL;
        this.loading = false;
      }
      // returning new guest user
      if (e.response[0].blacklisted !== true && e.response[0].new_guest !== true && e.response.mobile !== true && e.response[0].status !== false) {
        this.loading = true;
        this.isLogin = true;
        this.isReturning = false;
        this.messageCategory = AppleWatchError.INACTIVE;
        this.data = await this.AppleWatchGetMessage();
        this.data[0].status === true ? this.message = this.data[0].message :this.message = AppleWatchError.GENERAL;
        this.loading = false;
      }
    }
  }

  WhenValidatingOtp(e){
    this.loadingscreen = e;
  }

  onValidOtp(e) {
    if (e) {
      this.isLogin = true;
      this.isNotRedirection = true;
      this.flagCheck = true;
      this.loading = true;
      ({ outputCPResp: { name: this.CustomerName } } = JSON.parse(sessionStorage.getItem('UserInfo')));
      this.CustomerNumber = this.formatNumber(localStorage.getItem("MyMsIsdn"));
      this.loadingscreen = false;
      this.onSuccessfulLogin();
    }
  }

  async onSuccessfulLogin() {
    try {
      let data: any = await this.AppleWatchEligibilityCheck();
      this.isEligible = data[0].status;
      this.message = data[0].message;
    } catch (e) {
      this.isEligible = false;
      this.message = SYS_DOWN_MSG;
      this.systemDown = true;
    }
    this.loading = false;
  }
  AppleWatchEligibilityCheck() {
    return new Promise((resolve, reject) => {
      this._appService.getEstoreUserData(`/rest/V1/applewatcheligibility?msisdnNumber=${this.CustomerNumber}`).subscribe((data) => {
        resolve(data);
      }, (err) => {
        resolve(err);
      });
    });
  }

  AppleWatchGetMessage() {
    return new Promise((resolve, reject) => {
      this._appService.getEstoreUserData(`/rest/V1/applewatchmsg?msgId=${this.messageCategory}`).subscribe((data) => {
        resolve(data);
      }, (err) => {
        resolve(err);
      });
    });
  }
  onLoadEligibilityCheck() {
    if (typeof window !== "undefined" && sessionStorage && localStorage) {
      if (sessionStorage.getItem("GuestInfo")) {
        this.isLogin = true;
        this.isExisting = false;
        ({ outputCPResp: { customerID: this.nric } } = JSON.parse(sessionStorage.getItem('GuestInfo')));
        this.message = AppleWatchError.GUEST
      }
      if (sessionStorage.getItem("UserInfo")) {
        this.isLogin = true;
        this.isNotRedirection = false;
        ({ outputCPResp: { name: this.CustomerName } } = JSON.parse(sessionStorage.getItem('UserInfo')));
        this.CustomerNumber = this.formatNumber(localStorage.getItem("MyMsIsdn"));
      }
    }
  }
}