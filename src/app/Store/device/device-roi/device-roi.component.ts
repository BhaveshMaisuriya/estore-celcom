import { Component, OnInit, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { UserService } from '../../../Service/user.service';
import { AppService } from '../../../Service/app.service';
import { DeviceRoiService } from './device-roi.service';
import { BaseComponent } from '../../../base.component';
import { Subscription } from 'rxjs';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-device-roi',
  templateUrl: './device-roi.component.html',
  styleUrls: ['./device-roi.component.css'],
  providers: [DeviceRoiService]
})
export class DeviceRoiComponent extends BaseComponent implements OnInit, AfterViewInit {
  public customMessageforNRIC;
  public customMsgForNRIC;
  public maxlength;
  public mobNumber;
  public invalidMobileNumber: boolean;
  public roiForm: any;
  valuedata: string;
  public customerID;
  public customerSelectedDetails: any;
  public selectedColor;
  public deviceColorSet;
  public deviceModelSet = new Set();
  public deviceColorMap = new Map();
  public isDisplayFormSubmissionPopup = false;
  public formSubmitted = false;
  public fieldDataResponse: any;
  public errorOnSubmitMessage: any;
  public errorOnSubmit = false;
  public isErrorToaster = false;
  public errorToasterInfo: any;
  public initializeDetailBannerLeft = false;
  public infoForDetailBannerTextLeft: any;
  public subscriber: Subscription;
  public formInvalid = false;
  public apiError = false;
  public noOfQuery = 0;
  public selectedQuery = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _router: Router,
    private _deviceRoiService: DeviceRoiService,
    private _deviceDataService: DeviceDataService

  ) {
    super();
  }

  ngOnInit() {
    let deviceId;
    this._activatedRoute.params.subscribe(params => deviceId = params["deviceId"]);
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.errorOnSubmit = data));
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.isErrorToaster = data));
    this.Init(deviceId);
  }
  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }
  Init(deviceId: string) {
    this.getFieldDetailsOnPageLoad(deviceId);
  }
  getFieldDetailsOnPageLoad(deviceId: any) {
    const url = "/rest/V1/roi-details/" + deviceId;
    this._deviceRoiService.FindFormData(url).subscribe(
      (res: any) => {
       if (res && res[0] && res[0].status === false) {
          this.errorOnApiFor404();
        } else {
          this.successfulResponseFromGetRequest(res);
        }
      },
      err => {
        this.errorOnApiFor404();
      });
  }
  successfulResponseFromGetRequest(response: any) {
    this.fieldDataResponse = response[0];
   this.noOfQuery = this.fieldDataResponse.query_option.length;
    this.ColorandStorageInfoOftheDevice(this.fieldDataResponse);
  }
  errorOnApiFor404() {
    this.apiError = true;
    this.isErrorToaster = true;
    this.errorToasterInfo = {
      content: this.errorConst.SYS_DOWN_MSG
    };
    this.initializeDetailBannerLeft = true;
    this.infoForDetailBannerTextLeft = { "Name": "Device not found", "Api": this.API_URL_CONST.PAGE_NOT_FOUND_URL };
  }
  onSubmit(form) {
    this.roiForm = form.value;
    if (form.invalid) {
      this.formInvalid = true;
      return;
    }
    this.customerSelectedDetails = {};
    this.customerSelectedDetails.name = this.roiForm.name;
    this.customerSelectedDetails.email = this.roiForm.contactEmail;
    this.customerSelectedDetails.customerID = this.roiForm.customerID;
    this.customerSelectedDetails.mobileNumber = this.roiForm.contactMobileNum;
    this.customerSelectedDetails.selectedModel = this.roiForm.model;
    this.customerSelectedDetails.selectedStorage = this.roiForm.storage;
    this.customerSelectedDetails.selectedColor = this.roiForm.color;
    this.questionairesResponse(this.roiForm);
    this.postFieldDataToMagento();
  }
  questionairesResponse(form: any) {
    this.selectedQuery = [];
    for (let i = 0; i < this.noOfQuery; i++) {
      this.selectedQuery.push({
        "question": this.fieldDataResponse.query_option ? this.fieldDataResponse.query_option[i].question : "",
        "answer": form[i]
      });
    }
  }
  validationForNRIC(identity_value) {
    this.customMessageforNRIC = false;
    const customerIDValue = identity_value;
    if (customerIDValue === "") {
      this.formInvalid = true;
      this.customMessageforNRIC = true;
      this.customMsgForNRIC = "Please enter a value";
      return this.customMsgForNRIC;
    }

    let patternString = /^\d+$/;
    if (!patternString.test(customerIDValue)) {
      this.formInvalid = true;
      this.customMsgForNRIC = "Please enter digits only";
      this.customMessageforNRIC = true;
      return this.customMsgForNRIC;
    }

    patternString = /^[0-9]{12}$/;
    if (!patternString.test(customerIDValue)) {
      this.formInvalid = true;
      this.maxlength = 12;
      this.customMessageforNRIC = true;
      this.customMsgForNRIC = "Please enter a valid New NRIC ID of 12 digit";
      return this.customMsgForNRIC;
    }

    if (customerIDValue.length === 12) {
      const DOB = customerIDValue.slice(0, 6);
      const month: any = customerIDValue.slice(2, 4);
      const day: any = customerIDValue.slice(4, 6);
      const year: any = customerIDValue.slice(0, 2);
      const fullDateOfBirth = new Date(year, month - 1, day);
      const monthLength = ((fullDateOfBirth.getMonth() + 1).toString().length < 2);
      const dateLength = (fullDateOfBirth.getDate().toString().length < 2);
      const convertedMon = monthLength ?
        ("0" + (fullDateOfBirth.getMonth() + 1).toString()) : (fullDateOfBirth.getMonth() + 1).toString();
      const convertedDay = dateLength ? ("0" + fullDateOfBirth.getDate().toString()) : fullDateOfBirth.getDate().toString();
      const convertedDateOfBirth = "" + fullDateOfBirth.getFullYear().toString().slice(2, 4) + convertedMon + convertedDay;
      if (DOB !== convertedDateOfBirth) {
        this.formInvalid = true;
        this.customMessageforNRIC = true;
        this.customMsgForNRIC = "Please enter a valid New NRIC ID of 12 digit";
        return this.customMsgForNRIC;
      } else {
        this.formInvalid = false;
        this.customMessageforNRIC = false;
        return 0;
      }
    }
  }
  public MobileNumberValidation() {
    if (this.mobNumber.length === 0) {
      this.invalidMobileNumber = false;
    } else {
      const patternMSISDN = /^[0-9]*$/;
      if (!patternMSISDN.test(this.mobNumber)) {
        this.formInvalid = true;
        this.invalidMobileNumber = true;
      } else {
        const resultData = this.mobNumber.charAt(0);
        if (resultData === '6') {
          if (this.mobNumber.length < 11 || this.mobNumber.length > 12) {
            this.invalidMobileNumber = true;
            this.formInvalid = true;
          } else {
            this.invalidMobileNumber = false;
            this.formInvalid = false;
          }
        } else if (resultData === '0') {
          if (this.mobNumber.length < 10 || this.mobNumber.length > 11) {
            this.invalidMobileNumber = true;
            this.formInvalid = true;
          } else {
            this.invalidMobileNumber = false;
            this.formInvalid = false;
          }
        } else if (resultData !== '0' && resultData !== '6') {
          this.invalidMobileNumber = true;
          this.formInvalid = true;
        } else {
          this.invalidMobileNumber = false;
          this.formInvalid = false;
        }
      }
    }
  }
  public OnContinue() {
    const self = this;
    setTimeout(function () {
      self.isDisplayFormSubmissionPopup = false;
    }, 0);
  }

  ColorandStorageInfoOftheDevice(res: any) {
    let tempSet = new Set();

    res.associated_products.forEach(simpleDevice1 => {
      this.deviceModelSet.add(simpleDevice1.model);

      if (this.deviceColorMap.has(simpleDevice1.model)) {
        tempSet = this.deviceColorMap.get(simpleDevice1.model);
        tempSet.add(simpleDevice1.color);

        this.deviceColorMap.set(simpleDevice1.model, tempSet);
      } else {
        tempSet = new Set();
        tempSet.add(simpleDevice1.color);

        this.deviceColorMap.set(simpleDevice1.model, tempSet);
      }
    });
  }

  postFieldDataToMagento() {
    const apiURL = "/rest/V1/submit-roi-details";
    const requestBody = this.requestBodyForSubmit();
    this._deviceRoiService.PostFormData(apiURL, requestBody).subscribe(
      (res: any) => {
        if (res && res[0] && res[0].status === true) {
          this.successfulResponseOnPostRequest(res);
        } else {
          this.errorOnPostRequest();
        }
      }, (err: any) => {
        this.errorOnPostRequest(err);
      }
    );
  }
  successfulResponseOnPostRequest(response: any) {
    this.formSubmitted = true;
    this.isDisplayFormSubmissionPopup = true;
  }
  errorOnPostRequest(error: any = {}) {
    this.errorOnSubmit = true;
    this.errorOnSubmitMessage = {};
    this.errorOnSubmitMessage.content = "Sorry for the inconvenience, we're giving our system a little update. Please try again later.";
  }
  requestBodyForSubmit() {
    this.customerSelectedDetails.simpleSku = this.getsimpleSkuOfDevice();
    const data = {
      "data": {
        "sku": this.fieldDataResponse.sku,
        "name": this.customerSelectedDetails.name,
        "email": this.customerSelectedDetails.email,
        "nric_number": this.customerSelectedDetails.customerID,
        "mobile_number": this.customerSelectedDetails.mobileNumber,
        "image_path": this.fieldDataResponse.image,
        "associated_product_sku": this.customerSelectedDetails.simpleSku,
        "selected_query": this.selectedQuery
      }
    };
    return data;
  }
  getsimpleSkuOfDevice() {
    let simpleSku = '';
    this.fieldDataResponse.associated_products.forEach(simpleDevice => {
      if (simpleDevice.color === this.customerSelectedDetails.selectedColor &&
        simpleDevice.model === this.customerSelectedDetails.selectedModel) {
        simpleSku = simpleDevice.sku;
      }
    });
    return simpleSku;
  }

  @ViewChild('color') color: NgModel;
  @ViewChild('storage') storage: NgModel;

  onChangeModel(model: string) {
    this.color.reset('');
    this.deviceColorSet = this.deviceColorMap.get(model);
  }
}

