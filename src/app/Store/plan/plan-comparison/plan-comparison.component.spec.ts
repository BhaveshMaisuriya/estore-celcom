import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MinifiedPageLoaderComponent } from '../../../Store/widget/minified-page-loader/minified-page-loader.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../Footer/footer.component';
import { AgentFooterComponent } from '../../../Footer/agent-footer/agent-footer.component';
import { SocialMediaComponent } from '../../../Footer/SocialMedia/socialmedia.component';
import { FooterDownloadComponent } from '../../../Footer/Download/download.component';
import { AppService } from '../../../Service/app.service';
import { AppMockService } from '../../../Service/appmock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../Service/user.service';
import { CartService } from '../../../Service/cart.service';
import { BundleService } from '../../../Service/bundle.service';
import { OrderInfoService } from '../../../Service/orderinfo.service';
import { HeaderService } from '../../../Header/header.service';
import { RedirectionService } from '../../../Service/redirection.service';
import { SupplimentaryLinesService } from '../../widget/supplementary-lines/supplementary-lines.service';
import { NotificationErrorComponent } from '../../widget/notification-error/notification-error.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BroadbandService } from '../../../Service/broadband.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { PlanTableComparisonComponent } from '../../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.component';
import { HeroBannerCarouselComponent } from '../../../Widget/HeroBannerCarousel/herobanner.carousel.component';
import { HeroBannerImageClickableComponent } from '../../../Widget/HeroBannerImageClickable/hero-banner-image-clickable.component';
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { HomeService } from '../../../Service/home.service';
import { PlanComparisonComponent } from './plan-comparison.component';
import { CompareHeroBannerComponent } from '../../../Widget/StoreWidgets/compare-hero-banner/compare-hero-banner.component';
import { PlanDeviceComparisonComponent } from '../../../Widget/StoreWidgets/plan-device-comparison/plan-device-comparison.component';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

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
describe('PlanComparisonComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
      } as ActivatedRoute;
    let component: PlanComparisonComponent;
    let fixture: ComponentFixture<PlanComparisonComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule],
            declarations: [PlanComparisonComponent, FooterComponent, AgentFooterComponent, SocialMediaComponent,
                FooterDownloadComponent, NotificationErrorComponent, PlanTableComparisonComponent, HeroBannerCarouselComponent,
             HeroBannerImageClickableComponent, AgeEligibilityPopupComponent, CompareHeroBannerComponent, PlanDeviceComparisonComponent,
            SafeHtmlPipe],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: AppService, useClass: AppMockService },
            { provide: Router, useClass: RouterStub },
            {
                provide: ActivatedRoute, useClass: MockactivatedRoute
            }, EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
             OrderInfoService, HeaderService, RedirectionService, SupplimentaryLinesService, HttpClient, BroadbandService,
              DeviceDataService, HomeService]
        })
            .compileComponents();
    }));
    beforeEach(async(() => {
        fixture = TestBed.createComponent(PlanComparisonComponent);
        component = fixture.componentInstance;
    }));
   it('should create Plan Comparison component', () => {
        expect(component).toBeTruthy();
    });
});
