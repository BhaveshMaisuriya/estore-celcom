import { TestBed } from '@angular/core/testing';
import { AppMockService } from 'app/Service/appmock.service';

describe('AppMockService', () => {

    let service: AppMockService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AppMockService]
        });

        service = TestBed.get(AppMockService);
    });


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call get', () => {
        const response = service.get('');
        expect(response).toBeNull();
    });

    it('should call get', done => {
        service.get('/freeContent').subscribe(res => {
            expect(res).toBeTruthy();
            done();
        });
    });

    it('should call getEstoreUserData', done => {
        service.getEstoreUserData('').subscribe(res => {
            expect(res).toBeTruthy();
            done();
        });
    });

    it('should call postEstoreUserData', done => {
        service.postEstoreUserData().subscribe(res => {
            expect(res).toBeTruthy();
            done();
        });
    });

    it('should call postROIForLogin', () => {
        const response = service.postROIForLogin('', {});
        expect(response).toBeNull();
    });

    it('should call postROIForLogin', done => {
        service.postROIForLogin('/login', {}).subscribe(res => {
            expect(res).toBeTruthy();
            done();
        });
    });
});
