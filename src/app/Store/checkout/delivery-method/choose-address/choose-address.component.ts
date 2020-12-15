import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
import { AppService } from '../../../../Service/app.service';
import { DeviceDataService } from '../../../../Service/devicedata.service';
import { CheckoutService } from '../../services/checkout.service';
import { CartService } from '../../../../Service/cart.service';
import { Cart } from '../../../../Model/cart.model';
import { CartItem } from '../../../../Model/cart-item.model';
import * as FormConst from '../../../../../constants/form.constants';
import { UserService } from '../../../../Service/user.service';
import { CommonUtilService } from '../../../../Service/commonUtil.service';
import {
  FORM_REQUIRED_ERROR,
  FORM_VALIDATION_ERROR,
  FORM_VALIDATION_PATTERN
} from '../../../../shared/constants/form.constants';

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.css']
})
export class ChooseAddressComponent implements OnInit {
  @Input() billingAddress: any;
  @Input() checkoutData: any;
  @Input() disableButton;
  @Output() sessionInvalidCheck = new EventEmitter();
  @Output() errorDisplay = new EventEmitter();
  public showBillingAdd: boolean;
  shipType = "";
  altMobNum: any = "";
  invalidAlternateMsisdn;
  nric = "";
  public showBillingAddress;
  public editBilling = false;
  public isshowBillingAddressValid = true;
  public salutation: any;
  public userInfo: any;
  public OldGuestUser: any;
  public guestInformation: any;
  public modelLabels: Object;
  public addr: any = "";
  public posCod: any = "";
  public addrline1: any = "";
  public addrline2: any = "";
  public ciy: any = "";
  public stat: any = "";
  public residentTypes = [];
  public states: any;
  public loading: boolean;
  public cart: any = {};
  cartResponse: any;
  preorderchk: any;
  countriesUrl = "/rest/V1/directory/countries/MY";
  setBillingUrl = "/rest/V1/setBillingAsShipping/";
  navigateUrl = '/store/checkout/summary';
  updateprofileurl = "/rest/V1/update-profile";
  addshippingurl = "/rest/V1/addshipping";
  redirecturl = '/store/checkout/summary';
  public sessionInvalid = true;
  public errorNotification: any = null;
  public showErrorNoticification = false;
  // public billingAddress: any;
  private subscriber: Subscription;
  // Unreserver device vaiables.
  cartItemAddedTime: number;
  componentLoadedTime: any;
  reserveTimeOut = false;
  cartItemUnreservation: any;
  IsDisplayIdlePopup = false;
  isPostalInValid = false;
  formPattern = {
    address: FORM_VALIDATION_PATTERN.address,
    addressLine: FORM_VALIDATION_PATTERN.addressLine
  };
  formHelperText = {
    addressLine: {
      invalid: FORM_VALIDATION_ERROR.addressLine,
      req: FORM_REQUIRED_ERROR.addressLine
    }
  };

  constructor(
    private service: AppService,
    private _deviceDataService: DeviceDataService,
    private _checkoutService: CheckoutService,
    private cartService: CartService,
    private userService: UserService,
    private _commonUtilService: CommonUtilService,
    private _router: Router) {
    this.modelLabels = FormConst;
    this.residentTypes = FormConst.LOCATION_TYPE;
  }

  ngOnInit() {
    this.shipType = "shipToBillingAdd";
    this.chooseAddress('shipToBillingAdd');
    this.disableButton = true;
    this.componentLoadedTime = Date.now();
    this.preorderchk = this.checkoutData.all_items[0];
    // Get added cart time only for preorder device for now.
    this.cartItemAddedTime = this.checkoutData.cart_session;
    this.subscriber = this._deviceDataService.editBilling$.subscribe((data) => {
      this.setAddress(localStorage.getItem("EditAddress"));
      this.chooseAddress('shipToBillingAdd');
      this.showBillingAdd = false;
      this.shipType = "shipToBillingAdd";
    });
    this._deviceDataService.sharedDeliveryType$.subscribe(getData => {
      if (getData === 'Standard Delivery') {
        this.checkoutData.delivery_type.value = 0;
      } else if(getData === 'Midnight Delivery'){
        this.checkoutData.delivery_type.value = 1;
      }
    });
    this.loading = true;
    this._checkoutService.Find(this.countriesUrl.trim()).subscribe(
      (response: any) => {
        this.states = response;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      });

    this.init();
  }

