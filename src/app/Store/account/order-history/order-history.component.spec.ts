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
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { CheckoutService } from '../../checkout/services/checkout.service';
import { CheckoutHeroBannerComponent } from '../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';
import { HomeService } from '../../../Service/home.service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { RouterService } from '../../../Service/router.service';
import { OrderHistoryComponent } from './order-history.component';
import { componentFactoryName } from '@angular/compiler';
import { configureTestSuite } from 'ng-bullet';
import { sharedPipes } from 'app/shared/pipes';
import { materialModules } from 'app/shared/shared-module.module';

class RouterStub {
    routerState = {
        snapshot: {
            url: '#home'
        }
    };
    navigateByUrl(url: string) {
        return url;
    }

    navigate(url: string) {
        return url;
    }
}
class MockactivatedRoute {
    data = Observable.of({});
    snapshot(url: string) {
        return url;
    }
}
class MockAppService {
    getEstoreUserData(url) {
        if (url === "/rest/V1/orderList") {
            return Observable.of({ status: true });
        }
        if (url === "/rest/V1/orderList/error") {
            return Observable.throw({ error: { success: false } });
        }
        if (url === "/rest/V1/orderList/errorsuccess") {
            return Observable.throw({ error: { success: true } });
        }
    }
}
const mockRouterService = {
    getPreviousUrl: () => { }
};
describe('OrderHistoryComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;
    let component: OrderHistoryComponent;
    let fixture: ComponentFixture<OrderHistoryComponent>;
    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, materialModules],
            declarations: [sharedPipes, OrderHistoryComponent, MinifiedPageLoaderComponent, FooterComponent,
                AgentFooterComponent, SocialMediaComponent, PageLoaderComponent,
                FooterDownloadComponent, NotificationErrorComponent, AgeEligibilityPopupComponent, CheckoutHeroBannerComponent],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: AppService, useClass: MockAppService },
            { provide: Router, useClass: RouterStub },
            {
                provide: ActivatedRoute, useClass: MockactivatedRoute
            }, EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
                OrderInfoService, HeaderService, RedirectionService, SupplimentaryLinesService, HttpClient, BroadbandService,
                DeviceDataService, CommonUtilService, CheckoutService, RemarketAnalyticsService, HomeService,
                GetParametersService, { provide: RouterService, useValue: mockRouterService }]
        }).overrideComponent(OrderHistoryComponent, {
            set: {
                providers: [{ provide: AppService, useClass: MockAppService }]
            }
        });
    });
    beforeEach(async(() => {
        fixture = TestBed.createComponent(OrderHistoryComponent);
        component = fixture.componentInstance;
    }));
    it('should create order history component', () => {
        expect(component).toBeTruthy();
    });
    it('loadMore', () => {
        component.limit = 10;
        component.loadMore();
        expect(component.limit).toBe(20);
    });
    it('openSortBy', () => {
        component.applyFilter("abc");
        expect(component.hideSortBy).toBe(true);
        expect(component.filterText).toBe("abc");
        component.filterText = "";
    });
    it('openSortBy', () => {
        component.hideSortBy = true;
        component.openSortBy();
        expect(component.hideSortBy).toBe(false);
    });
    it('track order', () => {
        component.trackorderUrl = "#abc";
        component.orderNumber("ABC1234");
    });
    it('ngoninit', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        sessionStorage.setItem("AgentInfo", "abc");
        component.ngOnInit();
        sessionStorage.setItem("DealerInfo", "abc");
        component.apiUrl = "/rest/V1/orderList/error";
        component.ngOnInit();
        sessionStorage.removeItem("DealerInfo");
        sessionStorage.removeItem("AgentInfo");
        component.apiUrl = "/rest/V1/orderList/errorsuccess";
        component.ngOnInit();
        devicedataservice.publishErrorNotificationBoolean(false);
    }));
    it('afterviewinit', () => {
        component.ngAfterViewInit();
    });
});
