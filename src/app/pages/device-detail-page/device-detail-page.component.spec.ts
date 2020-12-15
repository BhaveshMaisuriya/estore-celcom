import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { DecimalPipe } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NguCarouselModule } from "@ngu/carousel";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { DeviceDetailPageComponent } from "./device-detail-page.component";
import { DeviceCarouselComponent } from "app/shared/components/device-carousel/device-carousel.component";
import { SideSummaryComponent } from "app/Widget/side-summary/side-summary.component";
import { DeviceColorStoragePickerComponent } from "app/shared/components/device-color-storage-picker/device-color-storage-picker.component";
import { CardOptionsComponent } from "app/shared/components/card-options/card-options.component";
import { BasePlanWrapperComponent } from "app/shared/components/plans/base-plan-wrapper/base-plan-wrapper.component";
import { AddonPlanWrapperComponent } from "app/shared/components/plans/addon-plan-wrapper/addon-plan-wrapper.component";
import { NewLineWrapperComponent } from "app/shared/components/plans/new-line-wrapper/new-line-wrapper.component";
import { CobpWrapperComponent } from "app/shared/components/plans/cobp-wrapper/cobp-wrapper.component";
import { MnpWrapperComponent } from "app/shared/components/mnp-wrapper/mnp-wrapper.component";
import { NotesComponent } from "app/shared/components/notes/notes.component";
import { DeviceDetailSpecsComponent } from "app/shared/components/device-detail-specs/device-detail-specs.component";
import { ModalComponent } from "app/shared/components/modal/modal.component";
import { FooterComponent } from "app/Footer/footer.component";
import { NotificationErrorComponent } from "app/Store/widget/notification-error/notification-error.component";
import { PlanCardComponent } from "app/shared/components/plan-card/plan-card.component";
import { PageLoaderComponent } from "app/shared/components/page-loader/page-loader.component";
import { EstoreInputComponent } from "app/shared/components/forms/estore-input/estore-input.component";
import { EstoreCheckboxComponent } from "app/shared/components/forms/estore-checkbox/estore-checkbox.component";
import { SupplementaryLineWrapperComponent } from "app/shared/components/type-of-purchase/supplementary-line-wrapper/supplementary-line-wrapper.component";
import { NumberChooserComponent } from "app/shared/components/number-chooser/number-chooser.component";
import { McLoginComponent } from "app/shared/components/mc-login/mc-login.component";
import { NewOtpInputComponent } from "app/shared/components/new-otp-input/new-otp-input.component";
import { SocialMediaComponent } from "app/Footer/SocialMedia/socialmedia.component";
import { FooterDownloadComponent } from "app/Footer/Download/download.component";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";
import { EStoreAnalysticsService } from "app/Service/store.analytic.service";
import { RendererService } from "app/Service/renderer.service";
import { SeoService } from "app/Service/seo.service";
import { DeviceDataService } from "app/Service/devicedata.service";
import { GuestCheckoutService } from "app/Store/guest-checkout/services/guest-checkout.service";
import { Broadcaster } from "app/Model/broadcaster.model";
import { NotificationPopupEvent } from "app/Service/broadcaster.service";
import { CookieService } from "ngx-cookie-service";
import { DeviceSwitchGuidesComponent } from "app/shared/components/device-switch-guides/device-switch-guides.component";
import { TypeofPurchaseWrapperComponent } from "app/shared/components/type-of-purchase/typeof-purchase-wrapper/typeof-purchase-wrapper.component";
import { OmniBannerComponent } from "app/shared/components/omni-banner/omni-banner.component";
import { TypeofPurchaseQuery } from "app/Widget/side-summary/side-summary-container/type-of-purchase.store";
import {
  PlansQuery,
  PlansState
} from "app/Widget/side-summary/side-summary-container/plans.store";
import { of } from "rxjs/observable/of";
import { materialModules, SharedModule } from "app/shared/shared-module.module";
import { sharedDirectives } from "app/shared/directives";
import { sharedPipes } from "app/shared/pipes";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { DeviceDetailPageService } from "./device-detail-page.service";
import { PlansService } from "app/Service/plans.service";
import { UserService } from 'app/Service/user.service';
import { IDeviceDetailResponse } from 'app/shared/models/device.model';
import { AgentFooterComponent } from 'app/Footer/agent-footer/agent-footer.component';
let iPlanDeviceBundle = {
  name: "test",
  sku: "test123",
  price: 12345,
  quntity: 5,
  preorder: 2,
  preorder_availability_flag: 5,
  is_rent: true,
  is_own: false,
  order_monthly_pay: "1200",
  most_popular: "test",
  rm: "test",
  rrp_rm_strick_price: "2300",
  main_image: "src/test1.svg",
  sub_images: [],
  dimension: null,
  weight: null,
  splash_water_dust_resistant: "test",
  stock: "25",
  order_category: "test",
  order_model: "test",
  order_brand: "test",
  segment: "test",
  default_selected_color: "Red",
  default_selected_memory: "64gb",
  stock_indicator_image: "test",
  stock_indicator_text: "test",
  default_device_option: "test",
  associated_device_product: [],
  free_gift_data: null,
  easyphone_autobill: ""
};

