import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidComponent } from './prepaid.component';
import { ActivatedRoute } from '@angular/router';
import { EStoreAnalysticsService } from 'app/Service/store.analytic.service';
import { Renderer2 } from '@angular/core';
import { PrepaidService } from './prepaid.service';
import { PlansService } from 'app/Service/plans.service';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { TypeofPurchaseService } from 'app/Service/type-of-purchase.service';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { PersonalInformationComponent } from 'app/Store/form/personal-information/personal-information.component';
import { AnalyticsService } from 'app/Service/analytic.service';
import { RendererService } from 'app/Service/renderer.service';
import { SeoService } from 'app/Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { AppService } from "../../../Service/app.service";
import { NotificationErrorComponent } from "../../widget/notification-error/notification-error.component";
import { FooterComponent } from "../../../Footer/footer.component";
import { EKycService } from "../../eKyc/e-kyc.service";
import { AgentFooterComponent } from "../../../Footer/agent-footer/agent-footer.component";
import { SideSummaryComponent } from "../../../Widget/side-summary/side-summary.component";
import { FooterDownloadComponent } from "../../../Footer/Download/download.component";
import { SocialMediaComponent } from "../../../Footer/SocialMedia/socialmedia.component";
import { ModalService } from "../../../shared/components/modal/modal.service";
import { NguCarouselModule } from "@ngu/carousel";
import { NewLineWrapperService } from "../../../shared/components/plans/new-line-wrapper/new-line-wrapper.service";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { NumberStandardFilter } from "../../../shared/pipes/number-standard.pipe";
import { NgxKjuaModule } from "ngx-kjua";
import { GuestCheckoutService } from "../../guest-checkout/services/guest-checkout.service";
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from "ngx-cookie-service";
import { TypeofPurchaseQuery } from "../../../Widget/side-summary/side-summary-container/type-of-purchase.store";
import { SharedModule } from 'app/shared/shared-module.module';
import { DetailBannerTextLeftComponent } from 'app/Widget/DetailBannerTextLeft/DetailBannerTextLeft.component';
import { PrepaidNricCheckComponent } from 'app/Store/widget/prepaid-nric-check/prepaid-nric-check.component';
import { EkycWrapperComponent } from 'app/Store/eKyc/ekyc-wrapper/ekyc-wrapper.component';
import { EkycStepsComponent } from 'app/Store/eKyc/ekyc-steps/ekyc-steps.component';
import { EkycDetailsComponent } from 'app/Store/eKyc/ekyc-details/ekyc-details.component';
import { MnpService } from 'app/Store/mnp/services/mnp.service';

const fakeActivatedRoute = {
  data: Observable.of({}),
    snapshot: { data: {} }
  } as ActivatedRoute;

describe('PrepaidComponent', () => {
  let component: PrepaidComponent;
  let fixture: ComponentFixture<PrepaidComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [
        PrepaidComponent,
        SideSummaryComponent,
        FooterComponent,
        FooterDownloadComponent,
        SocialMediaComponent,
        AgentFooterComponent,
        NotificationErrorComponent,
        PersonalInformationComponent,
        DetailBannerTextLeftComponent,
        PrepaidNricCheckComponent,
        EkycWrapperComponent,
        EkycStepsComponent,
        EkycDetailsComponent,
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NguCarouselModule,
        PerfectScrollbarModule,
        NgxKjuaModule,
        SharedModule,
      ],
      providers: [
        AppService,
        AnalyticsService,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        EStoreAnalysticsService,
        SeoService,
        DecimalPipe,
        RendererService,
        Renderer2,
        PrepaidService,
        PlansService,
        MnpService,
        PlansQuery,
        TypeofPurchaseService,
        TypeofPurchaseQuery,
        DeviceDataService,
        EKycService,
        ModalService,
        NewLineWrapperService,
        NumberStandardFilter,
        GuestCheckoutService,
        Broadcaster,
        NotificationPopupEvent,
        CookieService,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // * handleMnpReset()
  describe('Testing eKyc Data Reset - handleMnpReset()', () => {
    beforeEach(() => {
      component.flags.showEKyc = true;

      sessionStorage.setItem('TempUserToken', 'blah-blah');
      sessionStorage.setItem('TempGuestLogin', JSON.stringify({ foo: 'bar' }));

      const topService = TestBed.inject(TypeofPurchaseService)
      topService.updateeKycStatus(true);
    });

    it('handleMnpReset should reset flag - showEKyc', () => {
      component.handleMnpReset();

      expect(component.flags.showEKyc).toBeFalse();
    });

    it('handleMnpReset should reset topStore - eKycStatus', () => {
      component.handleMnpReset();
      const topQuery = TestBed.inject(TypeofPurchaseQuery)
      const topStore = topQuery.getValue();

      expect(topStore.eKycStatus).toBeFalse();
    });

    it('handleMnpReset should clear sessionStorage - TempUserToken', () => {
      component.handleMnpReset();
      const TempUserToken = sessionStorage.getItem('TempUserToken');

      expect(TempUserToken).toBeNull();
    });


    it('handleMnpReset should clear sessionStorage - TempGuestLogin', () => {
      component.handleMnpReset();
      const TempGuestLogin = sessionStorage.getItem('TempGuestLogin');

      expect(TempGuestLogin).toBeNull();
    });
  })
});
