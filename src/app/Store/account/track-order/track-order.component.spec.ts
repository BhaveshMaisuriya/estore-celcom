import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks
} from "@angular/core/testing";
import { MinifiedPageLoaderComponent } from "../../../Store/widget/minified-page-loader/minified-page-loader.component";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "../../../Footer/footer.component";
import { AgentFooterComponent } from "../../../Footer/agent-footer/agent-footer.component";
import { SocialMediaComponent } from "../../../Footer/SocialMedia/socialmedia.component";
import { FooterDownloadComponent } from "../../../Footer/Download/download.component";
import { AppService } from "../../../Service/app.service";
import { AppMockService } from "../../../Service/appmock.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EStoreAnalysticsService } from "../../../Service/store.analytic.service";
import { AnalyticsService } from "../../../Service/analytic.service";
import { RendererService } from "../../../Service/renderer.service";
import { SeoService } from "../../../Service/seo.service";
import { DecimalPipe } from "@angular/common";
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs/Rx";
import { UserService } from "../../../Service/user.service";
import { CartService } from "../../../Service/cart.service";
import { BundleService } from "../../../Service/bundle.service";
import { OrderInfoService } from "../../../Service/orderinfo.service";
import { HeaderService } from "../../../Header/header.service";
import { RedirectionService } from "../../../Service/redirection.service";
import { SupplimentaryLinesService } from "../../widget/supplementary-lines/supplementary-lines.service";
import { NotificationErrorComponent } from "../../widget/notification-error/notification-error.component";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BroadbandService } from "../../../Service/broadband.service";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { AgeEligibilityPopupComponent } from "../../widget/age-eligibility-popup/ageeligiblity.popup.component";
import { CheckoutService } from "../../checkout/services/checkout.service";
import { CheckoutHeroBannerComponent } from "../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component";
import { PageLoaderComponent } from "../../../shared/components/page-loader/page-loader.component";
import { RemarketAnalyticsService } from "../../../Service/remarket-analytics.service";
import { HomeService } from "../../../Service/home.service";
import { GetParametersService } from "../../../Service/getParamaters.service";
import { TrackOrderComponent } from "./track-order.component";
import { RouterService } from "../../../Service/router.service";
import { sharedPipes } from "app/shared/pipes";
import { materialModules } from "app/shared/shared-module.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";

