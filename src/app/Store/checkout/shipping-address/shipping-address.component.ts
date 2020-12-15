import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../services/checkout.service';
import { AppService } from '../../../Service/app.service';
import * as FormConst from '../../../../constants/form.constants';
import { Subscription } from "rxjs";
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { FormControl, FormGroup } from "@angular/forms";

import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { UserService } from '../../../Service/user.service';
import {
  FORM_REQUIRED_ERROR,
  FORM_VALIDATION_ERROR,
  FORM_VALIDATION_PATTERN
} from '../../../shared/constants/form.constants';
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css'],
  providers: [CheckoutService, AppService]
})
export class ShippingAddressComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  checkoutData: any;
  router: Router;
  editBilling = false;
  isEditBillingOpen = false;
  billingAddress: any;
  shippingAddress: any;
  addressSide = 'existing';
  checkoutService: CheckoutService;
  service: AppService;
  states: any;
  userInfo: any;
  selectedLocationType: string;
  residentTypes = [];
  modelLabels: Object;
  public addr: any = "";
  public posCod: any = "";
  public addrline1: any = "";
  public addrline2: any = "";
  public ciy: any = "";
  public stat: any = "";
  salutation: any;
  billingStatesUrl = "/rest/V1/directory/countries/MY";
  emailRetrieval = false;
  redirectURL = "store/checkout/shipping";
  billingurl = "/rest/V1/addshipping";
  guestInformation: any;
  disable: any;
  personalDetails = {
    displaySalutation: '',
    displayFirstname: '',
    displayLastname: '',
    displayFullname: '',
    displayContactNumber: '',
    displayEmail: '',
    displayUnitnum: ''
  };
  unitInvalid = false;
  apiUrl = "/rest/V1/cartmine";
  public showGuestNoticification = false;
  public IsExistingGuest: any = null;
  private subscriber: Subscription;
  public loading: boolean;
  public newGuestPhNo: any;
  public UserType: any;
  public OldGuestUser: any = "YES";
  public sessionInvalid = false;
  public deliveryType: any;
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
  constructor(checkoutService: CheckoutService,
    router: Router,
    private _activatedRoute: ActivatedRoute,
    service: AppService,
    private _deviceDataService: DeviceDataService,
    @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private userservice: UserService,
    private _checkoutService: CheckoutService
  ) {
    this.checkoutService = checkoutService;
    this.router = router;
    this.service = service;
    this.modelLabels = FormConst;
    this.residentTypes = FormConst.LOCATION_TYPE;
  }

  ngOnInit() {
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.showGuestNoticification = data)
    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.sessionInvalid = data)
    );
    this.subscriber = this._deviceDataService.editBilling$.subscribe(
      data => (this.editBilling = data)
    );

    this.subscriber = this._deviceDataService.editAddValidation$.subscribe(
      data => {
        if (this.editBilling) {
          this.isEditBillingOpen = true;
        } else {
          this.isEditBillingOpen = false;
        }
      }
    );

    this.subscriber = this._deviceDataService.sharedDeliveryType$.subscribe(getData => {
      if (getData) {
        this.getDeliveryType(getData);
      }
    });
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.sessionInvalid = data));
    this.loading = true;
    this._checkoutService.Find(this.billingStatesUrl.trim()).subscribe(
      (response: any) => {
        this.loading = false;
        this.states = response;
      },
      (error: any) => {
        this.loading = false;
      });
    this.init();
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
  ngAfterViewInit() {
    const currentUrl: string = this.router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
      this._estoreAnalyticsService.SetCheckoutTypeOfUser(this._renderer);
    });
    this.subscriber = this._deviceDataService.sharedDeliveryType$.subscribe(data => {
      if (data) {
        this.getDeliveryType(data);
      }
    });
    this._estoreAnalyticsService.SetCategoryTwoForAdobeDataLayer(this._renderer);
  }
  init() {
    this.loading = true;
    if (typeof window !== 'undefined') {
      if (sessionStorage && sessionStorage.getItem("UserInfo") != null) {
        this.userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      }
      if (sessionStorage && sessionStorage.getItem("OLD_GUEST_USER")) {
        this.OldGuestUser = sessionStorage.getItem("OLD_GUEST_USER");
      }
      if (sessionStorage && sessionStorage.getItem("GuestInfo") != null) {
        this.guestInformation = JSON.parse(sessionStorage.getItem("GuestInfo"));
      }
    }
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem('CAorderId') &&
        sessionStorage.getItem('CAorderId') !== null && sessionStorage.getItem('secretKey') &&
        sessionStorage.getItem('secretKey') !== null) {
        const orderId = sessionStorage.getItem('CAorderId');
        const orderSecret = sessionStorage.getItem('secretKey');
         this.apiUrl = "/rest/V1/cartmine?order_id=" + orderId + "&order_secret=" + orderSecret;
      }
    this.checkoutService.Find(this.apiUrl).subscribe(
      (response: any) => {
        if (response && response[0] && response[0].status === false &&
           (response[0].message === "SESSION IN VALID" || response[0].message === "SESSION INVALID")) {
          this.sessionInvalid = true;       // session invalid error
          this.loading = false;
          return false;
        }
        if (sessionStorage && sessionStorage.getItem("OLD_GUEST_USER") === "YES") {
          this.showGuestNoticification = true;
          this.IsExistingGuest = {};
          this.IsExistingGuest.content = "Hey! we noticed you’re a returning customer, and we have your basic information."
            + " To update your details, please contact 1111.";
          this.IsExistingGuest.color = "7D7D7D";
        } else {
          this.showGuestNoticification = false;
          this.IsExistingGuest = null;
        }
        if (response[0]) {
        this.checkoutData = response[0];
        if (this.checkoutData.customerOtherInfo && this.checkoutData.customer) {
          // Personal details.
          this.personalDetails = {
            displaySalutation: this.salutaion(),
            displayFirstname: this.checkoutData.customer.firstname,
            displayLastname: this.checkoutData.customer.lastname,
            displayFullname: this.checkoutData.customerOtherInfo.customer_full_name || this.userInfo.outputCPResp.name,
            displayUnitnum: this.checkoutData.customerOtherInfo.unit_number,
            displayContactNumber: this.PhoneNumber(),
            displayEmail: this.mailId()
          };
        }
        if (this.checkoutData && this.checkoutData.billing_address) {
          this.billingAddress = this.checkoutData.billing_address;
          this._deviceDataService.publishBillingAddress(this.billingAddress);
        }

        if (this.checkoutData && this.checkoutData.shipping_address) {
          this.shippingAddress = this.checkoutData.shipping_address;
        }
        // get customer retrieval data from localstorage if no data came from magento.
        if (!this.billingAddress) {
          this.billingAddress = this.getCustomerRetrievalAddress();
        }
        if (!this.shippingAddress) {
          this.shippingAddress = this.getCustomerRetrievalAddress();
        }
        this.customerInputMissingData();
        this.loading = false;
        }
      },
      (errorResponse: any) => {
        this.loading = false;
        if (typeof window !== 'undefined') {
          if (!errorResponse.error.success) {
            this.sessionInvalid = true;
          }
        }
      });

    /* Added for Guest order summary personal info notification */

  }

  public getDeliveryType(data) {
    if (data === 'standardDelivery') {
      this.deliveryType = 'Standard Delivery';
    } else if (data === 'midnightDelivery') {
      this.deliveryType = 'Midnight Delivery';
    }
  }

  public editAddress() {
    this.editBilling = true;
    this._deviceDataService.publishEditBilling(this.editBilling);
    this.addr = this.addr || this.billingAddress.billing_unit_number;
    this.addrline1 = this.addrline1 || this.billingAddress.address_line_1;
    this.addrline2 = this.addrline2 || this.billingAddress.address_line_2;
    this.posCod = this.posCod || this.billingAddress.postcode;
    this.ciy = this.ciy || this.billingAddress.city;
    this.stat = this.stat || this.billingAddress.region_id;
  }

  public customerInputMissingData() {
    if (typeof window !== 'undefined' && localStorage && sessionStorage) {
      if (((sessionStorage.getItem("UserInfo") && !["GUEST", "ENTERPRISE"].includes(sessionStorage.getItem("USER_TYPE")))
          || (sessionStorage.getItem("GuestInfo") && sessionStorage.getItem("OLD_GUEST_USER") === "YES"))
          && sessionStorage.getItem("UserToken")) {
          const userData = sessionStorage.getItem("GuestInfo") || sessionStorage.getItem("UserInfo");
          const userInfo = JSON.parse(userData);
        if (!userInfo.outputCPResp.contactEmail || userInfo.outputCPResp.contactEmail === null ||
          userInfo.outputCPResp.contactEmail === '' || !userInfo.outputCPResp.contactSalutation ||
          userInfo.outputCPResp.contactSalutation === null || userInfo.outputCPResp.contactSalutation === '') {
          this.emailRetrieval = true;
        }
      }
    }
  }

  public disableProceed(data) {
    this.disable = data;
  }

  public redirectAfterUpdate() {
    window.location.href = this.redirectURL;
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
  onSubmit(billingform) {
    if (billingform.form && billingform.form.valid) {
      console.log('form submitted');
    } else {
      this.validateAllFormFields(billingform.form);
      setTimeout(() => {
        if (document.getElementsByClassName('error').length > 0) {
          this.scrollToError(document.getElementsByClassName('error')[0]);
          return;
        }
      }, 0);

    }
    if (billingform.invalid) {
      return;
    }
    let billingSalutation;
    if (this.checkoutData && this.checkoutData.customerOtherInfo && this.checkoutData.customerOtherInfo.salutation) {
      billingSalutation = this.checkoutData.customerOtherInfo.salutation;
    } else {
      if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.salutation) {
        billingSalutation = this.userInfo.outputCPResp.salutation;
      } else {
        billingSalutation = "";
      }
    }
    let msisdnNumber  = "";
    if (this.userservice.isMCUser() && localStorage && localStorage.getItem("MyMsIsdn")) {
      msisdnNumber = localStorage.getItem("MyMsIsdn");
    }
    // checkout delivery type
    const request = {
      "data": {
        "fname": this.checkoutData.customer.firstname,
        "cart_id": this.checkoutData.id ? this.checkoutData.id : "",
        "lname": this.checkoutData.customer.lastname,
        "customerId": this.checkoutData.customer.id,
        "id": "",
        "postCode": billingform.value.postalCode || this.checkoutData.shipping_address.postcode,
        "stateId": billingform.value.state || this.checkoutData.shipping_address.region_id,
        "city": billingform.value.city || this.checkoutData.shipping_address.city,
        "address_line_2": billingform.value.addressLine2,
        "address_line_1": billingform.value.addressLine1 || this.checkoutData.shipping_address.address_line_1,
        "phone": this.checkoutData.customerOtherInfo.mobile_number,
        "delivery_type": this.checkoutData.delivery_type.value,
        "unit_no": billingform.value.address || this.checkoutData.shipping_address.shipping_unit_number,
        "salutation": billingSalutation,
        "msisdnNumber": msisdnNumber,
        "is_shipping": false
      }
    };
    this.service.postEstoreUserData(this.billingurl, request).subscribe(
      (resp: any) => {
        if (this.userservice.isMCUser()) {
          this.userInfo.outputCPResp.unitNo = billingform.value.address;
          this.userInfo.outputCPResp.streetAddress = billingform.value.addressLine1 + " " + billingform.value.addressLine2;
          this.userInfo.outputCPResp.postalCode = billingform.value.postalCode;
          this.userInfo.outputCPResp.city = billingform.value.city;
          for (let a = 0; a < this.states.available_regions.length; a++) {
            if (billingform.value.state === this.states.available_regions[a].id) {
            this.userInfo.outputCPResp.state = this.states.available_regions[a].name;
            }
          }
          sessionStorage.setItem("UserInfo", JSON.stringify(this.userInfo));
        }
        this.redirectAfterUpdate();
      }, (errorResp: any) => {
        if (typeof window !== 'undefined') {
          if (!errorResp.error.success) {
            this.sessionInvalid = true;
          }
        }
      });
  }

  public PhoneNumber() {
    if (this.checkoutData && this.checkoutData.customerOtherInfo && this.checkoutData.customerOtherInfo.mobile_number &&
      this.checkoutData.customerOtherInfo.mobile_number !== null) {
      return this.personalDetails.displayContactNumber = this.checkoutData.customerOtherInfo.mobile_number;
    } else if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.contactMobileNum &&
      this.userInfo.outputCPResp.contactMobileNum !== null) {
      return this.personalDetails.displayContactNumber = this.userInfo.outputCPResp.contactMobileNum;
    } else if (localStorage && localStorage.getItem("MyMsIsdn")) {
      return this.personalDetails.displayContactNumber = localStorage.getItem("MyMsIsdn");
    } else if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.newGuestPhNo &&
      this.userInfo.outputCPResp.newGuestPhNo !== null) {
      return this.personalDetails.displayContactNumber = this.userInfo.outputCPResp.newGuestPhNo;
    } else {
      return this.personalDetails.displayContactNumber = "";
    }
  }

  public mailId() {
    if (this.userInfo && this.userInfo.outputCPResp && this.userInfo.outputCPResp.contactEmail &&
      this.userInfo.outputCPResp.contactEmail !== null) {
      return this.personalDetails.displayEmail = this.userInfo.outputCPResp.contactEmail;
    } else if (sessionStorage && ['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE")) && this.checkoutData &&
      this.checkoutData.customer && this.checkoutData.customer.email) {
      return this.personalDetails.displayEmail = this.checkoutData.customer.email;
    }
  }

  public salutaion() {
    if (localStorage && localStorage.getItem("MyMsIsdn") && this.userInfo && this.userInfo.outputCPResp &&
      this.userInfo.outputCPResp.contactSalutation && this.userInfo.outputCPResp.contactSalutation !== null &&
       this.userInfo.outputCPResp.contactSalutation !== '') {
      return this.personalDetails.displaySalutation = this.userInfo.outputCPResp.contactSalutation;
    } else if (sessionStorage && ['GUEST', 'ENTERPRISE'].includes(sessionStorage.getItem("USER_TYPE")) && this.checkoutData &&
      this.checkoutData.customerOtherInfo && this.checkoutData.customerOtherInfo.salutation) {
      return this.personalDetails.displaySalutation = this.checkoutData.customerOtherInfo.salutation;
    }
  }

  public addressUnitValidation(ev) {
    const k = ev.keyCode || ev.which;
    const unitChar = String.fromCharCode(k);
    const y = ev.charCode;
    if ((k > 64 && k < 91) || (k >= 48 && k <= 57) || (k > 96 && k < 123) ||
    unitChar === "&" || unitChar === "#" || unitChar === "." || unitChar === "-" || unitChar === "," ||
    unitChar === "/" || k === 8 || k === 16 || k === 13 || k === 17 || k === 32 || k === 0 || y === 0) {
      return true;
    } else {
      return false;
    }
  }

  public postalCodeValidation(ev) {
    const postalkey = ev.keyCode || ev.which;
    const z = ev.charCode;
    if ((postalkey > 47 && postalkey < 58) || postalkey === 8 || postalkey === 0 || postalkey === 13 ||
     postalkey === 16 || postalkey === 17 || z === 0) {
      return true;
    } else {
      return false;
    }
  }

  public cityValidation(ev) {
    const editkey = ev.keyCode || ev.which;
    const z = ev.charCode;
    if ((editkey > 64 && editkey < 91) || (editkey > 96 && editkey < 123) ||
    editkey === 8 || editkey === 0 || editkey === 13 || editkey === 16 ||
     editkey === 17 || editkey === 32 || z === 0) {
      return true;
    } else {
      return false;
    }
  }

 getCustomerRetrievalAddress() {
    const CustomerRetrievalAddress = {
      street: [
        this.userInfo.outputCPResp.streetAddress
      ],
      city: this.userInfo.outputCPResp.city,
      postcode: this.userInfo.outputCPResp.postalCode,
      region: {
        region: this.userInfo.outputCPResp.state
      },
      country_id: this.userInfo.outputCPResp.country,
      // telephone: this.userInfo.outputCPResp.services[0]["mobileNumber"],
      custom_attributes: [
        {
          value: "",
        }
      ],
      residence_type: this.userInfo.outputCPResp.addressYType
    };
    return CustomerRetrievalAddress;
  }
}
