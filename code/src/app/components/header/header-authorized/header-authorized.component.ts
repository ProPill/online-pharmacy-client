import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {BackendService} from "../../../services/backend.service";

@Component({
  selector: 'app-header-authorized',
  templateUrl: './header-authorized.component.html',
  styleUrls: ['./header-authorized.component.css']
})
export class HeaderAuthorizedComponent {
  @Input() onFilter: boolean;
  @Output() onFilterChange = new EventEmitter<boolean>();

  private userId: number | null;

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentFilterStatus.subscribe((value) => this.onFilter = value)
  }

  onLogOut() {
    this.backendService.showFilter()
    this.backendService.logout()
    this.router.navigate(['/main']);
  }

  onCartPage() {
    this.backendService.hideFilter()
    this.router.navigate(['/cart']);
  }

  onUserPage() {
    this.backendService.hideFilter()
    this.router.navigate(['/user'])
  }

  changeFilterStatus() {
    this.onFilterChange.emit(this.onFilter);
  }
}