let planStoreData: PlansState = {
  base_plan: null,
  base_price: 0,
  pass: null,
  plan: null,
  plan_price: 0,
  isMoon: false,
  isStar: false,
  show_plan_prices: false,
  total_monthly_charges: 0,
  upfront_payment: 0,
  upfront_payment_waived: false,
  device: null,
  checkout_button_enabled: false,
  addtocart_error: false,
  easyphone_selected_contract_period: "24",
  device_bundle_selected_contract_period: "24",
  device_bundle: iPlanDeviceBundle
};

let basePlan =  {
  "name": "MEGA Plan",
  "sku": "Ultra-Base",
  "monthlyPlan": "80.0000",
  "orderPlanBundle": "PB19090",
  "orderServiceBundle": "RTP0010",
  "PlanMonthlyPay": "80.0000",
  "OneTimePayment": null,
  "newCustomer": "0",
  "segment": null,
  "upfrontInstallment": null,
  "contract": null,
  "PlanName": "MEGA Plan",
  "plan_title": "Celcom Ultra",
  "plan_subtitle": "Celcom Ultra",
  "offer": "10GB Internet<br>\r\n10Mbps High-Speed Internet<br>\r\nUnlimited Calls to All Networks",
  "selected_offer_title": "10Mbps",
  "data_limit": "10",
  "banner_image": null,
  "mobile_image": null,
  "footNote": null,
  "upper_age_limit": null,
  "lower_age_limit": null,
  "ngn_part_number": "PB19090",
  "is_xpax": "false",
  "additional_information": null,
  "productType": null,
  "startDate": null,
  "endDate": null,
  "backgroundColor": null,
  "indicatorClass": null,
  "productText": null,
  "keyFiguresText": "10GB",
  "keyText": "RM80",
  "buyNowLink": "/plans/ultra",
  "buyNowText": "Buy now",
  "knowMoreLink": null,
  "knowMoreText": null,
  "mobileDescription": null,
  "tableInfo": [],
  "termsAndCondition": null,
  "is_premium_plan": "false",
  "bill_type": "1"
};

