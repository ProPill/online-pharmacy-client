import {Component, EventEmitter, Input, Output} from "@angular/core";
import {IUser} from "../../models/user";
import { Router } from '@angular/router';
import {UserService} from "../../services/user.service";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @Input() user: IUser;
  @Output() reloadList = new EventEmitter<boolean>;
  title = 'Header';
  searchRequest: string = '';
  onFilter: boolean = true;
  private userId: number = -1;

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.user = this.backendService.getUserInfo(this.userId)
  }

  searchItems() {
    this.changeFilterStatus(true)
    this.router.navigate(['/main'], {state: { searchRequest: this.searchRequest } });
  }

  onMain() {
    this.changeFilterStatus(true)
    this.router.navigate(['/main']);
  }

  changeFilterStatus(status: boolean) {
    this.onFilter = status;
  }

  isAdmin() {
    return this.user.roleId == -3;
  }

  isDoctor() {
    return this.user.roleId == -2;
  }

  isNormal() {
    return this.user.roleId == -1;
  }
}


