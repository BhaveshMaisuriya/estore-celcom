import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { TypeofPurchaseService } from "./typeof-purchase.service";
import { DeviceDataService } from '../../../Service/devicedata.service';
import { LoginService } from '../../../../app/Store/login/service/login.service';
import { Subscription } from 'rxjs';
import { ACTION_TYPE, TYPE_OF_PURCHASE } from '../../../shared/constants/application.constants';
import { DeviceDetailsNumberService } from '../../../Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service';
import { msisdnHelper } from '../../../shared/utilities/helper.ultility';
import { UserService } from '../../../Service/user.service';
import { TypeofPurchaseService as GlobalTypeofPurchaseService } from '../../../Service/type-of-purchase.service';

@Component({
  selector: 'app-bb-typeof-purchase',
  templateUrl: './bb-typeof-purchase.component.html',
  styleUrls: ['./bb-typeof-purchase.component.css'],
  providers: [TypeofPurchaseService, LoginService]
})
export class BbTypeofPurchaseComponent extends BaseComponent implements OnInit {
  @Input() data;
  notes;
  homeWirelessData: any = {};
  homeWirelessPopUp;
  nricReset = false;
  preSelectNewReg = false;
  isNewRegEligible: any = null;
  newRegRreservationId: any;
  loading: boolean;
  enableNRICAuthentication = false;
  enableMCAuthentication = false;
  enableMCotp = false;
  msisdnOtp = null;
  nric = null;
  hwNoteDataCMS = "";
  public pageType: any = 'hwInLine';
  public showErrorToaster = false;
  public errorToasterData = {};
  private subscriber: Subscription;
  constructor(
    public _deviceDataService: DeviceDataService,
    private _typeOfPurchaseService: TypeofPurchaseService,
    private devicedetailNumberservice: DeviceDetailsNumberService,
    public _userService: UserService,
    private topService: GlobalTypeofPurchaseService,
  ) {
    super();
  }

