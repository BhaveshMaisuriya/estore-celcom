import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsService } from 'app/Service/analytic.service';
import { AppService } from 'app/Service/app.service';
import { BroadbandService } from 'app/Service/broadband.service';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { RendererService } from 'app/Service/renderer.service';
import { EStoreAnalysticsService } from 'app/Service/store.analytic.service';
import { UserService } from 'app/Service/user.service';
import { DeviceDetailsNumberService } from 'app/Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service';
import { CookieService } from 'ngx-cookie-service';
import { BbDeviceDetailsService } from '../bb-device-details/bb-device-details.service';
import { BbSummarySectionComponent } from './bb-summary-section.component';

describe('BbSummarySectionComponent', () => {
  let component: BbSummarySectionComponent;
  let fixture: ComponentFixture<BbSummarySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BbSummarySectionComponent],
      providers: [EStoreAnalysticsService, AnalyticsService, RendererService,
        DeviceDataService, BroadbandService, BbDeviceDetailsService, AppService,
        UserService, CookieService, DeviceDetailsNumberService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbSummarySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
