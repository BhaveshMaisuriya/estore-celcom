import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {OldSubNavigationComponent as SubNavigationComponent} from './subnavigation.component';
import { RedirectionService } from '../../Service/redirection.service';
import { Broadcaster } from "../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../Service/broadcaster.service";
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
let RouterStub =  {
    // navigateByUrl(url: string) {
    //     return url;
    // }
    navigate: jasmine.createSpy('navigate'),
    routerState: {
        snapshot:{
            url:''
        }
    }
}
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

describe('Sub navigation ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;
   let component: SubNavigationComponent;
    let fixture: ComponentFixture<SubNavigationComponent>;
    // let redirectionService: RedirectionService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [SubNavigationComponent],
            providers: [RedirectionService,Broadcaster,NotificationPopupEvent,CookieService
            ,{ provide: ActivatedRoute, useValue: fakeActivatedRoute }]
        })
            .compileComponents().then(()=>{
                fixture = TestBed.createComponent(SubNavigationComponent);
                component = fixture.componentInstance; 
                // redirectionService = TestBed.get(RedirectionService);       
            });
    }));
    // beforeEach(async(() => {
    //     fixture = TestBed.createComponent(SubNavigationComponent);
    //     component = fixture.componentInstance;
    // }));
    it('should create Sub navigation component', () => {
        expect(component).toBeTruthy();
    });
    it('should test defaultOnClick', () => {
        let result = component.defaultOnClick();
        expect(result).toBeFalsy();
    });
    it('should test ManageParentMenu', () => {
        let data = "test";
        let result = component.ManageParentMenu(data);
        component.OnMobileMenuSelect.subscribe(res =>{
            expect(res).toBe('test');
        })
    });
    it('should test ngOnInit', () => {
        component.SelectedMenu = 'Personal';
        component.NavigationInfo = mockHeaderData;
        component.GlobalNavigationInfo = mockHeaderData;
        component.ngOnInit();
        expect(component.RemainingParentMenu.length).toBe(2);
    });
    it('should test ngOnInit', () => {
        component.SelectedMenu = 'Personal';
        component.NavigationInfo = '';
        component.GlobalNavigationInfo = mockHeaderData;
        component.ngOnInit();
        
    });
    it('should test isPartOfCurrentUrl', () => {
        let data = {"title":"Prepaid","uri":"node/22741","alias":"personal/prepaid","absolute":"https://www.celcom.com.my/personal/prepaid","absolute_path":"https://www.celcom.com.my/personal/prepaid","external":false,"weight":"-52","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Internet Plans","uri":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","alias":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","absolute":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","absolute_path":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","external":true,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Roaming","uri":"node/7844","alias":"personal/roaming","absolute":"https://www.celcom.com.my/personal/roaming","absolute_path":"https://www.celcom.com.my/personal/roaming","external":false,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Promotions","uri":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","alias":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","absolute":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","absolute_path":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","external":true,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]}
        component.currentUrl =  'store/devices';
        let result = component.isPartOfCurrentUrl(data);
        expect(result).toBeFalsy();
    });
    it('should test isPartOfCurrentUrl', () => {
        let data = {"title":"Prepaid","uri":"node/22741","alias":"personal/prepaid","absolute":"https://www.celcom.com.my/personal/prepaid","absolute_path":"https://www.celcom.com.my/personal/prepaid","external":false,"weight":"-52","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Internet Plans","uri":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","alias":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","absolute":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","absolute_path":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","external":true,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Roaming","uri":"node/7844","alias":"personal/roaming","absolute":"https://www.celcom.com.my/personal/roaming","absolute_path":"https://www.celcom.com.my/personal/roaming","external":false,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Promotions","uri":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","alias":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","absolute":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","absolute_path":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","external":true,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]};
        component.currentUrl =  "personal/prepaid";
        let result = component.isPartOfCurrentUrl(data);
        expect(result).toBeTruthy();
    });
    it('should test isPartOfCurrentUrl with external true', () => {
        let data = {"title":"Prepaid","uri":"node/22741","alias":"personal/prepaid","absolute":"https://www.celcom.com.my/personal/prepaid","absolute_path":"https://www.celcom.com.my/personal/prepaid","external":true,"weight":"-52","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Internet Plans","uri":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","alias":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","absolute":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","absolute_path":"https://www.celcom.com.my/personal/prepaid/plans/internet-plans","external":true,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Roaming","uri":"node/7844","alias":"personal/roaming","absolute":"https://www.celcom.com.my/personal/roaming","absolute_path":"https://www.celcom.com.my/personal/roaming","external":false,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Promotions","uri":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","alias":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","absolute":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","absolute_path":"https://www.celcom.com.my/personal/prepaid/xpax-promotions","external":true,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]};
        component.currentUrl =  "personal/prepaid";
        let result = component.isPartOfCurrentUrl(data);
        expect(result).toBeFalsy();
    });
    it('should test isPartOfCurrentUrl with empty', () => {
        component.currentUrl =  "personal/prepaid";
        let result = component.isPartOfCurrentUrl('');
        expect(result).toBeFalsy();
    });
    it('should test highlightedMenu', () => {
        let data = {"title":"Postpaid","uri":"node/3177","alias":"personal/postpaid","absolute":"https://www.celcom.com.my/personal/postpaid","absolute_path":"https://www.celcom.com.my/personal/postpaid","external":false,"weight":"-51","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Roaming","uri":"node/7844","alias":"personal/roaming","absolute":"https://www.celcom.com.my/personal/roaming","absolute_path":"https://www.celcom.com.my/personal/roaming","external":false,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"IDD","uri":"node/7832","alias":"personal/roaming/idd-postpaid","absolute":"https://www.celcom.com.my/personal/roaming/idd-postpaid","absolute_path":"https://www.celcom.com.my/personal/roaming/idd-postpaid","external":false,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Plans","uri":"node/3177","alias":"personal/postpaid","absolute":"https://www.celcom.com.my/personal/postpaid","absolute_path":"https://www.celcom.com.my/personal/postpaid","external":false,"weight":"-48","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Add-On","uri":"node","alias":"node","absolute":"https://www.celcom.com.my/node","absolute_path":"https://www.celcom.com.my/node","external":false,"weight":"0","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]}]};
        let result = component.highlightedMenu(data);
        expect(component.activeMenu).toBe('Postpaid');
    });
    it('should test highlightedMenu with storage null', () => {
        let data = {"title":"Postpaid","uri":"node/3177","alias":"personal/postpaid","absolute":"https://www.celcom.com.my/personal/postpaid","absolute_path":"https://www.celcom.com.my/personal/postpaid","external":false,"weight":"-51","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Roaming","uri":"node/7844","alias":"personal/roaming","absolute":"https://www.celcom.com.my/personal/roaming","absolute_path":"https://www.celcom.com.my/personal/roaming","external":false,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"IDD","uri":"node/7832","alias":"personal/roaming/idd-postpaid","absolute":"https://www.celcom.com.my/personal/roaming/idd-postpaid","absolute_path":"https://www.celcom.com.my/personal/roaming/idd-postpaid","external":false,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Plans","uri":"node/3177","alias":"personal/postpaid","absolute":"https://www.celcom.com.my/personal/postpaid","absolute_path":"https://www.celcom.com.my/personal/postpaid","external":false,"weight":"-48","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Add-On","uri":"node","alias":"node","absolute":"https://www.celcom.com.my/node","absolute_path":"https://www.celcom.com.my/node","external":false,"weight":"0","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]}]};
        Storage = undefined;
        let result = component.highlightedMenu(data);
    });
    it('should test ManageContentNavigation', () => {
        let data = "/";
        component.ManageContentNavigation(data);
        // expect((element).indexOf('c-navigation--default') > -1).toBeTruthy();
    });
    
      //{"title":"Postpaid","uri":"node/3177","alias":"personal/postpaid","absolute":"https://www.celcom.com.my/personal/postpaid","absolute_path":"https://www.celcom.com.my/personal/postpaid","external":false,"weight":"-51","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Roaming","uri":"node/7844","alias":"personal/roaming","absolute":"https://www.celcom.com.my/personal/roaming","absolute_path":"https://www.celcom.com.my/personal/roaming","external":false,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"IDD","uri":"node/7832","alias":"personal/roaming/idd-postpaid","absolute":"https://www.celcom.com.my/personal/roaming/idd-postpaid","absolute_path":"https://www.celcom.com.my/personal/roaming/idd-postpaid","external":false,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Plans","uri":"node/3177","alias":"personal/postpaid","absolute":"https://www.celcom.com.my/personal/postpaid","absolute_path":"https://www.celcom.com.my/personal/postpaid","external":false,"weight":"-48","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Add-On","uri":"node","alias":"node","absolute":"https://www.celcom.com.my/node","absolute_path":"https://www.celcom.com.my/node","external":false,"weight":"0","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]}]}
});
