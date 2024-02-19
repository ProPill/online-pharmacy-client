import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { of } from 'rxjs';
import { RegistrationPageComponent } from './registration-page.component';
import { RegistrationService } from '../../services/registration.service';
import { UserService } from '../../services/user.service';
import { BackendService } from '../../services/backend.service';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let router: Router;
  let registrationServiceSpy: jasmine.SpyObj<RegistrationService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let backendServiceSpy: jasmine.SpyObj<BackendService>;

  beforeEach(() => {
    registrationServiceSpy = jasmine.createSpyObj('RegistrationService', ['registration']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['changeUserId']);
    backendServiceSpy = jasmine.createSpyObj('BackendService', ['getUserInfo']);

    TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: RegistrationService, useValue: registrationServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: BackendService, useValue: backendServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should set isValidRepeatPassword and repeatPasswordErrorMessage if passwords do not match', () => {
    component.password = 'password1';
    component.repeatPassword = 'password2';
    component.onRegistration();
    expect(component.isValidRepeatPassword).toBeFalse();
    expect(component.repeatPasswordErrorMessage).toContain('Пароли не совпадают! Проверьте введенные данные!');
  });

  it('should set isValidPhone and phoneErrorMessage if user is already registered', fakeAsync(() => {
    const spyReturnValue = new Map<number, number>([[409, 1]]);
    registrationServiceSpy.registration.and.returnValue(Promise.resolve(spyReturnValue));

    component.onRegistration();
    tick();

    expect(component.isValidPhone).toBeFalse();
    expect(component.phoneErrorMessage).toContain('Пользователь с данным номером уже зарегистрирован!');
  }));

  it('should set isValidName and nameErrorMessage if the name has invalid format', fakeAsync(() => {
    const spyReturnValue = new Map<number, number>([[1, 1]]);
    registrationServiceSpy.registration.and.returnValue(Promise.resolve(spyReturnValue));

    component.onRegistration();
    tick();

    expect(component.isValidName).toBeFalse();
    expect(component.nameErrorMessage).toContain('Неверный формат ФИО! Допустимы толкько символы кириллицы!');
  }));

  it('should set isValidPhone and phoneErrorMessage if the phone has invalid format', fakeAsync(() => {
    const spyReturnValue = new Map<number, number>([[2, 1]]);
    registrationServiceSpy.registration.and.returnValue(Promise.resolve(spyReturnValue));

    component.onRegistration();
    tick();

    expect(component.isValidPhone).toBeFalse();
    expect(component.phoneErrorMessage).toContain('Неверный формат номера! Пример: +79522795509');
  }));

  it('should set isValidPassword and PasswordErrorMessage if the password has invalid format', fakeAsync(() => {
    const spyReturnValue = new Map<number, number>([[3, 1]]);
    registrationServiceSpy.registration.and.returnValue(Promise.resolve(spyReturnValue));

    component.password = 'password';
    component.repeatPassword = 'password';
    component.onRegistration();
    tick();

    expect(component.isValidPassword).toBeFalse();
    expect(component.PasswordErrorMessage).toContain('Пароль должен быть от 6 до 16 символов! Можно использовать латиницу и цифры от 0 до 9!');
  }));

  it('should navigate to main page if registration is successful', fakeAsync(() => {
    spyOn(router, 'navigate');
    const spyReturnValue = new Map<number, number>([[200, 123]]);
    registrationServiceSpy.registration.and.returnValue(Promise.resolve(spyReturnValue));

    component.name = 'John Doe';
    component.phone = '+123456789';
    component.password = 'password';
    component.repeatPassword = 'password';

    component.onRegistration();
    tick();

    expect(component.isValidName).toBeTrue();
    expect(component.isValidPhone).toBeTrue();
    expect(component.isValidPassword).toBeTrue();
    expect(component.isValidRepeatPassword).toBeTrue();

    expect(userServiceSpy.changeUserId).toHaveBeenCalledWith(123);
    expect(router.navigate).toHaveBeenCalledWith(['/main']);
  }));

  it('should refresh name', () => {
    component.isValidName = false;
    component.refresh_name();
    expect(component.isValidName).toBeTrue();
  });

  it('should refresh phone', () => {
    component.isValidPhone = false;
    component.refresh_phone();
    expect(component.isValidPhone).toBeTrue();
  });

  it('should refresh password', () => {
    component.isValidPassword = false;
    component.refresh_password();
    expect(component.isValidPassword).toBeTrue();
  });

  it('should refresh repeat_password', () => {
    component.isValidRepeatPassword = false;
    component.refresh_repeat_password();
    expect(component.isValidRepeatPassword).toBeTrue();
  });
});
