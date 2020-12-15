import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LifestyleVoucherWrapperComponent } from "./lifestyle-voucher-wrapper.component";
import { sharedPipes } from "app/shared/pipes";
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

const plan = [
  {
    sku: "Test",
    title: "Test",
    price: "1234",
    image: "Test",
    offers: "Test",
    selected: true,
    badge: {
      promotion_badge_text: "test",
      promotion_badge_text_color: "test",
      promotion_badge_background_color: "test"
    },
    promotion_text: "Test",
    promotion_terms: "Test",
    device_price: "1234",
    lifestylevoucher: true,
    selected_lifestylecontract: "Test",
    selected_lifestylevoucher: true
  }
];

describe("LifestyleVoucherWrapperComponent", () => {
  let component: LifestyleVoucherWrapperComponent;
  let fixture: ComponentFixture<LifestyleVoucherWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LifestyleVoucherWrapperComponent, sharedPipes],
      imports: [
        IconModule,
        materialModules,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifestyleVoucherWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call selectPlan and emit plan", () => {
    let spy = spyOn(component.onSelect, "emit");
    component.selectPlan(plan[0]);
    expect(spy).toHaveBeenCalled();
  });

  it("should call setter plans", () => {
    const spy = spyOnProperty(component, "plans", "set").and.callThrough();
    component.plans = plan;
    expect(component._plans).toEqual(plan);
    expect(spy).toHaveBeenCalled();
  });
});
