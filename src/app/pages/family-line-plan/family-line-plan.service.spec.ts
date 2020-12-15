import { TestBed } from '@angular/core/testing';

import { FamilyLinePlanService } from './family-line-plan.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DeviceDataService } from 'app/Service/devicedata.service';

describe('FamilyLinePlanService', () => {
  let service: FamilyLinePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpClient, 
        DeviceDataService
      ]
    });
    service = TestBed.inject(FamilyLinePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
