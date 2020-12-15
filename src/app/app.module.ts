import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UniversalInterceptor } from './universal.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { router } from './app.router';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './Service/app.service';
import { UserService } from './Service/user.service';
import { AppMockService } from './Service/appmock.service';
import { RoutesService } from "./Service/routes.service";
import { NotificationPopupEvent } from "./Service/broadcaster.service";
import { Broadcaster } from "./Model/broadcaster.model";
import { CommonModule } from "@angular/common";
import { NguCarouselModule } from '@ngu/carousel';
import { DeviceDataService } from './Service/devicedata.service';
import { GetParametersService } from './Service/getParamaters.service';
import { CommonUtilService } from './Service/commonUtil.service';

// import all component...
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import { HeaderComponent } from './Header/header.component';
import { OldSubNavigationComponent } from './Header/SubNavigation/subnavigation.component';
import { FooterComponent } from './Footer/footer.component';
import { AgentFooterComponent } from './Footer/agent-footer/agent-footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SocialMediaComponent } from './Footer/SocialMedia/socialmedia.component';
import { FooterDownloadComponent } from './Footer/Download/download.component';
import { NotificationComponent } from './Widget/notification/notification.component';
// import all widget...

import { ImportantNoticeComponent } from './Widget/important-notice/important-notice.component';
import { HeroBannerCarouselComponent } from './Widget/HeroBannerCarousel/herobanner.carousel.component';
import { HeroBannerImageClickableComponent } from './Widget/HeroBannerImageClickable/hero-banner-image-clickable.component';
import { TableComparisonComponent } from './Widget/table-comparison/table-comparison.component';
import { DetailBannerTextLeftComponent } from './Widget/DetailBannerTextLeft/DetailBannerTextLeft.component';
import { ImgaeCardOverlayComponent } from './Widget/imgae-card-overlay/imgae-card-overlay.component';
import { ImageCard3Component } from './Widget/image-card3/image-card3.component';
import { SearchHeaderComponent } from './Widget/search-header/search-header.component';
import { SearchBarComponent } from './Widget/search-bar/search-bar.component';
import { SearchFindingsComponent } from './Widget/search-findings/search-findings.component';
import { TitleBoxLinkComponent } from './Widget/title-box-link/title-box-link.component';
import { AppWidgetDirective } from './app.widget.directive';
import { FeedbackComponent } from './Widget/feedback/feedback.component';
import { TabComponent } from './Widget/xpax/tab/tab.component';
import { TabsNewComponent } from './Widget/xpax/tabs-new/tabs-new.component';
import { CookieService } from 'ngx-cookie-service';

// Store Components.
import { DeviceCatalogueComponent } from './Store/device/device-catalogue/device-catalogue.component';
import { DeviceDetailsComponent } from './Store/device/device-details/device-details.component';
import { PlanHomeComponent } from './Store/plan/plan-home/plan-home.component';
import { PlanComparisonComponent } from './Store/plan/plan-comparison/plan-comparison.component';
import { LifestylePlansComponent } from './Store/plan/lifestyle-plans/lifestyle-plans.component';
import { CartHomeComponent } from './Store/cart/cart-home/cart-home.component';
import { CheckoutHomeComponent } from './Store/checkout/checkout-home/checkout-home.component';
import { OrderSummaryComponent } from './Store/checkout/order-summary/order-summary.component';
import { ShippingAddressComponent } from './Store/checkout/shipping-address/shipping-address.component';
import { MoonPlanWithPassDetailsComponent } from './Store/plan/moon-plan-with-pass-details/moon-plan-with-pass-details.component';
import { MoonPlanWithDeviceDetailsComponent } from './Store/plan/moon-plan-with-device-details/moon-plan-with-device-details.component';

import { LoginHomeComponent } from './Store/login/login-home/login-home.component';
import { AgentLoginComponent } from './Store/login/agent-login/agent-login.component';
import { AgentLandingComponent } from './Store/login/agent-landing/agent-landing.component';
import { AgentSearchComponent } from './Store/login/agent-search/agent-search.component';
import { ViewOrderHomeComponent } from "./Store/checkout/vieworder/view-order-home.component";

