import {async, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { BackendService } from '../services/backend.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {orderGuard} from "./order.guard";
import {Router} from "@angular/router";
import {IUser} from "../models/user";

describe('orderGuard', () => {
  let guard: orderGuard;
  let userService: UserService;
  let backendService: BackendService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [orderGuard, UserService, BackendService],
    });
    guard = TestBed.inject(orderGuard);
    userService = TestBed.inject(UserService);
    backendService = TestBed.inject(BackendService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return false and navigate to "/main" if userId is null', async(() => {
      spyOn(router, 'navigate');
      expect(guard.canActivate()).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/main']);
    }));

    it('should return true if userId.role == -1', async(() => {
      const user: IUser = {
        id: 1,
        name: 'Test User',
        phone: 12345678890,
        roleId: -1,
        specialityId: 1,
      }
      backendService.changeUser(user);
      userService.changeUserId(1);
      expect(guard.canActivate()).toBe(true);
    }));

    it('should return true if userId.role == -2', async(() => {
      const user: IUser = {
        id: 1,
        name: 'Test User',
        phone: 12345678890,
        roleId: -2,
        specialityId: 1,
      }
      backendService.changeUser(user);
      userService.changeUserId(1);
      expect(guard.canActivate()).toBe(true);
    }));

    it('should return false and navigate to "/main" if userId.role = -3', async(() => {
      const user: IUser = {
        id: 1,
        name: 'Test User',
        phone: 12345678890,
        roleId: -3,
        specialityId: 1,
      }
      backendService.changeUser(user);
      userService.changeUserId(1);
      spyOn(router, 'navigate');
      expect(guard.canActivate()).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/main']);
    }));
  });
});



