import { async, ComponentFixture, TestBed, inject, tick } from "@angular/core/testing";
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { DecimalPipe } from "@angular/common";
import { CommonModule } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";
import { Pipe, Renderer2 } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { DeviceDisclaimerComponent } from "./device-detail-disclaimer.component";
import { DeviceDetailsComponent } from "../../../../Store/device/device-details/device-details.component";
import { BreadcrumbComponent } from "../../../../breadcrumb/breadcrumb.component";
import { DeviceSliderComponent } from "../../../../Store/device/device-slider/device-slider.component";
import { BbDeviceNamePriceComponent } from "../../bb-device-name-price/bb-device-name-price.component";
import { BbDeviceColorComponent } from "../../bb-device-color/bb-device-color.component";
import { BbDeviceStockCheckComponent } from "../../bb-device-stock-check/bb-device-stock-check.component";
import { DeviceDetailsStorageComponent } from "../device-details-color-storage/device-details-color-storage.component";
import { DetailBannerTextLeftComponent } from "../../../DetailBannerTextLeft/DetailBannerTextLeft.component";
import { DeviceDetailsPlanComponent } from "../device-details-plans-section/device-details-plans-section.component";
import { DeviceDetailsSummaryComponent } from "../device-details-summary-section/device-details-summary-section.component";
import { DeviceDetailsNumberComponent } from "../device-details-choose-number/device-details-choose-number.component";
import { StickySummaryComponent } from "../sticky-summary/sticky-summary.component";
import { NotificationErrorComponent } from "../../../../Store/widget/notification-error/notification-error.component";
import { FooterComponent } from "../../../../Footer/footer.component";
import { NricInputComponent } from "../../../../Store/widget/nric-input/nric-input.component";
import { NotificationBarComponent } from "../../../../Store/widget/notification-bar/notification-bar.component";
import { MoreSupplementaryPopupComponent } from "../../../../Store/widget/more-supplementary-popup/more-supplementary-popup.component";
import { TabsNewComponent } from "../../../xpax/tabs-new/tabs-new.component";
import { ChooseYourWayComponent } from "../../../../Store/guest-checkout/choose-your-way/choose-your-way.component";
import { SwitchToCelcomComponent } from "../../../../Store/mnp/switch-to-celcom/switch-to-celcom.component";
import { CobpComponent } from "../../../../Store/cobp/cobp.component";
import { DeviceSupplementaryLinesComponent } from "../../../../Store/widget/device-supplementary-lines/device-supplementary-lines.component";
import { SupplementaryLinesComponent } from "../../../../Store/widget/supplementary-lines/supplementary-lines.component";
import { TableComparisonComponent } from "../../../table-comparison/table-comparison.component";
import { PlanTableComparisonComponent } from "../../plan-table-comparison/plan-table-comparison.component";
import { LosingSupplementaryLinePopupComponent } from "../../../../Store/widget/losing-supplementary-line-popup/losing-supplementary-line-popup.component";
import { LifestylePlansComponent } from "../../../../Store/plan/lifestyle-plans/lifestyle-plans.component";
import { DeviceFlowComponent } from "../../../../Store/device/device-flow/device-flow.component";
import { DeviceMoreDetailsComponent } from "../device-details-more-details/device-details-more-details.component";
import { SocialMediaComponent } from "../../../../Footer/SocialMedia/socialmedia.component";
import { FooterDownloadComponent } from "../../../../Footer/Download/download.component";
import { AgentFooterComponent } from "../../../../Footer/agent-footer/agent-footer.component";
import { NoteSectionComponent } from "../../../../Store/dumb-components/note-section/note-section.component";
import { AgeEligibilityPopupComponent } from "../../../../Store/widget/age-eligibility-popup/ageeligiblity.popup.component";
import { AppMockService } from "../../../../Service/appmock.service";
import { AppService } from '../../../../Service/app.service';
import { PlanPurchaseService } from "../../../../Store/plan/plan-purchase/plan-purchase.service";
import { DeviceDataService } from "../../../../Service/devicedata.service";
import { RedirectionService } from "../../../../Service/redirection.service";
import { Broadcaster } from "../../../../Model/broadcaster.model";
import { SeoService } from "../../../../Service/seo.service";
import { PlanTableComparisionService } from "../../plan-table-comparison/plan-table-comparison.service";
import { AnalyticsService } from "../../../../Service/analytic.service";
import { GetParametersService } from "../../../../Service/getParamaters.service";
import { EStoreAnalysticsService } from "../../../../Service/store.analytic.service";
import { HomeService } from "../../../../Service/home.service";
import { UserService } from "../../../../Service/user.service";
import { CookieService } from "ngx-cookie-service";
import { NotificationPopupEvent } from "../../../../Service/broadcaster.service";
import { DeviceDetailsService } from "../../../../Store/device/device-details/device-details.service";
import { RendererService } from "../../../../Service/renderer.service";
import { DeviceDisclaimerService } from "./device-detail-disclaimer.service";
import { BundleService } from "../../../../Service/bundle.service";
import { CartService } from "../../../../Service/cart.service";
import { CommonUtilService } from "../../../../Service/commonUtil.service";
import { ProductService } from "../../../../Service/product.service";
import { BroadbandService } from "../../../../Service/broadband.service";
import { MsisdnInputComponent } from "../../../../Store/widget/msisdn-input/msisdn-input.component";
import { OtpInputComponent } from "../../../../Store/widget/otp-input/otp-input.component";
import { configureTestSuite } from 'ng-bullet';
import { SharedModule } from "../../../../shared/shared-module.module";
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

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
class MockDeviceDisclaimerService{
  Find(){
    return Observable.of('test');
  }
}

