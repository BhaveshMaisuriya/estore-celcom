import { GlobalErrorHandler } from "./error.interceptor";
import { of, throwError} from "rxjs";
import { AnalyticsService } from "../Service/analytic.service";
import { PLATFORM_ID } from "@angular/core";
import { HttpResponse } from "@angular/common/http";

describe("ErrorInterceptor", () => {
  let errorInterceptor;
  let analyticsServiceSpy: AnalyticsService;
  const errorRes = new HttpResponse({
    body: { message: "test-error" }
  });
  const successRes = new HttpResponse({
    body: { message: "success" }
  });
  beforeEach(() => {
    analyticsServiceSpy = jasmine.createSpyObj("AnalyticsService", [
      "getAvailableAnalyticsData"
    ]);
    errorInterceptor = new GlobalErrorHandler(analyticsServiceSpy, PLATFORM_ID);
  });

  it("should create", () => {
    expect(errorInterceptor).toBeTruthy();
  });

  describe("intercept request", () => {
    let httpRequestSpy = jasmine.createSpyObj("HttpRequest", ["doesNotMatter"]);
    let httpHandlerSpy = jasmine.createSpyObj("HttpHandler", ["handle"]);

    it("should throw error response returned from api", done => {
      httpHandlerSpy.handle.and.returnValue(
        throwError(errorRes)
      );

      errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
        result => console.log("success", result),
        err => {
          expect(err).toEqual(errorRes);
          done();
        }
      );
    });

    it("should return httpresponse from api", done => {
      httpHandlerSpy.handle.and.returnValue(of(successRes));
      errorInterceptor
        .intercept(httpRequestSpy, httpHandlerSpy)
        .subscribe((resp) => {
          expect(resp).toEqual(successRes);
          done();
        });
    });
  });
});
