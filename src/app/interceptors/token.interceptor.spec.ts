import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import {
  HTTP_INTERCEPTORS,
  HttpClient
} from "@angular/common/http";
import { TokenInterceptor } from "./token.interceptor";
import { UserService } from "app/Service/user.service";
import { PLATFORM_ID } from "@angular/core";

const mockResponse = {
  stockAvailabilityCheckResponse: false
};

describe("Token-interceptor", () => {
  let userService: UserService;
  let isBrowser: boolean = true;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: PLATFORM_ID, useValue: true },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    });
  
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));

  // it("should call api and provide data", inject(
  //   [HttpClient, HttpTestingController],
  //   (http: HttpClient, httpMock: HttpTestingController) => {
  //     http
  //       .get("/store/v1/stockAvailabilityCheck")
  //       .subscribe(response => expect(response).toBeTruthy());
  //   }
  // ));

  // it("should provide data", inject(
  //   [HttpClient, HttpTestingController],
  //   (http: HttpClient, backend: HttpTestingController) => {
  //     http.get("/store/v1/stockAvailabilityCheck").subscribe(res => {
  //       expect(res).not.toBe(null);
  //       expect(JSON.stringify(res)).toContain(JSON.stringify(mockResponse));
  //     });
  //   }
  // ));

  // it("should create UserService Instance", inject(
  //   [HttpClient, HttpTestingController],
  //   (http: HttpClient, httpMock: HttpTestingController)  => {
  //   userService = TestBed.get(UserService);
  //   expect(userService).toBeTruthy();
    
  //   http.get("/store/v1/test").subscribe(res => {
  //     expect(res).not.toBe(null);
  //   });
  //   const isEnterprise = true;
  //   const req = httpMock.expectOne('/store/v1/test')
  //   //expect(userService.isUserEnterprise).toHaveBeenCalled();
  //   req.flush({ status: 401, statusText: 'Unauthorized' });
  //   httpMock.verify();
  // }));
});
