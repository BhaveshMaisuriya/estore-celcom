import { TestBed, inject } from '@angular/core/testing';

import { AppService } from './app.service';
import { AppMockService } from './appmock.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { CommonUtilService } from './commonUtil.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

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

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        // HttpClient,
        { provide: AppService, useClass: AppMockService }, { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useClass: MockactivatedRoute
        }, AuthGuardService, UserService, CommonUtilService]
    });
  });

  it('AuthGuardService should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
