import { TestBed } from '@angular/core/testing';

import { FirstBluePlanService } from './first-blue-plan.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeviceDataService } from 'app/Service/devicedata.service';

describe('FirstBluePlanService', () => {
  let service: FirstBluePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeviceDataService]
    });
    service = TestBed.inject(FirstBluePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
