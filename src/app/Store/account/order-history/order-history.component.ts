import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../Service/app.service';
import { BaseComponent } from '../../../base.component';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { UserService } from '../../../Service/user.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  providers: [AppService]
})
export class OrderHistoryComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  public OrderResponseArray: any = null;
  eStoreFrontEndUrl: string = environment.eStoreFrontEndUrl;
  router: Router;
  service: AppService;
  hideSortBy = true;
  filterText = 'Filter by Status';
  msIsdn: any;
  userInfo: any;
  start = 0;
  limit: number = (this.isMobile()) ? 5 : 10;
  data: any = [];
  serviceOver = false;
  public sessionInvalid = false;
  public isCSAgentDealer = false;
  public isCSAgent = false;
  public isDealer = false;
  trackorderUrl = 'store/checkout/trackorderdetails';
  apiUrl = '/rest/V1/orderList';
  private subscriber: Subscription;
  constructor(router: Router, private userService: UserService,
    service: AppService, private _activatedRoute: ActivatedRoute,
    private _deviceDataService: DeviceDataService, @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2) {
    super();
    this.router = router;
    this.service = service;
  }

  ngOnInit() {
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }
    if (this.userService.isCSAgent()) {
      this.isCSAgent = true;
    }
    if (this.userService.isDealer()) {
      this.isDealer = true;
    }
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.sessionInvalid = data));
    this.hideSortBy = true;
    this.service.getEstoreUserData(this.apiUrl).subscribe(
      (response: any) => {
        this.data = response[0];
        this.serviceOver = true;
      },  (errorResponse: any) => {
          if (!errorResponse.error.success) {
            this.sessionInvalid = true;
          }
      });
  }
  ngAfterViewInit() {
    const currentUrl: string = this.router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }
  public orderNumber(orderNo) {
    setTimeout(() => {
      this._deviceDataService.publishOrderNO(orderNo);
    }, 0);
    this.router.navigate([this.trackorderUrl, orderNo]);
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