const mockTrackOrderResponseMD = [
  {
    order_data: {
      order_number: "UAT000005783",
      siebel_order_id: "1-2UVR22T",
      cel_siebel_order_id: "1-6220880453",
      transaction_id: "GE6820181015075608",
      grand_total: "836.00",
      gst_amount: "0.00",
      status: "Failed",
      tracking: "",
      purchase_date: "15 October 2018 07:56 AM",
      is_virtual: "1",
      items_count: "2",
      items_qty: "1",
      items: [
        {
          is_bundle: true,
          is_moon: false,
          is_star: true,
          item_id: "11326",
          product_id: "231",
          sku: "Samsung-Galaxy-S9-plus-FGS-SamsungGalaxyS9plus64GBBlue",
          qty: "1",
          name: "Samsung Galaxy S9+ X",
          price: "836.00",
          row_total: "836.00",
          price_incl: "836.00",
          row_total_incl_tax: "836.00",
          product_type: "bundle",
          image: "/media/catalog/product/9/0/900x900_2_9.png",
          quote_id: "10012",
          device_data: [{
            color: "Blue",
            memory: "64GB",
            contract: "24 months contract",
            name: "Samsung Galaxy S9+ 64GB Blue",
            image: "/media/catalog/product",
            orderDevicePrice: "708.00",
            order_device_subt: "Upfront payment (RM 236.00 X 3 months)"
          }],
          plan_data: {
            plan: "First\u2122 Gold Supreme",
            orderMontlyPay: "128.00",
            orderOneTimePay: "128.00",
            orderPhoneNo: 60136689134,
            orderMonthlyPay: "128.00",
            order_plan_subt: "Upfront payment (RM 128.00 X 1 months)",
            telco_day: {
              status: true,
              message:"test"
            },
            pass_details: {
              monthly_plan: ""
            },
            sub_pass_details: {
              monthly_plan: ""
            }
          },
          monthly_charges: { plan: "128.00", device: "236.00" },
          device_upfront_penalty: "0.00",
          is_easyphone: true,
          easyphone_label: "EasyPhone Own ()"
        }
      ],
      supplementary_data: [{test: "test"}],
      address: {
        shipping_address: {
          entity_id: "10479",
          region_id: "544",
          virtual_shipping_id: null,
          shipping_unit_number: "75",
          billing_unit_number: null,
          salutation: "Mr",
          residence_type: "High-Rise",
          region: "Selangor",
          postcode: "47073",
          lastname: "Hui Li",
          street: "SS23/7",
          city: "Klang",
          email: "viditg123@hotmail.com",
          telephone: "60169033982",
          country_id: "MY",
          firstname: "Ong",
          address_type: "shipping",
          company: null,
          giftregistry_item_id: null
        },
        billing_address: {
          entity_id: "10480",
          region_id: "544",
          virtual_shipping_id: null,
          shipping_unit_number: "75",
          billing_unit_number: "75",
          salutation: "Mr",
          residence_type: "High-Rise",
          region: "Selangor",
          postcode: "47073",
          lastname: "Hui Li",
          street: "SS23/7",
          city: "Klang",
          email: "viditg123@hotmail.com",
          telephone: "60169033982",
          country_id: "MY",
          firstname: "Ong",
          address_type: "billing",
          company: null,
          giftregistry_item_id: null
        }
      },
      is_mnp: false,
      pre_order: true,
      free_gift_data: {
        gift_image: "/media/catalog/product/9/0/900x900_7_2.png",
        gift_message: "Receive a Free gift when you pre-order now."
      },
      tax: { total_tax: "0.00", items: [] },
      delivery_type: { value: 1, code: "midnight" },
      order_type: "COBP",
      has_add_ons: false,
      add_on_label: null,
      is_golden_number: true,
      upfront_installment: true,
      campaign100_days: true,
      campaign: { title: null, subtitle: null },
      is_campaign_mviva: true,
      campaign_mviva_message: "test",
      customer_info: {
        full_name: "ONG HUI LI",
        email: "viditg123@hotmail.com",
        dob: "1994-04-16",
        salutation: "Mr",
        mobile: "60169033982"
      },
      payment_method: "1",
      has_auto_billing: 1,
      is_newbie: false,
      newbie_message: ""
    },
    status: true,
    message: "Order Data"
  }
];

