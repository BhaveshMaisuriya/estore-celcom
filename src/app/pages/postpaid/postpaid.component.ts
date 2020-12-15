import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Renderer2, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PostpaidService } from './postpaid.service';
import { PlansService } from 'app/Service/plans.service';
import { combineLatest, Observable } from 'rxjs';
import { untilDestroyed } from 'app/shared/services/until-destroyed.service';
import { map, finalize } from 'rxjs/operators';
import { isNullOrUndefined, removeHTMLTags, CLMOmniDataSanitizer, getCOBPErrorFromResponse} from 'app/shared/utilities/helper.ultility';
import { iGeneralServerResponse } from 'app/shared/models/general.model';
import { TypeofPurchaseService } from 'app/Service/type-of-purchase.service';
import { iPass, iPlanMega, iPlan, STAR_SPEED_PASS_SKU, STAR_GB_PASS_SKU, iOmniCampaign, iLifeStyleContract, GenericPlanData, planTypeEnum, MOON_PLAN_PREFIX } from 'app/shared/models/plan.model';
import { iBasePlan } from 'app/Service/devicedata.service';
import { iBasePlanToDisplay } from 'app/shared/components/plans/base-plan-wrapper/base-plan-wrapper.component';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { iAddonPlanToDisplay } from 'app/shared/components/plans/addon-plan-wrapper/addon-plan-wrapper.component';
import {
  typeOfPurchaseEnum,
  TypeofPurchaseQuery
} from 'app/Widget/side-summary/side-summary-container/type-of-purchase.store';
import { iNumberReservationRequest, iNumberReservationRequestData, iSupplementaryData, addTocartBundle, NewLineAddtocartData, COBPAddtocartData, MNPAddtocartData } from 'app/models/general.model';
import { environment } from 'environments/environment';
import { ModalService } from 'app/shared/components/modal/modal.service';
import { MnpService } from '../../Store/mnp/services/mnp.service';
import { EStoreAnalysticsService } from 'app/Service/store.analytic.service';
import { COBPResponse } from 'app/shared/models/cobp.model';
import { iSupplementary, iMvivaCampaign, iPlanDevice, iPlanDeviceBundle } from "../../shared/models/device.model";
import { UserService } from '../../Service/user.service';
import { iLifeStyleVoucherToDisplay } from 'app/shared/components/plans/lifestyle-voucher-wrapper/lifestyle-voucher-wrapper.component';
import { resetStores } from '@datorama/akita';
import { appendPlanTitle } from 'app/shared/utilities/helper.ultility';

