import { TestBed, inject } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { CatalogueBannerMegaService } from './catalogue-banner-mega.service';
import { AppService } from '../../../Service/app.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

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

describe('CatalogueBannerMegaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogueBannerMegaService, CookieService, AppService, HttpClient, HttpHandler]
    });
  });

  it('CatalogueBannerMegaService should be created', inject([CatalogueBannerMegaService], (service: CatalogueBannerMegaService) => {
    expect(service).toBeTruthy();
  }));
});
