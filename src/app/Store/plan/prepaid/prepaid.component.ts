import {
  AfterContentInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild
} from '@angular/core';
import { EStoreAnalysticsService } from 'app/Service/store.analytic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from 'app/Service/plans.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { PrepaidService } from './prepaid.service';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { finalize } from 'rxjs/operators';
import { TypeofPurchaseService } from 'app/Service/type-of-purchase.service';
import { PersonalInformationComponent } from 'app/Store/form/personal-information/personal-information.component';
import { FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { iPlan } from '../../../shared/models/plan.model';
import { UserService } from 'app/Service/user.service';
import { PAGE_NOT_FOUND_URL } from '../../../shared/constants/apiUrl.constants';
import * as errorconst from "../../../../constants/error.constants";
import { isPlatformBrowser } from '@angular/common';
import { GuestCheckoutService } from 'app/Store/guest-checkout/services/guest-checkout.service';
import { isNullOrUndefined, removeHTMLTags } from '../../../shared/utilities/helper.ultility';
import { untilDestroyed } from "../../../shared/services/until-destroyed.service";
import { iMvivaCampaign } from "../../../shared/models/device.model";
import { selectTypeOfPurchase } from "../../../shared/utilities/common-actions.utils";
import { ModalService } from "../../../shared/components/modal/modal.service";
import {
  typeOfPurchaseEnum,
  TypeofPurchaseQuery
} from "../../../Widget/side-summary/side-summary-container/type-of-purchase.store";
import { LoginService } from "../../login/service/login.service";
import { ILoginResponse } from 'app/shared/models/user.model';
import { XPAX_MNP_DATA } from "../../../shared/constants/session-storage.constants";

export interface IOnMNPEligibleSuccessParams {
  idType: string;
  idNumber: string;
  response: ILoginResponse;
  phone: string;
  user: 'mc' | 'guest';
  msdin?: string;
  validation_id: string;
}
import { IPromotionBadge } from "../../../pages/new-landing-page/store/shop-device.model";
import { ICardOptions } from 'app/shared/models/general.model';
import { iCreditReload, iInternetPass, iPrepaidPass, iAdditionalPayload } from './prepaid.model';

@Component({
  selector: 'app-prepaid',
  templateUrl: './prepaid.component.html',
  styleUrls: ['./prepaid.component.scss']
})
export class PrepaidComponent implements OnInit, AfterContentInit, OnDestroy {
  // Lazy load
  showPersonalDetailsBlock = false;
  loadNumber = false;
  isLoading = true;
  mobile_number: string;
  sku: string;
  total_pay: number;
  is404 = false;
  data404 = {
    "Name": "Plan not found",
    "Api": PAGE_NOT_FOUND_URL,
  };

  campaignMviva$: Observable<iMvivaCampaign>;
  typeOfPurchase$: Observable<typeOfPurchaseEnum>;
  typeOfPurchase: typeOfPurchaseEnum;
  typeOfPurchaseOptions = typeOfPurchaseEnum;

  prePaidNricCustID: string;
  prePaidNricValidationID: string;
  prePaidNricRespToken: string;
  plan$: Observable<iPlan>;
  promotionText?: string;
  promotionBadge?: IPromotionBadge;
  popupData = {
    title: 'Email successfully sent!',
    content: 'Please check your mailbox.',
    button: 'Ok',
  };
  showPopup = false;
  isBrowser: boolean;
  referalId: string;
  campaignCode: string;
  isCSAgentDealer = false;

  idDetails;
  selectedInternetPassSku: string;

  private _refPlanData: iPlan;
  checkoutButtonEnabled$: Observable<boolean>;

  public get _planData() {
    return this._refPlanData;
  }

  public set _planData(value) {
    this._refPlanData = value;
  }

  reloadOptions: ICardOptions[] = [];
  selectedCreditReload: iCreditReload;

  prepaidInternetPasses: iPrepaidPass[];
  selectedInternetPass: iPrepaidPass;

  internetPassType$: Observable<string>;
  selectedInternetPass$: Observable<iPrepaidPass>;

  isMnp = false; // ! Turn on when MNP is enabled for Xpax

  @ViewChild('creditReloadCheckbox') creditReloadCheckbox: ElementRef;
  @ViewChild('internetPassCheckbox') internetPassCheckbox: ElementRef;

  data: {
    newLinePrice: number;
  } = {
    newLinePrice: 0,
  };

  totalPayment = 0;

  flags: {
    showEKyc: boolean;
    showPassport: boolean;
  } = {
    showEKyc: false,
    showPassport: false,
  };

  // Form
  @ViewChild(PersonalInformationComponent)
  set section3(v: PersonalInformationComponent) {
    if (v) {
      this.personalDetails = v.personalDetails;
    }
  }
  personalDetails: FormGroup;
  isNewLineCompleted = false;

  additionalRequestPayload: iAdditionalPayload;

  @ViewChild("section3", { static: false }) section3ref: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _route: ActivatedRoute,
    private _router: Router,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _prepaidService: PrepaidService,
    private _plansService: PlansService,
    private _planQuery: PlansQuery,
    private _topService: TypeofPurchaseService,
    private _topQuery: TypeofPurchaseQuery,
    private _deviceDataService: DeviceDataService,
    private _userService: UserService,
    private _guestService: GuestCheckoutService,
    private _modalService: ModalService,
    private _loginService: LoginService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this._plansService.updateIsPrepaid(true);
    this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(status => {
      if (status === false) {
        this.showPopup = false;
      }
    });
    this.plan$ = this._planQuery.select(store => store.plan);
    this.internetPassType$ = this._planQuery.select(store => store.internet_pass_type);
    this.selectedInternetPass$ = this._planQuery.select(store => store.internet_pass_item);
    this.selectedInternetPass$.subscribe((data) => {
      this.selectedInternetPass = data;
    });
    this.plan$.subscribe((plan) => {
      this.sku = plan?.sku;
      this.totalPayment = plan?.PlanMonthlyPay;
    });

    this.typeOfPurchase$ = this._topQuery.select(s => s.type);
    this.campaignMviva$ = this._planQuery.select(s => s.mviva_campaign);
    this.checkoutButtonEnabled$ = this._planQuery.select(s => s.checkout_button_enabled);

    combineLatest([
      this._route.params,
      this._route.queryParams,
    ]).pipe(
      untilDestroyed(this),
    )
    .subscribe(([ params, queryParams ]) => {
      this.referalId = queryParams?.refID;
      this.campaignCode = queryParams?.campaignCode;
    });

    const currentUrl: string = this._router.routerState.snapshot.url;
    this._route.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
    if (this.isBrowser && localStorage) {
      localStorage.setItem("ls_subnav", JSON.stringify({ "activeMenu": "Prepaid", "currentURL": "plans/prepaid/Xpax" }));
    }

    combineLatest([
      this._route.params,
      this._route.queryParams,
    ])
      .pipe(untilDestroyed(this))
      .subscribe(data => this.manageDeeplink(...data));

    // this.personalDetails.valueChanges.subscribe(data => {
    //   this._plansService.updateIsPersonalDetailFormValid(this.personalDetails.valid);
    // });
    this._deviceDataService.addtoCartTriggered$.subscribe(() => {
      this.onAddToCart();
    });

    this.subscribeForLocalVars();
  }

  subscribeForLocalVars() {
    combineLatest([
      this._planQuery.select(s => s.internet_pass_item),
      this._planQuery.select(s => s.prepaid_credit_reload),
      this.typeOfPurchase$,
    ])
    .pipe(untilDestroyed(this))
    .subscribe(([
        internetPass,
        creditReload,
        typeOfPurchase
      ]) => {
      const monthlyPay = this._planData?.prepaid_pack?.price || this._planData?.PlanMonthlyPay;
      this.typeOfPurchase = typeOfPurchase;

      if (typeOfPurchase === typeOfPurchaseEnum.mnp) {
        this.totalPayment = 0;
      } else if (internetPass || creditReload) {
        this.totalPayment = (+internetPass?.price || 0) + (+creditReload?.price || 0) + (+monthlyPay || 0);
      } else {
        this.totalPayment = +monthlyPay;
      }
    });
  }

  ngAfterContentInit(): void {
    if (this.isBrowser) {
      this.isCSAgentDealer = !isNullOrUndefined(sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"));
    }
  }

  ngOnDestroy() {
    this._plansService.updateIsPrepaid(false);
  }

  manageDeeplink(params, queryParams) {
    const planSku = params.sku || 'Xpax';

    this._prepaidService.loadPlan(planSku, queryParams)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(data => {
        try {
          this._planData = data.tabData;

          this._plansService.selectPlan(data.tabData);
          this._plansService.updateAPIResponse(data);
          this._estoreAnalyticsService.SetProductDetails(data.tabData, this._renderer);
          this._estoreAnalyticsService.SetProductId(planSku, this._renderer);
          this._estoreAnalyticsService.SetProductType("Prepaid Plan");
          this._estoreAnalyticsService.SetCategoryTwoForAdobeDataLayer(this._renderer);

          this.data.newLinePrice = data.tabData.PlanMonthlyPay;
          this.totalPayment = data.tabData.PlanMonthlyPay;
          this.flags.showPassport = !!data.passport;
          this.promotionText = data.promotion_text;
          this.promotionBadge = data.promotion_badge;

          /* Load the blocks of Prepaid Campaign - Dynamic sim */
          this.loadInternetPasses();
          this.setReloadOptions();

          if (this._planData?.prepaid_campaign) {
            this.isMnp = !!this._planData?.prepaid_campaign?.purchase_type?.includes('mnp');
          }
          this.additionalRequestPayload = { 
            material_code: this._planData?.material_code 
          };
        } catch (_error) {
          this._deviceDataService.publishPageNotFound(true);
          this.is404 = true;
        }
      }, error => {
        this._deviceDataService.publishPageNotFound(true);
        this.is404 = true;
      });
  }

  loadInternetPasses() {
    const internetPasses: iInternetPass[] = this._planData?.internet_passes || [];
    if (internetPasses.length === 0) { return; }

    // find default internet pass
    const defaultPass = internetPasses?.[0]?.items?.find((item) => {
      if (item.is_default === '1') {
        this.selectedInternetPassSku = item.sku;
        if (!this.selectedInternetPass) {
          this._plansService.selectInternetPassItem(item);
        }
        return item;
      }
    });
    // load internet passes from the category of default pass
    const selectedCategoryTab = defaultPass?.category_tab || internetPasses?.[0]?.category_tabs[0].name;
    this.selectInternetPassCategory(selectedCategoryTab);
  }

  selectInternetPassCategory(selectedTab) {
    this.prepaidInternetPasses = this._planData?.internet_passes?.[0]?.items.filter((item) => {
      if (item.category_tab === selectedTab) {
        return item;
      }
    });
    this._plansService.selectInternetPasstype(selectedTab);
  }

  handleSelectedInternetPass(sku: string) {
    this.checkIsNumberSelected(() => {
      this._planData?.internet_passes?.[0]?.items?.forEach((item) => {
        if (sku === item?.sku) {
          this.selectedInternetPassSku = item.sku;
          this._plansService.selectInternetPassItem(item);
        }
      });
    });
  }

  ekycSuccess($event) {
    if ($event) {
      this._prepaidService.handleEKycSuccess();
    }
  }

  toggleCheckboxInternetPass(event) {
    this.checkIsNumberSelected(() => {
      if (event.preventDefault) { event.preventDefault(); }

      if (isNullOrUndefined(this.selectedInternetPass)) {
        this.loadInternetPasses();
      } else {
        this.selectedInternetPassSku = null;
        this._plansService.selectInternetPassItem(null);
      }
    });
  }


  setReloadOptions() {
    const creditReloads: iCreditReload[] = this._planData?.credit_reload || [];
    if (creditReloads.length === 0) { return; }

    this.reloadOptions = creditReloads?.map(reload => ({
      label: "<div style='font-size:18px'><strong>" + reload.name + "</strong></div>"
              + reload.validity + " validity",
      value: reload.sku
    }));
    // select default credit reload
    this.selectDefaultReload();
  }

  handleSelectedReloadOption(reloadSku) {
    this.checkIsNumberSelected(() => {
      this.selectedCreditReload = this._planData?.credit_reload?.find((item) => {
        if (item.sku === reloadSku) {
          return item;
        }
      });
      this._plansService.selectPrepaidCreditReload(this.selectedCreditReload);
    });
  }

  selectDefaultReload() {
    const defaultCreditReload = this._planData?.credit_reload?.find((reload) => {
      if (reload.is_default === '1') {
        return reload;
      }
    });
    this.selectedCreditReload = defaultCreditReload || this._planData?.credit_reload?.[0];
    this._plansService.selectPrepaidCreditReload(defaultCreditReload);
  }

  toggleCheckboxReload(event) {
    this.checkIsNumberSelected(() => {
      if (event.preventDefault) { event.preventDefault(); }

      if (isNullOrUndefined(this.selectedCreditReload)) {
        this.selectDefaultReload();
      } else {
        this.selectedCreditReload = null;
        this._plansService.selectPrepaidCreditReload(null);
      }
    });
  }

  onSelectNumber(number: string) {
    if (number?.trim().length > 0) {
      this.section3ref.nativeElement.scrollIntoView();
      // this._topService.selectTypeofPurchase("newline");
      this._topService.selectMobileNumber(number);
      this.mobile_number = number;
    } else {
      // this._topService.selectTypeofPurchase(null);
      this._topService.selectMobileNumber(null);
      if (this.isNewLineCompleted) {
        this._topService.updateNewLineCompleted(true);
      }
      this.mobile_number = null;
    }
  }

  onAddToCart() {
    if (this.typeOfPurchase === typeOfPurchaseEnum.mnp) {
      this.onAddToCartMNP();
      return;
    }

    this.personalDetails.markAllAsTouched();
    const isMvivaCampaign = !!(this._planQuery.getValue().mviva_campaign);

    if (this.personalDetails.valid) {
      // submit
      let data = {
        "data": {
          "Sku": this.sku,
          "TotalPay": +this.totalPayment,
          "selected_number": this.mobile_number,
          "selected_number_type": "NewNumber",
          ...this.personalDetails.value,
          ...this.idDetails,
          "primaryNumber": this.personalDetails.get('primaryNumber').value + '',
          "secondaryNumber": this.personalDetails.get('secondaryNumber').value + '',
          "customerId": this.prePaidNricCustID,
          "validation_id": this.prePaidNricValidationID,
          "token": this.prePaidNricRespToken,
          "referrer_id": this.referalId,
          "referrer_campaign_code": this.campaignCode,
          "prepaid_campaign_code": this.campaignCode || null,
          "selected_internet_pass": this.selectedInternetPass?.sku || null,
          "selected_credit_reload": this.selectedCreditReload?.sku || null,
          "selected_prepaid_pack": this._planData?.prepaid_pack?.sku || "Xpax",
        }
      };

      if (isMvivaCampaign) {
        data = {
          data: {
            ...data.data,
            is_campaign_mviva: true,
            campaign_mviva_url: this._router.url?.replace('%20', ' '),
          }
        };
      }

      this._prepaidService.addToCart(data).subscribe(this.handleAddToCartResponse);
    } else {
      this.section3ref.nativeElement.scrollIntoView();
      setTimeout(() => {
        this._plansService.updateAddtocartError(true);
      }, 1000);
    }

  }

  onAddToCartMNP() {
    this._prepaidService.retriveNumbers()
      .subscribe(response => {
        const mobileNumbers = response.map(element => ({ number: element.servicenum }));
        this.getRandomNumber({ mobile_numbers: mobileNumbers });
      }, err => {
        this.showErrorMessage(err.error);
      });
  }

  getRandomNumber(numbersList: any) {
    this._prepaidService.getRandomNumber(numbersList)
      .subscribe(response => {
        if (response.status) {
          if (response.reservation_id) {
            this.proceedAddToCartMNP(response.reservation_id, response.number);
          }
        } else {
          this.showErrorMessage(response);
        }
      }, err => {
        this.showErrorMessage(err.error);
      });
  }

  proceedAddToCartMNP(reservation_id, temporary_number) {
    // * setting data in session storage
    // ? needed in personal-details for Passport Guests
    sessionStorage.removeItem(XPAX_MNP_DATA);
    sessionStorage.setItem(XPAX_MNP_DATA, JSON.stringify(this._prepaidService.mnpData));

    const data = {
      "data": {
        "sub_pass_sku": "Xpax",
        "is_prepaid": true,
        "selected_device_product_up_fornt_price": 0,
        "selected_device_product_device_price": "0.00",
        "bundle_product_qty": "1",
        "bundle_product_price": "0",
        "user": "user",
        "selected_number": this._prepaidService.mnpData.phone,
        "selected_number_type": "SwitchToCelcom",
        temporary_number,
        "is_mnp": true,
        "is_cobp": false,
        "is_preorder": false,
        "is_affiliate_ia": false,
        "is_affiliate_ada": false,
        "add_on_ids": null,
        "reservationId": reservation_id,
        "campaign_mviva_url": "",
        "is_golden_number": false,
        "is_star_internet_share": false,
        "validated_id": this._prepaidService.mnpData.validation_id,
        "is_campaign_omni": false,
        "Sku": "Xpax",
        "TotalPay": 0
      },
      "supp_data": []
    };
    this._prepaidService.addToCartMNP(data)
      .subscribe(this.handleAddToCartResponse);
  }

  showErrorMessage(message?: string) {
    this._plansService.updateAddtocartError(true);
    this.popupData.title = '';
    this.popupData.content = message ?? errorconst.SYS_DOWN_MSG;
    this.showPopup = true;
  }

  handleAddToCartResponse = response => {
    if (!response[0]?.status) {
      this._plansService.updateAddtocartError(true);
      this.popupData.title = '';
      this.popupData.content = response[0]?.message || errorconst.SYS_DOWN_MSG;
      this.showPopup = true;
    } else {
      this._router.navigateByUrl('/store/checkout/summary');
    }
  }

  getPrePaidNricStatus(val: any) {
    this.idDetails = {
      idType: val.idType,
      idNumber: val.idNumber
    };
    this.showPersonalDetailsBlock = val.personalDetailsForm;
    this.prePaidNricCustID = val.custId;
    this.prePaidNricValidationID = val.validationID;
    this.prePaidNricRespToken = val.respToken;
    this.isNewLineCompleted = val?.isNewLineEligible;
  }

  removeHTMLTags(input: string): string {
    return removeHTMLTags(input);
  }

  getPrepaidBannerStyle(bannerUrl): { [key: string]: string } {
    return bannerUrl
           ? {
              'background-image': `url('${ bannerUrl }')`
            }
           : {};
  }

  checkIsNumberSelected(cb) {
    if (this.typeOfPurchase !== null && this.mobile_number) {
      this._modalService.showConfirm({
        title: 'Are you sure?',
        message: 'Proceeding this action will reset all your previous selection.'
      })
        .subscribe(result => {
          if (result) {
            this.onSelectNumber('');
            if (this._planData?.internet_passes?.length) {
              this.internetPassCheckbox['checked'] = !this.selectedInternetPass;
              this.creditReloadCheckbox['checked'] = !this.selectedCreditReload;
            }
            cb();
          }
        });
    } else {
      cb();
    }
  }

  selectTypeOfPurchase(event: string) {

    selectTypeOfPurchase(
      this._userService,
      this._modalService,
      () => this.checkIsNumberSelected(() => {
        this.flags.showEKyc = false;
        this._topService.selectTypeofPurchase(event);
      })
    );

  }

  handleMnpEligible({ idType, idNumber, response, phone, user, msdin, validation_id }: IOnMNPEligibleSuccessParams) {
    this._prepaidService.setMNPData({ idNumber, idType, loginResponse: response, phone, msdin, user, validation_id });
    sessionStorage.setItem('TempUserToken', user === "mc" ? response.user_token : response.token);
    this.flags.showEKyc = true;
  }

  handleMnpReset() {
    this.flags.showEKyc = false;
    this._topService.updateeKycStatus(false);
    sessionStorage.removeItem('TempUserToken');
    sessionStorage.removeItem('TempGuestLogin');
  }
}
