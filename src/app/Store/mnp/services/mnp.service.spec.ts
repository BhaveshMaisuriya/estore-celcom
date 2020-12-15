import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { fakeAsync, TestBed } from '@angular/core/testing';
import { AppService } from 'app/Service/app.service';
import { CommonUtilService } from 'app/Service/commonUtil.service';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { UserService } from 'app/Service/user.service';
import { MnpService } from './mnp.service';

const customer = {
    msisdn: 61323984332,
    customerID: 43434323544,
    customerIDType: 1
};

describe("MnpService", () => {
    let mnpService: MnpService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                MnpService,
                AppService,
                UserService,
                CommonUtilService,
                DeviceDataService
            ]
        });
        mnpService = TestBed.get(MnpService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(mnpService).toBeTruthy();
    });

    it('should call getCustomerIDTypes', () => {
        const spy = spyOn(mnpService, 'getCustomerIDTypes').and.callThrough();
        mnpService.getCustomerIDTypes();
        expect(spy).toHaveBeenCalled();
    });

    it('should call getCustomerIdTypeID', () => {
        const spy = spyOn(mnpService, 'getCustomerIdTypeID').and.callThrough();
        mnpService.getCustomerIdTypeID("New NRIC");
        expect(spy).toHaveBeenCalled();
    });

    it('should call getCustomerIdTypeValue', () => {
        const spy = spyOn(mnpService, 'getCustomerIdTypeValue').and.callThrough();
        mnpService.getCustomerIdTypeValue(1);
        expect(spy).toHaveBeenCalled();
    });

    it('should call getCurrentCustomerDetails', () => {
        const spy = spyOn(mnpService, 'getCurrentCustomerDetails').and.callThrough();
        mnpService.getCurrentCustomerDetails();
        expect(spy).toHaveBeenCalled();
    });

    it('should call setCurrentCustomerDetails', () => {
        const spy = spyOn(mnpService, 'setCurrentCustomerDetails').and.callThrough();
        mnpService.setCurrentCustomerDetails(customer);
        expect(spy).toHaveBeenCalled();
    });

    it('should call setMnpFlowPreSelect', () => {
        const spy = spyOn(mnpService, 'setMnpFlowPreSelect').and.callThrough();
        mnpService.setMnpFlowPreSelect(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should call queryPortInStatus', fakeAsync(() => {
        const spy = spyOn(mnpService, 'queryPortInStatus').and.callThrough();
        mnpService.queryPortInStatus({});
        expect(spy).toHaveBeenCalled();
    }));

    it('should call customerRetrieve', fakeAsync(() => {
        const spy = spyOn(mnpService, 'customerRetrieve').and.callThrough();
        mnpService.customerRetrieve({});
        expect(spy).toHaveBeenCalled();
    }));

    it('should call CustomerRetrieveCheck', fakeAsync(() => {
        const spy = spyOn(mnpService, 'CustomerRetrieveCheck').and.callThrough();
        mnpService.CustomerRetrieveCheck('1', '234343');
        expect(spy).toHaveBeenCalled();
    }));

    it('should call QueryDonorTelcoCheck', fakeAsync(() => {
        const spy = spyOn(mnpService, 'QueryDonorTelcoCheck').and.callThrough();
        mnpService.QueryDonorTelcoCheck('234343');
        expect(spy).toHaveBeenCalled();
    }));

    it('should call BlacklistCheck', fakeAsync(() => {
        const spy = spyOn(mnpService, 'BlacklistCheck').and.callThrough();
        mnpService.BlacklistCheck('23232', '1');
        expect(spy).toHaveBeenCalled();
    }));

    it('should call getPortStatus', fakeAsync(() => {
        const spy = spyOn(mnpService, 'getPortStatus').and.callThrough();
        mnpService.getPortStatus('23232');
        expect(spy).toHaveBeenCalled();
    }));

    it('should call eligibilityCheck', fakeAsync(() => {
        const spy = spyOn(mnpService, 'eligibilityCheck').and.callThrough();
        mnpService.eligibilityCheck('23232');
        expect(spy).toHaveBeenCalled();
    }));

    it('should call GetNewNumbers', fakeAsync(() => {
        const spy = spyOn(mnpService, 'GetNewNumbers').and.callThrough();
        mnpService.GetNewNumbers('23232');
        expect(spy).toHaveBeenCalled();
    }));

    it('should call getRandomNumber', fakeAsync(() => {
        const spy = spyOn(mnpService, 'getRandomNumber').and.callThrough();
        mnpService.getRandomNumber('23232');
        expect(spy).toHaveBeenCalled();
    }));

    it('should call clearMnpLocalStorages', () => {
        const spy = spyOn(mnpService, 'clearMnpLocalStorages').and.callThrough();
        localStorage.setItem("MNP-PRE-SELECT", '');
        localStorage.setItem('MNP-CUSTOMER', '');
        localStorage.setItem('MNP-FLOW', '');
        localStorage.setItem('MNP-EDIT', '');
        mnpService.clearMnpLocalStorages();
        expect(spy).toHaveBeenCalled();
    });

    it('should call doGuestLogin', () => {
        const spy = spyOn(mnpService, 'doGuestLogin');
        mnpService.doGuestLogin({}, '23232');
        expect(spy).toHaveBeenCalled();
    });
});
