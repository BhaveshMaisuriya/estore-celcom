import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbDeviceNamePriceComponent } from './bb-device-name-price.component';

describe('BbDeviceNamePriceComponent', () => {
  let component: BbDeviceNamePriceComponent;
  let fixture: ComponentFixture<BbDeviceNamePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbDeviceNamePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbDeviceNamePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should define BbDeviceNamePriceComponent to be truthy', () => {
    expect(component).toBeTruthy();
  });
  it('expect bbBundleBasicDetails to be null', () => {
    expect(component.bbBundleBasicDetails).toBeNull();
  });
});
