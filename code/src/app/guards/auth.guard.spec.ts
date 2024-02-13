import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { authGuard } from './auth.guard';
import { UserService } from '../services/user.service';
import { BackendService } from '../services/backend.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('authGuard', () => {
  let guard: authGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        authGuard,
        UserService,
        BackendService
      ]
    });
    guard = TestBed.inject(authGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
