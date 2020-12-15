import { TableComparisonComponent } from '../../../../../app/Widget/table-comparison/table-comparison.component';
import { LifestylePlansComponent } from '../../../../../app/Store/plan/lifestyle-plans/lifestyle-plans.component';
import { CobpService } from '../../../../../app/Store/cobp/cobp.service';
import { DeviceDetailsPlanService } from './device-details-plans-section.service';
import { ProductService } from '../../../../../app/Service/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "../../../../../app/shared/shared-module.module";

import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { mockData } from './device-details-plans-section.component-mock.spec';
import { FormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DecimalPipe } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DeviceDetailsPlanComponent } from "./device-details-plans-section.component";
import { AgentFooterComponent } from "../../../../Footer/agent-footer/agent-footer.component";
import { SocialMediaComponent } from "../../../../Footer/SocialMedia/socialmedia.component";
import { MinifiedPageLoaderComponent } from "../../../../Store/widget/minified-page-loader/minified-page-loader.component";
import { FooterComponent } from "../../../../Footer/footer.component";
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
import { LosingSupplementaryLinePopupComponent } from "../../../../Store/widget/losing-supplementary-line-popup/losing-supplementary-line-popup.component"
import { TabsNewComponent } from "../../../../Widget/xpax/tabs-new/tabs-new.component";
import { configureTestSuite } from 'ng-bullet';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

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
describe("DeviceDetailsPlanComponent ", () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  let component: DeviceDetailsPlanComponent;
  let fixture: ComponentFixture<DeviceDetailsPlanComponent>;
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, BrowserAnimationsModule, SharedModule ],
      declarations: [
        DeviceDetailsPlanComponent,
        MinifiedPageLoaderComponent,
        TableComparisonComponent,
        LosingSupplementaryLinePopupComponent,
        TabsNewComponent,
        FooterComponent,
        AgentFooterComponent,
        SocialMediaComponent,
        FooterDownloadComponent,
        NotificationErrorComponent,
        AgeEligibilityPopupComponent,
        LifestylePlansComponent,
        CheckoutHeroBannerComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: AppService, useClass: AppMockService },
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useClass: MockactivatedRoute
        },
        CobpService,
        DeviceDetailsPlanService,
        ProductService,
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
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });
  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeviceDetailsPlanComponent);
    component = fixture.componentInstance;
    component.addOnData = {};
    component.isPromotion = true;
    component.supplimentarylines = [
      { "id": 1, "name": "+ 1 Supplementary", "label": "Supplementary" },
      { "id": 2, "name": "+ 2 Supplementary", "label": "Supplementary" },
      { "id": 3, "name": "+ 3 Supplementary", "label": "Supplementary" },
      { "id": 4, "name": "+ 4 Supplementary", "label": "Supplementary" },
      { "id": 5, "name": "+ 5 Supplementary", "label": "Supplementary" }
    ];
    component.isPromotion = false;
    component.data = mockData;
    component.selectedColor = "Gold";
    component.selectedStorage = "64GB";
    component.chosenSuplimentaryLines = 1;
    component.selectedPlan = "FGS";
    component.suppCount = 1;
    component.selectedProd = {
      color: "Gold",
      storage: "64GB"
    };
  }));
  it('should create device details plan component', () => {
    expect(component).toBeTruthy();
  });

  it('should test init function', () => {
    component.data = mockData;
    spyOn(component, "Init");
    component.ngOnInit();
    expect(component.Init).toHaveBeenCalled();
  });

  it('should able to open the accordian of first element', () => {
    component.Init();
    // component.accordianOpen('1');
    //expect(component.accordianOpen).toHaveBeenCalledWith('1');
  });
  it('should test confirmEligiblePlan', () => {
    component.data = mockData;
    component.confirmDeviceFlow("ngInitFlow");
    component.confirmDeviceFlow("changeColourStorage");
  });

  it('should able to display eligible plan', () => {
    component.data = mockData;
    const element = component.data.associated_product[0];
    const planArray = [];
    for (let i = 0; i < element.saleable_plans.length; i++) {
      if (element.saleable_plans[i].sku) {
        planArray.push(element.saleable_plans[i].sku);
      }
    }
    component.eligiblePlanArray = planArray;
    spyOn(component, "eligiblePlansToDisplay");
    component.eligiblePlansToDisplay(component.eligiblePlanArray, element.easy_phone.rent, 'rent');
    expect(component.eligiblePlansToDisplay).toHaveBeenCalledWith(component.eligiblePlanArray, element.easy_phone.rent, 'rent');
    component.eligiblePlansToDisplay(component.eligiblePlanArray, element.easy_phone.own, 'own');
    expect(component.eligiblePlansToDisplay).toHaveBeenCalledWith(component.eligiblePlanArray, element.easy_phone.own, 'own');
  });

  it('should open terms and condition pop up', () => {
    spyOn(component, "TermsAndConditionClick");
    component.TermsAndConditionClick({});
    expect(component.TermsAndConditionClick).toHaveBeenCalled();
  });

  it('should close terms and condition pop up', () => {
    component.OnCloseTermsAndConditionsPopup();
    expect(component.isInitializeTermsAndConditions).toEqual(false);
  });

  it('should test DeselectAllOtherPlan', () => {

    component.activeStateList["FPP"] = ({ planName: "FPP", isActive: true });
    component.activeStateList["FGS"] = ({ planName: "FGS", isActive: true });
    spyOn(component, "DeselectAllOtherPlan");
    component.DeselectAllOtherPlan("FPP");
    expect(component.DeselectAllOtherPlan).toHaveBeenCalledWith("FPP");
    expect(component.activeStateList["FGS"].isActive).toEqual(true);
  });

  it('should test updatePrice', () => {
    spyOn(component, "updatePrice");
    component.updatePrice();
    expect(component.updatePrice).toHaveBeenCalled();
  });
  it('should test removemnpstorage', () => {
    spyOn(localStorage, "removeItem");
    component.removeMNPStorage();
    expect(localStorage.removeItem).toHaveBeenCalledWith("checkToShowEditEligibilityBox");
    const a = localStorage.getItem("Eligible");
    expect(a).toBe("false");
    localStorage.removeItem("Eligible");
  });
  it('should test defaultonclick', () => {
    const b = component.defaultOnClick();
    expect(b).toBe(false);
  });
  it('rent clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "UpdatingTabs");
    spyOn(component, "UpdateRentPrice");
    spyOn(component, "SelectPlan");
    spyOn(devicedataservice, "publishPhoneNo");
    spyOn(devicedataservice, "publishNumberType");
    spyOn(devicedataservice, "publishEasyPhoneTabsClicked");
    spyOn(devicedataservice, "publishDeviceUpfront");
    spyOn(devicedataservice, "publishPlanUpfront");
    const selectedPlan = { "name": "First™ Platinum", "sku": "FP", "monthlyPlan": "148.0000", "orderPlanBundle": "PB11820", "orderServiceBundle": "RTP0010", "PlanMonthlyPay": "148.0000", "OneTimePayment": null, "newCustomer": "0", "segment": "10", "upfrontInstallment": null, "contract": "24", "PlanName": "First™ Platinum", "plan_title": "First™ Platinum", "plan_subtitle": "Now with extra privileges when you sign up for 12 months.", "banner_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg", "mobile_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg", "footNote": null, "upper_age_limit": null, "lower_age_limit": "18", "ngn_part_number": "PB09890", "is_xpax": false, "additional_information": null, "productType": "Service", "startDate": null, "endDate": null, "backgroundColor": "is-bg-color-black", "indicatorClass": "is-level-platinum", "productText": "Platinum", "keyFiguresText": "60 GB", "keyText": "RM 148", "buyNowLink": "/plans/first-platinum", "buyNowText": "Buy now", "knowMoreLink": "/store/plans/first-platinum", "knowMoreText": "Learn more", "mobileDescription": null, "tableInfo": [], "termsAndCondition": { "plans": { "label": "Plans", "desc": null }, "contractTerms": { "label": "Contract Duration", "desc": "24 months contract" }, "legal": { "label": "Legal", "desc": null }, "cancellation": { "label": "Cancellation", "desc": null } }, "is_premium_plan": false, "bill_type": 0, "AtrHref": "#rm-2", "atrHref": "#rm-58", "rentData": "122", "totalAmountWithRent": 270, "ownData": "169", "totalAmountWithOwn": 317, "bundleData": "3888", "bundleUpfrontData": "1100" };
    localStorage.setItem("SelectedPlanDetailsInDevice", JSON.stringify(selectedPlan));
    const rentResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-20"},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-21"},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-23"},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-22"}];
    component.DeviceDetailsRentResponse = JSON.parse(JSON.stringify(rentResp));
    const lowPricePlan = {"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-22"};
    component.rentLowestPricePlan = JSON.parse(JSON.stringify(lowPricePlan));
    component.RentClicked();
    expect(component.isRentClicked).toBe(true);
    expect(component.isOwnClicked).toBe(false);
    expect(component.isBundleClicked).toBe(false);
    expect(component.UpdatingTabs).toHaveBeenCalled();
    expect(component.UpdateRentPrice).toHaveBeenCalled();
    expect(devicedataservice.publishPhoneNo).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishNumberType).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishEasyPhoneTabsClicked).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishDeviceUpfront).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishPlanUpfront).toHaveBeenCalledWith(null);
    expect(component.SelectedPlanDetails).toEqual(JSON.parse(localStorage.getItem("SelectedPlanDetailsInDevice")));
    const lastPlan = component.rentLowestPricePlan;
    expect(lastPlan).toEqual(JSON.parse(JSON.stringify(lowPricePlan)));
    expect(component.SelectPlan).toHaveBeenCalledWith(
      component.SelectedPlanDetails.name,
      component.SelectedPlanDetails.sku,
      component.SelectedPlanDetails.monthlyPlan,
      component.SelectedPlanDetails, component.index, null);
  }));
  it('rent clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "SelectPlan");
    const selectedPlan = { "name": "First™ Platinum", "sku": "", "monthlyPlan": "148.0000", "orderPlanBundle": "PB11820", "orderServiceBundle": "RTP0010", "PlanMonthlyPay": "148.0000", "OneTimePayment": null, "newCustomer": "0", "segment": "10", "upfrontInstallment": null, "contract": "24", "PlanName": "First™ Platinum", "plan_title": "First™ Platinum", "plan_subtitle": "Now with extra privileges when you sign up for 12 months.", "banner_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg", "mobile_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg", "footNote": null, "upper_age_limit": null, "lower_age_limit": "18", "ngn_part_number": "PB09890", "is_xpax": false, "additional_information": null, "productType": "Service", "startDate": null, "endDate": null, "backgroundColor": "is-bg-color-black", "indicatorClass": "is-level-platinum", "productText": "Platinum", "keyFiguresText": "60 GB", "keyText": "RM 148", "buyNowLink": "/plans/first-platinum", "buyNowText": "Buy now", "knowMoreLink": "/store/plans/first-platinum", "knowMoreText": "Learn more", "mobileDescription": null, "tableInfo": [], "termsAndCondition": { "plans": { "label": "Plans", "desc": null }, "contractTerms": { "label": "Contract Duration", "desc": "24 months contract" }, "legal": { "label": "Legal", "desc": null }, "cancellation": { "label": "Cancellation", "desc": null } }, "is_premium_plan": false, "bill_type": 0, "AtrHref": "#rm-2", "atrHref": "#rm-58", "rentData": "122", "totalAmountWithRent": 270, "ownData": "169", "totalAmountWithOwn": 317, "bundleData": "3888", "bundleUpfrontData": "1100" };
    localStorage.setItem("SelectedPlanDetailsInDevice", JSON.stringify(selectedPlan));
    const rentResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-20"},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-21"},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-23"},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-22"}];
    component.DeviceDetailsRentResponse = JSON.parse(JSON.stringify(rentResp));
    component.rentLowestPricePlan = undefined;
    component.RentClicked();
    const lastPlan = (component.DeviceDetailsRentResponse.slice(-1))[0];
    expect(component.SelectPlan).toHaveBeenCalledWith(
      lastPlan.name,
      lastPlan.sku,
      lastPlan.monthlyPlan,
      lastPlan, component.index, null);
  }));
  it('rent clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "SelectPlan");
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    const rentResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-20"},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-21"},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-23"},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-22"}];
    component.DeviceDetailsRentResponse = JSON.parse(JSON.stringify(rentResp));
    const lowPricePlan = {"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-22"};
    component.rentLowestPricePlan = JSON.parse(JSON.stringify(lowPricePlan));
    component.RentClicked();
    const lastPlan = component.rentLowestPricePlan;
    expect(component.SelectPlan).toHaveBeenCalledWith(
      lastPlan.name,
      lastPlan.sku,
      lastPlan.monthlyPlan,
      lastPlan, component.index, null);
  }));
  it('rent clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "SelectPlan");
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    const rentResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-20"},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-21"},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-23"},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-22"}];
    component.DeviceDetailsRentResponse = JSON.parse(JSON.stringify(rentResp));
    component.rentLowestPricePlan = undefined;
    component.RentClicked();
    const lastPlan = (component.DeviceDetailsRentResponse.slice(-1))[0];
    expect(component.SelectPlan).toHaveBeenCalledWith(
      lastPlan.name,
      lastPlan.sku,
      lastPlan.monthlyPlan,
      lastPlan, component.index, null);
  }));
  it('own clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "UpdatingTabs");
    spyOn(component, "UpdateOwnPrice");
    spyOn(component, "SelectPlan");
    spyOn(devicedataservice, "publishPhoneNo");
    spyOn(devicedataservice, "publishNumberType");
    spyOn(devicedataservice, "publishEasyPhoneTabsClicked");
    spyOn(devicedataservice, "publishDeviceUpfront");
    spyOn(devicedataservice, "publishPlanUpfront");
    const selectedPlan = { "name": "First™ Platinum", "sku": "FP", "monthlyPlan": "148.0000", "orderPlanBundle": "PB11820", "orderServiceBundle": "RTP0010", "PlanMonthlyPay": "148.0000", "OneTimePayment": null, "newCustomer": "0", "segment": "10", "upfrontInstallment": null, "contract": "24", "PlanName": "First™ Platinum", "plan_title": "First™ Platinum", "plan_subtitle": "Now with extra privileges when you sign up for 12 months.", "banner_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg", "mobile_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg", "footNote": null, "upper_age_limit": null, "lower_age_limit": "18", "ngn_part_number": "PB09890", "is_xpax": false, "additional_information": null, "productType": "Service", "startDate": null, "endDate": null, "backgroundColor": "is-bg-color-black", "indicatorClass": "is-level-platinum", "productText": "Platinum", "keyFiguresText": "60 GB", "keyText": "RM 148", "buyNowLink": "/plans/first-platinum", "buyNowText": "Buy now", "knowMoreLink": "/store/plans/first-platinum", "knowMoreText": "Learn more", "mobileDescription": null, "tableInfo": [], "termsAndCondition": { "plans": { "label": "Plans", "desc": null }, "contractTerms": { "label": "Contract Duration", "desc": "24 months contract" }, "legal": { "label": "Legal", "desc": null }, "cancellation": { "label": "Cancellation", "desc": null } }, "is_premium_plan": false, "bill_type": 0, "AtrHref": "#rm-2", "atrHref": "#rm-58", "rentData": "122", "totalAmountWithRent": 270, "ownData": "169", "totalAmountWithOwn": 317, "bundleData": "3888", "bundleUpfrontData": "1100" };
    localStorage.setItem("SelectedPlanDetailsInDevice", JSON.stringify(selectedPlan));
    const ownResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-56","rentData":"150","totalAmountWithRent":278,"ownData":"159","totalAmountWithOwn":287,"bundleData":"4028","bundleUpfrontData":"900"},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-57","rentData":"139","totalAmountWithRent":237,"ownData":"187","totalAmountWithOwn":285,"bundleData":"4248","bundleUpfrontData":"700"},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-59","rentData":"127","totalAmountWithRent":315,"ownData":"174","totalAmountWithOwn":362,"bundleData":"3598","bundleUpfrontData":"1300"},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-58","rentData":"122","totalAmountWithRent":270,"ownData":"169","totalAmountWithOwn":317,"bundleData":"3888","bundleUpfrontData":"1100"}];
    component.DeviceDetailsOwnResponse = JSON.parse(JSON.stringify(ownResp));
    const lowPricePlan = {"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-56","rentData":"150","totalAmountWithRent":278,"ownData":"159","totalAmountWithOwn":287,"bundleData":"4028","bundleUpfrontData":"900"};
    component.ownLowestPricePlan = JSON.parse(JSON.stringify(lowPricePlan));
    component.OwnClicked();
    expect(component.isRentClicked).toBe(false);
    expect(component.isOwnClicked).toBe(true);
    expect(component.isBundleClicked).toBe(false);
    expect(component.UpdatingTabs).toHaveBeenCalled();
    expect(component.UpdateOwnPrice).toHaveBeenCalled();
    expect(devicedataservice.publishPhoneNo).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishNumberType).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishEasyPhoneTabsClicked).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishDeviceUpfront).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishPlanUpfront).toHaveBeenCalledWith(null);
    expect(component.SelectedPlanDetails).toEqual(JSON.parse(localStorage.getItem("SelectedPlanDetailsInDevice")));
    const lastPlan = component.ownLowestPricePlan;
    expect(lastPlan).toEqual(JSON.parse(JSON.stringify(lowPricePlan)));
    expect(component.SelectPlan).toHaveBeenCalledWith(
      component.SelectedPlanDetails.name,
      component.SelectedPlanDetails.sku,
      component.SelectedPlanDetails.monthlyPlan,
      component.SelectedPlanDetails, component.index, null);
  }));
  it('own clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "SelectPlan");
    const selectedPlan = { "name": "First™ Platinum", "sku": "", "monthlyPlan": "148.0000", "orderPlanBundle": "PB11820", "orderServiceBundle": "RTP0010", "PlanMonthlyPay": "148.0000", "OneTimePayment": null, "newCustomer": "0", "segment": "10", "upfrontInstallment": null, "contract": "24", "PlanName": "First™ Platinum", "plan_title": "First™ Platinum", "plan_subtitle": "Now with extra privileges when you sign up for 12 months.", "banner_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg", "mobile_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg", "footNote": null, "upper_age_limit": null, "lower_age_limit": "18", "ngn_part_number": "PB09890", "is_xpax": false, "additional_information": null, "productType": "Service", "startDate": null, "endDate": null, "backgroundColor": "is-bg-color-black", "indicatorClass": "is-level-platinum", "productText": "Platinum", "keyFiguresText": "60 GB", "keyText": "RM 148", "buyNowLink": "/plans/first-platinum", "buyNowText": "Buy now", "knowMoreLink": "/store/plans/first-platinum", "knowMoreText": "Learn more", "mobileDescription": null, "tableInfo": [], "termsAndCondition": { "plans": { "label": "Plans", "desc": null }, "contractTerms": { "label": "Contract Duration", "desc": "24 months contract" }, "legal": { "label": "Legal", "desc": null }, "cancellation": { "label": "Cancellation", "desc": null } }, "is_premium_plan": false, "bill_type": 0, "AtrHref": "#rm-2", "atrHref": "#rm-58", "rentData": "122", "totalAmountWithRent": 270, "ownData": "169", "totalAmountWithOwn": 317, "bundleData": "3888", "bundleUpfrontData": "1100" };
    localStorage.setItem("SelectedPlanDetailsInDevice", JSON.stringify(selectedPlan));
    const ownResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-56","rentData":"150","totalAmountWithRent":278,"ownData":"159","totalAmountWithOwn":287,"bundleData":"4028","bundleUpfrontData":"900"},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-57","rentData":"139","totalAmountWithRent":237,"ownData":"187","totalAmountWithOwn":285,"bundleData":"4248","bundleUpfrontData":"700"},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-59","rentData":"127","totalAmountWithRent":315,"ownData":"174","totalAmountWithOwn":362,"bundleData":"3598","bundleUpfrontData":"1300"},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-58","rentData":"122","totalAmountWithRent":270,"ownData":"169","totalAmountWithOwn":317,"bundleData":"3888","bundleUpfrontData":"1100"}];
    component.DeviceDetailsOwnResponse = JSON.parse(JSON.stringify(ownResp));
    component.ownLowestPricePlan = undefined;
    component.OwnClicked();
    const lastPlan = (component.DeviceDetailsOwnResponse.slice(-1))[0];
    expect(component.SelectPlan).toHaveBeenCalledWith(
      lastPlan.name,
      lastPlan.sku,
      lastPlan.monthlyPlan,
      lastPlan, component.index, null);
  }));
  it('own clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "SelectPlan");
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    const ownResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-56","rentData":"150","totalAmountWithRent":278,"ownData":"159","totalAmountWithOwn":287,"bundleData":"4028","bundleUpfrontData":"900"},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-57","rentData":"139","totalAmountWithRent":237,"ownData":"187","totalAmountWithOwn":285,"bundleData":"4248","bundleUpfrontData":"700"},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-59","rentData":"127","totalAmountWithRent":315,"ownData":"174","totalAmountWithOwn":362,"bundleData":"3598","bundleUpfrontData":"1300"},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-58","rentData":"122","totalAmountWithRent":270,"ownData":"169","totalAmountWithOwn":317,"bundleData":"3888","bundleUpfrontData":"1100"}];
    component.DeviceDetailsOwnResponse = JSON.parse(JSON.stringify(ownResp));
    const lowPricePlan = {"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-56","rentData":"150","totalAmountWithRent":278,"ownData":"159","totalAmountWithOwn":287,"bundleData":"4028","bundleUpfrontData":"900"};
    component.ownLowestPricePlan = JSON.parse(JSON.stringify(lowPricePlan));
    component.OwnClicked();
    const lastPlan = component.ownLowestPricePlan;
    expect(component.SelectPlan).toHaveBeenCalledWith(
      lastPlan.name,
      lastPlan.sku,
      lastPlan.monthlyPlan,
      lastPlan, component.index, null);
  }));
  it('own clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "SelectPlan");
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    const ownResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-56","rentData":"150","totalAmountWithRent":278,"ownData":"159","totalAmountWithOwn":287,"bundleData":"4028","bundleUpfrontData":"900"},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-57","rentData":"139","totalAmountWithRent":237,"ownData":"187","totalAmountWithOwn":285,"bundleData":"4248","bundleUpfrontData":"700"},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-59","rentData":"127","totalAmountWithRent":315,"ownData":"174","totalAmountWithOwn":362,"bundleData":"3598","bundleUpfrontData":"1300"},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-58","rentData":"122","totalAmountWithRent":270,"ownData":"169","totalAmountWithOwn":317,"bundleData":"3888","bundleUpfrontData":"1100"}];
    component.DeviceDetailsOwnResponse = JSON.parse(JSON.stringify(ownResp));
    component.ownLowestPricePlan = undefined;
    component.OwnClicked();
    const lastPlan = (component.DeviceDetailsOwnResponse.slice(-1))[0];
    expect(component.SelectPlan).toHaveBeenCalledWith(
      lastPlan.name,
      lastPlan.sku,
      lastPlan.monthlyPlan,
      lastPlan, component.index, null);
  }));
  it('bundle clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "UpdatingTabs");
    spyOn(component, "UpdateBundlePrice");
    spyOn(component, "UpdateUpfrontPrice");
    spyOn(component, "SelectPlan");
    const selectedPlan = { "name": "First™ Platinum", "sku": "", "monthlyPlan": "148.0000", "orderPlanBundle": "PB11820", "orderServiceBundle": "RTP0010", "PlanMonthlyPay": "148.0000", "OneTimePayment": null, "newCustomer": "0", "segment": "10", "upfrontInstallment": null, "contract": "24", "PlanName": "First™ Platinum", "plan_title": "First™ Platinum", "plan_subtitle": "Now with extra privileges when you sign up for 12 months.", "banner_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg", "mobile_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg", "footNote": null, "upper_age_limit": null, "lower_age_limit": "18", "ngn_part_number": "PB09890", "is_xpax": false, "additional_information": null, "productType": "Service", "startDate": null, "endDate": null, "backgroundColor": "is-bg-color-black", "indicatorClass": "is-level-platinum", "productText": "Platinum", "keyFiguresText": "60 GB", "keyText": "RM 148", "buyNowLink": "/plans/first-platinum", "buyNowText": "Buy now", "knowMoreLink": "/store/plans/first-platinum", "knowMoreText": "Learn more", "mobileDescription": null, "tableInfo": [], "termsAndCondition": { "plans": { "label": "Plans", "desc": null }, "contractTerms": { "label": "Contract Duration", "desc": "24 months contract" }, "legal": { "label": "Legal", "desc": null }, "cancellation": { "label": "Cancellation", "desc": null } }, "is_premium_plan": false, "bill_type": 0, "AtrHref": "#rm-2", "atrHref": "#rm-58", "rentData": "122", "totalAmountWithRent": 270, "ownData": "169", "totalAmountWithOwn": 317, "bundleData": "3888", "bundleUpfrontData": "1100" };
    localStorage.setItem("SelectedPlanDetailsInDevice", JSON.stringify(selectedPlan));
    component.BundleClicked();
    expect(component.isRentClicked).toBe(false);
    expect(component.isOwnClicked).toBe(false);
    expect(component.isBundleClicked).toBe(true);
    expect(component.UpdatingTabs).toHaveBeenCalled();
    expect(component.UpdateBundlePrice).toHaveBeenCalled();
    expect(component.UpdateUpfrontPrice).toHaveBeenCalled();
    // expect(component.SelectedPlanDetails).toEqual(JSON.parse(localStorage.getItem("SelectedPlanDetailsInDevice")));
    expect(component.SelectPlan).toHaveBeenCalledWith(
      component.SelectedPlanDetails.name,
      component.SelectedPlanDetails.sku,
      component.SelectedPlanDetails.monthlyPlan,
      component.SelectedPlanDetails, component.index, null);
  }));
  it('update bundle data', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    const bundle = [{"key":"FGS","value":"4028"},{"key":"FGP","value":"4248"},{"key":"FP","value":"3888"},{"key":"FPP","value":"3598"}];
    const bundleData = JSON.parse(JSON.stringify(bundle));
    const bundleResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-56","rentData":"150","totalAmountWithRent":278,"ownData":"159","totalAmountWithOwn":287},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-57","rentData":"139","totalAmountWithRent":237,"ownData":"187","totalAmountWithOwn":285},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-58","rentData":"122","totalAmountWithRent":270,"ownData":"169","totalAmountWithOwn":317},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-59","rentData":"127","totalAmountWithRent":315,"ownData":"174","totalAmountWithOwn":362}];
    component.DeviceDetailsBundleResponse = JSON.parse(JSON.stringify(bundleResp));
    component.UpdateBundleData(bundleData);
        expect(component.DeviceDetailsBundleResponse[0].bundleData).toBe("4028");
        expect(component.DeviceDetailsBundleResponse[1].bundleData).toBe("4248");
        expect(component.DeviceDetailsBundleResponse[2].bundleData).toBe("3888");
        expect(component.DeviceDetailsBundleResponse[3].bundleData).toBe("3598");
  }));
  it('update bundle upfront', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    const bundle = [{"key":"FGS","value":"128"},{"key":"FGP","value":"148"},{"key":"FP","value":"188"},{"key":"FPP","value":"198"}];
    const bundleUpfront = JSON.parse(JSON.stringify(bundle));
    const bundleResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-56","rentData":"150","totalAmountWithRent":278,"ownData":"159","totalAmountWithOwn":287},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-57","rentData":"139","totalAmountWithRent":237,"ownData":"187","totalAmountWithOwn":285},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-58","rentData":"122","totalAmountWithRent":270,"ownData":"169","totalAmountWithOwn":317},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-59","rentData":"127","totalAmountWithRent":315,"ownData":"174","totalAmountWithOwn":362}];
    component.DeviceDetailsBundleResponse = JSON.parse(JSON.stringify(bundleResp));
    component.UpdateUpfrontData(bundleUpfront);
        expect(component.DeviceDetailsBundleResponse[0].bundleUpfrontData).toBe("128");
        expect(component.DeviceDetailsBundleResponse[1].bundleUpfrontData).toBe("148");
        expect(component.DeviceDetailsBundleResponse[2].bundleUpfrontData).toBe("188");
        expect(component.DeviceDetailsBundleResponse[3].bundleUpfrontData).toBe("198");
  }));
  it('update rent data', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    const rent = [{"FGS":"150"},{"FGP":"139"},{"FPP":"127"},{"FP":"122"}];
    const rentData = JSON.parse(JSON.stringify(rent));
    const rentResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-56"},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-57"},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-59"},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-58"}];
    component.DeviceDetailsRentResponse = JSON.parse(JSON.stringify(rentResp));
    component.UpdateRentData(rentData);
        expect(component.DeviceDetailsRentResponse[0].rentData).toBe("150");
        expect(component.DeviceDetailsRentResponse[1].rentData).toBe("139");
        expect(component.DeviceDetailsRentResponse[2].rentData).toBe("127");
        expect(component.DeviceDetailsRentResponse[3].rentData).toBe("122");
        expect(component.DeviceDetailsRentResponse[0].totalAmountWithRent).toBe(278);
        expect(component.DeviceDetailsRentResponse[1].totalAmountWithRent).toBe(237);
        expect(component.DeviceDetailsRentResponse[2].totalAmountWithRent).toBe(315);
        expect(component.DeviceDetailsRentResponse[3].totalAmountWithRent).toBe(270);
  }));
  it('update own data', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    const own = [{"FGS":"159"},{"FGP":"187"},{"FPP":"174"},{"FP":"169"}];
    const ownData = JSON.parse(JSON.stringify(own));
    const ownResp = [{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1,"AtrHref":"#rm-1","atrHref":"#rm-56"},{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-0","atrHref":"#rm-57"},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-3","atrHref":"#rm-59"},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0,"AtrHref":"#rm-2","atrHref":"#rm-58"}];
    component.DeviceDetailsOwnResponse = JSON.parse(JSON.stringify(ownResp));
    component.UpdateOwnData(ownData);
        expect(component.DeviceDetailsOwnResponse[0].ownData).toBe("159");
        expect(component.DeviceDetailsOwnResponse[1].ownData).toBe("187");
        expect(component.DeviceDetailsOwnResponse[2].ownData).toBe("174");
        expect(component.DeviceDetailsOwnResponse[3].ownData).toBe("169");
        expect(component.DeviceDetailsOwnResponse[0].totalAmountWithOwn).toBe(287);
        expect(component.DeviceDetailsOwnResponse[1].totalAmountWithOwn).toBe(285);
        expect(component.DeviceDetailsOwnResponse[2].totalAmountWithOwn).toBe(362);
        expect(component.DeviceDetailsOwnResponse[3].totalAmountWithOwn).toBe(317);
  }));
  it('flow selected', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "BuyWithOutPlan");
    spyOn(component.publishPrincipleLineClicked, "emit");
    component.DevicePagePurachaseTypeCLicked = "Device Only";
    component.flowSelected();
    expect(component.principleLineOnly).toBe(false);
    expect(component.confirmDeviceOnlyFlow).toBe(true);
    expect(component.linesAdded).toBe(null);
    expect(component.BuyWithOutPlan).toHaveBeenCalled();
    expect(component.publishPrincipleLineClicked.emit).toHaveBeenCalledWith(component.principleLineOnly);
    component.DevicePagePurachaseTypeCLicked = "Easyphone";
    spyOn(devicedataservice, "publishPurchaseTypeTab");
    spyOn(localStorage, "removeItem");
    spyOn(component, "confirmEligiblePlan");
    component.SelectionAferLogin = {color: "Red", storage: "256GB"};
    localStorage.setItem('COBP_FLOW', "YES");
    localStorage.setItem("isRentClicked", "true");
    localStorage.setItem("BuyNoPlan", "true");
    localStorage.setItem("isEasyPhone", "true");
    localStorage.setItem("suppNumber", "1");
    component.flowSelected();
    expect(component.isEasyPhone).toBe(true);
    expect(component.buyNoPlan).toBe(false);
    expect(component.disablePlan).toBe(false);
    expect(component.hideXpax).toBe(false);
    expect(component.linesAdded).toBe(null);
    expect(devicedataservice.publishPurchaseTypeTab).toHaveBeenCalledWith("SameNumber");
    expect(localStorage.removeItem).toHaveBeenCalledWith("suppNumber");
    expect(localStorage.removeItem).toHaveBeenCalledWith("BuyNoPlan");
    expect(component.confirmEligiblePlan).toHaveBeenCalledWith("changeColourStorage");
    component.SelectionAferLogin = undefined;
    component.flowSelected();
    expect(component.linesAdded).toBe(null);
    localStorage.removeItem("isRentClicked");
    localStorage.removeItem("COBP_FLOW");
    localStorage.removeItem("isEasyPhone");
  }));
  it('flow selected', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.DevicePagePurachaseTypeCLicked = "Device Bundle";
    localStorage.setItem("BuyNoPlan", "true");
    spyOn(component, "BundleClicked");
    spyOn(component, "SuppLinesSelection");
    spyOn(localStorage, "removeItem");
    spyOn(devicedataservice, "publishPurchaseTypeTab");
    component.SelectionAferLogin = {color: "Red", storage: "256GB"};
    localStorage.setItem("COBP_FLOW", "YES");
    localStorage.setItem("isBundleClicked", "true");
    component.noOflinesAdded = 2;
    const tableResp = [{"tabName":"Celcom Mobile Plans","tabTitle":null,"tabSubtitle":null,"is_xpax":false,"tabData":[{"name":"First™ Gold Plus","sku":"FGP","monthlyPlan":"98.0000","orderPlanBundle":"PB12070","orderServiceBundle":"RTP0010","PlanMonthlyPay":"98.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Plus","plan_title":"First™ Gold Plus. Affordable. Complete","plan_subtitle":"Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB10840","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Plus","keyFiguresText":"40 GB","keyText":"RM 98","buyNowLink":"/plans/first-gold-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":"Unlimited Standard national calls + texts + videocalls"},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":"All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"},"cancellation":{"label":"Cancellation","desc":"Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"}},"is_premium_plan":false,"bill_type":0},{"name":"First™ Gold Supreme","sku":"FGS","monthlyPlan":"128.0000","orderPlanBundle":"PB11830","orderServiceBundle":"RTP0010","PlanMonthlyPay":"128.0000","OneTimePayment":null,"newCustomer":"0","segment":null,"upfrontInstallment":null,"contract":"24","PlanName":"First™ Gold Supreme","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-gold","productText":"Gold Supreme","keyFiguresText":"50 GB","keyText":"RM 128","buyNowLink":"/plans/first-gold-supreme","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":1},{"name":"First™ Platinum","sku":"FP","monthlyPlan":"148.0000","orderPlanBundle":"PB11820","orderServiceBundle":"RTP0010","PlanMonthlyPay":"148.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"First™ Platinum","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB09890","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum","productText":"Platinum","keyFiguresText":"60 GB","keyText":"RM 148","buyNowLink":"/plans/first-platinum","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","monthlyPlan":"188.0000","orderPlanBundle":"PB11860","orderServiceBundle":"RTP0010","PlanMonthlyPay":"188.0000","OneTimePayment":null,"newCustomer":"0","segment":"10","upfrontInstallment":null,"contract":"24","PlanName":"Celcom Mobile Platinum Plus","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","footNote":null,"upper_age_limit":null,"lower_age_limit":"18","ngn_part_number":"PB11900","is_xpax":false,"additional_information":null,"productType":"Service","startDate":null,"endDate":null,"backgroundColor":"is-bg-color-black","indicatorClass":"is-level-platinum-plus","productText":"Platinum Plus","keyFiguresText":"100 GB","keyText":"RM 188","buyNowLink":"/plans/first-platinum-plus","buyNowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","mobileDescription":null,"tableInfo":[],"termsAndCondition":{"plans":{"label":"Plans","desc":null},"contractTerms":{"label":"Contract Duration","desc":"24 months contract"},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"is_premium_plan":false,"bill_type":0}],"planType":"POSTPAID","isXpax":false}];
    component.TableComparisonResponse = JSON.parse(JSON.stringify(tableResp));
    component.flowSelected();
    expect(component.isEasyPhone).toBe(false);
    expect(component.buyNoPlan).toBe(false);
    expect(component.principleLineOnly).toBe(true);
    expect(component.isBundleClicked).toBe(true);
    expect(component.BundleClicked).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith("BuyNoPlan");
    expect(devicedataservice.publishPurchaseTypeTab).toHaveBeenCalledWith('SameNumber');
    expect(component.SuppLinesSelection).toHaveBeenCalledWith(null, component.noOflinesAdded);
    component.noOflinesAdded = null;
    component.linesAdded = 2;
    component.flowSelected();
    expect(component.SuppLinesSelection).toHaveBeenCalledWith(null, component.linesAdded);
    component.SelectionAferLogin = undefined;
    component.linesAdded = null;
    component.flowSelected();
    expect(component.SuppLinesSelection).toHaveBeenCalledWith(null, "PrincipleLineOnly");
  }));
  it('DealerInfo', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    sessionStorage.setItem("DealerInfo", "abc");
    component.ngOnInit();
    expect(component.isDealer).toBe(true);
    sessionStorage.removeItem("DealerInfo");
  }));
  it('ngoninit edit', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem("EditEasyPhone", "true");
    spyOn(devicedataservice, "publishEditCartEasyPhone");
    spyOn(component, "UpdateRentPrice");
    spyOn(component, "UpdateRentData");
    localStorage.setItem("isRentClicked", "true");
    const rent = [{"FGS":"150"},{"FGP":"139"},{"FPP":"127"},{"FP":"122"}];
    localStorage.setItem("easyPhoneRentData", JSON.stringify(rent));
    component.ngOnInit();
    expect(component.isRentClicked).toBe(true);
    expect(component.isEasyPhone).toBe(true);
    expect(component.tabSelected).toBe(true);
    expect(component.DevicePagePurachaseTypeCLicked).toBe("Easyphone");
    expect(devicedataservice.publishEditCartEasyPhone).toHaveBeenCalledWith(true);
    expect(component.UpdateRentData).toHaveBeenCalledWith(JSON.parse(localStorage.getItem("easyPhoneRentData")));
    expect(component.UpdateRentPrice).toHaveBeenCalled();
    const a = localStorage.getItem('afterLoginEasyPhone');
    expect(a).toBe("true");
  }));
  it('ngoninit edit', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.removeItem("EditEasyPhone");
    localStorage.setItem("keepCelcomNumEasyPhone", "true");
    localStorage.setItem("MyMsIsdn", "60110101111");
    spyOn(devicedataservice, "publishEditCartEasyPhone");
    spyOn(component, "UpdateOwnPrice");
    spyOn(component, "UpdateOwnData");
    spyOn(localStorage, "removeItem");
    localStorage.setItem("isOwnClicked", "true");
    const own = [{"FGS":"150"},{"FGP":"139"},{"FPP":"127"},{"FP":"122"}];
    localStorage.setItem("easyPhoneOwnData", JSON.stringify(own));
    component.ngOnInit();
    expect(component.isOwnClicked).toBe(true);
    expect(component.DevicePagePurachaseTypeCLicked).toBe("Easyphone");
    expect(devicedataservice.publishEditCartEasyPhone).toHaveBeenCalledWith(true);
    expect(component.UpdateOwnData).toHaveBeenCalledWith(JSON.parse(localStorage.getItem("easyPhoneOwnData")));
    expect(component.UpdateOwnPrice).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith('keepCelcomNumEasyPhone');
  }));
  it('ngoninit edit', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.removeItem("EditEasyPhone");
    localStorage.setItem("keepCelcomNumEasyPhone", "true");
    localStorage.setItem("MyMsIsdn", "60110101111");
    spyOn(devicedataservice, "publishEditCartEasyPhone");
    spyOn(component, "UpdateBundlePrice");
    spyOn(component, "UpdateBundleData");
    spyOn(component, "UpdateUpfrontPrice");
    spyOn(component, "UpdateUpfrontData");
    spyOn(localStorage, "removeItem");
    localStorage.setItem("isBundleClicked", "true");
    const bundle = [{"key":"FGS","value":"4028"},{"key":"FGP","value":"4248"},{"key":"FP","value":"3888"},{"key":"FPP","value":"3598"}];
    localStorage.setItem("easyPhoneBundleData", JSON.stringify(bundle));
    const upfront = [{"key":"FGS","value":"900"},{"key":"FGP","value":"700"},{"key":"FP","value":"1100"},{"key":"FPP","value":"1300"}];
    localStorage.setItem("easyPhoneUpfrontData", JSON.stringify(upfront));
    component.ngOnInit();
    expect(component.isBundleClicked).toBe(true);
    expect(component.UpdateBundleData).toHaveBeenCalledWith(JSON.parse(localStorage.getItem("easyPhoneBundleData")));
    expect(component.UpdateBundlePrice).toHaveBeenCalled();
    expect(component.UpdateUpfrontData).toHaveBeenCalledWith(JSON.parse(localStorage.getItem("easyPhoneUpfrontData")));
    expect(component.UpdateUpfrontPrice).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith('keepCelcomNumEasyPhone');
    localStorage.removeItem("MyMsIsdn");
    localStorage.removeItem("afterLoginEasyPhone");
    localStorage.removeItem("isRentClicked");
    localStorage.removeItem("isOwnClicked");
  }));
  it('getDataToShow', ()=>{
    component.DevicePagePurachaseTypeCLicked = 'Easyphone';
    component.DeviceDetailsRentResponse = [{
      type: 'rent'
    }];
    component.DeviceDetailsOwnResponse = [{
      type: 'own'
    }];
    const type = component.getDataToShow(true);
    const type2 = component.getDataToShow(false);
    expect(type).toEqual(component.DeviceDetailsRentResponse);
    expect(type2).toEqual(component.DeviceDetailsOwnResponse);
  });
  it('getDevicePrice', ()=>{
    const dummyData = {
      "associated_product": [
        {
          "name": "Huawei P20 128GB Pink",
          "sku": "HuaweiP20128GBPink",
          "color": "Pink",
          "memory": "128GB",
          "saleable_plans": [
            {
              "sku": "Ultra-GB-L-Pass",
              "prices": [
                {
                  "upfront_price": "500",
                  "device_price": "1678",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            },
            {
              "sku": "Ultra-GB-L-Pass_1",
              "prices": [
                {
                  "upfront_price": "300",
                  "device_price": "1838",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            },
            {
              "sku": "Ultra-GB-L-Pass_2",
              "prices": [
                {
                  "upfront_price": "600",
                  "device_price": "1538",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            },
            {
              "sku": "Ultra-GB-L-Pass_3",
              "prices": [
                {
                  "upfront_price": "1500",
                  "device_price": "0",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            },
            {
              "sku": "Ultra-GB-M-Pass",
              "prices": [
                {
                  "upfront_price": "600",
                  "device_price": "1578",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            },
            {
              "sku": "Ultra-GB-M-Pass_1",
              "prices": [
                {
                  "upfront_price": "700",
                  "device_price": "1478",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            },
            {
              "sku": "Ultra-GB-M-Pass_2",
              "prices": [
                {
                  "upfront_price": "800",
                  "device_price": "1378",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            },
            {
              "sku": "Ultra-GB-M-Pass_3",
              "prices": [
                {
                  "upfront_price": "400",
                  "device_price": "1738",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            },
            {
              "sku": "Ultra-GB-XL-Pass",
              "prices": [
                {
                  "upfront_price": "500",
                  "device_price": "1638",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            },
            {
              "sku": "Ultra-GB-XL-Pass_1",
              "prices": [
                {
                  "upfront_price": "700",
                  "device_price": "1438",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            },
            {
              "sku": "Ultra-GB-XL-Pass_2",
              "prices": [
                {
                  "upfront_price": "800",
                  "device_price": "1338",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            },
            {
              "sku": "Ultra-GB-XL-Pass_3",
              "prices": [
                {
                  "upfront_price": "900",
                  "device_price": "1238",
                  "penalty_price": "",
                  "supplementary_count": 0
                }
              ]
            }
          ],
        }
      ]
    }

    component.data = dummyData;
    component.selectedColor = 'Pink';
    component.selectedStorage = '128GB';
    const price = component.getDevicePrice('Ultra-GB-L-Pass');
    expect(price).toBe(1678);
  });
  it('calculateMonthlyPrice for rent', ()=>{
    component.isRentClicked = true;
    component.selectedPlan = "Ultra-GB-XL-Pass";
    component.data = {
      "associated_product": [
        {
          "name": "Huawei P20 128GB Pink",
          "sku": "HuaweiP20128GBPink",
          "color": "Pink",
          "memory": "128GB",
          "easy_phone": {
            "rent": [
              {
                "Ultra-GB-L-Pass": "700"
              },
              {
                "Ultra-GB-M-Pass": "800"
              },
              {
                "Ultra-GB-XL-Pass": "900"
              }
            ],
            "own": [
              {
                "Ultra-GB-L-Pass": "600"
              },
              {
                "Ultra-GB-M-Pass": "700"
              },
              {
                "Ultra-GB-XL-Pass": "700"
              }
            ],
            "rent_selected_plan": [
              "Ultra-GB-L-Pass",
              "Ultra-GB-M-Pass",
              "Ultra-GB-XL-Pass"
            ],
            "own_selected_plan": [
              "Ultra-GB-L-Pass",
              "Ultra-GB-M-Pass",
              "Ultra-GB-XL-Pass"
            ],
            "penalityown": [
              {
                "Ultra-GB-L-Pass": "1200"
              },
              {
                "Ultra-GB-M-Pass": "1240"
              },
              {
                "Ultra-GB-XL-Pass": "1300"
              }
            ],
            "penalityrent": [
              {
                "Ultra-GB-L-Pass": "1400"
              },
              {
                "Ultra-GB-M-Pass": "1500"
              },
              {
                "Ultra-GB-XL-Pass": "1500"
              }
            ]
          },
        }
      ],
      "base_plan": [
        {
          "name": "Celcom Ultra",
          "sku": "Ultra-Base",
          "monthlyPlan": "20.0000",
          "PlanMonthlyPay": "20.0000",
          "selected_offer_title": "10Mbps",
          "data_limit": "10",
        }
      ],
      "choose_plan": [
        {
          "tabName": "Celcom Mobile Plans",
          "tabTitle": null,
          "tabSubtitle": null,
          "is_xpax": false,
          "tabData": [
            {
              "name": "GB XL",
              "sku": "Ultra-GB-XL-Pass",
              "monthlyPlan": "100.0000",
              "orderPlanBundle": "PB20003",
              "orderServiceBundle": null,
              "PlanMonthlyPay": "100.0000",
              "selected_offer_title": "10Mbps",
              "data_limit": "80"
            },
            {
              "name": "GB L",
              "sku": "Ultra-GB-L-Pass",
              "monthlyPlan": "70.0000",
              "orderPlanBundle": "PB128281",
              "orderServiceBundle": null,
              "PlanMonthlyPay": "70.0000",
              "selected_offer_title": "10Mbps",
              "data_limit": "70"
            },
            {
              "name": "GB M",
              "sku": "Ultra-GB-M-Pass",
              "monthlyPlan": "50.0000",
              "orderPlanBundle": "109283",
              "orderServiceBundle": null,
              "PlanMonthlyPay": "50.0000",
              "selected_offer_title": "10Mbps",
              "data_limit": "50"
            }
          ]
        }
      ],
    }
    component.DeviceDetailsBundleResponse = component.data.choose_plan[0].tabData;
    component.selectedBasePlan = component.data.base_plan[0];
    component.selectedColor = 'Pink';
    component.selectedStorage = '128GB';
    spyOn(component, 'getSelectedPlanObj')
      .and
      .returnValue(component.data.choose_plan[0].tabData[0]);
    component.calculateMonthlyPrice();
    expect(component.totalDataLimit).toBe(10 + 80);
    expect(component.totalPlanMonthly).toBe(20 + 100);
  });
  it('sortPlans', () => {
    const mockData = [
      {'monthlyPlan': 1},
      {'monthlyPlan': 2},
      {'monthlyPlan': 3},
    ];
    const expectedData = [
      {'monthlyPlan': 3},
      {'monthlyPlan': 2},
      {'monthlyPlan': 1},
    ];
    component.isProjectStar = true;
    component.DeviceDetailsBundleResponse = mockData;
    component.DeviceDetailsRentResponse = mockData;
    component.DeviceDetailsOwnResponse = mockData;
    component.sortPlans();
    expect(component.DeviceDetailsBundleResponse).toEqual(expectedData);
    expect(component.DeviceDetailsRentResponse).toEqual(expectedData);
    expect(component.DeviceDetailsOwnResponse).toEqual(expectedData);
  })
});
