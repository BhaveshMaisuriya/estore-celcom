import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';

import { ShopDevicesQuery } from './store/shop-devices.query';
import { shopDevicesItemsPerPage, ShopDevicesStore } from './store/shop-devices.store';
import { ShopBannerQuery } from './store/shop-banner.query';
import { SYS_DOWN_MSG } from '../../shared/constants/error.constants';
import { queryEntries as landingPageQE } from '../../shared/constants/new-landing-page.constants';
import { SeoService } from '../../Service/seo.service';
import { ShopBannerStore } from './store/shop-banner.store';
import { NewLandingPageService } from './new-landing-page.service';
import { EStoreAnalysticsService } from '../../Service/store.analytic.service';
import { AnalyticsService } from '../../Service/analytic.service';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from 'app/Service/user.service';
import {untilDestroyed} from "../../shared/services/until-destroyed.service";

@Component({
  selector: 'app-new-landing-page',
  templateUrl: './new-landing-page.component.html',
  styleUrls: [ './new-landing-page.component.scss' ]
})
export class NewLandingPageComponent implements OnInit, OnDestroy {
  @ViewChild('shopDevices', {static: true}) shopDevicesElement: ElementRef;
  @ViewChild('shopPlans', {static: true}) shopPlansElement: ElementRef;
  @ViewChild('highlights', {static: true}) highlightsElement: ElementRef;
  @ViewChild('whyUs', {static: true}) whyUsElement: ElementRef;

  // * Shop Devices Query # start
  devices$ = this.devicesQuery.devicesToDisplay$;

  shopDevicesLoading$ = this.devicesQuery.select(state => state.loading);
  shopDevicesError$ = this.devicesQuery.select(state => state.error);

  featureTabs$ = this.devicesQuery.select(state => state.featureTabs);
  selectedfeatureTab$ = this.devicesQuery.selectedFeatureTab$;

  brands$ = this.devicesQuery.select(state => state.filteredBrands);
  selectedBrand$ = this.devicesQuery.selectedBrand$;

  plans$ = this.devicesQuery.select((state) => state.filteredPlans);
  selectedPlan$ = this.devicesQuery.selectedPlan$;

  combinedTabsSubscription: Subscription;

  shopDevicesCurrentPage$ = this.devicesQuery.select(state => state.currentPage);
  shopDevicesTotalPages$ = this.devicesQuery.totalPages$;

  // * Shop Devices Query # end

  // * Shop Banners Query # start
  shopBannerLoading$ = this.bannersQuery.select(state => state.loading);

  featured$ = this.bannersQuery.featured$;
  topRightCarousel$ = this.bannersQuery.topRightCarousel$;
  topLeftCarousel$ = this.bannersQuery.topLeftCarousel$;
  shopPlans$ = this.bannersQuery.shopPlans$;
  // * Shop Banners Query # end

  // * Observables and Subscribers
  shopBannerApiSubscription: Subscription;

  shopDevicesApiSubscription: Subscription;

  filteredDevices$ = this.devicesQuery.filteredDevices$;
  filteredDevicesSubscription: Subscription;
  isEnterprise = false;

  queryParams$ = this.route.queryParams;
  queryParamsSubscription: Subscription;
  redirectPopUp = false;
  popupData = {
    title: '',
    content: '',
    button: '',
  };
  isBrowser: boolean;
  isPageScroll: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private devicesQuery: ShopDevicesQuery,
    private devicesStore: ShopDevicesStore,
    private bannersStore: ShopBannerStore,
    private bannersQuery: ShopBannerQuery,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private userService: UserService,
    private newLandingPageService: NewLandingPageService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _analyticsService: AnalyticsService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.route.fragment
      .pipe(untilDestroyed(this))
      .subscribe(hash => {
        switch (hash) {
          case 'devices':
            this.autoScrollTo(this.shopDevicesElement);
            break;

          case 'plans':
            this.autoScrollTo(this.shopPlansElement);
            break;

          case 'highlights':
            this.autoScrollTo(this.highlightsElement);
            break;

          case 'why-us':
            this.autoScrollTo(this.whyUsElement);
            break;
        }
      });

