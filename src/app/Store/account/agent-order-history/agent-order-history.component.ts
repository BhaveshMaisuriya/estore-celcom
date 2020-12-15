import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../Service/app.service';
import { BaseComponent } from '../../../base.component';
import { DeviceDataService } from '../../../Service/devicedata.service';
import "lodash";
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { RouterService } from '../../../Service/router.service';
import { UserService } from '../../../Service/user.service';

declare var _: any;

@Component({
  selector: 'app-agent-order-history',
  templateUrl: './agent-order-history.component.html',
  styleUrls: ['./agent-order-history.component.css'],
  providers: [AppService, UserService]
})
export class AgentOrderHistoryComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  public breadcrumbResponse: any = null;
  public OrderResponseArray: any = null;
  router: Router;
  service: AppService;
  hideSortBy = true;
  filterText = 'Filter by Status';
  msIsdn: any;
  userInfo: any;
  start = 0;
  customerName = "";
  limit = 20;
  data: any = [];
  serviceOver = false;
  public sessionInvalid = false;
  public isCSAgent = false;
  private subscriber: Subscription;
  currentPage = 1;
  totalPage = 0;
  nricId = "";
  pages = [];
  constructor(private userService: UserService,
    router: Router,
    private routerService: RouterService,
    service: AppService, private _activatedRoute: ActivatedRoute,
    private _deviceDataService: DeviceDataService, @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2) {
    super();
    this.router = router;
    this.service = service;
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.nricId = params["NricId"];
      this.LoadOrder(1);
    });
    if (this.userService.isCSAgent()) {
      this.isCSAgent = true;
    }
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.sessionInvalid = data));
    this.hideSortBy = true;
    this.breadcrumbResponse = [
      { "Alias": "/store/viewmyprofile", "isFirst": "My Profile" },
      { "Alias": "", "isContent": "" },
      { "Alias": "", "isLast": "My Orders" }
    ];
  }
  ngAfterViewInit() {
    const currentUrl: string = this.router.routerState?.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }
  goToPrevPage() {
    if ( this.currentPage > 1 ) {
      this.LoadOrder(this.currentPage - 1);
    }
  }
  goToNextPage() {
    if ( this.currentPage < this.totalPage ) {
      this.LoadOrder(this.currentPage + 1);
    }
  }
  public LoadOrder(page) {
    this.data = [];
    this.serviceOver = false;
    const apiUrl = '/rest/V1/customerOrders';
    this.service.postEstoreUserData(apiUrl, {
      "nric": this.nricId,
      "search_criteria": {
          "page_size": 10,
          "current_page" : page
      }
   }).subscribe(
      (response: any) => {
        this.data = response[0].items;
        this.customerName = response[0].customer_name;
        this.msIsdn = response[0].mobile_number;
        this.currentPage = response[0].current_page;
        this.totalPage = Math.ceil(response[0].total_count / response[0].page_size);
        this.serviceOver = true;
        this.pages = Array(this.totalPage).fill(null).map(( x, i ) => {
          return {
            pageno : i + 1, selected: false
          };
        });
        this.pages[this.currentPage - 1].selected = true;
      },  (errorResponse: any) => {
        if (typeof window !== 'undefined') {
          if (!errorResponse.error.success) {
            this.sessionInvalid = true;
          }
        }
      });
  }
  public goToPreviousPage(): void {
    const previous = this.routerService.getPreviousUrl();
    if ( previous ) {
      this.routerService.router.navigateByUrl(previous);
    }
  }
  public orderNumber(orderNo) {
    setTimeout(() => {
      this._deviceDataService.publishOrderNO(orderNo);
    }, 0);
    this.router.navigate(['store/checkout/trackorderdetails', orderNo]);
    // this.router.navigateByUrl('store/checkout/trackorderdetails');
  }

  openSortBy() {
    this.hideSortBy = !this.hideSortBy;
  }
  applyFilter(filterText) {
    this.hideSortBy = true;
    this.filterText = filterText;
  }

  loadMore() {
    this.limit += this.limit;
  }

  ngOnDestroy() {
  }

}

