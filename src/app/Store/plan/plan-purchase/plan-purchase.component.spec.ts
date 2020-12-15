// tslint:disable
import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive, Renderer2} from '@angular/core';
import {PlanPurchaseComponent} from './plan-purchase.component';
import {PlanPurchaseService} from './plan-purchase.service';
import {ProductService} from './../../../Service/product.service';
import {DeviceDataService} from '../../../Service/devicedata.service';
import {Router, ActivatedRoute, ActivatedRouteSnapshot, UrlSegment, Params, Data, Route} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {RedirectionService} from '../../../Service/redirection.service';
import {DOCUMENT} from '@angular/common';
import {EStoreAnalysticsService} from '../../../Service/store.analytic.service';
import {PlanTableComparisionService} from '../../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.service';
import {HomeService} from '../../../Service/home.service';
import {GetParametersService} from '../../../Service/getParamaters.service';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../../Service/user.service';
import { AppService } from "../../../Service/app.service";
import { AppMockService } from '../../../Service/appmock.service';
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { MoonPlanWithPassDetailsComponent } from '../moon-plan-with-pass-details/moon-plan-with-pass-details.component';
import { MoonPlanWithDeviceDetailsComponent } from '../moon-plan-with-device-details/moon-plan-with-device-details.component';
import { MoonColorStorageComponent } from '../moon-color-storage/moon-color-storage.component';
import { MoonStickySummarySectionComponent } from '../moon-sticky-summary-section/moon-sticky-summary-section.component';
import { MoonSummarySectionComponent } from '../moon-summary-section/moon-summary-section.component';
import { LifestylePlansComponent } from '../lifestyle-plans/lifestyle-plans.component';
import { DeviceDetailsNumberComponent } from '../../../Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.component';
import { StickySummaryComponent } from '../../../Widget/StoreWidgets/device-details/sticky-summary/sticky-summary.component';
import { DeviceDetailsSummaryComponent } from '../../../Widget/StoreWidgets/device-details/device-details-summary-section/device-details-summary-section.component';
import { FooterComponent } from '../../../Footer/footer.component';
import { AgentFooterComponent } from '../../../Footer/agent-footer/agent-footer.component';
import { NotificationErrorComponent } from '../../widget/notification-error/notification-error.component';
import { DetailBannerTextLeftComponent } from '../../../Widget/DetailBannerTextLeft/DetailBannerTextLeft.component';
import { LosingSupplementaryLinePopupComponent } from '../../widget/losing-supplementary-line-popup/losing-supplementary-line-popup.component';
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { ChooseYourWayComponent } from '../../guest-checkout/choose-your-way/choose-your-way.component';
import { DeviceDisclaimerComponent } from '../../../Widget/StoreWidgets/device-details/device-detail-disclaimer/device-detail-disclaimer.component';
import { NoteSectionComponent } from '../../dumb-components/note-section/note-section.component';
import { SupplementaryLinesComponent } from '../../widget/supplementary-lines/supplementary-lines.component';
import { CobpComponent } from '../../cobp/cobp.component';
import { SwitchToCelcomComponent } from '../../mnp/switch-to-celcom/switch-to-celcom.component';
import { DeviceSupplementaryLinesComponent } from '../../widget/device-supplementary-lines/device-supplementary-lines.component';
import { FormsModule } from '@angular/forms';
import { FooterDownloadComponent } from '../../../Footer/Download/download.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { SocialMediaComponent } from '../../../Footer/SocialMedia/socialmedia.component';
import { SocialMediaLinks } from '../../../Footer/SocialMedia/socialmedialinks.service';
import { MoreSupplementaryPopupComponent } from '../../widget/more-supplementary-popup/more-supplementary-popup.component';
import { NotificationBarComponent } from '../../widget/notification-bar/notification-bar.component';
import { NricInputComponent } from "../../../Store/widget/nric-input/nric-input.component";
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { MsisdnInputComponent } from '../../widget/msisdn-input/msisdn-input.component';
import { OtpInputComponent } from '../../widget/otp-input/otp-input.component';
import { SearchHighlight } from "../../../shared/pipes/search-highlight.pipe";
import { Observable } from 'rxjs/Observable';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs/observable/of';
import { BroadbandService } from '../../../Service/broadband.service';
import { StarSizeUpComponent } from '../../project-star/star-size-up/star-size-up.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

