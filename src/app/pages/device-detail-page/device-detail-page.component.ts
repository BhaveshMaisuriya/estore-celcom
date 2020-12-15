import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { DeviceDetailPageService } from './device-detail-page.service';
import { PlansService } from 'app/Service/plans.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { untilDestroyed } from 'app/shared/services/until-destroyed.service';
import { finalize } from 'rxjs/operators';
import { iGeneralServerResponse, ICardOptions } from 'app/shared/models/general.model';
import {
  iPlanDevice,
  iPlanDeviceBundle,
  iMvivaCampaign,
  IDeviceDetailResponseItem,
  iStockCheck,
  deviceBundleTypeEnum,
  ChoosePlan,
  ChooseFirstBluePlan,
  iDeviceResponse,
  iSupplementary,
  COMBO_DEVICE_TYPE_ACCESSORY,
} from 'app/shared/models/device.model';
import { TypeofPurchaseService } from 'app/Service/type-of-purchase.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { iPass, iPlan, STAR_GB_PASS_SKU, STAR_SPEED_PASS_SKU, iOmniCampaign, FIRST_BLUE_INTERNET, IDevicePurchaseType } from 'app/shared/models/plan.model';
import { iBasePlan } from 'app/Service/devicedata.service';
import {
  typeOfPurchaseEnum,
  TypeofPurchaseQuery
} from 'app/Widget/side-summary/side-summary-container/type-of-purchase.store';
import {
  IDeviceBasicDetails,
  IDeviceDetailResponse
} from '../../shared/models/device.model';
import {ModalService} from "../../shared/components/modal/modal.service";
import {
  iSupplementaryData,
  addTocartBundle,
  NewLineAddtocartData,
  COBPAddtocartData,
  iNumberReservationRequestData,
  iNumberReservationRequest,
} from 'app/models/general.model';
import { iBasePlanToDisplay } from 'app/shared/components/plans/base-plan-wrapper/base-plan-wrapper.component';
import { iAddonPlanToDisplay, iEasyphoneData } from 'app/shared/components/plans/addon-plan-wrapper/addon-plan-wrapper.component';
import { DecimalPipe } from '@angular/common';
import { COBPResponse } from 'app/shared/models/cobp.model';
import { PostpaidService } from '../postpaid/postpaid.service';
import { environment } from 'environments/environment';
import { EStoreAnalysticsService } from "../../Service/store.analytic.service";
import { ACTION_TYPE } from 'app/shared/constants/application.constants';
import { UserService } from 'app/Service/user.service';
import { iToPEvent } from 'app/shared/components/type-of-purchase/typeof-purchase-wrapper/typeof-purchase-wrapper.component';
import { removeHTMLTags, CLMOmniDataSanitizer, isNullOrUndefined } from "../../shared/utilities/helper.ultility";
import { resetStores } from '@datorama/akita';
import { Meta } from '@angular/platform-browser';
import { JsonLdService } from 'app/Service/json-ld.service';

@Component({
  selector: 'app-device-detail-page',
  templateUrl: './device-detail-page.component.html',
  styleUrls: [ './device-detail-page.component.scss' ]
})
export class DeviceDetailPageComponent implements OnInit, AfterViewInit, OnDestroy {
  basicDetails$ = this._plansQuery.select(s => s.device);
  topType$: Observable<typeOfPurchaseEnum>;
  deviceDetailApiResponse: IDeviceDetailResponse;
  display: {
    images: any[];
    isNew: boolean
  } = {
    images: [],
    isNew: false
  };

  dbDeviceEnum = deviceBundleTypeEnum;
  rentPrice = 0;
  ownPrice = 0;
  isEasyPhone = false;
  isProjectStar = false;
  isCampaignMviva = false;
  campaignMviva: iMvivaCampaign;
  campaignOmni: iOmniCampaign;

  device$: Observable<iPlanDevice>;
  deviceBundle$: Observable<iPlanDeviceBundle>;
  deviceBundleType$: Observable<string>;

  private _refDeviceData: iDeviceResponse;

  public allPass: ChoosePlan[];
  public firstBluePlan: ChooseFirstBluePlan[];
  private plansInitialized = false;

  pass$: Observable<iPass>;
  plan$: Observable<iPlan>;

  isLoadingAPIResponse$: Observable<boolean>;
  isLoadingToP$: Observable<boolean>;
  isCheckingStock = false;

  upfrontPayment$: Observable<number>;
  upfrontPaymentWaived$: Observable<boolean>;

  promoTerms: string;
  totalPayment = 0;

  isEasyPhone$: Observable<boolean>;
  isEasyPhoneRent$: Observable<boolean>;
  isEasyPhoneOwn$: Observable<boolean>;
  isDeviceBundle$: Observable<boolean>;
  isDeviceOnly$: Observable<boolean>;
  easyphoneContractPeriods$: Observable<string[]>;
  easyphoneSelectedContractPeriods$: Observable<string>;
  easyphoneAvailableContractPeriods$: Observable<object>;
  easyphoneSelectedContractPeriod$: Observable<string>;
  deviceBundleContractPeriods$: Observable<string[]>;
  deviceBundleSelectedContractPeriods$: Observable<string>;
  deviceBundleAvailableContractPeriods$: Observable<object>;
  deviceBundleSelectedContractPeriod$: Observable<string>;
  basePlan$: Observable<iBasePlan>;
  devicePrices$: Observable<object>;
  devicePrice$: Observable<number>;
  pass_speed_sku = STAR_SPEED_PASS_SKU;
  pass_gb_sku = STAR_GB_PASS_SKU;

  deviceStock$: Observable<iStockCheck>;
  deviceStockSubscription: Subscription;

  allBuyOptions: ICardOptions[] = [];
  deviceBuyOptions: ICardOptions[] = [];
  selectedBuyOption: string;
  top_type: string;
  mobile_number$: Observable<string>;
  mobile_number: string;

  base_plan: iBasePlan;
  supp_part_number: string;
  supplementary_numbers: string[];
  share_quota: boolean;
  mnp_response: any;
  device: iPlanDevice;
  device_combo: iPlanDevice;
  isComboPhone = false;
  device_combo_number: string;
  selected_contract_period: string;
  device_bundle_selected_contract_period: string;
  device_bundle_contract_periods: string[];

  pass: ChoosePlan;
  plan: iPlan;
  device_bundle_type: deviceBundleTypeEnum;
  cobp_response: COBPResponse;
  cobpResonse$: Observable<COBPResponse[]>;

  private supplementaryLines$: Observable<iSupplementary[]>;

  basicDetailsItem: IDeviceBasicDetails;

  isNewLine: boolean = false;
  isCobp: boolean = true;
  isMnp: boolean = false;
  isFirstBlue: boolean = false;
  isBrowser: boolean;

  isPreorder: boolean = false;
  isLegacyPlan = false;
  isHideRebateText;

  isPricingLoading = false;

  devicePurchaseType: IDevicePurchaseType;

  @ViewChild('basicAnchor') basicAnchor: ElementRef;
  @ViewChild('buydeviceAnchor') buydeviceAnchor: ElementRef;
  @ViewChild('plansAnchor') plansAnchor: ElementRef;
  @ViewChild('topAnchor') topAnchor: ElementRef;
  @ViewChild('deviceSpecsAnchor') deviceSpecsAnchor: ElementRef;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _deviceDetailPageService: DeviceDetailPageService,
    private _plansService: PlansService,
    private _plansQuery: PlansQuery,
    private _topService: TypeofPurchaseService,
    private _topQuery: TypeofPurchaseQuery,
    private _modalService: ModalService,
    private _numberPipe: DecimalPipe,
    private _postpaidService: PostpaidService,
    private _userService: UserService,
    private eStoreAnalyticsService: EStoreAnalysticsService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private jsonLdService:JsonLdService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get isEnterprise() {
    return this._userService.isUserEnterprise();
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.'); // this stops from redirecting
  }

