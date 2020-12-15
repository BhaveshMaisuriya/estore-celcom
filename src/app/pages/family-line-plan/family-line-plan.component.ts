import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, combineLatest } from "rxjs";
import { finalize, map } from "rxjs/operators";

import { FamilyLinePlanService } from "./family-line-plan.service";
import { untilDestroyed } from "../../shared/services/until-destroyed.service";
import { iGeneralServerResponse } from "../../shared/models/general.model";
import { IFamilyLinePlanResponse, IFLPData, IFLPFlags, IFLTabData } from "./family-line-plan.model";
import { PlansService } from "../../Service/plans.service";
import { PlansQuery } from "../../Widget/side-summary/side-summary-container/plans.store";
import { FORM_VALIDATION_PATTERN } from "../../shared/constants/form.constants";
import { NewOtpInputComponent } from "../../shared/components/new-otp-input/new-otp-input.component";
import { ModalService } from "../../shared/components/modal/modal.service";
import { LoginService } from "../../Store/login/service/login.service";
import { TypeofPurchaseService } from "../../Service/type-of-purchase.service";
import { TypeofPurchaseQuery } from "../../Widget/side-summary/side-summary-container/type-of-purchase.store";
import { EStoreAnalysticsService } from "../../Service/store.analytic.service";
import { UserService } from 'app/Service/user.service';
import { iOmniCampaign } from 'app/shared/models/plan.model';
import { isPlatformBrowser } from '@angular/common';
import { CLMOmniDataSanitizer } from 'app/shared/utilities/helper.ultility';

