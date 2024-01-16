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
  @Input() user: IUser | null;
  title = 'Header';
  searchRequest: string = '';
  onFilter: boolean = true;
  private userId: number | null;
  searchStatus: boolean

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
    if (this.userId != null) {
      this.backendService.getUserInfo(this.userId)
    }
  }

  ngOnInit(): void {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentUser.subscribe((value) => this.user = value);
    this.backendService.currentSearchStatus.subscribe((value) => this.searchStatus = value)
    this.backendService.currentFilterStatus.subscribe((value) => this.onFilter = value)
  }

  searchItems() {
    this.backendService.showFilter()
    document.querySelectorAll("[name='searchRequest']").forEach(element => {
      let tmp = element.getAttribute("ng-reflect-model");
      if (tmp != null) {
        this.searchRequest = tmp
      }
    });
    this.backendService.searchItem(this.searchRequest)
    this.router.navigate(['/main'])
  }

  onMain() {
    this.backendService.showFilter()
    this.router.navigate(['/main']);
    this.reloadList(true)
  }

  changeFilterStatus(status: boolean) {
    if (status)
    {
      this.backendService.showFilter()
    }
    else this.backendService.hideFilter()
  }

  isAdmin() {
    if (this.user != null) {
      return this.user.roleId == -3;
    }
    else return false
  }

  isDoctor() {
    if (this.user != null) {
      return this.user.roleId == -2;
    }
    else return false
  }

  isNormal() {
    if (this.user != null) {
      return this.user.roleId == -1;
    }
    else return false
  }

  userNotNull() {
    return this.userId != null && this.user != null
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
