import {
  async,
  ComponentFixture,
  TestBed
} from "@angular/core/testing";
import { MinifiedPageLoaderComponent } from "../../../Store/widget/minified-page-loader/minified-page-loader.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from "../../../Footer/footer.component";
import { AgentFooterComponent } from "../../../Footer/agent-footer/agent-footer.component";
import { SocialMediaComponent } from "../../../Footer/SocialMedia/socialmedia.component";
import { FooterDownloadComponent } from "../../../Footer/Download/download.component";
import { AppService } from "../../../Service/app.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EStoreAnalysticsService } from "../../../Service/store.analytic.service";
import { AnalyticsService } from "../../../Service/analytic.service";
import { RendererService } from "../../../Service/renderer.service";
import { SeoService } from "../../../Service/seo.service";
import { DecimalPipe } from "@angular/common";
import { HttpModule } from "@angular/http";
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from "ngx-cookie-service";
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
import { CheckoutHeroBannerComponent } from "../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component";
import { RemarketAnalyticsService } from "../../../Service/remarket-analytics.service";
import { HomeService } from "../../../Service/home.service";
import { GetParametersService } from "../../../Service/getParamaters.service";
import { OrderSummaryComponent } from "./order-summary.component";
import { SessionTimeOutPopupComponent } from "../../widget/session-timeout-popup/session-timeout-popup";
import { DeviceDetailsStorageService } from "../../../Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.service";
import { NoteSectionComponent } from "../../dumb-components/note-section/note-section.component";
import { VoucherComponent } from "../../widget/voucher/voucher.component";
import { PageLoaderComponent } from "app/shared/components/page-loader/page-loader.component";
import { EditDetailsWrapperComponent } from "../edit-details-wrapper/edit-details-wrapper.component";
import { SelectDeliveryMethodComponent } from "app/Store/checkout/delivery-method/select-delivery-method/select-delivery-method.component";
import { StandardDeliveryComponent } from "../delivery-method/standard-delivery/standard-delivery.component";
import { ChooseAddressComponent } from "../delivery-method/choose-address/choose-address.component";
import { sharedPipes } from 'app/shared/pipes';
import { materialModules } from 'app/shared/shared-module.module';
import { EstoreInputComponent } from 'app/shared/components/forms/estore-input/estore-input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { sharedDirectives } from 'app/shared/directives';
import { Observable } from 'rxjs';

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

const respForPost = [{ status: true }];

class AppMockService {
  constructor() { }

  getEstoreUserData(url: any) {
    return Observable.of(respForPost);
  }
  postEstoreUserData(url: any) {
    return Observable.of(respForPost);
  }
  postEstoreData(url: any) {
    return Observable.of(respForPost);
  }
}


