import { Component, OnInit, AfterViewInit, Renderer2, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { isPlatformBrowser } from '@angular/common';
import { PlansQuery, PlansStore } from './plans.store';
import { PlanPurchaseComponent } from '../../../Store/plan/plan-purchase/plan-purchase.component';
import { PlansService } from 'app/Service/plans.service';
import { ActivatedRoute } from '@angular/router';
import { TypeofPurchaseQuery } from '../side-summary-container/type-of-purchase.store';
import { resetStores } from '@datorama/akita';

@Component({
  selector: 'app-side-summary-container.component',
  templateUrl: './side-summary-container.component.html',
  styleUrls: ['./side-summary-container.component.scss'],
  providers: []
})
export class SideSummaryContainerComponent implements OnInit, AfterViewInit {

  showSideSummary = false;
  isBrowser: boolean;
  headerHeight = 75;
  additionalStyles = {}
  summaryAdditionalStyles = {}
  isSideSummaryExpanded = false;
  isLoading$;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private deviceDataService: DeviceDataService,
    private plansQuery: PlansQuery,
    private plansService: PlansService,
    private route: ActivatedRoute,
    private _topQuery: TypeofPurchaseQuery,
  ) { 
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    resetStores();
    this.isLoading$ = this.plansQuery.selectLoading;
    this.deviceDataService.sharedIsPageNotFound$.subscribe(data => {
      setTimeout(() => {
        this.showSideSummary = !data
      }, 0);
    });
    this.route.children[0]?.data.subscribe(data => {
      const { isPrepaid } = data;
      localStorage?.setItem('analytics-product_type', data.isDevicePage?'device bundle':'plan only');  
      this.plansService.updateIsPrepaid(isPrepaid);
    });
    this._topQuery.select(store => store.type).subscribe(data => localStorage?.setItem('analytics-item_type', data));
    this.route.firstChild.data.subscribe((data) => {
      this.plansService.updateIsBroadband(data.isBroadband);
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.onResize(null);
      }, 1000);
      localStorage.removeItem('magentoID');
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.isBrowser) {
      this.headerHeight = +(<any>document.getElementsByClassName('r-page')[0]).offsetHeight;
      if (window.innerWidth > 768) {
        this.additionalStyles = {
          'min-height': 'calc(100vh - ' + this.headerHeight + 'px - 28px)'
        }
      } else {
        this.additionalStyles = {
          'max-height': `calc(100vh - ${this.headerHeight}px)`,
          'min-height': `calc(100vh - ${this.headerHeight}px - 28px)`
        }
        this.summaryAdditionalStyles = {
          'top': `${this.headerHeight}px`
        }
      }
    }
  }

  public onRouterOutletActivate(event : any) {
    if (event instanceof PlanPurchaseComponent) {
      // debugger;
    }
  }

  onSideSummaryExpanded(event) {
    this.isSideSummaryExpanded = event;
    this.onResize(null);
  }
}
