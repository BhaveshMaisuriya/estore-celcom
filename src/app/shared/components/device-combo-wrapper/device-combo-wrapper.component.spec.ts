import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceDetailPageService } from 'app/pages/device-detail-page/device-detail-page.service';
import { PlansService } from 'app/Service/plans.service';

import { DeviceComboWrapperComponent } from './device-combo-wrapper.component';
import { DeviceCarouselComponent } from '../device-carousel/device-carousel.component';
import { DeviceColorStoragePickerComponent } from '../device-color-storage-picker/device-color-storage-picker.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { materialModules } from "app/shared/shared-module.module";
import { sharedPipes } from "app/shared/pipes";
import { NguCarouselModule } from '@ngu/carousel';
import { CardOptionsComponent } from '../card-options/card-options.component';


describe('DeviceComboWrapperComponent', () => {
  let component: DeviceComboWrapperComponent;
  let fixture: ComponentFixture<DeviceComboWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDetailPageService, PlansService],
      declarations: [
        DeviceComboWrapperComponent, 
        DeviceCarouselComponent,
        DeviceColorStoragePickerComponent,
        sharedPipes,
        CardOptionsComponent,
      ],
      imports: [
        HttpClientTestingModule,
        materialModules,
        NguCarouselModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceComboWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
