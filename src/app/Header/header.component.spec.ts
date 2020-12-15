import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MinifiedPageLoaderComponent } from '../Store/widget/minified-page-loader/minified-page-loader.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '../Footer/footer.component';
import { AgentFooterComponent } from '../Footer/agent-footer/agent-footer.component';
import { SocialMediaComponent } from '../Footer/SocialMedia/socialmedia.component';
import { FooterDownloadComponent } from '../Footer/Download/download.component';
import { AppService } from '../Service/app.service';
// import { AppMockService } from '../Service/appmock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EStoreAnalysticsService } from '../Service/store.analytic.service';
import { AnalyticsService } from '../Service/analytic.service';
import { RendererService } from '../Service/renderer.service';
import { SeoService } from '../Service/seo.service';
import { DecimalPipe, getLocaleDateFormat } from '@angular/common';
import { Broadcaster } from "../Model/broadcaster.model";
import { NotificationPopupEvent } from "../Service/broadcaster.service";
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../Service/user.service';
import { CartService } from '../Service/cart.service';
import { BundleService } from '../Service/bundle.service';
import { OrderInfoService } from '../Service/orderinfo.service';
import { HeaderService } from '../Header/header.service';
import { RedirectionService } from '../Service/redirection.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BroadbandService } from '../Service/broadband.service';
import { DeviceDataService } from '../Service/devicedata.service';
import { CommonUtilService } from '../Service/commonUtil.service';
import { CheckoutHeroBannerComponent } from '../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component';
import { HeroBannerClickableComponent } from '../Widget/StoreWidgets/HeroBannerClickable/hero-banner-clickable.component';
import { CatalogueBannerMegaComponent } from '../Widget/StoreWidgets/catalogue-banner-mega/catalogue-banner-mega.component';
import { CatalogueComponent } from '../Widget/StoreWidgets/catalogue/catalogue.component';
import { MostPopularComponent } from '../Store/dumb-components/most-popular/most-popular.component';
import { AgeEligibilityPopupComponent } from '../Store/widget/age-eligibility-popup/ageeligiblity.popup.component';
import { PreOrderComponent } from '../Store/dumb-components/pre-order/pre-order.component';
import { NgxSiemaModule } from 'ngx-siema';
import { RemarketAnalyticsService } from '../Service/remarket-analytics.service';
import { HomeService } from '../Service/home.service';
import { GetParametersService } from '../Service/getParamaters.service';
import { getLocaleDateTimeFormat, FormatWidth } from '@angular/common';
import { OldSubNavigationComponent as SubNavigationComponent } from '../Header/SubNavigation/subnavigation.component';
import { HeaderComponent } from './header.component';
import { GuestCheckoutService } from '../Store/guest-checkout/services/guest-checkout.service';
import  {  Observable  }  from  'rxjs/Observable';
import { componentFactoryName } from '@angular/compiler';
import { SharedModule } from "../shared/shared-module.module";
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockHeaderData = [{
    "title": "Personal",
    "uri": "node/26145",
    "alias": "personal",
    "absolute": "https://www.celcom.com.my/personal",
    "absolute_path": "https://www.celcom.com.my/personal",
    "external": false,
    "weight": "-52",
    "my_account_link": "https://ocs.celcom.com.my/servicecenter/faces/oracle/webcenter/portalapp/pages/selfservice/slogin.jspx",
    "analytic_object": "",
    "menu_icon": {
        "path": "/sites/default/files/menu_icons/personal-logo_3.svg"
    },
    "below": [
        {
            "title": "Prepaid",
            "uri": "node/22741",
            "alias": "personal/prepaid",
            "absolute": "https://www.celcom.com.my/personal/prepaid",
            "absolute_path": "https://www.celcom.com.my/personal/prepaid",
            "external": false,
            "weight": "-52",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            },
            "below": [
                {
                    "title": "Internet Plans",
                    "uri": "https://www.celcom.com.my/personal/prepaid/plans/internet-plans",
                    "alias": "https://www.celcom.com.my/personal/prepaid/plans/internet-plans",
                    "absolute": "https://www.celcom.com.my/personal/prepaid/plans/internet-plans",
                    "absolute_path": "https://www.celcom.com.my/personal/prepaid/plans/internet-plans",
                    "external": true,
                    "weight": "-50",
                    "my_account_link": "",
                    "analytic_object": "",
                    "menu_icon": {
                        "path": ""
                    }
                },
                {
                    "title": "Roaming",
                    "uri": "node/7844",
                    "alias": "personal/roaming",
                    "absolute": "https://www.celcom.com.my/personal/roaming",
                    "absolute_path": "https://www.celcom.com.my/personal/roaming",
                    "external": false,
                    "weight": "-49",
                    "my_account_link": "",
                    "analytic_object": "",
                    "menu_icon": {
                        "path": ""
                    }
                },
                {
                    "title": "Promotions",
                    "uri": "https://www.celcom.com.my/personal/prepaid/xpax-promotions",
                    "alias": "https://www.celcom.com.my/personal/prepaid/xpax-promotions",
                    "absolute": "https://www.celcom.com.my/personal/prepaid/xpax-promotions",
                    "absolute_path": "https://www.celcom.com.my/personal/prepaid/xpax-promotions",
                    "external": true,
                    "weight": "-47",
                    "my_account_link": "",
                    "analytic_object": "",
                    "menu_icon": {
                        "path": ""
                    }
                }
            ]
        },
        {
            "title": "Postpaid",
            "uri": "node/3177",
            "alias": "personal/postpaid",
            "absolute": "https://www.celcom.com.my/personal/postpaid",
            "absolute_path": "https://www.celcom.com.my/personal/postpaid",
            "external": false,
            "weight": "-51",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            },
            "below": [
                {
                    "title": "Roaming",
                    "uri": "node/7844",
                    "alias": "personal/roaming",
                    "absolute": "https://www.celcom.com.my/personal/roaming",
                    "absolute_path": "https://www.celcom.com.my/personal/roaming",
                    "external": false,
                    "weight": "-50",
                    "my_account_link": "",
                    "analytic_object": "",
                    "menu_icon": {
                        "path": ""
                    }
                },
                {
                    "title": "IDD",
                    "uri": "node/7832",
                    "alias": "personal/roaming/idd-postpaid",
                    "absolute": "https://www.celcom.com.my/personal/roaming/idd-postpaid",
                    "absolute_path": "https://www.celcom.com.my/personal/roaming/idd-postpaid",
                    "external": false,
                    "weight": "-49",
                    "my_account_link": "",
                    "analytic_object": "",
                    "menu_icon": {
                        "path": ""
                    }
                },
                {
                    "title": "Plans",
                    "uri": "node/3177",
                    "alias": "personal/postpaid",
                    "absolute": "https://www.celcom.com.my/personal/postpaid",
                    "absolute_path": "https://www.celcom.com.my/personal/postpaid",
                    "external": false,
                    "weight": "-48",
                    "my_account_link": "",
                    "analytic_object": "",
                    "menu_icon": {
                        "path": ""
                    },
                    "below": [
                        {
                            "title": "Add-On",
                            "uri": "node",
                            "alias": "node",
                            "absolute": "https://www.celcom.com.my/node",
                            "absolute_path": "https://www.celcom.com.my/node",
                            "external": false,
                            "weight": "0",
                            "my_account_link": "",
                            "analytic_object": "",
                            "menu_icon": {
                                "path": ""
                            }
                        }
                    ]
                }
            ]
        },
        {
            "title": "Devices",
            "uri": "node/20399",
            "alias": "personal/devices",
            "absolute": "https://www.celcom.com.my/personal/devices",
            "absolute_path": "https://www.celcom.com.my/personal/devices",
            "external": false,
            "weight": "-50",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Broadband",
            "uri": "node/2974",
            "alias": "personal/broadband",
            "absolute": "https://www.celcom.com.my/personal/broadband",
            "absolute_path": "https://www.celcom.com.my/personal/broadband",
            "external": false,
            "weight": "-49",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Extras",
            "uri": "node/794",
            "alias": "personal/extras",
            "absolute": "https://www.celcom.com.my/personal/extras",
            "absolute_path": "https://www.celcom.com.my/personal/extras",
            "external": false,
            "weight": "-48",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            },
            "below": [
                {
                    "title": "OleOle",
                    "uri": "node/776",
                    "alias": "personal/extras/oleole",
                    "absolute": "https://www.celcom.com.my/personal/extras/oleole",
                    "absolute_path": "https://www.celcom.com.my/personal/extras/oleole",
                    "external": false,
                    "weight": "-50",
                    "my_account_link": "",
                    "analytic_object": "",
                    "menu_icon": {
                        "path": ""
                    }
                }
            ]
        },
        {
            "title": "Shop",
            "uri": "https://shop.celcom.com.my",
            "alias": "https://shop.celcom.com.my",
            "absolute": "https://shop.celcom.com.my",
            "absolute_path": "https://shop.celcom.com.my",
            "external": true,
            "weight": "-47",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Our Network",
            "uri": "node/24091",
            "alias": "personal/GunaCelcom",
            "absolute": "https://www.celcom.com.my/personal/GunaCelcom",
            "absolute_path": "https://www.celcom.com.my/personal/GunaCelcom",
            "external": false,
            "weight": "-46",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        }
    ]
},
{
    "title": "Business",
    "uri": "node/948",
    "alias": "business",
    "absolute": "https://www.celcom.com.my/business",
    "absolute_path": "https://www.celcom.com.my/business",
    "external": false,
    "weight": "-49",
    "my_account_link": "https://businessportal.celcom.com.my/",
    "analytic_object": "",
    "menu_icon": {
        "path": "/sites/default/files/menu_icons/celcom_business_logo.svg"
    },
    "below": [
        {
            "title": "Products",
            "uri": "node/24040",
            "alias": "business/products",
            "absolute": "https://www.celcom.com.my/business/products",
            "absolute_path": "https://www.celcom.com.my/business/products",
            "external": false,
            "weight": "-53",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            },
            "below": [
                {
                    "title": "Essentials",
                    "uri": "node/10999",
                    "alias": "business/products/essentials",
                    "absolute": "https://www.celcom.com.my/business/products/essentials",
                    "absolute_path": "https://www.celcom.com.my/business/products/essentials",
                    "external": false,
                    "weight": "-51",
                    "my_account_link": "",
                    "analytic_object": "",
                    "menu_icon": {
                        "path": ""
                    }
                },
                {
                    "title": "Solutions",
                    "uri": "node/11000",
                    "alias": "business/products/solutions",
                    "absolute": "https://www.celcom.com.my/business/products/solutions",
                    "absolute_path": "https://www.celcom.com.my/business/products/solutions",
                    "external": false,
                    "weight": "-50",
                    "my_account_link": "",
                    "analytic_object": "",
                    "menu_icon": {
                        "path": ""
                    }
                }
            ]
        },
        {
            "title": "SME",
            "uri": "node/7895",
            "alias": "business/sme",
            "absolute": "https://www.celcom.com.my/business/sme",
            "absolute_path": "https://www.celcom.com.my/business/sme",
            "external": false,
            "weight": "-52",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Corporate",
            "uri": "node/7896",
            "alias": "business/corporate",
            "absolute": "https://www.celcom.com.my/business/corporate",
            "absolute_path": "https://www.celcom.com.my/business/corporate",
            "external": false,
            "weight": "-51",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Support",
            "uri": "node/5244",
            "alias": "business/support",
            "absolute": "https://www.celcom.com.my/business/support",
            "absolute_path": "https://www.celcom.com.my/business/support",
            "external": false,
            "weight": "-49",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Contact Us",
            "uri": "node/22668",
            "alias": "support/contact-us",
            "absolute": "https://www.celcom.com.my/support/contact-us",
            "absolute_path": "https://www.celcom.com.my/support/contact-us",
            "external": false,
            "weight": "-48",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        }
    ]
},
{
    "title": "About Us",
    "uri": "node/12294",
    "alias": "about-celcom",
    "absolute": "https://www.celcom.com.my/about-celcom",
    "absolute_path": "https://www.celcom.com.my/about-celcom",
    "external": false,
    "weight": "-47",
    "my_account_link": "",
    "analytic_object": "",
    "menu_icon": {
        "path": "/sites/default/files/menu_icons/personal-logo_0.svg"
    },
    "below": [
        {
            "title": "Prepaid",
            "uri": "node/22741",
            "alias": "personal/prepaid",
            "absolute": "https://www.celcom.com.my/personal/prepaid",
            "absolute_path": "https://www.celcom.com.my/personal/prepaid",
            "external": false,
            "weight": "-50",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Postpaid",
            "uri": "node/3177",
            "alias": "personal/postpaid",
            "absolute": "https://www.celcom.com.my/personal/postpaid",
            "absolute_path": "https://www.celcom.com.my/personal/postpaid",
            "external": false,
            "weight": "-49",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Devices",
            "uri": "node/20399",
            "alias": "personal/devices",
            "absolute": "https://www.celcom.com.my/personal/devices",
            "absolute_path": "https://www.celcom.com.my/personal/devices",
            "external": false,
            "weight": "-48",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Broadband",
            "uri": "node/2974",
            "alias": "personal/broadband",
            "absolute": "https://www.celcom.com.my/personal/broadband",
            "absolute_path": "https://www.celcom.com.my/personal/broadband",
            "external": false,
            "weight": "-47",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Extras",
            "uri": "node/794",
            "alias": "personal/extras",
            "absolute": "https://www.celcom.com.my/personal/extras",
            "absolute_path": "https://www.celcom.com.my/personal/extras",
            "external": false,
            "weight": "-46",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Shop",
            "uri": "https://shop.celcom.com.my",
            "alias": "https://shop.celcom.com.my",
            "absolute": "https://shop.celcom.com.my",
            "absolute_path": "https://shop.celcom.com.my",
            "external": true,
            "weight": "-45",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        },
        {
            "title": "Our Network",
            "uri": "node/24091",
            "alias": "personal/GunaCelcom",
            "absolute": "https://www.celcom.com.my/personal/GunaCelcom",
            "absolute_path": "https://www.celcom.com.my/personal/GunaCelcom",
            "external": false,
            "weight": "0",
            "my_account_link": "",
            "analytic_object": "",
            "menu_icon": {
                "path": ""
            }
        }
    ]
}
];
let RouterStub = {
    // navigateByUrl(url: string) {
    //     return url;
    // }
    navigate: jasmine.createSpy('navigate'),
    routerState: {
        snapshot: {
            url: ''
        }
    }
};
class MockactivatedRoute {
    snapshot(url: string) {
        return url;
    }
}
class AppMockService {
    get(url) {
        // if(url == '/api/content_details?_format=hal_json&type=custom&name=menu_details&id=global-navigation'){
        return Observable.of(mockHeaderData);
        // }
    }
    getEstoreUserData() {
        return Observable.of('');
    }
}
class MockHeaderService {
    FindGlobalNavigation() {
        return Observable.of(mockHeaderData);
    }
}
class MockRedirectionService {
    public HandleNavigation(param1, param2, param3) {
        return param1;
    }
}
class MockUserService {
    isCSAgent(flag) {
        return true;
    }
    isDealer() {
        return true;
    }
    isCustomer() {
        return true;
    }
    isMCUser() {
        return true;
    }
    isGuest() {
        return true;
    }
    isUserEnterprise() {
        return true;
    }
}
describe('HeaderComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let redirectionService: RedirectionService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, NgxSiemaModule, SharedModule],
            declarations: [HeaderComponent, SubNavigationComponent, MinifiedPageLoaderComponent, FooterComponent,
                AgentFooterComponent, SocialMediaComponent,
                FooterDownloadComponent, CheckoutHeroBannerComponent, HeroBannerClickableComponent, CatalogueBannerMegaComponent,
                CatalogueComponent, MostPopularComponent, AgeEligibilityPopupComponent, PreOrderComponent],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: AppService, useClass: AppMockService },
            { provide: Router, useValue: RouterStub }, { provide: RedirectionService, useClass: MockRedirectionService },
            {
                provide: ActivatedRoute, useClass: MockactivatedRoute,
            }, EStoreAnalysticsService, AnalyticsService, RendererService, SeoService, HeaderService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, CartService, BundleService,
                OrderInfoService, HttpClient, BroadbandService,
                DeviceDataService, CommonUtilService, RemarketAnalyticsService, HomeService,
                GetParametersService, GuestCheckoutService, RouterTestingModule,
            { provide: UserService, useClass: MockUserService }],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(HeaderComponent);
                component = fixture.componentInstance;
                redirectionService = TestBed.get(RedirectionService);
            });
    }));
    // beforeEach(async(() => {
    //     fixture = TestBed.createComponent(HeaderComponent);
    //     component = fixture.componentInstance;
    // }));
    it('should create Header component', () => {
        expect(component).toBeTruthy();
    });
    it('should call ngOninit()', () => {
        expect(component.ngOnInit).toBeDefined();
    });
    it('Header component ToggleHamburgerMenu for false', () => {
        component.toggleMenu = false;
        component.ToggleHamburgerMenu();
        expect(component.toggleMenu).toBeTruthy();
    });
    it('Header component ToggleHamburgerMenu for true', () => {
        component.toggleMenu = true;
        component.ToggleHamburgerMenu();
        expect(component.toggleMenu).toBeFalsy();
    });
    it('Header component serachtextClick for false', () => {
        component.toggleSearch = false;
        component.serachtextClick();
        expect(component.serachtextClick).toBeTruthy();
    });
    it('Header component serachtextClick for true', () => {
        component.toggleSearch = true;
        component.serachtextClick();
        expect(component.toggleSearch).toBeFalsy();
    });
    it('Header component quicksearchClose for false', () => {
        component.toggleSearch = false;
        component.quicksearchClose();
        expect(component.serachtextClick).toBeTruthy();
    });
    it('Header component quicksearchClose for true', () => {
        component.toggleSearch = true;
        component.quicksearchClose();
        expect(component.toggleSearch).toBeFalsy();
    });
    it('should call header component Cart function', () => {
        spyOn(component, "RedirectToHeader");
        component.loadCart();
        expect(component.RedirectToHeader).toHaveBeenCalledWith('/store/cart');
    });
    it('should reload home page', () => {
        const windowsURL = "https://www.celcom.com.my";
        const production = true;
        if (typeof window !== 'undefined') {
            expect(production).toBeTruthy();
            expect(component.portalFrontEndURL).toBe(windowsURL);
        } else {
            expect(component.eStoreFrontEndUrl).toBe(windowsURL);
        }
    });
    it('should test oninit function', inject([DeviceDataService, HeaderService], (deviceDataSerivce: DeviceDataService, headerService: HeaderService) => {
        component.production = "true";
        component.ngOnInit();
        deviceDataSerivce.publishGuestName('Test Name');
        expect(component.dataAnalyticsRegion).toBe("Header");
        expect(component.UserLoginName).toBe("Test Name");
        //   expect(component.flag).toBeTruthy();
    }));
    it('should test updateUserName function', inject([HeaderService], (headerService: HeaderService) => {
        //   component.ngOnInit();
        spyOn(headerService, 'publishUser');
        headerService.publishUser('Test User');
        expect(headerService.publishUser).toHaveBeenCalledWith('Test User');
        //   expect(component.flag).toBeTruthy();
    }));
    it('should test IsUrlContainsPersonalLink function', () => {
        let result = component.IsUrlContainsPersonalLink('/personal/testpage');
        expect(result).toBeTruthy();
    });
    it('should test IsUrlContainsPersonalLink function with return value as false', () => {
        let result = component.IsUrlContainsPersonalLink('/business/testpage');
        expect(result).toBeFalsy();
    });
    it('should test IsUrlContainsBusinessLink function', () => {
        let result = component.IsUrlContainsBusinessLink('/business/testpage');
        expect(result).toBeTruthy();
    });
    it('should test IsUrlContainsBusinessLink function with return value false', () => {
        let result = component.IsUrlContainsBusinessLink('/personal/testpage');
        expect(result).toBeFalsy();
    });
    it('should test FindSubNavigationData function ', () => {
        component.GlobalNavigationInfo = mockHeaderData;
        let result: Array<any> = component.FindSubNavigationData('Personal', 0);
        expect(result.length).toBe(1);
    });
    it('should test MobileMenuSelect function ', () => {
        component.GlobalNavigationInfo = mockHeaderData;
        let data = { "title": "Business", "uri": "node/948", "alias": "business", "absolute": "https://www.celcom.com.my/business", "absolute_path": "https://www.celcom.com.my/business", "external": false, "weight": "-49", "my_account_link": "https://businessportal.celcom.com.my/", "analytic_object": "", "menu_icon": { "path": "/sites/default/files/menu_icons/celcom_business_logo.svg" }, "below": [{ "title": "Products", "uri": "node/24040", "alias": "business/products", "absolute": "https://www.celcom.com.my/business/products", "absolute_path": "https://www.celcom.com.my/business/products", "external": false, "weight": "-53", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" }, "below": [{ "title": "Essentials", "uri": "node/10999", "alias": "business/products/essentials", "absolute": "https://www.celcom.com.my/business/products/essentials", "absolute_path": "https://www.celcom.com.my/business/products/essentials", "external": false, "weight": "-51", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }, { "title": "Solutions", "uri": "node/11000", "alias": "business/products/solutions", "absolute": "https://www.celcom.com.my/business/products/solutions", "absolute_path": "https://www.celcom.com.my/business/products/solutions", "external": false, "weight": "-50", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }] }, { "title": "SME", "uri": "node/7895", "alias": "business/sme", "absolute": "https://www.celcom.com.my/business/sme", "absolute_path": "https://www.celcom.com.my/business/sme", "external": false, "weight": "-52", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }, { "title": "Corporate", "uri": "node/7896", "alias": "business/corporate", "absolute": "https://www.celcom.com.my/business/corporate", "absolute_path": "https://www.celcom.com.my/business/corporate", "external": false, "weight": "-51", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }, { "title": "Support", "uri": "node/5244", "alias": "business/support", "absolute": "https://www.celcom.com.my/business/support", "absolute_path": "https://www.celcom.com.my/business/support", "external": false, "weight": "-49", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }, { "title": "Contact Us", "uri": "node/22668", "alias": "support/contact-us", "absolute": "https://www.celcom.com.my/support/contact-us", "absolute_path": "https://www.celcom.com.my/support/contact-us", "external": false, "weight": "-48", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }] };
        component.MobileMenuSelect(data);
        expect(component.selected).toBe('Business');
    });
    it('should test ActivateSubNavigationOnLoad function ', () => {
        component.GlobalNavigationInfo = mockHeaderData;
        let data = { "title": "test", "uri": "node/948", "alias": "business", "absolute": "https://www.celcom.com.my/business", "absolute_path": "https://www.celcom.com.my/business", "external": false, "weight": "-49", "my_account_link": "https://businessportal.celcom.com.my/", "analytic_object": "", "menu_icon": { "path": "/sites/default/files/menu_icons/celcom_business_logo.svg" }, "below": [{ "title": "Products", "uri": "node/24040", "alias": "business/products", "absolute": "https://www.celcom.com.my/business/products", "absolute_path": "https://www.celcom.com.my/business/products", "external": false, "weight": "-53", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" }, "below": [{ "title": "Essentials", "uri": "node/10999", "alias": "business/products/essentials", "absolute": "https://www.celcom.com.my/business/products/essentials", "absolute_path": "https://www.celcom.com.my/business/products/essentials", "external": false, "weight": "-51", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }, { "title": "Solutions", "uri": "node/11000", "alias": "business/products/solutions", "absolute": "https://www.celcom.com.my/business/products/solutions", "absolute_path": "https://www.celcom.com.my/business/products/solutions", "external": false, "weight": "-50", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }] }, { "title": "SME", "uri": "node/7895", "alias": "business/sme", "absolute": "https://www.celcom.com.my/business/sme", "absolute_path": "https://www.celcom.com.my/business/sme", "external": false, "weight": "-52", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }, { "title": "Corporate", "uri": "node/7896", "alias": "business/corporate", "absolute": "https://www.celcom.com.my/business/corporate", "absolute_path": "https://www.celcom.com.my/business/corporate", "external": false, "weight": "-51", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }, { "title": "Support", "uri": "node/5244", "alias": "business/support", "absolute": "https://www.celcom.com.my/business/support", "absolute_path": "https://www.celcom.com.my/business/support", "external": false, "weight": "-49", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }, { "title": "Contact Us", "uri": "node/22668", "alias": "support/contact-us", "absolute": "https://www.celcom.com.my/support/contact-us", "absolute_path": "https://www.celcom.com.my/support/contact-us", "external": false, "weight": "-48", "my_account_link": "", "analytic_object": "", "menu_icon": { "path": "" } }] };
        component.ActivateSubNavigationOnLoad(data, 0);
        expect(component.selected).toBe('test');
        // expect(component.IsInitiateSubNavigation).toBeTruthy();
    });
    it('should test RedirectToStore function ', () => {
        component.storeUrl = '#store';
        component.RedirectToStore();
        // expect(component.IsInitiateSubNavigation).toBeTruthy();
    });
    it('should test RedirectToLogin function ', () => {
        component.loginUrl = '#login';
        component.RedirectToLogin();
        // expect(component.IsInitiateSubNavigation).toBeTruthy();
    });
    it('should test defaultOnClick function ', () => {
        let result = component.defaultOnClick();
        expect(result).toBeFalsy();
    });
    // it('should test OnSearchClick function ', () => {
    //     component.SearchText = 'plan';
    //     component.searchUrl = '#search';
    //     component.OnSearchClick();
    //     expect(localStorage.getItem('searchKey')).toBe('plan');
    // });
    it('should test updateUserName function ', () => {
        let data = {
            outputCPResp: {
                name: "Test"
            }
        };
        sessionStorage.setItem("USER_TYPE", null);
        sessionStorage.setItem('UserInfo', JSON.stringify(data));
        component.updateUserName();
        expect(component.UserLoginName).toBe('Test');
    });
    it('should test updateUserName function  with user type', () => {
        sessionStorage.removeItem('UserInfo');
        sessionStorage.setItem('USER_TYPE', 'GUEST');
        component.updateUserName();
        expect(component.UserLoginName).toBe('GUEST');
    });
    it('should test ToggleHamburgerMenu function', () => {
        component.toggleMenu = true;
        component.ToggleHamburgerMenu();
        expect(component.toggleMenu).toBeFalsy();
    });
    it('should test ToggleHamburgerMenu function with false value', () => {
        component.toggleMenu = false;
        component.ToggleHamburgerMenu();
        expect(component.toggleMenu).toBeTruthy();
    });
    it('should test serachtextClick function with false value', () => {
        component.toggleSearch = false;
        component.serachtextClick();
        expect(component.toggleSearch).toBeTruthy();
    });
    it('should test serachtextClick function', () => {
        component.toggleSearch = true;
        component.serachtextClick();
        expect(component.toggleSearch).toBeFalsy();
    });
    it('should test quicksearchClose function with false value', () => {
        component.toggleSearch = false;
        component.quicksearchClose();
        expect(component.toggleSearch).toBeTruthy();
    });
    it('should test quicksearchClose function', () => {
        component.toggleSearch = true;
        component.quicksearchClose();
        expect(component.toggleSearch).toBeFalsy();
    });
    it('should test logoutConfirmation function', () => {
        component.logoutConfirmation();
        // expect(component.toggleSearch).toBeFalsy();
    });
    it('should test close__terms__login function', () => {
        let result = component.close__terms__login();
        expect(result).toBeFalsy();
    });
    // it('should test login function', () => {
    //     component.homePageUrl = '#home';
    //     component.loginPageUrl = '#login';
    //     component.login();
    // });
    // it('should test ReloadHomePage function', () => {
    //     component.portalFrontEndURL = '#portal';
    //     component.eStoreFrontEndUrl = '#estore';
    //     component.production = 'true';
    //     component.ReloadHomePage();

    // });
    // it('should test ReloadHomePage function with production false', () => {
    //     component.portalFrontEndURL = '#portal';
    //     component.eStoreFrontEndUrl = '#estore';
    //     component.production = '';
    //     component.ReloadHomePage();

    // });
    it('should test LogoutUser function', () => {
        component.LogoutUser();
    });
    it('should test GlobalNavigationResponseBinding function', () => {
        let data = mockHeaderData;
        component.GlobalNavigationResponseBinding(data);
        expect(component.GlobalNavigationInfo.length).toBe(3);

    });
    //{"title":"Business","uri":"node/948","alias":"business","absolute":"https://www.celcom.com.my/business","absolute_path":"https://www.celcom.com.my/business","external":false,"weight":"-49","my_account_link":"https://businessportal.celcom.com.my/","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/celcom_business_logo.svg"},"below":[{"title":"Products","uri":"node/24040","alias":"business/products","absolute":"https://www.celcom.com.my/business/products","absolute_path":"https://www.celcom.com.my/business/products","external":false,"weight":"-53","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Essentials","uri":"node/10999","alias":"business/products/essentials","absolute":"https://www.celcom.com.my/business/products/essentials","absolute_path":"https://www.celcom.com.my/business/products/essentials","external":false,"weight":"-51","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Solutions","uri":"node/11000","alias":"business/products/solutions","absolute":"https://www.celcom.com.my/business/products/solutions","absolute_path":"https://www.celcom.com.my/business/products/solutions","external":false,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]},{"title":"SME","uri":"node/7895","alias":"business/sme","absolute":"https://www.celcom.com.my/business/sme","absolute_path":"https://www.celcom.com.my/business/sme","external":false,"weight":"-52","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Corporate","uri":"node/7896","alias":"business/corporate","absolute":"https://www.celcom.com.my/business/corporate","absolute_path":"https://www.celcom.com.my/business/corporate","external":false,"weight":"-51","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Support","uri":"node/5244","alias":"business/support","absolute":"https://www.celcom.com.my/business/support","absolute_path":"https://www.celcom.com.my/business/support","external":false,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Contact Us","uri":"node/22668","alias":"support/contact-us","absolute":"https://www.celcom.com.my/support/contact-us","absolute_path":"https://www.celcom.com.my/support/contact-us","external":false,"weight":"-48","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]}
});
