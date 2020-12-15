import { TestBed, inject } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../../../Service/app.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CatalogueService } from './catalogue.service';

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

describe('CatalogueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogueService, CookieService, AppService, HttpClient, HttpHandler]
    });
  });

  it('CatalogueService should be created', inject([CatalogueService], (service: CatalogueService) => {
    expect(service).toBeTruthy();
  }));
});
