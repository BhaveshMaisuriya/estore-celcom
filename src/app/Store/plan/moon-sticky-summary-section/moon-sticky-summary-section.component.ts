import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../base.component';
import { CartService } from '../../../Service/cart.service';
import { UserService } from '../../../Service/user.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { BundleService } from '../../../Service/bundle.service';
import { AppService } from '../../../Service/app.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { BroadbandService } from '../../../Service/broadband.service';
import { StickySummaryComponent } from '../../../../app/Widget/StoreWidgets/device-details/sticky-summary/sticky-summary.component';
import { DeviceDetailsNumberService } from "../../../../app/Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service";
import { OrderInfoService } from '../../../Service/orderinfo.service';
import { DeviceSummaryService } from '../../../../app/Widget/StoreWidgets/device-details/services/device-summary-service.service';
import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';
import { SupplimentaryLinesService } from '../../../../app/Store/widget/supplementary-lines/supplementary-lines.service';
import { PlansService } from '../../../Service/plans.service';
@Component({
  selector: 'app-moon-sticky-summary-section',
  templateUrl: './moon-sticky-summary-section.component.html',
  styleUrls: ['./moon-sticky-summary-section.component.css'],
  providers: [CartService, BundleService, BroadbandService, AppService, UserService,
    StickySummaryComponent, DeviceDetailsNumberService, OrderInfoService, DeviceSummaryService,
    SupplimentaryLinesService, RemarketAnalyticsService],
  animations: [
    trigger('heroState', [
      state('is-selected', style({
        background: '#fff',
        color: '#000',
        borderTop: '8px solid #009ade',
        borderRight: 'none',
        height: '70px'
      })),
      transition('* => is-selected', animate('1ms ease-in')),
      transition('is-selected => *', animate('1ms ease-out'))
    ])
  ]
})
export class MoonStickySummarySectionComponent extends BaseComponent implements OnInit {
  @Input() moonPlanDeviceDetailsData: any;
  @Input() selectedProdForEdit: any;
  @Input() mnpCheckPlanPurchase: any;
  public step = 1;
  public isStep1Active = false;
  public isStep2Active = false;
  public isStep3Active = false;
  public isStep4Active = false;
  public showErrorToaster = false;
  public itemInCart = false;
  public clickedButton = false;
  public disableAddTocart: boolean;
  public disableCartButton: boolean;
  public selectedProductDetails = null;
  public selectedPlanDetails = null;
  public randomPhoneNo: any = null;
  public reservationId = "";
  public orderBasePlanMoon: any = null;
  public orderAddOnPassMoon: any = null;
  public selectedDeviceInfoForMoon: any = null;
  public orderPlanName: string;
  public sharedContract: string;
  public orderNumberType: string;
  public orderPhoneNo: string;
  public orderDeviceName = null;
  public orderSummaryStorage: string;
  public orderSummaryColor: string;
  public orderTotalPay: number;
  public orderDevicePrice: number;
  public inStock = true;
  private subscriber: Subscription;
  public errorToasterData = {};
  isCSAgent = false;
  isCustomer = false;
  isGuest = false;
  isMCUser = false;
  public deviceUpfrontPenalty = 0;

  isInsideContainer = false;