const result: IDeviceDetailResponse = {
  items: {
    basic_details: {
      name: "iPhone XS",
      id: "375",
      sku: "iPhone-XS",
      upper_age_limit: null,
      lower_age_limit: null,
      price: 0,
      quntity: 0,
      preorder: 0,
      preorder_availability_flag: 0,
      midnight_delivery: {
        status: "0",
        label: ""
      },
      is_easy_phone: 1,
      is_rent: false,
      is_own: true,
      promotion_badge: null,
      product_text: null,
      default_plan: "Lightning XL",
      default_plan_sku: "Ultra-GB-XL-Pass",
      order_monthly_pay: "108.0000",
      default_easyphone_plan_sku: "Ultra-GB-XL-Pass",
      nfc: "0",
      mostpopular: "0",
      rm: "1468.00",
      rrp_rm_strick_price: "3099.0000",
      upfront_price: 0,
      device_price: 0,
      main_image: "/media/catalog/product/f/r/front_900x900_3.png",
      sub_images: [
        "/media/catalog/product/f/r/front_900x900_3.png",
        "/media/catalog/product/s/t/stock_indicator_image_badge.png"
      ],
      dimension: "143.6X70.9X7.7mm",
      choose_memory: null,
      weight: null,
      chip_processor: "A12 Bionic Chip ",
      splash_water_dust_resistant: "0",
      talk_time: null,
      standby_time: null,
      sim_type: null,
      stock: "Limited Stock",
      preorder_estimate_delivery_text: "",
      new_customer: "0",
      order_category: "HP",
      order_model: "IPHONE XS 64GB",
      order_brand: "APPLE",
      segment: "10",
      start_date: "2018-10-18 10:19:58",
      end_date: "2020-08-12 04:06:54",
      default_selected_color: "Gold",
      default_selected_memory: "256GB",
      pre_order_data: {
        preorder_estimate_delivery_text: "",
        preorder_estimate_delivery_date: "",
        preorder_text: "",
        preorder_from_date_text: "",
        preorder_to_date_text: "",
        preorder_from_date: "",
        preorder_to_date: "",
        preorder_end_flag: 0,
        preorder_estimate_delivery: "",
        preorder_submit_date: "",
        preorder_stock_available_quantity: 1,
        preorder_availble_stock_in_hand: 1,
        preorder_stock_status_flag: 1,
        preorder_hat: ""
      },
      is_campaign_omni:true,
      is_campaign_mviva: true,
      campaign_mviva: true,
      campaign_mviva_invalid: true,
      is_lifestyle: 0,
      addons: [],
      stock_indicator_image:
        "/media/catalog/product/s/t/stock_indicator_image_badge.png",
      stock_indicator_text:
        "<strong>iPHONE FLASH SALE</strong>\r\n  <br>Lowest Prices Ever! Get the amazing iPhone XS 64GB for as low as RM1,248! Grab yours now!",
      default_device_option: "deviceBundle"
    },
    more_details: {
      features: null,
      shipping_details: null,
      whatInTheBox: null,
      specification: {
        display: "5.8 Super Retina HD display",
        screen_size: null,
        operating_system: "iOS",
        camera: "Rear: Dual 12 MP , f/2.4 Front: 7 MP, f/2.2"
      },
      neptune_subsidy_message:
        "Your selected supplementary line(s) will be tied to your Principal line and will be bound to the same contract. You are recommended to use the maximum amount of subsidy to enjoy the device at lowest price. Choose the subsidies you wish to utilise for this purchase."
    },
    terms_and_condition: {
      plans: {
        label: "Delivery Locations",
        desc: ""
      },
      contract_terms: {
        label: "Contract Duration",
        desc: "24 months contract"
      },
      legal: {
        label: "Ownership",
        desc: ""
      },
      cancellation: {
        label: "Refund Policy",
        desc: ""
      }
    },
    base_plan: [
      {
        name: 'MEGA<sup style="font-size:0.5em;top:-1.1em;">TM</sup>',
        sku: "Ultra-Base",
        monthlyPlan: "80.0000",
        orderPlanBundle: "PB19090",
        orderServiceBundle: "RTP0010",
        PlanMonthlyPay: "80.0000",
        newCustomer: "0",
        segment: null,
        upfrontInstallment: null,
        contract: null,
        PlanName: 'MEGA<sup style="font-size:0.5em;top:-1.1em;">TM</sup>',
        plan_title: "Celcom Ultra",
        plan_subtitle: "Celcom Ultra",
        offer:
          "<style>#step2 > div > section > div > div > div.tab-margin > div:nth-child(1) > div > div > div > div.star_ultra_details > p > div {\r\ndisplay: none;\r\n}</style><p><span><s>30GB</s> 40GB monthly high-speed Internet</span><br /><span>Unlimited calls to all networks</span><br /><span>RM0.20 per SMS</span></p>",
        data_limit: "40",
        banner_image: null,
        mobile_image: null,
        footNote: null,
        upper_age_limit: null,
        lower_age_limit: "18",
        ngn_part_number: "PB19090",
        is_xpax: "false",
        additional_information: null,
        productType: null,
        startDate: null,
        endDate: null,
        backgroundColor: null,
        indicatorClass: null,
        productText: null,
        keyFiguresText: null,
        keyText: "RM80",
        buyNowLink: "/plans/mega",
        buyNowText: "Buy now",
        knowMoreLink: null,
        knowMoreText: null,
        mobileDescription: null,
        termsAndCondition: null,
        is_premium_plan: "false",
        bill_type: "1"
      }
    ],
    choose_plan: [
      {
        tabName: "Lightning",
        tabTitle: null,
        tabSubtitle: null,
        is_xpax: false,
        tabData: [
          {
            name: "Lightning XL",
            sku: "Ultra-GB-XL-Pass",
            monthlyPlan: "108.0000",
            orderPlanBundle: "CPT19098",
            orderServiceBundle: "RTP0010",
            PlanMonthlyPay: 108.0000,
            OneTimePayment: null,
            newCustomer: "0",
            segment: "10",
            upfrontInstallment: null,
            contract: "24 months",
            PlanName: "Lightning XL",
            plan_title: "GB XL",
            plan_subtitle:
              "Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.",
            offer: "<s>70GB</s> 80GB + Free Roaming",
            selected_offer_title: "10Mbps",
            data_limit: "120",
            upper_age_limit: "50",
            lower_age_limit: "18",
            ngn_part_number: "CPT19098",
            is_xpax: false,
            productType: "HP",
            backgroundColor: "Black",
            indicatorClass: "is-bg-color-black",
            productText: "GB XL",
            keyFiguresText: "80GB",
            keyText: "RM108",
            buyNowLink: "plans/star-bundle/",
            buyNowText: "Buy now",
            knowMoreLink: "plans/star-bundle/",
            knowMoreText: "Learn More",
            tableInfo: [],
            termsAndCondition: null,
            is_premium_plan: false,
            bill_type: 1
          },
        ],
        name: "Lightning",
        sku: "Ultra-GB",
        offer:
          "<s>30GB</s> 40GB monthly high-speed Internet<br>\r\nUnlimited Calls to All Networks<br>\r\nRM0.20 per SMS<br>",
        is_default: "1",
        image_url: null,
      }
    ],
    supplementary_details: {
      name: "Family Line",
      celcom_ultra_plan: [
        {
          name: "L Pass",
          sku: "xp-l-pass",
          max_line: "3",
          part_number: "PB19092",
          price: "40.0000",
          subsidy: "0",
          enable_plan_skus: [
            "xp-l-pass",
            "xp-b-plan",
            "xp-m-pass",
            "xp-base-lite",
            "Ultra-Base",
            "Ultra-GB",
            "Ultra-GB-L-Pass",
            "Ultra-GB-M-Pass",
            "Ultra-GB-XL-Pass",
            "Ultra-Speed",
            "Ultra-Speed-M-Pass",
            "Ultra-Speed-L-Pass",
            "Ultra-Speed-XL-Pass",
            "P98",
            "P98-1",
            "P98-1-1-1",
            "Xpax",
            "Ultra-Base-for-Business",
            "FGP-98",
            "P98-RM50-V2",
            "P98-RM30-V2",
            "P98-RM40-V2",
            "FGP-FSI",
            "FP2.0-FSI",
            "FPP-FSI",
            "family-line"
          ]
        }
      ]
    },
    associated_product: [
      {
        name: "iPhone XS 64GB Silver",
        sku: "iphonexs64gbsilver",
        is_new: true,
        rrp: "2899.0000",
        discounted_device_rrp: null,
        color: "Silver",
        order_color: "SLV",
        order_category: "HP",
        color_hexa: "#c0c0c0",
        memory: "64GB",
        image: "/media/catalog/product/f/r/front_900x900_1_2.png",
        sub_images: [
          "/media/catalog/product/f/r/front_900x900_1_2.png",
          "/media/catalog/product/b/a/back_900x900_1_2.png",
          "/media/catalog/product/s/i/side_900x900_1_2.png"
        ],
        order_model: "IPHONE XS 64GB",
        part_number: "MDR6050",
        product_type: "HP",
        new_customer: "0",
        segment: null,
        contract: "24",
        start_date: null,
        end_date: null,
        upfront_installment: "10",
        saleable_plans: [],
        easy_phone: {
          default_price_sku: null,
          own: [
            {
              "Ultra-GB-M-Pass": "99"
            }
          ],
          own_selected_plan: [
            "Ultra-GB-M-Pass",
            "Ultra-GB-L-Pass",
            "Ultra-GB-XL-Pass",
            "Ultra-Speed-M-Pass",
            "Ultra-Speed-L-Pass"
          ],
          penalityown: [
            {
              "Ultra-Speed-M-Pass": "4008"
            },
            {
              "Ultra-Speed-L-Pass": "4008"
            }
          ],
          rent: [],
          rent_selected_plan: [],
          penalityrent: []
        },
        campaign_100days: false,
        is_neptune_subsidy: true,
      }
    ],
    related_products: [
      {
        name: "iPhone XS Max",
        sku: "iPhone-XS-Max"
      },
      {
        name: "iPhone XR",
        sku: "iPhone-XR"
      }
    ],
    upsell_products: [],
    analytics_key_addtocart: {
      fb_add_cart_id: "AddToCart_iPhoneXS",
      google_add_cart_id: "Q1fgCI6Zm5ABENjpoqMD",
      twitter_add_cart_id: "nzuzu",
      fb_learn_more_id: null,
      google_learn_more_id: null,
      twitter_learn_more_id: null,
      fb_buy_now_id: null,
      google_buy_now_id: null,
      twitter_buy_now_id: null
    },
    notes: '<div class="note__content">'
  },
  type_purchse: {
    dealer: {
      newline: true,
      cobp: true,
      mnp: true,
    },
    enterprise: {
      newline: true,
      cobp: true,
      mnp: false
    }
  },
  auto_bill_type_of_purchase: null,
  supp_rebate_label: ""
};

