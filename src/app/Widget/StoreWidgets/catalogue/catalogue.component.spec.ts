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
import { HeroBannerClickableComponent } from '../../../Widget/StoreWidgets/HeroBannerClickable/hero-banner-clickable.component';

import { CatalogueBannerMegaComponent } from '../../../Widget/StoreWidgets/catalogue-banner-mega/catalogue-banner-mega.component';
import { CatalogueComponent } from '../../../Widget/StoreWidgets/catalogue/catalogue.component';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { MostPopularComponent } from '../../../Store/dumb-components/most-popular/most-popular.component';
import { AgeEligibilityPopupComponent } from '../../../Store/widget/age-eligibility-popup/ageeligiblity.popup.component';
import { NgxSiemaModule } from 'ngx-siema';
import { PreOrderComponent } from '../../../Store/dumb-components/pre-order/pre-order.component';

import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';
import { HomeService } from '../../../Service/home.service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { getLocaleDateTimeFormat, FormatWidth } from '@angular/common';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { CatalogueService } from './catalogue.service';
import { CompareProductService } from '../../../Service/compareproduct.service';
import { Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IconModule } from 'app/shared/icon.module';
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
let mockFilterCategoryResp = [{"FilterLabel":"Operating System","FilterOption":[{"label":"Android","value":"13","searchparameter":"operating_system"},{"label":"iOS","value":"12","searchparameter":"operating_system"}]},{"FilterLabel":"Brand","FilterOption":[{"label":"APPLE","value":"14","searchparameter":"brand"},{"label":"SAMSUNG","value":"15","searchparameter":"brand"},{"label":"HUAWEI","value":"16","searchparameter":"brand"},{"label":"OPPO","value":"17","searchparameter":"brand"},{"label":"VIVO","value":"18","searchparameter":"brand"},{"label":"SONY","value":"19","searchparameter":"brand"},{"label":"NUBIA","value":"87","searchparameter":"brand"}]},{"FilterLabel":"Price","FilterOption":[{"label":"From RM1 to RM500","value":"1-500","searchparameter":"price_range"},{"label":"From RM501 to RM1000","value":"501-1000","searchparameter":"price_range"},{"label":"Above RM1000","value":"1001-","searchparameter":"price_range"}]}];
let mockResp = [
    {
        "id": "546",
        "name": "Samsung Galaxy A50s",
        "sku": "samsung-galaxy-a50s-11-11",
        "mostpopular": "0",
        "price": 11,
        "bundle_price": 561,
        "default_plan": "First™ Gold Supreme",
        "plan_min_price": "128.0000",
        "device_min_price": "1,171.0000",
        "image": "/f/r/front_15_1.png",
        "sub_images": [
            "/f/r/front_15_1.png",
            "/b/a/badge_6.png"
        ],
        "pre_order_data": {
            "is_preorder": "0",
            "preorder_text": "PRE-ORDER",
            "preorder_from_date_text": "",
            "preorder_to_date_text": "",
            "preorder_from_date": "",
            "preorder_to_date": "",
            "preorder_end_flag": 0
        },
        "discount_promotion_data": {
            "discount_price_label": "11.11 Sale",
            "promotion_label": "From 11am - 2pm daily"
        },
        "is_lifestyle": 0,
        "lifestyle_hat_text1": "0",
        "lifestyle_hat_text2": "0",
        "is_easy_phone": false,
        "is_rent": false,
        "price_start_from": 0,
        "is_premium_plan": false
    },
    {
        "id": "545",
        "name": "Samsung Galaxy A30s",
        "sku": "samsung-galaxy-a30s-11-11",
        "mostpopular": "0",
        "price": 11,
        "bundle_price": 511,
        "default_plan": "First™ Gold Supreme",
        "plan_min_price": "128.0000",
        "device_min_price": "771.0000",
        "image": "/f/r/front_14_1.png",
        "sub_images": [
            "/f/r/front_14_1.png",
            "/b/a/badge_5.png"
        ],
        "pre_order_data": {
            "is_preorder": "0",
            "preorder_text": "PRE-ORDER",
            "preorder_from_date_text": "",
            "preorder_to_date_text": "",
            "preorder_from_date": "",
            "preorder_to_date": "",
            "preorder_end_flag": 0
        },
        "discount_promotion_data": {
            "discount_price_label": "11.11 Sale",
            "promotion_label": "From 11am - 2pm daily"
        },
        "is_lifestyle": 0,
        "lifestyle_hat_text1": "0",
        "lifestyle_hat_text2": "0",
        "is_easy_phone": false,
        "is_rent": false,
        "price_start_from": 0,
        "is_premium_plan": false
    },
    {
        "id": "543",
        "name": "OPPO A5 2020",
        "sku": "oppo-a5-2020-11-11",
        "mostpopular": "0",
        "price": 11,
        "bundle_price": 361,
        "default_plan": "First™ Gold Plus",
        "plan_min_price": "98.0000",
        "device_min_price": "601.0000",
        "image": "/f/r/front_12_1.png",
        "sub_images": [
            "/f/r/front_12_1.png",
            "/b/a/badge_3.png"
        ],
        "pre_order_data": {
            "is_preorder": "0",
            "preorder_text": "PRE-ORDER",
            "preorder_from_date_text": "",
            "preorder_to_date_text": "",
            "preorder_from_date": "",
            "preorder_to_date": "",
            "preorder_end_flag": 0
        },
        "discount_promotion_data": {
            "discount_price_label": "11.11 Sale",
            "promotion_label": "From 11am - 2pm daily"
        },
        "is_lifestyle": 0,
        "lifestyle_hat_text1": "0",
        "lifestyle_hat_text2": "0",
        "is_easy_phone": false,
        "is_rent": false,
        "price_start_from": 0,
        "is_premium_plan": false
    }

];
class MockCatalogueService{
    Find(url:string){
        if(url.indexOf('/rest/V1/filterOptions/5') > -1){
            return Observable.of(mockFilterCategoryResp);
        }else if(url.indexOf('/rest/V1/filter/') > -1){
            return Observable.of(mockFilterCategoryResp);
        }else if(url.indexOf('/rest/V1/devicelist/6') > -1){
            return Observable.of(mockResp);
        }

    }
}
describe('CatalogueComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;
    let component: CatalogueComponent;
    let fixture: ComponentFixture<CatalogueComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpClientTestingModule,
                NgxSiemaModule,
                
                IconModule,
                materialModules,
            ],
            declarations: [SafeHtmlPipe, MinifiedPageLoaderComponent, FooterComponent,
                AgentFooterComponent, SocialMediaComponent,
                FooterDownloadComponent, CheckoutHeroBannerComponent, HeroBannerClickableComponent, CatalogueBannerMegaComponent,
                CatalogueComponent, PageLoaderComponent, MostPopularComponent, AgeEligibilityPopupComponent, PreOrderComponent],
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
        }).overrideComponent(CatalogueComponent,{
            set:{
                providers:[{provide:CatalogueService,useClass:MockCatalogueService}, RedirectionService, CartService, CompareProductService]
            }
        })

            .compileComponents();
    }));
    beforeEach(async(() => {
        fixture = TestBed.createComponent(CatalogueComponent);
        component = fixture.componentInstance;
    }));
    it('should create Catalogue component', () => {
        expect(component).toBeTruthy();
    });
    it('should call ngOninit()', () => {
        expect(component.ngOnInit).toBeDefined();
    });
    it('should test ngOninit() funciton without localstorage', () => {
        component.ngOnInit();
        // expect(component.ngOnInit).toBeDefined();
    });
    it('should test loadMore() funciton', () => {
        component.ngOnInit();
        component.loadMore();
        expect(component.IsDisplayLoadMore).toBeFalsy();
    });
    it('should test ngOninit() funciton', () => {
        localStorage.setItem('isMviva','true');
        localStorage.setItem('mvivaSummaryMessage','true');
        localStorage.setItem('mvivaPlanUpfront','true');
        localStorage.setItem('mvivaBundleUpfront','true');
        localStorage.setItem('COBP_login_Check','true');
        localStorage.setItem('COBP_FLOW_CHECK','true');
        component.ngOnInit();
        // expect(component.ngOnInit).toBeDefined();
    });
    it('should test GetSelectedFilter() funciton', () => {
        component.ngOnInit();
        component.GetSelectedFilter();
        // expect(component.IsDisplayLoadMore).toBeFalsy();
    });
    it('should test GetSelectedFilter() funciton', () => {
        component.ngOnInit();
        component.selectFilterByOperatingSystem('android');
        component.GetSelectedFilter();
        // expect(component.IsDisplayLoadMore).toBeFalsy();
    });

    // ? Reason: The case is not longer used
    // it('should test changeFilterUrlByOperatingSystem() function', () => {
    //     component.ngOnInit();
    //     component.changeFilterUrlByOperatingSystem('android');
    //     expect(component.filterSelectionApiURL).toBe('/rest/V1/filter/operating_system=13');
    // });

    // ? Reason: The case is not longer used
    // it('should test changeFilterUrlByOperatingSystem() function', () => {
    //     component.ngOnInit();
    //     component.changeFilterUrlByOperatingSystem('ios');
    //     expect(component.filterSelectionApiURL).toBe('/rest/V1/filter/operating_system=12');
    // });

    it('should test captureQueryParams() funciton', () => {
        component.ngOnInit();
        component.captureQueryParams();
        // expect(component.filterSelectionApiURL).toBe('/rest/V1/filter/operating_system=12');
    });
    it('should test clearFilterOptions() funciton', () => {
        component.ngOnInit();
        component.clearFilterOptions();
        // expect(component.filterSelectionApiURL).toBe('/rest/V1/filter/operating_system=12');
    });
    it('should test addMoreDevice() funciton', () => {
        component.addMoreDevice();
        expect(component.classActive).toBeFalsy();
    });
    it('should test GetSelectedFilter() funciton', () => {
        component.ngOnInit();
        component.selectFilterByOperatingSystem('android');
        component.sortResults("android");
        // expect(component.IsDisplayLoadMore).toBeFalsy();
    });
    // it('should test submitOptions() funciton', () => {
    //     component.ngOnInit();
    //     component.selectFilterByOperatingSystem('android');
    //     component.submitOptions();
    //     // expect(component.IsDisplayLoadMore).toBeFalsy();
    // });
    // it('should test submitOptions() funciton', () => {
    //     component.ngOnInit();
    //     component.selectFilterByOperatingSystem('android');
    //     let data = {"id":"550","name":"iPhone XR","sku":"iPhone-XR-10-10","mostpopular":"0","price":10,"bundle_price":1310,"default_plan":"Celcom Mobile Platinum Plus","plan_min_price":"188.0000","device_min_price":"-108.0000","image":"/0/2/02._position_2_sgmy_pdp-images_11_a_iphone_11_b_2_1.png","sub_images":["/0/2/02._position_2_sgmy_pdp-images_11_a_iphone_11_b_2_1.png"],"pre_order_data":{"is_preorder":"0","preorder_text":"PRE-ORDER ENDED","preorder_from_date_text":"From","preorder_to_date_text":"to","preorder_from_date":"19 Oct 2018","preorder_to_date":"23 Oct 2018","preorder_end_flag":1},"discount_promotion_data":{"discount_price_label":"10.10 Offer","promotion_label":"Get the device at 10 RM"},"is_lifestyle":0,"lifestyle_hat_text1":"<i> Lifestyle revamp previleges<i/>","lifestyle_hat_text2":"<b> FREE Roaming in 9 ASEAN countries for 12 months<b/>","is_easy_phone":false,"is_rent":false,"price_start_from":"65","is_premium_plan":false,"isAddedToCompare":false};
    //     component.addCompareItems(data);
    //     expect((component.productsToCompare.noOfProds).length).toBe(1);
    //     // expect(component.IsDisplayLoadMore).toBeFalsy();
    // });
    // it('should test submitOptions() funciton', () => {
    //     component.ngOnInit();
    //     component.selectFilterByOperatingSystem('android');
    //     let data = {"id":"550","name":"iPhone XR","sku":"iPhone-XR-10-10","mostpopular":"0","price":10,"bundle_price":1310,"default_plan":"Celcom Mobile Platinum Plus","plan_min_price":"188.0000","device_min_price":"-108.0000","image":"/0/2/02._position_2_sgmy_pdp-images_11_a_iphone_11_b_2_1.png","sub_images":["/0/2/02._position_2_sgmy_pdp-images_11_a_iphone_11_b_2_1.png"],"pre_order_data":{"is_preorder":"0","preorder_text":"PRE-ORDER ENDED","preorder_from_date_text":"From","preorder_to_date_text":"to","preorder_from_date":"19 Oct 2018","preorder_to_date":"23 Oct 2018","preorder_end_flag":1},"discount_promotion_data":{"discount_price_label":"10.10 Offer","promotion_label":"Get the device at 10 RM"},"is_lifestyle":0,"lifestyle_hat_text1":"<i> Lifestyle revamp previleges<i/>","lifestyle_hat_text2":"<b> FREE Roaming in 9 ASEAN countries for 12 months<b/>","is_easy_phone":false,"is_rent":false,"price_start_from":"65","is_premium_plan":false,"isAddedToCompare":false};
    //     let removeProduct = {"sku":"iPhone-XR-10-10","image":"/0/2/02._position_2_sgmy_pdp-images_11_a_iphone_11_b_2_1.png","id":"550","name":"iPhone XR","price":10};
    //     component.addCompareItems(data);
    //     component.removeCompareProduct(removeProduct);
    //     expect((component.productsToCompare.noOfProds).length).toBe(0);
    //     // expect(component.IsDisplayLoadMore).toBeFalsy();
    // });
    // it('should test submitOptions() funciton', () => {
    //     component.ngOnInit();
    //     component.selectFilterByOperatingSystem('android');
    //     let data = {"id":"550","name":"iPhone XR","sku":"iPhone-XR-10-10","mostpopular":"0","price":10,"bundle_price":1310,"default_plan":"Celcom Mobile Platinum Plus","plan_min_price":"188.0000","device_min_price":"-108.0000","image":"/0/2/02._position_2_sgmy_pdp-images_11_a_iphone_11_b_2_1.png","sub_images":["/0/2/02._position_2_sgmy_pdp-images_11_a_iphone_11_b_2_1.png"],"pre_order_data":{"is_preorder":"0","preorder_text":"PRE-ORDER ENDED","preorder_from_date_text":"From","preorder_to_date_text":"to","preorder_from_date":"19 Oct 2018","preorder_to_date":"23 Oct 2018","preorder_end_flag":1},"discount_promotion_data":{"discount_price_label":"10.10 Offer","promotion_label":"Get the device at 10 RM"},"is_lifestyle":0,"lifestyle_hat_text1":"<i> Lifestyle revamp previleges<i/>","lifestyle_hat_text2":"<b> FREE Roaming in 9 ASEAN countries for 12 months<b/>","is_easy_phone":false,"is_rent":false,"price_start_from":"65","is_premium_plan":false,"isAddedToCompare":false};
    //     component.addCompareItems(data);
    //     component.removeAllCompareProducts();
    //     expect((component.productsToCompare.noOfProds).length).toBe(0);
    //     // expect(component.IsDisplayLoadMore).toBeFalsy();
    // });
    // it('should test submitOptions() funciton', () => {
    //     component.onContinueDisplay('');
    //     expect(component.isDisplayPromotionalLifeStyle).toBeFalsy();
    //     // expect(component.IsDisplayLoadMore).toBeFalsy();
    // });

});
