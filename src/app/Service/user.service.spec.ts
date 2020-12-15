import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { AppService } from './app.service';
import { CommonUtilService } from './commonUtil.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, AppService, CommonUtilService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
