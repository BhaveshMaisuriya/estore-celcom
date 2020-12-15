import { TestBed } from '@angular/core/testing';

import { CobpWrapperService } from './cobp-wrapper.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatRadioModule } from '@angular/material/radio';

describe('CobpWrapperService', () => {
  let service: CobpWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatRadioModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(CobpWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
