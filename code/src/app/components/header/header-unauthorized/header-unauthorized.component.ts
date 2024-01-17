import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {BackendService} from "../../../services/backend.service";

@Component({
  selector: 'app-header-unauthorized',
  templateUrl: './header-unauthorized.component.html',
  styleUrls: ['./header-unauthorized.component.css']
})
export class HeaderUnauthorizedComponent {
  @Input() onFilter: boolean;
  @Output() onFilterChange = new EventEmitter<boolean>();

  constructor(private backendService: BackendService,
              private router: Router) {
    this.backendService.currentFilterStatus.subscribe((value) => this.onFilter = value)
  }

  onLoginPage() {
    this.backendService.hideFilter()
    this.router.navigate(['/login']);
  }

  onRegistrationPage() {
    this.backendService.hideFilter()
    this.router.navigate(['/registration']);
  }

  changeFilterStatus() {
    this.onFilterChange.emit(this.onFilter);
  }
}
