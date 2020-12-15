import { TestBed, inject } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DeviceDetailsSummaryService } from './device-details-summary-section.service';
import { AppService } from '../../../../Service/app.service';

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

describe('DeviceDetailsSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDetailsSummaryService, CookieService, AppService, HttpClient, HttpHandler]
    });
  });

  it('DeviceDetailsSummaryService should be created', inject([DeviceDetailsSummaryService], (service: DeviceDetailsSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
