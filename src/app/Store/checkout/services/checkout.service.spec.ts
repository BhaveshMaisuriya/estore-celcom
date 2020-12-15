import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CheckoutService } from "./checkout.service";

describe('CheckoutService', () => {
    let service: CheckoutService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CheckoutService]
        });

        service = TestBed.get(CheckoutService);

        localStorage.setItem("MyMsIsdn", "603232832");
        sessionStorage.setItem('CAorderId', "1123243434");
        sessionStorage.setItem('secretKey', "abc");
    });

    afterEach(() => {
        localStorage.clear();
        sessionStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call postNewAddress', () => {
        const spy = spyOn(service, 'postNewAddress').and.callThrough();

        service.postNewAddress('testData');
        expect(spy).toHaveBeenCalled();
    });

    it('should call cobpOrderCreate', () => {
        const spy = spyOn(service, 'cobpOrderCreate').and.callThrough();

        service.cobpOrderCreate('testData');
        expect(spy).toHaveBeenCalled();
    });

    it('should call Find', () => {
        const spy = spyOn(service, 'Find').and.callThrough();

        service.Find('/testURL');
        expect(spy).toHaveBeenCalled();
    });

    it('should call FindStatic', () => {
        const spy = spyOn(service, 'FindStatic').and.callThrough();

        const val = service.FindStatic();
        expect(spy).toHaveBeenCalled();
    });

    it('should call getCheckoutData', () => {
        const spy = spyOn(service, 'getCheckoutData').and.callThrough();

        service.getCheckoutData();
        expect(spy).toHaveBeenCalled();
    });

    it('should call setCheckoutData', () => {
        const spy = spyOn(service, 'setCheckoutData').and.callThrough();

        service.setCheckoutData('test');
        expect(spy).toHaveBeenCalled();
    });

    it('should call fetchCheckoutData', () => {
        const spy = spyOn(service, 'fetchCheckoutData').and.callThrough();

        service.fetchCheckoutData();
        expect(spy).toHaveBeenCalled();
    });
});
