import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription ,  Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../base.component';
import { CartService } from '../../../Service/cart.service';
import { UserService } from '../../../Service/user.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { AppService } from '../../../Service/app.service';
import { BroadbandService } from '../../../Service/broadband.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';

@Component({
  selector: 'app-esim-sticky-summary',
  templateUrl: './esim-sticky-summary.component.html',
  styleUrls: ['./esim-sticky-summary.component.css'],
  providers: [CartService, AppService, UserService, EStoreAnalysticsService,
    RemarketAnalyticsService, BroadbandService],
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
export class EsimStickySummaryComponent extends BaseComponent implements OnInit {
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
  public orderNumberType: string;
  public orderEmailAddress: string;
  public typeOfSIM: string;
  public orderPhoneNo: string;
  public orderTotalPay: number;
  private subscriber: Subscription;
  public apiErrorMessage: any;
  public isApiError = false;
  isCSAgent = false;
  isCustomer = false;
  isGuest = false;
  isMCUser = false;
  isInsideContainer = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private _deviceDataService: DeviceDataService,
    private _globalErrorHandler: GlobalErrorHandler,
    private _broadbandService: BroadbandService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _service: AppService,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit() {
    this.isCSAgent = this.userService.isCSAgent();
    this.isCustomer = this.userService.isCustomer();
    this.isGuest = this.userService.isGuest();
    this.isMCUser = this.userService.isMCUser();
    this._broadbandService.onScroll();
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.isApiError = data));
    this.subscriber = this._deviceDataService.updateStickyStep$.subscribe(data => this.setEsimStickyTab(data));
    this.subscriber = this._deviceDataService.sharedPhoneNo$.subscribe(data => this.orderPhoneNo = data);
    this.subscriber = this._deviceDataService.sharedTypeOfSIM$.subscribe(data => this.typeOfSIM = data);
    this.subscriber = this._deviceDataService.sharedEmailId$.subscribe(data => this.orderEmailAddress = data);
    this.subscriber = this._deviceDataService.sharedTotalpay$.subscribe(data => this.orderTotalPay = data);
    this.subscriber = this._deviceDataService.sharedNumberType$.subscribe(data => this.orderNumberType = data);
    this.subscriber = this._deviceDataService.disableAddToCart$.subscribe(data => {
      this.disableCartButton = data;
    });
    this._activatedRoute.parent.data.subscribe(data => {
      if (data['parent']) {
        this.isInsideContainer = true;
      }
    });
    this.subscriber = this._deviceDataService.addtoCartTriggered$.subscribe(() => {
      this.addToCartHandler();
    });
  }
  setEsimStickyTab(step: any) {
    if (step === 0) {
      this.step = this.step + 1;
    } else {
      this.step = step;
    }
    this.onEsimStickyTabClick(this.step);
  }

  onEsimStickyTabClick(esimTab: any) {
    if (esimTab === 1) {
      this.isStep3Active = false;
      this.isStep4Active = false;
      this.isStep1Active = true;
      this.isStep2Active = false;
    } else if (esimTab === 3) {
      this.isStep3Active = true;
      this.isStep4Active = false;
      this.isStep1Active = false;
      this.isStep2Active = false;
    } else if (esimTab === 2) {
      this.isStep2Active = true;
      this.isStep3Active = false;
      this.isStep4Active = false;
      this.isStep1Active = false;
    } else if (esimTab === 4) {
      this.isStep4Active = true;
      this.isStep1Active = false;
      this.isStep2Active = false;
      this.isStep3Active = false;
    }

    if (typeof document !== 'undefined' && typeof navigator !== 'undefined') {
      const aLink = document.querySelector("#section_" + esimTab);
      if (esimTab === 1 && aLink) {
        this._broadbandService.scrollToTop();
      } else if (aLink) {
        // For chrome, IE and Firefox use scrollTo().
        if (typeof window !== 'undefined') {
          this.scrollToSection(esimTab);
        }
      }
    }
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
   // Edit cart item.
  addToCartHandler() {
    if (sessionStorage && localStorage
      && (sessionStorage.getItem("UserInfo") || sessionStorage.getItem("GuestInfo"))
      && localStorage.getItem('eSIM-EDIT')
      ) {
      // for Edit  cart flow.
      const cartItem = JSON.parse(localStorage.getItem('eSIM-EDIT'));
      this.deleteCart(cartItem);
    } else {
      // for Add to cart flow.
      this.AddItemToCart();
    }
  }
  // Delete Item from cart.
  public deleteCart(cartItem) {
    const requestBody = {
      "data": {
        "user": "user",
        "item_id": cartItem.item_id,
        "cart_item_sku": cartItem.sku_bundle,
        "is_preorder": false
      }
    };
    this._service.postEstoreUserData("/rest/V1/deletecart/", requestBody).subscribe(
      (response: any) => {
        // Remove local storage data once item deleted from cart.
        if (localStorage && localStorage.getItem("'eSIM-EDIT'")) {
          localStorage.removeItem("'eSIM-EDIT'");
        }
        // Add new Item To cart.
        this.AddItemToCart();
      },
    (error: any) => {
      this.OnApiError(error.error);
    });
  }
  // Add to cart Esim api request and response handling.
  AddItemToCart() {
    const reqBody = {
      "data": {
        "Sku": "esim",
        "TotalPay": "0",
        "selected_number": this.orderPhoneNo,
        "simType": this.typeOfSIM,
        "user": "user",
      },
    };
    this.postEsimAddItem(reqBody, "/rest/V1/planaddtocart").subscribe(
      (res: any) => {
        this.responseEsimATC(res);
      },
      (err: any) => {
        this.OnApiError(err.error);
      }
    );
  }
  // Response handler methods.
  responseEsimATC(response) {
    if (response[0].status === true) {
      this.OnEsimAddtoCartApiSuccess();
      this._estoreAnalyticsService.onClickAddToCart(this._renderer);  // Analytics to track add to cart
    } else {
      this.OnApiError(response[0]);
    }
  }
  OnEsimAddtoCartApiSuccess() {
    this.redirect("/store/cart");
  }
  OnApiError(error) {
    this.apiErrorMessage = {};
    this.apiErrorMessage.content = error.message;
    this.isApiError = true;
    if (this.apiErrorMessage.content) {
      this._globalErrorHandler.errorObjectConvert(this.apiErrorMessage.content);
    }
  }
  postEsimAddItem(requestBody: any, apiUrl: any): Observable<any[]> {
    return this._service.
      postEstoreUserData(apiUrl, requestBody)
      .pipe(map((response: any) => {
        return response;
      }));
  }
  redirect(url: string) {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }
}
