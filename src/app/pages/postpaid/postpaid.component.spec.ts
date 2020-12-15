import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { PostpaidComponent } from './postpaid.component';
import { SideSummaryComponent } from 'app/Widget/side-summary/side-summary.component';
import { FooterComponent } from 'app/Footer/footer.component';
import { NotificationErrorComponent } from 'app/Store/widget/notification-error/notification-error.component';
import { FooterDownloadComponent } from 'app/Footer/Download/download.component';
import { SocialMediaComponent } from 'app/Footer/SocialMedia/socialmedia.component';
import { NguCarouselModule } from '@ngu/carousel';
import { EStoreAnalysticsService } from 'app/Service/store.analytic.service';
import { RendererService } from 'app/Service/renderer.service';
import { SeoService } from 'app/Service/seo.service';
import { MnpService } from 'app/Store/mnp/services/mnp.service';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { GuestCheckoutService } from 'app/Store/guest-checkout/services/guest-checkout.service';
import { CookieService } from 'ngx-cookie-service';
import { Broadcaster } from 'app/Model/broadcaster.model';
import { NotificationPopupEvent } from 'app/Service/broadcaster.service';
import { SharedModule } from 'app/shared/shared-module.module';
import { configureTestSuite } from 'ng-bullet';
import { AgentFooterComponent } from 'app/Footer/agent-footer/agent-footer.component';

describe('PostpaidComponent', () => {
  let component: PostpaidComponent;
  let fixture: ComponentFixture<PostpaidComponent>;

  configureTestSuite((() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        BrowserAnimationsModule,
        PerfectScrollbarModule,
        NguCarouselModule,
        SharedModule,
        CommonModule,
      ],
      declarations: [
        PostpaidComponent,
        SideSummaryComponent,
        FooterComponent,
        FooterDownloadComponent,
        SocialMediaComponent,
        AgentFooterComponent,
        NotificationErrorComponent,
      ],
      providers: [
        HttpClient,
        DecimalPipe,
        EStoreAnalysticsService,
        RendererService,
        SeoService,
        MnpService,
        DeviceDataService,
        GuestCheckoutService,
        Broadcaster,
        NotificationPopupEvent,
        CookieService
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
