import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceColorStoragePickerComponent } from './device-color-storage-picker.component';

describe('DeviceColorStoragePickerComponent', () => {
  let component: DeviceColorStoragePickerComponent;
  let fixture: ComponentFixture<DeviceColorStoragePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceColorStoragePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceColorStoragePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
