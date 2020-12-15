import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { AppService } from 'app/Service/app.service';
import { Observable } from 'rxjs';
import { CobpService } from './cobp.service';

const response = { status: true };

class AppMockService {
    constructor() { }

    postEstoreUserData(url: any, data: any) {
        return Observable.of(response);
    }
}

describe('CobpService', () => {

    let service: CobpService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CobpService, { provide: AppService, useclass: AppMockService }]
        });

        const appService = TestBed.get(AppService);
        service = new CobpService(appService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call ValidateUpgradePlan', () => {
        const spy = spyOn(service, 'ValidateUpgradePlan');

        service.ValidateUpgradePlan({ deviceSku: 'test' }, 1, 1, 1, undefined);
        service.ValidateUpgradePlan({ deviceSku: 'test' }, 1, 1, 1, undefined, true);
        service.ValidateUpgradePlan({ deviceSku: 'test' }, 1, 1, 1, 'testData');
        const resp = service.ValidateUpgradePlan({ deviceSku: 'test' }, 1, 1, 1, 'testData', true);

        expect(spy).toHaveBeenCalled();
    });

    it('should call ValidateUpgradePlanEasyPhone', () => {
        const spy = spyOn(service, 'ValidateUpgradePlanEasyPhone');

        const resp = service.ValidateUpgradePlanEasyPhone({ deviceSku: 'test' }, 1);

        expect(spy).toHaveBeenCalled();
    });
});
