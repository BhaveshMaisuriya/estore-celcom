import { TestBed, inject } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppService } from '../../../Service/app.service';
import { UserService } from '../../../Service/user.service';
import { NotificationPopupEvent } from '../../../Service/broadcaster.service';
import { Broadcaster } from '../../../Model/broadcaster.model';
import { OrderTrackingService } from './order-tracking.service';
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

describe('OrderTrackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderTrackingService, CookieService, AppService, HttpClient, HttpHandler, UserService,
         NotificationPopupEvent, Broadcaster]
    });
  });

  it('OrderTrackingService should be created', inject([OrderTrackingService], (service: OrderTrackingService) => {
    expect(service).toBeTruthy();
  }));
});
