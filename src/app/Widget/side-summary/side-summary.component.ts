import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
  HostListener,
  Input,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { DeviceDataService, iBasePlan } from '../../Service/devicedata.service';
import { PlansQuery } from './side-summary-container/plans.store';
import { Observable, combineLatest } from 'rxjs';
import { TypeofPurchaseQuery, typeOfPurchaseEnum } from './side-summary-container/type-of-purchase.store';
import { iPass, iPlan, iPlanPrice, iOmniCampaign, iLifeStyleContract } from '../../shared/models/plan.model';
import { iPlanDevice, iPlanDeviceBundle, iMvivaCampaign, iSupplementary } from '../../shared/models/device.model';
import { PlansService } from 'app/Service/plans.service';
import { COBPResponse } from '../../shared/models/cobp.model';
import { GuestCheckoutService } from 'app/Store/guest-checkout/services/guest-checkout.service';
import { UserService } from 'app/Service/user.service';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import {untilDestroyed} from "../../shared/services/until-destroyed.service";
import { getCOBPErrorFromResponse } from 'app/shared/utilities/helper.ultility';
import { iCreditReload, iPrepaidPack, iPrepaidPass } from 'app/Store/plan/prepaid/prepaid.model';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('in', style({
      'max-height': '100vh'
    })),
    state('out', style({
      'max-height': '0vh',
    })),
    transition('in => out', [group([
      animate('600ms ease-in-out', style({
        'max-height': '0vh',
        'height': '0px'
      })),
    ]
    )]),
    transition('out => in', [group([
      animate('1ms ease-in-out', style({
        'display': 'block'
      })),
      animate('600ms ease-in-out', style({
        'max-height': '100vh',
        'height': '*'
      })),
    ]
    )])
  ]),
];

