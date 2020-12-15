import { TestBed } from '@angular/core/testing';
import { CanActivateNonMassGuard } from './can-activate-non-mass.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CanActivateMassNonGuard', () => {
  let guard: CanActivateNonMassGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ 
        { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
        { provide: ActivatedRoute, useClass: class { navigate = jasmine.createSpy("navigate"); } }
      ]
    });
    guard = TestBed.inject(CanActivateNonMassGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