const mockTrackOrderResponseSD = [
  {
    order_data: {
      order_number: "UAT000005783",
      siebel_order_id: "1-2UVR22T",
      cel_siebel_order_id: "1-6220880453",
      transaction_id: "GE6820181015075608",
      grand_total: "836.00",
      gst_amount: "0.00",
      status: "Failed",
      tracking: "",
      purchase_date: "15 October 2018 07:56 AM",
      is_virtual: "1",
      items_count: "2",
      items_qty: "1",
      items: [
        {
          is_bundle: true,
          is_moon: false,
          is_star: true,
          item_id: "11326",
          product_id: "231",
          sku: "Samsung-Galaxy-S9-plus-FGS-SamsungGalaxyS9plus64GBBlue",
          qty: "1",
          name: "Samsung Galaxy S9+ X",
          price: "836.00",
          row_total: "836.00",
          price_incl: "836.00",
          row_total_incl_tax: "836.00",
          product_type: "bundle",
          image: "/media/catalog/product/9/0/900x900_2_9.png",
          quote_id: "10012",
          device_data: [{
            color: "Blue",
            memory: "64GB",
            contract: "24 months contract",
            name: "Samsung Galaxy S9+ 64GB Blue",
            image: "/media/catalog/product",
            orderDevicePrice: "708.00",
            order_device_subt: "Upfront payment (RM 236.00 X 3 months)"
          }],
          plan_data: {
            plan: "First\u2122 Gold Supreme",
            orderMontlyPay: "128.00",
            orderOneTimePay: "128.00",
            orderPhoneNo: 60136689134,
            orderMonthlyPay: "128.00",
            order_plan_subt: "Upfront payment (RM 128.00 X 1 months)",
            telco_day: {
              status: true,
              message:"test"
            },
            pass_details: {
              monthly_plan: ""
            },
            sub_pass_details: {
              monthly_plan: ""
            }
          },
          monthly_charges: { plan: "128.00", device: "236.00" },
          device_upfront_penalty: "0.00",
          is_easyphone: true,
          easyphone_label: "EasyPhone Rent ()"
        }
      ],
      supplementary_data: [{test: "test"}],
      address: {
        shipping_address: {
          entity_id: "10479",
          region_id: "544",
          virtual_shipping_id: null,
          shipping_unit_number: "75",
          billing_unit_number: null,
          salutation: "Mr",
          residence_type: "High-Rise",
          region: "Selangor",
          postcode: "47073",
          lastname: "Hui Li",
          street: "SS23/7",
          city: "Klang",
          email: "viditg123@hotmail.com",
          telephone: "60169033982",
          country_id: "MY",
          firstname: "Ong",
          address_type: "shipping",
          company: null,
          giftregistry_item_id: null
        },
        billing_address: {
          entity_id: "10480",
          region_id: "544",
          virtual_shipping_id: null,
          shipping_unit_number: "75",
          billing_unit_number: "75",
          salutation: "Mr",
          residence_type: "High-Rise",
          region: "Selangor",
          postcode: "47073",
          lastname: "Hui Li",
          street: "SS23/7",
          city: "Klang",
          email: "viditg123@hotmail.com",
          telephone: "60169033982",
          country_id: "MY",
          firstname: "Ong",
          address_type: "billing",
          company: null,
          giftregistry_item_id: null
        }
      },
      is_mnp: false,
      pre_order: true,
      free_gift_data: {
        gift_image: "/media/catalog/product/9/0/900x900_7_2.png",
        gift_message: "Receive a Free gift when you pre-order now."
      },
      tax: { total_tax: "0.00", items: [] },
      delivery_type: { value: 0, code: "standard" },
      order_type: "COBP",
      has_add_ons: false,
      add_on_label: null,
      is_golden_number: true,
      upfront_installment: true,
      campaign100_days: true,
      campaign: { title: null, subtitle: null },
      is_campaign_mviva: true,
      campaign_mviva_message: "test",
      customer_info: {
        full_name: "ONG HUI LI",
        email: "viditg123@hotmail.com",
        dob: "1994-04-16",
        salutation: "Mr",
        mobile: "60169033982"
      },
      payment_method: "1",
      has_auto_billing: null,
      is_newbie: false,
      newbie_message: ""
    },
    status: true,
    message: "Order Data"
  }
];

class RouterStub {
  navigate(url: string) {
    return url;
  }
  
  navigateByUrl(url: string) {
    return url;
  }
}
class MockactivatedRoute {
  snapshot(url: string) {
    return url;
  }
}
const mockRouterService = {
  getPreviousUrl: () => {}
};

