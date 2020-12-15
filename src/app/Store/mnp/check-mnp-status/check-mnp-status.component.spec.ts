import { async, ComponentFixture, TestBed, inject, tick, fakeAsync, flush } from '@angular/core/testing';
import { MinifiedPageLoaderComponent } from '../../../Store/widget/minified-page-loader/minified-page-loader.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../Footer/footer.component';
import { AgentFooterComponent } from '../../../Footer/agent-footer/agent-footer.component';
import { SocialMediaComponent } from '../../../Footer/SocialMedia/socialmedia.component';
import { FooterDownloadComponent } from '../../../Footer/Download/download.component';
import { AppService } from '../../../Service/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
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
import { CheckMnpStatusComponent } from './check-mnp-status.component';
import { NotificationErrorComponent } from '../../widget/notification-error/notification-error.component';
import { NotificationBarComponent } from '../../../../app/Store/widget/notification-bar/notification-bar.component';
import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';
import { HomeService } from '../../../Service/home.service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { MnpService } from "../services/mnp.service";
import { configureTestSuite } from 'ng-bullet';
import { Observable, Observer } from 'rxjs';
import { sharedPipes } from 'app/shared/pipes';

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

class AppMockService {
    constructor() { }

    getEstoreData(url: string) {
        if (url === '1') {
            return Observable.of([{ status: true, reponse: 'Success' }]);
        } else {
            return Observable.of([{ status: false, message: 'Failure' }]);
        }
    }

    get(url: string) {
        return Observable.of({ data: {} });
    }
}

describe('CheckMnpStatusComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;

    let component: CheckMnpStatusComponent;
    let fixture: ComponentFixture<CheckMnpStatusComponent>;

    const response = [
        {
            "status": true,
            "mobileNumber": "01122324444",
            "customerIDType": "1",
            "customerIDNo": "711111765757",
        }];

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule],
            declarations: [sharedPipes, CheckMnpStatusComponent, MinifiedPageLoaderComponent, FooterComponent,
                AgentFooterComponent, SocialMediaComponent,
                FooterDownloadComponent, CheckoutHeroBannerComponent, NotificationErrorComponent,
                NotificationBarComponent],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute },
            { provide: AppService, useClass: AppMockService },
            { provide: Router, useClass: RouterStub },
            { provide: ActivatedRoute, useClass: MockactivatedRoute },
                EStoreAnalysticsService, AnalyticsService, RendererService, SeoService, MnpService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
                OrderInfoService, HeaderService, RedirectionService, HttpClient, BroadbandService,
                DeviceDataService, CommonUtilService, RemarketAnalyticsService, HomeService,
                GetParametersService]
        });
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(CheckMnpStatusComponent);
        component = fixture.componentInstance;
    }));

    it('should create Check Mnp Status Component', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOninit()', inject([DeviceDataService], (deviceDataService: DeviceDataService) => {
        const spy = spyOn(component, 'ngOnInit').and.callThrough();
        component.ngOnInit();
        deviceDataService.publishBarNotificationBoolean(false);
        expect(spy).toHaveBeenCalled();
    }));

    it('should be valid form', fakeAsync(() => {
        const form = {
            invalid: false,
            value: {
                mobileNumber: '01122324444',
                customerIDType: '1',
                customerIDNo: '198908245757'
            }
        };

        const spy = spyOn(component, 'onSubmit').and.callThrough();
        component.onSubmit(form);
        expect(spy).toHaveBeenCalled();
    }));

    it('should be invalid form', fakeAsync(() => {
        const form = {
            invalid: true,
            value: {
                mobileNumber: '01122324444',
                customerIDType: '1',
                customerIDNo: '711111765757'
            }
        };

        const spy = spyOn(component, 'onSubmit').and.callThrough();
        component.onSubmit(form);
        expect(spy).toHaveBeenCalled();
    }));

    it('should call customerRetrieve', fakeAsync(() => {
        const spy = spyOn(component, 'customerRetrieve');
        component.customerRetrieve({});
        expect(spy).toHaveBeenCalled();
    }));

    it('should call resubmitPortIn', () => {
        const spy = spyOn(component, 'resubmitPortIn').and.callThrough();
        component.resubmitPortIn();
        expect(spy).toHaveBeenCalled();
    });
});
