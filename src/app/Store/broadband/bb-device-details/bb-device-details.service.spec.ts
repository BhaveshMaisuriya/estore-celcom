import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'app/Service/app.service';
import { AppMockService } from 'app/Service/appmock.service';
import { BbDeviceDetailsService } from "./bb-device-details.service";

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

describe('BbDeviceDetailsService', () => {
    let service: BbDeviceDetailsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: AppService, useClass: AppMockService }, { provide: Router, useClass: RouterStub },
            {
                provide: ActivatedRoute,
                useClass: MockactivatedRoute
            }, BbDeviceDetailsService]
        });

        service = TestBed.get(BbDeviceDetailsService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call Find', fakeAsync(() => {
        spyOn(service, 'Find');
        const res = service.Find('/freeContent')
        expect(service.Find).toHaveBeenCalled();
    }));
});
