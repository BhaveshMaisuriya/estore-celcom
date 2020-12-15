import { TestBed } from '@angular/core/testing';

import { NewLandingPageService } from './new-landing-page.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewLandingPageService', () => {
  let service: NewLandingPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ NewLandingPageService ]
    });
    service = TestBed.inject(NewLandingPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
