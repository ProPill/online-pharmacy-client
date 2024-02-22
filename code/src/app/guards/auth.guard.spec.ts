import {async, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { authGuard } from './auth.guard';
import { UserService } from '../services/user.service';
import { BackendService } from '../services/backend.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router} from "@angular/router";

describe('authGuard', () => {
  let guard: authGuard;
  let userService: UserService;
  let backendService: BackendService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [authGuard, UserService, BackendService],
    });
    guard = TestBed.inject(authGuard);
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

    it('should return true if userId is not null', async(() => {
      userService.changeUserId(1);
      expect(guard.canActivate()).toBe(true);
    }));
  });
});