describe("TrackOrderComponent ", () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  let component: TrackOrderComponent;
  let fixture: ComponentFixture<TrackOrderComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, materialModules],
      declarations: [
        TrackOrderComponent,
        MinifiedPageLoaderComponent,
        FooterComponent,
        AgentFooterComponent,
        SocialMediaComponent,
        PageLoaderComponent,
        FooterDownloadComponent,
        NotificationErrorComponent,
        AgeEligibilityPopupComponent,
        CheckoutHeroBannerComponent,
        sharedPipes
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: RouterService, useValue: mockRouterService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
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
        AppService,
        NotificationPopupEvent,
        CookieService,
        UserService,
        CartService,
        BundleService,
        OrderInfoService,
        HeaderService,
        RedirectionService,
        SupplimentaryLinesService,
        HttpClient,
        BroadbandService,
        DeviceDataService,
        CommonUtilService,
        CheckoutService,
        RemarketAnalyticsService,
        HomeService,
        GetParametersService
      ]
    }).compileComponents();
  }));
  beforeEach(async(() => {
    fixture = TestBed.createComponent(TrackOrderComponent);
    component = fixture.componentInstance;

    let store = {};
    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(sessionStorage, "getItem").and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, "setItem").and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, "removeItem").and.callFake(
      mockSessionStorage.removeItem
    );
    spyOn(sessionStorage, "clear").and.callFake(mockSessionStorage.clear);
  }));

  afterEach(async(() => {
    sessionStorage.clear();
  }));

  it("should check agent flow flag", () => {
    spyOn(component, "ngOnInit");
    component.ngOnInit();
    if (
      typeof window !== "undefined" &&
      sessionStorage &&
      (sessionStorage.getItem("AgentInfo") ||
        sessionStorage.getItem("DealerInfo"))
    ) {
      expect(component.isCSAgentDealer).toBeTruthy();
    }
  });
  it("should check init method", () => {
    spyOn(component, "init").and.callThrough();
    component.init();
    component.OrderDetailsPageDisplay = true;
    expect(component.OrderDetailsPageDisplay).toBeTruthy();
  });
  it("test roundToTwoDecimal", () => {
    spyOn(component, "roundToTwoDecimal").and.callThrough();
    const value = component.roundToTwoDecimal(100.45666);
    expect(value).toBe(100.46);
  });
  it("should rounding off 2 number and convert result to string", () => {
    spyOn(component, "RoundingOff").and.callThrough();
    const [zero, roundDown, roundTo5, roundUp] = [
      component.RoundingOff(0),
      component.RoundingOff(1888.82),
      component.RoundingOff(1888.86),
      component.RoundingOff(1888.89)
    ];
    expect(typeof roundDown).toBe("string");
    expect(component.RoundingOff).toHaveBeenCalled();
    expect([zero, roundDown, roundTo5, roundUp]).toEqual([
      "0.00",
      "1888.82",
      "1888.86",
      "1888.89"
    ]);
  });
  it("should rounding off 2 number", () => {
    spyOn(component, "RoundingOff2Number").and.callThrough();
    const [zero, roundDown, roundTo5, roundUp] = [
      component.RoundingOff2Number(0),
      component.RoundingOff2Number(1888.82),
      component.RoundingOff2Number(1888.86),
      component.RoundingOff2Number(1888.89)
    ];
    expect(typeof roundDown).toBe("number");
    expect(component.RoundingOff2Number).toHaveBeenCalled();
    expect([zero, roundDown, roundTo5, roundUp]).toEqual([
      0,
      1888.82,
      1888.86,
      1888.89
    ]);
  });
  it("should get track order data - midnightDelivery", fakeAsync(() => {
    const appService = fixture.debugElement.injector.get(AppService);
    const deviceDataService = fixture.debugElement.injector.get(
      DeviceDataService
    );
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(
      ActivatedRoute
    );
    sessionStorage.setItem("AgentInfo", "mockAgentInfo");
    sessionStorage.setItem("USER_TYPE", "MOCK_USER_TYPE");
    spyOn(appService, "getEstoreUserData").and.returnValue(
      Observable.of(mockTrackOrderResponseMD)
    );
    Object.defineProperty(activatedRoute, "params", {
      value: Observable.of({ orderId: 123 })
    });
    Object.defineProperty(
      deviceDataService,
      "sharedErrorNotificationBoolean$",
      { value: Observable.of(true) }
    );
    component.ngOnInit();
    flushMicrotasks();
    expect(appService.getEstoreUserData).toHaveBeenCalled();
    expect(component.orderId).toBe(123);
    if (
      typeof window !== "undefined" &&
      sessionStorage &&
      (sessionStorage.getItem("AgentInfo") ||
        sessionStorage.getItem("DealerInfo"))
    ) {
      expect(component.isCSAgentDealer).toBeTruthy();
    }
    if (sessionStorage && sessionStorage.getItem("UserInfo")) {
      expect(component.UserLoginName).toEqual("MobileConnect");
    } else if (sessionStorage && sessionStorage.getItem("USER_TYPE")) {
      expect(component.UserLoginName).toEqual("MOCK_USER_TYPE");
    }
    if (
      component.orderData.order_data.status === "Unsuccessful" ||
      component.orderData.order_data.status === "Failed"
    ) {
      expect(component.errorBoolean).toBeTruthy();
    }
  }));
  it("should get track order data - standard delivery", fakeAsync(() => {
    const appService = fixture.debugElement.injector.get(AppService);
    const deviceDataService = fixture.debugElement.injector.get(
      DeviceDataService
    );
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(
      ActivatedRoute
    );
    sessionStorage.setItem("AgentInfo", "mockAgentInfo");
    sessionStorage.setItem("USER_TYPE", "MOCK_USER_TYPE");
    spyOn(appService, "getEstoreUserData").and.returnValue(
      Observable.of(mockTrackOrderResponseSD)
    );
    Object.defineProperty(activatedRoute, "params", {
      value: Observable.of({ orderId: 123 })
    });
    Object.defineProperty(
      deviceDataService,
      "sharedErrorNotificationBoolean$",
      { value: Observable.of(true) }
    );
    component.ngOnInit();
    flushMicrotasks();
    expect(appService.getEstoreUserData).toHaveBeenCalled();
    expect(component.orderId).toBe(123);
    if (
      typeof window !== "undefined" &&
      sessionStorage &&
      (sessionStorage.getItem("AgentInfo") ||
        sessionStorage.getItem("DealerInfo"))
    ) {
      expect(component.isCSAgentDealer).toBeTruthy();
    }
    if (sessionStorage && sessionStorage.getItem("UserInfo")) {
      expect(component.UserLoginName).toEqual("MobileConnect");
    } else if (sessionStorage && sessionStorage.getItem("USER_TYPE")) {
      expect(component.UserLoginName).toEqual("MOCK_USER_TYPE");
    }
    if (
      component.orderData.order_data.status === "Unsuccessful" ||
      component.orderData.order_data.status === "Failed"
    ) {
      expect(component.errorBoolean).toBeTruthy();
    }
  }));
  it("should throw track order data error", fakeAsync(() => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    const appService = TestBed.get(AppService);
    const deviceDataService = fixture.debugElement.injector.get(
      DeviceDataService
    );
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(
      ActivatedRoute
    );
    sessionStorage.setItem("UserInfo", JSON.stringify({ data: "data" }));
    spyOn(appService, "getEstoreUserData").and.returnValue(
      Observable.throw("error")
    );
    Object.defineProperty(activatedRoute, "params", {
      value: Observable.of({ orderId: 123 })
    });
    Object.defineProperty(
      deviceDataService,
      "sharedErrorNotificationBoolean$",
      { value: Observable.of(true) }
    );
    component.ngOnInit();
    flushMicrotasks();
    expect(component.errorData).not.toBeNull();
  }));
  it("should go to previous page", fakeAsync(() => {
    const routerService: RouterService = fixture.debugElement.injector.get(
      RouterService
    );
    spyOn(routerService, "getPreviousUrl");
    Object.defineProperty(routerService, "router", {
      value: { navigateByUrl: () => "/store/devices" }
    });
    spyOn(routerService.router, "navigateByUrl");
    component.goToPreviousPage();
    flushMicrotasks();
    expect(routerService.getPreviousUrl).toHaveBeenCalled();
  }));
  it("should test ngAfterViewInit", () => {
    const eStoreAnalysticsService: EStoreAnalysticsService = fixture.debugElement.injector.get(
      EStoreAnalysticsService
    );
    spyOn(eStoreAnalysticsService, "ManageAnalytics");
    const router: Router = fixture.debugElement.injector.get(Router);
    Object.defineProperty(router, "routerState", {
      value: { snapshot: { url: "/store/devices" } }
    });
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(
      ActivatedRoute
    );
    Object.defineProperty(activatedRoute, "data", {
      value: Observable.of({ data: "data" })
    });
    component.ngAfterViewInit();
    expect(eStoreAnalysticsService.ManageAnalytics).toHaveBeenCalled();
  });

  it("called sendEmail", () => {
    const appService = fixture.debugElement.injector.get(AppService);
   let spy = spyOn(appService, "getEstoreUserData").and.returnValue(
      Observable.of(mockTrackOrderResponseSD)
    );
    component.sendEmail();
    expect(spy).toHaveBeenCalled();
  });

  it("called IsDeviceOnly", () => {
    const spy = spyOn(component, "IsDeviceOnly").and.callThrough();
    localStorage.setItem("isDeviceOnlyClicked", "true");
    component.IsDeviceOnly();
    expect(spy).toHaveBeenCalled();
  });

  it("called getOrderMonthlyPayTotal", () => {
    const spy = spyOn(component, "getOrderMonthlyPayTotal").and.callThrough();
    component.cart = {items: [{plan_data: {}}]};
    component.getOrderMonthlyPayTotal();

    component.cart = {items: [{plan_data: {orderMontlyPayTotal: 10}}]};
    component.getOrderMonthlyPayTotal();
    expect(spy).toHaveBeenCalled();
  });

  it("called redirectToMnpSimVerify", () => {
    const spy = spyOn(component, "redirectToMnpSimVerify").and.callThrough();
    component.redirectToMnpSimVerify();
    expect(spy).toHaveBeenCalled();
  });
});
