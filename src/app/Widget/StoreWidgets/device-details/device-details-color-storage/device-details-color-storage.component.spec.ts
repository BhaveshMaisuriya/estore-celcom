import {
    async,
    ComponentFixture,
    TestBed,
    inject
  } from "@angular/core/testing";
  import { mockData } from './device-details-color-storage.mock.spec';
  import { FormsModule } from "@angular/forms";
  import { Router, ActivatedRoute } from "@angular/router";
  import { DecimalPipe } from "@angular/common";
  import { CookieService } from "ngx-cookie-service";
  import { Observable } from "rxjs/Rx";
  import { HttpClient } from "@angular/common/http";
  import { HttpClientTestingModule } from "@angular/common/http/testing";
  import { DeviceDetailsStorageComponent } from "./device-details-color-storage.component";
  import { AgentFooterComponent } from "../../../../Footer/agent-footer/agent-footer.component";
  import { SocialMediaComponent } from "../../../../Footer/SocialMedia/socialmedia.component";
  import { MinifiedPageLoaderComponent } from "../../../../Store/widget/minified-page-loader/minified-page-loader.component";
  import { FooterComponent } from "../../../../Footer/footer.component";
  import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';
  import { FooterDownloadComponent } from "../../../../Footer/Download/download.component";
  import { NotificationErrorComponent } from "../../../../Store/widget/notification-error/notification-error.component";
  import { AgeEligibilityPopupComponent } from "../../../../Store/widget/age-eligibility-popup/ageeligiblity.popup.component";
  import { CheckoutHeroBannerComponent } from "../../checkout-hero-banner/checkout-hero-banner.component";
  import { AppService } from "../../../../Service/app.service";
  import { AppMockService } from "../../../../Service/appmock.service";
  import { GetParametersService } from "../../../../Service/getParamaters.service";
  import { DeviceDataService } from "../../../../Service/devicedata.service";
  import { EStoreAnalysticsService } from "../../../../Service/store.analytic.service";
  import { AnalyticsService } from "../../../../Service/analytic.service";
  import { RendererService } from "../../../../Service/renderer.service";
  import { SeoService } from "../../../../Service/seo.service";
  import { UserService } from "../../../../Service/user.service";
  import { BundleService } from "../../../../Service/bundle.service";
  import { CartService } from "../../../../Service/cart.service";
  import { NotificationPopupEvent } from "../../../../Service/broadcaster.service";
  import { Broadcaster } from "../../../../Model/broadcaster.model";
  import { OrderInfoService } from "../../../../Service/orderinfo.service";
  import { HeaderService } from "../../../../Header/header.service";
  import { RedirectionService } from "../../../../Service/redirection.service";
  import { SupplimentaryLinesService } from "../../../../Store/widget/supplementary-lines/supplementary-lines.service";
  import { BroadbandService } from "../../../../Service/broadband.service";
  import { DeviceDetailsStorageService } from "../device-details-color-storage/device-details-color-storage.service";
  import { CommonUtilService } from "../../../../Service/commonUtil.service";
  import { CheckoutService } from "../../../../Store/checkout/services/checkout.service";
  import { RemarketAnalyticsService } from "../../../../Service/remarket-analytics.service";
  import { HomeService } from "../../../../Service/home.service";
  import { configureTestSuite } from 'ng-bullet';
  import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html.pipe';
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
  let resp: any = {status: true, message: "In stock", in_stock: true};
  class MockAppService {
    getEstoreData(url) {
      return Observable.of(resp);
    }
  }
  describe("DeviceDetailsStorageComponent ", () => {
    const fakeActivatedRoute = {
      snapshot: { data: {} }
    } as ActivatedRoute;
    let component: DeviceDetailsStorageComponent;
    let fixture: ComponentFixture<DeviceDetailsStorageComponent>;
    configureTestSuite(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, HttpClientTestingModule, materialModules],
        declarations: [
          DeviceDetailsStorageComponent,
          MinifiedPageLoaderComponent,
          FooterComponent,
          AgentFooterComponent,
          SocialMediaComponent,
          PageLoaderComponent,
          FooterDownloadComponent,
          NotificationErrorComponent,
          AgeEligibilityPopupComponent,
          CheckoutHeroBannerComponent,
          SafeHtmlPipe
        ],
        providers: [
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
          { provide: AppService, useClass: MockAppService },
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
          HeaderService,
          RedirectionService,
          SupplimentaryLinesService,
          HttpClient,
          BroadbandService,
          DeviceDataService,
          CommonUtilService,
          CheckoutService,
          DeviceDetailsStorageService,
          RemarketAnalyticsService,
          HomeService,
          GetParametersService
        ]
      });
    });
    beforeEach(async(() => {
      fixture = TestBed.createComponent(DeviceDetailsStorageComponent);
      component = fixture.componentInstance;
      component.data = mockData;
    }));
    it("should create device details color storage component", () => {
      expect(component).toBeTruthy();
    });

    it("should test init function", inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
      component.ngOnInit();
      devicedataservice.publishSupplinesLinesPrice([]);
      devicedataservice.publishCobpLoading(false);
      component.selectedProd = {ispreorder : 1, availabilityflag: 1, ismviva: 1, mvivaSummaryMessage: "abc", mvivaBundleUpfront: 230};
      component.ngOnInit();
      localStorage.setItem("mvivaPlanUpfront", "200");
      localStorage.setItem("isRentClicked", "false");
      localStorage.setItem("isOwnClicked", "false");
      localStorage.setItem("isBundleClicked", "true");
      component.selectedProd = {ispreorder : 1, availabilityflag: 0, ismviva: 1, mvivaSummaryMessage: null, mvivaBundleUpfront: null};
      component.ngOnInit();
      component.selectedProd = {ispreorder : 0, availabilityflag: 0, ismviva: 0, mvivaSummaryMessage: null, mvivaBundleUpfront: null};
      component.ngOnInit();
      localStorage.setItem("isEasyPhone", "true");
      localStorage.setItem("isBundleClicked", "false");
      component.SelectionAferLogin = {color: "Red", storage: "256GB", preOrder: 1};
      component.selectedProd = {iseasyphone: 1};
      component.ngOnInit();
      component.SelectionAferLogin = {color: "Red", storage: "256GB"}
      component.ngOnInit();
    }));
    it("ng oninit", () => {
      component.selectedProd = {iseasyphone: 0};
      localStorage.setItem("isRentClicked", "false");
      localStorage.setItem("isOwnClicked", "false");
      localStorage.setItem("isBundleClicked", "true");
      component.SelectionAferLogin = {color: "Red", storage: "256GB", preOrder: 0};
      component.ngOnInit();
    });

    it("should test updateImage function", () => {
      component.selectedColor = "Silver";
      component.DeviceDetailsStorageResponse = mockData.associated_product;
      component.updateImage();
      expect(component.selecteImageList.length).toEqual(1);
    });

    it("should test defaultOnClick function", () => {
      expect(component.defaultOnClick()).toEqual(false);
    });

    it("should test checkStockAvailability function", () => {
      component.DeviceDetailsStorageResponse = mockData.associated_product;
      component.isPreOrder = true;
      spyOn(component, "preOrderData");
      component.checkStockAvailability(mockData.associated_product[0]);
      const preOrderData = {
        "preorder_estimate_delivery_text": "",
        "preorder_estimate_delivery_date": "",
        "preorder_text": "PRE-ORDER",
        "preorder_from_date_text": "",
        "preorder_to_date_text": "",
        "preorder_from_date": "",
        "preorder_to_date": "",
        "preorder_end_flag": 0,
        "preorder_estimate_delivery": null,
        "preorder_submit_date": null,
        "preorder_stock_available_quantity": 942,
        "preorder_availble_stock_in_hand": 942,
        "preorder_stock_status_flag": 1
     };
      expect(component.preOrderData).toEqual(preOrderData);
      expect(component.deviceStock).toEqual(component.formConst.PRODUCT_IN_STOCK_MSG);
    });
  });
