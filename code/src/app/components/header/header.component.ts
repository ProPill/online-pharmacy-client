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
  title = 'Header';
  searchRequest: string = '';
  onFilter: boolean = true;
  private userId: number = -1;

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentUser.subscribe((value) => this.user = value)
  }

  searchItems() {
    this.changeFilterStatus(true)
    this.router.navigate(['/main'], {state: { searchRequest: this.searchRequest } });
  }

  onMain() {
    this.changeFilterStatus(true)
    this.router.navigate(['/main']);
    this.reloadList(true)
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

  notNull() {
    return this.user.id != 0
  }

  reloadList(val: boolean) {
    this.backendService.defaultItems
      .subscribe((items) =>
      this.backendService.changeItems(items))
  }
}
