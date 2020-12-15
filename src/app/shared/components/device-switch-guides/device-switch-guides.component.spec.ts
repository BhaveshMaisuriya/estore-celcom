import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSwitchGuidesComponent } from './device-switch-guides.component';

describe('DeviceSwitchGuidesComponent', () => {
  let component: DeviceSwitchGuidesComponent;
  let fixture: ComponentFixture<DeviceSwitchGuidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceSwitchGuidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSwitchGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
