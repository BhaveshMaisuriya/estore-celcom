import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDetailSpecsComponent } from './device-detail-specs.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DeviceDetailSpecsComponent', () => {
  let component: DeviceDetailSpecsComponent;
  let fixture: ComponentFixture<DeviceDetailSpecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule, 
        MatExpansionModule, 
        MatInputModule, 
        MatSelectModule, 
        MatButtonModule, 
        MatCheckboxModule, 
        BrowserAnimationsModule
      ],
      declarations: [ DeviceDetailSpecsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDetailSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
