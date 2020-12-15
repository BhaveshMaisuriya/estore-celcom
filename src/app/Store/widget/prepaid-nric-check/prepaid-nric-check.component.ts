import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from 'app/Service/user.service';
import {DeviceDataService} from 'app/Service/devicedata.service';
import {CommonUtilService} from 'app/Service/commonUtil.service';
import {BaseComponent} from "../../../base.component";
import {OrderInfoService} from '../../../Service/orderinfo.service';
import {PrepaidService} from 'app/Store/plan/prepaid/prepaid.service';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {iSelectOptions} from 'app/shared/components/forms/estore-input/estore-input.component';
import {typeOfPurchaseEnum} from "../../../Widget/side-summary/side-summary-container/type-of-purchase.store";
import { TypeofPurchaseService } from "../../../Service/type-of-purchase.service";

@Component({
  selector: "app-prepaid-nric-check",
  templateUrl: "./prepaid-nric-check.component.html",
  styleUrls: ["./prepaid-nric-check.component.scss"],
  providers: [OrderInfoService, UserService]
})
export class PrepaidNricCheckComponent extends BaseComponent implements OnInit {
  @Input() typeOfPurchase: typeOfPurchaseEnum = typeOfPurchaseEnum.newline;

  @Output() passCustToken = new EventEmitter();
  @Output() checkPrepaidBtn = new EventEmitter<boolean>();
  @Output() succesfulLogin = new EventEmitter();
  @Output() isMCUser = new EventEmitter();
  @Output() passPrePaidNRICSts = new EventEmitter<any>();

  typeOfPurchaseOptions = typeOfPurchaseEnum;

  public apiError = false;
  public showPersonalDetailsForm = false;
  public showLayOut = false;
  public showEligible = false;
  public chkElgbBtn = false;
  public resetBtn = false;
  public loading = false;
  public errMsg: string;
  public nricInputBorderSuccess = false;
  public nricInputBorderFailed = false;
  public customMessage = false;
  public customMsg: string;

  idTypeOptions: iSelectOptions[] = [
    {value: '', label: 'Select ID Type', isNone: true},
    {value: 'MyKad', label: 'MyKad'},
    {value: 'Passport', label: 'Passport'},
    {value: 'MyTentera', label: 'MyTentera'},
    {value: 'MyKas', label: 'MyKas'},
    {value: 'MyPR', label: 'MyPR'},
    {value: 'iKad', label: 'iKad'},
  ];

  errorExits = false;
  errorMessage: Object;

  nricForm: FormGroup;
  public idType: "nric" | "Passport" = "nric";

  constructor(
    private _userService: UserService,
    private _deviceDataService: DeviceDataService,
    private _commonUtilService: CommonUtilService,
    private _prePaidNricService: PrepaidService,
    private _commonUtil: CommonUtilService,
    private _topService: TypeofPurchaseService,
  ) {
    super();
    this.errorMessage = {
      message: this.errorConst.SYS_DOWN_MSG,
      invalidId: "Invalid ID"
    };

    this.nricForm =  new FormGroup({
      idNumber: new FormControl('', [
        Validators.required,

      ]),
      idType: new FormControl('', Validators.required),
      phone: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.chkElgbBtn = true;
    this.showPersonalDetailsForm = false;

    if (this.typeOfPurchase === typeOfPurchaseEnum.mnp) {
      this.nricForm.get('phone').setValidators([Validators.required])
    }
    this.nricForm.get('idType').valueChanges.subscribe(val => {
      this.onTypeChanges(val);
    })
  }
  onSubmit() {
    this.getUserTypeByNRIC();
  }

  getUserTypeByNRIC(): void {
    this.loading = true;
    const request = {
      "data": {
        "idType": this.nricForm.controls.idType.value,
        "idNumber": this.nricForm.controls.idNumber.value,
      }
    };
    this._prePaidNricService.checkPrepaidNRIC(request).subscribe(
      (response: any) => {
        this.loading = false;
        if (response && response[0].status) {
          this._userService.doGuestLogin(response, this.nricForm.controls.idNumber.value);
          this._deviceDataService.publishLoggerInUserName('GUEST');
          this.succesfulLogin.emit(true);
          this.showEligible = true;
          this.chkElgbBtn = false;
          this.nricInputBorderSuccess = true;
          this.nricInputBorderFailed = false;
          this.showPersonalDetailsForm = true;
          if (this.showPersonalDetailsForm) {
            this.passPrePaidNRICSts.emit({
              personalDetailsForm: this.showPersonalDetailsForm,
              validationID: response[0].validation_id,
              custId: response[0].user_info.customerId,
              respToken: response[0].token,
              idType:  this.nricForm.controls.idType.value,
              idNumber:  this.nricForm.controls.idNumber.value,
              isNewLineEligible: true
            });
          }
          this._topService.updateNewLineCompleted(true);
        } else {
          this.loading = false;
          this.nricInputBorderFailed = true;
          this.nricInputBorderSuccess = false;
          this.onRespError(response[0]);
          this.nricForm.controls.idNumber.setErrors({
            custom: response[0].message
          })
          this.errMsg = response[0].message;
          this.chkElgbBtn = true;
          this._topService.updateNewLineCompleted(false);
        }
      },
      (error: any) => {
        this.onApiError();
      }
    );
  }

  onRespError(err: any) {
    this.loading = false;
    this.resetBtn = true;
    this.chkElgbBtn = false;
    this.errorExits = true;
    this.apiError = false;
    this.errorMessage = {
      message: err.message ? err.message : this.errorConst.SYS_DOWN_MSG
    };
  }

  onApiError(res?: any) {
    this.loading = true;
    this.errorExits = true;
    this.apiError = true;
    if (res && res.message) {
      this.errorMessage = {
        message: res.message
      };
    } else {
      this.errorMessage = {
        message: this.errorConst.SYS_DOWN_MSG
      };
    }
  }

  restrictOnlyNum = (ev) => {
    return this._commonUtilService.restrictOnlyNum(ev, "nric", this.nricForm.controls.idNumber?.value ?? '');
  }

  public validateNRIC(control: AbstractControl) {
    const value = (control.value + '').trim();
    const pattern = /^[0-9]*$/;
    let valid = true;
    if (value.length !== 12 || !pattern.test(value))
      valid = false
    const { error, message } = this._commonUtilService.validationForIdType(1, value);
    control.setErrors({
      custom: message
    });
    this.errMsg = message;
    if (!valid || error) {
      return {
        invalid: true
      }
    }

    return null;
  }

  onTypeChanges(value) {
    this.nricForm.get('idNumber').setValue('');

    switch (value) {
      case "iKad":
      case "Passport":
        this.idType = "Passport";
        this.nricForm.get('idNumber').setValidators([
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
          Validators.minLength(6),
          Validators.maxLength(20)
        ]);
        break;
      case "MyTentera":
        this.idType = "nric";
        this.nricForm.get('idNumber').setValidators([
          Validators.required,
          Validators.maxLength(12)
        ]);
        break;
      case "Initial":
      case "MyKad":
      case "MyKas":
      case "MyPR":
        this.idType = "nric";
        this.nricForm.get('idNumber').setValidators([
          Validators.required,
          this.validateNRIC.bind(this)
        ]);
        break;
      default:
        break;
    }
    this.nricForm.get('idNumber').updateValueAndValidity();
  }
}
