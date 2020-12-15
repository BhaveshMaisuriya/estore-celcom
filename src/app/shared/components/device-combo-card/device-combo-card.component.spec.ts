import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceComboCardComponent } from './device-combo-card.component';
import { RouterTestingModule } from "@angular/router/testing";
import { materialModules } from 'app/shared/shared-module.module';
import { IconModule } from 'app/shared/icon.module';
import { EstoreButtonMenuComponent } from '../estore-button-menu/estore-button-menu.component';
import { sharedPipes } from 'app/shared/pipes';


describe('DeviceComboCardComponent', () => {
  let component: DeviceComboCardComponent;
  let fixture: ComponentFixture<DeviceComboCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        materialModules,
        IconModule,
      ],
      declarations: [
        sharedPipes,
        DeviceComboCardComponent,
        EstoreButtonMenuComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceComboCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
