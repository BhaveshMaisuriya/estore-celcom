import { TestBed, inject } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppService } from '../../../Service/app.service';
import { HeroBannerClickableService } from './hero-banner-clickable.service';

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

describe('HeroBannerClickableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroBannerClickableService, CookieService, AppService, HttpClient, HttpHandler]
    });
  });

  it('HeroBannerClickableService should be created', inject([HeroBannerClickableService], (service: HeroBannerClickableService) => {
    expect(service).toBeTruthy();
  }));
});
