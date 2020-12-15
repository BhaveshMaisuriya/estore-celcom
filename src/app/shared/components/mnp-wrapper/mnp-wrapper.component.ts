import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MnpService } from '../../../Store/mnp/services/mnp.service';
import { PlansQuery } from '../../../Widget/side-summary/side-summary-container/plans.store';
import { iAPIResponse, iPlan, FIRST_BLUE_INTERNET } from '../../models/plan.model';
import { typeOfPurchaseEnum } from '../../../Widget/side-summary/side-summary-container/type-of-purchase.store';
import { iSupplementary, iMvivaCampaign } from '../../models/device.model';
import { TypeofPurchaseService } from '../../../Service/type-of-purchase.service';
import { ModalService } from '../modal/modal.service';
import { UserService } from 'app/Service/user.service';
import { FORM_VALIDATION_PATTERN } from 'app/shared/constants/form.constants';
import { untilDestroyed } from "../../services/until-destroyed.service";
import { Observable, combineLatest } from "rxjs";
import { iBasePlan } from "../../../Service/devicedata.service";
import {ILoginResponse} from "../../models/user.model";
import { SYS_DOWN_MSG } from "../../constants/error.constants";

export interface IOnMNPEligibleSuccessParams {
  idType: string;
  idNumber: string;
  response: ILoginResponse;
  phone: string;
  user: 'mc' | 'guest';
  msdin?: string;
  validation_id: string
}