@Component({
  selector: 'app-postpaid',
  templateUrl: './postpaid.component.html',
  styleUrls: ['./postpaid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostpaidComponent implements OnInit, AfterViewInit, OnDestroy {

  private _refPlanData: GenericPlanData;

  public get _planData() {
    return this._refPlanData;
  }

  public set _planData(value) {
    this._planService.updateAPIResponse(value?.original_response);
    this._refPlanData = value;
  }

  private plansInitialized = false;


  basePlan$: Observable<iBasePlan>;
  pass$: Observable<iPass>;
  plan$: Observable<iPlan>;
  topType$: Observable<typeOfPurchaseEnum>;
  isLoadingAPIResponse$: Observable<boolean>;
  isLoadingToP$: Observable<boolean>;
  lifestyleContractVoucher$: Observable<iLifeStyleContract>;
  upfrontPayment$: Observable<number>;
  upfrontPaymentWaived$: Observable<boolean>;
  private supplementaryLines$: Observable<iSupplementary[]>;

  promoTerms: string;

  pass_speed_sku = STAR_SPEED_PASS_SKU;
  pass_gb_sku = STAR_GB_PASS_SKU;

  totalPayment = 0;

  base_plan: iBasePlan;
  mobile_number: string;
  supp_part_number: string;
  supplementary_numbers: string[];
  share_quota: boolean;
  top_type: typeOfPurchaseEnum;
  mnp_response: any;
  cobp_response: COBPResponse;
  enableLifestyleSection: boolean;
  disable_lifestylevoucher: boolean;

  pass: iPass;
  plan: iPlan;
  deviceBundle: iPlanDeviceBundle;
  device: iPlanDevice;

  @ViewChild('planOnlyCheckbox') planOnlyCheckbox: ElementRef;
  @ViewChild('lifeStyleCheckbox') lifeStyleCheckbox: ElementRef;


  isNewLine: boolean = true;
  isCobp: boolean = true;
  isMnp: boolean = true;

  isCampaign = false;
  campaignMviva: iMvivaCampaign;
  campaignOmni: iOmniCampaign;
  isBrowser: boolean;
  selectedContract: string;
  refPlanTypeEnum = planTypeEnum;
  cobpErrorMsg: string = null;
  lifeStyle_note: string;

  @ViewChild('plansAnchor') plansAnchor: ElementRef;
  @ViewChild('sizeupAnchor') sizeupAnchor: ElementRef;
  @ViewChild('topAnchor') topAnchor: ElementRef;
  lifestyle_voucher: any;
  deselectVoucher: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _postpaidService: PostpaidService,
    private _planService: PlansService,
    private _planQuery: PlansQuery,
    private _topService: TypeofPurchaseService,
    private _topQuery: TypeofPurchaseQuery,
    private _modalService: ModalService,
    private _router: Router,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private mnpService: MnpService,
    private _userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get isEnterprise() {
    return this._userService.isUserEnterprise();
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }

  ngOnInit(): void {

    this.basePlan$ = this._planQuery.select(s => s.base_plan);
    this.pass$ = this._planQuery.select(s => s.pass);
    this.plan$ = this._planQuery.select(s => s.plan);

    this.upfrontPayment$ = this._planQuery.select(s => s.upfront_payment);
    this.upfrontPaymentWaived$ = this._planQuery.select(s => s.upfront_payment_waived);

    this.supplementaryLines$ = this._topQuery.select(s => s.supplementary_lines);

    this.topType$ = this._topQuery.select(store => store.type);
    this.isLoadingAPIResponse$ = this._planQuery.selectLoading();
    this.isLoadingToP$ = this._topQuery.selectLoading();
    this.lifestyleContractVoucher$ = this._planQuery.select(s =>s.lifestyle_voucher);

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

    this.calculateTotalPrice();
    this.subscribeForLocalVars();
  }

  calculateTotalPrice() {
    combineLatest([
      this.upfrontPayment$,
      this.upfrontPaymentWaived$,
      this._planQuery.select(s => s.device_price),
      this.supplementaryLines$,
      this.topType$,
      this.lifestyleContractVoucher$,
      this._topQuery.select(s => s.cobp_response),
    ]).pipe(
      untilDestroyed(this)
      ).subscribe((resp: any[]) => {
        const [upfront,
          waived,
          devicePrice,
          suppLines,
          topType,
          lifestyle_contract_voucher,
          cobp_response,
        ] = resp;
        // ? No payment for MNP
        if (!waived && topType !== typeOfPurchaseEnum.mnp) {
          let upfrontpay;
          if (!lifestyle_contract_voucher) {
            upfrontpay = upfront;
          } else {
            upfrontpay = (+lifestyle_contract_voucher?.lifestyle_upfront) ?? 0;
          }
          if (!this.device && this._planData?.plan_type === planTypeEnum.cmp && this._userService.isUserEnterprise()) {
            upfrontpay = 0;
          }
          this.totalPayment = upfrontpay
            + suppLines.reduce(
              (acc, cur) => acc + (+cur.planPrice),
              0
            );
        } else {
          this.totalPayment = 0;
        }
        if (topType === typeOfPurchaseEnum.cobp && cobp_response?.[0]) {
          const penalty = cobp_response[0].penaltyCheck?.device_upfront_penalty;
          this.totalPayment += (+penalty);
          this.cobpErrorMsg = getCOBPErrorFromResponse(cobp_response?.[0]);
          if (lifestyle_contract_voucher && cobp_response[0]?.lifestyle_eligibility?.status && this.cobpErrorMsg === null) {
            this.totalPayment = cobp_response[0]?.lifestyle_eligibility.upfront === 1 ? this.totalPayment : 0;
          }
        }
      this.totalPayment += (+devicePrice || 0);
    });
  }

  subscribeForLocalVars() {
    combineLatest([
      this._planQuery.select(s => s.base_plan),
      this._planQuery.select(s => s.pass),
      this._planQuery.select(s => s.plan),
      this._planQuery.select(s => s.device_bundle),
      this._planQuery.select(s => s.device),
      this._topQuery.select(store => store.mobile_number),
      this._topQuery.select(store => store.supplementary_lines),
      this._topQuery.select(store => store.share_quota),
      this._topQuery.select(store => store.type),
      this._topQuery.select(store => store.mnp_response),
      this._topQuery.select(store => store.cobp_response),
      this._planQuery.select(store => store.lifestyle_voucher),
    ]).pipe(
      untilDestroyed(this)
    ).subscribe((resp: any[]) => {
      const [
        base_plan,
        pass,
        plan,
        deviceBundle,
        device,
        mobile_number,
        supplementary_lines,
        share_quota,
        top_type,
        mnp_response,
        cobp_response,
        lifestyle_voucher,
      ] = resp;
      this.base_plan = base_plan;
      this.supp_part_number = base_plan?.supplementary_data ? base_plan.supplementary_data[0]?.part_number : null;
      this.pass = pass;
      this.plan = plan;
      this.deviceBundle = deviceBundle;
      this.device = device;
      if (!this.isCampaign && !this.enableLifestyleSection) {
        this.isMnp = !device;
      }
      this.mobile_number = mobile_number;
      this.supplementary_numbers = (<iSupplementaryData[]>supplementary_lines).map(s => s.number);
      this.share_quota = share_quota;
      this.top_type = top_type;
      this.mnp_response = mnp_response;
      this.lifestyle_voucher = lifestyle_voucher;
      this.cobp_response = cobp_response?.[0];
      if (cobp_response && cobp_response[0]) {
        this.cobp_response = cobp_response[0];
      }
      if (this.cobp_response?.lifestyle_eligibility?.status === false) {
        this.deselectVoucherIfnotEligible(true);
      }
    });

    this.basePlan$
      .pipe(untilDestroyed(this))
      .subscribe(basePlan => {
        if (basePlan) {
          // * Updating Analytics
          this._estoreAnalyticsService.SetProductDetails(basePlan, this._renderer);
          this._estoreAnalyticsService.SetProductId(basePlan.sku, this._renderer);
          this._estoreAnalyticsService.SetProductType(basePlan.name);
          this._estoreAnalyticsService.SetCategoryTwoForAdobeDataLayer(this._renderer);
        }
      });
  }

  /**
   * Manage query params (deeplink) from portal
   * https://shop.celcom.com.my/plans/mega?pass=Ultra-Speed&type=Ultra-Speed-M-Pass&top=mnp
   */
  manageDeeplink(params, queryParams) {
    const planSku = params.sku || 'mega';
    resetStores();
    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }
    if (planSku) {
      this._planService.setLoading(true);
      this._postpaidService.loadPlan(planSku, queryParams)
        .pipe(
          finalize(() => this._planService.setLoading(false)),
        )
        .subscribe((data: GenericPlanData) => {
          if (!isNullOrUndefined(data['status'])) {
            if (!data['status']) {
              this.setError(data);
              return;
            }
          }
          const newData = {
            ...data
          };
          this._planData = newData;
          if (queryParams?.promotiondetails && newData.campaign_invalid_message) {
            this._modalService.showError({ message: newData.campaign_invalid_message });
            this._modalService.onClosedModal.subscribe(id => this.goToPlansPage(id, planSku));
          }
          this.enableLifestyleSection = newData.enable_lifestyle;
          if (this.enableLifestyleSection) {
            this.lifeStyle_note = newData?.original_response?.tabData?.lifestyle_notes;
          }

          /**
           * Type of purchase
           */
          this.isNewLine = this._planData.type_of_purchase_options.newline;
          this.isCobp = this._planData.type_of_purchase_options.cobp;
          this.isMnp = this._planData.type_of_purchase_options.mnp;

          /**
           * Campaigns
           */
          if (newData.campaign_mviva) {
            this.isCampaign = true;
            this.campaignMviva = newData.campaign_mviva;
          }

          /**
           * Omni Campaign
           */
          if (newData?.campaign_omni) {
            this.isCampaign = true;
            this.campaignOmni = newData.campaign_omni;
            this.isNewLine = false;
            this.isMnp = false;
            this._planService.updateOmniCampaign(this.campaignOmni);
          }
          if (queryParams?.promotionomnichannel && !this.campaignOmni) {
            this._modalService.showError({ message: 'Invalid campaign!' });
            this._modalService.onClosedModal.subscribe(id => this.goToPlansPage(id, planSku));
          }
          this._planService.updateMVIVA(newData.campaign_mviva);
          this._planService.updateOmniCampaign(newData.campaign_omni);

          /**
           * Select default base_plan
           */
          if ([planTypeEnum.star].includes(this._planData?.plan_type)) {
            this.manageStarPlan(planSku, queryParams, newData);
          } else if ([planTypeEnum.moon].includes(this._planData?.plan_type)) {
            this.manageMoonPlan(planSku, queryParams, newData);
          } else {
            this.manageCMPPlan(planSku, queryParams, newData);
          }
          this.plansInitialized = true;
          if (this.enableLifestyleSection) {
            this.isMnp = false;
          }

        }, err => this.setError(err));
    }
  }

  manageStarPlan(planSku: string, queryParams: Params, data: GenericPlanData) {
    /**
     * Extract variables from queryParams
     */
    const { pass, type, top } = queryParams;
    const base_plans = data.base_plans;
    const pass_plans = data.pass_plans;
    const targeted_plan = data.campaign_mviva?.targeted_plan;

    if (base_plans?.length > 0) {
      this.selectBasePlan(base_plans[0]);
    }

    /**
     * Select default base_plan
     */
    let selectedPass: iPass = null;
    selectedPass = pass_plans?.find(p => p.sku == pass);
    if (!selectedPass) {
      if (pass_plans?.length > 0) {
        selectedPass = pass_plans.find(p => p.is_default == '1');
        if (!selectedPass) selectedPass = pass_plans[0];
      }
    }
    this.selectPass(selectedPass);
    if (this._planData?.campaign_mviva) {
      const availablePlans = selectedPass.associated_passes;
      const mvivaPlan = availablePlans.find(p => targeted_plan.includes(p.url_key));
      this.selectPlan(mvivaPlan);
    }
    if (type && selectedPass?.associated_passes.length > 0) {
      const selectedPlan = selectedPass.associated_passes.find(p => p.sku == type);
      this.selectPlan(selectedPlan);
    }

    if (top) {
      this._topService.selectTypeofPurchase(top == 'nl' ? 'newline' : top);
      this.scrollToTypeofPurchase();
    }
  }

  manageMoonPlan(planSku: string, queryParams: Params, data: GenericPlanData) {
    /**
     * Extract variables from queryParams
     * https://shop.celcom.com.my/plans/xp-lite?type=xp-l-pass&device=vivo-y11
     */
    const { type, top, device, pass } = queryParams;
    const base_plans = data.base_plans;
    const plans = data.plans;

    if (base_plans?.length > 0) {
      this.selectBasePlan(base_plans[0]);
    }

    if (type && plans?.length > 0) {
      const selectedPlan = plans.find(p => p.sku === type);
      if (selectedPlan) {
        this.selectPlan(selectedPlan);
        const selectedDevice = selectedPlan.associated_bundle_product?.find(d => d.sku === device);
        if (device && selectedDevice) {
          const defaultDevice = selectedDevice?.associated_device_product?.find(d => {
            return d.color === selectedDevice?.default_selected_color
              && d.memory === selectedDevice?.default_selected_memory;
          }) || selectedDevice?.associated_device_product?.[0];
          this.selectDeviceAndBundle({
            deviceBundle: selectedDevice,
            device: defaultDevice,
          });
        }
      }
    }

    if (this.campaignMviva) {
      if (pass) {
        const selectedPlan = plans.find(p => p.sku === pass);
        if (selectedPlan) {
          this.selectPlan(selectedPlan);
        }
      }
    }

    if (this.campaignOmni?.pass_sku) {
      const selectedPlan = plans.find(p => p.sku === this.campaignOmni.pass_sku);
      this.selectPlan(selectedPlan);
    }

    if (top) {
      this._topService.selectTypeofPurchase(top == 'nl' ? 'newline' : top);
      this.scrollToTypeofPurchase();
    }
  }

  scrollToTypeofPurchase() {
    setTimeout(() => {
      this.topAnchor.nativeElement.scrollIntoView({
        behavior: 'smooth'
      });
    }, 1000);
  }

  manageCMPPlan(planSku: string, queryParams: Params, data: GenericPlanData) {
    const selectedPlan = this._planData?.plans.find(p => p.url_key === planSku) || this._planData?.plans[0];
    this.selectPlan(selectedPlan);
  }

  goToPlansPage(id, planSku) {
    if (id && this.isBrowser) {
      window.location.href = "/plans/" + planSku;
    }
  }

  selectBasePlan(base: iBasePlan) {
    this._planService.selectBasePlan(base);
  }

  selectPass(pass: iPass, plan: iPlan = null, preventDefaultSelection = false) {
    this._planService.selectPass(pass);
    if (this.plansInitialized) {
      let defaultPlan = plan;
      /**
       * pass_speed_sku must have plan sku
       */
      if ((!defaultPlan && !preventDefaultSelection) || (this.pass?.sku == this.pass_speed_sku && !plan)) {
        defaultPlan = pass.associated_passes.find(p => p.is_default == '1');
        this._planService.selectLifeStyleVoucher(null);
        this.isMnp = true;
      }
      if (!this.enableLifestyleSection) {
      this.selectPlan(defaultPlan);
      }
    }
  }

  selectVoucherContract(plan) {
    let lifeStyleContracts = plan.lifestyle_contract;
    let voucherSelected: iLifeStyleContract;
    Object.keys(lifeStyleContracts).forEach((e) => {
      if (lifeStyleContracts[e].default_selectedvoucher) {
        this.selectedContract = e;
        voucherSelected = lifeStyleContracts[e];
      }
    });
    voucherSelected = { ...voucherSelected, contract_period: this.selectedContract };
    this._planService.selectLifeStyleVoucher(voucherSelected);
  }
  selectBasebySKU(sku: string) {
    if ([planTypeEnum.star].includes(this._planData?.plan_type)) {
      this.selectPassbySKU(sku);
    } else if (this._planData?.plan_type === planTypeEnum.moon) {
      this.selectBasebySKU(sku);
    } else if (this._planData?.plan_type === planTypeEnum.cmp) {
      const plan = this._planData.plans.find(p => p.sku == sku);
      if (plan) {
        this.checkIsNumberSelected(() => {
          this.selectPlan(plan);
          // this.sizeupAnchor.nativeElement.scrollIntoView();
        });
      }
    }
  }

  selectPassbySKU(sku: string) {
    let pass = this._planData?.pass_plans?.find(p => p.sku == sku);
    let plan = null;
    this.disable_lifestylevoucher = false;
    this._topService.updateCOBPResponse(null);
    let preventDefaultSelection = false;
    if (this.isCampaign && this._planData.plan_type === planTypeEnum.moon) {
      const [, plan_sku] = sku.split('|');
      this.selectPlanbySKU(plan_sku || null, null);
      return;
    } else if (this.isCampaign) {
      let [pass_sku, plan_sku] = sku.split('|');
      if (sku.indexOf('|') < 0) {
        pass_sku = sku;
      }
      preventDefaultSelection = true;
      pass = this._planData.pass_plans.find(p => p.sku == pass_sku);
      const plans = pass?.associated_passes;
      plan = plans?.find(p => p.sku == plan_sku);
    }
    if (pass) {
      this.checkIsNumberSelected(() => {
        this.selectPass(pass, plan, preventDefaultSelection);
        // this.sizeupAnchor.nativeElement.scrollIntoView();
      });
    }
  }

  selectPlan(plan: iPlan) {
    this._planService.selectPlan(plan);
    if (this.isCampaign) {
      this.autoSelectDevice();
    }
    if (this.enableLifestyleSection) {
      this._planService.selectLifeStyleVoucher(null);
      this.isMnp = true;
    }
  }

  autoSelectDevice() {
    const plan = this.plan;
    if (plan?.associated_bundle_product?.length > 0) {
      const deviceBundle = plan?.associated_bundle_product[0];
      const device = deviceBundle?.associated_device_product[0];
      this.selectDeviceBundle(deviceBundle);
      this.selectDevice(device);
    }
  }

  selectedLifeStyleVoucher(lfvoucher: iLifeStyleContract, selectedContract: string) {
    if (!this.enableLifestyleSection) {
      return false;
    }
    lfvoucher = selectedContract ? { ...lfvoucher, contract_period: selectedContract } : null;
    this._planService.selectLifeStyleVoucher(lfvoucher);
  }

  selectDeviceBundle(deviceBundle: iPlanDeviceBundle) {
    this._planService.selectDeviceBundle(deviceBundle);
  }

  selectDevice(device: iPlanDevice) {
    this._planService.selectDevice(device);
  }

  selectDeviceAndBundle({deviceBundle, device}: {deviceBundle: iPlanDeviceBundle, device: iPlanDevice}) {
    this.checkIsNumberSelected(() => {
      this.selectDeviceBundle(deviceBundle);
      this.selectDevice(device);
    });
  }

  selectPlanbySKU(sku: string, selectedPass: iPass) {
    if (!this.plansInitialized) {
      return;
    }
    if (this._planData?.plan_type === planTypeEnum.star) {
      this.disable_lifestylevoucher = false;
      this._topService.updateCOBPResponse(null);
      const plan = selectedPass.associated_passes.find(p => p.sku === sku);
      this.checkIsNumberSelected(() => {
        this.selectPlan(plan);
      });
    } else if (this._planData?.plan_type === planTypeEnum.moon) {
      const plan = this._planData?.plans?.find(p => p.sku === sku);
      this.checkIsNumberSelected(() => {
        this.selectPlan(plan);
      });
    }
  }

  selectLfVoucherbyTitle(selectedPlan: iLifeStyleVoucherToDisplay, selectedPass: iPass, scroll = true) {
    if (!this.plansInitialized) return;
    let plan = selectedPass.associated_passes.find(p => p.sku === selectedPlan.sku);
    this._topService.updateCOBPResponse(null);
    let lifeStyleContracts = plan.lifestyle_contract;
    this.selectedContract = Object.keys(lifeStyleContracts).find((contractselected) => {
      return contractselected === selectedPlan.selected_lifestylecontract;
    });
    this.isMnp = false;
    this.checkIsNumberSelected(() => {
      this.selectedLifeStyleVoucher(lifeStyleContracts[this.selectedContract], this.selectedContract);
      this._topService.selectTypeofPurchase(null);
      if (scroll) {
        // this.topAnchor.nativeElement.scrollIntoView();
      }
    });
  }

  toggleCheckbox(event: Event) {
    if (event.preventDefault) event.preventDefault();
    let plan = this.plan;
    const selectedPass = this.pass;
    this.checkIsNumberSelected(() => {
      if (isNullOrUndefined(plan)) {
        const defaultPlan = selectedPass?.associated_passes?.find(p => p.is_default == '1');
        plan = defaultPlan || selectedPass?.associated_passes?.[0];
        if (this._planData.plan_type === planTypeEnum.moon) {
          plan = this._planData.plans?.find(p => p.is_default == '1') || this._planData.plans[0];
        }
      } else {
        plan = null;
        this._planService.selectLifeStyleVoucher(null);
      }
      this.selectPlan(plan);
    });
  }

  toggleCheckboxLifestyleVoucher(event) {
    if (event.preventDefault) event.preventDefault();
    let lifeStyleContracts = this.plan.lifestyle_contract;
    let lifeStyleVoucher = this.lifestyle_voucher;
    this.checkIsNumberSelected(() => {
      if (isNullOrUndefined(lifeStyleVoucher)) {
        Object.keys(lifeStyleContracts).forEach((e) => {
          if (lifeStyleContracts[e].default_selectedvoucher) {
            this.selectedContract = e;
          }
        });
        this.selectedLifeStyleVoucher(lifeStyleContracts[this.selectedContract], this.selectedContract);
        this.isMnp = false;
        } else {
        lifeStyleVoucher = null;
        this._planService.selectLifeStyleVoucher(lifeStyleVoucher);
        this.deselectVoucher = true;
        this.isMnp = true;
      }
      this._topService.selectTypeofPurchase(null);
    });
  }

  deselectVoucherIfnotEligible(checkFlag) {
    if (checkFlag) {
      this.disable_lifestylevoucher = true;
      this.selectedContract = null;
      this._planService.selectLifeStyleVoucher(null);
    }
  }
  toggleDeviceCheckbox(event: Event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    let deviceBundle = this.deviceBundle;
    let device = this.device;
    this.checkIsNumberSelected(() => {
      if (isNullOrUndefined(device)) {
        const defaultDeviceBundle = this.plan.associated_bundle_product?.[0];
        const defaultDevice = defaultDeviceBundle?.associated_device_product?.find(d => {
          return d.color === defaultDeviceBundle?.default_selected_color
            && d.memory === defaultDeviceBundle?.default_selected_memory;
        }) || defaultDeviceBundle?.associated_device_product?.[0];
        deviceBundle = defaultDeviceBundle;
        device = defaultDevice;
      } else {
        deviceBundle = null;
        device = null;
      }
      this.selectDeviceBundle(deviceBundle);
      this.selectDevice(device);
    });
  }

  checkIsNumberSelected(cb) {
    if (this.top_type != null && this.mobile_number) {
      this._modalService.showConfirm({ title: 'Are you sure?', message: 'Proceeding this action will reset all your previous selection.' })
        .subscribe(result => {
          if (result) cb();
          if (this.pass.sku === this.pass_gb_sku) {
            this.planOnlyCheckbox['checked'] = !!!this.plan;
          } 
          if (this.enableLifestyleSection) {
            this.lifeStyleCheckbox['checked'] = !this.lifestyle_voucher;
          }
        });
    } else {
      cb();
    }
  }

  showMoonUpshellPopup(cb) {
    const MPlan = this._planData?.plans?.find(p => p.sku === 'xp-m-pass');
    if (this._planData.plan_type === planTypeEnum.moon 
      && !this.top_type 
      && !this.plan
      && MPlan) {
      this._modalService.showConfirm({ 
        title: 'Hold on!',
        message: 'Enjoy <strong>Unlimited YouTube and 7GB High-speed Internet monthly.</strong>',
        btnCancel: 'No, thank you',
        btnConfirm: 'Yes, add extra internet'
      })
        .subscribe(result => {
          if (result) {
            this.sizeupAnchor?.nativeElement.scrollIntoView();
            if (this.isBrowser) {
              setTimeout(() => {
                this._planService.selectPlan(MPlan);
                cb();
              }, 900);
            } else {
              this._planService.selectPlan(MPlan);
              cb();
            }
          }
        });
    }
    cb();
  }

  setError(data?: any | iGeneralServerResponse) {
    if (data.statusNumber == 404) {
      this._router.navigate(['**'], { skipLocationChange: true })
    } else {
      this._router.navigate(['**'], { skipLocationChange: true })
      this.showErrorMessage(data);
    }
  }

  getSelectedBaseSKU(): string {
    if ([planTypeEnum.star].includes(this._planData?.plan_type)) {
      return this.pass?.sku;
    } else if ([planTypeEnum.moon].includes(this._planData?.plan_type)) {
      return this.base_plan?.sku;
    } else if (this._planData?.plan_type === planTypeEnum.cmp) {
      return this.plan?.sku;
    }
    return '';
  }

  getBasePlansToDisplay(selectedBase: iBasePlan): iBasePlanToDisplay[] {
    if (this._planData?.plan_type === planTypeEnum.star) {
      if (!this._planData.pass_plans || !selectedBase) {
        return [];
      }
      return this._planData.pass_plans.map(p => {
        return {
          sku: p.sku,
          image: p.image_url,
          title: `${selectedBase?.name} ${p.name}`,
          price: selectedBase?.key_text || null,
          offers: p.offer,
          badge: p.promotion_badge,
          promotion_text: p.promotion_text,
          promotion_terms: p.promotion_terms,
        };
      });
    } else if (this._planData?.plan_type === planTypeEnum.moon) {
      return this._planData?.base_plans.map(p => {
        return {
          sku: p.sku,
          title: `<div class="row">
            <div class="col">${p.name}</div>
          </div>`,
          price: p.key_text,
          offers: p.offer || '',
          badge: p.promotion_badge,
          promotion_text: p.promotion_text,
          promotion_terms: p.promotion_terms,
        };
      });
    } else if (this._planData?.plan_type === planTypeEnum.cmp) {
      return this._planData?.plans.map(p => {
        return {
          sku: p.sku,
          title: `<div class="row">
            <div class="col">${p.name}</div>
            ${p.KeyFiguresText ?
              `<div class="col-auto" style="font-weight: normal">${p.KeyFiguresText}</div>`
              : ''
            }
          </div>`,
          price: p.KeyText,
          offers: p.offer || '',
          badge: p.promotion_badge,
          promotion_text: p.promotion_text,
          promotion_terms: p.promotion_terms,
        };
      });
    }
    return [];
  }


  getPassOfPlan(plan_sku: string): iPass {
    const pass_map = this._planData?.pass_plans?.map(p => {
      return {
        pass: p,
        plans: p.associated_passes.map(plan => plan.sku),
      };
    });
    const find_pass = pass_map?.find(p => p.plans.includes(plan_sku));
    if (find_pass) {
        return find_pass?.pass;
    }
    return null;
  }

  getLifeStyleVouchersToDisplay(selectedPass: iPass): iLifeStyleVoucherToDisplay[] {
    const lifeStylePlan = this._planQuery.getValue()?.pass?.name;
    const lifeStylePass = this._planQuery.getValue()?.plan?.name;
    const cPOfLifeStyleSelectedPass: any = selectedPass.associated_passes.find((pass) => {
      if (pass.name === lifeStylePass) {
        return pass;
      }
    });

    this.enableLifestyleSection = true;
    if (!this.selectedContract) {
      this.isMnp = true;
    }

    if (!lifeStylePlan) { return []; }
    let passes = [];
    this.promoTerms = '';
    if (selectedPass) {
      passes = Object.keys(cPOfLifeStyleSelectedPass.lifestyle_contract).map(p => {
        return {
          sku: cPOfLifeStyleSelectedPass.sku,
          title: p + " Months",
          price: 'Get RM' + cPOfLifeStyleSelectedPass.lifestyle_contract[p].lifestyle_voucher + ' ',
          offers: cPOfLifeStyleSelectedPass.lifestyle_contract[p].offers,
          lifestylevoucher: true,
          selected_lifestylevoucher: cPOfLifeStyleSelectedPass.lifestyle_contract[p].default_selectedvoucher,
          selected_lifestylecontract: p
        }
      });
      const terms = new Set(passes.map(p => p.promotion_terms));
      this.promoTerms = Array.from(terms).filter(t => `${t}`.trim().length > 0).join('<br>');
    }
    return passes.sort((a, b) => b?.selected_lifestylecontract - a?.selected_lifestylecontract);
  }

  getMVIVAPlansToDisplay(): iBasePlanToDisplay[] {
    const selectedBase = this.base_plan;
    /**
     * Not showing pass_speed_sku base because it's not available
     * pass_speed_sku must have plan
     */
    let passes: iBasePlanToDisplay[] = this.getBasePlansToDisplay(this.base_plan)
      .filter(p => p.sku !== this.pass_speed_sku)
      .map(p => {
        return {
          ...p,
          sku: `${p.sku}|`,
          image: ''
        };
      });
    const plans = this.getAddonPlansToDisplay(this._planData?.pass_plans).map(p => {
      const base_price = (+selectedBase?.key_text.replace(/[^0-9]/g, '') || 0);
      const plan_price = +p?.price?.replace(/[^0-9]/g, '') || 0;
      let pass = this.getPassOfPlan(p.sku);
      if (this._planData?.plan_type === planTypeEnum.moon) {
        pass = this.base_plan;
      }
      return {
        ...p,
        sku: `${pass?.sku}|${p.sku}`,
        title: appendPlanTitle(p.title, selectedBase?.name + ' +'),
        price: `RM${base_price + plan_price}`,
      };
    });
    // if pass_sku is not empty, prevent user from selecting base plan only
    if (this.campaignOmni?.pass_sku) {
      passes = [];
    }
    passes = [
      ...passes,
      ...plans
    ].sort((a, b) => {
      const a_price = +a.price.replace(/[^0-9]/g, '') || 0;
      const b_price = +b.price.replace(/[^0-9]/g, '') || 0;
      return a_price < b_price ? 1 : -1;
    });
    return passes;
  }

  getAddonPlansToDisplay(selectedPass: iPass | iPass[]): iAddonPlanToDisplay[] {
    let passes = [];
    if (this._planData?.plan_type === planTypeEnum.star) {
      if (!selectedPass) {
        return [];
      }
      const allPasses = Array.isArray(selectedPass) ? selectedPass : [selectedPass];
      this.promoTerms = '';
      if (allPasses) {
        passes = allPasses.filter(pass => pass.associated_passes?.length > 0).map(pass => {
          return pass.associated_passes.map(p => {
            return {
              sku: p.sku,
              title: p.name,
              price: '+' + p.key_text,
              offers: p.offer,
              badge: p.promotion_badge,
              promotion_text: p.promotion_text,
              promotion_terms: p.promotion_terms,
            };
          });
        }).reduce((acc, val) => acc.concat(val), []);
        const terms = new Set(passes.map(p => p.promotion_terms));
        this.promoTerms = Array.from(terms).filter(t => `${t}`.trim().length > 0).join('<br>');
      }
    } else if (this._planData?.plan_type === planTypeEnum.moon) {
      passes = this._planData?.plans?.map(p => {
        return {
          sku: p.sku,
          title: `<div class="row">
            <div class="col">${p.name}</div>
            ${p.key_figures_text ?
              `<div class="col-auto" style="font-weight: normal">${p.key_figures_text}</div>`
              : ''
            }
          </div>`,
          price: '+' + p.key_text,
          offers: p.offer,
          badge: p.promotion_badge,
          promotion_text: p.promotion_text,
          promotion_terms: p.promotion_terms,
        };
      });
      const terms = new Set(passes.map(p => p.promotion_terms));
      this.promoTerms = Array.from(terms).filter(t => `${t}`.trim().length > 0).join('<br>');
    }
    return passes;
  }

  getTotalMonthlyPay(base: iBasePlan, plan: iPlan): number {
    if (!base && !plan) return 0;
    let total = +(base.monthly_plan || 0);
    if (plan) {
      total += +(plan.monthly_plan || 0);
    }
    return total;
  }

  getInternetLimit(plan: iPlan, pass: iPass) {
    if (pass?.sku?.startsWith(this.pass_speed_sku)) {
      return "Unlimited";
    }
    return `${(+this.base_plan?.data_limit || 0) + +(plan?.data_limit || 0)}GB`;
  }

  reserveNumber(base_plan: iBasePlan | iPlan, mobile_number: string, supplementary_numbers: string[]) {
    const suppReqData: iNumberReservationRequestData = {
      partNumber: this.supp_part_number,
      sku: base_plan.sku,
    }
    const suppnumbers = supplementary_numbers || [];
    const suppData: iNumberReservationRequestData = suppnumbers?.length > 0 ? suppReqData : null;
    const data: iNumberReservationRequest = {
      data: suppData || {},
      mobile_number: [
        mobile_number,
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
        } else {
          this.showErrorMessage(response);
        }
      }, err => {
        this.showErrorMessage(err.error);
      });
  }

  onAddToCartClick() {
    if (this.top_type === typeOfPurchaseEnum.newline) {
      this.reserveNumber(this.base_plan || this.plan, this.mobile_number, this.supplementary_numbers)
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

  /**
   * Add to cart for postpaid line
   * After successfully doing add to cart, user will get redirected to order/summary
   * In order summary, there will be checking for email and phone number
   * If new user, will get redirected to order/personal-details
   * @param reservationId Reservation ID for new line
   * @param temporary_number Temporary number for MNP Journey
   */
  addToCart(reservationId: string = "", temporary_number: string = "") {
    let data: addTocartBundle.RootObject;
    let basicData;
    if (this.top_type == typeOfPurchaseEnum.newline) {
      basicData = new NewLineAddtocartData(this.mobile_number, reservationId);
      basicData.updateAttributes(this._planData?.bundle_product_sku,
        this.base_plan,
        this.pass,
        this.plan, null);
    } else if (this.top_type == typeOfPurchaseEnum.cobp) {
      basicData = new COBPAddtocartData(this.mobile_number, reservationId);
      basicData.updateAttributes(this._planData?.bundle_product_sku,
        this.base_plan,
        this.pass,
        this.plan, null);
      basicData.bundle_product_price = this.cobp_response?.penaltyCheck?.device_upfront_penalty;
      basicData.validated_id = this.cobp_response?.validated_id;
      // this.totalPayment = +basicData.bundle_product_price;
      // here may need to update, especially device journey
      // basicData.bundle_product_price
      // basicData.selected_device_product_up_fornt_price
    } else if (this.top_type == typeOfPurchaseEnum.mnp) {
      basicData = new MNPAddtocartData(this.mobile_number, reservationId, temporary_number, this.mnp_response?.[0].validated_id);
      basicData.updateAttributes(this._planData?.bundle_product_sku,
        this.base_plan,
        this.pass,
        this.plan, null);
    }
    basicData.selected_lifestyle_voucher = this.lifestyle_voucher?.contract_period;
    basicData.is_campaign_mviva = !!this._planData?.campaign_mviva;
    if (basicData.is_campaign_mviva) {
      basicData.campaign_mviva_url = window.location.href.replace(/%20/g, " ");
    }
    basicData.bundle_product_price = `${this.totalPayment}`;
    basicData.is_star_internet_share = this.share_quota;
    basicData.is_campaign_omni = !!this.campaignOmni;
    basicData.is_prepaid = this._userService.isUserPreToPost();

    if (this.device) {
      basicData = {
        ...basicData,
        contract_period: this.device.contract,
        selected_device_product_sku: this.device.sku,
        selected_pass_product_sku: this.plan?.sku,
      }
    }

    if (this._refPlanData.plan_type === planTypeEnum.moon) {
      basicData = {
        ...basicData,
        selected_pass_product_sku: this.plan?.sku,
        sub_pass_sku: undefined,
      };
      if (this.device) {
        basicData = {
          ...basicData,
          selected_pass_product_sku: this.plan?.sku,
          bundle_product_price: this.totalPayment,
          selected_device_product_device_price: this.totalPayment,
          reservationId: undefined,
        };
      }
    }

    data = {
      "data": {
        ...basicData,
      },
      "supp_data": this.top_type == typeOfPurchaseEnum.cobp ? undefined : this.supplementary_numbers?.map(n => {
        return {
          "number": n,
          "plan": this.supp_part_number,

          // Not sure where to get
          "subsidy": "",
        }
      }),
      "stockReserveQuantityInput": {
        "stockReserveQuantityInput": {
          "storeId": environment.outletId,
          "reservationId": reservationId,
          "listOfItemDetailRequest": {
            "itemDetailRequest": [
              {
                "ProductType": "HP",
                "PartNum": 0,
                "Quantity": "1",
                "listOfAttributes": [
                  {
                    // These attributes only for devices
                    "attributes": [
                      {
                        "Name": "BRAND",
                        "Value": null
                      },
                      {
                        "Name": "MODEL",
                        "Value": null,
                      },
                      {
                        "Name": "COLOR",
                        "Value": null,
                      },
                      {
                        "Name": "CATEGORY",
                        "Value": null,
                      },
                      {
                        "Name": "PRODUCT",
                        "Value": "DEVICE"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      }
    };

    this._postpaidService.addToCart(data, this._planData?.plan_type)
      .subscribe(resp => {
        if (resp?.[0]?.['status']) {
          this._router.navigateByUrl('/store/checkout/summary');
        } else {
          this.showErrorMessage(resp[0] || resp);
        }
      }, error => {
        this.showErrorMessage(error?.error);
      });
  }

  showErrorMessage(resp: iGeneralServerResponse = null) {
    const message = resp?.message || resp?.response;
    this._modalService.showError({ message }).subscribe(data => {
      this._planService.updateAddtocartError(true);
    });
  }

  selectedTypeOfPurchase(event: string) {
    const userInfo = this._userService.getPersonalForm();

    // ? User that are not logged in at this point can't be checked
    // ? follow-up check for those will be in their respective type of purchase wrapper
    const blacklistDatum = userInfo?.type === 'user'
      ? userInfo.data.outputCPResp.blacklist
      : null;

    // ? if user is internally blacklisted,
    // ? show an error popup and return void
    if (blacklistDatum?.status && blacklistDatum?.system === "Internal") {
      this._modalService.showError({ title: 'Uh Oh!', message: blacklistDatum.message });
      return;
    }

    this.showMoonUpshellPopup(() => {
      this.checkIsNumberSelected(() => {
        this._topService.selectTypeofPurchase(event);
      });
    });
  }

  buyNow() {
    if (!this.isNewLine && !this.isMnp) {
      this.selectedTypeOfPurchase('cobp');
    }
  }

}