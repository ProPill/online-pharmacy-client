import {Component, EventEmitter, Input, Output} from "@angular/core";
import {IUser} from "../../models/user";
import { Router } from '@angular/router';
import {MainPageComponent} from "../main-page/main-page.component";
import {UserService} from "../../services/user.service";

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

  constructor(private userService: UserService, private router: Router) {}

  searchItems() {
    this.onFilter = true;
    this.router.navigate(['/main'], { queryParams: {"list": {}}});
    this.reloadList.emit(true);
    new MainPageComponent(this.userService, this.router);
    return this.searchRequest;
  }

  onMain() {
    this.onFilter = true;
    this.router.navigate(['/main']);
  }

  changeFilterStatus(status: boolean) {
    this.onFilter = status;
  }
}
