import { TestBed, inject } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppService } from './app.service';
import { SessionTimeOutService } from './sessiontimeout.service';
import { UserService } from './user.service';
import { NotificationPopupEvent } from './broadcaster.service';
import { Broadcaster } from '../Model/broadcaster.model';
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

describe('SessionTimeOutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionTimeOutService, CookieService, AppService, HttpClient, HttpHandler, UserService,
         NotificationPopupEvent, Broadcaster, CommonUtilService]
    });
  });

  it('SessionTimeOutService should be created', inject([SessionTimeOutService], (service: SessionTimeOutService) => {
    expect(service).toBeTruthy();
  }));
});