  init() {
      if (sessionStorage && sessionStorage.getItem("UserInfo") != null) {
        this.userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      }
      if (sessionStorage && sessionStorage.getItem("OLD_GUEST_USER")) {
        this.OldGuestUser = sessionStorage.getItem("OLD_GUEST_USER");
      }
      if (sessionStorage && sessionStorage.getItem("GuestInfo") != null) {
        this.guestInformation = JSON.parse(sessionStorage.getItem("GuestInfo"));
      }
      this.nric = this.userInfo.outputCPResp.customerID;
    if (localStorage && localStorage.getItem("EditAddress")) {
      this.setAddress(localStorage.getItem("EditAddress"));
      this.chooseAddress('shipToBillingAdd');
      this.showBillingAdd = false;
      this.shipType = "shipToBillingAdd";
    }
  }
  public chooseAddress(shippingAddress) {
    this.disableButton = false;
    this.isshowBillingAddressValid = true;
    if (localStorage && localStorage.getItem("updateInfo")) {
      const updateInfo = JSON.parse(localStorage.getItem("updateInfo"));
      if (updateInfo.salutation === null || updateInfo.email === null || updateInfo.typedEmail === null || updateInfo.validate === true) {
        this.disableButton = true;
      } else if (updateInfo.email && updateInfo.typedEmail && updateInfo.email !== updateInfo.typedEmail) {
        this.disableButton = true;
      }
    }
    if (shippingAddress === 'shipToBillingAdd') {
      this.showBillingAddress = 'existing';
    } else {
      if (shippingAddress === 'shipToDiffAdd') {
        // ? Emptying the form
        this.addr = "";
        this.addrline1 = "";
        this.addrline2 = "";
        this.posCod = "";
        this.ciy = "";
        this.stat = "";

        this.showBillingAddress = 'new';

      }
    }
    this.editBilling = false;
  }
  updatingUserInfo(shippingAddId, methodUsed) {
    this.reserveTimeOut = this.cartService.deviceReservervationTimeout(this.componentLoadedTime, this.cartItemAddedTime);
    // For preorder device & normal bundle and device reservation time out.
    if (this.reserveTimeOut) {
      this.cartItemUnreservation = {};
      this.cartItemUnreservation.content = true;
      this.cartItemUnreservation.itemdetails = this.checkoutData.all_items[0];
      this.IsDisplayIdlePopup = true;
    } else {
      let addressType = 'setBillingAsSipping';
      if (methodUsed === "onSubmit") {
        addressType = 'addShipping';
      }
      if (localStorage && localStorage.getItem('updateInfo')) {
        const updateInfo = JSON.parse(localStorage.getItem("updateInfo"));
        if (updateInfo.salutation === null || updateInfo.email === null) {
          this.disableButton = true;
        } else {
          this.disableButton = false;
        }
        this.updateUserInfo(addressType, shippingAddId);
      } else {
        if (methodUsed === "setShippingAddress") {
          this.gotoSetShippingAddress(shippingAddId);
        } else if (methodUsed === "onSubmit") {
           this.gotoOnSubmit(shippingAddId);
        }
      }
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

  ValidateNotFormField() {
    this._deviceDataService.publishemailRetreivalValidation('');
    this._deviceDataService.publishEditAddValidation();

    if (this.showBillingAddress !== 'existing' && this.showBillingAddress !== 'new') {
        this.isshowBillingAddressValid = false;
        this.scrollToError(document.getElementsByClassName('error')[0]);
        return true;
      } else {
        this.isshowBillingAddressValid = true;
        return false;
      }


  }
  setShippingAddress(shippingAddId) {
    if (this.ValidateNotFormField()) {
      return;
    }
    if (!(this.billingAddress && this.showBillingAddress === 'existing' && !this.disableButton)) {
      return;
    }
    this.updatingUserInfo(shippingAddId, "setShippingAddress");
  }

  public gotoSetShippingAddress(shippingAddressId) {
    let token;
    if (!shippingAddressId) {
      shippingAddressId = 1;
    }
    if (sessionStorage && sessionStorage.getItem('UserToken')) {
      token = sessionStorage.getItem('UserToken');
    }
    // checkout delivery type
    const request = {
      "data": {
        "address_id": shippingAddressId,
        "user": "user",
        "token": token,
        "delivery_type": this.checkoutData.delivery_type.value
      }
    };
    this.service.postEstoreUserData(this.setBillingUrl, request).subscribe(
      (response: any) => {
        if(typeof window !== 'undefined') this.redirectTo('/store/checkout/summary');
      }, (errorResponse: any) => {
        if (typeof window !== 'undefined') {
          if (!errorResponse.error.success) {
            this.sessionInvalid = true;
            this.sessionInvalidCheck.emit(errorResponse.error.message);
          }
        }
      });
  }

  public backToCart() {
    this._router.navigateByUrl("/store/cart");
  }

  public updateUserInfo(addressType, data) {
    let msisdn = null;
    let customerRowId;
    let contactRowID;
    let email;
    let salutation;
    let preferredContactMethod;
    let contactNumber;
    if (typeof window !== 'undefined' && localStorage && sessionStorage) {
      if ((sessionStorage.getItem("UserInfo") || sessionStorage.getItem("GuestInfo"))
          && sessionStorage.getItem("UserToken") && localStorage.getItem('updateInfo')) {
        const userData = sessionStorage.getItem("GuestInfo") || sessionStorage.getItem("UserInfo");
        const userInfo = JSON.parse(userData);
        const updateInfo = JSON.parse(localStorage.getItem("updateInfo"));
        msisdn = localStorage.getItem('MyMsIsdn');
        if (!userInfo.outputCPResp.contactMobileNum || userInfo.outputCPResp.contactMobileNum === null ||
            userInfo.outputCPResp.contactMobileNum === '') {
          contactNumber = msisdn;
        } else {
          if (userInfo.outputCPResp.contactMobileNum) {
            contactNumber = userInfo.outputCPResp.contactMobileNum;
          }
        }
        if (userInfo.outputCPResp.customerRowId) {
          customerRowId = userInfo.outputCPResp.customerRowId;
        }
        if (userInfo.outputCPResp.contactRowID) {
          contactRowID = userInfo.outputCPResp.contactRowID;
        }
        if (updateInfo.email && updateInfo.email !== '') {
          email = updateInfo.email;
        } else {
          if (userInfo.outputCPResp.contactEmail) {
            email = userInfo.outputCPResp.contactEmail;
          }
        }
        if (updateInfo.salutation && updateInfo.salutation !== '') {
          salutation = updateInfo.salutation;
        } else {
          if (userInfo.outputCPResp.contactSalutation) {
            salutation = userInfo.outputCPResp.contactSalutation;
          }
        }
        if (userInfo.outputCPResp.preferredContactMethod && userInfo.outputCPResp.preferredContactMethod !== '') {
          preferredContactMethod = userInfo.outputCPResp.preferredContactMethod;
        } else {
          preferredContactMethod = 'Email';
        }
      }
    }

    const requestbody = {
      "data": {
        "msisdn_number": msisdn,
        "customer_row_id": customerRowId,
        "contact_id": contactRowID,
        "email": email,
        "salutation": salutation,
        "preferred_contact_type": preferredContactMethod,
        "contact_number": contactNumber
      }
    };

    this.service.postEstoreUserData(this.updateprofileurl, requestbody).subscribe(
      (response: any) => {
        if (response[0].status === true) {
          localStorage.removeItem('updateInfo');
          if (sessionStorage && sessionStorage.getItem('UserInfo')) {
            const userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
            userInfo.outputCPResp.contactEmail = requestbody.data.email;
            userInfo.outputCPResp.contactSalutation = requestbody.data.salutation;
            userInfo.outputCPResp.preferredContactMethod = requestbody.data.preferred_contact_type;
            userInfo.outputCPResp.contactMobileNum = requestbody.data.contact_number;
            sessionStorage.setItem('UserInfo', JSON.stringify(userInfo));
          }
          if (addressType === 'setBillingAsSipping') {
            this.gotoSetShippingAddress(data);
          } else if (addressType === 'addShipping') {
            this.gotoOnSubmit(data);
          }
        } else {
          this.errorDisplay.emit(response[0].message);
        }
      }, (errorResponse: any) => {
        this.errorDisplay.emit("Sorry for the inconvenience, we're giving our system a little update. Please try again later.");
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
    if (this.ValidateNotFormField()) {
      return;
    }
    if (form.form.valid) {
      console.log('form submitted');
    } else {
      this.validateAllFormFields(form.form);
      setTimeout(() => {
        if (document.getElementsByClassName('error').length > 0) {
          this.scrollToError(document.getElementsByClassName('error')[0]);
          return;
        }
      }, 0);
    }
    this.updatingUserInfo(form, "onSubmit");
  }

  gotoOnSubmit(form) {

    if (form.invalid) {
      return;
    }
    if (this.checkoutData && this.checkoutData.customerOtherInfo && this.checkoutData.customerOtherInfo.salutation) {
      this.salutation = this.checkoutData.customerOtherInfo.salutation;
    } else {
      if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.salutation) {
        this.salutation = this.userInfo.outputCPResp.salutation;
      } else {
        this.salutation = "";
      }
    }
    let userMsisdn = "";
    if (localStorage && localStorage.getItem("MyMsIsdn") && this.userService.isMCUser()) {
      userMsisdn = localStorage.getItem("MyMsIsdn");
    }
    let request={}
    if(this.shipType == "shipToBillingAdd"){
      request = {
        "data": {
          "cart_id": this.checkoutData.id ? this.checkoutData.id : "",
          "fname": this.checkoutData.customer.firstname,
          "lname": this.checkoutData.customer.lastname,
          "id": "",
          "customerId": this.checkoutData.customer.id,
          "stateId": this.checkoutData.billing_address.region_id,
          "postCode": this.checkoutData.billing_address.postcode,
          "city": this.checkoutData.billing_address.city,
          "address_line_1": this.checkoutData.billing_address.address_line_1,
          "address_line_2": this.checkoutData.billing_address.address_line_2,
          "phone": this.checkoutData.customerOtherInfo.mobile_number,
          "salutation": this.salutation,
          "unit_no": form.value.address || this.checkoutData.billing_address.billing_unit_number,
          "delivery_type": this.checkoutData.delivery_type.value,
          "is_shipping": true,
          "msisdnNumber": userMsisdn,
          "alternate_contact_number": form.value.alternateMsisdn || ''
        }
      };
    }else if(this.shipType == "shipToDiffAdd"){
       request = {
        "data": {
          "cart_id": this.checkoutData.id ? this.checkoutData.id : "",
          "fname": this.checkoutData.customer.firstname,
          "lname": this.checkoutData.customer.lastname,
          "id": "",
          "customerId": this.checkoutData.customer.id,
          "stateId": form.value.state || this.checkoutData.shipping_address.region_id,
          "postCode": form.value.postalCode || this.checkoutData.shipping_address.postcode,
          "city": form.value.city || this.checkoutData.shipping_address.city,
          "address_line_1": form.value.addressLine1 || this.checkoutData.shipping_address.address_line_1,
          "address_line_2": form.value.addressLine2 || this.checkoutData.shipping_address.address_line_2,
          "phone": this.checkoutData.customerOtherInfo.mobile_number,
          "salutation": this.salutation,
          "unit_no": form.value.address || this.checkoutData.shipping_address.shipping_unit_number,
          "delivery_type": this.checkoutData.delivery_type.value,
          "is_shipping": true,
          "msisdnNumber": userMsisdn,
          "alternate_contact_number": form.value.alternateMsisdn || ''
        }
      };
    }

    this.service.postEstoreUserData(this.addshippingurl, request).subscribe(
      (response: any) => {
        if(typeof window !== 'undefined') this.redirectTo('/store/checkout/summary');
      }, (err: any) => {
        this.sessionCheck(err);
      });
  }

  setAddress(side) {
    this.showBillingAddress = side;
    if (localStorage && localStorage.getItem("EditAddress")) {
      if (this.checkoutData && this.checkoutData.shipping_address) {
        this.addr = this.checkoutData.shipping_address.shipping_unit_number;
        this.addrline1 = this.checkoutData.shipping_address.address_line_1;
        this.addrline2 = this.checkoutData.shipping_address.address_line_2;
        this.posCod = this.checkoutData.shipping_address.postcode;
        this.ciy = this.checkoutData.shipping_address.city;
        this.stat = this.checkoutData.shipping_address.region_id;
        this.altMobNum = this.checkoutData.customerOtherInfo.alternate_contact_number || '';
      }
    }
  }

  public restrictOnlyNum = (ev, elem) => this._commonUtilService.restrictOnlyNum(ev,'alternateMsisdn', this.altMobNum ? this.altMobNum.toString() : "");

  public MobileNumberAlternate(ev) {
    if (this.altMobNum && this.altMobNum !== "") {
      const resultData = this.altMobNum.toString().charAt(0);
      this.altMobNum = (resultData !== '6') ? ("60" + this.altMobNum).substring(0,3) === "600" ? "6" + this.altMobNum : "60" + this.altMobNum : this.altMobNum;
    }
    this.invalidAlternateMsisdn = (this.altMobNum && this.altMobNum.toString().length < 11 && this.altMobNum.toString().length !== 0) && ev.key !== "Tab";
  }

  public addressUnitValidation(ev) {
    const k = ev.keyCode || ev.which;
    const charStr = String.fromCharCode(k);
    const z = ev.charCode;
    if ((k > 64 && k < 91) || (k >= 48 && k <= 57) || (k > 96 && k < 123) ||
      charStr === "-" || charStr === "#" || charStr === "/" || charStr === "@" || charStr === "," || charStr === "." ||
      k === 8 || k === 16 || k === 13 || k === 17 || k === 32 || k === 0 || z === 0) {
      return true;
    } else {
      return false;
    }
  }

  public postalCodeValidation(ev) {
    this.isPostalInValid = this.posCod.toString().length < 5;
    return this._commonUtilService.restrictOnlyNum(ev, "postalcode", this.posCod ? this.posCod.toString() : "");
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

  // onSubmitExisting(form) {
  //   if (form.invalid) {
  //     return;
  //   }
  //   if (this.checkoutData && this.checkoutData.customerOtherInfo && this.checkoutData.customerOtherInfo.salutation) {
  //     this.salutation = this.checkoutData.customerOtherInfo.salutation;
  //   } else {
  //     if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.salutation) {
  //       this.salutation = this.userInfo.outputCPResp.salutation;
  //     } else {
  //       this.salutation = "";
  //     }
  //   }
  //   let userMsisdn = "";
  //   if (localStorage && localStorage.getItem("MyMsIsdn") && this.userService.isMCUser()) {
  //     userMsisdn = localStorage.getItem("MyMsIsdn");
  //   }
  //   const request = {
  //     "data": {
  //       "cart_id": this.checkoutData.id ? this.checkoutData.id : "",
  //       "fname": this.checkoutData.customer.firstname,
  //       "lname": this.checkoutData.customer.lastname,
  //       "id": "",
  //       "customerId": this.checkoutData.customer.id,
  //       "stateId": this.checkoutData.billing_address.region_id,
  //       "postCode": this.checkoutData.billing_address.postcode,
  //       "city": this.checkoutData.billing_address.city,
  //       "address_line_1": this.checkoutData.billing_address.address_line_1,
  //       "address_line_2": this.checkoutData.billing_address.address_line_2,
  //       "phone": this.checkoutData.customerOtherInfo.mobile_number,
  //       "salutation": this.salutation,
  //       "unit_no": this.checkoutData.billing_address.billing_unit_number,
  //       "delivery_type": this.checkoutData.delivery_type.value,
  //       "is_shipping": true,
  //       "msisdnNumber": userMsisdn,
  //       "alternate_contact_number": form.value.alternateMsisdn || ''
  //     }
  //   };
  //   this.service.postEstoreUserData(this.addshippingurl, request).subscribe(
  //     (response: any) => {
  //       if(typeof window !== 'undefined') this.redirectTo('/store/checkout/summary');
  //     }, (err: any) => {
  //       this.sessionCheck(err);
  //     });
  // }

  onCancelEditAddress() {
    this._deviceDataService.publishCancelForm(true);
  }

  redirectTo(uri:string){
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this._router.navigate([uri]));
 }

 sessionCheck(err) {
  if (typeof window !== 'undefined') {
    if (!err.error.success) {
      this.sessionInvalid = true;
      this.sessionInvalidCheck.emit(this.sessionInvalid);
    }
  }
 }
}
