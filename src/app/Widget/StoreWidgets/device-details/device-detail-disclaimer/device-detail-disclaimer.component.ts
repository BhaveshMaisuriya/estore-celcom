import { Component, Input, OnInit, Renderer2 } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
// import { DeviceDetailsStorageService } from "./device-details-color-storage.service";
// import { AppWidgetComponent } from '../../../../Model/app.widget.component';
import { BaseComponent } from '../../../../base.component';
import { ContentNavigation } from '../../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../../Service/redirection.service';
import { Output, EventEmitter } from '@angular/core';
import { DeviceDataService } from '../../../../Service/devicedata.service';
import { CommonUtilService } from '../../../../Service/commonUtil.service';
import { DeviceDisclaimerService } from './device-detail-disclaimer.service';
import { Subscription } from 'rxjs';
import { AppService } from '../../../../Service/app.service';
import { BundleService } from '../../../../Service/bundle.service';
import { CartService } from '../../../../Service/cart.service';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { EStoreAnalysticsService } from '../../../../Service/store.analytic.service';
import { ProductService } from '../../../../Service/product.service';
import { GetParametersService } from '../../../../Service/getParamaters.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { iOmniCampaign } from 'app/shared/models/plan.model';

@Component({
  selector: 'app-device-detail-disclaimer',
  templateUrl: './device-detail-disclaimer.component.html',
  styleUrls: ['./device-detail-disclaimer.component.css'],
  providers: [RedirectionService, DeviceDisclaimerService, AppService, BundleService]
})
export class DeviceDisclaimerComponent extends BaseComponent implements OnInit {
  @Input() data: any;
  @Input() orderDetails: any;
  @Input() selectedProductDetails: any;
  @Output() ItemInCart = new EventEmitter();

