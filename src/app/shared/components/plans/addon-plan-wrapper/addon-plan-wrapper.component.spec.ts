import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddonPlanWrapperComponent } from "./addon-plan-wrapper.component";
import { PlanCardComponent } from "../../plan-card/plan-card.component";
import { PageLoaderComponent } from "../../page-loader/page-loader.component";
import { MatIconModule } from "@angular/material/icon";
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';
const plan = [
  {
    sku: "Mega Plan",
    title: "Celcom Mega",
    price: "5000",
    image: "test",
    offers: "test",
    selected: true,
    badge: {
      promotion_badge_text: "test",
      promotion_badge_text_color: "red",
      promotion_badge_background_color: "grey"
    },
    promotion_text: "test",
    promotion_terms: "test",
    device_price: "test",
    easyphone_data: {
      base_label: "xyz",
      base_price: 1234,
      pass_price: 1234,
      phone_price: 5000
    }
  }
];

describe("AddonPlanWrapperComponent", () => {
  let component: AddonPlanWrapperComponent;
  let fixture: ComponentFixture<AddonPlanWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddonPlanWrapperComponent,
        PlanCardComponent,
        PageLoaderComponent,
        sharedPipes,
      ],
      imports: [
        IconModule,
        materialModules,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonPlanWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call selectPlan", () => {
    spyOn(component.onSelect, "emit");
    component.selectPlan("test");
    fixture.detectChanges();
    expect(component.onSelect.emit).toHaveBeenCalled();
  });

  it("should create", () => {
    const spy = spyOnProperty(component, "plans", "set").and.callThrough();
    component.plans = plan;
    expect(spy).toHaveBeenCalled();
    expect(component._plans).toEqual(plan);
  });
});
