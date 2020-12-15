import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { MoonPlanWithPassDetailsComponent } from "./moon-plan-with-pass-details.component";
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { DetailBannerTextLeftComponent } from "../../../Widget/DetailBannerTextLeft/DetailBannerTextLeft.component";
import { MoonStickySummarySectionComponent } from "../moon-sticky-summary-section/moon-sticky-summary-section.component";
import { MoonSummarySectionComponent } from "../moon-summary-section/moon-summary-section.component";
import { MoonPlanWithDeviceDetailsComponent } from "../moon-plan-with-device-details/moon-plan-with-device-details.component";
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Router, ActivatedRoute } from "@angular/router";
import { AppService } from "../../../Service/app.service";
import { AppMockService } from "../../../Service/appmock.service";
import { HttpClient } from "@angular/common/http";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { MoonPlanWithPassDetailsService } from "./moon-plan-with-pass-details.service";
import { NotificationErrorComponent } from "../../widget/notification-error/notification-error.component";
import { DeviceDetailsStorageComponent } from "../../../Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.component";
import { RedirectionService } from "../../../Service/redirection.service";
import { CookieService } from "ngx-cookie-service";
import { EStoreAnalysticsService } from "../../../Service/store.analytic.service";
import { DecimalPipe } from "@angular/common";
import { AnalyticsService } from "../../../Service/analytic.service";
import { RendererService } from "../../../Service/renderer.service";
import { SeoService } from "../../../Service/seo.service";
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CartService } from "../../../Service/cart.service";
import { UserService } from "../../../Service/user.service";
import { SupplimentaryLinesService } from "../../widget/supplementary-lines/supplementary-lines.service";
import { BroadbandService } from "../../../Service/broadband.service";
import { BundleService } from "../../../Service/bundle.service";
import { Broadcaster } from "../../../Model/broadcaster.model";
import { OrderInfoService } from "../../../Service/orderinfo.service";
import { DeviceDetailsNumberComponent } from "../../../Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.component";
import { LosingSupplementaryLinePopupComponent } from "../../widget/losing-supplementary-line-popup/losing-supplementary-line-popup.component";
import { PlanPurchaseService } from "../plan-purchase/plan-purchase.service";
import { MoonColorStorageComponent } from "../moon-color-storage/moon-color-storage.component";
import { SupplementaryLinesComponent } from "../../widget/supplementary-lines/supplementary-lines.component";
import { DeviceSupplementaryLinesComponent } from "../../widget/device-supplementary-lines/device-supplementary-lines.component";
import { CobpComponent } from "../../cobp/cobp.component";
import { NoteSectionComponent } from "../../dumb-components/note-section/note-section.component";
import { SwitchToCelcomComponent } from "../../mnp/switch-to-celcom/switch-to-celcom.component";
import { ChooseYourWayComponent } from "../../guest-checkout/choose-your-way/choose-your-way.component";
import { MoreSupplementaryPopupComponent } from "../../widget/more-supplementary-popup/more-supplementary-popup.component";
import { AgeEligibilityPopupComponent } from "../../widget/age-eligibility-popup/ageeligiblity.popup.component";
import { NotificationBarComponent } from "../../widget/notification-bar/notification-bar.component";
import { Observable } from "rxjs/Rx";
import { DeviceDisclaimerComponent } from "../../../Widget/StoreWidgets/device-details/device-detail-disclaimer/device-detail-disclaimer.component";
import { HomeService } from "../../../Service/home.service";
import { ProductService } from "../../../Service/product.service";
import { RouterTestingModule } from "@angular/router/testing";
import { NricInputComponent } from "../../../Store/widget/nric-input/nric-input.component";
import { SafeHtmlPipe } from "../../../shared/pipes/safe-html.pipe";
import { MsisdnInputComponent } from "../../widget/msisdn-input/msisdn-input.component";
import { OtpInputComponent } from "../../widget/otp-input/otp-input.component";
import { SearchHighlight } from "../../../shared/pipes/search-highlight.pipe";
import { configureTestSuite } from 'ng-bullet';
import { GetParametersService } from "../../../Service/getParamaters.service";
import { OmniBannerComponent } from 'app/shared/components/omni-banner/omni-banner.component';
import { sharedPipes } from 'app/shared/pipes';
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