describe("OrderSummaryComponent ", () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        materialModules,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientTestingModule,
      ],
      declarations: [
        sharedDirectives,
        sharedPipes,
        EstoreInputComponent,
        OrderSummaryComponent,
        MinifiedPageLoaderComponent,
        FooterComponent,
        AgentFooterComponent,
        SocialMediaComponent,
        PageLoaderComponent,
        SelectDeliveryMethodComponent,
        StandardDeliveryComponent,
        ChooseAddressComponent,
        EditDetailsWrapperComponent,
        FooterDownloadComponent,
        NotificationErrorComponent,
        AgeEligibilityPopupComponent,
        CheckoutHeroBannerComponent,
        SessionTimeOutPopupComponent,
        NoteSectionComponent,
        VoucherComponent
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: MockactivatedRoute },
        { provide: AppService, useClass: AppMockService },

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
        DeviceDetailsStorageService,
        RemarketAnalyticsService,
        HomeService,
        GetParametersService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(OrderSummaryComponent);
        component = fixture.componentInstance;
      });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should call ngOninit()", () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it("checking boolean values", () => {
    expect(component.isCSAgent).toBe(false);
    expect(component.isProceed2PayDisable).toBe(true);
    expect(component.disableProceedToPay).toBe(false);
    expect(component.mnpFlow).toBe(false);
    expect(component.cobpFlowNoUpFront).toBe(false);
    expect(component.isCobp).toBe(false);
  });

  it("is zero payment flow", () => {
    const spy = spyOn(component, "isZeroPaymentFlow");
    component.isZeroPaymentFlow();
    expect(spy).toHaveBeenCalled();
  });

  it("record opted billing type (not checked)", () => {
    spyOn(component, "recordOptedBillingType");
    component.recordOptedBillingType("not checked");
    expect(component.userSelectionOfBillingType).toBe(0);
    expect(component.isAutoBillingMandatory).toBeFalse();
    expect(component.hasAutoBilling).toBeFalse();
  });

  it("record opted billing type (checked #1)", () => {
    spyOn(component, "recordOptedBillingType");
    component.userSelectionOfBillingType = 1;
    component.recordOptedBillingType("checked");
    expect(component.userSelectionOfBillingType).toBe(1);
    expect(component.isAutoBillingMandatory).toBeFalse();
    expect(component.hasAutoBilling).toBeFalse();
  });

  it("call roundingOff method", () => {
    const spy = spyOn(component, 'RoundingOff').and.callThrough();
    component.RoundingOff(12.54);
    expect(spy).toHaveBeenCalled();
  });

  it("call RoundingOff2Number method", () => {
    const spy = spyOn(component, 'RoundingOff2Number').and.callThrough();
    component.RoundingOff2Number(12.54);
    expect(spy).toHaveBeenCalled();
  });

  it("getCustomerRetrievalAddress", () => {
    component.userInfo = {
      outputCPResp: {
        streetAddress: "1, Street",
        city: "Petaling Jaya",
        postalCode: 12345,
        state: "Kuala Lambur",
        country: "Malaysia",
        addressYType: "Residential",
        services: [
          {
            mobileNumber: "0123456789"
          }
        ]
      }
    };
    component.getCustomerRetrievalAddress();
  });

  it("call onVoucherApplied", () => {
    const spy = spyOn(component, 'onVoucherApplied').and.callThrough();
    component.isThirdPartyOrder = {
      flag: true,
      btnDisabled: true,
      checkoutDataSet: true
    };
    component.onVoucherApplied();
    expect(spy).toHaveBeenCalled();
  });

  it("call onVoucherRemoved", () => {
    const spy = spyOn(component, 'onVoucherRemoved').and.callThrough();
    component.isThirdPartyOrder = {
      flag: true,
      btnDisabled: true,
      checkoutDataSet: true
    };
    component.onVoucherRemoved();
    expect(spy).toHaveBeenCalled();
  });

  it("call isLegacyPlan", () => {
    const spy = spyOn(component, 'isLegacyPlan').and.callThrough();
    component.isLegacyPlan(null);
    const item = { selectedProduct: { orderPlanName: "sime-test-plan" } };
    component.isLegacyPlan(item);
    expect(spy).toHaveBeenCalled();
  });

  it("call updateEmail", () => {
    const spy = spyOn(component, 'updateEmail').and.callThrough();
    component.checkoutData = { id: 'test' };
    component.updateEmail();
    expect(spy).toHaveBeenCalled();
  });

  it("call toggleEditEmail", () => {
    const spy = spyOn(component, 'toggleEditEmail').and.callThrough();
    component.toggleEditEmail();
    component.updateEmailData = {
      editing: true,
      emaildata: 'test',
      error: {
        title: 'test',
        content: 'test',
        button: 'test'
      }
    };
    component.toggleEditEmail();
    expect(spy).toHaveBeenCalled();
  });

  it("call toggleExpandTop", () => {
    const spy = spyOn(component, 'toggleExpandTop').and.callThrough();
    component.toggleExpandTop();
    expect(spy).toHaveBeenCalled();
  });

  it("call toggleExpandBottom", () => {
    const spy = spyOn(component, 'toggleExpandBottom').and.callThrough();
    component.toggleExpandBottom();
    expect(spy).toHaveBeenCalled();
  });

  it("call updateO2oCustomerEmail", () => {
    const spy = spyOn(component, 'updateO2oCustomerEmail').and.callThrough();
    component.checkoutData = { id: 'test' };
    component.updateO2oCustomerEmail();
    expect(spy).toHaveBeenCalled();
  });


});
