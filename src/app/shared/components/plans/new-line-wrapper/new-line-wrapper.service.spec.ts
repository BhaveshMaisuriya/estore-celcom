import { TestBed } from '@angular/core/testing';

import { NewLineWrapperService } from './new-line-wrapper.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { MatRadioModule } from '@angular/material/radio';

describe('NewLineWrapperService', () => {
  let service: NewLineWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, MatRadioModule],
        providers: [
          HttpClient, 
          DeviceDataService
        ]
    });
    service = TestBed.inject(NewLineWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