@Component({
  selector: 'app-family-line-plan',
  templateUrl: './family-line-plan.component.html',
  styleUrls: [ './family-line-plan.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class FamilyLinePlanComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ts-ignore family line base type is different
  basePlan$: Observable<IFLTabData> = this.plansQuery.select(s => s.base_plan);

  suppLineInCart$ = this.topQuery.select(s => s.supplementary_lines);

  @ViewChild("otpFormInput") otpForm: NewOtpInputComponent;

  myForm: FormGroup = null;

  flags: IFLPFlags = {
    step: 1,
    loading: false,
    loggedIn: false,
    otpRequested: false,
    otpExpired: false,
    resendLinkDisabled: false,
    isEligible: false,
    maxLimitReached: false
  };

  data: IFLPData = {
    totalPayment: 0,
    state: null,
    accountDetails: null,
    validation_id: null,
    supplementaryLines: [],
    basePlan: null,
    losCheckUpfrontStatus: null,
  };

  loading = {
    pageLoading: true,
    loggingIn: false,
    otpRequest: false,
    eligiblityCheck: false,
  };

  error: {
    notEligible: null | string;
  } = {
    notEligible: null
  };

  campaignOmni: iOmniCampaign;
  isBrowser = false;
  apiResponse: IFamilyLinePlanResponse;
  isHideRebateText;
  constructor(
    private familyLinePlanService: FamilyLinePlanService,
    private plansService: PlansService,
    private plansQuery: PlansQuery,
    private topService: TypeofPurchaseService,
    private topQuery: TypeofPurchaseQuery,
    private modalService: ModalService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eStoreAnalyticsService: EStoreAnalysticsService,
    private renderer: Renderer2,
    private _userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.myForm = new FormGroup({
      nric: new FormControl("", [
        Validators.required,
        Validators.pattern(FORM_VALIDATION_PATTERN.nric)
      ]),
      phone: new FormControl("", [
        Validators.required,
      ])
    });
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
    ]).pipe(
      untilDestroyed(this),
      map(results => {
        return {
          params: results[0],
          queryParams: results[1],
        }
      })
    )
      .subscribe(({ params, queryParams }) => this.manageDeeplink(params, queryParams));

    this.plansService.updateIsFamilyPlan(true);

    // * Get the details if user is already logged in
    const personalForm = this.familyLinePlanService.getUserDetails();
    if (personalForm !== null) {
      this.myForm.controls.nric.setValue(personalForm.data.outputCPResp.customerID);
      this.myForm.controls.nric.updateValueAndValidity({onlySelf: true});
    }
  }

  manageDeeplink(params, queryParams) {
    const planSku = params.sku || 'family-line';
    this.familyLinePlanService.getPlanData(planSku, queryParams)
      .pipe(
        untilDestroyed(this),
        finalize(() => this.loading.pageLoading = false)
      )
      .subscribe(response => {

        this.flags.loading = false;

        // @ts-ignore ? failed response type is different
        if (response.status === false) {
          this.setError(response);
          return;
        }

        this.plansService.updateAPIResponse(response);
        this.apiResponse = response;

        this.plansService.selectBasePlan(response.tabData);
        // ? Set empty supplementary, just in case
        this.topService.selectSupplementaryLines([]);
        this.subForLocalVariables();

        
        if (response?.tabData?.is_campaign_omni) {
          this.campaignOmni = CLMOmniDataSanitizer(response?.tabData?.campaign_omni);
          this.plansService.updateOmniCampaign(this.campaignOmni);
        }
        if (queryParams?.promotionomnichannel && !this.campaignOmni) {
          this.modalService.showError({ message: 'Invalid campaign!' });
          this.modalService.onClosedModal.subscribe(id => {
            if (id && this.isBrowser) {
              window.location.href = "/plans/" + planSku;
            }
          });
        }
      }, err => this.setError(err));
  }

  ngAfterViewInit(): void {
    const currentUrl: string = this.router.routerState.snapshot.url;
    this.activatedRoute.data.subscribe((item: any) => {
      this.eStoreAnalyticsService.ManageAnalytics(this.renderer, currentUrl, item);
    });
    if (this._userService.isCustomer()) {
      this.flags.loggedIn = true;
      this.flags.otpRequested = false;
      this.checkEligiblity();
    }
  }

  ngOnDestroy() {
    this.plansService.updateIsFamilyPlan(false);
  }

  setError(err: any | iGeneralServerResponse) {
    this.modalService.showError(err);
  }

  subForLocalVariables() {
    this.basePlan$
      .pipe(untilDestroyed(this))
      .subscribe(basePlan  => {
        if (basePlan) {
          this.data.basePlan = basePlan;

          // * Updating Analytics
          this.eStoreAnalyticsService.SetProductDetails(basePlan, this.renderer);
          this.eStoreAnalyticsService.SetProductId(basePlan.sku, this.renderer);
          this.eStoreAnalyticsService.SetProductType("Family Line Plan");
          this.eStoreAnalyticsService.SetCategoryTwoForAdobeDataLayer(this.renderer);
        } else {
          this.data.basePlan = null;
        }
      });

    // * TotalPrice
    this.suppLineInCart$
      .pipe(untilDestroyed(this))
      .subscribe(lines => {
        // ? Waive off upfront if losCheckUpfrontStatus if false
        this.data.totalPayment = this.data.losCheckUpfrontStatus === false
          ? 0
          : lines.reduce((acc, cur) => acc + (+cur.planPrice), 0);
      });
  }

  onLoggedIn() {
    this.flags.loggedIn = true;
    this.flags.otpRequested = false;
    this.checkEligiblity();
  }

  checkEligiblity() {
    const msisdn = this._userService.getMsisdn();
    this.myForm.get('phone').setValue(msisdn);
    this.flags.loading = true;
    this.loading.eligiblityCheck = true;

    const { phone, nric } = this.myForm.controls;

    // ? Remove leading 6 from phone number
    const phoneNumber: string = phone.value?.replace(/^6/, '');

    this.familyLinePlanService.checkEligibilty(phoneNumber, nric.value)
      .pipe(
        untilDestroyed(this),
        finalize(() => {
          this.flags.loading = false;
          this.loading.eligiblityCheck = false;
        }),
      )
      .subscribe(response => {
        if (response.status === true) {
          const accountDetails = response.accountdetails[0];
          const suppCount = Number(accountDetails.supply_count);

          this.data.accountDetails = accountDetails;
          this.data.validation_id = response.validation_id;

          // * Update no upfront payment
          this.data.losCheckUpfrontStatus = response.los_check_upfront_status;
          this.plansService.updateNoUpfrontPayment(!response.los_check_upfront_status);
            const hide_rebate_text = response?.device_combo_subsidy;
            const data = {
              ...this.apiResponse,
              supp_rebate_label: hide_rebate_text ? '' : this.apiResponse?.supp_rebate_label
            };
            if (this.isHideRebateText !== hide_rebate_text) {
              this.isHideRebateText = hide_rebate_text;
              this.plansService.updateAPIResponse(data);
            }
          this.topService.selectMobileNumber(accountDetails.principle_no);

          this.data.supplementaryLines = Array(3 - suppCount)
            .fill(0)
            .map((_, i) => ({
              planPhoneNumber: `Line ${ i + 1 }`,
              planPrice: this.data?.basePlan?.monthlyPlan,
              planType: `Line ${ i + 1 }`,
              partNumber: `Line ${ i + 1 }`,
              isVerified: false,
              isDisabled: i !== 0
            }));
          this.flags.isEligible = true;
          this.createSuppLines(this.data.supplementaryLines[0].planPhoneNumber);
        } else {
          this.error.notEligible = response.message;
        }
      }, err => this.setError(err));
  }

  onChangeNumber() {
    this.resetAll();
  }

  clearSuppLines() {
    const suppCount = Number(this.data.accountDetails.supply_count);

    this.data.supplementaryLines = Array(3 - suppCount)
      .fill(0)
      .map((_, i) => ({
        planPhoneNumber: `Line ${ i + 1 }`,
        planPrice: this.data?.basePlan?.monthlyPlan,
        planType: `Line ${ i + 1 }`,
        partNumber: `Line ${ i + 1 }`,
        isVerified: false,
        isDisabled: i !== 0
      }));

    this.topService.selectSupplementaryLines([]);
  }

  resetAll() {
    this.flags = {
      step: 1,
      loading: false,
      loggedIn: false,
      otpRequested: false,
      otpExpired: false,
      resendLinkDisabled: false,
      isEligible: false,
      maxLimitReached: false
    };

    this.data = {
      totalPayment: 0,
      state: null,
      accountDetails: null,
      validation_id: null,
      supplementaryLines: [],
      basePlan: null,
      losCheckUpfrontStatus: null
    };

    this.error = {
      notEligible: null
    };

    this.myForm.patchValue({
      phone: "",
      nric: ""
    });
    this.myForm.markAsUntouched();
    this.topService.selectMobileNumber(null);
  }

  createSuppLines(controlName) {
    if (!this.myForm.controls[this.data.supplementaryLines[0].planPhoneNumber]) {
      this.data.supplementaryLines.forEach((line, idx) => {
        this.myForm.controls[line.planPhoneNumber + '_Add Line'] = new FormControl(
          idx === 0, []
        );
      });
      this.myForm.controls['internet_share'] = new FormControl('', []);
    }

    this.myForm.controls[controlName] = new FormControl('', [
      Validators.required,
    ]);
  }

  updateSuppLines(data) {
    const selectedSuppLineIdx = this.data.supplementaryLines.findIndex(
      line => line.planPhoneNumber === data.controlName
    );

    const isNumberSelected = this.data.supplementaryLines.findIndex(_line => _line.number === data.controlValue);
    if (isNumberSelected > -1) {
      this.setError({message: "You have already selected this number"});
      const formControls = {
        [data.controlName + '_Add Line']: false,
        [data.controlName]: ""
      };
      this.myForm.patchValue(formControls);
      return;
    }

    const formControls = {
      [data.controlName]: data.controlValue
    };

    this.myForm.patchValue(formControls);

    this.data.supplementaryLines[selectedSuppLineIdx].number = data.controlValue;
    this.data.supplementaryLines[selectedSuppLineIdx].isVerified = true;

    let nextLineIndex = selectedSuppLineIdx + 1;

    if (nextLineIndex < this.data.supplementaryLines.length) {
      if (this.data.supplementaryLines[nextLineIndex].isVerified) {
        nextLineIndex += 1;
      }
      if (nextLineIndex < this.data.supplementaryLines.length && !this.data.supplementaryLines[nextLineIndex].isVerified) {
        this.data.supplementaryLines[nextLineIndex].isDisabled = false;
        this.createSuppLines(this.data.supplementaryLines[nextLineIndex].planPhoneNumber);
      }
    }
    let verifiedItemIndex = this.data.supplementaryLines.findIndex((_line, idx) => _line.isVerified && idx > selectedSuppLineIdx);
    let nonVerifiedItemIndex = this.data.supplementaryLines.findIndex((_line, idx) => !_line.isVerified && idx > selectedSuppLineIdx);
    let status = nonVerifiedItemIndex === -1;
    if (!status) {
      status = verifiedItemIndex < nonVerifiedItemIndex;
    }
    this.updateNewLineInfo(status);
  }

  removeSuppLines(suppLine) {
    const selectedSuppLineIdx = this.data.supplementaryLines.findIndex(
      line => line.planPhoneNumber === suppLine
    );

    this.data.supplementaryLines[selectedSuppLineIdx].number = "";
    this.data.supplementaryLines[selectedSuppLineIdx].isVerified = false;

    const formControls = {
      [suppLine]: '',
      [suppLine + '_Add Line']: ''
    };

    this.myForm.patchValue(formControls);

    let status = true;
    const verifiedItems = this.data.supplementaryLines.filter(line => line.isVerified);

    if (verifiedItems.length > 0) {
      this.data.supplementaryLines.forEach((line, idx) => {
        if (idx > selectedSuppLineIdx) {
          if (this.myForm.controls[line.planPhoneNumber + '_Add Line'].value) {
            status = false;
          }
          if (!line.isVerified) {
            this.data.supplementaryLines[idx].isDisabled = true;
          }
        }
      });

      this.data.supplementaryLines[selectedSuppLineIdx].isDisabled = false;
    } else {
      status = false;
      this.data.supplementaryLines.forEach((_line, idx) => _line.isDisabled = idx !== 0);
    }
    this.updateNewLineInfo(status);
  }

  updateNewLineInfo(status) {
    const internet_share = this.myForm.controls.internet_share && this.myForm.controls.internet_share.value;
    const supplementaryLines = [];

    this.data.supplementaryLines.forEach(line => {
      if (line.isVerified) {
        line.number = this.myForm.controls[line.planPhoneNumber].value;
        supplementaryLines.push(line);
      }
    });

    this.topService.updateShareQuota(internet_share);
    this.topService.selectSupplementaryLines(supplementaryLines);
    this.topService.updateNewLineCompleted(status);
  }

  onAddToCartClick() {
    this.familyLinePlanService.reserveNumber(this.data)
      .subscribe(response => {
        if (response.status) {
          this.addToCart(response.reservationId);
        } else {
          this.setError(response);
        }
      });
  }

  addToCart(reservationId = "") {
    this.familyLinePlanService.addToCart(
      this.data,
      this.myForm.controls.nric.value,
      this.myForm.controls.phone.value,
      !!(this.myForm.controls.internet_share?.value),
      reservationId,
      !!this.campaignOmni
    )
      .subscribe(async response => {

        if (response && response[0].status === true) {
          const navigated = await this.router.navigateByUrl('/store/checkout/summary');

          if (!navigated) {
            this.setError('Cannot proceed to checkout');
          }
        } else {
          this.setError(response);
        }

      }, error => {
        this.setError(error?.error);
      });
  }

  updateShareQuota() {
    this.topService.updateShareQuota(this.myForm.controls.internet_share.value);
  }

}
