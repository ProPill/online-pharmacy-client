import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-unauthorized',
  templateUrl: './header-unauthorized.component.html',
  styleUrls: ['./header-unauthorized.component.css']
})
export class HeaderUnauthorizedComponent {
  constructor(private router: Router) {}

  onLoginPage() {
    this.router.navigate(['/login']);
  }

  onRegistrationPage() {
    this.router.navigate(['/registration']);
  }

}