// MNP

import { SwitchToCelcomComponent } from './Store/mnp/switch-to-celcom/switch-to-celcom.component';


// Store widgets.
import { CatalogueBannerMegaComponent } from './Widget/StoreWidgets/catalogue-banner-mega/catalogue-banner-mega.component';
import { CatalogueComponent } from './Widget/StoreWidgets/catalogue/catalogue.component';
import { PlanTableComparisonComponent } from './Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.component';
import { PlanDeviceComparisonComponent } from './Widget/StoreWidgets/plan-device-comparison/plan-device-comparison.component';
import { HeroBannerClickableComponent } from './Widget/StoreWidgets/HeroBannerClickable/hero-banner-clickable.component';
import { DeviceDetailsNumberComponent } from "./Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.component";
import { DeviceDetailsStorageComponent } from "./Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.component";
import { DeviceDetailsSummaryComponent } from "./Widget/StoreWidgets/device-details/device-details-summary-section/device-details-summary-section.component";
import { DeviceDetailsPlanComponent } from "./Widget/StoreWidgets/device-details/device-details-plans-section/device-details-plans-section.component";
import { DeviceDisclaimerComponent } from "./Widget/StoreWidgets/device-details/device-detail-disclaimer/device-detail-disclaimer.component";
import { DeviceSliderComponent } from "./Store/device/device-slider/device-slider.component";

import { ViewOrderPaymentComponent } from "./Store/checkout/view-order-payment/view-order-payment.component";
import { DeviceTermsConditionsComponent } from "./Widget/StoreWidgets/device-details/device-details-Terms-Conditions/device-details-Terms-Conditions.component";
import { DeviceMoreDetailsComponent } from "./Widget/StoreWidgets/device-details/device-details-more-details/device-details-more-details.component";
import { LoginOtpComponent } from './Store/login/login-otp/login-otp.component';

