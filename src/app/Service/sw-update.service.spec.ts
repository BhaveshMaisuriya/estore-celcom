import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';

import { ServiceWorkerUpdate } from 'app/Service/sw-update.service';
import { of } from 'rxjs';

describe('ServiceWorkerUpdate', () => {
    const swUpdate = jasmine.createSpyObj<SwUpdate>('SwUpdate', ['checkForUpdate']);
    (swUpdate as any).available = of({});

    let service: ServiceWorkerUpdate;


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: SwUpdate, useValue: swUpdate }]
        });

        service = TestBed.get(ServiceWorkerUpdate);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should check for updates', fakeAsync(() => {
        spyOn(service, "checkForUpdates");
        service.checkForUpdates();
        discardPeriodicTasks();
    }));
});
