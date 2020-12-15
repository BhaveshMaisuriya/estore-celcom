import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { sharedPipes } from 'app/shared/pipes';
import { GuestCheckoutService } from 'app/Store/guest-checkout/services/guest-checkout.service';
import { NotificationErrorComponent } from 'app/Store/widget/notification-error/notification-error.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SideSummaryComponent } from './side-summary.component';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}
class MockactivatedRoute {
  snapshot(url: string) {
    return url;
  }
}

describe('SideSummaryComponent', () => {
  let component: SideSummaryComponent;
  let fixture: ComponentFixture<SideSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideSummaryComponent, NotificationErrorComponent, sharedPipes ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        PerfectScrollbarModule,
        HttpClientTestingModule],
      providers:[{ provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: MockactivatedRoute },
        DeviceDataService,GuestCheckoutService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('SideSummary component created', () => {
    expect(component).toBeTruthy();
  });

  it('getNumberLabel', () => {
    const spy = spyOn(component,'getNumberLabel').and.callThrough();
    component.getNumberLabel('test', false);

    component.isBroadband = true;
    component.getNumberLabel('test', false);
    
    component.isPrepaid = true;
    component.getNumberLabel('test', true);
    
    component.isFamilyPlan = true;
    component.getNumberLabel('test', false);
    
    expect(component).toBeTruthy();
  });

  it('onCheckoutBtnClicked', () => {
    const spy = spyOn(component,'onCheckoutBtnClicked').and.callThrough();
    component.isPrepaid = false;
    component.isBrowser = true;
    sessionStorage.setItem('prepaiduser', 'true');
    component.onCheckoutBtnClicked();

    component.isPrepaid = true;
    component.isBrowser = true;
    component.onCheckoutBtnClicked();

    component.isBrowser = false;
    component.onCheckoutBtnClicked();

    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const spy = spyOn(component,'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('ngOnDestroy', () => {
    const spy = spyOn(component,'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(component).toBeTruthy();
  });

  it('toggleExpand', () => {
    const spy = spyOn(component,'toggleExpand').and.callThrough();
    component.toggleExpand();
    expect(component).toBeTruthy();
  });  

  it('planZeroUpfront', () => {
    component.isPlanOnly = true;
    component.isLegacyPlan = true;
    sessionStorage.setItem("USER_TYPE", 'ENTERPRISE');
    sessionStorage.setItem("GuestInfo", 'Test');
    component.planZeroUpfront;

    component.isPrepaid = true;
    component.mvivaCampaign = {
      desktop_content: 'test',
      mobile_content: 'test',
      device_bundle: 'test',
      easyphone: 'test',
      targeted_plan: ['test'],
      no_upfront_payment: true,
      related_campaigns: 'test',
      purchase_type: ['test'],
      is_moon_campaign: 'test',
      summary_message: 'test',
      optional_easyphone_auto_billing: 'test',
      can_buy_supplementary_lines : "0"};
      expect(component).toBeTruthy();
  });  

  it('getSuppMonthlyPrice', () => {
    const spy = spyOn(component,'getSuppMonthlyPrice').and.callThrough();
    const val = [{
      planPhoneNumber: 'test',
      planPrice: '10',
      planType: 'test',
      partNumber: '123'
    }, {
      planPhoneNumber: 'test 1',
      planPrice: '10',
      planType: 'test',
      partNumber: '123'
    }];

    component.getSuppMonthlyPrice(val);
    component.getSuppMonthlyPrice(val, true);
    expect(component).toBeTruthy();
  });  

  it('onResize', () => {
    const spy = spyOn(component,'onResize').and.callThrough();
    component.isBrowser = true;
    component.onResize({keyCode:8, which:0});
    
    component.isBrowser = false;
    component.onResize({keyCode:8, which:0});
    expect(component).toBeTruthy();
  });  
});