describe("DeviceDisclaimerComponent", () => {
  let component: DeviceDisclaimerComponent;
  let fixture: ComponentFixture<DeviceDisclaimerComponent>;
  const data = {"orderDevice":"Huawei-Mate-20-Pro","selectedProductSku":"huaweimate20pro128gbblack","orderDeviceName":"Huawei Mate 20 Pro","selectedImageList":["/media/catalog/product/f/r/front_900x900_20.png"],"orderSummaryStorage":"128GB","orderSummaryColor":"Black","orderPhoneNo":"0133889736","eligibilty":null,"orderPlan":"Ultra-Base","selectedPlanDetails":{"name":"GB XL","sku":"Ultra-GB-XL-Pass","monthlyPlan":"100.0000","orderPlanBundle":"CPT19098","orderServiceBundle":null,"PlanMonthlyPay":"100.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24 months","PlanName":"GB XL","plan_title":"GB XL","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","offer":"10Mbps High-Speed Internet,\r\nUnlimited Call to All Networks","selected_offer_title":"10Mbps","data_limit":"100","banner_image":null,"mobile_image":null,"footNote":null,"upper_age_limit":"50","lower_age_limit":"18","ngn_part_number":"CPT19098","is_xpax":false,"additional_information":null,"productType":"HP","startDate":null,"endDate":null,"backgroundColor":"Black","indicatorClass":"is-bg-color-black","productText":"GB XL","keyFiguresText":"100GB","keyText":"RM100","buyNowLink":"plans/star-bundle/","buyNowText":"Buy now","knowMoreLink":"plans/star-bundle/","knowMoreText":"Learn More","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"fulltime"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-0","atrHref":"#rm-29","ownData":"141","totalAmountWithOwn":241},"orderPlanName":"GB XL","orderAddOnpass":"Ultra-GB","orderSubpass":"Ultra-GB-XL-Pass","orderDevicePrice":"1638","orderMonthlyPay":140,"orderOneTimePay":"100","orderTotalPay":1738,"orderNumberType":"NewNumber","total":1738,"stockDetails":{"status":"In Stock","data":{"bundleSku":"","simpleSku":"huaweimate20pro128gbblack","sku":""}},"orderReqCategory":"HP","orderReqModel":"MATE 20 PRO","orderReqBrand":"HUAWEI","orderReqColor":"BLK","orderReqPartNumber":"MDR6380","orderReqPlanBundle":"CPT19098","orderReqServiceBundle":null,"orderMoon":false,"orderStar":true}
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeviceDetailsComponent,
        BreadcrumbComponent,
        DeviceSliderComponent,
        BbDeviceNamePriceComponent,
        BbDeviceColorComponent,
        BbDeviceStockCheckComponent,
        DeviceDetailsStorageComponent,
        DetailBannerTextLeftComponent,
        DeviceDetailsPlanComponent,
        DeviceDetailsSummaryComponent,
        DeviceDetailsNumberComponent,
        StickySummaryComponent,
        NotificationErrorComponent,
        FooterComponent,
        AgentFooterComponent,
        NoteSectionComponent,
        AgeEligibilityPopupComponent,
        FooterDownloadComponent,
        SocialMediaComponent,
        DeviceMoreDetailsComponent,
        DeviceFlowComponent,
        LifestylePlansComponent,
        LosingSupplementaryLinePopupComponent,
        PlanTableComparisonComponent,
        TableComparisonComponent,
        SupplementaryLinesComponent,
        DeviceSupplementaryLinesComponent,
        CobpComponent,
        SwitchToCelcomComponent,
        DeviceDisclaimerComponent,
        ChooseYourWayComponent,
        TabsNewComponent,
        MoreSupplementaryPopupComponent,
        NotificationBarComponent,
        NricInputComponent,
        MsisdnInputComponent,
        OtpInputComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        FormsModule,
        SharedModule
      ],
      providers: [
        PlanPurchaseService,
        { provide: AppService, useClass: AppMockService },
        // HttpClient,
        // HttpHandler,
        PlanPurchaseService,
        DeviceDataService,
        PlanPurchaseService,
        RedirectionService,
        CartService,
        Broadcaster,
        { provide: ActivatedRoute, useValue: {
          params: Observable.of({deviceId: "iPhone-XR"})
        } },
        { provide: Router, useClass: RouterStub },
        SeoService,
        DecimalPipe,
        PlanTableComparisionService,
        NotificationPopupEvent,
        CookieService,
        RendererService,
        DeviceDetailsService,
        DeviceDisclaimerService,
        UserService,
        HomeService,
        EStoreAnalysticsService,
        GetParametersService,
        DomSanitizer,
        AnalyticsService,
        BundleService,
        CommonUtilService,
        BroadbandService,
        Renderer2,
        ProductService,
        GetParametersService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(DeviceDisclaimerComponent, {
      set: {
        providers: [RedirectionService, {provide:DeviceDisclaimerService,useClass:MockDeviceDisclaimerService}, AppService, BundleService]
      }
    }).compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeviceDisclaimerComponent);
    component = fixture.componentInstance;
  }));
  it("DeviceDetailsDisclaimer should create", () => {
    expect(component).toBeTruthy();
  });
  it("ng on init", () => {
      spyOn(component, "Init");
      component.ngOnInit();
    expect(component.Init).toHaveBeenCalled();
  });
  it("AddToCartNotificationError", inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
      spyOn(devicedataservice, "publishNotification");
      component.AddToCartNotificationError();
      expect(component.errorAddToCart).toBe(true);
      expect(devicedataservice.publishNotification).toHaveBeenCalledWith(component.errorAddToCart);
}));
  it("defaultOnClick", () => {
    const click = component.defaultOnClick();
    expect(click).toBeFalsy();
  });
  it("Init", () => {
    localStorage.setItem('selectedProductDetails',JSON.stringify(data));
    component.Init();
    
  });
  it("publishContractExtended", inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem('addonCode','test');
    component.Init();
    expect(component.addonCode).toBe('test');
    localStorage.removeItem('addonCode');
}));
  it("publishContractExtended", inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.Init();
    devicedataservice.publishIsGoldenNo(true);
    expect(component.IsGoldenNumberSelected).toBeTruthy();
}));
  it("ContinueBox", inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.selectedProductDetails = {
      total:200.45,
      orderDevicePrice:100.55
    };
    localStorage.setItem('USER_TYPE','guest');
    localStorage.setItem('MNP-FLOW','YES');
    localStorage.setItem('isPreOrder',JSON.stringify({'status':"true"}));
    localStorage.setItem('isEasyPhone',JSON.stringify({'status':"true"}));
    localStorage.setItem('validated_id',JSON.stringify({'status':"1234"}));
    localStorage.setItem('isRentClicked',JSON.stringify({'status':"true"}));
    localStorage.setItem('isOwnClicked',JSON.stringify({'status':"true"}));
    localStorage.setItem('isMviva',JSON.stringify({'status':"true"}));
    localStorage.setItem('isBundleClicked',JSON.stringify({'status':"true"}));
    component.ContinueBox();

    localStorage.removeItem('USER_TYPE');
    localStorage.removeItem('MNP-FLOW');
    localStorage.removeItem('isPreOrder');
    localStorage.removeItem('isEasyPhone');
    localStorage.removeItem('validated_id');
    localStorage.removeItem('isRentClicked');
    localStorage.removeItem('isOwnClicked');
    localStorage.removeItem('isMviva');
    localStorage.removeItem('isBundleClicked');
    // expect(devicedataservice.publishNotification).toHaveBeenCalledWith(component.errorAddToCart);
}));
it('AddToCartNotification', () => {
  component.AddToCartNotification();
  localStorage.setItem("isMviva", "false");
  localStorage.setItem("mvivaSummaryMessage", "abc");
  localStorage.setItem("mvivaPlanUpfront", "false");
  localStorage.setItem("mvivaBundleUpfront", "false");
  component.AddToCartNotification();
  localStorage.setItem("isMviva", "false");
  component.AddToCartNotification();
});
it('close__terms__login', () => {
  component.close__terms__login();
});
});
