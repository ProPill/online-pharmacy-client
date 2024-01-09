import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  isValid: boolean = true;

  constructor(private router: Router) {}

  onLogin() {
    if (this.username && this.password) {
      this.isValid = true;
      if (this.isValid) {
        this.router.navigate(['/main']);
      }
    } else {
      this.isValid = false;
    }
  }
}
