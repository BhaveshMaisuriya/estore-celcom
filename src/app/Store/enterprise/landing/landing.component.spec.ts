// /* tslint:disable:no-unused-variable */
// import {
//   async,
//   ComponentFixture,
//   TestBed,
//   inject
// } from "@angular/core/testing";
// import { By } from "@angular/platform-browser";
// import { DebugElement } from "@angular/core";
// import { AgentFooterComponent } from "../../../Footer/agent-footer/agent-footer.component";
// import { Router, ActivatedRoute, RouterModule } from "@angular/router";
// import { EnterpriseLandingComponent } from "./landing.component";
// import { EnterpriseService } from "../enterprise.service";
// import { UserService } from "../../../Service/user.service";
// import { DeviceDataService } from "../../../Service/devicedata.service";
// import { PlanTableComparisionService } from "../../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.service";
// import { NotificationErrorComponent } from "../../widget/notification-error/notification-error.component";
// import { AppService } from "../../../Service/app.service";
// import { HttpClientTestingModule } from "@angular/common/http/testing";
// import { CommonUtilService } from "../../../Service/commonUtil.service";
// import { EStoreAnalysticsService } from "../../../Service/store.analytic.service";
// import { AnalyticsService } from "../../../Service/analytic.service";
// import { RendererService } from "../../../Service/renderer.service";
// import { SeoService } from "../../../Service/seo.service";
// import { DecimalPipe } from "@angular/common";
// import { Observable } from "rxjs/Observable";
// import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
// import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
// import { MatIconModule } from '@angular/material/icon';

// class RouterStub {
//   navigateByUrl(url: string) {
//     return url;
//   }

//   navigate(url: string) {
//     return url;
//   }
// }
// class MockactivatedRoute {
//   snapshot = {
//     url: ["https://estore-02.celcom.com.my/store/enterprise/landing"]
//   };

//   data = Observable.of(null);
// }

// describe("EnterpriseLandingComponent", () => {
//   let component: EnterpriseLandingComponent;
//   let fixture: ComponentFixture<EnterpriseLandingComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         EnterpriseLandingComponent,
//         AgentFooterComponent,
//         NotificationErrorComponent,
//         PageLoaderComponent,
//         SafeHtmlPipe
//       ],
//       providers: [
//         {
//           provide: Router,
//           useClass: RouterStub
//         },
//         {
//           provide: ActivatedRoute,
//           useClass: MockactivatedRoute
//         },
//         EnterpriseService,
//         UserService,
//         DeviceDataService,
//         PlanTableComparisionService,
//         AppService,
//         CommonUtilService,
//         EStoreAnalysticsService,
//         AnalyticsService,
//         RendererService,
//         SeoService,
//         DecimalPipe
//       ],
//       imports: [RouterModule, HttpClientTestingModule, MatIconModule]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(EnterpriseLandingComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it("Agent Landing Component created", () => {
//     expect(component).toBeTruthy();
//   });

//   it("should return false when isLoading is set to true", () => {
//     spyOn(component, "onPlanClick");
//     component.ngOnInit();
//     component.isLoading = true;

//     fixture.detectChanges();
//     component.onPlanClick();
//     expect(component.onPlanClick).toBeTruthy();
//     expect(component.onPlanClick).toHaveBeenCalled();
//   });

//   it("should return false when isMultiplePlans is set to true", () => {
//     spyOn(component, "onPlanClick");
//     component.ngOnInit();
//     component.isLoading = false;
//     component.isMultiplePlans = true;
//     component.showMultiplePlans = true;

//     fixture.detectChanges();
//     component.onPlanClick();
//     expect(component.onPlanClick).toHaveBeenCalled();
//   });

//   it("should return false when plansError is set to true", () => {
//     spyOn(component, "onPlanClick");
//     component.ngOnInit();
//     component.isLoading = false;
//     component.isMultiplePlans = false;
//     component.plansError = true;

//     fixture.detectChanges();
//     component.onPlanClick();
//     expect(component.onPlanClick).toHaveBeenCalled();
//   });

//   it("should navigate when plansError is set to false", () => {
//     spyOn(component, "onPlanClick");

//     component.ngOnInit();
//     fixture.detectChanges();

//     component.isLoading = false;
//     component.isMultiplePlans = false;
//     component.plansError = false;

//     component.onPlanClick();
//     expect(component.onPlanClick).toHaveBeenCalled();
//   });

//   // it("should redirect to valid Enterprise login page url", () => {
//   //   let router = TestBed.get(Router);
//   //   let spy = spyOn(router, "navigate");
//   //   component.redirectToLoginPage();
//   //   expect(spy).toHaveBeenCalledWith(["/store/enterprise/login"]);
//   // });
// });
