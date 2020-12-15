import { Component, OnInit, Input, OnDestroy, AfterViewInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import { Observable ,  Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "../../../base.component";
import { AppService } from "../../../Service/app.service";
import { GuestCheckoutService } from "../services/guest-checkout.service";
import { CartService } from "../../../Service/cart.service";
import * as FormConst from "../../../../constants/form.constants";
import "lodash";
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { DeviceDataService } from '../../../Service/devicedata.service';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from '../../../Service/home.service';

import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { loadavg } from "os";
import { UserService } from "../../../Service/user.service";
import { updateAnalytics } from '../../../shared/utilities/helper.ultility';
import { finalize } from 'rxjs/operators';
import {
  DEFAULT_SIEBEL_ADDRESS,
  FORM_REQUIRED_ERROR,
  FORM_VALIDATION_ERROR,
  FORM_VALIDATION_PATTERN
} from '../../../shared/constants/form.constants';
import { IEKycSessionStorageData, IMNPPrepaidData } from "../../eKyc/e-kyc.model";
import {
  CART_MINE_DEFAULT_EMAIL,
  E_KYC_DETAILS,
  XPAX_MNP_DATA
} from "../../../shared/constants/session-storage.constants";
declare var _: any;

@Component({
  selector: "app-personal-details",
  templateUrl: "./personal-details.component.html",
  styleUrls: ["./personal-details.component.css"],
  providers: [CartService]
})
export class PersonalDetailsComponent extends BaseComponent
  implements OnInit, OnDestroy, AfterViewInit {
  customerIDTypes = [];
  states: any;
  modelLabels: Object;
  contactCreateResponse: any;
  customerAccountCreateResponse: any;
  personalForm: any;
  userToken: any;
  customerIdNo: any;
  cartDetails: any;
  invalidmobNumber = false;
  invalidAlternateMsisdn = false;
  mobNum: any = "";
  altMobNum: any = "";
  unitInvalid = false;
  DOB: string;
  DOBdate: string;
  DOByear: string;
  DOBmonth: string;
  customerIdTypeValue: string = 'New NRIC';
  private subscriber: Subscription;
  public sessionInvalid = false;
  public formSubmitError = false;
  formSubmitErrorData: any;
  addressline1: any;
  addressline1Delivery: any;
  addressline2: any;
  addressline2Delivery: any;
  unitHouseNumber: any;
  unitHouseNumberDelivery: any;
  cartItemAddedTime: number;
  componentLoadedTime: any;
  reserveTimeOut = false;
  cartItemUnreservation: any;
  IsDisplayIdlePopup = false;
  cityTxtBoxMaxLenth = 30;
  addressUnittxtBoxMaxLength = 15;
  homeStreetTxtBoxMaxLength = 100;
  postCode: any = "";
  postCodeDelivery: any = "";
  isPostalInValid = false;
  isPostalInValidDelivery = false;
  userEmail: '';
  shipType = "";
  showBilling = undefined;
  showDelivery = false;
  formDataValue = {
    salutation: '',
    name: '',
    gender: '',
    preferredContactMethod: '',
    buildingName: '',
    streetAddressLine1: '',
    streetAddressLine2: '',
    postalCode: '',
    city: '',
    state: null,
  };
  formPattern = {
    name: FORM_VALIDATION_PATTERN.name,
    address: FORM_VALIDATION_PATTERN.address,
    addressLine: FORM_VALIDATION_PATTERN.addressLine
  };
  formHelperText = {
    name: {
      invalid: FORM_VALIDATION_ERROR.name,
      req: FORM_REQUIRED_ERROR.name
    },
    addressLine: {
      invalid: FORM_VALIDATION_ERROR.addressLine,
      req: FORM_REQUIRED_ERROR.addressLine
    }
  };

  flags = {
    isFormDisabled: false,
    isBillingAddressDisabled: false
  };

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _service: AppService,
    private _deviceDataService: DeviceDataService,
    private _guestService: GuestCheckoutService,
    private cartService: CartService,
    @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _homeService: HomeService,
    private cookieService: CookieService,
    private _commonUtilService: CommonUtilService,
    private _userService: UserService,
  ) {
    super();
    this.modelLabels = FormConst;
    this.customerIDTypes = _guestService.getCustomerIDTypes();
  }

  isEnterprise() {
    return this._userService.isUserEnterprise();
  }

  getUserInfo() {
    const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    const guestInfo = JSON.parse(sessionStorage.getItem("GuestInfo"));
    return {
      userInfo,
      guestInfo,
    };
  }

  retrieveUserInfoEmail(){
    const {userInfo, guestInfo} = this.getUserInfo();
    if (this.isEnterprise()) {
      return guestInfo?.outputCPResp?.email;
    }
    if (userInfo && userInfo['outputCPResp']) {
      return userInfo['outputCPResp']['email'];
    }
    return '';
  }

  retrieveUserInfoName(){
    const {userInfo, guestInfo} = this.getUserInfo();
    if (this.isEnterprise()) {
      return guestInfo?.outputCPResp?.name;
    }
    if (userInfo && userInfo['outputCPResp']) {
      return userInfo['outputCPResp']['name'];
    }
    return '';
  }

  chooseAddress(type) {
    if(type === "billing") {
      this.showBilling = true;
    } else {
      this.showBilling = false;
    }
  }

  ngOnInit() {
    // this.shipType = "billing";
    // this.chooseAddress(this.shipType);
    this.componentLoadedTime = Date.now();
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.sessionInvalid = data));
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.formSubmitError = data));

    const apiUrl = "/rest/V1/directory/countries/MY";
    this._service.getEstoreData(apiUrl.trim())
      .pipe(
        finalize(() => {
          this.cartMineDetails(true, false);
        })
      )
      .subscribe((response: any) => {
        this.states = response;
        this.setBillingAddressIfAny();
        if (typeof window !== "undefined") {
          if (sessionStorage && sessionStorage.getItem("GuestInfo")) {
            this.customerIdNo = (JSON.parse(sessionStorage.getItem("GuestInfo"))).blacklistChkRequest.customerIDNo;
          }
        }
      });
    if (this.cookieService.check('adaRemainingDays')) {
      this.addAffiliateScriptToHead();
    }
    this.SetDateOfBirthDetails();
    // Get item added time from cart.
    if (this.isEnterprise()) {
      this.userEmail = this.retrieveUserInfoEmail();
      this.formDataValue.name = this.retrieveUserInfoName();
    }
  }

  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
    this._estoreAnalyticsService.SetCategoryTwoForAdobeDataLayer(this._renderer);
  }