describe("MoonPlanWithPassDetailsComponent", () => {
  let component: MoonPlanWithPassDetailsComponent;
  let fixture: ComponentFixture<MoonPlanWithPassDetailsComponent>;
  let service: MoonPlanWithPassDetailsService;
  const response = [
    {
      name: "Xp Lite",
      sku: "xp-lite",
      url_key: "xp-lite",
      base_plan: [
        {
          name: "XP Lite",
          sku: "xp-b-plan",
          offer: "Unlimited calls to All Networks",
          monthly_plan: "28.00",
          data_limit: "1",
          order_plan_bundle: "PB12828",
          segment: null,
          upfront_installment: null,
          contract: null,
          plan_name: "XP Lite",
          plan_title: "Base Plan",
          plan_subtitle: null,
          product_type: null,
          product_text: null,
          key_figures_text: "1 GB",
          key_text: "RM 28",
          image_url: "/media/catalog/product/x/p/xp50_2.png",
          device_allowed: null
        }
      ],
      pass_plan: [
        {
          name: "M Pass",
          sku: "xp-m-pass",
          offer: "10GB, Unlimited Calls",
          monthly_plan: "10.00",
          data_limit: "4",
          order_plan_bundle: "CPT12829",
          segment: null,
          upfront_installment: null,
          contract: null,
          plan_name: "M Pass",
          plan_title: null,
          plan_subtitle: null,
          product_type: null,
          product_text: null,
          key_figures_text: "4 GB",
          key_text: "RM 10",
          image_url: "/media/catalog/product",
          device_allowed: "0"
        },
        {
          name: "L Pass",
          sku: "xp-l-pass",
          offer: "5GB, Unlimited Calls",
          monthly_plan: "30.00",
          data_limit: "9",
          order_plan_bundle: "CPT12831",
          segment: null,
          upfront_installment: null,
          contract: "df",
          plan_name: "L Pass",
          plan_title: null,
          plan_subtitle: null,
          product_type: null,
          product_text: null,
          key_figures_text: "9 GB",
          key_text: "RM 30",
          image_url: "/media/catalog/product",
          device_allowed: "1",
          associated_bundle_product: [
            {
              name: "Oppo F5",
              sku: "Oppo-F5",
              price: 0,
              quntity: null,
              order_monthly_pay: "188.00",
              most_popular: "1",
              rm: "0.00",
              rrp_rm_strick_price: "1224.55",
              main_image: "/media/catalog/product/f/r/front_1_7.png",
              sub_images: ["/media/catalog/product/f/r/front_1_7.png"],
              dimension: "155.9 ×75.8 × 7.7mm ",
              weight: "195.0000",
              splash_water_dust_resistant: "0",
              stock: "Limited Stock",
              order_category: "HP",
              order_model: " MT6763T",
              order_brand: "OPPO",
              segment: "10",
              default_selected_color: "Gold",
              default_selected_memory: "32GB",
              stock_indicator_image: "/media/catalog/product",
              stock_indicator_text: null,
              default_device_option: "easyPhone",
              associated_device_product: [
                {
                  name: "Oppo F5 32GB Gold ",
                  sku: "oppf5gld32gb",
                  rrp: "1224.55",
                  discounted_device_rrp: "0.00",
                  color: "Gold",
                  memory: "32GB",
                  order_color: "GLD",
                  order_category: "HP",
                  color_hexa: "#cdbeab",
                  image: "/media/catalog/product/f/r/front_1_6.png",
                  sub_images: [
                    "/media/catalog/product/f/r/front_1_6.png",
                    "/media/catalog/product/9/0/900x900_5_2.png"
                  ],
                  order_model: "F5",
                  part_number: "MDR5617",
                  product_type: "HP",
                  new_customer: "0",
                  segment: null,
                  contract: "24",
                  upfront_installment: null,
                  prices: {
                    upfront_price: "1000",
                    device_price: "10",
                    penalty_price: "500",
                    supplementary_count: 0,
                    special_price: 0
                  }
                },
                {
                  name: "Oppo F5 32GB Black",
                  sku: "oppf5b32gb",
                  rrp: "1224.55",
                  discounted_device_rrp: "0.00",
                  color: "Black",
                  memory: "32GB",
                  order_color: "BLK",
                  order_category: "HP",
                  color_hexa: "#000000",
                  image: "/media/catalog/product/f/r/front_64.png",
                  sub_images: [
                    "/media/catalog/product/f/r/front_64.png",
                    "/media/catalog/product/9/0/900x900_8.png"
                  ],
                  order_model: "F5",
                  part_number: "MDR5617",
                  product_type: "HP",
                  new_customer: "0",
                  segment: null,
                  contract: "24",
                  upfront_installment: null,
                  prices: {
                    upfront_price: "1000",
                    device_price: "10",
                    penalty_price: "500",
                    supplementary_count: 0,
                    special_price: 0
                  }
                }
              ]
            },
            {
              name: "iPhone 8",
              sku: "iPhone-8",
              price: 0,
              quntity: null,
              order_monthly_pay: "188.00",
              most_popular: "0",
              rm: "1748.00",
              rrp_rm_strick_price: "3394.00",
              main_image: "/media/catalog/product/f/r/front_55.png",
              sub_images: [
                "/media/catalog/product/f/r/front_55.png",
                "/media/catalog/product/b/a/badge.png"
              ],
              dimension: "138.4 x 67.3 x 7.3",
              weight: "195.0000",
              splash_water_dust_resistant: "1",
              stock: "Limited Stock",
              order_category: "HP",
              order_model: "Apple A10 Fusion",
              order_brand: "APPLE",
              segment: "10",
              default_selected_color: "Gold",
              default_selected_memory: "64GB",
              stock_indicator_image: "/media/catalog/product/b/a/badge.png",
              stock_indicator_text: "jhjhgjhgjhkjhjkh",
              default_device_option: "deviceBundle",
              associated_device_product: [
                {
                  name: "iPhone 8 64GB Gold",
                  sku: "i8gld64GB",
                  rrp: "3394.00",
                  discounted_device_rrp: "1000.00",
                  color: "Gold",
                  memory: "64GB",
                  order_color: "GLD",
                  order_category: "HP",
                  color_hexa: "#cdbeab",
                  image: "/media/catalog/product/9/0/900x900_8_3.png",
                  sub_images: [
                    "/media/catalog/product/9/0/900x900_8_3.png",
                    "/media/catalog/product/9/0/900x900_9_2.png",
                    "/media/catalog/product/9/0/900x900_10_2.png"
                  ],
                  order_model: "IPHONE 8 64GB",
                  part_number: "MDR5589",
                  product_type: "HP",
                  new_customer: "0",
                  segment: null,
                  contract: "24",
                  upfront_installment: null,
                  prices: {
                    upfront_price: "350",
                    device_price: "99",
                    penalty_price: "500",
                    supplementary_count: 0,
                    special_price: 0
                  }
                },
                {
                  name: "iPhone 8 64GB Space Grey ",
                  sku: "i8grey64GB",
                  rrp: "3394.00",
                  discounted_device_rrp: "2395.00",
                  color: "Grey",
                  memory: "64GB",
                  order_color: "GRY",
                  order_category: "HP",
                  color_hexa: "#808080",
                  image: "/media/catalog/product/f/r/front_14.png",
                  sub_images: [
                    "/media/catalog/product/f/r/front_14.png",
                    "/media/catalog/product/9/0/900x900_8_5.png",
                    "/media/catalog/product/9/0/900x900_9_4.png"
                  ],
                  order_model: "IPHONE 8 64GB",
                  part_number: "MDR5589",
                  product_type: "HP",
                  new_customer: "0",
                  segment: null,
                  contract: "24",
                  upfront_installment: null,
                  prices: {
                    upfront_price: "350",
                    device_price: "99",
                    penalty_price: "500",
                    supplementary_count: 0,
                    special_price: 0
                  }
                }
              ]
            },
            {
              name: "iPhone XS Max",
              sku: "iPhone-XS-Max",
              price: 0,
              quntity: null,
              order_monthly_pay: "188.00",
              most_popular: "0",
              rm: "3598.00",
              rrp_rm_strick_price: "5399.00",
              main_image: "/media/catalog/product/f/r/front_900x900_2_4_2.png",
              sub_images: [
                "/media/catalog/product/f/r/front_900x900_2_4_2.png"
              ],
              dimension: "157.5X77.4X7.7mm",
              weight: null,
              splash_water_dust_resistant: "0",
              stock: "Limited Stock",
              order_category: "HP",
              order_model: "IPHONE XS MAX 64GB",
              order_brand: "APPLE",
              segment: "10",
              default_selected_color: "Silver",
              default_selected_memory: "64GB",
              stock_indicator_image: "/media/catalog/product",
              stock_indicator_text: null,
              default_device_option: "easyPhone",
              associated_device_product: [
                {
                  name: "iPhone XS Max 64GB Silver",
                  sku: "iphonexsmax64gbsilver",
                  rrp: "5399.00",
                  discounted_device_rrp: "0.00",
                  color: "Silver",
                  memory: "64GB",
                  order_color: "SLV",
                  order_category: "HP",
                  color_hexa: "#c0c0c0",
                  image: "/media/catalog/product/f/r/front_900x900_19.png",
                  sub_images: [
                    "/media/catalog/product/f/r/front_900x900_19.png",
                    "/media/catalog/product/b/a/back_900x900_18.png",
                    "/media/catalog/product/s/i/side_900x900_20.png"
                  ],
                  order_model: "IPHONE XS MAX 646GB",
                  part_number: "MDR6080",
                  product_type: "HP",
                  new_customer: "0",
                  segment: "10",
                  contract: "24",
                  upfront_installment: null,
                  prices: []
                },
                {
                  name: "iPhone XS Max 64GB Space Grey",
                  sku: "iphonexsmax64gbspacegrey",
                  rrp: "5399.00",
                  discounted_device_rrp: "0.00",
                  color: "Grey",
                  memory: "64GB",
                  order_color: "GRY",
                  order_category: "HP",
                  color_hexa: "#808080",
                  image: "/media/catalog/product/f/r/front_900x900_18.png",
                  sub_images: [
                    "/media/catalog/product/f/r/front_900x900_18.png",
                    "/media/catalog/product/s/i/side_900x900_19.png",
                    "/media/catalog/product/b/a/back_900x900_17.png"
                  ],
                  order_model: "IPHONE XS MAX 64GB",
                  part_number: "MDR6080",
                  product_type: "HP",
                  new_customer: "0",
                  segment: "10",
                  contract: "24",
                  upfront_installment: null,
                  prices: []
                }
              ]
            },
            {
              name: "nubia Red Magic 3",
              sku: "Nubia-Red-Magic-3",
              price: 0,
              quntity: null,
              order_monthly_pay: "188.00",
              most_popular: "0",
              rm: "499.00",
              rrp_rm_strick_price: "2199.00",
              main_image: "/media/catalog/product/f/r/front-black_1.png",
              sub_images: [
                "/media/catalog/product/f/r/front-black_1.png",
                "/media/catalog/product/n/e/new_2.png"
              ],
              dimension: "171.7 X 78.5 X 9.6(6.6)mm",
              weight: null,
              splash_water_dust_resistant: "0",
              stock: "Limited Stock",
              order_category: "HP",
              order_model: "REDMAGIC3 128GB",
              order_brand: "NUBIA",
              segment: "10",
              default_selected_color: "Black",
              default_selected_memory: "128GB",
              stock_indicator_image: "/media/catalog/product/n/e/new_2.png",
              stock_indicator_text:
                '<span style="font-weight: bold; font-size: 12pt;">NEW LAUNCH</span><br /><span style="font-size: 10pt;">Get yours now. <a href="https://www.google.com/">here</a></span>',
              default_device_option: "deviceBundle",
              associated_device_product: [
                {
                  name: "nubia Red Magic 3 Black",
                  sku: "nubiaRedMagic3128gbblack",
                  rrp: "2199.00",
                  discounted_device_rrp: "0.00",
                  color: "Black",
                  memory: "128GB",
                  order_color: "BLK",
                  order_category: "HP",
                  color_hexa: "#000000",
                  image: "/media/catalog/product/f/r/front-black.png",
                  sub_images: [
                    "/media/catalog/product/f/r/front-black.png",
                    "/media/catalog/product/r/i/right-side-black1.png",
                    "/media/catalog/product/b/a/back-black.png"
                  ],
                  order_model: "REDMAGIC3 128GB",
                  part_number: "MDR10053",
                  product_type: "HP",
                  new_customer: "0",
                  segment: null,
                  contract: "24",
                  upfront_installment: null,
                  prices: {
                    upfront_price: "150",
                    device_price: "1300",
                    penalty_price: "850",
                    supplementary_count: 0,
                    special_price: 0
                  }
                },
                {
                  name: "nubia Red Magic 3 Red",
                  sku: "nubiaRedMagic3128gbred",
                  rrp: "2199.00",
                  discounted_device_rrp: "0.00",
                  color: "Red",
                  memory: "128GB",
                  order_color: "RED",
                  order_category: "HP",
                  color_hexa: "#b9253b",
                  image: "/media/catalog/product/f/r/front-red.png",
                  sub_images: [
                    "/media/catalog/product/f/r/front-red.png",
                    "/media/catalog/product/r/i/right-side-red1.png",
                    "/media/catalog/product/b/a/back-red.png"
                  ],
                  order_model: "REDMAGIC3 128GB",
                  part_number: "MDR10053",
                  product_type: "HP",
                  new_customer: "0",
                  segment: null,
                  contract: "24",
                  upfront_installment: null,
                  prices: []
                }
              ]
            }
          ]
        }
      ],
      upper_age_limit: "0",
      lower_age_limit: "1000",
      promotion_message: "Size up with L Pass to get more Internet and savings"
    }
  ];
  const MockPassService = {
    getPlanPassDevice: jasmine
      .createSpy("getPlanPassDevice")
      .and.returnValue(Observable.of(response))
  };
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        
        IconModule,
        materialModules,
      ],
      declarations: [
        MoonPlanWithPassDetailsComponent,
        PageLoaderComponent,
        DetailBannerTextLeftComponent,
        MoonStickySummarySectionComponent,
        MoonSummarySectionComponent,
        MoonPlanWithDeviceDetailsComponent,
        NotificationErrorComponent,
        DeviceDetailsStorageComponent,
        DeviceDetailsNumberComponent,
        LosingSupplementaryLinePopupComponent,
        MoonColorStorageComponent,
        SupplementaryLinesComponent,
        DeviceSupplementaryLinesComponent,
        CobpComponent,
        NoteSectionComponent,
        ChooseYourWayComponent,
        MoreSupplementaryPopupComponent,
        AgeEligibilityPopupComponent,
        NotificationErrorComponent,
        NotificationBarComponent,
        DeviceDisclaimerComponent,
        SwitchToCelcomComponent,
        NricInputComponent,
        sharedPipes,
        MsisdnInputComponent,
        OtpInputComponent,
        SearchHighlight,
        OmniBannerComponent
      ],
      providers: [
        { provide: AppService, useClass: AppMockService },
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useClass: MockactivatedRoute
        },
        EStoreAnalysticsService,
        AnalyticsService,
        RendererService,
        SeoService,
        DecimalPipe,
        Broadcaster,
        NotificationPopupEvent,
        CookieService,
        UserService,
        CartService,
        BundleService,
        OrderInfoService,
        RedirectionService,
        SupplimentaryLinesService,
        HttpClient,
        BroadbandService,
        DeviceDataService,
        CommonUtilService,
        { provide: MoonPlanWithPassDetailsService, useValue: MockPassService },
        PlanPurchaseService,
        HomeService,
        ProductService,
        GetParametersService
      ]
    });
  });

  beforeEach(inject(
    [MoonPlanWithPassDetailsService],
    moonPlanWithPassDetailsService => {
      service = moonPlanWithPassDetailsService;
      fixture = TestBed.createComponent(MoonPlanWithPassDetailsComponent);
      component = fixture.componentInstance;
      component.editProduct = {};
    }
  ));

  it("should create Plan with Pass Details Component", () => {
    expect(component).toBeTruthy();
  });
  it("should test ngOnInit", () => {
    const spy = spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it("should test onCancellingSwitchingPassTab", () => {
    component.onCancellingSwitchingPassTab();
    expect(component.IsDispalySwitchingPurchaseTypeTabPopup).toBeFalsy();
  });

  it("should test errorDisplay", () => {
    component.errorDisplay();
    expect(component.loading).toBeFalsy();
    expect(component.isBanner).toBeTruthy();
  });
  it("should test OnMnpEligibilityPlanPurchase", () => {
    let data = { "action": "MNP", "isEligible": true, "portNumber": "01243234545", "principleMobileNumber": "1234", "customerData": "" }
    component.PlanPurchaseDataToPass = { "plan_title": "Base Plan", "PlanOnlyComponentToShow": true, "cobpEligible": false, "name": "XP Lite Plan", "sku": "xp-b-plan", "offer": "20 Cents/Min Calls and SMS To All Networks", "selected_offer_title": null, "monthly_plan": "28.00", "data_limit": "2", "order_plan_bundle": "PB12828", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP Lite Plan", "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "2 GB", "key_text": "RM 20", "image_url": "/media/catalog/product", "device_allowed": null, "selected_pass": false };
    component.OnMnpEligibilityPlanPurchase(data);
    expect(component.PlanPurchaseDataToPass.portNumber).toBe('01243234545');
    expect(component.PlanPurchaseDataToPass.PrincipalLine).toBe('1234');
    // expect(component.isBanner).toBeTruthy();
  });
  it("should test OnMnpEligibilityPlanPurchase", () => {
    let data = { "action": "MNP", "isEligible": false, "portNumber": "01243234545", "principleMobileNumber": "", "customerData": "" }
    component.PlanPurchaseDataToPass = { "PlanMonthlyPay": "200", "OneTimePayment": 123.122, "plan_title": "Base Plan", "PlanOnlyComponentToShow": true, "cobpEligible": false, "name": "XP Lite Plan", "sku": "xp-b-plan", "offer": "20 Cents/Min Calls and SMS To All Networks", "selected_offer_title": null, "monthly_plan": "28.00", "data_limit": "2", "order_plan_bundle": "PB12828", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP Lite Plan", "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "2 GB", "key_text": "RM 20", "image_url": "/media/catalog/product", "device_allowed": null, "selected_pass": false };
    component.OnMnpEligibilityPlanPurchase(data);
    // expect(component.loading).toBeFalsy();
    // expect(component.isBanner).toBeTruthy();
  });
  it("should test setPlanPassData", () => {
    component.PlanPassDeviceDetailResponse = { "name": "Xp Lite", "sku": "xp-lite", "url_key": "xp-lite", "base_plan": [{ "name": "XP Lite Plan", "sku": "xp-b-plan", "offer": "20 Cents/Min Calls and SMS To All Networks", "selected_offer_title": null, "monthly_plan": "28.00", "data_limit": "2", "order_plan_bundle": "PB12828", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP Lite Plan", "plan_title": "Base Plan", "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "2 GB", "key_text": "RM 20", "image_url": "/media/catalog/product", "device_allowed": null, "selected_pass": false }], "pass_plan": [{ "name": "XP M Pass", "sku": "xp-m-pass", "offer": "4GB Internet\r\n<span style = \"color: blue\">Free 3GB Video Walla</span>\r\nFree* extra 1GB Video Walla™", "selected_offer_title": null, "monthly_plan": "10.00", "data_limit": "3", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP M Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "3 GB", "key_text": "RM 20 ", "image_url": "/media/catalog/product", "device_allowed": "0", "selected_pass": false }, { "name": "XP L Pass", "sku": "xp-l-pass", "offer": "11GB Internet\r\nFree 3GB Video Walla\r\nFree* 1 hour Ultra Hour Pass™ daily", "selected_offer_title": null, "monthly_plan": "40.00", "data_limit": "10", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP L Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "10 GB", "key_text": "RM 40", "image_url": "/media/catalog/product", "device_allowed": "1", "selected_pass": false, "associated_bundle_product": [{ "name": "Oppo F5", "sku": "Oppo-F5", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "1", "rm": "0.00", "rrp_rm_strick_price": "1224.55", "main_image": "/media/catalog/product/f/r/front_1_7.png", "sub_images": ["/media/catalog/product/f/r/front_1_7.png"], "dimension": "155.9 ×75.8 × 7.7mm ", "weight": "195.0000", "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": " MT6763T", "order_brand": "OPPO", "segment": "10", "default_selected_color": "Gold", "default_selected_memory": "32GB", "stock_indicator_image": "/media/catalog/product", "stock_indicator_text": null, "default_device_option": "easyPhone", "associated_device_product": [{ "name": "Oppo F5 32GB Gold ", "sku": "oppf5gld32gb", "rrp": "1224.55", "discounted_device_rrp": "0.00", "color": "Gold", "memory": "32GB", "order_color": "GLD", "order_category": "HP", "color_hexa": "#cdbeab", "image": "/media/catalog/product/f/r/front_1_6.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_1_6.png", "/media/catalog/product/9/0/900x900_5_2.png"], "order_model": "F5", "part_number": "MDR5617", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "1000", "device_price": "10", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }, { "name": "Oppo F5 32GB Black", "sku": "oppf5b32gb", "rrp": "1224.55", "discounted_device_rrp": "0.00", "color": "Black", "memory": "32GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front_64.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_64.png", "/media/catalog/product/9/0/900x900_8.png"], "order_model": "F5", "part_number": "MDR5617", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "1000", "device_price": "10", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "iPhone 8", "sku": "iPhone-8", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "1748.00", "rrp_rm_strick_price": "3394.00", "main_image": "/media/catalog/product/f/r/front_55.png", "sub_images": ["/media/catalog/product/f/r/front_55.png", "/media/catalog/product/b/a/badge.png"], "dimension": "138.4 x 67.3 x 7.3", "weight": "195.0000", "splash_water_dust_resistant": "1", "stock": "Limited Stock", "order_category": "HP", "order_model": "Apple A10 Fusion", "order_brand": "APPLE", "segment": "10", "default_selected_color": "Gold", "default_selected_memory": "64GB", "stock_indicator_image": "/media/catalog/product/b/a/badge.png", "stock_indicator_text": "jhjhgjhgjhkjhjkh", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "iPhone 8 64GB Gold", "sku": "i8gld64GB", "rrp": "3394.00", "discounted_device_rrp": "1000.00", "color": "Gold", "memory": "64GB", "order_color": "GLD", "order_category": "HP", "color_hexa": "#cdbeab", "image": "/media/catalog/product/9/0/900x900_8_3.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/9/0/900x900_8_3.png", "/media/catalog/product/9/0/900x900_9_2.png", "/media/catalog/product/9/0/900x900_10_2.png"], "order_model": "IPHONE 8 64GB", "part_number": "MDR5589", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "350", "device_price": "99", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }, { "name": "iPhone 8 64GB Space Grey ", "sku": "i8grey64GB", "rrp": "3394.00", "discounted_device_rrp": "2395.00", "color": "Grey", "memory": "64GB", "order_color": "GRY", "order_category": "HP", "color_hexa": "#808080", "image": "/media/catalog/product/f/r/front_14.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_14.png", "/media/catalog/product/9/0/900x900_8_5.png", "/media/catalog/product/9/0/900x900_9_4.png"], "order_model": "IPHONE 8 64GB", "part_number": "MDR5589", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "350", "device_price": "99", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "nubia Red Magic 3", "sku": "Nubia-Red-Magic-3", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "499.00", "rrp_rm_strick_price": "2199.00", "main_image": "/media/catalog/product/f/r/front-black_1.png", "sub_images": ["/media/catalog/product/f/r/front-black_1.png", "/media/catalog/product/n/e/new_2.png"], "dimension": "171.7 X 78.5 X 9.6(6.6)mm", "weight": null, "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": "REDMAGIC3 128GB", "order_brand": "NUBIA", "segment": "10", "default_selected_color": "Black", "default_selected_memory": "128GB", "stock_indicator_image": "/media/catalog/product/n/e/new_2.png", "stock_indicator_text": "<span style=\"font-weight: bold; font-size: 12pt;\">NEW LAUNCH</span><br /><span style=\"font-size: 10pt;\">Get yours now. <a href=\"https://www.google.com/\">here</a></span>", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "nubia Red Magic 3 Black", "sku": "nubiaRedMagic3128gbblack", "rrp": "2199.00", "discounted_device_rrp": "0.00", "color": "Black", "memory": "128GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front-black.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front-black.png", "/media/catalog/product/r/i/right-side-black1.png", "/media/catalog/product/b/a/back-black.png"], "order_model": "REDMAGIC3 128GB", "part_number": "MDR10053", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "150", "device_price": "1358", "penalty_price": "850", "supplementary_count": 0, "special_price": 0 } }, { "name": "nubia Red Magic 3 Red", "sku": "nubiaRedMagic3128gbred", "rrp": "2199.00", "discounted_device_rrp": "0.00", "color": "Red", "memory": "128GB", "order_color": "RED", "order_category": "HP", "color_hexa": "#b9253b", "image": "/media/catalog/product/f/r/front-red.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front-red.png", "/media/catalog/product/r/i/right-side-red1.png", "/media/catalog/product/b/a/back-red.png"], "order_model": "REDMAGIC3 128GB", "part_number": "MDR10053", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "150", "device_price": "1358", "penalty_price": "850", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "Samsung Galaxy A50", "sku": "Samsung-Galaxy-A50", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "0.00", "rrp_rm_strick_price": "1199.00", "main_image": "/media/catalog/product/a/5/a50_white_900x900.png", "sub_images": ["/media/catalog/product/a/5/a50_white_900x900.png", "/media/catalog/product/n/e/new_3.png"], "dimension": null, "weight": null, "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": "GALAXY A50 128GB", "order_brand": "SAMSUNG", "segment": "10", "default_selected_color": "Black", "default_selected_memory": "128GB", "stock_indicator_image": "/media/catalog/product/n/e/new_3.png", "stock_indicator_text": "<p style=\"margin:0\"><strong>NEW LAUNCH</strong></p>\r\n<p style=\"margin:0\">Get FREE exclusive Blackpink official merchandise* with Galaxy A50. </p>\r\n<span style=\"font-size: 7.0pt;margin-top:0\">*The merchandise are available on a first-come, first-served basis and while stock last.</span>", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "Samsung Galaxy A50 Black", "sku": "SamsungGalaxyA50128gbblack", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "Black", "memory": "128GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front_900x900_7.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900.jpg", "/media/catalog/product/f/r/front_900x900_7.png", "/media/catalog/product/s/i/side_900x900_5.png", "/media/catalog/product/b/a/back_900x900_10.png", "/media/catalog/product/i/m/image_carousel_-_a50.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "550", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }, { "name": "Samsung Galaxy A50 White", "sku": "SamsungGalaxyA50128gbwhite", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "White", "memory": "128GB", "order_color": "WHT", "order_category": "HP", "color_hexa": "#ffffff", "image": "/media/catalog/product/f/r/front_900x900_1_11.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900_1.jpg", "/media/catalog/product/f/r/front_900x900_1_11.png", "/media/catalog/product/s/i/side_900x900_1_10.png", "/media/catalog/product/b/a/back_900x900_1_10.png", "/media/catalog/product/i/m/image_carousel_-_a50_1.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "700", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }, { "name": "Samsung Galaxy A50 Blue", "sku": "SamsungGalaxyA50128gbblue", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "Blue", "memory": "128GB", "order_color": "BLU", "order_category": "HP", "color_hexa": "#48a5d0", "image": "/media/catalog/product/f/r/front_900x900_2_15.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900_2.jpg", "/media/catalog/product/f/r/front_900x900_2_15.png", "/media/catalog/product/s/i/side_900x900_2_14.png", "/media/catalog/product/b/a/back_900x900_2_3.png", "/media/catalog/product/i/m/image_carousel_-_a50_2.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "700", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }] }] }], "upper_age_limit": null, "lower_age_limit": null, "promotion_message": "Size up with L Pass to get more Internet and savings", "type_purchse": { "dealer": { "newline": false, "cobp": true, "mnp": false } } }
    // component.PlanPurchaseDataToPass = {"PlanMonthlyPay":"200","OneTimePayment":123.122,"plan_title":"Base Plan","PlanOnlyComponentToShow":true,"cobpEligible":false,"name":"XP Lite Plan","sku":"xp-b-plan","offer":"20 Cents/Min Calls and SMS To All Networks","selected_offer_title":null,"monthly_plan":"28.00","data_limit":"2","order_plan_bundle":"PB12828","segment":null,"upfront_installment":null,"contract":null,"plan_name":"XP Lite Plan","plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"2 GB","key_text":"RM 20","image_url":"/media/catalog/product","device_allowed":null,"selected_pass":false};
    component.setPlanPassData();
    // expect(component.loading).toBeFalsy();
    // expect(component.isBanner).toBeTruthy();
  });
  it("should test addPass", () => {
    let data = { "name": "XP M Pass", "sku": "xp-m-pass", "offer": "4GB Internet\r\n<span style = \"color: blue\">Free 3GB Video Walla</span>\r\nFree* extra 1GB Video Walla™", "selected_offer_title": null, "monthly_plan": "10.00", "data_limit": "3", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP M Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "3 GB", "key_text": "RM 20 ", "image_url": "/media/catalog/product", "device_allowed": "0", "selected_pass": false }
    component.PlanPassDeviceDetailResponse = { "name": "Xp Lite", "sku": "xp-lite", "url_key": "xp-lite", "base_plan": [{ "name": "XP Lite Plan", "sku": "xp-b-plan", "offer": "20 Cents/Min Calls and SMS To All Networks", "selected_offer_title": null, "monthly_plan": "28.00", "data_limit": "2", "order_plan_bundle": "PB12828", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP Lite Plan", "plan_title": "Base Plan", "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "2 GB", "key_text": "RM 20", "image_url": "/media/catalog/product", "device_allowed": null, "selected_pass": false }], "pass_plan": [{ "name": "XP M Pass", "sku": "xp-m-pass", "offer": "4GB Internet\r\n<span style = \"color: blue\">Free 3GB Video Walla</span>\r\nFree* extra 1GB Video Walla™", "selected_offer_title": null, "monthly_plan": "10.00", "data_limit": "3", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP M Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "3 GB", "key_text": "RM 20 ", "image_url": "/media/catalog/product", "device_allowed": "0", "selected_pass": false }, { "name": "XP L Pass", "sku": "xp-l-pass", "offer": "11GB Internet\r\nFree 3GB Video Walla\r\nFree* 1 hour Ultra Hour Pass™ daily", "selected_offer_title": null, "monthly_plan": "40.00", "data_limit": "10", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP L Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "10 GB", "key_text": "RM 40", "image_url": "/media/catalog/product", "device_allowed": "1", "selected_pass": false, "associated_bundle_product": [{ "name": "Oppo F5", "sku": "Oppo-F5", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "1", "rm": "0.00", "rrp_rm_strick_price": "1224.55", "main_image": "/media/catalog/product/f/r/front_1_7.png", "sub_images": ["/media/catalog/product/f/r/front_1_7.png"], "dimension": "155.9 ×75.8 × 7.7mm ", "weight": "195.0000", "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": " MT6763T", "order_brand": "OPPO", "segment": "10", "default_selected_color": "Gold", "default_selected_memory": "32GB", "stock_indicator_image": "/media/catalog/product", "stock_indicator_text": null, "default_device_option": "easyPhone", "associated_device_product": [{ "name": "Oppo F5 32GB Gold ", "sku": "oppf5gld32gb", "rrp": "1224.55", "discounted_device_rrp": "0.00", "color": "Gold", "memory": "32GB", "order_color": "GLD", "order_category": "HP", "color_hexa": "#cdbeab", "image": "/media/catalog/product/f/r/front_1_6.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_1_6.png", "/media/catalog/product/9/0/900x900_5_2.png"], "order_model": "F5", "part_number": "MDR5617", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "1000", "device_price": "10", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }, { "name": "Oppo F5 32GB Black", "sku": "oppf5b32gb", "rrp": "1224.55", "discounted_device_rrp": "0.00", "color": "Black", "memory": "32GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front_64.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_64.png", "/media/catalog/product/9/0/900x900_8.png"], "order_model": "F5", "part_number": "MDR5617", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "1000", "device_price": "10", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "iPhone 8", "sku": "iPhone-8", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "1748.00", "rrp_rm_strick_price": "3394.00", "main_image": "/media/catalog/product/f/r/front_55.png", "sub_images": ["/media/catalog/product/f/r/front_55.png", "/media/catalog/product/b/a/badge.png"], "dimension": "138.4 x 67.3 x 7.3", "weight": "195.0000", "splash_water_dust_resistant": "1", "stock": "Limited Stock", "order_category": "HP", "order_model": "Apple A10 Fusion", "order_brand": "APPLE", "segment": "10", "default_selected_color": "Gold", "default_selected_memory": "64GB", "stock_indicator_image": "/media/catalog/product/b/a/badge.png", "stock_indicator_text": "jhjhgjhgjhkjhjkh", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "iPhone 8 64GB Gold", "sku": "i8gld64GB", "rrp": "3394.00", "discounted_device_rrp": "1000.00", "color": "Gold", "memory": "64GB", "order_color": "GLD", "order_category": "HP", "color_hexa": "#cdbeab", "image": "/media/catalog/product/9/0/900x900_8_3.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/9/0/900x900_8_3.png", "/media/catalog/product/9/0/900x900_9_2.png", "/media/catalog/product/9/0/900x900_10_2.png"], "order_model": "IPHONE 8 64GB", "part_number": "MDR5589", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "350", "device_price": "99", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }, { "name": "iPhone 8 64GB Space Grey ", "sku": "i8grey64GB", "rrp": "3394.00", "discounted_device_rrp": "2395.00", "color": "Grey", "memory": "64GB", "order_color": "GRY", "order_category": "HP", "color_hexa": "#808080", "image": "/media/catalog/product/f/r/front_14.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_14.png", "/media/catalog/product/9/0/900x900_8_5.png", "/media/catalog/product/9/0/900x900_9_4.png"], "order_model": "IPHONE 8 64GB", "part_number": "MDR5589", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "350", "device_price": "99", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "nubia Red Magic 3", "sku": "Nubia-Red-Magic-3", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "499.00", "rrp_rm_strick_price": "2199.00", "main_image": "/media/catalog/product/f/r/front-black_1.png", "sub_images": ["/media/catalog/product/f/r/front-black_1.png", "/media/catalog/product/n/e/new_2.png"], "dimension": "171.7 X 78.5 X 9.6(6.6)mm", "weight": null, "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": "REDMAGIC3 128GB", "order_brand": "NUBIA", "segment": "10", "default_selected_color": "Black", "default_selected_memory": "128GB", "stock_indicator_image": "/media/catalog/product/n/e/new_2.png", "stock_indicator_text": "<span style=\"font-weight: bold; font-size: 12pt;\">NEW LAUNCH</span><br /><span style=\"font-size: 10pt;\">Get yours now. <a href=\"https://www.google.com/\">here</a></span>", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "nubia Red Magic 3 Black", "sku": "nubiaRedMagic3128gbblack", "rrp": "2199.00", "discounted_device_rrp": "0.00", "color": "Black", "memory": "128GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front-black.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front-black.png", "/media/catalog/product/r/i/right-side-black1.png", "/media/catalog/product/b/a/back-black.png"], "order_model": "REDMAGIC3 128GB", "part_number": "MDR10053", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "150", "device_price": "1358", "penalty_price": "850", "supplementary_count": 0, "special_price": 0 } }, { "name": "nubia Red Magic 3 Red", "sku": "nubiaRedMagic3128gbred", "rrp": "2199.00", "discounted_device_rrp": "0.00", "color": "Red", "memory": "128GB", "order_color": "RED", "order_category": "HP", "color_hexa": "#b9253b", "image": "/media/catalog/product/f/r/front-red.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front-red.png", "/media/catalog/product/r/i/right-side-red1.png", "/media/catalog/product/b/a/back-red.png"], "order_model": "REDMAGIC3 128GB", "part_number": "MDR10053", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "150", "device_price": "1358", "penalty_price": "850", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "Samsung Galaxy A50", "sku": "Samsung-Galaxy-A50", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "0.00", "rrp_rm_strick_price": "1199.00", "main_image": "/media/catalog/product/a/5/a50_white_900x900.png", "sub_images": ["/media/catalog/product/a/5/a50_white_900x900.png", "/media/catalog/product/n/e/new_3.png"], "dimension": null, "weight": null, "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": "GALAXY A50 128GB", "order_brand": "SAMSUNG", "segment": "10", "default_selected_color": "Black", "default_selected_memory": "128GB", "stock_indicator_image": "/media/catalog/product/n/e/new_3.png", "stock_indicator_text": "<p style=\"margin:0\"><strong>NEW LAUNCH</strong></p>\r\n<p style=\"margin:0\">Get FREE exclusive Blackpink official merchandise* with Galaxy A50. </p>\r\n<span style=\"font-size: 7.0pt;margin-top:0\">*The merchandise are available on a first-come, first-served basis and while stock last.</span>", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "Samsung Galaxy A50 Black", "sku": "SamsungGalaxyA50128gbblack", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "Black", "memory": "128GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front_900x900_7.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900.jpg", "/media/catalog/product/f/r/front_900x900_7.png", "/media/catalog/product/s/i/side_900x900_5.png", "/media/catalog/product/b/a/back_900x900_10.png", "/media/catalog/product/i/m/image_carousel_-_a50.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "550", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }, { "name": "Samsung Galaxy A50 White", "sku": "SamsungGalaxyA50128gbwhite", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "White", "memory": "128GB", "order_color": "WHT", "order_category": "HP", "color_hexa": "#ffffff", "image": "/media/catalog/product/f/r/front_900x900_1_11.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900_1.jpg", "/media/catalog/product/f/r/front_900x900_1_11.png", "/media/catalog/product/s/i/side_900x900_1_10.png", "/media/catalog/product/b/a/back_900x900_1_10.png", "/media/catalog/product/i/m/image_carousel_-_a50_1.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "700", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }, { "name": "Samsung Galaxy A50 Blue", "sku": "SamsungGalaxyA50128gbblue", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "Blue", "memory": "128GB", "order_color": "BLU", "order_category": "HP", "color_hexa": "#48a5d0", "image": "/media/catalog/product/f/r/front_900x900_2_15.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900_2.jpg", "/media/catalog/product/f/r/front_900x900_2_15.png", "/media/catalog/product/s/i/side_900x900_2_14.png", "/media/catalog/product/b/a/back_900x900_2_3.png", "/media/catalog/product/i/m/image_carousel_-_a50_2.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "700", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }] }] }], "upper_age_limit": null, "lower_age_limit": null, "promotion_message": "Size up with L Pass to get more Internet and savings", "type_purchse": { "dealer": { "newline": false, "cobp": true, "mnp": false } } }
    // component.PlanPurchaseDataToPass = {"PlanMonthlyPay":"200","OneTimePayment":123.122,"plan_title":"Base Plan","PlanOnlyComponentToShow":true,"cobpEligible":false,"name":"XP Lite Plan","sku":"xp-b-plan","offer":"20 Cents/Min Calls and SMS To All Networks","selected_offer_title":null,"monthly_plan":"28.00","data_limit":"2","order_plan_bundle":"PB12828","segment":null,"upfront_installment":null,"contract":null,"plan_name":"XP Lite Plan","plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"2 GB","key_text":"RM 20","image_url":"/media/catalog/product","device_allowed":null,"selected_pass":false};
    component.basePlan = { "name": "XP Lite Plan", "sku": "xp-b-plan", "offer": "20 Cents/Min Calls and SMS To All Networks", "selected_offer_title": null, "monthly_plan": "28.00", "data_limit": "2", "order_plan_bundle": "PB12828", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP Lite Plan", "plan_title": "Base Plan", "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "2 GB", "key_text": "RM 20", "image_url": "/media/catalog/product", "device_allowed": null, "selected_pass": false, "bundleSku": "xp-lite", "bundleName": "Xp Lite", "url_key": "xp-lite", "isMoon": true }
    component.selectedPlanInfo = { "dataLimit": "", "name": "", "sku": "", "monthlyPay": "", "deviceAllowed": "", "key_figures_text": "", "offer": "", "key_text": "", "totalPay": "" }
    localStorage.setItem('MNP-FLOW', 'Yes');
    component.addPass(data);
    // localStorage.removeItem('MNP-FLOW');
    expect(component.IsDispalySwitchingPurchaseTypeTabPopup).toBeFalsy();
    expect(component.totalDataLimit).toBe(5);
    expect(component.totalPrice).toBe(38);
    // expect(component.isBanner).toBeTruthy();
  });
  it("should test onContinueSwitchingPassTab - add", () => {
    const spy = spyOn(component, 'onContinueSwitchingPassTab').and.callThrough();
    let data = { "name": "XP M Pass", "sku": "xp-m-pass", "offer": "4GB Internet\r\n<span style = \"color: blue\">Free 3GB Video Walla</span>\r\nFree* extra 1GB Video Walla™", "selected_offer_title": null, "monthly_plan": "10.00", "data_limit": "3", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP M Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "3 GB", "key_text": "RM 20 ", "image_url": "/media/catalog/product", "device_allowed": "0", "selected_pass": false }
    component.PlanPassDeviceDetailResponse = { "name": "Xp Lite", "sku": "xp-lite", "url_key": "xp-lite", "base_plan": [{ "name": "XP Lite Plan", "sku": "xp-b-plan", "offer": "20 Cents/Min Calls and SMS To All Networks", "selected_offer_title": null, "monthly_plan": "28.00", "data_limit": "2", "order_plan_bundle": "PB12828", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP Lite Plan", "plan_title": "Base Plan", "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "2 GB", "key_text": "RM 20", "image_url": "/media/catalog/product", "device_allowed": null, "selected_pass": false }], "pass_plan": [{ "name": "XP M Pass", "sku": "xp-m-pass", "offer": "4GB Internet\r\n<span style = \"color: blue\">Free 3GB Video Walla</span>\r\nFree* extra 1GB Video Walla™", "selected_offer_title": null, "monthly_plan": "10.00", "data_limit": "3", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP M Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "3 GB", "key_text": "RM 20 ", "image_url": "/media/catalog/product", "device_allowed": "0", "selected_pass": false }, { "name": "XP L Pass", "sku": "xp-l-pass", "offer": "11GB Internet\r\nFree 3GB Video Walla\r\nFree* 1 hour Ultra Hour Pass™ daily", "selected_offer_title": null, "monthly_plan": "40.00", "data_limit": "10", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP L Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "10 GB", "key_text": "RM 40", "image_url": "/media/catalog/product", "device_allowed": "1", "selected_pass": false, "associated_bundle_product": [{ "name": "Oppo F5", "sku": "Oppo-F5", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "1", "rm": "0.00", "rrp_rm_strick_price": "1224.55", "main_image": "/media/catalog/product/f/r/front_1_7.png", "sub_images": ["/media/catalog/product/f/r/front_1_7.png"], "dimension": "155.9 ×75.8 × 7.7mm ", "weight": "195.0000", "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": " MT6763T", "order_brand": "OPPO", "segment": "10", "default_selected_color": "Gold", "default_selected_memory": "32GB", "stock_indicator_image": "/media/catalog/product", "stock_indicator_text": null, "default_device_option": "easyPhone", "associated_device_product": [{ "name": "Oppo F5 32GB Gold ", "sku": "oppf5gld32gb", "rrp": "1224.55", "discounted_device_rrp": "0.00", "color": "Gold", "memory": "32GB", "order_color": "GLD", "order_category": "HP", "color_hexa": "#cdbeab", "image": "/media/catalog/product/f/r/front_1_6.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_1_6.png", "/media/catalog/product/9/0/900x900_5_2.png"], "order_model": "F5", "part_number": "MDR5617", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "1000", "device_price": "10", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }, { "name": "Oppo F5 32GB Black", "sku": "oppf5b32gb", "rrp": "1224.55", "discounted_device_rrp": "0.00", "color": "Black", "memory": "32GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front_64.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_64.png", "/media/catalog/product/9/0/900x900_8.png"], "order_model": "F5", "part_number": "MDR5617", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "1000", "device_price": "10", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "iPhone 8", "sku": "iPhone-8", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "1748.00", "rrp_rm_strick_price": "3394.00", "main_image": "/media/catalog/product/f/r/front_55.png", "sub_images": ["/media/catalog/product/f/r/front_55.png", "/media/catalog/product/b/a/badge.png"], "dimension": "138.4 x 67.3 x 7.3", "weight": "195.0000", "splash_water_dust_resistant": "1", "stock": "Limited Stock", "order_category": "HP", "order_model": "Apple A10 Fusion", "order_brand": "APPLE", "segment": "10", "default_selected_color": "Gold", "default_selected_memory": "64GB", "stock_indicator_image": "/media/catalog/product/b/a/badge.png", "stock_indicator_text": "jhjhgjhgjhkjhjkh", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "iPhone 8 64GB Gold", "sku": "i8gld64GB", "rrp": "3394.00", "discounted_device_rrp": "1000.00", "color": "Gold", "memory": "64GB", "order_color": "GLD", "order_category": "HP", "color_hexa": "#cdbeab", "image": "/media/catalog/product/9/0/900x900_8_3.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/9/0/900x900_8_3.png", "/media/catalog/product/9/0/900x900_9_2.png", "/media/catalog/product/9/0/900x900_10_2.png"], "order_model": "IPHONE 8 64GB", "part_number": "MDR5589", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "350", "device_price": "99", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }, { "name": "iPhone 8 64GB Space Grey ", "sku": "i8grey64GB", "rrp": "3394.00", "discounted_device_rrp": "2395.00", "color": "Grey", "memory": "64GB", "order_color": "GRY", "order_category": "HP", "color_hexa": "#808080", "image": "/media/catalog/product/f/r/front_14.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_14.png", "/media/catalog/product/9/0/900x900_8_5.png", "/media/catalog/product/9/0/900x900_9_4.png"], "order_model": "IPHONE 8 64GB", "part_number": "MDR5589", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "350", "device_price": "99", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "nubia Red Magic 3", "sku": "Nubia-Red-Magic-3", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "499.00", "rrp_rm_strick_price": "2199.00", "main_image": "/media/catalog/product/f/r/front-black_1.png", "sub_images": ["/media/catalog/product/f/r/front-black_1.png", "/media/catalog/product/n/e/new_2.png"], "dimension": "171.7 X 78.5 X 9.6(6.6)mm", "weight": null, "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": "REDMAGIC3 128GB", "order_brand": "NUBIA", "segment": "10", "default_selected_color": "Black", "default_selected_memory": "128GB", "stock_indicator_image": "/media/catalog/product/n/e/new_2.png", "stock_indicator_text": "<span style=\"font-weight: bold; font-size: 12pt;\">NEW LAUNCH</span><br /><span style=\"font-size: 10pt;\">Get yours now. <a href=\"https://www.google.com/\">here</a></span>", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "nubia Red Magic 3 Black", "sku": "nubiaRedMagic3128gbblack", "rrp": "2199.00", "discounted_device_rrp": "0.00", "color": "Black", "memory": "128GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front-black.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front-black.png", "/media/catalog/product/r/i/right-side-black1.png", "/media/catalog/product/b/a/back-black.png"], "order_model": "REDMAGIC3 128GB", "part_number": "MDR10053", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "150", "device_price": "1358", "penalty_price": "850", "supplementary_count": 0, "special_price": 0 } }, { "name": "nubia Red Magic 3 Red", "sku": "nubiaRedMagic3128gbred", "rrp": "2199.00", "discounted_device_rrp": "0.00", "color": "Red", "memory": "128GB", "order_color": "RED", "order_category": "HP", "color_hexa": "#b9253b", "image": "/media/catalog/product/f/r/front-red.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front-red.png", "/media/catalog/product/r/i/right-side-red1.png", "/media/catalog/product/b/a/back-red.png"], "order_model": "REDMAGIC3 128GB", "part_number": "MDR10053", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "150", "device_price": "1358", "penalty_price": "850", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "Samsung Galaxy A50", "sku": "Samsung-Galaxy-A50", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "0.00", "rrp_rm_strick_price": "1199.00", "main_image": "/media/catalog/product/a/5/a50_white_900x900.png", "sub_images": ["/media/catalog/product/a/5/a50_white_900x900.png", "/media/catalog/product/n/e/new_3.png"], "dimension": null, "weight": null, "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": "GALAXY A50 128GB", "order_brand": "SAMSUNG", "segment": "10", "default_selected_color": "Black", "default_selected_memory": "128GB", "stock_indicator_image": "/media/catalog/product/n/e/new_3.png", "stock_indicator_text": "<p style=\"margin:0\"><strong>NEW LAUNCH</strong></p>\r\n<p style=\"margin:0\">Get FREE exclusive Blackpink official merchandise* with Galaxy A50. </p>\r\n<span style=\"font-size: 7.0pt;margin-top:0\">*The merchandise are available on a first-come, first-served basis and while stock last.</span>", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "Samsung Galaxy A50 Black", "sku": "SamsungGalaxyA50128gbblack", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "Black", "memory": "128GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front_900x900_7.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900.jpg", "/media/catalog/product/f/r/front_900x900_7.png", "/media/catalog/product/s/i/side_900x900_5.png", "/media/catalog/product/b/a/back_900x900_10.png", "/media/catalog/product/i/m/image_carousel_-_a50.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "550", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }, { "name": "Samsung Galaxy A50 White", "sku": "SamsungGalaxyA50128gbwhite", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "White", "memory": "128GB", "order_color": "WHT", "order_category": "HP", "color_hexa": "#ffffff", "image": "/media/catalog/product/f/r/front_900x900_1_11.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900_1.jpg", "/media/catalog/product/f/r/front_900x900_1_11.png", "/media/catalog/product/s/i/side_900x900_1_10.png", "/media/catalog/product/b/a/back_900x900_1_10.png", "/media/catalog/product/i/m/image_carousel_-_a50_1.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "700", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }, { "name": "Samsung Galaxy A50 Blue", "sku": "SamsungGalaxyA50128gbblue", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "Blue", "memory": "128GB", "order_color": "BLU", "order_category": "HP", "color_hexa": "#48a5d0", "image": "/media/catalog/product/f/r/front_900x900_2_15.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900_2.jpg", "/media/catalog/product/f/r/front_900x900_2_15.png", "/media/catalog/product/s/i/side_900x900_2_14.png", "/media/catalog/product/b/a/back_900x900_2_3.png", "/media/catalog/product/i/m/image_carousel_-_a50_2.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "700", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }] }] }], "upper_age_limit": null, "lower_age_limit": null, "promotion_message": "Size up with L Pass to get more Internet and savings", "type_purchse": { "dealer": { "newline": false, "cobp": true, "mnp": false } } }
    // component.PlanPurchaseDataToPass = {"PlanMonthlyPay":"200","OneTimePayment":123.122,"plan_title":"Base Plan","PlanOnlyComponentToShow":true,"cobpEligible":false,"name":"XP Lite Plan","sku":"xp-b-plan","offer":"20 Cents/Min Calls and SMS To All Networks","selected_offer_title":null,"monthly_plan":"28.00","data_limit":"2","order_plan_bundle":"PB12828","segment":null,"upfront_installment":null,"contract":null,"plan_name":"XP Lite Plan","plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"2 GB","key_text":"RM 20","image_url":"/media/catalog/product","device_allowed":null,"selected_pass":false};
    component.basePlan = { "name": "XP Lite Plan", "sku": "xp-b-plan", "offer": "20 Cents/Min Calls and SMS To All Networks", "selected_offer_title": null, "monthly_plan": "28.00", "data_limit": "2", "order_plan_bundle": "PB12828", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP Lite Plan", "plan_title": "Base Plan", "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "2 GB", "key_text": "RM 20", "image_url": "/media/catalog/product", "device_allowed": null, "selected_pass": false, "bundleSku": "xp-lite", "bundleName": "Xp Lite", "url_key": "xp-lite", "isMoon": true }
    component.selectedPlanInfo = { "dataLimit": "", "name": "", "sku": "", "monthlyPay": "", "deviceAllowed": "", "key_figures_text": "", "offer": "", "key_text": "", "totalPay": "" }
    localStorage.setItem('MNP-FLOW', 'Yes');
    component.selectedPassObj = { "name": "XP M Pass", "sku": "xp-m-pass", "offer": "4GB Internet\r\n<span style = \"color: blue\">Free 3GB Video Walla</span>\r\nFree* extra 1GB Video Walla™", "selected_offer_title": null, "monthly_plan": "10.00", "data_limit": "3", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP M Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "3 GB", "key_text": "RM 20 ", "image_url": "/media/catalog/product", "device_allowed": "0", "selected_pass": false };
    component.selectedPassObj = '';
    component.popupActionType = 'add';
    component.onContinueSwitchingPassTab();
    
    expect(spy).toHaveBeenCalled();
  });

  it("should test onContinueSwitchingPassTab - remove", () => {
    const spy = spyOn(component, 'onContinueSwitchingPassTab').and.callThrough();
    let data = { "name": "XP M Pass", "sku": "xp-m-pass", "offer": "4GB Internet\r\n<span style = \"color: blue\">Free 3GB Video Walla</span>\r\nFree* extra 1GB Video Walla™", "selected_offer_title": null, "monthly_plan": "10.00", "data_limit": "3", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP M Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "3 GB", "key_text": "RM 20 ", "image_url": "/media/catalog/product", "device_allowed": "0", "selected_pass": false }
    component.PlanPassDeviceDetailResponse = { "name": "Xp Lite", "sku": "xp-lite", "url_key": "xp-lite", "base_plan": [{ "name": "XP Lite Plan", "sku": "xp-b-plan", "offer": "20 Cents/Min Calls and SMS To All Networks", "selected_offer_title": null, "monthly_plan": "28.00", "data_limit": "2", "order_plan_bundle": "PB12828", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP Lite Plan", "plan_title": "Base Plan", "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "2 GB", "key_text": "RM 20", "image_url": "/media/catalog/product", "device_allowed": null, "selected_pass": false }], "pass_plan": [{ "name": "XP M Pass", "sku": "xp-m-pass", "offer": "4GB Internet\r\n<span style = \"color: blue\">Free 3GB Video Walla</span>\r\nFree* extra 1GB Video Walla™", "selected_offer_title": null, "monthly_plan": "10.00", "data_limit": "3", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP M Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "3 GB", "key_text": "RM 20 ", "image_url": "/media/catalog/product", "device_allowed": "0", "selected_pass": false }, { "name": "XP L Pass", "sku": "xp-l-pass", "offer": "11GB Internet\r\nFree 3GB Video Walla\r\nFree* 1 hour Ultra Hour Pass™ daily", "selected_offer_title": null, "monthly_plan": "40.00", "data_limit": "10", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP L Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "10 GB", "key_text": "RM 40", "image_url": "/media/catalog/product", "device_allowed": "1", "selected_pass": false, "associated_bundle_product": [{ "name": "Oppo F5", "sku": "Oppo-F5", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "1", "rm": "0.00", "rrp_rm_strick_price": "1224.55", "main_image": "/media/catalog/product/f/r/front_1_7.png", "sub_images": ["/media/catalog/product/f/r/front_1_7.png"], "dimension": "155.9 ×75.8 × 7.7mm ", "weight": "195.0000", "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": " MT6763T", "order_brand": "OPPO", "segment": "10", "default_selected_color": "Gold", "default_selected_memory": "32GB", "stock_indicator_image": "/media/catalog/product", "stock_indicator_text": null, "default_device_option": "easyPhone", "associated_device_product": [{ "name": "Oppo F5 32GB Gold ", "sku": "oppf5gld32gb", "rrp": "1224.55", "discounted_device_rrp": "0.00", "color": "Gold", "memory": "32GB", "order_color": "GLD", "order_category": "HP", "color_hexa": "#cdbeab", "image": "/media/catalog/product/f/r/front_1_6.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_1_6.png", "/media/catalog/product/9/0/900x900_5_2.png"], "order_model": "F5", "part_number": "MDR5617", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "1000", "device_price": "10", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }, { "name": "Oppo F5 32GB Black", "sku": "oppf5b32gb", "rrp": "1224.55", "discounted_device_rrp": "0.00", "color": "Black", "memory": "32GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front_64.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_64.png", "/media/catalog/product/9/0/900x900_8.png"], "order_model": "F5", "part_number": "MDR5617", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "1000", "device_price": "10", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "iPhone 8", "sku": "iPhone-8", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "1748.00", "rrp_rm_strick_price": "3394.00", "main_image": "/media/catalog/product/f/r/front_55.png", "sub_images": ["/media/catalog/product/f/r/front_55.png", "/media/catalog/product/b/a/badge.png"], "dimension": "138.4 x 67.3 x 7.3", "weight": "195.0000", "splash_water_dust_resistant": "1", "stock": "Limited Stock", "order_category": "HP", "order_model": "Apple A10 Fusion", "order_brand": "APPLE", "segment": "10", "default_selected_color": "Gold", "default_selected_memory": "64GB", "stock_indicator_image": "/media/catalog/product/b/a/badge.png", "stock_indicator_text": "jhjhgjhgjhkjhjkh", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "iPhone 8 64GB Gold", "sku": "i8gld64GB", "rrp": "3394.00", "discounted_device_rrp": "1000.00", "color": "Gold", "memory": "64GB", "order_color": "GLD", "order_category": "HP", "color_hexa": "#cdbeab", "image": "/media/catalog/product/9/0/900x900_8_3.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/9/0/900x900_8_3.png", "/media/catalog/product/9/0/900x900_9_2.png", "/media/catalog/product/9/0/900x900_10_2.png"], "order_model": "IPHONE 8 64GB", "part_number": "MDR5589", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "350", "device_price": "99", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }, { "name": "iPhone 8 64GB Space Grey ", "sku": "i8grey64GB", "rrp": "3394.00", "discounted_device_rrp": "2395.00", "color": "Grey", "memory": "64GB", "order_color": "GRY", "order_category": "HP", "color_hexa": "#808080", "image": "/media/catalog/product/f/r/front_14.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front_14.png", "/media/catalog/product/9/0/900x900_8_5.png", "/media/catalog/product/9/0/900x900_9_4.png"], "order_model": "IPHONE 8 64GB", "part_number": "MDR5589", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "350", "device_price": "99", "penalty_price": "500", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "nubia Red Magic 3", "sku": "Nubia-Red-Magic-3", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "499.00", "rrp_rm_strick_price": "2199.00", "main_image": "/media/catalog/product/f/r/front-black_1.png", "sub_images": ["/media/catalog/product/f/r/front-black_1.png", "/media/catalog/product/n/e/new_2.png"], "dimension": "171.7 X 78.5 X 9.6(6.6)mm", "weight": null, "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": "REDMAGIC3 128GB", "order_brand": "NUBIA", "segment": "10", "default_selected_color": "Black", "default_selected_memory": "128GB", "stock_indicator_image": "/media/catalog/product/n/e/new_2.png", "stock_indicator_text": "<span style=\"font-weight: bold; font-size: 12pt;\">NEW LAUNCH</span><br /><span style=\"font-size: 10pt;\">Get yours now. <a href=\"https://www.google.com/\">here</a></span>", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "nubia Red Magic 3 Black", "sku": "nubiaRedMagic3128gbblack", "rrp": "2199.00", "discounted_device_rrp": "0.00", "color": "Black", "memory": "128GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front-black.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front-black.png", "/media/catalog/product/r/i/right-side-black1.png", "/media/catalog/product/b/a/back-black.png"], "order_model": "REDMAGIC3 128GB", "part_number": "MDR10053", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "150", "device_price": "1358", "penalty_price": "850", "supplementary_count": 0, "special_price": 0 } }, { "name": "nubia Red Magic 3 Red", "sku": "nubiaRedMagic3128gbred", "rrp": "2199.00", "discounted_device_rrp": "0.00", "color": "Red", "memory": "128GB", "order_color": "RED", "order_category": "HP", "color_hexa": "#b9253b", "image": "/media/catalog/product/f/r/front-red.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/f/r/front-red.png", "/media/catalog/product/r/i/right-side-red1.png", "/media/catalog/product/b/a/back-red.png"], "order_model": "REDMAGIC3 128GB", "part_number": "MDR10053", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "150", "device_price": "1358", "penalty_price": "850", "supplementary_count": 0, "special_price": 0 } }] }, { "name": "Samsung Galaxy A50", "sku": "Samsung-Galaxy-A50", "price": 0, "quntity": null, "order_monthly_pay": "188.00", "most_popular": "0", "rm": "0.00", "rrp_rm_strick_price": "1199.00", "main_image": "/media/catalog/product/a/5/a50_white_900x900.png", "sub_images": ["/media/catalog/product/a/5/a50_white_900x900.png", "/media/catalog/product/n/e/new_3.png"], "dimension": null, "weight": null, "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "HP", "order_model": "GALAXY A50 128GB", "order_brand": "SAMSUNG", "segment": "10", "default_selected_color": "Black", "default_selected_memory": "128GB", "stock_indicator_image": "/media/catalog/product/n/e/new_3.png", "stock_indicator_text": "<p style=\"margin:0\"><strong>NEW LAUNCH</strong></p>\r\n<p style=\"margin:0\">Get FREE exclusive Blackpink official merchandise* with Galaxy A50. </p>\r\n<span style=\"font-size: 7.0pt;margin-top:0\">*The merchandise are available on a first-come, first-served basis and while stock last.</span>", "default_device_option": "deviceBundle", "associated_device_product": [{ "name": "Samsung Galaxy A50 Black", "sku": "SamsungGalaxyA50128gbblack", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "Black", "memory": "128GB", "order_color": "BLK", "order_category": "HP", "color_hexa": "#000000", "image": "/media/catalog/product/f/r/front_900x900_7.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900.jpg", "/media/catalog/product/f/r/front_900x900_7.png", "/media/catalog/product/s/i/side_900x900_5.png", "/media/catalog/product/b/a/back_900x900_10.png", "/media/catalog/product/i/m/image_carousel_-_a50.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "550", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }, { "name": "Samsung Galaxy A50 White", "sku": "SamsungGalaxyA50128gbwhite", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "White", "memory": "128GB", "order_color": "WHT", "order_category": "HP", "color_hexa": "#ffffff", "image": "/media/catalog/product/f/r/front_900x900_1_11.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900_1.jpg", "/media/catalog/product/f/r/front_900x900_1_11.png", "/media/catalog/product/s/i/side_900x900_1_10.png", "/media/catalog/product/b/a/back_900x900_1_10.png", "/media/catalog/product/i/m/image_carousel_-_a50_1.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "700", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }, { "name": "Samsung Galaxy A50 Blue", "sku": "SamsungGalaxyA50128gbblue", "rrp": "1199.00", "discounted_device_rrp": "0.00", "color": "Blue", "memory": "128GB", "order_color": "BLU", "order_category": "HP", "color_hexa": "#48a5d0", "image": "/media/catalog/product/f/r/front_900x900_2_15.png", "desc": "24 months contract", "sub_images": ["/media/catalog/product/c/a/carouselimage_900x900_2.jpg", "/media/catalog/product/f/r/front_900x900_2_15.png", "/media/catalog/product/s/i/side_900x900_2_14.png", "/media/catalog/product/b/a/back_900x900_2_3.png", "/media/catalog/product/i/m/image_carousel_-_a50_2.jpg"], "order_model": "GALAXY A50 128GB", "part_number": "MDR10056", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24", "upfront_installment": null, "prices": { "upfront_price": "700", "device_price": "299", "penalty_price": "900", "supplementary_count": 0, "special_price": 0 } }] }] }], "upper_age_limit": null, "lower_age_limit": null, "promotion_message": "Size up with L Pass to get more Internet and savings", "type_purchse": { "dealer": { "newline": false, "cobp": true, "mnp": false } } }
    // component.PlanPurchaseDataToPass = {"PlanMonthlyPay":"200","OneTimePayment":123.122,"plan_title":"Base Plan","PlanOnlyComponentToShow":true,"cobpEligible":false,"name":"XP Lite Plan","sku":"xp-b-plan","offer":"20 Cents/Min Calls and SMS To All Networks","selected_offer_title":null,"monthly_plan":"28.00","data_limit":"2","order_plan_bundle":"PB12828","segment":null,"upfront_installment":null,"contract":null,"plan_name":"XP Lite Plan","plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"2 GB","key_text":"RM 20","image_url":"/media/catalog/product","device_allowed":null,"selected_pass":false};
    component.basePlan = { "name": "XP Lite Plan", "sku": "xp-b-plan", "offer": "20 Cents/Min Calls and SMS To All Networks", "selected_offer_title": null, "monthly_plan": "28.00", "data_limit": "2", "order_plan_bundle": "PB12828", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP Lite Plan", "plan_title": "Base Plan", "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "2 GB", "key_text": "RM 20", "image_url": "/media/catalog/product", "device_allowed": null, "selected_pass": false, "bundleSku": "xp-lite", "bundleName": "Xp Lite", "url_key": "xp-lite", "isMoon": true }
    component.selectedPlanInfo = { "dataLimit": "", "name": "", "sku": "", "monthlyPay": "", "deviceAllowed": "", "key_figures_text": "", "offer": "", "key_text": "", "totalPay": "" }
    localStorage.setItem('MNP-FLOW', 'Yes');
    component.selectedPassObj = { "name": "XP M Pass", "sku": "xp-m-pass", "offer": "4GB Internet\r\n<span style = \"color: blue\">Free 3GB Video Walla</span>\r\nFree* extra 1GB Video Walla™", "selected_offer_title": null, "monthly_plan": "10.00", "data_limit": "3", "order_plan_bundle": "CPT12829", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "XP M Pass", "plan_title": null, "plan_subtitle": null, "product_type": null, "product_text": null, "key_figures_text": "3 GB", "key_text": "RM 20 ", "image_url": "/media/catalog/product", "device_allowed": "0", "selected_pass": false };

    component.popupActionType = 'remove';
    component.onContinueSwitchingPassTab();

    expect(spy).toHaveBeenCalled();
  });

  it('removeAddonPass', () => {
    const spy = spyOn(component, 'removeAddonPass').and.callThrough();
    component.editProduct = undefined;
    component.selectedDeviceInfoForMoon = 'test';
    localStorage.setItem("MNP-FLOW", 'test');
    localStorage.setItem("COBP_FLOW", 'test');
    localStorage.setItem("COBP_login", undefined);
    localStorage.setItem("PrincipleNumberSelected", 'test');
    component.removeAddonPass();

    component.selectedDeviceInfoForMoon = undefined;
    component.removeAddonPass();

    localStorage.removeItem("MNP-FLOW");
    component.removeAddonPass();

    localStorage.removeItem("COBP_FLOW");
    component.removeAddonPass();

    component.editProduct = {};
    component.SelectionAferLogin = '';
    component.basePlan = {selectedPass : undefined};
    component.removeAddonPass();

    component.SelectionAferLogin = undefined;
    component.basePlan = {selectedPass : ""};
    component.removeAddonPass();
    expect(spy).toHaveBeenCalled();
  });

  // it('editFlowSelection', () => {
  //   const spy = spyOn(component, 'editFlowSelection').and.callThrough();
  //   component.editFlowSelection({selectedProduct:{selected_pass_details: ''}});
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('OnContinueMvivaCheck', () => {
  //   const spy = spyOn(component, 'OnContinueMvivaCheck').and.callThrough();
  //   component.OnContinueMvivaCheck({});
  //   expect(spy).toHaveBeenCalled();
  // });
});

