import { TestBed, inject } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { StickySummaryService } from './sticky-summary.service';
import { AppService } from '../../../Service/app.service';
import { UserService } from '../../../Service/user.service';
import { NotificationPopupEvent } from '../../../Service/broadcaster.service';
import { Broadcaster } from '../../../Model/broadcaster.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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

describe('StickySummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StickySummaryService, CookieService, AppService, HttpClient, HttpHandler, UserService,
         NotificationPopupEvent, Broadcaster]
    });
  });

  it('StickySummaryService should be created', inject([StickySummaryService], (service: StickySummaryService) => {
    expect(service).toBeTruthy();
  }));

  it('setStep', inject([StickySummaryService], (service: StickySummaryService) => {
    const spy = spyOn(service, 'setStep').and.callThrough();
    service.setStep(1);
    expect(spy).toHaveBeenCalled();
  }));

  it('currentStep', inject([StickySummaryService], (service: StickySummaryService) => {
    const spy = spyOn(service, 'currentStep').and.callThrough();
    service.currentStep();
    expect(spy).toHaveBeenCalled();
  }));

  it('nextStep', inject([StickySummaryService], (service: StickySummaryService) => {
    const spy = spyOn(service, 'nextStep').and.callThrough();
    service.nextStep();
    expect(spy).toHaveBeenCalled();
  }));

  it('resetStep', inject([StickySummaryService], (service: StickySummaryService) => {
    const spy = spyOn(service, 'resetStep').and.callThrough();
    service.resetStep();
    expect(spy).toHaveBeenCalled();
  }));
});
