import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { CsagentCampaignDetailsComponent } from './csagent-campaign-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CsAgentCampaignDetailsService } from './csagent-campaign-details.service';
import { UserService } from '../../Service/user.service';
import { AgeEligibilityPopupComponent } from '../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { DeviceDetailsService } from '../device/device-details/device-details.service';
import { AppService } from '../../Service/app.service';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { CommonUtilService } from '../../Service/commonUtil.service';
import { AgentFooterComponent } from '../../Footer/agent-footer/agent-footer.component';
import { PageLoaderComponent } from '../../shared/components/page-loader/page-loader.component';
import { DeviceDataService } from '../../Service/devicedata.service';
import { NotificationErrorComponent } from '../widget/notification-error/notification-error.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

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

class DeviceDetailsMockService {
  constructor() { }

  Find(url: string) {
    if (url === '/rest/V1/csAgentClmCampaignList/test') {
      return Observable.of({ status: true, response: 'Success' });
    } else {
      return Observable.of({});
    }
  }
}

describe('CsagentCampaignDetailsComponent', () => {
  let component: CsagentCampaignDetailsComponent;
  let fixture: ComponentFixture<CsagentCampaignDetailsComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [sharedPipes, CsagentCampaignDetailsComponent, AgeEligibilityPopupComponent, AgentFooterComponent,
        PageLoaderComponent, NotificationErrorComponent],
      providers: [{ provide: ActivatedRoute, useClass: MockactivatedRoute },
      { provide: Router, useClass: RouterStub },
      { provide: DeviceDetailsService, useClass: DeviceDetailsMockService },
        DeviceDataService, CsAgentCampaignDetailsService,
        UserService, AppService, HttpClient, HttpHandler, CommonUtilService],
      imports: [
        HttpClientTestingModule,
        IconModule,
        materialModules,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsagentCampaignDetailsComponent);
    component = fixture.componentInstance;
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    component.errorMessage = {};
    component.isDisplayErrorPopup = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onInit', () => {
    const spy = spyOn(component, "ngOnInit").and.callThrough();
    Object.defineProperty(activatedRoute, "params", {
      value: Observable.of({ 'campaignType': 'test' })
    });
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call getCampaignDetailsFromAPI', () => {
    const spy = spyOn(component, "getCampaignDetailsFromAPI").and.callThrough();
    component.getCampaignDetailsFromAPI('test');
    expect(spy).toHaveBeenCalled();
  });

  it('should call getCampaignDetailsFromAPI error', inject([DeviceDetailsService], (deviceDetailsService: DeviceDetailsService) => {
    spyOn(deviceDetailsService, "Find").and.returnValue(Observable.throw('error'));
    component.getCampaignDetailsFromAPI('test');
    expect(deviceDetailsService.Find).toHaveBeenCalled();
  }));

  it('should call onAPIError', inject([DeviceDataService], (deviceDataService: DeviceDataService) => {
    const spy = spyOn(component, "onAPIError").and.callThrough();
    component.onAPIError();
    expect(component.isDisplayErrorPopup).toBeTruthy();
    expect(component.errorMessage).toBeDefined();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call OnContinue', () => {
    const spy = spyOn(component, "OnContinue");
    component.OnContinue();
    expect(spy).toHaveBeenCalled();
  });
});