  constructor(
    private _router: Router,
    private cartService: CartService,
    private _deviceDataService: DeviceDataService,
    private bundleService: BundleService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private appService: AppService,
    private userService: UserService,
    private _broadbandService: BroadbandService,
    public _stickySummary: StickySummaryComponent,
    private _plansService: PlansService,
    private _route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.isCSAgent = this.userService.isCSAgent();
    this.isCustomer = this.userService.isCustomer();
    this.isGuest = this.userService.isGuest();
    this.isMCUser = this.userService.isMCUser();
    this._broadbandService.scrollToTop();
    this._stickySummary.ngOnInit();
    this.subscriber = this._deviceDataService.sharedDeviceUpfrontPenalty$.subscribe(data => {
      if (data !== undefined &&  data !== null) {
      this.deviceUpfrontPenalty = Number(data);
      }
    });
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => this.showErrorToaster = data);
    this.subscriber = this._deviceDataService.updateStickyStep$.subscribe(data => this.setStickyTab(data));
    this.subscriber = this._deviceDataService.sharedColor$.subscribe(data => this.orderSummaryColor = data);
    this.subscriber = this._deviceDataService.sharedStorage$.subscribe(data => this.orderSummaryStorage = data);
    this.subscriber = this._deviceDataService.sharedPhoneNo$.subscribe(data => this.orderPhoneNo = data);
    this.subscriber = this._deviceDataService.sharedNumberType$.subscribe(data => this.orderNumberType = data);
    this.subscriber = this._deviceDataService.sharedDevicePrice$.subscribe(data => this.orderDevicePrice = data);
    this.subscriber = this._deviceDataService.sharedTotalpay$.subscribe(data => this.orderTotalPay = data);
    this.subscriber = this._deviceDataService.sharedNumberReservationId$.subscribe(data => this.reservationId = data);
    this.subscriber = this._deviceDataService.basePlanMoon$.subscribe(basePlan => {
      this.orderBasePlanMoon = (basePlan === null) ? null : basePlan;
    });
    this.subscriber = this._deviceDataService.selectedAddonPassDetails$.subscribe(addOn => {
      this.orderAddOnPassMoon = (addOn === null) ? null : addOn;
    });
    this.subscriber = this._deviceDataService.sharedMoonSelectedProductDetails$.subscribe(data => {
      this.selectedDeviceInfoForMoon = (data === null) ? null : data;
    });
    this.subscriber = this._deviceDataService.disableAddToCart$.subscribe(data => {
      this.disableCartButton = data;
    });
    this.subscriber = this._deviceDataService.sharedStockInfoToCart$.subscribe(data => {
      this.inStock = data;
    });
    // this._deviceDataService.outOfStock$.subscribe(data => {
    //   const stock = data;
    //   if (stock && stock.status === 'In Stock') {
    //     this.inStock = true;
    //   } else {
    //     this.inStock = false;
    //   }
    // });
    this._route.parent.data.subscribe(data => {
      if (data['parent']) {
        this.isInsideContainer = true;
      }
    });
    this.subscriber = this._deviceDataService.addtoCartTriggered$.subscribe(() => {
      this.AddItemToCart();
    });
  }

  setStickyTab(step: any) {
    if (step === 0) {
      this.step = this.step + 1;
    } else {
      this.step = step;
    }
    this.onStickyTabClick(this.step);
  }

  onStickyTabClick(tab: any) {
    console.log("onStickyTabClick " + tab);
    if (tab === 1) {
      this.isStep3Active = false;
      this.isStep4Active = false;
      this.isStep1Active = true;
      this.isStep2Active = false;
    } else if (tab === 3) {
      this.isStep3Active = true;
      this.isStep4Active = false;
      this.isStep1Active = false;
      this.isStep2Active = false;
    } else if (tab === 2) {
      this.isStep2Active = true;
      this.isStep3Active = false;
      this.isStep4Active = false;
      this.isStep1Active = false;
    } else if (tab === 4) {
      this.isStep4Active = true;
      this.isStep1Active = false;
      this.isStep2Active = false;
      this.isStep3Active = false;
    }

    if (typeof document !== 'undefined' && typeof navigator !== 'undefined') {
      const aLink = document.querySelector("#section_" + tab);
      // const topPos = this._broadbandService.getPos(tab); // topPos => to ge the position of element.
      if (tab === 1 && aLink) {
        this._broadbandService.scrollToTop();
      } else if (aLink) {
        // For chrome, IE and Firefox use scrollTo().
        if (typeof window !== 'undefined') {
          // ? Reductant, not using auto scroll anymore
          // ? Remove all codes related to sticky summary
          // ? during code refactoring
          // this.scrollToSection(tab);
        }
      }
    }
  }
  public addToCartButtonDisable(): boolean {
    if (this.confirmPlanSelection() || this.confirmPlanWithDeviceSelection()) {
      this.disableAddTocart = false;
    } else {
      this.disableAddTocart = true;
    }
    // this._plansService.updateAddtocartButton(!this.disableAddTocart);
    return this.disableAddTocart;
  }
  confirmPlanSelection(): boolean {
    let returnPlan = false;
    let MNPEligible = false;
    try {
      MNPEligible = this.mnpCheckPlanPurchase.isEligible;
      if(MNPEligible) {
        this.disableCartButton = false;
      }
    } catch (_error) {}
    if (this.orderBasePlanMoon && !this.itemInCart && !this.clickedButton && !this.disableCartButton &&
      this.orderNumberType && this.orderPhoneNo && this.inStock) {
      returnPlan = true;
    }
    return returnPlan;
  }
  confirmPlanWithDeviceSelection(): boolean {
    let returnPlanWDevice = false;
    if (this.selectedDeviceInfoForMoon && this.selectedDeviceInfoForMoon.name && this.orderSummaryColor &&
      this.orderBasePlanMoon && this.orderNumberType && this.orderPhoneNo && !this.itemInCart &&
      !this.clickedButton && !this.disableCartButton && this.inStock) {
      returnPlanWDevice = true;
    }
    return returnPlanWDevice;
  }
  scrollToSection(id) {
    const element = document.getElementById("section_" + id);
    let offset = 105;
    if (id === 4) {
      offset = 185;
    }
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element ? element.getBoundingClientRect().top : 0;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  public AddItemToCart() {
    this.callStickyAddToCart();
  }
  callStickyAddToCart() {
    this._stickySummary.orderPhoneNo = this.orderPhoneNo;
    this._stickySummary.orderSummaryColor = this.orderSummaryColor;
    this._stickySummary.orderDevicePrice = this.orderTotalPay;
    this._stickySummary.orderSummaryStorage = this.orderSummaryStorage;
    this._stickySummary.orderPlan = this.orderBasePlanMoon.sku;
    this._stickySummary.orderNumberType = this.orderNumberType;
    this._stickySummary.isMoon = true;
    this._stickySummary.moonMnpCheckPlanPurchase = this.mnpCheckPlanPurchase;
    this._stickySummary.selectedPlanDetails = {
      lower_age_limit: this.moonPlanDeviceDetailsData.lower_age_limit,
      upper_age_limit: this.moonPlanDeviceDetailsData.upper_age_limit,
      selectedPlanDetails: { is_xpax: true }
    };
    this._stickySummary.isNumberReservedMagento(
      "device_plan",
      {
        bundleSku: this.orderBasePlanMoon.bundleSku,
        deviceSku: (this.selectedDeviceInfoForMoon !== null) ? this.selectedDeviceInfoForMoon.sku : null,
      },
      {
        basePlan: (this.orderBasePlanMoon !== null) ? this.orderBasePlanMoon.sku : null,
        addOnPass: (this.orderAddOnPassMoon !== null) ? this.orderAddOnPassMoon.sku : null,
      },
      this.orderTotalPay,
      this.selectedProdForEdit
    );
  }
  disableChooseWay() {
    this._stickySummary.disableChooseWay();
  }
}
