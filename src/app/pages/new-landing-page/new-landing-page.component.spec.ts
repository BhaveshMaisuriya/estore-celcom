import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';

import { Broadcaster } from '../../Model/broadcaster.model';
import { NotificationPopupEvent } from '../../Service/broadcaster.service';
import { NewLandingPageComponent } from './new-landing-page.component';
import { StaticHeroBannerComponent } from '../../shared/components/static-hero-banner/static-hero-banner.component';
import { FooterComponent } from '../../Footer/footer.component';
import { FooterDownloadComponent } from '../../Footer/Download/download.component';
import { SocialMediaComponent } from '../../Footer/SocialMedia/socialmedia.component';
import { ShopPlanBannerComponent } from '../../shared/components/shop-plan-banner/shop-plan-banner.component';
import { DeviceCardComponent } from '../../shared/components/device-card/device-card.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { PageLoaderComponent } from '../../shared/components/page-loader/page-loader.component';
import { sharedDirectives } from '../../shared/directives';
import { SeoService } from '../../Service/seo.service';
import { EStoreAnalysticsService } from '../../Service/store.analytic.service';
import { AnalyticsService } from '../../Service/analytic.service';
import { RendererService } from '../../Service/renderer.service';
import { DecimalPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LandingComponent', () => {
  let component: NewLandingPageComponent;
  let fixture: ComponentFixture<NewLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule, RouterTestingModule ],
      declarations: [ NewLandingPageComponent, StaticHeroBannerComponent, FooterComponent, FooterDownloadComponent,
        SocialMediaComponent, ShopPlanBannerComponent, DeviceCardComponent, PaginationComponent, PageLoaderComponent, sharedDirectives ],
      providers: [Broadcaster, NotificationPopupEvent, CookieService, SeoService, EStoreAnalysticsService, AnalyticsService, RendererService, DecimalPipe  ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
