import { Component } from '@angular/core';
import {Router} from "@angular/router";

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
  constructor(private router: Router) {}

  register() {
    if (!this.name) {
      this.isValidName = false;
      this.nameErrorMessage = 'Недопустимы все символы, кроме кириллицы';
    }
    if (!this.phone) {
      this.isValidPhone = false;
      this.phoneErrorMessage = 'Неверный формат +79522795509';
    }
    if (!this.password) {
      this.isValidPassword = false;
      this.PasswordErrorMessage = 'Пароль должен быть не меньше чем 10 символов';
    }
    if (this.password != this.repeatPassword){
      this.isValidRepeatPassword = false;
      this.repeatPasswordErrorMessage = 'Пароли не совпадают. Проверьте введенные данные.';
    }
    if (this.isValidName && this.isValidPhone && this.isValidPassword &&  this.isValidRepeatPassword ) {
      this.router.navigate(['/main']);
    }
  }

  refresh() {
    this.isValidName = true;
    this.isValidPhone = true;
    this.isValidPassword = true;
    this.isValidRepeatPassword = true;
  }
}
