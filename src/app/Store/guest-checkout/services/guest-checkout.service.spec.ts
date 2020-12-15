import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GuestCheckoutService } from "./guest-checkout.service";

describe('GuestCheckoutService', () => {
    let service: GuestCheckoutService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GuestCheckoutService]
        });

        service = TestBed.get(GuestCheckoutService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getCustomerIDTypes', () => {
        const spy = spyOn(service, 'getCustomerIDTypes').and.callThrough();
        service.getCustomerIDTypes();
        expect(spy).toHaveBeenCalled();
    });

    it('should call getLoginAttempt', () => {
        const spy = spyOn(service, 'getLoginAttempt').and.callThrough();
        service.getLoginAttempt();
        expect(spy).toHaveBeenCalled();
    });

    it('should call increaseLoginAttempt', () => {
        const spy = spyOn(service, 'increaseLoginAttempt').and.callThrough();
        service.increaseLoginAttempt();
        expect(spy).toHaveBeenCalled();
    });

    it('should call clearLoginAttempt', () => {
        const spy = spyOn(service, 'clearLoginAttempt').and.callThrough();
        service.clearLoginAttempt();
        expect(spy).toHaveBeenCalled();
    });

    it('should call getItemAddedStatus', () => {
        const spy = spyOn(service, 'getItemAddedStatus').and.callThrough();
        service.getItemAddedStatus();
        expect(spy).toHaveBeenCalled();
    });

    it('should call setGuestUserName', () => {
        const spy = spyOn(service, 'setGuestUserName').and.callThrough();
        service.setGuestUserName('');
        expect(spy).toHaveBeenCalled();
    });

    it('should call setItemAddedStatus', () => {
        const spy = spyOn(service, 'setItemAddedStatus').and.callThrough();
        service.setItemAddedStatus(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should call getGuestUserName', () => {
        const spy = spyOn(service, 'getGuestUserName').and.callThrough();
        service.getGuestUserName();
        expect(spy).toHaveBeenCalled();
    });

});