class MockRouter {
  routerState = {
    snapshot: {
        url: '#home'
    }
}
    snapshot(url: string) {
        return url;
    }
}
let planResp: any = [{"tabName":"FIRST™ Plans","tabTitle":null,"tabSubtitle":null,"tabData":{"name":"Celcom Mobile Platinum Plus","PlanName":"Celcom Mobile Platinum Plus","sku":"FPP","url_key":"first-platinum-plus","order_plan_bundle":"PB11860","ngn_part_number":"PB11900","order_service_bundle":"RTP0010","order_plan_component":[{"component_name":"Executive Plan VAS without GPRS_10784","component_part_no":"CPT05370","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"New Package for IDD Activation","component_part_no":"CPT07020","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"First Unlimited","component_part_no":"CPT12290","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Default International Roaming Voice/SMS","component_part_no":"CPT13540","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"FiRST Platinum Plus CBS Commitment Fee","component_part_no":"CPT16940","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Free Chat 2.0","component_part_no":"MI01790","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Advance Payment CBS RM188","component_part_no":"OTC08850","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"SIM Card","component_part_no":"SM00010","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Blank SIM Starter Pack","component_part_no":"SP00210","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Stamp Fee_92382","component_part_no":"OTC00350","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Printed Bill for Voice","component_part_no":"BDMR0080","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"First Platinum Plus Business 2.0 RET","component_part_no":"PB10570","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum Plus CBS Plan","cbs_part_number":"PR03490","isvas":"0","vasname":null,"vasvalue":null}],"PlanMonthlyPay":"188.0000","OneTimePayment":null,"contract":"24 months contract","plan_title":"First™ Platinum Plus","plan_subtitle":"Happiness unlimited. Sign up for 12 months and get extra privileges.","BackgroundColor":"is-bg-color-black","upfront_installment":null,"IndicatorClass":"is-level-platinum-plus","ProductText":"Platinum Plus","KeyFiguresText":"100 GB","KeyText":"RM 188","BuynowLink":"/plans/first-platinum-plus","BuynowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","upper_age_limit":null,"lower_age_limit":"18","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg","is_xpax":false,"MobileDescription":null,"product_type":"Service","footNote":null,"TableInfo":[],"image_url":"/media/catalog/product/w/f/wf-benji-100gb.png","supplementary_data":[{"name":"Celcom Mobile Family™","max_line":"5","part_number":"PB12540","price":"48.0000"},{"name":"Celcom FIRST™ 1+5","max_line":"5","part_number":"PB11440","price":"30.0000"}],"addons":[],"is_campaign_mviva":null,"campaign_mviva":null,"campaign_mviva_invalid":null,"analytics_key_addtocart":{"fb_add_cart_id":"CelcomPlatinumPlus_AddToCart","google_add_cart_id":"zme7CNP4iZcBENjpoqMD","twitter_add_cart_id":"nzukw","fb_learn_more_id":"CelcomPlatinumPlus_LearnMore","google_learn_more_id":"1TceCNWBlZcBENjpoqMD","twitter_learn_more_id":"nzujz","fb_buy_now_id":"CelcomPlatinumPlus_BuyNow","google_buy_now_id":"gWhBCMTrnJcBENjpoqMD","twitter_buy_now_id":"nzuki"},"telco_day":{"status":false,"hat_text":"Telco day offer! Enjoy a rebate of RM10","message":"Enjoy a rebate of RM10 on your purchase","allowed_types":["NEW_NUMBER","MnpNum"],"not_allowed_types":["EXISTING_NUMBER"],"eligible_message":"Rebate is only eligible for New registration, Switch to Celcom","not_eligible_message":"Rebate is not eligible for Upgrade Plan"},"is_premium_plan":false,"bill_type":0},"type_purchse":{"dealer":{"newline":false,"cobp":true,"mnp":false}}}];
let planListResp: any = [{"tabname":"FIRST™ Plans","tabtitle":"Celcom First™ Plans","tabsubtitle":"Sign up for 12 months and get extra privileges","is_xpax":false,"tabdata":{"Items":[{"name":"First™ Basic 38","sku":"FB38","url_key":"first-basic-38","plan_part_number":"PB08050","ngn_part_number":"PB08050","BackgroundColor":"is-bg-color-black","IndicatorClass":"is-level-basic","ProductText":"First Basic 38","KeyFiguresText":"5 GB","KeyText":"RM 38","PlanMonthlyPay":"38.0000","OneTimePayment":"38.0000","TotalPay":"38.0000","BuynowLink":"/plans/first-basic-38","BuynowText":"Buy now","knowMoreLink":"/store/plans/first-basic-38","knowMoreText":"Learn more","lowerAgeLimit":"18","UpperAgeLimit":null,"MobileDescription":null,"contract":"24 months contract","image_url":"/media/catalog/product","telco_day":{"status":false,"hat_text":null,"message":null,"allowed_types":["NEW_NUMBER","MnpNum","EXISTING_NUMBER"],"not_allowed_types":[],"eligible_message":"Rebate is only eligible for New registration, Switch to Celcom, Upgrade Plan","not_eligible_message":"Rebate is not eligible for "},"is_premium_plan":false,"analytics_key_addtocart":{"fb_add_cart_id":null,"google_add_cart_id":null,"twitter_add_cart_id":null,"fb_learn_more_id":null,"google_learn_more_id":null,"twitter_learn_more_id":null,"fb_buy_now_id":null,"google_buy_now_id":null,"twitter_buy_now_id":null},"bill_type":0,"PlanName":"First™ Basic 38","PlanSku":"FB38","IsMnp":false,"PlanOnlyComponentToShow":true,"is_xpax":false,"addons":[],"TableInfo":[]},{"name":"First™ Gold","sku":"FG","url_key":"first-gold","plan_part_number":"PB12090","ngn_part_number":"PB09880","BackgroundColor":"is-bg-color-black","IndicatorClass":"is-level-gold","ProductText":"Gold","KeyFiguresText":"20 GB","KeyText":"RM 80","PlanMonthlyPay":"80.0000","OneTimePayment":"80.0000","TotalPay":"80.0000","BuynowLink":"/plans/first-gold","BuynowText":"Buy now","knowMoreLink":"/plans/first-gold","knowMoreText":"Learn more","lowerAgeLimit":"18","UpperAgeLimit":null,"MobileDescription":null,"contract":"24 months contract","image_url":"/media/catalog/product/w/f/wf-jamie-20gb.png","telco_day":{"status":false,"hat_text":"Special Offer. Enjoy RM 10 rebate on your device ","message":"Congratulations! you have just earned a rebate of Rm 10 on your purchase.\r\n\r\n\r\n","allowed_types":["NEW_NUMBER","MnpNum"],"not_allowed_types":["EXISTING_NUMBER"],"eligible_message":"Rebate is only eligible for New registration, Switch to Celcom","not_eligible_message":"Rebate is not eligible for Upgrade Plan"},"is_premium_plan":false,"analytics_key_addtocart":{"fb_add_cart_id":"CelcomGold_AddToCart","google_add_cart_id":"jVEeCPPqlZcBENjpoqMD","twitter_add_cart_id":"nzukk","fb_learn_more_id":"CelcomGold_LearnMore","google_learn_more_id":"HbTxCPeDiZcBENjpoqMD","twitter_learn_more_id":"nzuk9","fb_buy_now_id":"CelcomGold_BuyNow","google_buy_now_id":"ueEyCMCxiJcBENjpoqMD","twitter_buy_now_id":"nzujy"},"bill_type":1,"PlanName":"First™ Gold","PlanSku":"FG","IsMnp":false,"PlanOnlyComponentToShow":true,"is_xpax":false,"addons":[],"TableInfo":[]},{"name":"First™ Gold Plus","sku":"FGP","url_key":"first-gold-plus","plan_part_number":"PB12070","ngn_part_number":"PB10840","BackgroundColor":"is-bg-color-black","IndicatorClass":"is-level-gold","ProductText":"Gold Plus","KeyFiguresText":"40 GB","KeyText":"RM 98","PlanMonthlyPay":"98.0000","OneTimePayment":"98.0000","TotalPay":"98.0000","BuynowLink":"/plans/first-gold-plus","BuynowText":"Buy now","knowMoreLink":"/store/plans/first-gold-plus","knowMoreText":"Learn more","lowerAgeLimit":"18","UpperAgeLimit":null,"MobileDescription":null,"contract":"24 months contract","image_url":"/media/catalog/product/w/f/wf-gopi-40gb.png","telco_day":{"status":false,"hat_text":null,"message":null,"allowed_types":[],"not_allowed_types":["NEW_NUMBER","MnpNum","EXISTING_NUMBER"],"eligible_message":"Rebate is only eligible for ","not_eligible_message":"Rebate is not eligible for New registration, Switch to Celcom, Upgrade Plan"},"is_premium_plan":false,"analytics_key_addtocart":{"fb_add_cart_id":"CelcomGoldPlus_AddToCart","google_add_cart_id":"MrSzCL30iZcBENjpoqMD","twitter_add_cart_id":"nzukl","fb_learn_more_id":"CelcomGoldPlus_LearnMore","google_learn_more_id":"2zEuCI7OnZcBENjpoqMD","twitter_learn_more_id":"nzuka","fb_buy_now_id":"CelcomGoldPlus_Buy Now","google_buy_now_id":"MVgcCL23iJcBENjpoqMD","twitter_buy_now_id":"nzukb"},"bill_type":0,"PlanName":"First™ Gold Plus","PlanSku":"FGP","IsMnp":false,"PlanOnlyComponentToShow":true,"is_xpax":false,"addons":[],"TableInfo":[]},{"name":"First™ Gold Supreme","sku":"FGS","url_key":"first-gold-supreme","plan_part_number":"PB11830","ngn_part_number":"PB11890","BackgroundColor":"is-bg-color-black","IndicatorClass":"is-level-gold","ProductText":"Gold Supreme","KeyFiguresText":"50 GB","KeyText":"RM 128","PlanMonthlyPay":"128.0000","OneTimePayment":"128.0000","TotalPay":"128.0000","BuynowLink":"/plans/first-gold-supreme","BuynowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","lowerAgeLimit":"18","UpperAgeLimit":null,"MobileDescription":null,"contract":"24 months contract","image_url":"/media/catalog/product/w/f/wf-yan-50gb.png","telco_day":{"status":false,"hat_text":null,"message":null,"allowed_types":[],"not_allowed_types":["NEW_NUMBER","MnpNum","EXISTING_NUMBER"],"eligible_message":"Rebate is only eligible for ","not_eligible_message":"Rebate is not eligible for New registration, Switch to Celcom, Upgrade Plan"},"is_premium_plan":false,"analytics_key_addtocart":{"fb_add_cart_id":"CelcomGoldSupreme_AddToCart","google_add_cart_id":"q73BCN_4iZcBENjpoqMD","twitter_add_cart_id":"nzuky","fb_learn_more_id":"CelcomGoldSupreme_LearnMore","google_learn_more_id":"gsuUCP2DiZcBENjpoqMD","twitter_learn_more_id":"nzukv","fb_buy_now_id":"CelcomGoldSupreme_BuyNow","google_buy_now_id":"hKvwCJSilJcBENjpoqMD","twitter_buy_now_id":"nzuk7"},"bill_type":1,"PlanName":"First™ Gold Supreme","PlanSku":"FGS","IsMnp":false,"PlanOnlyComponentToShow":true,"is_xpax":false,"addons":[],"TableInfo":[]},{"name":"First™ Platinum","sku":"FP","url_key":"first-platinum","plan_part_number":"PB11820","ngn_part_number":"PB09890","BackgroundColor":"is-bg-color-black","IndicatorClass":"is-level-platinum","ProductText":"Platinum","KeyFiguresText":"60 GB","KeyText":"RM 148","PlanMonthlyPay":"148.0000","OneTimePayment":"148.0000","TotalPay":"148.0000","BuynowLink":"/plans/first-platinum","BuynowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","lowerAgeLimit":"18","UpperAgeLimit":null,"MobileDescription":null,"contract":"24 months contract","image_url":"/media/catalog/product/w/f/wf-ju-60gb.png","telco_day":{"status":false,"hat_text":"Hi TQA team have a good day","message":"Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!","allowed_types":["NEW_NUMBER"],"not_allowed_types":["MnpNum","EXISTING_NUMBER"],"eligible_message":"Rebate is only eligible for New registration","not_eligible_message":"Rebate is not eligible for Switch to Celcom, Upgrade Plan"},"is_premium_plan":false,"analytics_key_addtocart":{"fb_add_cart_id":"CelcomPlatinum_AddToCart","google_add_cart_id":"kNaXCND4iZcBENjpoqMD","twitter_add_cart_id":"nzukn","fb_learn_more_id":"CelcomPlatinum_LearnMore","google_learn_more_id":"WuOWCOHQnZcBENjpoqMD","twitter_learn_more_id":"nzuko","fb_buy_now_id":"CelcomPlatinum_BuyNow","google_buy_now_id":"b5OkCMynlJcBENjpoqMD","twitter_buy_now_id":"nzuk8"},"bill_type":0,"PlanName":"First™ Platinum","PlanSku":"FP","IsMnp":false,"PlanOnlyComponentToShow":true,"is_xpax":false,"addons":[],"TableInfo":[]},{"name":"Celcom Mobile Platinum Plus","sku":"FPP","url_key":"first-platinum-plus","plan_part_number":"PB11860","ngn_part_number":"PB11900","BackgroundColor":"is-bg-color-black","IndicatorClass":"is-level-platinum-plus","ProductText":"Platinum Plus","KeyFiguresText":"100 GB","KeyText":"RM 188","PlanMonthlyPay":"188.0000","OneTimePayment":"188.0000","TotalPay":"188.0000","BuynowLink":"/plans/first-platinum-plus","BuynowText":"Buy now","knowMoreLink":"/store/plans/first-platinum-plus","knowMoreText":"Learn more","lowerAgeLimit":"18","UpperAgeLimit":null,"MobileDescription":null,"contract":"24 months contract","image_url":"/media/catalog/product/w/f/wf-benji-100gb.png","telco_day":{"status":false,"hat_text":"Telco day offer! Enjoy a rebate of RM10","message":"Enjoy a rebate of RM10 on your purchase","allowed_types":["NEW_NUMBER","MnpNum"],"not_allowed_types":["EXISTING_NUMBER"],"eligible_message":"Rebate is only eligible for New registration, Switch to Celcom","not_eligible_message":"Rebate is not eligible for Upgrade Plan"},"is_premium_plan":false,"analytics_key_addtocart":{"fb_add_cart_id":"CelcomPlatinumPlus_AddToCart","google_add_cart_id":"zme7CNP4iZcBENjpoqMD","twitter_add_cart_id":"nzukw","fb_learn_more_id":"CelcomPlatinumPlus_LearnMore","google_learn_more_id":"1TceCNWBlZcBENjpoqMD","twitter_learn_more_id":"nzujz","fb_buy_now_id":"CelcomPlatinumPlus_BuyNow","google_buy_now_id":"gWhBCMTrnJcBENjpoqMD","twitter_buy_now_id":"nzuki"},"bill_type":0,"PlanName":"Celcom Mobile Platinum Plus","PlanSku":"FPP","IsMnp":false,"PlanOnlyComponentToShow":true,"is_xpax":false,"addons":[],"TableInfo":[]},{"name":"Kardashian","sku":"kardashian","url_key":"kardashian","plan_part_number":"PB13002","ngn_part_number":null,"BackgroundColor":"is-bg-color-black","IndicatorClass":"is-level-gold","ProductText":"Kardashian","KeyFiguresText":"20 GB","KeyText":"RM 599","PlanMonthlyPay":"599.0000","OneTimePayment":"599.0000","TotalPay":"599.0000","BuynowLink":"/plans/kardashian","BuynowText":"Buy now","knowMoreLink":"/store/plans/kardashian","knowMoreText":"Learn more","lowerAgeLimit":"18","UpperAgeLimit":"100","MobileDescription":null,"contract":"24 months contract","image_url":"/media/catalog/product/w/f/wf-gopi-40gb_1.png","telco_day":{"status":false,"hat_text":null,"message":null,"allowed_types":["NEW_NUMBER","MnpNum","EXISTING_NUMBER"],"not_allowed_types":[],"eligible_message":"Rebate is only eligible for New registration, Switch to Celcom, Upgrade Plan","not_eligible_message":"Rebate is not eligible for "},"is_premium_plan":true,"analytics_key_addtocart":{"fb_add_cart_id":null,"google_add_cart_id":null,"twitter_add_cart_id":null,"fb_learn_more_id":null,"google_learn_more_id":null,"twitter_learn_more_id":null,"fb_buy_now_id":null,"google_buy_now_id":null,"twitter_buy_now_id":null},"bill_type":2,"is_premium_plan_message":"Note: Should you opt for plan downgrade, switch from Celcom network or terminate within 24 months upon opting for this Preferred number, there will be a RM500 processing fee.","PlanName":"Kardashian","PlanSku":"kardashian","IsMnp":false,"PlanOnlyComponentToShow":true,"is_xpax":false,"addons":[],"TableInfo":[]}],"StatusMessage":"SUCCESS","Status":"200"}},{"tabname":"Xpax™ Plans","tabtitle":"Triple quota for more #LagiAwesome moments","tabsubtitle":"Get three times the quota on Weekly and Monthly Internet Plans to do more! Limited time only, subscribe now!","is_xpax":true,"tabdata":{"Items":[{"name":"XPAX 50","sku":"xpax_50","url_key":"xpax-50","plan_part_number":"PB12750","ngn_part_number":"PB12480","BackgroundColor":"is-bg-color-black","IndicatorClass":"is-level-xpax","ProductText":"XPAX 50","KeyFiguresText":"15 GB","KeyText":"RM 50","PlanMonthlyPay":"50.0000","OneTimePayment":"50.0000","TotalPay":"50.0000","BuynowLink":"/plans/xpax-50","BuynowText":"Buy now","knowMoreLink":"/store/plans/xpax-50","knowMoreText":"Learn more","lowerAgeLimit":"18","UpperAgeLimit":"1000","MobileDescription":null,"contract":"24 months contract","image_url":"/media/catalog/product/x/p/xp50.png","telco_day":{"status":false,"hat_text":null,"message":null,"allowed_types":[],"not_allowed_types":["NEW_NUMBER","MnpNum","EXISTING_NUMBER"],"eligible_message":"Rebate is only eligible for ","not_eligible_message":"Rebate is not eligible for New registration, Switch to Celcom, Upgrade Plan"},"is_premium_plan":false,"analytics_key_addtocart":{"fb_add_cart_id":"XpaxPostpaid50_AddToCart","google_add_cart_id":"iqS5CObJiZcBENjpoqMD","twitter_add_cart_id":"nzuk5","fb_learn_more_id":"XpaxPostpaid50_LearnMore","google_learn_more_id":"be5tCMr7nZcBENjpoqMD","twitter_learn_more_id":"nzuk4","fb_buy_now_id":"XpaxPostpaid50_BuyNow","google_buy_now_id":"8k7nCI-xiZcBENjpoqMD","twitter_buy_now_id":"nzuk1"},"bill_type":0,"is_xpax":true,"TableInfo":[]}],"StatusMessage":"SUCCESS","Status":"200"}}];
let ultraResp: any = [{"name":"Celcom Ultra","sku":"xp-lite","url_key":"xp-lite","base_plan":[{"name":"Celcom Ultra","sku":"xp-b-plan","offer":"10GB Internet<br>\r\n10Mbps<br>\r\nUnlimited Calls to All Networks","selected_offer_title":null,"monthly_plan":"20.00","data_limit":"1","order_plan_bundle":"PB12828","segment":null,"upfront_installment":null,"contract":null,"plan_name":"Celcom Ultra","plan_title":"Base Plan","plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"1GB","key_text":"RM20","image_url":"/media/catalog/product/x/p/xp_lite_name-01_5_.png","device_allowed":null,"selected_pass":false}],"pass_plan":[{"name":"Ultra speed","sku":"ultra-speed","offer":"<p>11GB Internet<br />Free 3GB Video Walla&trade;<br />Free* 1 hour Ultra Hour Pass&trade; daily<br /><span style=\"color: #009ADE;\">Free RM20 Grab voucher**</span></p>","selected_offer_title":"(12GB Internet + 3GB Video Walla™)","monthly_plan":"30.00","data_limit":"14","order_plan_bundle":"CPT12831","segment":null,"upfront_installment":null,"contract":"df","plan_name":"XP L Pass","plan_title":null,"plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"14 GB","key_text":"RM 30","image_url":"/media/catalog/product/x/p/xp_lite_name-01_5__2.png","device_allowed":"1","selected_pass":false,"associated_passes":[{"name":"Speed XL","sku":"ultra-speed","offer":"<p>11GB Internet<br />Free 3GB Video Walla&trade;<br />Free* 1 hour Ultra Hour Pass&trade; daily<br /><span style=\"color: #009ADE;\">Free RM20 Grab voucher**</span></p>","selected_offer_title":"(12GB Internet + 3GB Video Walla™)","monthly_plan":"30.00","data_limit":"14","order_plan_bundle":"CPT12831","segment":null,"upfront_installment":null,"contract":"df","plan_name":"XP L Pass","plan_title":null,"plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"14 GB","key_text":"RM 30","image_url":"/media/catalog/product/x/p/xp_lite_name-01_5__2.png","device_allowed":"1","selected_pass":false},{"name":"Speed L","sku":"ultra-speed","offer":"<p>11GB Internet<br />Free 3GB Video Walla&trade;<br />Free* 1 hour Ultra Hour Pass&trade; daily<br /><span style=\"color: #009ADE;\">Free RM20 Grab voucher**</span></p>","selected_offer_title":"(12GB Internet + 3GB Video Walla™)","monthly_plan":"30.00","data_limit":"14","order_plan_bundle":"CPT12831","segment":null,"upfront_installment":null,"contract":"df","plan_name":"XP L Pass","plan_title":null,"plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"14 GB","key_text":"RM 30","image_url":"/media/catalog/product/x/p/xp_lite_name-01_5__2.png","device_allowed":"1","selected_pass":false},{"name":"speed M","sku":"ultra-speed","offer":"<p>11GB Internet<br />Free 3GB Video Walla&trade;<br />Free* 1 hour Ultra Hour Pass&trade; daily<br /><span style=\"color: #009ADE;\">Free RM20 Grab voucher**</span></p>","selected_offer_title":"(12GB Internet + 3GB Video Walla™)","monthly_plan":"30.00","data_limit":"14","order_plan_bundle":"CPT12831","segment":null,"upfront_installment":null,"contract":"df","plan_name":"XP L Pass","plan_title":null,"plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"14 GB","key_text":"RM 30","image_url":"/media/catalog/product/x/p/xp_lite_name-01_5__2.png","device_allowed":"1","selected_pass":false}]},{"name":"Ultra GB","sku":"ultra-gb","offer":"<p>11GB Internet<br />Free 3GB Video Walla&trade;<br />Free* 1 hour Ultra Hour Pass&trade; daily<br /><span style=\"color: #009ADE;\">Free RM20 Grab voucher**</span></p>","selected_offer_title":"(12GB Internet + 3GB Video Walla™)","monthly_plan":"30.00","data_limit":"14","order_plan_bundle":"CPT12831","segment":null,"upfront_installment":null,"contract":"df","plan_name":"XP L Pass","plan_title":null,"plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"14 GB","key_text":"RM 30","image_url":"/media/catalog/product/x/p/xp_lite_name-01_5__2.png","device_allowed":"1","selected_pass":false,"associated_passes":[{"name":"GB XL","sku":"ultra-speed","offer":"<p>11GB Internet<br />Free 3GB Video Walla&trade;<br />Free* 1 hour Ultra Hour Pass&trade; daily<br /><span style=\"color: #009ADE;\">Free RM20 Grab voucher**</span></p>","selected_offer_title":"(12GB Internet + 3GB Video Walla™)","monthly_plan":"30.00","data_limit":"14","order_plan_bundle":"CPT12831","segment":null,"upfront_installment":null,"contract":"df","plan_name":"XP L Pass","plan_title":null,"plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"14 GB","key_text":"RM 30","image_url":"/media/catalog/product/x/p/xp_lite_name-01_5__2.png","device_allowed":"1","selected_pass":false},{"name":"GB L","sku":"ultra-speed","offer":"<p>11GB Internet<br />Free 3GB Video Walla&trade;<br />Free* 1 hour Ultra Hour Pass&trade; daily<br /><span style=\"color: #009ADE;\">Free RM20 Grab voucher**</span></p>","selected_offer_title":"(12GB Internet + 3GB Video Walla™)","monthly_plan":"30.00","data_limit":"14","order_plan_bundle":"CPT12831","segment":null,"upfront_installment":null,"contract":"df","plan_name":"XP L Pass","plan_title":null,"plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"14 GB","key_text":"RM 30","image_url":"/media/catalog/product/x/p/xp_lite_name-01_5__2.png","device_allowed":"1","selected_pass":false},{"name":"GB M","sku":"ultra-speed","offer":"<p>11GB Internet<br />Free 3GB Video Walla&trade;<br />Free* 1 hour Ultra Hour Pass&trade; daily<br /><span style=\"color: #009ADE;\">Free RM20 Grab voucher**</span></p>","selected_offer_title":"(12GB Internet + 3GB Video Walla™)","monthly_plan":"30.00","data_limit":"14","order_plan_bundle":"CPT12831","segment":null,"upfront_installment":null,"contract":"df","plan_name":"XP L Pass","plan_title":null,"plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"14 GB","key_text":"RM 30","image_url":"/media/catalog/product/x/p/xp_lite_name-01_5__2.png","device_allowed":"1","selected_pass":false}]}],"upper_age_limit":"0","lower_age_limit":"1000","promotion_message":"Size up with L Pass to get more Internet and savings","type_purchse":{"dealer":{"newline":false,"cobp":true,"mnp":false}}}];
class MockPlanPurchaseService{
  Find(url) {
    return Observable.of(planResp);
  }
  FindUltraPlan(ultraUrl) {
    if (ultraUrl === '/rest/V1/ultraplanproductview/ultra-pass') {
    return Observable.of(ultraResp);
    }
    if (ultraUrl === '/rest/V1/ultraplanproductview/ultra-pass/error') {
      return Observable.throw({});
    }
  }
}
class MockPlanTableService{
  Find(listurl) {
    return Observable.of(planListResp);
  }
}
const fakeActivatedRoute = {
  data: Observable.of({}),
    snapshot: { data: {} }
  } as ActivatedRoute;

describe('PlanPurchaseComponent', () => {
  let fixture;
  let component;
  let route;
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlanPurchaseComponent, PageLoaderComponent, MoonPlanWithPassDetailsComponent, MoonPlanWithDeviceDetailsComponent,
         MoonColorStorageComponent, MoonStickySummarySectionComponent, MoonSummarySectionComponent,
          LifestylePlansComponent, DeviceDetailsNumberComponent, StickySummaryComponent, DeviceDetailsSummaryComponent,
           FooterComponent, AgentFooterComponent, NotificationErrorComponent, DetailBannerTextLeftComponent,
            LosingSupplementaryLinePopupComponent, AgeEligibilityPopupComponent, ChooseYourWayComponent,
             DeviceDisclaimerComponent, NoteSectionComponent, SupplementaryLinesComponent, CobpComponent,
              SwitchToCelcomComponent, DeviceSupplementaryLinesComponent, FooterDownloadComponent,
               SocialMediaComponent, MoreSupplementaryPopupComponent, NotificationBarComponent, NricInputComponent, 
               sharedPipes,
               MsisdnInputComponent,OtpInputComponent, SearchHighlight, StarSizeUpComponent
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
      
        IconModule,
        materialModules,
      ],
      providers: [
        ProductService,
        {provide:PlanPurchaseService,useClass:MockPlanPurchaseService},
        DeviceDataService,
        {provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        { provide: AppService, useClass: AppMockService },
        RedirectionService,
        EStoreAnalysticsService,
        Renderer2,
        {provide: PlanTableComparisionService, useClass: MockPlanTableService},
        HomeService,
        GetParametersService,
        CookieService,
        UserService,
        Broadcaster,
        HttpClient,
        NotificationPopupEvent,
        AnalyticsService,
        RendererService,
        SeoService,
        DecimalPipe,
        CommonUtilService,
        BroadbandService,
        ],
        schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(PlanPurchaseComponent, {
      set: {
        providers:[{provide: PlanPurchaseService, useClass: MockPlanPurchaseService},
           {provide: PlanTableComparisionService, useClass: MockPlanTableService}, RedirectionService]
      }
    });
  });
    beforeEach(async(() => {
    fixture = TestBed.createComponent(PlanPurchaseComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create Plan  Purchase component', async () => {
    expect(component).toBeTruthy();
  });
  it('should initialized variables' , () => {
    expect(component.PlanDetails).toBe("");
    expect(component.isCSAgentDealer).toEqual("");
    expect(component.csAgent).toContain("cs-agent");
    expect(component.notCSAgent).toContain("not-cs-agent");
    expect(component.editProduct).toBe(null);
    expect(component.editDeviceObj).toBe(null);
    expect(component.keepCelcomNumObj).toBe(null);
    expect(component.isEasyPhone).toBe("isEasyPhone");
    expect(component.isPreOrder).toBe("isPreOrder");
    expect(component.isRentClicked).toBe("isRentClicked");
    expect(component.isOwnClicked).toBe("isOwnClicked");
    expect(component.isBundleClicked).toBe("isBundleClicked");
    expect(component.deviceSku).toBe("DeviceSku");
    expect(component.termsAndConditionsLinks).toEqual({
      FG: "/legal/terms-and-conditions/personal#personal-postpaid-plans-first-gold",
      FGP: "/legal/terms-and-conditions/personal#personal-postpaid-plans-first-gold-plus",
      FP: "/legal/terms-and-conditions/personal#personal-postpaid-plans-first-platinum",
      FPP: "/legal/terms-and-conditions/personal#personal-postpaid-plans-first-platinum-plus",
      FGS: "/legal/terms-and-conditions/personal#personal-postpaid-plans-first-gold-supreme",
    })
  });
  it('test OnContinueEligibilityCheck', () => {
    spyOn(component , 'OnContinueEligibilityCheck').and.callThrough();
      expect(component.IsDisplayAgeEligibilityPopup).toBe(false);
  });
  it('test OnContinueMvivaCheck', () => {
    spyOn(component , 'OnContinueMvivaCheck').and.callThrough();
    if (typeof window !== "undefined") {
      expect(component.IsDisplayMvivaPopup).toBe(false);
    }
  });
  it('test OnContinueDealerCheck', () => {
    spyOn(component , 'OnContinueDealerCheck').and.callThrough();
    if (typeof window !== "undefined") {
      expect(component.IsDisplayDealerPopup).toBe(false);
    }
  });
  it('test ManageAgeEligibilityPopupOnPageLoad function', () => {
    let data = {
      isEligibleByAge :false,
      type :'xpax',
      displayType:"test"
    }
    localStorage.setItem('EligibilityIndicator',JSON.stringify(data));
    component.ManageAgeEligibilityPopupOnPageLoad();
    expect(component.EligibilityPopupType).toBe('test');
    expect(component.IsDisplayAgeEligibilityPopup).toBeTruthy();
    localStorage.removeItem('EligibilityIndicator');

  });
  it('test OnContinueEligibilityCheck function', () => {
    component.OnContinueEligibilityCheck();
    expect(component.IsDisplayAgeEligibilityPopup).toBeFalsy();

  });
  it('test OnContinueEligibilityCheck function', () => {
    component.TableComparisonResponse = [
      {"tabname":"FIRST™ Plans","tabtitle":"Celcom First™ Plans","tabsubtitle":"Sign up for 12 months and get extra privileges","is_xpax":false,"tabdata":{"Items":[{"name":"First™ Basic 38","sku":"FB38","url_key":"first-basic-38","plan_part_number":"PB08050","ngn_part_number":"PB08050","BackgroundColor":"is-bg-color-black","IndicatorClass":"is-level-basic","ProductText":"First Basic 38","KeyFiguresText":"5 GB","KeyText":"RM 38","PlanMonthlyPay":"38.0000","OneTimePayment":"38.0000","TotalPay":"38.0000","BuynowLink":"/plans/first-basic-38","BuynowText":"Buy now","knowMoreLink":"/store/plans/first-basic-38","knowMoreText":"Learn more","lowerAgeLimit":"18","UpperAgeLimit":null,"MobileDescription":null,"contract":"24 months contract","image_url":"/media/catalog/product","telco_day":{"status":false,"hat_text":null,"message":null,"allowed_types":["NEW_NUMBER","MnpNum","EXISTING_NUMBER"],"not_allowed_types":[],"eligible_message":"Rebate is only eligible for New registration, Switch to Celcom, Upgrade Plan","not_eligible_message":"Rebate is not eligible for "},"is_premium_plan":false,"analytics_key_addtocart":{"fb_add_cart_id":null,"google_add_cart_id":null,"twitter_add_cart_id":null,"fb_learn_more_id":null,"google_learn_more_id":null,"twitter_learn_more_id":null,"fb_buy_now_id":null,"google_buy_now_id":null,"twitter_buy_now_id":null},"bill_type":0,"PlanName":"First™ Basic 38","PlanSku":"FB38","IsMnp":false,"PlanOnlyComponentToShow":true,"is_xpax":false,"addons":[],"TableInfo":[{data:"test"}]}]}}];
    let data = {tabname:"test"};
      component.OnTabSelect(data,0);
    expect((component.PlanData.tabdata.Items).length).toBe(1);
    expect(component.SelectedTab).toBe('test');

  });
  it('test OnContinueEligibilityCheck function', () => {
    let data = {"name":"First™ Platinum","sku":"FP","url_key":"first-platinum","plan_part_number":"PB11820","ngn_part_number":"PB09890","BackgroundColor":"is-bg-color-black","IndicatorClass":"is-level-platinum","ProductText":"Platinum","KeyFiguresText":"60 GB","KeyText":"RM 148","PlanMonthlyPay":"148.0000","OneTimePayment":"148.0000","TotalPay":"148.0000","BuynowLink":"/plans/first-platinum","BuynowText":"Buy now","knowMoreLink":"/store/plans/first-platinum","knowMoreText":"Learn more","lowerAgeLimit":"18","UpperAgeLimit":null,"MobileDescription":null,"contract":"24 months contract","image_url":"/media/catalog/product/w/f/wf-ju-60gb.png","telco_day":{"status":false,"hat_text":"Hi TQA team have a good day","message":"Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!","allowed_types":["NEW_NUMBER"],"not_allowed_types":["MnpNum","EXISTING_NUMBER"],"eligible_message":"Rebate is only eligible for New registration","not_eligible_message":"Rebate is not eligible for Switch to Celcom, Upgrade Plan"},"is_premium_plan":false,"analytics_key_addtocart":{"fb_add_cart_id":"CelcomPlatinum_AddToCart","google_add_cart_id":"kNaXCND4iZcBENjpoqMD","twitter_add_cart_id":"nzukn","fb_learn_more_id":"CelcomPlatinum_LearnMore","google_learn_more_id":"WuOWCOHQnZcBENjpoqMD","twitter_learn_more_id":"nzuko","fb_buy_now_id":"CelcomPlatinum_BuyNow","google_buy_now_id":"b5OkCMynlJcBENjpoqMD","twitter_buy_now_id":"nzuk8"},"bill_type":0,"PlanName":"First™ Platinum","PlanSku":"FP","IsMnp":false,"PlanOnlyComponentToShow":true,"is_xpax":false,"addons":[],"TableInfo":[],"AtrHref":"#rm-4"};
    component.TableComparisonResponse = [
      {"tabname":"FIRST™ Plans","tabtitle":"Celcom First™ Plans","tabsubtitle":"Sign up for 12 months and get extra privileges","is_xpax":false,"tabdata":{"Items":[{"name":"First™ Basic 38","sku":"FB38","url_key":"first-basic-38","plan_part_number":"PB08050","ngn_part_number":"PB08050","BackgroundColor":"is-bg-color-black","IndicatorClass":"is-level-basic","ProductText":"First Basic 38","KeyFiguresText":"5 GB","KeyText":"RM 38","PlanMonthlyPay":"38.0000","OneTimePayment":"38.0000","TotalPay":"38.0000","BuynowLink":"/plans/first-basic-38","BuynowText":"Buy now","knowMoreLink":"/store/plans/first-basic-38","knowMoreText":"Learn more","lowerAgeLimit":"18","UpperAgeLimit":null,"MobileDescription":null,"contract":"24 months contract","image_url":"/media/catalog/product","telco_day":{"status":false,"hat_text":null,"message":null,"allowed_types":["NEW_NUMBER","MnpNum","EXISTING_NUMBER"],"not_allowed_types":[],"eligible_message":"Rebate is only eligible for New registration, Switch to Celcom, Upgrade Plan","not_eligible_message":"Rebate is not eligible for "},"is_premium_plan":false,"analytics_key_addtocart":{"fb_add_cart_id":null,"google_add_cart_id":null,"twitter_add_cart_id":null,"fb_learn_more_id":null,"google_learn_more_id":null,"twitter_learn_more_id":null,"fb_buy_now_id":null,"google_buy_now_id":null,"twitter_buy_now_id":null},"bill_type":0,"PlanName":"First™ Basic 38","PlanSku":"FB38","IsMnp":false,"PlanOnlyComponentToShow":true,"is_xpax":false,"addons":[],"TableInfo":[{data:"test"}]}]}}];
      component.PlanPurchaseDataToPass = {"name":"First™ Gold Supreme","PlanName":"First™ Gold Supreme","sku":"FGS","url_key":"first-gold-supreme","order_plan_bundle":"PB11830","ngn_part_number":"PB11890","order_service_bundle":"RTP0010","order_plan_component":[{"component_name":"Executive Plan VAS without GPRS_10784","component_part_no":"CPT05370","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"FiRST Gold Supreme CBS Commitment Fee","component_part_no":"CPT16930","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"New Package for IDD Activation","component_part_no":"CPT07020","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"First Unlimited","component_part_no":"CPT12290","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Default International Roaming Voice/SMS","component_part_no":"CPT13540","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Free Chat 2.0","component_part_no":"MI01790","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Weekend Internet Quota","component_part_no":"CPT16980","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Advance Payment CBS RM128","component_part_no":"OTC08840","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"SIM Card","component_part_no":"SM00010","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Blank SIM Starter Pack","component_part_no":"SP00210","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Stamp Fee_92382","component_part_no":"OTC00350","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Printed Bill for Voice","component_part_no":"BDMR0080","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Gold Supreme CBS Plan","cbs_part_number":"PR03480","isvas":"0","vasname":null,"vasvalue":null}],"PlanMonthlyPay":"128.0000","OneTimePayment":"128.0000","contract":"24 months contract","plan_title":"First™ Gold Supreme","plan_subtitle":"More data, music, video, chats. Even more privileges when you sign up for 12 months.","BackgroundColor":"is-bg-color-black","upfront_installment":null,"IndicatorClass":"is-level-gold","ProductText":"Gold Supreme","KeyFiguresText":"50 GB","KeyText":"RM 128","BuynowLink":"/plans/first-gold-supreme","BuynowText":"Buy now","knowMoreLink":"/store/plans/first-gold-supreme","knowMoreText":"Learn more","upper_age_limit":null,"lower_age_limit":"18","banner_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg","mobile_image":"/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg","is_xpax":false,"MobileDescription":null,"product_type":"Service","footNote":null,"TableInfo":[],"image_url":"/media/catalog/product/w/f/wf-yan-50gb.png","supplementary_data":[{"name":"Celcom Mobile Family™","max_line":"3","part_number":"PB12540","price":"48.0000"},{"name":"Celcom FIRST™ 1+5","max_line":"5","part_number":"PB11440","price":"30.0000"}],"addons":[],"is_campaign_mviva":null,"campaign_mviva":null,"campaign_mviva_invalid":null,"analytics_key_addtocart":{"fb_add_cart_id":"CelcomGoldSupreme_AddToCart","google_add_cart_id":"q73BCN_4iZcBENjpoqMD","twitter_add_cart_id":"nzuky","fb_learn_more_id":"CelcomGoldSupreme_LearnMore","google_learn_more_id":"gsuUCP2DiZcBENjpoqMD","twitter_learn_more_id":"nzukv","fb_buy_now_id":"CelcomGoldSupreme_BuyNow","google_buy_now_id":"hKvwCJSilJcBENjpoqMD","twitter_buy_now_id":"nzuk7"},"telco_day":{"status":false,"hat_text":null,"message":null,"allowed_types":[],"not_allowed_types":["NEW_NUMBER","MnpNum","EXISTING_NUMBER"],"eligible_message":"Rebate is only eligible for ","not_eligible_message":"Rebate is not eligible for New registration, Switch to Celcom, Upgrade Plan"},"is_premium_plan":false,"bill_type":1,"PlanSku":"FGS","TotalPay":128,"PlanOnlyComponentToShow":true,"IsMnp":false};
      component.OnTabSelect(data,0);
      component.onSwitchingPlanTabs("First™ Platinum","FP","148.0000",data);


  });
  it('removeMNPStorage', () => {
    component.removeMNPStorage();
  });
  it('noDeviceButtonCLicked', () => {
    component.noDeviceButtonCLicked();
  });
  it('showAllDevices', () => {
    component.showAllDevices();
  });
  it('setAddOnTermsAccepted', () => {
    const data = {code: "abc"};
    component.setAddOnTermsAccepted(data);
  });
  it('onCancellingSwitchingTab', () => {
    component.onCancellingSwitchingTab();
  });
  it('captureQueryParams', () => {
    component.captureQueryParams();
  });
  it('InitializeDeviceDetailSummary', () => {
    component.InitializeDeviceDetailSummary(6011201221);
  });
  it('onSwitchTabs', () => {
    localStorage.setItem("addonCode", "abc");
    component.onSwitchTabs();
    localStorage.removeItem("addonCode");
    component.onSwitchTabs();
    localStorage.removeItem("lifestylePlans");
  });
  it('setAgentLoggedIn', () => {

    sessionStorage.setItem("AgentInfo", "abc");
    sessionStorage.setItem("DealerInfo", "abc");
    component.setAgentLoggedIn();
    sessionStorage.removeItem("DealerInfo");
    sessionStorage.removeItem("AgentInfo");
    component.setAgentLoggedIn();
    sessionStorage.setItem("UserToken", "abc");
    component.setAgentLoggedIn();
    sessionStorage.removeItem("UserToken");
  });
  it('ngOnInit', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    sessionStorage.setItem("DealerInfo", "abc");
    component.ngOnInit();
    devicedataservice.publishLoggerInUserName("abc");
    sessionStorage.removeItem("DealerInfo");

  }));
  it('ngoninit false scenarios', () => {
    sessionStorage.setItem("AgentInfo", "abc");
    localStorage.setItem("isPreOrder", "false");
    localStorage.setItem("isEasyPhone", "false");
    localStorage.setItem("isRentClicked", "false");
    localStorage.setItem("isOwnClicked", "false");
    localStorage.setItem("isBundleClicked", "false");
    localStorage.setItem("lifestylePlans", "false");
    localStorage.setItem("COBP_login_Check", "false");
    localStorage.setItem("COBP_FLOW_CHECK", "false");
    localStorage.setItem("DeviceSku", "false");
    component.ngOnInit();
    sessionStorage.removeItem("AgentInfo");
    localStorage.removeItem("isPreOrder");
    localStorage.removeItem("isEasyPhone");
    localStorage.removeItem("isRentClicked");
    localStorage.removeItem("isOwnClicked");
    localStorage.removeItem("isBundleClicked");
    localStorage.removeItem("lifestylePlans");
    localStorage.removeItem("COBP_login_Check");
    localStorage.removeItem("COBP_FLOW_CHECK");
    localStorage.removeItem("DeviceSku");
    component.ngOnInit();
    // window.location.href = "#abcd/plans/mega";
    // component.ngOnInit();
    // component.ultraPassUrl = '/rest/V1/ultraplanproductview/ultra-pass/error';
    // component.ngOnInit();
  });
  it('createCookieForAffiliateMarketing', () => {
    component.createCookieForAffiliateMarketing("InvolveAsia");
  });
  it('afterviewinit', () => {
    component.ngAfterViewInit();
  });
  it('OnMnpEligibilityPlanPurchase', () => {
    component.PlanPurchaseDataToPass = planResp;
    let mnpData: any = {
      isEligible: true,
      principleMobileNumber: "60112311121",
      portNumber: "01222222223"
    };
    component.OnMnpEligibilityPlanPurchase(mnpData);
    mnpData = {
      isEligible: false
    };
    component.PlanPurchaseResponse = planResp;
    component.OnMnpEligibilityPlanPurchase(mnpData);
  });
  it('onResetPriceData', () => {
    const resetData = {
      isMnp: true
    };
    const selectedplan = {"name":"First™ Platinum","PlanName":"First™ Platinum","sku":"FP","url_key":"first - platinum","order_plan_bundle":"PB11820","ngn_part_number":"PB09890","order_service_bundle":"RTP0010","order_plan_component":[{"component_name":"Executive Plan VAS without GPRS_10784","component_part_no":"CPT05370","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"New Package for IDD Activation","component_part_no":"CPT07020","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"First Unlimited","component_part_no":"CPT12290","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Default International Roaming Voice / SMS","component_part_no":"CPT13540","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"FiRST Platinum CBS Commitment Fee","component_part_no":"CPT16950","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Free Chat 2.0","component_part_no":"MI01790","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Weekend Internet Quota","component_part_no":"CPT16980","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Advance Payment CBS RM148","component_part_no":"OTC08860","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"SIM Card","component_part_no":"SM00010","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Blank SIM Starter Pack","component_part_no":"SP00210","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Stamp Fee_92382","component_part_no":"OTC00350","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Printed Bill for Voice","component_part_no":"BDMR0080","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"International Roaming Data","component_part_no":"NVF01000","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null}],"PlanMonthlyPay":"148.0000","OneTimePayment":"148.0000","contract":"24 months contract","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","BackgroundColor":"is - bg - color - black","upfront_installment":null,"IndicatorClass":"is - level - platinum","ProductText":"Platinum","KeyFiguresText":"60 GB","KeyText":"RM 148","BuynowLink":" / plans / first - platinum","BuynowText":"Buy now","knowMoreLink":" / store / plans / first - platinum","knowMoreText":"Learn more","upper_age_limit":"40","lower_age_limit":"18","banner_image":" / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":" / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","is_xpax":false,"MobileDescription":null,"product_type":"Service","footNote":null,"TableInfo":[],"image_url":" / media / catalog / product / w / f / wf - ju - 60gb.png","supplementary_data":[{"name":"Celcom Mobile Family™","max_line":"4","part_number":"PB12540","price":"48.0000"},{"name":"Celcom FIRST™ 1 + 5","max_line":"5","part_number":"PB11440","price":"30.0000"}],"addons":[],"is_campaign_mviva":null,"campaign_mviva":null,"campaign_mviva_invalid":null,"analytics_key_addtocart":{"fb_add_cart_id":"CelcomPlatinum_AddToCart","google_add_cart_id":"kNaXCND4iZcBENjpoqMD","twitter_add_cart_id":"nzukn","fb_learn_more_id":"CelcomPlatinum_LearnMore","google_learn_more_id":"WuOWCOHQnZcBENjpoqMD","twitter_learn_more_id":"nzuko","fb_buy_now_id":"CelcomPlatinum_BuyNow","google_buy_now_id":"b5OkCMynlJcBENjpoqMD","twitter_buy_now_id":"nzuk8"},"telco_day":{"status":false,"hat_text":"Hi TQA team have a good day","message":"Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!","allowed_types":["NEW_NUMBER"],"not_allowed_types":["MnpNum","EXISTING_NUMBER"],"eligible_message":"Rebate is only eligible for New registration","not_eligible_message":"Rebate is not eligible for Switch to Celcom, Upgrade Plan"},"is_premium_plan":false,"bill_type":1,"PlanSku":"FP","TotalPay":148,"PlanOnlyComponentToShow":true,"IsMnp":false};
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(selectedplan));
    component.onResetPriceData(resetData);
    component.isMviva = true;
    localStorage.setItem("mvivaPlanUpfront", "true");
    component.onResetPriceData(resetData);
    localStorage.removeItem("SelectedPlanDetails");
    component.isMviva = false;
    localStorage.removeItem("mvivaPlanUpfront");
  });
  it('OnCOBPEligibilityPlanPurchase', () => {
    let cobpData: any = {
      isMnp: true,
      cobpEligible: true,
      userLessThanSixMonths: false
    };
    const selectedplan = {"name":"First™ Platinum","PlanName":"First™ Platinum","sku":"FP","url_key":"first - platinum","order_plan_bundle":"PB11820","ngn_part_number":"PB09890","order_service_bundle":"RTP0010","order_plan_component":[{"component_name":"Executive Plan VAS without GPRS_10784","component_part_no":"CPT05370","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"New Package for IDD Activation","component_part_no":"CPT07020","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"First Unlimited","component_part_no":"CPT12290","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Default International Roaming Voice / SMS","component_part_no":"CPT13540","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"FiRST Platinum CBS Commitment Fee","component_part_no":"CPT16950","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Free Chat 2.0","component_part_no":"MI01790","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Weekend Internet Quota","component_part_no":"CPT16980","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Advance Payment CBS RM148","component_part_no":"OTC08860","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"SIM Card","component_part_no":"SM00010","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Blank SIM Starter Pack","component_part_no":"SP00210","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Stamp Fee_92382","component_part_no":"OTC00350","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Printed Bill for Voice","component_part_no":"BDMR0080","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"International Roaming Data","component_part_no":"NVF01000","component_default":"0","component_price":"0.0000","cbs_name":"FiRST Platinum CBS Plan","cbs_part_number":"PR043691","isvas":"0","vasname":null,"vasvalue":null}],"PlanMonthlyPay":"148.0000","OneTimePayment":"148.0000","contract":"24 months contract","plan_title":"First™ Platinum","plan_subtitle":"Now with extra privileges when you sign up for 12 months.","BackgroundColor":"is - bg - color - black","upfront_installment":null,"IndicatorClass":"is - level - platinum","ProductText":"Platinum","KeyFiguresText":"60 GB","KeyText":"RM 148","BuynowLink":" / plans / first - platinum","BuynowText":"Buy now","knowMoreLink":" / store / plans / first - platinum","knowMoreText":"Learn more","upper_age_limit":"40","lower_age_limit":"18","banner_image":" / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg","mobile_image":" / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg","is_xpax":false,"MobileDescription":null,"product_type":"Service","footNote":null,"TableInfo":[],"image_url":" / media / catalog / product / w / f / wf - ju - 60gb.png","supplementary_data":[{"name":"Celcom Mobile Family™","max_line":"4","part_number":"PB12540","price":"48.0000"},{"name":"Celcom FIRST™ 1 + 5","max_line":"5","part_number":"PB11440","price":"30.0000"}],"addons":[],"is_campaign_mviva":null,"campaign_mviva":null,"campaign_mviva_invalid":null,"analytics_key_addtocart":{"fb_add_cart_id":"CelcomPlatinum_AddToCart","google_add_cart_id":"kNaXCND4iZcBENjpoqMD","twitter_add_cart_id":"nzukn","fb_learn_more_id":"CelcomPlatinum_LearnMore","google_learn_more_id":"WuOWCOHQnZcBENjpoqMD","twitter_learn_more_id":"nzuko","fb_buy_now_id":"CelcomPlatinum_BuyNow","google_buy_now_id":"b5OkCMynlJcBENjpoqMD","twitter_buy_now_id":"nzuk8"},"telco_day":{"status":false,"hat_text":"Hi TQA team have a good day","message":"Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!","allowed_types":["NEW_NUMBER"],"not_allowed_types":["MnpNum","EXISTING_NUMBER"],"eligible_message":"Rebate is only eligible for New registration","not_eligible_message":"Rebate is not eligible for Switch to Celcom, Upgrade Plan"},"is_premium_plan":false,"bill_type":1,"PlanSku":"FP","TotalPay":148,"PlanOnlyComponentToShow":true,"IsMnp":false};
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(selectedplan));
    component.PlanPurchaseDataToPass = planResp;
    component.OnCOBPEligibilityPlanPurchase(cobpData);
    component.isMviva = true;
    localStorage.setItem("mvivaPlanUpfront", "true");
    component.OnCOBPEligibilityPlanPurchase(cobpData);
    cobpData = {
      isMnp: true,
      cobpEligible: false,
      userLessThanSixMonths: false
    };
    component.OnCOBPEligibilityPlanPurchase(cobpData);
    component.isMviva = false;
    component.OnCOBPEligibilityPlanPurchase(cobpData);
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("mvivaPlanUpfront");
  });
});
