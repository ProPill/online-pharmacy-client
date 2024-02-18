import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../../services/user.service";
import {BackendService} from "../../../services/backend.service";

@Component({
  selector: 'app-header-pharmacist',
  templateUrl: './header-pharmacist.component.html',
  styleUrls: ['./header-pharmacist.component.css']
})
export class HeaderPharmacistComponent {
  @Input() onFilter: boolean;
  @Output() onFilterChange = new EventEmitter<boolean>();
  private userId: number | null;

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentFilterStatus.subscribe((value) => this.onFilter = value)
  }

  onOpenPharmacistPage() {
    this.backendService.hideFilter()
    this.router.navigate(['/pharmacist']);
  }

  onLogOut() {
    this.backendService.showFilter()
    this.router.navigate(['/main']);
    this.backendService.logout();
    // this.userService.changeUserId(0)
  }

  changeFilterStatus() {
    this.onFilterChange.emit(this.onFilter);
  }
}
