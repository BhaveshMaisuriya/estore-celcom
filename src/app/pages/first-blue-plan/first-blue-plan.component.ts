import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router, Data } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PostpaidService } from 'app/pages/postpaid/postpaid.service';
import { Observable, combineLatest } from "rxjs";
import { finalize, map } from "rxjs/operators";

import { FirstBluePlanService } from "./first-blue-plan.service";
import { untilDestroyed } from "../../shared/services/until-destroyed.service";
import { iGeneralServerResponse } from "../../shared/models/general.model";
import { IFBPData, IFBPFlags, IFBTabData, iPlanFirstBlue, IFirstBluePlanResponse } from "./first-blue-plan.model";
import { PlansService } from "../../Service/plans.service";
import { PlansQuery } from "../../Widget/side-summary/side-summary-container/plans.store";
import { FORM_VALIDATION_PATTERN } from "../../shared/constants/form.constants";
import { NewOtpInputComponent } from "../../shared/components/new-otp-input/new-otp-input.component";
import { ModalService } from "../../shared/components/modal/modal.service";
import { LoginService } from "../../Store/login/service/login.service";
import { TypeofPurchaseService } from "../../Service/type-of-purchase.service";
import { typeOfPurchaseEnum, TypeofPurchaseQuery } from "../../Widget/side-summary/side-summary-container/type-of-purchase.store";
import { EStoreAnalysticsService } from "../../Service/store.analytic.service";
import { UserService } from 'app/Service/user.service';
import { iPass, iPlan, FIRST_BLUE_INTERNET } from 'app/shared/models/plan.model';
import { iSupplementary, iMvivaCampaign } from 'app/shared/models/device.model';
import { iBasePlan } from 'app/Service/devicedata.service';
import { COBPResponse } from 'app/shared/models/cobp.model';
import { iNumberReservationRequestData, iNumberReservationRequest, addTocartBundle, NewLineAddtocartData, COBPAddtocartData, MNPAddtocartData } from 'app/models/general.model';
import { MnpService } from '../../Store/mnp/services/mnp.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-first-blue-plan',
  templateUrl: './first-blue-plan.component.html',
  styleUrls: [ './first-blue-plan.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class FirstBluePlanComponent implements OnInit, AfterViewInit, OnDestroy {

  private _refPlanData: IFirstBluePlanResponse;

  public get _planData() {
    return this._refPlanData
  }

  public set _planData(value) {
    this.plansService.updateAPIResponse(value);
    this._refPlanData = value;
  }

  private allPass: iPass[];
  private plansInitialized = false;
  // @ts-ignore first blue base type is different
  basePlan$: Observable<iBasePlan>;
  pass$: Observable<iPass>;
  plan$: Observable<iPlan>;
  topType$: Observable<typeOfPurchaseEnum>;
  isLoadingAPIResponse$: Observable<boolean>;
  isLoadingToP$: Observable<boolean>;

  suppLineInCart$ = this.topQuery.select(s => s.supplementary_lines);
  upfrontPayment$: Observable<number>;
  upfrontPaymentWaived$: Observable<boolean>;
  private supplementaryLines$: Observable<iSupplementary[]>;

  top_type: string;
  mobile_number: string;

  totalPayment = 0;

  base_plan: iBasePlan;
  supp_part_number: string;
  supplementary_numbers: string[];
  share_quota: boolean;
  mnp_response: any;
  cobp_response: COBPResponse;
  cobpResponse$: Observable<COBPResponse[]>;

  pass: iPass;
  plan: iPlan;
  nowant = false;
  isNewLine: boolean = true;
  isCobp: boolean = true;
  isMnp: boolean = true;
  enableBuyOption: boolean = false;

  isCampaignMviva:boolean = false;
  campaignMviva: iMvivaCampaign;

  @ViewChild("otpFormInput") otpForm: NewOtpInputComponent;

  myForm: FormGroup = null;

  flags: IFBPFlags = {
    step: 1,
    loading: false,
    loggedIn: false,
    otpRequested: false,
    otpExpired: false,
    resendLinkDisabled: false,
    isEligible: false,
    maxLimitReached: false
  };

  data: IFBPData = {
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

  constructor(
    private firstBluePlanService: FirstBluePlanService,
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
    private _postpaidService: PostpaidService,
    private mnpService: MnpService,
    private _activatedRoute: ActivatedRoute,
    private _planService: PlansService,

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
  }

  ngOnInit(): void {
    this.basePlan$ = this.plansQuery.select(s => s.base_plan);
    this.basePlan$.subscribe(data => this.base_plan = data);
    this.pass$ = this.plansQuery.select(s => s.pass);
    this.plan$ = this.plansQuery.select(s => s.plan);

    this.upfrontPayment$ = this.plansQuery.select(s => s.upfront_payment);
    this.upfrontPaymentWaived$ = this.plansQuery.select(s => s.upfront_payment_waived);

    this.supplementaryLines$  = this.topQuery.select(s => s.supplementary_lines);

    this.topType$ = this.topQuery.select(store => store.type);

    this.isLoadingAPIResponse$ = this.plansQuery.selectLoading();
    this.isLoadingToP$ = this.topQuery.selectLoading();
    this.topType$.subscribe(data => this.top_type = data);
    this.cobpResponse$ = this.topQuery.select(store => store.cobp_response);
    this.cobpResponse$.subscribe(resp => this.cobp_response = resp?.[0]);

    combineLatest([
      this._activatedRoute.params,
      this._activatedRoute.queryParams,
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
    this.plansService.updateIsFirstBluePlan(true);
    // * Get the details if user is already logged in
    const personalForm = this.firstBluePlanService.getUserDetails();
    if (personalForm !== null) {
      this.myForm.controls.nric.setValue(personalForm.data.outputCPResp.customerID);
      this.myForm.controls.nric.updateValueAndValidity({onlySelf: true});
    }
  }

  manageDeeplink(params, queryParams) {
    this.firstBluePlanService.loadPlan("celcom-internetgo", queryParams)
    .pipe(
      finalize(() => this._planService.setLoading(false)),
    )
    .subscribe((data: IFirstBluePlanResponse) => {
      this.loading.pageLoading = false;
      if (!isNullOrUndefined(data['status'])) {
        if (!data['status']) {
          this.setError(<iGeneralServerResponse>data);
          return;
        }
      }
      // ? Set empty supplementary, just in case
      this.topService.selectSupplementaryLines([]);

      this.subForLocalVariables();
      const newData = {
        ...data
      };
      this._planData = newData;

      this.plansService.selectBasePlan(data.tabData);
      this.calculateTotalPrice();


      if (newData?.tabData?.is_campaign_mviva) {
        this._planService.updateMVIVA(newData.tabData.campaign_mviva);
        this.isCampaignMviva = true;
        this.campaignMviva = newData.tabData.campaign_mviva;
        this.isNewLine = !!this.campaignMviva?.purchase_type.includes("newline");
        this.isCobp = !!this.campaignMviva?.purchase_type.includes("cobp");
        this.isMnp = !!this.campaignMviva?.purchase_type.includes("mnp");
      }
    }, err => this.setError(err));

  }

  calculateTotalPrice() {
    combineLatest([
      this.upfrontPayment$,
      this.upfrontPaymentWaived$,
    ]).pipe(
      untilDestroyed(this)
    ).subscribe(([upfront, waived]) => {
      if (!waived) {
        this.totalPayment = upfront;
      } else {
        this.totalPayment = 0;
      }
      if (this.top_type === typeOfPurchaseEnum.cobp && this.cobp_response) {
        const penalty = this.cobp_response.penaltyCheck?.device_upfront_penalty;
        this.totalPayment += (+penalty);
      }
    });
  }
  ngAfterViewInit(): void {
    const currentUrl: string = this.router.routerState.snapshot.url;
    this.activatedRoute.data.subscribe((item: any) => {
      this.eStoreAnalyticsService.ManageAnalytics(this.renderer, currentUrl, item);
    });
  }

  ngOnDestroy() {
    this.plansService.updateIsFirstBluePlan(false);
  }

  setError(err: any | iGeneralServerResponse) {
    this.modalService.showError(err);
  }

  /**
   * Add to cart for postpaid line
   * After successfully doing add to cart, user will get redirected to order/summary
   * In order summary, there will be checking for email and phone number
   * If new user, will get redirected to order/personal-details
   * @param reservationId Reservation ID for new line
   * @param temporary_number Temporary number for MNP Journey
   */
  addToCart(reservationId: string = "", temporary_number: string = "") {
    let basicData: any = {
      Sku: this.base_plan?.sku,
      PlanName: this.base_plan?.PlanName,
      TotalPay: this.totalPayment,
      selected_number: this.topQuery.getValue().mobile_number,
      user: "user",
      is_mnp: this.top_type === typeOfPurchaseEnum.mnp,
      is_cobp: this.top_type === typeOfPurchaseEnum.cobp,
      is_affiliate_ada: false,
      is_affiliate_ia: false,
      reservationId: reservationId,
      add_on_ids: null,
      campaign_mviva_url: "",
      is_campaign_mviva: false,
      is_golden_number: false,
      is_star_internet_share: false,
      mnp_id: null
    }
    if (this.top_type === typeOfPurchaseEnum.newline) {
      localStorage.removeItem('COBP_FLOW');
      basicData = {
        ...basicData,
        selected_number_type : "NewNumber"
      }
    } else if (this.top_type === typeOfPurchaseEnum.cobp) {
      basicData = {
        ...basicData,
        selected_number_type : "KeepNumber",
        validated_id: this.cobp_response?.validated_id
      }
    } else if (this.top_type === typeOfPurchaseEnum.mnp) {
      basicData = {
        ...basicData,
        selected_number_type : "SwitchToCelcom"
      }
    }
    basicData.is_campaign_mviva = this._refPlanData?.tabData?.is_campaign_mviva;
    if (basicData.is_campaign_mviva) {
      basicData.campaign_mviva_url = this.router.routerState.snapshot.url;
    }

    let data= {
      "data" : {
        ...basicData
      }
    };

    this.firstBluePlanService.addToCart(data)
      .subscribe(resp => {
        if (resp?.[0]?.['status']){
          this.router.navigateByUrl('/store/checkout/summary');
        } else {
          this.showErrorMessage(resp[0] || resp);
        }
      }, error => {
        this.showErrorMessage(error?.error);
      });
  }

  subForLocalVariables() {
    this.basePlan$
      .pipe(untilDestroyed(this))
      .subscribe(basePlan  => {
        if (basePlan) {
          // this.data.basePlan = basePlan;

          // * Updating Analytics
          this.eStoreAnalyticsService.SetProductDetails(basePlan, this.renderer);
          this.eStoreAnalyticsService.SetProductId(basePlan.sku, this.renderer);
          this.eStoreAnalyticsService.SetProductType("First Blue Plan");
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

  sendOtp() {
    this.flags.loading = true;
    this.loading.otpRequest = true;
    this.flags.resendLinkDisabled = true;

    this.firstBluePlanService.sendOtp(this.myForm.controls.phone.value)
      .pipe(
        untilDestroyed(this),
        finalize(() => {
          this.flags.loading = false;
          this.loading.otpRequest = false;
        }),
      )
      .subscribe(response => {
        if (response[0].status === true && response[0].exists === false) {
          this.modalService.open('tnc-login');
        } else if (response[0].status === true && response[0].exists === true) {

          this.flags = {
            ...this.flags,
            step: 2,
            otpRequested: true,
            resendLinkDisabled: true,
          };

          this.data.state = response[0].state;
          this.loginService.disableResendOtpLink(response[0]);

          setTimeout(() => {
            this.flags.otpExpired = true;
          }, 2 * 60 * 1000);

          /**
           * Resend link
           */

          setTimeout(() => {
            this.flags.resendLinkDisabled = false;
          }, +response[0].disable_resend_link * 1000);
        } else if (response[0].status === false) {
          this.setError(response[0]);
        }
      });
  }

  reserveNumber(base_plan: iBasePlan, mobile_number: string, supplementary_numbers: string[]) {
    const suppReqData: iNumberReservationRequestData = {
      partNumber: this.supp_part_number,
      sku: base_plan.sku,
    }
    const suppnumbers = supplementary_numbers || [];
    const suppData: iNumberReservationRequestData = suppnumbers?.length > 0 ? suppReqData : null;
    const data: iNumberReservationRequest = {
      data: suppData || {},
      mobile_number: [
        this.topQuery.getValue().mobile_number,
        ...suppnumbers
      ],
      // This will be always empty
      reservationId: ""
    }
    return this._postpaidService.reserveNumber(data);
  }

  retrieveNumbers() {
    const dataForRetrieveNumberAPI = {
      NumberDetailsRetrieveRequest: {
        numberService: "POSTPAID",
        numberCategory: "NORMAL",
        numRecords: "20",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    return this.mnpService.GetNewNumbers(dataForRetrieveNumberAPI);
  }

  getRandomNumber(numbersList: any) {
    this.mnpService.getRandomNumber(numbersList)
      .subscribe(response => {
        if (response.status) {
          if (response.reservation_id) {
            this.addToCart(response.reservation_id, response.number);
          }
        }
      }, err => {
        this.showErrorMessage(err.error);
      });
  }

  onAddToCartClick() {
    if (this.top_type === typeOfPurchaseEnum.newline) {
      this.reserveNumber(this.base_plan, this.mobile_number, this.supplementary_numbers)
        .subscribe(resp => {
          if (resp.status) {
            this.addToCart(resp.reservationId);
          } else {
            this.showErrorMessage(resp);
          }
        }, err => {
          this.showErrorMessage(err.error);
        });
    } else if (this.top_type === typeOfPurchaseEnum.cobp) {
      this.addToCart("IT000016");
    } else if (this.top_type === typeOfPurchaseEnum.mnp) {
      this.retrieveNumbers()
        .subscribe(response => {
          let mobileNumbers = [];
          response.forEach(element => {
            mobileNumbers.push({ "number": element.servicenum });
          });
          this.getRandomNumber({ "mobile_numbers": mobileNumbers });
        }, err => {
          this.showErrorMessage(err.error);
        });
    }
  }

  updateShareQuota() {
    this.topService.updateShareQuota(this.myForm.controls.internet_share.value);
  }

  showErrorMessage(resp: iGeneralServerResponse = null) {
    const message = resp?.message || resp?.response;
    this.modalService.showError({ message }).subscribe(data => {
      this.plansService.updateAddtocartError(true);
    });
  }

  selectedTypeOfPurchase(event: string) {
    if (this._userService.isCustomer()) {
      const userInfo = this._userService.getPersonalForm();
      const isUserExternallyBlacklisted = userInfo?.data.outputCPResp?.["blacklist"]?.status;
      const blockLstErrMsg = userInfo?.data.outputCPResp?.["blacklist"]?.message;
      if (isUserExternallyBlacklisted && typeOfPurchaseEnum[event] !== typeOfPurchaseEnum.cobp ) {
          this.modalService.showError({ message: blockLstErrMsg });
          return;
      }
    }
    this.checkIsNumberSelected(() => {
      this.topService.selectTypeofPurchase(event);
    });
  }

  checkIsNumberSelected(cb) {
    if (this.top_type != null && this.mobile_number) {
      this.modalService.showConfirm({title: 'Are you sure?', message: 'Proceeding this action will reset all your previous selection.'})
        .subscribe(result => {
          if (result) cb();
        });
    } else {
      cb();
    }
  }

  buyNow() {
    if (!this.isNewLine && !this.isMnp) {
      this.selectedTypeOfPurchase('cobp');
    }
  }

  getTitle(bluePlan) {
    return `<div class="row">
    <div class="col">${bluePlan.PlanName}</div>
    <div class="col-auto" style="font-weight: normal">${bluePlan.KeyFiguresText}</div>
    </div>`;
  }

}
