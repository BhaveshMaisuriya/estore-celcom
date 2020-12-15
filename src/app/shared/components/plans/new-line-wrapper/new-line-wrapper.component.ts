import { Component, OnDestroy, OnInit, ViewEncapsulation, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { TypeofPurchaseService } from 'app/Service/type-of-purchase.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NewLineWrapperService } from "./new-line-wrapper.service";
import { TPersonalForm } from "../../../models/user.model";
import { TypeofPurchaseQuery } from "../../../../Widget/side-summary/side-summary-container/type-of-purchase.store";
import { iSupplementary, iMvivaCampaign } from 'app/shared/models/device.model';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { SupplementaryData, FIRST_BLUE_INTERNET, iInternetShare } from "../../../models/plan.model";
import { untilDestroyed } from "../../../services/until-destroyed.service";
import { ModalService } from "../../modal/modal.service";
import { iGeneralServerResponse } from "../../../models/general.model";
import { CommonUtilService } from "../../../../Service/commonUtil.service";
import { finalize } from "rxjs/operators";
import { UserService } from 'app/Service/user.service';
import { insertRemoveTrigger } from '../../device-combo/cobp-number-chooser/cobp-number-chooser.component';

@Component({
  selector: 'app-new-line-wrapper',
  templateUrl: './new-line-wrapper.component.html',
  styleUrls: ['./new-line-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    insertRemoveTrigger,
  ]
})
export class NewLineWrapperComponent implements OnInit, OnDestroy, AfterViewInit {

  myForm: FormGroup = null;
  loading = false;

  flags: {
    loggedIn: boolean;
    showMcLogin: boolean;
    pricipleNumSelected: boolean;
    suppLimitReached: boolean;
    showSuppLines: boolean;
    isUserInternallyBlacklisted: boolean;
  } = {
    loggedIn: false,
    showMcLogin: false,
    pricipleNumSelected: false,
    suppLimitReached: false,
    showSuppLines: false,
    isUserInternallyBlacklisted: false
  };

  data: {
    userName: string;
    suppData: SupplementaryData | null;
  } = {
    userName: 'Guest',
    suppData: null
  };

  personalForm: TPersonalForm;

  mobileNumber$ = this._topQuery.select(s => s.mobile_number);
  isNewLineAdded$ = this._topQuery.select(s => s.new_line_completed);
  shareQuota$ = this._topQuery.select(s => s.share_quota);
  supplementaryLines: iSupplementary[] = [];
  supplementaryLinesCount$: Observable<string>;
  supplementaryLinesData$: Observable<SupplementaryData>;
  isPlanOnly: boolean;
  isPlanOnly$: Observable<boolean>;
  hideSectionForFirstBlue: boolean;
  checkNricOrderInfoSub: Subscription;
  mvivaCampaign: iMvivaCampaign;

  optionalSuppLine = true;
  isComboPhone = false;
  comboType;
  device_combo;
  device_combo_number;
  suppLinesSM;
  internet_share: iInternetShare;
  cleanedSuppNumbers = [];


  constructor(
    private _newLineWrapperService: NewLineWrapperService,
    private _topService: TypeofPurchaseService,
    private _topQuery: TypeofPurchaseQuery,
    private _planQuery: PlansQuery,
    private modalService: ModalService,
    private commonUtilService: CommonUtilService,
    private _userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.myForm = new FormGroup({
      nric: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\d{12}$/)
      ])
    });
  }

  ngOnInit(): void {
    this.isPlanOnly$ = this._planQuery.isPlanOnly$;
    this.isPlanOnly$
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        this.isPlanOnly = data;
      });

    this.mvivaCampaign = this._planQuery.getValue().mviva_campaign;
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("COBP_FLOW")) {
      localStorage.removeItem("COBP_FLOW");
    }

    this.supplementaryLinesData$ = this._planQuery.select(s => {
      // ? For Device Bundle
      if (s.device !== null) {
        const dt = {
          ...s.api_response?.items?.supplementary_details?.celcom_ultra_plan?.[0],
          name: s.api_response?.items?.supplementary_details?.name,
        }
        return dt.max_line ? dt : null;
      }

      return s.base_plan?.supplementary_data?.[0] ?? null;
    });

    this.supplementaryLinesData$
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        if (data) {
          this.data.suppData = data;
        } else {
          this.data.suppData = null;
        }
      });

    this.supplementaryLinesCount$ = this._planQuery.select(s => {
      if (this.isPlanOnly) {
        return s.plan?.supplementary_data?.[0]?.max_line || "0";
      } else {
        const planInfo = s.api_response?.items?.supplementary_details?.celcom_ultra_plan?.find(item => item.sku === s.plan.sku);
        return planInfo?.max_line || "0";
      }
    });

    this.supplementaryLinesCount$
      .pipe(untilDestroyed(this))
      .subscribe(count => {
        this.supplementaryLines = Array(Number(count))
          .fill(0)
          .map((_, i) => ({
            planPhoneNumber: 'Line ' + (i + 1),
            planPrice: this.data.suppData?.price,
            planType: 'Line ' + (i + 1),
            partNumber: this.data.suppData?.part_number,
            isVerified: false,
            isDisabled: i !== 0
          }));
    });

    this.updateNewLineInfo(false);
  }

  subscribeForLocalVars() {
    combineLatest([
      this._planQuery.select(s => s.device),
      this._planQuery.select(s => s.device_combo),
      this._planQuery.isComboPhone$,
      this._planQuery.comboType$,
      this._topQuery.select(s => s.device_combo_number),
      this._topQuery.select(s => s.supplementary_lines),
      this._planQuery.select(s => s.pass?.internet_share),
    ]).pipe(
      untilDestroyed(this)
    ).subscribe((resp: any[]) => {
      const [
        device,
        device_combo,
        isComboPhone,
        comboType,
        device_combo_number,
        suppLinesSM,
        internet_share,
      ] = resp;
      this.internet_share = internet_share;
      if (device && device_combo && isComboPhone) {
        this.optionalSuppLine = false;
      }
      this.device_combo = device_combo;
      this.isComboPhone = isComboPhone;
      this.comboType = comboType;
      this.device_combo_number = device_combo_number;
      this.suppLinesSM = suppLinesSM;
      this.cleanedSuppNumbers = this.suppLinesSM
        ?.map(s => s.number)
        ?.filter(s => s?.trim().length > 0) || [];
    });
  }

  ngAfterViewInit(): void {
    // * Get the details if user is already logged in
    this.setUserData();
    this.cdr.detectChanges();
    this.subscribeForLocalVars();
  }

  ngOnDestroy() {
    if (this.checkNricOrderInfoSub) {
      this.checkNricOrderInfoSub.unsubscribe();
    }
  }

  setError(err: any | iGeneralServerResponse) {
    return this.modalService.showError(err);
  }

  handleSubmit(): void {
    this.loading = true;
    const nric = this.myForm.controls.nric.value;
    const {error, message} = this.commonUtilService.validationForIdType('1', nric);

    if (error) {
      this.setError({ message });
      this.loading = false;
      return;
    }

    this._newLineWrapperService.loginUser(nric)
      .pipe(
        finalize(() => { this.loading = false; }),
        untilDestroyed(this),
      )
      .subscribe(response => {
        if (response.status === true) {

          if (!response.mobile_connect_user) {
            this._newLineWrapperService.doGuestLogin(response, nric);
            this.flags.loggedIn = true;
            this.setUserData();
            this.checkNricOrderInfo();
          } else {
            this.flags.showMcLogin = true;
          }
        } else {
          this.setError(response);
        }
      }, err => this.setError(err));

  }

  handleMCLogin() {
    this.flags.showMcLogin = false;
    this.setUserData();
  }

  setUserData() {
    this.flags.isUserInternallyBlacklisted = false; // ? Resetting this flag

    this.personalForm = this._newLineWrapperService.getUserDetails();

    if (this.personalForm !== null) {
      this.myForm.patchValue({
        nric: this.personalForm.data.outputCPResp.customerID,
      })
      this.flags.loggedIn = true;
      this.checkNricOrderInfo();


      if (this.personalForm.type === "user") {
        this.data.userName = this.personalForm.data.outputCPResp.contactFirstName;

        // ? Check if the user is internally blacklisted
        const { blacklist } = this.personalForm.data.outputCPResp;

        if (blacklist?.status && blacklist?.system === "Internal") {
            this.flags.isUserInternallyBlacklisted = true;
            this.setError({ title: 'Uh oh!', message: blacklist.message })
        }
      }
    }
  }

  checkNricOrderInfo() {
    if (this.checkNricOrderInfoSub) {
      this.checkNricOrderInfoSub.unsubscribe();
    }

    this.checkNricOrderInfoSub = this._newLineWrapperService
      .checkNricOrderInfo(this.personalForm.data.outputCPResp.customerID)
      .subscribe(orderInfo => {
        if (Number(orderInfo?.order_data?.total_lines ?? '0') >= 15) {
          this.flags.suppLimitReached = true;
        }
      });
  }


  onSelectNumber(number) {
    if (number?.trim().length > 0) {
      this.flags.pricipleNumSelected = true;
      if (this._planQuery.getValue()?.isFirstBluePlan) {
        this.hideSectionForFirstBlue = true;
        this._topService.updateNewLineCompleted(true);
      }
      this._topService.selectMobileNumber(number);
      if (this.mvivaCampaign?.can_buy_supplementary_lines === "0") {
        this.handleSuppLineAdd(false);
      }
      if ((+this.data.suppData?.max_line || 0) < 1) {
        this.handleSuppLineAdd(false);
      }
      if (!this.optionalSuppLine) {
        this._topService.updateNewLineCompleted(false);
        this.handleSuppLineAdd(true);
      }
    } else {
      this._topService.selectMobileNumber(null);
    }
  }

  onRemovePrincipleNumber() {
    this.modalService.showConfirm({
      title: 'Are you sure?',
      message: 'Proceeding this action will reset all your previous selection.'
    })
      .subscribe(result => {
        if (result) {
          this.flags.pricipleNumSelected = false;
          this.flags.showSuppLines = false;
          this._topService.selectMobileNumber(null);
          this._topService.selectSupplementaryLines([]);
          this._topService.updateNewLineCompleted(false);
          this.supplementaryLines.forEach(line => {
            this.removeSuppLines(line.planPhoneNumber)
          })
        }
      });
  }

  handleSuppLineAdd($addSuppLine: boolean) {
    if (!$addSuppLine) {
      this._topService.updateNewLineCompleted(true);
    } else {
      this.flags.showSuppLines = true;
      this.createSuppLines(this.supplementaryLines[0].planPhoneNumber);
    }
  }

  createSuppLines(controlName) {
    if (!this.myForm.controls[this.supplementaryLines[0].planPhoneNumber]) {
      let value;
      this.supplementaryLines.forEach((line, idx) => {
        value = idx === 0;
        this.myForm.controls[line.planPhoneNumber + '_Add Line'] = new FormControl(value, []);
      });
      this.myForm.controls['internet_share'] = new FormControl('', []);
    }
    this.myForm.controls[controlName] = new FormControl('', [
      Validators.required
    ]);
  }

  updateSuppLines(data) {
    const isNumberSelected = this.supplementaryLines.findIndex(_line => _line.number === data.controlValue);
    if (isNumberSelected > -1) {
      this.setError({message: "You have already selected this number"});
      const formControls = {
        [data.controlName + '_Add Line']: false,
        [data.controlName]: ""
      };
      this.myForm.patchValue(formControls);
      return;
    }
    let selectedSuppLine = this.supplementaryLines.find(line => line.planPhoneNumber === data.controlName);
    let selectedSuppLineIdx = this.supplementaryLines.indexOf(selectedSuppLine);
    let formControls = {};
    formControls[data.controlName] = data.controlValue;
    this.myForm.patchValue(formControls);
    this.supplementaryLines[selectedSuppLineIdx].number = data.controlValue;
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
    this.updateNewLineInfo(status);
  }

  removeSuppLines(suppLine) {
    let selectedSuppLine = this.supplementaryLines.find(line => line.planPhoneNumber === suppLine);
    let selectedSuppLineIdx = this.supplementaryLines.indexOf(selectedSuppLine);
    this.supplementaryLines[selectedSuppLineIdx].isVerified = false;
    let formControls = {};
    formControls[suppLine] = '';
    formControls[suppLine + '_Add Line'] = '';
    this.myForm.patchValue(formControls);
    let status = true;
    const verifiedItems = this.supplementaryLines.filter(line => line.isVerified);
    if (verifiedItems.length > 0) {
      this.supplementaryLines.forEach((line, idx) => {
        if (idx > selectedSuppLineIdx) {
          if (this.myForm.controls[line.planPhoneNumber + '_Add Line'].value) {
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
    this.updateNewLineInfo(status);
  }

  updateNewLineInfo(status) {
    const internet_share = (this.myForm.controls.internet_share && this.myForm.controls.internet_share.value);
    let supplementaryLines = [];
    if (this.flags.showSuppLines) {
      this.supplementaryLines.forEach(line => {
        if (line.isVerified) {
          line.number = this.myForm.controls[line.planPhoneNumber].value;
          supplementaryLines.push(line);
        }
      });
    }
    this._topService.updateShareQuota(internet_share);
    this._topService.selectSupplementaryLines(supplementaryLines);
    this._topService.updateNewLineCompleted(status);
  }

  updateShareQuota() {
    this._topService.updateShareQuota(this.myForm.controls.internet_share.value);
  }

  updateShareQuotaDB(value) {
    this._topService.updateShareQuota(value);
  }

  selectDeviceComboNumber(number) {
    this._topService.selectDeviceComboNumber(number);
    this.handleSuppLineAdd(false);
  }

  onSelectSupplementaryFromCombo(numbers: string[]) {
    const data: iSupplementary[] = numbers.filter(n => n).map((number, i) => ({
      planPhoneNumber: `Line ${i + 1}`,
      planPrice: this.data.suppData.price,
      planType: `Line ${i + 1}`,
      partNumber: this.data.suppData.part_number,
      isVerified: true,
      isDisabled: false,
      number
    }));
    this._topService.selectSupplementaryLines(data);
    // Wrap in setTimeout so it will run on next stack
    setTimeout(() => {
      // Mandatory number for device combo
      if (!!this.device_combo && !this.device_combo_number) {
        this._topService.updateNewLineCompleted(false);
      } else {
        this._topService.updateNewLineCompleted(true);
      }
    }, 0);
  }

  onSelectingNumber(value) {
    if (value) {
      this._topService.updateNewLineCompleted(false);
    } else {
      this._topService.updateNewLineCompleted(!!this.device_combo && !!this.device_combo_number);
    }
  }

}