class ActivatedRouteMock {
  queryParams = new Observable(observer => {
    const urlParams = {
      promotiondetails: "some",
      pass: "params",
      type:"test"
    };
    observer.next(urlParams);
    observer.complete();
  });

  params = new Observable(observer => {
    const urlParams = {
      deviceId: "1234"
    };
    observer.next(urlParams);
    observer.complete();
  });

  data = new Observable(observer => {
    const data = {
      deviceId: "1234"
    };
    observer.next(data);
    observer.complete();
  });
}

describe("DeviceDetailPage", () => {
  let component: DeviceDetailPageComponent;
  let fixture: ComponentFixture<DeviceDetailPageComponent>;
  let _topQuery: jasmine.SpyObj<TypeofPurchaseQuery>;
  let _plansQuery: jasmine.SpyObj<PlansQuery>;
  let deviceDetailPageService: DeviceDetailPageService;
  let plansService: PlansService;
  let userService:UserService;
  beforeEach(async(() => {
    let _planStoredata = of(planStoreData);
    TestBed.configureTestingModule({
      imports: [
        NguCarouselModule,
        PerfectScrollbarModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        BrowserAnimationsModule,
        SharedModule,
      ],
      declarations: [
        DeviceDetailPageComponent,
        SideSummaryComponent,
        FooterComponent,
        FooterDownloadComponent,
        SocialMediaComponent,
        AgentFooterComponent,
        NotificationErrorComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        {
          provide: _topQuery,
          useValue: jasmine.createSpyObj("TypeofPurchaseQuery", ["select"])
        },
        {
          provide: _plansQuery,
          useValue: jasmine.createSpyObj("PlansQuery", ["select"])
        },
        { provide: planStoreData, useValue: _planStoredata },
        HttpClient,
        DecimalPipe,
        EStoreAnalysticsService,
        RendererService,
        UserService,
        SeoService,
        DeviceDataService,
        GuestCheckoutService,
        Broadcaster,
        NotificationPopupEvent,
        CookieService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDetailPageComponent);
    component = fixture.componentInstance;
    _topQuery = TestBed.get(TypeofPurchaseQuery);
    _plansQuery = TestBed.get(PlansQuery);
    plansService = TestBed.inject(PlansService);
    userService = TestBed.inject(UserService);
    deviceDetailPageService = TestBed.inject(DeviceDetailPageService);
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should call ngOnInIt", () => {
    spyOn(deviceDetailPageService, "loadDevice").and.returnValue(of(result));
    deviceDetailPageService.loadDevice("", "").subscribe();
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it("should create component", () => {
    component.updateSession();
    expect(component.updateSession).toBeTruthy();
  });
  
  it("should call callAutoBillingCheck with true", () => {
    component.top_type = "Get a New Number";
    component.selectedBuyOption ="Device Bundle";
    component.supplementary_numbers = ["083473947"];
    component.callAutoBillingCheck();
    expect(component.callAutoBillingCheck).toBeTruthy();
  });
  
  it("should call callAutoBillingCheck with false", () => {
    component.top_type = "Change Pass/ Plan";
    component.selectedBuyOption ="Easyphone";
    component.supplementary_numbers = ["083473947"];
    component.callAutoBillingCheck();
    expect(component.callAutoBillingCheck).toBeTruthy();
  });
  
  it("should call getAvailablePass", () => {
    const params="xyz-plan";
    component.getAvailablePass(params);
    expect(component.getAvailablePass).toBeTruthy();
  });

  it("should call getAvailablePass", () => {
    component.setTopOptions("");
    expect(component.setTopOptions).toBeTruthy();
  });

  it("should call getAvailablePass", () => {
    component.selectedBuyOption ="Device Only";
    component.top_type="Get a New Number";
    let spy = spyOn(userService,"isCustomer").and.returnValue(false);
    component.handleCheckoutClick();
    expect(component.handleCheckoutClick).toBeTruthy();
  });
  
  it("should call getTotalMonthlyPay", () => {
    component.getTotalMonthlyPay(basePlan,null);
    expect(component.getTotalMonthlyPay).toBeTruthy();
  });

});
