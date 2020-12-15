import { fakeAsync, TestBed } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { AppService } from './app.service';
import { RoutesService } from './routes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RoutesService', () => {
  let service: RoutesService;
  let appService: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoutesService, CookieService, AppService]
    });

    appService = TestBed.get(AppService);
    httpMock = TestBed.get(HttpTestingController);

    service = new RoutesService(appService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should call find', fakeAsync(() => {
  //   service.Find().subscribe(response => { expect(response).toBeDefined(); });
  //   const req = httpMock.expectOne(
  //     service.API_URL_CONST.ALIAS_API_URL
  //   );
  //   expect(req.request.method).toBe('GET');

  // }));

  // it('should call FindAdobeFromDB', fakeAsync(() => {
  //   service.FindAdobeFromDB().subscribe(response => { expect(response).toBeDefined(); });
  //   const req = httpMock.expectOne('/getAdobeUrl');
  //   expect(req.request.method).toBe('GET');
  // }));
});
