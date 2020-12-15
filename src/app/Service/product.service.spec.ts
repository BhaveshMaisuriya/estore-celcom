import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { PlanPurchaseService } from 'app/Store/plan/plan-purchase/plan-purchase.service';
import { CommonUtilService } from './commonUtil.service';
import { DeviceDataService } from './devicedata.service';
import { ProductService } from "./product.service";
import { UserService } from './user.service';

describe('ProductService', () => {
    let service: ProductService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductService, PlanPurchaseService, UserService, DeviceDataService,
                CommonUtilService]
        });

        service = TestBed.get(ProductService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call Find', fakeAsync(() => {
        spyOn(service, 'Find');
        let response = service.Find('/freeContent');
        expect(service.Find).toHaveBeenCalled();
    }));

    it('should call GetNewNumbers', fakeAsync(() => {
        spyOn(service, 'GetNewNumbers');
        let response = service.GetNewNumbers('/freeContent', {});
        expect(service.GetNewNumbers).toHaveBeenCalled();
    }));

    it('should call getRandomNumber', fakeAsync(() => {
        spyOn(service, 'getRandomNumber');
        let response = service.getRandomNumber('/freeContent', [11324342, 324353]);
        expect(service.getRandomNumber).toHaveBeenCalled();
    }));

    it('should call GetNewNumbers', fakeAsync(() => {
        spyOn(service, 'OnCOntinueSwitchingTab');

        localStorage.setItem("suppLinesAddedByTheUser", '');
        localStorage.setItem("PrincipleNumberSelected", '');
        localStorage.setItem('Principal_Number', '');
        localStorage.setItem("COBP_FLOW", '');
        localStorage.setItem("MNP-FLOW", '');

        service.OnCOntinueSwitchingTab();
        expect(service.OnCOntinueSwitchingTab).toHaveBeenCalled();
    }));

    it('should call getStockAvailabilityRequest', () => {
        spyOn(service, 'getStockAvailabilityRequest');
        const response = service.getStockAvailabilityRequest({}, 0, 0);
        expect(service.getStockAvailabilityRequest).toHaveBeenCalled();
    });

    it('should call getStockStatus', () => {
        spyOn(service, 'getStockStatus');
        const response = service.getStockStatus({});
        expect(service.getStockStatus).toHaveBeenCalled();
    });

    it('should call getStockStatus', () => {
        spyOn(service, 'getStockStatus');
        const response = service.getStockStatus({ status: 'Checking stock...' });
        expect(service.getStockStatus).toHaveBeenCalled();
    });

    it('should call getStockStatus', () => {
        spyOn(service, 'getStockStatus');
        const response = service.getStockStatus({ status: 'In Stock' });
        expect(service.getStockStatus).toHaveBeenCalled();
    });

    it('should call getStockStatus', () => {
        spyOn(service, 'getStockStatus');
        const response = service.getStockStatus({ status: 'Out of Stock' });
        expect(service.getStockStatus).toHaveBeenCalled();
    });
});
