import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pharmacistGuard } from './pharmacist-guard.service';

describe('unauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => pharmacistGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
