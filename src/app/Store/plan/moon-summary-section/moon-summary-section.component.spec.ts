import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MoonSummarySectionComponent } from './moon-summary-section.component';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { configureTestSuite } from 'ng-bullet';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoonSummarySectionComponent', () => {
  let component: MoonSummarySectionComponent;
  let fixture: ComponentFixture<MoonSummarySectionComponent>;

  const basePlanMoonData = {
    bundleName: "Xp Lite",
    bundleSku: "xp-lite",
    image_url: "/media/catalog/product/",
    contract: null,
    data_limit: "2",
    device_allowed: null,
    key_figures_text: "2 GB",
    key_text: "RM 20",
    monthly_plan: "20.0000",
    name: "XP Lite Plan",
    offer: "20 Cents/Min Calls and SMS To All Networks",
    order_plan_bundle: "OTC12828",
    plan_name: "XP Lite Plan",
    plan_subtitle: null,
    plan_title: "Base Plan",
    product_text: null,
    product_type: null,
    segment: null,
    sku: "xp-b-plan",
    upfront_installment: null,
    url_key: ""
  };

  const addOnPassData = {
    dataLimit: "10",
    deviceAllowed: "1",
    key_figures_text: "10 GB",
    key_text: "RM 40",
    monthlyPay: "40.0000",
    name: "XP L Pass",
    sku: "xp-l-pass",
    totalPay: "60",
  };

  const selectedDeviceInfo = {
    devicePrice: "130",
    imagePath: "/media/catalog/product/9/0/900x900_8_3.png",
    name: "iPhone 8",
    price: "3394.0000",
    sku: "i8gld64GB",
    totalPrice: "NaN",
    upfrontPrice: "550",
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [MoonSummarySectionComponent],
      providers: [DeviceDataService],
      imports: [
        HttpClientTestingModule,
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoonSummarySectionComponent);
    component = fixture.componentInstance;
    component.summaryBasePlanMoon = basePlanMoonData;
    component.summaryAddOnPass = addOnPassData;
    component.summarySelectedDeviceInfo = selectedDeviceInfo;
    component.summaryColor = "Gold";
    component.summaryStorage = "64GB";
    component.summaryPhoneNo = "0136229368";
  });

  it('should create moon summary component', () => {
    expect(component).toBeTruthy();
  });
  // Bundle Test cases.
  it('should retrun image path of bundle', () => {
    spyOn(component, 'getItemType');
    expect(component.getImage()).toBe("/media/catalog/product/9/0/900x900_8_3.png");
  });
  /*it('should retrun upfront price of bundle', () => {
  spyOn(component, 'getItemType');
  expect(component.getItemUpfrontPrice()).toBe('550');
  });*/
  it('should retrun total price of bundle', () => {
    spyOn(component, 'getItemType');
    expect(component.getItemTotalPrice()).toBe(680);
  });

  it('should retrun cart item type for bundle', () => {
    // spyOn(component, 'getItemType');
    expect(component.getItemType()).toBe("bundle");
  });

  // Plan Test cases.
  it('should retrun image path of plan', () => {
    component.summarySelectedDeviceInfo = null;
    spyOn(component, 'getItemType');
    expect(component.getImage()).toBe("");
  });
  /*xit('should retrun upfront price of plan', () => {
  component.summarySelectedDeviceInfo = null;
  spyOn(component, 'getItemType');
  spyOn(component, 'getMonthlyPrice');
  expect(component.getMonthlyPrice).toBe(60);
  });
  xit('should retrun total price of plan', () => {
  component.summarySelectedDeviceInfo = null;
  spyOn(component, 'getItemType');
  spyOn(component, 'getMonthlyPrice');
  expect(component.getMonthlyPrice).toBe(60);
  });*/
  // Common test cases for plan only and bundle

  it('should retrun cart item type for plan', () => {
    component.summarySelectedDeviceInfo = null;
    expect(component.getItemType()).toBe("plan");
  });

  it('should retrun monthly price', () => {
    expect(component.getPrice('monthly')).toBe(60);
  });

  it('should test ngOnInit', inject([DeviceDataService], (deviceDataService: DeviceDataService) => {
    component.ngOnInit();
    deviceDataService.publishdeviceUpfrontPenalty(0);
    deviceDataService.publishBasePlanMoon(basePlanMoonData);
    deviceDataService.publishSelectedAddonPassDetails(addOnPassData);
    deviceDataService.publishMoonSelectedProductDetails(selectedDeviceInfo);
    deviceDataService.publishColor("Coral");
    deviceDataService.publishStorage("128GB");
    deviceDataService.publishPhoneNo("0136229368");
    expect(component.deviceUpfrontPenalty).toEqual(0);
    expect(component.summaryColor).toBe("Coral");
    expect(component.summaryStorage).toBe("128GB");
    expect(component.summaryPhoneNo).toBe("0136229368");
  }));
});
