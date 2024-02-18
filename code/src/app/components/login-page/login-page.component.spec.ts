import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginPageComponent } from './login-page.component';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { BackendService } from '../../services/backend.service';
import {Router} from "@angular/router";

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let backendServiceSpy: jasmine.SpyObj<BackendService>;
  let router: Router;

  beforeEach(() => {
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['changeUserId']);
    const loginServiceSpyObj = jasmine.createSpyObj('LoginService', ['login']);
    const backendServiceSpyObj = jasmine.createSpyObj('BackendService', ['getUserInfo']);

    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpyObj },
        { provide: LoginService, useValue: loginServiceSpyObj },
        { provide: BackendService, useValue: backendServiceSpyObj },
      ],
    });

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    backendServiceSpy = TestBed.inject(BackendService) as jasmine.SpyObj<BackendService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isValidUsername and isValidPassword to false if username does not start with "+"', () => {
    component.username = 'test';
    component.onLogin();
    expect(component.isValidUsername).toBeFalse();
    expect(component.isValidPassword).toBeFalse();
  });

  it('should set isValidUsername and isValidPassword to false if loginService returns null', async () => {
    component.username = '+test';
    const spyReturnValue = new Map<number, number>([[400, 0]]);
    loginServiceSpy.login.and.returnValue(Promise.resolve(spyReturnValue));

    await component.onLogin();

    expect(component.isValidUsername).toBeFalse();
    expect(component.isValidPassword).toBeFalse();
  });

  // it('should navigate to "main" if loginService returns userId and getUserInfo is successful', async () => {
  //   component.username = '+79115212121';
  //   component.password = 'Password12';
  //   const userId = 1;
  //   const spyReturnValue = new Map<number, number>([[200, userId]]);
  //   loginServiceSpy.login.and.returnValue(Promise.resolve(spyReturnValue));
  //   // backendServiceSpy.getUserInfo.and.returnValue(of({}));
  //   await component.onLogin();
  //
  //   expect(userServiceSpy.changeUserId).toHaveBeenCalledWith(userId);
  //   expect(backendServiceSpy.getUserInfo).toHaveBeenCalledWith(userId);
  //   expect(router.navigate).toHaveBeenCalledWith(['main']);
  // });

  it('should refresh isValidUsername on calling refresh_username()', () => {
    component.isValidUsername = false;
    component.refresh_username();
    expect(component.isValidUsername).toBeTrue();
  });

  it('should refresh isValidPassword on calling refresh_password()', () => {
    component.isValidPassword = false;
    component.refresh_password();
    expect(component.isValidPassword).toBeTrue();
  });
});
