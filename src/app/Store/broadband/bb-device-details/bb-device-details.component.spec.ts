import { async, ComponentFixture, TestBed ,inject} from '@angular/core/testing';
import { BbDeviceDetailsComponent } from './bb-device-details.component';
import { BreadcrumbComponent } from '../../../breadcrumb/breadcrumb.component';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { DeviceSliderComponent } from '../../device/device-slider/device-slider.component';
import { BbDeviceNamePriceComponent } from '../../../Widget/StoreWidgets/bb-device-name-price/bb-device-name-price.component';
import { BbDeviceColorComponent } from '../../../Widget/StoreWidgets/bb-device-color/bb-device-color.component';
import { BbDeviceStockCheckComponent } from '../../../Widget/StoreWidgets/bb-device-stock-check/bb-device-stock-check.component';
import { DeviceMoreDetailsComponent } from '../../../Widget/StoreWidgets/device-details/device-details-more-details/device-details-more-details.component';
import { DetailBannerTextLeftComponent } from '../../../Widget/DetailBannerTextLeft/DetailBannerTextLeft.component';
import { BbPlanSectionComponent } from '../bb-plan-section/bb-plan-section.component';
import { BbSummarySectionComponent } from '../bb-summary-section/bb-summary-section.component';
import { BbTypeofPurchaseComponent } from '../bb-typeof-purchase/bb-typeof-purchase.component';
import { BbStickySummaryComponent } from '../bb-sticky-summary/bb-sticky-summary.component';
import { NotificationErrorComponent } from '../../widget/notification-error/notification-error.component';
import { FooterComponent } from '../../../Footer/footer.component';
import { AgentFooterComponent } from '../../../Footer/agent-footer/agent-footer.component';
import { NoteSectionComponent } from '../../dumb-components/note-section/note-section.component';
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { FooterDownloadComponent } from '../../../Footer/Download/download.component';
import { SocialMediaComponent } from '../../../Footer/SocialMedia/socialmedia.component';
import { AppService } from '../../../Service/app.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../Service/redirection.service';
import { Broadcaster } from '../../../Model/broadcaster.model';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { PlanTableComparisionService } from '../../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.service';
import { NotificationPopupEvent } from '../../../Service/broadcaster.service';
import { CookieService } from 'ngx-cookie-service';
import { RendererService } from '../../../Service/renderer.service';
import { MsisdnInputComponent } from '../../widget/msisdn-input/msisdn-input.component';
import { NricInputComponent } from '../../widget/nric-input/nric-input.component';
import { OtpInputComponent } from '../../widget/otp-input/otp-input.component';
import { FormsModule } from '@angular/forms';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { BbDeviceDetailsService } from './bb-device-details.service';
import { Observable } from 'rxjs';
import { BroadbandService } from '../../../Service/broadband.service';
import { UserService } from '../../../Service/user.service';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';
let MockResp: any = [{
  status: false,
  code: "200"
}];

class MockactivatedRoute {
  snapshot(url: string) {
    return url;
  }
}
class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}
class MockBbDeviceDetailsService{
  Find(){
    return Observable.of(MockResp);
  }
}

