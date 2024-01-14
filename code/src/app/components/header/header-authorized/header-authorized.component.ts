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

  private userId: number = -1;

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
  }

  onLogOut() {
    this.onFilter = true;
    this.changeFilterStatus();
    this.router.navigate(['/main']);
    this.backendService.logout(this.userId);
    this.userService.changeUserId(0)
  }

  onCartPage() {
    this.onFilter = false;
    this.changeFilterStatus();
    this.router.navigate(['/cart']);
  }

  onUserPage() {
    this.onFilter = false;
    this.changeFilterStatus();
    this.router.navigate(['/user'])
  }

  changeFilterStatus() {
    this.onFilterChange.emit(this.onFilter);
  }
}
