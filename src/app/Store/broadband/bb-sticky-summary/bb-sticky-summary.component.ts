import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { BaseComponent } from '../../../base.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { CartService } from '../../../Service/cart.service';
import { UserService } from '../../../Service/user.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import { BundleService } from '../../../Service/bundle.service';
import { AppService } from '../../../Service/app.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { BroadbandService } from '../../../Service/broadband.service';
import { BbDeviceDetailsService } from '../../../Store/broadband/bb-device-details/bb-device-details.service';
import { SYS_DOWN_MSG } from '../../../../constants/error.constants';
import { PlansService } from '../../../Service/plans.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bb-sticky-summary',
  templateUrl: './bb-sticky-summary.component.html',
  styleUrls: ['./bb-sticky-summary.component.css'],
  providers: [CartService, BundleService, BroadbandService, BbDeviceDetailsService, AppService, UserService],
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
export class BbStickySummaryComponent extends BaseComponent implements OnInit {
  @Input() deviceDetailsData: any;
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
  hwValidatedId = null;
  public reservationId = "";
  public orderPlanName: string;
  public sharedContract: string;
  public orderNumberType: string;
  public orderPhoneNo: string;
  public orderSummaryColor: string;
  public orderTotalPay: number;
  public orderDevicePrice: number;
  public inStock: boolean;
  private subscriber: Subscription;
  public errorToasterData = {};
  public homeWirelessData: any;
  public outletId: string = environment.outletId;
  isCSAgent = false;
  isCustomer = false;
  public isPopUpBlacklist = false;
  public infoBlacklisted;
  public disableAddToCartButtonBlacklisted = false;

