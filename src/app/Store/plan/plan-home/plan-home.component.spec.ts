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
import { PlanHomeComponent } from './plan-home.component';
import { PlanTableComparisonComponent } from '../../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.component';
import { HeroBannerCarouselComponent } from '../../../Widget/HeroBannerCarousel/herobanner.carousel.component';
import { HeroBannerImageClickableComponent } from '../../../Widget/HeroBannerImageClickable/hero-banner-image-clickable.component';
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { HomeService } from '../../../Service/home.service';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
}

describe('PlanHomeComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;
    let component: PlanHomeComponent;
    let fixture: ComponentFixture<PlanHomeComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule],
            declarations: [PlanHomeComponent, FooterComponent, AgentFooterComponent, SocialMediaComponent,
                FooterDownloadComponent, NotificationErrorComponent, PlanTableComparisonComponent, HeroBannerCarouselComponent,
                HeroBannerImageClickableComponent, AgeEligibilityPopupComponent, SafeHtmlPipe],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: AppService, useClass: AppMockService },
            { provide: Router, useClass: RouterStub },
                EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
                OrderInfoService, HeaderService, RedirectionService, SupplimentaryLinesService, HttpClient, BroadbandService,
                DeviceDataService, HomeService, CommonUtilService]
        })
            .compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(PlanHomeComponent);
        component = fixture.componentInstance;
    }));

    it('should create Plan Home component', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit', () => {
        const spy = spyOn(component, 'ngOnInit').and.callThrough();
        component.ngOnInit();

        localStorage.setItem("AddToCartNotification", 'TEST');
        localStorage.setItem("lifestyleCOBP", 'TEST');
        localStorage.setItem("lifestylePlans", 'TEST');
        sessionStorage.setItem("AgentInfo", 'TEST');
        sessionStorage.setItem("DealerInfo", 'TEST');

        component.ngOnInit();
        localStorage.removeItem("AddToCartNotification");
        localStorage.removeItem("lifestyleCOBP");
        localStorage.removeItem("lifestylePlans");
        sessionStorage.removeItem("AgentInfo");
        sessionStorage.removeItem("DealerInfo");
        expect(spy).toHaveBeenCalled();
    });
});
