import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { BbPlanSectionComponent } from './bb-plan-section.component';
import { AppService } from '../../../Service/app.service';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BbDeviceDetailsService } from '../bb-device-details/bb-device-details.service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { BroadbandService } from '../../../Service/broadband.service';
import { Renderer2 } from '@angular/core';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { UserService } from 'app/Service/user.service';
import { sharedPipes } from 'app/shared/pipes';

class MockactivatedRoute {
  snapshot(url: string) {
    return url;
  }
}
class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

const mockBbDeviceDetailsResponse =  [
  {
    "name": "HW iPhone 8",
    "sku": "hwiPhone-8",
    "price": 0,
    "quntity": null,
    "default_plan": "Home Wireless First\u2122 Gold",
    "default_plan_sku": "hwFG",
    "order_monthly_pay": "80.0000",
    "most_popular": "1",
    "rm": "",
    "rrp_rm_strick_price": "3394.0000",
    "main_image": "\/media\/catalog\/product",
    "sub_images": [
    ],
    "dimension": "138.3 x 67.1 x 7.1 mm",
    "weight": null,
    "splash_water_dust_resistant": "0",
    "stock": "Limited Stock",
    "order_category": "HP",
    "order_model": "Apple A10 Fusion",
    "order_brand": "APPLE",
    "segment": null,
    "default_selected_color": "Gold",
    "stock_indicator_image": "\/media\/catalog\/product",
    "stock_indicator_text": null,
    "default_device_option": "0",
    "more_details": {
      "features": "Fingerprint (front-mounted), accelerometer, gyro, proximity, compass, barometer",
      "shipping_details": null,
      "what_in_the_box": null
    },
    "terms_and_condition": {
      "plans": {
        "label": "Plans",
        "desc": null
      },
      "contract_terms": {
        "label": "Contract Duration",
        "desc": "24 months contract"
      },
      "legal": {
        "label": "Legal",
        "desc": null
      },
      "cancellation": {
        "label": "Cancellation",
        "desc": null
      }
    },
    "device_product_details": [
      {
        "name": "HW iPhone 8 64GB Gold",
        "sku": "hwi8gld64GB",
        "rrp": "3394.0000",
        "discounted_device_rrp": null,
        "color": "Gold",
        "order_color": "Gold",
        "order_category": "HP",
        "color_hexa": "#cdbeab",
        "image": "\/media\/catalog\/product",
        "sub_images": [
        ],
        "order_model": "IPHONE 8 64GB",
        "part_number": "MDR5589",
        "product_type": null,
        "new_customer": "0",
        "segment": null,
        "contract": "24 months",
        "upfront_installment": null,
        "saleable_plans": [
          {
            "sku": "hFGP",
            "prices": {
              "upfront_price": "100",
              "device_price": "150",
              "penalty_price": ""
            }
          }
        ]
      },
      {
        "name": "HW iPhone 8 64GB Silver",
        "sku": "hwi8slv64GB",
        "rrp": "3394.0000",
        "discounted_device_rrp": null,
        "color": "Silver",
        "order_color": "Silver",
        "order_category": "HP",
        "color_hexa": "#c0c0c0",
        "image": "\/media\/catalog\/product",
        "sub_images": [
        ],
        "order_model": "IPHONE 8 64GB",
        "part_number": "MDR5589",
        "product_type": null,
        "new_customer": "0",
        "segment": null,
        "contract": "24 months",
        "upfront_installment": null,
        "saleable_plans": [
          {
            "sku": "hFGP",
            "prices": {
              "upfront_price": "100",
              "device_price": "150",
              "penalty_price": ""
            }
          }
        ]
      }
    ],
    "plan_product_details": [
      {
        "tab_name": "Home Wireless Plans",
        "tab_title": null,
        "tab_subtitle": null,
        "tab_data": [
          {
            "name": "Home Wireless First\u2122 Gold",
            "sku": "hwFG",
            "monthly_plan": "80.0000",
            "order_plan_bundle": "PB12090",
            "plan_monthly_pay": "80.0000",
            "segment": null,
            "upfront_installment": null,
            "contract": null,
            "plan_name": "Home Wireless First\u2122 Gold",
            "plan_title": "First\u2122 Gold. Affordable. Complete",
            "plan_subtitle": "All you need in a pocket-friendly plan. Sign up for 12 months for more privileges.",
            "product_type": null,
            "background_color": "is-bg-color-black",
            "indicator_class": null,
            "product_text": null,
            "table_info": [
              {
                "heighlight": "0",
                "headline": "10GB weekday + 10GB FREE weekend Internet",
                "fieldIcon": "\/sites\/default\/files\/images\/icon\/internet_gb_black\/icon_internet_10gb.svg"
              },
              {
                "heighlight": "0",
                "headline": "10GB weekday + 10GB FREE weekend Internet",
                "fieldIcon": "\/sites\/default\/files\/images\/icon\/internet_gb_black\/icon_internet_10gb.svg"
              }
            ],
            "terms_and_condition": {
              "plans": {
                "label": "Plans",
                "desc": null
              },
              "contract_terms": {
                "label": "Contract Duration",
                "desc": "24 months contract"
              },
              "legal": {
                "label": "Legal",
                "desc": null
              },
              "cancellation": {
                "label": "Cancellation",
                "desc": null
              }
            }
          },
          {
            "name": "eless Home WiFirst\u2122 Gold Plus",
            "sku": "hFGP",
            "monthly_plan": "98.0000",
            "order_plan_bundle": "PB12070",
            "plan_monthly_pay": "98.0000",
            "segment": null,
            "upfront_installment": null,
            "contract": null,
            "plan_name": "eless Home WiFirst\u2122 Gold Plus",
            "plan_title": "First\u2122 Gold Plus. Affordable. Complete",
            "plan_subtitle": "Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.",
            "product_type": null,
            "background_color": "is-bg-color-black",
            "indicator_class": null,
            "product_text": null,
            "table_info": [
              {
                "heighlight": "0",
                "headline": "10GB weekday + 10GB FREE weekend Internet",
                "fieldIcon": "\/sites\/default\/files\/images\/icon\/internet_gb_black\/icon_internet_10gb.svg"
              }
            ],
            "terms_and_condition": {
              "plans": {
                "label": "Plans",
                "desc": null
              },
              "contract_terms": {
                "label": "Contract Duration",
                "desc": "24 months contract"
              },
              "legal": {
                "label": "Legal",
                "desc": null
              },
              "cancellation": {
                "label": "Cancellation",
                "desc": null
              }
            }
          }
        ]
      }
    ]
  }
];
describe('BbPlanSectionComponent', () => {
  let component: BbPlanSectionComponent;
  let fixture: ComponentFixture<BbPlanSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbPlanSectionComponent, sharedPipes ],
      providers: [AppService, HttpClient, HttpHandler, DeviceDataService,
        { provide: ActivatedRoute, useClass: MockactivatedRoute }, { provide: Router, useClass: RouterStub },
        BbDeviceDetailsService, GetParametersService, EStoreAnalysticsService, BroadbandService, Renderer2, AnalyticsService,
         RendererService, DecimalPipe, SeoService,
         UserService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbPlanSectionComponent);
    component = fixture.componentInstance;
    component.deviceDetailsData = mockBbDeviceDetailsResponse;
    component.selectedColor = "Gold";
    component.deviceDetailsData = {"name":"Home Wireless","sku":"home-wireless","price":"3394.0000","quntity":null,"default_plan":"Home Wireless Gold Plus","default_plan_sku":"hwgp","order_monthly_pay":"100.0000","most_popular":"1","rm":"0","rrp_rm_strick_price":"3394.0000","main_image":"/media/catalog/product/h/w/hw_1.png","sub_images":["/media/catalog/product/h/w/hw_1.png","/media/catalog/product/b/a/badge_8.png"],"dimension":"W:95mm H:208mm D:95mm","weight":null,"splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"MDM","order_model":"Apple A10 Fusion","order_brand":"HUAWEI","segment":null,"default_selected_color":"White","stock_indicator_image":"/media/catalog/product/b/a/badge_8.png","stock_indicator_text":"<strong>YOU could drive home a brand new Proton X70!</strong> <br />And stand a chance to win many more prizes worth RM50,000 when you sign up for Celcom Home Wireless now. Enjoy FREE Shipping to your doorstep too! Click <a href=\"https://www.celcom.com.my/personal/broadband/celcom-home-90-days-of-awesomeness\">here</a>&nbsp;to find out more.","default_device_option":"deviceBundle","more_details":{"features":"One power adapter port , One LAN port (RJ45),  One LAN / WAN port (RJ45) , One phone port (RJ11),  Two external LTE antenna ports (TS-9),  One micro-SIM card slot,  One USB 2.0 port (Supports a maximum of 500 mA current)","shipping_details":null,"whatInTheBox":"One Router, Power Cable"},"terms_and_condition":{"plans":{"label":"Plans","desc":"Testing the what inplan"},"contract_terms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"Testing the what in bxlegal"},"cancellation":{"label":"Cancellation","desc":"Testing the what in bxcancel"}},"device_product_details":[{"name":"Home Wireless","sku":"home-wireless-device","rrp":"3394.0000","discounted_device_rrp":3394,"color":"White","order_color":"WHT","order_category":"MDM","color_hexa":"#ffffff","image":"/media/catalog/product/h/w/hw.png","sub_images":["/media/catalog/product/h/w/hw.png"],"order_model":"B618 LTE WIFI","part_number":"MDR4640","product_type":"HP","new_customer":"0","segment":"10","contract":"24 months","upfront_installment":null,"saleable_plans":[{"sku":"hwg","prices":{"upfront_price":"0","device_price":"0","penalty_price":"499","supplementary_count":0,"special_price":0}},{"sku":"hwgp","prices":{"upfront_price":"0","device_price":"0","penalty_price":"499","supplementary_count":0,"special_price":0}},{"sku":"hwpp","prices":{"upfront_price":"0","device_price":"0","penalty_price":"499","supplementary_count":0,"special_price":0}},{"sku":"hwg_1","prices":{"upfront_price":"100","device_price":"0","penalty_price":"599","supplementary_count":0,"special_price":0}},{"sku":"hwg_2","prices":{"upfront_price":"100","device_price":"0","penalty_price":"699","supplementary_count":0,"special_price":0}},{"sku":"hwg_3","prices":{"upfront_price":"100","device_price":"0","penalty_price":"799","supplementary_count":0,"special_price":0}},{"sku":"hwg_4","prices":{"upfront_price":"100","device_price":"0","penalty_price":"899","supplementary_count":0,"special_price":0}},{"sku":"hwg_5","prices":{"upfront_price":"100","device_price":"0","penalty_price":"999","supplementary_count":0,"special_price":0}},{"sku":"hwgp_1","prices":{"upfront_price":"100","device_price":"0","penalty_price":"599","supplementary_count":0,"special_price":0}},{"sku":"hwgp_2","prices":{"upfront_price":"100","device_price":"0","penalty_price":"699","supplementary_count":0,"special_price":0}},{"sku":"hwgp_3","prices":{"upfront_price":"100","device_price":"0","penalty_price":"799","supplementary_count":0,"special_price":0}},{"sku":"hwgp_4","prices":{"upfront_price":"100","device_price":"0","penalty_price":"899","supplementary_count":0,"special_price":0}},{"sku":"hwgp_5","prices":{"upfront_price":"100","device_price":"0","penalty_price":"999","supplementary_count":0,"special_price":0}},{"sku":"hwpp_1","prices":{"upfront_price":"100","device_price":"0","penalty_price":"599","supplementary_count":0,"special_price":0}},{"sku":"hwpp_2","prices":{"upfront_price":"100","device_price":"0","penalty_price":"699","supplementary_count":0,"special_price":0}},{"sku":"hwpp_3","prices":{"upfront_price":"100","device_price":"0","penalty_price":"799","supplementary_count":0,"special_price":0}},{"sku":"hwpp_4","prices":{"upfront_price":"100","device_price":"0","penalty_price":"899","supplementary_count":0,"special_price":0}},{"sku":"hwpp_5","prices":{"upfront_price":"100","device_price":"0","penalty_price":"999","supplementary_count":0,"special_price":0}}]}],"plan_product_details":[{"tab_name":"Home Wireless Plans","tab_title":null,"tab_subtitle":null,"tab_data":[{"name":"Home Wireless Gold","sku":"hwg","monthly_plan":"70.0000","order_plan_bundle":"PB11913","plan_monthly_pay":"70.0000","segment":null,"upfront_installment":null,"contract":null,"plan_name":"Home Wireless Gold","plan_title":"Home Wireless Gold. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","product_type":null,"background_color":"is-bg-color-black","indicator_class":null,"product_text":"Gold","key_figures_text":"25GB","key_text":"RM70","table_info":[{"heighlight":"0","headline":"40GB Video Walla ™ & Music Walla ™","fieldIcon":"/sites/default/files/images/icon/internet_gb_black/icon_internet_10gb.svg","add_on_data":"Add-on data available (RM50/RM150)"}],"terms_and_condition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contract_terms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}}},{"name":"Home Wireless Gold Plus","sku":"hwgp","monthly_plan":"100.0000","order_plan_bundle":"PB11914","plan_monthly_pay":"100.0000","segment":null,"upfront_installment":null,"contract":null,"plan_name":"Home Wireless Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","product_type":null,"background_color":"is-bg-color-black","indicator_class":null,"product_text":"Gold Plus","key_figures_text":"50GB","key_text":"RM100","table_info":[{"heighlight":"0","headline":"100GB Video Walla ™ & Music Walla ™","fieldIcon":"/sites/default/files/images/icon/internet_gb_black/icon_internet_10gb.svg","add_on_data":"Add-on data available (RM50/RM150)"}],"terms_and_condition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contract_terms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}}},{"name":"Home Wireless Platinum","sku":"hwpp","monthly_plan":"150.0000","order_plan_bundle":"PB11915","plan_monthly_pay":"150.0000","segment":null,"upfront_installment":null,"contract":null,"plan_name":"Home Wireless Platinum","plan_title":"Home Wireless Platinum. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","product_type":null,"background_color":"is-bg-color-black","indicator_class":null,"product_text":"Platinum","key_figures_text":"150GB","key_text":"RM150","table_info":[{"heighlight":"0","headline":"1TB Video Walla ™ & Music Walla ™","fieldIcon":"/sites/default/files/images/icon/internet_gb_black/icon_internet_10gb.svg","add_on_data":"Add-on data available (RM50/RM150)"}],"terms_and_condition":{"plans":{"label":"Plans","desc":null},"contract_terms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}}}]}],"bill_type":2,"length":0}
  });
  it('BbPlanSectionComponent should create', () => {
    expect(component).toBeTruthy();
  });
  it('BbPlanSectionComponent should create', inject([DeviceDataService],(deviceDataService:DeviceDataService) => {
    let homeWirelessData = {"plan":{sku:"hwg"}};
    localStorage.setItem('homeWirelessEditData',JSON.stringify(homeWirelessData));
    component.ngOnInit();
    deviceDataService.publishColor('White');
    localStorage.removeItem('homeWirelessEditData');
    // expect(component).toBeTruthy();
  }));
  it('BbPlanSectionComponent should test with homewirelessdata', inject([DeviceDataService],(deviceDataService:DeviceDataService) => {
    let homeWirelessData = {"plan":{sku:"hwg"}};
    localStorage.setItem('homeWirelessData',JSON.stringify(homeWirelessData));
    component.ngOnInit();
    deviceDataService.publishColor('White');
    localStorage.removeItem('homeWirelessData');
    // expect(component).toBeTruthy();
  }));
  it('should test SelectPlan', inject([DeviceDataService],(deviceDataService:DeviceDataService) => {
    let data = {"name":"Home Wireless Gold","sku":"hwg","monthly_plan":"70.0000","order_plan_bundle":"PB11913","plan_monthly_pay":"70.0000","segment":null,"upfront_installment":null,"contract":null,"plan_name":"Home Wireless Gold","plan_title":"Home Wireless Gold. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","product_type":null,"background_color":"is-bg-color-black","indicator_class":null,"product_text":"Gold","key_figures_text":"25GB","key_text":"RM70","table_info":[{"heighlight":"0","headline":"40GB Video Walla ™ & Music Walla ™","fieldIcon":"/sites/default/files/images/icon/internet_gb_black/icon_internet_10gb.svg","add_on_data":"Add-on data available (RM50/RM150)"}],"terms_and_condition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contract_terms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}}}
    component.ngOnInit();
    component.orderSummaryColor = 'White';
    component.SelectPlan(data,true);
    // deviceDataService.publishColor('White');
    // expect(component).toBeTruthy();
  }));
  it('should test preSelection', inject([DeviceDataService],(deviceDataService:DeviceDataService) => {
    let homeWirelessData = {"plan":{sku:"hwg"}};
    component.ngOnInit();
    localStorage.setItem('homeWirelessData',JSON.stringify(homeWirelessData));
    component.orderSummaryColor = 'White';
    deviceDataService.publishColor('White');
    component.preSelection();

    localStorage.removeItem('homeWirelessData');
    // deviceDataService.publishColor('White');
    // expect(component).toBeTruthy();
  }));
  it('should test ResetPlan', inject([DeviceDataService],(deviceDataService:DeviceDataService) => {
    component.ResetPlan();
    expect(component.selectedPlanName).toBe('');
    // deviceDataService.publishColor('White');
    // expect(component).toBeTruthy();
  }));
});