@Component({
  selector: 'app-side-summary',
  templateUrl: './side-summary.component.html',
  styleUrls: ['./side-summary.component.scss'],
  animations: [SlideInOutAnimation]
})
export class SideSummaryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() onExpanded: EventEmitter<boolean> = new EventEmitter();
  @Output() onAddtoCartClick: EventEmitter<any> = new EventEmitter();
  @Input() overrideTotalPrice = false;
  @Input() totalPrice = 0;
  @Input() isLoading = false;

  isEsim = false;
  topEnum = typeOfPurchaseEnum;

  isExpanded = false;
  isBrowser = false;
  isPrepaid = false;
  isFamilyPlan = false;
  isBroadband = false;
  isEnableScrollbar = true;
  totalPay$;
  headerHeight = 75;
  additionalStyles = {};
  mvivaCampaign: iMvivaCampaign;

  summary_contents = {
    plan: {
      base_name: '',
      plan_name: '',
      monthly_charges: '',
      mobile_number: '',
      upfront_payment: '',
      type_of_purchase: ''
    },
    device: [],
    supplementary: []
  };

  planName$: Observable<string>;
  basePlan$: Observable<iBasePlan>;
  basePrice$: Observable<number>;
  pass$: Observable<iPass>;
  plan$: Observable<iPlan>;
  planPrice$: Observable<number>;
  prepaidCampaignPack$: Observable<iPrepaidPack>;
  showPlanPrices$: Observable<boolean>;
  selectPlanMonthlyPay$: Observable<iPlanPrice>;
  selectPlanMonthlyCharges$: Observable<number>;
  upfrontPayment$: Observable<number>;
  upfrontPaymentWaived$: Observable<boolean>;
  isPreorder$: Observable<boolean>;
  isPreorderEnded$: Observable<boolean>;
  device$: Observable<iPlanDevice>;
  deviceCombo$: Observable<iPlanDevice>;
  isComboPhone$: Observable<boolean>;
  devicePrice$: Observable<number>;
  deviceBundle$: Observable<iPlanDeviceBundle>;
  deviceBundleCombo$: Observable<iPlanDeviceBundle>;
  isMoon$: Observable<boolean>;
  isEasyPhone$: Observable<boolean>;
  isDeviceBundle$: Observable<boolean>;
  deviceBundleTypeLabel$: Observable<string>;
  checkoutButtonEnabled$: Observable<boolean>;
  mvivaCampaign$: Observable<iMvivaCampaign>;
  omniCampaign$: Observable<iOmniCampaign>;
  isPrepaid$: Observable<boolean>;
  isFamilyPlan$: Observable<boolean>;
  isCobpElgible$: Observable<boolean>;
  easyphoneSelectedContractPeriod$: Observable<string>;
  deviceBundleSelectedContractPeriod$: Observable<string>;
  supplementaryDataLabel$: Observable<string>;

  topType$: Observable<string>;
  principalLine$: Observable<string>;
  supplementaryLines$: Observable<iSupplementary[]>;
  autobilling$: Observable<number>;
  cobpResponse$: Observable<COBPResponse[]>;
  shareQuota$: Observable<boolean>;

  isPlanOnly$: Observable<boolean>;
  isPlanOnly: boolean;
  isLegacyPlan: boolean;
  enableLifeStyleSection$: Observable<boolean>;
  lifeStyleContract$: Observable<iLifeStyleContract>;
  internetPrepaidPass$: Observable<iPrepaidPass>;
  reloadItem$: Observable<iCreditReload>;
  lifeStyleContract: iLifeStyleContract;
  addToCartClicked = false;
  popupData = {
    title: '',
    content: 'Please try again!',
    button: 'Ok',
  };
  showPopup = false;

  useMaterialTheme = true;
  isMobile = false;
  cobpErrorMsg: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _deviceDataService: DeviceDataService,
    private _planQuery: PlansQuery,
    private _topQuery: TypeofPurchaseQuery,
    private _plansService: PlansService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _guestService: GuestCheckoutService,
    private _userService: UserService,
    ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onResize(_event) {
    if (this.isBrowser) {
      const currentHeight = +(<any>document.getElementsByClassName('r-page')[0])?.offsetHeight;
      if (window.innerWidth > 768) {
        this.isMobile = false;
        this.isEnableScrollbar = true;
        this.isExpanded = false;
        // if (this.headerHeight == currentHeight) return;
        this.headerHeight = currentHeight;
        this.additionalStyles = {
          'max-height': `calc(${window.innerHeight - this.headerHeight}px ${this.useMaterialTheme ? '- 80px' : '' })`,
          'position': 'sticky',
          'top': !this.useMaterialTheme ? `${this.headerHeight}px` : `calc(${this.headerHeight}px + 40px)`,
          'bottom': !this.useMaterialTheme ? 0 : '40px'
        }
      } else {
        this.isMobile = true;
        this.isEnableScrollbar = false;
        // if (this.headerHeight == currentHeight) return;
        this.headerHeight = currentHeight;
        this.additionalStyles = {
          'max-height': `calc(${window.innerHeight}px - ${this.headerHeight}px)`,
          'top': !this.useMaterialTheme ? `0px` : `${this.headerHeight}px`,
          'position': !this.useMaterialTheme ? `relative` : `fixed`,
        }
      }
    }
  }

  /**
   * Prepare for future enhancement for zero upfront conditions
   */
  get planZeroUpfront() {
    return (
      (this.isPlanOnly && this.isLegacyPlan && this._userService.isUserEnterprise()) ||
      // ? Prepaid Third Party CLM campaign
      (this.isPrepaid && this.mvivaCampaign?.can_buy_supplementary_lines === "0")
    );
  }

  ngOnInit() {
    this.totalPay$ = this._deviceDataService.sharedTotalpay$;
    combineLatest(
      this._route.data,
      this._route.parent?.data,
      this._route.children?.[0]?.data,
    )
    .subscribe(data => {
      const dt = {
        ...data[0],
        ...data[1],
        ...data[2],
      }
      // ! Not getting called for Prepaid Page
      const { isPrepaid, isBroadband, useMaterialTheme, isFamilyPlan } = dt;
      this.isPrepaid = isPrepaid;
      this.isFamilyPlan = isFamilyPlan;
      this.isBroadband = isBroadband;
      if (!this.isPrepaid && this.isBrowser) {
        if (sessionStorage.getItem('prepaiduser')) {
          for (const session of [
            'UserToken',
            'authtoken',
            'personalForm',
            'USER_TYPE',
            'GuestInfo',
            'OLD_GUEST_USER',
            'prepaiduser',
            'UserInfo'
          ]) {
            sessionStorage.removeItem(session);
          }
          this._guestService.setGuestUserName(null);
        }
      }
      this.isEsim = data['isEsim'];
      this.useMaterialTheme = !!useMaterialTheme;
    });
    this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(status => {
      if (status === false) {
        this.showPopup = false;
      }
    });

    this.basePlan$ = this._planQuery.select(store => store.base_plan);
    this.basePrice$ = this._planQuery.select(store => store.base_price);
    this.planPrice$ = this._planQuery.select(store => store.plan_price);
    this.pass$ = this._planQuery.select(store => store.pass);
    this.plan$ = this._planQuery.select(store => store.plan);
    this.showPlanPrices$ = this._planQuery.select(store => store.show_plan_prices);
    this.prepaidCampaignPack$ = this._planQuery.select(store => store.api_response?.tabData?.prepaid_pack);
    this.selectPlanMonthlyPay$ = this._planQuery.select(store => store.monthly_pays);
    this.selectPlanMonthlyCharges$ = this._planQuery.select(store => store.total_monthly_charges);
    this.upfrontPayment$ = this._planQuery.select(store => store.upfront_payment);
    this.upfrontPaymentWaived$ = this._planQuery.select(store => store.upfront_payment_waived);
    this.isPreorder$ = this._planQuery.select(store => store.is_preorder);
    this.isPreorderEnded$ = this._planQuery.select(store => store.is_preorder_ended);
    this.device$ = this._planQuery.select(store => store.device);
    this.deviceCombo$ = this._planQuery.select(store => store.device_combo);
    this.isComboPhone$ = this._planQuery.isComboPhone$;
    this.devicePrice$ = this._planQuery.select(store => store.device_price);
    this.deviceBundle$ = this._planQuery.select(store => store.device_bundle);
    this.deviceBundleCombo$ = this._planQuery.select(store => store.device_bundle_combo);
    this.isMoon$ = this._planQuery.select(store => store.isMoon);
    this.isEasyPhone$ = this._planQuery.isEasyPhone$;
    this.isDeviceBundle$ = this._planQuery.isDeviceBundle$;
    this.deviceBundleTypeLabel$ = this._planQuery.select(store => store.device_bundle_type_label);
    this.checkoutButtonEnabled$ = this._planQuery.select(store => store.checkout_button_enabled);
    this.mvivaCampaign$ = this._planQuery.select(store => store.mviva_campaign);
    this.omniCampaign$ = this._planQuery.select(store => store.omni_campaign);
    this._planQuery.isPlanOnly$.subscribe(data => this.isPlanOnly = data);
    this._planQuery.isLegacyPlan$.subscribe(data => this.isLegacyPlan = data);
    this.easyphoneSelectedContractPeriod$ = this._planQuery.select(store => store.easyphone_selected_contract_period);
    this.deviceBundleSelectedContractPeriod$ = this._planQuery.select(store => store.device_bundle_selected_contract_period);
    this.isPrepaid$ = this._planQuery.select(store => store.isPrepaid);
    this.isFamilyPlan$ = this._planQuery.select(store => store.isFamilyPlan);
    this.isCobpElgible$ = this._topQuery.isCOBPEligible$;
    this.topType$ = this._topQuery.select(store => store.type);
    this.principalLine$ = this._topQuery.select(store => store.mobile_number);
    this.supplementaryLines$ = this._topQuery.select(store => store.supplementary_lines);
    this.autobilling$ = this._topQuery.select(store => store.autobilling);
    this.cobpResponse$ = this._topQuery.select(store => store.cobp_response);
    this.cobpResponse$.subscribe(data => {
      this.cobpErrorMsg = getCOBPErrorFromResponse(data?.[0]);
    });
    this.shareQuota$ = this._topQuery.select(store => store.share_quota);
    this._deviceDataService.sharedDisclaimerAgree$.subscribe(data => this.addToCartClicked = false);
    this.supplementaryDataLabel$ = this._planQuery.select(store => store.api_response?.supp_rebate_label);
    this.enableLifeStyleSection$ = this._planQuery.select(store => store.api_response?.tabData?.enableLifeStyleSection);
    this.lifeStyleContract$ = this._planQuery.select(store => store.lifestyle_voucher);
    this.internetPrepaidPass$ = this._planQuery.select(store => store.internet_pass_item);
    this.reloadItem$ = this._planQuery.select(store => store.prepaid_credit_reload);
    this._deviceDataService.sharedSupplimentaryLines$.subscribe(data => {
      this.summary_contents.supplementary = data.map(d => {
        return {
          plan_name: d.planType,
          monthly_charges: +d.planPrice,
          mobile_number: d.planPhoneNumber,
          upfront_payment: +d.planPrice,
        }
      });
    });

    this._planQuery.select(store => store.addtocart_error).subscribe(err => {
      if (this.addToCartClicked) {
        this.addToCartClicked = false;
        this._plansService.updateAddtocartError(false);
      }
    });

    this.subscribeForLocalVars();
  }

  subscribeForLocalVars() {
    combineLatest([
      this.mvivaCampaign$,
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([mvivaCampaign]) => {
        this.mvivaCampaign = mvivaCampaign;
      })
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.onResize(null);
      }, 0);
    }
  }

  ngOnDestroy() {  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    this.onExpanded.emit(this.isExpanded);
  }

  getSuppMonthlyPrice(supplines: iSupplementary[], share_quota: boolean = false): number{
    let total =  supplines.reduce((a, b) => {
      return a + (+b.planPrice);
    }, 0);
    total = isNaN(total) ?  0 : total;
    if (share_quota) {
      total += 10 * supplines.length;
    }
    return total;
  }

  onCheckoutBtnClicked(){
    // Prevent prepaid user making order of non prepaid
    if (!this.isPrepaid && this.isBrowser && sessionStorage.getItem('prepaiduser')) {
      this.popupData.content = 'You are not eligible to purchase this product! Please logout and login again to continue!';
      this.showPopup = true;
      return false;
    }
    const url = this._router.url;
    if(this.isBrowser) {
      sessionStorage.setItem("backUrl",url);
      // re-enable checkout button after 5 seconds
      setTimeout(() => {
        this.addToCartClicked = false;
      }, 5000);
    }
    this._deviceDataService.triggerAddToCart();
    this.addToCartClicked = true;
    this.onAddtoCartClick.emit(true);
  }

  getNumberLabel(topType: string, isPrepaid: boolean) {
    if (this.isFamilyPlan) {
      return 'Principal Line';
    } else if (isPrepaid) {
      if (topType === typeOfPurchaseEnum.newline) {
        return 'New Number';
      }
      return `${topType}`;
    } else if (this.isBroadband) {
      return 'New Number';
    } else if (topType === typeOfPurchaseEnum.cobp) {
      return `${ topType } (Principal)`;
    } else if (topType === typeOfPurchaseEnum.newline) {
      return 'New Line (Principal)';
    }
    return `${topType} (Principal)`;
  }
}
