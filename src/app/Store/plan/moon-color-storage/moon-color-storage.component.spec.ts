import {
  async,
  ComponentFixture,
  TestBed,
  inject,
  tick,
  fakeAsync
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DecimalPipe } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MoonColorStorageComponent } from "./moon-color-storage.component";
import { MinifiedPageLoaderComponent } from "../../widget/minified-page-loader/minified-page-loader.component";
import { AgentFooterComponent } from "../../../Footer/agent-footer/agent-footer.component";
import { FooterComponent } from "../../../Footer/footer.component";
import { SocialMediaComponent } from "../../../Footer/SocialMedia/socialmedia.component";
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { FooterDownloadComponent } from "../../../Footer/Download/download.component";
import { CheckoutHeroBannerComponent } from "../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component";
import { NotificationErrorComponent } from "../../widget/notification-error/notification-error.component";
import { AgeEligibilityPopupComponent } from "../../widget/age-eligibility-popup/ageeligiblity.popup.component";
import { AppService } from "../../../Service/app.service";
import { AppMockService } from "../../../Service/appmock.service";
import { EStoreAnalysticsService } from "../../../Service/store.analytic.service";
import { AnalyticsService } from "../../../Service/analytic.service";
import { GetParametersService } from "../../../Service/getParamaters.service";
import { HomeService } from "../../../Service/home.service";
import { RemarketAnalyticsService } from "../../../Service/remarket-analytics.service";
import { DeviceDetailsStorageService } from "../../../Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.service";
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { BroadbandService } from "../../../Service/broadband.service";
import { SupplimentaryLinesService } from "../../widget/supplementary-lines/supplementary-lines.service";
import { RedirectionService } from "../../../Service/redirection.service";
import { CheckoutService } from "../../checkout/services/checkout.service";
import { HeaderService } from "../../../Header/header.service";
import { BundleService } from "../../../Service/bundle.service";
import { OrderInfoService } from "../../../Service/orderinfo.service";
import { UserService } from "../../../Service/user.service";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { Broadcaster } from "../../../Model/broadcaster.model";
import { CartService } from "../../../Service/cart.service";
import { RendererService } from "../../../Service/renderer.service";
import { SeoService } from "../../../Service/seo.service";
import { ProductService } from "../../../Service/product.service";
import { MoonPlanWithDeviceDetailsComponent } from "../moon-plan-with-device-details/moon-plan-with-device-details.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LosingSupplementaryLinePopupComponent } from "../../widget/losing-supplementary-line-popup/losing-supplementary-line-popup.component";
import { PlanPurchaseService } from "../../../Store/plan/plan-purchase/plan-purchase.service";
import { sharedPipes } from 'app/shared/pipes';
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

// class MockAppService {
//   getEstoreData(url) {
//     if (url == "/rest/V1/stock-check/oppf5gld32gb") {
//       return of({
//         "status": true,
//         "message": "In stock",
//         "in_stock": true
//       });
//     }

//     return false;
//   }
// }

class MockMoonDeviceDetailsComponent {
  selectedDeviceInfo: any = {
    sku: 'Oppo-F5'
  };
  devicesToDisplay: any = [];
}

// class MockDeviceData {
//   outOfStock$ = of({
//     data: {
//       bundleSku: true
//     }
//   });
// }

const mockResp = {
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
  ],
  ProductType: "moon"
};

const mockSelectedPlanDetails = {
  selectedDevice: {
    sku: 'Oppo-F5',
    SelectedDeviceColor: 'Black',
    selectedDeviceMemory: '64GB'
  }
}

const mockEditProduct = {
  selectedProduct: {
    orderSummaryColor: 'Black',
    orderSummaryStorage: '64GB'
  },
  selectedBundleSku: 'Oppo-F5'
};

const mockSelectedDeviceInfo = {
  name: 'Oppo F5',
  sku: 'oppf5gld32gb',
  price: 'string',
  imagePath: 'string',
  upfrontPrice: 'string',
  devicePrice: 'string',
  totalPrice: 'string',
  contract: 'string',
};

const mockPublishOutOfStockData = {
  bundleSku: "bundle",
  simpleSku: "oppf5gld32gb",
  sku: "Oppo-F5"
};