/**
* Formation of affiliate script and attaching to body.
*/
public addAffiliateScriptToHead() {
  // Ada pixel.
  const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
    // ADA facebook pixel.
    if (adaRemainingDays.name === "ADAFB") {
      const adaObj = [];
      adaObj.push({
        type: 'header_script_block',
        value: `!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
         fbq('init', '222287968473810');
         fbq('track', 'InitiateCheckout');`
      });
      adaObj.push({
        type: 'header_noscript_block',
        value: `<img height="1" width="1" src="https://www.facebook.com/tr?id=222287968473810&ev=PageView&noscript=1"/>`
      });
      this._homeService.ManageConfigurableScripts(adaObj);
  }
}
  scrollToError(element) {
    const offset = 180;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element ? element.getBoundingClientRect().top : 0;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}
  onSubmit(form) {
    if (form.form.valid) {
      console.log('form submitted');
    } else {
      this.validateAllFormFields(form.form); //{7}
      setTimeout(() => {
        if (document.getElementsByClassName('error').length > 0) {
          this.scrollToError(document.getElementsByClassName('error')[0]);
          return;
        }
      }, 0);

    }
    this.reserveTimeOut = this.cartService.deviceReservervationTimeout(this.componentLoadedTime, this.cartItemAddedTime);
    // For preorder device & normal bundle and device reservation time out.
    if (this.reserveTimeOut) {
      this.cartItemUnreservation = {};
      this.cartItemUnreservation.content = true;
      this.cartItemUnreservation.itemdetails = this.cartDetails.all_items[0];
      this.cartItemUnreservation.cartItems =  this.cartDetails.all_items[0];
      this.IsDisplayIdlePopup = true;
    } else {
      // Normal bundle, plan only and device reservation not timed out.
      this.redirectOnSubmit(form);
    }
  }

  redirectOnSubmit(form) {
    this.personalForm = form.value;
    if (form.invalid) {
      return;
    }

    if (typeof window !== "undefined" && sessionStorage) {
      this.personalForm.loginRequest = JSON.parse(sessionStorage.getItem("GuestInfo"));
    }
    this.personalForm.customerType = this.personalForm.loginRequest.blacklistChkRequest.customerIDTypeValue;
    this.personalForm.customerIdNumber = this.personalForm.loginRequest.blacklistChkRequest.customerIDNo;
    this.guestCheckoutCreateAccount();
  }

  guestCheckoutCreateAccount() {
    const xpaxMnpData: IMNPPrepaidData = JSON.parse(sessionStorage.getItem(XPAX_MNP_DATA));

    let calculatedDateOfBirth = null;
    let unit_no,addressOne,addressTwo,postcode,city,state,statecode;
    const fullname = this.cartService.splitName(this.personalForm.name);
    if (this.personalForm.customerType === "New NRIC") {
      calculatedDateOfBirth = this._commonUtilService.capturingDOBFromNRIC(this.personalForm.customerIdNumber);
    }
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.setItem("personalForm", JSON.stringify(this.personalForm));
    }

    unit_no = this.personalForm.buildingName.trim();
    addressOne = this.personalForm.streetAddressLine1.trim();
    addressTwo = this.personalForm.streetAddressLine2 ? this.personalForm.streetAddressLine2.trim() : "";
    postcode = this.personalForm.postalCode.toString().trim();
    city = this.personalForm.city.trim();
    state = this.personalForm.state.name.trim();
    statecode = this.personalForm.state.code.trim();

    const request = {
      data: {
        firstname: fullname.ContactFirstName.trim(),
        lastname: fullname.ContactLastName.trim(),
        customer_full_name: fullname.ContactFirstName.trim() + ' ' + fullname.ContactLastName.trim(),
        email: this.personalForm.contactEmail.trim(),
        mobilenumber: this.personalForm.contactMobileNum,
        salutation: this.personalForm.salutation.trim(),
        gender: this.personalForm.gender.trim(),
        customerIDNo: this.personalForm.loginRequest.blacklistChkRequest.customerIDNo.trim(),
        customerIDType: this.personalForm.loginRequest.blacklistChkRequest.customerIDTypeValue.trim(),
        billing_city: this.personalForm.city.trim(),
        billing_telephone: this.personalForm.contactMobileNum,
        billing_fax: "",
        billing_state: this.personalForm.state.name.trim(),
        billing_postcode: this.personalForm.postalCode.toString().trim(),
        billing_address_line_1: this.personalForm.streetAddressLine1.trim(),
        billing_address_line_2: this.personalForm.streetAddressLine2 ? this.personalForm.streetAddressLine2.trim() : "",
        billing_country_id: 'MY',
        billing_unit_no: this.personalForm.buildingName.trim(),
        shipping_city: city,
        shipping_telephone: this.personalForm.contactMobileNum,
        shipping_fax: "",
        shipping_state: state,
        shipping_postcode: postcode,
        shipping_country_id: 'MY',
        shipping_address_line_1: addressOne,
        shipping_address_line_2: addressTwo,
        date_Of_birth: calculatedDateOfBirth.trim() + "_000000",
        preferable_contact_method: this.personalForm.preferredContactMethod.trim(),
        state_code: statecode,
        created: this.cartService.createNow().trim(),
        shipping_unit_no: unit_no,
        alternate_contact_number: this.personalForm.alternateMsisdn ? this.personalForm.alternateMsisdn : "",
        resident_type: "High-Rise"
      }
    };

    // ? Don't send dob for Passport
    if (xpaxMnpData?.idType === "Passport") {
      delete request.data.date_Of_birth;
    }

    this.cartService.guestCheckoutApi(request).subscribe(
     (response: any) => {
      if (typeof window !== 'undefined' && sessionStorage && localStorage && response[0].status === true) {
        this.userToken = response[0]["guestToken"];
        if (this.userToken) {
        sessionStorage.setItem("UserToken", this.userToken);
        }
        this.cartMineDetails(false, true);
        localStorage.setItem("IS_FORM_FILLED", "YES");
      } else if (response[0].status === false) {
        this.sessionInvalid = false;
        this.formSubmitError = true;
        this.formSubmitErrorData = {};
        this.formSubmitErrorData.content = response[0].message;
      }
    }, (error: any) => {
        if (typeof window !== 'undefined' && sessionStorage) {
          // sessionStorage.setItem("UserToken", "uvuxp43ei6l92pj5ynjujefiixyvfwg8");
          this.cartMineDetails(false, true);
        }
      });
  }

  cartMineDetails(getSessionTime: any, updateCart: any) {
    if (typeof window !== 'undefined' && localStorage) {
   const apiUrl: string = ApiConstant.CARTMINE_API;
    this.cartService.Find(apiUrl.trim()).subscribe(
      (response: any) => {
        if (response[0].status === false && (response[0].message === "SESSION IN VALID" || response[0].message === "SESSION INVALID")) {
          this.sessionInvalid = true;       // session invalid error
          return false;
        } else {
            this.cartDetails = response[0];
            const billing = this.cartDetails?.billing_address;
            if (billing && !/^\d+\@celcom.com$/.test(billing.email) && billing.telephone != "823") {
              this.formDataValue.salutation = billing.salutation;
              this.formDataValue.name = [billing.firstname, billing.middlename, billing.lastname].filter(Boolean).join(' ');
              this.formDataValue.gender = "Male";
              this.formDataValue.preferredContactMethod = "Email";
              this.formDataValue.buildingName = billing.billing_unit_number;
              this.formDataValue.streetAddressLine1 = billing.street;
              // this.formDataValue.streetAddressLine2 = billing.
              this.formDataValue.postalCode = billing.postcode;
              this.formDataValue.city = billing.city;
              if (billing.region_id) {
                const state = this.states?.available_regions?.find(s => s.id == billing.region_id)
                this.formDataValue.state = state;
              }
              this.mobNum = billing.telephone
              // this.altMobNum = billing.
              this.userEmail = billing.email
              if (!this.customerIdNo) {
                let cust;
                try {
                  cust = this.cartDetails?.customer?.custom_attributes?.find(att => att.attribute_code == 'id_number');
                } catch (_error) {

                }
                this.customerIdNo = cust?.value;
              }
            }
            try {
              updateAnalytics('product_id', this.cartDetails?.items[0]?.sku);
              updateAnalytics('product_name', this.cartDetails?.items[0]?.name);
              updateAnalytics('product_price', this.cartDetails?.grossTotal);
              updateAnalytics('customer_type', sessionStorage.getItem("OLD_GUEST_USER") === "YES" ? "existing" : "new");
              updateAnalytics('customer_category', sessionStorage.getItem('USER_TYPE')?.toLowerCase() == 'enterprise' ? 'enterprise' : 'mass');
              updateAnalytics('product_type', localStorage.getItem("analytics-product_type"));
              updateAnalytics('item_type', localStorage.getItem("analytics-item_type"));
            } catch (_error) {
            }
            if (updateCart) {
              this.customerInfoUpdateInCart(response[0]);
            }
            if (getSessionTime) {
              // Get added cart time.
              this.cartItemAddedTime = this.cartDetails.cart_session;
            }
         }
      });
    }
  }

  get addressLine2(){
    return [
      this.formDataValue.postalCode,
      this.formDataValue.city,
    ].filter(Boolean).join(', ')
  }

  get addressLine1(){
    return [
      this.formDataValue.buildingName,
      this.formDataValue.streetAddressLine1,
      this.formDataValue.streetAddressLine2,
    ].filter(Boolean).join(', ')
  }

  addressUnitValidationBeforeSubmit() {
    // '/(\W)\1+/';
    if (this.personalForm.buildingName && /(\W)/.test(this.personalForm.buildingName)) {
      this.unitInvalid = true;
      return true;
    } else {
      this.unitInvalid = false;
      return false;
    }
  }

  customerInfoUpdateInCart(response) {
    const fullname = this.cartService.splitName(this.personalForm.name);
       if (response) {
          if (typeof window !== 'undefined' && sessionStorage) {
              const UserInfo = JSON.parse(sessionStorage.getItem("UserInfo")) || {};
              let outputCPResp = {};
              if (UserInfo && UserInfo['outputCPResp']) {
                outputCPResp = UserInfo['outputCPResp'];
              }
              this.personalForm.firstTimeGuestCustomerInfo = {
                ...UserInfo,
                outputCPResp: {
                  ...outputCPResp,
                  customerID: this.personalForm.customerIdNumber,
                  dateOfBirth: this._commonUtilService.capturingDOBFromNRIC(this.personalForm.customerIdNumber) + "_000000",
                  preferredContactMethod: this.personalForm.preferredContactMethod,
                  contactPreferredTime: "4:30pm to 8:30pm",
                  newGuestPhNo: this.personalForm.contactMobileNum,
                  contactFirstName: fullname.ContactFirstName,
                  contactLastName: fullname.ContactLastName,
                  salutation: this.personalForm.salutation,
                  contactSalutation: this.personalForm.salutation,
                  contactEmail: this.personalForm.contactEmail
                }
              };
              sessionStorage.setItem("UserInfo", JSON.stringify(this.personalForm.firstTimeGuestCustomerInfo));
              if (sessionStorage.getItem("GuestInfo")) {
                let guestInfo = JSON.parse(sessionStorage.getItem("GuestInfo"));
                guestInfo.outputCPResp = {
                  ...guestInfo.outputCPResp,
                  ...this.personalForm.firstTimeGuestCustomerInfo.outputCPResp
                }
                guestInfo.outputCPResp.preferredContactMethod = this.personalForm.preferredContactMethod;
                guestInfo.outputCPResp.contactPreferredTime = "4:30pm to 8:30pm";
                sessionStorage.setItem("GuestInfo", JSON.stringify(guestInfo));
              }
              this._router.navigateByUrl('/store/checkout/summary');
          }
        }
  }

    setBillingAddressIfAny() {
      const emailFromCartMine = sessionStorage.getItem(CART_MINE_DEFAULT_EMAIL);
      const eKycData: IEKycSessionStorageData = JSON.parse(sessionStorage.getItem(E_KYC_DETAILS));

      if (emailFromCartMine === eKycData?.defaultEmail) {
        const selectedState = this.states?.available_regions?.find(
          x => x.name?.toUpperCase() === eKycData.state?.toUpperCase()
        );
        this.formDataValue = {
          ...this.formDataValue,
          name: eKycData.fullName,
          salutation: eKycData.Salutation,
          gender: eKycData.Salutation === "Mr" ? "Male" : "Female",
        };

        if (eKycData.addressLine1 !== DEFAULT_SIEBEL_ADDRESS) {
          this.formDataValue = {
            ...this.formDataValue,
            streetAddressLine1: eKycData.addressLine1,
            streetAddressLine2: eKycData.addressLine2,
            postalCode: eKycData.postCode,
            city: eKycData.city,
            state: selectedState
          };
        }

        // ! Disabling the select component makes the form invalid,
        // ! should investigate!
        this.flags.isFormDisabled = true;
        if (eKycData.idType !== 'Passport') {
          this.flags.isBillingAddressDisabled = true;
        } else {
          // ? if passport change id type
          this.customerIdTypeValue = 'Passport';
        }
      }

    }

  SetDateOfBirthDetails() {
    if (typeof window !== 'undefined') {
      if (sessionStorage && sessionStorage.getItem("GuestInfo") && sessionStorage.getItem("OLD_GUEST_USER") === "NO") {
        const customerIdNum = (JSON.parse(sessionStorage.getItem("GuestInfo"))).blacklistChkRequest.customerIDNo;
        this.customerIdTypeValue = (JSON.parse(sessionStorage.getItem("GuestInfo"))).blacklistChkRequest.customerIDTypeValue;
        this.DOB = (this._commonUtilService.capturingDOBFromNRIC(customerIdNum));
        this.DOByear = this.DOB.slice(0, 4);
        this.DOBmonth = this.DOB.slice(4, 6);
        this.DOBdate = this.DOB.slice(6, 8);
      }
    }
  }
  // Call only for old Guest users.
  customerRetrieve() {
    const url = "/oneapi/queryprofile/v1/customerretrieve";
    const customerID = this.personalForm.loginRequest.blacklistChkRequest.customerIDNo;
    const customerType = this.personalForm.loginRequest.blacklistChkRequest.customerIDTypeValue;
    const requestParams = "?customerId=" + customerID + "&customerType=" + customerType;
    this._service.get(url + requestParams).subscribe(
      (response: any) => {
        this.personalForm.guestCustomerInfo = response;
        if (typeof window !== "undefined" && sessionStorage) {
          sessionStorage.setItem("personalForm", JSON.stringify(this.personalForm.guestCustomerInfo));
        }
        this.setGuestInfo();
      },
      (error: any) => {
        // tobe removed
        this.personalForm.guestCustomerInfo = null;
        this.setGuestInfo();
      }
    );
  }

  setGuestInfo() {
    if (typeof window !== "undefined" && sessionStorage) {
      sessionStorage.setItem("UserInfo", JSON.stringify(this.personalForm.guestCustomerInfo));
      sessionStorage.setItem("GuestInfo", JSON.stringify(this.personalForm.guestCustomerInfo));
      this._router.navigateByUrl('/store/checkout/summary');
    }
  }

  public restrictOnlyNum = (ev, elem,place = "") => {
    if (elem === 'contactMobileNum') {
      return this._commonUtilService.restrictOnlyNum(ev, elem, this.mobNum ? this.mobNum.toString() : "");
    } else if(elem === 'alternateMsisdn') {
      return this._commonUtilService.restrictOnlyNum(ev, elem, this.altMobNum ? this.altMobNum.toString() : "");
    } else {
      if(place === "delivery") {
        return this._commonUtilService.restrictOnlyNum(ev, "postalcode", this.postCodeDelivery ? this.postCodeDelivery.toString() : "");
      } else {
        return this._commonUtilService.restrictOnlyNum(ev, "postalcode", this.postCode ? this.postCode.toString() : "");
      }
    }
  }

  public MobileNumber(ev) {
    if (this.mobNum && this.mobNum !== "") {
      const resultData = this.mobNum.toString().charAt(0);
      this.mobNum = (resultData !== '6') ? ("60" + this.mobNum).substring(0,3) === "600" ? "6" + this.mobNum : "60" + this.mobNum : this.mobNum;
    }
    this.invalidmobNumber = (this.mobNum && this.mobNum.toString().length < 11 && this.mobNum.toString().length !== 0) && ev.key !== "Tab";
  }

  public MobileNumberAlternate(ev) {
    if (this.altMobNum && this.altMobNum !== "") {
      const resultData = this.altMobNum.toString().charAt(0);
      this.altMobNum = (resultData !== '6') ? ("60" + this.altMobNum).substring(0,3) === "600" ? "6" + this.altMobNum : "60" + this.altMobNum : this.altMobNum;
    }
    this.invalidAlternateMsisdn = (this.altMobNum && this.altMobNum.toString().length < 11 && this.altMobNum.toString().length !== 0) && ev.key !== "Tab";
  }

  public postalCodeValidation(ev,place = "") {
    if(place === "delivery") {
      this.isPostalInValidDelivery = this.postCode.toString().length < 5;
      return this._commonUtilService.restrictOnlyNum(ev, "postalcode", this.postCodeDelivery ? this.postCodeDelivery.toString() : "");
    } else {
      this.isPostalInValid = this.postCode.toString().length < 5;
      return this._commonUtilService.restrictOnlyNum(ev, "postalcode", this.postCode ? this.postCode.toString() : "");
    }
  }

  public addressLine1Validation(ev,place = "") {
    const k = ev.keyCode || ev.which;
    const z = ev.charCode || -1;
    // const charStr = String.fromCharCode(k);
    const key = ev.key;
    const acceptedChars = ["&", "#", ".", "-", ",", "/", "@"];
    const isCharExists = acceptedChars.includes(key);
    const streetTxtLength = ev.target.value.length;

    if (((k > 64 && k < 91) || (k > 96 && k < 123) || (k >= 48 && k <= 57) ||
      isCharExists || k === 8 || k === 13 || k === 16 || k === 17 || k === 0 ||
      k === 32 || k === 39 || k === 37 || k === 46 || k === 9 || z === 0) &&
      streetTxtLength <= this.homeStreetTxtBoxMaxLength) {
      return true;
    } else {
      if(place === "delivery") {
        this.addressline1Delivery = ev.target.value.substring(0, this.homeStreetTxtBoxMaxLength);
      } else {
        this.addressline1 = ev.target.value.substring(0, this.homeStreetTxtBoxMaxLength);
      }
      return false;
    }
  }

  public addressLine2Validation(ev,place = "") {
    const z = ev.charCode || -1;
    const k = ev.keyCode || ev.which;
    const acceptedChars = ["&", "#", ".", "-", ",", "/", "@"];
    const key = ev.key;
    const streetTxtLength = ev.target.value.length;
    const isCharExists = acceptedChars.includes(key);

    if (((k > 64 && k < 91) || (k > 96 && k < 123) ||
     (k >= 48 && k <= 57) || isCharExists || k === 8 ||
     k === 13 || k === 16 || k === 17 || k === 0 ||
      k === 32 || k === 39 || k === 37 || k === 46 ||
       k === 9 || z === 0) && streetTxtLength <= this.homeStreetTxtBoxMaxLength) {
      return true;
    } else {
      if(place === "delivery") {
        this.addressline2Delivery = ev.target.value.substring(0, this.homeStreetTxtBoxMaxLength);
      } else {
        this.addressline2 = ev.target.value.substring(0, this.homeStreetTxtBoxMaxLength);
      }
      return false;
    }
  }

  public addressUnitValidation(ev , place = "") {
    const k = ev.keyCode || ev.which;
    const z = ev.charCode || -1;
    // const charStr = String.fromCharCode(k);
    const key = ev.key;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const isCharExists = acceptedChars.includes(key);
    const buildingNameLength = ev.target.value.length;

    if (((k > 64 && k < 91) || (k > 96 && k < 123) || (k >= 48 && k <= 57) ||
      isCharExists || k === 8 || k === 13 || k === 16 || k === 17 || k === 0 ||
      k === 32 || k === 39 || k === 37 || k === 46 || k === 9 || z === 0) &&
      buildingNameLength <= this.addressUnittxtBoxMaxLength) {
      return true;
    } else {
      // ev.target.value = ev.target.value.substring(0, this.addressUnittxtBoxMaxLength);
      if(place === "delivery") {
        this.unitHouseNumberDelivery = ev.target.value.substring(0, this.addressUnittxtBoxMaxLength);
      } else {
        this.unitHouseNumber = ev.target.value.substring(0, this.addressUnittxtBoxMaxLength);
      }
      return false;
    }
  }

  public cityValidation(ev) {
    const citykey = ev.keyCode || ev.which;
    const z = ev.charCode;
    if ((citykey > 64 && citykey < 91) || (citykey > 96 && citykey < 123) ||
     citykey === 8 || citykey === 0 || citykey === 13 || citykey === 16 ||
    citykey === 17 || citykey === 32 || z === 0) {
      return true;
    } else {
      return false;
    }
  }

  getStateValueText(states, state) {
    return _.find(states, function (o) {
      return o.code === state;
    });
  }

  ngOnDestroy() { }

  redirectShopDetails(e){
    this._router.navigateByUrl('/');
  }
}
