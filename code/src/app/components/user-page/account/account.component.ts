import { Component } from '@angular/core';
import {IOrder} from "../../../models/order";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {BackendService} from "../../../services/backend.service";
import {IUser} from "../../../models/user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  title = 'Account';
  orders: IOrder[]
  user: IUser

  private userId: number | null;

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.backendService.currentOrdersList.subscribe((list) => (this.orders = list));
    this.backendService.currentUser.subscribe((value) => {
      if (value != null) {
        this.user = value
      }})
    this.loadOrders()
  }

  loadOrders() {
    this.backendService.getUserOrders(<number>this.userId)
  }
}
