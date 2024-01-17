import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {RegistrationService} from "../../services/registration.service";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  name: string;
  phone: string = '';
  password: string = '';
  repeatPassword: string = '';

  isValidName: boolean = true;
  isValidPhone: boolean = true;
  isValidPassword: boolean = true;
  isValidRepeatPassword: boolean = true;
  nameErrorMessage: string;
  phoneErrorMessage: string;
  repeatPasswordErrorMessage: string;
  PasswordErrorMessage: string;

  constructor(private backendService: BackendService,
              private userService: UserService,
              private router: Router,
              private registrationService: RegistrationService) {}

  async onRegistration() {
    if (this.password != this.repeatPassword) {
      this.isValidRepeatPassword = false;
      this.repeatPasswordErrorMessage = 'Пароли не совпадают! Проверьте введенные данные!';
    } else {
      const myMap = await this.registrationService.registration(this.name, this.phone, this.password);
      if (myMap.get(409) != null) {
        this.isValidPhone = false;
        this.phoneErrorMessage = 'Пользователь с данным номером уже зарегистрирован!';
      }
      else if (myMap.get(1) != null) {
        this.isValidName = false;
        this.nameErrorMessage = 'Неверный формат ФИО! Допустимы толкько символы кириллицы!';
      }
      else if (myMap.get(2) != null) {
        this.isValidPhone = false;
        this.phoneErrorMessage = 'Неверный формат номера! Пример: +79522795509';
      }
      else if (myMap.get(3) != null) {
        this.isValidPassword = false;
        this.PasswordErrorMessage = 'Пароль должен быть от 6 до 16 символов! Можно использовать латиницу и цифры от 0 до 9!';
      }
      else if (this.isValidName && this.isValidPhone &&
        this.isValidPassword && this.isValidRepeatPassword) {
        this.userService.changeUserId(myMap.get(200)!);
        this.backendService.getUserInfo(myMap.get(200)!)
        await this.router.navigate(['/main']);
      }
    }
  }

  refresh_name() {
    this.isValidName = true;
  }

  refresh_phone() {
    this.isValidPhone = true;
  }

  refresh_password() {
    this.isValidPassword = true;
  }

  refresh_repeat_password() {
    this.isValidRepeatPassword = true;
  }
}
