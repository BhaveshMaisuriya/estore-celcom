// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { MinifiedPageLoaderComponent } from '../../../Store/widget/minified-page-loader/minified-page-loader.component';
// import { FormsModule } from '@angular/forms';
// import { FooterComponent } from '../../../Footer/footer.component';
// import { AgentFooterComponent } from '../../../Footer/agent-footer/agent-footer.component';
// import { SocialMediaComponent } from '../../../Footer/SocialMedia/socialmedia.component';
// import { FooterDownloadComponent } from '../../../Footer/Download/download.component';
// import { AppService } from '../../../Service/app.service';
// import { AppMockService } from '../../../Service/appmock.service';
// import { Router, ActivatedRoute } from '@angular/router';
// import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
// import { AnalyticsService } from '../../../Service/analytic.service';
// import { RendererService } from '../../../Service/renderer.service';
// import { SeoService } from '../../../Service/seo.service';
// import { DecimalPipe } from '@angular/common';
// import { Broadcaster } from "../../../Model/broadcaster.model";
// import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
// import { CookieService } from 'ngx-cookie-service';
// import { Observable } from 'rxjs/Rx';
// import { UserService } from '../../../Service/user.service';
// import { CartService } from '../../../Service/cart.service';
// import { BundleService } from '../../../Service/bundle.service';
// import { OrderInfoService } from '../../../Service/orderinfo.service';
// import { HeaderService } from '../../../Header/header.service';
// import { RedirectionService } from '../../../Service/redirection.service';
// import { HttpClient } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { BroadbandService } from '../../../Service/broadband.service';
// import { DeviceDataService } from '../../../Service/devicedata.service';
// import { CommonUtilService } from '../../../Service/commonUtil.service';
// import { PlanTableComparisonComponent } from '../../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.component';
// import { HeroBannerCarouselComponent } from '../../../Widget/HeroBannerCarousel/herobanner.carousel.component';
// import { HeroBannerImageClickableComponent } from '../../../Widget/HeroBannerImageClickable/hero-banner-image-clickable.component';
// import { HomeService } from '../../../Service/home.service';
// import { PlanTableComparisionService } from './plan-table-comparison.service';
// import { AgeEligibilityPopupComponent } from '../../../Store/widget/age-eligibility-popup/ageeligiblity.popup.component';
// import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';

// class RouterStub {
//     navigateByUrl(url: string) {
//         return url;
//     }
// }
// class MockactivatedRoute {
//     snapshot(url: string) {
//         return url;
//     }
// }
// let MockResp = [{
//     tabname:"test tab",
//     tabdata:{
//         Items:[{
//             AtrHref:"",
//             TableInfo:[{
//                 Id:"",
//                 HrefId:""
//             }]
//         },
//         {
//             AtrHref:"",
//             TableInfo:[{
//                 Id:"",
//                 HrefId:""
//             }]
//         }]
//     }
// },
// {
//     tabname:"Second tab",
//     tabdata:{
//         Items:[{
//             AtrHref:"",
//             TableInfo:[{
//                 Id:"",
//                 HrefId:""
//             }]
//         },
//         {
//             AtrHref:"",
//             TableInfo:[{
//                 Id:"",
//                 HrefId:""
//             }]
//         }]
//     }
// }]
// class MockPlanTableComparisionService{
//     Find(){
//         return Observable.of(MockResp);
//     }
// }
// describe('PlanTableComparisonComponent ', () => {
//     const fakeActivatedRoute = {
//         snapshot: { data: {} }
//       } as ActivatedRoute;
//     let component: PlanTableComparisonComponent;
//     let fixture: ComponentFixture<PlanTableComparisonComponent>;
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [FormsModule, HttpClientTestingModule],
//             declarations: [PlanTableComparisonComponent, FooterComponent, AgentFooterComponent, SocialMediaComponent,
//                 FooterDownloadComponent, HeroBannerCarouselComponent,
//              HeroBannerImageClickableComponent, AgeEligibilityPopupComponent],
//             providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: AppService, useClass: AppMockService },
//             { provide: Router, useClass: RouterStub },
//             {
//                 provide: ActivatedRoute, useClass: MockactivatedRoute
//             }, EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
//                 DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
//              OrderInfoService, HeaderService, RedirectionService, HttpClient, BroadbandService, CommonUtilService,
//               DeviceDataService, HomeService, PlanTableComparisionService, UserService, RemarketAnalyticsService]
//         }).overrideComponent(PlanTableComparisonComponent,{
//             set:{
//                 providers:[{provide:PlanTableComparisionService,useClass:MockPlanTableComparisionService}]
//             }
//         })
//             .compileComponents();
//     }));
//     beforeEach(async(() => {
//         fixture = TestBed.createComponent(PlanTableComparisonComponent);
//         component = fixture.componentInstance;
//     }));
//    it('should create Plan Table Comparision component', () => {
//         expect(component).toBeTruthy();
//     });
//    it('should test ngonint function', () => {
//     sessionStorage.setItem('DealerInfo',"true");
//     component.ngOnInit();
//     sessionStorage.removeItem('DealerInfo');
//     expect(component.DealerPopupType.isEligibleByAge).toBeFalsy();
//     });
//    it('should test ngonint function without dealer Info', () => {
//     sessionStorage.setItem('AgentInfo',"true");
//     localStorage.setItem("isMviva",'true');
//     localStorage.setItem("mvivaSummaryMessage",'true');
//     localStorage.setItem("mvivaPlanUpfront",'true');
//     localStorage.setItem("mvivaBundleUpfront",'true');
//     localStorage.setItem("COBP_login_Check",'true');
//     localStorage.setItem("COBP_FLOW_CHECK",'true');
//     component.data = {
//         Api :"testapi"
//     }
//     component.ngOnInit();
//     sessionStorage.removeItem('AgentInfo');
//     expect(component.isCSAgent).toBeTruthy();
//     expect(component.SelectedTab).toBe('test tab');
//     });
//     it('should test OnTabSelect function', () => {
//     sessionStorage.setItem('AgentInfo',"true");
//     component.data = {
//         Api :"testapi"
//     }
//     component.ngOnInit();
//     let data = {
//         tabname:"Second tab"
//     }
//     component.OnTabSelect(data,1);
//     sessionStorage.removeItem('AgentInfo');
//     // expect(component.isCSAgent).toBeTruthy();
//     expect(component.SelectedTab).toBe('Second tab');
//     });
//     it('should test OnContinueDealerCheck function', () => {
//     sessionStorage.setItem('AgentInfo',"true");
//     component.storeDeviceUrl = '#test';
//     component.OnContinueDealerCheck('');
//     expect(component.IsDisplayDealerPopup).toBeFalsy();

//     });
//     it('should test loadAnalyticsBuyPlanScript function', () => {
//         component.storeDeviceUrl = '#test';
//         let analytics_key_addtocart = {
//             fb_buy_now_id:"test",
//             google_buy_now_id:"test google",
//             twitter_buy_now_id:"test twitter"
//         }
//         component.loadAnalyticsBuyPlanScript(analytics_key_addtocart);
//     });
//     it('should test loadAnalyticsLearnPlanScript function', () => {
//         component.storeDeviceUrl = '#test';
//         let analytics_key_addtocart = {
//             fb_learn_more_id:"test",
//             google_learn_more_id:"test google",
//             twitter_learn_more_id:"test twitter"
//         }
//         component.loadAnalyticsLearnPlanScript(analytics_key_addtocart);
//     });
// });
