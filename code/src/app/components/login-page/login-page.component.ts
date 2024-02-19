import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";
import { LoginService } from "../../services/login.service";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  isValidUsername: boolean = true;
  isValidPassword: boolean = true;

  constructor(private backendService: BackendService,
              private userService: UserService,
              private router: Router,
              private loginService: LoginService) {}

  async onLogin() {
    if (this.username[0] != '+') {
      this.isValidUsername = false;
      this.isValidPassword = false;
    }
    else {
      const myMap = await this.loginService.login(this.username, this.password);
      if (myMap.get(200) != null) {
        const userId = myMap.get(200);
        this.userService.changeUserId(userId!);
        this.backendService.getUserInfo(userId!)
        await this.router.navigate(['/main']);
      }
      else {
        this.isValidUsername = false;
        this.isValidPassword = false;
      }
    }
  }

  refresh_username() {
    this.isValidUsername = true;
  }

  refresh_password() {
    this.isValidPassword = true;
  }
}