@Component({
  selector: 'app-mnp-wrapper',
  templateUrl: './mnp-wrapper.component.html',
  styleUrls: ['./mnp-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MnpWrapperComponent implements OnInit, OnDestroy {

  @Input() type: "Postpaid" | "Prepaid" = "Postpaid";
  @Input() showPassport = false;
  @Output() onSuccessEligible = new EventEmitter<IOnMNPEligibleSuccessParams>();
  @Output() onMnpReset = new EventEmitter();

  isTermsAccepted: boolean = false;
  isEligible: boolean = false;
  portwithSuppLines: boolean = false;
  enableCheckout: boolean = false;
  public mnpForm: FormGroup = null;
  id_types = [
    {
      id: 1,
      value: 'New NRIC',
      label: 'New NRIC'
    }
  ];
  supplementaryLines: iSupplementary[];
  notes: string

  isPlanOnly$: Observable<boolean>;
  apiResponse$: Observable<iAPIResponse>;

  validation_id: string;
  typeOfPurchaseOptions = typeOfPurchaseEnum;
  selectedSuppLine: string;
  loading: boolean;
  isEnterpriseUser: boolean;
  formConstants = {
    phone: FORM_VALIDATION_PATTERN.phone,
    nric: FORM_VALIDATION_PATTERN.nric
  };
  mobileConnectUserShouldLogin: boolean;
  isLoggedIn: boolean;
  mnpData: { phone: string, nric: string };
  mvivaCampaign$: Observable<iMvivaCampaign>;
  private basePlan$: Observable<iBasePlan>;
  private plan$: Observable<iPlan>;

  data: {
    isPlanOnly: boolean;
    sku: string;
    mvivaCampaign: iMvivaCampaign;
  } = {
    isPlanOnly: false,
    sku: null,
    mvivaCampaign: null,
  };
  isFirstBlue:boolean = false;
  skipSupplementary = false;

  constructor(private _mnpService: MnpService, private _planQuery: PlansQuery,
    private _topService: TypeofPurchaseService,
    private _modalService: ModalService,
    private _userService: UserService) {}

  ngOnInit(): void {
    this.apiResponse$ = this._planQuery.select(s => s.api_response)
    this.basePlan$ = this._planQuery.select(s => s.base_plan)
    this.plan$ = this._planQuery.select(s => s.plan)
    this.isPlanOnly$ = this._planQuery.isPlanOnly$;

    this._topService.selectSupplementaryLines([]);
    this._topService.updateShareQuota(false);
    this._topService.selectMobileNumber(null);
    this._topService.updateMNPResponse([{ status: false, validated_id: '' }]);
    this.isEnterpriseUser = this._userService.isUserEnterprise();
    this.mvivaCampaign$ = this._planQuery.select(s => s.mviva_campaign);

    if (this.showPassport) {
      this.id_types.push({
        id: 4,
        value: 'Passport',
        label: 'Passport'
      });
    }

    this.subscribeForLocalVars();
    this.initializeForm();
  }

  ngOnDestroy() {  }

  subscribeForLocalVars() {
    combineLatest([
      this.isPlanOnly$,
      this.apiResponse$,
      this.basePlan$,
      this.plan$,
      this.mvivaCampaign$,
      this._planQuery.select(s => s.isStar),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([
        isPlanOnly,
        planApiResponse,
        basePlan,
        plan,
        mvivaCampaign,
        isStar,
      ]) => {
        let sku = null;
        let suppCount = null;
        let suppData = null;

        if (planApiResponse) {
          sku = planApiResponse.tabData?.sku || plan?.sku || basePlan?.sku;

          if (isPlanOnly) {
            suppData = basePlan?.supplementary_data?.[0]
            suppCount =  suppData?.max_line || "0";
          } else {
            suppData = planApiResponse?.items?.supplementary_details?.celcom_ultra_plan?.find(item => item.sku === sku);
            suppCount = suppData?.max_line || "0";
          }

          this.supplementaryLines = Array(Number(suppCount))
            .fill(0)
            .map((_, i) => ({
              planPhoneNumber: 'Line ' + (i + 1),
              planPrice: suppData.price,
              planType: 'Line ' + (i + 1),
              partNumber: suppData.part_number,
              isVerified: false,
              isDisabled: i !== 0
            }));
        } else {
          this.supplementaryLines = [];
        }

        this.data.sku = sku;
        this.data.mvivaCampaign = mvivaCampaign;
        this.data.isPlanOnly = isPlanOnly;

        this.skipSupplementary = !isStar;

      })
  }

  initializeForm() {
    this.mnpForm = new FormGroup(
      {
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern(this.formConstants.phone)
        ]),
        nric: new FormControl('', [
          Validators.required,
          Validators.pattern(this.formConstants.nric)
        ]),
        id_type: new FormControl('New NRIC', [
          Validators.required,
        ]),
        terms_and_conditions: new FormControl('', [
          Validators.required,
        ]),
      }
    );
    if (this.mnpData) {
      this.mnpForm.patchValue({ phone: this.mnpData.phone, nric: this.mnpData.nric });
      this.mnpData = undefined;
    }

    this.isLoggedIn = this._userService.isCustomer();
    if (this.isLoggedIn) {
      let nric = '';
      if (sessionStorage.getItem("UserInfo")) {
        nric = JSON.parse(sessionStorage.getItem("UserInfo"))?.outputCPResp?.customerID;
      } else if (sessionStorage.getItem("GuestInfo")) {
        if (JSON.parse(sessionStorage.getItem("GuestInfo"))?.blacklistChkRequest) {
          nric = JSON.parse(sessionStorage.getItem("GuestInfo")).blacklistChkRequest?.customerIDNo;
        } else if (JSON.parse(sessionStorage.getItem("GuestInfo"))?.outputCPResp) {
          nric = JSON.parse(sessionStorage.getItem("GuestInfo")).outputCPResp?.customerID;
        }
      }
      this.mnpForm.patchValue({ nric: nric });
    }
    this.mnpForm.get('id_type').valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(val => {
        this.onTypeChanges(val);
      })
  }

  onTypeChanges(val) {
    this.mnpForm.get('nric').setValue('');

    if (val === 'New NRIC') {
      this.mnpForm.get('nric').setValidators([
        Validators.required,
        Validators.pattern(FORM_VALIDATION_PATTERN.nric)
      ]);
    } else if (val === 'Passport') {
      this.mnpForm.get('nric').setValidators([
        Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
        Validators.minLength(6),
        Validators.maxLength(20)
      ]);
    }

    this.mnpForm.get('nric').updateValueAndValidity();
  }

  checkMnpEligibility() {
    let isDevice = 0;
    let csAgent = 0;
    let selectedId = 0;
    if (!this.data.isPlanOnly) {
      isDevice = 1;
    }
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("AgentInfo")) {
      csAgent = 1;
    }
    if (this.mnpForm.controls.id_type.value) {
      selectedId = this.id_types.find(type => type.value === this.mnpForm.controls.id_type.value).id;
    }
    let requestParams = 'msisdn_number=' + this.mnpForm.controls.phone.value +
      '&id_number=' + this.mnpForm.controls.nric.value +
      '&id_type=' + selectedId +
      '&sku=' + this.data.sku +
      '&bundle=' + isDevice +
      '&is_cs_agent=' + csAgent;
      if (this._planQuery.getValue()?.isFirstBluePlan) {
        this.isFirstBlue = true;
        requestParams = 'msisdn_number=' + this.mnpForm.controls.phone.value +
        '&id_number=' + this.mnpForm.controls.nric.value +
        '&id_type=' + selectedId +
        '&sku=' + FIRST_BLUE_INTERNET +
        '&bundle=' + isDevice +
        '&is_cs_agent=' + csAgent;
      }
    this.eligiblityCheck(requestParams, true);
  }

  eligiblityCheck(params, isPrincipalNumberCheck) {
    this.loading = true;
    this.mobileConnectUserShouldLogin = isPrincipalNumberCheck ? false : undefined;
    this._mnpService.eligibilityCheck(params).subscribe(
      (response: any) => {
        this.loading = false;
        this._topService.selectMobileNumber(this.mnpForm.controls.phone.value);
        if (isPrincipalNumberCheck) {
          if (response[0] && response[0].status) {
            this.validation_id = (response[0] && response[0].validation_id) ? response[0].validation_id : undefined;
            let isMobileConnectUser = response?.[0]?.response?.mobile_connect_user;
            if (this.isFirstBlue) {
              this.updateMnpInfo(true);
            }
            if (!this._userService.isCustomer()) {
              if (!isMobileConnectUser) {
                this.doGuestLogin(this.mnpForm.controls.nric.value, this.mnpForm.controls.id_type.value);
              } else {
                this.mobileConnectUserShouldLogin = true;
              }
            }
            if (sessionStorage.getItem("AgentInfo") && (!response[0].response || response[0].response === [] || isMobileConnectUser !== true) &&
              response[0].status !== true) {
              this.mnpForm.controls.phone.setErrors({ custom: 'Age Eligibility Error' });
            } else {
              if (this._userService.isCustomer()) {
                this.isEligible = true;
                let can_buy_supplementary_lines = true;
                if (this.data.mvivaCampaign) {
                  can_buy_supplementary_lines = this.data.mvivaCampaign.can_buy_supplementary_lines !== "0";
                }
                if (this.isEnterpriseUser || !can_buy_supplementary_lines) {
                  this.onClickPort('principalOnly');
                }
              }
              if (this.skipSupplementary) {
                this.onClickPort('principalOnly');
              }
            }
          } else {
            if (!response?.[0]?.message_id) {
              this.mnpForm.controls.phone.setErrors({ custom: response[0].message });
            } else {
              this._modalService.showError({ message: response[0].message });
            }
            this.updateMnpInfo(false);
          }
        } else {
          if (response[0] && response[0].status) {
            let selectedSuppLine = this.supplementaryLines.find(line => line.planPhoneNumber === this.selectedSuppLine);
            let selectedSuppLineIdx = this.supplementaryLines.indexOf(selectedSuppLine);
            this.supplementaryLines[selectedSuppLineIdx].number = this.mnpForm.controls[this.selectedSuppLine].value;
            this.supplementaryLines[selectedSuppLineIdx].isVerified = true;
            let nextLineIndex = selectedSuppLineIdx + 1;
            if (nextLineIndex < this.supplementaryLines.length) {
              if (this.supplementaryLines[nextLineIndex].isVerified) {
                nextLineIndex += 1;
              }
              if (nextLineIndex < this.supplementaryLines.length && !this.supplementaryLines[nextLineIndex].isVerified) {
                this.supplementaryLines[nextLineIndex].isDisabled = false;
                this.createSuppLines(this.supplementaryLines[nextLineIndex].planPhoneNumber);
              }
            }
            let verifiedItemIndex = this.supplementaryLines.findIndex((_line, idx) => _line.isVerified && idx > selectedSuppLineIdx);
            let nonVerifiedItemIndex = this.supplementaryLines.findIndex((_line, idx) => !_line.isVerified && idx > selectedSuppLineIdx);
            let status = nonVerifiedItemIndex === -1;
            if (!status) {
              status = verifiedItemIndex < nonVerifiedItemIndex;
            }
            this.updateMnpInfo(status);
          } else {
            if (!response?.[0]?.message_id) {
              this.mnpForm.controls[this.selectedSuppLine].setErrors({ custom: response[0].message });
            } else {
              this._modalService.showError({ message: response[0].message });
            }
            this.updateMnpInfo(false);
          }
        }
      },
      (err: any) => {
        this.loading = false;
        const message = err?.error?.message || err?.error?.response;
        this._modalService.showError({ message });
      }
    )
  }

  changePrincipalNumber() {
    this.isTermsAccepted = false;
    this.portwithSuppLines = false;
    this.isEligible = false;
    this.enableCheckout = false;
    this.validation_id = undefined;
    this.initializeForm();
    this.updateMnpInfo(false);
    this.onMnpReset.emit();
  }

  onClickPort(type: string) {
    if (type === 'principalOnly') {
      this.portwithSuppLines = false;
      this.enableCheckout = true;
      this.updateMnpInfo(true);
    } else {
      this.portwithSuppLines = true;
      this.enableCheckout = false;
      this.createSuppLines(this.supplementaryLines[0].planPhoneNumber);
    }
  }

  createSuppLines(controlName) {
    if (!this.mnpForm.controls[this.supplementaryLines[0].planPhoneNumber]) {
      let value;
      this.supplementaryLines.forEach((line, idx) => {
        value = idx === 0;
        this.mnpForm.controls[line.planPhoneNumber + '_Add Line'] = new FormControl(value, []);
      });
      this.mnpForm.controls['internet_share'] = new FormControl('', []);
    }
    this.mnpForm.controls[controlName] = new FormControl('', [
      Validators.required,
      Validators.pattern(this.formConstants.phone)
    ]);
  }

  checkSuppLines(suppLine) {
    const numbers = [
      ...this.supplementaryLines.map(x => `${x.number?.replace(/^6/, '') ?? ''}`),
      this.mnpForm.controls.phone.value.replace(/^6/, ''),
    ];

    const isNumberSelected = numbers.find(
      number => number === this.mnpForm.controls[suppLine].value?.replace(/^6/, '')
    );
    if (isNumberSelected) {
      this.mnpForm.controls[suppLine].setErrors({custom: "You have already added this number"});
      return;
    }
    this.selectedSuppLine = suppLine;
    let isDevice = 0;
    let csAgent = 0;
    let selectedId = 0;
    if (!this.data.isPlanOnly) {
      isDevice = 1;
    }
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("AgentInfo")) {
      csAgent = 1;
    }
    if (this.mnpForm.controls.id_type.value) {
      selectedId = this.id_types.find(type => type.value === this.mnpForm.controls.id_type.value).id;
    }
    const requestParams = 'msisdn_number=' + this.mnpForm.controls[suppLine].value +
      '&id_number=' + this.mnpForm.controls.nric.value +
      '&id_type=' + selectedId +
      '&sku=' + this.data.sku +
      '&bundle=' + isDevice +
      '&is_cs_agent=' + csAgent +
      '&validation_id=' + this.validation_id;
    this.eligiblityCheck(requestParams, false);
  }

  onBack() {
    this.portwithSuppLines = false;
    this.enableCheckout = false;
    this.mnpData = { phone: this.mnpForm.controls.phone.value, nric: this.mnpForm.controls.nric.value };
    this.initializeForm();
    this.updateMnpInfo(false);
  }

  removeSuppLines(suppLine) {
    this.selectedSuppLine = suppLine;
    let selectedSuppLine = this.supplementaryLines.find(line => line.planPhoneNumber === this.selectedSuppLine);
    let selectedSuppLineIdx = this.supplementaryLines.indexOf(selectedSuppLine);
    this.supplementaryLines[selectedSuppLineIdx].number = "";
    this.supplementaryLines[selectedSuppLineIdx].isVerified = false;
    let formControls = {};
    formControls[this.selectedSuppLine] = '';
    formControls[this.selectedSuppLine + '_Add Line'] = '';
    this.mnpForm.patchValue(formControls);
    let status = true;
    const verifiedItems = this.supplementaryLines.filter(line => line.isVerified);
    if (verifiedItems.length > 0) {
      this.supplementaryLines.forEach((line, idx) => {
        if (idx > selectedSuppLineIdx) {
          if (this.mnpForm.controls[line.planPhoneNumber + '_Add Line'].value) {
            status = false;
          }
          if (!line.isVerified) {
            this.supplementaryLines[idx].isDisabled = true;
          }
        }
      });
      this.supplementaryLines[selectedSuppLineIdx].isDisabled = false;
    } else {
      status = false;
      this.supplementaryLines.forEach((_line, idx) => _line.isDisabled = idx !== 0);
    }
    this.updateMnpInfo(status);
  }

  updateMnpInfo(status) {
    let supplementaryLines = [];
    let internet_share = false;
    if (this.portwithSuppLines) {
      this.supplementaryLines.forEach(line => {
        if (line.isVerified) {
          line.number = this.mnpForm.controls[line.planPhoneNumber].value;
          supplementaryLines.push(line);
        }
      });
      if (this.mnpForm.controls.internet_share && this.mnpForm.controls.internet_share.value) {
        internet_share = true;
      }
    }
    this.enableCheckout = status;
    this._topService.selectSupplementaryLines(supplementaryLines);
    this._topService.updateShareQuota(internet_share);
    this._topService.selectMobileNumber(this.mnpForm.controls.phone.value);
    this._topService.updateMNPResponse([{ status: status, validated_id: this.validation_id }]);
  }

  doGuestLogin(customerIDNo, customerIdType) {
    const customerId = this.id_types.find(x => x.value === customerIdType)?.id;
    this._userService.guestLogin(customerIDNo, `${customerId}`)
      .subscribe(
        (response: any) => {
          if (response && response[0]?.status) {
            this.isEligible = true;
            if (this.data.sku === 'Xpax') {
              this.handlePrepaidLogin(response[0], "guest");
              return;
            }
            let can_buy_supplementary_lines = true;
            if (this.data.mvivaCampaign) {
              can_buy_supplementary_lines = this.data.mvivaCampaign.can_buy_supplementary_lines !== "0";
            }
            if (this.isEnterpriseUser || !can_buy_supplementary_lines) {
              this.onClickPort('principalOnly');
            }
            if (response[0]?.mobile_connect_user === false) {
              this._mnpService.doGuestLogin(response, customerIDNo)
            }
          } else {
            this.mnpForm.controls.nric.setErrors({
              custom:  response?.[0]?.message ?? SYS_DOWN_MSG
            });
          }
        },
        (err) => {
          const message = err?.error?.message || err?.error?.response;
          this._modalService.showError({ message });
        }
      );
  }

  loginSuccess($event) {
    this.mobileConnectUserShouldLogin = false;
    this.isEligible = true;

    if (this.data.sku === 'Xpax') {
      this.handlePrepaidLogin($event?.response?.[0], "mc", $event?.msdin);
      return;
    }

    let can_buy_supplementary_lines = true;
    if (this.data.mvivaCampaign) {
      can_buy_supplementary_lines = this.data.mvivaCampaign.can_buy_supplementary_lines !== "0";
    }
    if (this.isEnterpriseUser || !can_buy_supplementary_lines) {
      this.onClickPort('principalOnly');
    }

  }

  handlePrepaidLogin(response: ILoginResponse, user: 'mc' | 'guest', msdin?: string) {
    this._topService.selectMobileNumber(this.mnpForm.controls.phone?.value)
    this.onSuccessEligible.emit({
      user,
      msdin,
      response,
      validation_id: this.validation_id,
      idType: this.mnpForm.controls?.id_type.value,
      idNumber: this.mnpForm.controls.nric.value,
      phone: this.mnpForm.controls.phone.value,
    })
  }

  updateShareQuota() {
    this._topService.updateShareQuota(this.mnpForm.controls.internet_share.value);
  }

}