describe("MoonColorStorageComponent ", () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  let component: MoonColorStorageComponent;
  let fixture: ComponentFixture<MoonColorStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        materialModules
      ],
      declarations: [
        sharedPipes,
        MoonColorStorageComponent,
        MinifiedPageLoaderComponent,
        FooterComponent,
        AgentFooterComponent,
        SocialMediaComponent,
        PageLoaderComponent,
        FooterDownloadComponent,
        NotificationErrorComponent,
        AgeEligibilityPopupComponent,
        CheckoutHeroBannerComponent,
        LosingSupplementaryLinePopupComponent
      ],
      providers: [
        AppService,
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: MockactivatedRoute },
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
        HeaderService,
        RedirectionService,
        SupplimentaryLinesService,
        HttpClient,
        BroadbandService,
        DeviceDataService,
        CommonUtilService,
        CheckoutService,
        DeviceDetailsStorageService,
        ProductService,
        RemarketAnalyticsService,
        HomeService,
        GetParametersService,
        MoonPlanWithDeviceDetailsComponent,
        PlanPurchaseService
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MoonColorStorageComponent);
    component = fixture.componentInstance;
    component.cobpLoading = false;
    component.data = mockResp;
    component.editProduct = {};
    fixture.detectChanges();
  }));

  it("should create moon color storage component and call ngOnInit", () => {
    spyOn(component, "getStockOfTheSelectedDevice");
    spyOn(component, "publishColorOrMemoryChange");
    spyOn(component, "dataforStockCheck");
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.getStockOfTheSelectedDevice).toHaveBeenCalled();
    expect(component.publishColorOrMemoryChange).toHaveBeenCalled();
    expect(component.dataforStockCheck).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it("should change colorSelected and memorySelected from Local Storage", () => {
    spyOn(localStorage, "getItem").and.callFake((key) => {
      return JSON.stringify(mockSelectedPlanDetails);
    });
    spyOn(component, "publishColorOrMemoryChange");
    component.SelectionAferLogin = true;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.publishColorOrMemoryChange).toHaveBeenCalled();
  });

  it("should change colorSelected and memorySelected from Edit Product", () => {
    component.editProduct = mockEditProduct;
    component.SelectionAferLogin = true;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.colorSelected).toEqual('Black');
    expect(component.memorySelected).toEqual('64GB');
  });

  it("should call DeviceDataService publishAddToCartDisabling", inject([
    DeviceDataService,
    ProductService,
    MoonPlanWithDeviceDetailsComponent
  ], (
    deviceDataService: DeviceDataService,
    productService: ProductService,
    mobileDeviceDetailComponent: MoonPlanWithDeviceDetailsComponent) => {
    spyOn(deviceDataService, "publishAddToCartDisabling");
    mobileDeviceDetailComponent.selectedDeviceInfo = mockSelectedDeviceInfo;
    fixture.detectChanges();
    component.ngOnInit();
    deviceDataService.publishOutOfStock('available', mockPublishOutOfStockData);
    deviceDataService.publishCobpLoading(true);
    expect(deviceDataService.publishAddToCartDisabling).toHaveBeenCalled();
  }));

  it("should change colorSelected and memorySelected from Edit Product and reflected in deviceDataService", () => {
    spyOn(component, "publishColorMemoryInfo");
    component.editProduct = mockEditProduct;
    fixture.detectChanges();
    component.ngOnInit();
    component.publishColorMemoryInfo();
    expect(component.publishColorMemoryInfo).toHaveBeenCalled();
  });

  it("should change color and memory onContinueSwitchingColorOrMemoryTab", () => {
    spyOn(component, "onContinueSwitchingColorOrMemoryTab");

    component.ngOnInit();
    component.actionType = 'colorChange';
    component.onContinueSwitchingColorOrMemoryTab();
    fixture.detectChanges();
    expect(component.IsDispalySwitchingPurchaseTypeTabPopup).toBeFalsy();
    expect(component.colorSelected).toBe('Gold');
    component.actionType = 'memoryChange';
    component.onContinueSwitchingColorOrMemoryTab();
    fixture.detectChanges();
    expect(component.IsDispalySwitchingPurchaseTypeTabPopup).toBeFalsy();
    expect(component.colorSelected).toBe('Gold');

    expect(component.onContinueSwitchingColorOrMemoryTab).toHaveBeenCalled();
  });

  it("should call DeviceDataService publishAddToCartDisabling", inject([
    MoonPlanWithDeviceDetailsComponent
  ], (
    mobileDeviceDetailComponent: MoonPlanWithDeviceDetailsComponent) => {
    spyOn(component, "stockCheckOnColorChange").and.throwError("Cannot set property 'selectedMemoryIndex' of undefined");

    mobileDeviceDetailComponent.selectedDeviceInfo = mockSelectedDeviceInfo;
    component.editProduct = null;
    component.data = mockResp;
    fixture.detectChanges();
    component.ngOnInit();

    expect(() => {
      component.stockCheckOnColorChange('Gold')
    }).toThrowError("Cannot set property 'selectedMemoryIndex' of undefined");

    expect(component.stockCheckOnColorChange).toHaveBeenCalled();
    expect(mobileDeviceDetailComponent.selectedDeviceInfo).toBeDefined();
    expect(component.actionType).toBe('');
    expect(component.colorSelected).toBe('Gold');
  }));

  it("should cancel on onCancellingonContinueSwitchingColorOrMemoryTab", () => {
    spyOn(component, "onCancellingonContinueSwitchingColorOrMemoryTab");

    component.ngOnInit();
    component.onCancellingonContinueSwitchingColorOrMemoryTab();
    fixture.detectChanges();

    expect(component.onCancellingonContinueSwitchingColorOrMemoryTab).toHaveBeenCalled();
  });
});