  ngOnInit(): void {

    // ? How much we scroll in home page reflects in device page, fixing it with window.scrollTo
    window.scrollTo(0, 0);    // move to device specification on page load

    Object.keys(this.dbDeviceEnum).forEach(item => {
      this.allBuyOptions = [
        ...this.allBuyOptions,
        {
          label: this.dbDeviceEnum[item],
          value: item
        }
      ];
    });

    this.device$ = this._plansQuery.select(s => s.device);
    this.deviceBundle$ = this._plansQuery.select(s => s.device_bundle);
    this.deviceBundleType$ = this._plansQuery.select(s => s.device_bundle_type);
    this.deviceStock$ = this._plansQuery.select(s => s.device_stock);

    this.isEasyPhone$ = this._plansQuery.select(s => s.device_bundle_type === deviceBundleTypeEnum.easyPhone);
    this.isEasyPhoneRent$ = this._plansQuery.select(s => s.device_bundle?.is_rent);
    this.isEasyPhoneOwn$ = this._plansQuery.select(s => s.device_bundle?.is_own);
    this.isDeviceBundle$ = this._plansQuery.select(s => s.device_bundle_type === deviceBundleTypeEnum.deviceBundle);
    this.isDeviceOnly$ = this._plansQuery.select(s => s.device_bundle_type === deviceBundleTypeEnum.deviceOnly);

    this.easyphoneContractPeriods$ = this._plansQuery.select(state => state.easyphone_contract_periods);
    this.easyphoneSelectedContractPeriods$ = this._plansQuery.select(state => state.easyphone_selected_contract_period);
    this.easyphoneAvailableContractPeriods$ = this._plansQuery.select(state => state.easyphone_available_contract_periods);
    this.easyphoneSelectedContractPeriod$ = this._plansQuery.select(state => state.easyphone_selected_contract_period);
    this.deviceBundleContractPeriods$ = this._plansQuery.select(state => state.device_bundle_contract_periods);
    this.deviceBundleSelectedContractPeriods$ = this._plansQuery.select(state => state.device_bundle_selected_contract_period);
    this.deviceBundleAvailableContractPeriods$ = this._plansQuery.select(state => state.device_bundle_available_contract_periods);
    this.deviceBundleSelectedContractPeriod$ = this._plansQuery.select(state => state.device_bundle_selected_contract_period);
    this.basePlan$ = this._plansQuery.select(state => state.base_plan);
    this.pass$ = this._plansQuery.select(state => state.pass);
    this.plan$ = this._plansQuery.select(state => state.plan);

    this.devicePrices$ = this._plansQuery.getDevicePrices$;
    this.devicePrice$ = this._plansQuery.select(store => store.device_price);
    this.upfrontPayment$ = this._plansQuery.select(s => s.upfront_payment);
    this.upfrontPaymentWaived$ = this._plansQuery.select(s => s.upfront_payment_waived);
    this.isLoadingAPIResponse$ = this._plansQuery.selectLoading();
    this.isLoadingToP$ = this._topQuery.selectLoading();
    this.cobpResonse$ = this._topQuery.select(store => store.cobp_response);
    this.topType$ = this._topQuery.select(store => store.type);

    this.supplementaryLines$  = this._topQuery.select(s => s.supplementary_lines);
    combineLatest([
      this._activatedRoute.params,
      this._activatedRoute.queryParams,
    ]).pipe(
      untilDestroyed(this),
    )
    .subscribe(([ params, queryParams ]) => {
      this.manageDeeplink(params, queryParams)
    });
    this.calculateTotalPrice();
    this.subscribeForLocalVars();
  }

  calculateTotalPrice() {
    combineLatest([
      this.upfrontPayment$,
      this.upfrontPaymentWaived$,
      this.devicePrice$,
      this.cobpResonse$,
      this.supplementaryLines$,
    ]).pipe(
      untilDestroyed(this)
    ).subscribe(([upfront, waived, devicePrice, cobpResonse, suppLines]) => {
      if (!waived) {
        this.totalPayment = upfront + suppLines.reduce((acc, cur) => acc + (+cur.planPrice), 0);
      } else {
        this.totalPayment = 0;
      }
      if (this.top_type === typeOfPurchaseEnum.cobp && cobpResonse && cobpResonse[0] && !cobpResonse[0].penaltyCheck?.eligible_contract_extend) {
        const penalty = cobpResonse[0].penaltyCheck?.device_upfront_penalty;
        this.totalPayment += (+penalty);
      }
      if (this.device_bundle_type === deviceBundleTypeEnum.deviceBundle) {
        this.totalPayment += devicePrice;
      } else if (this.top_type === typeOfPurchaseEnum.cobp && cobpResonse
        && cobpResonse[0] && this.device_bundle_type === deviceBundleTypeEnum.easyPhone) {
        devicePrice = devicePrice * +(cobpResonse[0]?.duration_check?.device);
      }
      if (this.device_bundle_type === deviceBundleTypeEnum.easyPhone) {
        this.totalPayment += devicePrice;
      }
      if (this.device_bundle_type === deviceBundleTypeEnum.deviceOnly) {
        this.totalPayment = devicePrice;
      }
    });
  }

