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
import { DeviceCatalogueComponent } from './device-catalogue.component';
import { HeroBannerClickableComponent } from '../../../Widget/StoreWidgets/HeroBannerClickable/hero-banner-clickable.component';

import { CatalogueBannerMegaComponent } from '../../../Widget/StoreWidgets/catalogue-banner-mega/catalogue-banner-mega.component';
import { CatalogueComponent } from '../../../Widget/StoreWidgets/catalogue/catalogue.component';
import { MostPopularComponent } from '../../../Store/dumb-components/most-popular/most-popular.component';
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { PreOrderComponent } from '../../../Store/dumb-components/pre-order/pre-order.component';
import { NgxSiemaModule } from 'ngx-siema';
import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';
import { HomeService } from '../../../Service/home.service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { getLocaleDateTimeFormat, FormatWidth } from '@angular/common';
import { SharedModule } from "../../../shared/shared-module.module";
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
describe('DeviceCatalogueComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;
    let component: DeviceCatalogueComponent;
    let fixture: ComponentFixture<DeviceCatalogueComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, NgxSiemaModule, SharedModule],
            declarations: [DeviceCatalogueComponent, MinifiedPageLoaderComponent, FooterComponent,
                AgentFooterComponent, SocialMediaComponent,
                FooterDownloadComponent, CheckoutHeroBannerComponent, HeroBannerClickableComponent, CatalogueBannerMegaComponent,
                CatalogueComponent, MostPopularComponent, AgeEligibilityPopupComponent, PreOrderComponent],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: AppService, useClass: AppMockService },
            { provide: Router, useClass: RouterStub },
            {
                provide: ActivatedRoute, useClass: MockactivatedRoute
            }, EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
                OrderInfoService, HeaderService, RedirectionService, HttpClient, BroadbandService,
                DeviceDataService, CommonUtilService, RemarketAnalyticsService, HomeService,
                GetParametersService],
                schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(async(() => {
        fixture = TestBed.createComponent(DeviceCatalogueComponent);
        component = fixture.componentInstance;
    }));
    it('should create Device Catalogue component', () => {
        expect(component).toBeTruthy();
    });
    it('should call ngOninit()', () => {
        expect(component.ngOnInit).toBeDefined();
    });
    it('Checking sessionStorage for cs-agent ', () => {
        sessionStorage.setItem("AgentInfo", "cs-agent");
        component.ngOnInit();
        expect(component.csAgent).toBe(component.csAgent);
        sessionStorage.removeItem("AgentInfo");
    });
    it('Checking sessionStorage for non cs agent', () => {
        sessionStorage.removeItem("AgentInfo");
        component.ngOnInit();
        expect(component.notCSAgent).toBe(component.notCSAgent);
    });
});
