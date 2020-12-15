import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { MinifiedPageLoaderComponent } from "../../../Store/widget/minified-page-loader/minified-page-loader.component";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "../../../Footer/footer.component";
import { AgentFooterComponent } from "../../../Footer/agent-footer/agent-footer.component";
import { SocialMediaComponent } from "../../../Footer/SocialMedia/socialmedia.component";
import { FooterDownloadComponent } from "../../../Footer/Download/download.component";
import { AppService } from "../../../Service/app.service";
import { AppMockService } from "../../../Service/appmock.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EStoreAnalysticsService } from "../../../Service/store.analytic.service";
import { AnalyticsService } from "../../../Service/analytic.service";
import { RendererService } from "../../../Service/renderer.service";
import { SeoService } from "../../../Service/seo.service";
import { DecimalPipe } from "@angular/common";
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs/Rx";
import { UserService } from "../../../Service/user.service";
import { CartService } from "../../../Service/cart.service";
import { BundleService } from "../../../Service/bundle.service";
import { OrderInfoService } from "../../../Service/orderinfo.service";
import { HeaderService } from "../../../Header/header.service";
import { RedirectionService } from "../../../Service/redirection.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BroadbandService } from "../../../Service/broadband.service";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { CheckoutHeroBannerComponent } from "../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component";
import { RemarketAnalyticsService } from "../../../Service/remarket-analytics.service";
import { HomeService } from "../../../Service/home.service";
import { GetParametersService } from "../../../Service/getParamaters.service";
import { HeroBannerClickableComponent } from "./hero-banner-clickable.component";
import { HeroBannerClickableService } from "./hero-banner-clickable.service";
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { NotificationErrorComponent } from "../../../Store/widget/notification-error/notification-error.component";
import { AgeEligibilityPopupComponent } from "../../../Store/widget/age-eligibility-popup/ageeligiblity.popup.component";
import { SupplimentaryLinesService } from "../../../Store/widget/supplementary-lines/supplementary-lines.service";
import { DeviceDetailsStorageService } from "../device-details/device-details-color-storage/device-details-color-storage.service";
import { CheckoutService } from "../../../Store/checkout/services/checkout.service";
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { materialModules } from 'app/shared/shared-module.module';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}
class MockactivatedRoute {
  snapshot(url: string) {
    return url;
  }
}

const resp = {
  Name: "heroBanner_img_clickable",
  Api:
    "api/content_details"
};
describe("HeroBannerClickableComponent ", () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  let component: HeroBannerClickableComponent;
  let fixture: ComponentFixture<HeroBannerClickableComponent>;
  let service: HeroBannerClickableService;
    const response = {Items: [
        {
            Title: "Try celcom",
            BackgroundColor: "is-bg-color-blue",
            BgImageRepeat: "0",
            BackgroundImage: "",
            BackgroundImageAlt: "",
            BackgroundImageTitle: "",
            BannerType: "Image",
            DesktopImageSvg: "",
            BannerImage: "/sites/default/files/images/logo/logo_try_celcom.png",
            BannerAlt: "try celcom",
            BannerTitle: "",
            MobileImageSvg: "",
            MobileImage: "/sites/default/files/images/logo/logo_try_celcom.png",
            MobileAlt: "try celcom",
            MobileTitle: "",
            BannerTextColor: false,
            BannerText: "",
            ButtonLink: "/personal/switch-to-celcom",
            ButtonText: "Make the switch",
            ButtonAnalytic: "",
            ButtonLinkAbsolute: "https://www.celcom.com.my/personal/switch-to-celcom"
        }
    ]};
    const MockBannerService = {
        Find: jasmine.createSpy('Find').and.returnValue(Observable.of(response))
    };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, materialModules],
      declarations: [
        HeroBannerClickableComponent,
        MinifiedPageLoaderComponent,
        FooterComponent,
        AgentFooterComponent,
        SocialMediaComponent,
        PageLoaderComponent,
        FooterDownloadComponent,
        NotificationErrorComponent,
        AgeEligibilityPopupComponent,
        CheckoutHeroBannerComponent,
        SafeHtmlPipe
      ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: AppService, useClass: AppMockService },
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useClass: MockactivatedRoute
        },
        EStoreAnalysticsService,
        AnalyticsService,
        RendererService,
        SeoService,
        DecimalPipe,
        Broadcaster,
        NotificationPopupEvent,
        CookieService,
        UserService,
        CartService,
        BundleService,
        OrderInfoService,
        HeaderService,
        RedirectionService,
        SupplimentaryLinesService,
        HttpClient,
        BroadbandService,
        DeviceDataService,
        CommonUtilService,
        CheckoutService,
        DeviceDetailsStorageService,
        RemarketAnalyticsService,
        HomeService,
        GetParametersService,
        { provide: HeroBannerClickableService, useValue: MockBannerService }
      ]
    }).compileComponents();
  }));
  beforeEach(inject([HeroBannerClickableService], (heroBannerClickableService) => {
    service = heroBannerClickableService;
    fixture = TestBed.createComponent(HeroBannerClickableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it("should create hero banner clickable component", () => {
    expect(component).toBeTruthy();
  });
});