import { OrderHistoryComponent } from './Store/account/order-history/order-history.component';
import { TrackOrderComponent } from './Store/account/track-order/track-order.component';
import { ViewProfileComponent } from './Store/account/view-profile/view-profile.component';
import { CompareHeroBannerComponent } from './Widget/StoreWidgets/compare-hero-banner/compare-hero-banner.component';
import { CheckoutHeroBannerComponent } from './Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component';
import { PlanPurchaseComponent } from './Store/plan/plan-purchase/plan-purchase.component';
// Guest Checkout
import { GuestCheckoutService } from './Store/guest-checkout/services/guest-checkout.service';
import { ChooseYourWayComponent } from './Store/guest-checkout/choose-your-way/choose-your-way.component';
import { ItemAddedSuccessComponent } from './Store/guest-checkout/item-added-success/item-added-success.component';
import { GuestLoginComponent } from './Store/guest-checkout/guest-login/guest-login.component';
import { PersonalDetailsComponent } from './Store/guest-checkout/personal-details/personal-details.component';
import { NotificationBarComponent } from './Store/widget/notification-bar/notification-bar.component';
import { SessionTimeOutPopupComponent } from './Store/widget/session-timeout-popup/session-timeout-popup';
import { NotificationErrorComponent } from './Store/widget/notification-error/notification-error.component';
import { OrderTrackingComponent } from './Store/order-tracking/order-tracking.component';
// MNP
import { MnpService } from './Store/mnp/services/mnp.service';
import { CheckMnpStatusComponent } from './Store/mnp/check-mnp-status/check-mnp-status.component';
// analytic services
import { AnalyticsService } from './Service/analytic.service';
import { EStoreAnalysticsService } from './Service/store.analytic.service';
import { SeoService } from './Service/seo.service';
import { RendererService } from './Service/renderer.service';
import { MinifiedPageLoaderComponent } from './Store/widget/minified-page-loader/minified-page-loader.component';
import { AgeEligibilityPopupComponent } from './Store/widget/age-eligibility-popup/ageeligiblity.popup.component';
import { DecimalPipe } from '@angular/common';
import { StickySummaryComponent } from './Widget/StoreWidgets/device-details/sticky-summary/sticky-summary.component';
import { StickySummaryService } from './Store/shared/services/sticky-summary.service';
import { SupplementaryLinesComponent } from './Store/widget/supplementary-lines/supplementary-lines.component';
import { MoreSupplementaryPopupComponent } from './Store/widget/more-supplementary-popup/more-supplementary-popup.component';
// tslint:disable-next-line:max-line-length
import { LosingSupplementaryLinePopupComponent } from './Store/widget/losing-supplementary-line-popup/losing-supplementary-line-popup.component';
import { CobpComponent } from './Store/cobp/cobp.component';
import { MostPopularComponent } from './Store/dumb-components/most-popular/most-popular.component';
import { PreOrderComponent } from './Store/dumb-components/pre-order/pre-order.component';
import { NoteSectionComponent } from './Store/dumb-components/note-section/note-section.component';
import { MidnightDeliveryInfoComponent } from './Store/dumb-components/midnight-delivery-info/midnight-delivery-info.component';
import { SelectDeliveryMethodComponent } from './Store/checkout/delivery-method/select-delivery-method/select-delivery-method.component';
import { MignightDeliveryComponent } from './Store/checkout/delivery-method/mignight-delivery/mignight-delivery.component';
import { StandardDeliveryComponent } from './Store/checkout/delivery-method/standard-delivery/standard-delivery.component';
import { ChooseAddressComponent } from './Store/checkout/delivery-method/choose-address/choose-address.component';
import { EmailRetrievalComponent } from './Store/checkout/email-retrieval/email-retrieval.component';
import { DeviceFlowComponent } from './Store/device/device-flow/device-flow.component';
import { DeviceSupplementaryLinesComponent } from './Store/widget/device-supplementary-lines/device-supplementary-lines.component';
import { BbDeviceDetailsComponent } from './Store/broadband/bb-device-details/bb-device-details.component';
import { BbPlanSectionComponent } from './Store/broadband/bb-plan-section/bb-plan-section.component';
import { BbSummarySectionComponent } from './Store/broadband/bb-summary-section/bb-summary-section.component';
import { BbStickySummaryComponent } from './Store/broadband/bb-sticky-summary/bb-sticky-summary.component';
import { BbTypeofPurchaseComponent } from './Store/broadband/bb-typeof-purchase/bb-typeof-purchase.component';
import { BbDeviceNamePriceComponent } from './Widget/StoreWidgets/bb-device-name-price/bb-device-name-price.component';
import { BbDeviceColorComponent } from './Widget/StoreWidgets/bb-device-color/bb-device-color.component';
import { BbDeviceStockCheckComponent } from './Widget/StoreWidgets/bb-device-stock-check/bb-device-stock-check.component';
import { BroadbandService } from './Service/broadband.service';
import { AgentHeaderComponent } from './Header/agent-header/agent-header.component';
import { ProductService } from './Service/product.service';
import { AuthGuardService } from './Service/auth-guard.service';
import { AgentOrderHistoryComponent } from './Store/account/agent-order-history/agent-order-history.component';
import { RouterService } from './Service/router.service';
import { MoonColorStorageComponent } from './Store/plan/moon-color-storage/moon-color-storage.component';
import { MoonSummarySectionComponent } from './Store/plan/moon-summary-section/moon-summary-section.component';
import { MoonStickySummarySectionComponent } from './Store/plan/moon-sticky-summary-section/moon-sticky-summary-section.component';
import { VoucherComponent } from './Store/widget/voucher/voucher.component';
import { PlanPurchaseService } from './Store/plan/plan-purchase/plan-purchase.service';
import { NricInputComponent } from './Store/widget/nric-input/nric-input.component';
import { DeviceRoiComponent } from './Store/device/device-roi/device-roi.component';
import { DeviceDetailsNumberService } from "./Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service";
import { MsisdnInputComponent } from './Store/widget/msisdn-input/msisdn-input.component';
import { OtpInputComponent } from './Store/widget/otp-input/otp-input.component';
import { EsimComponent } from './Store/esim/esim/esim.component';
import { EsimLoginComponent } from './Store/esim/esim-login/esim-login.component';
import { EsimTypeDetailsComponent } from './Store/esim/esim-type-details/esim-type-details.component';
import { EsimEmailConfirmationComponent } from './Store/esim/esim-email-confirmation/esim-email-confirmation.component';
import { EsimSummarySectionComponent } from './Store/esim/esim-summary-section/esim-summary-section.component';
import { EsimStickySummaryComponent } from './Store/esim/esim-sticky-summary/esim-sticky-summary.component';
import { NgxSiemaModule } from 'ngx-siema';
import { CsagentCampaignDetailsComponent } from './Store/csagent-campaign-details/csagent-campaign-details.component';
import { DeviceDetailsService } from './Store/device/device-details/device-details.service';
import { EmailVerificationComponent } from './Store/email-verification/email-verification.component';
import { StarSizeUpComponent } from './Store/project-star/star-size-up/star-size-up.component';
import { AppleWatchComponent } from './Store/apple-watch/apple-watch.component';
import { EnterpriseRegistrationComponent } from './Store/enterprise/registration/registration.component';
import { EnterpriseLoginComponent } from './Store/enterprise/login/login.component';
import { EnterpriseLandingComponent } from './Store/enterprise/landing/landing.component';
import { EnterpriseService } from './Store/enterprise/enterprise.service';
import { MultistepsComponent } from './Store/multisteps/multisteps.component';
import { AutoFocusDirective } from './Utility/directives/auto-focus.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
import { SideSummaryContainerComponent } from './Widget/side-summary/side-summary-container/side-summary-container.component';
import { SideSummaryComponent } from './Widget/side-summary/side-summary.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { httpInterceptorProviders } from './interceptors';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { enableAkitaProdMode } from '@datorama/akita';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { PersonalInformationComponent } from './Store/form/personal-information/personal-information.component';
import { PrepaidComponent } from './Store/plan/prepaid/prepaid.component';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { HttpModule } from '@angular/http';
import { EditDetailsWrapperComponent } from './Store/checkout/edit-details-wrapper/edit-details-wrapper.component';
import { SharedModule } from "./shared/shared-module.module";
import { NewLandingPageComponent } from './pages/new-landing-page/new-landing-page.component';
import { HeaderModule } from 'celcom-common-angular-lib-estore';
import { ErrorPageComponent} from './pages/error-page/error-page.component'
import { PrepaidNricCheckComponent } from './Store/widget/prepaid-nric-check/prepaid-nric-check.component'
import { PostpaidComponent } from './pages/postpaid/postpaid.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { DeviceDetailPageComponent } from './pages/device-detail-page/device-detail-page.component';
import { FamilyLinePlanComponent } from './pages/family-line-plan/family-line-plan.component';
import { IconModule } from './shared/icon.module';
import { CampaignPortalComponent } from './pages/campaign-portal/campaign-portal.component';
import { GameEligibilityCheckComponent } from './pages/game-eligibility-check/game-eligibility-check.component';
import { FirstBluePlanComponent } from './pages/first-blue-plan/first-blue-plan.component';
import { MnpSimVerificationComponent } from './pages/mnp-sim-verification/mnp-sim-verification.component';
import { EkycStepsComponent } from './Store/eKyc/ekyc-steps/ekyc-steps.component';
import { EKycComponent } from './Store/eKyc/e-kyc/e-kyc.component';
import { NgxKjuaModule } from 'ngx-kjua';
import { EkycDetailsComponent } from './Store/eKyc/ekyc-details/ekyc-details.component';
import { EkycWrapperComponent } from './Store/eKyc/ekyc-wrapper/ekyc-wrapper.component';
import { ImageCaptureComponent } from './Store/eKyc/image-capture/image-capture.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    OldSubNavigationComponent,
    ImportantNoticeComponent,
    FooterComponent,
    AgentFooterComponent,
    SocialMediaComponent,
    FooterDownloadComponent,
    HeroBannerCarouselComponent,
    HeroBannerImageClickableComponent,
    TableComparisonComponent,
    BreadcrumbComponent,
    DetailBannerTextLeftComponent,
    ImgaeCardOverlayComponent,
    ImageCard3Component,
    SearchHeaderComponent,
    SearchBarComponent,
    SearchFindingsComponent,
    TitleBoxLinkComponent,
    AppWidgetDirective,
    NotificationComponent,
    FeedbackComponent,
    TabComponent,
    TabsNewComponent,
    DeviceCatalogueComponent,
    CatalogueBannerMegaComponent,
    CatalogueComponent,
    DeviceDetailsComponent,
    PlanHomeComponent,
    PlanComparisonComponent,
    LifestylePlansComponent,
    PlanTableComparisonComponent,
    PlanDeviceComparisonComponent,
    CartHomeComponent,
    HeroBannerClickableComponent,
    CheckoutHomeComponent,
    OrderSummaryComponent,
    ShippingAddressComponent,
    DeviceDetailsNumberComponent,
    DeviceDetailsStorageComponent,
    DeviceDetailsPlanComponent,
    DeviceDetailsSummaryComponent,
    DeviceMoreDetailsComponent,
    DeviceTermsConditionsComponent,
    DeviceDisclaimerComponent,
    LoginHomeComponent,
    AgentLoginComponent,
    AgentLandingComponent,
    AgentSearchComponent,
    ViewOrderPaymentComponent,
    ViewOrderHomeComponent,
    LoginOtpComponent,
    DeviceSliderComponent,
    OrderHistoryComponent,
    TrackOrderComponent,
    ViewProfileComponent,
    CompareHeroBannerComponent,
    CheckoutHeroBannerComponent,
    ViewProfileComponent,
    PlanPurchaseComponent,
    ChooseYourWayComponent,
    ItemAddedSuccessComponent,
    GuestLoginComponent,
    PersonalDetailsComponent,
    NotificationBarComponent,
    SessionTimeOutPopupComponent,
    NotificationErrorComponent,
    SwitchToCelcomComponent,
    CheckMnpStatusComponent,
    MinifiedPageLoaderComponent,
    AgeEligibilityPopupComponent,
    StickySummaryComponent,
    OrderTrackingComponent,
    SupplementaryLinesComponent,
    MoreSupplementaryPopupComponent,
    LosingSupplementaryLinePopupComponent,
    CobpComponent,
    MostPopularComponent,
    PreOrderComponent,
    NoteSectionComponent,
    MidnightDeliveryInfoComponent,
    SelectDeliveryMethodComponent,
    MignightDeliveryComponent,
    StandardDeliveryComponent,
    ChooseAddressComponent,
    EmailRetrievalComponent,
    DeviceFlowComponent,
    DeviceSupplementaryLinesComponent,
    BbDeviceDetailsComponent,
    BbPlanSectionComponent,
    BbSummarySectionComponent,
    BbStickySummaryComponent,
    BbTypeofPurchaseComponent,
    BbDeviceNamePriceComponent,
    BbDeviceColorComponent,
    BbDeviceStockCheckComponent,
    AgentHeaderComponent,
    AgentOrderHistoryComponent,
    MoonColorStorageComponent,
    MoonPlanWithPassDetailsComponent,
    MoonPlanWithDeviceDetailsComponent,
    MoonSummarySectionComponent,
    MoonStickySummarySectionComponent,
    VoucherComponent,
    NricInputComponent,
    DeviceRoiComponent,
    MsisdnInputComponent,
    OtpInputComponent,
    EsimComponent,
    EsimLoginComponent,
    StarSizeUpComponent,
    EsimTypeDetailsComponent,
    EsimEmailConfirmationComponent,
    EsimSummarySectionComponent,
    EsimStickySummaryComponent,
    CsagentCampaignDetailsComponent,
    EmailVerificationComponent,
    AppleWatchComponent,
    EnterpriseRegistrationComponent,
    EnterpriseLoginComponent,
    EnterpriseLandingComponent,
    MultistepsComponent,
    AutoFocusDirective,
    SideSummaryContainerComponent,
    SideSummaryComponent,
    PersonalInformationComponent,
    PrepaidComponent,
    EditDetailsWrapperComponent,
    NewLandingPageComponent,
    PostpaidComponent,
    ErrorPageComponent,
    PrepaidNricCheckComponent,
    DeviceDetailPageComponent,
    ErrorPageComponent,
    FamilyLinePlanComponent,
    CampaignPortalComponent,
    GameEligibilityCheckComponent,
    FirstBluePlanComponent,
    MnpSimVerificationComponent,
    FirstBluePlanComponent,
    EkycStepsComponent,
    EKycComponent,
    EkycDetailsComponent,
    EkycWrapperComponent,
    ImageCaptureComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    NguCarouselModule,
    YouTubePlayerModule,
    RouterModule.forRoot(router, {
    initialNavigation: 'enabled'
}),
    NgxSiemaModule.forRoot(),
    ReactiveFormsModule,
    PerfectScrollbarModule,
    NgxKjuaModule,
    environment.production ? [] : AkitaNgDevtools.forRoot({
      sortAlphabetically: true,
      name: environment?.eStoreFrontEndUrl || 'EStore',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.isPWAEnabled }),
    DeferLoadModule,
    SharedModule,
    HeaderModule,
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    IconModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [
    FooterComponent,
    AgentFooterComponent,
    ImportantNoticeComponent,
    HeroBannerCarouselComponent,
    HeroBannerImageClickableComponent,
    DetailBannerTextLeftComponent,
    TableComparisonComponent,
    ViewOrderHomeComponent,
    ViewOrderPaymentComponent,
    OrderHistoryComponent,
    TrackOrderComponent,
    ViewProfileComponent,
    StickySummaryComponent
  ],
  providers: [AppMockService, RoutesService, Broadcaster, NotificationPopupEvent, CookieService, DeviceDataService,
    GuestCheckoutService, MnpService, GetParametersService, EStoreAnalysticsService, SeoService,
     RendererService, DecimalPipe, StickySummaryService, BroadbandService, ProductService, AuthGuardService, RouterService,
     PlanPurchaseService, DeviceDetailsNumberService, DeviceDetailsService, EnterpriseService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private MY_ROUTE = "MY_ROUTE";
  private MyAppRoutes: Array<any>;

  constructor(private routesservice: RoutesService, private _router: Router, private RouterService: RouterService) {
    this.MyAppRoutes = [];
    // this.RemoveLocalStorage();
    // this.FindAppRoutes();
    if (environment.production) {
      enableAkitaProdMode();
    }
  }
  private FindAppRoutes() {
    this.routesservice.Find().subscribe((data: any) => {
      this.ManagedynamicRoute(data);
    });
  }

  private ManagedynamicRoute(routeData) {
    routeData.forEach((item: any) => {
      item.alias = item.alias.substr(1);
      this.MyAppRoutes.push({
        path: item.alias,
        component: HomeComponent,
        data: { "EndPoint": item.end_point }
      });
      this.AddRouteToLocalStorage(routeData);
    });
    this._router.resetConfig(this.MyAppRoutes);

  }
  private RemoveLocalStorage() {
    // if exist..
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.MY_ROUTE);
    }
  }
  private AddRouteToLocalStorage(data) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.MY_ROUTE, JSON.stringify(data));
    }
  }
}

// Angular Universal...
// https://www.youtube.com/watch?v=lncsmB5yfzE
// cousetro.com
// For Dyanmic Routing...
// https://github.com/angular/angular-cli/issues/4234
