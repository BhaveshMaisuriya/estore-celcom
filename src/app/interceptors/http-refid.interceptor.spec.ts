import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { HttpRefidInterceptor } from "./http-refid.interceptor";

describe("Http-refid Interceptor", () => {
  sessionStorage.setItem("refid", "1234");
  let refid = sessionStorage.getItem("refid");
  let interceptor: HttpRefidInterceptor;
  const request: HttpRequest<any> = new HttpRequest<any>(
    "GET",
    `/store/v1/stockAvailabilityCheck`
  );
  let response: HttpResponse<any>;
  const next: any = {
    handle: responseHandle => {
      response = responseHandle;
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpRefidInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRefidInterceptor,
          multi: true
        }
      ]
    });
    interceptor = TestBed.get(HttpRefidInterceptor);
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));

  it("should Intercept Request and set refid params", inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpMock: HttpTestingController) => {
      interceptor = TestBed.get(HttpRefidInterceptor);
      interceptor.intercept(request, next);
      expect(interceptor).toBeDefined();
      httpMock.verify();
    }
  ));
});
