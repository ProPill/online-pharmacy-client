import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-authorized',
  templateUrl: './header-authorized.component.html',
  styleUrls: ['./header-authorized.component.css']
})

export class HeaderAuthorizedComponent {
  @Input() onFilter: boolean
  constructor(private router: Router) {}

  onLogOut() {
    this.router.navigate(['/main'])
      this.onFilter = true;
  }

  onCartPage() {
    this.router.navigate(['/cart']);
    this.onFilter = false;
  }

  onUserPage() {
    this.router.navigate(['/user'])
      this.onFilter = false;
  }
}
