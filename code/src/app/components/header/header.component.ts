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
  searchStatus: boolean

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentUser.subscribe((value) => this.user = value);
    this.backendService.currentSearchStatus.subscribe((value) => this.searchStatus = value)
  }

  searchItems() {
    this.changeFilterStatus(true)
    document.querySelectorAll("[name='searchRequest']").forEach(element => {
      let tmp = element.getAttribute("ng-reflect-model");
      if (tmp != null) {
        this.searchRequest = tmp
      }
    });
    this.backendService.searchItem(this.searchRequest)
    console.log(this.searchStatus)
    // if (this.searchStatus) {
    //   this.router.navigate(['/main'], {state: { searchRequest: this.searchRequest } });}
    // else {
    //   this.router.navigate(['/item-not-found'])
    // }
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

  onSearchInput($event: Event) {
    document.querySelectorAll("[name='searchRequest']").forEach(element => {
      let tmp = element.getAttribute("ng-reflect-model");
      if (tmp == null || tmp == '') {
        this.searchRequest = ''
      }
    });
    this.reloadList(true)
  }
}
