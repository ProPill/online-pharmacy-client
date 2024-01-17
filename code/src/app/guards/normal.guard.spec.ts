import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cartGuard } from './cart-guard.service';

describe('normalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => cartGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
