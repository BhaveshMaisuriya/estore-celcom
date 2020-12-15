import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'app/Service/app.service';
import { AppMockService } from 'app/Service/appmock.service';
import { ViewProfileService } from "./view-profile.service";

class MockactivatedRoute {
    snapshot(url: string) {
        return url;
    }
}

describe('ViewProfileService', () => {
    let service: ViewProfileService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: AppService, useClass: AppMockService },
            {
                provide: ActivatedRoute,
                useClass: MockactivatedRoute
            }, ViewProfileService]
        });

        service = TestBed.get(ViewProfileService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call postVoucherCode', fakeAsync(() => {
        service.postVoucherCode('/freeContent', {}).subscribe(res => {
            expect(res).toBeTruthy();
        });
    }));
});
