import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { BbDeviceDetailsService } from "./bb-device-details.service";
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription ,  Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BroadbandService } from '../../../Service/broadband.service';
import { BaseComponent } from '../../../base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../Service/user.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { PlansService } from '../../../Service/plans.service';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';

@Component({
  selector: 'app-bb-device-details',
  templateUrl: './bb-device-details.component.html',
  styleUrls: ['./bb-device-details.component.css'],
  providers: [BbDeviceDetailsService, BroadbandService, UserService],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        display: 'block',
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        display: 'none',
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('100ms ease-in-out')),
      transition('out => in', animate('100ms ease-in-out'))
    ]),
  ]
})
export class BbDeviceDetailsComponent extends BaseComponent implements OnInit, AfterViewInit {
  bbSelectedDevice: any = null;
  bbDeviceDetailsData: any = null;
  bbBundleProductseDetails: any = null;
  bbPlanProductseDetails: any = null;
  bbBundleBasicDetails: any = null;
  isInitializeSlider = false;
  isInitializeMoreDetails = 'out';
  selectedColor: any = null;
  loadStockCheck = false;
  is_icon_active = false;
  sliderImageList: any = [];
  devicePrice: number;
  subscriber: Subscription;
  loading = true;
  showErrorToaster = false;
  isCSAgentDealer = false;
  errorToasterData = {};
  monthlyPay: number;
  isInitializeDetailBannerLeft = false;
  dataForDetailBannerTextLeft: any;
  BbDeviceDetailsResponse = null;
  DealerPopupType: any = "";
  IsDisplayDealerPopup = false;
  errorDealer;
  errorRedirect;
  dealerMessage;

  constructor(private _bbDeviceDetailsService: BbDeviceDetailsService,
    private _deviceDataService: DeviceDataService,
    private _broadbandService: BroadbandService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _plansService: PlansService,
    private _globalErrorHandler: GlobalErrorHandler,
  ) {
    super();
  }

