import { TestBed, inject } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TableComparisionService } from './table-comparison.service';
import { AppService } from '../../Service/app.service';
import { UserService } from '../../Service/user.service';
import { Broadcaster } from '../../Model/broadcaster.model';
import { NotificationPopupEvent } from '../../Service/broadcaster.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppMockService } from 'app/Service/appmock.service';

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

describe('TableComparisionService', () => {
  let service: TableComparisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TableComparisionService, CookieService, HttpClient, HttpHandler, UserService,
         NotificationPopupEvent, Broadcaster,
         { provide: AppService, useClass: AppMockService }]
    });
    service = TestBed.get(TableComparisionService);
  });

  it('TableComparisionService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Find', done => {
    service.Find('/freeContent').subscribe(res => {
      expect(res).toBeTruthy();
      done();
    });
  });
});