  ngAfterViewInit(): void {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this.eStoreAnalyticsService.ManageAnalytics(this.renderer, currentUrl, item);
    });
  }

  /**
   * Manage query params (deeplink) from portal
   * https://shop.celcom.com.my/device-detail/Vivo-V9?pass=Ultra-Speed&type=Ultra-Speed-L-Pass
   */
  manageDeeplink(params, queryParams) {
    const deviceSku = params.deviceId;
    resetStores();
    if (deviceSku) {
      this._plansService.setLoading(true);
      this._deviceDetailPageService.loadDevice(deviceSku, queryParams)
        .pipe(
          untilDestroyed<IDeviceDetailResponse>(this),
          finalize(() => this._plansService.setLoading(false)),
        )
        .subscribe((data) => {

          // @ts-ignore ? For failed response, data type is different
          if (data.status === false) {
            this.setError(data);
            return;
          }

          // if (data.items.choose_plan[0].tabData[0].sku !== FIRST_BLUE_INTERNET
          //   && data.items?.base_plan?.length === 0) {
          //   this._router.navigateByUrl(`/device-detail-cmp/${deviceSku}`, {
          //     queryParams,
          //     skipLocationChange: true,
          //   });
          //   return;
          // }

          this._plansService.updateAPIResponse(data);

          // tslint:disable-next-line
          let newData = {
            ...data
          };
          /**
           * sort plans from high to low price
           */
          let sortedPlans = [];
          for (const key of Object.keys(newData.items.choose_plan)) {
            const sortedData = [...newData.items.choose_plan[key].tabData].sort((a, b) => {
              return +a['monthlyPlan'] < +b['monthlyPlan'] ? 1 : -1;
            });
            sortedPlans[key] = {
              ...newData.items.choose_plan[key],
              tabData: sortedData,
            };
          }
          newData = {
            ...newData,
            items: {
              ...newData.items,
              choose_plan: sortedPlans,
            }
          }
          this.deviceDetailApiResponse = newData;

          /**
           * Extract variables from queryParams
           */
          const { pass, type, top } = queryParams;
          const base_plans = this.deviceDetailApiResponse.items.base_plan;
          const pass_plans = this.deviceDetailApiResponse.items.choose_plan;
          this.allPass = pass_plans;
          this.firstBluePlan = this.allPass[0].tabData.map(bluePlan => {
            let price = bluePlan.keyText;
            let name = bluePlan.PlanName;
            let offers = bluePlan.offer;
            let title = `<div class="row">
              <div class="col">${bluePlan.PlanName}</div>
              <div class="col-auto" style="font-weight: normal">${bluePlan.keyFiguresText}</div>
              </div>`;
              return {
                title,
                price,
                name,
                offers
              }
          });
          let selectedPass: ChoosePlan = null;

          /**
           * Select default base_plan
           */
          if (base_plans.length > 0) {
            this.isProjectStar = true;
            this.selectBasePlan(base_plans[0]);
          }

          if (pass) {
            selectedPass = pass_plans.find(p => p.sku === pass);
            this.selectPass(selectedPass);
          } else {
            if (pass_plans.length > 0) {
              selectedPass = pass_plans.find(p => p.is_default === '1');
              if (!selectedPass) {
                selectedPass = pass_plans[0];
              }
              this.selectPass(selectedPass);
            }
          }

          if (type && selectedPass?.tabData.length > 0) {
            const selectedPlan = selectedPass?.tabData.find(p => p.sku === type);
            this.selectPlan(selectedPlan);
          }

          if (top) {
            this._topService.selectTypeofPurchase(top);
          }

          // * Basic Details
          // basic details updated in loadDeviceDetailPage

          // * MVIVA Campaign
          if (queryParams?.promotiondetails && !data.items.basic_details.is_campaign_mviva &&
              data.items.basic_details.campaign_mviva_invalid) {
            this._modalService.showError({ message: data.items.basic_details.campaign_mviva_invalid });
            this._modalService.onClosedModal.subscribe(id => this.goToDeviceDetails(id, params));
          }
          if (
            data.items.basic_details.is_campaign_mviva &&
            !data.items.basic_details.campaign_mviva_invalid
          ) {
            this._plansService.updateMVIVA(data.items.basic_details.campaign_mviva);
          }

          if (data?.items?.basic_details?.is_campaign_omni) {
            this.campaignOmni = CLMOmniDataSanitizer(data?.items?.basic_details?.campaign_omni);
            this.isNewLine = false;
            this.isMnp = false;
            this.isCobp = true;
            this._plansService.updateOmniCampaign(this.campaignOmni);
          }
          if (queryParams?.promotionomnichannel && !this.campaignOmni) {
            this._modalService.showError({ message: 'Invalid campaign!' });
            this._modalService.onClosedModal.subscribe(id => this.goToDeviceDetails(id, params));
          }
          this.loadDeviceDetailPage(data, queryParams);

          const combo_devices = this.deviceDetailApiResponse?.items?.combo_products;
          if (combo_devices?.length > 0) {
            const selected_combo_device_sku = queryParams?.['combo_device'];
            const defaultCombo = combo_devices.find(d => d.items?.basic_details?.['is_default'] === '1');
            let selected_combo = combo_devices.find(d => d.items?.basic_details?.sku === selected_combo_device_sku)
              || defaultCombo
              || combo_devices?.[0];
            const default_device = selected_combo?.items?.associated_product?.find(d => d?.['is_default'] === '1') 
              || selected_combo?.items?.associated_product?.[0];
            // this._plansService.selectDeviceCombo(default_device);
            this.onSelectProductCombo({
              device: default_device,
              bundle: selected_combo?.items?.basic_details,
            }, queryParams);
            this.isComboPhone = this.deviceDetailApiResponse?.items?.combo_type !== COMBO_DEVICE_TYPE_ACCESSORY;
          }
          this.plansInitialized = true;
        }, err => this.setError(err));
    }
  }

  goToDeviceDetails(id:any, params:any){
    if (id && this.isBrowser) {
      window.location.href = "/device-detail/" + params?.deviceId;
    }
  }

  subscribeForLocalVars() {
    combineLatest([
      this._plansQuery.select(s => s.base_plan),
      this._plansQuery.select(s => s.pass),
      this._plansQuery.select(s => s.plan),
      this._topQuery.select(store => store.mobile_number),
      this._topQuery.select(store => store.supplementary_lines),
      this._topQuery.select(store => store.share_quota),
      this._topQuery.select(store => store.type),
      this._topQuery.select(store => store.mnp_response),
      this._plansQuery.select(store => store.device_bundle_type),
      this._plansQuery.select(store => store.device),
      this._plansQuery.select(store => store.easyphone_selected_contract_period),
      this._topQuery.select(store => store.cobp_response),
      this._plansQuery.select(s => s.api_response),
      this._plansQuery.select(store => store.device_bundle_selected_contract_period),
      this._plansQuery.select(store => store.device_bundle_contract_periods),
      this._plansQuery.select(store => store.device_stock),
      this._plansQuery.isLegacyPlan$,
      this._plansQuery.select(store => store.device_combo),
      this._topQuery.select(s => s.device_combo_number),
      this._plansQuery.select(s => s.is_preorder),
    ]).pipe(
      untilDestroyed(this)
    ).subscribe((resp: any[]) => {
      const [
        base_plan,
        pass,
        plan,
        mobile_number,
        supplementary_lines,
        share_quota,
        top_type,
        mnp_response,
        device_bundle_type,
        device,
        selected_contract_period,
        cobp_response,
        apiResponse,
        device_bundle_selected_contract_period,
        device_bundle_contract_periods,
        device_stock,
        isLegacyPlan,
        device_combo,
        device_combo_number,
        is_preorder,
      ] = resp;
      this.base_plan = base_plan;
      this.supp_part_number = (
          apiResponse?.items?.supplementary_details?.celcom_ultra_plan
          ? apiResponse?.items.supplementary_details.celcom_ultra_plan?.[0]?.part_number
          : apiResponse?.items.supplementary_details.celcom_family_plan?.[0]?.part_number
        ) ?? null;
      this.pass = pass;
      this.plan = plan;
      this.mobile_number = mobile_number;
      this.supplementary_numbers = (<iSupplementaryData[]>supplementary_lines).map(s => s.number);
      this.share_quota = share_quota;
      this.top_type = top_type;
      this.mnp_response = mnp_response;
      this.device_bundle_type = device_bundle_type;
      this.device = device;
      if (device_bundle_type === deviceBundleTypeEnum.easyPhone) {
        this.selected_contract_period = selected_contract_period;
      } else if (device_bundle_type === deviceBundleTypeEnum.deviceBundle) {
        this.selected_contract_period = device_bundle_selected_contract_period;
      }
      this.device_bundle_contract_periods = device_bundle_contract_periods;
      if (cobp_response && cobp_response[0]) {
        this.cobp_response = cobp_response[0];
      }
      this.isLegacyPlan = !!isLegacyPlan;
      if (this.deviceDetailApiResponse && device) {
        const hide_rebate_text = device?.is_neptune_subsidy;
        const data = {
          ...this.deviceDetailApiResponse,
          supp_rebate_label: hide_rebate_text ? '' : this.deviceDetailApiResponse?.supp_rebate_label
        };
        if (this.isHideRebateText !== hide_rebate_text) {
          this.isHideRebateText = hide_rebate_text;
          this._plansService.updateAPIResponse(data);
        }
      }
      this.device_combo = device_combo;
      this.device_combo_number = device_combo_number;
      this.isPreorder = is_preorder;
      this.addStructuredDataJson(device, device_stock);
    });

    // * Updating Analytics
    this.device$
      .pipe(untilDestroyed(this))
      .subscribe(device => {
        if (device) {
          this.eStoreAnalyticsService.SetProductDetails(device, this.renderer);
          this.eStoreAnalyticsService.SetProductId(device.sku, this.renderer);
          this.eStoreAnalyticsService.SetProductType(device.name);
          this.eStoreAnalyticsService.SetCategoryTwoForAdobeDataLayer(this.renderer);
        }
      });
  }

  addStructuredDataJson(device, device_stock) {
    if (device && device_stock) {
      let image = device.image;
      if (image && !/^https?:\/\/[^\/]+/.test(image)) {
        if (this.isBrowser) {
          image = `${location.protocol+'//'+location.hostname+(location.port ? ':'+location.port : '')}${image}`;
        }
      }

      const productSchema = {
        "@context": "http://schema.org/",
        "@type": "Product",
        "name": device.name,
        "offers": {
          "@type": "Offer",
          "availability": (device_stock?.response?.in_stock) ? "https://schema.org/InStock" : "http://schema.org/OutOfStock",
          "price": this.totalPayment,
          "priceCurrency": "MYR",
        },
        "sku": device.sku,
        "image": image,
      };
      this.jsonLdService.addStructuredDataJson(this.renderer, productSchema);
    }
  }

  loadDeviceDetailPage(data, queryParams) {
    if (data?.items?.basic_details) {
      this.basicDetailsItem = this.deviceDetailApiResponse.items.basic_details;
      if(this.deviceDetailApiResponse.items.choose_plan[0].tabData[0].sku === FIRST_BLUE_INTERNET){
        this._plansService.updateIsFirstBluePlan(true);
        this.isFirstBlue = true;
      }
      this._plansService.selectDevice(data.items.basic_details);
      this._plansService.selectDeviceBundle(data.items.basic_details);
      this._plansService.selectDeviceBundleType(data.items.basic_details.default_device_option);
      this._plansService.selectContract(data.items.basic_details.default_easyphone_contract);
      const strippedString = removeHTMLTags(data?.items?.basic_details?.campaign_mviva?.desktop_content);
      if (data?.items?.basic_details?.is_campaign_mviva && strippedString?.length > 0) {
        this.isCampaignMviva = true;
        this.campaignMviva = data.items.basic_details.campaign_mviva;
        const strippedString = this.campaignMviva?.desktop_content?.replace(/(<([^>]+)>)/gi, "").trim();
        this.campaignMviva = {
          ...this.campaignMviva,
          desktop_content: (strippedString?.length > 0) ? this.campaignMviva.desktop_content : null,
        }
        this._plansService.updateMVIVA(data.items.basic_details.campaign_mviva);
      }
      this.devicePurchaseType = data?.device_purchase_type;
      this.setDefaultColorStorage(data.items);
      this.setBuyOptions(data.items.basic_details, queryParams);
    }
  }

  setBuyOptions(details: IDeviceBasicDetails, queryParams) {
    if (this.isCampaignMviva) {
      this.resetAndLoadNewBuyOptions(this.campaignMviva);
    } else if (this.campaignOmni) {
      let optionDeviceBundle = this.getBuyOption("deviceBundle");
      this.deviceBuyOptions = [ optionDeviceBundle ];
    } else {
      // device buy options are configurable for all device journey, as per CEL-12804
      this.resetAndLoadNewBuyOptions(this.devicePurchaseType);
    }

    // ? default device option from param query or CMS default option
    if(!this.isFirstBlue) {
      const defaultDeviceOption = queryParams?.deviceOption ?? details?.default_device_option
      this.handleSelectedDeviceBuyOption(defaultDeviceOption, queryParams);
    } else {
      this.handleSelectedDeviceBuyOption(null);
    }
  }

  getBuyOption(value) {
    return this.allBuyOptions.find(option =>
      option.value === value
    );
  }

  resetAndLoadNewBuyOptions(optionsData) {
    this.deviceBuyOptions = [];
    if (optionsData?.easyphone === "1") {
      let optionEasyphone = this.getBuyOption("easyPhone");
      this.deviceBuyOptions = [
        ...this.deviceBuyOptions,
        optionEasyphone
      ];
    }
    if (optionsData?.device_bundle === "1") {
      let optionDeviceBundle = this.getBuyOption("deviceBundle");
      this.deviceBuyOptions = [
        ...this.deviceBuyOptions,
        optionDeviceBundle
      ];
    }
    if (optionsData?.device_only === "1") {
      let optionDeviceOnly = this.getBuyOption("deviceOnly");
      this.deviceBuyOptions = [
        ...this.deviceBuyOptions,
        optionDeviceOnly
      ];
    }
  }

  handleSelectedDeviceBuyOption(option: string, queryParams = null) {
    let selected = option;
    if (!this.deviceBuyOptions.find(o => o.value === selected)) {
      selected = this.deviceBuyOptions?.[0]?.value;
    }
    this.checkIsNumberSelected(() => {
      this.setSelectedDeviceBuyOption(selected, queryParams);
    });
  }

  setSelectedDeviceBuyOption(option: string, queryParams) {
    let availableOptions = [];
    if(this.deviceDetailApiResponse.items.basic_details.is_easy_phone === 1) {
      availableOptions = [ ...availableOptions, deviceBundleTypeEnum.easyPhone ];
    }
    availableOptions = [
      ...availableOptions,
      deviceBundleTypeEnum.deviceBundle,
      deviceBundleTypeEnum.deviceOnly
    ];

    let buyOption = availableOptions
      .includes(deviceBundleTypeEnum[option]) ? option : "deviceBundle";

    this.selectedBuyOption = buyOption;
    this._plansService.selectDeviceBundleType(buyOption);

    if(deviceBundleTypeEnum[buyOption] == deviceBundleTypeEnum.deviceOnly) {
      this._plansService.selectBasePlan(null);
      this._plansService.selectPass(null);
    } else {
      //this.plansAnchor?.nativeElement.scrollIntoView();
      if (deviceBundleTypeEnum[buyOption] == deviceBundleTypeEnum.easyPhone) {
        this._plansService.selectDeviceBundleSubtype('own');
      }
      this.reselectDefaultPlan(null, queryParams);
      this.setTopOptions(buyOption, queryParams);
      const isPlansExist = this.getAddonPlansToDisplay(this.pass)?.length > 0;
      if (!isPlansExist) {
        const availablePlans = this.allPass.find(p => p.sku !== this.pass?.sku);
        this.selectPassbySKU(availablePlans?.sku);
      }
    }
  }

  reselectDefaultPlan(pass: ChoosePlan | null, qp = null) {
    let selectedPass = pass ? pass : this.pass;
    let queryParams = {
      ...qp
    }
    if (Object.keys(queryParams)?.length === 0) {
      queryParams = null;
    }
    // ? queryParams will be there in initial load
    if (!this.base_plan || !this.pass || queryParams !== null) {
      const base_plans = this.deviceDetailApiResponse.items.base_plan;
      const pass_plans = this.deviceDetailApiResponse.items.choose_plan;

      const defaultPlan = base_plans[0];

      const defaultPass = queryParams?.pass
        ? pass_plans.find(plan => plan.sku === queryParams?.pass) ?? pass_plans[0]
        : pass_plans[0];

      this._plansService.selectBasePlan(defaultPlan);
      this._plansService.selectPass(defaultPass);
      selectedPass = defaultPass;
    }
    const selectedDevice = this.device_combo || this.device;
    let availablePass = selectedDevice?.easy_phone?.own_selected_plan?.map(p => p.toLowerCase());
    if (this.device_bundle_type == deviceBundleTypeEnum.deviceBundle) {
      availablePass = selectedDevice?.saleable_plans?.map(d => d.sku.toLowerCase());
      if (this.device_combo) {
        availablePass = selectedDevice?.saleable_plans
          ?.filter(d => d.parent_product_sku === this.device.sku)
          ?.map(d => d.sku.toLowerCase());
      }
    }
    if (this.isCampaignMviva && this.campaignMviva && this.campaignMviva.targeted_plan) {
      availablePass = this.campaignMviva.targeted_plan.map(_plan => this.getAvailablePass(_plan));
    }

    const defaultPass = queryParams?.type
      ? queryParams?.type
      : this.device_bundle_type === deviceBundleTypeEnum.deviceBundle
        ? this.deviceDetailApiResponse.items.basic_details?.default_plan_sku
        : this.device_bundle_type === deviceBundleTypeEnum.easyPhone
          ? this.deviceDetailApiResponse.items.basic_details?.default_easyphone_plan_sku
          : ""

    const selectablePlans = selectedPass?.tabData?.filter(p => availablePass?.includes(p.sku.toLowerCase()));
    if (selectablePlans) {
      const defaultPlan = selectablePlans?.find(p => p.sku === defaultPass) || selectablePlans[0];
      if (defaultPlan) {
        this._plansService.selectPlan(defaultPlan);
      }
    }
  }

  getAvailablePass(_plan){
    const passSku = _plan.split("-plan");
    if (passSku.length === 2) {
      return passSku[0] + passSku[1];
    }
  }

  setTopOptions(option, queryParams = null) {
    this.isNewLine = false;
    this.isCobp = false;
    if (deviceBundleTypeEnum[option] === deviceBundleTypeEnum.deviceBundle &&
      (!this.isCampaignMviva || (this.isCampaignMviva && this.campaignMviva?.purchase_type.includes("newline")))) {
      this.isNewLine = true;
    }
    if (!this.isCampaignMviva || (this.isCampaignMviva && this.campaignMviva?.purchase_type.includes("cobp"))) {
      this.isCobp = true;
    }
    if (this.campaignOmni) {
      this.isNewLine = false;
      this.isMnp = false;
      this.isCobp = true;
    }

    if (queryParams?.top) {
      // ? newline comes as `nl` from portal, should be requested to change
      const top = queryParams?.top === 'nl' ? 'newline' : queryParams?.top;
      this.handleSelectedTypeOfPurchase(top);
    }
  }

  reserveNumber(base_plan: iBasePlan, mobile_number: string, supplementary_numbers: string[]) {
    const suppReqData: iNumberReservationRequestData = {
      partNumber: this.supp_part_number,
      sku: base_plan?.sku ? base_plan.sku : this.plan?.sku,
    };
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
    };
    return this._postpaidService.reserveNumber(data);
  }

  handleCheckoutClick() {
    const option = this.selectedBuyOption;
    localStorage.removeItem('isDeviceOnlyClicked');

    // * Device Only
    if (deviceBundleTypeEnum[option] === deviceBundleTypeEnum.deviceOnly) {
      const stock = this._plansQuery.getValue().device_stock;
      const stockDetials = {
        status: stock?.response?.message,
        data: {
          simpleSku: stock?.sku
        }
      };

      if (!this._userService.isCustomer()) {    // check if the user is logged in
        localStorage.setItem("isDeviceOnlyClicked", JSON.stringify(true));

        const totalPrice = this.device.discounted_device_rrp ? this.device.discounted_device_rrp : this.device.rrp;
        const orderDetails = {
          sku: this.deviceDetailApiResponse.items.basic_details.sku,
          price: totalPrice
        };

        const selectedProductDetails = {
          orderDevice: this.deviceDetailApiResponse.items.basic_details.sku,
          selectedProductSku: this.device.sku,
          orderDeviceName: this.deviceDetailApiResponse.items.basic_details.name,
          selectedImageList: this.device.sub_images,
          orderSummaryStorage: this.device.memory,
          orderSummaryColor: this.device.color,
          orderPhoneNo: null,
          eligibilty: null,
          orderPlan: null,
          selectedPlanDetails: null,
          orderPlanName: null,
          orderAddOnpass: null,
          orderSubpass: null,
          orderDevicePrice: this.device.rrp,
          orderMonthlyPay: this.deviceDetailApiResponse.items.basic_details.order_monthly_pay,
          orderOneTimePay: this.deviceDetailApiResponse.items.basic_details.price,      //this.orderOneTimePay,
          orderTotalPay: totalPrice,
          orderNumberType: null,
          total: totalPrice,
          stockDetails: stockDetials,
          orderReqCategory: this.device.order_category,
          orderReqModel: this.device.order_model,
          orderReqBrand: this.deviceDetailApiResponse.items.basic_details.order_brand,
          orderReqColor: this.device.order_color,
          orderReqPartNumber: this.device.part_number,
          orderReqPlanBundle: null,
          orderReqServiceBundle: null,
          orderMoon: false,
          orderStar: this.isProjectStar
        };

        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        localStorage.setItem('selectedProductDetails', JSON.stringify(selectedProductDetails));

        this._modalService.open('guest-login-popup');
      } else {
          this.addToCart();
      }
    }
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
      this.addToCart();
    }

  }

  redirectLogin(type?: string) {
    if (type === 'guest') {
      this._router.navigateByUrl('/store/guest/login');
    } else {
      this._modalService.close('guest-login-popup');
      this._modalService.open('mc-login');
    }
  }

  setDefaultColorStorage(items: IDeviceDetailResponseItem) {
    const {
      basic_details: {default_selected_color, default_selected_memory},
      associated_product
    } = items;

    let defaultProduct = associated_product.find(x => x.color === default_selected_color && x.memory === default_selected_memory);

    if (!defaultProduct) {
      defaultProduct = associated_product[0];
    }

    this.reSelectDevice(defaultProduct);
  }

  selectBasePlan(base: iBasePlan) {
    this._plansService.selectBasePlan(base);
  }

  selectPass(pass: ChoosePlan) {
    this._plansService.selectPass(pass);
    if (this.plansInitialized) {
      this.reselectDefaultPlan(pass);
    }
  }

  selectPassbySKU(sku: string) {
    const pass = this.allPass.find(p => p.sku == sku);
    if (pass) {
      this.checkIsNumberSelected(() => {
        this.selectPass(pass);
      });
    }
  }

  selectPlan(plan: iPlan) {
    this._plansService.selectPlan(plan);
  }

  selectPlanbySKU(sku: string, selectedPass: ChoosePlan) {
    const plan = selectedPass.tabData.find(p => p.sku == sku);
    if (plan) {
      this.checkIsNumberSelected(() => {
        this.selectPlan(plan);
        //this.topAnchor.nativeElement.scrollIntoView();
      });
    }
  }

  getTotalMonthlyPay(base: iBasePlan, plan: iPlan): number {
    if (!base && !plan) return 0;
    let phone_price = 0;

    if (this.device_bundle_type === deviceBundleTypeEnum.easyPhone) {
      phone_price = this.getDevicePrice(this.device_bundle_type, plan?.sku);
    }

    let total = +(phone_price || 0);
    total += +(base?.PlanMonthlyPay || 0);
    if (plan) {
      total += +(plan.PlanMonthlyPay || 0);
    }
    return total;
  }

  getDeviceContractTotalMonthlyPay(plan: iPlan): number {
    if (!plan) return 0;

    // Don't know why using this phone_price as it is not returned or used

    // let phone_price = 0;

    // if (this.device_bundle_type === deviceBundleTypeEnum.deviceBundle) {
    //   phone_price = this.getDevicePrice(this.device_bundle_type, plan?.sku);
    // }

    let total = 0;
    // total += +(base.PlanMonthlyPay || 0);
    if (plan) {
      total += +(plan.PlanMonthlyPay || 0);
    }
    return total;
  }

  selectDeviceBundleSubtype(subtype: string) {
    this._plansService.selectDeviceBundleSubtype(subtype);
  }

  openFeaturesSpecs() {
    if (this.deviceSpecsAnchor) {
      this.deviceSpecsAnchor.nativeElement.scrollIntoView({
        behavior: "smooth"
      });
    }
  }

  setError(data?: any | iGeneralServerResponse) {
    this._modalService.showError(data);
  }

  getBasePlansToDisplay(selectedBase: iBasePlan): iBasePlanToDisplay[] {
    if (!this.allPass || !selectedBase?.name) return [];
    return this.allPass.filter(p => {
      return this.getAddonPlansToDisplay(p)?.length > 0;
    }).map(p => {
      return {
        sku: p.sku,
        image: p.image_url,
        title: `${selectedBase?.name} ${p.name || ''}`,
        price: selectedBase?.keyText || null,
        offers: !p.name ? selectedBase?.offer : p.offer,
        badge: p.promotion_badge,
        promotion_text: p.promotion_text,
        promotion_terms: p.promotion_terms,
      }
    });
  }

  getDevicePrice(bundle_type: deviceBundleTypeEnum, plan_sku: string): number {
    let price = 0;
    if (bundle_type == deviceBundleTypeEnum.deviceBundle) {
      let pricing = this.device.saleable_plans.find(itm => itm.sku == plan_sku);
      if (this.device_combo) {
        pricing = this.device_combo?.saleable_plans?.find(itm => itm.sku == plan_sku && itm.parent_product_sku === this.device.sku);
      }
      if (pricing) {
        price = +(pricing.prices[0].device_price || 0);
      }
      if (pricing && pricing?.prices?.[0]?.contract_period) {
        const priceCheck = pricing?.prices?.[0]?.contract_period?.[this.selected_contract_period]?.device_price;
        if (!isNullOrUndefined(priceCheck)) {
          price = +priceCheck;
        }
      }
    } else if (bundle_type == deviceBundleTypeEnum.easyPhone) {
      let obj;
      try {
        obj = this.device.easy_phone?.own?.find(itm => {
          return Object.keys(itm).includes(plan_sku);
        });
      } catch (_error) {

      }
      if (this.device_combo) {
        obj = this.device_combo.easy_phone?.own?.find(itm => {
          return Object.keys(itm).includes(plan_sku) && itm.parent_product_sku === this.device.sku;
        });
      }
      if (obj) {
        try {
          if (obj['contract_periods'] && obj['contract_periods'][this.selected_contract_period]) {
            price = +(obj['contract_periods'][this.selected_contract_period] || 0);
          } else {
            price = +(obj[plan_sku] || 0);
          }
        } catch (_err) {

        }
      }
    }

    return price;
  }

  getAddonPlansToDisplay(selectedPass: ChoosePlan): iAddonPlanToDisplay[] {
    let passes = [];
    this.promoTerms = '';
    const selectedDevice = this.device_combo || this.device;
    if (selectedPass && selectedDevice) {
      let availablePass = [];
      if (this.device_bundle_type == deviceBundleTypeEnum.deviceBundle) {
        availablePass = selectedDevice.saleable_plans?.map(d => d.sku.toLowerCase());
        if (this.device_combo) {
          availablePass = selectedDevice.saleable_plans
            ?.filter(d => d.parent_product_sku === this.device.sku)
            ?.map(d => d.sku.toLowerCase());
        }
      } else if (this.device_bundle_type === deviceBundleTypeEnum.easyPhone) {
        availablePass = selectedDevice.easy_phone?.own_selected_plan?.map(p => p.toLowerCase());
      }
      if (this.isCampaignMviva && this.campaignMviva && this.campaignMviva.targeted_plan) {
        availablePass = this.campaignMviva.targeted_plan.map(_plan => this.getAvailablePass(_plan));
      }
      if (this.selected_contract_period !== selectedDevice.contract) {
        if (this.device_bundle_type == deviceBundleTypeEnum.easyPhone && availablePass) {
          availablePass = availablePass.filter(p => {
            const obj = selectedDevice.easy_phone?.own?.find(itm => {
              return Object.keys(itm).map(s => s?.toLowerCase()).includes(p);
            });
            return !!obj?.contract_periods?.[this.selected_contract_period];
          });
        }
      }
      passes = selectedPass.tabData.filter(p => availablePass?.includes(p.sku.toLowerCase())).map(p => {
        let easyphone_data: iEasyphoneData = null;
        let price = p.keyText;
        let phone_price = this.getDevicePrice(this.device_bundle_type, p.sku);
        let title = p.name;
        if (this.device_bundle_type == deviceBundleTypeEnum.easyPhone) {
          easyphone_data = {
            base_label: this.base_plan?.name,
            base_price: +this.base_plan?.PlanMonthlyPay,
            pass_price: +p.PlanMonthlyPay,
            phone_price,
            multiple_devices: !!this.device_combo,
          }
          price = `RM${this._numberPipe.transform(phone_price, '1.0-2')}`;
        }
        if ((selectedPass.sku != this.pass_speed_sku && this.base_plan?.name) || this.isFirstBlue) {
          title = `<div class="row">
            <div class="col">${p.name}</div>
            <div class="col-auto" style="font-weight: normal">${p.keyFiguresText}</div>
          </div>`;
        }
        return {
          sku: p.sku,
          title,
          price: `${((selectedPass.sku == this.pass_speed_sku && this.device_bundle_type == deviceBundleTypeEnum.deviceBundle) ? '+' : '')}${price}`,
          offers: p.offer,
          badge: p.promotion_badge,
          promotion_text: p.promotion_text,
          promotion_terms: p.promotion_terms,
          device_price: phone_price,
          easyphone_data
        }
      });
      let terms = new Set(passes.map(p => p.promotion_terms));
      this.promoTerms = Array.from(terms).filter(t => `${t}`.trim().length > 0).join('<br>');
    }
    return passes;
  }

  OnContractTabSelected(item) {
    if (!this.isContractAvailable(item)) {
      return;
    }
    this._plansService.selectContract(item);
  }

  OnDeviceBundleContractTabSelected(item) {
    this._plansService.selectDeviceBundleContract(item);
  }
  isContractAvailable(item): boolean {
    // Will return true
    if (item == this.device?.contract) return true;
    const plan_sku = this.plan?.sku;
    let obj;
    try {
      obj = this.device.easy_phone.own.find(itm => {
        return Object.keys(itm).includes(plan_sku);
      });
    } catch (_error) {

    }
    if (this.device_combo) {
      obj = this.device_combo.easy_phone?.own?.find(itm => {
        return Object.keys(itm).includes(plan_sku) && this.device?.sku === itm.parent_product_sku;
      });
    }
    if (!obj?.['contract_periods'] || !obj?.['contract_periods'][item]) {
      return false;
    }
    return true;
  }

  onSelectProduct(device: iPlanDevice) {
    this.checkIsNumberSelected(() => {
      this.reSelectDevice(device);
    });
  }

  getBundleIndexesFromSKU(device_sku: string): [number, number] {
    let subIndex = -1;
    const index = this.deviceDetailApiResponse.items.combo_products.findIndex(d => {
      const idx = d.items.associated_product.findIndex(dev => dev.sku === device_sku);
      subIndex = idx;
      return idx >= 0;
    });
    return [index, subIndex];
  }

  onSelectProductCombo({device, bundle}: {device: iPlanDevice, bundle: iPlanDeviceBundle}, queryParams = null) {
    this.checkIsNumberSelected(() => {
      if (device) {
        const hasPricing = !!device?.easy_phone?.own;
        if (!hasPricing) {
          this.updateComboPricings(device.sku, bundle, queryParams);
          return;
        }
      }
      this._plansService.selectDeviceBundleCombo(bundle);
      this._plansService.selectDeviceCombo(device);
      this.handleSelectedDeviceBuyOption('easyPhone');
    });
  }

  updateComboPricings(device_sku, bundle, queryParams) {
    this.isPricingLoading = true;
    this._deviceDetailPageService.loadDeviceCombo(this.deviceDetailApiResponse?.items?.basic_details?.sku, null)
      .pipe(
        finalize(() => this.isPricingLoading = false)
      )
      .subscribe(response => {
        const combo_products = [];
        for (const combo of this.deviceDetailApiResponse
          .items
          .combo_products) {
          const products = [];
          for (const associated_product of combo.items.associated_product) {
            const device = response.items.associated_product.find(p => p.sku === associated_product.sku);
            const prod = {
              ...associated_product,
              ...device,
            }
            products.push(prod);
          }
          combo_products.push({
            ...combo,
            items: {
              ...combo.items,
              associated_product: products
            }
          });
        }
        this.deviceDetailApiResponse = {
          ...this.deviceDetailApiResponse,
          items: {
            ...this.deviceDetailApiResponse.items,
            combo_products
          }
        };
        this._plansService.updateAPIResponse(this.deviceDetailApiResponse);
        this._plansService.selectDeviceBundleCombo(bundle);
        const bundleData = combo_products?.find(b => b.items?.basic_details?.sku === bundle?.sku);
        const selected_device = bundleData?.items?.associated_product?.find(p => p.sku === device_sku) 
          || bundleData?.items?.associated_product?.[0];
        this._plansService.selectDeviceCombo(selected_device);
        this.handleSelectedDeviceBuyOption('easyPhone');
        this.reselectDefaultPlan(null, queryParams);
      });
  }

  reSelectDevice(device: iPlanDevice = null) {
      if (device) {
        this.display.images = this.getImageForSlider(device?.color);
        this.updateStockData(device.sku);
        this._plansService.selectDevice(device);
        this.display.isNew = !!(this.device?.is_new);
        if (this.device_bundle_type === deviceBundleTypeEnum.deviceBundle
          && this.isFirstBlue
          && this.device_bundle_contract_periods?.length === 0) {
          this._plansService.selectDeviceBundleContract("12");
        }
      }
  }

  updateStockData(sku) {
    // ? if preorder, don't update or call API
    if (this.deviceDetailApiResponse?.items?.basic_details?.preorder) {
      return;
    }

    // ? Unsubscribe previous subscription
    if (this.deviceStockSubscription) {
      this.deviceStockSubscription.unsubscribe();
    }
    this.isCheckingStock = true;
    this.deviceStockSubscription = this._deviceDetailPageService.getDeviceStock(sku)
      .pipe(
        finalize(() => this.isCheckingStock = false)
      )
      .subscribe(res => {
        this._plansService.updateDeviceStock(sku, res);
      }, err => {
        this._plansService.updateDeviceStock(sku, err);
      });
  }

  getImageForSlider(selectedColor) {
    return this
      .deviceDetailApiResponse
      .items
      .associated_product
      .filter(item => item.color === selectedColor)[0].sub_images;
  }

  handleSelectedTypeOfPurchase(event: string) {
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

    this.checkIsNumberSelected(() => {
      this._topService.selectTypeofPurchase(event);
      this.callAutoBillingCheck();
    });
  }

  checkIsNumberSelected(cb) {
    if (this.top_type != null && this.mobile_number) {
      this._modalService.showConfirm({title: 'Are you sure?', message: 'Proceeding this action will reset all your previous selection.'})
        .subscribe(result => {
          if (result) cb();
        });
    } else {
      cb();
    }
  }


  addToCart(reservationId: string = "", temporary_number: string = "") {
    this.updateSession();
    const plansStoreInstance = this._plansQuery.getValue();
    const topStoreInstance = this._topQuery.getValue();

    let data: addTocartBundle.RootObject;
    let basicData;
    if (this.top_type === typeOfPurchaseEnum.newline) {
      basicData = new NewLineAddtocartData(this.mobile_number, reservationId);

      basicData.updateAttributes(
        this.deviceDetailApiResponse.items.basic_details.sku,
        this.base_plan,
        this.pass,
        this.plan,
        this.device
      );
      if (this.isFirstBlue || this.isLegacyPlan) {
        basicData.selected_plan_product_sku = this.plan?.sku;
        basicData.selected_pass_product_sku = "";
        basicData.sub_pass_sku = "";
      } else {
        basicData.selected_pass_product_sku = basicData.selected_pass_product_sku ?? "Ultra-GB";
      }
      basicData = {
        ...basicData,
        bundle_product_price: `${this.totalPayment}`,
        contract_period : this.selected_contract_period ,
        selected_device_product_device_price: plansStoreInstance.device_price,
        selected_device_product_sku: this.device.sku,
        selected_device_product_up_fornt_price: plansStoreInstance.upfront_payment_waived
          ? '0' : `${plansStoreInstance.upfront_payment}`,
      }
    } else if (this.top_type === typeOfPurchaseEnum.cobp) {
      basicData = new COBPAddtocartData(this.mobile_number, reservationId);
      basicData.updateAttributes(this.deviceDetailApiResponse.items.basic_details.sku,
        this.base_plan,
        this.pass,
        this.plan, this.device);
      basicData = {
        ...basicData,
        bundle_product_price: `${this.totalPayment}`,
        validated_id: this.cobp_response?.validated_id,
        selected_device_product_device_price: this.device.rrp,
        selected_device_product_sku: this.device.sku,
        is_easyphone: this.device_bundle_type === deviceBundleTypeEnum.easyPhone,
        contract_period: this.selected_contract_period
          || this.device.contract
          || undefined
      };
      if (this.isFirstBlue || this.isLegacyPlan) {
        basicData.selected_plan_product_sku = this.plan?.sku;
        basicData.sub_pass_sku = "";
      }
      basicData.easyphone_type = "";
      if (this.device_bundle_type === deviceBundleTypeEnum.easyPhone) {
        const easyPhoneType = this._plansQuery.getValue().device_bundle_subtype;
        basicData.easyphone_type = easyPhoneType.charAt(0).toUpperCase() + easyPhoneType.slice(1);
        basicData.contract_period = this.selected_contract_period 
          || this.device.contract
          || undefined
      }
    }
    if (deviceBundleTypeEnum[this.selectedBuyOption] === deviceBundleTypeEnum.deviceOnly) {
      basicData = {
        bundle_product_sku: this.deviceDetailApiResponse.items.basic_details.sku,
        selected_device_product_sku: this.device.sku,
        selected_plan_product_sku: "null",
        selected_device_product_up_fornt_price: "0",
        selected_device_product_device_price: this.device.rrp,
        device_product_qty: "1",
        device_product_price: this.device.rrp,
        is_mnp: false,
        is_cobp: false,
        user: "user",
        is_preorder: !!(this.deviceDetailApiResponse.items.basic_details.preorder),
        is_affiliate_ia: false,
        is_affiliate_ada: false,
        is_star_internet_share: false
      }
    } else {
      basicData.is_campaign_mviva = this.isCampaignMviva;
      if (basicData.is_campaign_mviva) {
        basicData.campaign_mviva_url = window.location.href.replace(/%20/g, " ");
      }
      if (!this.isFirstBlue && !this.isLegacyPlan) {
        basicData.selected_pass_product_sku = basicData.selected_pass_product_sku ? basicData.selected_pass_product_sku : "Ultra-GB";
      }
    }

    basicData.is_campaign_omni = !!this.campaignOmni;
    if (this.device_combo) {
      basicData = {
        ...basicData,
        device_combo_sku: this.device_combo?.sku,
        selected_combo_supp_number: this.device_combo_number,
      }
    }

    // ? INTERNETshare
    basicData.is_star_internet_share = !!(topStoreInstance.share_quota);

    data = {
      "data": {
        ...basicData,
      },
      "stockReserveQuantityInput": {
        "stockReserveQuantityInput": {
          "storeId": environment.outletId,
          "reservationId": "IT000016",
          "listOfItemDetailRequest": {
            "itemDetailRequest": [
              {
                "ProductType": "HP",
                "PartNum": this.device.part_number,
                "Quantity": "1",
                "listOfAttributes": [
                  {
                    // These attributes only for devices
                    "attributes": [
                      {
                        "Name": "BRAND",
                        "Value": this.deviceDetailApiResponse?.items?.basic_details?.order_brand
                      },
                      {
                        "Name": "MODEL",
                        "Value": this.device.order_model
                      },
                      {
                        "Name": "COLOR",
                        "Value": this.device.order_color
                      },
                      {
                        "Name": "CATEGORY",
                        "Value": this.device.order_category
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
    if (this.device_combo) {
      const deviceComboRequest = [];
      if (this.device_combo) {
        const deviceComboItem: addTocartBundle.ItemDetailRequest = {
          "ProductType": "HP",
          "PartNum": this.device_combo?.part_number || " ",
          "Quantity": "1",
          "listOfAttributes": [{
            "attributes": [{
              "Name": "BRAND",
              "Value": this.device_combo?.order_category || " "
            },
            {
              "Name": "CATEGORY",
              "Value": this.device_combo?.order_category || " "
            },
            {
              "Name": "COLOR",
              "Value": this.device_combo?.order_color || " "

            },
            {
              "Name": "MODEL",
              "Value": this.device_combo?.order_model || " "
            },
            {
              "Name": "PRODUCT",
              "Value": "DEVICE"
            }
            ]
          }]
        };
        deviceComboRequest.push(deviceComboItem);
        let detailItemRequest = data?.stockReserveQuantityInput?.stockReserveQuantityInput?.listOfItemDetailRequest?.itemDetailRequest;
        detailItemRequest = [...detailItemRequest, ...deviceComboRequest];
        data.stockReserveQuantityInput.stockReserveQuantityInput.listOfItemDetailRequest.itemDetailRequest = detailItemRequest;
      }

    }

    if (deviceBundleTypeEnum[this.selectedBuyOption] !== deviceBundleTypeEnum.deviceOnly) {
      data.supp_data = topStoreInstance.supplementary_lines.map(line => ({
        number: line.number,
        plan: this.supp_part_number,
        subsidy: "", // ? Not sure where to get
      }));
    }

    this._postpaidService.addToCart(data)
      .subscribe(resp => {
        if (resp?.[0]?.['status']){
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
      this._plansService.updateAddtocartError(true);
    });
  }

  buyNow() {
    if (!this.isNewLine && !this.isMnp) {
      this.handleSelectedTypeOfPurchase("cobp");
    }
  }

  callAutoBillingCheck() {
    let sku: string = "";
    let actionType: number;
    let msisdn: string = "";

    if (this.top_type == typeOfPurchaseEnum.newline) {
      actionType = ACTION_TYPE.POSTPAID_NEW_REG;
      if (this.supplementary_numbers.length > 0) {
        actionType = ACTION_TYPE.POSTPAID_NEW_REG_SUPP;
      }
      if (this.device_bundle_type == deviceBundleTypeEnum.deviceBundle) {
        actionType = ACTION_TYPE.BUNDLE_NEW_REG;
        if (this.supplementary_numbers.length > 0) {
          actionType = ACTION_TYPE.BUNDLE_NEW_REG_SUPP;
        }
      }
    }
    if (this.top_type == typeOfPurchaseEnum.cobp) {
      actionType = ACTION_TYPE.POSTPAID_COBP;
      if (this.device_bundle_type == deviceBundleTypeEnum.easyPhone) {
        actionType = ACTION_TYPE.COBP_EASY_PHONE_RENT_OWN;
      }
      if (this.device_bundle_type == deviceBundleTypeEnum.deviceBundle) {
        actionType = ACTION_TYPE.BUNDLE_COBP;
      }
    }
    if (this.top_type == typeOfPurchaseEnum.mnp) {
      actionType = ACTION_TYPE.POSTPAID_MNP;
    }
    if (this.device_bundle_type == deviceBundleTypeEnum.deviceOnly) {
      actionType = ACTION_TYPE.DEVICE_ONLY;
    }

    if (this.base_plan) {
      sku = this.base_plan.sku;
    }
    if (this.device) {
      sku = this.device.sku;
    }
    // if (sessionStorage && sessionStorage.getItem("hw_validated_id")) {
    //   this.isHomeWireless = true;
    // }
    // if (localStorage && localStorage.getItem("MyMsIsdn")) {
    //   msisdn = localStorage.getItem("MyMsIsdn");
    // }
    msisdn = this._userService.getMsisdn();
    const mapToP = this.top_type === typeOfPurchaseEnum.newline ? 'NL'
      : (
        this.top_type === typeOfPurchaseEnum.cobp ? 'COBP'
        : 'MNP'
      )
    this._deviceDetailPageService.AutoBillingCheck({
      sku,
      typeOfPurchase: mapToP,
      actionType,
      msisdn: msisdn?.substr(1)
    }).subscribe(resp => {
      this._topService.updateAutobilling(resp);
    });
  }

  onToPEvent(event: iToPEvent) {
    if (event?.type == 'onAfterEligibilityCheck' && this.top_type == typeOfPurchaseEnum.cobp) {
      this.callAutoBillingCheck();
    }
  }

  updateSession() {
    localStorage.removeItem("isBundleClicked");
    localStorage.removeItem("isDeviceOnlyClicked");
    if (this.device_bundle_type === deviceBundleTypeEnum.deviceBundle) {
      localStorage.setItem("isBundleClicked", "true");
    } else if (this.device_bundle_type === deviceBundleTypeEnum.deviceOnly) {
      localStorage.setItem("isDeviceOnlyClicked", "true");
    }
  }

}
