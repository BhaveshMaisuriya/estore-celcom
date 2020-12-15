import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
// core
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';

import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { IShopBannerItem, TBannerCategory } from '../../../pages/new-landing-page/store/shop-banner.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop-plan-banner',
  templateUrl: './shop-plan-banner.component.html',
  styleUrls: ['./shop-plan-banner.component.css']
})

export class ShopPlanBannerComponent implements OnInit, AfterViewInit {
  @Input() bannerType: TBannerCategory;
  @Input() banners$: Observable<IShopBannerItem[]>;

  withAnim = true;
  resetAnim = true;

  @ViewChild('topRightCarousel') topRightCarousel: NguCarousel<any>;
  @ViewChild('middleCarousel') middleCarousel: NguCarousel<any>;

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };

  constructor(@Inject(DOCUMENT) private document,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {  }

  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
    this.cdr.detectChanges();
  }

  reset() {
    if (this.bannerType === 'shop_plans') {
      this.middleCarousel.reset(!this.resetAnim);
    } else {
      this.topRightCarousel.reset(!this.resetAnim);
    }
  }

  moveTo(slide) {
    if (this.bannerType === 'shop_plans') {
      this.middleCarousel.moveTo(slide, !this.withAnim);
    } else {
      this.topRightCarousel.moveTo(slide, !this.withAnim);
    }
  }

  shopPlanGoTo(page) {
    // ? Since carousel number starts from 0, we subtract 1 from page
    this.middleCarousel.moveTo(page - 1, !this.withAnim);
  }
}
