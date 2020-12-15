import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { AppService } from "../../../Service/app.service";
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { emailRegex } from '../../../shared/constants/application.constants';
import * as FormConst from "../../../../constants/form.constants";
import * as helper from '../../../shared/utilities/helper.ultility';
import { FORM_VALIDATION_PATTERN, FORM_VALIDATION_ERROR, FORM_REQUIRED_ERROR } from '../../../shared/constants/form.constants';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  @Input() idDetails;

  personalDetails: FormGroup;
  states = [];
  modelLabels = FormConst;
  maxLengthId = 12;
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

  salutationOptions = [
    {value: '', label: 'Select a salutation', isNone: true},
    {value: 'Mr', label: 'Mr'},
    {value: 'Ms', label: 'Ms'},
    {value: 'Mrs', label: 'Mrs'},
    {value: 'Dr', label: 'Dr'},
  ];

  idTypeOptions = [
    {value: '', label: 'Select ID Type', isNone: true},
    {value: 'MyKad', label: 'MyKad'},
    {value: 'Passport', label: 'Passport'},
    {value: 'MyTentera', label: 'MyTentera'},
    {value: 'MyKas', label: 'MyKas'},
    {value: 'MyPR', label: 'MyPR'},
    {value: 'iKad', label: 'iKad'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private _commonUtilService: CommonUtilService,
    private _service: AppService) { }

  ngOnInit(): void {
    this._service.getEstoreData("/rest/V1/directory/countries/MY")
      .subscribe((response: any) => {
      this.states = [
        {value: '', label: 'Select a State', isNone: true},
        ...response.available_regions?.map(state => ({
          value: state,
          label: state.name,
        }))
      ];
    });
    this.personalDetails = this.formBuilder.group({
      salutation: [
        '',
        [
          Validators.required,
        ]
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/([a-zA-Z]+\s?\b){2,50}/),
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(emailRegex),
        ],
      ],
      idType: [
        '',
        [
          Validators.required,
        ]
      ],
      idNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(FORM_VALIDATION_PATTERN.nric),
        ]
      ],
      primaryNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(FORM_VALIDATION_PATTERN.phone),
        ]
      ],
      secondaryNumber: [
        '',
        [
          Validators.pattern(FORM_VALIDATION_PATTERN.phone),
        ]
      ],
      building: [
        '',
        [
          Validators.required,
          Validators.pattern(FORM_VALIDATION_PATTERN.address),
        ]
      ],
      addressOne: [
        '',
        [
          Validators.required,
          Validators.pattern(/[a-zA-Z\s]+/),
        ]
      ],
      addressTwo: [
        '',
        [
          Validators.required,
          Validators.pattern(/[a-zA-Z\s]+/),
        ]
      ],
      postCode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
        ]
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.pattern(/[a-zA-Z\s]+/)
        ]
      ],
      state: [
        '',
        [
          Validators.required,
        ]
      ],
    });
    
    if(this.idDetails?.idType){
      this.personalDetails.get('idType').setValue(this.idDetails.idType);
      this.personalDetails.get('idNumber').setValue(this.idDetails.idNumber);
      this.personalDetails.get('idType').disable();
      this.personalDetails.get('idNumber').disable(); 
    }
    this.personalDetails.get('idType').valueChanges.subscribe(val => {
      this.onTypeChanges();
    });
  }

  addressUnitValidation = (event) => helper.addressValidationHelper(event);
  postalCodeValidation = (event) => helper.postalCodeValidationHelper(event);
  cityValidation = (event) => helper.cityValidationHelper(event);

  get salutationControl() {
    return this.personalDetails.get('salutation');
  }

  get nameControl() {
    return this.personalDetails.get('name');
  }

  get emailControl() {
    return this.personalDetails.get('email');
  }

  get genderControl() {
    return this.personalDetails.get('gender');
  }

  get primaryNumberControl() {
    return this.personalDetails.get('primaryNumber');
  }

  get secondaryNumberControl() {
    return this.personalDetails.get('secondaryNumber');
  }

  get contactMethodControl() {
    return this.personalDetails.get('contactMethod');
  }

  get idNumberControl() {
    return this.personalDetails.get('idNumber');
  }

  get idTypeControl() {
    return this.personalDetails.get('idType');
  }

  get buildingControl() {
    return this.personalDetails.get('building');
  }

  get addressOneControl() {
    return this.personalDetails.get('addressOne');
  }

  get addressTwoControl() {
    return this.personalDetails.get('addressTwo');
  }

  get postCodeControl() {
    return this.personalDetails.get('postCode');
  }

  get cityControl() {
    return this.personalDetails.get('city');
  }

  get stateControl() {
    return this.personalDetails.get('state');
  }

  public validateNRIC(control: AbstractControl) {
    const value = (control.value + '').trim();
    const pattern = /^[0-9]*$/;
    let valid = true;
    if (value.length !== 12 || !pattern.test(value))
      valid = false
    const { error } = this._commonUtilService.validationForIdType(1, value);
    if (!valid || error) {
      return {
        invalid: true
      }
    }

    return null;
  }

  onTypeChanges() {
    this.personalDetails.get('idNumber').setValue('');
    let value = this.personalDetails.get('idType').value;
    if(value === "Passport") {
      this.maxLengthId = 20;
    } else {
      this.maxLengthId = 12;
    }
    switch (value) {
      case "iKad":
      case "Passport":
        this.personalDetails.get('idNumber').setValidators([
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
          Validators.minLength(6),
          Validators.maxLength(20)
        ]);
        break;
      case "MyTentera":
        this.personalDetails.get('idNumber').setValidators([
          Validators.required,
          Validators.maxLength(12)
        ]);
        break;
      case "Initial":
      case "MyKad":
      case "MyKas":
      case "MyPR":
        this.personalDetails.get('idNumber').setValidators([
          Validators.required,
          this.validateNRIC.bind(this)
        ]);
        break;
      default:
        break;
    }
    this.personalDetails.get('idNumber').updateValueAndValidity();
  }

  restrictBasedOnType(ev) {
    let type = this.idTypeControl.value;
    let idNumber = this.idNumberControl.value;
    switch (type) {
      case "MyTentera":
      case "Passport":
        return this._commonUtilService.restrictOnlyNum(ev, "tentera", idNumber ? idNumber.toString() : "");
        break;
      case "":
      case "MyKad":
      case "MyKas":
      case "MyPR":
      case "iKad":
        return this._commonUtilService.restrictOnlyNum(ev, "nric", idNumber ? idNumber.toString() : "");
        break;
      default:
        return this._commonUtilService.restrictOnlyNum(ev, "nric", idNumber ? idNumber.toString() : "");
        break;
    }
  }

  restrictPrimary(ev) {
    let primaryNumber = this.primaryNumberControl.value;
    return this._commonUtilService.restrictOnlyNum(ev, "contactMobileNum", primaryNumber ? primaryNumber.toString() : "");
  }

  restrictSecondary(ev) {
    let secondaryNumber = this.secondaryNumberControl.value;
    return this._commonUtilService.restrictOnlyNum(ev, "alternateMsisdn", secondaryNumber ? secondaryNumber.toString() : "");
  }

  MobileNumber(ev,numberType) {
    let value = '';
    if(numberType === "primary") {
      value = this.primaryNumberControl.value;
    } else {
      value = this.secondaryNumberControl.value;
    }
    if (value && value !== "") {
      const resultData = value.toString().charAt(0);
      value = (resultData !== '6') ? ("60" + value).substring(0,3) === "600" ? "6" + value : "60" + value : value;
    }

    if(numberType === "primary") {
      this.personalDetails.get('primaryNumber').setValue(value);
    } else {
      this.personalDetails.get('secondaryNumber').setValue(value);
    }
  }
}
