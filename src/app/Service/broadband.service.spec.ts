import { TestBed, inject } from '@angular/core/testing';

import { AppService } from './app.service';
import { AppMockService } from './appmock.service';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BroadbandService } from './broadband.service';
import { DeviceDataService } from './devicedata.service';
import { CommonUtilService } from './commonUtil.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

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

describe('BroadbandService', () => {

  let service: BroadbandService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        { provide: AppService, useClass: AppMockService }, { provide: Router, useClass: RouterStub },
      {
        provide: ActivatedRoute,
        useClass: MockactivatedRoute
      }, BroadbandService, UserService, DeviceDataService,
        CommonUtilService,
      ]
    });

    service = TestBed.get(BroadbandService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getPos', () => {
    const spy = spyOn(service, 'getPos');

    service.getPos(1);
    service.getPos(2);
    service.getPos(3);
    service.getPos(4);
    expect(spy).toHaveBeenCalled();
  });

  it('should call scrollToTop', () => {
    const spy = spyOn(service, 'scrollToTop');

    service.scrollToTop();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onScroll', () => {
    const spy = spyOn(service, 'onScroll');

    service.onScroll();
    expect(spy).toHaveBeenCalled();
  });

  it('should define ', () => {
    const spy = spyOn(service, 'publicDataforPlan');

    const selectedPlanDetails = JSON.stringify({ terms_and_condition: { contract_terms: { desc: "test data - contract terms" } } });
    service.publicDataforPlan(selectedPlanDetails, {}, {}, {});

    expect(spy).toHaveBeenCalled();
  });

  it('shoould navigate with caritem details', () => {
    const spy = spyOn(service, 'preserveHomeWirelessEditData');

    const cartItem = JSON.stringify({
      selectedProduct: {
        orderSummaryColor: 'blue', selectedPlanDetails: 'test details',
        orderPhoneNo: '123456789'
      }, sku_bundle: "/test", reservation_id: 23425
    });

    service.preserveHomeWirelessEditData(cartItem);
    expect(spy).toHaveBeenCalled();
  });
});
