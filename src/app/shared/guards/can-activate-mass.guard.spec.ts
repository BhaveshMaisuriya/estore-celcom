import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CanActivateMassGuard } from './can-activate-mass.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CanActivateMassGuard', () => {
  let guard: CanActivateMassGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ]
    });
    guard = TestBed.inject(CanActivateMassGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
