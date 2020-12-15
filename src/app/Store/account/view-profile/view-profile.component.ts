import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../../Service/cart.service';
import { CheckoutService } from '../../checkout/services/checkout.service';
import { AppService } from '../../../Service/app.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { Subscription } from 'rxjs';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { UserService } from '../../../Service/user.service';
import { ViewProfileService } from './view-profile.service';
import { LoginService } from '../../login/service/login.service';
import { ModalService } from 'app/shared/components/modal/modal.service';

@Component({
  selector: "app-view-profile",
  templateUrl: "./view-profile.component.html",
  styleUrls: ["./view-profile.component.scss"],
  providers: [CartService, CheckoutService, AppService, UserService, ViewProfileService],
  encapsulation: ViewEncapsulation.None
})

export class ViewProfileComponent implements OnInit, AfterViewInit {
  checkoutService: CheckoutService;
  checkoutData: any;
  checkoutDataDealerAgent: any;
  cart: any;
  billingAddress: any;
  shippingAddress: any;
  orderid: any;
  appservice: any;
  responseorderid: any;
  orderData: any;
  selectedProfileTab: string = 'profile';
  selectedVoucherTab: string = 'offerings';
  contractStartDate: string;
  contractEndDate: string;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalRedeemedPages: number = 0;
  listingRedeemedItems: any = [];
  filteredRedeemedItems: any = [];
  filteredOfferingItems: any = [];
  activeContractDetails: any = [];
  hideSortBy:boolean = true;
  start = 0;
  limit: number = 10;
  data: any = [];
  serviceOver:boolean = false;
  filterText = 'Filter by Status';
  trackorderUrl = 'store/checkout/trackorderdetails';
  firstVoucher: any = [];
  voucherSuccessText:string = "";
  voucherSuccessDesc:string = "";
  activeContractLength: number = 0;
  userMsisdn: string = "";
  public ProfileDataFromStorage: any = null;
  public sessionInvalid = false;
  public isCSAgentDealer = false;
  public isCSAgent = false;
  public isDealer = false;
  public ProfileDataGuestFromStorage: any = null;
  public ProfileDataAgentFromStorage: any = null;
  public ProfileDataDealerFromStorage: any = null;
  public agentInfo = "AgentInfo";
  public dealerInfo = "DealerInfo";
  public userInfo = "UserInfo";
  public guestInfo = "GuestInfo";
  private subscriber: Subscription;
  states =
    [{ "code": "JH", "name": "Johor" },
    { "code": "KD", "name": "Kedah" },
    { "code": "KN", "name": "Kelantan" },
    { "code": "MK", "name": "Melaka" },
    { "code": "NS", "name": "Negeri Sembilan" },
    { "code": "PH", "name": "Pahang" },
    { "code": "PK", "name": "Perak" },
    { "code": "PS", "name": "Perlis" },
    { "code": "PP", "name": "Pulau Pinang" },
    { "code": "SB", "name": "Sabah" },
    { "code": "SW", "name": "Sarawak" },
    { "code": "SL", "name": "Selangor" },
    { "code": "TG", "name": "Terengganu" },
    { "code": "WP", "name": "WP Kuala Lumpur" },
    { "code": "LB", "name": "WP Labuan" },
    { "code": "PJ", "name": "WP Putrajaya" }];
  residentTypes = ["Landed", "Highrise"];
  public isInitializeTermsAndConditions: any = null;
  terms: any = {
    terms: 'dummy'
  };

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private cartService: CartService,
    checkoutService: CheckoutService,
    private _service: AppService,
    @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _deviceDataService: DeviceDataService,
    private _userService: UserService,
    private _viewProfileService: ViewProfileService,
    private _loginService: LoginService,
    private _modalService: ModalService
  ) {
    this.checkoutService = checkoutService;
  }

  ngOnInit() {
    this.isCSAgentDealer = this._userService.isCSAgent() || this._userService.isDealer();
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.sessionInvalid = data));
    if (typeof window !== 'undefined' ) {
      const pageUrl = window.location.href;
      if (pageUrl.indexOf("store/viewmyprofile") > -1) {
        this.selectedProfileTab = 'profile';
      } else if (pageUrl.indexOf("store/profile/vouchers") > -1){
        this.selectedProfileTab = 'voucher';
      } else if (pageUrl.indexOf("store/account/order-history") > -1){
        this.selectedProfileTab = 'order_history';
        this.orderHistory();
      }
    }
    this.cart = this.cartService.retrieveCart();
    this.init();
  }
  init() {
    if (typeof window !== 'undefined') {
      if (sessionStorage && sessionStorage.getItem(this.agentInfo)) {
        this.ProfileDataAgentFromStorage = JSON.parse(sessionStorage.getItem(this.agentInfo));
      } else if (sessionStorage && sessionStorage.getItem(this.dealerInfo)) {
        this.ProfileDataDealerFromStorage = JSON.parse(sessionStorage.getItem(this.dealerInfo));
      } else if (sessionStorage && sessionStorage.getItem(this.userInfo)) {
        this.ProfileDataFromStorage = JSON.parse(sessionStorage.getItem(this.userInfo)).outputCPResp;
        this.getStateName(this.ProfileDataFromStorage.state);
      } else if (sessionStorage && sessionStorage.getItem(this.guestInfo)) {
        this.ProfileDataGuestFromStorage = JSON.parse(sessionStorage.getItem(this.guestInfo));
      }
    }
    this.loadVoucherDetails();
  }

  loadVoucherDetails() {
    this.userMsisdn = this.ProfileDataFromStorage?.services?.[0]?.mobileNumber;
    if (!this.isCSAgentDealer && this.userMsisdn) {
      const apiUrl = "/rest/V1/customerdetail?msisdn=" + this.userMsisdn;
      this.checkoutService.Find(apiUrl.trim()).subscribe(
        (response: any) => {
          this.checkoutData = response[0];
          this.activeContractDetails = [];
          this.activeContractLength = Object.keys(this.checkoutData.ActiveContract).length;
          if(this.checkoutData && this.activeContractLength !== 0) {
            this.activeContractDetails.push(this.checkoutData.ActiveContract);
            this.contractStartDate = this.checkoutData.ActiveContract.start_date.split(' ')[0];
            this.contractEndDate = this.checkoutData.ActiveContract.end_date.split(' ')[0];
          }
          if(this.checkoutData && this.checkoutData.voucher_details && this.checkoutData.voucher_details.length > 0) {
            this.filteredRedeemedItems = this.checkoutData.voucher_details.filter((el, index) => {
              return el.readme == "1";
            });
            this.filteredOfferingItems = this.checkoutData.voucher_details.filter((el, index) => {
              return el.readme == "0";
            });
            if(this.filteredRedeemedItems.length > 5) {
              this.listingRedeemedItems = this.filteredRedeemedItems.slice(0,5);
            } else {
              this.listingRedeemedItems = this.filteredRedeemedItems;
            }
          }
          this.totalRedeemedPages = this.numPages();
        },  (errorResponse: any) => {
          if (typeof window !== 'undefined') {
            if (!errorResponse.error.success) {
              this.sessionInvalid = true;
            }
          }
        });
    } else if(this.isCSAgentDealer) {
      if(this.ProfileDataDealerFromStorage) {
        this.checkoutDataDealerAgent = this.ProfileDataDealerFromStorage;
      } else if(this.ProfileDataAgentFromStorage) {
        this.checkoutDataDealerAgent = this.ProfileDataAgentFromStorage;
      }
    }
  }

  openVoucherModal(voucher) {
    this.firstVoucher=[];
    this.firstVoucher.push(voucher);
    this._modalService.open('voucher-popup');
  }

  orderHistory() {
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }
    if (this._userService.isCSAgent()) {
      this.isCSAgent = true;
    }
    if (this._userService.isDealer()) {
      this.isDealer = true;
    }
    const apiUrl = '/rest/V1/orderList';
    this.hideSortBy = true;
    this._service.getEstoreUserData(apiUrl.trim()).subscribe(
      (response: any) => {
        this.data = response[0];
        this.serviceOver = true;
      },  (errorResponse: any) => {
          if (!errorResponse.error.success) {
            this.sessionInvalid = true;
          }
      });
  }

  openSortBy() {
    this.hideSortBy = !this.hideSortBy;
  }
  applyFilter(filterText) {
    this.hideSortBy = true;
    this.filterText = filterText;
  }
  public orderNumber(orderNo) {
    setTimeout(() => {
      this._deviceDataService.publishOrderNO(orderNo);
    }, 0);
    this._router.navigate([this.trackorderUrl, orderNo]);
  }
  loadMore() {
    this.limit += this.limit;
  }
  onProfileTabChange(tabName: string) {
    if(tabName === "profile") {
      this.selectedProfileTab = 'profile';
    } else if(tabName === "voucher") {
      this.selectedProfileTab = 'voucher';
    } else if(tabName === "order_history") {
      this.selectedProfileTab = 'order_history';
      this.orderHistory();
    }
  }
  onVoucherTabChange(tabName: string) {
    if(tabName === "offerings") {
      this.selectedVoucherTab = 'offerings';
    } else if(tabName === "redeemed") {
      this.selectedVoucherTab = 'redeemed';
    }
  }
  onRedeemedPageClick(page) {
    this.listingRedeemedItems = [];
    this.currentPage = page;
    // Validate page
    if (page < 1) page = 1;
    if (page > this.totalRedeemedPages) {
      page = this.totalRedeemedPages;
    }
    for (let i = (page-1) * this.itemsPerPage; i < (page * this.itemsPerPage); i++) {
      if(this.filteredRedeemedItems[i]) {
        this.listingRedeemedItems.push(this.filteredRedeemedItems[i]);
      }
    }
  }

  numPages() {
    return Math.ceil(this.filteredRedeemedItems.length / this.itemsPerPage);
  }
  getStateName(stateCode: string) {
    for (let i = 0; i < this.states.length; i++) {
      if (stateCode === this.states[i].code) {
        this.ProfileDataFromStorage.state = (this.states[i].name).toUpperCase();
        break;
      }
    }
  }
  closeRedeemModal() {
    this._modalService.close('voucher-popup');
  }
  applyVoucher(voucherCode) {
    const url = "/rest/V1/voucher-readme";
    const requestBody = { "data": {
        "coupon_code": voucherCode
      }
    };
    this._viewProfileService.postVoucherCode(url, requestBody).subscribe(
      (response) => {
        if(response) {
          this.loadVoucherDetails();
          this.closeRedeemModal();
        }
    });
  }
  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }

}








