// 

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
import { BrowserStateInterceptor } from './browserstate.interceptor';
import { makeStateKey, TransferState } from '@angular/platform-browser';

describe("Http-refid Interceptor", () => {
    let interceptor: BrowserStateInterceptor;
    const urlKey = '/store/v1/stockAvailabilityCheck';

    const requestDELETE: HttpRequest<any> = new HttpRequest<any>(
        "DELETE",
        urlKey
    );
    const requestGET: HttpRequest<any> = new HttpRequest<any>(
        "GET",
        urlKey
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
                TransferState,
                BrowserStateInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: BrowserStateInterceptor,
                    multi: true
                }
            ]
        });
    });

    afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
        mock.verify();
    }));

    it("should Intercept other requests and skip the the process", inject(
        [HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {
            interceptor = TestBed.get(BrowserStateInterceptor);
            interceptor.intercept(requestDELETE, next);
            expect(interceptor).toBeDefined();
            httpMock.verify();
        }
    ));

    it("should Intercept get requests, check state info and skip", inject(
        [HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {
            interceptor = TestBed.get(BrowserStateInterceptor);
            const transferState = TestBed.get(TransferState);
            const COUNTER_KEY = makeStateKey<number>(urlKey);
            transferState.set(COUNTER_KEY, 10);
            interceptor.intercept(requestGET, next);
            expect(interceptor).toBeDefined();
            httpMock.verify();
        }
    ));

    it("should Intercept get requests, check and retireve state info", inject(
        [HttpClient, HttpTestingController],
        (http: HttpClient, httpMock: HttpTestingController) => {
            interceptor = TestBed.get(BrowserStateInterceptor);
            const transferState = TestBed.get(TransferState);
            const COUNTER_KEY = makeStateKey<number>(urlKey);
            transferState.set(COUNTER_KEY, undefined);
            interceptor.intercept(requestGET, next);
            expect(interceptor).toBeDefined();
            httpMock.verify();
        }
    ));
});
