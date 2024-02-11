import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { BackendService } from '../services/backend.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {pharmacistGuard} from "./pharmacist-guard.service";

describe('pharmacistGuard', () => {
  let guard: pharmacistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        pharmacistGuard,
        UserService,
        BackendService
      ]
    });
    guard = TestBed.inject(pharmacistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
