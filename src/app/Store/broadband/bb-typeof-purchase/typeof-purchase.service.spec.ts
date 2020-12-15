import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'app/Service/app.service';
import { AppMockService } from 'app/Service/appmock.service';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { TypeofPurchaseService } from './typeof-purchase.service';

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

describe('TypeofPurchaseService', () => {
  let service: TypeofPurchaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AppService, useClass: AppMockService }, { provide: Router, useClass: RouterStub },
      {
        provide: ActivatedRoute,
        useClass: MockactivatedRoute
      }, TypeofPurchaseService, DeviceDataService]
    });

    service = TestBed.get(TypeofPurchaseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Find', fakeAsync(() => {
    service.Find('/freeContent').subscribe(res => {
      expect(res).toBeTruthy();
    });
  }));
});
