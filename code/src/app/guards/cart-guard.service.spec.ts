import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { BackendService } from '../services/backend.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {cartGuard} from "./cart-guard.service";

describe('cartGuard', () => {
  let guard: cartGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        cartGuard,
        UserService,
        BackendService
      ]
    });
    guard = TestBed.inject(cartGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
