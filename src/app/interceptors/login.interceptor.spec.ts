import { TestBed } from '@angular/core/testing';

import { LoginInterceptor } from './login.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('LoginInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      HttpClient,
      LoginInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoginInterceptor = TestBed.inject(LoginInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
