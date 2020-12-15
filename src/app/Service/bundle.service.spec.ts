import { TestBed, inject } from '@angular/core/testing';

import { AppService } from './app.service';
import { AppMockService } from './appmock.service';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDataService } from './devicedata.service';
import { BundleService } from './bundle.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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

describe('BundleService', () => {
  let service: BundleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AppService, useClass: AppMockService }, { provide: Router, useClass: RouterStub },
      {
        provide: ActivatedRoute,
        useClass: MockactivatedRoute
      }, BundleService, UserService, DeviceDataService]
    });

    service = TestBed.get(BundleService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call BundleOrder', done => {
    service.BundleOrder({ 'test': 'data' }).subscribe(res => {
      expect(res).toBeTruthy();
      done();
    });
  });
});
