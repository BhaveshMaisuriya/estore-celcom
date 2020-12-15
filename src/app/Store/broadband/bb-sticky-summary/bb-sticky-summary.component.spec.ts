import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';

import { BbStickySummaryComponent } from './bb-sticky-summary.component';
import { CartService } from '../../../Service/cart.service';
import { BundleService } from '../../../Service/bundle.service';
import { BroadbandService } from '../../../Service/broadband.service';
import { BbDeviceDetailsService } from '../bb-device-details/bb-device-details.service';
import { AppService } from '../../../Service/app.service';
import { UserService } from '../../../Service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppMockService } from '../../../Service/appmock.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationErrorComponent } from '../../widget/notification-error/notification-error.component';
import { CookieService } from 'ngx-cookie-service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { DeviceDetailsNumberService } from '../../../Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service';
import { of } from 'rxjs';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';


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
describe('BbStickySummaryComponent', () => {
  let component: BbStickySummaryComponent;
  let fixture: ComponentFixture<BbStickySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbStickySummaryComponent, NotificationErrorComponent, SafeHtmlPipe ],
      providers: [{ provide: AppService, useClass: AppMockService }, { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: MockactivatedRoute }, EStoreAnalysticsService, AnalyticsService, RendererService,
         DeviceDataService,
         SeoService, DecimalPipe, CommonUtilService, CartService, BundleService, BroadbandService, BbDeviceDetailsService, AppService,
          UserService, CookieService, DeviceDetailsNumberService,],
      imports: [HttpClientTestingModule, BrowserDynamicTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbStickySummaryComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
});

// ! No expect found here
// fit('should call function ngOnInit', inject([DeviceDataService], (service: DeviceDataService) => {
//   spyOn(component, "ngOnInit");
//   spyOn(service, "publishErrorNotificationBoolean");
//   component.ngOnInit();
//   service.publishErrorNotificationBoolean(true);
// }));
it("set step function with 0", () => {
  spyOn(component, "onAnchorClick");
  component.step = 1;
  component.setStep(0);
  expect(component.step).toBe(2);
  expect(component.onAnchorClick).toHaveBeenCalledWith(2);
});
it("set step function with 1", () => {
  spyOn(component, "onAnchorClick");
  component.step = 1;
  component.setStep(1);
  expect(component.step).toBe(1);
  expect(component.onAnchorClick).toHaveBeenCalledWith(1);
});
it("should call function onAnchorClick with 1", () => {
  component.onAnchorClick(1);
  expect(component.isStep1Active).toBe(true);
  expect(component.isStep2Active).toBe(false);
  expect(component.isStep3Active).toBe(false);
  expect(component.isStep4Active).toBe(false);
});
it("should call function onAnchorClick with 2", () => {
  component.onAnchorClick(2);
  expect(component.isStep1Active).toBe(false);
  expect(component.isStep2Active).toBe(true);
  expect(component.isStep3Active).toBe(false);
  expect(component.isStep4Active).toBe(false);
});
it("should call function onAnchorClick with 3", () => {
  component.onAnchorClick(3);
  expect(component.isStep1Active).toBe(false);
  expect(component.isStep2Active).toBe(false);
  expect(component.isStep3Active).toBe(true);
  expect(component.isStep4Active).toBe(false);
});
it("should call function onAnchorClick with 4", () => {
  component.onAnchorClick(4);
  expect(component.isStep1Active).toBe(false);
  expect(component.isStep2Active).toBe(false);
  expect(component.isStep3Active).toBe(false);
  expect(component.isStep4Active).toBe(true);
});
it("should call function errorBlock", () => {
  component.errorBlock();
  const errorToasterData = {
    "content": "Sorry for the inconvenience, we're giving our system a little update. Please try again later."
  };
  expect(component.showErrorToaster).toBeTruthy();
  expect(component.errorToasterData).toEqual(errorToasterData);
});
it("should call function infoBlock", () => {
  component.infoBlock();
  const errorToasterData = {
    "content": "Note: You can only add another item after you have checked out with your existing items in the cart.",
    "color": "7D7D7D"
  };
  expect(component.showErrorToaster).toBeTruthy();
  expect(component.errorToasterData).toEqual(errorToasterData);
});
it("should test ngOnInit function", inject([DeviceDataService],(service:DeviceDataService) => {
  sessionStorage.setItem('hw_validated_id',JSON.stringify('test'));
  component.ngOnInit();
  service.publishAddToCartDisabling(true);
  service.publishOutOfStock("In Stock");
  sessionStorage.removeItem('hw_validated_id');
  expect(component.disableCartButton).toBeTruthy();
  expect(component.inStock).toBeTruthy();
}));
it("should test ngOnInit function with out of stock", inject([DeviceDataService],(service:DeviceDataService) => {
  component.ngOnInit();
  service.publishOutOfStock("out of stock");
  expect(component.inStock).toBeFalsy();
}));
it("should test ngOnInit function with out of stock", inject([DeviceDataService],(service:DeviceDataService) => {
  localStorage.setItem('homeWirelessEditData',JSON.stringify('test'));
  component.ngOnInit();
  service.publishDevicePrice(1000);
  service.publishNumberReservationId("test1234");
  service.publishHwValidatedId("test");
  service.publishIsGoldenNo(true);
  // service.publishUpdateStep(4);
  expect(component.orderDevicePrice).toBe(1000);
  expect(component.reservationId).toBe('test1234');
  expect(component.hwValidatedId ).toBe('test');
  expect(component.isGoldenNumberSelected).toBe(true);
  localStorage.removeItem('homeWirelessEditData');
}));
it("should test addToCartButtonDisable function", inject([DeviceDataService],(service:DeviceDataService) => {
  component.ngOnInit();
  let result = component.addToCartButtonDisable();
  expect(result).toBeTruthy();
}));
it("should test addToCartButtonDisable function with return false", inject([DeviceDataService],(service:DeviceDataService) => {
  component.orderDeviceName = 'test';
  component.orderSummaryColor = 'testcolor';
  component.orderPlanName  = 'testplan';
  component.orderNumberType  = 'testnumberType';
  component.orderPhoneNo  = 'testphone';
  component.inStock = true;
  // component.ngOnInit();
  let result = component.addToCartButtonDisable();
  expect(result).toBeFalsy();
}));
it("should test clickedAddToCart function", inject([DeviceDataService],(service:DeviceDataService) => {
  component.orderDeviceName = 'test';
  component.orderSummaryColor = 'testcolor';
  component.orderPlanName  = 'testplan';
  component.orderNumberType  = 'testnumberType';
  component.orderPhoneNo  = 'testphone';
  component.inStock = true;
  // component.ngOnInit();
  let result = component.addToCartButtonDisable();
  expect(result).toBeFalsy();
}));
});
