import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopPlanBannerComponent } from './shop-plan-banner.component';
import { NguCarousel } from '@ngu/carousel';
import { DeviceCardComponent } from '../../components/device-card/device-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { PageLoaderComponent } from '../../components/page-loader/page-loader.component';
import { sharedDirectives } from '../../directives';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SeoService } from '../../../Service/seo.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { DecimalPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TBannerCategory } from 'app/pages/new-landing-page/store/shop-banner.model';
import { of } from 'rxjs';

describe('ShopPlanBannerComponent', () => {
  let component: ShopPlanBannerComponent;
  let fixture: ComponentFixture<ShopPlanBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ ShopPlanBannerComponent, NguCarousel, sharedDirectives, 
        DeviceCardComponent, PaginationComponent, PageLoaderComponent
      ],
      providers: [ SeoService, EStoreAnalysticsService, AnalyticsService, RendererService, DecimalPipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPlanBannerComponent);
    component = fixture.componentInstance;

    let category = 'shop_plans' as TBannerCategory;
    const testObj = { 
      headline: 'test',
      headline_text_size: 'test',
      headline_text_color: 'test',
      description: 'test',
      description_text_size: 'test',
      description_background_color: 'test',
      description_text_color: 'test',
      image_url: 'test',
      image_url_webp: '/test_url.png',
      banner_background_color: 'test',
      button_text: 'test',
      button_url: 'test',
      button_bgcolor: 'test',
      button_text_color: 'test',
      promo_code_text: 'test',
      promo_code_text_size: 'test',
      promo_code_text_color: 'test',
      promo_code_background_color: 'test',
      position: 'test',
      banner_category: category,
      banner_html: 'test',
      image_mobile_url: 'test',
      image_mobile_url_webp: 'test'
     };
    component.banners$ = of([testObj]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
