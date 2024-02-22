import { LoginPageComponent } from './login-page.component';
import { BackendService } from '../../services/backend.service';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { Router, Routes } from '@angular/router';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let backendServiceSpy: jasmine.SpyObj<BackendService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let router: Router;
  let routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);


  beforeEach(() => {
    backendServiceSpy = jasmine.createSpyObj('BackendService', ['getUserInfo']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['changeUserId']);
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    component = new LoginPageComponent(
      backendServiceSpy,
      userServiceSpy,
      routerSpy,
      loginServiceSpy
    );
  });

  it('should set isValidUsername and isValidPassword to false if username does not start with "+"', () => {
    component.username = 'invalidUsername';
    component.password = 'somePassword';
    component.onLogin();

    expect(component.isValidUsername).toBe(false);
    expect(component.isValidPassword).toBe(false);
  });

  it('should call login service and navigate to main page if login is successful', async () => {
    const spyReturnValue = new Map<number, number>([[200, 1]]);
    loginServiceSpy.login.and.returnValue(Promise.resolve(spyReturnValue));

    component.username = '+79115139646';
    component.password = 'validPass12';

    await component.onLogin();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/main']);
  });

  it('should set isValidUsername and isValidPassword to false if login is not successful', async () => {
    const spyReturnValue = new Map<number, number>([[400, 1]]);
    loginServiceSpy.login.and.returnValue(Promise.resolve(spyReturnValue));

    component.username = '+invalidUsername';
    component.password = 'invalidPassword';

    await component.onLogin();

    expect(component.isValidUsername).toBe(false);
    expect(component.isValidPassword).toBe(false);
  });

  it('should set isValidUsername to true on username refresh', () => {
    component.isValidUsername = false
    component.refresh_username();
    expect(component.isValidUsername).toBeTrue();
  });

  it('should set isValidPassword to true on password refresh', () => {
    component.isValidPassword = false
    component.refresh_password();
    expect(component.isValidPassword).toBeTrue();
  });
});
