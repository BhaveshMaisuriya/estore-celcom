import { TestBed, inject } from '@angular/core/testing';

import { AppService } from './app.service';
import { AppMockService } from './appmock.service';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDataService } from './devicedata.service';
import { BundleService } from './bundle.service';
import { CartService } from './cart.service';
import { BroadbandService } from './broadband.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonUtilService } from './commonUtil.service';
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

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AppService, useClass: AppMockService }, { provide: Router, useClass: RouterStub },
      {
        provide: ActivatedRoute,
        useClass: MockactivatedRoute
      }, CartService, UserService, DeviceDataService, BroadbandService, CookieService,
        CommonUtilService,
      ]
    });

    service = TestBed.get(CartService);
  });

  it('CartService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Find', done => {
    service.Find('/freeContent').subscribe(res => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('should call FindService', done => {
    service.FindService('/freeContent').subscribe(res => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('should call PostData', () => {
    spyOn(service, 'PostData');
    service.PostData('/freeContent');
    expect(service.PostData).toHaveBeenCalled();
  });
});
