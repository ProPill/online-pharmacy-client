import { Component } from '@angular/core';
import {IOrder} from "../../../models/order";
import {orders as ordersdata} from "../../../data/orders";
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
  orders: IOrder[] = ordersdata;
  user: IUser

  private userId: number = -1;

  constructor(private backendService: BackendService, private userService: UserService, private router: Router) {
    this.userService.currentUserId.subscribe((userId) => (this.userId = userId));
    this.user = this.backendService.getUserInfo(this.userId)
    // эндпоинт по выдаче всех заказов юзера
  }
}
