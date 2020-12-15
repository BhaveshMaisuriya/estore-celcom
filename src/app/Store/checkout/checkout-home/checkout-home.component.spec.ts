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
import { CheckoutHomeComponent } from './checkout-home.component';
import { OrderFilter } from '../../shared/order-filter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { materialModules } from 'app/shared/shared-module.module';

class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
    url = '#test';
}
class MockactivatedRoute {
    snapshot(url: string) {
        return url;
    }
}
const mockRouterService = {
    getPreviousUrl: () => {}
  };
describe('CheckoutHomeComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
      } as ActivatedRoute;
    let component: CheckoutHomeComponent;
    let fixture: ComponentFixture<CheckoutHomeComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, RouterTestingModule, materialModules],
            declarations: [CheckoutHomeComponent, MinifiedPageLoaderComponent, FooterComponent,
                 AgentFooterComponent, SocialMediaComponent, PageLoaderComponent,
                FooterDownloadComponent, NotificationErrorComponent, AgeEligibilityPopupComponent, CheckoutHeroBannerComponent,
                 OrderFilter, SafeHtmlPipe],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: AppService, useClass: AppMockService },
            { provide: Router, useClass: RouterStub },
            {
                provide: ActivatedRoute, useClass: MockactivatedRoute
            }, EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
             OrderInfoService, HeaderService, RedirectionService, SupplimentaryLinesService, HttpClient, BroadbandService,
              DeviceDataService, CommonUtilService, CheckoutService, RemarketAnalyticsService, HomeService,
             GetParametersService, { provide: RouterService, useValue: mockRouterService }]
        })
            .compileComponents();
    }));
    beforeEach(async(() => {
        fixture = TestBed.createComponent(CheckoutHomeComponent);
        component = fixture.componentInstance;
    }));
    it('should create Checkout home component', () => {
        expect(component).toBeTruthy();
    });
    it('should call ngOninit()', () => {
        expect(component.ngOnInit).toBeDefined();
    });
    it('should check csAgent is true if sessionStorage contains AgentInfo', () => {
        if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo")
        || sessionStorage.getItem("DealerInfo"))) {
          expect(component.isCSAgentDealer).toBe(true);
        }
      });
    it('Set Guest information' , () => {
        if (typeof window !== 'undefined') {
            if (sessionStorage && sessionStorage.getItem("UserInfo") != null) {
                const userInfo =  sessionStorage.getItem("UserInfo");
                const userType = sessionStorage.getItem('USER_TYPE');
                const guestUser = sessionStorage.getItem("OLD_GUEST_USER");
                expect(userInfo).toBeDefined();
            }
        }
    });
    it('should checkout cart navigateurl', () => {
        if (typeof window !== 'undefined' && localStorage && component.cart && localStorage.getItem('MNP-FLOW') !== 'YES') {
            expect(component.cart).toBe(false);
            expect(component.cart.grossTotal).toBe(false);
            fixture.detectChanges();
            expect(component).toHaveBeenCalledWith("/store/cart");
        }
    });

    // it('should persist cart details for empty cart', () => {
    //     const response = [];
    //     component.persistingCartDetails();
    //     expect(component.cart).toBe(null);
    // });
    // it('should persist cart details with items in the cart', () => {
    //     component.persistingCartDetails();
    //     expect(component.cart).toBeTruthy();
    //     expect(component.suppData).toBeDefined();
    //     // expect(component.taxs).toBe([]);
    //     expect(component.cartServic).toBeFalsy();
    // });
    it('should test ngoninit function', () => {
        sessionStorage.setItem('AgentInfo',JSON.stringify('true'));
        sessionStorage.setItem('UserInfo',JSON.stringify('true'));
        sessionStorage.setItem('CAorderId',JSON.stringify('true'));
        sessionStorage.setItem('secretKey',JSON.stringify('true'));
        localStorage.setItem('MyMsIsdn',JSON.stringify('123456789'));
        localStorage.setItem('MNP-FLOW',JSON.stringify('true'));
        component.ngOnInit();
        sessionStorage.removeItem('AgentInfo');
        sessionStorage.removeItem('UserInfo');
        sessionStorage.removeItem('CAorderId');
        sessionStorage.removeItem('secretKey');
        localStorage.removeItem('MyMsIsdn');
        localStorage.removeItem('MNP-FLOW');
        // expect(component.getMnpClass).toBeDefined();
    });
    it('should test getMnpClass function with return blank', () => {
        let result = component.getMnpClass();
        expect(result).toBe('');
    });
    it('should test getMnpClass function with return is-mnp', () => {
        component.isMnp = true;
        let result = component.getMnpClass();
        expect(result).toBe('is-mnp');
    });
    it('should test isActive function', () => {
        component.isMnp = true;

        let result = component.isActive('#test');
        expect(result).toBe('is-step-active');
    });
    it('should test isActive function', () => {
        // component.isMnp = true;
        let result = component.isActive('test');
        expect(result).toBe('');
    });

    // it('should return isMnp is-mnp', () => {
    //     expect(component.isMnp).toBeTruthy();
    // });
});