describe('BbDeviceDetailsComponent', () => {
  let component: BbDeviceDetailsComponent;
  let fixture: ComponentFixture<BbDeviceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        IconModule,
        materialModules,
      ],
      declarations: [BbDeviceDetailsComponent, BreadcrumbComponent, PageLoaderComponent, DeviceSliderComponent,
        BbDeviceNamePriceComponent, BbDeviceColorComponent, BbDeviceStockCheckComponent, DeviceMoreDetailsComponent,
        DetailBannerTextLeftComponent, BbPlanSectionComponent, BbSummarySectionComponent, BbTypeofPurchaseComponent,
        BbStickySummaryComponent, NotificationErrorComponent, FooterComponent, AgentFooterComponent, NoteSectionComponent,
        AgeEligibilityPopupComponent, FooterDownloadComponent, SocialMediaComponent, NricInputComponent,
        MsisdnInputComponent, OtpInputComponent, 
        sharedPipes,
      ],
      providers: [AppService, HttpClient, HttpHandler, DeviceDataService, RedirectionService, Broadcaster,
        { provide: ActivatedRoute, useClass: MockactivatedRoute }, { provide: Router, useClass: RouterStub },
        SeoService, DecimalPipe, PlanTableComparisionService, NotificationPopupEvent, CookieService, CommonUtilService,
         RendererService, EStoreAnalysticsService, AnalyticsService,
         UserService,
      ]
    }).overrideComponent(BbDeviceDetailsComponent,{
      set:{
        providers:[{provide:BbDeviceDetailsService,useClass:MockBbDeviceDetailsService},
          BroadbandService, UserService
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbDeviceDetailsComponent);
    component = fixture.componentInstance;
  });
  it('BbDeviceDetailsComponent should create', () => {
    expect(component).toBeTruthy();
  });
  // it('check csAgent is true if sessionStorage contains "AgentInfo"', () => {
  //   if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
  //     expect(component.isCSAgentDealer).toBe(true);
  //   }
  // });
  it('should test ngonit function', () => {
    sessionStorage.setItem('AgentInfo',"true");
    component.ngOnInit();
    expect(component.isCSAgentDealer).toBeTruthy();
    sessionStorage.removeItem('AgentInfo');
  });
  it('should test ngonit function',inject([DeviceDataService],(deviceDataService:DeviceDataService) => {
    sessionStorage.setItem('AgentInfo',"true");
    component.ngOnInit();
    deviceDataService.publishDevicePrice(100);
    deviceDataService.publishMonthlyPay(200);
    deviceDataService.publishErrorNotificationBoolean(false);

    expect(component.isCSAgentDealer).toBeTruthy();
    expect(component.showErrorToaster).toBeFalsy();
    // setTimeout(() => {
    //   expect(component.devicePrice).toBe(100);  
    // },0);
    sessionStorage.removeItem('AgentInfo');
  }));
  it('should test getDeviceDetails function',inject([DeviceDataService],(deviceDataService:DeviceDataService) => {
    sessionStorage.setItem('AgentInfo',"true");
    component.getDeviceDetails("test",false);
    expect(component.DealerPopupType.isEligibleByAge).toBeFalsy();
    sessionStorage.removeItem('AgentInfo');
  }));
  it('should test getDeviceDetails function',inject([DeviceDataService],(deviceDataService:DeviceDataService) => {
    MockResp = [{
      status:false,
      code:404
    }]
    sessionStorage.setItem('AgentInfo',"true");
    component.getDeviceDetails("test",false);
    // expect(component.DealerPopupType.isEligibleByAge).toBeFalsy();
    sessionStorage.removeItem('AgentInfo');
  }));
  it('should test getDeviceDetails function',inject([DeviceDataService],(deviceDataService:DeviceDataService) => {
    MockResp = [{
      status:true,
      code:404,
      device_product_details:[{
        color:"white",
        rrp:"100"
      }]
    }]
    sessionStorage.setItem('AgentInfo',"true");
    component.bbDeviceDetailsData = {
      device_product_details:[{
        color:"white",
        rrp:"100"
      }]
    }
    component.bbBundleBasicDetails = {
      default_selected_color:"white"
    }
    component.getDeviceDetails("test",false);
    // expect(component.DealerPopupType.isEligibleByAge).toBeFalsy();
    sessionStorage.removeItem('AgentInfo');
  }));
  it('should test getDeviceDetails function',inject([DeviceDataService],(deviceDataService:DeviceDataService) => {
    component.bbDeviceDetailsData = {
      device_product_details:[{
        color:"white",
        rrp:"100"
      }]
    }
    sessionStorage.setItem('AgentInfo',"true");
    component.onSelectedColor("white");
    // expect(component.DealerPopupType.isEligibleByAge).toBeFalsy();
    sessionStorage.removeItem('AgentInfo');
  }));
});