  ngOnInit() {
    this.hwNoteDataCMS = this.getHWNoteDataCMS();
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => {
      this.showErrorToaster = data;
      if (!this.showErrorToaster) {
        this.preSelectNewReg = false;
        this._deviceDataService.publishNumberType('');
      }
    });
    this.notes = this._typeOfPurchaseService.notes;
    if (typeof window !== 'undefined' && localStorage && sessionStorage && sessionStorage.getItem("UserToken")) {
      if (localStorage.getItem("homeWirelessData")) {
        this.preSelection();
      } else if (['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE"))) {
        this.loading = true;
        this.loggedInUser("loggedInUser", "guest");
      } else {
        this.loading = true;
        this.loggedInUser("loggedInUser", "MC");
      }
    } else {
      this.enableNRICAuthentication = true;
    }
  }
  onSwitchingPurchaseType(typeOfPurchase) {
    this.loading = true;
    this._deviceDataService.publishUpdateStep(3);
    if (this.preSelectNewReg === false) {
      if (typeOfPurchase === "newReg") {
          const isUserLoggedIn = this._typeOfPurchaseService.getUserLoggedInInfo();
          if (isUserLoggedIn === undefined) {
            this._typeOfPurchaseService.anonymousUser();
          } else if (isUserLoggedIn !== null) {
            this.preSelectNewReg = true;
            this.loggedInUser("loggedInUser");
          }
      }
    }
  }
  preSelection() {
    if (localStorage && localStorage.getItem("homeWirelessData")) {
      this.loading = true;
      this.preSelectNewReg = true;
      this.homeWirelessData = JSON.parse(localStorage.getItem("homeWirelessData"));
      this.loggedInUser(this.homeWirelessData.selectionType);
    }
  }
  public loggedInUser(loggedInType, userType?) {
    this._deviceDataService.publishNumberType("NewNumber");
    switch (loggedInType) {
      case "loggedInUser":
      case "beforeLoginSelectionRetention":
        this.getNewRegNumber(false, userType);
        break;
      case "edit":
        this.setPreselectionNumberData(this.homeWirelessData);
        break;
    }
  }
  getNewRegNumber(mock: boolean, userType) {
    if (!mock) {
      this.nricReset = true;
      const reqBody = this._typeOfPurchaseService.getNewRegRequestBody(userType);
      this._typeOfPurchaseService.postNewReg(reqBody).subscribe(
        (res: any) => {
          if(res[0].status === true && this._userService.isGuest()) {
            this.callAutoBillingCheck();
          }
          this.responseValidation(res[0]);
        },
        (err: any) => {
          this.showError();
        }
      );
    } else {
      this.responseValidation(this._typeOfPurchaseService.mockBbGetNewNumber);
    }
  }
  responseValidation(resp) {
    let disableAddToCart = true;
    if (resp.status === true && resp.eligible === true) {
      this._deviceDataService.publishPhoneNo(resp.mobile_number);
      this._deviceDataService.publishNumberReservationId(resp.reservationId);
      if (resp.validated_id) {
        if (typeof window !== 'undefined' && sessionStorage) {
          sessionStorage.setItem("hw_validated_id", resp.validated_id);
        }
      }
      this._deviceDataService.publishHwValidatedId(resp.validated_id);
      this.isNewRegEligible = true;
      this.loading = false;
      disableAddToCart = false;
    } else if ((resp.status === true && resp.eligible === false) || resp.status === false || resp === false) {
      this.showErrorToaster = true;
      if (resp.message) {
        this.errorToasterData = {
          content: resp.message
        };
      } else {
        this.errorToasterData = {
          content: this.errorConst.SYS_DOWN_MSG
        };
      }
      this.loading = false;
      disableAddToCart = true;
    }
    this.topService.updateBroadbandEligibility(this.isNewRegEligible);
    this._deviceDataService.publishAddToCartDisabling(disableAddToCart);
  }
  setPreselectionNumberData(numberData) {
    this.loading = false;
    this.isNewRegEligible = false;
    if (numberData.newReg) {
      this.isNewRegEligible = true;
    }
    this._deviceDataService.publishPhoneNo(numberData.newReg);
    this._deviceDataService.publishNumberReservationId(numberData.numberReservationId);
  }
  onCallResetMsisdnOtp(e) {
    this.enableMCAuthentication = false;
    this.enableMCotp = false;
  }
  onCallResetOtp(e) {
    this.enableMCotp = false;
  }
  onCallIsMCUser(e) {
    // If existing user.
    if (e === "apiFailed") {
      return;
    }
    if (e.mcUser) {
      this.enableMCAuthentication = true;
      this.nric = e.nric;
    } else { // if guest user,
      this.loading = true;
      // Call this for HW eligibility.
      this.loggedInUser("loggedInUser", "guest");
    }
  }
  onSentOtp(e) {
    // If otp Sent.
    if (e) {
      this.enableMCotp = e.status;
      this.msisdnOtp = e.msisdn;
    }
  }
  onValidOtp(e) {
    // If otp verfied true.
    if (e) {
      // Call this for HW eligibility.
      this.enableMCotp = false;
      this.enableMCAuthentication = false;
      this.loggedInUser("loggedInUser", "MC");
    }
  }
  callAutoBillingCheck() {
    let sku:string = "";
    let msisdn:string = "";
    if(localStorage && localStorage.getItem("BroadbandSKU") && localStorage.getItem("BroadbandSKU") != null) {
      sku = localStorage.getItem("BroadbandSKU");
    }
    if(localStorage && localStorage.getItem("MyMsIsdn")) {
      msisdn = localStorage.getItem("MyMsIsdn");
    }
    msisdn = msisdnHelper(msisdn);
    this.devicedetailNumberservice.AutoBillingCheck({
      sku,
      typeOfPurchase: TYPE_OF_PURCHASE.NEW_LINE,
      actionType:ACTION_TYPE.BROADBAND_BUNDLE_NEW_REG,
      msisdn
    }).subscribe(resp => {
      this.topService.updateAutobilling(resp);
    });
  }
  getHWNoteDataCMS(): string {
    if (this.data && this.data.notes !== undefined) {
      return this.data.notes;
    }
  }
  showError() {
    this.loading = false;
    this.showErrorToaster = true;
    this.errorToasterData = {
    content: this.errorConst.SYS_DOWN_MSG
    };
    this._deviceDataService.publishAddToCartDisabling(true);
  }
}

