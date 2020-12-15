import { TestBed, getTestBed } from "@angular/core/testing"
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpMockRequestInterceptor } from './http-mock.interceptor.service';
import { AppService } from 'app/Service/app.service';

describe('HttpMockRequestInterceptor', () => {

    let injector: TestBed;
    let service: AppService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: HttpMockRequestInterceptor, multi: true }
            ]
        });

        injector = getTestBed();
        service = injector.get(AppService);
    });
});
