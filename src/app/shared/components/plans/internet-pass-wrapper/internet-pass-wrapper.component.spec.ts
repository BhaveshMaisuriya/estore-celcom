import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { InternetPassWrapperComponent } from './internet-pass-wrapper.component';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

const pass = [
  {
    name: "10GB pass",
    sku: "10gb-pass",
    is_default: 'true',
    price: "20RM",
    key_text: "20RM",
    offer: "offer details",
    category_tab: "Monthly",
    promotion_badge: {
      promotion_badge_text: "test",
      promotion_badge_text_color: "test",
      promotion_badge_background_color: "test"
    },
  }
];

describe('InternetPassWrapperComponent', () => {
  let component: InternetPassWrapperComponent;
  let fixture: ComponentFixture<InternetPassWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetPassWrapperComponent , sharedPipes],
      imports: [
        IconModule,
        materialModules,
      ],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();
}));


  beforeEach(() => {
    fixture = TestBed.createComponent(InternetPassWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call setter passes", () => {
    const spy = spyOnProperty(component, "passes", "set").and.callThrough();
    component.passes = pass;
    expect(component._passes).toEqual(pass);
    expect(spy).toHaveBeenCalled();
  });

  it("should call selectPlan and emit plan", () => {
    let spy = spyOn(component.onSelect, "emit");
    component.selectPass(pass[0].sku);
    expect(spy).toHaveBeenCalled();
  });
});
