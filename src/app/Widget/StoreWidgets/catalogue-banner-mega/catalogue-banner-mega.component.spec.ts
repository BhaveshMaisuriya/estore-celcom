/*import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
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
import { DecimalPipe, getLocaleDateFormat } from '@angular/common';
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../Service/user.service';
import { CartService } from '../../../Service/cart.service';
import { BundleService } from '../../../Service/bundle.service';
import { OrderInfoService } from '../../../Service/orderinfo.service';
import { HeaderService } from '../../../Header/header.service';
import { RedirectionService } from '../../../Service/redirection.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BroadbandService } from '../../../Service/broadband.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { CheckoutHeroBannerComponent } from '../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component';
import { CatalogueBannerMegaComponent } from './catalogue-banner-mega.component';
import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';
import { HomeService } from '../../../Service/home.service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { getLocaleDateTimeFormat, FormatWidth } from '@angular/common';

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
describe('CatalogueBannerMegaComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;
    let component: CatalogueBannerMegaComponent;
    let fixture: ComponentFixture<CatalogueBannerMegaComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule],
            declarations: [CatalogueBannerMegaComponent, MinifiedPageLoaderComponent, FooterComponent,
                AgentFooterComponent, SocialMediaComponent,
                FooterDownloadComponent, CheckoutHeroBannerComponent],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: AppService, useClass: AppMockService },
            { provide: Router, useClass: RouterStub },
            {
                provide: ActivatedRoute, useClass: MockactivatedRoute
            }, EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
                OrderInfoService, HeaderService, RedirectionService, HttpClient, BroadbandService,
                DeviceDataService, CommonUtilService, RemarketAnalyticsService, HomeService,
                GetParametersService]
        })
            .compileComponents();
    }));
    beforeEach(async(() => {
        fixture = TestBed.createComponent(CatalogueBannerMegaComponent);
        component = fixture.componentInstance;
    }));
    it('should create catalogue banner mega component', () => {
        expect(component).toBeTruthy();
    });
    it('should call ngOninit()', () => {
        expect(component.ngOnInit).toBeDefined();
        component.ngOnInit();
    });

    it('Checking sessionStorage for catalogue banner mega component  ', () => {
        sessionStorage.setItem("UserInfo", "abc");
        component.ngOnInit();
        expect(component.showLogin).toBeFalsy();
    });
    it('Checking sessionStorage for cs-agent ', () => {
        sessionStorage.setItem("AgentInfo", "cs-agent");
        component.ngOnInit();
        expect(component.isCSAgent).toBe(component.csAgent);
    });
    it('Checking sessionStorage for non cs agent', () => {
        sessionStorage.removeItem("AgentInfo");
        component.ngOnInit();
        expect(component.isCSAgent).toBe(component.notCSAgent);
    });
    // fit('check current date should be greter than or equal to min date', () => {
    //     const currentDate = new Date('August 15 2018 12:00');
    //     const minDate = new Date('August 10 2018 12:00');
    //     const maxDate = new Date('August 20 2018 00:00');
    //     component.ngOnInit();
    //     expect(currentDate).toMatch(minDate);
    //     expect(currentDate).toMatch(maxDate);
    //     expect(component.isPreOrder).toBeTruthy();
    // });
    // it('check current date should be less than or equal to max date', () => {
    //     const currentDate = new Date('August 5 2018 12:00');
    //     const minDate = new Date('August 10 2018 12:00');
    //     const maxDate = new Date('August 20 2018 00:00');
    //     component.ngOnInit();
    //     expect(currentDate).toMatch(minDate);
    //     expect(currentDate).toMatch(maxDate);
    //     expect(component.isPreOrder).toBeFalsy();
    // });
    // });
});*/
