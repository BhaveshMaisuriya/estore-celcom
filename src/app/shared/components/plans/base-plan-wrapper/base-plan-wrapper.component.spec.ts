import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePlanWrapperComponent } from './base-plan-wrapper.component';
import { PlanCardComponent } from '../../plan-card/plan-card.component';
import { PageLoaderComponent } from '../../page-loader/page-loader.component';
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
  }
];

describe('BasePlanWrapperComponent', () => {
  let component: BasePlanWrapperComponent;
  let fixture: ComponentFixture<BasePlanWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        BasePlanWrapperComponent, 
        PlanCardComponent, 
        PageLoaderComponent, 
        sharedPipes,
      ],
      imports: [
        IconModule,
        materialModules,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePlanWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
