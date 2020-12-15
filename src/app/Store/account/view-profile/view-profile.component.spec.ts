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
import { ViewProfileComponent } from './view-profile.component';
import { CheckoutService } from '../../checkout/services/checkout.service';
import { CheckoutHeroBannerComponent } from '../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component';
import { SharedModule } from "../../../shared/shared-module.module";
import { Observable, of } from 'rxjs';
import { ViewProfileService } from './view-profile.service';

class RouterStub {
    routerState = {
        snapshot: {
            url: ''
        }
    };

    navigate(url: string) {
        return url;
    }

    navigateByUrl(url: string) {
        return url;
    }
}

class MockactivatedRoute {
    data = new Observable(observer => {
        const data = {
        test: "test"
        };
        observer.next(data);
        observer.complete();
    });
  
    snapshot(url: string) {
        return url;
    }
}

describe('ViewProfileComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;
    let component: ViewProfileComponent;
    let fixture: ComponentFixture<ViewProfileComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, SharedModule],
            declarations: [ViewProfileComponent, MinifiedPageLoaderComponent, FooterComponent, AgentFooterComponent, SocialMediaComponent,
                FooterDownloadComponent, NotificationErrorComponent, AgeEligibilityPopupComponent, CheckoutHeroBannerComponent],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute },
                { provide: AppService, useClass: AppMockService },
                { provide: Router, useClass: RouterStub },
                { provide: ActivatedRoute, useClass: MockactivatedRoute },
                EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
                OrderInfoService, HeaderService, RedirectionService, SupplimentaryLinesService, HttpClient, BroadbandService,
                DeviceDataService, CommonUtilService, CheckoutService, ViewProfileService]
        })
            .compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(ViewProfileComponent);
        component = fixture.componentInstance;
    }));

    afterEach(async(() => {
        sessionStorage.clear();
    }));

    it('should create View Profile component', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit with AgentInfo', () => {
        const spy = spyOn(component, 'ngOnInit').and.callThrough();

        sessionStorage.setItem('AgentInfo', JSON.stringify({ test: 'test' }));
        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
    });


    it('should call ngOnInit with DealerInfo', () => {
        const spy = spyOn(component, 'ngOnInit').and.callThrough();


        sessionStorage.setItem('DealerInfo', JSON.stringify({ test: 'test' }));
        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
    });


    it('should call ngOnInit with UserInfo', () => {
        const spy = spyOn(component, 'ngOnInit').and.callThrough();

        sessionStorage.setItem('UserInfo', JSON.stringify({ outputCPResp: { data: 'test', state: 'PJ' } }));
        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
    });


    it('should call ngOnInit with GuestInfo', () => {
        const spy = spyOn(component, 'ngOnInit').and.callThrough();

        sessionStorage.setItem('GuestInfo', JSON.stringify({ test: 'test' }));
        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
    });

    it('should call ngAfterViewInit', () => {
        const spy = spyOn(component, 'ngAfterViewInit');
        component.ngOnInit();
        component.ngAfterViewInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should call applyVoucher', () => {
        const appService = fixture.debugElement.injector.get(AppService);
        const spy = spyOn(component, 'applyVoucher').and.callThrough();
        spyOn(appService, "postEstoreUserData").and.returnValue(
            Observable.of([{status:"true"}]));
        
        component.applyVoucher('voucher_test_code');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('should call closeRedeemModal', () => {
        const spy = spyOn(component, 'closeRedeemModal').and.callThrough();

        component.closeRedeemModal();
        expect(spy).toHaveBeenCalled();
    });

    it('should call getStateName', () => {
        const spy = spyOn(component, 'getStateName').and.callThrough();

        component.getStateName('');
        expect(spy).toHaveBeenCalled();
    });

    it('should call numPages', () => {
        const spy = spyOn(component, 'numPages').and.callThrough();

        component.numPages();
        expect(spy).toHaveBeenCalled();
    });

    it('should call onRedeemedPageClick page 0', () => {
        const spy = spyOn(component, 'onRedeemedPageClick').and.callThrough();

        component.onRedeemedPageClick(0);
        expect(spy).toHaveBeenCalled();
    });

    it('should call onRedeemedPageClick page 2', () => {
        const spy = spyOn(component, 'onRedeemedPageClick').and.callThrough();

        component.itemsPerPage = 2;
        component.filteredRedeemedItems = [{test:"test 1"}, {test : "test 2"}, {test : "test 3"}, {test : "test 4"}];
        component.onRedeemedPageClick(1);
        expect(spy).toHaveBeenCalled();
    });

    it('should call onVoucherTabChange - offerings', () => {
        const spy = spyOn(component, 'onVoucherTabChange').and.callThrough();

        component.onVoucherTabChange('offerings');
        expect(spy).toHaveBeenCalled();
    });

    it('should call onVoucherTabChange - redeemed', () => {
        const spy = spyOn(component, 'onVoucherTabChange').and.callThrough();

        component.onVoucherTabChange('redeemed');
        expect(spy).toHaveBeenCalled();
    });

    it('should call onProfileTabChange - profile', () => {
        const spy = spyOn(component, 'onProfileTabChange').and.callThrough();

        component.onProfileTabChange('profile');
        expect(spy).toHaveBeenCalled();
    });

    it('should call onProfileTabChange - voucher', () => {
        const spy = spyOn(component, 'onProfileTabChange').and.callThrough();

        component.onProfileTabChange('voucher');
        expect(spy).toHaveBeenCalled();
    });

    it('should call onProfileTabChange - order_history', () => {
        const spy = spyOn(component, 'onProfileTabChange').and.callThrough();

        component.onProfileTabChange('order_history');
        expect(spy).toHaveBeenCalled();
    });

    it('should call loadMore', () => {
        const spy = spyOn(component, 'loadMore').and.callThrough();
        component.limit = 10;
        component.loadMore();
        expect(spy).toHaveBeenCalled();
    });

    it('should call orderNumber', () => {
        const spy = spyOn(component, 'orderNumber').and.callThrough();
        component.orderNumber(12345);
        expect(spy).toHaveBeenCalled();
    });

    it('should call applyFilter', () => {
        const spy = spyOn(component, 'applyFilter').and.callThrough();
        component.applyFilter('12345');
        expect(spy).toHaveBeenCalled();
    });

    it('should call openSortBy', () => {
        const spy = spyOn(component, 'openSortBy').and.callThrough();
        component.hideSortBy = true;
        component.openSortBy();
        expect(spy).toHaveBeenCalled();
    });

    it('should call orderHistory - DealerInfo', () => {
        const spy = spyOn(component, 'orderHistory').and.callThrough();

        sessionStorage.setItem('DealerInfo', JSON.stringify({ test: 'test' }));
        component.orderHistory();

        expect(spy).toHaveBeenCalled();
    });

    it('should call orderHistory - AgentInfo', () => {
        const spy = spyOn(component, 'orderHistory').and.callThrough();

        sessionStorage.setItem('AgentInfo', JSON.stringify({ test: 'test' }));
        component.orderHistory();

        expect(spy).toHaveBeenCalled();
    });

    it('should call orderHistory - UserInfo', () => {
        const appService = fixture.debugElement.injector.get(AppService);
        const spy = spyOn(component, 'orderHistory').and.callThrough();
        spyOn(appService, "getEstoreUserData").and.returnValue(
            Observable.of([{status:"true"}]));
        
        sessionStorage.setItem('UserInfo', JSON.stringify({ outputCPResp: { data: 'test', state: 'PJ' } }));
        component.orderHistory();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('should call openVoucherModal', () => {
        const spy = spyOn(component, 'openVoucherModal').and.callThrough();
        component.openVoucherModal('');
        expect(spy).toHaveBeenCalled();
    });

    it('should call loadVoucherDetails', () => {
        const appService = fixture.debugElement.injector.get(AppService);
        const spy = spyOn(component, 'loadVoucherDetails').and.callThrough();
        spyOn(appService, "getEstoreUserData").and.returnValue(
            Observable.of([
            {
                "status": "true", 
                "Name": "TQA TEST2",
                "Email": "testdata2@getnada.com",
                "Gender": "Male",
                "Salutation": "Mr",
                "alternate_contact_number": null,
                "Mobile_Number": "601823456789",
                "Id_Type": false,
                "Id_Number": "830622075282",
                "preferable_contact_method": false,
                "Default_Billing_Address": {
                    "entity_id": "13945",
                    "increment_id": null,
                    "parent_id": "5155",
                    "created_at": "2020-06-01 03:35:15",
                    "updated_at": "2020-06-01 03:35:15",
                    "is_active": "1",
                    "city": "SUBANG JAYA",
                    "company": null,
                    "country_id": "MY",
                    "fax": null,
                    "firstname": "TQA",
                    "lastname": "TEST2",
                    "middlename": null,
                    "postcode": "47300",
                    "prefix": null,
                    "region": "Selangor",
                    "region_id": "544",
                    "street": "Jalan Delima 1/1",
                    "suffix": null,
                    "telephone": "601823456789",
                    "vat_id": null,
                    "vat_is_valid": null,
                    "vat_request_date": null,
                    "vat_request_id": null,
                    "vat_request_success": null,
                    "residence_type": "High-Rise",
                    "salutation": "Mr",
                    "unit_number": "Lot 34",
                    "attributes": {
                        "entity_type_id": {},
                        "attribute_set_id": {},
                        "created_at": {},
                        "updated_at": {},
                        "parent_id": {},
                        "increment_id": {},
                        "entity_id": {},
                        "prefix": {},
                        "firstname": {},
                        "middlename": {},
                        "lastname": {},
                        "residence_type": {},
                        "salutation": {},
                        "unit_number": {},
                        "suffix": {},
                        "company": {},
                        "street": {},
                        "city": {},
                        "country_id": {},
                        "region": {},
                        "region_id": {},
                        "postcode": {},
                        "telephone": {},
                        "fax": {},
                        "vat_is_valid": {},
                        "vat_request_id": {},
                        "vat_request_date": {},
                        "vat_request_success": {},
                        "vat_id": {},
                        "alternate_contact_number": {}
                    }
                },
                "ActiveContract": { 
                    start_date: "2018-10-17 05:31:41",
                    end_date: "2019-06-19 08:40:20",
                },
                voucher_details: [
                    {
                        readme : "1"
                    }, 
                    {
                        readme : "0"
                    }
                ]
            }
        ]));

        sessionStorage.setItem('DealerInfo', JSON.stringify({ test: 'test', services: [{ mobileNumber: '12345' }] }));
        component.ProfileDataFromStorage = {services: [{mobileNumber:"3234354"}]};
        component.isCSAgentDealer = undefined;

        component.loadVoucherDetails();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('should call loadVoucherDetails pagination', () => {
        const appService = fixture.debugElement.injector.get(AppService);
        const spy = spyOn(component, 'loadVoucherDetails').and.callThrough();
        spyOn(appService, "getEstoreUserData").and.returnValue(
            Observable.of([
                { 
                    "status": "true", 
                    "Name": "TQA TEST2",
                    "Email": "testdata2@getnada.com",
                    "Gender": "Male",
                    "Salutation": "Mr",
                    "alternate_contact_number": null,
                    "Mobile_Number": "601823456789",
                    "Id_Type": false,
                    "Id_Number": "830622075282",
                    "preferable_contact_method": false,
                    "Default_Billing_Address": {
                        "entity_id": "13945",
                        "increment_id": null,
                        "parent_id": "5155",
                        "created_at": "2020-06-01 03:35:15",
                        "updated_at": "2020-06-01 03:35:15",
                        "is_active": "1",
                        "city": "SUBANG JAYA",
                        "company": null,
                        "country_id": "MY",
                        "fax": null,
                        "firstname": "TQA",
                        "lastname": "TEST2",
                        "middlename": null,
                        "postcode": "47300",
                        "prefix": null,
                        "region": "Selangor",
                        "region_id": "544",
                        "street": "Jalan Delima 1/1",
                        "suffix": null,
                        "telephone": "601823456789",
                        "vat_id": null,
                        "vat_is_valid": null,
                        "vat_request_date": null,
                        "vat_request_id": null,
                        "vat_request_success": null,
                        "residence_type": "High-Rise",
                        "salutation": "Mr",
                        "unit_number": "Lot 34",
                        "attributes": {
                            "entity_type_id": {},
                            "attribute_set_id": {},
                            "created_at": {},
                            "updated_at": {},
                            "parent_id": {},
                            "increment_id": {},
                            "entity_id": {},
                            "prefix": {},
                            "firstname": {},
                            "middlename": {},
                            "lastname": {},
                            "residence_type": {},
                            "salutation": {},
                            "unit_number": {},
                            "suffix": {},
                            "company": {},
                            "street": {},
                            "city": {},
                            "country_id": {},
                            "region": {},
                            "region_id": {},
                            "postcode": {},
                            "telephone": {},
                            "fax": {},
                            "vat_is_valid": {},
                            "vat_request_id": {},
                            "vat_request_date": {},
                            "vat_request_success": {},
                            "vat_id": {},
                            "alternate_contact_number": {}
                        }
                    },
                    "ActiveContract": { 
                        start_date: "2018-10-17 05:31:41",
                        end_date: "2019-06-19 08:40:20",
                    },
                    "voucher_details": [{readme : "1"}, {readme : "1"}, {readme : "1"}, {readme : "1"}, {readme : "1"},{readme : "1"}]
                }
            ]));

        sessionStorage.setItem('DealerInfo', JSON.stringify({ test: 'test', services: [{ mobileNumber: '12345' }] }));
        component.ProfileDataFromStorage = {services: [{mobileNumber:"3234354"}]};
        component.isCSAgentDealer = undefined;

        component.loadVoucherDetails();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('should call ngAfterViewInit', () => {
        const spy = spyOn(component, 'ngAfterViewInit').and.callThrough();
        component.ngAfterViewInit();
        expect(spy).toHaveBeenCalled();
    });
});
