import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppService } from 'app/Service/app.service';
import { Observable } from 'rxjs';
import { MoonPlanWithPassDetailsService } from "./moon-plan-with-pass-details.service";

class MockAppService {
    getEstoreData(req) {
        return Observable.of([{ status: true, message: "" }]);
    }
}

describe("MoonPlanWithPassDetailsService", () => {
    let service: MoonPlanWithPassDetailsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                MoonPlanWithPassDetailsService,
                { provide: AppService, useClass: MockAppService }
            ]
        });
        service = TestBed.get(MoonPlanWithPassDetailsService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should call getPlanPassDevice', () => {
        const spy = spyOn(service, 'getPlanPassDevice').and.callThrough();
        service.getPlanPassDevice('/test');
        expect(spy).toHaveBeenCalled();
    });
});

