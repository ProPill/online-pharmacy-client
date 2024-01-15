import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../services/user.service";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  isValid: boolean = true;

  constructor(private userService: UserService,
              private router: Router,
              private loginService: LoginService) {}

  fixUsername() {
    if (this.username[0] != '+') {
      this.isValid = false;
    }
    else {
      this.username = '%2B' + this.username.substring(1);
      this.isValid = true;
    }
  }

  onLogin() {
    this.fixUsername();
    if (this.isValid) {
      let myMap = this.loginService.login(this.username, this.password);
      if (myMap.get(1) == 200) {
        const userId = myMap.get(2);
        // this.userService.changeUserId(userId);
        // this.router.navigate(['main']);
        console.log(myMap)
      }
      else if (myMap.get(1) == 400) {
        this.isValid = false;
      }
    }
  }

}
