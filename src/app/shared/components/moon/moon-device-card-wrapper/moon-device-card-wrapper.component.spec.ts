import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCardComponent } from '../../plan-card/plan-card.component';
import { PageLoaderComponent } from '../../page-loader/page-loader.component';
import { MoonDeviceCardWrapperComponent } from './moon-device-card-wrapper.component';
import { sharedPipes } from 'app/shared/pipes';
import { NguCarouselModule } from '@ngu/carousel';
import { MoonDeviceCardComponent } from '../moon-device-card/moon-device-card.component';
import { configureTestSuite } from 'ng-bullet';
import { materialModules } from 'app/shared/shared-module.module';
import { DeviceColorStoragePickerComponent } from '../../device-color-storage-picker/device-color-storage-picker.component';
import * as xplite from 'app/json/xp-lite.json';

describe('MoonDeviceCardWrapperComponent', () => {
  let component: MoonDeviceCardWrapperComponent;
  let fixture: ComponentFixture<MoonDeviceCardWrapperComponent>;

  configureTestSuite((() => {
    TestBed.configureTestingModule({
      declarations: [
        MoonDeviceCardWrapperComponent,
        MoonDeviceCardComponent,
        PlanCardComponent,
        PageLoaderComponent,
        DeviceColorStoragePickerComponent,
        sharedPipes,
      ],
      imports: [
        materialModules,
        NguCarouselModule,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoonDeviceCardWrapperComponent);
    component = fixture.componentInstance;
    component.data = <any>xplite[0].pass_plan[0].associated_bundle_product;
    component.isLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
