import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-unauthorized',
  templateUrl: './header-unauthorized.component.html',
  styleUrls: ['./header-unauthorized.component.css']
})
export class HeaderUnauthorizedComponent {
  @Input() onFilter: boolean;
  @Output() onFilterChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  onLoginPage() {
    this.onFilter = false;
    this.changeFilterStatus();
    this.router.navigate(['/login']);
  }

  onRegistrationPage() {
    this.onFilter = false;
    this.changeFilterStatus();
    this.router.navigate(['/registration']);
  }

  changeFilterStatus() {
    this.onFilterChange.emit(this.onFilter);
  }
}