  // Start of static data.. To be removed once API is ready
  orderDeviceName = 'Home Wireless';
  public isGoldenNumberSelected = false;
  // End of static data
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
    private _commonUtilService: CommonUtilService,
    private _broadbandService: BroadbandService,
    private _bbDeviceDetailsService: BbDeviceDetailsService,
    private _plansService: PlansService,
    private _route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit() {
    this.isCSAgent = this.userService.isCSAgent();
    this.isCustomer = this.userService.isCustomer();
    this._broadbandService.scrollToTop();
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => this.showErrorToaster = data);
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.isPopUpBlacklist = data));
    this.subscriber = this._deviceDataService.sharedPlanNameBroadband$.subscribe(data => this.orderPlanName = data);
    this.subscriber = this._deviceDataService.sharedBbPlanDetails$.subscribe(data => this.selectedPlanDetails = data);
    this.subscriber = this._deviceDataService.updateStep$.subscribe(data => this.setStep(data));
    this.subscriber = this._deviceDataService.sharedBroadbandContract$.subscribe(data => this.sharedContract = data);
    this.subscriber = this._deviceDataService.sharedColor$.subscribe(data => this.orderSummaryColor = data);
    this.subscriber = this._deviceDataService.sharedPhoneNo$.subscribe(data => this.orderPhoneNo = data);
    this.subscriber = this._deviceDataService.sharedNumberType$.subscribe(data => this.orderNumberType = data);
    this.subscriber = this._deviceDataService.sharedDevicePrice$.subscribe(data => this.orderDevicePrice = data);
    this.subscriber = this._deviceDataService.sharedTotalpay$.subscribe(data => this.orderTotalPay = data);
    this.subscriber = this._deviceDataService.sharedNumberReservationId$.subscribe(data => this.reservationId = data);
    this.subscriber = this._deviceDataService.sharedHwValidatedId$.subscribe(data => this.hwValidatedId = data);
    // Get validated id if we wont get from shared hw validated id.
    if (sessionStorage && sessionStorage.getItem('hw_validated_id')) {
      this.hwValidatedId = JSON.parse(sessionStorage.getItem('hw_validated_id'));
    }
    this.subscriber = this._deviceDataService.disableAddToCart$.subscribe(data => {
        this.disableCartButton = data;
      });
    this._deviceDataService.outOfStock$.subscribe(data => {
      const stock = data;
      if (stock && stock.status === 'In Stock') {
        this.inStock = true;
      } else {
        this.inStock = false;
      }
    });

    if (localStorage && localStorage.getItem("homeWirelessEditData")) {
      this.homeWirelessData = JSON.parse(localStorage.getItem("homeWirelessEditData"));
    }
    this.subscriber = this._deviceDataService.sharedGoldenNumber$.subscribe(data => {
      this.isGoldenNumberSelected = data;
    });
    this._route.parent.data.subscribe(data => {
      if (data['parent']) {
        this.isInsideContainer = true;
      }
    });
    this.subscriber = this._deviceDataService.addtoCartTriggered$.subscribe(() => {
      this.clickedAddToCart();
    });
  }

  setStep(step: any) {
    if (step === 0) {
      this.step = this.step + 1;
    } else {
      this.step = step;
    }
    this.onAnchorClick(this.step);
  }

  onAnchorClick(val: any) {
    if (val === 1) {
      this.isStep3Active = false;
      this.isStep4Active = false;
      this.isStep1Active = true;
      this.isStep2Active = false;
    } else if (val === 3) {
      this.isStep3Active = true;
      this.isStep4Active = false;
      this.isStep1Active = false;
      this.isStep2Active = false;
    } else if (val === 2) {
      this.isStep2Active = true;
      this.isStep3Active = false;
      this.isStep4Active = false;
      this.isStep1Active = false;
    } else if (val === 4) {
      this.isStep4Active = true;
      this.isStep1Active = false;
      this.isStep2Active = false;
      this.isStep3Active = false;
    }

    if (typeof document !== 'undefined' && typeof navigator !== 'undefined') {
      const aLink = document.querySelector("#step" + val);
      const topPos = this._broadbandService.getPos(val); // topPos => to ge the position of element.
      if (val === 1 && aLink) {
        this._broadbandService.scrollToTop();
      } else if (aLink) {
        // For chrome, IE and Firefox use scrollTo().
        if (typeof window !== 'undefined') {
          window.scrollTo(0, topPos);
        }
      }
    }
  }
  public addToCartButtonDisable(): boolean {
    if (this.orderDeviceName && this.orderSummaryColor && this.orderPlanName && this.orderNumberType && this.orderPhoneNo &&
      !this.itemInCart && !this.clickedButton && !this.disableCartButton && this.inStock) {
      this.disableAddTocart = false;
    } else {
      this.disableAddTocart = true;
    }
    // this._plansService.updateAddtocartButton(!this.disableAddTocart);
    return this.disableAddTocart;
  }

  public clickedAddToCart() {
    this.clickedButton = true;
    // Check for already logged in user
    if (typeof window !== 'undefined' && localStorage && sessionStorage &&
      sessionStorage.getItem("UserToken")) {
      this.persistingCartDetails();
    } else {
      this._router.navigateByUrl('/store/login');
    }
  }

  persistingCartDetails() {
    if (typeof window !== 'undefined') {
      const apiUrl = ApiConstant.CARTMINE_API;
      this.CallCartMineApi(apiUrl);
    }
  }
  private CallCartMineApi(url: string) {
    // this.cartService.Find(url.trim()).subscribe(
    //   (response: any) => {
    //     this.addToCartOptions(response);
    //   }, error => {
    //     this.errorBlock();
    //   });
      this.addToCartOptions(null);
    }
 public addToCartOptions(cartData) {
    // Already item in cart.
    // if (cartData && cartData[0] && cartData[0].all_items && cartData[0].all_items.length > 0) {
    //   this.itemInCart = true;
    //   this.handleItemInCart(cartData[0].all_items[0]);
    // } else { // No item in the cart.
      this.addToCart();
    // }
  }
  public handleItemInCart(cartData) {
    let addToCartType = "newItem";
    if (this.homeWirelessData && this.homeWirelessData.selectionType) {
      addToCartType = this.homeWirelessData.selectionType;
    }
    switch (addToCartType) {
      case "edit":
        this.removeItemFromCart(cartData);
        break;
      case "newItem":
        this.infoBlock();
        break;
    }
  }
  public removeItemFromCart(cartData) {
    const url = "/rest/V1/deletecart/";
    const requestBody = {
      "data": {
        "user": "user",
        "item_id": cartData.item_id,
        "cart_item_sku": cartData.sku_bundle,
        "is_preorder": false
      }
    };
    this.appService.postEstoreUserData(url, requestBody).subscribe(
      (response: any) => {
        // Remove local storage data once item deleted from cart.
        if (localStorage && localStorage.getItem("homeWirelessData")) {
          localStorage.removeItem("homeWirelessData");
        }
        // Add new Item To cart.
        this.addToCart();
      },
    (error: any) => {
      this.errorBlock();
    });
  }
  public addToCart() {
    if (this.deviceDetailsData) {
      this.deviceDetailsData.device_product_details.forEach(eachItem => {
        if (eachItem.color === this.orderSummaryColor) {
          this.selectedProductDetails = eachItem;
        }
      });

      const requestBody = {
        "data": {
          "bundle_product_sku": this.deviceDetailsData.sku,
          "device_product_sku": this.selectedProductDetails.sku,
          "plan_product_sku": this.selectedPlanDetails.sku,
          "selected_number": this.orderPhoneNo,
          "selected_number_type": this.orderNumberType,
          "reservation_id": this.reservationId,
          "validated_id": this.hwValidatedId,
          "is_golden_number": this.isGoldenNumberSelected
        }
      };

      this.bundleService.BundleOrder(requestBody).subscribe(
        (response: any) => {
          if(response[0].blacklist === true) {
            this.isPopUpBlacklist = true;
            this.infoBlacklisted = {
              title: 'Uh Oh!',
              content: response[0].message ? response[0].message : SYS_DOWN_MSG,
              button: 'Got it!',
            };
            this.disableAddTocart = true;
            this._plansService.updateAddtocartError(true);
            return;
          }
          if (response && response[0] && response[0].status === true) {
            // Remove local storage data once item deleted from cart.
            if (localStorage && localStorage.getItem("homeWirelessData")) {
              localStorage.removeItem("homeWirelessData");
            }
            if(this.userService.isGuest() && !this.userService.didSummary()) {
              this._router.navigateByUrl('/store/checkout/personal-details');
            } else {
              this._router.navigateByUrl('/store/checkout/summary');
            }
            this._estoreAnalyticsService.onClickAddToCart(this._renderer);
          }
        }, error => {
          this.errorBlock();
        });
    }
  }

  public errorBlock() {
    this.showErrorToaster = true;
    this.errorToasterData = {
      content: this.errorConst.SYS_DOWN_MSG
    };
  }
  public infoBlock() {
    this.showErrorToaster = true;
    this.errorToasterData = {
      content: this.formConst.ITEM_ALREADY_IN_CART,
      color: '7D7D7D'
    };
  }

  RoundingOff(value) {
    return this._commonUtilService.RoundingOff2String(value);
  }

  CloseBlacklistPopUp = () => this.isPopUpBlacklist = false;
}

