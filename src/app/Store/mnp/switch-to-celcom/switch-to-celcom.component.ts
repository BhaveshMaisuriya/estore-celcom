import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { AppWidgetComponent } from "../../../Model/app.widget.component";
import { BaseComponent } from "../../../base.component";
import { RedirectionService } from "../../../Service/redirection.service";
import { MnpService } from "../services/mnp.service";
import { DeviceDataService } from '../../../Service/devicedata.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { CartService } from '../../../Service/cart.service';
import * as ErrorConst from '../../../../constants/error.constants';
import { TypeofPurchaseService } from '../../../Service/type-of-purchase.service';
import { AppService } from "../../../Service/app.service";
import { UserService } from "../../../Service/user.service";
import { finalize } from "rxjs/operators";
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';

@Component({
  selector: "app-switch-to-celcom-component",
  templateUrl: "./switch-to-celcom.component.html",
  styleUrls: ["./switch-to-celcom.component.css"],
  providers: [RedirectionService, MnpService]
})
export class SwitchToCelcomComponent extends BaseComponent implements AppWidgetComponent, OnInit {
  @Input() data: any;
  @Input() entityData: any;
  @Input() isMoon: boolean;
  @Input() isProjectStar: boolean;
  @Input() forceWhiteBG: boolean;
  @Output() mnpEligibilityCheck = new EventEmitter();
  public ShowEligibilityBox = false;
  public LoginNumber: any = "";
  public CustomerRetrivalResponse: any = null;
  public BlackListResponse: any = null;
  public CheckEligibilityResponse: any = null;
  public ShowSwitchToCelcom = false;
  public userLoginInfo: any = null;
  public customerID: any = "";
  public customerIDType: any = "";
  public IDtypesToDisplay = [];
  public IsEligible = false;
  public IsTermsChecked = false;
  public EligibilityPopupType = "";
  public IsUserLoggedIn = false;
  public isEligible = false;
  public IsDisplayEligibilityPopup = false;
  public EligibilityCheckResult: any = null;
  public IsMNPRequest = false;
  public IDTypeTOBeUsedInEdit = false;
  public errorCheckingEligible = false;
  public errorNumber = "Please enter a valid number";
  public generalMessage = this.errorConst.SYS_DOWN_MSG;
  public showGeneralMessage = false;
  public notification = false;
  public success: any;
  public preLoadCustomerIDType = "";
  public customMsg: string;
  public customMessage = false;
  public maxlength = 11;
  public mnpEdit = false;
  public minlength: any;
  public invalidmobNumber = false;
  public validateNumAtZeroLength = false;
  public purchaseTypeTab: any;
  public mnpData = {
    action: "MNP",
    isEligible: false,
    portNumber: "",
    principleMobileNumber: "",
    customerData: ""
  };
  isChecked: any;
  loading: boolean;
  error = "";
  errorMessage: any = null;
  subscriber: Subscription;
  public isDisplayAgeEligibilityPopup;
  public IsMnpFlowFromDevice = false;
  mobileConnectUserShouldLogin = false;

  IsChecked: any;
  public eligibilityPopupType = { displayType: '', type: '' };
  mnpCustomer = {
    msisdn: "",
    customerID: "",
    customerIDType: "",
    portNumber: ""
  };
  constructor(
    private _mnpService: MnpService,
    private _deviceDataService: DeviceDataService,
    private _globalErrorHandler: GlobalErrorHandler,
    private _commonUtil: CommonUtilService,
    private _cartService: CartService,
    private topService: TypeofPurchaseService,
    private _service: AppService,
    private _userService: UserService,
  ) {
    super();
  }