  ngOnInit() {
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }
    try {
      this.callGetDeviceDetails();
      this._broadbandService.onScroll();
    } catch (err) {

    }
  }
  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }
  callGetDeviceDetails() {
    let bbDeviceId;
    this.subscriber = this._deviceDataService.sharedDevicePrice$.subscribe(
      data => {
        setTimeout(function () {
        this.devicePrice = data;
        }, 0);
      });
      this.subscriber = this._deviceDataService.sharedMonthlyPay$.subscribe(data => {
        if (data !== undefined) {
          setTimeout(() => {
            this.monthlyPay = JSON.parse(JSON.stringify(data));
          }, 0);
        }
      });
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => {
      this.showErrorToaster = data;
      this.errorDealer = data;
      if(data === false && this.errorRedirect === true) this._router.navigate(["/store/devices"]);
    });

    this._activatedRoute.params.subscribe(params => bbDeviceId = params["bbDeviceId"]);
    this.getDeviceDetails(bbDeviceId, false);
  }
  public getDeviceDetails(bbDeviceSku: any, mock: boolean) {
    localStorage.setItem("BroadbandSKU",bbDeviceSku);
    let bbDeviceDetailsApiUrl = "/rest/V1/broadband-device-details/" + bbDeviceSku;
    if (this._userService.isCSAgent() && !this._userService.isDealer()) {
       bbDeviceDetailsApiUrl = bbDeviceDetailsApiUrl + "?agenttype=agent";
    } else if (!this._userService.isCSAgent() && this._userService.isDealer()) {
       bbDeviceDetailsApiUrl = bbDeviceDetailsApiUrl + "?agenttype=dealer";
    }
    this._bbDeviceDetailsService.Find(bbDeviceDetailsApiUrl).subscribe(
      (res: any) => {
        if(res[0].status === false) {
          this._deviceDataService.publishPageNotFound(true);
          this.errorDealer = true;
          this.errorRedirect = true;
          this.dealerMessage = {
            title: 'Uh Oh!',
            content: res[0].message ? res[0].message : this.errorConst.SYS_DOWN_MSG,
            button: 'Got it!',
          };
          return;
        }
        if (res && res[0] && res[0].status === false && sessionStorage && (!res[0].code || res[0].code != "404")
          && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
          const eligibilityInfo = {
            displayType: 'INVALID_DEALER_URL',
            isEligibleByAge: false,
            type: 'xpax'
          };
          this._globalErrorHandler.errorObjectConvert(eligibilityInfo.displayType);
          this.DealerPopupType = JSON.parse(JSON.stringify(eligibilityInfo));
          this.IsDisplayDealerPopup = true;
        } else if (res && res[0] && res[0].status === false && res[0].code && res[0].code == 404) {
          this.errorBlock();
       } else {
          this.loading = false;
          this.BbDeviceDetailsResponse = (!mock) ? res[0] : this._bbDeviceDetailsService.mockBbDeviceDetailsResponse;
          this.loadBbDeviceDetails(this.BbDeviceDetailsResponse);
          this._plansService.selectDeviceBundle(this.BbDeviceDetailsResponse);
          this._plansService.selectDeviceBundleType(null);
          this._estoreAnalyticsService.SetProductDetails(this.BbDeviceDetailsResponse, this._renderer);
        }
      },
      err => {
        this.errorBlock();
      });
  }

  public errorBlock() {
    this.loading = false;
    this.showErrorToaster = true;
    this.errorToasterData = {
      content: this.errorConst.SYS_DOWN_MSG
    };
    this.isInitializeDetailBannerLeft = true;
    this.dataForDetailBannerTextLeft = { "Name": "Device not found", "Api": this.API_URL_CONST.PAGE_NOT_FOUND_URL };
    this._deviceDataService.publishPageNotFound(true);
  }
  loadBbDeviceDetails(bbDevDetails) {
    this.bbDeviceDetailsData = bbDevDetails;
    this.bbPlanProductseDetails = bbDevDetails.plan_product_details;
    this.sliderImageList = this.bbBundleBasicDetails = bbDevDetails;
    this.displayImageSlider();
    this.loadSelectedDevice();
  }

  displayImageSlider() {
    const that = this;
    setTimeout(function () {
      that.isInitializeSlider = false;
    }, 0);
    setTimeout(function () {
      that.isInitializeSlider = true;
    }, 0);
  }

  loadSelectedDevice() {
    if (this.bbSelectedDevice === null) {
      this.bbSelectedDevice = {};
      this.bbSelectedDevice.color = this.bbBundleBasicDetails.default_selected_color;
      this.bbSelectedDevice.planName = this.bbBundleBasicDetails.default_plan;
      this.bbSelectedDevice.planSku = this.bbBundleBasicDetails.default_plan_sku;
      this.bbSelectedDevice.planMothlyPay = this.bbBundleBasicDetails.order_monthly_pay;
      this.bbDeviceDetailsData.device_product_details.forEach(elements => {
        if (elements.color === this.bbSelectedDevice.color) {
          this.bbBundleBasicDetails.price = elements.rrp;
          this._plansService.selectDevice(elements);
        }
      });
    }
  }

  // Below methodes called on html events.
  moreDetailsClick() {
    const that = this;
    if (typeof navigator !== 'undefined' && that.isInitializeMoreDetails === 'out') {
      const anchorMoreDetails = document.getElementById("moreDetailsBB");
      if (anchorMoreDetails != null) {
        const topPosition = anchorMoreDetails.offsetTop + anchorMoreDetails.offsetHeight;
       // For chrome, IE and Firefox use scrollTo().
       if (typeof window !== 'undefined') {
            window.scrollTo(0, topPosition);
          }
      }
    }
    this.is_icon_active = !this.is_icon_active;
    setTimeout(function () {
      that.isInitializeMoreDetails = that.isInitializeMoreDetails === 'out' ? 'in' : 'out';
    }, 0);
  }
  onSelectedColor(color: string) {
    const that = this;
    setTimeout(function () {
      that.loadStockCheck = false;
    }, 0);
    setTimeout(function () {
      that.loadStockCheck = true;
    }, 0);
    this._deviceDataService.publishColor(color);
    this._deviceDataService.publishColorStorageChange(true);
    this.selectedColor = color;
    this.sliderImageList.length = 0;
    this.sliderImageList = this.bindImageSlider(color);
    this.displayImageSlider();
  }
  bindImageSlider(selectedColor) {
    return this.bbDeviceDetailsData.device_product_details.filter((item: any) => {
      return (item.color === selectedColor);
    });
  }
  OnContinueDealerCheck(data: any) {
    if (typeof window !== "undefined") {
      this.IsDisplayDealerPopup = false;
      if (this._userService.isDealer()) {
        window.location.href = "/store/devices";
      } else if (this._userService.isCSAgent()) {
        window.location.href = "/store/agentlandingpage";
      }
    }
  }
}
