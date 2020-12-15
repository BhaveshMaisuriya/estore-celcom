import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonStickySummarySectionComponent } from './moon-sticky-summary-section.component';
import { NotificationErrorComponent } from '../../widget/notification-error/notification-error.component';
import { ChooseYourWayComponent } from '../../guest-checkout/choose-your-way/choose-your-way.component';
import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../base.component';
import { CartService } from '../../../Service/cart.service';
import { UserService } from '../../../Service/user.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { BundleService } from '../../../Service/bundle.service';
import { AppService } from '../../../Service/app.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { BroadbandService } from '../../../Service/broadband.service';
import { StickySummaryComponent } from '../../../../app/Widget/StoreWidgets/device-details/sticky-summary/sticky-summary.component';
import { DeviceDetailsNumberService } from "../../../../app/Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service";
import { OrderInfoService } from '../../../Service/orderinfo.service';
import { DeviceSummaryService } from '../../../../app/Widget/StoreWidgets/device-details/services/device-summary-service.service';
import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';
import { SupplimentaryLinesService } from '../../../../app/Store/widget/supplementary-lines/supplementary-lines.service';
import { DeviceDisclaimerComponent } from '../../../Widget/StoreWidgets/device-details/device-detail-disclaimer/device-detail-disclaimer.component';
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppMockService } from '../../../Service/appmock.service';
import { CookieService } from 'ngx-cookie-service';
import { HomeService } from '../../../Service/home.service';
import { RedirectionService } from '../../../Service/redirection.service';
import { Broadcaster } from '../../../Model/broadcaster.model';
import { NotificationPopupEvent } from '../../../Service/broadcaster.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { ProductService } from "../../../Service/product.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanPurchaseService } from "./../../plan/plan-purchase/plan-purchase.service";
import { configureTestSuite } from 'ng-bullet';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}
class MockactivatedRoute {
  parent = {
    data: of([])
  };

  snapshot(url: string) {
    return url;
  }
}
describe('MoonStickySummarySectionComponent', () => {
  let component: MoonStickySummarySectionComponent;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  let fixture: ComponentFixture<MoonStickySummarySectionComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [MoonStickySummarySectionComponent, NotificationErrorComponent,
        ChooseYourWayComponent, DeviceDisclaimerComponent, AgeEligibilityPopupComponent, SafeHtmlPipe],
      providers: [CartService, BundleService, BroadbandService, AppService, UserService,
        StickySummaryComponent, DeviceDetailsNumberService, OrderInfoService, DeviceSummaryService,
        SupplimentaryLinesService, RemarketAnalyticsService, EStoreAnalysticsService,
        DeviceDataService, HttpClientTestingModule, HttpClient, HttpHandler, { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: AppService, useClass: AppMockService },
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useClass: MockactivatedRoute
        }, CookieService, HomeService, RedirectionService, Broadcaster, NotificationPopupEvent,
        CommonUtilService, AnalyticsService, RendererService, SeoService, DecimalPipe, ProductService,
        PlanPurchaseService, GetParametersService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoonStickySummarySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call setStickyTab function with 2", () => {
    spyOn(component, "onStickyTabClick");
    component.step = 1;
    component.setStickyTab(0);
    fixture.detectChanges();
    expect(component.step).toBe(2);
    expect(component.onStickyTabClick).toHaveBeenCalledWith(2);
  });
  it("should call setStickyTab function with 1", () => {
    spyOn(component, "onStickyTabClick");
    component.step = 1;
    component.setStickyTab(1);
    fixture.detectChanges();
    expect(component.step).toBe(1);
    expect(component.onStickyTabClick).toHaveBeenCalledWith(1);
  });

  it("should call onStickyTabClick function 1", () => {
    component.onStickyTabClick(1);
    fixture.detectChanges();
    expect(component.isStep1Active).toBeTruthy();
    expect(component.isStep2Active).toBeFalsy();
    expect(component.isStep3Active).toBeFalsy();
    expect(component.isStep4Active).toBeFalsy();
  });

  it("should call onStickyTabClick function 2", () => {
    component.onStickyTabClick(2);
    fixture.detectChanges();
    expect(component.isStep2Active).toBeTruthy();
    expect(component.isStep3Active).toBeFalsy();
    expect(component.isStep4Active).toBeFalsy();
    expect(component.isStep1Active).toBeFalsy();
  });
  it("should call onStickyTabClick function 3", () => {
    component.onStickyTabClick(3);
    fixture.detectChanges();
    expect(component.isStep3Active).toBeTruthy();
    expect(component.isStep4Active).toBeFalsy();
    expect(component.isStep1Active).toBeFalsy();
    expect(component.isStep2Active).toBeFalsy();
  });
  it("should call onStickyTabClick function 4", () => {
    component.onStickyTabClick(4);
    fixture.detectChanges();
    expect(component.isStep4Active).toBeTruthy();
    expect(component.isStep1Active).toBeFalsy();
    expect(component.isStep2Active).toBeFalsy();
    expect(component.isStep3Active).toBeFalsy();
  });

  it("should call scrollToSection function", () => {
    const spy = spyOn(component, 'scrollToSection').and.callThrough();
    component.scrollToSection(4);
    expect(spy).toHaveBeenCalled();
  });

  it("should call disableChooseWay function", () => {
    component.disableChooseWay();
    fixture.detectChanges();
  });

  it("should call AddItemToCart function", () => {
    const spy = spyOn(component, 'AddItemToCart').and.callThrough();

    component.orderPhoneNo = '';
    component.orderSummaryColor = '';
    component.orderTotalPay = 0;
    component.orderSummaryStorage = '';
    component.orderBasePlanMoon = { sku: "", bundleSku: "" };
    component.orderNumberType = '';
    component.mnpCheckPlanPurchase = '';
    component.moonPlanDeviceDetailsData = { lower_age_limit: 0, upper_age_limit: 100 };
    component.selectedDeviceInfoForMoon = { sku: "", bundleSku: "" };
    component.orderAddOnPassMoon = { sku: "", bundleSku: "" };
    component.orderTotalPay = 0;
    component.selectedProdForEdit = '';

    component.AddItemToCart();
    expect(spy).toHaveBeenCalled();
  });

  it("should call confirmPlanWithDeviceSelection function", () => {
    const spy = spyOn(component, 'confirmPlanWithDeviceSelection').and.callThrough();
    component.confirmPlanWithDeviceSelection();
    component.selectedDeviceInfoForMoon = { name: "test" };
    component.orderSummaryColor = 'test';
    component.orderBasePlanMoon = { name: "test" };
    component.orderNumberType = '2';
    component.orderPhoneNo = '1234546';
    component.inStock = true;

    component.confirmPlanWithDeviceSelection();
    expect(spy).toHaveBeenCalled();
  });

  it("should call confirmPlanSelection function", () => {
    const spy = spyOn(component, 'confirmPlanSelection').and.callThrough();
    component.confirmPlanSelection();
    component.mnpCheckPlanPurchase = { isEligible: true };
    component.confirmPlanSelection();
    expect(spy).toHaveBeenCalled();
  });
});
