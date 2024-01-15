import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-header-pharmacist',
  templateUrl: './header-pharmacist.component.html',
  styleUrls: ['./header-pharmacist.component.css']
})
export class HeaderPharmacistComponent {
  @Input() onFilter: boolean;
  @Output() onFilterChange = new EventEmitter<boolean>();
  private userId: number = -1;

  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
  }

  onOpenPharmacistPage() {
    this.onFilter = false;
    this.changeFilterStatus();
    this.router.navigate(['/pharmacist']);
  }

  onLogOut() {
    this.onFilter = true;
    this.changeFilterStatus();
    this.router.navigate(['/main'])
  }

  changeFilterStatus() {
    this.onFilterChange.emit(this.onFilter);
  }
}
