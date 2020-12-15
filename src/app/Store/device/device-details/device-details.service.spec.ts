import { TestBed, inject } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DeviceDetailsService } from './device-details.service';
import { AppService } from '../../../Service/app.service';

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

describe('DeviceDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceDetailsService, CookieService, AppService, HttpClient, HttpHandler]
    });
  });

  it('DeviceDetailsService should be created', inject([DeviceDetailsService], (service: DeviceDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