  public DeviceDisclaimerResponse = null;
  public errorAddToCart = false;
  public userType: any;
  public requestBody: any;
  public disclaimer_Modal: any;
  private isPreOrder = false;
  public isEasyPhone = false;
  public easyPhoneType = "";
  public errorData: any;
  public validated_id: any;
  public isMnp = false;
  public isMviva = false;
  public isPrepaid = false;
  outletId: string = environment.outletId;
  public randomPhoneNo: any = null;
  addonCode = null;
  public isPlanURL = false;
  public IsGoldenNumberSelected = false;
  private subscriber: Subscription;
  contractExtended = false;
  contract_period;
  campaignOmni: iOmniCampaign;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _devicedata: DeviceDataService,
    private _devicedisclaimerService: DeviceDisclaimerService,
    private appService: AppService,
    private bundleService: BundleService,
    private cartService: CartService,
    private _deviceDataService: DeviceDataService,
    private _commonUtilService: CommonUtilService,
    private cookieService: CookieService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _productService: ProductService,
    private _getParamsService: GetParametersService,
    private _planQuery: PlansQuery,
  ) {
    super();
    this.disclaimer_Modal = {
      'visibility': 'hidden'
    };
    this._planQuery.select(state => state.easyphone_selected_contract_period).subscribe(data => {
      this.contract_period = data;
    });
    
    this._planQuery.isEasyPhone$.subscribe(data =>{
      this.isEasyPhone = data;
    });

    this._planQuery.isEasyPhoneOwn$.subscribe(data => {
      if (data) {
        this.easyPhoneType = "Own";
      }
    });

    this._planQuery.isEasyPhoneRent$.subscribe(isEasyPhoneRent => {
      if (isEasyPhoneRent) {
        this.easyPhoneType = "Rent";
      }
    });

    this._planQuery.isDeviceBundle$.subscribe(data => {
      if (data) {
        /* this.easyPhoneType = "";
        this.isEasyPhone = false; */
        this.isDeviceBundleAndDeviceOnly();
      }
    });

    this._planQuery.isDeviceOnly$.subscribe(isDeviceOnly => {
      if (isDeviceOnly) {
        /* this.easyPhoneType = "";
        this.isEasyPhone = false; */
       this.isDeviceBundleAndDeviceOnly();
      }
    });
  }

  ngOnInit() {
    this.Init();
  }

  Init() {
    const apiUrl = this.data;
    this._devicedisclaimerService.Find(apiUrl).subscribe(
      (response) => {
        this.DeviceDisclaimerResponse = response;
      });
    // Uncomment below code show the COBP disclaimer popup.
    // this.disclaimer_Modal = {
    //   'visibility': 'visible'
    // };
    this.subscriber = this._deviceDataService.sharedContractExtended$.subscribe(data => {
      if (data === "true") {
        this.contractExtended = true;
      } else {
      this.contractExtended = false;
      }
    }) ;
    // Getting addon code from localstorage.
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage && localStorage.getItem("addonCode")) {
        this.addonCode = localStorage.getItem("addonCode");
      }
    }
    if (typeof window !== 'undefined') {
      if (window.location.href.indexOf("/plans/") > -1) {
        this.isPlanURL = true;
      } else {
        this.isPlanURL = false;
      }
    }
    this.subscriber = this._deviceDataService.sharedGoldenNumber$.subscribe(data => {
      this.IsGoldenNumberSelected = data;
    });
    this.subscriber = this._planQuery.select(state => state.omni_campaign).subscribe(data => this.campaignOmni = data);
    // Remove this code when you want to show COBP disclaimer popup.
    this.ContinueBox();
  }

  RoundingOff(value: number): number {
    return this._commonUtilService.RoundingOff2Number(value);
  }

  public ContinueBox() {
    // Uncomment below code hide the COBP disclaimer popup on uncommenting code below 90.
    // // this.disclaimer_Modal = {
    //   'visibility': 'hidden'
    // };
    this._devicedata.setDisclaimerViewed(true);

    if (typeof window !== 'undefined') {
      if (localStorage && localStorage.getItem('orderDetails')) {
        this.orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
      }
      if (localStorage && localStorage.getItem('selectedProductDetails')) {
        this.selectedProductDetails = JSON.parse(localStorage.getItem('selectedProductDetails'));
      }
      if (sessionStorage && sessionStorage.getItem("typeofuser") && sessionStorage.getItem("typeofuser") === "Prepaid") {
        this.isPrepaid = true;
      }
    }

    this.requestBody = {};
    const totalToSend = this.RoundingOff(this.selectedProductDetails.total);
    const orderDevicePriceSendTo = this.RoundingOff(this.selectedProductDetails.orderDevicePrice);
    if (sessionStorage && sessionStorage.getItem("USER_TYPE") && !sessionStorage.getItem("UserToken")) {
      // For guest
      this.userType = "guest";
    } else {
      // For mobile connect
      this.userType = "user";
    }
    if (localStorage && localStorage.getItem("MNP-FLOW") === 'YES') {
      this.isMnp = true;
    }
    if (localStorage && localStorage.getItem("isPreOrder")) {
      this.isPreOrder = JSON.parse(localStorage.getItem("isPreOrder"));
    }
    // Assign easyphone
     // if (localStorage && localStorage.getItem("isEasyPhone")) {
     // this.isEasyPhone = JSON.parse(localStorage.getItem("isEasyPhone"));
    //}
    if (localStorage && localStorage.getItem('validated_id')) {
      this.validated_id = JSON.parse(localStorage.getItem('validated_id'));
    }
    if (localStorage && localStorage.getItem("isRentClicked")) {
      const isRentClicked = JSON.parse(localStorage.getItem("isRentClicked"));
      if (isRentClicked) {
        this.easyPhoneType = "Rent";
      }
    }
    // if (localStorage && localStorage.getItem("isOwnClicked")) {
    //   const isOwnClicked = JSON.parse(localStorage.getItem("isOwnClicked"));
    //   if (isOwnClicked) {
    //     this.easyPhoneType = "Own";
    //   }
    // }
    // if (localStorage && localStorage.getItem("isBundleClicked")) {
    //   const isBundleClicked = JSON.parse(localStorage.getItem("isBundleClicked"));
    //   if (isBundleClicked) {
    //     this.easyPhoneType = "";
    //     this.isEasyPhone = false;
    //   }
    // }

    if (localStorage && localStorage.getItem("isMviva")) {
      this.isMviva = JSON.parse(localStorage.getItem("isMviva"));
    }
    if (this.selectedProductDetails.orderDevice && this.selectedProductDetails.orderPlanName &&
      (this.isPlanURL === false || this.selectedProductDetails.orderMoon === true || this.selectedProductDetails.orderStar === true)) {
      if (sessionStorage && sessionStorage.getItem("RandomPhoneNo")) {
        this.randomPhoneNo = sessionStorage.getItem("RandomPhoneNo");
      }

      if (this.easyPhoneType === "Rent") {
        if (localStorage && localStorage.getItem("rentMonthlyPay")) {
          this.selectedProductDetails.orderOneTimePay = Number(JSON.parse(localStorage.getItem("rentMonthlyPay")));
        }
      }
      if (this.easyPhoneType === "Own") {
        if (localStorage && localStorage.getItem("ownMonthlyPay")) {
          this.selectedProductDetails.orderOneTimePay = Number(JSON.parse(localStorage.getItem("ownMonthlyPay")));
        }
      }
      let campaign_url = "";
      let promoId = "";
      if (this.isMviva) {
        if (window.location.href.indexOf("?promotiondetails=") > -1) {
         // campaign_url = window.location.href;
          promoId = this._getParamsService.getParameterByName('promotiondetails');
          campaign_url = window.location.href.split('?')[0] + "?promotiondetails=" + promoId;
        }
      }
// Generate Request

      this.requestBody = {
        "data": {
          "selected_device_product_sku": this.selectedProductDetails.selectedProductSku,
          "bundle_product_sku": this.selectedProductDetails.orderDevice,
          "selected_plan_product_sku": (this.selectedProductDetails.orderPlan !== undefined) ?
           this.selectedProductDetails.orderPlan : this.selectedProductDetails.selectedPlanDetails.sku,
          "selected_device_product_up_fornt_price": this.selectedProductDetails.orderOneTimePay,
          "selected_pass_product_sku": this.selectedProductDetails.orderAddOnpass,
          "sub_pass_sku": this.selectedProductDetails.orderSubpass,
          "selected_device_product_device_price": orderDevicePriceSendTo,
          "user": this.userType,
          "bundle_product_price": totalToSend,
          "bundle_product_qty": "1",
          "selected_number": this.selectedProductDetails.orderPhoneNo,
          "temporary_number": this.randomPhoneNo,
          "selected_number_type": this.selectedProductDetails.orderNumberType,
          "is_cobp": true,
          "contract_extend" : this.contractExtended,
          "is_prepaid": this.isPrepaid,
          "is_mnp": this.isMnp,
          "is_preorder": this.isPreOrder,
          "is_easyphone": this.isEasyPhone,
         "easyphone_type": this.easyPhoneType,
         "validated_id": this.validated_id,
         "is_campaign_mviva": this.isMviva,
         "campaign_mviva_url": campaign_url,
         "is_affiliate_ia" : false,
         "add_on_ids": this.addonCode, // lifestyle addon Id.
         "is_affiliate_ada" : false,
         "is_golden_number": this.IsGoldenNumberSelected,
         "contract_period": this.isEasyPhone ? this.contract_period : undefined,
        },
        // Added for the Resevation of SKU device + plan
        "stockReserveQuantityInput": this._productService.getStockAvailabilityRequest(
          this.selectedProductDetails,
          this.outletId,
          "IT000016"
        ),
      };
    } else if ((this.selectedProductDetails.orderDevice && !this.selectedProductDetails.orderPlanName) && this.isPlanURL === false ) {
      this.requestBody = {
        "data": {
          "bundle_product_sku": this.selectedProductDetails.orderDevice,
          "selected_device_product_sku": this.selectedProductDetails.selectedProductSku,
          "selected_plan_product_sku": "null",
          "selected_device_product_up_fornt_price": "0",
          "selected_device_product_device_price": totalToSend,
          "device_product_qty": "1",
          "is_affiliate_ia" : false,
          "is_affiliate_ada" : false,
          "device_product_price": totalToSend,
          "is_cobp": false,
          "contract_extend" : this.contractExtended,
          "is_preorder": this.isPreOrder,
          "is_mnp": this.isMnp,
          "user": this.userType
        },
        // Added for the Resevation of SKU device + plan
        "stockReserveQuantityInput": {
          "stockReserveQuantityInput": {
            "storeId": this.outletId,
            // set reservation id
            "reservationId": "IT000016",
            "listOfItemDetailRequest": {
              "itemDetailRequest": [{
                // set quantity as 1
                "Quantity": "1",
                "ProductType": "HP",
                "PartNum": this.selectedProductDetails.orderReqPartNumber,
                "listOfAttributes": [{
                  "attributes": [
                    {
                      "Name": "BRAND",
                      "Value": this.selectedProductDetails.orderReqBrand.toUpperCase()
                    },
                    {
                      "Name": "PRODUCT",
                      "Value": "DEVICE"
                    },
                    {
                      "Name": "CATEGORY",
                      "Value": this.selectedProductDetails.orderReqCategory.toUpperCase()
                    },
                    {
                      "Name": "MODEL",
                      "Value": this.selectedProductDetails.orderReqModel.toUpperCase()
                    },
                    {
                      "Name": "COLOR",
                      "Value": this.selectedProductDetails.orderReqColor.toUpperCase()
                    }
                  ]
                }]
              }
              ]
            }
          }
        }
      };
    }
    this.requestBody = {
      ...this.requestBody,
      data: {
        ...this.requestBody?.data,
        is_campaign_omni: !!this.campaignOmni,
      }
    };
    if (this.cookieService.check('orderItem')) {
      if (this.requestBody && this.requestBody.data) {
      this.requestBody.data.is_affiliate_ia = true;
      }
    }
    if (this.cookieService.check('adaRemainingDays') && !this.isMviva) {
      if (this.requestBody && this.requestBody.data) {
        const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
        this.requestBody.data.is_affiliate_ada = adaRemainingDays.name;
        this.requestBody.data.is_affiliate_ia = false; // If ADA exists doing IA as false
      }
    }
    if (this.isMviva && localStorage && localStorage.getItem("mvivaBundleUpfront") &&
     JSON.parse(localStorage.getItem("mvivaBundleUpfront")) === true && this.requestBody && this.requestBody.data) {
      this.requestBody.data.selected_device_product_up_fornt_price = "0";
    }
    if (this.selectedProductDetails &&
       (this.isPlanURL === false || this.selectedProductDetails.orderMoon === true || this.selectedProductDetails.orderStar === true)) {
      // let orderDevicePriceSendTo = this.RoundingOff(this.selectedProductDetails.orderDevicePrice);
      // let totalToSend = this.RoundingOff(this.selectedProductDetails.total);
      this.bundleService.BundleOrder(this.requestBody).subscribe(
        (response: any) => {
          if (response[0].status === true) {
            this._router.navigateByUrl('/store/cart');
            this.AddToCartNotification();
            this.cartService.addProductToCart(this.orderDetails, 1, this.selectedProductDetails);
            this._estoreAnalyticsService.onClickAddToCart(this._renderer);  // Analytics to track add to cart
            if (localStorage && localStorage.getItem("validated_id")) {
              localStorage.removeItem("validated_id");
            }
          } else if (response[0].status === false && response[0].message === "There is already one item in cart.") {
            this.errorData = {};
            this.errorData.IsMnpFlowFromDevice = true;
            this.errorData.infoMNPflow = {};
            this.errorData.infoMNPflow.content = "Note: You can only add another " +
              "item after you have checked out with your existing items in the cart.";
            this.errorData.infoMNPflow.color = "7D7D7D";
            this.errorData.disableButton = true;
            this.ItemInCart.emit(this.errorData);
          }  else if (response[0].status === false && response[0].message) {
            this.errorData = {};
            this.errorData.IsMnpFlowFromDevice = true;
            this.errorData.infoMNPflow = {};
            this.errorData.infoMNPflow.content = response[0].message;
            this.errorData.disableButton = true;
            this.ItemInCart.emit(this.errorData);
          } else {
            this.AddToCartNotificationError();
          }

          if (localStorage && localStorage.getItem("isPreOrder")) {
            localStorage.removeItem("isPreOrder");
          }
            if (localStorage && localStorage.getItem("isEasyPhone")) {
            localStorage.removeItem("isEasyPhone");
          }
        });
    } else if (this.isPlanURL === true && !this.selectedProductDetails.orderMoon && !this.selectedProductDetails.orderStar) {
      if (sessionStorage && sessionStorage.getItem("USER_TYPE") && !sessionStorage.getItem("UserToken")) {
        this.userType = "guest";
      } else {
        this.userType = "user";
      }
      const stringType = "string";
      const firstDigit = '6';
      if (typeof(this.selectedProductDetails.orderPhoneNo) === stringType) {
        const phoneNo = this.selectedProductDetails.orderPhoneNo.charAt(0);
        if  (phoneNo === firstDigit) {
          this.selectedProductDetails.orderPhoneNo = this.selectedProductDetails.orderPhoneNo.substr(1);
        }
      } else {
        this.selectedProductDetails.orderPhoneNo = this.selectedProductDetails.orderPhoneNo.toString();
        const phoneNo = this.selectedProductDetails.orderPhoneNo.charAt(0);
        if  (phoneNo === firstDigit) {
          this.selectedProductDetails.orderPhoneNo = this.selectedProductDetails.orderPhoneNo.substr(1);
        }
      }
      let campaign_url = "";
      let promoId = "";
      if (this.isMviva) {
        if (window.location.href.indexOf("?promotiondetails=") > -1) {
        //  campaign_url = window.location.href;
          promoId = this._getParamsService.getParameterByName('promotiondetails');
          campaign_url = window.location.href.split('?')[0] + "?promotiondetails=" + promoId;
        }
      }
      this.requestBody = {
        "data": {
          "Sku": this.selectedProductDetails.orderPlan,
          "PlanName": this.selectedProductDetails.orderPlanName,
          "TotalPay": this.selectedProductDetails.orderTotalPay,
          "selected_number": this.selectedProductDetails.orderPhoneNo,
          "selected_number_type": this.selectedProductDetails.orderNumberType,
          "is_cobp": true,
          "is_prepaid": this.isPrepaid,
          "user": this.userType,
          "is_mnp": false,
          "mnp_id": null,
          "is_preorder": false,
          "add_on_ids": this.addonCode, // lifestyle addon Id.
          "is_campaign_mviva": this.isMviva,
          "campaign_mviva_url": campaign_url,
          "is_affiliate_ia" : false,
          "is_affiliate_ada" : false,
          "validated_id": this.validated_id,
          "is_golden_number": this.IsGoldenNumberSelected
        },
        "supp_data": []
      };
      if (this.cookieService.check('adaRemainingDays') && !this.isMviva) {
        if (this.requestBody && this.requestBody.data) {
          // check ada remaining days
          const adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
          this.requestBody.data.is_affiliate_ada = adaRemainingDays.name;
          // If ADA exists doing IA as false
          this.requestBody.data.is_affiliate_ia = false;
        }
      }
      if (this.cookieService.check('orderItem')) {
        // check order item for affiliate
        if (this.requestBody && this.requestBody.data) {
        this.requestBody.data.is_affiliate_ia = true;
        }
      }
      const url = "/rest/V1/planaddtocart";
      this.appService.postEstoreUserData(url, this.requestBody).subscribe(
      (response: any) => {
        if (response[0].status === true) {
          this._router.navigateByUrl("/store/cart");
          this.cartService.addProductToCart(this.orderDetails, 1, this.selectedProductDetails);
          this._estoreAnalyticsService.onClickAddToCart(this._renderer);
          this.AddToCartNotification();
        } else if (response[0].status === false && response[0].message === "There is already one item in cart.") {
          this.errorData = {};
          this.errorData.infoMNPflow = {};
          this.errorData.IsMnpFlowFromDevice = true;
          this.errorData.infoMNPflow.content =
           "Note: You can only add another item after you have checked out with your existing items in the cart.";
           this.errorData.disableButton = true;
          this.errorData.infoMNPflow.color = "7D7D7D";
          this.ItemInCart.emit(this.errorData);
        } else if (response[0].message && response[0].status === false) {
          this.errorData = {};
          this.errorData.infoMNPflow = {};
          this.errorData.IsMnpFlowFromDevice = true;
          this.errorData.disableButton = true;
          this.errorData.infoMNPflow.content = response[0].message;
          this.ItemInCart.emit(this.errorData);
        } else {
          // show error
          this.AddToCartNotificationError();
          this._router.navigateByUrl('/plans/' + this.selectedProductDetails.selectedProductSku );
        }
      });
    }
  }
  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  public AddToCartNotification() {
    const addedToCart = true;
    if (localStorage && localStorage.getItem("isMviva")) {
      localStorage.removeItem("isMviva");
      if (localStorage.getItem("mvivaSummaryMessage")) {
        localStorage.removeItem("mvivaSummaryMessage");
      }
      if (localStorage.getItem("mvivaPlanUpfront")) {
        localStorage.removeItem("mvivaPlanUpfront");
      }
      if (localStorage.getItem("mvivaBundleUpfront")) {
        localStorage.removeItem("mvivaBundleUpfront");
      }
    }
    setTimeout(() => {
      this._deviceDataService.publishNotification(addedToCart);
    }, 0);
  }

  public AddToCartNotificationError() {
    this.errorAddToCart = true;
    this._deviceDataService.publishNotification(this.errorAddToCart);
  }

  close__terms__login() {
    this.disclaimer_Modal = {
      'visibility': 'hidden'
    };
  }

  public defaultOnClick() {
    return false;
  }

  isDeviceBundleAndDeviceOnly () {
    this.easyPhoneType = "";
    this.isEasyPhone = false;
  }
}
