import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { BackendService } from '../services/backend.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {orderGuard} from "./order.guard";

describe('orderGuard', () => {
  let guard: orderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        orderGuard,
        UserService,
        BackendService
      ]
    });
    guard = TestBed.inject(orderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