  ngOnInit() {
    /* Added for enabling and disabling of the success errors and info popup's at the bottom */
    this.subscriber = this._deviceDataService.sharedBarNotificationBoolean$.subscribe(
      data => (this.notification = data)
    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.errorCheckingEligible = data)
    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.IsMnpFlowFromDevice = data)
    );
    this.subscriber = this._deviceDataService.sharedPurchaseTypeTab$.subscribe(
      data => this.purchaseTypeTab = data
    );
    this.Init();
  }

  public Init() {
    this.IDtypesToDisplay = this._mnpService.getCustomerIDTypes();
    if (this.IDtypesToDisplay) {
      this.mnpCustomer.customerIDType = (this.IDtypesToDisplay[0].id).toString();
    }
    this.ShowSwitchToCelcom = true;
    if (window && localStorage && sessionStorage) {
      if (localStorage.getItem("MyMsIsdn") && sessionStorage.getItem("UserInfo") && sessionStorage.getItem("UserToken")) {
        this.userLoginInfo = JSON.parse(sessionStorage.getItem("UserInfo")).outputCPResp;
        if (this.userLoginInfo && this.userLoginInfo.customerIDType && this.userLoginInfo.customerIDType === 'Passport') {
          this.IsMnpFlowFromDevice = true;
          this.errorMessage = {};
          this.errorMessage.content =
            "Sorry, we are unable to process passport number for the time being." +
            " For assistance, please call our Customer Service hotline at 1111 from your mobile.";
          return;
        } else if (this.userLoginInfo && this.userLoginInfo.customerIDType && this.userLoginInfo.customerIDType !== 'New NRIC') {
          this.IsMnpFlowFromDevice = true;
          this.errorMessage = {};
          this.errorMessage.content =
            "Sorry, we are unable to process IDs other than New NRIC for the time being." +
            " For assistance, please call our Customer Service hotline at 1111 from your mobile.";
          return;
        }
      }
      if (localStorage.getItem("MNP-PRE-SELECT") === "YES") {
        this.mnpCustomer = JSON.parse(localStorage.getItem("MNP-CUSTOMER"));
        if (localStorage.getItem("checkToShowEditEligibilityBox") === "YES" &&
          localStorage.getItem("MNPCustomerData") && localStorage.getItem("MNPRedirectionToLoginPage") &&
          localStorage.getItem("MNPCustomerData") != null) {
          this.ShowEligibilityBox = true;
          this.ShowSwitchToCelcom = false;
          this.isEligible = true;
          // this.notification = false;
          this.errorCheckingEligible = false;
          this.data = JSON.parse(localStorage.getItem("MNPCustomerData"));
          this.mnpCustomer.msisdn = this.data.principleMobileNumber;
          this.mnpEligibilityCheck.emit(this.data);
          localStorage.removeItem("MNPRedirectionToLoginPage");
        } else {
          if (localStorage.getItem("MNP-PRE-SELECT") === "YES" && localStorage.getItem("MNP-EDIT")) {
            this.mnpCustomer.msisdn = this.mnpCustomer.portNumber;
          }
          if (sessionStorage.getItem("UserInfo")) {
            if (localStorage && localStorage.getItem("errorAddToCart")) {
              if (localStorage.getItem("errorAddToCart") === "true") {
                const errorAddToCartMessage = localStorage.getItem("errorAddToCartMessage");
                this.IsMnpFlowFromDevice = true;
                this.errorMessage = {};
                // this.errorMessage.content = "Note: You can only add another item after you have " +
                //  "checked out with your existing items in the cart.";
                this.errorMessage.content = errorAddToCartMessage;
                this.errorMessage.color = "7D7D7D";
                localStorage.removeItem("errorAddToCart");
                localStorage.removeItem("errorAddToCartMessage");
              }
            }
            this.IsUserLoggedIn = true;
            this.userLoginInfo = JSON.parse(sessionStorage.getItem("UserInfo")).outputCPResp;
            this.mnpCustomer.customerID = this.userLoginInfo.customerID;
            if (this.userLoginInfo.customerIDType) {
              this.mnpCustomer.customerIDType = this._mnpService.getCustomerIdTypeID(this.userLoginInfo.customerIDType).id;
            }
          } else if (sessionStorage && sessionStorage.getItem("GuestInfo") &&
            JSON.parse(sessionStorage.getItem("GuestInfo")).blacklistChkRequest) {
            this.userLoginInfo = JSON.parse(sessionStorage.getItem("GuestInfo")).blacklistChkRequest;
            this.mnpCustomer.customerID = this.userLoginInfo.customerIDNo;
            this.mnpCustomer.customerIDType = this.userLoginInfo.customerIDType;
          } else if (sessionStorage && sessionStorage.getItem("GuestInfo") &&
            JSON.parse(sessionStorage.getItem("GuestInfo")).outputCPResp) {
            this.userLoginInfo = JSON.parse(sessionStorage.getItem("GuestInfo")).outputCPResp;
            this.mnpCustomer.customerID = this.userLoginInfo.customerID;
            if (this.userLoginInfo.customerIDType) {
              this.mnpCustomer.customerIDType = this._mnpService.getCustomerIdTypeID(this.userLoginInfo.customerIDType).id;
            }
          } else {
            this.ShowEligibilityBox = false;
            this.isEligible = false;
          }
        }
      } else if (sessionStorage.getItem("UserInfo")) {
        this.IsUserLoggedIn = true;
        this.userLoginInfo = JSON.parse(sessionStorage.getItem("UserInfo")).outputCPResp;
        this.mnpCustomer.customerID = this.userLoginInfo.customerID;
        if (this.userLoginInfo.customerIDType) {
          this.mnpCustomer.customerIDType = this._mnpService.getCustomerIdTypeID(this.userLoginInfo.customerIDType).id;
        }
      } else if (sessionStorage.getItem("GuestInfo") && JSON.parse(sessionStorage.getItem("GuestInfo")).blacklistChkRequest) {
        this.userLoginInfo = JSON.parse(sessionStorage.getItem("GuestInfo")).blacklistChkRequest;
        this.mnpCustomer.customerID = this.userLoginInfo.customerIDNo;
        this.mnpCustomer.customerIDType = this.userLoginInfo.customerIDType;
      } else if (sessionStorage && sessionStorage.getItem("GuestInfo") && JSON.parse(sessionStorage.getItem("GuestInfo")).outputCPResp) {
        this.userLoginInfo = JSON.parse(sessionStorage.getItem("GuestInfo")).outputCPResp;
        this.mnpCustomer.customerID = this.userLoginInfo.customerID;
        if (this.userLoginInfo.customerIDType) {
          this.mnpCustomer.customerIDType = this._mnpService.getCustomerIdTypeID(this.userLoginInfo.customerIDType).id;
        }
      } else {
        // localStorage.removeItem("MNP-EDIT");
      }
    }
    if (this.errorMessage?.content) {
      this._globalErrorHandler.errorObjectConvert(this.errorMessage.content);
    }
    this.isLoggedIn();
  }

  isLoggedIn() {
    let isLoggedIn = false;
    if (typeof window !== 'undefined' && sessionStorage && (sessionStorage.getItem("UserInfo") || sessionStorage.getItem("GuestInfo"))) {
      isLoggedIn = true;
    }
    return isLoggedIn;
  }

  public checkMnpEligibility() {
    if (this.IsTermsChecked && this.mnpCustomer.customerIDType != null &&
      this.mnpCustomer.customerID != null && this.mnpCustomer.customerID !== "") {
      this.ageValidation();
    } else {
      this.errorCheckingEligible = true;
      this.errorMessage = {};
      this.errorMessage.content = "Please fill in all the details and accept the terms.";
      this.errorMessage.color = "";
    }
    if (this.errorMessage?.content) {
      this._globalErrorHandler.errorObjectConvert(this.errorMessage.content);
    }
  }

  public ageValidation() {
    const customerDob = this._commonUtil.capturingDOBFromNRIC(this.mnpCustomer.customerID.toString()).slice(0, 8);
    const customerYear = Number(customerDob.slice(0, 4));
    const customerMonth = Number(customerDob.slice(4, 6));
    const customerDate = Number(customerDob.slice(6, 8));
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDate = new Date().getDate();
    if (localStorage && localStorage.getItem("SelectedPlanDetails")) {
      const selectedPlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
      const typeOfPlan = selectedPlanDetails.is_xpax;
      if (selectedPlanDetails.lowerAgeLimit) {
        selectedPlanDetails.lower_age_limit = selectedPlanDetails.lowerAgeLimit;
      }
      if (selectedPlanDetails.UpperAgeLimit) {
        selectedPlanDetails.upper_age_limit = selectedPlanDetails.UpperAgeLimit;
      }
      const lowerAgeLimit = Number(selectedPlanDetails.lower_age_limit);
      const upperAgeLimit = Number(selectedPlanDetails.upper_age_limit);
      if ((currentYear - customerYear) <= lowerAgeLimit) {
        if ((currentYear - customerYear) === lowerAgeLimit) {
          if ((currentMonth - customerMonth) < 0) {
            if (typeOfPlan === "false" || typeOfPlan === false) {
              this.isDisplayAgeEligibilityPopup = true;
              this.eligibilityPopupType.displayType = 'LOWER_AGE';
              this.eligibilityPopupType.type = 'first';
              this.notification = false;
              return;
            }
            if (typeOfPlan === "true" || typeOfPlan === true) {
              this.isDisplayAgeEligibilityPopup = true;
              this.eligibilityPopupType.displayType = 'LOWER_AGE';
              this.eligibilityPopupType.type = 'xpax';
              this.notification = false;
              return;
            }
          } else if ((currentMonth - customerMonth) === 0) {
            if ((currentDate - customerDate) < 0) {
              if (typeOfPlan === "false" || typeOfPlan === false) {
                this.isDisplayAgeEligibilityPopup = true;
                this.eligibilityPopupType.displayType = 'LOWER_AGE';
                this.eligibilityPopupType.type = 'first';
                this.notification = false;
                return;
              }
              if (typeOfPlan === "true" || typeOfPlan === true) {
                this.isDisplayAgeEligibilityPopup = true;
                this.eligibilityPopupType.displayType = 'LOWER_AGE';
                this.eligibilityPopupType.type = 'xpax';
                this.notification = false;
                return;
              }
            } else {
              this.noOfPostpaidLine();
            }
          } else {
            this.noOfPostpaidLine();
          }
        } else {
          if (typeOfPlan === "false" || typeOfPlan === false) {
            this.isDisplayAgeEligibilityPopup = true;
            this.eligibilityPopupType.displayType = 'LOWER_AGE';
            this.eligibilityPopupType.type = 'first';
            this.notification = false;
            return;
          }
          if (typeOfPlan === "true" || typeOfPlan === true) {
            this.isDisplayAgeEligibilityPopup = true;
            this.eligibilityPopupType.displayType = 'LOWER_AGE';
            this.eligibilityPopupType.type = 'xpax';
            this.notification = false;
            return;
          }
        }
      } else if ((typeOfPlan === "true" || typeOfPlan === true) &&
        (currentYear - customerDob) > upperAgeLimit && (currentYear - customerDob) < lowerAgeLimit) {
        this.isDisplayAgeEligibilityPopup = true;
        this.eligibilityPopupType.displayType = 'UPPER_AGE';
        this.eligibilityPopupType.type = 'xpax';
        this.notification = false;
        return;
      } else {
        this.noOfPostpaidLine();
      }
    }
  }


  public noOfPostpaidLine() {
    let isConnectionLimitExceeded: any = false;
    if (localStorage && localStorage.getItem("MyMsIsdn") &&
      sessionStorage.getItem("UserInfo") || sessionStorage && sessionStorage.getItem("USER_TYPE")) {
      if (localStorage && localStorage.getItem("MyMsIsdn") && sessionStorage.getItem("UserInfo")) {
        const outputCPResp = JSON.parse(sessionStorage.getItem("UserInfo")).outputCPResp;
        isConnectionLimitExceeded = this._cartService.checkNumberOfLinesUserHas(outputCPResp);
      }
      if (sessionStorage && sessionStorage.getItem("USER_TYPE") && localStorage &&
        ['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE")) && sessionStorage.getItem("GuestInfo")) {
        const outputCPResp = JSON.parse(sessionStorage.getItem("GuestInfo")).outputCPResp;
        isConnectionLimitExceeded = this._cartService.checkNumberOfLinesUserHas(outputCPResp);
      }
      if (isConnectionLimitExceeded) {
        const eligibilityInfo = {
          isEligibleByAge: false,
          displayType: 'LIMIT_EXCEEDED',
          type: 'xpax'
        };
        this.EligibilityPopupType = JSON.parse(JSON.stringify(eligibilityInfo));
        this.IsDisplayEligibilityPopup = true;
      } else {
        this.IsDisplayEligibilityPopup = false;
        this.callEligibility();
      }
    } else {
      this.IsDisplayEligibilityPopup = false;
      this.callEligibility();
    }
  }

  // Below function written 2 time??
  public onContinueEligibilityCheck() {
    this.isDisplayAgeEligibilityPopup = false;
  }
  OnContinueEligibilityCheck(data: any) {
    this.IsDisplayEligibilityPopup = false;
    // this.disableAddToCart = true;
  }

  public MobileNumber(ev?) {
    this.showGeneralMessage = false;
    this.errorNumber = "Please enter a valid number";
    if (this.mnpCustomer.portNumber && this.mnpCustomer.portNumber !== "") {
      const resultData = this.mnpCustomer.portNumber.toString().charAt(0);
      this.mnpCustomer.portNumber = (resultData !== '6') ? ("60" + this.mnpCustomer.portNumber).substring(0, 3) === "600" ? "6" + this.mnpCustomer.portNumber : "60" + this.mnpCustomer.portNumber : this.mnpCustomer.portNumber;
      this.invalidmobNumber = false;
    }
    this.invalidmobNumber = (this.mnpCustomer.portNumber && this.mnpCustomer.portNumber.toString().length < 11 && this.mnpCustomer.portNumber.toString().length !== 0) && ev && ev.key !== "Tab";
  }

  public callEligibility() {
    this.loading = true;
    let planSku = "";
    let isDevice = 0;
    let csAgent = 0;
    if (this.entityData && this.entityData.basic_details && this.entityData.basic_details.order_category === "HP") {
      isDevice = 1;
    }
    const resultData = this.mnpCustomer.portNumber.toString().charAt(0);
    // Get the selected plan SKU.
    if (localStorage && localStorage.getItem("SelectedPlanDetails")) {
      planSku = JSON.parse(localStorage.getItem("SelectedPlanDetails")).sku;
    }
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("AgentInfo")) {
      csAgent = 1;
    }
    if (resultData === '6') {
      this.mnpCustomer.portNumber = this.mnpCustomer.portNumber.toString().substr(1);
    }
    const idTypeReq = this.mnpCustomer.customerIDType ? "&id_type=" + this.mnpCustomer.customerIDType : "";
    const planSkuReq = planSku ? "&sku=" + planSku : "";
    const requestParams = "msisdn_number=" + this.mnpCustomer.portNumber + "&id_number="
      + this.mnpCustomer.customerID + idTypeReq + planSkuReq + "&bundle=" + isDevice + "&is_cs_agent=" + csAgent;
    this._mnpService.eligibilityCheck(requestParams).subscribe(
      (response: any) => {
        this.topService.updateMNPResponse(response);
        if (this.purchaseTypeTab !== "GetNewNumber" && this.purchaseTypeTab !== "SameNumber") {
          if (response[0].status) {
            let isMobileConnectUser;
            try {
              isMobileConnectUser = response[0].response.mobile_connect_user;
            } catch (_error) {

            }
            if (!this._userService.isCustomer()) {
              if (!isMobileConnectUser) {
                this.doGuestLogin(this.mnpCustomer.customerID);
              } else {
                this._deviceDataService.publishAddToCartDisabling(true);
                this.mobileConnectUserShouldLogin = true;
              }
            } else {
              this._deviceDataService.publishAddToCartDisabling(false);
            }
            if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("AgentInfo") &&
              (!response[0].response || response[0].response === [] || isMobileConnectUser !== true) &&
              response[0].status!==true) {
              this.isDisplayAgeEligibilityPopup = true;
              this.eligibilityPopupType.displayType = 'guestUser';
            } else {
              this.isEligible = true;
              this.ShowEligibilityBox = true;
              this.ShowSwitchToCelcom = false;
              // this.notification = true;
              this.errorCheckingEligible = false;
              this._deviceDataService.publishDisclaimerAgree(this.errorCheckingEligible);
              this.success = "You are eligible for the porting";
              this.mnpData.isEligible = true;
              this.mnpData.portNumber = this.mnpCustomer.portNumber;
              if (response[0] && response[0].response && typeof (isMobileConnectUser) !== 'undefined') {
                this.mnpData.customerData = isMobileConnectUser;
              }
              this.mnpCustomer.msisdn = this.mnpData.principleMobileNumber;
              this.mnpEligibilityCheck.emit(this.mnpData);
              if (window && localStorage) {
                localStorage.setItem("MNP-PRE-SELECT", 'YES');
                localStorage.setItem('MNP-CUSTOMER', JSON.stringify(this.mnpCustomer));
                localStorage.setItem("Eligible", JSON.stringify(this.mnpData.isEligible));
                localStorage.setItem("checkToShowEditEligibilityBox", "YES");
                localStorage.setItem("MNPCustomerData", JSON.stringify(this.mnpData));
                localStorage.setItem('MNP-FLOW', 'YES');
              }
              if (localStorage && localStorage.getItem('isPreOrder') && window && window.location.href.indexOf("device-detail") > -1) {
                this.mnpEdit = false;
                this._deviceDataService.publishMnpEdited(this.mnpEdit);
              }
              this._deviceDataService.publishPhoneNo(this.mnpData.portNumber);
              this.topService.selectMobileNumber(this.mnpData.portNumber);
              this.loading = false;
            }
          } else {
            if (
              response[0] &&
              response[0].placement == "nric" &&
              response[0].message !== "Uh OH. Your ID is barred by other Telcos." // ? Internal Blacklist
            ) {
              this.customMessage = true;
              this.customMsg = response[0].message ? response[0].message : this.errorConst.SYS_DOWN_MSG;
            } else if (response[0] && response[0].placement == "msisdn") {
              this.invalidmobNumber = true;
              this.errorNumber = response[0].message ? response[0].message : this.errorConst.SYS_DOWN_MSG;
            } else {
              this.showGeneralMessage = true;
              this.generalMessage = (response[0] && response[0].message) ? response[0].message : this.errorConst.SYS_DOWN_MSG;
            }
            // this.errorCheckingEligible = true;
            this.isChecked = false;
            this._deviceDataService.publishDisclaimerAgree(this.errorCheckingEligible);
            // this.notification = false;
            // this.errorMessage = {};
            // this.errorMessage.content = response[0].message;
            // this.errorMessage.color = "";
            this._mnpService.clearMnpLocalStorages();
            this.mnpData.isEligible = false;
            this.mnpData.portNumber = this.mnpCustomer.portNumber;
            this.mnpData.principleMobileNumber = "";
            this.mnpEligibilityCheck.emit(this.mnpData);
            if (window && localStorage) {
              localStorage.setItem("Eligible", JSON.stringify(this.mnpData.isEligible));
            }
          }
          this.loading = false;
        }
      },
      (error: any) => {
        this.errorForEligiblity();
      }
    );
  }

  doGuestLogin(customerIDNo){
    const request = {
      "login_data": {
        "user": "guest",
        "id_type": "1",
        "id_number": customerIDNo
      }
    };
    const url = "/rest/V1/login";
    const createActivityReq = JSON.stringify(request);
    this.loading = true;
    this._service.postROI(url, createActivityReq)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe(
        (response: any) => {
          this.loading = false;
          // Set show login attempts error false.
          if (response && response[0].status) {
            if (response[0].mobile_connect_user === false) {
                this._userService.doGuestLogin(response, customerIDNo);
                this._deviceDataService.publishLoggerInUserName('GUEST');
            }
          } else {
            this.errorCheckingEligible = true;
            this.errorMessage = {
              content: response[0]?.message || this.errorConst.SYS_DOWN_MSG
            }
            this.goToSwitchTOCelcom();
            this._deviceDataService.publishAddToCartDisabling(false);
          }
        },
        (err) => {
          //
          this.errorCheckingEligible = true;
          this.errorMessage = {
            content: err?.error[0]?.message || err?.error?.message || this.errorConst.SYS_DOWN_MSG
          }
          this.goToSwitchTOCelcom();
          this._deviceDataService.publishAddToCartDisabling(false);
        }
      );
  }

  onSuccessfulLogin(success) {
    if (success) {
      this.mobileConnectUserShouldLogin = false;
    }
  }

  errorForEligiblity() {
    this.isChecked = false;
    this.showGeneralMessage = true;
    this.generalMessage = this.errorConst.SYS_DOWN_MSG;
    // this.errorMessage = {
    //   title: 'Uh Oh!',
    //   content: ErrorConst.SYS_DOWN_MSG,
    //   button: 'Got it!',
    // };
    // this.errorCheckingEligible = true;
    this._deviceDataService.publishDisclaimerAgree(this.errorCheckingEligible);
    // this.notification = false;
    this._mnpService.clearMnpLocalStorages();
    this.mnpData.isEligible = false;
    this.mnpData.portNumber = this.mnpCustomer.portNumber;
    this.mnpData.principleMobileNumber = "";
    this.mnpEligibilityCheck.emit(this.mnpData);
    this.loading = false;
    if (window && localStorage) {
      localStorage.setItem("Eligible", JSON.stringify(this.mnpData.isEligible));
    }
  }
  restrictOnlyNum = (ev, elem) => {
    if (elem === 'contactMobileNum') {
      return this._commonUtil.restrictOnlyNum(ev, "contactMobileNum", this.mnpCustomer.portNumber ? this.mnpCustomer.portNumber.toString() : "");
    } else {
      return this._commonUtil.restrictOnlyNum(ev, "nric", this.mnpCustomer.customerID ? this.mnpCustomer.customerID.toString() : "");
    }
  }

  validationForIdType(identity_type, identity_value) {
    const { error, message } = this._commonUtil.validationForIdType(identity_type, identity_value);
    if (error) {
      this.customMessage = error;
      this.customMsg = message;
      return this.customMsg;
    } else {
      this.customMessage = error;
      return 0;
    }
  }

  public goToSwitchTOCelcom() {
    this.isChecked = false;
    this.ShowEligibilityBox = false;
    this.ShowSwitchToCelcom = true;
    this.IDTypeTOBeUsedInEdit = true;
    this.mnpEdit = true;
    this._deviceDataService.publishAddToCartDisabling(true);
    this._deviceDataService.publishMnpEdited(this.mnpEdit);
    if (localStorage) {
      localStorage.removeItem("checkToShowEditEligibilityBox");
      localStorage.removeItem("MNPCustomerData");
    }
    this.topService.updateMNPResponse(null);
  }

  public termsAccepted() {
    this.showGeneralMessage = false;
    this.IsTermsChecked = true;
    this.IsEligible = true;
  }

  isDevicePage(): boolean {
    if (this.data && this.data.basic_details) {
      return true;
    }
    return false;
  }

}