    this.shopDevicesApiSubscription = this.newLandingPageService.shopDevicesApi$
      .subscribe((response) => {
        this.devicesStore.setResponseData(response, this.route);

        // ? Adding Meta tags for SEO fetched from back-end
        this.seoService.setTitle(response.meta[0].meta_title, true);
        this.seoService.setMetaData('keywords', response.meta[0].meta_keywords);
        this.seoService.setMetaData('description', response.meta[0].meta_description);
      }, (err) => {
        if (err.status === 401) {
          this.popupData = {
            title: 'Uh oh!',
            content: err.error.message,
            button: 'Got it',
          };
          this.redirectPopUp = true;
        }
        this.devicesStore.update({ error: SYS_DOWN_MSG });
        this.devicesStore.set([]);
      });

    this.shopBannerApiSubscription = this.newLandingPageService.shopBannerApi$
      .subscribe(response => {
        if (response.status) {


          // ? Sorting without mutating the original response
          // ? ID needed for Akita Store
          const items = [ ...response.response ]
            .sort((a, b) => Number(a.position) - Number(b.position))
            .map(item => ({ ...item, id: `${ item.banner_category }-${ item.position }` }));

          this.bannersStore.set(items);
        } else {
          // ! Find a way to avoid duplication later
          this.bannersStore.update({ error: SYS_DOWN_MSG });
          this.bannersStore.set([]);
        }
      }, () => {
        this.bannersStore.update({ error: SYS_DOWN_MSG });
        this.bannersStore.set([]);
      });

    this.filteredDevicesSubscription = this.filteredDevices$.subscribe(
      (filteredDevices) => {
        // ? Update Page info when device list is changed

        this.devicesStore.update({
          currentPage: 1,
          totalPages: Math.ceil(
            filteredDevices.length / shopDevicesItemsPerPage
          ),
        });
      }
    );

    // * Query Params
    this.queryParamsSubscription = this.queryParams$.subscribe(params => {
      this.devicesStore.updateTab(params as typeof landingPageQE);
    });

    this.combinedTabsSubscription = combineLatest([this.selectedBrand$, this.selectedPlan$])
    .subscribe(([brand, plan]) => {
      this.updateAnalyticsValues(brand, plan);
    });

    this.isEnterprise = this.userService.isUserEnterprise();
  }

  updateAnalyticsValues(brand: string, plan: string) {
    try {
      const currentUrl = this.route.snapshot['_routerState'].url;
      const {data} = this.route.snapshot;
      this._analyticsService.tabName = brand + "-" + plan;
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, data);
    } catch (_error) {
    }
  }

  ngOnDestroy(): void {
    if (this.shopDevicesApiSubscription) {
      // this.shopDevicesApiSubscription.unsubscribe();
    }

    if (this.shopBannerApiSubscription) {
      this.shopBannerApiSubscription.unsubscribe();
    }

    if (this.filteredDevicesSubscription) {
      this.filteredDevicesSubscription.unsubscribe();
    }

    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }

    if (this.combinedTabsSubscription) {
      this.combinedTabsSubscription.unsubscribe();
    }
  }

  onShopDevicesPageClick(currentPage: number): void {
    this.devicesStore.update({ currentPage });
  }

  onShopDevicesTabClick(key: string, tab: 'brand' | 'plan-tab' | 'feature-tab') {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [tab]: key },
      //? for resolving issue of switching between brands tabs
      //queryParamsHandling: 'merge',
      // ? Adobe Analytics refreshes the page when url changes
      skipLocationChange: true
    });
  }

  autoScrollTo(element: ElementRef) {
    if (this.isBrowser) {
      setTimeout(() => {
        element.nativeElement.scrollIntoView({
          behavior: 'smooth',
        })
      }, 500);
    }
  }
}
